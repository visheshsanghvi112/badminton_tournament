import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUPER_ADMIN_EMAIL, isSuperAdminEmail } from '@/lib/superAdminSetup';
import { UserService } from '@/lib/firestore';

const UserDebugger = () => {
  const { user } = useAuth();
  const [firestoreUser, setFirestoreUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkFirestoreUser = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const firestoreUserData = await UserService.getUser(user.id);
      setFirestoreUser(firestoreUserData);
    } catch (error) {
      console.error('Error fetching Firestore user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkFirestoreUser();
    }
  }, [user]);

  const isEmailSuperAdmin = user ? isSuperAdminEmail(user.email) : false;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔧 User Debug Information
          </CardTitle>
          <CardDescription>
            Debug information for Super Admin setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current User Info */}
          <div className="space-y-2">
            <h3 className="font-semibold">Current User (Auth Context)</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p><strong>Email:</strong> {user?.email || 'Not logged in'}</p>
              <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>Role:</strong> 
                <Badge 
                  variant={user?.role === 'superAdmin' ? 'default' : 'secondary'}
                  className={user?.role === 'superAdmin' ? 'bg-purple-600 ml-2' : 'ml-2'}
                >
                  {user?.role || 'N/A'}
                </Badge>
              </p>
              <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            </div>
          </div>

          {/* Super Admin Email Check */}
          <div className="space-y-2">
            <h3 className="font-semibold">Super Admin Email Check</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p><strong>Configured Super Admin Email:</strong> {SUPER_ADMIN_EMAIL}</p>
              <p><strong>Your Email Matches:</strong> 
                <Badge 
                  variant={isEmailSuperAdmin ? 'default' : 'destructive'}
                  className={isEmailSuperAdmin ? 'bg-green-600 ml-2' : 'ml-2'}
                >
                  {isEmailSuperAdmin ? 'YES' : 'NO'}
                </Badge>
              </p>
            </div>
          </div>

          {/* Firestore User Data */}
          <div className="space-y-2">
            <h3 className="font-semibold">Firestore User Data</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              {loading ? (
                <p>Loading Firestore data...</p>
              ) : firestoreUser ? (
                <div>
                  <p><strong>Email:</strong> {firestoreUser.email}</p>
                  <p><strong>Name:</strong> {firestoreUser.name}</p>
                  <p><strong>Role:</strong> 
                    <Badge 
                      variant={firestoreUser.role === 'superAdmin' ? 'default' : 'secondary'}
                      className={firestoreUser.role === 'superAdmin' ? 'bg-purple-600 ml-2' : 'ml-2'}
                    >
                      {firestoreUser.role}
                    </Badge>
                  </p>
                  <p><strong>Created:</strong> {firestoreUser.createdAt?.toDate?.()?.toLocaleString() || 'N/A'}</p>
                  <p><strong>Updated:</strong> {firestoreUser.updatedAt?.toDate?.()?.toLocaleString() || 'N/A'}</p>
                </div>
              ) : (
                <p>No Firestore data found</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <h3 className="font-semibold">Actions</h3>
            <div className="flex gap-2">
              <Button onClick={checkFirestoreUser} disabled={loading}>
                Refresh Firestore Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('Auth User:', user);
                  console.log('Firestore User:', firestoreUser);
                  console.log('Is Super Admin Email:', isEmailSuperAdmin);
                }}
              >
                Log to Console
              </Button>
            </div>
          </div>

          {/* Status Summary */}
          <div className="space-y-2">
            <h3 className="font-semibold">Status Summary</h3>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              {user?.role === 'superAdmin' ? (
                <p className="text-green-700">
                  ✅ <strong>Success!</strong> You are correctly set up as Super Admin.
                </p>
              ) : isEmailSuperAdmin ? (
                <p className="text-orange-700">
                  ⚠️ <strong>Issue:</strong> Your email matches Super Admin email, but your role is "{user?.role}". 
                  Try logging out and logging back in.
                </p>
              ) : (
                <p className="text-red-700">
                  ❌ <strong>Problem:</strong> Your email doesn't match the configured Super Admin email.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDebugger;
