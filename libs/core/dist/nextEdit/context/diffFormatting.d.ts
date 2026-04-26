export declare enum DiffFormatType {
    Unified = "unified",
    RawBeforeAfter = "beforeAfter",
    TokenLineDiff = "linediff"
}
export type BeforeAfterDiff = {
    filePath: string;
    beforeContent: string;
    afterContent: string;
};
export interface CreateDiffArgs {
    beforeContent: string;
    afterContent: string;
    filePath: string;
    diffType: DiffFormatType;
    contextLines: number;
    workspaceDir?: string;
}
export declare const createDiff: ({ beforeContent, afterContent, filePath, diffType, contextLines, workspaceDir, }: CreateDiffArgs) => string;
export declare const createBeforeAfterDiff: (beforeContent: string, afterContent: string, filePath: string) => BeforeAfterDiff;
export interface DiffMetadata {
    oldFilename?: string;
    newFilename?: string;
    oldTimestamp?: string;
    newTimestamp?: string;
    hunks?: Array<{
        oldStart: number;
        oldCount: number;
        newStart: number;
        newCount: number;
        header?: string;
        lines: Array<{
            type: "context" | "addition" | "deletion";
            content: string;
            oldLineNumber?: number;
            newLineNumber?: number;
        }>;
    }>;
    isBinary?: boolean;
    isNew?: boolean;
    isDeleted?: boolean;
    isRename?: boolean;
}
export declare function extractMetadataFromUnifiedDiff(unifiedDiff: string): DiffMetadata;
//# sourceMappingURL=diffFormatting.d.ts.map