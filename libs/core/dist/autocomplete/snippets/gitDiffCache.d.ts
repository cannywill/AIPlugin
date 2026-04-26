import { IDE } from "../..";
type GetDiffFn = () => Promise<string[]>;
export declare class GitDiffCache {
    private static instance;
    private cachedDiff;
    private lastFetchTime;
    private pendingRequest;
    private getDiffFn;
    private cacheTimeMs;
    private constructor();
    static getInstance(getDiffFn: GetDiffFn, cacheTimeSeconds?: number): GitDiffCache;
    private getDiffPromise;
    get(): Promise<string[]>;
    invalidate(): void;
}
export declare function getDiffFn(ide: IDE): GetDiffFn;
export declare function getDiffsFromCache(ide: IDE): Promise<string[]>;
export {};
//# sourceMappingURL=gitDiffCache.d.ts.map