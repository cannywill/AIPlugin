import { URL } from "node:url";
import { PageData } from "./DocsCrawler";
export default class CheerioCrawler {
    private readonly startUrl;
    private readonly maxRequestsPerCrawl;
    private readonly maxDepth;
    private readonly IGNORE_PATHS_ENDING_IN;
    constructor(startUrl: URL, maxRequestsPerCrawl: number, maxDepth: number);
    crawl(): AsyncGenerator<PageData>;
    private getLinksFromUrl;
    private splitUrl;
}
//# sourceMappingURL=CheerioCrawler.d.ts.map