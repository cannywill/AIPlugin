import { ContextItem, ContextProviderDescription, ContextProviderExtras, ContextSubmenuItem, LoadSubmenuItemsArgs } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class PostgresContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    static ALL_TABLES: string;
    static DEFAULT_SAMPLE_ROWS: number;
    private getPool;
    private getTableNames;
    getContextItems(query?: string, _?: ContextProviderExtras): Promise<ContextItem[]>;
    loadSubmenuItems(_: LoadSubmenuItemsArgs): Promise<ContextSubmenuItem[]>;
    get deprecationMessage(): string;
}
export default PostgresContextProvider;
//# sourceMappingURL=PostgresContextProvider.d.ts.map