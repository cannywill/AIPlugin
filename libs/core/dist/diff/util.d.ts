import { ChatMessage } from "../index.js";
export type LineStream = AsyncGenerator<string>;
export type MatchLineResult = {
    /**
     * -1 if it's a new line, otherwise the index of the first match
     * in the old lines.
     */
    matchIndex: number;
    isPerfectMatch: boolean;
    newLine: string;
};
/**
 * Used to find a match for a new line in an array of old lines.
 *
 * Return the index of the first match and whether it is a perfect match
 * Also return a version of the line with correct indentation if needs fixing
 */
export declare function matchLine(newLine: string, oldLines: string[], permissiveAboutIndentation?: boolean): MatchLineResult;
/**
 * Convert a stream of arbitrary chunks to a stream of lines
 */
export declare function streamLines(streamCompletion: AsyncGenerator<string | ChatMessage>, log?: boolean): LineStream;
export declare function generateLines<T>(lines: T[]): AsyncGenerator<T>;
//# sourceMappingURL=util.d.ts.map