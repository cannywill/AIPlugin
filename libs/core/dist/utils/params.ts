// 阿里云百炼 (DashScope) OpenAI 兼容模式模型清单。
// 文档：https://help.aliyun.com/zh/model-studio/getting-started/models
// 端点：https://dashscope.aliyuncs.com/compatible-mode/v1
// Dart 端镜像：example/lib/bailian_models.dart —— 修改此文件时请同步更新。

export interface ModelEntry {
    name: string;          // 展示名（GUI 下拉显示）
    base_url: string;      // OpenAI 兼容端点（不含 /chat/completions）
    model: string;         // API 调用使用的 model id
    key: string;           // DashScope API Key
    contextLength: number; // 上下文 token 上限
    maxTokens: number;     // 单次输出 token 上限
    roles: string[];       // 角色：chat / edit / apply / autocomplete 等
}

const BAILIAN_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const BAILIAN_API_KEY = "";

export class Params {
    static readonly isDebug = true;

    static readonly modelsList: ModelEntry[] = [
        {
            name: "通义千问 Max",
            base_url: BAILIAN_BASE_URL,
            model: "qwen-max",
            key: BAILIAN_API_KEY,
            contextLength: 32768,
            maxTokens: 8192,
            roles: ["chat", "edit", "apply"],
        },
        {
            name: "通义千问 Plus (1M)",
            base_url: BAILIAN_BASE_URL,
            model: "qwen-plus",
            key: BAILIAN_API_KEY,
            contextLength: 1000000,
            maxTokens: 8192,
            roles: ["chat", "edit"],
        },
        {
            name: "通义千问 Turbo",
            base_url: BAILIAN_BASE_URL,
            model: "qwen-turbo",
            key: BAILIAN_API_KEY,
            contextLength: 1000000,
            maxTokens: 8192,
            roles: ["chat"],
        },
        {
            name: "通义千问 Long (10M)",
            base_url: BAILIAN_BASE_URL,
            model: "qwen-long",
            key: BAILIAN_API_KEY,
            contextLength: 10000000,
            maxTokens: 6000,
            roles: ["chat"],
        },
        {
            name: "Qwen3 Max",
            base_url: BAILIAN_BASE_URL,
            model: "qwen3-max",
            key: BAILIAN_API_KEY,
            contextLength: 262144,
            maxTokens: 32768,
            roles: ["chat", "edit", "apply"],
        },
        {
            name: "QwQ Plus (推理)",
            base_url: BAILIAN_BASE_URL,
            model: "qwq-plus",
            key: BAILIAN_API_KEY,
            contextLength: 131072,
            maxTokens: 8192,
            roles: ["chat"],
        },
        {
            name: "Qwen2.5 72B Instruct",
            base_url: BAILIAN_BASE_URL,
            model: "qwen2.5-72b-instruct",
            key: BAILIAN_API_KEY,
            contextLength: 131072,
            maxTokens: 8192,
            roles: ["chat", "edit"],
        },
        {
            name: "Qwen2.5 32B Instruct",
            base_url: BAILIAN_BASE_URL,
            model: "qwen2.5-32b-instruct",
            key: BAILIAN_API_KEY,
            contextLength: 131072,
            maxTokens: 8192,
            roles: ["chat"],
        },
        {
            name: "Qwen2.5 Coder 32B",
            base_url: BAILIAN_BASE_URL,
            model: "qwen2.5-coder-32b-instruct",
            key: BAILIAN_API_KEY,
            contextLength: 131072,
            maxTokens: 8192,
            roles: ["chat", "edit", "apply", "autocomplete"],
        },
        {
            name: "DeepSeek V3",
            base_url: BAILIAN_BASE_URL,
            model: "deepseek-v3",
            key: BAILIAN_API_KEY,
            contextLength: 65536,
            maxTokens: 8192,
            roles: ["chat", "edit"],
        },
        {
            name: "DeepSeek R1 (推理)",
            base_url: BAILIAN_BASE_URL,
            model: "deepseek-r1",
            key: BAILIAN_API_KEY,
            contextLength: 65536,
            maxTokens: 8192,
            roles: ["chat"],
        },
    ];

    static defaultModel(): ModelEntry {
        return Params.modelsList[0];
    }

    static findByModelId(modelId: string): ModelEntry | undefined {
        return Params.modelsList.find((m) => m.model === modelId);
    }
}
