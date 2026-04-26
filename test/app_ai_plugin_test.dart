import 'package:app_ai_plugin/app_ai_plugin.dart';
import 'package:app_ai_plugin/app_ai_plugin_method_channel.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:plugin_platform_interface/plugin_platform_interface.dart';

class MockAppAiPluginPlatform
    with MockPlatformInterfaceMixin
    implements AppAiPluginPlatform {
  @override
  Future<String?> getPlatformVersion() => Future.value('42');

  @override
  Future<T?> invokeHostMethod<T>(String method, [Object? arguments]) {
    switch (method) {
      case 'readSecrets':
        return Future.value(
          <String, String>{'OPENAI_API_KEY': 'secret-value'} as T,
        );
      case 'writeSecrets':
        return Future.value(null);
      default:
        return Future.value(arguments as T?);
    }
  }
}

void main() {
  final AppAiPluginPlatform initialPlatform = AppAiPluginPlatform.instance;

  test('$MethodChannelAppAiPlugin is the default instance', () {
    expect(initialPlatform, isInstanceOf<MethodChannelAppAiPlugin>());
  });

  test('getPlatformVersion', () async {
    const appAiPlugin = AppAiPlugin();
    MockAppAiPluginPlatform fakePlatform = MockAppAiPluginPlatform();
    AppAiPluginPlatform.instance = fakePlatform;

    expect(await appAiPlugin.getPlatformVersion(), '42');
  });

  test('invokeHostMethod', () async {
    const appAiPlugin = AppAiPlugin();
    MockAppAiPluginPlatform fakePlatform = MockAppAiPluginPlatform();
    AppAiPluginPlatform.instance = fakePlatform;

    expect(
      await appAiPlugin.invokeHostMethod<String>('echo', 'payload'),
      'payload',
    );
  });

  test('readSecrets', () async {
    const appAiPlugin = AppAiPlugin();
    MockAppAiPluginPlatform fakePlatform = MockAppAiPluginPlatform();
    AppAiPluginPlatform.instance = fakePlatform;

    expect(
      await appAiPlugin.readSecrets(const ['OPENAI_API_KEY']),
      <String, String>{'OPENAI_API_KEY': 'secret-value'},
    );
  });

  test('writeSecrets', () async {
    const appAiPlugin = AppAiPlugin();
    MockAppAiPluginPlatform fakePlatform = MockAppAiPluginPlatform();
    AppAiPluginPlatform.instance = fakePlatform;

    await appAiPlugin.writeSecrets(const {'OPENAI_API_KEY': 'secret-value'});
  });
}
