import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Download, 
  X, 
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'uploaded' | 'verified' | 'rejected';
  uploadDate: string;
  rejectionReason?: string;
  downloadUrl?: string;
}

interface DocumentUploadProps {
  documents: DocumentFile[];
  onUpload: (files: FileList) => Promise<void>;
  onDelete: (id: string) => void;
  onDownload: (document: DocumentFile) => void;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

export const DocumentUpload = ({
  documents,
  onUpload,
  onDelete,
  onDownload,
  maxFileSize = 10,
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
}: DocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxFileSize}MB limit`,
          variant: "destructive"
        });
        return;
      }

      // Check file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
        return;
      }
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onUpload(files);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 500);

      toast({
        title: "Upload successful",
        description: `${files.length} document(s) uploaded successfully`,
      });

    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Upload failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: DocumentFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'uploaded':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: DocumentFile['status']) => {
    const variants = {
      uploading: 'secondary',
      uploaded: 'secondary', 
      verified: 'default',
      rejected: 'destructive'
    } as const;

    const labels = {
      uploading: 'Uploading...',
      uploaded: 'Pending Review',
      verified: 'Verified',
      rejected: 'Rejected'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documents & Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload Documents</h3>
            <p className="text-muted-foreground">
              Upload student ID, medical certificates, or other required documents
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {maxFileSize}MB • Supported: {acceptedTypes.join(', ')}
            </p>
          </div>
          
          {isUploading ? (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(',')}
                onChange={handleFileSelect}
                className="hidden"
                id="document-upload"
              />
              <Button asChild>
                <label htmlFor="document-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
          )}
        </div>

        {/* Documents List */}
        {documents.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Uploaded Documents</h3>
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    {doc.status === 'rejected' && doc.rejectionReason && (
                      <p className="text-sm text-red-600 mt-1">
                        Reason: {doc.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(doc.status)}
                  {doc.downloadUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDownload(doc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDelete(doc.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};