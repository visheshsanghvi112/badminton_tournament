import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Clock, User, Building, MessageCircle } from "lucide-react";
import Map from "@/components/Map";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    email: '',
    phone: '',
    role: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you within 24 hours.",
    });
    // Reset form
    setFormData({
      name: '',
      university: '',
      email: '',
      phone: '',
      role: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: User,
      title: "Tournament Director",
      details: ["Dr. Priya Sharma", "Director, Sports & Recreation"],
      contact: "tournament@symbiosis.ac.in"
    },
    {
      icon: Building,
      title: "Administrative Office", 
      details: ["Symbiosis International University", "Range Hills Road, Pune - 411020"],
      contact: "+91 20 2528 1000"
    },
    {
      icon: MessageCircle,
      title: "Support Helpdesk",
      details: ["Registration & General Queries", "Monday - Friday, 9:00 AM - 6:00 PM"],
      contact: "help@tournament2025-26.in"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-24 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Get in touch with our tournament organizers for any queries, registration assistance, 
            or support. We're here to help make your participation seamless.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-tournament hover:shadow-hero transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground text-sm md:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={formData.university}
                        onChange={(e) => handleChange('university', e.target.value)}
                        placeholder="Your university name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Select onValueChange={(value) => handleChange('role', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student Player</SelectItem>
                        <SelectItem value="team-manager">Team Manager</SelectItem>
                        <SelectItem value="coach">Coach</SelectItem>
                        <SelectItem value="university-official">University Official</SelectItem>
                        <SelectItem value="media">Media Representative</SelectItem>
                        <SelectItem value="sponsor">Potential Sponsor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Please describe your query or how we can help you..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6">Get in Touch</h2>
              
              {contactInfo.map((info, index) => (
                <Card key={index} className="mb-4 hover:shadow-tournament transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <info.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1 text-sm md:text-base">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-xs md:text-sm text-muted-foreground break-words">
                            {detail}
                          </p>
                        ))}
                        <p className="text-xs md:text-sm font-medium text-primary mt-2 break-all">
                          {info.contact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Location & Venue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Tournament Venue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Symbiosis Sports Complex</h4>
                    <p className="text-muted-foreground text-sm">
                      Range Hills Road, Symbiosis Viman Nagar Campus<br />
                      Pune, Maharashtra 411020, India
                    </p>
                  </div>
                  
                  <Map />
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-primary-soft border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Office Hours</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Emergency support available 24/7 during tournament dates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For urgent queries or time-sensitive matters, reach out to our helpdesk directly. 
            We're committed to providing prompt support for all tournament-related needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="default" className="w-full sm:w-auto">
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Call Now: </span>+91 20 2528 1000
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Mail className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Email: </span>help@tournament2025-26.in
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;