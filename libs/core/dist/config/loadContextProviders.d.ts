import { AssistantUnrolledNonNullable, ConfigValidationError } from "@continuedev/config-yaml";
import { IContextProvider, IdeType } from "..";
export declare function loadConfigContextProviders(configContext: AssistantUnrolledNonNullable["context"], hasDocs: boolean, ideType: IdeType): {
    providers: IContextProvider[];
    errors: ConfigValidationError[];
};
//# sourceMappingURL=loadContextProviders.d.ts.map