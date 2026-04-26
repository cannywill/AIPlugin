import { ConfigValidationError } from "@continuedev/config-yaml";
import { IDE, RuleWithSource } from "../..";
export declare class CodebaseRulesCache {
    private static instance;
    private constructor();
    static getInstance(): CodebaseRulesCache;
    rules: RuleWithSource[];
    errors: ConfigValidationError[];
    refresh(ide: IDE): Promise<void>;
    update(ide: IDE, uri: string): Promise<void>;
    remove(uri: string): void;
}
/**
 * Loads rules from rules.md files colocated in the codebase
 */
export declare function loadCodebaseRules(ide: IDE): Promise<{
    rules: RuleWithSource[];
    errors: ConfigValidationError[];
}>;
//# sourceMappingURL=loadCodebaseRules.d.ts.map