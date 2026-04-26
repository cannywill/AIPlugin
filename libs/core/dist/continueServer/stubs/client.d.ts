import type { ArtifactType, EmbeddingsCacheResponse, IContinueServerClient } from "../interface.js";
export declare class ContinueServerClient implements IContinueServerClient {
    private readonly userToken;
    url: URL | undefined;
    constructor(serverUrl: string | undefined, userToken: string | undefined);
    getUserToken(): string | undefined;
    get connected(): boolean;
    getConfig(): Promise<{
        configJson: string;
    }>;
    getFromIndexCache<T extends ArtifactType>(keys: string[], artifactId: T, repoName: string | undefined): Promise<EmbeddingsCacheResponse<T>>;
    sendFeedback(feedback: string, data: string): Promise<void>;
}
//# sourceMappingURL=client.d.ts.map