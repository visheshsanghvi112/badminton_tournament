import { useAuth } from '@/contexts/AuthContext';
import PlayerDashboard from '@/components/dashboards/PlayerDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import SuperAdminDashboard from '@/components/dashboards/SuperAdminDashboard';
import ManagerDashboard from '@/components/dashboards/ManagerDashboard';
import { ROLES } from '@/lib/auth';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case ROLES.SUPER_ADMIN:
      return <SuperAdminDashboard />;
    case ROLES.ADMIN:
      return <AdminDashboard />;
    case ROLES.MANAGER:
      return <ManagerDashboard />;
    case ROLES.PLAYER:
      return <PlayerDashboard />;
    default:
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground mb-4">Role-specific dashboard not implemented for: {user.role}</p>
            <p className="text-sm text-muted-foreground">Please contact support if you believe this is an error.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;