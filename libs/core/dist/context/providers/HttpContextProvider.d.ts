import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class HttpContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    private getWorkspacePath;
    get description(): ContextProviderDescription;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default HttpContextProvider;
//# sourceMappingURL=HttpContextProvider.d.ts.map