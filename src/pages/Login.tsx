import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import symbiosisLogo from "@/assets/symbiosis-logo.png";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to the tournament platform.",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@tournament.com', password: 'admin123' },
    { role: 'Manager', email: 'manager@university.edu', password: 'manager123' },
    { role: 'Player', email: 'player@university.edu', password: 'player123' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-tournament">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={symbiosisLogo} 
                alt="Symbiosis International University"
                className="h-16 w-16"
              />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <LogIn className="h-6 w-6" />
              Tournament Portal Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@university.edu"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-semibold mb-3">Demo Accounts:</h4>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <div 
                    key={account.role}
                    className="text-xs p-2 bg-background rounded border cursor-pointer hover:bg-accent"
                    onClick={() => {
                      setFormData({
                        email: account.email,
                        password: account.password
                      });
                    }}
                  >
                    <div className="font-medium">{account.role}</div>
                    <div className="text-muted-foreground">{account.email}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click any account above to auto-fill credentials
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Register your team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;