import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  writeBatch,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { authLogger } from './logger';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  TEAMS: 'teams',
  PAYMENTS: 'payments',
  UNIVERSITIES: 'universities',
  COLLEGES: 'colleges'
} as const;

// Types for Firestore documents
export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  role: 'superAdmin' | 'admin' | 'manager' | 'player';
  universityId?: string;
  collegeId?: string;
  phone?: string;
  teamId?: string;
  isUnassigned?: boolean; // For players who couldn't be matched to a college
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreTeam {
  teamId: string;
  collegeId: string;
  managerUID: string;
  playerUIDs: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreUniversity {
  universityId: string;
  name: string;
  collegeIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreCollege {
  collegeId: string;
  name: string;
  universityId: string;
  teamId: string; // Always one team per college
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestorePayment {
  playerUID: string;
  amountPaid: number;
  status: 'paid' | 'pending';
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User Service
export class UserService {
  static async createUser(userData: Omit<FirestoreUser, 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      authLogger.info('Creating user in Firestore', { uid: userData.uid, role: userData.role });
      
      const userDoc: FirestoreUser = {
        ...userData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      await setDoc(doc(db, COLLECTIONS.USERS, userData.uid), userDoc);
      authLogger.info('User created successfully', { uid: userData.uid });
      return true;
    } catch (error: any) {
      authLogger.error('Error creating user', { uid: userData.uid, error: error.message });
      return false;
    }
  }

  static async getUser(uid: string): Promise<FirestoreUser | null> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as FirestoreUser;
      }
      return null;
    } catch (error: any) {
      authLogger.error('Error getting user', { uid, error: error.message });
      return null;
    }
  }

  static async updateUser(uid: string, updates: Partial<FirestoreUser>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      authLogger.info('User updated successfully', { uid });
      return true;
    } catch (error: any) {
      authLogger.error('Error updating user', { uid, error: error.message });
      return false;
    }
  }

  static async getUsersByRole(role: string): Promise<FirestoreUser[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS),
        where('role', '==', role),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const users: FirestoreUser[] = [];
      
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as FirestoreUser);
      });
      
      return users;
    } catch (error: any) {
      authLogger.error('Error getting users by role', { role, error: error.message });
      return [];
    }
  }

  static async getAllUsers(): Promise<FirestoreUser[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const users: FirestoreUser[] = [];
      
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as FirestoreUser);
      });
      
      return users;
    } catch (error: any) {
      authLogger.error('Error getting all users', { error: error.message });
      return [];
    }
  }

  static async getPlayersInTeam(teamId: string): Promise<FirestoreUser[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.USERS),
        where('teamId', '==', teamId),
        where('role', '==', 'player')
      );
      
      const querySnapshot = await getDocs(q);
      const players: FirestoreUser[] = [];
      
      querySnapshot.forEach((doc) => {
        players.push(doc.data() as FirestoreUser);
      });
      
      return players;
    } catch (error: any) {
      authLogger.error('Error getting players in team', { teamId, error: error.message });
      return [];
    }
  }
}

// Team Service
export class TeamService {
  static async createTeam(teamData: Omit<FirestoreTeam, 'teamId' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      authLogger.info('Creating team', { collegeId: teamData.collegeId, managerUID: teamData.managerUID });
      
      const teamDoc: Omit<FirestoreTeam, 'teamId'> = {
        ...teamData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.TEAMS), teamDoc);
      authLogger.info('Team created successfully', { teamId: docRef.id });
      return docRef.id;
    } catch (error: any) {
      authLogger.error('Error creating team', { error: error.message });
      return null;
    }
  }

  static async getTeam(teamId: string): Promise<FirestoreTeam | null> {
    try {
      const docRef = doc(db, COLLECTIONS.TEAMS, teamId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { teamId: docSnap.id, ...docSnap.data() } as FirestoreTeam;
      }
      return null;
    } catch (error: any) {
      authLogger.error('Error getting team', { teamId, error: error.message });
      return null;
    }
  }

  static async updateTeam(teamId: string, updates: Partial<FirestoreTeam>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.TEAMS, teamId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      authLogger.info('Team updated successfully', { teamId });
      return true;
    } catch (error: any) {
      authLogger.error('Error updating team', { teamId, error: error.message });
      return false;
    }
  }

  static async getAllTeams(): Promise<FirestoreTeam[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.TEAMS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const teams: FirestoreTeam[] = [];
      
      querySnapshot.forEach((doc) => {
        teams.push({ teamId: doc.id, ...doc.data() } as FirestoreTeam);
      });
      
      return teams;
    } catch (error: any) {
      authLogger.error('Error getting all teams', { error: error.message });
      return [];
    }
  }

  static async getTeamByManager(managerUID: string): Promise<FirestoreTeam | null> {
    try {
      const q = query(
        collection(db, COLLECTIONS.TEAMS),
        where('managerUID', '==', managerUID),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { teamId: doc.id, ...doc.data() } as FirestoreTeam;
      }
      
      return null;
    } catch (error: any) {
      authLogger.error('Error getting team by manager', { managerUID, error: error.message });
      return null;
    }
  }

  static async addPlayerToTeam(teamId: string, playerUID: string): Promise<boolean> {
    try {
      const team = await this.getTeam(teamId);
      if (!team) {
        authLogger.error('Team not found', { teamId });
        return false;
      }

      if (team.playerUIDs.includes(playerUID)) {
        authLogger.warn('Player already in team', { teamId, playerUID });
        return true; // Already in team, consider it success
      }

      const updatedPlayerUIDs = [...team.playerUIDs, playerUID];
      await this.updateTeam(teamId, { playerUIDs: updatedPlayerUIDs });
      
      // Also update the player's teamId
      await UserService.updateUser(playerUID, { teamId });
      
      authLogger.info('Player added to team', { teamId, playerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error adding player to team', { teamId, playerUID, error: error.message });
      return false;
    }
  }

  static async removePlayerFromTeam(teamId: string, playerUID: string): Promise<boolean> {
    try {
      const team = await this.getTeam(teamId);
      if (!team) {
        authLogger.error('Team not found', { teamId });
        return false;
      }

      const updatedPlayerUIDs = team.playerUIDs.filter(uid => uid !== playerUID);
      await this.updateTeam(teamId, { playerUIDs: updatedPlayerUIDs });
      
      // Also remove teamId from player
      await UserService.updateUser(playerUID, { teamId: null });
      
      authLogger.info('Player removed from team', { teamId, playerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error removing player from team', { teamId, playerUID, error: error.message });
      return false;
    }
  }
}

// Payment Service
export class PaymentService {
  static async createPayment(paymentData: Omit<FirestorePayment, 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      authLogger.info('Creating payment record', { playerUID: paymentData.playerUID });
      
      const paymentDoc: FirestorePayment = {
        ...paymentData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      await setDoc(doc(db, COLLECTIONS.PAYMENTS, paymentData.playerUID), paymentDoc);
      authLogger.info('Payment record created successfully', { playerUID: paymentData.playerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error creating payment record', { playerUID: paymentData.playerUID, error: error.message });
      return false;
    }
  }

  static async getPayment(playerUID: string): Promise<FirestorePayment | null> {
    try {
      const docRef = doc(db, COLLECTIONS.PAYMENTS, playerUID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as FirestorePayment;
      }
      return null;
    } catch (error: any) {
      authLogger.error('Error getting payment', { playerUID, error: error.message });
      return null;
    }
  }

  static async updatePayment(playerUID: string, updates: Partial<FirestorePayment>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.PAYMENTS, playerUID);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      authLogger.info('Payment updated successfully', { playerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error updating payment', { playerUID, error: error.message });
      return false;
    }
  }

  static async getAllPayments(): Promise<FirestorePayment[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PAYMENTS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const payments: FirestorePayment[] = [];
      
      querySnapshot.forEach((doc) => {
        payments.push(doc.data() as FirestorePayment);
      });
      
      return payments;
    } catch (error: any) {
      authLogger.error('Error getting all payments', { error: error.message });
      return [];
    }
  }

  static async getPaymentsByStatus(status: 'paid' | 'pending'): Promise<FirestorePayment[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.PAYMENTS),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const payments: FirestorePayment[] = [];
      
      querySnapshot.forEach((doc) => {
        payments.push(doc.data() as FirestorePayment);
      });
      
      return payments;
    } catch (error: any) {
      authLogger.error('Error getting payments by status', { status, error: error.message });
      return [];
    }
  }

  static async getTeamPayments(teamId: string): Promise<FirestorePayment[]> {
    try {
      const players = await UserService.getPlayersInTeam(teamId);
      const playerUIDs = players.map(player => player.uid);
      
      if (playerUIDs.length === 0) {
        return [];
      }

      const payments: FirestorePayment[] = [];
      
      // Firestore doesn't support 'in' queries with more than 10 items
      // So we'll batch the queries
      const batchSize = 10;
      for (let i = 0; i < playerUIDs.length; i += batchSize) {
        const batch = playerUIDs.slice(i, i + batchSize);
        const q = query(
          collection(db, COLLECTIONS.PAYMENTS),
          where('playerUID', 'in', batch)
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          payments.push(doc.data() as FirestorePayment);
        });
      }
      
      return payments;
    } catch (error: any) {
      authLogger.error('Error getting team payments', { teamId, error: error.message });
      return [];
    }
  }
}

// University Service
export class UniversityService {
  static async createUniversity(universityData: Omit<FirestoreUniversity, 'universityId' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      authLogger.info('Creating university', { name: universityData.name });
      
      const universityDoc: Omit<FirestoreUniversity, 'universityId'> = {
        ...universityData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.UNIVERSITIES), universityDoc);
      authLogger.info('University created successfully', { universityId: docRef.id });
      return docRef.id;
    } catch (error: any) {
      authLogger.error('Error creating university', { error: error.message });
      return null;
    }
  }

  static async getUniversity(universityId: string): Promise<FirestoreUniversity | null> {
    try {
      const docRef = doc(db, COLLECTIONS.UNIVERSITIES, universityId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { universityId: docSnap.id, ...docSnap.data() } as FirestoreUniversity;
      }
      return null;
    } catch (error: any) {
      authLogger.error('Error getting university', { universityId, error: error.message });
      return null;
    }
  }

  static async getAllUniversities(): Promise<FirestoreUniversity[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.UNIVERSITIES),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const universities: FirestoreUniversity[] = [];
      
      querySnapshot.forEach((doc) => {
        universities.push({ universityId: doc.id, ...doc.data() } as FirestoreUniversity);
      });
      
      return universities;
    } catch (error: any) {
      authLogger.error('Error getting all universities', { error: error.message });
      return [];
    }
  }

  static async updateUniversity(universityId: string, updates: Partial<FirestoreUniversity>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.UNIVERSITIES, universityId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      authLogger.info('University updated successfully', { universityId });
      return true;
    } catch (error: any) {
      authLogger.error('Error updating university', { universityId, error: error.message });
      return false;
    }
  }
}

// College Service
export class CollegeService {
  static async createCollege(collegeData: Omit<FirestoreCollege, 'collegeId' | 'createdAt' | 'updatedAt' | 'teamId'>): Promise<string | null> {
    try {
      authLogger.info('Creating college', { name: collegeData.name, universityId: collegeData.universityId });
      
      // Create team for the college first
      const teamId = await TeamService.createTeam({
        collegeId: 'temp', // Will be updated after college creation
        managerUID: '',
        playerUIDs: []
      });

      if (!teamId) {
        authLogger.error('Failed to create team for college');
        return null;
      }

      const collegeDoc: Omit<FirestoreCollege, 'collegeId'> = {
        ...collegeData,
        teamId,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.COLLEGES), collegeDoc);
      
      // Update team with correct collegeId
      await TeamService.updateTeam(teamId, { collegeId: docRef.id });
      
      // Update university with new college
      await UniversityService.updateUniversity(collegeData.universityId, {
        collegeIds: [...((await UniversityService.getUniversity(collegeData.universityId))?.collegeIds || []), docRef.id]
      });

      authLogger.info('College created successfully', { collegeId: docRef.id, teamId });
      return docRef.id;
    } catch (error: any) {
      authLogger.error('Error creating college', { error: error.message });
      return null;
    }
  }

  static async getCollege(collegeId: string): Promise<FirestoreCollege | null> {
    try {
      const docRef = doc(db, COLLECTIONS.COLLEGES, collegeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { collegeId: docSnap.id, ...docSnap.data() } as FirestoreCollege;
      }
      return null;
    } catch (error: any) {
      authLogger.error('Error getting college', { collegeId, error: error.message });
      return null;
    }
  }

  static async getCollegesByUniversity(universityId: string): Promise<FirestoreCollege[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.COLLEGES),
        where('universityId', '==', universityId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const colleges: FirestoreCollege[] = [];
      
      querySnapshot.forEach((doc) => {
        colleges.push({ collegeId: doc.id, ...doc.data() } as FirestoreCollege);
      });
      
      return colleges;
    } catch (error: any) {
      authLogger.error('Error getting colleges by university', { universityId, error: error.message });
      return [];
    }
  }

  static async getAllColleges(): Promise<FirestoreCollege[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.COLLEGES),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const colleges: FirestoreCollege[] = [];
      
      querySnapshot.forEach((doc) => {
        colleges.push({ collegeId: doc.id, ...doc.data() } as FirestoreCollege);
      });
      
      return colleges;
    } catch (error: any) {
      authLogger.error('Error getting all colleges', { error: error.message });
      return [];
    }
  }

  static async assignManagerToCollege(collegeId: string, managerUID: string): Promise<boolean> {
    try {
      const college = await this.getCollege(collegeId);
      if (!college) {
        authLogger.error('College not found', { collegeId });
        return false;
      }

      // Update team with manager
      await TeamService.updateTeam(college.teamId, { managerUID });
      
      // Update manager's user record
      await UserService.updateUser(managerUID, { 
        collegeId,
        teamId: college.teamId,
        role: 'manager'
      });

      authLogger.info('Manager assigned to college', { collegeId, managerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error assigning manager to college', { collegeId, managerUID, error: error.message });
      return false;
    }
  }
}

// Migration Service for existing data
export class MigrationService {
  static async migrateExistingUsers(): Promise<boolean> {
    try {
      authLogger.info('Starting user migration');
      
      // Get all existing users and update their roles if needed
      const users = await UserService.getAllUsers();
      const batch = writeBatch(db);
      
      let updatedCount = 0;
      
      for (const user of users) {
        const updates: Partial<FirestoreUser> = {};
        
        // Map old roles to new roles
        if (user.role === 'sponsor' || user.role === 'observer' || user.role === 'volunteer') {
          updates.role = 'player';
          updatedCount++;
        }
        
        if (Object.keys(updates).length > 0) {
          const userRef = doc(db, COLLECTIONS.USERS, user.uid);
          batch.update(userRef, updates);
        }
      }
      
      if (updatedCount > 0) {
        await batch.commit();
        authLogger.info('User migration completed', { updatedCount });
      } else {
        authLogger.info('No users needed migration');
      }
      
      return true;
    } catch (error: any) {
      authLogger.error('Error during user migration', { error: error.message });
      return false;
    }
  }

  static async initializePaymentsForPlayers(): Promise<boolean> {
    try {
      authLogger.info('Initializing payments for all players');
      
      const players = await UserService.getUsersByRole('player');
      const batch = writeBatch(db);
      
      for (const player of players) {
        // Check if payment record already exists
        const existingPayment = await PaymentService.getPayment(player.uid);
        
        if (!existingPayment) {
          const paymentRef = doc(db, COLLECTIONS.PAYMENTS, player.uid);
          const paymentData: FirestorePayment = {
            playerUID: player.uid,
            amountPaid: 0,
            status: 'pending',
            createdAt: serverTimestamp() as Timestamp,
            updatedAt: serverTimestamp() as Timestamp
          };
          
          batch.set(paymentRef, paymentData);
        }
      }
      
      await batch.commit();
      authLogger.info('Payment initialization completed', { playerCount: players.length });
      return true;
    } catch (error: any) {
      authLogger.error('Error initializing payments', { error: error.message });
      return false;
    }
  }
}
