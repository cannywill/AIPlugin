import { getControlPlaneEnv } from "../../control-plane/env.js";
import doLoadConfig from "./doLoadConfig.js";
export default class PlatformProfileLoader {
    static RELOAD_INTERVAL = 1000 * 5; // 5 seconds
    configResult;
    ownerSlug;
    packageSlug;
    iconUrl;
    versionSlug;
    controlPlaneClient;
    ide;
    llmLogger;
    description;
    orgScopeId;
    constructor({ configResult, ownerSlug, packageSlug, iconUrl, versionSlug, controlPlaneClient, ide, llmLogger, description, orgScopeId, }) {
        this.configResult = configResult;
        this.ownerSlug = ownerSlug;
        this.packageSlug = packageSlug;
        this.iconUrl = iconUrl;
        this.versionSlug = versionSlug;
        this.controlPlaneClient = controlPlaneClient;
        this.ide = ide;
        this.llmLogger = llmLogger;
        this.description = description;
        this.orgScopeId = orgScopeId;
    }
    static async create({ configResult, ownerSlug, packageSlug, iconUrl, versionSlug, controlPlaneClient, ide, llmLogger, rawYaml, orgScopeId, }) {
        const controlPlaneEnv = await getControlPlaneEnv(ide.getIdeSettings());
        const description = {
            id: `${ownerSlug}/${packageSlug}`,
            profileType: "platform",
            fullSlug: {
                ownerSlug,
                packageSlug,
                versionSlug,
            },
            title: configResult.config?.name ?? `${ownerSlug}/${packageSlug}`,
            errors: configResult.errors,
            iconUrl: iconUrl,
            uri: `${controlPlaneEnv.APP_URL}${ownerSlug}/${packageSlug}`,
            rawYaml,
        };
        return new PlatformProfileLoader({
            configResult,
            ownerSlug,
            packageSlug,
            iconUrl,
            versionSlug,
            controlPlaneClient,
            ide,
            llmLogger,
            description,
            orgScopeId,
        });
    }
    async doLoadConfig() {
        if (this.configResult.errors?.find((e) => e.fatal)) {
            return {
                config: undefined,
                errors: this.configResult.errors,
                configLoadInterrupted: false,
            };
        }
        const results = await doLoadConfig({
            ide: this.ide,
            controlPlaneClient: this.controlPlaneClient,
            llmLogger: this.llmLogger,
            overrideConfigYaml: this.configResult.config,
            profileId: this.description.id,
            orgScopeId: this.orgScopeId,
            packageIdentifier: {
                uriType: "slug",
                fullSlug: {
                    ownerSlug: this.ownerSlug,
                    packageSlug: this.packageSlug,
                    versionSlug: this.versionSlug,
                },
            },
        });
        return {
            config: results.config,
            errors: [...(this.configResult.errors ?? []), ...(results.errors ?? [])],
            configLoadInterrupted: results.configLoadInterrupted,
        };
    }
    setIsActive(isActive) { }
}
