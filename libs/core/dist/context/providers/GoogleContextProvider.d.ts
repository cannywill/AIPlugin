import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class GoogleContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    private _serperApiKey;
    constructor(options: {
        serperApiKey: string;
    });
    get deprecationMessage(): string;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
}
export default GoogleContextProvider;
//# sourceMappingURL=GoogleContextProvider.d.ts.map