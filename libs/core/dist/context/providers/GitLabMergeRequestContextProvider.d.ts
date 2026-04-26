import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class GitLabMergeRequestContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    get deprecationMessage(): string;
    private getApi;
    private getRemoteBranchInfo;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default GitLabMergeRequestContextProvider;
//# sourceMappingURL=GitLabMergeRequestContextProvider.d.ts.map