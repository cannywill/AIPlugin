/**
 * Utility functions for normalizing and handling repository URLs.
 */
/**
 * Normalizes a repository URL to a consistent format.
 *
 * Handles various Git URL formats and converts them to a standard HTTPS GitHub URL:
 * - SSH format: `git@github.com:owner/repo.git` → `https://github.com/owner/repo`
 * - SSH protocol: `ssh://git@github.com/owner/repo.git` → `https://github.com/owner/repo`
 * - Shorthand: `owner/repo` → `https://github.com/owner/repo`
 * - Removes `.git` suffix
 * - Removes trailing slashes
 * - Normalizes to lowercase
 *
 * @param url - The repository URL to normalize
 * @returns The normalized repository URL in lowercase HTTPS format
 *
 * @example
 * ```typescript
 * normalizeRepoUrl("git@github.com:owner/repo.git")
 * // Returns: "https://github.com/owner/repo"
 *
 * normalizeRepoUrl("owner/repo")
 * // Returns: "https://github.com/owner/repo"
 *
 * normalizeRepoUrl("https://github.com/Owner/Repo.git")
 * // Returns: "https://github.com/owner/repo"
 * ```
 */
export declare function normalizeRepoUrl(url: string): string;
//# sourceMappingURL=repoUrl.d.ts.map