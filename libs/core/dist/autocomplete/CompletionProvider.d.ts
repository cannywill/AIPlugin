import { ConfigHandler } from "../config/ConfigHandler.js";
import { IDE, ILLM } from "../index.js";
import { GetLspDefinitionsFunction } from "./types.js";
import { AutocompleteInput, AutocompleteOutcome } from "./util/types.js";
export declare class CompletionProvider {
    private readonly configHandler;
    private readonly ide;
    private readonly _injectedGetLlm;
    private readonly _onError;
    private readonly getDefinitionsFromLsp;
    private autocompleteCache?;
    errorsShown: Set<string>;
    private bracketMatchingService;
    private debouncer;
    private completionStreamer;
    private loggingService;
    private contextRetrievalService;
    constructor(configHandler: ConfigHandler, ide: IDE, _injectedGetLlm: () => Promise<ILLM | undefined>, _onError: (e: any) => void, getDefinitionsFromLsp: GetLspDefinitionsFunction);
    private initCache;
    private getCache;
    private _prepareLlm;
    private onError;
    cancel(): void;
    accept(completionId: string): void;
    markDisplayed(completionId: string, outcome: AutocompleteOutcome): void;
    private _getAutocompleteOptions;
    provideInlineCompletionItems(input: AutocompleteInput, token: AbortSignal | undefined, force?: boolean): Promise<AutocompleteOutcome | undefined>;
    dispose(): Promise<void>;
}
//# sourceMappingURL=CompletionProvider.d.ts.map