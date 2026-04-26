import { DiffLine } from "../..";
export declare function isLazyText(text: string): boolean;
export declare function deterministicApplyLazyEdit({ oldFile, newLazyFile, filename, 
/**
 * Using this as a flag to slowly reintroduce lazy applies.
 * With this set, we will only attempt to deterministically apply
 * when there are no lazy blocks and then just replace the whole file,
 * and otherwise never use instant apply
 */
onlyFullFileRewrite, }: {
    oldFile: string;
    newLazyFile: string;
    filename: string;
    onlyFullFileRewrite?: boolean;
}): Promise<DiffLine[] | undefined>;
//# sourceMappingURL=deterministic.d.ts.map