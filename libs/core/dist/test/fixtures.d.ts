import { ConfigHandler } from "../config/ConfigHandler";
import { ControlPlaneClient } from "../control-plane/client";
import Mock from "../llm/llms/Mock";
import FileSystemIde from "../util/filesystem";
export declare const testIde: FileSystemIde;
export declare const ideSettingsPromise: Promise<import("..").IdeSettings>;
export declare const testControlPlaneClient: ControlPlaneClient;
export declare const testConfigHandler: ConfigHandler;
export declare const testLLM: Mock;
//# sourceMappingURL=fixtures.d.ts.map