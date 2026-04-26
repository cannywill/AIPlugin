import { BaseContextProvider } from "..";
import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../..";
declare class RulesContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    private getIdFromRule;
    private getNameFromRule;
    private getDescriptionFromRule;
    private getUriFromRule;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
}
export default RulesContextProvider;
//# sourceMappingURL=RulesContextProvider.d.ts.map