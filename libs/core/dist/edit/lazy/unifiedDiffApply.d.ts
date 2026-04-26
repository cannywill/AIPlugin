import { DiffLine } from "../../index";
/**
 * Checks if a string matches unified diff format by validating:
 * 1. Has at least one hunk header (@@ -n,m +n,m @@)
 * 2. Contains valid diff content lines (starting with +, -, or space) which are not header lines
 */
export declare function isUnifiedDiffFormat(diff: string): boolean;
/**
 * Applies a unified diff to source code and returns an array of DiffLine objects.
 * Each DiffLine contains a type ("same", "new", or "old") and the line content.
 *
 * @throws Error if the diff cannot be cleanly applied to the source
 */
export declare function applyUnifiedDiff(sourceCode: string, unifiedDiffText: string): DiffLine[];
//# sourceMappingURL=unifiedDiffApply.d.ts.map