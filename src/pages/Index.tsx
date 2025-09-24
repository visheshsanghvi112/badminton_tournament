import { lazy, Suspense, useState, useEffect } from "react";
import heroImage from "@/assets/hero-badminton.jpg";
import CountdownTimer from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonCard, SkeletonText, ErrorBoundary } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Trophy, Users, Calendar, MapPin, Star, Target } from "lucide-react";

// Lazy load heavy components for better performance
const SponsorCarousel = lazy(() => import("@/components/SponsorCarousel"));
const InteractiveSchedule = lazy(() => import("@/components/InteractiveSchedule"));
const ParticipationGuidelines = lazy(() => import("@/components/ParticipationGuidelines"));

const Index = () => {
  // Tournament date - December 26, 2025
  const tournamentDate = new Date('2025-12-26T09:00:00');

  // Loading component for lazy-loaded sections
  const LoadingSection = ({ title }: { title: string }) => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  );

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
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center hero-bg will-change-transform">
        <div className="container mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
            West Zone Inter-University<br />
            <span className="text-accent">Women's Badminton</span><br />
            Tournament 2025
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 mb-8 text-base md:text-lg animate-fade-in-up animate-delay-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span>December 26-29, 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-center md:text-left">Symbiosis Sports Complex, Pune</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-12 animate-fade-in-up animate-delay-400">
            <Button size="lg" variant="tournament" asChild className="w-full sm:w-auto">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-white border-white bg-transparent">
              <Link to="/sponsors">View Sponsors</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8 animate-fade-in-up animate-delay-600">
            <h3 className="text-xl mb-4">Tournament Starts In</h3>
            <CountdownTimer targetDate={tournamentDate} />
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="highlights-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="highlights-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary tracking-tight">Tournament Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the scale and prestige of this premier collegiate badminton championship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {highlights.map((highlight, index) => (
              <div key={index} className="group">
                <Card className="h-full bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                      <highlight.icon className="h-10 w-10 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Symbiosis Mini Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary tracking-tight">About Symbiosis International</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A premier institution hosting the West Zone Inter-University Women's Badminton Tournament 2025
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-12">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Symbiosis International (Deemed University), a NAAC A++ and Category-I Institution
                ranked #24 in India (NIRF 2025), is proud to host the West Zone Inter-University
                Women's Badminton Tournament 2025.
              </p>
            </div>

            {/* University Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">A++</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">NAAC Grade</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Highest Accreditation</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">#24</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">NIRF Universities</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Top Ranking in India</div>
                </div>
              </div>
              <div className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">#31</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">QS Employer Reputation</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Global Recognition</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-3 text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
              >
                <Link to="/about">Read More About Us</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="px-8 py-3 text-base font-medium text-primary hover:text-primary-dark hover:bg-primary/5 hover:scale-105 transition-all duration-300"
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Schedule */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSection title="Interactive Schedule" />}>
          <InteractiveSchedule />
        </Suspense>
      </ErrorBoundary>

      {/* Participation Guidelines */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSection title="Participation Guidelines" />}>
          <ParticipationGuidelines />
        </Suspense>
      </ErrorBoundary>

      {/* Sponsors Carousel */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingSection title="Our Sponsors" />}>
          <SponsorCarousel />
        </Suspense>
      </ErrorBoundary>

      {/* Announcements */}
  <section className="py-16 bg-gradient-to-r from-[#e53935] to-[#283e51] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Latest Announcements</h3>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-3 lg:space-y-0 lg:space-x-6 text-sm md:text-base">
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Registration Opens September 2025</span>
              </div>
              <div className="hidden lg:block text-white/60">•</div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">Team Manager Guidelines Released</span>
              </div>
              <div className="hidden lg:block text-white/60">•</div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">Prize Distribution Details Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20" aria-labelledby="quick-links-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="quick-links-heading" className="text-3xl md:text-4xl font-bold mb-4 text-primary tracking-tight">Quick Access</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about the tournament at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block focus-visible group"
                aria-label={`${link.title} - ${link.description}`}
              >
                <Card className="h-full bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base md:text-lg font-semibold text-primary group-hover:text-primary-dark transition-colors duration-300">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {link.description}
                    </p>
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
