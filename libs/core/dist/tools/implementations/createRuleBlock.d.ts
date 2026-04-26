import { ToolImpl } from ".";
import { RuleWithSource } from "../..";
export type CreateRuleBlockArgs = Pick<Required<RuleWithSource>, "rule" | "name"> & Pick<RuleWithSource, "globs" | "regex" | "description" | "alwaysApply">;
export declare const createRuleBlockImpl: ToolImpl;
//# sourceMappingURL=createRuleBlock.d.ts.map