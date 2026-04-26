import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { BaseContextProvider } from "../";
import { fetchFavicon } from "../../util/fetchFavicon";
class URLContextProvider extends BaseContextProvider {
    static description = {
        title: "url",
        displayTitle: "URL",
        description: "Reference a webpage at a given URL",
        type: "query",
    };
    async getContextItems(query, extras) {
        return await getUrlContextItems(query, extras.fetch);
    }
}
export default URLContextProvider;
export async function getUrlContextItems(query, fetchFn) {
    const url = new URL(query);
    const icon = await fetchFavicon(url);
    const resp = await fetchFn(url);
    // Check if the response is not OK
    if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
    }
    const html = await resp.text();
    const dom = new JSDOM(html);
    let reader = new Readability(dom.window.document);
    let article = reader.parse();
    const content = article?.content || "";
    const markdown = NodeHtmlMarkdown.translate(content, {}, undefined, undefined);
    const title = article?.title || url.pathname;
    return [
        {
            icon,
            description: url.toString(),
            content: markdown,
            name: title,
            uri: {
                type: "url",
                value: url.toString(),
            },
        },
    ];
}
