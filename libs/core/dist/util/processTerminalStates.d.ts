import { ChildProcess } from "child_process";
export declare function markProcessAsBackgrounded(toolCallId: string): void;
export declare function isProcessBackgrounded(toolCallId: string): boolean;
export declare function removeBackgroundedProcess(toolCallId: string): void;
export declare function markProcessAsRunning(toolCallId: string, process: ChildProcess, onPartialOutput?: (params: {
    toolCallId: string;
    contextItems: any[];
}) => void, currentOutput?: string): void;
export declare function isProcessRunning(toolCallId: string): boolean;
export declare function getRunningProcess(toolCallId: string): ChildProcess | undefined;
export declare function updateProcessOutput(toolCallId: string, output: string): void;
export declare function removeRunningProcess(toolCallId: string): void;
export declare function killTerminalProcess(toolCallId: string): Promise<void>;
export declare function killMultipleTerminalProcesses(toolCallIds: string[]): Promise<void>;
export declare function killAllRunningTerminalProcesses(): Promise<string[]>;
export declare function getAllRunningProcessIds(): string[];
export declare function getAllBackgroundedProcessIds(): string[];
export declare function clearAllBackgroundProcesses(): void;
//# sourceMappingURL=processTerminalStates.d.ts.map