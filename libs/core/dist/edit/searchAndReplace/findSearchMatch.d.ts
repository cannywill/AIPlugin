/**
 * Represents a basic match result with start and end character positions
 */
interface BasicMatchResult {
    /** The starting character index of the match in the file content */
    startIndex: number;
    /** The ending character index of the match in the file content (NOT inclusive - e.g. like slice)*/
    endIndex: number;
}
/**
 * Represents a match result with start and end character positions
 */
export interface SearchMatchResult extends BasicMatchResult {
    /** The name of the strategy that successfully matched */
    strategyName: string;
}
/**
 * Find the exact match position for search content in file content.
 * Uses multiple matching strategies in order of preference.
 *
 * Matching Strategy:
 * 1. If search content is empty, matches at the beginning of file (position 0)
 * 2. Try each matching strategy in order until one succeeds
 *
 * @param fileContent - The complete content of the file to search in
 * @param searchContent - The content to search for
 * @param config - Configuration options for matching behavior
 * @returns Match result with character positions, or null if no match found
 */
export declare function findSearchMatch(fileContent: string, searchContent: string): SearchMatchResult | null;
/**
 * Find all matches for search content in file content.
 * Uses the same matching strategies as findSearchMatch, applied iteratively.
 *
 * @param fileContent - The complete content of the file to search in
 * @param searchContent - The content to search for
 * @returns Array of match results with character positions, empty array if no matches found
 */
export declare function findSearchMatches(fileContent: string, searchContent: string): SearchMatchResult[];
export {};
//# sourceMappingURL=findSearchMatch.d.ts.map