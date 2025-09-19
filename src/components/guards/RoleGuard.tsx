import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}

const RoleGuard = ({ children, roles, fallback }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You don't have permission to access this content.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;