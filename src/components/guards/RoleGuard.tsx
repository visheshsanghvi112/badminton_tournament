import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasRoleLevel } from '@/lib/auth';
import { authLogger } from '@/lib/logger';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: 'superAdmin' | 'admin' | 'manager' | 'player';
  fallbackPath?: string;
  requireExactRole?: boolean;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  fallbackPath = '/unauthorized',
  requireExactRole = false
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    authLogger.warn('Unauthenticated access attempt to protected route', { requiredRole });
    return <Navigate to="/login" replace />;
  }

  const hasAccess = requireExactRole 
    ? user.role === requiredRole
    : hasRoleLevel(user.role, requiredRole);

  if (!hasAccess) {
    authLogger.warn('Unauthorized access attempt', { 
      userId: user.id, 
      userRole: user.role, 
      requiredRole 
    });
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

// Convenience components for specific roles
export const SuperAdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleGuard requiredRole="superAdmin">{children}</RoleGuard>
);

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleGuard requiredRole="admin">{children}</RoleGuard>
);

export const ManagerGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleGuard requiredRole="manager">{children}</RoleGuard>
);

export const PlayerGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RoleGuard requiredRole="player">{children}</RoleGuard>
);

// Higher-order component for role-based access
export const withRoleGuard = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: 'superAdmin' | 'admin' | 'manager' | 'player',
  options?: { fallbackPath?: string; requireExactRole?: boolean }
) => {
  return (props: P) => (
    <RoleGuard 
      requiredRole={requiredRole}
      fallbackPath={options?.fallbackPath}
      requireExactRole={options?.requireExactRole}
    >
      <Component {...props} />
    </RoleGuard>
  );
};