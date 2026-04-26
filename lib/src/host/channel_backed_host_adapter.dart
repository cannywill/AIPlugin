import '../../app_ai_plugin_platform_interface.dart';
import '../protocol/continue_message.dart';
import 'host_adapter.dart';

typedef AppAiHostInvoker =
    Future<Object?> Function(String method, Object? arguments);

class ChannelBackedHostAdapter extends HostAdapter {
  ChannelBackedHostAdapter({AppAiHostInvoker? invoker}) : _invoker = invoker;

  final AppAiHostInvoker? _invoker;

  @override
  bool canHandle(String messageType) {
    return const {
      'readSecrets',
      'writeSecrets',
      'runCommand',
      'openUrl',
      'copyText',
      'showToast',
      'focusEditor',
      'toggleDevTools',
      'showTutorial',
      'logoutOfControlPlane',
      'reportError',
      'closeSidebar',
    }.contains(messageType);
  }

  @override
  Future<Object?> handle(ContinueMessage message) {
    final invoker =
        _invoker ?? AppAiPluginPlatform.instance.invokeHostMethod<Object?>;
    return invoker(message.messageType, message.data);
  }
}
