import { Analytics } from "@continuedev/config-types";
import { ControlPlaneClient } from "../client.js";
import { ControlPlaneProxyInfo, IAnalyticsProvider } from "./IAnalyticsProvider.js";
export default class ContinueProxyAnalyticsProvider implements IAnalyticsProvider {
    uniqueId?: string;
    controlPlaneProxyInfo?: ControlPlaneProxyInfo;
    controlPlaneClient?: ControlPlaneClient;
    capture(event: string, properties: {
        [key: string]: any;
    }): Promise<void>;
    setup(config: Analytics, uniqueId: string, controlPlaneProxyInfo?: ControlPlaneProxyInfo): Promise<void>;
    shutdown(): Promise<void>;
}
//# sourceMappingURL=ContinueProxyAnalyticsProvider.d.ts.map