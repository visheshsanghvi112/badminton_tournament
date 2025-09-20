import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, User, Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Check if the user was trying to access a role-based route
  const isRoleBasedRoute = ['/admin', '/manager', '/player', '/super-admin'].includes(location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">404</span>
            </div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-base">
              {isRoleBasedRoute ? (
                <>
                  The page <code className="bg-gray-100 px-2 py-1 rounded text-sm">{location.pathname}</code> doesn't exist.
                  <br />
                  <span className="text-sm text-muted-foreground mt-2 block">
                    Role-based access is handled through the main dashboard.
                  </span>
                </>
              ) : (
                <>
                  The page you're looking for doesn't exist or has been moved.
                  <br />
                  <span className="text-sm text-muted-foreground mt-2 block">
                    Path: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
                  </span>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link to="/dashboard" className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
            
            {isRoleBasedRoute && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Role-Based Access</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      All role-based dashboards are accessed through the main dashboard. 
                      Your permissions will determine which features you can access.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
