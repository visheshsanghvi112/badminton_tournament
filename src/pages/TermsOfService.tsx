import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Terms of Service</h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using the West Zone Inter-University Women's Badminton Tournament platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Tournament Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Eligibility Requirements</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Must be a current student at a recognized university/college</li>
                <li>Must be 18 years of age or older</li>
                <li>Must be enrolled in a West Zone university</li>
                <li>Must meet the tournament's participation criteria</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Registration Process</h4>
              <p className="text-muted-foreground">
                Registration requires providing accurate personal information, university affiliation, and agreeing to these terms. False information may result in disqualification.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Responsibility</h4>
              <p className="text-muted-foreground">
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Types</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Player:</strong> Tournament participants</li>
                <li><strong>Manager:</strong> Team coordinators and officials</li>
                <li><strong>Admin:</strong> Tournament administrators</li>
                <li><strong>Super Admin:</strong> System administrators</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Tournament Rules and Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Sportsmanship</h4>
              <p className="text-muted-foreground">
                All participants must maintain high standards of sportsmanship, fair play, and respect for opponents, officials, and tournament staff.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Code of Conduct</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>No unsportsmanlike behavior or misconduct</li>
                <li>Respect for tournament officials and decisions</li>
                <li>Compliance with all tournament rules and regulations</li>
                <li>Proper care of tournament facilities and equipment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Payment and Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Registration Fees</h4>
              <p className="text-muted-foreground">
                Tournament registration may require payment of fees. All fees are non-refundable except in cases of tournament cancellation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment Methods</h4>
              <p className="text-muted-foreground">
                Payments are processed through secure payment gateways. We do not store payment information on our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All tournament materials, logos, software, and content are protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works without permission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data and Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              User data is handled according to our Privacy Policy. By using our services, you consent to the collection and use of information as outlined in the Privacy Policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The tournament organizers shall not be liable for any indirect, incidental, special, or consequential damages arising from tournament participation or platform use.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Tournament Risks</h4>
              <p className="text-muted-foreground">
                Participants acknowledge that sports activities involve inherent risks. Participants compete at their own risk and are responsible for their own safety.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities. Tournament organizers may disqualify participants for rule violations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Any disputes arising from tournament participation or platform use shall be resolved through arbitration or competent courts as per applicable laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Amendments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes through email or platform notifications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Tournament Administration</p>
              <p className="text-muted-foreground">Symbiosis International University</p>
              <p className="text-muted-foreground">Pune, Maharashtra, India</p>
              <p className="text-muted-foreground">Email: badminton.tournament@symbiosis.ac.in</p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="text-center text-muted-foreground text-sm">
          <p>
            These Terms of Service are effective as of {new Date().toLocaleDateString()} and apply to all users of the West Zone Inter-University Women's Badminton Tournament platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;