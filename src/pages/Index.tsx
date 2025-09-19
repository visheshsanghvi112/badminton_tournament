import heroImage from "@/assets/hero-badminton.jpg";
import CountdownTimer from "@/components/CountdownTimer";
import SponsorCarousel from "@/components/SponsorCarousel";
import InteractiveSchedule from "@/components/InteractiveSchedule";
import ParticipationGuidelines from "@/components/ParticipationGuidelines";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Trophy, Users, Calendar, MapPin, Star, Target } from "lucide-react";

const Index = () => {
  // Tournament date - December 15, 2025
  const tournamentDate = new Date('2025-12-15T09:00:00');

  const highlights = [
    { icon: Users, title: "200+ Universities", description: "Pan-India Participation" },
    { icon: Trophy, title: "1,000+ Athletes", description: "Elite Competition" },
    { icon: Star, title: "1 Champion", description: "Ultimate Glory" },
  ];

  const quickLinks = [
    { title: "Eligibility Criteria", href: "/faq", description: "Check tournament requirements" },
    { title: "Fixtures", href: "/gallery", description: "Match schedules (coming soon)" },
    { title: "Photo Gallery", href: "/gallery", description: "Tournament moments" },
    { title: "Help Desk", href: "/contact", description: "Need assistance?" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            West Zone Inter-University<br />
            <span className="text-accent">Women's Badminton</span><br />
            Tournament 2025
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 mb-8 text-base md:text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span>December 15-18, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-center md:text-left">Symbiosis Sports Complex, Pune</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="tournament" asChild className="w-full sm:w-auto">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary">
              <Link to="/sponsors">View Sponsors</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-xl mb-4">Tournament Starts In</h3>
            <CountdownTimer targetDate={tournamentDate} />
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Tournament Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center shadow-tournament-card hover:shadow-tournament transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 md:p-8">
                  <highlight.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Symbiosis Mini Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">About Symbiosis International</h2>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Symbiosis International (Deemed University), a NAAC A++ and Category-I Institution 
              ranked #24 in India (NIRF 2025), is proud to host the West Zone Inter-University 
              Women's Badminton Tournament 2025.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl font-bold text-primary">A++</div>
                <div className="text-sm text-muted-foreground">NAAC Grade</div>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-2xl font-bold text-primary">#24</div>
                <div className="text-sm text-muted-foreground">NIRF Universities</div>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl font-bold text-primary">#31</div>
                <div className="text-sm text-muted-foreground">QS Employer Reputation</div>
              </div>
            </div>
            <Button variant="outline" size="lg" asChild className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <Link to="/about">Read More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Schedule */}
      <InteractiveSchedule />

      {/* Participation Guidelines */}
      <ParticipationGuidelines />

      {/* Sponsors Carousel */}
      <SponsorCarousel />

      {/* Announcements */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Target className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Latest Announcements</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Registration Opens September 2025</span>
              </div>
              <div className="hidden md:block">|</div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Team Manager Guidelines Released</span>
              </div>
              <div className="hidden md:block">|</div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Prize Distribution Details Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.href} className="block animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="hover:shadow-tournament-card transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm md:text-base">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
