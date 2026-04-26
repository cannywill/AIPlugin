import { Extras } from "@sentry/core";
import * as Sentry from "@sentry/node";
import { IdeInfo } from "../../index.js";
export declare class SentryLogger {
    static client: Sentry.NodeClient | undefined;
    static scope: Sentry.Scope | undefined;
    static uniqueId: string;
    static os: string | undefined;
    static ideInfo: IdeInfo | undefined;
    static allowTelemetry: boolean;
    private static initializeSentryClient;
    static setup(allowAnonymousTelemetry: boolean, uniqueId: string, ideInfo: IdeInfo, userEmail?: string): Promise<void>;
    private static ensureInitialized;
    static get lazyClient(): Sentry.NodeClient | undefined;
    static get lazyScope(): Sentry.Scope | undefined;
    static shutdownSentryClient(): void;
}
/**
 * Initialize Sentry for error tracking, performance monitoring, and structured logging.
 * Returns the Sentry client and scope, or undefined objects if telemetry is disabled.
 */
export declare function initializeSentry(): {
    client: Sentry.NodeClient | undefined;
    scope: Sentry.Scope | undefined;
};
/**
 * Create a custom span for performance monitoring
 *
 * @param operation The operation category (e.g., "http.client", "ui.click", "db.query")
 * @param name A descriptive name for the span
 * @param callback The function to execute within the span
 * @returns The result of the callback function
 */
export declare function createSpan<T>(operation: string, name: string, callback: () => T | Promise<T>): T | Promise<T>;
/**
 * Capture an exception and send it to Sentry
 *
 * @param error The error to capture
 * @param context Additional context information
 */
export declare function captureException(error: Error, context?: Record<string, any>): void;
/**
 * Capture a structured log message and send it to Sentry
 *
 * @param message The log message
 * @param level The severity level (default: 'info')
 * @param context Additional context information
 */
export declare function captureLog(message: string, level?: Sentry.SeverityLevel, context?: Extras): void;
//# sourceMappingURL=SentryLogger.d.ts.map