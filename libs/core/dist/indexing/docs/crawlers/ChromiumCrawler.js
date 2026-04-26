import * as fs from "fs";
import { URL } from "node:url";
// @ts-ignore
// @prettier-ignore
import PCR from "puppeteer-chromium-resolver";
import { editConfigFile, getChromiumPath, getContinueUtilsPath, } from "../../../util/paths";
export class ChromiumCrawler {
    startUrl;
    maxRequestsPerCrawl;
    maxDepth;
    LINK_GROUP_SIZE = 2;
    curCrawlCount = 0;
    constructor(startUrl, maxRequestsPerCrawl, maxDepth) {
        this.startUrl = startUrl;
        this.maxRequestsPerCrawl = maxRequestsPerCrawl;
        this.maxDepth = maxDepth;
    }
    static setUseChromiumForDocsCrawling(useChromiumForDocsCrawling) {
        editConfigFile((config) => ({
            ...config,
            experimental: {
                ...config.experimental,
                useChromiumForDocsCrawling,
            },
        }), (config) => config);
    }
    async *crawl() {
        console.debug(`[${this.constructor.name}] Crawling site: ${this.startUrl}`);
        const stats = await PCR(ChromiumInstaller.PCR_CONFIG);
        const browser = await stats.puppeteer.launch({
            args: [
                "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
            ],
            executablePath: stats.executablePath,
        });
        const page = await browser.newPage();
        try {
            yield* this.crawlSitePages(page, this.startUrl, 0);
        }
        catch (e) {
            console.debug("Error getting links: ", e);
            console.debug("Setting 'useChromiumForDocsCrawling' to 'false' in config.json");
            ChromiumCrawler.setUseChromiumForDocsCrawling(false);
        }
        finally {
            await browser.close();
        }
    }
    /**
     * We need to handle redirects manually, otherwise there are race conditions.
     *
     * https://github.com/puppeteer/puppeteer/issues/3323#issuecomment-2332333573
     */
    async gotoPageAndHandleRedirects(page, url) {
        const MAX_PAGE_WAIT_MS = 5000;
        await page.goto(url, {
            timeout: 0,
            waitUntil: "networkidle2",
        });
        let responseEventOccurred = false;
        const responseHandler = (event) => (responseEventOccurred = true);
        const responseWatcher = new Promise(function (resolve, reject) {
            setTimeout(() => {
                if (!responseEventOccurred) {
                    resolve();
                }
                else {
                    setTimeout(() => resolve(), MAX_PAGE_WAIT_MS);
                }
            }, 500);
        });
        page.on("response", responseHandler);
        await Promise.race([responseWatcher, page.waitForNavigation()]);
    }
    async *crawlSitePages(page, curUrl, depth, visitedLinks = new Set()) {
        const urlStr = curUrl.toString();
        if (visitedLinks.has(urlStr)) {
            return;
        }
        await this.gotoPageAndHandleRedirects(page, urlStr);
        const htmlContent = await page.content();
        const linkGroups = await this.getLinkGroupsFromPage(page, curUrl);
        this.curCrawlCount++;
        visitedLinks.add(urlStr);
        yield {
            path: curUrl.pathname,
            url: urlStr,
            content: htmlContent,
        };
        for (const linkGroup of linkGroups) {
            let enqueuedLinkCount = this.curCrawlCount;
            for (const link of linkGroup) {
                enqueuedLinkCount++;
                // console.log({ enqueuedLinkCount, url: this.startUrl.toString() });
                if (enqueuedLinkCount <= this.maxRequestsPerCrawl &&
                    depth <= this.maxDepth) {
                    yield* this.crawlSitePages(page, new URL(link), depth + 1, visitedLinks);
                }
            }
        }
    }
    stripHashFromUrl(urlStr) {
        try {
            let url = new URL(urlStr);
            url.hash = "";
            return url;
        }
        catch (err) {
            return null;
        }
    }
    isValidHostAndPath(newUrl, curUrl) {
        return (newUrl.pathname.startsWith(curUrl.pathname) && newUrl.host === curUrl.host);
    }
    async getLinksFromPage(page, curUrl) {
        const links = await page.$$eval("a", (links) => links.map((a) => a.href));
        const cleanedLinks = links
            .map(this.stripHashFromUrl)
            .filter((newUrl) => newUrl !== null &&
            this.isValidHostAndPath(newUrl, curUrl) &&
            newUrl !== curUrl)
            .map((newUrl) => newUrl.href);
        const dedupedLinks = Array.from(new Set(cleanedLinks));
        return dedupedLinks;
    }
    async getLinkGroupsFromPage(page, curUrl) {
        const links = await this.getLinksFromPage(page, curUrl);
        const groups = links.reduce((acc, link, i) => {
            const groupIndex = Math.floor(i / this.LINK_GROUP_SIZE);
            if (!acc[groupIndex]) {
                acc.push([]);
            }
            acc[groupIndex].push(link);
            return acc;
        }, []);
        return groups;
    }
}
export class ChromiumInstaller {
    ide;
    config;
    static PCR_CONFIG = { downloadPath: getContinueUtilsPath() };
    constructor(ide, config) {
        this.ide = ide;
        this.config = config;
        if (this.shouldInstallOnStartup()) {
            console.log("Installing Chromium");
            void this.install();
        }
    }
    isInstalled() {
        return fs.existsSync(getChromiumPath());
    }
    shouldInstallOnStartup() {
        return (!this.isInstalled() &&
            this.config.experimental?.useChromiumForDocsCrawling);
    }
    shouldProposeUseChromiumOnCrawlFailure() {
        const { experimental } = this.config;
        return (experimental?.useChromiumForDocsCrawling === undefined ||
            experimental.useChromiumForDocsCrawling);
    }
    async proposeAndAttemptInstall(site) {
        const userAcceptedInstall = await this.proposeInstall(site);
        if (userAcceptedInstall) {
            const didInstall = await this.install();
            return didInstall;
        }
    }
    async install() {
        try {
            await PCR(ChromiumInstaller.PCR_CONFIG);
            ChromiumCrawler.setUseChromiumForDocsCrawling(true);
            return true;
        }
        catch (error) {
            console.debug("Error installing Chromium : ", error);
            console.debug("Setting 'useChromiumForDocsCrawling' to 'false' in config.json");
            ChromiumCrawler.setUseChromiumForDocsCrawling(false);
            void this.ide.showToast("error", "Failed to install Chromium");
            return false;
        }
    }
    async proposeInstall(site) {
        const msg = `Unable to crawl documentation site: "${site}".` +
            "We recommend installing Chromium. " +
            "Download progress can be viewed in the developer console.";
        const actionMsg = "Install Chromium";
        const res = await this.ide.showToast("warning", msg, actionMsg);
        return res === actionMsg;
    }
}
