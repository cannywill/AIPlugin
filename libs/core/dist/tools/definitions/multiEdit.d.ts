import { Tool } from "../..";
export interface EditOperation {
    old_string: string;
    new_string: string;
    replace_all?: boolean;
}
export interface MultiEditArgs {
    filepath: string;
    edits: EditOperation[];
}
export declare const multiEditTool: Tool;
//# sourceMappingURL=multiEdit.d.ts.map