import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InternalMcpOptions, MCPServerStatus } from "../..";
import MCPConnection, { MCPExtras } from "./MCPConnection";
export declare class MCPManagerSingleton {
    private static instance;
    onConnectionsRefreshed?: () => void;
    connections: Map<string, MCPConnection>;
    private abortController;
    private constructor();
    static getInstance(): MCPManagerSingleton;
    setEnabled(serverId: string, enabled: boolean): Promise<void>;
    createConnection(id: string, options: InternalMcpOptions): MCPConnection;
    getConnection(id: string): MCPConnection | undefined;
    shutdown(): Promise<void>;
    setConnections(servers: InternalMcpOptions[], forceRefresh: boolean, extras?: MCPExtras): void;
    private compareTransportOptions;
    private compareEnv;
    refreshConnection(serverId: string): Promise<void>;
    refreshConnections(force: boolean): Promise<void>;
    getStatuses(): (MCPServerStatus & {
        client: Client;
    })[];
    setStatus(serverId: string, status: MCPServerStatus["status"]): void;
    getPrompt(serverName: string, promptName: string, args?: Record<string, string>): Promise<{
        [x: string]: unknown;
        messages: {
            role: "user" | "assistant";
            content: {
                type: "text";
                text: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "image";
                data: string;
                mimeType: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "audio";
                data: string;
                mimeType: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "resource";
                resource: {
                    uri: string;
                    text: string;
                    mimeType?: string | undefined;
                    _meta?: Record<string, unknown> | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | undefined;
                    _meta?: Record<string, unknown> | undefined;
                };
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                uri: string;
                name: string;
                type: "resource_link";
                description?: string | undefined;
                mimeType?: string | undefined;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
                icons?: {
                    src: string;
                    mimeType?: string | undefined;
                    sizes?: string[] | undefined;
                    theme?: "light" | "dark" | undefined;
                }[] | undefined;
                title?: string | undefined;
            };
        }[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
        description?: string | undefined;
    }>;
}
//# sourceMappingURL=MCPManagerSingleton.d.ts.map