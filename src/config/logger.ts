import winston from "winston";
import path from "path";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Add colors to winston
winston.addColors(colors);

// Define log format for development
const devFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

// Define log format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  levels,
  format: process.env.NODE_ENV === "development" ? devFormat : prodFormat,
  transports: [
    // Console transport for all environments
    new winston.transports.Console(),

    // File transport for production
    ...(process.env.NODE_ENV === "production"
      ? [
          // Error logs
          new winston.transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          // All logs
          new winston.transports.File({
            filename: path.join("logs", "combined.log"),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
        ]
      : []),
  ],
});

// Add a test log to verify logger is working
logger.info("Logger initialized successfully");
logger.debug("Debug logging is enabled");
logger.warn("Warning logging is enabled");
logger.error("Error logging is enabled");

export default logger;
