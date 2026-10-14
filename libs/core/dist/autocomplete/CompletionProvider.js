import OpenAI from "../llm/llms/OpenAI.js";
import { DEFAULT_AUTOCOMPLETE_OPTS } from "../util/parameters.js";
import { shouldCompleteMultiline } from "./classification/shouldCompleteMultiline.js";
import { ContextRetrievalService } from "./context/ContextRetrievalService.js";
import { isSecurityConcern } from "../indexing/ignore.js";
import { BracketMatchingService } from "./filtering/BracketMatchingService.js";
import { CompletionStreamer } from "./generation/CompletionStreamer.js";
import { postprocessCompletion } from "./postprocessing/index.js";
import { shouldPrefilter } from "./prefiltering/index.js";
import { getAllSnippetsWithoutRace } from "./snippets/index.js";
import { renderPromptWithTokenLimit } from "./templating/index.js";
import { AutocompleteDebouncer } from "./util/AutocompleteDebouncer.js";
import { AutocompleteLoggingService } from "./util/AutocompleteLoggingService.js";
import AutocompleteLruCache from "./util/AutocompleteLruCache.js";
import { HelperVars } from "./util/HelperVars.js";
const autocompleteCachePromise = AutocompleteLruCache.get();
// Errors that can be expected on occasion even during normal functioning should not be shown.
// Not worth disrupting the user to tell them that a single autocomplete request didn't go through
const ERRORS_TO_IGNORE = [
    // From Ollama
    "unexpected server status",
    "operation was aborted",
];
export class CompletionProvider {
    configHandler;
    ide;
    _injectedGetLlm;
    _onError;
    getDefinitionsFromLsp;
    autocompleteCache;
    errorsShown = new Set();
    bracketMatchingService = new BracketMatchingService();
    debouncer = new AutocompleteDebouncer();
    completionStreamer;
    loggingService = new AutocompleteLoggingService();
    contextRetrievalService;
    constructor(configHandler, ide, _injectedGetLlm, _onError, getDefinitionsFromLsp) {
        this.configHandler = configHandler;
        this.ide = ide;
        this._injectedGetLlm = _injectedGetLlm;
        this._onError = _onError;
        this.getDefinitionsFromLsp = getDefinitionsFromLsp;
        this.completionStreamer = new CompletionStreamer(this.onError.bind(this));
        this.contextRetrievalService = new ContextRetrievalService(this.ide);
        void this.initCache();
    }
    async initCache() {
        try {
            this.autocompleteCache = await autocompleteCachePromise;
        }
        catch (e) {
            console.error("Failed to initialize autocomplete cache:", e);
        }
    }
    async getCache() {
        if (!this.autocompleteCache) {
            this.autocompleteCache = await autocompleteCachePromise;
        }
        return this.autocompleteCache;
    }
    async _prepareLlm() {
        const llm = await this._injectedGetLlm();
        if (!llm) {
            return undefined;
        }
        // Temporary fix for JetBrains autocomplete bug as described in https://github.com/continuedev/continue/pull/3022
        if (llm.model === undefined && llm.completionOptions?.model !== undefined) {
            llm.model = llm.completionOptions.model;
        }
        // Ignore empty API keys for Mistral since we currently write
        // a template provider without one during onboarding
        if (llm.providerName === "mistral" && llm.apiKey === "") {
            return undefined;
        }
        // Set temperature (but don't override)
        if (llm.completionOptions.temperature === undefined) {
            llm.completionOptions.temperature = 0.01;
        }
        if (llm instanceof OpenAI && llm.providerName !== "openrouter") {
            llm.useLegacyCompletionsEndpoint = true;
        }
        return llm;
    }
    onError(e) {
        if (ERRORS_TO_IGNORE.some((err) => typeof e === "string" ? e.includes(err) : e?.message?.includes(err))) {
            return;
        }
        console.warn("Error generating autocompletion: ", e);
        if (!this.errorsShown.has(e.message)) {
            this.errorsShown.add(e.message);
            this._onError(e);
        }
    }
    cancel() {
        this.loggingService.cancel();
    }
    accept(completionId) {
        const outcome = this.loggingService.accept(completionId);
        if (!outcome) {
            return;
        }
        this.bracketMatchingService.handleAcceptedCompletion(outcome.completion, outcome.filepath);
    }
    markDisplayed(completionId, outcome) {
        this.loggingService.markDisplayed(completionId, outcome);
    }
    async _getAutocompleteOptions(llm) {
        const { config } = await this.configHandler.loadConfig();
        const options = {
            ...DEFAULT_AUTOCOMPLETE_OPTS,
            ...config?.tabAutocompleteOptions,
            ...llm.autocompleteOptions,
        };
        // Enable static contextualization if defined.
        if (config?.experimental?.enableStaticContextualization) {
            options.experimental_enableStaticContextualization = true;
        }
        return options;
    }
    async provideInlineCompletionItems(input, token, force) {
        try {
            // Create abort signal if not given
            if (!token) {
                const controller = this.loggingService.createAbortController(input.completionId);
                token = controller.signal;
            }
            const startTime = Date.now();
            const llm = await this._prepareLlm();
            if (!llm) {
                return undefined;
            }
            if (isSecurityConcern(input.filepath)) {
                return undefined;
            }
            const options = await this._getAutocompleteOptions(llm);
            // Debounce
            if (!force) {
                if (await this.debouncer.delayAndShouldDebounce(options.debounceDelay)) {
                    return undefined;
                }
            }
            if (llm.promptTemplates?.autocomplete) {
                options.template = llm.promptTemplates.autocomplete;
            }
            const helper = await HelperVars.create(input, options, llm.model, this.ide);
            if (await shouldPrefilter(helper, this.ide)) {
                return undefined;
            }
            const [snippetPayload, workspaceDirs] = await Promise.all([
                getAllSnippetsWithoutRace({
                    helper,
                    ide: this.ide,
                    getDefinitionsFromLsp: this.getDefinitionsFromLsp,
                    contextRetrievalService: this.contextRetrievalService,
                }),
                this.ide.getWorkspaceDirs(),
            ]);
            const { prompt, prefix, suffix, completionOptions } = renderPromptWithTokenLimit({
                snippetPayload,
                workspaceDirs,
                helper,
                llm,
            });
            // Completion
            let completion = "";
            const cache = await this.getCache();
            const cachedCompletion = helper.options.useCache
                ? await cache.get(helper.prunedPrefix)
                : undefined;
            let cacheHit = false;
            if (cachedCompletion) {
                cacheHit = true;
                completion = cachedCompletion;
            }
            else {
                const multiline = !helper.options.transform || shouldCompleteMultiline(helper);
                const completionStream = this.completionStreamer.streamCompletionWithFilters(token, llm, prefix, suffix, prompt, multiline, completionOptions, helper);
                for await (const update of completionStream) {
                    completion += update;
                }
                // Don't postprocess if aborted
                if (token.aborted) {
                    return undefined;
                }
                const processedCompletion = helper.options.transform
                    ? postprocessCompletion({
                        completion,
                        prefix: helper.prunedPrefix,
                        suffix: helper.prunedSuffix,
                        llm,
                    })
                    : completion;
                completion = processedCompletion;
            }
            if (!completion) {
                return undefined;
            }
            const outcome = {
                time: Date.now() - startTime,
                completion,
                prefix,
                suffix,
                prompt,
                modelProvider: llm.underlyingProviderName,
                modelName: llm.model,
                completionOptions,
                cacheHit,
                filepath: helper.filepath,
                numLines: completion.split("\n").length,
                completionId: helper.input.completionId,
                gitRepo: await this.ide.getRepoName(helper.filepath),
                uniqueId: await this.ide.getUniqueId(),
                timestamp: new Date().toISOString(),
                profileType: this.configHandler.currentProfile?.profileDescription.profileType,
                ...helper.options,
            };
            if (options.experimental_enableStaticContextualization) {
                outcome.enabledStaticContextualization = true;
            }
            if (!outcome.cacheHit && helper.options.useCache) {
                void cache
                    .put(outcome.prefix, outcome.completion)
                    .catch((e) => console.warn(`Failed to save to cache: ${e.message}`));
            }
            // Flutter 环境下同样需要记录展示状态，避免重复触发
            this.markDisplayed(input.completionId, outcome);
            return outcome;
        }
        catch (e) {
            this.onError(e);
        }
        finally {
            this.loggingService.deleteAbortController(input.completionId);
        }
    }
    async dispose() {
        if (this.autocompleteCache) {
            await this.autocompleteCache.close();
        }
    }
}
