import { isSecurityConcern } from "../../indexing/ignore.js";
import { NextEditProvider } from "../NextEditProvider";
import { EditAggregator } from "./aggregateEdits";
import { createDiff, DiffFormatType } from "./diffFormatting";
import { processNextEditData } from "./processNextEditData";
export const processSmallEdit = async (beforeAfterdiff, cursorPosBeforeEdit, cursorPosAfterPrevEdit, configHandler, getDefsFromLspFunction, ide) => {
    // Get the current context data from the most recent message
    const currentData = EditAggregator.getInstance()
        .latestContextData || {
        configHandler: configHandler,
        getDefsFromLspFunction: getDefsFromLspFunction,
        recentlyEditedRanges: [],
        recentlyVisitedRanges: [],
    };
    if (!isSecurityConcern(beforeAfterdiff.filePath)) {
        NextEditProvider.getInstance().addDiffToContext(createDiff({
            beforeContent: beforeAfterdiff.beforeContent,
            afterContent: beforeAfterdiff.afterContent,
            filePath: beforeAfterdiff.filePath,
            diffType: DiffFormatType.Unified,
            contextLines: 3, // NOTE: This can change depending on experiments!
            workspaceDir: currentData.workspaceDir,
        }));
    }
    void processNextEditData({
        filePath: beforeAfterdiff.filePath,
        beforeContent: beforeAfterdiff.beforeContent,
        afterContent: beforeAfterdiff.afterContent,
        cursorPosBeforeEdit: cursorPosBeforeEdit,
        cursorPosAfterPrevEdit: cursorPosAfterPrevEdit,
        ide: ide,
        configHandler: currentData.configHandler,
        getDefinitionsFromLsp: currentData.getDefsFromLspFunction,
        recentlyEditedRanges: currentData.recentlyEditedRanges,
        recentlyVisitedRanges: currentData.recentlyVisitedRanges,
        workspaceDir: currentData.workspaceDir,
    });
};
