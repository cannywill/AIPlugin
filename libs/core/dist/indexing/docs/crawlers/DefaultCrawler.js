import { URL } from "node:url";
import { getHeaders } from "../../../continueServer/stubs/headers";
import { TRIAL_PROXY_URL } from "../../../control-plane/client";
export class DefaultCrawler {
    startUrl;
    maxRequestsPerCrawl;
    maxDepth;
    constructor(startUrl, maxRequestsPerCrawl, maxDepth) {
        this.startUrl = startUrl;
        this.maxRequestsPerCrawl = maxRequestsPerCrawl;
        this.maxDepth = maxDepth;
    }
    async crawl() {
        const resp = await fetch(new URL("crawl", TRIAL_PROXY_URL).toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(await getHeaders()),
            },
            body: JSON.stringify({
                startUrl: this.startUrl.toString(),
                maxDepth: this.maxDepth,
                limit: this.maxRequestsPerCrawl,
            }),
        });
        if (!resp.ok) {
            const text = await resp.text();
            throw new Error(`Failed to crawl site (${resp.status}): ${text}`);
        }
        const json = (await resp.json());
        return json;
    }
}
