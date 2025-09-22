import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, Users, Award, Building, Target, ExternalLink, Star, Calendar, MapPin, Clock } from "lucide-react";
import TournamentStats from "@/components/TournamentStats";
import { Link } from "react-router-dom";

const About = () => {
  const achievements = [
    { icon: Award, title: "A++ NAAC Grade", description: "Highest accreditation standard" },
    { icon: Trophy, title: "#24 NIRF Universities", description: "Top ranking in India" },
    { icon: Globe, title: "#31 QS Employer Reputation", description: "Global recognition" },
    { icon: Users, title: "85+ Countries", description: "Diverse student body" },
    { icon: Building, title: "45 Institutes", description: "Multi-disciplinary approach" },
    { icon: Target, title: "Category-I University", description: "Premier institution status" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary-dark text-primary-foreground py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
              <Trophy className="w-4 h-4 mr-2" />
              West Zone Inter-University Championship 2025
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            About the Tournament
          </h1>

          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Organized under AIU mandate by Symbiosis International (Deemed University),
            bringing together the finest women's badminton talent from across the West Zone.
          </p>

          {/* Tournament Quick Facts */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">March 2025</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">Pune, India</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">200+ Universities</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">Elite Competition</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Overview */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
                Tournament Overview
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Premier Collegiate Competition
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-accent" />
                    Elite Competition
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    The West Zone Inter-University Women's Badminton Tournament 2025 represents the pinnacle
                    of collegiate sports competition in the western region of India. Hosted under the mandate
                    of the Association of Indian Universities (AIU), this prestigious event brings together
                    over 200 universities and 1,000+ elite female athletes competing for ultimate glory.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                    <Building className="w-6 h-6 mr-3 text-accent" />
                    World-Class Host
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Symbiosis International (Deemed University) is honored to serve as the host institution,
                    leveraging our world-class sports facilities and decades of experience in organizing
                    international sporting events.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">200+</div>
                    <div className="text-xl font-semibold text-primary mb-4">Universities</div>
                    <div className="text-4xl font-bold text-accent mb-2">1,000+</div>
                    <div className="text-lg font-semibold text-accent mb-4">Elite Athletes</div>
                    <div className="text-3xl font-bold text-primary-dark">1</div>
                    <div className="text-base font-semibold text-primary-dark">Ultimate Champion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message from Sports Director */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 shadow-xl">
              <CardContent className="p-10">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-primary">
                      Message from the Sports Director
                    </h3>
                    <blockquote className="text-xl italic text-muted-foreground leading-relaxed mb-6">
                      "We are delighted to welcome the brightest badminton talents from across the West Zone
                      to Symbiosis. This tournament embodies our commitment to excellence in sports and our
                      belief in empowering women athletes. We look forward to witnessing exceptional
                      performances and creating lasting memories."
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">RK</span>
                      </div>
                      <div>
                        <div className="font-bold text-primary text-lg">Dr. Rajesh Kumar</div>
                        <div className="text-sm text-muted-foreground">Director, Sports & Recreation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Symbiosis University */}
      <section className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-48 -translate-x-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
              About Symbiosis International
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Excellence in Education & Sports
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Symbiosis International (Deemed University) is a multi-disciplinary university
              with a legacy of academic excellence and global outreach, committed to nurturing
              talent both in academics and athletics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up border-0 bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-primary">{achievement.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/10">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary">University Highlights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-primary">Academic Excellence</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>45+ Institutes across multiple disciplines</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>6 Indian cities + 1 international campus (Dubai)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>NIRF Rankings: #7 Law, #11 Management</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Over 40,000 students from 85+ countries</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-accent">Global Philosophy</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>"Vasudhaiva Kutumbakam" - The World is One Family</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>International collaboration programs</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Multi-cultural campus environment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Focus on holistic development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Facilities */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
                Sports Facilities
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                World-Class Sports Complex
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The Symbiosis Sports Complex is a state-of-the-art facility designed to host
                international-level competitions with world-class amenities and cutting-edge technology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-primary">Tournament Facilities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">8 Professional badminton courts</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">International-standard flooring</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">Professional lighting systems</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">Seating capacity: 2,000+ spectators</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">Live streaming capabilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-accent">Support Amenities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Modern changing rooms & lockers</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Medical support center</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Refreshment facilities</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Parking for 500+ vehicles</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Accessibility features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary via-primary-dark to-accent text-white border-0 shadow-2xl">
              <CardContent className="p-10 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-4">Proven Track Record</h4>
                <p className="text-lg leading-relaxed opacity-90">
                  Symbiosis has successfully hosted over 50 national and international sporting events,
                  including AIU tournaments, making us the ideal venue for this prestigious competition.
                  Our facilities have been praised by athletes, coaches, and spectators alike.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tournament Statistics */}
      <TournamentStats />

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30">
                Tournament Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Recognition & Rewards
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Celebrating excellence with prestigious awards, comprehensive media coverage,
                and opportunities that extend beyond the tournament.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-primary">Awards & Prizes</CardTitle>
                      <p className="text-sm text-muted-foreground">Prestigious recognition for champions</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-5">
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                      <Trophy className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">Cash prizes up to ₹2,00,000 for winners</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                      <Award className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">Merit scholarships for top performers</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                      <Target className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">Professional coaching opportunities</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                      <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">International tournament recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                      <ExternalLink className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-primary">Media Coverage</CardTitle>
                      <p className="text-sm text-muted-foreground">Extensive coverage and exposure</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-5">
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                      <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">Live streaming on multiple platforms</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                      <ExternalLink className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">National sports channels coverage</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                      <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">Social media highlights & interviews</span>
                    </li>
                    <li className="flex items-center space-x-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                      <ExternalLink className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">Professional photography & documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary via-primary-dark to-accent text-white border-0 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardContent className="p-12 text-center relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Compete?</h3>
                <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
                  Join the most prestigious women's badminton tournament in West Zone.
                  Showcase your skills, compete with the best, and write your success story
                  at Symbiosis International (Deemed University).
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button size="lg" variant="secondary" asChild className="px-8 py-4 text-lg font-semibold">
                    <Link to="/register" className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Register Your Team</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="px-8 py-4 text-lg font-semibold text-white border-white/80 hover:bg-white/10">
                    <Link to="/contact" className="flex items-center space-x-2">
                      <ExternalLink className="w-5 h-5" />
                      <span>Get More Information</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;