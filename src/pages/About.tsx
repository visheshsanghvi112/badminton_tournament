import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Globe, Users, Award, Building, Target, ExternalLink } from "lucide-react";
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
      <section className="bg-gradient-hero text-primary-foreground py-24 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            About the Tournament
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Organized under AIU mandate by Symbiosis International (Deemed University),
            bringing together the finest women's badminton talent from across the West Zone.
          </p>
        </div>
      </section>

      {/* Tournament Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tournament Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                The West Zone Inter-University Women's Badminton Tournament 2025-26 represents the pinnacle
                of collegiate sports competition in the western region of India. Hosted under the mandate
                of the Association of Indian Universities (AIU), this prestigious event brings together
                70+ universities and 500+ participants and officials competing for ultimate glory.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <strong>Event Details:</strong><br />
                • <strong>Host:</strong> Symbiosis International (Deemed University)<br />
                • <strong>Location:</strong> Hill Top – Lavale, Pune<br />
                • <strong>Duration:</strong> 5 days (December 26-29, 2025)<br />
                • <strong>Format:</strong> Group stage (4 pools) → Knockout rounds (Quarterfinals → Semifinals → Final)<br />
                • <strong>Seeding:</strong> Top teams seeded based on previous year results
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <strong>Primary Objectives:</strong><br />
                • Provide a high-quality competitive platform for West Zone universities<br />
                • Showcase the University's sports infrastructure and organizational capabilities<br />
                • Deliver an efficient, safe, and memorable experience for players, officials and guests<br />
                • Create sponsorship and media engagement opportunities
              </p>
            </div>

            {/* Message from Sports Director */}
            <Card className="mt-12 bg-primary-soft border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Message from the Sports Director
                </h3>
                <blockquote className="text-lg italic text-muted-foreground">
                  "We are delighted to welcome the brightest badminton talents from across the West Zone
                  to Symbiosis. This tournament embodies our commitment to excellence in sports and our
                  belief in empowering women athletes. We look forward to witnessing exceptional
                  performances and creating lasting memories."
                </blockquote>
                <div className="mt-4">
                  <div className="font-semibold text-primary">Dr. Rajesh Kumar</div>
                  <div className="text-sm text-muted-foreground">Director, Sports & Recreation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Symbiosis University */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Symbiosis International</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Symbiosis International (Deemed University) is a multi-disciplinary university
              with a legacy of academic excellence and global outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-tournament transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">University Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h4 className="font-semibold mb-3">Academic Excellence</h4>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• 45+ Institutes across multiple disciplines</li>
                  <li>• 6 Indian cities + 1 international campus (Dubai)</li>
                  <li>• NIRF Rankings: #7 Law, #11 Management</li>
                  <li>• Over 40,000 students from 85+ countries</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Global Philosophy</h4>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• "Vasudhaiva Kutumbakam" - The World is One Family</li>
                  <li>• International collaboration programs</li>
                  <li>• Multi-cultural campus environment</li>
                  <li>• Focus on holistic development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Sports & Badminton Facilities</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The Symbiosis Sports Complex at Hill Top, Lavale, Pune is a state-of-the-art facility designed to host
              international-level competitions with world-class amenities and 5 professional badminton courts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 text-left">
                  <h4 className="font-semibold mb-3">Tournament Facilities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 5 Professional badminton courts</li>
                    <li>• International-standard flooring</li>
                    <li>• Professional lighting systems</li>
                    <li>• Seating capacity: 2,000+ spectators</li>
                    <li>• Live streaming capabilities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-left">
                  <h4 className="font-semibold mb-3">Support Amenities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Modern changing rooms & lockers</li>
                    <li>• Medical support center</li>
                    <li>• Refreshment facilities</li>
                    <li>• Parking for 500+ vehicles</li>
                    <li>• Accessibility features</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-sports text-sports-foreground">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Previous Tournament Success</h4>
                  <p>
                    Symbiosis has successfully hosted over 50 national and international sporting events,
                    including AIU tournaments, making us the ideal venue for this prestigious competition.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Statistics */}
      <TournamentStats />

      {/* Awards & Recognition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Tournament Excellence</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-tournament-card transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Awards & Prizes</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span>Cash prizes up to ₹2,00,000 for winners</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-accent" />
                      <span>Merit scholarships for top performers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-accent" />
                      <span>Professional coaching opportunities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-accent" />
                      <span>International tournament recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-tournament-card transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Media Coverage</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-sports" />
                      <span>Live streaming on multiple platforms</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-sports" />
                      <span>National sports channels coverage</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-sports" />
                      <span>Social media highlights & interviews</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-sports" />
                      <span>Professional photography & documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="bg-sports text-sports-foreground">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to Compete?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join the West Zone Inter-University Women's Badminton Tournament 2025-26.
                    5-day tournament with group stage (4 pools) and knockout rounds featuring 70+ universities.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/register">Register Your Team</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="text-white border-white/80 hover:bg-white/10">
                      <Link to="/contact">Get More Information</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;