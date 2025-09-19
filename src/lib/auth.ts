export interface User {
  id: string;
  role: 'admin' | 'player' | 'sponsor' | 'observer' | 'volunteer';
  name: string;
  universityId?: string;
  email: string;
  phone?: string;
}

export interface AuthToken {
  token: string;
  user: User;
  expiresAt: string;
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
}