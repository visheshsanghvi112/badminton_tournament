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
  Users, 
  FileCheck, 
  CreditCard, 
  Calendar,
  AlertCircle,
  TrendingUp,
  Settings,
  BarChart3,
  LogOut,
  Camera,
  Upload,
  Download,
  Edit,
  User,
  Shield,
  Database,
  Bell,
  Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mock comprehensive admin data
    setAdminData({
      profile: {
        name: user?.name,
        email: user?.email,
        role: 'Tournament Administrator',
        department: 'Sports Management',
        phone: '+91 9876543210',
        employeeId: 'ADM001',
        joinDate: '2023-01-15',
        permissions: ['Full Access', 'User Management', 'System Configuration'],
        profilePhoto: '/placeholder.svg'
      },
      stats: {
        registrations: {
          total: 45,
          pending: 8,
          approved: 35,
          rejected: 2
        },
        documents: {
          pending: 12,
          verified: 85,
          rejected: 3
        },
        payments: {
          completed: 32,
          pending: 13,
          total: '₹3,60,000'
        },
        matches: {
          scheduled: 24,
          completed: 8,
          live: 0,
          today: 6
        },
        users: {
          total: 156,
          active: 142,
          admins: 5,
          players: 138,
          inactive: 14
        }
      },
      recentActivities: [
        {
          id: 1,
          action: 'Registration Approved',
          details: 'Gujarat University team registration approved',
          timestamp: '2024-12-19T10:30:00Z',
          type: 'approval'
        },
        {
          id: 2,
          action: 'Document Verified',
          details: '5 student ID documents verified for Mumbai University',
          timestamp: '2024-12-19T09:15:00Z',
          type: 'verification'
        },
        {
          id: 3,
          action: 'Payment Received',
          details: 'Registration fee payment received from Delhi University',
          timestamp: '2024-12-19T08:45:00Z',
          type: 'payment'
        }
      ],
      alerts: [
        {
          id: 1,
          title: 'Gujarat DOB Documents',
          message: '5 players need manual verification for alternative DOB proofs',
          type: 'warning',
          urgent: true
        },
        {
          id: 2,
          title: 'Schedule Conflicts',
          message: 'Court 2 has overlapping matches on Dec 16',
          type: 'info',
          urgent: false
        },
        {
          id: 3,
          title: 'Payment Reconciliation',
          message: '3 offline payments pending verification',
          type: 'success',
          urgent: false
        }
      ],
      systemHealth: {
        serverStatus: 'online',
        databaseStatus: 'healthy',
        lastBackup: '2024-12-19T02:00:00Z',
        uptime: '99.8%'
      }
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
      description: "Your admin profile has been updated successfully",
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action initiated",
      description: `${action} process started`,
    });
  };

  if (!adminData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Tournament administration and management control panel
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.stats.registrations.total}</div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {adminData.stats.registrations.pending} pending
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {adminData.stats.registrations.approved} approved
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.stats.documents.pending}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting verification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payments</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.stats.payments.total}</div>
                <p className="text-xs text-muted-foreground">
                  {adminData.stats.payments.completed} completed, {adminData.stats.payments.pending} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Matches</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminData.stats.matches.today}</div>
                <p className="text-xs text-muted-foreground">
                  {adminData.stats.matches.completed} completed
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleQuickAction('Review registrations')}
                  className="w-full justify-start"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Review Registrations ({adminData.stats.registrations.pending} pending)
                </Button>
                <Button 
                  onClick={() => handleQuickAction('Verify documents')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Verify Documents ({adminData.stats.documents.pending} pending)
                </Button>
                <Button 
                  onClick={() => handleQuickAction('Manage fixtures')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Fixtures
                </Button>
                <Button 
                  onClick={() => handleQuickAction('Payment management')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Management
                </Button>
              </CardContent>
            </Card>

            {/* Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Alerts & Tasks
                </CardTitle>
                <CardDescription>
                  Items requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminData.alerts.map((alert: any) => (
                    <div 
                      key={alert.id}
                      className={`flex items-start space-x-3 p-3 border rounded-lg ${
                        alert.type === 'warning' ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/20' : 
                        alert.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : 
                        'border-blue-200 bg-blue-50 dark:bg-blue-950/20'
                      }`}
                    >
                      <AlertCircle className={`h-4 w-4 mt-0.5 ${
                        alert.type === 'warning' ? 'text-orange-500' :
                        alert.type === 'success' ? 'text-green-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.message}
                        </p>
                      </div>
                      {alert.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminData.recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{activity.type}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                    src={photoPreview || adminData.profile.profilePhoto} 
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
                    Admin Information
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
                      <Input id="name" defaultValue={adminData.profile.name} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{adminData.profile.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input id="email" type="email" defaultValue={adminData.profile.email} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{adminData.profile.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input id="phone" defaultValue={adminData.profile.phone} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{adminData.profile.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <p className="text-sm text-muted-foreground">{adminData.profile.employeeId}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <p className="text-sm text-muted-foreground">{adminData.profile.role}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <p className="text-sm text-muted-foreground">{adminData.profile.department}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permissions">Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {adminData.profile.permissions.map((permission: string) => (
                      <Badge key={permission} variant="secondary">{permission}</Badge>
                    ))}
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

        {/* Registrations Tab */}
        <TabsContent value="registrations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Registration Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/registrations?status=pending">
                    Review Pending ({adminData.stats.registrations.pending})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/registrations?status=approved">
                    View Approved ({adminData.stats.registrations.approved})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/universities">
                    Manage Universities
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Document Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Document Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/documents?status=pending">
                    Pending Verification ({adminData.stats.documents.pending})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/documents?status=verified">
                    Verified Documents ({adminData.stats.documents.verified})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/documents/bulk">
                    Bulk Operations
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Payment Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/payments?status=pending">
                    Pending Payments ({adminData.stats.payments.pending})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/payments/reconcile">
                    Payment Reconciliation
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/payments/reports">
                    Financial Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Tournament Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/fixtures">
                    Fixture Management
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/matches">
                    Live Match Control
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/results">
                    Results & Standings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Communications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/announcements">
                    Send Announcements
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/notifications">
                    Push Notifications
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/messages">
                    Direct Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/users">
                    All Users ({adminData.stats.users.total})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/users/admins">
                    Admin Users ({adminData.stats.users.admins})
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/users/permissions">
                    Manage Permissions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Server Status</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{adminData.systemHealth.serverStatus}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Database</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{adminData.systemHealth.databaseStatus}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Uptime</Label>
                    <p className="text-sm text-muted-foreground">{adminData.systemHealth.uptime}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(adminData.systemHealth.lastBackup).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Administration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/admin/sponsors">Sponsor Management</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/admin/media">Media Gallery</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/admin/backup">System Backup</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/admin/logs">System Logs</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/admin/settings">Configuration</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Reports & Analytics
              </CardTitle>
              <CardDescription>
                Generate and download various tournament reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/reports/registration">
                    <Download className="mr-2 h-4 w-4" />
                    Registration Report
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/reports/financial">
                    <Download className="mr-2 h-4 w-4" />
                    Financial Report
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/reports/matches">
                    <Download className="mr-2 h-4 w-4" />
                    Match Results
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/analytics">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/exports">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/reports/custom">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Custom Reports
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;