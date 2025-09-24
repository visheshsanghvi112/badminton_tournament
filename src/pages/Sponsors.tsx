import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Crown, Handshake, Users, Award, Download, Mail } from "lucide-react";

const Sponsors = () => {
  const sponsorTiers = [
    {
      tier: "Title Sponsor",
      icon: Crown,
      color: "text-accent",
      benefits: [
        "Exclusive naming rights",
        "Prime logo placement on all materials",
        "VIP hospitality for 50 guests",
        "Opening & closing ceremony presence",
        "Media interview opportunities",
      ],
    },
    {
      tier: "Associate Sponsors",
      icon: Handshake,
      color: "text-primary",
      benefits: [
        "Logo on tournament materials",
        "VIP hospitality for 25 guests",
        "Social media mentions",
        "Award ceremony participation",
        "Networking opportunities",
      ],
    },
    {
      tier: "Partners",
      icon: Users,
      color: "text-sports",
      benefits: [
        "Logo on event banners",
        "VIP hospitality for 10 guests",
        "Certificate of participation",
        "Tournament merchandise",
        "Post-event report inclusion",
      ],
    },
  ];

  const currentSponsors = [
    { name: "Sports Authority of India", tier: "Official Partner", logo: "🏛️" },
    { name: "Yonex India", tier: "Equipment Partner", logo: "🏸" },
    { name: "Times Sports", tier: "Media Partner", logo: "📺" },
    { name: "Tata Consultancy Services", tier: "Technology Partner", logo: "💻" },
    { name: "Indian Oil Corporation", tier: "Associate Sponsor", logo: "⛽" },
    { name: "HDFC Bank", tier: "Banking Partner", logo: "🏦" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tournament Sponsors
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Join prestigious organizations in supporting the future of women's badminton.
            Partner with excellence, tradition, and sporting spirit.
          </p>
        </div>
      </section>

      {/* Current Sponsors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Valued Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {currentSponsors.map((sponsor, index) => (
              <Card key={index} className="text-center hover:shadow-tournament-card transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>{sponsor.logo}</div>
                  <h4 className="font-semibold text-sm mb-1">{sponsor.name}</h4>
                  <p className="text-xs text-muted-foreground">{sponsor.tier}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sponsorship Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of India's premier inter-university women's badminton tournament.
              Multiple partnership levels available to suit your organization's goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsorTiers.map((tier, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`h-2 w-full ${tier.color === 'text-accent' ? 'bg-accent' : tier.color === 'text-primary' ? 'bg-primary' : 'bg-sports'}`} />
                <CardHeader className="text-center pb-4">
                  <tier.icon className={`h-12 w-12 mx-auto mb-3 ${tier.color}`} />
                  <CardTitle className="text-xl">{tier.tier}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-2">
                        <Award className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Partner With Us?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-primary">Prestigious Association</h4>
                  <p className="text-muted-foreground">
                    Associate your brand with Symbiosis International's A++ NAAC rating and
                    top NIRF rankings. Gain credibility through our institutional excellence.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-primary">Targeted Audience</h4>
                  <p className="text-muted-foreground">
                    Reach 1,000+ elite athletes, university officials, and sports enthusiasts.
                    Perfect for brands targeting youth and sports demographics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-primary">Media Coverage</h4>
                  <p className="text-muted-foreground">
                    Extensive coverage across digital platforms, sports media, and university
                    networks. Amplify your brand message to a wider audience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-primary">CSR Alignment</h4>
                  <p className="text-muted-foreground">
                    Support women's empowerment in sports while fulfilling your corporate
                    social responsibility objectives. Meaningful community impact.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ROI Statistics */}
            <Card className="bg-gradient-card border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-center mb-6">Expected Reach & Impact</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">1,000+</div>
                    <div className="text-sm text-muted-foreground">Direct Athletes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5,000+</div>
                    <div className="text-sm text-muted-foreground">On-site Visitors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Digital Reach</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">200+</div>
                    <div className="text-sm text-muted-foreground">Universities</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Become a Tournament Sponsor</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Partner with us to create an unforgettable sporting experience while
            gaining valuable brand exposure and community goodwill.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Button size="lg" variant="secondary">
              <Download className="h-5 w-5 mr-2" />
              Download Sponsorship Deck
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Contact Organizers
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;