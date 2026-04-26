import { getControlPlaneEnv } from "../../control-plane/env.js";
import { BaseContextProvider } from "../index.js";
class ContinueProxyContextProvider extends BaseContextProvider {
    static description = {
        title: "continue-proxy",
        displayTitle: "Continue Proxy",
        description: "Retrieve a context item from a Continue for Teams add-on",
        type: "submenu",
    };
    workOsAccessToken = undefined;
    get description() {
        return {
            title: this.options.title || ContinueProxyContextProvider.description.title,
            displayTitle: this.options.displayTitle ||
                this.options.name ||
                ContinueProxyContextProvider.description.displayTitle,
            description: this.options.description ||
                ContinueProxyContextProvider.description.description,
            type: this.options.type || ContinueProxyContextProvider.description.type,
        };
    }
    async loadSubmenuItems(args) {
        const env = await getControlPlaneEnv(args.ide.getIdeSettings());
        const response = await args.fetch(new URL(`/proxy/context/${this.options.id}/list`, env.CONTROL_PLANE_URL), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.workOsAccessToken}`,
            },
        });
        const data = await response.json();
        return data.items;
    }
    async getContextItems(query, extras) {
        const env = await getControlPlaneEnv(extras.ide.getIdeSettings());
        const response = await extras.fetch(new URL(`/proxy/context/${this.options.id}/retrieve`, env.CONTROL_PLANE_URL), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.workOsAccessToken}`,
            },
            body: JSON.stringify({
                query: query || "",
                fullInput: extras.fullInput,
            }),
        });
        const items = await response.json();
        return items;
    }
}
export default ContinueProxyContextProvider;
