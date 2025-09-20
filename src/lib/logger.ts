type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs
  private isDevelopment = import.meta.env.DEV;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data
    };

    // Add to internal log storage
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output in development
    if (this.isDevelopment) {
      const logMessage = `[${entry.timestamp}] [${category.toUpperCase()}] ${message}`;
      
      switch (level) {
        case 'debug':
          console.debug(logMessage, data || '');
          break;
        case 'info':
          console.info(logMessage, data || '');
          break;
        case 'warn':
          console.warn(logMessage, data || '');
          break;
        case 'error':
          console.error(logMessage, data || '');
          break;
      }
    }
  }

  debug(category: string, message: string, data?: any) {
    this.log('debug', category, message, data);
  }

  info(category: string, message: string, data?: any) {
    this.log('info', category, message, data);
  }

  warn(category: string, message: string, data?: any) {
    this.log('warn', category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.log('error', category, message, data);
  }

  // Get all logs
  getAllLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Get logs by category
  getLogsByCategory(category: string): LogEntry[] {
    return this.logs.filter(log => log.category === category);
  }

  // Get logs by level
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  // Export logs as JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear all logs
  clearLogs(): void {
    this.logs = [];
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience exports for different categories
export const authLogger = {
  debug: (message: string, data?: any) => logger.debug('auth', message, data),
  info: (message: string, data?: any) => logger.info('auth', message, data),
  warn: (message: string, data?: any) => logger.warn('auth', message, data),
  error: (message: string, data?: any) => logger.error('auth', message, data),
};

export const firebaseLogger = {
  debug: (message: string, data?: any) => logger.debug('firebase', message, data),
  info: (message: string, data?: any) => logger.info('firebase', message, data),
  warn: (message: string, data?: any) => logger.warn('firebase', message, data),
  error: (message: string, data?: any) => logger.error('firebase', message, data),
};

export const apiLogger = {
  debug: (message: string, data?: any) => logger.debug('api', message, data),
  info: (message: string, data?: any) => logger.info('api', message, data),
  warn: (message: string, data?: any) => logger.warn('api', message, data),
  error: (message: string, data?: any) => logger.error('api', message, data),
};

export const uiLogger = {
  debug: (message: string, data?: any) => logger.debug('ui', message, data),
  info: (message: string, data?: any) => logger.info('ui', message, data),
  warn: (message: string, data?: any) => logger.warn('ui', message, data),
  error: (message: string, data?: any) => logger.error('ui', message, data),
};