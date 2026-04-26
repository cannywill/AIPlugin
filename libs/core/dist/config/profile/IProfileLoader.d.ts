import { ConfigResult } from "@continuedev/config-yaml";
import { ContinueConfig } from "../../index.js";
import { ProfileDescription } from "../ProfileLifecycleManager.js";
export interface IProfileLoader {
    description: ProfileDescription;
    doLoadConfig(): Promise<ConfigResult<ContinueConfig>>;
    setIsActive(isActive: boolean): void;
}
//# sourceMappingURL=IProfileLoader.d.ts.map