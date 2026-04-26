import { ConfigValidationError } from "@continuedev/config-yaml";
import { IDE, RuleWithSource } from "../..";
export declare const SUPPORTED_AGENT_FILES: string[];
/**
 * Loads rules from markdown files in the .continue/rules and .continue/prompts directories
 * and agent files (AGENTS.md, AGENT.md, CLAUDE.md) at workspace root
 */
export declare function loadMarkdownRules(ide: IDE): Promise<{
    rules: RuleWithSource[];
    errors: ConfigValidationError[];
}>;
//# sourceMappingURL=loadMarkdownRules.d.ts.map