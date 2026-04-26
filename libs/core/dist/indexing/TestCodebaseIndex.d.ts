import { MarkCompleteCallback, RefreshIndexResults, type CodebaseIndex } from "./types.js";
import type { IndexTag, IndexingProgressUpdate } from "../index.js";
/**
 * This is a CodebaseIndex used for testing which files get indexed.
 * It maintains a SQLite database of all file/tag pairs
 */
export declare class TestCodebaseIndex implements CodebaseIndex {
    relativeExpectedTime: number;
    artifactId: string;
    private static _createTables;
    update(tag: IndexTag, results: RefreshIndexResults, markComplete: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate, any, unknown>;
    getIndexedFilesForTags(tags: IndexTag[]): Promise<string[]>;
    clearDatabase(): Promise<void>;
}
//# sourceMappingURL=TestCodebaseIndex.d.ts.map