import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, UserPlus, Loader2, Shield, GraduationCap, Users, CheckCircle, AlertTriangle, Search } from "lucide-react";
import symbiosisLogo from "@/assets/symbiosis-logo.png";
import { FuzzyMatchingService, MatchResult } from "@/lib/fuzzyMatching";

const Register = () => {
  const { signup, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    universityName: '',
    collegeName: '',
    role: 'player' as const,
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchingResult, setMatchingResult] = useState<MatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize fuzzy matching on component mount
  useEffect(() => {
    FuzzyMatchingService.initializeFuse();
  }, []);

  // Debounced fuzzy matching
  useEffect(() => {
    if (formData.universityName && formData.collegeName && formData.universityName.length > 2 && formData.collegeName.length > 2) {
      const timeoutId = setTimeout(async () => {
        setIsMatching(true);
        try {
          const result = await FuzzyMatchingService.matchUniversityAndCollege(
            formData.universityName,
            formData.collegeName
          );
          setMatchingResult(result);
          setShowSuggestions(!result.matched);
        } catch (error) {
          console.error('Fuzzy matching error:', error);
        } finally {
          setIsMatching(false);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setMatchingResult(null);
      setShowSuggestions(false);
    }
  }, [formData.universityName, formData.collegeName]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation with user-friendly messages
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your university email address.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address (e.g., student@university.edu).",
        variant: "destructive"
      });
      return;
    }

    if (!formData.password) {
      toast({
        title: "Password Required",
        description: "Please create a secure password.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long for security.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both password fields match exactly.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please read and accept the terms and conditions to create your account.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await signup(formData.email, formData.password, {
        name: formData.name,
        role: formData.role,
        universityId: matchingResult?.universityId || undefined,
        phone: formData.phone || undefined
      });
      
      if (result.success) {
        toast({
          title: "Account Created Successfully! 🎉",
          description: `Welcome to the tournament platform, ${formData.name}! Your account is ready and you're being redirected to your dashboard.`,
          className: "border-emerald-200 bg-emerald-50 text-emerald-800"
        });
        // Don't set loading to false here - let the redirect happen
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "Unable to create your account. Please check your information and try again.",
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

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-tournament border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={symbiosisLogo} 
                  alt="Symbiosis International University"
                  className="h-20 w-20 drop-shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1">
                  <GraduationCap className="h-3 w-3 text-accent-foreground" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Join Tournament Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-medium">
              Symbiosis International University
            </CardDescription>
            <CardDescription className="text-muted-foreground/80 text-sm mt-1">
              Create your secure academic tournament account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your complete name"
                  required
                  disabled={loading}
                  autoComplete="name"
                  className="h-11 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

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
                  className="h-11 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Create secure password"
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      className="h-11 pr-12 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
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

                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Confirm password"
                      required
                      disabled={loading}
                      autoComplete="new-password"
                      className="h-11 pr-12 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-muted transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* University and College Selection */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="universityName" className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    University Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="universityName"
                      value={formData.universityName}
                      onChange={(e) => handleChange('universityName', e.target.value)}
                      placeholder="Type your university name (e.g., Symbiosis International University)"
                      disabled={loading}
                      className="h-11 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    {isMatching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Search className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="collegeName" className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    College Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="collegeName"
                      value={formData.collegeName}
                      onChange={(e) => handleChange('collegeName', e.target.value)}
                      placeholder="Type your college name (e.g., Symbiosis Institute of Technology)"
                      disabled={loading}
                      className="h-11 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Matching Result Display */}
                {matchingResult && (
                  <div className="p-3 rounded-lg border">
                    {matchingResult.matched ? (
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Perfect Match!</span>
                        <Badge variant="default" className="bg-green-600 text-xs">
                          {Math.round(matchingResult.confidence * 100)}% confidence
                        </Badge>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Low confidence match</span>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                          {Math.round(matchingResult.confidence * 100)}% confidence
                        </Badge>
                      </div>
                    )}
                    
                    {matchingResult.universityName && matchingResult.collegeName && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>Matched: <strong>{matchingResult.universityName}</strong></p>
                        <p>College: <strong>{matchingResult.collegeName}</strong></p>
                      </div>
                    )}

                    {!matchingResult.matched && matchingResult.suggested && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Your input will be reviewed by an administrator. You'll be notified once assigned to a team.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-4 bg-muted-foreground rounded-full"></div>
                  Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  disabled={loading}
                  autoComplete="tel"
                  className="h-11 border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="role" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Tournament Role
                </Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleChange('role', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="h-11 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                    <SelectValue placeholder="Select your participation role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="player" className="flex items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Player - Compete in tournaments
                      </div>
                    </SelectItem>
                    <SelectItem value="manager" className="flex items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-secondary" />
                        Manager - Manage a team
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleChange('agreeToTerms', checked as boolean)}
                    disabled={loading}
                    className="mt-1 border-primary/30 data-[state=checked]:bg-primary"
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground leading-relaxed">
                    I acknowledge that I have read and agree to the{' '}
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                      Privacy Policy
                    </span>{' '}
                    of Symbiosis International University's Tournament Platform.
                  </Label>
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
                    Creating Your Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create Account Securely
                  </>
                )}
              </Button>
            </form>

            
            <div className="mt-8 text-center space-y-4">
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Already part of our community?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors">
                    Sign in to your account
                  </Link>
                </p>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/80">
                  Secured by enterprise-grade encryption & university protocols
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;