import { DiffLine } from "../../..";
import { LineStream } from "../../../diff/util";
export { filterCodeBlockLines } from "./filterCodeBlock";
export type LineFilter = (args: {
    lines: LineStream;
    fullStop: () => void;
}) => LineStream;
export type CharacterFilter = (args: {
    chars: AsyncGenerator<string>;
    prefix: string;
    suffix: string;
    filepath: string;
    multiline: boolean;
}) => AsyncGenerator<string>;
/**
 * Shared utility for validating patterns in lines to avoid code duplication.
 * Checks if a pattern appears in a valid context (not inside quotes or identifiers).
 */
export declare function validatePatternInLine(line: string, pattern: string): {
    isValid: boolean;
    patternIndex: number;
    beforePattern: string;
};
export declare function shouldChangeLineAndStop(line: string): string | undefined;
/**
 * Determines if the code block has nested markdown blocks.
 */
export declare function hasNestedMarkdownBlocks(firstLine: string, filepath?: string): boolean;
export declare function processBlockNesting(line: string, seenFirstFence: boolean): {
    newSeenFirstFence: boolean;
    shouldSkip: boolean;
};
export declare const USELESS_LINES: string[];
export declare const CODE_KEYWORDS_ENDING_IN_SEMICOLON: string[];
export declare const CODE_STOP_BLOCK = "[/CODE]";
export declare const BRACKET_ENDING_CHARS: string[];
export declare const PREFIXES_TO_SKIP: string[];
export declare const LINES_TO_STOP_AT: string[];
export declare const LINES_TO_SKIP: string[];
export declare const LINES_TO_REMOVE_BEFORE_START: string[];
export declare const ENGLISH_START_PHRASES: string[];
export declare const ENGLISH_POST_PHRASES: string[];
export declare function noTopLevelKeywordsMidline(lines: LineStream, topLevelKeywords: string[], fullStop: () => void): LineStream;
/**
 * Filters out lines starting with '// Path: <PATH>' from a LineStream.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} comment - The comment syntax to filter (e.g., '//' for JavaScript-style comments).
 * @yields {string} The filtered lines, excluding unwanted path lines.
 */
export declare function avoidPathLine(stream: LineStream, comment?: string): LineStream;
/**
 * Filters out empty comment lines from a LineStream.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} comment - The comment syntax to filter (e.g., '//' for JavaScript-style comments).
 * @yields {string} The filtered lines, excluding empty comments.
 */
export declare function avoidEmptyComments(stream: LineStream, comment?: string): LineStream;
/**
 * Transforms a LineStream by adding newline characters between lines.
 *
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} The lines from the input stream with newline characters added between them.
 */
export declare function streamWithNewLines(stream: LineStream): LineStream;
/**
 * Determines if two lines of text are considered repeated or very similar.
 *
 * @param {string} a - The first line of text to compare.
 * @param {string} b - The second line of text to compare.
 * @returns {boolean} True if the lines are considered repeated, false otherwise.
 *
 * @description
 * This function checks if the Levenshtein distance between them is less than 10% of the length of the second line.
 * Lines shorter than 5 characters are never considered repeated.
 */
export declare function lineIsRepeated(a: string, b: string): boolean;
/**
 * Filters a LineStream, stopping when a line similar to the provided one is encountered.
 *
 * @param {LineStream} stream - The input stream of lines to filter.
 * @param {string} line - The line to compare against for similarity.
 * @param {() => void} fullStop - Function to call when stopping the stream.
 * @yields {string} Filtered lines until a similar line is encountered.
 *
 * @description
 * This generator function processes the input stream, yielding lines until it encounters:
 * 1. An exact match to the provided line.
 * 2. A line that is considered repeated or very similar to the provided line.
 * 3. For lines ending with brackets, it allows exact matches of trimmed content.
 * When any of these conditions are met, it calls the fullStop function and stops yielding.
 */
export declare function stopAtSimilarLine(stream: LineStream, line: string, fullStop: () => void): AsyncGenerator<string>;
/**
 * Filters a LineStream, stopping when a line contains any of the specified stop phrases.
 * @param {LineStream} stream - The input stream of lines.
 * @param {() => void} fullStop - Function to call when stopping.
 * @yields {string} Filtered lines until a stop phrase is encountered.
 */
export declare function stopAtLines(stream: LineStream, fullStop: () => void, linesToStopAt?: string[]): LineStream;
export declare function stopAtLinesExact(stream: LineStream, fullStop: () => void, linesToStopAt: string[]): LineStream;
/**
 * Filters a LineStream, skipping specified prefixes on the first line.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Filtered lines with prefixes removed from the first line if applicable.
 */
export declare function skipPrefixes(lines: LineStream): LineStream;
/**
 * Filters out lines starting with specified prefixes from a LineStream.
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} Filtered lines that don't start with any of the LINES_TO_SKIP prefixes.
 */
export declare function skipLines(stream: LineStream): LineStream;
/**
 * Handles cases where original lines have a trailing whitespace, but new lines do not.
 * @param {LineStream} stream - The input stream of lines.
 * @yields {string} Filtered lines that are stripped of trailing whitespace
 */
export declare function removeTrailingWhitespace(stream: LineStream): LineStream;
/**
 * Filters out English explanations at the start of a code block.
 *
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Filtered lines with English explanations removed from the start.
 *
 * @description
 * This generator function performs the following tasks:
 * 1. Skips initial blank lines.
 * 2. Removes the first line if it's identified as an English explanation.
 * 3. Removes a subsequent blank line if the first line was an English explanation.
 * 4. Yields all remaining lines.
 */
export declare function filterEnglishLinesAtStart(lines: LineStream): AsyncGenerator<string, void, unknown>;
/**
 * Filters out English explanations at the end of a code block.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Lines up to the end of the code block or start of English explanation.
 */
export declare function filterEnglishLinesAtEnd(lines: LineStream): AsyncGenerator<string, void, unknown>;
export declare function filterLeadingNewline(lines: LineStream): LineStream;
/**
 * Removes leading indentation from the first line of a CodeLlama output.
 * @param {LineStream} lines - The input stream of lines.
 * @yields {string} Lines with the first line's indentation fixed if necessary.
 */
export declare function fixCodeLlamaFirstLineIndentation(lines: LineStream): AsyncGenerator<string, void, unknown>;
/**
 * Filters leading and trailing blank line insertions from a stream of diff lines.
 *
 * @param {AsyncGenerator<DiffLine>} diffLines - An async generator that yields DiffLine objects.
 * @yields {DiffLine} Filtered DiffLine objects, with leading and trailing blank line insertions removed.
 *
 * @description
 * This generator function processes a stream of diff lines, removing leading and trailing
 * blank line insertions. It performs the following tasks:
 * 1. Skips the first blank line insertion if it occurs at the beginning.
 * 2. Buffers subsequent blank line insertions.
 * 3. Yields buffered blank lines when a non-blank insertion is encountered.
 * 4. Clears the buffer when an old line is encountered.
 * 5. Yields all non-blank insertions and old lines.
 */
export declare function filterLeadingAndTrailingNewLineInsertion(diffLines: AsyncGenerator<DiffLine>): AsyncGenerator<DiffLine>;
/**
 * Filters a LineStream, stopping when a line repeats more than a specified number of times.
 *
 * @param {LineStream} lines - The input stream of lines to filter.
 * @param {() => void} fullStop - Function to call when stopping the stream.
 * @yields {string} Filtered lines until excessive repetition is detected.
 *
 * @description
 * This function yields lines from the input stream until a line is repeated
 * for a maximum of 3 consecutive times. When this limit is reached, it calls
 * the fullStop function and stops yielding. Only the first of the repeating
 * lines is yieled.
 */
export declare function stopAtRepeatingLines(lines: LineStream, fullStop: () => void): LineStream;
/**
 * Pass-through, except logs the total output at the end
 * @param lines a `LineStream`
 */
export declare function logLines(lines: LineStream, prefix?: string): LineStream;
export declare function showWhateverWeHaveAtXMs(lines: LineStream, ms: number): LineStream;
export declare function noDoubleNewLine(lines: LineStream): LineStream;
//# sourceMappingURL=lineStream.d.ts.map