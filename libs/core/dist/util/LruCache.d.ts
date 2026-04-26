export declare class PrecalculatedLruCache<V> {
    private readonly calculateValue;
    private readonly N;
    private items;
    constructor(calculateValue: (key: string) => Promise<V | null>, N: number);
    initKey(key: string): Promise<void>;
    get(key: string): V | undefined;
}
//# sourceMappingURL=LruCache.d.ts.map