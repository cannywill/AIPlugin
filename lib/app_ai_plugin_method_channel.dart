import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import 'app_ai_plugin_platform_interface.dart';

/// An implementation of [AppAiPluginPlatform] that uses method channels.
class MethodChannelAppAiPlugin extends AppAiPluginPlatform {
  /// The method channel used to interact with the native platform.
  @visibleForTesting
  final methodChannel = const MethodChannel('app_ai_plugin');

  @override
  Future<String?> getPlatformVersion() async {
    final version = await methodChannel.invokeMethod<String>(
      'getPlatformVersion',
    );
    return version;
  }

  @override
  Future<T?> invokeHostMethod<T>(String method, [Object? arguments]) {
    return methodChannel.invokeMethod<T>(method, arguments);
  }
}
