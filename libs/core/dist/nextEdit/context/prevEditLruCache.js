import QuickLRU from "quick-lru";
const maxPrevEdits = 5;
export const prevEditLruCache = new QuickLRU({
    maxSize: maxPrevEdits,
});
export const setPrevEdit = (edit) => {
    const uniqueSuffix = Math.random().toString(36).substring(2, 8);
    const key = `${edit.fileUri}:${edit.timestamp}:${uniqueSuffix}`;
    prevEditLruCache.set(key, edit);
};
export const getPrevEditsDescending = () => {
    const edits = [];
    for (const [_, edit] of prevEditLruCache.entriesDescending()) {
        if (edits.length >= maxPrevEdits) {
            break;
        }
        edits.push(edit);
    }
    return edits;
};
