import { HelperVars } from "../../autocomplete/util/HelperVars.js";
import { ModelSpecificContext, Prompt, PromptMetadata } from "../types.js";
import { BaseNextEditModelProvider } from "./BaseNextEditProvider.js";
export declare class MercuryCoderProvider extends BaseNextEditModelProvider {
    private templateRenderer;
    constructor();
    getSystemPrompt(): string;
    getWindowSize(): {
        topMargin: number;
        bottomMargin: number;
    };
    shouldInjectUniqueToken(): boolean;
    getUniqueToken(): string;
    extractCompletion(message: string): string;
    buildPromptContext(context: ModelSpecificContext): any;
    generatePrompts(context: ModelSpecificContext): Promise<Prompt[]>;
    buildPromptMetadata(context: ModelSpecificContext): PromptMetadata;
    calculateEditableRegion(helper: HelperVars, usingFullFileDiff: boolean): {
        editableRegionStartLine: number;
        editableRegionEndLine: number;
    };
}
//# sourceMappingURL=MercuryCoderNextEditProvider.d.ts.map