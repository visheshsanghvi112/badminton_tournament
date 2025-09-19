import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calendar, FileText, Users, Award, CheckCircle, AlertCircle } from "lucide-react";

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    email: '',
    phone: '',
    isTeamManager: false,
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Expression of Interest Submitted!",
      description: "You will be notified when official registration opens.",
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const requirements = [
    "Current enrollment in a recognized West Zone university",
    "Age between 18-25 years (as per AIU guidelines)",
    "Valid university enrollment certificate",
    "Medical fitness certificate",
    "Original documents for age verification (Passport, School Certificate, PAN, Aadhar)"
  ];

  const timeline = [
    { phase: "Registration Opens", date: "September 2025", status: "upcoming" },
    { phase: "Early Bird Deadline", date: "October 2025", status: "upcoming" },
    { phase: "Final Registration", date: "November 2025", status: "upcoming" },
    { phase: "Tournament Dates", date: "December 15-18, 2025", status: "upcoming" }
  ];

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your expression of interest has been successfully submitted. You will receive 
                detailed registration instructions when official registration opens in September 2025.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Email confirmation sent to {formData.email}</li>
                  <li>• Official registration links will be shared in September 2025</li>
                  <li>• Tournament guidelines and forms will be provided</li>
                  <li>• Updates will be sent to all registered interests</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit Another Interest
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tournament Registration
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Register your interest for the West Zone Inter-University Women's Badminton Tournament 2025. 
            Official registration opens September 2025.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Registration Form */}
          <div className="animate-slide-in-left">
            <Card className="shadow-tournament hover:shadow-hero transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Official Interest Registration</CardTitle>
                <p className="text-muted-foreground">
                  Submit your official interest to receive priority access and detailed information when registration opens.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University Name *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleChange('university', e.target.value)}
                      placeholder="Your university name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@university.edu"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="teamManager"
                      checked={formData.isTeamManager}
                      onCheckedChange={(checked) => handleChange('isTeamManager', checked as boolean)}
                    />
                    <Label htmlFor="teamManager" className="text-sm">
                      I am a Team Manager / Coach
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleChange('agreeToTerms', checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and tournament rules *
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Interest
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      This is not the official registration. You will receive detailed 
                      registration instructions when they become available.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Registration Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Registration Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.phase}</div>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                      </div>
                      <div className="text-xs bg-muted px-2 py-1 rounded">
                        Coming Soon
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Eligibility Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Alternative DOB proofs (Passport, School Certificate, PAN, Aadhar) are accepted</li>
                      <li>• Registration fees will be announced with official registration</li>
                      <li>• Team managers will receive separate login access</li>
                      <li>• Medical certificates must be dated within 3 months of tournament</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-card">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-center">Tournament Highlights</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">200+</div>
                    <div className="text-xs text-muted-foreground">Universities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1,000+</div>
                    <div className="text-xs text-muted-foreground">Athletes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4 Days</div>
                    <div className="text-xs text-muted-foreground">Competition</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">₹5L+</div>
                    <div className="text-xs text-muted-foreground">Prize Money</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;