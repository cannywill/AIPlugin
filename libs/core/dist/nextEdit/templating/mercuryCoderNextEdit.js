import { MERCURY_CODE_TO_EDIT_CLOSE, MERCURY_CODE_TO_EDIT_OPEN, MERCURY_CURSOR, MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_CLOSE, MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_OPEN, } from "../constants";
import { insertCursorToken } from "./utils";
export function recentlyViewedCodeSnippetsBlock(recentlyViewedCodeSnippets) {
    return recentlyViewedCodeSnippets.reduce((acc, snippet, i) => {
        const block = [
            MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_OPEN,
            `code_snippet_file_path: ${snippet.filepath}`,
            snippet.content,
            MERCURY_RECENTLY_VIEWED_CODE_SNIPPET_CLOSE,
        ].join("\n");
        return (acc + block + (i === recentlyViewedCodeSnippets.length - 1 ? "" : "\n"));
    }, "");
}
export function currentFileContentBlock(currentFileContent, editableRegionStartLine, editableRegionEndLine, cursorPosition) {
    const currentFileContentLines = currentFileContent.split("\n");
    const insertedCursorLines = insertCursorToken(currentFileContentLines, cursorPosition, MERCURY_CURSOR);
    const instrumentedLines = [
        ...insertedCursorLines.slice(0, editableRegionStartLine),
        MERCURY_CODE_TO_EDIT_OPEN,
        ...insertedCursorLines.slice(editableRegionStartLine, editableRegionEndLine + 1),
        MERCURY_CODE_TO_EDIT_CLOSE,
        ...insertedCursorLines.slice(editableRegionEndLine + 1),
    ];
    return instrumentedLines.join("\n");
}
export function editHistoryBlock(editDiffHistory) {
    // diffHistory is made from createDiff.
    // This uses createPatch from npm diff library, which includes an index line and a separator.
    // We get rid of these first two lines.
    return editDiffHistory
        .map((diff) => diff.split("\n").slice(2).join("\n"))
        .join("\n");
    // return editDiffHistory.split("\n").slice(2).join("\n");
}
function mercuryNextEditTemplateBuilder(recentlyViewedCodeSnippets, currentFileContent, codeToEdit, codeToEditRange, cursorPosition, editDiffHistory) {
    return "";
}
