# Super Admin Setup Guide

## Overview
Your email `visheshsanghvi112@gmail.com` has been configured as the Super Admin for the tournament system.

## Client-Side Setup (Already Implemented)

✅ **Automatic Detection**: The system will automatically detect when you sign in with your email and assign Super Admin privileges.

✅ **Role Assignment**: When you first sign in, your user document in Firestore will be automatically updated with `role: 'superAdmin'`.

✅ **Dashboard Access**: You'll automatically see the Super Admin Dashboard with full system management capabilities.

## Server-Side Setup (Required for Production)

For production deployment, you'll need to set up Firebase Custom Claims using the Firebase Admin SDK. Here's how:

### 1. Firebase Admin SDK Setup

Create a server-side function (Node.js/Express) to set custom claims:

```javascript
// server/functions/setSuperAdmin.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setSuperAdminClaims(userEmail) {
  try {
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(userEmail);
    
    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      superAdmin: true,
      admin: true,
      manager: true,
      player: true
    });
    
    console.log(`Super Admin claims set for ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error setting Super Admin claims:', error);
    return false;
  }
}

// Call this function with your email
setSuperAdminClaims('visheshsanghvi112@gmail.com');
```

### 2. Firebase Functions (Alternative)

Create a Firebase Cloud Function:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.setSuperAdmin = functions.https.onCall(async (data, context) => {
  // Verify the caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }
  
  const { userEmail } = data;
  
  try {
    const userRecord = await admin.auth().getUserByEmail(userEmail);
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      superAdmin: true,
      admin: true,
      manager: true,
      player: true
    });
    
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

### 3. Updated Security Rules (For Custom Claims)

Update your Firestore rules to use custom claims:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSuperAdmin() {
      return request.auth != null && 
        (request.auth.token.superAdmin == true || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superAdmin');
    }
    
    // ... rest of your rules using isSuperAdmin()
  }
}
```

## Testing the Setup

1. **Sign In**: Use your email `visheshsanghvi112@gmail.com` to sign in
2. **Check Role**: You should automatically be assigned the Super Admin role
3. **Access Dashboard**: Navigate to `/dashboard` - you should see the Super Admin Dashboard
4. **Verify Permissions**: You should be able to:
   - View all users, teams, and payments
   - Create admin accounts
   - Access all system statistics

## Super Admin Capabilities

Once set up, you'll have access to:

- **Full User Management**: View all users across all roles
- **Admin Creation**: Create new admin accounts (requires server-side implementation)
- **Team Management**: View and manage all teams
- **Payment Monitoring**: View all payment transactions and status
- **System Statistics**: Access to comprehensive system analytics
- **Data Migration**: Run migration scripts for system updates

## Troubleshooting

If you don't see Super Admin privileges:

1. **Check Email**: Ensure you're signing in with `visheshsanghvi112@gmail.com`
2. **Clear Cache**: Clear browser cache and localStorage
3. **Check Console**: Look for any error messages in the browser console
4. **Verify Firestore**: Check that your user document in Firestore has `role: 'superAdmin'`

## Security Notes

- Your email is hardcoded in the client-side code for convenience during development
- For production, implement proper Firebase Custom Claims using the Admin SDK
- Consider implementing additional security measures like 2FA for Super Admin accounts
- Regularly audit Super Admin access and activities

## Next Steps

1. Sign in with your email to test the Super Admin functionality
2. Set up the server-side Firebase Admin SDK for production
3. Implement the admin creation functionality
4. Test all Super Admin features and permissions
