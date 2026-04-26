import { AssistantUnrolled, ConfigResult, PackageIdentifier, RegistryClient } from "@continuedev/config-yaml";
import { IDE } from "../..";
import { ControlPlaneClient } from "../../control-plane/client";
export declare function unrollLocalYamlBlocks(packageIdentifiers: PackageIdentifier[], ide: IDE, registryClient: RegistryClient, orgScopeId: string | null, controlPlaneClient: ControlPlaneClient): Promise<ConfigResult<AssistantUnrolled>>;
//# sourceMappingURL=loadLocalYamlBlocks.d.ts.map