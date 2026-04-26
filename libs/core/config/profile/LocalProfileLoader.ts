/**
 * 文件类型：配置加载
 * 文件作用：加载本地 profile 并生成 Continue 配置。
 * 主要职责：包装本地配置文件读取与 doLoadConfig 调用。
 */
import { ConfigResult } from "@continuedev/config-yaml";

import { ControlPlaneClient } from "../../control-plane/client.js";
import { ContinueConfig, IDE, ILLMLogger } from "../../index.js";
import { ProfileDescription } from "../ProfileLifecycleManager.js";

import { getPrimaryConfigFilePath } from "../../util/paths.js";
import { localPathToUri } from "../../util/pathToUri.js";
import { getUriPathBasename } from "../../util/uri.js";
import doLoadConfig from "./doLoadConfig.js";
import { IProfileLoader } from "./IProfileLoader.js";

export default class LocalProfileLoader implements IProfileLoader {
  static ID = "local";

  description: ProfileDescription;

  constructor(
    private ide: IDE,
    private controlPlaneClient: ControlPlaneClient,
    private llmLogger: ILLMLogger,
    private overrideAssistantFile?:
      | { path: string; content: string }
      | undefined,
  ) {
    this.description = {
      id: overrideAssistantFile?.path ?? LocalProfileLoader.ID,
      profileType: "local",
      fullSlug: {
        ownerSlug: "",
        packageSlug: "",
        versionSlug: "",
      },
      iconUrl: "",
      title: overrideAssistantFile?.path
        ? getUriPathBasename(overrideAssistantFile.path)
        : "Local Config",
      errors: undefined,
      uri:
        overrideAssistantFile?.path ??
        localPathToUri(getPrimaryConfigFilePath()),
      rawYaml: undefined,
    };
  }

  async doLoadConfig(): Promise<ConfigResult<ContinueConfig>> {
    const result = await doLoadConfig({
      ide: this.ide,
      controlPlaneClient: this.controlPlaneClient,
      llmLogger: this.llmLogger,
      profileId: this.description.id,
      overrideConfigYamlByPath: this.overrideAssistantFile?.path,
      orgScopeId: null,
      packageIdentifier: {
        uriType: "file",
        fileUri: this.overrideAssistantFile?.path ?? getPrimaryConfigFilePath(),
        // 直接传入预读取内容，避免重复读取与路径差异问题
        content: this.overrideAssistantFile?.content,
      },
    });

    this.description.errors = result.errors;

    // Use the config name from the loaded config (avoids duplicate file reads
    // and works in environments like WSL where paths may differ)
    if (result.configName) {
      this.description.title = result.configName;
    }

    return result;
  }

  setIsActive(isActive: boolean): void {}
}
