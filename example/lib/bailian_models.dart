// 阿里云百炼 (DashScope) OpenAI 兼容模式模型清单 —— Dart 端镜像。
// 与 libs/core/dist/utils/params.ts 中的 Params.modelsList 保持一致；修改时请同步两侧。
// 端点（不含 /chat/completions）：https://dashscope.aliyuncs.com/compatible-mode/v1

class BailianModelEntry {
  const BailianModelEntry({
    required this.name,
    required this.baseUrl,
    required this.model,
    required this.apiKey,
    required this.contextLength,
    required this.maxTokens,
    required this.roles,
  });

  final String name;
  final String baseUrl;
  final String model;
  final String apiKey;
  final int contextLength;
  final int maxTokens;
  final List<String> roles;
}

const String _bailianBaseUrl =
    'https://dashscope.aliyuncs.com/compatible-mode/v1';

// 不要把真实的 key 写进源码。运行时通过 --dart-define 注入：
//   flutter run --dart-define=BAILIAN_API_KEY=sk-xxxxxxxx
// 留空时 GUI 仍可加载，但请求 LLM 会得到 401。
const String _bailianApiKey =
    String.fromEnvironment('BAILIAN_API_KEY', defaultValue: '');

const List<BailianModelEntry> bailianModels = <BailianModelEntry>[
  BailianModelEntry(
    name: '通义千问 Max',
    baseUrl: _bailianBaseUrl,
    model: 'qwen-max',
    apiKey: _bailianApiKey,
    contextLength: 32768,
    maxTokens: 8192,
    roles: <String>['chat', 'edit', 'apply'],
  ),
  BailianModelEntry(
    name: '通义千问 Plus (1M)',
    baseUrl: _bailianBaseUrl,
    model: 'qwen-plus',
    apiKey: _bailianApiKey,
    contextLength: 1000000,
    maxTokens: 8192,
    roles: <String>['chat', 'edit'],
  ),
  BailianModelEntry(
    name: '通义千问 Turbo',
    baseUrl: _bailianBaseUrl,
    model: 'qwen-turbo',
    apiKey: _bailianApiKey,
    contextLength: 1000000,
    maxTokens: 8192,
    roles: <String>['chat'],
  ),
  BailianModelEntry(
    name: '通义千问 Long (10M)',
    baseUrl: _bailianBaseUrl,
    model: 'qwen-long',
    apiKey: _bailianApiKey,
    contextLength: 10000000,
    maxTokens: 6000,
    roles: <String>['chat'],
  ),
  BailianModelEntry(
    name: 'Qwen3 Max',
    baseUrl: _bailianBaseUrl,
    model: 'qwen3-max',
    apiKey: _bailianApiKey,
    contextLength: 262144,
    maxTokens: 32768,
    roles: <String>['chat', 'edit', 'apply'],
  ),
  BailianModelEntry(
    name: 'QwQ Plus (推理)',
    baseUrl: _bailianBaseUrl,
    model: 'qwq-plus',
    apiKey: _bailianApiKey,
    contextLength: 131072,
    maxTokens: 8192,
    roles: <String>['chat'],
  ),
  BailianModelEntry(
    name: 'Qwen2.5 72B Instruct',
    baseUrl: _bailianBaseUrl,
    model: 'qwen2.5-72b-instruct',
    apiKey: _bailianApiKey,
    contextLength: 131072,
    maxTokens: 8192,
    roles: <String>['chat', 'edit'],
  ),
  BailianModelEntry(
    name: 'Qwen2.5 32B Instruct',
    baseUrl: _bailianBaseUrl,
    model: 'qwen2.5-32b-instruct',
    apiKey: _bailianApiKey,
    contextLength: 131072,
    maxTokens: 8192,
    roles: <String>['chat'],
  ),
  BailianModelEntry(
    name: 'Qwen2.5 Coder 32B',
    baseUrl: _bailianBaseUrl,
    model: 'qwen2.5-coder-32b-instruct',
    apiKey: _bailianApiKey,
    contextLength: 131072,
    maxTokens: 8192,
    roles: <String>['chat', 'edit', 'apply', 'autocomplete'],
  ),
  BailianModelEntry(
    name: 'DeepSeek V3',
    baseUrl: _bailianBaseUrl,
    model: 'deepseek-v3',
    apiKey: _bailianApiKey,
    contextLength: 65536,
    maxTokens: 8192,
    roles: <String>['chat', 'edit'],
  ),
  BailianModelEntry(
    name: 'DeepSeek R1 (推理)',
    baseUrl: _bailianBaseUrl,
    model: 'deepseek-r1',
    apiKey: _bailianApiKey,
    contextLength: 65536,
    maxTokens: 8192,
    roles: <String>['chat'],
  ),
];

BailianModelEntry get defaultBailianModel => bailianModels.first;

BailianModelEntry? findBailianModelById(String modelId) {
  for (final entry in bailianModels) {
    if (entry.model == modelId) {
      return entry;
    }
  }
  return null;
}

Map<String, Object?> bailianModelToContinueModel(
  BailianModelEntry entry, {
  required Iterable<String> roles,
}) {
  return <String, Object?>{
    'title': entry.name,
    'model': entry.model,
    'provider': 'openai',
    'underlyingProviderName': 'openai',
    'apiBase': entry.baseUrl,
    'contextLength': entry.contextLength,
    'completionOptions': <String, Object?>{
      'maxTokens': entry.maxTokens,
    },
    'roles': roles.toList(),
  };
}
