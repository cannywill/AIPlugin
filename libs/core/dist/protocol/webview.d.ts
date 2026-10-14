/**
 * 文件类型：协议定义
 * 文件作用：定义 Core/IDE 向 Webview 下发的消息协议。
 * 主要职责：保留 Flutter 所需协议，移除非 Flutter 环境通道。
 */
import { ConfigResult } from "@continuedev/config-yaml";
import { SerializedOrgWithProfiles } from "../config/ProfileLifecycleManager.js";
import { ControlPlaneSessionInfo } from "../control-plane/AuthTypes.js";
import type { BrowserSerializedContinueConfig, ContextItemWithId, ContextProviderName, IndexingProgressUpdate, IndexingStatus } from "../index.js";
export type ToWebviewFromIdeOrCoreProtocol = {
    configUpdate: [
        {
            result: ConfigResult<BrowserSerializedContinueConfig>;
            profileId: string | null;
            organizations: SerializedOrgWithProfiles[];
            selectedOrgId: string | null;
        },
        void
    ];
    getDefaultModelTitle: [undefined, string | undefined];
    indexProgress: [IndexingProgressUpdate, void];
    "indexing/statusUpdate": [IndexingStatus, void];
    refreshSubmenuItems: [
        {
            providers: "all" | "dependsOnIndexing" | ContextProviderName[];
        },
        void
    ];
    didCloseFiles: [{
        uris: string[];
    }, void];
    isContinueInputFocused: [undefined, boolean];
    addContextItem: [
        {
            historyIndex: number;
            item: ContextItemWithId;
        },
        void
    ];
    setTTSActive: [boolean, void];
    getWebviewHistoryLength: [undefined, number];
    getCurrentSessionId: [undefined, string];
    sessionUpdate: [{
        sessionInfo: ControlPlaneSessionInfo | undefined;
    }, void];
    toolCallPartialOutput: [{
        toolCallId: string;
        contextItems: any[];
    }, void];
    freeTrialExceeded: [undefined, void];
};
//# sourceMappingURL=webview.d.ts.map