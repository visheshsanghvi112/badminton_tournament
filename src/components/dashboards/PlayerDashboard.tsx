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

import { PlayerInbox, InboxMessage } from '@/components/PlayerInbox';
import { 
  User, 
  Bell,
  Upload,
  FileText,
  CreditCard,
  LogOut,
  Camera,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlayerDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
  const [isLoadingPaymentStatus, setIsLoadingPaymentStatus] = useState(false);

  // Function to check payment status (will integrate with Google Sheets)
  const checkPaymentStatus = async () => {
    setIsLoadingPaymentStatus(true);
    try {
      // TODO: Replace with actual Google Sheets API call
      // const response = await fetch('/api/check-payment-status', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ playerUID: user?.id })
      // });
      // const paymentData = await response.json();
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Payment status updated",
        description: "Payment information has been refreshed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check payment status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingPaymentStatus(false);
    }
  };

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
        dob: '2001-05-15',
        address: '123 University Campus, Pune, Maharashtra',
        emergencyContact: '+91 9876543210',
        profilePhoto: '/placeholder.svg'
      },
      payments: [
        { id: 1, description: 'Officiating Fee', amount: 1500, status: 'Not Paid', dueDate: '2025-12-20' },
        { id: 2, description: 'Shuttlecock Charges', amount: 3300, status: 'Not Paid', dueDate: '2025-12-20' },
        { id: 3, description: 'Protest Fee', amount: 2000, status: 'Not Paid', dueDate: '2025-12-20' },
        { id: 4, description: 'Accommodation (Rs.300/Per Day Per Person)', amount: 300, status: 'Not Paid', dueDate: '2025-12-20' }
      ],
      paymentStatus: {
        totalAmount: 7100,
        paidAmount: 0,
        pendingAmount: 7100,
        lastUpdated: new Date().toISOString()
      }
    });



    // Start with empty inbox
    setInboxMessages([]);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Player Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, {user?.name}. Manage your profile and track your tournament progress.
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="profile" className="text-xs sm:text-sm py-2 sm:py-3">
            <span className="hidden sm:inline">Profile</span>
            <User className="h-4 w-4 sm:hidden" />
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm py-2 sm:py-3">
            <span className="hidden sm:inline">Documents</span>
            <FileText className="h-4 w-4 sm:hidden" />
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-xs sm:text-sm py-2 sm:py-3">
            <span className="hidden sm:inline">Payments</span>
            <CreditCard className="h-4 w-4 sm:hidden" />
          </TabsTrigger>
          <TabsTrigger value="inbox" className="text-xs sm:text-sm py-2 sm:py-3 relative">
            <span className="hidden sm:inline">Inbox</span>
            <Bell className="h-4 w-4 sm:hidden" />
            {inboxMessages.filter(msg => !msg.isRead).length > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 sm:relative sm:top-0 sm:right-0 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs">
                {inboxMessages.filter(msg => !msg.isRead).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Photo Section */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Camera className="h-5 w-5" />
                  Profile Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-muted overflow-hidden">
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
                    className="w-full sm:w-auto"
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
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="text-lg">Personal Information</span>
                  </div>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <TabsContent value="documents" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5" />
                Tournament Forms & Documents
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Complete all required forms for tournament participation. Documents will be submitted through these forms.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Google Forms Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Tournament Forms
                </h3>
                <p className="text-blue-700 mb-4 text-sm sm:text-base">
                  Complete all required forms for tournament participation. Upload your documents directly in each form. All forms must be submitted before the registration deadline.
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-blue-200 gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 text-sm sm:text-base">Player Registration Form</h4>
                      <p className="text-xs sm:text-sm text-blue-600">Complete registration details & upload ID documents</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm">
                      <a 
                        href="https://forms.google.com/tournament-registration" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Fill Form
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-blue-200 gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 text-sm sm:text-base">Medical Clearance Form</h4>
                      <p className="text-xs sm:text-sm text-blue-600">Health declaration & upload medical certificate</p>
                    </div>
                    <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full sm:w-auto text-sm">
                      <a 
                        href="https://forms.google.com/medical-clearance" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Fill Form
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-blue-200 gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 text-sm sm:text-base">Accommodation Request Form</h4>
                      <p className="text-xs sm:text-sm text-blue-600">Request accommodation & upload supporting documents</p>
                    </div>
                    <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 w-full sm:w-auto text-sm">
                      <a 
                        href="https://forms.google.com/accommodation-request" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Fill Form
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Important Notes:</h4>
                <ul className="text-xs sm:text-sm text-amber-800 space-y-1">
                  <li>• All documents must be uploaded directly through the respective forms</li>
                  <li>• Ensure documents are clear, legible, and in PDF/JPG format</li>
                  <li>• Forms must be completed before the registration deadline</li>
                  <li>• You will receive confirmation emails after successful submission</li>
                  <li>• Contact support if you face any issues: support@siu.edu.in</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <CreditCard className="h-5 w-5" />
                    Payments & Fees
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Manage your tournament fees and payments
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkPaymentStatus}
                  disabled={isLoadingPaymentStatus}
                  className="w-full sm:w-auto"
                >
                  {isLoadingPaymentStatus ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Refresh Status
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Payment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-green-600">₹{playerData.paymentStatus.paidAmount}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Paid Amount</p>
                  </CardContent>
                </Card>
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">₹{playerData.paymentStatus.pendingAmount}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Pending Amount</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold">₹{playerData.paymentStatus.totalAmount}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Amount</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Payment Status Alert */}
              {playerData.paymentStatus.pendingAmount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-amber-800">Payment Required</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        You have outstanding payments totaling ₹{playerData.paymentStatus.pendingAmount}. Please complete your payments to secure your tournament participation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-blue-900 flex items-center gap-2 text-base sm:text-lg">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                  <CardDescription className="text-blue-700 text-sm sm:text-base">
                    Use any of these methods to complete your payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Simplified Payment Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* UPI Payment */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                          <path d="M2 17l10 5 10-5"/>
                          <path d="M2 12l10 5 10-5"/>
                        </svg>
                        UPI Payment (Recommended)
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-700 text-xs">UPI ID:</p>
                          <p className="text-sm font-mono text-gray-800 break-all">tournament@siu.edu.in</p>
                        </div>
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                          <strong>Note:</strong> Add your email ({playerData?.profile?.email}) in payment description
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                          <line x1="8" y1="21" x2="16" y2="21"/>
                          <line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                        Bank Transfer
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="font-medium text-gray-700">Account:</p>
                          <p className="text-gray-600">Symbiosis International University</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Account No:</p>
                          <p className="text-gray-600 font-mono">1234567890123456</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">IFSC:</p>
                          <p className="text-gray-600 font-mono">SBIN0001234</p>
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                          <strong>Important:</strong> Mention your Student ID in transfer reference
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h5 className="font-semibold text-blue-900 mb-2 text-sm">Important Notes:</h5>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Always include your email ({playerData?.profile?.email}) in payment reference</li>
                      <li>• Keep payment receipt/screenshot for verification</li>
                      <li>• Payment status will be updated within 24-48 hours</li>
                      <li>• Contact: finance@siu.edu.in for payment issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Items */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">Payment Items</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Complete your payments to secure tournament participation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {playerData.payments.map((payment: any) => (
                      <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-3">
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base">{payment.description}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Due date: {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <p className="font-semibold text-sm sm:text-base">₹{payment.amount}</p>
                          <div className="flex items-center gap-2">
                            {payment.status === 'Paid' ? (
                              <Badge variant="default" className="bg-green-600 text-xs">Paid</Badge>
                            ) : (
                              <>
                                <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">Not Paid</Badge>
                                <Button 
                                  size="sm" 
                                  className="bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1 h-auto"
                                  onClick={() => {
                                    toast({
                                      title: "Payment Information",
                                      description: "Use the payment details below to complete your payment. Include your Student ID in the reference.",
                                    });
                                  }}
                                >
                                  Pay Now
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Payment Status Note */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-800">
                      <strong>Note:</strong> Payment status is verified through our payment system. 
                      It may take 24-48 hours to reflect after payment completion.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>




        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-4 sm:space-y-6">
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
            onClearAll={() => {
              setInboxMessages([]);
              toast({
                title: "Inbox cleared",
                description: "All messages have been removed from your inbox",
              });
            }}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default PlayerDashboard;