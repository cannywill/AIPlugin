import { URL } from "node:url";
import { PageData } from "./DocsCrawler";
export declare class DefaultCrawler {
    private readonly startUrl;
    private readonly maxRequestsPerCrawl;
    private readonly maxDepth;
    constructor(startUrl: URL, maxRequestsPerCrawl: number, maxDepth: number);
    crawl(): Promise<PageData[]>;
}
//# sourceMappingURL=DefaultCrawler.d.ts.map