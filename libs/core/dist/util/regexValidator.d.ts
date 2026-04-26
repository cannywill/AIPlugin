/**
 * Validates and sanitizes regex patterns for use with ripgrep
 */
export interface RegexValidationResult {
    isValid: boolean;
    sanitizedQuery?: string;
    error?: string;
    warning?: string;
}
/**
 * Validates a regex pattern and attempts to sanitize common issues
 * @param query The regex pattern to validate
 * @returns Validation result with sanitized query if possible
 */
export declare function validateAndSanitizeRegex(query: string): RegexValidationResult;
/**
 * Escapes a literal string to be used as a regex pattern
 * @param literal The literal string to escape
 * @returns Escaped string safe for regex use
 */
export declare function escapeLiteralForRegex(literal: string): string;
/**
 * Detects if a query looks like it's meant to be a literal search
 * rather than a regex pattern
 * @param query The search query
 * @returns true if it appears to be a literal search
 */
export declare function looksLikeLiteralSearch(query: string): boolean;
/**
 * Prepares a query for ripgrep by sanitizing problematic patterns
 * @param query The search query
 * @returns Object with sanitized query and any warnings
 */
export declare function prepareQueryForRipgrep(query: string): {
    query: string;
    warning?: string;
};
//# sourceMappingURL=regexValidator.d.ts.map