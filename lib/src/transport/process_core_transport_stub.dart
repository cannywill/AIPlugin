import '../protocol/continue_message.dart';
import 'core_transport.dart';

class ProcessCoreTransport implements CoreTransport {
  ProcessCoreTransport({
    required this.executablePath,
    this.arguments = const [],
    this.workingDirectory,
    this.environment = const {},
  });

  final String executablePath;
  final List<String> arguments;
  final String? workingDirectory;
  final Map<String, String> environment;

  @override
  Stream<ContinueMessage> get messages => const Stream<ContinueMessage>.empty();

  @override
  bool get isConnected => false;

  @override
  Future<void> start() {
    throw UnsupportedError(
      'ProcessCoreTransport is only available on platforms with dart:io.',
    );
  }

  @override
  Future<void> send(ContinueMessage message) {
    throw UnsupportedError(
      'ProcessCoreTransport is only available on platforms with dart:io.',
    );
  }

  @override
  Future<void> dispose() async {}
}
