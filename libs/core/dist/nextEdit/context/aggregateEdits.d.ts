import { Position, RangeInFileWithNextEditInfo } from "../..";
import { BeforeAfterDiff } from "./diffFormatting";
export interface EditClusterConfig {
    deltaT: number;
    deltaL: number;
    maxEdits: number;
    maxDuration: number;
    contextSize: number;
    contextLines: number;
}
export declare class EditAggregator {
    private fileStates;
    config: EditClusterConfig;
    private previousEditFinalCursorPosition;
    private lastProcessedFilePath;
    onComparisonFinalized: (diff: BeforeAfterDiff, beforeCursorPos: Position, afterPrevEditCursorPos: Position) => void;
    private static _instance;
    static getInstance(config?: Partial<EditClusterConfig>, onComparisonFinalized?: (diff: BeforeAfterDiff, beforeCursorPos: Position, afterPrevEditCursorPos: Position) => void): EditAggregator;
    constructor(config?: Partial<EditClusterConfig>, onComparisonFinalized?: (diff: BeforeAfterDiff, beforeCursorPos: Position, afterPrevEditCursorPos: Position) => void);
    processEdit(edit: RangeInFileWithNextEditInfo, timestamp?: number): Promise<void>;
    private _processQueue;
    private _processEditInternal;
    private isWhitespaceOnlyEdit;
    private clustersOverlap;
    processEdits(edits: RangeInFileWithNextEditInfo[]): Promise<void>;
    /**
     * Finalizes all clusters for a specific file
     */
    private finalizeClustersForFile;
    finalizeAllClusters(): Promise<void>;
    private findSuitableCluster;
    private identifyClustersToFinalize;
    private finalizeCluster;
    private countChangedLines;
    getActiveClusterCount(): number;
    getProcessingQueueSize(): number;
    resetState(): void;
    /**
     * Gets the in-progress diff for a file by comparing the earliest active cluster's
     * beforeState with the current file content.
     * This captures edits that haven't been finalized yet.
     *
     * @param filePath The file path to get the in-progress diff for
     * @returns The unified diff string if there are active clusters, or null otherwise
     */
    getInProgressDiff(filePath: string): string | null;
}
//# sourceMappingURL=aggregateEdits.d.ts.map