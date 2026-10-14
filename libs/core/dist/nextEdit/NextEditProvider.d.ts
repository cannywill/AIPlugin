import { ConfigHandler } from "../config/ConfigHandler.js";
import { IDE, ILLM, Range, RangeInFile } from "../index.js";
import { AutocompleteCodeSnippet } from "../autocomplete/snippets/types.js";
import { GetLspDefinitionsFunction } from "../autocomplete/types.js";
import { AutocompleteInput } from "../autocomplete/util/types.js";
import { NextEditOutcome, RecentlyEditedRange } from "./types.js";
/**
 * This is the next edit analogue to autocomplete's CompletionProvider.
 * You will see a lot of similar if not identical methods to CompletionProvider methods.
 * All logic used to live inside this class, but that became untenable quickly.
 * I moved a lot of the model-specific logic (prompt building, pre/post processing, etc.) to the BaseNextEditProvider and the children inheriting from it.
 * Keeping this class around might be a good idea because it handles lots of delicate logic such as abort signals, chains, logging, etc.
 * There being a singleton also gives a lot of guarantees about the state of the next edit state machine.
 */
export declare class NextEditProvider {
    private readonly configHandler;
    private readonly ide;
    private readonly _injectedGetLlm;
    private readonly _onError;
    private readonly getDefinitionsFromLsp;
    private static instance;
    private autocompleteCache;
    errorsShown: Set<string>;
    private bracketMatchingService;
    private debouncer;
    private completionStreamer;
    private loggingService;
    private contextRetrievalService;
    private endpointType;
    private diffContext;
    private autocompleteContext;
    private promptMetadata;
    private currentEditChainId;
    private previousRequest;
    private previousCompletions;
    private modelProvider;
    private constructor();
    static initialize(configHandler: ConfigHandler, ide: IDE, injectedGetLlm: () => Promise<ILLM | undefined>, onError: (e: any) => void, getDefinitionsFromLsp: GetLspDefinitionsFunction, endpointType: "default" | "fineTuned"): NextEditProvider;
    static getInstance(): NextEditProvider;
    addDiffToContext(diff: string): void;
    addAutocompleteContext(ctx: string): void;
    private _prepareLlm;
    private onError;
    cancel(): void;
    accept(completionId: string): void;
    reject(completionId: string): void;
    markDisplayed(completionId: string, outcome: NextEditOutcome): void;
    private _getAutocompleteOptions;
    chainExists(): boolean;
    getChainLength(): number;
    getPreviousCompletion(): NextEditOutcome | null;
    deleteChain(): Promise<void>;
    startChain(id?: string): void;
    getChain(): NextEditOutcome[];
    isStartOfChain(): boolean;
    /**
     * This is the main entry point to this class.
     */
    provideInlineCompletionItems(input: AutocompleteInput, token: AbortSignal | undefined, opts?: {
        withChain: boolean;
        usingFullFileDiff: boolean;
    }): Promise<NextEditOutcome | undefined>;
    private _initializeCompletionRequest;
    private _generatePrompts;
    private _handleCompletion;
    /**
     * This is a wrapper around provideInlineCompletionItems.
     * This is invoked when we call the model in the background using prefetch.
     * It's not currently used anywhere (references are not used either), but I decided to keep it in case we actually need to use prefetch.
     * You will see that calls to this method is made from NextEditPrefetchQueue.proecss(), which is wrapped in `if (!this.usingFullFileDiff)`.
     */
    provideInlineCompletionItemsWithChain(ctx: {
        completionId: string;
        manuallyPassFileContents?: string;
        manuallyPassPrefix?: string;
        selectedCompletionInfo?: {
            text: string;
            range: Range;
        };
        isUntitledFile: boolean;
        recentlyVisitedRanges: AutocompleteCodeSnippet[];
        recentlyEditedRanges: RecentlyEditedRange[];
    }, nextEditLocation: RangeInFile, token: AbortSignal | undefined, usingFullFileDiff: boolean): Promise<NextEditOutcome | undefined>;
    private buildAutocompleteInputFromChain;
}
//# sourceMappingURL=NextEditProvider.d.ts.map