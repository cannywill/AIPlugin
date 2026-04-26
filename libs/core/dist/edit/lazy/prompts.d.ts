import { ChatMessage } from "../..";
export declare const UNCHANGED_CODE = "UNCHANGED CODE";
type LazyApplyPrompt = (oldCode: string, filename: string, newCode: string) => ChatMessage[];
export declare function lazyApplyPromptForModel(model: string, provider: string): LazyApplyPrompt | undefined;
export {};
//# sourceMappingURL=prompts.d.ts.map