import { AutocompleteOutcome } from "./types";
export declare class AutocompleteLoggingService {
    private _abortControllers;
    private _logRejectionTimeouts;
    private _outcomes;
    _lastDisplayedCompletion: {
        id: string;
        displayedAt: number;
    } | undefined;
    createAbortController(completionId: string): AbortController;
    deleteAbortController(completionId: string): void;
    cancel(): void;
    accept(completionId: string): AutocompleteOutcome | undefined;
    cancelRejectionTimeout(completionId: string): void;
    markDisplayed(completionId: string, outcome: AutocompleteOutcome): void;
    private logAutocompleteOutcome;
}
//# sourceMappingURL=AutocompleteLoggingService.d.ts.map