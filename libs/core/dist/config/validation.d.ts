import { ConfigValidationError } from "@continuedev/config-yaml";
import { SerializedContinueConfig } from "../";
/**
 * Validates a SerializedContinueConfig object to ensure all properties are correctly formed.
 * @param config The configuration object to validate.
 * @returns An array of error messages if there are any. Otherwise, the config is valid.
 */
export declare function validateConfig(config: SerializedContinueConfig): ConfigValidationError[] | undefined;
//# sourceMappingURL=validation.d.ts.map