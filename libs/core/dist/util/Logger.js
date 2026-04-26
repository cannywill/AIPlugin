import winston from "winston";
import { captureException } from "./sentry/SentryLogger";
class LoggerClass {
    static instance;
    winston;
    constructor() {
        this.winston = winston.createLogger({
            level: "info",
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.printf(({ level, message, timestamp, ...meta }) => {
                const metaStr = Object.keys(meta).length
                    ? ` ${JSON.stringify(meta)}`
                    : "";
                return `[@continuedev] ${level}: ${message}${metaStr}`;
            })),
            transports: [
                // Write all logs with importance level of `info` or higher to `info.log`
                ...(process.env.NODE_ENV === "test"
                    ? [
                        new winston.transports.File({
                            filename: "e2e.log",
                            level: "info",
                        }),
                    ]
                    : []),
                // Use stderr to avoid corrupting IPC stdout stream in the binary
                new winston.transports.Console({
                    stderrLevels: ["error", "warn", "info", "debug"],
                }),
            ],
        });
    }
    static getInstance() {
        if (!LoggerClass.instance) {
            LoggerClass.instance = new LoggerClass();
        }
        return LoggerClass.instance;
    }
    shouldSendToSentry() {
        return process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "e2e";
    }
    log(message, meta) {
        this.winston.info(message, meta);
    }
    debug(message, meta) {
        this.winston.debug(message, meta);
    }
    info(message, meta) {
        this.winston.info(message, meta);
    }
    warn(message, meta) {
        this.winston.warn(message, meta);
    }
    error(error, context) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else if (typeof error === "string") {
            errorMessage = error;
        }
        else {
            errorMessage = "An unknown error occurred";
        }
        this.winston.error(errorMessage, context);
        if (this.shouldSendToSentry() && error instanceof Error) {
            captureException(error, context);
        }
    }
}
export const Logger = LoggerClass.getInstance();
