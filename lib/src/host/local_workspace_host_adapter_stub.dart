import '../protocol/continue_message.dart';
import 'host_adapter.dart';

class LocalWorkspaceHostAdapter extends HostAdapter {
  const LocalWorkspaceHostAdapter({
    required this.workspaceDirs,
    this.currentFilePath,
    this.ideName = 'app-ai-plugin',
    this.ideVersion = '0.0.1',
  });

  final List<String> workspaceDirs;
  final String? currentFilePath;
  final String ideName;
  final String ideVersion;

  @override
  bool canHandle(String messageType) {
    return false;
  }

  @override
  Future<Object?> handle(ContinueMessage message) {
    throw UnsupportedError(
      'LocalWorkspaceHostAdapter is only available on platforms with dart:io.',
    );
  }
}
