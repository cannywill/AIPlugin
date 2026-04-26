import { CompletionOptions, ILLM } from "../..";
import { HelperVars } from "../util/HelperVars";
export declare class CompletionStreamer {
    private streamTransformPipeline;
    private generatorReuseManager;
    constructor(onError: (err: any) => void);
    streamCompletionWithFilters(token: AbortSignal, llm: ILLM, prefix: string, suffix: string, prompt: string, multiline: boolean, completionOptions: Partial<CompletionOptions> | undefined, helper: HelperVars): AsyncGenerator<string, void, unknown>;
}
//# sourceMappingURL=CompletionStreamer.d.ts.map