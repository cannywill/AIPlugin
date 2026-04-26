import { Analytics } from "@continuedev/config-types";
import { ControlPlaneProxyInfo, IAnalyticsProvider } from "./IAnalyticsProvider.js";
export default class LogStashAnalyticsProvider implements IAnalyticsProvider {
    private host?;
    private port?;
    private uniqueId?;
    capture(event: string, properties: {
        [key: string]: any;
    }): Promise<void>;
    setup(config: Analytics, uniqueId: string, controlPlaneProxyInfo?: ControlPlaneProxyInfo): Promise<void>;
    shutdown(): Promise<void>;
}
//# sourceMappingURL=LogStashAnalyticsProvider.d.ts.map