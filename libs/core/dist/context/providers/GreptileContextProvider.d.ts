import { ContextItem, ContextProviderDescription, ContextProviderExtras } from "../../index.js";
import { BaseContextProvider } from "../index.js";
declare class GreptileContextProvider extends BaseContextProvider {
    static description: ContextProviderDescription;
    get deprecationMessage(): string;
    getContextItems(query: string, extras: ContextProviderExtras): Promise<ContextItem[]>;
    private getGreptileToken;
    private getGithubToken;
    private getWorkspaceDir;
    private isGitRepository;
}
export default GreptileContextProvider;
//# sourceMappingURL=GreptileContextProvider.d.ts.map