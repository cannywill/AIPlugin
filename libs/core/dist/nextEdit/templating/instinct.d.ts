import { Position } from "../..";
/**
 * @param contextSnippets Codestral style snippet with +++++ filename\ncontent or an empty string.
 */
export declare function contextSnippetsBlock(contextSnippets: string): string;
export declare function currentFileContentBlock(currentFileContent: string, windowStart: number, windowEnd: number, editableRegionStartLine: number, editableRegionEndLine: number, cursorPosition: Position): string;
export declare function editHistoryBlock(editDiffHistories: string[]): string;
//# sourceMappingURL=instinct.d.ts.map