export default class PostHogAnalyticsProvider {
    client;
    uniqueId;
    async capture(event, properties) {
        this.client?.capture({
            distinctId: this.uniqueId,
            event,
            properties,
        });
    }
    async setup(config, uniqueId, controlPlaneProxyInfo) {
        if (!config || !config.clientKey || !config.url) {
            this.client = undefined;
        }
        else {
            try {
                this.uniqueId = uniqueId;
                const { PostHog } = await import("posthog-node");
                this.client = new PostHog(config.clientKey, {
                    host: config.url,
                });
            }
            catch (e) {
                console.error(`Failed to setup telemetry: ${e}`);
            }
        }
    }
    async shutdown() { }
}
