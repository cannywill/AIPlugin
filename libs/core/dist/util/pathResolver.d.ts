import { IDE } from "..";
export interface ResolvedPath {
    uri: string;
    displayPath: string;
    isAbsolute: boolean;
    isWithinWorkspace: boolean;
}
export declare function resolveInputPath(ide: IDE, inputPath: string): Promise<ResolvedPath | null>;
//# sourceMappingURL=pathResolver.d.ts.map