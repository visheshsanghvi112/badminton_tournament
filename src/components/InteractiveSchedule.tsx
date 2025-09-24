import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Trophy, Users, Play } from "lucide-react";

const InteractiveSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("day1");

  const scheduleData = {
    day1: {
      date: "December 26, 2025",
      title: "Opening Day - Preliminaries",
      events: [
        {
          time: "09:00 AM",
          event: "Registration & Check-in",
          venue: "Main Reception",
          type: "registration",
          description: "Team registration, document verification, and welcome kit distribution"
        },
        {
          time: "10:30 AM",
          event: "Opening Ceremony",
          venue: "Main Arena",
          type: "ceremony",
          description: "Welcome address, torch lighting, and team parade"
        },
        {
          time: "12:00 PM",
          event: "Singles Preliminaries Round 1",
          venue: "Courts 1-4",
          type: "match",
          description: "First round matches for singles category"
        },
        {
          time: "02:00 PM",
          event: "Doubles Preliminaries Round 1",
          venue: "Courts 5-8",
          type: "match",
          description: "First round matches for doubles category"
        },
        {
          time: "04:00 PM",
          event: "Team Event Preliminaries",
          venue: "All Courts",
          type: "match",
          description: "University team matches begin"
        }
      ]
    },
    day2: {
      date: "December 27, 2025",
      title: "Quarter Finals Day",
      events: [
        {
          time: "09:00 AM",
          event: "Singles Quarter Finals",
          venue: "Courts 1-4",
          type: "match",
          description: "Top 8 players compete for semi-final spots"
        },
        {
          time: "11:30 AM",
          event: "Doubles Quarter Finals",
          venue: "Courts 5-8",
          type: "match",
          description: "Top 8 pairs compete for semi-final spots"
        },
        {
          time: "02:00 PM",
          event: "Team Quarter Finals",
          venue: "All Courts",
          type: "match",
          description: "University teams battle for top 4 positions"
        },
        {
          time: "05:00 PM",
          event: "Cultural Evening",
          venue: "Auditorium",
          type: "ceremony",
          description: "Cultural performances by participating universities"
        }
      ]
    },
    day3: {
      date: "December 28, 2025",
      title: "Semi Finals Day",
      events: [
        {
          time: "10:00 AM",
          event: "Singles Semi Finals",
          venue: "Center Court",
          type: "match",
          description: "Top 4 players compete for final berths"
        },
        {
          time: "12:30 PM",
          event: "Doubles Semi Finals",
          venue: "Center Court",
          type: "match",
          description: "Top 4 pairs compete for final berths"
        },
        {
          time: "03:00 PM",
          event: "Team Semi Finals",
          venue: "Courts 1-4",
          type: "match",
          description: "Top 4 university teams compete"
        },
        {
          time: "06:00 PM",
          event: "Gala Dinner",
          venue: "Banquet Hall",
          type: "ceremony",
          description: "Networking dinner for all participants"
        }
      ]
    },
    day4: {
      date: "December 29, 2025",
      title: "Finals Day - Grand Finale",
      events: [
        {
          time: "10:00 AM",
          event: "3rd Place Playoffs",
          venue: "Center Court",
          type: "match",
          description: "Bronze medal matches for all categories"
        },
        {
          time: "02:00 PM",
          event: "Singles Final",
          venue: "Center Court",
          type: "match",
          description: "Championship match for singles title"
        },
        {
          time: "03:30 PM",
          event: "Doubles Final",
          venue: "Center Court",
          type: "match",
          description: "Championship match for doubles title"
        },
        {
          time: "05:00 PM",
          event: "Team Final",
          venue: "Center Court",
          type: "match",
          description: "University championship final"
        },
        {
          time: "07:00 PM",
          event: "Closing Ceremony & Prize Distribution",
          venue: "Main Arena",
          type: "ceremony",
          description: "Awards ceremony and tournament conclusion"
        }
      ]
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "match":
        return "bg-sports text-sports-foreground";
      case "ceremony":
        return "bg-accent text-accent-foreground";
      case "registration":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "match":
        return <Play className="h-4 w-4" />;
      case "ceremony":
        return <Trophy className="h-4 w-4" />;
      case "registration":
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Tournament Schedule</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Interactive 4-day tournament schedule with all events and timings
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="day1" className="text-sm">Day 1</TabsTrigger>
              <TabsTrigger value="day2" className="text-sm">Day 2</TabsTrigger>
              <TabsTrigger value="day3" className="text-sm">Day 3</TabsTrigger>
              <TabsTrigger value="day4" className="text-sm">Day 4</TabsTrigger>
            </TabsList>

            {Object.entries(scheduleData).map(([day, data]) => (
              <TabsContent key={day} value={day} className="animate-fade-in">
                <Card className="mb-6">
                  <CardHeader className="bg-gradient-hero text-primary-foreground">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <div className="text-lg">{data.title}</div>
                        <div className="text-sm opacity-90">{data.date}</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>

                <div className="grid gap-4">
                  {data.events.map((event, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-tournament-card transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={getEventTypeColor(event.type)}>
                                {getEventIcon(event.type)}
                                <span className="ml-1 capitalize">{event.type}</span>
                              </Badge>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-lg mb-1">{event.event}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{event.description}</p>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                          {event.type === "match" && (
                            <div className="md:ml-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Quick Schedule Overview */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Card className="bg-primary-soft border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Tournament Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Athletes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Courts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSchedule;