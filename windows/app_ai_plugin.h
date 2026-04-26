#ifndef FLUTTER_PLUGIN_APP_AI_PLUGIN_H_
#define FLUTTER_PLUGIN_APP_AI_PLUGIN_H_

#include <flutter/method_channel.h>
#include <flutter/plugin_registrar_windows.h>

#include <memory>

namespace app_ai_plugin {

class AppAiPlugin : public flutter::Plugin {
 public:
  static void RegisterWithRegistrar(flutter::PluginRegistrarWindows *registrar);

  AppAiPlugin();

  virtual ~AppAiPlugin();

  // Disallow copy and assign.
  AppAiPlugin(const AppAiPlugin&) = delete;
  AppAiPlugin& operator=(const AppAiPlugin&) = delete;

  // Called when a method is called on this plugin's channel from Dart.
  void HandleMethodCall(
      const flutter::MethodCall<flutter::EncodableValue> &method_call,
      std::unique_ptr<flutter::MethodResult<flutter::EncodableValue>> result);
};

}  // namespace app_ai_plugin

#endif  // FLUTTER_PLUGIN_APP_AI_PLUGIN_H_
