import { IDE } from "../../../";
import { AutocompleteStaticSnippet } from "../../snippets/types";
import { HelperVars } from "../../util/HelperVars";
import { StaticContext } from "./types";
export declare class StaticContextService {
    private readonly ide;
    constructor(ide: IDE);
    logAutocompleteStaticSnippet(ctx: StaticContext, label?: string): void;
    static formatAutocompleteStaticSnippet(ctx: StaticContext): string;
    getContext(helper: HelperVars): Promise<AutocompleteStaticSnippet[]>;
    private getHoleContext;
    private extractRelevantTypes;
    private extractRelevantTypesHelper;
    private extractRelevantHeaders;
    private extractRelevantHeadersHelper;
    private generateTargetTypes;
    private generateTargetTypesHelper;
    private isTypeEquivalent;
    private normalize;
    private insertAtPosition;
    private getTypeScriptFilesFromWorkspaces;
    private scanDirectoryForTypeScriptFiles;
}
//# sourceMappingURL=StaticContextService.d.ts.map