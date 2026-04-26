import { ContinueConfig, ExperimentalModelRoles, IDE, ILLM, JSONModelDescription, PromptTemplate } from "../";
export declare function addModel(model: JSONModelDescription, role?: keyof ExperimentalModelRoles): void;
export declare function deleteModel(title: string): void;
export declare function getModelByRole<T extends keyof ExperimentalModelRoles>(config: ContinueConfig, role: T): ILLM | undefined;
/**
 * This check is to determine if the user is on an unsupported CPU
 * target for our Lance DB binaries.
 *
 * See here for details: https://github.com/continuedev/continue/issues/940
 */
export declare function isSupportedLanceDbCpuTargetForLinux(ide?: IDE): boolean;
/**
 * This is required because users are only able to define prompt templates as a
 * string, while internally we also allow prompt templates to be functions
 * @param templates
 * @returns
 */
export declare function serializePromptTemplates(templates: Record<string, PromptTemplate> | undefined): Record<string, string> | undefined;
//# sourceMappingURL=util.d.ts.map