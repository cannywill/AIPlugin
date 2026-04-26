import { IdeSettings } from "..";
import { ControlPlaneEnv } from "./AuthTypes";
export declare const EXTENSION_NAME = "continue";
export declare function enableHubContinueDev(): Promise<boolean>;
export declare function getControlPlaneEnv(ideSettingsPromise: Promise<IdeSettings>): Promise<ControlPlaneEnv>;
export declare function getControlPlaneEnvSync(ideTestEnvironment: IdeSettings["continueTestEnvironment"]): ControlPlaneEnv;
export declare function useHub(ideSettingsPromise: Promise<IdeSettings>): Promise<boolean>;
//# sourceMappingURL=env.d.ts.map