import { IDE, Position } from "../..";
import { AutocompleteCodeSnippet } from "../../autocomplete/snippets/types";
import { GetLspDefinitionsFunction } from "../../autocomplete/types";
import { ConfigHandler } from "../../config/ConfigHandler";
import { RecentlyEditedRange } from "../types";
interface ProcessNextEditDataParams {
    filePath: string;
    beforeContent: string;
    afterContent: string;
    cursorPosBeforeEdit: Position;
    cursorPosAfterPrevEdit: Position;
    ide: IDE;
    configHandler: ConfigHandler;
    getDefinitionsFromLsp: GetLspDefinitionsFunction;
    recentlyEditedRanges: RecentlyEditedRange[];
    recentlyVisitedRanges: AutocompleteCodeSnippet[];
    workspaceDir: string;
    modelNameOrInstance?: string | undefined;
}
export declare const processNextEditData: ({ filePath, beforeContent, afterContent, cursorPosBeforeEdit, cursorPosAfterPrevEdit, ide, configHandler, getDefinitionsFromLsp, recentlyEditedRanges, recentlyVisitedRanges, workspaceDir, modelNameOrInstance, }: ProcessNextEditDataParams) => Promise<void>;
export {};
//# sourceMappingURL=processNextEditData.d.ts.map