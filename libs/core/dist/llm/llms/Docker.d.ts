import { LLMOptions, ModelInstaller } from "../../index.js";
import OpenAI from "./OpenAI.js";
/**
 * Docker Model Runner provider
 *
 * Integrates with Docker Desktop's Model Runner feature (currently in beta)
 * that allows running local AI models through Docker.
 *
 * Docker Model Runner provides an OpenAI-compatible API endpoint, making it
 * easy to integrate with existing OpenAI-compatible code.
 *
 * More information at: https://docs.docker.com/desktop/features/model-runner/
 */
declare class Docker extends OpenAI implements ModelInstaller {
    static providerName: string;
    static defaultOptions: Partial<LLMOptions>;
    private modelMap;
    private static modelsBeingInstalled;
    private static modelsBeingInstalledMutex;
    constructor(options: LLMOptions);
    /**
     * Checks if Docker Model Runner is running at the expected port
     * and enables it if not running
     */
    private ensureModelRunnerEnabled;
    /**
     * Checks if a port is currently bound/in use
     */
    private isPortBound;
    private executeDockerCommand;
    listModels(): Promise<string[]>;
    installModel(modelName: string, signal: AbortSignal, progressReporter?: (task: string, increment: number, total: number) => void): Promise<any>;
    isInstallingModel(modelName: string): Promise<boolean>;
}
export default Docker;
//# sourceMappingURL=Docker.d.ts.map