import { IDE, RangeInFileWithContents } from "../..";
interface FileInfo {
    imports: {
        [key: string]: RangeInFileWithContents[];
    };
}
export declare class ImportDefinitionsService {
    private readonly ide;
    static N: number;
    private cache;
    constructor(ide: IDE);
    get(filepath: string): FileInfo | undefined;
    private _getFileInfo;
}
export {};
//# sourceMappingURL=ImportDefinitionsService.d.ts.map