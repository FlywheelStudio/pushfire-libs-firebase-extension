/**
 * Logger utility for structured logging with emoji indicators and timestamps.
 */

/**
 * Log levels with corresponding emoji indicators.
 */
export enum LogLevel {
  INFO = "⚪",
  SUCCESS = "🟢",
  WARNING = "🟡",
  ERROR = "🔴",
}

/**
 * Logger class for structured logging.
 */
export class Logger {
  /**
   * Formats timestamp for log messages.
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Core logging method that formats and outputs messages.
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = this.getTimestamp();
    const emoji = level;

    if (data !== undefined) {
      console.log(`${emoji} [${timestamp}] ${message}`, data);
    } else {
      console.log(`${emoji} [${timestamp}] ${message}`);
    }
  }

  /**
   * Logs an informational message.
   */
  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Logs a success message.
   */
  success(message: string, data?: unknown): void {
    this.log(LogLevel.SUCCESS, message, data);
  }

  /**
   * Logs a warning message.
   */
  warning(message: string, data?: unknown): void {
    this.log(LogLevel.WARNING, message, data);
  }

  /**
   * Logs an error message.
   */
  error(message: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data);
  }
}

/**
 * Singleton logger instance.
 */
export const logger = new Logger();
