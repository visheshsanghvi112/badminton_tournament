import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  UserService, 
  TeamService, 
  PaymentService,
  FirestoreUser,
  FirestoreTeam,
  FirestorePayment
} from '@/lib/firestore';
import { 
  Users, 
  CreditCard, 
  LogOut,
  RefreshCw,
  Eye,
  UserCheck,
  UserX
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [players, setPlayers] = useState<FirestoreUser[]>([]);
  const [teams, setTeams] = useState<FirestoreTeam[]>([]);
  const [payments, setPayments] = useState<FirestorePayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [playersData, teamsData, paymentsData] = await Promise.all([
        UserService.getUsersByRole('player'),
        TeamService.getAllTeams(),
        PaymentService.getAllPayments()
      ]);

      setPlayers(playersData);
      setTeams(teamsData);
      setPayments(paymentsData);
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
    await loadData();
    setRefreshing(false);
    toast({
      title: "Data refreshed",
      description: "Dashboard data has been updated",
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
            <p className="text-muted-foreground">Loading Admin Dashboard...</p>
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, {user?.name}. Manage players and monitor payments.
          </p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalPlayers}</p>
                <p className="text-sm text-muted-foreground">Total Players</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{teams.length}</p>
                <p className="text-sm text-muted-foreground">Teams</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.paidPlayers}</p>
                <p className="text-sm text-muted-foreground">Paid Players</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingPlayers}</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
              <UserX className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="players" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Players Tab */}
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Player Management
              </CardTitle>
              <CardDescription>
                View all players and their registration status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {players.map((player) => {
                  const payment = payments.find(p => p.playerUID === player.uid);
                  return (
                    <div key={player.uid} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-muted-foreground">{player.email}</p>
                          {player.teamId && (
                            <p className="text-xs text-muted-foreground">
                              Team: {teams.find(t => t.teamId === player.teamId) ? 'Assigned' : 'Unknown'}
                            </p>
                          )}
                              {player.phone && (
                                <p className="text-xs text-muted-foreground">
                                  Phone: {player.phone}
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

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Overview
              </CardTitle>
              <CardDescription>
                View all teams and their player counts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teams.map((team) => {
                  const teamPlayers = players.filter(p => p.teamId === team.teamId);
                  const teamPayments = payments.filter(p => 
                    teamPlayers.some(tp => tp.uid === p.playerUID)
                  );
                  const paidCount = teamPayments.filter(p => p.status === 'paid').length;
                  
                  return (
                    <div key={team.teamId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-lg">Team {team.teamId}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            {teamPlayers.length} players
                          </Badge>
                          <Badge variant={paidCount === teamPlayers.length ? 'default' : 'secondary'}>
                            {paidCount}/{teamPlayers.length} paid
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span>Manager: {team.managerUID}</span>
                        <span>Created: {team.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}</span>
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
                Payment Monitoring
              </CardTitle>
              <CardDescription>
                Monitor payment status and transactions
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
                          {payment.paymentMethod && (
                            <p className="text-xs text-muted-foreground">
                              Method: {payment.paymentMethod}
                            </p>
                          )}
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

export default AdminDashboard;