// src/util/logger.ts
import { createLogger, format, transports } from "winston";
import path from "path";
import config from "./config";

// Define log file paths
const logDirectory = path.join(__dirname, "../../logs");
const combinedLogPath = path.join(logDirectory, "combined.log");
const errorLogPath = path.join(logDirectory, "error.log");

const logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, stack }) => {
      // Include stack trace if available
      if (stack) {
        return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`;
      }
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Write all logs to the combined.log file
    new transports.File({ filename: combinedLogPath }),

    // Write only error logs to the error.log file
    new transports.File({ filename: errorLogPath, level: "error" })
  ]
});

// Export the logger instance
export default logger;
