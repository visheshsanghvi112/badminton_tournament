import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Trophy, Clock, MapPin, Calendar } from "lucide-react";

const ParticipationGuidelines = () => {
  const eligibleUniversities = [
    "Universities from Gujarat, Maharashtra, Goa, Rajasthan",
    "All affiliated colleges under these state universities", 
    "Central Universities in the West Zone",
    "Deemed Universities with West Zone classification"
  ];

  const participationRules = [
    {
      icon: GraduationCap,
      title: "Student Eligibility",
      details: [
        "Currently enrolled undergraduate/postgraduate students",
        "Valid university ID card mandatory",
        "Age limit: 17-25 years as on tournament date",
        "Medical fitness certificate required"
      ]
    },
    {
      icon: Users,
      title: "Team Composition",
      details: [
        "Maximum 8 players per university team",
        "Minimum 4 players required for participation",
        "1 Coach and 1 Manager per team",
        "Reserve players allowed (max 2)"
      ]
    },
    {
      icon: Trophy,
      title: "Competition Categories",
      details: [
        "Singles (Individual championship)",
        "Doubles (Pair championship)",
        "Team championship (University ranking)",
        "All categories follow BWF rules"
      ]
    },
    {
      icon: Clock,
      title: "Registration Timeline",
      details: [
        "Early Registration: September 1-30, 2025",
        "Regular Registration: October 1-31, 2025",
        "Late Registration: November 1-15, 2025",
        "Registration closes: November 15, 2025"
      ]
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Who Can Participate?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Open to all women students from universities across the West Zone of India
          </p>
        </div>

        {/* Eligible Universities */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Eligible Universities & Regions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eligibleUniversities.map((university, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Badge variant="outline" className="w-full justify-start p-3">
                      {university}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participation Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {participationRules.map((rule, index) => (
            <Card 
              key={index} 
              className="hover:shadow-tournament-card transition-all duration-300 animate-fade-in-up" 
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <rule.icon className="h-5 w-5 text-primary" />
                  <span>{rule.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {rule.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <Card className="bg-primary-soft border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary mb-2">Important Notice</h4>
                  <p className="text-muted-foreground">
                    All participating students must be bona fide students of their respective universities 
                    with valid enrollment. No professional players or external participants allowed. 
                    Tournament follows AIU guidelines and BWF international rules.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParticipationGuidelines;