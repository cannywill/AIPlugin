import { IDE } from "../..";
export declare function getOauthToken(mcpServerUrl: string, ide: IDE): Promise<string | undefined>;
/**
 * checks if the authentication is already done for the current server
 * if not, starts the authentication process by opening a webpage url
 */
export declare function performAuth(serverId: string, url: string, ide: IDE): Promise<import("@modelcontextprotocol/sdk/client/auth.js").AuthResult>;
export declare function removeMCPAuth(url: string, ide: IDE): void;
//# sourceMappingURL=MCPOauth.d.ts.map