import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Check, AlertCircle, Loader2, Shield, KeyRound } from 'lucide-react';
import symbiosisLogo from "@/assets/symbiosis-logo.png";

const ForgotPassword = () => {
  const { sendPasswordReset, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await sendPasswordReset(email);
      
      if (result.success) {
        setIsEmailSent(true);
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
      } else {
        setError(result.error || 'Failed to send reset email');
        toast({
          title: "Reset Failed",
          description: result.error || "Failed to send reset email. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setError('An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await sendPasswordReset(email);
      
      if (result.success) {
        toast({
          title: "Email Resent",
          description: "Password reset email has been sent again.",
        });
      } else {
        setError(result.error || 'Failed to resend email');
        toast({
          title: "Resend Failed",
          description: result.error || "Failed to resend email. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setError('An unexpected error occurred');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
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
                <div className="absolute -bottom-1 -right-1 bg-secondary rounded-full p-1">
                  <KeyRound className="h-3 w-3 text-secondary-foreground" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-sports bg-clip-text text-transparent mb-2">
              {isEmailSent ? 'Check Your Email' : 'Password Recovery'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-medium">
              Symbiosis International University
            </CardDescription>
            <CardDescription className="text-muted-foreground/80 text-sm mt-1">
              {isEmailSent 
                ? 'Secure password reset instructions have been sent'
                : 'Recover access to your tournament account securely'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-4 bg-secondary rounded-full"></div>
                    University Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student.name@university.edu"
                    required
                    disabled={loading}
                    autoComplete="email"
                    className="h-12 border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-base"
                  />
                </div>

                {error && (
                  <Alert variant="destructive" className="border-destructive/20 bg-destructive/10">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Secure Instructions...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Send Recovery Instructions
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <Alert className="border-accent/20 bg-accent/10">
                  <Check className="h-5 w-5 text-accent-foreground" />
                  <AlertDescription className="text-accent-foreground font-medium">
                    Secure password reset instructions sent to <strong className="text-foreground">{email}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-5">
                  <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-secondary/10 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-secondary" />
                      </div>
                      <h4 className="font-bold text-foreground">Next Steps</h4>
                    </div>
                    <ul className="text-sm text-foreground space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Check your university email inbox (and spam/junk folder)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Click the secure reset link in the email</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Create a strong new password following university guidelines</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Return to the login page with your new credentials</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4 font-medium">
                      Haven't received the email yet?
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="w-full h-11 border-border hover:bg-muted hover:border-border/80 transition-all duration-200 font-medium"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending Instructions...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Recovery Email
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-destructive/20 bg-destructive/10">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <AlertDescription className="text-destructive">{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 text-center space-y-4">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 font-medium hover:underline transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Login
              </Link>

              {!isEmailSent && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-secondary hover:text-secondary/80 font-semibold hover:underline transition-colors">
                      Sign in directly
                    </Link>
                  </p>
                </div>
              )}
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/80">
                  Password recovery secured by university-grade encryption
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;