import { Analytics } from "@continuedev/config-types";
import { ControlPlaneProxyInfo, IAnalyticsProvider } from "./IAnalyticsProvider.js";
export default class PostHogAnalyticsProvider implements IAnalyticsProvider {
    client?: any;
    uniqueId?: string;
    capture(event: string, properties: {
        [key: string]: any;
    }): Promise<void>;
    setup(config: Analytics, uniqueId: string, controlPlaneProxyInfo?: ControlPlaneProxyInfo): Promise<void>;
    shutdown(): Promise<void>;
}
//# sourceMappingURL=PostHogAnalyticsProvider.d.ts.map