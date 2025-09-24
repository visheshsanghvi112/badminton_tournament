import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Globe, Award, Clock, Target } from "lucide-react";

const TournamentStats = () => {
  const stats = [
    {
      icon: Users,
      number: "70+",
      label: "Participating Universities",
      description: "From across the West Zone"
    },
    {
      icon: Trophy,
      number: "500+",
      label: "Participants & Officials",
      description: "Players, coaches & officials"
    },
    {
      icon: Globe,
      number: "5",
      label: "States Represented",
      description: "Maharashtra, Gujarat, Goa, Rajasthan, MP"
    },
    {
      icon: Award,
      number: "5",
      label: "Badminton Courts",
      description: "Professional tournament setup"
    },
    {
      icon: Clock,
      number: "5",
      label: "Tournament Days",
      description: "December 26-29, 2025"
    },
    {
      icon: Target,
      number: "₹50L+",
      label: "Prize Pool",
      description: "Scholarships and rewards"
    }
  ];

  return (
    <section className="py-16 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Tournament by Numbers</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            West Zone Inter-University Women's Badminton Tournament 2025-26 hosted at Hill Top, Lavale, Pune
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm opacity-80">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Card className="bg-white/10 border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Tournament Legacy</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Since its inception, this tournament has been the stepping stone for many national and 
                international badminton champions. Our alumni have represented India in Olympics, 
                Commonwealth Games, and World Championships, making this tournament a true breeding 
                ground for badminton excellence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TournamentStats;