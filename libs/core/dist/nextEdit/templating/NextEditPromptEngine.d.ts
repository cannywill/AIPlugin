import { NEXT_EDIT_MODELS } from "../../llm/constants";
import { NextEditTemplate, TemplateVars } from "../types";
export declare const NEXT_EDIT_MODEL_TEMPLATES: Record<NEXT_EDIT_MODELS, NextEditTemplate>;
export declare class PromptTemplateRenderer {
    private compiledTemplate;
    constructor(template: string);
    render(vars: TemplateVars): string;
}
export declare function getTemplateForModel(modelName: NEXT_EDIT_MODELS): string;
//# sourceMappingURL=NextEditPromptEngine.d.ts.map