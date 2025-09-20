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
  CollegeService,
  UniversityService,
  FirestoreUser,
  FirestoreTeam,
  FirestorePayment,
  FirestoreCollege,
  FirestoreUniversity
} from '@/lib/firestore';
import { 
  Users, 
  CreditCard, 
  LogOut,
  RefreshCw,
  UserPlus,
  UserMinus,
  GraduationCap,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [myTeam, setMyTeam] = useState<FirestoreTeam | null>(null);
  const [myCollege, setMyCollege] = useState<FirestoreCollege | null>(null);
  const [myUniversity, setMyUniversity] = useState<FirestoreUniversity | null>(null);
  const [teamPlayers, setTeamPlayers] = useState<FirestoreUser[]>([]);
  const [teamPayments, setTeamPayments] = useState<FirestorePayment[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadTeamData();
    }
  }, [user]);

  const loadTeamData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get manager's team through their college assignment
      const team = await TeamService.getTeamByManager(user.id);
      setMyTeam(team);

      if (team) {
        // Get college and university information
        const college = await CollegeService.getCollege(team.collegeId);
        setMyCollege(college);
        
        if (college) {
          const university = await UniversityService.getUniversity(college.universityId);
          setMyUniversity(university);
        }

        // Get players in this team
        const players = await UserService.getPlayersInTeam(team.teamId);
        setTeamPlayers(players);

        // Get payments for team players
        const payments = await PaymentService.getTeamPayments(team.teamId);
        setTeamPayments(payments);
      }

      // Get all unassigned players for potential assignment
      const allPlayersData = await UserService.getUsersByRole('player');
      const unassigned = allPlayersData.filter(p => p.isUnassigned || !p.teamId);
      setUnassignedPlayers(unassigned);
    } catch (error) {
      console.error('Error loading team data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load team data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadTeamData();
    setRefreshing(false);
    toast({
      title: "Data refreshed",
      description: "Team data has been updated",
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

  const handleAssignPlayerToTeam = async (playerUID: string) => {
    if (!myTeam) return;

    try {
      const success = await TeamService.addPlayerToTeam(myTeam.teamId, playerUID);
      
      if (success) {
        // Update player's college and team assignment
        await UserService.updateUser(playerUID, {
          collegeId: myCollege?.collegeId,
          teamId: myTeam.teamId,
          isUnassigned: false
        });

        toast({
          title: "Player assigned",
          description: "Player has been assigned to your team",
        });
        await loadTeamData();
      } else {
        toast({
          title: "Error assigning player",
          description: "Failed to assign player to team. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error assigning player:', error);
      toast({
        title: "Error assigning player",
        description: "Failed to assign player to team. Please try again.",
        variant: "destructive"
      });
    }
  };


  const handleRemovePlayerFromTeam = async (playerUID: string) => {
    if (!myTeam) return;

    try {
      const success = await TeamService.removePlayerFromTeam(myTeam.teamId, playerUID);
      
      if (success) {
        toast({
          title: "Player removed",
          description: "Player has been removed from your team",
        });
        await loadTeamData();
      } else {
        toast({
          title: "Error removing player",
          description: "Failed to remove player from team. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error removing player:', error);
      toast({
        title: "Error removing player",
        description: "Failed to remove player from team. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getTeamStats = () => {
    const totalPlayers = teamPlayers.length;
    const paidPlayers = teamPayments.filter(p => p.status === 'paid').length;
    const pendingPlayers = teamPayments.filter(p => p.status === 'pending').length;
    const totalAmount = teamPayments.reduce((sum, p) => sum + p.amountPaid, 0);

    return {
      totalPlayers,
      paidPlayers,
      pendingPlayers,
      totalAmount
    };
  };

  const stats = getTeamStats();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Manager Dashboard...</p>
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Manager Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, {user?.name}. Manage your college team and track payments.
          </p>
          {myCollege && myUniversity && (
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>{myUniversity.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{myCollege.name}</span>
              </div>
            </div>
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

      {/* Team Status */}
      {!myTeam ? (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Users className="h-5 w-5" />
              No Team Assigned
            </CardTitle>
            <CardDescription className="text-amber-700">
              You haven't been assigned to a college team yet. Contact the Super Admin or Admin to get assigned to a college.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-amber-700">
              <p>In the new tournament system:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Each college has exactly one team</li>
                <li>Managers are assigned to specific colleges</li>
                <li>Players are automatically assigned based on their college selection</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Team Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stats.totalPlayers}</p>
                    <p className="text-sm text-muted-foreground">Team Players</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
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
                  <CreditCard className="h-8 w-8 text-green-500" />
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
                  <CreditCard className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">₹{stats.totalAmount}</p>
                    <p className="text-sm text-muted-foreground">Team Revenue</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="team">My Team</TabsTrigger>
              <TabsTrigger value="players">Add Players</TabsTrigger>
            </TabsList>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {myCollege?.name} Team
                  </CardTitle>
                  <CardDescription>
                    Manage your college team players and monitor their payment status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamPlayers.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No players in your team yet</p>
                        <p className="text-sm">Use the "Add Players" tab to add players to your team</p>
                      </div>
                    ) : (
                      teamPlayers.map((player) => {
                        const payment = teamPayments.find(p => p.playerUID === player.uid);
                        return (
                          <div key={player.uid} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-muted-foreground">{player.email}</p>
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
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemovePlayerFromTeam(player.uid)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <UserMinus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Players Tab */}
            <TabsContent value="players" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Unassigned Players
                  </CardTitle>
                  <CardDescription>
                    Assign unassigned players to your college team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unassignedPlayers.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No unassigned players available</p>
                        <p className="text-sm">All players have been assigned to teams</p>
                      </div>
                    ) : (
                      unassignedPlayers.map((player) => (
                        <div key={player.uid} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.email}</p>
                              {player.phone && (
                                <p className="text-xs text-muted-foreground">
                                  Phone: {player.phone}
                                </p>
                              )}
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs mt-1">
                                Unassigned
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssignPlayerToTeam(player.uid)}
                            className="flex items-center gap-2"
                          >
                            <UserPlus className="h-4 w-4" />
                            Assign to Team
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;
