import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, Loader2, Shield } from 'lucide-react';
import symbiosisLogo from "@/assets/symbiosis-logo.png";

const Login = () => {
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
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
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast({
          title: "Welcome Back! 🎉",
          description: `Successfully signed in as ${result.user?.name || 'User'}. Redirecting to your dashboard...`,
          className: "border-emerald-200 bg-emerald-50 text-emerald-800"
        });
        // Don't set loading to false here - let the redirect happen
      } else {
        toast({
          title: "Sign In Failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check your internet connection and try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();

      if (result.success) {
        const welcomeMessage = result.isNewUser
          ? `Welcome to the tournament platform, ${result.user?.name || 'User'}! Your account has been created successfully.`
          : `Welcome back, ${result.user?.name || 'User'}! Redirecting to your dashboard...`;

        toast({
          title: result.isNewUser ? "Account Created Successfully! 🎉" : "Welcome Back! 🎉",
          description: welcomeMessage,
          className: "border-emerald-200 bg-emerald-50 text-emerald-800"
        });
        // Don't set loading to false here - let the redirect happen
      } else {
        toast({
          title: "Google Sign-In Failed",
          description: result.error || "Unable to sign in with Google. Please try again or use email sign-in.",
          variant: "destructive"
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to Google services. Please check your internet connection and try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-tournament border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={symbiosisLogo}
                  alt="Symbiosis International University"
                  className="h-20 w-20 drop-shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <Shield className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Tournament Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-medium">
              Symbiosis International University
            </CardDescription>
            <CardDescription className="text-muted-foreground/80 text-sm mt-1">
              Secure access to your academic tournament dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  University Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="student.name@university.edu"
                  required
                  disabled={loading}
                  autoComplete="email"
                  className="h-12 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter your secure password"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className="h-12 pr-12 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-muted transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In Securely
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-semibold tracking-wider">
                  Alternative Sign-In
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 border-border hover:bg-muted hover:border-border/80 transition-all duration-200 font-medium text-base"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Continue with Google Workspace'
              )}
            </Button>

            <div className="mt-8 text-center space-y-4">
              <Link
                to="/forgot-password"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
              >
                <Shield className="mr-1 h-3 w-3" />
                Forgot your password?
              </Link>

              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  New to the tournament platform?{' '}
                  <Link to="/register" className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors">
                    Create your account
                  </Link>
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-muted-foreground/80">
                  Protected by university-grade security protocols
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;