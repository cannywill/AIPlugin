import { deduplicateArray } from "../../util/index";
export function deduplicateChunks(chunks) {
    return deduplicateArray(chunks, (a, b) => {
        return (a.filepath === b.filepath &&
            a.startLine === b.startLine &&
            a.endLine === b.endLine);
    });
}
