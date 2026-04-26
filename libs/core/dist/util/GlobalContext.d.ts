import { ModelRole } from "@continuedev/config-yaml";
import { OAuthClientInformationFull, OAuthTokens } from "@modelcontextprotocol/sdk/shared/auth.js";
import { SiteIndexingConfig } from "..";
import { SharedConfigSchema } from "../config/sharedConfig";
export type GlobalContextModelSelections = Partial<Record<ModelRole, string | null>>;
export type GlobalContextType = {
    indexingPaused: boolean;
    lastSelectedProfileForWorkspace: {
        [workspaceIdentifier: string]: string | null;
    };
    lastSelectedOrgIdForWorkspace: {
        [workspaceIdentifier: string]: string | null;
    };
    selectedModelsByProfileId: {
        [profileId: string]: GlobalContextModelSelections;
    };
    cliSelectedModel?: string;
    /**
     * This is needed to handle the case where a JetBrains user has created
     * docs embeddings using one provider, and then updates to a new provider.
     *
     * For VS Code users, it is unnecessary since we use transformers.js by default.
     */
    hasDismissedConfigTsNoticeJetBrains: boolean;
    hasAlreadyCreatedAPromptFile: boolean;
    hasShownUnsupportedPlatformWarning: boolean;
    showConfigUpdateToast: boolean;
    isSupportedLanceDbCpuTargetForLinux: boolean;
    sharedConfig: SharedConfigSchema;
    failedDocs: SiteIndexingConfig[];
    shownDeprecatedProviderWarnings: {
        [providerTitle: string]: boolean;
    };
    autoUpdateCli: boolean;
    mcpOauthStorage: {
        [serverUrl: string]: {
            clientInformation?: OAuthClientInformationFull;
            tokens?: OAuthTokens;
            codeVerifier?: string;
        };
    };
};
/**
 * A way to persist global state
 */
export declare class GlobalContext {
    update<T extends keyof GlobalContextType>(key: T, value: GlobalContextType[T]): void;
    get<T extends keyof GlobalContextType>(key: T): GlobalContextType[T] | undefined;
    getSharedConfig(): SharedConfigSchema;
    updateSharedConfig(newValues: Partial<SharedConfigSchema>): SharedConfigSchema;
    updateSelectedModel(profileId: string, role: ModelRole, title: string | null): GlobalContextModelSelections;
}
//# sourceMappingURL=GlobalContext.d.ts.map