import { ConfigYaml } from "./schemas/index.js";
export interface ConfigValidationError {
    fatal: boolean;
    message: string;
    uri?: string;
}
export interface ConfigResult<T> {
    config: T | undefined;
    errors: ConfigValidationError[] | undefined;
    configLoadInterrupted: boolean;
    /** Optional display name from config.yaml `name` field */
    configName?: string;
}
export declare function validateConfigYaml(config: ConfigYaml): ConfigValidationError[];
