import { DataLogger } from "../../data/log";
import { COUNT_COMPLETION_REJECTED_AFTER } from "../../util/parameters";
import { Telemetry } from "../../util/posthog";
import { getUriFileExtension } from "../../util/uri";
export class AutocompleteLoggingService {
    // Key is completionId
    _abortControllers = new Map();
    _logRejectionTimeouts = new Map();
    _outcomes = new Map();
    _lastDisplayedCompletion = undefined;
    createAbortController(completionId) {
        const abortController = new AbortController();
        this._abortControllers.set(completionId, abortController);
        return abortController;
    }
    deleteAbortController(completionId) {
        this._abortControllers.delete(completionId);
    }
    cancel() {
        this._abortControllers.forEach((abortController, id) => {
            abortController.abort();
        });
        this._abortControllers.clear();
    }
    accept(completionId) {
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        if (this._outcomes.has(completionId)) {
            const outcome = this._outcomes.get(completionId);
            outcome.accepted = true;
            this.logAutocompleteOutcome(outcome);
            this._outcomes.delete(completionId);
            return outcome;
        }
    }
    cancelRejectionTimeout(completionId) {
        if (this._logRejectionTimeouts.has(completionId)) {
            clearTimeout(this._logRejectionTimeouts.get(completionId));
            this._logRejectionTimeouts.delete(completionId);
        }
        if (this._outcomes.has(completionId)) {
            this._outcomes.delete(completionId);
        }
    }
    markDisplayed(completionId, outcome) {
        const logRejectionTimeout = setTimeout(() => {
            // Wait 10 seconds, then assume it wasn't accepted
            outcome.accepted = false;
            this.logAutocompleteOutcome(outcome);
            this._logRejectionTimeouts.delete(completionId);
        }, COUNT_COMPLETION_REJECTED_AFTER);
        this._outcomes.set(completionId, outcome);
        this._logRejectionTimeouts.set(completionId, logRejectionTimeout);
        // If the previously displayed completion is still waiting for rejection,
        // and this one is a continuation of that (the outcome.completion is the same modulo prefix)
        // then we should cancel the rejection timeout
        const previous = this._lastDisplayedCompletion;
        const now = Date.now();
        if (previous && this._logRejectionTimeouts.has(previous.id)) {
            const previousOutcome = this._outcomes.get(previous.id);
            const c1 = previousOutcome?.completion.split("\n")[0] ?? "";
            const c2 = outcome.completion.split("\n")[0];
            if (previousOutcome &&
                (c1.endsWith(c2) ||
                    c2.endsWith(c1) ||
                    c1.startsWith(c2) ||
                    c2.startsWith(c1))) {
                this.cancelRejectionTimeout(previous.id);
            }
            else if (now - previous.displayedAt < 500) {
                // If a completion isn't shown for more than
                this.cancelRejectionTimeout(previous.id);
            }
        }
        this._lastDisplayedCompletion = {
            id: completionId,
            displayedAt: now,
        };
    }
    logAutocompleteOutcome(outcome) {
        void DataLogger.getInstance().logDevData({
            name: "autocomplete",
            data: {
                ...outcome,
                useFileSuffix: true, // from outdated schema
            },
        });
        const { prompt, completion, prefix, suffix, ...restOfOutcome } = outcome;
        const toLog = {
            accepted: restOfOutcome.accepted,
            cacheHit: restOfOutcome.cacheHit,
            completionId: restOfOutcome.completionId,
            completionOptions: restOfOutcome.completionOptions,
            debounceDelay: restOfOutcome.debounceDelay,
            fileExtension: getUriFileExtension(restOfOutcome.filepath),
            maxPromptTokens: restOfOutcome.maxPromptTokens,
            modelName: restOfOutcome.modelName,
            modelProvider: restOfOutcome.modelProvider,
            multilineCompletions: restOfOutcome.multilineCompletions,
            time: restOfOutcome.time,
            useRecentlyEdited: restOfOutcome.useRecentlyEdited,
            numLines: restOfOutcome.numLines,
            profileType: restOfOutcome.profileType,
        };
        outcome.enabledStaticContextualization
            ? void Telemetry.capture("autocomplete", {
                ...toLog,
                enabledStaticContextualization: true,
            })
            : void Telemetry.capture("autocomplete", toLog);
    }
}
