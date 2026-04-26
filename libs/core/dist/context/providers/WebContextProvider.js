import { BaseContextProvider } from "..";
import { getHeaders } from "../../continueServer/stubs/headers";
import { TRIAL_PROXY_URL } from "../../control-plane/client";
export const fetchSearchResults = async (query, n, fetchFn) => {
    const resp = await fetchFn(WebContextProvider.ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(await getHeaders()),
        },
        body: JSON.stringify({
            query,
            n,
        }),
    });
    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Failed to fetch web context: ${text}`);
    }
    return await resp.json();
};
export default class WebContextProvider extends BaseContextProvider {
    static ENDPOINT = new URL("web", TRIAL_PROXY_URL);
    static DEFAULT_N = 6;
    static description = {
        title: "web",
        displayTitle: "Web",
        description: "Search the web",
        type: "normal",
        renderInlineAs: "",
    };
    async getContextItems(query, extras) {
        return await fetchSearchResults(extras.fullInput, this.options.n ?? WebContextProvider.DEFAULT_N, extras.fetch);
    }
}
