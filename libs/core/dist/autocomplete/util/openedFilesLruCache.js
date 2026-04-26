import QuickLRU from "quick-lru";
// maximum number of open files that can be cached
const MAX_NUM_OPEN_CONTEXT_FILES = 20;
// stores which files are currently open in the IDE, in viewing order
export const openedFilesLruCache = new QuickLRU({
    maxSize: MAX_NUM_OPEN_CONTEXT_FILES,
});
// used in core/core.ts to handle removals from the cache
export const prevFilepaths = {
    filepaths: [],
};
