import { ContextItemWithId, RuleMetadata, RuleWithSource, ToolResultChatMessage, UserChatMessage } from "../..";
import { RulePolicies } from "./types";
/**
 * Determines if a rule should be applied based on its properties and file matching
 *
 * @param rule - The rule to check
 * @param filePaths - Array of file paths to check against the rule's globs
 * @param fileContents - Map of file paths to their contents for pattern matching
 * @param rulePolicies - Optional policies that can override normal rule behavior
 * @returns true if the rule should be applied, false otherwise
 */
export declare const shouldApplyRule: (rule: RuleWithSource, filePaths: string[], rulePolicies?: RulePolicies, fileContents?: Record<string, string>) => boolean;
/**
 * Filters rules that apply to the given message and/or context items
 *
 * @param userMessage - The user or tool message to check for file paths in code blocks
 * @param rules - The list of rules to filter
 * @param contextItems - Context items to check for file paths
 * @returns List of applicable rules
 */
export declare const getApplicableRules: (userMessage: UserChatMessage | ToolResultChatMessage | undefined, rules: RuleWithSource[], contextItems: ContextItemWithId[], rulePolicies?: RulePolicies) => RuleWithSource[];
export declare function getRuleId(rule: RuleMetadata): string;
export declare const getSystemMessageWithRules: ({ baseSystemMessage, userMessage, availableRules, contextItems, rulePolicies, }: {
    baseSystemMessage?: string;
    userMessage: UserChatMessage | ToolResultChatMessage | undefined;
    availableRules: RuleWithSource[];
    contextItems: ContextItemWithId[];
    rulePolicies?: RulePolicies;
}) => {
    systemMessage: string;
    appliedRules: RuleMetadata[];
};
//# sourceMappingURL=getSystemMessageWithRules.d.ts.map