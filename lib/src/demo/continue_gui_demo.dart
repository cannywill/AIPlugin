import '../host/host_adapter.dart';
import '../host/static_host_adapter.dart';
import '../transport/core_transport.dart';
import '../transport/mock_continue_core_transport.dart';

// Demo placeholders. Real apps wire workspace + current-file resolution to a
// HostAdapter (see ChannelBackedHostAdapter / LocalWorkspaceHostAdapter).
const String _workspaceDirectory = 'file:///workspace';
const String _currentFilePath = 'file:///workspace/example.ts';
const Map<String, Object?> _demoChatModel = {
  'title': 'GPT-4.1 Demo',
  'model': 'gpt-4.1',
  'provider': 'openai',
  'underlyingProviderName': 'openai',
  'completionOptions': <String, Object?>{},
};

HostAdapter createContinueGuiDemoHostAdapter() {
  return CompositeHostAdapter(
    delegates: [
      StaticHostAdapter(
        responses: {
          'getIdeInfo': {
            'ideType': 'flutter-desktop',
            'name': 'App AI Plugin',
            'version': '0.0.1',
            'remoteName': 'local',
            'extensionVersion': '0.0.1',
            'isPrerelease': true,
          },
          'getIdeSettings': {
            'remoteConfigServerUrl': null,
            'remoteConfigSyncPeriod': 60,
            'userToken': '',
            'continueTestEnvironment': 'staging',
            'pauseCodebaseIndexOnStart': false,
          },
          'getWorkspaceDirs': [_workspaceDirectory],
          'getCurrentFile': {
            'isUntitled': false,
            'contents': 'Mock current file contents from AppAIPlugin.',
            'path': _currentFilePath,
          },
          'getOpenFiles': [_currentFilePath],
          'getPinnedFiles': <String>[],
          'getProblems': const <Object?>[],
          'getDiff': const <Object?>[],
          'getTerminalContents': '',
          'getSearchResults': '',
          'getFileResults': const <String>[],
          'subprocess': const <String>['', ''],
          'fileExists': true,
          'readFile': 'Mock README contents from the Flutter plugin shell.',
          'readRangeInFile': 'Mock line range from the current file.',
          'isTelemetryEnabled': false,
          'isWorkspaceRemote': false,
          'getUniqueId': 'app-ai-plugin-demo-machine',
          'getBranch': 'main',
          'getRepoName': 'app-ai-plugin',
          'getGitRootPath': _workspaceDirectory,
          'listDir': const <Object?>[],
          'getFileStats': const <String, Object?>{},
          'gotoDefinition': const <Object?>[],
          'gotoTypeDefinition': const <Object?>[],
          'getSignatureHelp': null,
          'getReferences': const <Object?>[],
          'getDocumentSymbols': const <Object?>[],
          'getControlPlaneSessionInfo': {
            'AUTH_TYPE': 'continue-staging',
            'accessToken': '',
            'account': {'label': 'Flutter Demo', 'id': 'flutter-demo'},
          },
          'listBackgroundAgents': {
            'agents': const <Object?>[],
            'totalCount': 0,
          },
          'readSecrets': const <String, String>{},
          'closeSidebar': null,
          'toggleDevTools': null,
          'showTutorial': null,
          'logoutOfControlPlane': null,
          'showToast': null,
          'openUrl': null,
          'writeFile': null,
          'removeFile': null,
          'showVirtualFile': null,
          'openFile': null,
          'runCommand': null,
          'saveFile': null,
          'showLines': null,
          'writeSecrets': null,
          'reportError': null,
        },
      ),
    ],
  );
}

CoreTransport createContinueGuiDemoCoreTransport({
  MockStreamChatHandler? streamChatHandler,
  MockCoreResponseHandler? llmCompleteHandler,
  // 外部可注入完整的 config/getSerializedProfileInfo 响应（与 configUpdate 同形状），
  // 用来在 GUI 首次加载时就把真实模型列表喂进去，避免被默认 demo 模型覆盖。
  Map<String, Object?>? serializedProfileInfoOverride,
  // 外部可注入 llm/listModels 的字符串数组。
  List<String>? listModelsOverride,
}) {
  return MockContinueCoreTransport(
    responses: {
      'history/list': [
        {
          'sessionId': 'demo-session',
          'title': 'Flutter Continue Demo',
          'dateCreated': DateTime.utc(2026, 4, 11).toIso8601String(),
          'workspaceDirectory': _workspaceDirectory,
          'messageCount': 2,
        },
      ],
      'history/load': {
        'sessionId': 'demo-session',
        'title': 'Flutter Continue Demo',
        'workspaceDirectory': _workspaceDirectory,
        'history': [
          {
            'message': {
              'role': 'user',
              'content': 'Can you help me build a Flutter version of Continue?',
            },
          },
          {
            'message': {
              'role': 'assistant',
              'content':
                  'Yes. This demo is running the Continue GUI inside a Flutter WebView shell.',
            },
          },
        ],
      },
      'history/loadRemote': {
        'sessionId': 'remote-demo-session',
        'title': 'Remote Flutter Continue Demo',
        'workspaceDirectory': _workspaceDirectory,
        'history': const <Object?>[],
      },
      'history/save': null,
      'history/share': {'url': 'https://continue.dev'},
      'history/delete': null,
      'history/clear': null,
      'config/getSerializedProfileInfo':
          serializedProfileInfoOverride ??
          {
            'organizations': [
              {
                'id': 'personal',
                'profiles': [
                  {
                    'title': 'Local Agent',
                    'id': 'local',
                    'errors': const <Object?>[],
                    'profileType': 'local',
                    'uri': '',
                    'iconUrl': '',
                    'fullSlug': {
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
            'result': {
              'config': {
                'tools': const <Object?>[],
                'slashCommands': const <Object?>[],
                'contextProviders': const <Object?>[],
                'mcpServerStatuses': const <Object?>[],
                'usePlatform': true,
                'modelsByRole': {
                  'chat': const <Object?>[_demoChatModel],
                  'apply': const <Object?>[],
                  'edit': const <Object?>[],
                  'summarize': const <Object?>[],
                  'autocomplete': const <Object?>[],
                  'rerank': const <Object?>[],
                  'embed': const <Object?>[],
                  'subagent': const <Object?>[],
                },
                'selectedModelByRole': {
                  'chat': _demoChatModel,
                  'apply': null,
                  'edit': null,
                  'summarize': null,
                  'autocomplete': null,
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
          },
      'config/refreshProfiles': null,
      'config/updateSelectedModel': null,
      'config/addOpenAiKey': null,
      'config/addModel': null,
      'config/addLocalWorkspaceBlock': null,
      'config/addGlobalRule': null,
      'config/deleteRule': null,
      'config/newPromptFile': null,
      'config/newAssistantFile': null,
      'config/ideSettingsUpdate': null,
      'config/deleteModel': null,
      'config/openProfile': null,
      'config/updateSharedConfig': null,
      'llm/listModels':
          listModelsOverride ??
          const <String>['gpt-4.1', 'claude-3.7-sonnet', 'gemini-2.5-pro'],
      'chatDescriber/describe': 'Flutter Continue session',
      'conversation/compact': 'Compacted conversation summary',
      'context/getContextItems': [
        {
          'id': {'providerTitle': 'mock', 'itemId': 'mock-file'},
          'content': 'Mock current file content from the Flutter plugin shell.',
          'name': 'Mock File',
          'description': 'Injected by AppAIPlugin demo transport',
          'uri': {'type': 'file', 'value': _currentFilePath},
        },
      ],
      'context/getSymbolsForFiles': const <String, Object?>{},
      'context/loadSubmenuItems': const <Object?>[],
      'context/addDocs': null,
      'context/removeDocs': null,
      'context/indexDocs': null,
      'tools/call': {
        'contextItems': [
          {
            'content': 'Tool call executed successfully in Flutter demo mode.',
            'name': 'Tool Result',
            'description': 'Mock tool result',
          },
        ],
      },
      'tools/preprocessArgs': {'preprocessedArgs': null},
      'controlPlane/getEnvironment': {
        'DEFAULT_CONTROL_PLANE_PROXY_URL': 'https://api.continue-stage.tools/',
        'CONTROL_PLANE_URL': 'https://api.continue-stage.tools/',
        'AUTH_TYPE': 'continue-staging',
        'WORKOS_CLIENT_ID': 'client_01J0FW6XCPMJMQ3CG51RB4HBZQ',
        'APP_URL': 'https://hub.continue-stage.tools/',
      },
      'controlPlane/getCreditStatus': {
        'optedInToFreeTrial': true,
        'creditBalance': 999,
        'hasCredits': true,
        'hasPurchasedCredits': true,
      },
      'stats/getTokensPerDay': const <Object?>[],
      'stats/getTokensPerModel': const <Object?>[],
      'docs/getSuggestedDocs': null,
      'docs/initStatuses': null,
      'docs/getIndexedPages': const <String>[],
      'process/markAsBackgrounded': null,
      'process/isBackgrounded': false,
      'process/killTerminalProcess': null,
      'auth/getAuthUrl': {'url': 'https://continue.dev'},
      'mcp/reloadServer': null,
      'mcp/setServerEnabled': null,
      'mcp/getPrompt': null,
      'mcp/startAuthentication': null,
      'mcp/removeAuthentication': null,
      'autocomplete/complete': '',
      'autocomplete/cancel': null,
      'autocomplete/accept': null,
      'nextEdit/predict': null,
      'nextEdit/reject': null,
      'nextEdit/accept': null,
      'nextEdit/startChain': null,
      'nextEdit/deleteChain': null,
      'nextEdit/isChainAlive': false,
      'nextEdit/queue/getProcessedCount': 0,
      'nextEdit/queue/dequeueProcessed': const <Object?>[],
      'nextEdit/queue/processOne': null,
      'nextEdit/queue/clear': null,
      'nextEdit/queue/abort': null,
      'llm/complete': '',
      'streamDiffLines': null,
      'getDiffLines': const <Object?>[],
      'tts/kill': null,
      'index/setPaused': null,
      'index/forceReIndex': null,
      'index/indexingProgressBarInitialized': null,
      'indexing/reindex': null,
      'indexing/abort': null,
      'indexing/setPaused': null,
      'addAutocompleteModel': null,
      'onboarding/complete': null,
      'didChangeSelectedProfile': null,
      'didChangeSelectedOrg': null,
      'isItemTooBig': false,
      'devdata/log': null,
      'cancelApply': null,
    },
    handlers: {
      'llm/compileChat': (message) {
        final rawData = message.data;
        final messages = rawData is Map && rawData['messages'] is List
            ? rawData['messages'] as List
            : const <Object?>[];
        return {
          'compiledChatMessages': messages,
          'didPrune': false,
          'contextPercentage': 0.42,
        };
      },
      'tools/evaluatePolicy': (message) {
        final rawData = message.data;
        final basePolicy = rawData is Map<String, Object?>
            ? rawData['basePolicy']
            : null;
        return {'policy': basePolicy, 'displayValue': null};
      },
      'docs/getDetails': (message) {
        final rawData = message.data;
        final startUrl = rawData is Map<String, Object?>
            ? rawData['startUrl'] as String? ?? 'https://continue.dev'
            : 'https://continue.dev';
        return {
          'startUrl': startUrl,
          'config': {
            'title': 'Continue Docs',
            'startUrl': startUrl,
            'rootUrl': startUrl,
          },
          'indexingStatus': 'complete',
          'chunks': const <Object?>[],
        };
      },
      if (llmCompleteHandler != null) 'llm/complete': llmCompleteHandler,
    },
    streamChatHandler: streamChatHandler,
  );
}
