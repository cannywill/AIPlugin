import { DiffLine } from "..";
import { NEXT_EDIT_MODELS } from "../llm/constants";
export declare function isNextEditTest(): boolean;
export declare function isWhitespaceOnlyDeletion(diffLines: DiffLine[]): boolean;
export declare function convertNextEditModelNameToEnum(modelName: string): NEXT_EDIT_MODELS | undefined;
//# sourceMappingURL=utils.d.ts.map