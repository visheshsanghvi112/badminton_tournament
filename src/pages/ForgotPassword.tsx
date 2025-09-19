import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
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
              <Mail className="h-6 w-6" />
              {isEmailSent ? 'Check Your Email' : 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {isEmailSent 
                ? 'We sent you password reset instructions'
                : 'Enter your email to receive reset instructions'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@university.edu"
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    Password reset instructions sent to <strong>{email}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">What's next?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check your email inbox (and spam folder)</li>
                      <li>• Click the reset link in the email</li>
                      <li>• Follow the instructions to create a new password</li>
                      <li>• Return to login with your new password</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Didn't receive the email?
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        'Resend Email'
                      )}
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Login
              </Link>
            </div>

            {!isEmailSent && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;