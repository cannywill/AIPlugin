import { SecretType, } from "@continuedev/config-yaml";
import * as dotenv from "dotenv";
import { getContinueDotEnv } from "../../util/paths";
import { joinPathsToUri } from "../../util/uri";
export class LocalPlatformClient {
    orgScopeId;
    client;
    ide;
    constructor(orgScopeId, client, ide) {
        this.orgScopeId = orgScopeId;
        this.client = client;
        this.ide = ide;
    }
    /**
     * searches for the first valid secret file in order of ~/.continue/.env, <workspace>/.continue/.env, <workspace>/.env
     */
    async findSecretInEnvFiles(fqsn) {
        const secretValue = this.findSecretInLocalEnvFile(fqsn) ??
            (await this.findSecretInWorkspaceEnvFiles(fqsn, true)) ??
            (await this.findSecretInWorkspaceEnvFiles(fqsn, false));
        if (secretValue) {
            return {
                found: true,
                fqsn,
                value: secretValue,
                secretLocation: {
                    secretName: fqsn.secretName,
                    secretType: SecretType.LocalEnv,
                },
            };
        }
        return undefined;
    }
    findSecretInLocalEnvFile(fqsn) {
        try {
            const dotEnv = getContinueDotEnv();
            return dotEnv[fqsn.secretName];
        }
        catch (error) {
            console.warn(`Error reading ~/.continue/.env file: ${error instanceof Error ? error.message : String(error)}`);
            return undefined;
        }
    }
    async findSecretInWorkspaceEnvFiles(fqsn, insideContinue) {
        try {
            const workspaceDirs = await this.ide.getWorkspaceDirs();
            for (const folder of workspaceDirs) {
                const envFilePath = joinPathsToUri(folder, insideContinue ? ".continue" : "", ".env");
                try {
                    const fileExists = await this.ide.fileExists(envFilePath);
                    if (fileExists) {
                        const envContent = await this.ide.readFile(envFilePath);
                        const env = dotenv.parse(envContent);
                        if (fqsn.secretName in env) {
                            return env[fqsn.secretName];
                        }
                    }
                }
                catch (error) {
                    console.warn(`Error reading workspace .env file at ${envFilePath}: ${error instanceof Error ? error.message : String(error)}`);
                    // Continue to next workspace folder
                }
            }
            return undefined;
        }
        catch (error) {
            console.warn(`Error searching workspace .env files: ${error instanceof Error ? error.message : String(error)}`);
            return undefined;
        }
    }
    async resolveFQSNs(fqsns) {
        if (fqsns.length === 0) {
            return [];
        }
        let results = [];
        try {
            results = await this.client.resolveFQSNs(fqsns, this.orgScopeId);
        }
        catch (e) {
            console.error("Error getting secrets from control plane", e);
        }
        // For any secret that isn't found, look in .env files, then process.env
        for (let i = 0; i < results.length; i++) {
            if (!results[i]?.found) {
                let secretResult = await this.findSecretInEnvFiles(fqsns[i]);
                // If not found in .env files, try process.env
                if (!secretResult?.found) {
                    const secretValueFromProcessEnv = process.env[fqsns[i].secretName];
                    if (secretValueFromProcessEnv !== undefined) {
                        secretResult = {
                            found: true,
                            fqsn: fqsns[i],
                            value: secretValueFromProcessEnv,
                            secretLocation: {
                                secretName: fqsns[i].secretName,
                                // Cast to SecretType.ProcessEnv is necessary because the specific type
                                // ProcessEnvSecretLocation expects secretType to be exactly SecretType.ProcessEnv,
                                // not the general enum SecretType.
                                secretType: SecretType.ProcessEnv,
                            },
                        };
                    }
                }
                if (secretResult?.found) {
                    results[i] = secretResult;
                }
            }
        }
        return results;
    }
}
