import { UniversityService, CollegeService } from './firestore';
import { SEED_UNIVERSITIES, SEED_COLLEGES } from './fuzzyMatching';
import { authLogger } from './logger';

export class SeedDataService {
  static async initializeSeedData(): Promise<boolean> {
    try {
      authLogger.info('Starting seed data initialization');
      
      // Check if data already exists
      const existingUniversities = await UniversityService.getAllUniversities();
      if (existingUniversities.length > 0) {
        authLogger.info('Seed data already exists, skipping initialization');
        return true;
      }

      // Create universities and their colleges
      for (const universityName of SEED_UNIVERSITIES) {
        try {
          const universityId = await UniversityService.createUniversity({
            name: universityName,
            collegeIds: []
          });

          if (!universityId) {
            authLogger.error('Failed to create university', { universityName });
            continue;
          }

          // Create colleges for this university
          const colleges = SEED_COLLEGES[universityName as keyof typeof SEED_COLLEGES];
          if (colleges) {
            for (const collegeName of colleges) {
              try {
                const collegeId = await CollegeService.createCollege({
                  name: collegeName,
                  universityId
                });

                if (!collegeId) {
                  authLogger.error('Failed to create college', { universityName, collegeName });
                }
              } catch (error: any) {
                authLogger.error('Error creating college', { 
                  universityName, 
                  collegeName, 
                  error: error.message 
                });
              }
            }
          }

          authLogger.info('Created university with colleges', { universityName, universityId });
        } catch (error: any) {
          authLogger.error('Error creating university', { 
            universityName, 
            error: error.message 
          });
        }
      }

      authLogger.info('Seed data initialization completed');
      return true;
    } catch (error: any) {
      authLogger.error('Error initializing seed data', { error: error.message });
      return false;
    }
  }

  static async checkSeedDataStatus(): Promise<{
    universitiesCount: number;
    collegesCount: number;
    needsInitialization: boolean;
  }> {
    try {
      const [universities, colleges] = await Promise.all([
        UniversityService.getAllUniversities(),
        CollegeService.getAllColleges()
      ]);

      return {
        universitiesCount: universities.length,
        collegesCount: colleges.length,
        needsInitialization: universities.length === 0
      };
    } catch (error: any) {
      authLogger.error('Error checking seed data status', { error: error.message });
      return {
        universitiesCount: 0,
        collegesCount: 0,
        needsInitialization: true
      };
    }
  }

  static async getSampleData(): Promise<{
    universities: Array<{ id: string; name: string }>;
    colleges: Array<{ id: string; name: string; universityName: string }>;
  }> {
    try {
      const [universities, colleges] = await Promise.all([
        UniversityService.getAllUniversities(),
        CollegeService.getAllColleges()
      ]);

      const collegesWithUniversity = await Promise.all(
        colleges.map(async (college) => {
          const university = await UniversityService.getUniversity(college.universityId);
          return {
            id: college.collegeId,
            name: college.name,
            universityName: university?.name || 'Unknown'
          };
        })
      );

      return {
        universities: universities.map(u => ({ id: u.universityId, name: u.name })),
        colleges: collegesWithUniversity
      };
    } catch (error: any) {
      authLogger.error('Error getting sample data', { error: error.message });
      return {
        universities: [],
        colleges: []
      };
    }
  }
}
