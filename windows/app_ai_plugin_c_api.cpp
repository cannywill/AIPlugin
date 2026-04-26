#include "include/app_ai_plugin/app_ai_plugin_c_api.h"

#include <flutter/plugin_registrar_windows.h>

#include "app_ai_plugin.h"

void AppAiPluginCApiRegisterWithRegistrar(
    FlutterDesktopPluginRegistrarRef registrar) {
  app_ai_plugin::AppAiPlugin::RegisterWithRegistrar(
      flutter::PluginRegistrarManager::GetInstance()
          ->GetRegistrar<flutter::PluginRegistrarWindows>(registrar));
}
