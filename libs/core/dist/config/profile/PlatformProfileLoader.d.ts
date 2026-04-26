import { AssistantUnrolled, ConfigResult } from "@continuedev/config-yaml";
import { ControlPlaneClient } from "../../control-plane/client.js";
import { ContinueConfig, IDE, ILLMLogger } from "../../index.js";
import { ProfileDescription } from "../ProfileLifecycleManager.js";
import { IProfileLoader } from "./IProfileLoader.js";
/**
 * Metadata about the package that is currently being loaded
 * If this is `undefined`, it's not a config from the platform,
 * could be local for example.
 */
export interface PlatformConfigMetadata {
    ownerSlug: string;
    packageSlug: string;
}
export default class PlatformProfileLoader implements IProfileLoader {
    static RELOAD_INTERVAL: number;
    private configResult;
    private readonly ownerSlug;
    private readonly packageSlug;
    private readonly iconUrl;
    private readonly versionSlug;
    private readonly controlPlaneClient;
    private readonly ide;
    private llmLogger;
    readonly description: ProfileDescription;
    private readonly orgScopeId;
    private constructor();
    static create({ configResult, ownerSlug, packageSlug, iconUrl, versionSlug, controlPlaneClient, ide, llmLogger, rawYaml, orgScopeId, }: {
        configResult: ConfigResult<AssistantUnrolled>;
        ownerSlug: string;
        packageSlug: string;
        iconUrl: string;
        versionSlug: string;
        controlPlaneClient: ControlPlaneClient;
        ide: IDE;
        llmLogger: ILLMLogger;
        rawYaml: string;
        orgScopeId: string | null;
    }): Promise<PlatformProfileLoader>;
    doLoadConfig(): Promise<ConfigResult<ContinueConfig>>;
    setIsActive(isActive: boolean): void;
}
//# sourceMappingURL=PlatformProfileLoader.d.ts.map