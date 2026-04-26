import { Position } from "shiki";
import { DiffLine } from "../..";
/**
 * Given a diff of two editable regions, get the offset position at the last new line inside the editable region.
 * @param diffLines Result of myersDiff.
 * @param lineContentAtCursorPos Content of the line at cursor position.
 * @param lineOffsetAtCursorPos Offset of the line at cursor position compared to the start of the editable region.
 * @returns Offset position at last new line inside the editable region.
 */
export declare function getOffsetPositionAtLastNewLine(diffLines: DiffLine[], lineContentAtCursorPos: string, lineOffsetAtCursorPos: number): {
    line: number;
    character: number;
};
export declare function getRenderableDiffWithGutterAnnotations(diffLines: DiffLine[], lineContentAtCursorPos: string, lineOffsetAtCursorPos: number): {
    offset: {
        line: number;
        character: number;
    };
};
/**
 * Check if the diff is indeed a FIM.
 * @param oldEditRange Original string content.
 * @param newEditRange New string content.
 * @param cursorPosition The position of the cursor in the old string.
 * @returns boolean indicating if the change is purely additive (FIM)
 * @returns string of FIM text content.
 */
export declare function checkFim(oldEditRange: string, newEditRange: string, cursorPosition: {
    line: number;
    character: number;
}): {
    isFim: true;
    fimText: string;
} | {
    isFim: false;
    fimText: null;
};
export declare function calculateFinalCursorPosition(currCursorPos: Position, editableRegionStartLine: number, oldEditRangeSlice: string, newEditRangeSlice: string): Position;
/**
 * Applies a completion to file content by replacing lines starting from a specific line number
 *
 * @param fileContent The original file content
 * @param completion The completion text to apply
 * @param startLineNumber The line number (0-based) where replacement should start
 * @param linesToReplace Optional number of lines to replace; if not provided, will replace the same number of lines as in the completion
 * @returns The file content with the completion applied
 */
export declare function applyCompletionToFile(fileContent: string, completion: string, startLineNumber: number, linesToReplace?: number): string;
export interface DiffGroup {
    startLine: number;
    endLine: number;
    lines: DiffLine[];
    type?: string;
}
/**
 * Group diff lines into meaningful sections based on changes
 * @param diffLines The diff lines to group
 * @param offset Optional line offset to apply to the resulting line numbers
 * @param maxGroupSize Optional maximum group size constraint (Mode 2)
 * @returns Array of DiffGroup objects representing the changes
 */
export declare function groupDiffLines(diffLines: DiffLine[], offset?: number, maxGroupSize?: number): DiffGroup[];
//# sourceMappingURL=diff.d.ts.map