import { RangeInFile } from "..";
import { NextEditOutcome } from "./types";
export interface ProcessedItem {
    location: RangeInFile;
    outcome: NextEditOutcome;
}
/**
 * Keeps a queue of the broken down diffs from a changed editable range, as determined in core/nextEdit/diff.ts
 */
/**
 * This is where the chain is stored. Think of it as a regular queue, but being a singleton because we need one source of truth for the chain.
 * I originally intended this to be a separate data structure to handle prefetching next edit outcomes from the model in the background.
 * Due to subpar results, lack of satisfactory next edit location suggestion algorithms and token cost/latency issues, I scratched the idea.
 */
export declare class PrefetchQueue {
    private static instance;
    private unprocessedQueue;
    private processedQueue;
    private prefetchLimit;
    private abortController;
    private usingFullFileDiff;
    private constructor();
    static getInstance(prefetchLimit?: number): PrefetchQueue;
    initialize(usingFullFileDiff: boolean): void;
    enqueueUnprocessed(location: RangeInFile): void;
    private dequeueUnprocessed;
    enqueueProcessed(item: ProcessedItem): void;
    dequeueProcessed(): ProcessedItem | undefined;
    process(ctx: any): Promise<void>;
    abort(): void;
    clear(): void;
    get unprocessedCount(): number;
    get processedCount(): number;
    peekProcessed(): ProcessedItem | undefined;
    peekThreeProcessed(): void;
    setPreetchLimit(limit: number): void;
}
//# sourceMappingURL=NextEditPrefetchQueue.d.ts.map