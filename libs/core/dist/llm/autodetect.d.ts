import { ChatMessage, ModelCapability, ModelDescription, TemplateType } from "../index.js";
declare function modelSupportsImages(provider: string, model: string, title: string | undefined, capabilities: ModelCapability | undefined): boolean;
declare function modelSupportsReasoning(model: ModelDescription | null | undefined): boolean;
declare function llmCanGenerateInParallel(provider: string, model: string): boolean;
declare function modelSupportsNextEdit(capabilities: ModelCapability | undefined, model: string, title: string | undefined): boolean;
declare function autodetectTemplateType(model: string): TemplateType | undefined;
declare function autodetectTemplateFunction(model: string, provider: string, explicitTemplate?: TemplateType | undefined): ((msg: ChatMessage[]) => string) | null;
declare function autodetectPromptTemplates(model: string, explicitTemplate?: TemplateType | undefined): Record<string, any>;
export { autodetectPromptTemplates, autodetectTemplateFunction, autodetectTemplateType, llmCanGenerateInParallel, modelSupportsImages, modelSupportsNextEdit, modelSupportsReasoning, };
//# sourceMappingURL=autodetect.d.ts.map