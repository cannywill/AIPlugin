import 'dart:async';
import 'dart:developer' as developer;

import 'package:flutter/foundation.dart';

import '../history/continue_history_sqlite_manager.dart';
import '../history/continue_history_store.dart';
import '../host/host_adapter.dart';
import '../protocol/continue_message.dart';
import '../protocol/continue_routes.dart';
import '../transport/core_transport.dart';

/// 文件类型：控制器
/// 文件作用：连接 Continue GUI、宿主能力适配层和 Core 传输层。
/// 主要职责：接收 GUI 发来的请求、把 Core 或宿主结果回推给 GUI，并兜底处理 Flutter 壳层特有的 apply/diff、edit 和 background agent 生命周期。
abstract class ContinueShellPort {
  Stream<ContinueMessage> get incomingMessages;

  Future<void> postMessage(ContinueMessage message);

  Future<void> load();

  Future<void> dispose();
}

class ContinueShellController extends ChangeNotifier {
  ContinueShellController({
    required this.coreTransport,
    required this.hostAdapter,
    required this.shellPort,
    ContinueHistoryStore? historyStore,
  }) : historyStore =
           historyStore ?? ContinueHistorySqliteManager.getInstance();

  static const String editModeStreamId = 'edit-mode';

  final CoreTransport coreTransport;
  final HostAdapter hostAdapter;
  final ContinueShellPort shellPort;
  final ContinueHistoryStore historyStore;

  final Set<String> _pendingShellResponseIds = <String>{};
  final Map<String, Completer<Map<String, Object?>>> _pendingCoreResponses =
      <String, Completer<Map<String, Object?>>>{};
  final Map<String, _PendingApplyOperation> _pendingApplyOperations =
      <String, _PendingApplyOperation>{};
  final List<_BackgroundAgentRecord> _backgroundAgents =
      <_BackgroundAgentRecord>[];
  final List<String> _recentEvents = <String>[];

  StreamSubscription<ContinueMessage>? _shellSubscription;
  StreamSubscription<ContinueMessage>? _coreSubscription;

  String _status = 'idle';
  String get status => _status;
  List<String> get recentEvents => List<String>.unmodifiable(_recentEvents);

  /// 功能：启动 shell 控制器，并把 GUI 与 Core 的双向消息监听串起来。
  /// 时机：Flutter 壳层准备完成后调用一次。
  Future<void> start() async {
    _setStatus('starting');
    _logStage('start/init');

    await historyStore.init();
    _logStage('start/historyStore.ready');
    await coreTransport.start();
    _logStage('start/coreTransport.ready');
    await shellPort.load();
    _logStage('start/shellPort.ready');

    _shellSubscription = shellPort.incomingMessages.listen(_handleShellMessage);
    _coreSubscription = coreTransport.messages.listen((message) {
      _logMessage('core->controller/received', message);
      if (_consumeCoreResponse(message)) {
        _logMessage('core->controller/internalResponseConsumed', message);
        return;
      }
      unawaited(_postToShell(message));
    });

    _setStatus('ready');
  }

  /// 功能：统一处理来自 GUI 的消息，并按宿主、本地兜底、Core 三类路径分发。
  /// 说明：这里会先消费掉 GUI 对反向通知的应答，避免 updateApplyState 这类消息再次被当成新请求处理。
  Future<void> _handleShellMessage(ContinueMessage message) async {
    _logMessage('shell->controller/received', message);
    if (_consumeShellResponse(message)) {
      _logMessage('shell->controller/shellResponseConsumed', message);
      return;
    }

    if (await _handleShellManagedMessage(message)) {
      _logMessage('controller/shellManagedHandled', message);
      return;
    }

    if (hostAdapter.canHandle(message.messageType)) {
      _logMessage('controller->host/dispatch', message);
      final content = await hostAdapter.handle(message);
      _logMessage('controller<-host/response', message);
      await _respondToShellRequest(
        message,
        content: content,
        status: 'success',
      );
      return;
    }

    if (kHostHandledMessageTypes.contains(message.messageType)) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'Host adapter has not implemented ${message.messageType} yet.',
      );
      return;
    }

    if (kCorePassThroughMessageTypes.contains(message.messageType)) {
      _logMessage('controller->core/passThrough', message);
      await coreTransport.send(message);
      return;
    }

    // Fallback: forward unknown routes to core instead of failing silently in GUI.
    _logMessage('controller->core/fallback', message);
    await coreTransport.send(message);
  }

  /// 功能：优先处理需要 Flutter 壳层自己兜底的消息。
  /// 说明：session 分享别名、apply/diff 生命周期、edit 相关兜底和 background agent 流都放在这里，避免把宿主和 Core 的边界搅乱。
  Future<bool> _handleShellManagedMessage(ContinueMessage message) async {
    switch (message.messageType) {
      case 'history/list':
        await _handleHistoryList(message);
        return true;
      case 'history/load':
        await _handleHistoryLoad(message);
        return true;
      case 'history/loadRemote':
        await _handleHistoryLoadRemote(message);
        return true;
      case 'history/save':
        await _handleHistorySave(message);
        return true;
      case 'history/delete':
        await _handleHistoryDelete(message);
        return true;
      case 'history/clear':
        await _handleHistoryClear(message);
        return true;
      case 'session/share':
        await coreTransport.send(
          ContinueMessage(
            messageType: 'history/share',
            messageId: message.messageId,
            data: message.data,
          ),
        );
        return true;
      case 'applyToFile':
        await _handleApplyToFile(message);
        return true;
      case 'acceptDiff':
        await _handleAcceptOrRejectDiff(message, accept: true);
        return true;
      case 'rejectDiff':
        await _handleAcceptOrRejectDiff(message, accept: false);
        return true;
      case 'insertAtCursor':
        await _handleInsertAtCursor(message);
        return true;
      case 'edit/addCurrentSelection':
        await _handleAddCurrentSelection(message);
        return true;
      case 'edit/sendPrompt':
        await _handleEditSendPrompt(message);
        return true;
      case 'edit/clearDecorations':
        await _respondToShellRequest(message, content: null, status: 'success');
        return true;
      case 'createBackgroundAgent':
        await _handleCreateBackgroundAgent(message);
        return true;
      case 'listBackgroundAgents':
        await _handleListBackgroundAgents(message);
        return true;
      case 'openAgentLocally':
        await _handleOpenAgentLocally(message);
        return true;
    }
    return false;
  }

  Future<void> _handleHistoryList(ContinueMessage message) async {
    try {
      final payload = (message.data as Map?)?.cast<String, Object?>();
      final content = await historyStore.list(
        limit: (payload?['limit'] as num?)?.toInt(),
        offset: (payload?['offset'] as num?)?.toInt(),
        workspaceDirectory: payload?['workspaceDirectory'] as String?,
      );
      await _respondToShellRequest(
        message,
        content: content,
        status: 'success',
      );
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  Future<void> _handleHistoryLoad(ContinueMessage message) async {
    try {
      final payload = (message.data as Map?)?.cast<String, Object?>();
      final sessionId = payload?['id'] as String?;
      if (sessionId == null || sessionId.isEmpty) {
        throw ArgumentError('history/load requires a non-empty id.');
      }
      final content = await historyStore.load(sessionId);
      await _respondToShellRequest(
        message,
        content: content,
        status: 'success',
      );
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  Future<void> _handleHistoryLoadRemote(ContinueMessage message) async {
    try {
      final payload = (message.data as Map?)?.cast<String, Object?>();
      final remoteId = payload?['remoteId'] as String?;
      if (remoteId == null || remoteId.isEmpty) {
        throw ArgumentError(
          'history/loadRemote requires a non-empty remoteId.',
        );
      }
      final content = await historyStore.loadRemote(remoteId);
      await _respondToShellRequest(
        message,
        content: content,
        status: 'success',
      );
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  Future<void> _handleHistorySave(ContinueMessage message) async {
    try {
      final payload = (message.data as Map?)?.cast<String, Object?>();
      if (payload == null) {
        throw ArgumentError('history/save requires a session payload.');
      }
      await historyStore.save(payload);
      await _respondToShellRequest(message, content: null, status: 'success');
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  Future<void> _handleHistoryDelete(ContinueMessage message) async {
    try {
      final payload = (message.data as Map?)?.cast<String, Object?>();
      final sessionId = payload?['id'] as String?;
      if (sessionId == null || sessionId.isEmpty) {
        throw ArgumentError('history/delete requires a non-empty id.');
      }
      await historyStore.delete(sessionId);
      await _respondToShellRequest(message, content: null, status: 'success');
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  Future<void> _handleHistoryClear(ContinueMessage message) async {
    try {
      await historyStore.clear();
      await _respondToShellRequest(message, content: null, status: 'success');
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  /// 功能：执行一次 applyToFile，并把 Continue GUI 需要的状态流转回推给 WebView。
  /// 状态流：streaming -> done/closed。
  Future<void> _handleApplyToFile(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final streamId = payload?['streamId'] as String?;
    final text = payload?['text'] as String? ?? '';
    final toolCallId = payload?['toolCallId'] as String?;

    if (streamId == null || streamId.isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'applyToFile requires a non-empty streamId.',
      );
      return;
    }

    final filepath = await _resolveApplyFilepath(payload);
    if (filepath == null || filepath.isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'applyToFile requires a filepath or an open current file.',
      );
      return;
    }

    try {
      final originalFileContent = await _readFileContents(filepath);

      await _emitApplyState(
        streamId: streamId,
        status: 'streaming',
        filepath: filepath,
        fileContent: text,
        originalFileContent: originalFileContent,
        toolCallId: toolCallId,
      );

      final appliedFileContent = await _writeAndReadBack(filepath, text);
      final shouldCloseImmediately = originalFileContent.trim().isEmpty;

      if (shouldCloseImmediately) {
        _pendingApplyOperations.remove(streamId);
        await _emitApplyState(
          streamId: streamId,
          status: 'closed',
          filepath: filepath,
          fileContent: appliedFileContent,
          originalFileContent: originalFileContent,
          toolCallId: toolCallId,
          numDiffs: 0,
        );
      } else {
        _pendingApplyOperations[streamId] = _PendingApplyOperation(
          streamId: streamId,
          filepath: filepath,
          originalFileContent: originalFileContent,
          appliedFileContent: appliedFileContent,
          toolCallId: toolCallId,
          createdFile: originalFileContent.isEmpty,
        );
        await _emitApplyState(
          streamId: streamId,
          status: 'done',
          filepath: filepath,
          fileContent: appliedFileContent,
          originalFileContent: originalFileContent,
          toolCallId: toolCallId,
          numDiffs: _estimateDiffCount(originalFileContent, appliedFileContent),
        );
      }

      await _respondToShellRequest(message, content: null, status: 'success');
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  /// 功能：处理 Continue GUI 发来的 accept/reject 操作。
  /// 说明：accept 保留已写入的内容，reject 会恢复旧内容或删除刚创建的新文件。
  Future<void> _handleAcceptOrRejectDiff(
    ContinueMessage message, {
    required bool accept,
  }) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();

    try {
      final operation = _resolvePendingApplyOperation(payload);
      if (operation == null) {
        await _respondToShellRequest(message, content: null, status: 'success');
        return;
      }

      if (accept) {
        await _invokeHostVoid('saveFile', {'filepath': operation.filepath});
      } else if (operation.createdFile) {
        await _invokeHostVoid('removeFile', {'path': operation.filepath});
      } else {
        await _invokeHostVoid('writeFile', {
          'path': operation.filepath,
          'contents': operation.originalFileContent,
        });
      }

      final resolvedFileContent = accept
          ? (await _invokeHostString('readFile', {
                  'filepath': operation.filepath,
                }) ??
                operation.appliedFileContent)
          : operation.createdFile
          ? ''
          : (await _invokeHostString('readFile', {
                  'filepath': operation.filepath,
                }) ??
                operation.originalFileContent);

      _pendingApplyOperations.remove(operation.streamId);
      await _emitApplyState(
        streamId: operation.streamId,
        status: 'closed',
        filepath: operation.filepath,
        fileContent: resolvedFileContent,
        originalFileContent: operation.originalFileContent,
        toolCallId: operation.toolCallId,
        numDiffs: 0,
      );

      await _respondToShellRequest(message, content: null, status: 'success');
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  /// 功能：在没有真实编辑器光标信息的 Flutter 壳层里，提供一个可工作的 insertAtCursor 回退实现。
  /// 说明：当前策略是把代码块内容追加到当前文件末尾，避免按钮点击后毫无反馈。
  Future<void> _handleInsertAtCursor(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final text = payload?['text'] as String? ?? '';
    final filepath = await _resolveApplyFilepath(payload);

    if (filepath == null || filepath.isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'insertAtCursor requires an open current file.',
      );
      return;
    }

    final originalFileContent = await _readFileContents(filepath);
    final separator =
        originalFileContent.isEmpty || originalFileContent.endsWith('\n')
        ? ''
        : '\n';
    await _writeAndReadBack(filepath, '$originalFileContent$separator$text');
    await _respondToShellRequest(message, content: null, status: 'success');
  }

  /// 功能：把当前文件的全文选区同步给 Continue GUI 的编辑模式。
  /// 说明：Flutter 壳层暂时没有真实文本选区，所以这里回退成“当前文件全文可编辑”。
  Future<void> _handleAddCurrentSelection(ContinueMessage message) async {
    final currentFile =
        await _invokeHost('getCurrentFile', null) as Map<Object?, Object?>?;
    final filepath = currentFile?['path'] as String?;
    if (filepath == null || filepath.isEmpty) {
      await _respondToShellRequest(message, content: null, status: 'success');
      return;
    }

    final contents = await _readFileContents(filepath);
    await _postShellEvent('setCodeToEdit', {
      'filepath': filepath,
      'contents': contents,
      'range': _buildFullFileRange(contents),
    });
    await _respondToShellRequest(message, content: null, status: 'success');
  }

  /// 功能：执行 edit/sendPrompt，并把编辑结果复用到现有的 apply 生命周期里。
  /// 说明：有真实 Core 模型时会走 llm/complete；没有模型时会直接返回错误，避免 GUI 一直等待。
  Future<void> _handleEditSendPrompt(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final rangeInFile = (payload?['range'] as Map?)?.cast<String, Object?>();
    final filepath = rangeInFile?['filepath'] as String?;
    if (filepath == null || filepath.isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'edit/sendPrompt requires a filepath.',
      );
      return;
    }

    try {
      final originalFileContent = await _readFileContents(filepath);
      final selectedContents =
          rangeInFile?['contents'] as String? ?? originalFileContent;
      await _emitApplyState(
        streamId: editModeStreamId,
        status: 'streaming',
        filepath: filepath,
        fileContent: originalFileContent,
        originalFileContent: originalFileContent,
      );

      final replacement = await _generateEditReplacement(
        prompt: _normalizeMessageContent(payload?['prompt']),
        selectedContents: selectedContents,
        filepath: filepath,
      );
      final editedFileContent = _replaceRangeInFile(
        originalFileContent,
        rangeInFile?['range'] as Map?,
        replacement,
      );
      final appliedFileContent = await _writeAndReadBack(
        filepath,
        editedFileContent,
      );

      _pendingApplyOperations[editModeStreamId] = _PendingApplyOperation(
        streamId: editModeStreamId,
        filepath: filepath,
        originalFileContent: originalFileContent,
        appliedFileContent: appliedFileContent,
        createdFile: originalFileContent.isEmpty,
      );
      await _emitApplyState(
        streamId: editModeStreamId,
        status: 'done',
        filepath: filepath,
        fileContent: appliedFileContent,
        originalFileContent: originalFileContent,
        numDiffs: _estimateDiffCount(originalFileContent, appliedFileContent),
      );

      await _respondToShellRequest(
        message,
        content: replacement,
        status: 'success',
      );
    } catch (error) {
      await _respondToShellRequest(message, status: 'error', error: '$error');
    }
  }

  /// 功能：创建一个 Flutter 壳层本地可见的 background agent 记录。
  /// 说明：先用本地工作区信息生成可回显的任务卡片，后续再替换成真实 control plane 接入。
  Future<void> _handleCreateBackgroundAgent(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final prompt = _normalizeMessageContent(payload?['content']);
    if (prompt.trim().isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'Please enter a prompt to create a background agent.',
      );
      return;
    }

    final workspaceDirs =
        await _invokeHost('getWorkspaceDirs', null) as List<Object?>? ??
        const <Object?>[];
    final workspaceDir = workspaceDirs.whereType<String>().firstOrNull;
    if (workspaceDir == null || workspaceDir.isEmpty) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'No workspace folder found. Please open a workspace first.',
      );
      return;
    }

    final repoUrl =
        await _invokeHostString('getRepoName', {'dir': workspaceDir}) ??
        workspaceDir;
    final branch =
        await _invokeHostString('getBranch', {'dir': workspaceDir}) ?? 'main';
    final organizationId = payload?['organizationId'] as String?;
    final agentId = 'agent-${DateTime.now().microsecondsSinceEpoch}';
    final createdAt = DateTime.now().toUtc().toIso8601String();
    final agent = _BackgroundAgentRecord(
      id: agentId,
      name: _buildBackgroundAgentName(prompt, repoUrl),
      status: 'queued',
      repoUrl: repoUrl,
      branch: branch,
      createdAt: createdAt,
      prompt: prompt,
      organizationId: organizationId,
      contextItems:
          (payload?['contextItems'] as List?)?.cast<Object?>() ??
          const <Object?>[],
      selectedCode:
          (payload?['selectedCode'] as List?)?.cast<Object?>() ??
          const <Object?>[],
    );

    _backgroundAgents.insert(0, agent);
    await _respondToShellRequest(
      message,
      content: {'id': agentId},
      status: 'success',
    );
  }

  /// 功能：返回本地维护的 background agent 列表，供 Continue GUI 的后台任务视图轮询展示。
  Future<void> _handleListBackgroundAgents(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final organizationId = payload?['organizationId'] as String?;
    final limit = (payload?['limit'] as num?)?.toInt();

    final filtered = _backgroundAgents
        .where((agent) {
          if (organizationId == null || organizationId.isEmpty) {
            return true;
          }
          return agent.organizationId == organizationId;
        })
        .toList(growable: false);
    final visible = limit == null
        ? filtered
        : filtered.take(limit).toList(growable: false);

    await _respondToShellRequest(
      message,
      content: {
        'agents': visible
            .map((agent) => agent.toListItem())
            .toList(growable: false),
        'totalCount': filtered.length,
      },
      status: 'success',
    );
  }

  /// 功能：把选中的 background agent 回流到本地 GUI 会话里，模拟“本地接管任务”的入口。
  Future<void> _handleOpenAgentLocally(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();
    final agentSessionId = payload?['agentSessionId'] as String?;
    final agent = _backgroundAgents
        .where((item) => item.id == agentSessionId)
        .firstOrNull;
    if (agent == null) {
      await _respondToShellRequest(
        message,
        status: 'error',
        error: 'Background agent not found.',
      );
      return;
    }

    agent.status = 'running';
    await _postShellEvent('loadAgentSession', {'session': agent.toSession()});
    await _respondToShellRequest(message, content: null, status: 'success');
  }

  /// 功能：根据 payload、streamId 或最近一次待确认记录，解析当前应该操作的 apply 任务。
  _PendingApplyOperation? _resolvePendingApplyOperation(
    Map<String, Object?>? payload,
  ) {
    final streamId = payload?['streamId'] as String?;
    if (streamId != null && _pendingApplyOperations.containsKey(streamId)) {
      return _pendingApplyOperations[streamId];
    }

    final filepath =
        payload?['filepath'] as String? ?? payload?['path'] as String?;
    if (filepath != null && filepath.isNotEmpty) {
      for (final operation
          in _pendingApplyOperations.values.toList().reversed) {
        if (operation.filepath == filepath) {
          return operation;
        }
      }
    }

    if (_pendingApplyOperations.isEmpty) {
      return null;
    }
    return _pendingApplyOperations.values.last;
  }

  /// 功能：在 GUI 没显式传 filepath 时，优先回退到当前打开文件或首个打开文件。
  Future<String?> _resolveApplyFilepath(Map<String, Object?>? payload) async {
    final filepath =
        payload?['filepath'] as String? ?? payload?['path'] as String?;
    if (filepath != null && filepath.isNotEmpty) {
      return filepath;
    }

    final currentFile =
        await _invokeHost('getCurrentFile', null) as Map<Object?, Object?>?;
    final currentPath = currentFile?['path'] as String?;
    if (currentPath != null && currentPath.isNotEmpty) {
      return currentPath;
    }

    final openFiles = await _invokeHost('getOpenFiles', null) as List<Object?>?;
    if (openFiles == null) {
      return null;
    }

    for (final file in openFiles) {
      if (file is String && file.isNotEmpty) {
        return file;
      }
    }
    return null;
  }

  /// 功能：读取文件当前内容；文件不存在时回退成空字符串，方便新文件链路复用同一套逻辑。
  Future<String> _readFileContents(String filepath) async {
    final fileExists =
        await _invokeHostBool('fileExists', {'filepath': filepath}) ?? false;
    if (!fileExists) {
      return '';
    }
    return await _invokeHostString('readFile', {'filepath': filepath}) ?? '';
  }

  /// 功能：写回文件并重新读取最新内容，确保后续状态里拿到的是宿主侧真实文件状态。
  Future<String> _writeAndReadBack(String filepath, String contents) async {
    await _invokeHostVoid('writeFile', {
      'path': filepath,
      'contents': contents,
    });
    return await _invokeHostString('readFile', {'filepath': filepath}) ??
        contents;
  }

  /// 功能：向 GUI 回推 apply 状态变更，并记录这是一条需要忽略回执的反向通知。
  Future<void> _emitApplyState({
    required String streamId,
    required String status,
    required String filepath,
    required String fileContent,
    required String originalFileContent,
    String? toolCallId,
    int? numDiffs,
  }) {
    return _postShellEvent('updateApplyState', {
      'streamId': streamId,
      'status': status,
      'filepath': filepath,
      'fileContent': fileContent,
      'originalFileContent': originalFileContent,
      if (toolCallId != null) 'toolCallId': toolCallId,
      if (numDiffs != null) 'numDiffs': numDiffs,
    });
  }

  /// 功能：向 GUI 发送一个反向事件，并把它标记成需要忽略回执的消息。
  Future<void> _postShellEvent(String messageType, Object? data) {
    return _postToShell(
      ContinueMessage(
        messageType: messageType,
        messageId: _internalMessageId(messageType),
        data: data,
      ),
      expectResponse: true,
    );
  }

  /// 功能：把宿主/Core 结果按 Continue GUI 的请求响应格式写回 WebView。
  Future<void> _respondToShellRequest(
    ContinueMessage message, {
    Object? content,
    required String status,
    String? error,
  }) {
    return _postToShell(
      ContinueMessage(
        messageType: message.messageType,
        messageId: message.messageId,
        data: {
          'done': true,
          'status': status,
          if (status == 'success') 'content': content,
          if (error != null) 'error': error,
        },
      ),
    );
  }

  /// 功能：统一向 shell 发送消息，并在需要时记录后续要忽略的 GUI 回执。
  Future<void> _postToShell(
    ContinueMessage message, {
    bool expectResponse = false,
  }) async {
    if (expectResponse) {
      _pendingShellResponseIds.add(message.messageId);
    }
    _logMessage(
      'controller->shell/post${expectResponse ? '(expectResponse)' : ''}',
      message,
    );
    await shellPort.postMessage(message);
  }

  /// 功能：消费 GUI 对反向通知的回执，避免被当成新的宿主请求继续分发。
  bool _consumeShellResponse(ContinueMessage message) {
    return _pendingShellResponseIds.remove(message.messageId);
  }

  /// 功能：发起一次只给 Flutter 壳层内部使用的 Core 请求。
  /// 说明：这类请求会在 controller 内部等待回包，不会再透传给 GUI。
  Future<Map<String, Object?>> _requestCoreResponse(
    String messageType,
    Object? data,
  ) async {
    final messageId = _internalMessageId(messageType);
    final completer = Completer<Map<String, Object?>>();
    _pendingCoreResponses[messageId] = completer;

    final request = ContinueMessage(
      messageType: messageType,
      messageId: messageId,
      data: data,
    );
    _logMessage('controller->core/internalRequest', request);
    await coreTransport.send(request);

    return completer.future;
  }

  /// 功能：消费 Flutter 壳层内部发起的 Core 响应，避免这类回包继续透传给 GUI。
  bool _consumeCoreResponse(ContinueMessage message) {
    final completer = _pendingCoreResponses[message.messageId];
    if (completer == null) {
      return false;
    }

    final payload =
        (message.data as Map?)?.cast<String, Object?>() ??
        <String, Object?>{
          'done': true,
          'status': 'success',
          'content': message.data,
        };
    final done = payload['done'];
    if (done == false) {
      return true;
    }

    _pendingCoreResponses.remove(message.messageId);
    if (!completer.isCompleted) {
      completer.complete(payload);
    }
    return true;
  }

  Future<Object?> _invokeHost(String messageType, Object? data) {
    if (!hostAdapter.canHandle(messageType)) {
      throw UnsupportedError('Host adapter cannot handle $messageType');
    }
    return hostAdapter.handle(
      ContinueMessage(
        messageType: messageType,
        messageId: _internalMessageId(messageType),
        data: data,
      ),
    );
  }

  Future<void> _invokeHostVoid(String messageType, Object? data) async {
    await _invokeHost(messageType, data);
  }

  Future<String?> _invokeHostString(String messageType, Object? data) async {
    final result = await _invokeHost(messageType, data);
    return result as String?;
  }

  Future<bool?> _invokeHostBool(String messageType, Object? data) async {
    final result = await _invokeHost(messageType, data);
    return result as bool?;
  }

  /// 功能：把 edit prompt 转成真正的替换文本。
  /// 说明：这里优先走 Continue Core 的 llm/complete，只有拿到模型返回后才继续进入 apply 生命周期。
  Future<String> _generateEditReplacement({
    required String prompt,
    required String selectedContents,
    required String filepath,
  }) async {
    final response = await _requestCoreResponse('llm/complete', {
      'prompt': _buildEditPrompt(
        prompt: prompt,
        selectedContents: selectedContents,
        filepath: filepath,
      ),
      'completionOptions': <String, Object?>{},
      'title': 'Flutter Edit Mode',
    });

    if (response['status'] == 'error') {
      throw StateError('${response['error'] ?? 'Edit request failed.'}');
    }

    final content = response['content'];
    if (content is! String || content.trim().isEmpty) {
      throw StateError(
        'Edit request did not return replacement text. Please configure a Continue model before using Edit mode.',
      );
    }

    return _stripMarkdownFence(content);
  }

  String _buildEditPrompt({
    required String prompt,
    required String selectedContents,
    required String filepath,
  }) {
    return '''You are editing a selected code range from the file "$filepath".
Return only the replacement text for the selected range.
Do not wrap the answer in markdown fences.

User instruction:
$prompt

Selected code:
$selectedContents''';
  }

  String _buildBackgroundAgentName(String prompt, String repoUrl) {
    final trimmedPrompt = prompt.replaceAll('\n', ' ').trim();
    if (trimmedPrompt.length >= 3) {
      return trimmedPrompt.length <= 50
          ? trimmedPrompt
          : '${trimmedPrompt.substring(0, 50)}...';
    }
    return 'Agent for $repoUrl';
  }

  String _normalizeMessageContent(Object? rawContent) {
    if (rawContent is String) {
      return rawContent;
    }
    if (rawContent is List) {
      final parts = <String>[];
      for (final item in rawContent) {
        if (item is String) {
          parts.add(item);
        } else if (item is Map && item['text'] is String) {
          parts.add(item['text'] as String);
        }
      }
      return parts.join('\n\n');
    }
    return rawContent?.toString() ?? '';
  }

  String _stripMarkdownFence(String value) {
    final trimmed = value.trim();
    if (!trimmed.startsWith('```')) {
      return trimmed;
    }
    final lines = trimmed.split('\n');
    if (lines.length < 3) {
      return trimmed;
    }
    final startIndex = 1;
    final endIndex = lines.last.startsWith('```')
        ? lines.length - 1
        : lines.length;
    return lines.sublist(startIndex, endIndex).join('\n').trim();
  }

  String _replaceRangeInFile(
    String fileContent,
    Map? rawRange,
    String replacement,
  ) {
    final range = rawRange?.cast<String, Object?>();
    final start = (range?['start'] as Map?)?.cast<String, Object?>();
    final end = (range?['end'] as Map?)?.cast<String, Object?>();
    final startOffset = _offsetForPosition(
      fileContent,
      (start?['line'] as num?)?.toInt() ?? 0,
      (start?['character'] as num?)?.toInt() ?? 0,
    );
    final endOffset = _offsetForPosition(
      fileContent,
      (end?['line'] as num?)?.toInt() ?? 0,
      (end?['character'] as num?)?.toInt() ?? 0,
    );
    final safeStart = startOffset.clamp(0, fileContent.length).toInt();
    final safeEnd = endOffset.clamp(safeStart, fileContent.length).toInt();
    return '${fileContent.substring(0, safeStart)}$replacement${fileContent.substring(safeEnd)}';
  }

  int _offsetForPosition(String content, int line, int character) {
    if (content.isEmpty) {
      return 0;
    }

    final lines = content.split('\n');
    if (line <= 0) {
      return character.clamp(0, lines.first.length).toInt();
    }
    if (line >= lines.length) {
      return content.length;
    }

    var offset = 0;
    for (var index = 0; index < line; index++) {
      offset += lines[index].length;
      offset += 1;
    }
    return offset + character.clamp(0, lines[line].length).toInt();
  }

  Map<String, Object?> _buildFullFileRange(String contents) {
    final lines = contents.split('\n');
    final lastLine = lines.isEmpty ? 0 : lines.length - 1;
    final lastCharacter = lines.isEmpty ? 0 : lines.last.length;
    return {
      'start': {'line': 0, 'character': 0},
      'end': {'line': lastLine, 'character': lastCharacter},
    };
  }

  int _estimateDiffCount(
    String originalFileContent,
    String appliedFileContent,
  ) {
    return originalFileContent == appliedFileContent ? 0 : 1;
  }

  String _internalMessageId(String messageType) {
    return '$messageType-${DateTime.now().microsecondsSinceEpoch}-${_pendingApplyOperations.length}-${_pendingCoreResponses.length}-${_backgroundAgents.length}';
  }

  /// 功能：向 Continue GUI 当前会话追加一个上下文条目。
  /// 说明：这类消息属于 Flutter 壳层到 GUI 的反向通知，用来补齐 addContextItem 的宿主触发能力。
  Future<void> addContextItem({
    required int historyIndex,
    required Object? item,
  }) {
    return _postShellEvent('addContextItem', {
      'historyIndex': historyIndex,
      'item': item,
    });
  }

  /// 功能：向 Continue GUI 推送最新的索引进度状态。
  /// 说明：IndexingProgress 组件本身就在监听 indexProgress，这里补一个 Flutter 壳层可直接调用的入口。
  Future<void> updateIndexProgress(Object? update) {
    return _postShellEvent('indexProgress', update);
  }

  /// 功能：通知 Continue GUI 当前免费试用额度已用尽。
  /// 说明：GUI 收到后会直接拉起已有的模型配置/订阅引导弹窗。
  Future<void> notifyFreeTrialExceeded() {
    return _postShellEvent('freeTrialExceeded', null);
  }

  Future<void> shutdown() async {
    _logStage('shutdown/start');
    await _shellSubscription?.cancel();
    await _coreSubscription?.cancel();
    await shellPort.dispose();
    await coreTransport.dispose();
    _logStage('shutdown/done');
    super.dispose();
  }

  void _setStatus(String value) {
    _status = value;
    notifyListeners();
    _logStage('status/$value');
  }

  void _logMessage(String stage, ContinueMessage message) {
    _logStage(
      stage,
      details:
          'messageType=${message.messageType} messageId=${message.messageId}',
    );
  }

  void _logStage(String stage, {String? details}) {
    final entry =
        '[${DateTime.now().toIso8601String()}] $stage'
        '${details == null ? '' : ' $details'}';
    _recentEvents.add(entry);
    if (_recentEvents.length > 60) {
      _recentEvents.removeRange(0, _recentEvents.length - 60);
    }
    developer.log(
      '[stage=$stage]${details == null ? '' : ' $details'}',
      name: 'ContinueShellController',
    );
    notifyListeners();
  }
}

/// 文件类型：模型
/// 文件作用：保存一次待确认 apply 操作的上下文。
/// 主要职责：让 accept/reject 时能够准确恢复旧内容，或保留本次改动后的内容。
class _PendingApplyOperation {
  const _PendingApplyOperation({
    required this.streamId,
    required this.filepath,
    required this.originalFileContent,
    required this.appliedFileContent,
    required this.createdFile,
    this.toolCallId,
  });

  final String streamId;
  final String filepath;
  final String originalFileContent;
  final String appliedFileContent;
  final String? toolCallId;
  final bool createdFile;
}

/// 文件类型：模型
/// 文件作用：保存 Flutter 壳层里本地可见的 background agent 记录。
/// 主要职责：为 Continue GUI 提供可轮询的任务卡片，并在本地打开时恢复成一个可继续操作的 agent 会话。
class _BackgroundAgentRecord {
  _BackgroundAgentRecord({
    required this.id,
    required this.name,
    required this.status,
    required this.repoUrl,
    required this.branch,
    required this.createdAt,
    required this.prompt,
    required this.organizationId,
    required this.contextItems,
    required this.selectedCode,
  });

  final String id;
  final String name;
  String status;
  final String repoUrl;
  final String branch;
  final String createdAt;
  final String prompt;
  final String? organizationId;
  final List<Object?> contextItems;
  final List<Object?> selectedCode;

  Map<String, Object?> toListItem() {
    return {
      'id': id,
      'name': name,
      'status': status,
      'repoUrl': repoUrl,
      'createdAt': createdAt,
      'metadata': {'github_repo': repoUrl},
    };
  }

  Map<String, Object?> toSession() {
    return {
      'sessionId': 'local-$id',
      'title': name,
      'mode': 'agent',
      'history': [
        {
          'message': {'id': 'user-$id', 'role': 'user', 'content': prompt},
          'contextItems': contextItems,
        },
        {
          'message': {
            'id': 'assistant-$id',
            'role': 'assistant',
            'content':
                'Local takeover is ready for $repoUrl on branch $branch.',
          },
          'contextItems': const <Object?>[],
        },
      ],
    };
  }
}
