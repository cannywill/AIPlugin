import os from "node:os";
import ContinueProxyAnalyticsProvider from "./analytics/ContinueProxyAnalyticsProvider.js";
import LogStashAnalyticsProvider from "./analytics/LogStashAnalyticsProvider.js";
import PostHogAnalyticsProvider from "./analytics/PostHogAnalyticsProvider.js";
function createAnalyticsProvider(config) {
    // @ts-ignore
    switch (config.provider) {
        case "posthog":
            return new PostHogAnalyticsProvider();
        case "logstash":
            return new LogStashAnalyticsProvider();
        case "continue-proxy":
            return new ContinueProxyAnalyticsProvider();
        default:
            return undefined;
    }
}
export class TeamAnalytics {
    static provider = undefined;
    static uniqueId = "NOT_UNIQUE";
    static os = undefined;
    static extensionVersion = undefined;
    static async capture(event, properties) {
        void TeamAnalytics.provider?.capture(event, {
            ...properties,
            os: TeamAnalytics.os,
            extensionVersion: TeamAnalytics.extensionVersion,
        });
    }
    static async setup(config, uniqueId, extensionVersion, controlPlaneClient, controlPlaneProxyInfo) {
        TeamAnalytics.uniqueId = uniqueId;
        TeamAnalytics.os = os.platform();
        TeamAnalytics.extensionVersion = extensionVersion;
        TeamAnalytics.provider = createAnalyticsProvider(config);
        await TeamAnalytics.provider?.setup(config, uniqueId, controlPlaneProxyInfo);
        if (config.provider === "continue-proxy") {
            TeamAnalytics.provider.controlPlaneClient = controlPlaneClient;
        }
    }
    static async shutdown() {
        if (TeamAnalytics.provider) {
            await TeamAnalytics.provider.shutdown();
            TeamAnalytics.provider = undefined;
            TeamAnalytics.os = undefined;
            TeamAnalytics.extensionVersion = undefined;
            TeamAnalytics.uniqueId = "NOT_UNIQUE";
        }
    }
}
