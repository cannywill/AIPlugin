import type { ContextItem, ContextProviderDescription, ContextProviderExtras, CustomContextProvider, IContextProvider, LoadSubmenuItemsArgs } from "../../";
declare class CustomContextProviderClass implements IContextProvider {
    private custom;
    constructor(custom: CustomContextProvider);
    get description(): ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<never[] | import("../../").ContextSubmenuItem[]>;
    get deprecationMessage(): null;
}
export default CustomContextProviderClass;
//# sourceMappingURL=CustomContextProvider.d.ts.map