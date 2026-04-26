/**
 * Sanitization utilities for preventing injection attacks.
 * These utilities address specific security vulnerabilities identified in code review.
 */
/**
 * Sanitizes a string for safe use in shell commands by escaping special characters.
 * Uses the battle-tested `shell-quote` library.
 *
 * @param arg - The argument to sanitize for shell execution
 * @returns A safely escaped string suitable for shell commands
 *
 * @example
 * ```typescript
 * const command = `git stash push -m ${sanitizeShellArgument(message)}`;
 * ```
 *
 * Protects against:
 * - Command injection (`;`, `&&`, `||`, `|`)
 * - Command substitution (`$()`, backticks)
 * - Variable expansion (`$VAR`)
 */
export declare function sanitizeShellArgument(arg: string): string;
/**
 * Validates that a repository name/URL doesn't contain malicious patterns.
 * Rejects dangerous patterns but doesn't validate full URL structure.
 *
 * @param repoName - The repository name or URL to validate
 * @returns true if safe, false if contains dangerous patterns
 *
 * @example
 * ```typescript
 * validateGitHubRepoUrl("owner/repo"); // true
 * validateGitHubRepoUrl("owner/repo; rm -rf /"); // false
 * ```
 *
 * Protects against:
 * - Path traversal (`../`)
 * - Command injection (`;`, `&&`, `||`)
 * - Shell metacharacters (backticks, `$`, `|`)
 */
export declare function validateGitHubRepoUrl(repoName: string): boolean;
//# sourceMappingURL=sanitization.d.ts.map