import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Check, Copy } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'sent' | 'otp' | 'reset'>('email');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Mock reset token for dev mode
  const mockResetToken = 'RESET_TOKEN_DEV_12345';
  const mockOTP = '123456';

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setStep('sent');
    
    toast({
      title: "Reset Instructions Sent",
      description: "Check your email for reset instructions.",
    });
  };

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp === mockOTP) {
      setStep('reset');
      toast({
        title: "OTP Verified",
        description: "You can now set a new password.",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Password Reset Successful",
      description: "Your password has been updated. You can now login.",
    });
    
    // Redirect to login after successful reset
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-tournament">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Mail className="h-6 w-6" />
              {step === 'email' && 'Forgot Password'}
              {step === 'sent' && 'Check Your Email'}
              {step === 'otp' && 'Enter OTP'}
              {step === 'reset' && 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {step === 'email' && 'Enter your email to receive reset instructions'}
              {step === 'sent' && 'We sent you reset instructions'}
              {step === 'otp' && 'Enter the verification code'}
              {step === 'reset' && 'Create your new password'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            )}

            {step === 'sent' && (
              <div className="space-y-6">
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    Reset instructions sent to {email}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Development Mode Options:</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Simulate Email Link:</p>
                        <div className="flex items-center gap-2 p-2 bg-background rounded border">
                          <span className="text-xs font-mono flex-1">{mockResetToken}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(mockResetToken)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Or use OTP verification:</p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setStep('otp')}
                        >
                          Enter OTP Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <form onSubmit={handleOTPVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Demo OTP: <code className="bg-muted px-1 rounded">{mockOTP}</code>
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Verify OTP
                </Button>
              </form>
            )}

            {step === 'reset' && (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Update Password
                </Button>
              </form>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;