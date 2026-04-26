import { MCPServer, RequestOptions, Rule } from "@continuedev/config-yaml";
import { InternalMcpOptions, RuleWithSource } from "../..";
export declare function convertYamlRuleToContinueRule(rule: Rule): RuleWithSource;
export declare function convertYamlMcpConfigToInternalMcpOptions(config: MCPServer, globalRequestOptions?: RequestOptions): InternalMcpOptions;
//# sourceMappingURL=yamlToContinueConfig.d.ts.map