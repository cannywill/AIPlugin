/**
 * Anonymize file paths - keep package names, remove user paths
 */
export declare function anonymizeFilePath(filePath: string): string;
/**
 * Clean stack trace frames - remove sensitive data but keep the event
 */
export declare function anonymizeStackTrace(frames: any[]): any[];
/**
 * Anonymize user information - hash ID, remove PII
 */
export declare function anonymizeUserInfo(user: any): any;
/**
 * Main anonymization function - minimalist approach like Rasa
 */
export declare function anonymizeSentryEvent(event: any): any | null;
//# sourceMappingURL=anonymization.d.ts.map