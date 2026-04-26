import 'dart:async';

import '../protocol/continue_message.dart';
import 'host_adapter.dart';

typedef StaticHostResponseHandler = FutureOr<Object?> Function(Object? data);

class StaticHostAdapter extends HostAdapter {
  const StaticHostAdapter({
    this.responses = const {},
    this.handlers = const {},
  });

  final Map<String, Object?> responses;
  final Map<String, StaticHostResponseHandler> handlers;

  @override
  bool canHandle(String messageType) {
    return responses.containsKey(messageType) || handlers.containsKey(messageType);
  }

  @override
  Future<Object?> handle(ContinueMessage message) async {
    final handler = handlers[message.messageType];
    if (handler != null) {
      return handler(message.data);
    }

    if (responses.containsKey(message.messageType)) {
      return responses[message.messageType];
    }

    throw UnsupportedError('No static host response for ${message.messageType}');
  }
}
