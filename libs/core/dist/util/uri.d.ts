/** Converts any OS path to cleaned up URI path segment format with no leading/trailing slashes
   e.g. \path\to\folder\ -> path/to/folder
        \this\is\afile.ts -> this/is/afile.ts
        is/already/clean -> is/already/clean
  **/
export declare function pathToUriPathSegment(path: string): string;
export declare function getCleanUriPath(uri: string): string;
export declare function findUriInDirs(uri: string, dirUriCandidates: string[]): {
    uri: string;
    relativePathOrBasename: string;
    foundInDir: string | null;
};
export declare function getUriPathBasename(uri: string): string;
export declare function getFileExtensionFromBasename(basename: string): string;
export declare function getUriFileExtension(uri: string): string;
export declare function getLastNUriRelativePathParts(dirUriCandidates: string[], uri: string, n: number): string;
export declare function joinPathsToUri(uri: string, ...pathSegments: string[]): string;
export declare function joinEncodedUriPathSegmentToUri(uri: string, pathSegment: string): string;
export declare function getShortestUniqueRelativeUriPaths(uris: string[], dirUriCandidates: string[]): {
    uri: string;
    uniquePath: string;
}[];
export declare function getLastNPathParts(filepath: string, n: number): string;
export declare function getUriDescription(uri: string, dirUriCandidates: string[]): {
    uri: string;
    relativePathOrBasename: string;
    foundInDir: string | null;
    last2Parts: string;
    baseName: string;
    extension: string;
};
//# sourceMappingURL=uri.d.ts.map