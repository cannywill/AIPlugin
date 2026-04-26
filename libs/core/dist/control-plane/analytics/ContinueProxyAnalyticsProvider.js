import fetch from "node-fetch";
export default class ContinueProxyAnalyticsProvider {
    uniqueId;
    controlPlaneProxyInfo;
    controlPlaneClient;
    async capture(event, properties) {
        if (!this.controlPlaneProxyInfo?.workspaceId) {
            return;
        }
        const url = new URL(`proxy/analytics/${this.controlPlaneProxyInfo.workspaceId}/capture`, this.controlPlaneProxyInfo?.controlPlaneProxyUrl).toString();
        void fetch(url, {
            method: "POST",
            body: JSON.stringify({
                event,
                properties,
                uniqueId: this.uniqueId,
            }),
            headers: {
                Authorization: `Bearer ${await this.controlPlaneClient?.getAccessToken()}`,
            },
        });
    }
    async setup(config, uniqueId, controlPlaneProxyInfo) {
        this.uniqueId = uniqueId;
        this.controlPlaneProxyInfo = controlPlaneProxyInfo;
    }
    async shutdown() { }
}
