import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;

import 'package:flutter/foundation.dart';

import '../app/continue_shell_controller.dart';
import '../protocol/continue_message.dart';

typedef ContinueGuiPoster = Future<void> Function(ContinueMessage message);

class ContinueGuiShellPort extends ContinueShellPort {
  ContinueGuiPoster? _poster;
  final List<ContinueMessage> _pendingOutgoing = [];
  final StreamController<ContinueMessage> _incomingMessages =
      StreamController<ContinueMessage>.broadcast();
  final ValueNotifier<int> activityVersion = ValueNotifier<int>(0);
  final List<String> _recentEvents = <String>[];

  int incomingCount = 0;
  int outgoingCount = 0;
  String? lastIncomingMessageType;
  String? lastOutgoingMessageType;
  String? lastError;

  List<String> get recentEvents => List<String>.unmodifiable(_recentEvents);

  @override
  Stream<ContinueMessage> get incomingMessages => _incomingMessages.stream;

  @override
  Future<void> load() async {}

  void attachPoster(ContinueGuiPoster poster) {
    _poster = poster;
    _logStage('attachPoster', details: 'pending=${_pendingOutgoing.length}');
    for (final message in List<ContinueMessage>.from(_pendingOutgoing)) {
      unawaited(poster(message));
    }
    _pendingOutgoing.clear();
    _bumpActivity();
  }

  void detachPoster() {
    _logStage('detachPoster');
    _poster = null;
    _bumpActivity();
  }

  void handleRawIncomingMessage(String rawMessage) {
    _logStage('incoming/raw', details: 'bytes=${rawMessage.length}');
    try {
      final decoded = jsonDecode(rawMessage);
      final message = _normalizeIncomingMessage(decoded);
      if (message == null) {
        lastError = 'Unsupported incoming payload';
        developer.log(
          'Ignored GUI message because payload shape is unsupported: $rawMessage',
          name: 'ContinueGuiShellPort',
        );
        _bumpActivity();
        return;
      }
      incomingCount += 1;
      lastIncomingMessageType = message.messageType;
      lastError = null;
      _logMessage('incoming/decoded', message);
      _incomingMessages.add(message);
      _bumpActivity();
    } catch (error) {
      lastError = 'Incoming parse error: $error';
      developer.log(
        'Failed to parse GUI message: $error',
        name: 'ContinueGuiShellPort',
      );
      _bumpActivity();
    }
  }

  ContinueMessage? _normalizeIncomingMessage(Object? decoded) {
    if (decoded is! Map) {
      return null;
    }
    final map = decoded.cast<Object?, Object?>();
    final messageType =
        (map['messageType'] ?? map['type'] ?? map['method']) as String?;
    if (messageType == null || messageType.isEmpty) {
      return null;
    }

    final messageIdValue = map['messageId'] ?? map['id'];
    final messageId = messageIdValue is String && messageIdValue.isNotEmpty
        ? messageIdValue
        : '${DateTime.now().microsecondsSinceEpoch}-$messageType';
    final data = map.containsKey('data') ? map['data'] : map['params'];

    return ContinueMessage(
      messageType: messageType,
      messageId: messageId,
      data: data,
    );
  }

  @override
  Future<void> postMessage(ContinueMessage message) async {
    outgoingCount += 1;
    lastOutgoingMessageType = message.messageType;
    lastError = null;
    _logMessage('outgoing/postMessage', message);
    final poster = _poster;
    if (poster == null) {
      _pendingOutgoing.add(message);
      _logStage(
        'outgoing/queued',
        details: 'pending=${_pendingOutgoing.length}',
      );
      _bumpActivity();
      return;
    }
    try {
      await poster(message);
      _bumpActivity();
    } catch (error) {
      lastError = 'Outgoing post error: $error';
      developer.log(
        'Failed to post message to GUI: $error',
        name: 'ContinueGuiShellPort',
      );
      _bumpActivity();
    }
  }

  @override
  Future<void> dispose() async {
    _logStage('dispose');
    detachPoster();
    await _incomingMessages.close();
    activityVersion.dispose();
  }

  String get diagnosticsLabel {
    final incoming = lastIncomingMessageType ?? '-';
    final outgoing = lastOutgoingMessageType ?? '-';
    final error = lastError == null ? '' : ' | err';
    return 'Bridge in:$incoming($incomingCount) out:$outgoing($outgoingCount)$error';
  }

  void _bumpActivity() {
    activityVersion.value = activityVersion.value + 1;
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
    if (_recentEvents.length > 40) {
      _recentEvents.removeRange(0, _recentEvents.length - 40);
    }
    developer.log(
      '[stage=$stage]${details == null ? '' : ' $details'}',
      name: 'ContinueGuiShellPort',
    );
  }
}
