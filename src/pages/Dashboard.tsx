import { useAuth } from '@/contexts/AuthContext';
import PlayerDashboard from '@/components/dashboards/PlayerDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import { ROLES } from '@/lib/auth';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case ROLES.ADMIN:
      return <AdminDashboard />;
    case ROLES.PLAYER:
      return <PlayerDashboard />;
    default:
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>Role-specific dashboard not implemented for: {user.role}</p>
        </div>
      );
  }
};

export default Dashboard;