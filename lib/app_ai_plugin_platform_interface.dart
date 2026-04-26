import 'package:plugin_platform_interface/plugin_platform_interface.dart';

import 'app_ai_plugin_method_channel.dart';

abstract class AppAiPluginPlatform extends PlatformInterface {
  /// Constructs a AppAiPluginPlatform.
  AppAiPluginPlatform() : super(token: _token);

  static final Object _token = Object();

  static AppAiPluginPlatform _instance = MethodChannelAppAiPlugin();

  /// The default instance of [AppAiPluginPlatform] to use.
  ///
  /// Defaults to [MethodChannelAppAiPlugin].
  static AppAiPluginPlatform get instance => _instance;

  /// Platform-specific implementations should set this with their own
  /// platform-specific class that extends [AppAiPluginPlatform] when
  /// they register themselves.
  static set instance(AppAiPluginPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }

  Future<String?> getPlatformVersion() {
    throw UnimplementedError('platformVersion() has not been implemented.');
  }

  Future<T?> invokeHostMethod<T>(String method, [Object? arguments]) {
    throw UnimplementedError('invokeHostMethod() has not been implemented.');
  }
}
