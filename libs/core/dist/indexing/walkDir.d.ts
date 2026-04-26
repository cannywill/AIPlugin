import ignore, { Ignore } from "ignore";
import type { FileType, IDE } from "..";
export interface WalkerOptions {
    include?: "dirs" | "files" | "both";
    returnRelativeUrisPaths?: boolean;
    source?: string;
    overrideDefaultIgnores?: Ignore;
    recursive?: boolean;
}
type Entry = [string, FileType];
declare class WalkDirCache {
    dirListCache: Map<string, {
        time: number;
        entries: Promise<[string, FileType][]>;
    }>;
    dirIgnoreCache: Map<string, {
        time: number;
        ignore: Promise<Ignore>;
    }>;
    invalidate(): void;
}
export declare const walkDirCache: WalkDirCache;
export declare function walkDirAsync(path: string, ide: IDE, _optionOverrides?: WalkerOptions): AsyncGenerator<string>;
export declare function walkDir(uri: string, ide: IDE, _optionOverrides?: WalkerOptions): Promise<string[]>;
export declare function walkDirs(ide: IDE, _optionOverrides?: WalkerOptions, dirs?: string[]): Promise<string[]>;
export declare function getIgnoreContext(currentDir: string, currentDirEntries: Entry[], ide: IDE, defaultAndGlobalIgnores: Ignore): Promise<ignore.Ignore>;
export {};
//# sourceMappingURL=walkDir.d.ts.map