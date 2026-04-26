import { LineStream } from "../diff/util";
import { MarkdownBlockStateTracker } from "./markdownUtils";
/**
 * Determines if we should stop at a markdown block based on nested markdown logic.
 * This handles the complex case where markdown blocks contain other markdown blocks.
 * Uses optimized state tracking to avoid redundant computation.
 */
export declare function shouldStopAtMarkdownBlock(stateTracker: MarkdownBlockStateTracker, currentIndex: number): boolean;
/**
 * Processes block nesting logic and returns updated state.
 */
export declare function processBlockNesting(line: string, seenFirstFence: boolean, shouldRemoveLineBeforeStart: (line: string) => boolean): {
    newSeenFirstFence: boolean;
    shouldSkip: boolean;
};
/**
 * Stream transformation that stops when encountering a markdown code block ending.
 * Handles nested markdown blocks in markdown files.
 */
export declare function stopAtLinesWithMarkdownSupport(lines: LineStream, filename: string): LineStream;
//# sourceMappingURL=streamMarkdownUtils.d.ts.map