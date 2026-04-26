import '../protocol/continue_message.dart';

abstract class CoreTransport {
  Stream<ContinueMessage> get messages;

  bool get isConnected;

  Future<void> start();

  Future<void> send(ContinueMessage message);

  Future<void> dispose();
}
