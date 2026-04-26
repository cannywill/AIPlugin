import { IDE } from "..";
export declare function getPromptFilesFromDir(ide: IDE, dir: string): Promise<{
    path: string;
    content: string;
}[]>;
export declare function getAllPromptFiles(ide: IDE, overridePromptFolder?: string, checkV1DefaultFolder?: boolean): Promise<{
    path: string;
    content: string;
}[]>;
//# sourceMappingURL=getPromptFiles.d.ts.map