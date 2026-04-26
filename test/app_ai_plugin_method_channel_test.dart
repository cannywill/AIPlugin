import 'package:app_ai_plugin/app_ai_plugin_method_channel.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  MethodChannelAppAiPlugin platform = MethodChannelAppAiPlugin();
  const MethodChannel channel = MethodChannel('app_ai_plugin');

  setUp(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, (MethodCall methodCall) async {
          if (methodCall.method == 'readSecrets') {
            return <String, String>{'OPENAI_API_KEY': 'secret-value'};
          }
          return '42';
        });
  });

  tearDown(() {
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger
        .setMockMethodCallHandler(channel, null);
  });

  test('getPlatformVersion', () async {
    expect(await platform.getPlatformVersion(), '42');
  });

  test('invokeHostMethod', () async {
    expect(await platform.invokeHostMethod<String>('echo', 'payload'), '42');
  });

  test('invokeHostMethod supports maps', () async {
    expect(
      await platform.invokeHostMethod<Map<dynamic, dynamic>>('readSecrets', {
        'keys': const ['OPENAI_API_KEY'],
      }),
      <String, String>{'OPENAI_API_KEY': 'secret-value'},
    );
  });
}
