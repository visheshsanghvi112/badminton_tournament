import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Full name and contact information</li>
                <li>University/college affiliation and student ID</li>
                <li>Date of birth and age verification</li>
                <li>Emergency contact details</li>
                <li>Academic year and course information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tournament Data</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Registration and participation records</li>
                <li>Match results and performance statistics</li>
                <li>Team assignments and rankings</li>
                <li>Medical and fitness declarations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Tournament Operations</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Processing registrations and team assignments</li>
                <li>Managing tournament schedules and fixtures</li>
                <li>Coordinating with university officials</li>
                <li>Emergency contact and medical support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication</h4>
              <p className="text-muted-foreground">
                Sending tournament updates, match notifications, and important announcements via email and platform notifications.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Tournament Partners</h4>
              <p className="text-muted-foreground">
                We may share necessary information with tournament sponsors, medical staff, and university coordinators for operational purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Legal Requirements</h4>
              <p className="text-muted-foreground">
                Information may be disclosed when required by law or to protect the safety and rights of participants and organizers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Encrypted data transmission and storage</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access based on user roles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Retention</h4>
              <p className="text-muted-foreground">
                Tournament data is retained for operational purposes and archived according to university and sports federation requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. User Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Access and Correction</h4>
              <p className="text-muted-foreground">
                Users can access and update their personal information through their account dashboard or by contacting tournament administration.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Portability</h4>
              <p className="text-muted-foreground">
                Users may request a copy of their personal data in a structured, machine-readable format.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We use cookies and similar technologies to enhance user experience, remember preferences, and analyze platform usage for improvements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may use third-party services for authentication (Google OAuth), payment processing, and analytics. These services have their own privacy policies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our services are intended for university students aged 18 and above. We do not knowingly collect personal information from minors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Data may be processed and stored in different countries. We ensure appropriate safeguards are in place for international data transfers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically. Users will be notified of significant changes through email or platform notifications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              For privacy-related questions or to exercise your rights, please contact:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Data Protection Officer</p>
              <p className="text-muted-foreground">Symbiosis International University</p>
              <p className="text-muted-foreground">Pune, Maharashtra, India</p>
              <p className="text-muted-foreground">Email: privacy@symbiosis.ac.in</p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="text-center text-muted-foreground text-sm">
          <p>
            This Privacy Policy is effective as of {new Date().toLocaleDateString()} and applies to all users of the West Zone Inter-University Women's Badminton Tournament platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;