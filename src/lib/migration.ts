import { MigrationService } from './firestore';
import { authLogger } from './logger';

/**
 * Migration script to update existing data to the new role-based structure
 * This should be run once after deploying the new system
 */
export class DataMigration {
  static async runFullMigration(): Promise<boolean> {
    try {
      authLogger.info('Starting full data migration');
      
      // Step 1: Migrate existing users to new role structure
      authLogger.info('Step 1: Migrating user roles');
      const userMigrationSuccess = await MigrationService.migrateExistingUsers();
      
      if (!userMigrationSuccess) {
        authLogger.error('User migration failed');
        return false;
      }
      
      // Step 2: Initialize payment records for all players
      authLogger.info('Step 2: Initializing payment records');
      const paymentInitSuccess = await MigrationService.initializePaymentsForPlayers();
      
      if (!paymentInitSuccess) {
        authLogger.error('Payment initialization failed');
        return false;
      }
      
      authLogger.info('Full data migration completed successfully');
      return true;
      
    } catch (error: any) {
      authLogger.error('Migration failed', { error: error.message });
      return false;
    }
  }

  static async checkMigrationStatus(): Promise<{
    needsUserMigration: boolean;
    needsPaymentInit: boolean;
    totalUsers: number;
    totalPlayers: number;
    totalPayments: number;
  }> {
    try {
      // Check if migration is needed
      // This is a simplified check - in production you might want more sophisticated checks
      
      authLogger.info('Checking migration status');
      
      // For now, return a basic status
      // In a real implementation, you would check the actual data structure
      return {
        needsUserMigration: false,
        needsPaymentInit: false,
        totalUsers: 0,
        totalPlayers: 0,
        totalPayments: 0
      };
      
    } catch (error: any) {
      authLogger.error('Error checking migration status', { error: error.message });
      return {
        needsUserMigration: false,
        needsPaymentInit: false,
        totalUsers: 0,
        totalPlayers: 0,
        totalPayments: 0
      };
    }
  }
}

// Export migration functions for use in admin panel
export const runMigration = DataMigration.runFullMigration;
export const checkMigrationStatus = DataMigration.checkMigrationStatus;
