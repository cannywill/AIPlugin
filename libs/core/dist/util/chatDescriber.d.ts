import { ILLM, LLMFullCompletionOptions } from "..";
import type { FromCoreProtocol, ToCoreProtocol } from "../protocol";
import type { IMessenger } from "../protocol/messenger";
export declare class ChatDescriber {
    static maxTokens: number;
    static prompt: string | undefined;
    static messenger: IMessenger<ToCoreProtocol, FromCoreProtocol>;
    static describe(model: ILLM, completionOptions: LLMFullCompletionOptions, message: string): Promise<string | undefined>;
    static describeWithBaseLlmApi(llmApi: any, // BaseLlmApi - using any to avoid import issues
    modelConfig: any, // ModelConfig - using any to avoid import issues
    message: string): Promise<string | undefined>;
}
//# sourceMappingURL=chatDescriber.d.ts.map