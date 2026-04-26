export function isOnPremSession(sessionInfo) {
    return sessionInfo !== undefined && sessionInfo.AUTH_TYPE === AuthType.OnPrem;
}
export var AuthType;
(function (AuthType) {
    AuthType["WorkOsProd"] = "continue";
    AuthType["WorkOsStaging"] = "continue-staging";
    AuthType["OnPrem"] = "on-prem";
})(AuthType || (AuthType = {}));
export function isHubEnv(env) {
    return ("AUTH_TYPE" in env &&
        env.AUTH_TYPE !== "on-prem" &&
        "WORKOS_CLIENT_ID" in env);
}
