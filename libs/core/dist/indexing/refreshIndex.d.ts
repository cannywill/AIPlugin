import { type Database } from "sqlite";
import sqlite3 from "sqlite3";
import { FileStatsMap, IndexTag, IndexingProgressUpdate } from "../index.js";
import { CodebaseIndex, MarkCompleteCallback, PathAndCacheKey, RefreshIndexResults } from "./types.js";
export type DatabaseConnection = Database<sqlite3.Database>;
export declare class SqliteDb {
    static db: DatabaseConnection | null;
    private static createTables;
    private static indexSqlitePath;
    static get(): Promise<DatabaseConnection>;
}
export declare function getComputeDeleteAddRemove(tag: IndexTag, currentFiles: FileStatsMap, readFile: (path: string) => Promise<string>, repoName: string | undefined): Promise<[RefreshIndexResults, PathAndCacheKey[], MarkCompleteCallback]>;
export declare class GlobalCacheCodeBaseIndex implements CodebaseIndex {
    private db;
    relativeExpectedTime: number;
    constructor(db: DatabaseConnection);
    artifactId: string;
    static create(): Promise<GlobalCacheCodeBaseIndex>;
    update(tag: IndexTag, results: RefreshIndexResults, _: MarkCompleteCallback, repoName: string | undefined): AsyncGenerator<IndexingProgressUpdate>;
    private computeOrAddTag;
    private deleteOrRemoveTag;
}
export declare function truncateToLastNBytes(input: string, maxBytes: number): string;
export declare function truncateSqliteLikePattern(input: string, safety?: number): string;
export declare class IndexLock {
    private static getLockTableName;
    static isLocked(): Promise<{
        locked: boolean;
        dirs: string;
        timestamp: number;
    } | undefined | undefined>;
    static lock(dirs: string): Promise<void>;
    static updateTimestamp(): Promise<void>;
    static unlock(): Promise<void>;
}
//# sourceMappingURL=refreshIndex.d.ts.map