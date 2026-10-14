import 'dart:async';

import 'package:app_ai_plugin/src/app/continue_shell_controller.dart';
import 'package:app_ai_plugin/src/history/continue_history_store.dart';
import 'package:app_ai_plugin/src/host/host_adapter.dart';
import 'package:app_ai_plugin/src/protocol/continue_message.dart';
import 'package:app_ai_plugin/src/transport/core_transport.dart';
import 'package:flutter_test/flutter_test.dart';

/// 文件类型：测试
/// 文件作用：覆盖 ContinueShellController 在 Flutter 壳层里兜底的 apply/diff、edit 与 background agent 生命周期。
/// 主要职责：验证 GUI 关键按钮对应的宿主兼容逻辑会正确改文件、回推事件，并维护本地 background agent 状态。
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  test(
    'applyToFile on existing file emits streaming and done states',
    () async {
      final shellPort = _FakeShellPort();
      final hostAdapter = _FakeHostAdapter(
        files: {'/tmp/demo.dart': 'old content'},
        currentFilePath: '/tmp/demo.dart',
      );
      final controller = _createController(
        coreTransport: _FakeCoreTransport(),
        hostAdapter: hostAdapter,
        shellPort: shellPort,
      );

      await controller.start();
      await shellPort.emit(
        ContinueMessage(
          messageType: 'applyToFile',
          messageId: 'apply-1',
          data: {
            'streamId': 'stream-1',
            'filepath': '/tmp/demo.dart',
            'text': 'new content',
            'toolCallId': 'tool-1',
          },
        ),
      );

      expect(hostAdapter.files['/tmp/demo.dart'], 'new content');

      final applyUpdates = shellPort.outgoing
          .where((message) => message.messageType == 'updateApplyState')
          .toList(growable: false);
      expect(applyUpdates, hasLength(2));
      expect(
        (applyUpdates.first.data as Map<String, Object?>)['status'],
        'streaming',
      );
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['status'],
        'done',
      );

      final response = shellPort.outgoing.last;
      expect(response.messageType, 'applyToFile');
      expect((response.data as Map<String, Object?>)['status'], 'success');

      await controller.shutdown();
    },
  );

  test(
    'rejectDiff restores the original content and closes the apply state',
    () async {
      final shellPort = _FakeShellPort();
      final hostAdapter = _FakeHostAdapter(
        files: {'/tmp/demo.dart': 'before edit'},
        currentFilePath: '/tmp/demo.dart',
      );
      final controller = _createController(
        coreTransport: _FakeCoreTransport(),
        hostAdapter: hostAdapter,
        shellPort: shellPort,
      );

      await controller.start();
      await shellPort.emit(
        ContinueMessage(
          messageType: 'applyToFile',
          messageId: 'apply-2',
          data: {
            'streamId': 'stream-2',
            'filepath': '/tmp/demo.dart',
            'text': 'after edit',
            'toolCallId': 'tool-2',
          },
        ),
      );
      await shellPort.emit(
        ContinueMessage(
          messageType: 'rejectDiff',
          messageId: 'reject-1',
          data: {'streamId': 'stream-2'},
        ),
      );

      expect(hostAdapter.files['/tmp/demo.dart'], 'before edit');

      final applyUpdates = shellPort.outgoing
          .where((message) => message.messageType == 'updateApplyState')
          .toList(growable: false);
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['status'],
        'closed',
      );
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['fileContent'],
        'before edit',
      );

      await controller.shutdown();
    },
  );

  test(
    'acceptDiff keeps the applied content and closes the apply state',
    () async {
      final shellPort = _FakeShellPort();
      final hostAdapter = _FakeHostAdapter(
        files: {'/tmp/demo.dart': 'old value'},
        currentFilePath: '/tmp/demo.dart',
      );
      final controller = _createController(
        coreTransport: _FakeCoreTransport(),
        hostAdapter: hostAdapter,
        shellPort: shellPort,
      );

      await controller.start();
      await shellPort.emit(
        ContinueMessage(
          messageType: 'applyToFile',
          messageId: 'apply-3',
          data: {
            'streamId': 'stream-3',
            'filepath': '/tmp/demo.dart',
            'text': 'accepted value',
          },
        ),
      );
      await shellPort.emit(
        ContinueMessage(
          messageType: 'acceptDiff',
          messageId: 'accept-1',
          data: {'streamId': 'stream-3'},
        ),
      );

      expect(hostAdapter.files['/tmp/demo.dart'], 'accepted value');
      expect(hostAdapter.savedFiles, contains('/tmp/demo.dart'));

      final applyUpdates = shellPort.outgoing
          .where((message) => message.messageType == 'updateApplyState')
          .toList(growable: false);
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['status'],
        'closed',
      );
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['fileContent'],
        'accepted value',
      );

      await controller.shutdown();
    },
  );

  test('insertAtCursor appends code to the current file', () async {
    final shellPort = _FakeShellPort();
    final hostAdapter = _FakeHostAdapter(
      files: {'/tmp/insert.dart': 'hello'},
      currentFilePath: '/tmp/insert.dart',
    );
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: hostAdapter,
      shellPort: shellPort,
    );

    await controller.start();
    await shellPort.emit(
      ContinueMessage(
        messageType: 'insertAtCursor',
        messageId: 'insert-1',
        data: {'text': 'world'},
      ),
    );

    expect(hostAdapter.files['/tmp/insert.dart'], 'hello\nworld');
    expect(shellPort.outgoing.last.messageType, 'insertAtCursor');
    expect(
      (shellPort.outgoing.last.data as Map<String, Object?>)['status'],
      'success',
    );

    await controller.shutdown();
  });

  test(
    'edit/addCurrentSelection emits setCodeToEdit with the full file range',
    () async {
      final shellPort = _FakeShellPort();
      final hostAdapter = _FakeHostAdapter(
        files: {'/tmp/edit.dart': 'line 1\nline 2'},
        currentFilePath: '/tmp/edit.dart',
      );
      final controller = _createController(
        coreTransport: _FakeCoreTransport(),
        hostAdapter: hostAdapter,
        shellPort: shellPort,
      );

      await controller.start();
      await shellPort.emit(
        ContinueMessage(
          messageType: 'edit/addCurrentSelection',
          messageId: 'selection-1',
          data: null,
        ),
      );

      final setCodeEvent = shellPort.outgoing.firstWhere(
        (message) => message.messageType == 'setCodeToEdit',
      );
      final payload = setCodeEvent.data as Map<String, Object?>;
      expect(payload['filepath'], '/tmp/edit.dart');
      expect(payload['contents'], 'line 1\nline 2');
      expect(payload['range'], {
        'start': {'line': 0, 'character': 0},
        'end': {'line': 1, 'character': 6},
      });

      await controller.shutdown();
    },
  );

  test(
    'edit/sendPrompt uses core completion and emits edit-mode apply states',
    () async {
      final shellPort = _FakeShellPort();
      final hostAdapter = _FakeHostAdapter(
        files: {'/tmp/edit.dart': 'prefix\nold value\nsuffix'},
        currentFilePath: '/tmp/edit.dart',
      );
      final controller = _createController(
        coreTransport: _FakeCoreTransport(
          handlers: {'llm/complete': (message) => 'new value'},
        ),
        hostAdapter: hostAdapter,
        shellPort: shellPort,
      );

      await controller.start();
      await shellPort.emit(
        ContinueMessage(
          messageType: 'edit/sendPrompt',
          messageId: 'edit-send-1',
          data: {
            'prompt': 'rename the selected value',
            'range': {
              'filepath': '/tmp/edit.dart',
              'contents': 'old value',
              'range': {
                'start': {'line': 1, 'character': 0},
                'end': {'line': 1, 'character': 9},
              },
            },
          },
        ),
      );

      expect(hostAdapter.files['/tmp/edit.dart'], 'prefix\nnew value\nsuffix');

      final applyUpdates = shellPort.outgoing
          .where((message) => message.messageType == 'updateApplyState')
          .toList(growable: false);
      expect(
        (applyUpdates.first.data as Map<String, Object?>)['streamId'],
        ContinueShellController.editModeStreamId,
      );
      expect(
        (applyUpdates.first.data as Map<String, Object?>)['status'],
        'streaming',
      );
      expect(
        (applyUpdates.last.data as Map<String, Object?>)['status'],
        'done',
      );

      final response = shellPort.outgoing.last;
      expect(response.messageType, 'edit/sendPrompt');
      expect((response.data as Map<String, Object?>)['status'], 'success');
      expect((response.data as Map<String, Object?>)['content'], 'new value');

      await controller.shutdown();
    },
  );

  test('utility host actions are routed through the host adapter', () async {
    final shellPort = _FakeShellPort();
    final hostAdapter = _FakeHostAdapter(
      files: {'/tmp/demo.dart': 'hello'},
      currentFilePath: '/tmp/demo.dart',
    );
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: hostAdapter,
      shellPort: shellPort,
    );

    await controller.start();
    await shellPort.emit(
      ContinueMessage(
        messageType: 'toggleDevTools',
        messageId: 'utility-1',
        data: null,
      ),
    );
    await shellPort.emit(
      ContinueMessage(
        messageType: 'showTutorial',
        messageId: 'utility-2',
        data: null,
      ),
    );
    await shellPort.emit(
      ContinueMessage(
        messageType: 'logoutOfControlPlane',
        messageId: 'utility-3',
        data: null,
      ),
    );

    expect(
      hostAdapter.invocations,
      containsAll(<String>[
        'toggleDevTools',
        'showTutorial',
        'logoutOfControlPlane',
      ]),
    );
    expect(
      shellPort.outgoing
          .where((message) => message.messageType == 'logoutOfControlPlane')
          .last
          .data,
      {'done': true, 'status': 'success', 'content': null},
    );

    await controller.shutdown();
  });

  test('controller reverse helpers emit GUI events', () async {
    final shellPort = _FakeShellPort();
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: _FakeHostAdapter(files: const {}),
      shellPort: shellPort,
    );

    await controller.start();
    await controller.addContextItem(
      historyIndex: 2,
      item: {'name': 'README.md', 'description': 'Current workspace context'},
    );
    await controller.updateIndexProgress({
      'status': 'loading',
      'progress': 0.5,
    });
    await controller.notifyFreeTrialExceeded();

    final addContextEvent = shellPort.outgoing.firstWhere(
      (message) => message.messageType == 'addContextItem',
    );
    expect(addContextEvent.data, {
      'historyIndex': 2,
      'item': {'name': 'README.md', 'description': 'Current workspace context'},
    });

    final indexProgressEvent = shellPort.outgoing.firstWhere(
      (message) => message.messageType == 'indexProgress',
    );
    expect(indexProgressEvent.data, {'status': 'loading', 'progress': 0.5});

    final freeTrialEvent = shellPort.outgoing.firstWhere(
      (message) => message.messageType == 'freeTrialExceeded',
    );
    expect(freeTrialEvent.data, null);

    await controller.shutdown();
  });

  test('history routes are handled by the Flutter history store', () async {
    final shellPort = _FakeShellPort();
    final historyStore = _FakeHistoryStore();
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: _FakeHostAdapter(files: const {}),
      shellPort: shellPort,
      historyStore: historyStore,
    );

    await controller.start();
    await shellPort.emit(
      ContinueMessage(
        messageType: 'history/save',
        messageId: 'history-save-1',
        data: {
          'sessionId': 'session-1',
          'title': 'Hello Session',
          'workspaceDirectory': '/tmp/workspace',
          'history': [
            {
              'message': {'role': 'user', 'content': 'hello'},
            },
            {
              'message': {'role': 'assistant', 'content': 'world'},
            },
          ],
        },
      ),
    );

    await shellPort.emit(
      ContinueMessage(
        messageType: 'history/list',
        messageId: 'history-list-1',
        data: {'limit': 10},
      ),
    );
    final listResponse = shellPort.outgoing.lastWhere(
      (message) => message.messageId == 'history-list-1',
    );
    expect((listResponse.data as Map<String, Object?>)['status'], 'success');
    expect(
      ((listResponse.data as Map<String, Object?>)['content'] as List<Object?>)
          .single,
      containsPair('sessionId', 'session-1'),
    );

    await shellPort.emit(
      ContinueMessage(
        messageType: 'history/load',
        messageId: 'history-load-1',
        data: {'id': 'session-1'},
      ),
    );
    final loadResponse = shellPort.outgoing.lastWhere(
      (message) => message.messageId == 'history-load-1',
    );
    final loadedSession =
        (loadResponse.data as Map<String, Object?>)['content']
            as Map<String, Object?>;
    expect(loadedSession['title'], 'Hello Session');
    expect(loadedSession['workspaceDirectory'], '/tmp/workspace');

    await shellPort.emit(
      ContinueMessage(
        messageType: 'history/delete',
        messageId: 'history-delete-1',
        data: {'id': 'session-1'},
      ),
    );
    expect(historyStore.sessions, isEmpty);

    await controller.shutdown();
  });

  test('history clear removes all saved sessions', () async {
    final shellPort = _FakeShellPort();
    final historyStore = _FakeHistoryStore()
      ..sessions['session-a'] = <String, Object?>{
        'sessionId': 'session-a',
        'title': 'A',
        'workspaceDirectory': '/tmp/workspace',
        'history': const <Object?>[],
      }
      ..sessions['session-b'] = <String, Object?>{
        'sessionId': 'session-b',
        'title': 'B',
        'workspaceDirectory': '/tmp/workspace',
        'history': const <Object?>[],
      };
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: _FakeHostAdapter(files: const {}),
      shellPort: shellPort,
      historyStore: historyStore,
    );

    await controller.start();
    await shellPort.emit(
      ContinueMessage(
        messageType: 'history/clear',
        messageId: 'history-clear-1',
        data: null,
      ),
    );

    expect(historyStore.sessions, isEmpty);
    final response = shellPort.outgoing.last;
    expect(response.messageType, 'history/clear');
    expect((response.data as Map<String, Object?>)['status'], 'success');

    await controller.shutdown();
  });

  test('createBackgroundAgent is listed and can be opened locally', () async {
    final shellPort = _FakeShellPort();
    final hostAdapter = _FakeHostAdapter(
      files: {'/tmp/workspace/README.md': 'hello'},
      currentFilePath: '/tmp/workspace/README.md',
      workspaceDirs: const ['file:///tmp/workspace'],
      repoName: 'https://github.com/example/repo',
      branch: 'feature/agent',
    );
    final controller = _createController(
      coreTransport: _FakeCoreTransport(),
      hostAdapter: hostAdapter,
      shellPort: shellPort,
    );

    await controller.start();
    await shellPort.emit(
      ContinueMessage(
        messageType: 'createBackgroundAgent',
        messageId: 'agent-create-1',
        data: {
          'content': 'Investigate the current workspace and propose a fix',
          'contextItems': const [],
          'selectedCode': const [],
          'organizationId': 'org-1',
        },
      ),
    );

    await shellPort.emit(
      ContinueMessage(
        messageType: 'listBackgroundAgents',
        messageId: 'agent-list-1',
        data: {'organizationId': 'org-1', 'limit': 5},
      ),
    );

    final listResponse = shellPort.outgoing.lastWhere(
      (message) => message.messageType == 'listBackgroundAgents',
    );
    final listPayload = listResponse.data as Map<String, Object?>;
    final content = listPayload['content'] as Map<String, Object?>;
    final agents = content['agents'] as List<Object?>;
    expect(agents, hasLength(1));
    final agent = agents.first as Map<String, Object?>;
    expect(agent['repoUrl'], 'https://github.com/example/repo');
    expect(agent['status'], 'queued');

    await shellPort.emit(
      ContinueMessage(
        messageType: 'openAgentLocally',
        messageId: 'agent-open-1',
        data: {'agentSessionId': agent['id']},
      ),
    );

    final loadAgentEvent = shellPort.outgoing.firstWhere(
      (message) => message.messageType == 'loadAgentSession',
    );
    final session =
        (loadAgentEvent.data as Map<String, Object?>)['session']
            as Map<String, Object?>;
    expect(session['mode'], 'agent');
    expect(session['title'], agent['name']);

    await controller.shutdown();
  });
}

ContinueShellController _createController({
  required CoreTransport coreTransport,
  required HostAdapter hostAdapter,
  required ContinueShellPort shellPort,
  ContinueHistoryStore? historyStore,
}) {
  return ContinueShellController(
    coreTransport: coreTransport,
    hostAdapter: hostAdapter,
    shellPort: shellPort,
    historyStore: historyStore ?? _FakeHistoryStore(),
  );
}

class _FakeCoreTransport implements CoreTransport {
  _FakeCoreTransport({this.handlers = const {}});

  final Map<String, Object? Function(ContinueMessage message)> handlers;
  final StreamController<ContinueMessage> _messages =
      StreamController<ContinueMessage>.broadcast();
  final List<ContinueMessage> sentMessages = <ContinueMessage>[];
  bool _connected = false;

  @override
  Stream<ContinueMessage> get messages => _messages.stream;

  @override
  bool get isConnected => _connected;

  @override
  Future<void> start() async {
    _connected = true;
  }

  @override
  Future<void> send(ContinueMessage message) async {
    sentMessages.add(message);
    final handler = handlers[message.messageType];
    if (handler != null) {
      _messages.add(
        ContinueMessage(
          messageType: message.messageType,
          messageId: message.messageId,
          data: {
            'done': true,
            'status': 'success',
            'content': handler(message),
          },
        ),
      );
    }
  }

  @override
  Future<void> dispose() async {
    _connected = false;
    await _messages.close();
  }
}

class _FakeShellPort extends ContinueShellPort {
  final StreamController<ContinueMessage> _incoming =
      StreamController<ContinueMessage>.broadcast();
  final List<ContinueMessage> outgoing = <ContinueMessage>[];

  @override
  Stream<ContinueMessage> get incomingMessages => _incoming.stream;

  @override
  Future<void> load() async {}

  @override
  Future<void> postMessage(ContinueMessage message) async {
    outgoing.add(message);
  }

  Future<void> emit(ContinueMessage message) async {
    _incoming.add(message);
    await Future<void>.delayed(Duration.zero);
  }

  @override
  Future<void> dispose() async {
    await _incoming.close();
  }
}

class _FakeHistoryStore implements ContinueHistoryStore {
  final Map<String, Map<String, Object?>> sessions =
      <String, Map<String, Object?>>{};

  @override
  Future<void> init() async {}

  @override
  Future<void> clear() async {
    sessions.clear();
  }

  @override
  Future<void> delete(String sessionId) async {
    sessions.remove(sessionId);
  }

  @override
  Future<List<Map<String, Object?>>> list({
    int? limit,
    int? offset,
    String? workspaceDirectory,
  }) async {
    var items = sessions.values
        .where((session) {
          if (workspaceDirectory == null || workspaceDirectory.isEmpty) {
            return true;
          }
          return (session['workspaceDirectory'] as String?)?.toLowerCase() ==
              workspaceDirectory.toLowerCase();
        })
        .map((session) {
          final history = (session['history'] as List?) ?? const <Object?>[];
          final messageCount = history.where((item) {
            if (item is! Map) {
              return false;
            }
            final message = item['message'];
            return message is Map && message['role'] == 'assistant';
          }).length;
          return <String, Object?>{
            'sessionId': session['sessionId'],
            'title': session['title'],
            'dateCreated': '2026-04-29T00:00:00.000Z',
            'workspaceDirectory': session['workspaceDirectory'],
            'messageCount': messageCount,
          };
        })
        .toList(growable: false);

    final start = offset ?? 0;
    final end = limit == null
        ? items.length
        : (start + limit).clamp(0, items.length);
    if (start >= items.length) {
      return const <Map<String, Object?>>[];
    }
    items = items.sublist(start, end);
    return items;
  }

  @override
  Future<Map<String, Object?>> load(String sessionId) async {
    return sessions[sessionId] ??
        <String, Object?>{
          'sessionId': sessionId,
          'title': 'New Session',
          'workspaceDirectory': '',
          'history': const <Object?>[],
        };
  }

  @override
  Future<Map<String, Object?>> loadRemote(String remoteId) async {
    return <String, Object?>{
      'sessionId': remoteId,
      'title': 'Remote Session',
      'workspaceDirectory': '',
      'history': const <Object?>[],
    };
  }

  @override
  Future<void> save(Map<String, Object?> session) async {
    sessions[session['sessionId'] as String] = session;
  }
}

class _FakeHostAdapter extends HostAdapter {
  _FakeHostAdapter({
    required this.files,
    this.currentFilePath,
    this.workspaceDirs = const ['file:///tmp/workspace'],
    this.repoName = 'https://github.com/example/repo',
    this.branch = 'main',
  });

  final Map<String, String> files;
  final List<String> savedFiles = <String>[];
  final List<String> invocations = <String>[];
  final String? currentFilePath;
  final List<String> workspaceDirs;
  final String repoName;
  final String branch;

  @override
  bool canHandle(String messageType) {
    return const {
      'fileExists',
      'readFile',
      'writeFile',
      'removeFile',
      'saveFile',
      'toggleDevTools',
      'showTutorial',
      'logoutOfControlPlane',
      'getCurrentFile',
      'getOpenFiles',
      'getWorkspaceDirs',
      'getRepoName',
      'getBranch',
    }.contains(messageType);
  }

  @override
  Future<Object?> handle(ContinueMessage message) async {
    invocations.add(message.messageType);
    final payload = (message.data as Map?)?.cast<String, Object?>();
    switch (message.messageType) {
      case 'fileExists':
        return files.containsKey(payload?['filepath']);
      case 'readFile':
        return files[payload?['filepath']];
      case 'writeFile':
        files[payload?['path'] as String] =
            payload?['contents'] as String? ?? '';
        return null;
      case 'removeFile':
        files.remove(payload?['path']);
        return null;
      case 'saveFile':
        final filepath = payload?['filepath'] as String?;
        if (filepath != null) {
          savedFiles.add(filepath);
        }
        return null;
      case 'getCurrentFile':
        if (currentFilePath == null) {
          return null;
        }
        return {'path': currentFilePath};
      case 'getOpenFiles':
        return currentFilePath == null
            ? const <String>[]
            : <String>[currentFilePath!];
      case 'getWorkspaceDirs':
        return workspaceDirs;
      case 'getRepoName':
        return repoName;
      case 'getBranch':
        return branch;
      case 'toggleDevTools':
      case 'showTutorial':
      case 'logoutOfControlPlane':
        return null;
    }
    throw UnsupportedError('Unhandled fake host method ${message.messageType}');
  }
}
