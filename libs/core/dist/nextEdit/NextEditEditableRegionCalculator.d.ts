import { RangeInFile } from "..";
export declare enum EditableRegionStrategy {
    Naive = "naive",
    Sliding = "sliding",
    Rerank = "rerank",
    StaticRerank = "staticRerank",
    Static = "static"
}
/**
 * This was an attempt to find next edit locations deterministically.
 * I was intending to use this in tandem with the prefetching logic, but we are not using it anymore.
 */
export declare function getNextEditableRegion(strategy: EditableRegionStrategy, ctx: any): Promise<RangeInFile[] | null>;
//# sourceMappingURL=NextEditEditableRegionCalculator.d.ts.map