import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { DocumentUpload, DocumentFile } from '@/components/DocumentUpload';
import { PlayerInbox, InboxMessage } from '@/components/PlayerInbox';
import { 
  User, 
  Calendar, 
  Trophy, 
  Clock,
  MapPin,
  Bell,
  Upload,
  FileText,
  CreditCard,
  LogOut,
  Camera,
  Edit
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PlayerDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);

  useEffect(() => {
    // Mock data for player with extended profile information
    setPlayerData({
      profile: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        course: 'BCom',
        year: '3rd Year',
        university: 'Symbiosis International University',
        category: 'Singles & Doubles',
        ranking: '#12 in West Zone',
        studentId: 'SIU2023001',
        dob: '2001-05-15',
        address: '123 University Campus, Pune, Maharashtra',
        emergencyContact: '+91 9876543210',
        profilePhoto: '/placeholder.svg'
      },
      payments: [
        { id: 1, description: 'Registration Fee', amount: 1500, status: 'Paid', date: '2024-12-01' },
        { id: 2, description: 'Accommodation Fee', amount: 2000, status: 'Pending', date: '2024-12-15' }
      ],
      upcomingMatches: [
        {
          id: 'MATCH_001',
          opponent: 'Neha Singh (Mumbai Tigers)',
          category: 'Women\'s Singles',
          court: 'Court 1',
          time: '2025-12-15T09:00:00Z',
          status: 'scheduled'
        },
        {
          id: 'MATCH_002',
          partner: 'Anita Patel',
          opponents: 'Delhi Duo',
          category: 'Women\'s Doubles',
          court: 'Court 3',
          time: '2025-12-15T14:00:00Z',
          status: 'scheduled'
        }
      ],
      recentResults: [
        {
          opponent: 'Rajasthan Player',
          result: 'Won 21-15, 21-18',
          date: '2025-12-14T10:00:00Z'
        }
      ]
    });

    // Mock documents data
    setDocuments([
      { 
        id: '1', 
        name: 'Student ID Card.pdf', 
        type: 'ID Document', 
        size: 2048576, 
        status: 'verified', 
        uploadDate: '2024-12-01T10:00:00Z',
        downloadUrl: '/downloads/student-id.pdf'
      },
      { 
        id: '2', 
        name: 'Medical Certificate.pdf', 
        type: 'Medical', 
        size: 1536000, 
        status: 'uploaded', 
        uploadDate: '2024-12-10T14:30:00Z'
      }
    ]);

    // Mock inbox messages
    setInboxMessages([
      {
        id: '1',
        type: 'payment_reminder',
        title: 'Payment Reminder - Accommodation Fee',
        content: 'Dear Player,\n\nThis is a friendly reminder that your accommodation fee payment is still pending. Please complete your payment by December 20th to secure your accommodation.\n\nAmount Due: ₹2,000\nDue Date: December 20, 2024\n\nThank you for your cooperation.',
        sender: 'Tournament Finance Team',
        timestamp: '2024-12-15T09:00:00Z',
        isRead: false,
        priority: 'high',
        actionRequired: true,
        actionText: 'Make Payment',
        actionUrl: '/payments'
      },
      {
        id: '2',
        type: 'announcement',
        title: 'Tournament Schedule Update',
        content: 'Dear Players,\n\nWe have updated the tournament schedule due to weather conditions. All matches scheduled for December 16th have been moved to December 17th.\n\nPlease check your updated match timings in the matches section.\n\nBest regards,\nTournament Committee',
        sender: 'Tournament Director',
        timestamp: '2024-12-14T16:30:00Z',
        isRead: true,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'match_update',
        title: 'Match Venue Changed',
        content: 'Your upcoming match against Neha Singh has been moved from Court 1 to Court 3. The timing remains the same.\n\nPlease be at the venue 30 minutes before your match time.\n\nGood luck!',
        sender: 'Match Coordinator',
        timestamp: '2024-12-13T11:15:00Z',
        isRead: true,
        priority: 'medium'
      }
    ]);
  }, [user]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = async (files: FileList) => {
    // Simulate upload process
    const newDocuments: DocumentFile[] = Array.from(files).map((file, index) => ({
      id: `doc_${Date.now()}_${index}`,
      name: file.name,
      type: 'Document',
      size: file.size,
      status: 'uploading' as const,
      uploadDate: new Date().toISOString()
    }));

    // Add uploading documents
    setDocuments(prev => [...prev, ...newDocuments]);

    // Simulate upload completion
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(doc => {
          const uploadingDoc = newDocuments.find(nd => nd.id === doc.id);
          return uploadingDoc ? { ...doc, status: 'uploaded' as const } : doc;
        })
      );
    }, 2000);
  };

  const handleDocumentDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "Document has been removed successfully",
    });
  };

  const handleDocumentDownload = (document: DocumentFile) => {
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank');
    }
    toast({
      title: "Download started",
      description: `Downloading ${document.name}`,
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was an issue logging out, but you've been signed out locally.",
        variant: "destructive"
      });
      navigate('/login');
    }
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  if (!playerData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Player Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Manage your profile and track your tournament progress.
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="inbox">
            Inbox
            {inboxMessages.filter(msg => !msg.isRead).length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {inboxMessages.filter(msg => !msg.isRead).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo Section */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-muted overflow-hidden">
                  <img 
                    src={photoPreview || playerData.profile.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                  >
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Label>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </div>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline" 
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input id="name" defaultValue={playerData.profile.name} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{playerData.profile.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input id="email" type="email" defaultValue={playerData.profile.email} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{playerData.profile.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input id="phone" defaultValue={playerData.profile.phone} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{playerData.profile.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <p className="text-sm text-muted-foreground">{playerData.profile.studentId}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    {isEditing ? (
                      <Input id="course" defaultValue={playerData.profile.course} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{playerData.profile.course}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year</Label>
                    {isEditing ? (
                      <Input id="year" defaultValue={playerData.profile.year} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{playerData.profile.year}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea id="address" defaultValue={playerData.profile.address} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{playerData.profile.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Playing Category</Label>
                    <p className="text-sm text-muted-foreground">{playerData.profile.category}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ranking">Current Ranking</Label>
                    <p className="text-sm text-muted-foreground">{playerData.profile.ranking}</p>
                  </div>
                </div>
                {isEditing && (
                  <Button onClick={handleProfileUpdate} className="mt-4">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <DocumentUpload
            documents={documents}
            onUpload={handleDocumentUpload}
            onDelete={handleDocumentDelete}
            onDownload={handleDocumentDownload}
            maxFileSize={10}
            acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
          />
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payments & Fees
              </CardTitle>
              <CardDescription>
                Manage your tournament fees and payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">₹1,500</p>
                    <p className="text-sm text-muted-foreground">Paid Amount</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">₹2,000</p>
                    <p className="text-sm text-muted-foreground">Pending Amount</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">₹3,500</p>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment History */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Payment History</h3>
                {playerData.payments.map((payment: any) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Due date: {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">₹{payment.amount}</p>
                      {payment.status === 'Paid' ? (
                        <Badge variant="default">Paid</Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Pending</Badge>
                          <Button size="sm">
                            Pay Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="space-y-6">
          {/* Upcoming Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              {playerData.upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {playerData.upcomingMatches.map((match: any) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{match.category}</h4>
                          <p className="text-sm text-muted-foreground">
                            {match.opponent ? `vs ${match.opponent}` : 
                             `${match.partner} vs ${match.opponents}`}
                          </p>
                        </div>
                        <Badge variant="outline">{match.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {match.court}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(match.time).toLocaleString()}
                        </div>
                      </div>
                      <Button asChild size="sm" className="mt-3">
                        <Link to={`/match/${match.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">
                  No upcoming matches scheduled
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {playerData.recentResults.length > 0 ? (
                <div className="space-y-3">
                  {playerData.recentResults.map((result: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">vs {result.opponent}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(result.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{result.result}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-muted-foreground">
                  No recent results available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        {/* Inbox Tab */}
        <TabsContent value="inbox">
          <PlayerInbox
            messages={inboxMessages}
            onMarkAsRead={(messageId) => {
              setInboxMessages(prev => 
                prev.map(msg => 
                  msg.id === messageId ? { ...msg, isRead: true } : msg
                )
              );
            }}
            onMarkAllAsRead={() => {
              setInboxMessages(prev => 
                prev.map(msg => ({ ...msg, isRead: true }))
              );
              toast({
                title: "All messages marked as read",
                description: "Your inbox has been updated",
              });
            }}
            onDeleteMessage={(messageId) => {
              setInboxMessages(prev => prev.filter(msg => msg.id !== messageId));
              toast({
                title: "Message deleted", 
                description: "Message has been removed from your inbox",
              });
            }}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default PlayerDashboard;