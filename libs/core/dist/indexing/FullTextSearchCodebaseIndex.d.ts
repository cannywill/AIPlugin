import { BranchAndDir, Chunk, IndexTag, IndexingProgressUpdate } from "../";
import { MarkCompleteCallback, RefreshIndexResults, type CodebaseIndex } from "./types";
export interface RetrieveConfig {
    tags: BranchAndDir[];
    text: string;
    n: number;
    directory?: string;
    filterPaths?: string[];
    bm25Threshold?: number;
}
export declare class FullTextSearchCodebaseIndex implements CodebaseIndex {
    relativeExpectedTime: number;
    static artifactId: string;
    artifactId: string;
    pathWeightMultiplier: number;
    private _createTables;
    update(tag: IndexTag, results: RefreshIndexResults, markComplete: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate, any, unknown>;
    retrieve(config: RetrieveConfig): Promise<Chunk[]>;
    private buildTagFilter;
    private buildPathFilter;
    private buildRetrieveQuery;
    private getRetrieveQueryParameters;
    private convertTags;
}
//# sourceMappingURL=FullTextSearchCodebaseIndex.d.ts.map