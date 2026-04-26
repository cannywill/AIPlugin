import { ControlPlaneProxyInfo, IAnalyticsProvider } from "./analytics/IAnalyticsProvider.js";
import { ControlPlaneClient } from "./client.js";
import { AnalyticsConfig } from "../index.js";
export declare class TeamAnalytics {
    static provider: IAnalyticsProvider | undefined;
    static uniqueId: string;
    static os: string | undefined;
    static extensionVersion: string | undefined;
    static capture(event: string, properties: {
        [key: string]: any;
    }): Promise<void>;
    static setup(config: AnalyticsConfig, uniqueId: string, extensionVersion: string, controlPlaneClient: ControlPlaneClient, controlPlaneProxyInfo: ControlPlaneProxyInfo): Promise<void>;
    static shutdown(): Promise<void>;
}
//# sourceMappingURL=TeamAnalytics.d.ts.map