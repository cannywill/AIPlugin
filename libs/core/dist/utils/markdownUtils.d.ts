/**
 * Utility functions for working with markdown files and code blocks
 */
/**
 * Determines if a code block header indicates markdown content
 */
export declare function headerIsMarkdown(header: string): boolean;
/**
 * Determines if a file is a markdown file based on its filepath.
 */
export declare function isMarkdownFile(filepath?: string): boolean;
/**
 * State tracker for markdown block analysis to avoid recomputing on each call.
 * Optimized to handle nested markdown code blocks.
 */
export declare class MarkdownBlockStateTracker {
    protected trimmedLines: string[];
    protected bareBacktickPositions: number[];
    private markdownNestCount;
    private lastProcessedIndex;
    constructor(allLines: string[]);
    /**
     * Determines if we should stop at the given markdown block position.
     * Maintains state across calls to avoid redundant computation.
     */
    shouldStopAtPosition(currentIndex: number): boolean;
    /**
     * Efficiently determines if there are remaining bare backticks after the given position.
     */
    getRemainingBareBackticksAfter(currentIndex: number): number;
    /**
     * Checks if the line at the given index is a bare backtick line.
     */
    isBareBacktickLine(index: number): boolean;
    /**
     * Gets the trimmed lines array.
     */
    getTrimmedLines(): string[];
}
/**
 * Collects all lines from a LineStream into an array for analysis.
 */
export declare function collectAllLines<T>(stream: AsyncGenerator<T>): Promise<T[]>;
//# sourceMappingURL=markdownUtils.d.ts.map