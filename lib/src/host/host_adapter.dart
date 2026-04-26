import '../protocol/continue_message.dart';

abstract class HostAdapter {
  const HostAdapter();

  bool canHandle(String messageType);

  Future<Object?> handle(ContinueMessage message);
}

class CompositeHostAdapter extends HostAdapter {
  const CompositeHostAdapter({required this.delegates});

  final List<HostAdapter> delegates;

  @override
  bool canHandle(String messageType) {
    return delegates.any((delegate) => delegate.canHandle(messageType));
  }

  @override
  Future<Object?> handle(ContinueMessage message) async {
    for (final delegate in delegates) {
      if (delegate.canHandle(message.messageType)) {
        return delegate.handle(message);
      }
    }
    throw UnsupportedError('No host adapter for ${message.messageType}');
  }
}
