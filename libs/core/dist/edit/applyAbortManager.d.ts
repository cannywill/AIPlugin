export declare class ApplyAbortManager {
    private static instance;
    private controllers;
    private constructor();
    static getInstance(): ApplyAbortManager;
    get(id: string): AbortController;
    abort(id: string): void;
    clear(): void;
}
//# sourceMappingURL=applyAbortManager.d.ts.map