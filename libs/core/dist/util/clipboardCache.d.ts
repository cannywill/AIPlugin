declare class ClipboardCache {
    private cache;
    private order;
    private readonly maxSize;
    constructor();
    add(id: string, content: string): boolean;
    getNItems(count: number): {
        id: string;
        content: string;
    }[];
    get(id: string): string | undefined;
    select(id: string): void;
    clear(): void;
}
export declare const clipboardCache: ClipboardCache;
export {};
//# sourceMappingURL=clipboardCache.d.ts.map