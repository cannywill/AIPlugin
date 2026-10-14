/**
 * 文件类型：连接管理
 * 文件作用：管理 MCP 连接、会话与资源列表。
 * 主要职责：处理 MCP 连接状态、错误与资源同步。
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { IDE, InternalMcpOptions, MCPConnectionStatus, MCPPrompt, MCPResource, MCPResourceTemplate, MCPServerStatus, MCPTool } from "../..";
export type MCPExtras = {
    ide: IDE;
};
declare class MCPConnection {
    options: InternalMcpOptions;
    extras?: MCPExtras | undefined;
    client: Client;
    abortController: AbortController;
    status: MCPConnectionStatus;
    isProtectedResource: boolean;
    errors: string[];
    infos: string[];
    prompts: MCPPrompt[];
    tools: MCPTool[];
    resources: MCPResource[];
    resourceTemplates: MCPResourceTemplate[];
    private transport;
    private connectionPromise;
    private stdioOutput;
    constructor(options: InternalMcpOptions, extras?: MCPExtras | undefined);
    disconnect(disable?: boolean): Promise<void>;
    getStatus(): MCPServerStatus;
    connectClient(forceRefresh: boolean, externalSignal: AbortSignal): Promise<void>;
    /**
     * Resolves the command and arguments for the current platform
     * On Windows, batch script commands need to be executed via cmd.exe
     * UNLESS we're connected to a WSL remote (where Linux commands should run)
     * @param originalCommand The original command
     * @param originalArgs The original command arguments
     * @returns An object with the resolved command and arguments
     */
    private resolveCommandForPlatform;
    /**
     * Resolves the current working directory of the current workspace.
     * @param cwd The cwd parameter provided by user.
     * @returns Current working directory (user-provided cwd or workspace root).
     */
    private resolveCwd;
    private resolveWorkspaceCwd;
    private constructWebsocketTransport;
    private constructSseTransport;
    private constructHttpTransport;
    private constructStdioTransport;
    getResource(uri: string): Promise<{
        [x: string]: unknown;
        contents: ({
            uri: string;
            text: string;
            mimeType?: string | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | undefined;
            _meta?: Record<string, unknown> | undefined;
        })[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    }>;
}
export default MCPConnection;
//# sourceMappingURL=MCPConnection.d.ts.map