import { URL } from "node:url";
import { ContinueConfig, IDE } from "../../..";
import CheerioCrawler from "./CheerioCrawler";
import { ChromiumCrawler, ChromiumInstaller } from "./ChromiumCrawler";
import GitHubCrawler from "./GitHubCrawler";
export type PageData = {
    url: string;
    path: string;
    content: string;
};
export type DocsCrawlerType = "default" | "cheerio" | "chromium" | "github";
declare class DocsCrawler {
    private readonly ide;
    private readonly config;
    private readonly maxDepth;
    private readonly maxRequestsPerCrawl;
    private readonly useLocalCrawling;
    private readonly githubToken;
    private readonly GITHUB_HOST;
    private readonly chromiumInstaller;
    constructor(ide: IDE, config: ContinueConfig, maxDepth?: number, maxRequestsPerCrawl?: number, useLocalCrawling?: boolean, githubToken?: string | undefined);
    private shouldUseChromium;
    crawl(startUrl: URL): AsyncGenerator<PageData, DocsCrawlerType, undefined>;
}
export default DocsCrawler;
export { CheerioCrawler, ChromiumCrawler, ChromiumInstaller, GitHubCrawler };
//# sourceMappingURL=DocsCrawler.d.ts.map