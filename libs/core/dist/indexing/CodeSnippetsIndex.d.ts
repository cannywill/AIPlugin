import { MarkCompleteCallback, RefreshIndexResults, type CodebaseIndex } from "./types";
import type { ChunkWithoutID, ContextItem, ContextSubmenuItem, IDE, IndexTag, IndexingProgressUpdate } from "../";
type SnippetChunk = ChunkWithoutID & {
    title: string;
    signature: string;
};
export declare class CodeSnippetsCodebaseIndex implements CodebaseIndex {
    private readonly ide;
    relativeExpectedTime: number;
    static artifactId: string;
    artifactId: string;
    constructor(ide: IDE);
    private static _createTables;
    private getSnippetsFromMatch;
    getSnippetsInFile(filepath: string, contents: string): Promise<SnippetChunk[]>;
    update(tag: IndexTag, results: RefreshIndexResults, markComplete: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate, any, unknown>;
    static getForId(id: number, workspaceDirs: string[]): Promise<ContextItem>;
    static getAll(tag: IndexTag): Promise<ContextSubmenuItem[]>;
    static getPathsAndSignatures(workspaceDirs: string[], uriOffset?: number, uriBatchSize?: number, snippetOffset?: number, snippetBatchSize?: number): Promise<{
        groupedByUri: {
            [path: string]: string[];
        };
        hasMoreSnippets: boolean;
        hasMoreUris: boolean;
    }>;
}
export {};
//# sourceMappingURL=CodeSnippetsIndex.d.ts.map