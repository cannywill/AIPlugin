import '../../app_ai_plugin_platform_interface.dart';

class AppAiPlugin {
  const AppAiPlugin();

  Future<String?> getPlatformVersion() {
    return AppAiPluginPlatform.instance.getPlatformVersion();
  }

  Future<T?> invokeHostMethod<T>(String method, [Object? arguments]) {
    return AppAiPluginPlatform.instance.invokeHostMethod<T>(method, arguments);
  }

  Future<Map<String, String>> readSecrets(Iterable<String> keys) async {
    final response = await invokeHostMethod<Object?>('readSecrets', {
      'keys': keys.toList(growable: false),
    });
    if (response is! Map) {
      return const <String, String>{};
    }

    return response.map(
      (key, value) => MapEntry(key.toString(), value?.toString() ?? ''),
    );
  }

  Future<void> writeSecrets(Map<String, String?> secrets) async {
    await invokeHostMethod<void>('writeSecrets', {'secrets': secrets});
  }
}
