import { ToolPolicy } from "@continuedev/terminal-security";
/**
 * Evaluates file access policy based on whether the file is within workspace boundaries
 *
 * @param basePolicy - The base policy from tool definition or user settings
 * @param isWithinWorkspace - Whether the file/directory is within workspace
 * @returns The evaluated policy - more restrictive for files outside workspace
 */
export declare function evaluateFileAccessPolicy(basePolicy: ToolPolicy, isWithinWorkspace: boolean): ToolPolicy;
//# sourceMappingURL=fileAccess.d.ts.map