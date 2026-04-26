import { IContinueServerClient } from "../../continueServer/interface.js";
import { IndexTag, IndexingProgressUpdate } from "../../index.js";
import { MarkCompleteCallback, RefreshIndexResults, type CodebaseIndex } from "../types.js";
export declare class ChunkCodebaseIndex implements CodebaseIndex {
    private readonly readFile;
    private readonly continueServerClient;
    private readonly maxChunkSize;
    relativeExpectedTime: number;
    static artifactId: string;
    artifactId: string;
    constructor(readFile: (filepath: string) => Promise<string>, continueServerClient: IContinueServerClient, maxChunkSize: number);
    update(tag: IndexTag, results: RefreshIndexResults, markComplete: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate, any, unknown>;
    private createTables;
    private packToChunks;
    private computeChunks;
    private insertChunks;
}
//# sourceMappingURL=ChunkCodebaseIndex.d.ts.map