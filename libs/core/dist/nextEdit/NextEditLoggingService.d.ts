import { NextEditOutcome } from "./types";
export declare class NextEditLoggingService {
    private static instance;
    private _abortControllers;
    private _logRejectionTimeouts;
    private _outcomes;
    private _pendingCompletions;
    _lastDisplayedCompletion: {
        id: string;
        displayedAt: number;
    } | undefined;
    private constructor();
    static getInstance(): NextEditLoggingService;
    createAbortController(completionId: string): AbortController;
    deleteAbortController(completionId: string): void;
    trackPendingCompletion(completionId: string): void;
    updatePendingCompletion(completionId: string, data: {
        modelName?: string;
        modelProvider?: string;
        filepath?: string;
    }): void;
    cancel(): void;
    accept(completionId: string): NextEditOutcome | undefined;
    reject(completionId: string): NextEditOutcome | undefined;
    cancelRejectionTimeout(completionId: string): void;
    cancelRejectionTimeoutButKeepCompletionId(completionId: string): void;
    markDisplayed(completionId: string, outcome: NextEditOutcome): void;
    handleAbort(completionId: string): void;
    private logNextEditOutcome;
    private logAcceptReject;
}
//# sourceMappingURL=NextEditLoggingService.d.ts.map