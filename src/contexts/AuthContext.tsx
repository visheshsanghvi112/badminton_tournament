import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, AuthToken, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>;
  signup: (email: string, password: string, userData: { name: string; role: 'admin' | 'player' | 'sponsor' | 'observer' | 'volunteer'; universityId?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Check for existing stored auth on mount
    const storedAuth = AuthService.getStoredAuth();
    if (storedAuth && !user) {
      setUser(storedAuth.user);
    }
    
    if (!storedAuth) {
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await AuthService.signInWithEmail(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error: any) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string; isNewUser?: boolean }> => {
    try {
      const result = await AuthService.signInWithGoogle();
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error: any) {
      console.error('Google login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    userData: { name: string; role: 'admin' | 'player' | 'sponsor' | 'observer' | 'volunteer'; universityId?: string; phone?: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await AuthService.signUpWithEmail(email, password, {
        email,
        name: userData.name,
        role: userData.role,
        universityId: userData.universityId,
        phone: userData.phone
      });
      
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error: any) {
      console.error('Signup failed:', error);
      return { success: false, error: error.message };
    }
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      return await AuthService.sendPasswordReset(email);
    } catch (error: any) {
      console.error('Password reset failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.signOutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if Firebase logout fails
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    signup,
    sendPasswordReset,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the hook separately to avoid Fast Refresh issues
export { useAuth };