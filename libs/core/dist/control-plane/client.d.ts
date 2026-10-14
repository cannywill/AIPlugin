/**
 * 文件类型：服务客户端
 * 文件作用：对接 Continue 控制面 API。
 * 主要职责：提供鉴权、结算与功能开关相关接口。
 */
import { ConfigJson } from "@continuedev/config-types";
import { AssistantUnrolled, ConfigResult, FQSN, FullSlug, Policy, SecretResult } from "@continuedev/config-yaml";
import { OrganizationDescription } from "../config/ProfileLifecycleManager.js";
import { BaseSessionMetadata, IDE, ModelDescription, Session } from "../index.js";
import { ControlPlaneSessionInfo } from "./AuthTypes.js";
export interface PolicyResponse {
    orgSlug?: string;
    policy?: Policy;
}
export interface ControlPlaneWorkspace {
    id: string;
    name: string;
    settings: ConfigJson;
}
export interface ControlPlaneModelDescription extends ModelDescription {
}
export interface CreditStatus {
    optedInToFreeTrial: boolean;
    hasCredits: boolean;
    creditBalance: number;
    hasPurchasedCredits: boolean;
}
export declare const TRIAL_PROXY_URL = "https://proxy-server-blue-l6vsfbzhba-uw.a.run.app";
export interface RemoteSessionMetadata extends BaseSessionMetadata {
    isRemote: true;
    remoteId: string;
}
export interface AgentSessionMetadata {
    createdBy: string;
    github_repo: string;
    organizationId?: string;
    idempotencyKey?: string;
    source?: string;
    continueApiKeyId?: string;
    s3Url?: string;
    prompt?: string | null;
    createdBySlug?: string;
}
export interface AgentSessionView {
    id: string;
    devboxId: string | null;
    name: string | null;
    icon: string | null;
    status: string;
    agentStatus: string | null;
    unread: boolean;
    state: string;
    metadata: AgentSessionMetadata;
    repoUrl: string;
    branch: string | null;
    pullRequestUrl: string | null;
    pullRequestStatus: string | null;
    tunnelUrl: string | null;
    createdAt: string;
    updatedAt: string;
    create_time_ms: string;
    end_time_ms: string;
}
export declare class ControlPlaneClient {
    readonly sessionInfoPromise: Promise<ControlPlaneSessionInfo | undefined>;
    private readonly ide;
    constructor(sessionInfoPromise: Promise<ControlPlaneSessionInfo | undefined>, ide: IDE);
    resolveFQSNs(fqsns: FQSN[], orgScopeId: string | null): Promise<(SecretResult | undefined)[]>;
    isSignedIn(): Promise<boolean>;
    getAccessToken(): Promise<string | undefined>;
    private request;
    private requestAndHandleError;
    listAssistants(organizationId: string | null): Promise<{
        configResult: ConfigResult<AssistantUnrolled>;
        ownerSlug: string;
        packageSlug: string;
        iconUrl: string;
        rawYaml: string;
    }[]>;
    listOrganizations(): Promise<Array<OrganizationDescription>>;
    listAssistantFullSlugs(organizationId: string | null): Promise<FullSlug[] | null>;
    getPolicy(): Promise<PolicyResponse | null>;
    getCreditStatus(): Promise<CreditStatus | null>;
    /**
     * 功能：获取 Models Add-On 的结算链接。
     * 返回：成功时返回包含链接的对象，否则返回 null。
     */
    getModelsAddOnCheckoutUrl(): Promise<{
        url: string;
    } | null>;
    /**
     * Check if remote sessions should be enabled based on feature flags
     */
    shouldEnableRemoteSessions(): Promise<boolean>;
    /**
     * Get current user's session info
     */
    getSessionInfo(): Promise<ControlPlaneSessionInfo | undefined>;
    /**
     * Fetch remote agents/sessions from the control plane
     */
    listRemoteSessions(): Promise<RemoteSessionMetadata[]>;
    loadRemoteSession(remoteId: string): Promise<Session>;
    /**
     * Create a new background agent
     */
    createBackgroundAgent(prompt: string, repoUrl: string, name: string, branch?: string, organizationId?: string, contextItems?: any[], selectedCode?: any[], agent?: string): Promise<{
        id: string;
    }>;
    /**
     * List all background agents for the current user or organization
     * @param organizationId - Optional organization ID to filter agents by organization scope
     * @param limit - Optional limit for number of agents to return (default: 5)
     */
    listBackgroundAgents(organizationId?: string, limit?: number): Promise<{
        agents: Array<{
            id: string;
            name: string | null;
            status: string;
            repoUrl: string;
            createdAt: string;
            metadata?: {
                github_repo?: string;
            };
        }>;
        totalCount: number;
    }>;
    /**
     * Get the full agent session information
     * @param agentSessionId - The ID of the agent session
     * @returns The agent session view including metadata and status
     */
    getAgentSession(agentSessionId: string): Promise<AgentSessionView | null>;
    /**
     * Get the state of a specific background agent
     * @param agentSessionId - The ID of the agent session
     * @returns The agent's session state including history, workspace, and branch
     */
    getAgentState(agentSessionId: string): Promise<{
        session: Session;
        isProcessing: boolean;
        messageQueueLength: number;
        pendingPermission: any;
    } | null>;
}
//# sourceMappingURL=client.d.ts.map