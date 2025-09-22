import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
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
              <p className="text-muted-foreground">
                When you register for our tournament, we collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Name and email address</li>
                <li>University/College affiliation</li>
                <li>Phone number (optional)</li>
                <li>Team assignment information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tournament Data</h4>
              <p className="text-muted-foreground">
                We collect information related to tournament participation:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Match results and statistics</li>
                <li>Payment information and status</li>
                <li>Team and player assignments</li>
                <li>Performance metrics</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>To manage tournament registration and participation</li>
              <li>To organize teams and matches</li>
              <li>To process payments and maintain financial records</li>
              <li>To communicate important tournament updates</li>
              <li>To generate tournament statistics and reports</li>
              <li>To improve our services and user experience</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
            </p>
            <div>
              <h4 className="font-semibold mb-2">Tournament Officials</h4>
              <p className="text-muted-foreground">
                Authorized tournament administrators and officials may access participant data for operational purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Legal Requirements</h4>
              <p className="text-muted-foreground">
                We may disclose information if required by law or to protect the safety and rights of participants.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Aggregated Data</h4>
              <p className="text-muted-foreground">
                We may share anonymized, aggregated statistics for tournament analysis and reporting.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Firebase Authentication for secure user management</li>
              <li>Firestore Security Rules for data access control</li>
              <li>Encrypted data transmission using HTTPS</li>
              <li>Role-based access control system</li>
              <li>Regular security audits and updates</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal information for the duration necessary to provide our services and comply with legal obligations. Tournament data may be retained for historical and statistical purposes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website uses cookies and similar technologies for authentication, user preferences, and analytics. You can control cookie settings through your browser preferences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We use Firebase (Google) for authentication and data storage. Please review Google's Privacy Policy for information about how they handle your data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our services are intended for university students aged 18 and above. We do not knowingly collect personal information from children under 18.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify users of any material changes through email or prominent notice on our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
            This Privacy Policy is effective as of {new Date().toLocaleDateString()} and applies to all users of the West Zone Inter-University Women's Badminton Tournament platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;