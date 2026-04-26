// In order to *not* need this ignore, consider extracting the "web" version
// of your plugin as a separate package, instead of inlining it in the same
// package as the core of your plugin.
// ignore: avoid_web_libraries_in_flutter

import 'dart:developer' as developer;

import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:flutter/services.dart';
import 'package:web/web.dart' as web;

import 'app_ai_plugin_platform_interface.dart';

const String _continueTutorialUrl = 'https://continue.dev/walkthrough';

/// A web implementation of the AppAiPluginPlatform of the AppAiPlugin plugin.
class AppAiPluginWeb extends AppAiPluginPlatform {
  /// Constructs a AppAiPluginWeb
  AppAiPluginWeb();

  static void registerWith(Registrar registrar) {
    AppAiPluginPlatform.instance = AppAiPluginWeb();
  }

  /// Returns a [String] containing the version of the platform.
  @override
  Future<String?> getPlatformVersion() async {
    final version = web.window.navigator.userAgent;
    return version;
  }

  @override
  Future<T?> invokeHostMethod<T>(String method, [Object? arguments]) async {
    switch (method) {
      case 'copyText':
        final payload = arguments is Map ? arguments : null;
        final text =
            payload?['text']?.toString() ?? arguments?.toString() ?? '';
        if (text.isNotEmpty) {
          await Clipboard.setData(ClipboardData(text: text));
        }
        return null;
      case 'openUrl':
        final payload = arguments is Map ? arguments : null;
        final rawUrl =
            payload?['url']?.toString() ??
            payload?['path']?.toString() ??
            arguments?.toString() ??
            '';
        if (rawUrl.isNotEmpty) {
          web.window.open(rawUrl, '_blank', 'noopener,noreferrer');
        }
        return null;
      case 'toggleDevTools':
        developer.log(
          'Continue GUI requested log viewer, but Flutter Web does not expose a native logs panel.',
          name: 'AppAiPluginWeb',
        );
        return null;
      case 'showTutorial':
        web.window.open(_continueTutorialUrl, '_blank', 'noopener,noreferrer');
        return null;
      case 'logoutOfControlPlane':
      case 'focusEditor':
      case 'closeSidebar':
      case 'showToast':
      case 'reportError':
        return null;
      default:
        throw UnsupportedError(
          'Host method $method is not available on Flutter Web.',
        );
    }
  }
}
