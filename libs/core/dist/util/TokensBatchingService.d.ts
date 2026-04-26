export declare class TokensBatchingService {
    private static instance;
    private batches;
    private flushTimer;
    private readonly BATCH_SIZE_LIMIT;
    private readonly FLUSH_INTERVAL_MS;
    static getInstance(): TokensBatchingService;
    private constructor();
    addTokens(model: string, provider: string, promptTokens: number, generatedTokens: number): void;
    private flushBatch;
    private startFlushTimer;
    private flushAllBatches;
    shutdown(): void;
}
//# sourceMappingURL=TokensBatchingService.d.ts.map