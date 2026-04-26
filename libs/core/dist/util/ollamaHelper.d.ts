import { IDE } from "..";
export interface ModelInfo {
    id: string;
    size: number;
    digest: string;
}
export declare function isOllamaInstalled(): Promise<boolean>;
export declare function startLocalOllama(ide: IDE): Promise<any>;
export declare function getRemoteModelInfo(modelId: string, signal?: AbortSignal): Promise<ModelInfo | undefined>;
//# sourceMappingURL=ollamaHelper.d.ts.map