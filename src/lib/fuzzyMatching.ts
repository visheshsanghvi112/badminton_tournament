import Fuse from 'fuse.js';
import { UniversityService, CollegeService, FirestoreUniversity, FirestoreCollege } from './firestore';
import { authLogger } from './logger';

// Seed data for Indian universities and colleges
export const SEED_UNIVERSITIES = [
  'Symbiosis International University',
  'University of Delhi',
  'University of Mumbai',
  'Indian Institute of Technology Bombay',
  'Indian Institute of Technology Delhi',
  'Indian Institute of Technology Madras',
  'Indian Institute of Technology Kanpur',
  'Indian Institute of Technology Kharagpur',
  'Indian Institute of Science Bangalore',
  'Jawaharlal Nehru University',
  'Banaras Hindu University',
  'University of Calcutta',
  'University of Madras',
  'Anna University',
  'Pune University',
  'Mumbai University',
  'Delhi University',
  'Bangalore University',
  'Hyderabad University',
  'Aligarh Muslim University'
];

export const SEED_COLLEGES = {
  'Symbiosis International University': [
    'Symbiosis Institute of Technology',
    'Symbiosis College of Arts and Commerce',
    'Symbiosis Law School',
    'Symbiosis Centre for Management Studies',
    'Symbiosis Institute of Business Management',
    'Symbiosis Institute of Computer Studies and Research',
    'Symbiosis Centre for Media and Communication',
    'Symbiosis School of Economics',
    'Symbiosis Institute of Health Sciences',
    'Symbiosis Institute of Design'
  ],
  'University of Delhi': [
    'St. Stephen\'s College',
    'Hindu College',
    'Lady Shri Ram College',
    'Sri Venkateswara College',
    'Hansraj College',
    'Kirori Mal College',
    'Ramjas College',
    'Miranda House',
    'Gargi College',
    'Jesus and Mary College'
  ],
  'University of Mumbai': [
    'St. Xavier\'s College',
    'Jai Hind College',
    'Wilson College',
    'Mithibai College',
    'KJ Somaiya College',
    'HR College of Commerce',
    'Narsee Monjee College',
    'Sophia College',
    'Elphinstone College',
    'Government Law College'
  ],
  'Indian Institute of Technology Bombay': [
    'Computer Science and Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Metallurgical Engineering',
    'Industrial Engineering'
  ],
  'Indian Institute of Technology Delhi': [
    'Computer Science and Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Textile Technology',
    'Production and Industrial Engineering'
  ]
};

export interface MatchResult {
  matched: boolean;
  confidence: number;
  universityId?: string;
  collegeId?: string;
  universityName?: string;
  collegeName?: string;
  suggested?: {
    universities: Array<{ name: string; score: number }>;
    colleges: Array<{ name: string; score: number }>;
  };
}

export class FuzzyMatchingService {
  private static fuseOptions = {
    keys: ['name'],
    threshold: 0.6, // 0 = perfect match, 1 = match anything
    distance: 100,
    includeScore: true,
    includeMatches: true
  };

  private static universityFuse: Fuse<FirestoreUniversity> | null = null;
  private static collegeFuse: Fuse<FirestoreCollege> | null = null;

  static async initializeFuse() {
    try {
      // Load universities and colleges from Firestore
      const [universities, colleges] = await Promise.all([
        UniversityService.getAllUniversities(),
        CollegeService.getAllColleges()
      ]);

      // Initialize Fuse instances
      this.universityFuse = new Fuse(universities, this.fuseOptions);
      this.collegeFuse = new Fuse(colleges, this.fuseOptions);

      authLogger.info('Fuzzy matching initialized', { 
        universityCount: universities.length, 
        collegeCount: colleges.length 
      });
    } catch (error: any) {
      authLogger.error('Error initializing fuzzy matching', { error: error.message });
    }
  }

  static async matchUniversityAndCollege(
    universityInput: string,
    collegeInput: string
  ): Promise<MatchResult> {
    try {
      if (!this.universityFuse || !this.collegeFuse) {
        await this.initializeFuse();
      }

      // Clean inputs
      const cleanUniversity = universityInput.trim().toLowerCase();
      const cleanCollege = collegeInput.trim().toLowerCase();

      if (!cleanUniversity || !cleanCollege) {
        return {
          matched: false,
          confidence: 0,
          suggested: {
            universities: this.getSuggestedUniversities(universityInput),
            colleges: this.getSuggestedColleges(collegeInput)
          }
        };
      }

      // Search for university
      const universityResults = this.universityFuse!.search(universityInput);
      const bestUniversity = universityResults[0];

      if (!bestUniversity) {
        return {
          matched: false,
          confidence: 0,
          suggested: {
            universities: this.getSuggestedUniversities(universityInput),
            colleges: this.getSuggestedColleges(collegeInput)
          }
        };
      }

      // Search for college within the university
      const colleges = await CollegeService.getCollegesByUniversity(bestUniversity.item.universityId);
      const collegeFuse = new Fuse(colleges, this.fuseOptions);
      const collegeResults = collegeFuse.search(collegeInput);
      const bestCollege = collegeResults[0];

      if (!bestCollege) {
        return {
          matched: false,
          confidence: 0,
          suggested: {
            universities: [{ name: bestUniversity.item.name, score: bestUniversity.score || 0 }],
            colleges: this.getSuggestedColleges(collegeInput)
          }
        };
      }

      // Calculate overall confidence
      const universityConfidence = 1 - (bestUniversity.score || 0);
      const collegeConfidence = 1 - (bestCollege.score || 0);
      const overallConfidence = (universityConfidence + collegeConfidence) / 2;

      return {
        matched: overallConfidence >= 0.85,
        confidence: overallConfidence,
        universityId: bestUniversity.item.universityId,
        collegeId: bestCollege.item.collegeId,
        universityName: bestUniversity.item.name,
        collegeName: bestCollege.item.name,
        suggested: overallConfidence < 0.85 ? {
          universities: [{ name: bestUniversity.item.name, score: bestUniversity.score || 0 }],
          colleges: [{ name: bestCollege.item.name, score: bestCollege.score || 0 }]
        } : undefined
      };

    } catch (error: any) {
      authLogger.error('Error in fuzzy matching', { 
        universityInput, 
        collegeInput, 
        error: error.message 
      });
      
      return {
        matched: false,
        confidence: 0,
        suggested: {
          universities: this.getSuggestedUniversities(universityInput),
          colleges: this.getSuggestedColleges(collegeInput)
        }
      };
    }
  }

  private static getSuggestedUniversities(input: string): Array<{ name: string; score: number }> {
    const fuse = new Fuse(SEED_UNIVERSITIES, this.fuseOptions);
    const results = fuse.search(input);
    return results.slice(0, 3).map(result => ({
      name: result.item,
      score: result.score || 0
    }));
  }

  private static getSuggestedColleges(input: string): Array<{ name: string; score: number }> {
    const allColleges = Object.values(SEED_COLLEGES).flat();
    const fuse = new Fuse(allColleges, this.fuseOptions);
    const results = fuse.search(input);
    return results.slice(0, 3).map(result => ({
      name: result.item,
      score: result.score || 0
    }));
  }

  static async autoAssignPlayerToTeam(
    playerUID: string,
    universityId: string,
    collegeId: string
  ): Promise<boolean> {
    try {
      const college = await CollegeService.getCollege(collegeId);
      if (!college) {
        authLogger.error('College not found for auto-assignment', { collegeId });
        return false;
      }

      // Get the team for this college
      const team = await TeamService.getTeam(college.teamId);
      if (!team) {
        authLogger.error('Team not found for college', { collegeId, teamId: college.teamId });
        return false;
      }

      // Update player's university, college, and team assignments
      await UserService.updateUser(playerUID, {
        universityId,
        collegeId,
        teamId: college.teamId,
        isUnassigned: false
      });

      // Add player to team
      await TeamService.addPlayerToTeam(college.teamId, playerUID);

      authLogger.info('Player auto-assigned to team', { 
        playerUID, 
        universityId, 
        collegeId, 
        teamId: college.teamId 
      });

      return true;
    } catch (error: any) {
      authLogger.error('Error auto-assigning player to team', { 
        playerUID, 
        universityId, 
        collegeId, 
        error: error.message 
      });
      return false;
    }
  }

  static async markPlayerAsUnassigned(playerUID: string): Promise<boolean> {
    try {
      await UserService.updateUser(playerUID, {
        isUnassigned: true,
        universityId: undefined,
        collegeId: undefined,
        teamId: undefined
      });

      authLogger.info('Player marked as unassigned', { playerUID });
      return true;
    } catch (error: any) {
      authLogger.error('Error marking player as unassigned', { playerUID, error: error.message });
      return false;
    }
  }
}
