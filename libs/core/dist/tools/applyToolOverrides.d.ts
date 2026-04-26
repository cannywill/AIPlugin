import { ConfigValidationError } from "@continuedev/config-yaml";
import { Tool, ToolOverride } from "..";
export interface ApplyToolOverridesResult {
    tools: Tool[];
    errors: ConfigValidationError[];
}
/**
 * Applies tool overrides from config to the list of tools.
 * Overrides can modify tool descriptions, display titles, action phrases,
 * system message descriptions, or disable tools entirely.
 */
export declare function applyToolOverrides(tools: Tool[], overrides: ToolOverride[] | undefined): ApplyToolOverridesResult;
//# sourceMappingURL=applyToolOverrides.d.ts.map