// 文件职责：Flutter 示例入口，负责挂载 Continue GUI、二进制桥接与密钥安全存储。
import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;

import 'package:app_ai_plugin/app_ai_plugin.dart';
import 'package:app_ai_plugin/app_ai_plugin_ui.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'bailian_models.dart';
import 'params.dart';

const _continueGuiUrl = String.fromEnvironment('CONTINUE_GUI_URL');
const _continueGuiDist = String.fromEnvironment('CONTINUE_GUI_DIST');
const _continueBinaryExecutable = String.fromEnvironment(
  'CONTINUE_BINARY_EXECUTABLE',
);
const _continueBinaryArguments = String.fromEnvironment(
  'CONTINUE_BINARY_ARGUMENTS',
);
const _continueBinaryWorkingDirectory = String.fromEnvironment(
  'CONTINUE_BINARY_WORKING_DIRECTORY',
);
const _continueWorkspaceDir = String.fromEnvironment('CONTINUE_WORKSPACE_DIR');
const _continueCurrentFile = String.fromEnvironment('CONTINUE_CURRENT_FILE');
const _openAiApiKeySecretKey = 'OPENAI_API_KEY';
const _defaultModelOverride = String.fromEnvironment('OPENAI_MODEL');

// 应用入口。
void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final ContinueGuiShellPort _continueGuiShellPort;
  late final ContinueShellController _continueShellController;

  String _platformVersion = 'Unknown';
  String _selectedSessionId = 'session-1';
  String? _storedOpenAiApiKey;
  String? _secretStorageError;
  bool _isLoadingOpenAiApiKey = true;
  late BailianModelEntry _selectedModel = _initialSelectedModel();

  static BailianModelEntry _initialSelectedModel() {
    if (_defaultModelOverride.isNotEmpty) {
      final match = findBailianModelById(_defaultModelOverride);
      if (match != null) {
        return match;
      }
    }
    return defaultBailianModel;
  }

  final _appAiPlugin = const AppAiPlugin();
  final List<AppAiSessionSummary> _sessions = const [
    AppAiSessionSummary(
      id: 'session-1',
      title: 'Continue Migration',
      subtitle: 'Formal plugin structure and reusable UI shell',
    ),
    AppAiSessionSummary(
      id: 'session-2',
      title: 'Core Bridge',
      subtitle: 'Binary transport, host adapter, and message routing',
    ),
  ];
  final List<AppAiChatEntry> _messages = [
    const AppAiChatEntry(
      id: 'm1',
      role: AppAiMessageRole.system,
      content:
          'This example app demonstrates a formal plugin shell instead of the default template.',
    ),
    const AppAiChatEntry(
      id: 'm2',
      role: AppAiMessageRole.assistant,
      content:
          'You can now split plugin bridge code from reusable Flutter UI widgets.',
    ),
  ];
  final List<String> _runtimeDebugLines = <String>[];

  // 初始化 Continue Shell 与应用状态。
  @override
  void initState() {
    super.initState();
    _pushRuntimeLog('init', 'App initialized');
    _continueGuiShellPort = ContinueGuiShellPort();
    _continueGuiShellPort.activityVersion.addListener(_onShellPortActivity);
    _continueShellController = ContinueShellController(
      coreTransport: _createCoreTransport(),
      hostAdapter: _createHostAdapter(),
      shellPort: _continueGuiShellPort,
    );
    _continueShellController.addListener(_onShellPortActivity);
    unawaited(_continueShellController.start());
    _pushRuntimeLog('controller.start', 'ContinueShellController started');
    unawaited(_primeContinueGuiConfiguration());
    unawaited(_initializeAppState());
  }

  // 释放 Shell 资源。
  @override
  void dispose() {
    _continueShellController.removeListener(_onShellPortActivity);
    _continueGuiShellPort.activityVersion.removeListener(_onShellPortActivity);
    unawaited(_continueShellController.shutdown());
    unawaited(_continueGuiShellPort.dispose());
    super.dispose();
  }

  // 启动时加载平台信息与安全存储中的 OpenAI Key。
  Future<void> _initializeAppState() async {
    await Future.wait<void>([
      _loadPlatformVersion(),
      _loadStoredOpenAiApiKey(),
    ]);
  }

  // 主动把配置推给 Continue GUI，避免 WebView 首屏时 bridge 尚未安装导致初始配置请求丢失。
  Future<void> _primeContinueGuiConfiguration() async {
    final payload = _buildContinueGuiConfigUpdatePayload();
    for (var index = 0; index < 3; index += 1) {
      await Future<void>.delayed(Duration(milliseconds: 250 * (index + 1)));
      _pushRuntimeLog('configUpdate.push', 'attempt=${index + 1}');
      await _continueGuiShellPort.postMessage(
        ContinueMessage(
          messageType: 'configUpdate',
          messageId: 'flutter-configUpdate-$index',
          data: payload,
        ),
      );
      developer.log(
        'Primed Continue GUI configUpdate attempt=${index + 1}',
        name: 'AppAiPluginExample',
      );
    }
  }

  // 读取平台版本信息。
  Future<void> _loadPlatformVersion() async {
    String platformVersion;
    try {
      platformVersion =
          await _appAiPlugin.getPlatformVersion() ?? 'Unknown platform version';
    } catch (_) {
      platformVersion = 'Failed to get platform version.';
    }

    if (!mounted) {
      return;
    }

    setState(() {
      _platformVersion = platformVersion;
    });
  }

  // 从安全存储读取 OpenAI Key。
  Future<void> _loadStoredOpenAiApiKey() async {
    if (kIsWeb) {
      if (!mounted) {
        return;
      }
      setState(() {
        _storedOpenAiApiKey = null;
        _secretStorageError =
            'Secure storage is only enabled on Android, iOS, and macOS in this example.';
        _isLoadingOpenAiApiKey = false;
      });
      return;
    }

    try {
      final secrets = await _appAiPlugin.readSecrets([_openAiApiKeySecretKey]);
      if (!mounted) {
        return;
      }
      setState(() {
        final value = secrets[_openAiApiKeySecretKey]?.trim();
        _storedOpenAiApiKey = value == null || value.isEmpty ? null : value;
        _secretStorageError = null;
        _isLoadingOpenAiApiKey = false;
      });
    } catch (error) {
      if (!mounted) {
        return;
      }
      setState(() {
        _storedOpenAiApiKey = null;
        _secretStorageError = error.toString();
        _isLoadingOpenAiApiKey = false;
      });
    }
  }

  // 处理用户输入，优先走 Flutter 直连 OpenAI 聊天。
  Future<void> _handleSubmit(String prompt) async {
    _pushRuntimeLog('flutter.input.send', 'prompt="${prompt.trim()}"');
    final userEntryId = 'u-${DateTime.now().microsecondsSinceEpoch}';
    final assistantEntryId = 'a-${DateTime.now().microsecondsSinceEpoch}';
    setState(() {
      _messages.add(
        AppAiChatEntry(
          id: userEntryId,
          role: AppAiMessageRole.user,
          content: prompt,
        ),
      );
      _messages.add(
        AppAiChatEntry(
          id: assistantEntryId,
          role: AppAiMessageRole.assistant,
          content: 'Thinking...',
        ),
      );
    });

    try {
      _pushRuntimeLog('flutter.llm.request.start', 'source=topInput');
      final response = await _requestOpenAiChatFromPrompt(prompt);
      _pushRuntimeLog('flutter.llm.request.ok', 'source=topInput');
      if (!mounted) {
        return;
      }
      setState(() {
        final index = _messages.indexWhere(
          (entry) => entry.id == assistantEntryId,
        );
        if (index == -1) {
          return;
        }
        _messages[index] = AppAiChatEntry(
          id: assistantEntryId,
          role: AppAiMessageRole.assistant,
          content: response,
        );
      });
    } catch (error) {
      _pushRuntimeLog('flutter.llm.request.error', '$error');
      developer.log(
        'OpenAI request failed: $error',
        name: 'AppAiPluginExample',
      );
      if (!mounted) {
        return;
      }
      setState(() {
        final index = _messages.indexWhere(
          (entry) => entry.id == assistantEntryId,
        );
        if (index == -1) {
          return;
        }
        _messages[index] = AppAiChatEntry(
          id: assistantEntryId,
          role: AppAiMessageRole.assistant,
          content: 'OpenAI request failed: $error',
        );
      });
      _showMessage('OpenAI request failed: $error');
    }
  }

  // 是否启用二进制桥接。
  bool get _hasBinaryBridge => _continueBinaryExecutable.isNotEmpty;

  // 决定 Continue GUI 的来源（dev server 或 dist）。
  ContinueGuiSource? get _continueGuiSource {
    if (_continueGuiUrl.isNotEmpty) {
      return ContinueGuiSource.devServer(url: Uri.parse(_continueGuiUrl));
    }

    final bundleDirectory = _continueGuiDist.isNotEmpty
        ? _continueGuiDist
        : kIsWeb
        ? ''
        : '../libs/gui/dist';

    if (bundleDirectory.isNotEmpty) {
      return ContinueGuiSource.bundleDirectory(directory: bundleDirectory);
    }
    return null;
  }

  // Key 按钮文案。
  String get _openAiKeyStatusLabel {
    if (_isLoadingOpenAiApiKey) {
      return 'Loading key';
    }
    if (kIsWeb) {
      return 'Web only';
    }
    return _storedOpenAiApiKey == null ? 'Key not set' : 'Key saved';
  }

  // 标题下方的状态描述。
  String get _subtitle {
    final keySummary = kIsWeb
        ? 'Secure key storage is unavailable on Flutter Web.'
        : _storedOpenAiApiKey == null
        ? 'OpenAI key not stored yet.'
        : 'OpenAI key is stored in native secure storage.';
    return 'Running on: $_platformVersion\n$keySummary\n${_continueGuiShellPort.diagnosticsLabel}';
  }

  // GUI 桥接活动发生变化时刷新标题区调试信息。
  void _onShellPortActivity() {
    _pushRuntimeLog('bridge.activity', _continueGuiShellPort.diagnosticsLabel);
    if (!mounted) {
      return;
    }
    setState(() {});
  }

  // 构造核心传输层（二进制或演示通道）。
  CoreTransport _createCoreTransport() {
    if (_hasBinaryBridge) {
      return ProcessCoreTransport(
        executablePath: _continueBinaryExecutable,
        arguments: _parseBinaryArguments(_continueBinaryArguments),
        workingDirectory: _continueBinaryWorkingDirectory.isEmpty
            ? null
            : _continueBinaryWorkingDirectory,
        environment: const {'NODE_ENV': 'production'},
      );
    }
    return createContinueGuiDemoCoreTransport(
      streamChatHandler: _handleGuiStreamChat,
      llmCompleteHandler: (message) async {
        final data = message.data;
        if (data is! Map) {
          return '';
        }
        final prompt = (data['prompt'] ?? '').toString();
        if (prompt.trim().isEmpty) {
          return '';
        }
        return _requestOpenAiChatFromPrompt(prompt);
      },
      // 让 GUI 首次拉取 config/getSerializedProfileInfo 时就拿到百炼模型列表，
      // 否则会先看到 demo 默认的 GPT-4.1 Demo。
      serializedProfileInfoOverride: _buildContinueGuiConfigUpdatePayload(),
      listModelsOverride: <String>[
        for (final entry in bailianModels) entry.model,
      ],
    );
  }

  // 构造 Flutter 端 Host Adapter。
  HostAdapter _createHostAdapter() {
    if (_hasBinaryBridge) {
      return CompositeHostAdapter(
        delegates: [
          LocalWorkspaceHostAdapter(
            workspaceDirs: _continueWorkspaceDir.isEmpty
                ? const <String>[]
                : <String>[_continueWorkspaceDir],
            currentFilePath: _continueCurrentFile.isEmpty
                ? null
                : _continueCurrentFile,
            ideName: 'app-ai-plugin-example',
            ideVersion: '0.0.1',
          ),
          ChannelBackedHostAdapter(),
        ],
      );
    }
    return createContinueGuiDemoHostAdapter();
  }

  Map<String, Object?> _buildContinueGuiConfigUpdatePayload() {
    List<Map<String, Object?>> modelsForRole(String role) {
      return <Map<String, Object?>>[
        for (final entry in bailianModels)
          if (entry.roles.contains(role))
            bailianModelToContinueModel(entry, roles: <String>[role]),
      ];
    }

    Map<String, Object?>? selectedForRole(String role) {
      final entry = _selectedModel.roles.contains(role)
          ? _selectedModel
          : bailianModels.firstWhere(
              (m) => m.roles.contains(role),
              orElse: () => _selectedModel,
            );
      if (!entry.roles.contains(role)) {
        return null;
      }
      return bailianModelToContinueModel(entry, roles: <String>[role]);
    }

    return <String, Object?>{
      'organizations': <Object?>[
        <String, Object?>{
          'id': 'personal',
          'profiles': <Object?>[
            <String, Object?>{
              'title': 'Local Agent',
              'id': 'local',
              'errors': const <Object?>[],
              'profileType': 'local',
              'uri': '',
              'iconUrl': '',
              'fullSlug': <String, Object?>{
                'ownerSlug': '',
                'packageSlug': '',
                'versionSlug': '',
              },
            },
          ],
          'slug': '',
          'selectedProfileId': 'local',
          'name': 'Personal',
          'iconUrl': '',
        },
      ],
      'profileId': 'local',
      'result': <String, Object?>{
        'config': <String, Object?>{
          'tools': const <Object?>[],
          'slashCommands': const <Object?>[],
          'contextProviders': const <Object?>[],
          'mcpServerStatuses': const <Object?>[],
          'usePlatform': true,
          'modelsByRole': <String, Object?>{
            'chat': modelsForRole('chat'),
            'apply': modelsForRole('apply'),
            'edit': modelsForRole('edit'),
            'summarize': const <Object?>[],
            'autocomplete': modelsForRole('autocomplete'),
            'rerank': const <Object?>[],
            'embed': const <Object?>[],
            'subagent': const <Object?>[],
          },
          'selectedModelByRole': <String, Object?>{
            'chat': selectedForRole('chat'),
            'apply': selectedForRole('apply'),
            'edit': selectedForRole('edit'),
            'summarize': null,
            'autocomplete': selectedForRole('autocomplete'),
            'rerank': null,
            'embed': null,
            'subagent': null,
          },
          'rules': const <Object?>[],
        },
        'errors': const <Object?>[],
        'configLoadInterrupted': false,
      },
      'selectedOrgId': 'personal',
    };
  }

  // 构建 Continue GUI 复用面板。
  Widget _buildReusePane() {
    final source = _continueGuiSource;
    if (source == null) {
      return _ContinueGuiSetupGuide(hasBinaryBridge: _hasBinaryBridge);
    }

    // Params.isDebug 控制底部 Continue Runtime Log 面板是否显示。
    // 关闭时只渲染纯 Continue GUI；联调时通过 --dart-define=APP_AI_DEBUG=true 打开。
    final webView = ContinueGuiWebView(
      source: source,
      shellPort: _continueGuiShellPort,
      placeholder: const ColoredBox(
        color: Colors.white,
        child: Center(child: CircularProgressIndicator()),
      ),
    );

    if (!Params.isDebug) {
      return webView;
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final debugPanelHeight = constraints.maxHeight >= 620 ? 220.0 : 120.0;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(child: webView),
            const SizedBox(height: 8),
            SizedBox(
              height: debugPanelHeight,
              child: SingleChildScrollView(
                child: _ContinueGuiDebugPanel(
                  shellDiagnostics: _continueGuiShellPort.diagnosticsLabel,
                  shellEvents: _continueGuiShellPort.recentEvents,
                  controllerStatus: _continueShellController.status,
                  controllerEvents: _continueShellController.recentEvents,
                  runtimeLines: _runtimeDebugLines,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  // 打开 API Key 输入弹窗。
  Future<void> _openApiKeyDialog() async {
    if (kIsWeb) {
      _showMessage(
        'Secure storage for API keys is only available on Android, iOS, and macOS in this example.',
      );
      return;
    }

    try {
      final result = await showDialog<_ApiKeyDialogResult>(
        context: context,
        useRootNavigator: true,
        builder: (context) => _ApiKeyDialog(
          initialValue: _storedOpenAiApiKey,
          errorMessage: _secretStorageError,
        ),
      );

      if (result == null || !mounted) {
        return;
      }

      if (result.clearKey) {
        await _saveOpenAiApiKey(null);
        return;
      }

      await _saveOpenAiApiKey(result.value.trim());
    } catch (error) {
      if (!mounted) {
        return;
      }
      setState(() {
        _secretStorageError = 'Failed to open API key dialog: $error';
      });
      _showMessage('Failed to open API key dialog: $error');
    }
  }

  // 写入或清除 OpenAI Key。
  Future<void> _saveOpenAiApiKey(String? value) async {
    setState(() {
      _isLoadingOpenAiApiKey = true;
      _secretStorageError = null;
    });

    try {
      await _appAiPlugin.writeSecrets({
        _openAiApiKeySecretKey: value == null || value.isEmpty ? null : value,
      });

      if (!mounted) {
        return;
      }

      setState(() {
        _storedOpenAiApiKey = value == null || value.isEmpty ? null : value;
        _isLoadingOpenAiApiKey = false;
      });
      _showMessage(
        _storedOpenAiApiKey == null
            ? 'OpenAI API key removed from native secure storage.'
            : 'OpenAI API key saved to native secure storage.',
      );
    } catch (error) {
      if (!mounted) {
        return;
      }
      setState(() {
        _secretStorageError = error.toString();
        _isLoadingOpenAiApiKey = false;
      });
      _showMessage('Failed to update secure storage: $error');
    }
  }

  // 解析 GUI streamChat 请求中的 model id（如 "qwen-plus"），命中则切换到对应百炼模型。
  BailianModelEntry _resolveModelFromStreamData(Object? rawData) {
    String? requested;
    if (rawData is Map) {
      final completionOptions = rawData['completionOptions'];
      if (completionOptions is Map) {
        final value = completionOptions['model'];
        if (value is String && value.trim().isNotEmpty) {
          requested = value.trim();
        }
      }
      if (requested == null) {
        final value = rawData['model'];
        if (value is String && value.trim().isNotEmpty) {
          requested = value.trim();
        }
      }
    }
    if (requested == null) {
      return _selectedModel;
    }
    final match = findBailianModelById(requested);
    if (match == null) {
      _pushRuntimeLog('model.unknown', 'requested=$requested');
      return _selectedModel;
    }
    if (match.model != _selectedModel.model) {
      _pushRuntimeLog(
        'model.switch',
        '${_selectedModel.model} -> ${match.model}',
      );
      if (mounted) {
        setState(() {
          _selectedModel = match;
        });
      } else {
        _selectedModel = match;
      }
    }
    return match;
  }

  // 处理 Continue GUI 的 llm/streamChat，改为 Flutter 直连百炼。
  Stream<String> _handleGuiStreamChat(
    ContinueMessage message,
    String? prompt,
  ) async* {
    _pushRuntimeLog(
      'continue.streamChat.in',
      'messageType=${message.messageType}, prompt="${(prompt ?? '').trim()}"',
    );
    final rawData = message.data;
    final modelEntry = _resolveModelFromStreamData(rawData);
    final chatMessages = _extractOpenAiMessages(rawData);
    if (chatMessages.isEmpty && prompt != null && prompt.trim().isNotEmpty) {
      chatMessages.add(<String, String>{
        'role': 'user',
        'content': prompt.trim(),
      });
    }
    if (chatMessages.isEmpty) {
      _pushRuntimeLog('continue.streamChat.skip', 'No prompt provided');
      yield 'No prompt provided.';
      return;
    }
    var streamedLength = 0;
    await for (final chunk in _requestOpenAiChatStream(
      messages: chatMessages,
      modelEntry: modelEntry,
    )) {
      streamedLength += chunk.length;
      yield chunk;
    }
    _pushRuntimeLog(
      'continue.streamChat.out',
      'responseLength=$streamedLength',
    );
  }

  // 处理 Flutter 顶部聊天输入框。
  Future<String> _requestOpenAiChatFromPrompt(String prompt) {
    final trimmed = prompt.trim();
    return _requestOpenAiChat(
      messages: <Map<String, String>>[
        <String, String>{'role': 'user', 'content': trimmed},
      ],
    );
  }

  // 调用 Chat Completions（Flutter 直连，不依赖 Continue binary）。
  // 优先使用模型条目里的 key；只有当模型条目自带 key 为空时，才回落到 Keychain。
  // （不能反过来：Keychain 里若是 OpenAI 的 key，发到百炼/DeepSeek 端点会 401。）
  Future<String> _requestOpenAiChat({
    required List<Map<String, String>> messages,
    BailianModelEntry? modelEntry,
  }) async {
    final buffer = StringBuffer();
    await for (final chunk in _requestOpenAiChatStream(
      messages: messages,
      modelEntry: modelEntry,
    )) {
      buffer.write(chunk);
    }
    final text = buffer.toString().trim();
    if (text.isEmpty) {
      _pushRuntimeLog('openai.response.empty', 'No text content');
      throw StateError('OpenAI returned empty content.');
    }
    return text;
  }

  Stream<String> _requestOpenAiChatStream({
    required List<Map<String, String>> messages,
    BailianModelEntry? modelEntry,
  }) async* {
    final entry = modelEntry ?? _selectedModel;
    final entryKey = entry.apiKey.trim();
    final overrideKey = _storedOpenAiApiKey?.trim() ?? '';
    final apiKey = entryKey.isNotEmpty ? entryKey : overrideKey;
    if (apiKey.isEmpty) {
      throw StateError('API key is not set. Click "Key not set" to store one.');
    }

    final uri = Uri.parse('${entry.baseUrl}/chat/completions');
    final requestBody = <String, Object?>{
      'model': entry.model,
      'messages': messages,
      'temperature': 0.7,
      'stream': true,
    };

    developer.log(
      'LLM request -> base=${entry.baseUrl}, model=${entry.model}, messageCount=${messages.length}',
      name: 'AppAiPluginExample',
    );
    _pushRuntimeLog(
      'llm.request',
      'model=${entry.model}, messageCount=${messages.length}',
    );

    final request = http.Request('POST', uri)
      ..headers.addAll(<String, String>{
        'Authorization': 'Bearer $apiKey',
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      })
      ..body = jsonEncode(requestBody);

    final response = await request.send().timeout(const Duration(seconds: 90));

    if (response.statusCode < 200 || response.statusCode >= 300) {
      final body = await response.stream.bytesToString();
      _pushRuntimeLog(
        'llm.response.error',
        'status=${response.statusCode}, body=$body',
      );
      throw StateError('LLM HTTP ${response.statusCode}: $body');
    }

    final eventDataLines = <String>[];
    var sawAnyText = false;
    var assembledText = '';
    await for (final rawLine
        in response.stream
            .transform(utf8.decoder)
            .transform(const LineSplitter())) {
      final line = rawLine.trimRight();
      if (line.isEmpty) {
        final textChunk = _parseOpenAiStreamEvent(eventDataLines);
        if (textChunk == null) {
          continue;
        }
        _pushRuntimeLog(
          'llm.stream.chunk.parsed',
          _previewLogText(
            'model=${entry.model}, parsed="${_singleLinePreview(textChunk)}"',
          ),
        );
        final normalizedChunk = _coerceToIncrementalChunk(
          incomingText: textChunk,
          existingText: assembledText,
        );
        _pushRuntimeLog(
          'llm.stream.chunk.normalized',
          _previewLogText(
            'model=${entry.model}, normalized="${_singleLinePreview(normalizedChunk)}", assembledBefore=${assembledText.length}',
          ),
        );
        if (normalizedChunk.isEmpty) {
          _pushRuntimeLog(
            'llm.stream.chunk.skipped',
            _previewLogText(
              'model=${entry.model}, reason=emptyAfterNormalization, parsed="${_singleLinePreview(textChunk)}"',
            ),
          );
          continue;
        }
        sawAnyText = true;
        assembledText += normalizedChunk;
        _pushRuntimeLog(
          'llm.stream.chunk.yield',
          _previewLogText(
            'model=${entry.model}, yielded="${_singleLinePreview(normalizedChunk)}", assembledAfter=${assembledText.length}',
          ),
        );
        yield normalizedChunk;
        continue;
      }
      if (line.startsWith(':')) {
        continue;
      }
      if (line.startsWith('data:')) {
        eventDataLines.add(line.substring(5).trimLeft());
      }
    }

    final tailChunk = _parseOpenAiStreamEvent(eventDataLines);
    if (tailChunk != null) {
      _pushRuntimeLog(
        'llm.stream.tail.parsed',
        _previewLogText(
          'model=${entry.model}, parsed="${_singleLinePreview(tailChunk)}"',
        ),
      );
      final normalizedChunk = _coerceToIncrementalChunk(
        incomingText: tailChunk,
        existingText: assembledText,
      );
      _pushRuntimeLog(
        'llm.stream.tail.normalized',
        _previewLogText(
          'model=${entry.model}, normalized="${_singleLinePreview(normalizedChunk)}", assembledBefore=${assembledText.length}',
        ),
      );
      if (normalizedChunk.isNotEmpty) {
        sawAnyText = true;
        assembledText += normalizedChunk;
        _pushRuntimeLog(
          'llm.stream.tail.yield',
          _previewLogText(
            'model=${entry.model}, yielded="${_singleLinePreview(normalizedChunk)}", assembledAfter=${assembledText.length}',
          ),
        );
        yield normalizedChunk;
      }
    }

    if (!sawAnyText) {
      _pushRuntimeLog('openai.response.empty', 'No streamed text content');
      throw StateError('OpenAI returned empty streamed content.');
    }
    _pushRuntimeLog(
      'openai.response.ok',
      'status=${response.statusCode}, streamed=true',
    );
  }

  String? _parseOpenAiStreamEvent(List<String> eventDataLines) {
    if (eventDataLines.isEmpty) {
      return null;
    }
    final payload = eventDataLines.join('\n').trim();
    eventDataLines.clear();
    if (payload.isEmpty || payload == '[DONE]') {
      _pushRuntimeLog('llm.stream.event.skip', 'payload=$payload');
      return null;
    }
    _pushRuntimeLog(
      'llm.stream.event.raw',
      _previewLogText(_singleLinePreview(payload, maxLength: 240)),
    );

    final decoded = jsonDecode(payload);
    if (decoded is! Map<String, dynamic>) {
      throw StateError('Invalid streamed OpenAI response shape.');
    }
    if (decoded['error'] != null) {
      throw StateError('OpenAI stream error: ${decoded['error']}');
    }

    final choices = decoded['choices'];
    if (choices is! List || choices.isEmpty) {
      return null;
    }

    final first = choices.first;
    if (first is! Map<String, dynamic>) {
      return null;
    }

    final delta = first['delta'];
    if (delta is Map<String, dynamic>) {
      final text = _extractTextContent(delta['content']);
      if (text != null && text.isNotEmpty) {
        final collapsed = _collapseImmediateDuplicatePhrases(text);
        _logDuplicateCollapse(
          source: 'delta',
          original: text,
          collapsed: collapsed,
        );
        return collapsed;
      }
    }

    final message = first['message'];
    if (message is Map<String, dynamic>) {
      final text = _extractTextContent(message['content']);
      if (text != null && text.isNotEmpty) {
        final collapsed = _collapseImmediateDuplicatePhrases(text);
        _logDuplicateCollapse(
          source: 'message',
          original: text,
          collapsed: collapsed,
        );
        return collapsed;
      }
    }

    _pushRuntimeLog(
      'llm.stream.event.noText',
      _previewLogText(_singleLinePreview(payload, maxLength: 160)),
    );
    return null;
  }

  String _coerceToIncrementalChunk({
    required String incomingText,
    required String existingText,
  }) {
    if (incomingText.isEmpty) {
      return '';
    }
    if (existingText.isEmpty) {
      return incomingText;
    }

    if (incomingText.startsWith(existingText)) {
      return incomingText.substring(existingText.length);
    }

    if (existingText.endsWith(incomingText)) {
      return '';
    }

    final maxOverlap = existingText.length < incomingText.length
        ? existingText.length
        : incomingText.length;
    for (var overlap = maxOverlap; overlap > 0; overlap--) {
      if (existingText.endsWith(incomingText.substring(0, overlap))) {
        return incomingText.substring(overlap);
      }
    }

    return incomingText;
  }

  void _logDuplicateCollapse({
    required String source,
    required String original,
    required String collapsed,
  }) {
    if (original == collapsed) {
      _pushRuntimeLog(
        'llm.stream.text.clean',
        _previewLogText(
          'source=$source, unchanged="${_singleLinePreview(original)}"',
        ),
      );
      return;
    }
    _pushRuntimeLog(
      'llm.stream.text.dedup',
      _previewLogText(
        'source=$source, before="${_singleLinePreview(original)}", after="${_singleLinePreview(collapsed)}"',
      ),
    );
  }

  String _collapseImmediateDuplicatePhrases(String text) {
    if (text.length < 4) {
      return text;
    }

    var result = text;
    var changed = true;
    while (changed) {
      changed = false;
      final maxUnitLength = result.length ~/ 2;
      final boundedMax = maxUnitLength > 24 ? 24 : maxUnitLength;
      for (var unitLength = boundedMax; unitLength >= 2; unitLength--) {
        final buffer = StringBuffer();
        var cursor = 0;
        var localChanged = false;

        while (cursor < result.length) {
          if (cursor + unitLength * 2 <= result.length) {
            final unit = result.substring(cursor, cursor + unitLength);
            var repeatCount = 1;
            while (cursor + unitLength * (repeatCount + 1) <= result.length &&
                result.substring(
                      cursor + unitLength * repeatCount,
                      cursor + unitLength * (repeatCount + 1),
                    ) ==
                    unit) {
              repeatCount++;
            }

            if (repeatCount > 1) {
              buffer.write(unit);
              cursor += unitLength * repeatCount;
              localChanged = true;
              continue;
            }
          }

          buffer.write(result[cursor]);
          cursor++;
        }

        if (localChanged) {
          result = buffer.toString();
          changed = true;
          break;
        }
      }
    }

    return result;
  }

  String _previewLogText(String text, {int maxLength = 280}) {
    if (text.length <= maxLength) {
      return text;
    }
    return '${text.substring(0, maxLength)}...';
  }

  String _singleLinePreview(String text, {int maxLength = 120}) {
    final normalized = text
        .replaceAll('\n', r'\n')
        .replaceAll('\r', r'\r')
        .trim();
    if (normalized.length <= maxLength) {
      return normalized;
    }
    return '${normalized.substring(0, maxLength)}...';
  }

  // 页面白底调试日志：记录 bridge 与 LLM 关键环节，便于可视化排查。
  void _pushRuntimeLog(String stage, [String? detail]) {
    final timestamp = DateTime.now().toIso8601String().substring(11, 19);
    final line = detail == null || detail.isEmpty
        ? '[$timestamp] $stage'
        : '[$timestamp] $stage | $detail';
    developer.log(line, name: 'AppAiPluginExample.Debug');

    if (!mounted) {
      return;
    }
    setState(() {
      _runtimeDebugLines.add(line);
      if (_runtimeDebugLines.length > 300) {
        _runtimeDebugLines.removeRange(0, _runtimeDebugLines.length - 300);
      }
    });
  }

  List<Map<String, String>> _extractOpenAiMessages(Object? rawData) {
    if (rawData is! Map) {
      return const <Map<String, String>>[];
    }
    final rawMessages = rawData['messages'];
    if (rawMessages is! List) {
      return const <Map<String, String>>[];
    }

    final messages = <Map<String, String>>[];
    for (final item in rawMessages) {
      if (item is! Map) {
        continue;
      }
      final role = (item['role'] ?? '').toString().trim();
      if (role.isEmpty) {
        continue;
      }
      final text = _extractTextContent(item['content']);
      if (text == null || text.trim().isEmpty) {
        continue;
      }
      messages.add(<String, String>{'role': role, 'content': text.trim()});
    }
    return messages;
  }

  String? _extractTextContent(Object? rawContent) {
    if (rawContent is String) {
      return rawContent;
    }
    if (rawContent is Map && rawContent['text'] is String) {
      return rawContent['text'] as String;
    }
    if (rawContent is List) {
      final buffer = StringBuffer();
      for (final segment in rawContent) {
        if (segment is String) {
          if (buffer.isNotEmpty) {
            buffer.writeln();
          }
          buffer.write(segment);
          continue;
        }
        if (segment is Map) {
          final text = segment['text'];
          if (text is String && text.trim().isNotEmpty) {
            if (buffer.isNotEmpty) {
              buffer.writeln();
            }
            buffer.write(text.trim());
          }
        }
      }
      return buffer.isEmpty ? null : buffer.toString();
    }
    return null;
  }

  // 统一展示提示信息。
  void _showMessage(String message) {
    final messenger = ScaffoldMessenger.maybeOf(context);
    messenger?.showSnackBar(SnackBar(content: Text(message)));
  }

  // 头部按钮区域。
  List<Widget> _buildHeaderActions() {
    final button = OutlinedButton.icon(
      onPressed: _openApiKeyDialog,
      icon: const Icon(Icons.key_outlined),
      label: Text(_openAiKeyStatusLabel),
    );

    if (_secretStorageError == null || _secretStorageError!.isEmpty) {
      return <Widget>[button];
    }

    return <Widget>[Tooltip(message: _secretStorageError!, child: button)];
  }

  @override
  Widget build(BuildContext context) {
    final theme = ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF157E69)),
      useMaterial3: true,
    );

    // Params.isDebug 为 false 时（默认）只渲染 Continue GUI 本体，
    // 隐藏左侧 Sessions、中间 Flutter chat 时间线、底部输入框等示例外壳。
    // 联调时 --dart-define=APP_AI_DEBUG=true 才显示完整 AppAiShell。
    if (!Params.isDebug) {
      return MaterialApp(
        theme: theme,
        home: Scaffold(
          backgroundColor: Colors.black,
          body: SafeArea(child: _buildReusePane()),
        ),
      );
    }

    return MaterialApp(
      theme: theme,
      home: AppAiShell(
        sessions: _sessions,
        messages: _messages,
        selectedSessionId: _selectedSessionId,
        onSessionSelected: (sessionId) {
          setState(() {
            _selectedSessionId = sessionId;
          });
        },
        onNewSession: () {
          setState(() {
            _selectedSessionId = 'session-${_sessions.length + 1}';
          });
        },
        onSubmitPrompt: (prompt) {
          unawaited(_handleSubmit(prompt));
        },
        title: 'App AI Plugin Example',
        subtitle: _subtitle,
        statusLabel: _hasBinaryBridge
            ? 'GUI + Binary'
            : _continueGuiSource == null
            ? 'Flutter UI'
            : 'GUI Reuse',
        headerActions: _buildHeaderActions(),
        reuseGuiChild: _buildReusePane(),
      ),
    );
  }
}

List<String> _parseBinaryArguments(String rawArguments) {
  final trimmed = rawArguments.trim();
  if (trimmed.isEmpty) {
    return const <String>[];
  }

  try {
    final decoded = jsonDecode(trimmed);
    if (decoded is List) {
      return decoded.map((item) => item.toString()).toList(growable: false);
    }
  } catch (_) {
    // Fallback to whitespace splitting for convenience.
  }

  return trimmed
      .split(RegExp(r'\s+'))
      .where((part) => part.isNotEmpty)
      .toList(growable: false);
}

class _ContinueGuiDebugPanel extends StatelessWidget {
  const _ContinueGuiDebugPanel({
    required this.shellDiagnostics,
    required this.shellEvents,
    required this.controllerStatus,
    required this.controllerEvents,
    required this.runtimeLines,
  });

  final String shellDiagnostics;
  final List<String> shellEvents;
  final String controllerStatus;
  final List<String> controllerEvents;
  final List<String> runtimeLines;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final visibleShellEvents = shellEvents.reversed
        .take(12)
        .toList(growable: false);
    final visibleControllerEvents = controllerEvents.reversed
        .take(18)
        .toList(growable: false);

    return DecoratedBox(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFD0DADC)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Continue Runtime Log (Temporary)',
              style: theme.textTheme.titleMedium?.copyWith(
                color: const Color(0xFF1D2627),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 8),
            SelectableText(
              'Shell: $shellDiagnostics\nController: $controllerStatus',
              style: const TextStyle(
                color: Color(0xFF3D4D4E),
                fontFamily: 'Menlo',
                fontSize: 12,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'App Runtime Events',
              style: theme.textTheme.labelLarge?.copyWith(
                color: const Color(0xFF2C3B3D),
              ),
            ),
            const SizedBox(height: 6),
            Container(
              height: 160,
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFFF7FAFA),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFDCE7E8)),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(10),
                child: SelectableText(
                  runtimeLines.isEmpty
                      ? '(no runtime events yet)'
                      : runtimeLines.reversed.join('\n'),
                  style: const TextStyle(
                    color: Color(0xFF243235),
                    fontFamily: 'Menlo',
                    fontSize: 11,
                    height: 1.4,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Shell Events',
              style: theme.textTheme.labelLarge?.copyWith(
                color: const Color(0xFF2C3B3D),
              ),
            ),
            const SizedBox(height: 6),
            Container(
              height: 120,
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFFF7FAFA),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFDCE7E8)),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(10),
                child: SelectableText(
                  visibleShellEvents.isEmpty
                      ? '(no shell events yet)'
                      : visibleShellEvents.join('\n'),
                  style: const TextStyle(
                    color: Color(0xFF243235),
                    fontFamily: 'Menlo',
                    fontSize: 11,
                    height: 1.45,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Controller Events',
              style: theme.textTheme.labelLarge?.copyWith(
                color: const Color(0xFF2C3B3D),
              ),
            ),
            const SizedBox(height: 6),
            Container(
              height: 140,
              width: double.infinity,
              decoration: BoxDecoration(
                color: const Color(0xFFF7FAFA),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFDCE7E8)),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(10),
                child: SelectableText(
                  visibleControllerEvents.isEmpty
                      ? '(no controller events yet)'
                      : visibleControllerEvents.join('\n'),
                  style: const TextStyle(
                    color: Color(0xFF243235),
                    fontFamily: 'Menlo',
                    fontSize: 11,
                    height: 1.45,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ContinueGuiSetupGuide extends StatelessWidget {
  const _ContinueGuiSetupGuide({required this.hasBinaryBridge});

  final bool hasBinaryBridge;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Continue GUI is ready to be mounted here.',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 10),
          const Text('Development mode:'),
          const SizedBox(height: 6),
          const SelectableText(
            'flutter run --dart-define=CONTINUE_GUI_URL=http://127.0.0.1:5173',
          ),
          const SizedBox(height: 14),
          const Text('Built bundle mode:'),
          const SizedBox(height: 6),
          const SelectableText(
            'flutter run --dart-define=CONTINUE_GUI_DIST=/absolute/path/to/AppAIPlugin/libs/gui/dist',
          ),
          const SizedBox(height: 14),
          const Text('Real Continue binary mode:'),
          const SizedBox(height: 6),
          const SelectableText(
            'flutter run --dart-define=CONTINUE_GUI_DIST=/absolute/path/to/AppAIPlugin/libs/gui/dist --dart-define=CONTINUE_BINARY_EXECUTABLE=/absolute/path/to/continue-main/binary/bin/darwin-arm64/continue-binary --dart-define=CONTINUE_WORKSPACE_DIR=/absolute/path/to/AppAIPlugin/libs/core',
          ),
          const SizedBox(height: 14),
          const Text('Secure OpenAI key storage:'),
          const SizedBox(height: 6),
          const Text(
            'Use the key button in the header to save OPENAI_API_KEY into native secure storage. Do not hardcode it in dart-define, source files, or logs.',
          ),
          if (!hasBinaryBridge) ...const [
            SizedBox(height: 14),
            Text(
              'If CONTINUE_BINARY_EXECUTABLE is not provided, the example falls back to the built-in demo transport.',
            ),
          ],
        ],
      ),
    );
  }
}

class _ApiKeyDialogResult {
  const _ApiKeyDialogResult({required this.value, this.clearKey = false});

  final String value;
  final bool clearKey;
}

class _ApiKeyDialog extends StatefulWidget {
  const _ApiKeyDialog({required this.initialValue, required this.errorMessage});

  final String? initialValue;
  final String? errorMessage;

  @override
  State<_ApiKeyDialog> createState() => _ApiKeyDialogState();
}

class _ApiKeyDialogState extends State<_ApiKeyDialog> {
  late final TextEditingController _controller;
  bool _obscureText = true;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue ?? '');
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Secure OpenAI API Key'),
      content: SizedBox(
        width: 480,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'This key is stored through the plugin\'s native secure storage bridge instead of source code or dart-define values.',
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _controller,
              autofocus: true,
              obscureText: _obscureText,
              decoration: InputDecoration(
                labelText: 'OPENAI_API_KEY',
                border: const OutlineInputBorder(),
                suffixIcon: IconButton(
                  onPressed: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                  icon: Icon(
                    _obscureText ? Icons.visibility_off : Icons.visibility,
                  ),
                ),
              ),
            ),
            if (widget.errorMessage case final error?) ...[
              const SizedBox(height: 12),
              Text(
                error,
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: Colors.red.shade700),
              ),
            ],
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop(const _ApiKeyDialogResult(value: ''));
          },
          child: const Text('Cancel'),
        ),
        if ((widget.initialValue ?? '').isNotEmpty)
          TextButton(
            onPressed: () {
              Navigator.of(
                context,
              ).pop(const _ApiKeyDialogResult(value: '', clearKey: true));
            },
            child: const Text('Remove'),
          ),
        FilledButton(
          onPressed: () {
            Navigator.of(
              context,
            ).pop(_ApiKeyDialogResult(value: _controller.text));
          },
          child: const Text('Save'),
        ),
      ],
    );
  }
}
