export class GitDiffCache {
    static instance = null;
    cachedDiff = undefined;
    lastFetchTime = 0;
    pendingRequest = null;
    getDiffFn;
    cacheTimeMs;
    constructor(getDiffFn, cacheTimeSeconds = 60) {
        this.getDiffFn = getDiffFn;
        this.cacheTimeMs = cacheTimeSeconds * 1000;
    }
    static getInstance(getDiffFn, cacheTimeSeconds) {
        if (!GitDiffCache.instance) {
            GitDiffCache.instance = new GitDiffCache(getDiffFn, cacheTimeSeconds);
        }
        return GitDiffCache.instance;
    }
    async getDiffPromise() {
        try {
            const diff = await this.getDiffFn();
            this.cachedDiff = diff;
            this.lastFetchTime = Date.now();
            return this.cachedDiff;
        }
        catch (e) {
            console.error("Error fetching git diff:", e);
            return [];
        }
        finally {
            this.pendingRequest = null;
        }
    }
    async get() {
        if (this.cachedDiff !== undefined &&
            Date.now() - this.lastFetchTime < this.cacheTimeMs) {
            return this.cachedDiff;
        }
        // If there's already a request in progress, return that instead of starting a new one
        if (this.pendingRequest) {
            return this.pendingRequest;
        }
        this.pendingRequest = this.getDiffPromise();
        return this.pendingRequest;
    }
    invalidate() {
        this.cachedDiff = undefined;
        this.pendingRequest = null;
    }
}
// factory to make diff cache more testable
export function getDiffFn(ide) {
    return () => ide.getDiff(true);
}
export async function getDiffsFromCache(ide) {
    const diffCache = GitDiffCache.getInstance(getDiffFn(ide));
    return await diffCache.get();
}
