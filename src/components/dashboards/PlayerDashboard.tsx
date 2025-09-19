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
  Download,
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
      documents: [
        { id: 1, name: 'Student ID Card', type: 'ID', status: 'Verified', uploadDate: '2024-12-01' },
        { id: 2, name: 'Medical Certificate', type: 'Medical', status: 'Pending', uploadDate: '2024-12-10' }
      ],
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
      ],
      announcements: [
        {
          title: 'Warm-up session at 7:30 AM',
          time: '1 hour ago',
          important: true
        },
        {
          title: 'Lunch venue changed to Block A cafeteria', 
          time: '3 hours ago',
          important: false
        }
      ]
    });
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

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      toast({
        title: "Documents uploaded",
        description: `${files.length} document(s) uploaded successfully`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
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
          <TabsTrigger value="announcements">Updates</TabsTrigger>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents & Verification
              </CardTitle>
              <CardDescription>
                Upload and manage your tournament documents
              </CardDescription>
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
                </div>
                <div className="mt-4">
                  <Input
                    id="document-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleDocumentUpload}
                    className="hidden"
                  />
                  <Button asChild>
                    <Label htmlFor="document-upload" className="cursor-pointer">
                      Choose Files
                    </Label>
                  </Button>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Uploaded Documents</h3>
                {playerData.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={doc.status === 'Verified' ? 'default' : 'secondary'}
                      >
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Tournament Updates & Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {playerData.announcements.map((announcement: any, index: number) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-lg ${
                      announcement.important ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/20' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      {announcement.important && (
                        <Badge variant="destructive" className="text-xs">Important</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerDashboard;