import { FQSN, PlatformClient, SecretResult } from "@continuedev/config-yaml";
import { IDE } from "../..";
import { ControlPlaneClient } from "../../control-plane/client";
export declare class LocalPlatformClient implements PlatformClient {
    private orgScopeId;
    private readonly client;
    private readonly ide;
    constructor(orgScopeId: string | null, client: ControlPlaneClient, ide: IDE);
    /**
     * searches for the first valid secret file in order of ~/.continue/.env, <workspace>/.continue/.env, <workspace>/.env
     */
    private findSecretInEnvFiles;
    private findSecretInLocalEnvFile;
    private findSecretInWorkspaceEnvFiles;
    resolveFQSNs(fqsns: FQSN[]): Promise<(SecretResult | undefined)[]>;
}
//# sourceMappingURL=LocalPlatformClient.d.ts.map