import { HelperVars } from "../../autocomplete/util/HelperVars.js";
import { DiffLine, IDE, ILLM, Position } from "../../index.js";
import { ModelSpecificContext, NextEditOutcome, Prompt, PromptMetadata } from "../types.js";
/**
 * This class is used as an abstract base class for model-specific providers.
 * This and its children are responsible for pre/post processing of prompts and outcomes.
 * Different next edit models have very different requirements.
 */
export declare abstract class BaseNextEditModelProvider {
    protected readonly modelName: string;
    constructor(modelName: string);
    abstract getSystemPrompt(): string;
    abstract generatePrompts(context: ModelSpecificContext): Promise<Prompt[]>;
    abstract extractCompletion(message: string): string;
    abstract buildPromptContext(context: ModelSpecificContext): any;
    abstract buildPromptMetadata(context: ModelSpecificContext): PromptMetadata;
    abstract getWindowSize(): {
        topMargin: number;
        bottomMargin: number;
    };
    abstract calculateEditableRegion(helper: HelperVars, usingFullFileDiff: boolean): {
        editableRegionStartLine: number;
        editableRegionEndLine: number;
    };
    handlePartialFileDiff(params: {
        helper: HelperVars;
        editableRegionStartLine: number;
        editableRegionEndLine: number;
        startTime: number;
        llm: ILLM;
        nextCompletion: string;
        promptMetadata: PromptMetadata;
        ide: IDE;
        profileType?: "local" | "platform" | "control-plane";
    }): Promise<NextEditOutcome>;
    handleFullFileDiff(params: {
        helper: HelperVars;
        editableRegionStartLine: number;
        editableRegionEndLine: number;
        startTime: number;
        llm: ILLM;
        nextCompletion: string;
        promptMetadata: PromptMetadata;
        ide: IDE;
        profileType?: "local" | "platform" | "control-plane";
    }): Promise<NextEditOutcome | undefined>;
    /**
     * Process diff groups and find the one containing the cursor.
     */
    private processDiffGroups;
    private addDiffGroupToPrefetchQueue;
    private createOutcomeFromDiffGroup;
    protected createNextEditOutcome(outcomeCtx: {
        helper: HelperVars;
        startTime: number;
        llm: ILLM;
        promptContent: string;
        completion: string;
        finalCursorPosition: Position;
        editableRegionStartLine: number;
        editableRegionEndLine: number;
        userEdits: string;
        userExcerpts: string;
        originalEditableRange: string;
        cursorPosition?: Position;
        completionId?: string;
        diffLines: DiffLine[];
        ide: IDE;
        profileType?: "local" | "platform" | "control-plane";
    }): Promise<NextEditOutcome>;
    protected calculateOptimalEditableRegion(helper: HelperVars, maxTokens?: number, heuristic?: "fourChars" | "tokenizer"): {
        editableRegionStartLine: number;
        editableRegionEndLine: number;
    };
    shouldInjectUniqueToken(): boolean;
    getUniqueToken(): string | null;
}
//# sourceMappingURL=BaseNextEditProvider.d.ts.map