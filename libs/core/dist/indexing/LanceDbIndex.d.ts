import { BranchAndDir, Chunk, ILLM, IndexTag, IndexingProgressUpdate } from "../index";
import { CodebaseIndex, MarkCompleteCallback, RefreshIndexResults } from "./types";
export declare class LanceDbIndex implements CodebaseIndex {
    private readonly embeddingsProvider;
    private readonly readFile;
    private static lance;
    relativeExpectedTime: number;
    get artifactId(): string;
    /**
     * Factory method for creating LanceDbIndex instances.
     *
     * We dynamically import LanceDB only when supported to avoid native module loading errors
     * on incompatible platforms. LanceDB has CPU-specific native dependencies that can crash
     * the application if loaded on unsupported architectures.
     *
     * See isSupportedLanceDbCpuTargetForLinux() for platform compatibility details.
     */
    static create(embeddingsProvider: ILLM, readFile: (filepath: string) => Promise<string>): Promise<LanceDbIndex | null>;
    private constructor();
    tableNameForTag(tag: IndexTag): string;
    private createSqliteCacheTable;
    private computeRows;
    private collectChunks;
    private getChunks;
    private getEmbeddings;
    private createLanceDbRows;
    /**
     * Due to a bug in indexing, some indexes have vectors
     * without the surrounding []. These would fail to parse
     * but this allows such existing indexes to function properly
     */
    private parseVector;
    update(tag: IndexTag, results: RefreshIndexResults, markComplete: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate>;
    private _retrieveForTag;
    retrieve(query: string, n: number, tags: BranchAndDir[], filterDirectory: string | undefined): Promise<Chunk[]>;
    private insertRows;
    private formatListPlurality;
}
//# sourceMappingURL=LanceDbIndex.d.ts.map