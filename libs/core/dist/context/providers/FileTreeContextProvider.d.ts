import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class FileTreeContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default FileTreeContextProvider;
//# sourceMappingURL=FileTreeContextProvider.d.ts.map