import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, AuthToken, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const auth = AuthService.getStoredAuth();
    if (auth) {
      setUser(auth.user);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - simulate different users based on email
      let mockUser: User;
      
      if (email.includes('admin')) {
        mockUser = {
          id: 'ADMIN_001',
          role: 'admin',
          name: 'Admin User',
          email,
        };
      } else {
        mockUser = {
          id: 'PLAYER_001',
          role: 'player',
          name: 'Player User',
          universityId: 'UNIV_101',
          email,
          phone: '+91 9876543210',
        };
      }

      const authToken: AuthToken = {
        token: `mock.jwt.${mockUser.role}.${Date.now()}`,
        user: mockUser,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      };

      AuthService.setAuth(authToken);
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    AuthService.clearAuth();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};