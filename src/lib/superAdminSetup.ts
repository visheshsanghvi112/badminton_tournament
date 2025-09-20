import { auth, db } from './firebase';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { authLogger } from './logger';

// Super Admin configuration
export const SUPER_ADMIN_EMAIL = 'visheshsanghvi112@gmail.com';

/**
 * Check if the current user should be a Super Admin based on email
 * This is a client-side check and should be used in conjunction with
 * proper Firebase Admin SDK setup on the server
 */
export const isSuperAdminEmail = (email: string): boolean => {
  return email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
};

/**
 * Initialize Super Admin user data in Firestore
 * This should be called when a Super Admin user first signs in
 */
export const initializeSuperAdmin = async (user: any): Promise<boolean> => {
  try {
    if (!isSuperAdminEmail(user.email)) {
      return false;
    }

    authLogger.info('Initializing Super Admin user', { email: user.email });

    // Create or update user document with Super Admin role
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Update existing user to Super Admin
      await updateDoc(userRef, {
        role: 'superAdmin',
        updatedAt: new Date().toISOString()
      });
      authLogger.info('Updated existing user to Super Admin', { uid: user.uid });
    } else {
      // Create new Super Admin user
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        role: 'superAdmin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      authLogger.info('Created new Super Admin user', { uid: user.uid });
    }

    return true;
  } catch (error: any) {
    authLogger.error('Error initializing Super Admin', { 
      email: user.email, 
      error: error.message 
    });
    return false;
  }
};

/**
 * Check if current user is Super Admin
 */
export const checkSuperAdminStatus = async (user: any): Promise<boolean> => {
  try {
    if (!user || !isSuperAdminEmail(user.email)) {
      return false;
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === 'superAdmin';
    }

    return false;
  } catch (error: any) {
    authLogger.error('Error checking Super Admin status', { 
      email: user.email, 
      error: error.message 
    });
    return false;
  }
};
