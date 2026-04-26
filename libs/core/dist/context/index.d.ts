import type { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, IContextProvider, LoadSubmenuItemsArgs } from "../index.js";
export declare abstract class BaseContextProvider implements IContextProvider {
    options: {
        [key: string]: any;
    };
    constructor(options: {
        [key: string]: any;
    });
    static description: ContextProviderDescription;
    get description(): ContextProviderDescription;
    abstract getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(args: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
    get deprecationMessage(): string | null;
}
//# sourceMappingURL=index.d.ts.map