import { URL } from "node:url";
import { PageData } from "./DocsCrawler";
declare class GitHubCrawler {
    private readonly startUrl;
    private readonly githubToken;
    private readonly markdownRegex;
    private octokit;
    private FILES_TO_SKIP;
    constructor(startUrl: URL, githubToken: string | undefined);
    crawl(): AsyncGenerator<PageData>;
    private getGithubRepoDefaultBranch;
    private getGitHubRepoPaths;
    private getGithubRepoFileContent;
}
export default GitHubCrawler;
//# sourceMappingURL=GitHubCrawler.d.ts.map