import { User as FirebaseUser } from 'firebase/auth';

export interface User {
  id: string;
  role: 'admin' | 'player' | 'sponsor' | 'observer' | 'volunteer';
  name: string;
  universityId?: string;
  email: string;
  phone?: string;
  firebaseUid?: string;
}

export interface AuthToken {
  token: string;
  user: User;
  expiresAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'player' | 'sponsor' | 'observer' | 'volunteer';
  name: string;
  universityId?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export const ROLES = {
  ADMIN: 'admin',
  PLAYER: 'player',
  SPONSOR: 'sponsor',
  OBSERVER: 'observer',
  VOLUNTEER: 'volunteer'
} as const;

export const ADMIN_ROLES = {
  SUPER_ADMIN: 'superadmin',
  TOURNAMENT_DIRECTOR: 'tournamentDirector',
  TECHNICAL_DIRECTOR: 'technicalDirector',
  FINANCE: 'finance',
  MEDIA_MANAGER: 'mediaManager',
  VOLUNTEER_COORDINATOR: 'volunteerCoordinator'
} as const;

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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

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

  static isAdmin(): boolean {
    return this.hasRole(ROLES.ADMIN);
  }

  static isPlayer(): boolean {
    return this.hasRole(ROLES.PLAYER);
  }

  // Firebase Authentication Methods
  static async signInWithEmail(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user profile from Firestore
      const userProfile = await this.getUserProfile(firebaseUser.uid);
      
      if (!userProfile) {
        return { success: false, error: 'User profile not found' };
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
      return { success: true, user };
    } catch (error: any) {
      console.error('Firebase sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  static async signUpWithEmail(
    email: string, 
    password: string, 
    userData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user profile in Firestore (filter out undefined values)
      const userProfile: any = {
        uid: firebaseUser.uid,
        email: userData.email,
        name: userData.name,
        role: userData.role,
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
      return { success: true, user };
    } catch (error: any) {
      console.error('Firebase sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  static async signOutUser(): Promise<void> {
    try {
      await signOut(auth);
      this.clearAuth();
    } catch (error) {
      console.error('Firebase sign out error:', error);
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
      return null;
    } catch (error: any) {
      console.error('Error getting user profile:', error);
      
      // If it's a permissions error, we might need to set up Firestore rules
      if (error.code === 'permission-denied') {
        console.warn('Firestore permission denied. Please set up security rules in Firebase Console.');
      }
      return null;
    }
  }

  static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  static async signInWithGoogle(): Promise<{ success: boolean; user?: User; error?: string; isNewUser?: boolean }> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      
      // Check if user profile exists
      let userProfile = await this.getUserProfile(firebaseUser.uid);
      let isNewUser = false;
      
      if (!userProfile) {
        // Create new user profile for Google sign-in
        isNewUser = true;
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
      return { success: true, user, isNewUser };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
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
      }
      
      return { success: false, error: errorMessage };
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userProfile = await this.getUserProfile(firebaseUser.uid);
        if (userProfile) {
          const user: User = {
            id: userProfile.uid,
            firebaseUid: firebaseUser.uid,
            email: userProfile.email,
            name: userProfile.name,
            role: userProfile.role,
            universityId: userProfile.universityId,
            phone: userProfile.phone
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