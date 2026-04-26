import { ConfigValidationError } from "@continuedev/config-yaml";
import { IDE, RuleWithSource } from "..";
export declare const SYSTEM_PROMPT_DOT_FILE = ".continuerules";
export declare function getWorkspaceContinueRuleDotFiles(ide: IDE): Promise<{
    rules: RuleWithSource[];
    errors: ConfigValidationError[];
}>;
//# sourceMappingURL=getWorkspaceContinueRuleDotFiles.d.ts.map