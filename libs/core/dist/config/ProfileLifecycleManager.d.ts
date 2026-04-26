import { ConfigResult, ConfigValidationError, FullSlug, Policy } from "@continuedev/config-yaml";
import { BrowserSerializedContinueConfig, ContinueConfig, IContextProvider, IDE } from "../index.js";
import { IProfileLoader } from "./profile/IProfileLoader.js";
export interface ProfileDescription {
    fullSlug: FullSlug;
    profileType: "control-plane" | "local" | "platform";
    title: string;
    id: string;
    iconUrl: string;
    errors: ConfigValidationError[] | undefined;
    uri: string;
    rawYaml?: string;
}
export interface OrganizationDescription {
    id: string;
    iconUrl: string;
    name: string;
    slug: string | undefined;
    policy?: Policy;
}
export type OrgWithProfiles = OrganizationDescription & {
    profiles: ProfileLifecycleManager[];
    currentProfile: ProfileLifecycleManager | null;
};
export type SerializedOrgWithProfiles = OrganizationDescription & {
    profiles: ProfileDescription[];
    selectedProfileId: string | null;
};
export declare class ProfileLifecycleManager {
    private readonly profileLoader;
    private readonly ide;
    private savedConfigResult;
    private savedBrowserConfigResult?;
    private pendingConfigPromise?;
    constructor(profileLoader: IProfileLoader, ide: IDE);
    get profileDescription(): ProfileDescription;
    clearConfig(): void;
    reloadConfig(additionalContextProviders?: IContextProvider[]): Promise<ConfigResult<ContinueConfig>>;
    loadConfig(additionalContextProviders: IContextProvider[], forceReload?: boolean): Promise<ConfigResult<ContinueConfig>>;
    getSerializedConfig(additionalContextProviders: IContextProvider[]): Promise<ConfigResult<BrowserSerializedContinueConfig>>;
}
//# sourceMappingURL=ProfileLifecycleManager.d.ts.map