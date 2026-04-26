import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../../index.js";
import { BaseContextProvider } from "../../index.js";
declare class JiraIssuesContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    get deprecationMessage(): string;
    private getApi;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default JiraIssuesContextProvider;
//# sourceMappingURL=index.d.ts.map