import { URL } from "node:url";
import { ContinueConfig, IDE } from "../../..";
import { PageData } from "./DocsCrawler";
export declare class ChromiumCrawler {
    private readonly startUrl;
    private readonly maxRequestsPerCrawl;
    private readonly maxDepth;
    private readonly LINK_GROUP_SIZE;
    private curCrawlCount;
    constructor(startUrl: URL, maxRequestsPerCrawl: number, maxDepth: number);
    static setUseChromiumForDocsCrawling(useChromiumForDocsCrawling: boolean): void;
    crawl(): AsyncGenerator<PageData>;
    /**
     * We need to handle redirects manually, otherwise there are race conditions.
     *
     * https://github.com/puppeteer/puppeteer/issues/3323#issuecomment-2332333573
     */
    private gotoPageAndHandleRedirects;
    private crawlSitePages;
    private stripHashFromUrl;
    private isValidHostAndPath;
    private getLinksFromPage;
    private getLinkGroupsFromPage;
}
export declare class ChromiumInstaller {
    private readonly ide;
    private readonly config;
    static PCR_CONFIG: {
        downloadPath: string;
    };
    constructor(ide: IDE, config: ContinueConfig);
    isInstalled(): boolean;
    shouldInstallOnStartup(): boolean | undefined;
    shouldProposeUseChromiumOnCrawlFailure(): boolean;
    proposeAndAttemptInstall(site: string): Promise<boolean | undefined>;
    install(): Promise<boolean>;
    private proposeInstall;
}
//# sourceMappingURL=ChromiumCrawler.d.ts.map