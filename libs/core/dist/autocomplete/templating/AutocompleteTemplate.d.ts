import { CompletionOptions } from "../../index.js";
import { AutocompleteSnippet } from "../snippets/types.js";
export interface AutocompleteTemplate {
    compilePrefixSuffix?: (prefix: string, suffix: string, filepath: string, reponame: string, snippets: AutocompleteSnippet[], workspaceUris: string[]) => [string, string];
    template: string | ((prefix: string, suffix: string, filepath: string, reponame: string, language: string, snippets: AutocompleteSnippet[], workspaceUris: string[]) => string);
    completionOptions?: Partial<CompletionOptions>;
}
export declare function getTemplateForModel(model: string): AutocompleteTemplate;
//# sourceMappingURL=AutocompleteTemplate.d.ts.map