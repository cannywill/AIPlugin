import { DiffLine } from "../index.js";
import { LineStream } from "./util.js";
/**
 * https://blog.jcoglan.com/2017/02/12/the-myers-diff-algorithm-part-1/
 * Invariants:
 * - new + same = newLines.length
 * - old + same = oldLinesCopy.length
 * ^ (above two guarantee that all lines get represented)
 * - Lines are always output in order, at least among old and new separately
 * - Old lines in a hunk are always output before the new lines
 */
export declare function streamDiff(oldLines: string[], newLines: LineStream): AsyncGenerator<DiffLine>;
//# sourceMappingURL=streamDiff.d.ts.map