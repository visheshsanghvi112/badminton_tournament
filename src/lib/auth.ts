import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

export interface User {
  id: string;
  role: 'superAdmin' | 'admin' | 'manager' | 'player';
  name: string;
  universityId?: string;
  email: string;
  phone?: string;
  firebaseUid?: string;
  teamId?: string; // For managers and players
  customClaims?: {
    superAdmin?: boolean;
    admin?: boolean;
    manager?: boolean;
  };
}

export interface AuthToken {
  token: string;
  user: User;
  expiresAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'manager' | 'player';
  name: string;
  universityId?: string;
  phone?: string;
  teamId?: string; // For managers and players
  createdAt: string;
  updatedAt: string;
}

export const ROLES = {
  SUPER_ADMIN: 'superAdmin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  PLAYER: 'player'
} as const;

// Role hierarchy for access control
export const ROLE_HIERARCHY = {
  [ROLES.SUPER_ADMIN]: 4,
  [ROLES.ADMIN]: 3,
  [ROLES.MANAGER]: 2,
  [ROLES.PLAYER]: 1
} as const;

// Check if user has sufficient role level
export const hasRoleLevel = (userRole: string, requiredRole: string): boolean => {
  const userLevel = ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY] || 0;
  return userLevel >= requiredLevel;
};
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { authLogger } from './logger';
import { isSuperAdminEmail, initializeSuperAdmin } from './superAdminSetup';

const AUTH_STORAGE_KEY = 'tournament_auth';

export class AuthService {
  static getStoredAuth(): AuthToken | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;

      const auth = JSON.parse(stored);

      // Check if token is expired
      if (new Date(auth.expiresAt) < new Date()) {
        this.clearAuth();
        return null;
      }

      return auth;
    } catch {
      return null;
    }
  }

  static setAuth(auth: AuthToken): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  }

  static clearAuth(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  static isAuthenticated(): boolean {
    return this.getStoredAuth() !== null;
  }

  static getCurrentUser(): User | null {
    const auth = this.getStoredAuth();
    return auth?.user || null;
  }

  static hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  static hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  static hasRoleLevel(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user ? hasRoleLevel(user.role, requiredRole) : false;
  }

  static isSuperAdmin(): boolean {
    return this.hasRole(ROLES.SUPER_ADMIN);
  }

  static isAdmin(): boolean {
    return this.hasRole(ROLES.ADMIN);
  }

  static isManager(): boolean {
    return this.hasRole(ROLES.MANAGER);
  }

  static isPlayer(): boolean {
    return this.hasRole(ROLES.PLAYER);
  }

  static canManageAdmins(): boolean {
    return this.isSuperAdmin();
  }

  static canViewAllPlayers(): boolean {
    return this.isSuperAdmin() || this.isAdmin();
  }

  static canManageTeam(): boolean {
    return this.isSuperAdmin() || this.isAdmin() || this.isManager();
  }

  // Firebase Authentication Methods
  static async signInWithEmail(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      authLogger.info('Attempting email sign in', { email });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user profile from Firestore
      const userProfile = await this.getUserProfile(firebaseUser.uid);

      if (!userProfile) {
        authLogger.error('User profile not found after sign in', { uid: firebaseUser.uid });
        return { success: false, error: 'Account setup incomplete. Please contact support.' };
      }

      const user: User = {
        id: userProfile.uid,
        firebaseUid: firebaseUser.uid,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role,
        universityId: userProfile.universityId,
        phone: userProfile.phone
      };

      // Create auth token
      const authToken: AuthToken = {
        token: await firebaseUser.getIdToken(),
        user,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      this.setAuth(authToken);
      authLogger.info('Email sign in successful', { userId: user.id, role: user.role });
      return { success: true, user };
    } catch (error: any) {
      authLogger.error('Email sign in failed', { email, error: error.message, code: error.code });
      
      let userFriendlyError = 'Sign in failed. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          userFriendlyError = 'No account found with this email address. Please check your email or create a new account.';
          break;
        case 'auth/wrong-password':
          userFriendlyError = 'Incorrect password. Please check your password and try again.';
          break;
        case 'auth/invalid-email':
          userFriendlyError = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          userFriendlyError = 'This account has been disabled. Please contact support for assistance.';
          break;
        case 'auth/too-many-requests':
          userFriendlyError = 'Too many failed attempts. Please wait a few minutes before trying again.';
          break;
        case 'auth/network-request-failed':
          userFriendlyError = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/invalid-credential':
          userFriendlyError = 'Invalid email or password. Please check your credentials and try again.';
          break;
        default:
          userFriendlyError = 'Sign in failed. Please check your credentials and try again.';
      }
      
      return { success: false, error: userFriendlyError };
    }
  }

  static async signUpWithEmail(
    email: string,
    password: string,
    userData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      authLogger.info('Attempting email sign up', { email, role: userData.role });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user profile in Firestore (filter out undefined values)
      const userProfile: any = {
        uid: firebaseUser.uid,
        email: userData.email,
        name: userData.name,
        role: isSuperAdminEmail(userData.email) ? 'superAdmin' : userData.role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Only add optional fields if they have values
      if (userData.universityId) {
        userProfile.universityId = userData.universityId;
      }
      if (userData.phone) {
        userProfile.phone = userData.phone;
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);

      const user: User = {
        id: firebaseUser.uid,
        firebaseUid: firebaseUser.uid,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role,
        universityId: userProfile.universityId,
        phone: userProfile.phone
      };

      // Create auth token
      const authToken: AuthToken = {
        token: await firebaseUser.getIdToken(),
        user,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      this.setAuth(authToken);
      authLogger.info('Email sign up successful', { userId: user.id, role: user.role });
      return { success: true, user };
    } catch (error: any) {
      authLogger.error('Email sign up failed', { email, error: error.message, code: error.code });
      
      let userFriendlyError = 'Account creation failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          userFriendlyError = 'An account with this email already exists. Please sign in instead or use a different email.';
          break;
        case 'auth/invalid-email':
          userFriendlyError = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          userFriendlyError = 'Password is too weak. Please use at least 6 characters with a mix of letters and numbers.';
          break;
        case 'auth/operation-not-allowed':
          userFriendlyError = 'Email registration is currently disabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          userFriendlyError = 'Network error. Please check your internet connection and try again.';
          break;
        default:
          userFriendlyError = 'Account creation failed. Please check your information and try again.';
      }
      
      return { success: false, error: userFriendlyError };
    }
  }

  static async signOutUser(): Promise<void> {
    try {
      authLogger.info('Signing out user');
      await signOut(auth);
      this.clearAuth();
      authLogger.info('User signed out successfully');
    } catch (error: any) {
      authLogger.error('Sign out failed', { error: error.message });
      this.clearAuth(); // Clear local auth even if Firebase signout fails
    }
  }

  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      authLogger.warn('User profile not found', { uid });
      return null;
    } catch (error: any) {
      authLogger.error('Error getting user profile', { uid, error: error.message, code: error.code });

      // If it's a permissions error, we might need to set up Firestore rules
      if (error.code === 'permission-denied') {
        authLogger.warn('Firestore permission denied. Please set up security rules in Firebase Console.');
      }
      return null;
    }
  }

  static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      authLogger.info('Updating user profile', { uid, updates });
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      authLogger.info('User profile updated successfully', { uid });
      return true;
    } catch (error: any) {
      authLogger.error('Error updating user profile', { uid, error: error.message, code: error.code });
      return false;
    }
  }

  static async signInWithGoogle(): Promise<{ success: boolean; user?: User; error?: string; isNewUser?: boolean }> {
    try {
      authLogger.info('Attempting Google sign in');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Check if user profile exists
      let userProfile = await this.getUserProfile(firebaseUser.uid);
      let isNewUser = false;

      if (!userProfile) {
        // Create new user profile for Google sign-in
        isNewUser = true;
        authLogger.info('Creating new user profile for Google sign in', {
          uid: firebaseUser.uid,
          email: firebaseUser.email
        });
        userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Google User',
          role: 'player', // Default role for Google sign-in
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);
      }

      const user: User = {
        id: userProfile.uid,
        firebaseUid: firebaseUser.uid,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role,
        universityId: userProfile.universityId,
        phone: userProfile.phone
      };

      // Create auth token
      const authToken: AuthToken = {
        token: await firebaseUser.getIdToken(),
        user,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      this.setAuth(authToken);
      authLogger.info('Google sign in successful', {
        userId: user.id,
        role: user.role,
        isNewUser
      });
      return { success: true, user, isNewUser };
    } catch (error: any) {
      authLogger.error('Google sign in failed', { error: error.message, code: error.code });
      
      let userFriendlyError = 'Google sign-in failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          userFriendlyError = 'Sign-in was cancelled. Please try again if you want to continue.';
          break;
        case 'auth/popup-blocked':
          userFriendlyError = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
          break;
        case 'auth/cancelled-popup-request':
          userFriendlyError = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/network-request-failed':
          userFriendlyError = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/too-many-requests':
          userFriendlyError = 'Too many requests. Please wait a moment and try again.';
          break;
        case 'auth/user-disabled':
          userFriendlyError = 'This Google account has been disabled. Please contact support.';
          break;
        default:
          userFriendlyError = 'Google sign-in failed. Please try again or use email sign-in instead.';
      }
      
      return { success: false, error: userFriendlyError };
    }
  }

  static async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      authLogger.info('Sending password reset email', { email });
      await sendPasswordResetEmail(auth, email);
      authLogger.info('Password reset email sent successfully', { email });
      return { success: true };
    } catch (error: any) {
      authLogger.error('Password reset failed', {
        email,
        error: error.message,
        code: error.code
      });

      let errorMessage = 'Failed to send password reset email.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 'auth/missing-continue-uri':
          errorMessage = 'Missing continue URL. Please check Firebase configuration.';
          break;
        case 'auth/invalid-continue-uri':
          errorMessage = 'Invalid continue URL. Please check Firebase configuration.';
          break;
        case 'auth/unauthorized-continue-uri':
          errorMessage = 'Unauthorized continue URL. Please check authorized domains in Firebase.';
          break;
        default:
          errorMessage = `Firebase error: ${error.message}`;
      }

      return { success: false, error: errorMessage };
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Check if this is a Super Admin email and initialize if needed
        if (isSuperAdminEmail(firebaseUser.email || '')) {
          try {
            await initializeSuperAdmin(firebaseUser);
            authLogger.info('Super Admin initialized', { email: firebaseUser.email });
          } catch (error) {
            authLogger.error('Error initializing Super Admin', { 
              email: firebaseUser.email, 
              error: error 
            });
          }
        }

        const userProfile = await this.getUserProfile(firebaseUser.uid);
        if (userProfile) {
          const user: User = {
            id: userProfile.uid,
            firebaseUid: firebaseUser.uid,
            email: userProfile.email,
            name: userProfile.name,
            role: userProfile.role,
            universityId: userProfile.universityId,
            phone: userProfile.phone,
            teamId: userProfile.teamId
          };
          callback(user);
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
}