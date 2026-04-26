import { Tool } from "../..";
export interface EditToolArgs {
    filepath: string;
    changes: string;
}
export declare const NO_PARALLEL_TOOL_CALLING_INSTRUCTION = "This tool CANNOT be called in parallel with any other tools, including itself";
export declare const editFileTool: Tool;
//# sourceMappingURL=editFile.d.ts.map