import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  UserService, 
  TeamService, 
  PaymentService,
  UniversityService,
  CollegeService,
  FirestoreUser,
  FirestoreTeam,
  FirestorePayment,
  FirestoreUniversity,
  FirestoreCollege
} from '@/lib/firestore';
import { SeedDataService } from '@/lib/seedData';
import { 
  Users, 
  UserPlus, 
  Shield, 
  CreditCard, 
  LogOut,
  RefreshCw,
  Trash2,
  Eye,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [admins, setAdmins] = useState<FirestoreUser[]>([]);
  const [managers, setManagers] = useState<FirestoreUser[]>([]);
  const [players, setPlayers] = useState<FirestoreUser[]>([]);
  const [teams, setTeams] = useState<FirestoreTeam[]>([]);
  const [payments, setPayments] = useState<FirestorePayment[]>([]);
  const [universities, setUniversities] = useState<FirestoreUniversity[]>([]);
  const [colleges, setColleges] = useState<FirestoreCollege[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // New admin creation
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        adminsData, 
        managersData, 
        playersData, 
        teamsData, 
        paymentsData,
        universitiesData,
        collegesData
      ] = await Promise.all([
        UserService.getUsersByRole('admin'),
        UserService.getUsersByRole('manager'),
        UserService.getUsersByRole('player'),
        TeamService.getAllTeams(),
        PaymentService.getAllPayments(),
        UniversityService.getAllUniversities(),
        CollegeService.getAllColleges()
      ]);

      setAdmins(adminsData);
      setManagers(managersData);
      setPlayers(playersData);
      setTeams(teamsData);
      setPayments(paymentsData);
      setUniversities(universitiesData);
      setColleges(collegesData);
      
      // Filter unassigned players
      const unassigned = playersData.filter(player => player.isUnassigned);
      setUnassignedPlayers(unassigned);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
    toast({
      title: "Data refreshed",
      description: "Dashboard data has been updated",
    });
  };

  const initializeSeedData = async () => {
    setLoading(true);
    try {
      const success = await SeedDataService.initializeSeedData();
      if (success) {
        toast({
          title: "Seed data initialized",
          description: "Universities and colleges have been created successfully",
        });
        await loadAllData();
      } else {
        toast({
          title: "Error initializing seed data",
          description: "Failed to create universities and colleges",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error initializing seed data:', error);
      toast({
        title: "Error initializing seed data",
        description: "Failed to create universities and colleges",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAdminData.name || !newAdminData.email || !newAdminData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create an admin account",
        variant: "destructive"
      });
      return;
    }

    setCreatingAdmin(true);
    try {
      // TODO: Implement admin creation with Firebase Admin SDK
      // This would require a backend API endpoint
      toast({
        title: "Admin creation not implemented",
        description: "Admin creation requires backend implementation with Firebase Admin SDK",
        variant: "destructive"
      });
      
      setShowCreateAdmin(false);
      setNewAdminData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: "Error creating admin",
        description: "Failed to create admin account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCreatingAdmin(false);
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

  const getPaymentStats = () => {
    const totalPlayers = players.length;
    const paidPlayers = payments.filter(p => p.status === 'paid').length;
    const pendingPlayers = payments.filter(p => p.status === 'pending').length;
    const totalAmount = payments.reduce((sum, p) => sum + p.amountPaid, 0);

    return {
      totalPlayers,
      paidPlayers,
      pendingPlayers,
      totalAmount
    };
  };

  const stats = getPaymentStats();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Super Admin Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Super Admin Dashboard</h1>
            <Badge variant="default" className="bg-purple-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              SUPER ADMIN
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, {user?.name}. You have full access to manage the entire tournament system.
          </p>
          {user?.email && (
            <p className="text-xs text-muted-foreground mt-1">
              Super Admin Email: {user.email}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={refreshData} 
            variant="outline" 
            size="sm"
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{universities.length}</p>
                <p className="text-sm text-muted-foreground">Universities</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{colleges.length}</p>
                <p className="text-sm text-muted-foreground">Colleges</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{unassignedPlayers.length}</p>
                <p className="text-sm text-muted-foreground">Unassigned</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.paidPlayers}</p>
                <p className="text-sm text-muted-foreground">Paid Players</p>
              </div>
              <CreditCard className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹{stats.totalAmount}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Initialize Seed Data Button */}
      {universities.length === 0 && (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-900">Initialize System Data</h3>
                <p className="text-sm text-amber-700">Universities and colleges need to be created for the tournament system.</p>
              </div>
              <Button onClick={initializeSeedData} disabled={loading} className="bg-amber-600 hover:bg-amber-700">
                Initialize Seed Data
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="admins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Admins Tab */}
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Admin Management
                  </CardTitle>
                  <CardDescription>
                    Create and manage admin accounts
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setShowCreateAdmin(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Create Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showCreateAdmin && (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Create New Admin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateAdmin} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adminName">Name</Label>
                          <Input
                            id="adminName"
                            value={newAdminData.name}
                            onChange={(e) => setNewAdminData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Admin name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminEmail">Email</Label>
                          <Input
                            id="adminEmail"
                            type="email"
                            value={newAdminData.email}
                            onChange={(e) => setNewAdminData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="admin@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminPassword">Password</Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          value={newAdminData.password}
                          onChange={(e) => setNewAdminData(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Secure password"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" disabled={creatingAdmin}>
                          {creatingAdmin ? 'Creating...' : 'Create Admin'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setShowCreateAdmin(false);
                            setNewAdminData({ name: '', email: '', password: '' });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              <div className="space-y-3">
                {admins.map((admin) => (
                  <div key={admin.uid} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Admin
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Universities Tab */}
        <TabsContent value="universities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                University & College Management
              </CardTitle>
              <CardDescription>
                Manage universities, colleges, and their hierarchical structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Universities */}
                <div>
                  <h3 className="font-semibold mb-3">Universities ({universities.length})</h3>
                  <div className="space-y-3">
                    {universities.map((university) => {
                      const universityColleges = colleges.filter(c => c.universityId === university.universityId);
                      return (
                        <div key={university.universityId} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-lg">{university.name}</h4>
                            <Badge variant="outline">
                              {universityColleges.length} colleges
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <span>Created: {university.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
                            <span>Updated: {university.updatedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Colleges */}
                <div>
                  <h3 className="font-semibold mb-3">Colleges ({colleges.length})</h3>
                  <div className="space-y-3">
                    {colleges.map((college) => {
                      const university = universities.find(u => u.universityId === college.universityId);
                      const team = teams.find(t => t.teamId === college.teamId);
                      return (
                        <div key={college.collegeId} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-lg">{college.name}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                {university?.name || 'Unknown University'}
                              </Badge>
                              <Badge variant={team?.managerUID ? 'default' : 'secondary'}>
                                {team?.managerUID ? 'Has Manager' : 'No Manager'}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <span>Players: {team?.playerUIDs.length || 0}</span>
                            <span>Created: {college.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Unassigned Players */}
                {unassignedPlayers.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Unassigned Players ({unassignedPlayers.length})</h3>
                    <div className="space-y-3">
                      {unassignedPlayers.map((player) => (
                        <div key={player.uid} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.email}</p>
                            </div>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              Needs Assignment
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Management
              </CardTitle>
              <CardDescription>
                View and manage all teams in the tournament
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teams.map((team) => (
                  <div key={team.teamId} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-lg">{team.teamName}</h3>
                      <Badge variant="outline">
                        {team.playerUIDs.length} players
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Manager: {managers.find(m => m.uid === team.managerUID)?.name || 'Unknown'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Player Management
              </CardTitle>
              <CardDescription>
                View all players and their payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {players.map((player) => {
                  const payment = payments.find(p => p.playerUID === player.uid);
                  return (
                    <div key={player.uid} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.email}</p>
                          {player.teamId && (
                            <p className="text-xs text-muted-foreground">
                              Team: {teams.find(t => t.teamId === player.teamId)?.teamName || 'Unknown'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {payment ? (
                          <Badge 
                            variant={payment.status === 'paid' ? 'default' : 'secondary'}
                            className={payment.status === 'paid' ? 'bg-green-600' : 'bg-orange-100 text-orange-800'}
                          >
                            {payment.status === 'paid' ? 'Paid' : 'Pending'}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            No Payment
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Overview
              </CardTitle>
              <CardDescription>
                Monitor all payment transactions and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.paidPlayers}</p>
                    <p className="text-sm text-muted-foreground">Paid Players</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{stats.pendingPlayers}</p>
                    <p className="text-sm text-muted-foreground">Pending Payments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold">₹{stats.totalAmount}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                {payments.map((payment) => {
                  const player = players.find(p => p.uid === payment.playerUID);
                  return (
                    <div key={payment.playerUID} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{player?.name || 'Unknown Player'}</p>
                          <p className="text-sm text-muted-foreground">{player?.email || payment.playerUID}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">₹{payment.amountPaid}</p>
                        <Badge 
                          variant={payment.status === 'paid' ? 'default' : 'secondary'}
                          className={payment.status === 'paid' ? 'bg-green-600' : 'bg-orange-100 text-orange-800'}
                        >
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
