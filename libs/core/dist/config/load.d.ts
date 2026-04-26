import { ConfigResult } from "@continuedev/config-yaml";
import { BrowserSerializedContinueConfig, ContextProviderWithParams, ContinueConfig, CustomContextProvider, IDE, IdeInfo, IdeSettings, ILLMLogger, SerializedContinueConfig } from "..";
export declare function resolveSerializedConfig(filepath: string): SerializedContinueConfig;
export declare function isContextProviderWithParams(contextProvider: CustomContextProvider | ContextProviderWithParams): contextProvider is ContextProviderWithParams;
declare function finalToBrowserConfig(final: ContinueConfig, ide: IDE): Promise<BrowserSerializedContinueConfig>;
declare function loadContinueConfigFromJson(ide: IDE, ideSettings: IdeSettings, ideInfo: IdeInfo, uniqueId: string, llmLogger: ILLMLogger, workOsAccessToken: string | undefined, overrideConfigJson: SerializedContinueConfig | undefined): Promise<ConfigResult<ContinueConfig>>;
export { finalToBrowserConfig, loadContinueConfigFromJson, type BrowserSerializedContinueConfig, };
//# sourceMappingURL=load.d.ts.map