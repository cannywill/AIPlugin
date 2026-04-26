import net from "node:net";
export default class LogStashAnalyticsProvider {
    host;
    port;
    uniqueId;
    async capture(event, properties) {
        if (this.host === undefined || this.port === undefined) {
            console.warn("LogStashAnalyticsProvider not set up yet.");
        }
        const payload = {
            event,
            properties,
            uniqueId: this.uniqueId,
        };
        const client = new net.Socket();
        client.connect(this.port, this.host, () => {
            client.write(JSON.stringify(payload));
            client.end();
        });
    }
    async setup(config, uniqueId, controlPlaneProxyInfo) {
        if (!config.url) {
            console.warn("LogStashAnalyticsProvider is missing a URL");
            return;
        }
        const url = new URL(config.url);
        this.host = url.hostname;
        this.port = parseInt(url.port);
        this.uniqueId = uniqueId;
    }
    async shutdown() { }
}
