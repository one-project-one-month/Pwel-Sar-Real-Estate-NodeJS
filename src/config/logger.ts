import path from 'path';
import winston from 'winston';

// Define log levels
const levels = {
  debug: 4,
  error: 0,
  http: 3,
  info: 2,
  warn: 1,
};

// Define log colors
const colors = {
  debug: 'blue',
  error: 'red',
  http: 'magenta',
  info: 'green',
  warn: 'yellow',
};

// Add colors to winston
winston.addColors(colors);

// Define log format for development
const devFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

// Define log format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
  format: process.env.NODE_ENV === 'development' ? devFormat : prodFormat,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels,
  transports: [
    // Console transport for all environments
    new winston.transports.Console(),

    // File transport for production
    ...(process.env.NODE_ENV === 'production'
      ? [
          // Error logs
          new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxFiles: 5,
            maxsize: 5242880, // 5MB
          }),
          // All logs
          new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxFiles: 5,
            maxsize: 5242880, // 5MB
          }),
        ]
      : []),
  ],
});

// Add a test log to verify logger is working
logger.info('Logger initialized successfully');
logger.debug('Debug logging is enabled');
logger.warn('Warning logging is enabled');
logger.error('Error logging is enabled');

export default logger;
