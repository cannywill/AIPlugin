import { IDE } from "../../..";
import { AutocompleteCodeSnippet } from "../../snippets/types";
import { AstPath } from "../../util/ast";
import { ImportDefinitionsService } from "../ImportDefinitionsService";
export declare class RootPathContextService {
    private readonly importDefinitionsService;
    private readonly ide;
    private cache;
    constructor(importDefinitionsService: ImportDefinitionsService, ide: IDE);
    private static getNodeId;
    private static TYPES_TO_USE;
    /**
     * Key comes from hash of parent key and node type and node id.
     */
    private static keyFromNode;
    private getSnippetsForNode;
    private getSnippets;
    getContextForPath(filepath: string, astPath: AstPath): Promise<AutocompleteCodeSnippet[]>;
}
//# sourceMappingURL=RootPathContextService.d.ts.map