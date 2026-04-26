export interface HubSessionInfo {
    AUTH_TYPE: AuthType.WorkOsProd | AuthType.WorkOsStaging;
    accessToken: string;
    account: {
        label: string;
        id: string;
    };
}
export interface OnPremSessionInfo {
    AUTH_TYPE: AuthType.OnPrem;
}
export type ControlPlaneSessionInfo = HubSessionInfo | OnPremSessionInfo;
export declare function isOnPremSession(sessionInfo: ControlPlaneSessionInfo | undefined): sessionInfo is OnPremSessionInfo;
export declare enum AuthType {
    WorkOsProd = "continue",
    WorkOsStaging = "continue-staging",
    OnPrem = "on-prem"
}
export interface HubEnv {
    DEFAULT_CONTROL_PLANE_PROXY_URL: string;
    CONTROL_PLANE_URL: string;
    AUTH_TYPE: AuthType.WorkOsProd | AuthType.WorkOsStaging;
    WORKOS_CLIENT_ID: string;
    APP_URL: string;
}
export interface OnPremEnv {
    AUTH_TYPE: AuthType.OnPrem;
    DEFAULT_CONTROL_PLANE_PROXY_URL: string;
    CONTROL_PLANE_URL: string;
    APP_URL: string;
}
export type ControlPlaneEnv = HubEnv | OnPremEnv;
export declare function isHubEnv(env: ControlPlaneEnv): env is HubEnv;
//# sourceMappingURL=AuthTypes.d.ts.map