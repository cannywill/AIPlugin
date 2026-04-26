import { SystemMessageToolsFramework } from "./types";
export declare function detectToolCallStart(buffer: string, toolCallFramework: SystemMessageToolsFramework): {
    isInToolCall: boolean;
    isInPartialStart: boolean;
    modifiedBuffer: string;
};
//# sourceMappingURL=detectToolCallStart.d.ts.map