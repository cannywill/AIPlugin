import { ConfigResult, ConfigValidationError } from "@continuedev/config-yaml";
import { ControlPlaneClient } from "../control-plane/client.js";
import { BrowserSerializedContinueConfig, ContinueConfig, IContextProvider, IDE, IdeSettings, ILLMLogger } from "../index.js";
import { ControlPlaneSessionInfo } from "../control-plane/AuthTypes.js";
import { LoadAssistantFilesOptions } from "./loadLocalAssistants.js";
import { OrgWithProfiles, ProfileDescription, ProfileLifecycleManager, SerializedOrgWithProfiles } from "./ProfileLifecycleManager.js";
export type { ProfileDescription };
type ConfigUpdateFunction = (payload: ConfigResult<ContinueConfig>) => void;
export declare class ConfigHandler {
    private readonly ide;
    private llmLogger;
    controlPlaneClient: ControlPlaneClient;
    private readonly globalContext;
    private globalLocalProfileManager;
    private organizations;
    currentProfile: ProfileLifecycleManager | null;
    currentOrg: OrgWithProfiles | null;
    totalConfigReloads: number;
    isInitialized: Promise<void>;
    private initter;
    cascadeAbortController: AbortController;
    private abortCascade;
    constructor(ide: IDE, llmLogger: ILLMLogger, initialSessionInfoPromise: Promise<ControlPlaneSessionInfo | undefined>);
    private workspaceDirs;
    getWorkspaceId(): Promise<string>;
    getProfileKey(orgId: string): Promise<string>;
    private cascadeInit;
    private getOrgs;
    getSerializedOrgs(): SerializedOrgWithProfiles[];
    private getHubProfiles;
    private getNonPersonalHubOrg;
    private PERSONAL_ORG_DESC;
    private getPersonalHubOrg;
    private getLocalOrg;
    private rectifyProfilesForOrg;
    getLocalProfiles(options: LoadAssistantFilesOptions): Promise<ProfileLifecycleManager[]>;
    refreshAll(reason?: string): Promise<void>;
    updateIdeSettings(ideSettings: IdeSettings): Promise<void>;
    updateControlPlaneSessionInfo(sessionInfo: ControlPlaneSessionInfo | undefined): Promise<boolean>;
    setSelectedOrgId(orgId: string, profileId?: string): Promise<void>;
    setSelectedProfileId(profileId: string): Promise<void>;
    reloadConfig(reason: string, injectErrors?: ConfigValidationError[]): Promise<{
        config: ContinueConfig | undefined;
        errors: ConfigValidationError[] | undefined;
        configLoadInterrupted: boolean;
    }>;
    private notifyConfigListeners;
    private updateListeners;
    onConfigUpdate(listener: ConfigUpdateFunction): void;
    getSerializedConfig(): Promise<ConfigResult<BrowserSerializedContinueConfig>>;
    loadConfig(): Promise<ConfigResult<ContinueConfig>>;
    openConfigProfile(profileId?: string, element?: {
        sourceFile?: string;
    }): Promise<void>;
    private additionalContextProviders;
    registerCustomContextProvider(contextProvider: IContextProvider): void;
    /**
     * Retrieves the titles of additional context providers that are of type "submenu".
     *
     * @returns {string[]} An array of titles of the additional context providers that have a description type of "submenu".
     */
    getAdditionalSubmenuContextProviders(): string[];
}
//# sourceMappingURL=ConfigHandler.d.ts.map