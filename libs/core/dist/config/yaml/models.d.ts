import { ModelConfig } from "@continuedev/config-yaml";
import { ContinueConfig, ILLMLogger } from "../..";
import { BaseLLM } from "../../llm";
export declare function llmsFromModelConfig({ model, uniqueId, llmLogger, config, }: {
    model: ModelConfig;
    uniqueId: string;
    llmLogger: ILLMLogger;
    config: ContinueConfig;
}): Promise<BaseLLM[]>;
//# sourceMappingURL=models.d.ts.map