import CheerioCrawler from "./CheerioCrawler";
import { ChromiumCrawler, ChromiumInstaller } from "./ChromiumCrawler";
import { DefaultCrawler } from "./DefaultCrawler";
import GitHubCrawler from "./GitHubCrawler";
class DocsCrawler {
    ide;
    config;
    maxDepth;
    maxRequestsPerCrawl;
    useLocalCrawling;
    githubToken;
    GITHUB_HOST = "github.com";
    chromiumInstaller;
    constructor(ide, config, maxDepth = 4, maxRequestsPerCrawl = 1000, useLocalCrawling = false, githubToken = undefined) {
        this.ide = ide;
        this.config = config;
        this.maxDepth = maxDepth;
        this.maxRequestsPerCrawl = maxRequestsPerCrawl;
        this.useLocalCrawling = useLocalCrawling;
        this.githubToken = githubToken;
        this.chromiumInstaller = new ChromiumInstaller(this.ide, this.config);
    }
    shouldUseChromium() {
        return (this.config.experimental?.useChromiumForDocsCrawling &&
            this.chromiumInstaller.isInstalled());
    }
    /*
      Returns the type of crawler used in the end
    */
    async *crawl(startUrl) {
        if (startUrl.host === this.GITHUB_HOST) {
            yield* new GitHubCrawler(startUrl, this.githubToken).crawl();
            return "github";
        }
        if (!this.useLocalCrawling) {
            try {
                const pageData = await new DefaultCrawler(startUrl, this.maxRequestsPerCrawl, this.maxDepth).crawl();
                if (pageData.length > 0) {
                    yield* pageData;
                    return "default";
                }
            }
            catch (e) {
                console.error("Default crawler failed, trying backup: ", e);
            }
        }
        if (this.shouldUseChromium()) {
            yield* new ChromiumCrawler(startUrl, this.maxRequestsPerCrawl, this.maxDepth).crawl();
            return "chromium";
        }
        else {
            let didCrawlSinglePage = false;
            for await (const pageData of new CheerioCrawler(startUrl, this.maxRequestsPerCrawl, this.maxDepth).crawl()) {
                yield pageData;
                didCrawlSinglePage = true;
            }
            // We assume that if we failed to crawl a single page,
            // it was due to an error that using Chromium can resolve
            const shouldProposeUseChromium = !didCrawlSinglePage &&
                this.chromiumInstaller.shouldProposeUseChromiumOnCrawlFailure();
            if (shouldProposeUseChromium) {
                const didInstall = await this.chromiumInstaller.proposeAndAttemptInstall(startUrl.toString());
                if (didInstall) {
                    void this.ide.showToast("info", `Successfully installed Chromium! Retrying crawl of: ${startUrl.toString()}`);
                    yield* new ChromiumCrawler(startUrl, this.maxRequestsPerCrawl, this.maxDepth).crawl();
                    return "chromium";
                }
            }
            return "cheerio";
        }
    }
}
export default DocsCrawler;
export { CheerioCrawler, ChromiumCrawler, ChromiumInstaller, GitHubCrawler };
