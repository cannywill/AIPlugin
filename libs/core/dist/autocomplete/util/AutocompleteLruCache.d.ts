import { DatabaseConnection } from "../../indexing/refreshIndex.js";
/**
 * LRU cache for autocomplete results with SQLite persistence.
 *
 * Implements a least-recently-used cache that:
 * - Stores prefix-to-completion mappings in memory
 * - Periodically flushes changes to SQLite for persistence
 * - Evicts oldest entries when capacity is exceeded
 * - Supports prefix matching for flexible autocomplete retrieval
 */
export declare class AutocompleteLruCache {
    private db;
    private static capacity;
    private static flushInterval;
    private static instancePromise?;
    private mutex;
    private cache;
    private dirty;
    private flushTimer?;
    constructor(db: DatabaseConnection);
    /**
     * Singleton accessor that initializes the cache with SQLite persistence.
     * Creates the database table if it doesn't exist and loads existing entries.
     */
    static get(): Promise<AutocompleteLruCache>;
    /** Loads all cached entries from SQLite into memory on initialization. */
    private loadFromDb;
    /** Starts periodic flush timer to persist dirty entries to database. */
    private startFlushTimer;
    /**
     * Retrieves cached completion for a prefix using longest-match strategy.
     *
     * Algorithm:
     * 1. Finds the longest cached prefix that the query starts with
     * 2. Validates that cached completion starts with the remaining query text
     * 3. Returns the completion with the matched portion stripped
     * 4. Updates the entry's timestamp (LRU tracking)
     *
     * @param prefix - The prefix to search for
     * @returns The completion string with prefix removed, or undefined if no match
     */
    get(prefix: string): Promise<string | undefined>;
    /**
     * Stores a prefix-to-completion mapping in the cache.
     *
     * Thread-safe operation that:
     * - Truncates the prefix for SQLite pattern safety
     * - Updates or inserts the entry with current timestamp
     * - Evicts oldest entry if capacity exceeded
     * - Marks entry as dirty for next flush
     *
     * @param prefix - The prefix key
     * @param completion - The completion value to cache
     */
    put(prefix: string, completion: string): Promise<void>;
    /**
     * Persists all dirty entries to SQLite in a single transaction.
     *
     * Performs upserts for existing cache entries and deletes for evicted entries.
     * Skips if no changes pending. Rolls back transaction on error.
     */
    flush(): Promise<void>;
    /**
     * Gracefully shuts down the cache.
     * Stops the flush timer, persists pending changes, and closes database connection.
     */
    close(): Promise<void>;
}
export default AutocompleteLruCache;
//# sourceMappingURL=AutocompleteLruCache.d.ts.map