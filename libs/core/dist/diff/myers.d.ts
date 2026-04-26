import { type Change } from "diff";
import { DiffChar, DiffLine } from "..";
export declare function convertMyersChangeToDiffLines(change: Change): DiffLine[];
export declare function myersDiff(oldContent: string, newContent: string): DiffLine[];
export declare function myersCharDiff(oldContent: string, newContent: string): DiffChar[];
//# sourceMappingURL=myers.d.ts.map