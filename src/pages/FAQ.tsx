import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, FileText, Users, Calendar, Award } from "lucide-react";

const FAQ = () => {
  const faqSections = [
    {
      title: "Account & Authentication",
      icon: Users,
      items: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Register' from the homepage and fill in your details including name, email, university, and role (Player/Manager). You'll receive a verification email to complete your registration."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click 'Forgot Password' on the login page and enter your registered email address. You'll receive a password reset link via email. The link expires in 24 hours for security."
        },
        {
          question: "Can I sign in with Google?",
          answer: "Yes, you can use Google Sign-In for faster access. Click the 'Continue with Google' button on the login page. Your Google account will be linked to your tournament profile."
        },
        {
          question: "Why can't I log in to my account?",
          answer: "Common login issues include: incorrect email/password, unverified email address, or account suspension. Check your email for verification links and ensure you're using the correct credentials."
        },
        {
          question: "How do I verify my email address?",
          answer: "After registration, check your email inbox for a verification link from our system. Click the link to verify your account. Check spam/junk folder if you don't see it within 5 minutes."
        },
        {
          question: "Can I change my registered email address?",
          answer: "Email changes require verification. Contact support with your current email and the new email address you want to use. We'll guide you through the secure update process."
        },
        {
          question: "What should I do if I get locked out of my account?",
          answer: "If you're locked out due to multiple failed login attempts, wait 30 minutes before trying again. For other lockout issues, contact support with your registered email and details."
        },
        {
          question: "How do I update my profile information?",
          answer: "After logging in, go to your profile settings where you can update personal information, university details, and contact preferences. Some changes may require re-verification."
        }
      ]
    },
    {
      title: "Registration & Eligibility",
      icon: FileText,
      items: [
        {
          question: "Who is eligible to participate in the tournament?",
          answer: "Female students currently enrolled in recognized universities within the West Zone of India are eligible. Players must have a valid university enrollment certificate and meet AIU eligibility criteria."
        },
        {
          question: "Can players submit documents other than AIU DOB certificate?",
          answer: "Yes, valid alternatives like Passport, School Leaving Certificate, PAN Card, and Aadhar Card are accepted as proof of date of birth. All documents must be original or attested copies."
        },
        {
          question: "When does registration open and close?",
          answer: "Registration opens in October 2025 and closes by February 2025. Early bird registration may be available with discounted fees. Check the official announcements for exact dates."
        },
        {
          question: "What is the registration fee?",
          answer: "Registration fees will be announced along with the official registration opening. Fee structure typically includes tournament entry, accommodation (if opted), and meal packages."
        },
        {
          question: "How many players can each university register?",
          answer: "Each university can register a maximum of 8 players for singles events and form up to 4 doubles pairs. Team managers and coaches can also be registered separately."
        }
      ]
    },
    {
      title: "Travel & Accommodation",
      icon: Calendar,
      items: [
        {
          question: "Is accommodation provided for participants?",
          answer: "Yes, accommodation arrangements are made for outstation participants. Universities can opt for on-campus hostels or partnered hotels. Accommodation must be booked during registration."
        },
        {
          question: "How do I reach Symbiosis Sports Complex?",
          answer: "The venue is well-connected by road, rail, and air. Pune airport is 45 minutes away, railway station is 30 minutes, and local transportation is readily available. Detailed directions will be shared with registered teams."
        },
        {
          question: "Are meals provided during the tournament?",
          answer: "Breakfast, lunch, and dinner are provided for participants who opt for the meal package during registration. Special dietary requirements can be accommodated with advance notice."
        },
        {
          question: "What about local transportation?",
          answer: "Shuttle services are provided between accommodation venues and the sports complex during tournament days. Local transportation arrangements can also be made upon request."
        }
      ]
    },
    {
      title: "Tournament Rules",
      icon: Award,
      items: [
        {
          question: "What are the tournament formats?",
          answer: "The tournament follows BWF (Badminton World Federation) rules with singles and doubles events. Matches are best of 3 games, with each game played to 21 points (rally point system)."
        },
        {
          question: "What equipment is allowed?",
          answer: "Only BWF-approved shuttlecocks will be used. Players may use their own rackets but must comply with BWF specifications. Sports attire must be appropriate and modest."
        },
        {
          question: "Are there any age restrictions?",
          answer: "Players must be between 18-25 years of age as per AIU guidelines. Age verification is mandatory during registration with valid documents."
        },
        {
          question: "What happens in case of injury during matches?",
          answer: "Medical support is available at the venue. Injured players can take medical timeouts as per BWF rules. Serious injuries may result in match forfeit for player safety."
        },
        {
          question: "Is there a dress code for participants?",
          answer: "Yes, players must wear appropriate sports attire. Sleeveless tops, shorts, or skirts must be of appropriate length. Team uniforms are encouraged but not mandatory."
        }
      ]
    },
    {
      title: "Contact & Support",
      icon: HelpCircle,
      items: [
        {
          question: "Who should I contact for registration issues?",
          answer: "For registration queries, contact the Tournament Director at tournament@symbiosis.ac.in or call the helpdesk at +91 20 2528 1000 during office hours (9 AM - 6 PM)."
        },
        {
          question: "Is there on-site support during the tournament?",
          answer: "Yes, a dedicated help desk will be operational throughout the tournament. Technical officials, medical support, and administrative assistance will be available on-site."
        },
        {
          question: "How can I get updates about the tournament?",
          answer: "Official updates are shared via the tournament website, registered email addresses, and social media channels. Team managers receive direct communications."
        },
        {
          question: "What if I need to cancel my registration?",
          answer: "Cancellation policies and refund procedures will be clearly outlined during registration. Generally, cancellations made 30 days before the tournament are eligible for partial refunds."
        }
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Find answers to common questions about registration, rules, accommodation, 
            and everything you need to know about the tournament.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {faqSections.map((section, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  const element = document.getElementById(`section-${index}`);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} id={`section-${sectionIndex}`} className="mb-12 animate-fade-in-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg animate-scale-in" style={{ animationDelay: `${sectionIndex * 0.15}s` }}>
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{section.title}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`${sectionIndex}-${itemIndex}`}
                    className="border border-border rounded-lg"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-t-lg">
                      <span className="font-medium">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Team Managers</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dedicated support for university team managers and coaches.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download detailed guidelines and registration forms.
                  </p>
                  <Button variant="outline" size="sm">
                    Download Forms
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant support during registration period.
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Couldn't Find Your Answer?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our dedicated support team is here to help with any specific questions 
            about the tournament, registration, or participation requirements.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Call +91 20 2528 1000
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;