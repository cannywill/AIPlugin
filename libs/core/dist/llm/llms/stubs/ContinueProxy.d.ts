import { ControlPlaneProxyInfo } from "../../../control-plane/analytics/IAnalyticsProvider.js";
import OpenAI from "../OpenAI.js";
import type { Chunk, LLMOptions } from "../../../index.js";
import { LLMConfigurationStatuses } from "../../constants.js";
import { LlmApiRequestType } from "../../openaiTypeConverters.js";
declare class ContinueProxy extends OpenAI {
    set controlPlaneProxyInfo(value: ControlPlaneProxyInfo);
    protected useOpenAIAdapterFor: (LlmApiRequestType | "*")[];
    private actualApiBase?;
    private configEnv?;
    constructor(options: LLMOptions);
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    get underlyingProviderName(): string;
    protected extraBodyProperties(): Record<string, any>;
    getConfigurationStatus(): LLMConfigurationStatuses;
    protected _getHeaders(): any;
    private _getUserAgent;
    supportsCompletions(): boolean;
    supportsFim(): boolean;
    rerank(query: string, chunks: Chunk[]): Promise<number[]>;
}
export default ContinueProxy;
//# sourceMappingURL=ContinueProxy.d.ts.map