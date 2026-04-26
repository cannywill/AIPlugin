import { ConfigValidationError, RequestOptions } from "@continuedev/config-yaml";
import { IDE, InternalMcpOptions } from "../../..";
/**
 * Loads MCP configs from JSON files in ~/.continue/mcpServers and workspace .continue/mcpServers
 */
export declare function loadJsonMcpConfigs(ide: IDE, includeGlobal: boolean, globalRequestOptions?: RequestOptions | undefined): Promise<{
    mcpServers: InternalMcpOptions[];
    errors: ConfigValidationError[];
}>;
//# sourceMappingURL=loadJsonMcpConfigs.d.ts.map