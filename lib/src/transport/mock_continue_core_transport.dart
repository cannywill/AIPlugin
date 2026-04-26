import 'dart:async';
import 'dart:developer' as developer;

import '../protocol/continue_message.dart';
import 'core_transport.dart';

typedef MockCoreResponseHandler =
    FutureOr<Object?> Function(ContinueMessage message);
typedef MockStreamChatHandler =
    FutureOr<String> Function(ContinueMessage message, String? prompt);

class MockContinueCoreTransport implements CoreTransport {
  MockContinueCoreTransport({
    this.responses = const {},
    this.handlers = const {},
    this.streamChatHandler,
    this.streamDelay = Duration.zero,
    this.respondToUnknownMessages = true,
  });

  final Map<String, Object?> responses;
  final Map<String, MockCoreResponseHandler> handlers;
  final MockStreamChatHandler? streamChatHandler;
  final Duration streamDelay;
  final bool respondToUnknownMessages;

  final StreamController<ContinueMessage> _messages =
      StreamController<ContinueMessage>.broadcast();

  bool _isConnected = false;

  @override
  Stream<ContinueMessage> get messages => _messages.stream;

  @override
  bool get isConnected => _isConnected;

  @override
  Future<void> start() async {
    _isConnected = true;
    _logStage('start');
  }

  @override
  Future<void> send(ContinueMessage message) async {
    _logMessage('send/received', message);
    if (!_isConnected) {
      throw StateError('MockContinueCoreTransport has not been started.');
    }

    if (message.messageType == 'abort') {
      await _sendSuccess(message, null);
      return;
    }

    if (message.messageType == 'ping') {
      await _sendSuccess(message, message.data);
      return;
    }

    if (message.messageType == 'llm/streamChat') {
      await _handleStreamChat(message);
      return;
    }

    final handler = handlers[message.messageType];
    if (handler != null) {
      final content = await handler(message);
      await _sendSuccess(message, content);
      return;
    }

    if (responses.containsKey(message.messageType)) {
      await _sendSuccess(message, responses[message.messageType]);
      return;
    }

    if (respondToUnknownMessages) {
      await _sendSuccess(message, null);
      return;
    }

    await _sendError(
      message,
      'Mock core transport has no response for ${message.messageType}',
    );
  }

  Future<void> _handleStreamChat(ContinueMessage message) async {
    _logMessage('streamChat/start', message);
    final prompt = _extractLastUserPrompt(message.data);
    String assistantContent;
    try {
      assistantContent = streamChatHandler != null
          ? await streamChatHandler!(message, prompt)
          : prompt == null || prompt.isEmpty
          ? 'Mock Continue GUI response from AppAIPlugin.'
          : 'Mock Continue GUI response: $prompt';
    } catch (error, stackTrace) {
      // 必须把错误也回流给 GUI，否则 GUI 会一直卡在 "Generating..."。
      _logMessage(
        'streamChat/handlerError',
        message,
        details: 'error=$error',
      );
      developer.log(
        'streamChatHandler threw',
        name: 'MockContinueCoreTransport',
        error: error,
        stackTrace: stackTrace,
      );
      await _sendError(message, error.toString());
      return;
    }

    _messages.add(
      ContinueMessage(
        messageType: message.messageType,
        messageId: message.messageId,
        data: {
          'done': false,
          'content': {'role': 'assistant', 'content': assistantContent},
          'status': 'success',
        },
      ),
    );
    _logMessage('streamChat/chunk', message);

    if (streamDelay > Duration.zero) {
      await Future<void>.delayed(streamDelay);
    }

    await _sendSuccess(message, null);
  }

  String? _extractLastUserPrompt(Object? rawData) {
    if (rawData is! Map) {
      return null;
    }

    final messages = rawData['messages'];
    if (messages is! List) {
      return null;
    }

    for (final item in messages.reversed) {
      if (item is! Map) {
        continue;
      }
      if (item['role'] != 'user') {
        continue;
      }
      final content = item['content'];
      if (content is String) {
        return content;
      }
      if (content is List && content.isNotEmpty) {
        final first = content.first;
        if (first is Map && first['text'] is String) {
          return first['text'] as String;
        }
      }
    }

    return null;
  }

  Future<void> _sendSuccess(ContinueMessage request, Object? content) async {
    _logMessage('send/success', request);
    _messages.add(
      ContinueMessage(
        messageType: request.messageType,
        messageId: request.messageId,
        data: {'done': true, 'content': content, 'status': 'success'},
      ),
    );
  }

  Future<void> _sendError(ContinueMessage request, String error) async {
    _logMessage('send/error', request, details: 'error=$error');
    _messages.add(
      ContinueMessage(
        messageType: request.messageType,
        messageId: request.messageId,
        data: {'done': true, 'status': 'error', 'error': error},
      ),
    );
  }

  @override
  Future<void> dispose() async {
    _isConnected = false;
    _logStage('dispose');
    await _messages.close();
  }

  void _logMessage(String stage, ContinueMessage message, {String? details}) {
    _logStage(
      stage,
      details:
          'messageType=${message.messageType} messageId=${message.messageId}${details == null ? '' : ' $details'}',
    );
  }

  void _logStage(String stage, {String? details}) {
    developer.log(
      '[stage=$stage]${details == null ? '' : ' $details'}',
      name: 'MockContinueCoreTransport',
    );
  }
}
