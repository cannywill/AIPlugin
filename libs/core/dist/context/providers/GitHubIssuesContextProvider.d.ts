import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class GitHubIssuesContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    get deprecationMessage(): string;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default GitHubIssuesContextProvider;
//# sourceMappingURL=GitHubIssuesContextProvider.d.ts.map