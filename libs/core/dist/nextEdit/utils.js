import { NEXT_EDIT_MODELS } from "../llm/constants";
export function isNextEditTest() {
    const enabled = process.env.NEXT_EDIT_TEST_ENABLED;
    if (enabled === "false") {
        return false;
    }
    if (enabled === "true") {
        return true;
    }
    return false;
}
export function isWhitespaceOnlyDeletion(diffLines) {
    return diffLines.every((diff) => diff.type === "old" &&
        (diff.line.trim() === "" || /^\s+$/.test(diff.line)));
}
export function convertNextEditModelNameToEnum(modelName) {
    const nextEditModels = Object.values(NEXT_EDIT_MODELS);
    return nextEditModels.find((model) => modelName.includes(model));
}
