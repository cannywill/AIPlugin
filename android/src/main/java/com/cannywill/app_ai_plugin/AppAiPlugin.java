package com.cannywill.app_ai_plugin;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKey;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.flutter.embedding.engine.plugins.FlutterPlugin;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;

/** AppAiPlugin */
public class AppAiPlugin implements FlutterPlugin, MethodCallHandler {
  private static final String CHANNEL_NAME = "app_ai_plugin";
  private static final String SECRET_STORE_NAME = "app_ai_plugin_secrets";
  private static final String TAG = "AppAiPlugin";
  private static final String CONTINUE_TUTORIAL_URL = "https://continue.dev/walkthrough";
  private static final String DEVTOOLS_HINT =
      "Continue 日志面板暂未映射到 Flutter 原生宿主，请查看 Flutter 调试控制台或原生日志。";

  private MethodChannel channel;
  private Context applicationContext;
  private SharedPreferences secretsStore;

  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding flutterPluginBinding) {
    applicationContext = flutterPluginBinding.getApplicationContext();
    channel = new MethodChannel(flutterPluginBinding.getBinaryMessenger(), CHANNEL_NAME);
    channel.setMethodCallHandler(this);
  }

  @Override
  public void onMethodCall(@NonNull MethodCall call, @NonNull Result result) {
    try {
      switch (call.method) {
        case "getPlatformVersion":
          result.success("Android " + Build.VERSION.RELEASE);
          return;
        case "openUrl":
          openUrl(call.arguments, result);
          return;
        case "copyText":
          copyText(call.arguments, result);
          return;
        case "showToast":
          showToast(call.arguments, result);
          return;
        case "readSecrets":
          result.success(readSecrets(call.arguments));
          return;
        case "writeSecrets":
          writeSecrets(call.arguments);
          result.success(null);
          return;
        case "reportError":
          Log.e(TAG, stringifyArgument(call.arguments));
          result.success(null);
          return;
        case "focusEditor":
          result.success(null);
          return;
        case "toggleDevTools":
          toggleDevTools(result);
          return;
        case "showTutorial":
          showTutorial(result);
          return;
        case "logoutOfControlPlane":
          logoutOfControlPlane(result);
          return;
        case "closeSidebar":
          result.success(null);
          return;
        default:
          result.notImplemented();
      }
    } catch (Exception exception) {
      result.error("native_error", exception.getMessage(), null);
    }
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {
    if (channel != null) {
      channel.setMethodCallHandler(null);
      channel = null;
    }
    applicationContext = null;
    secretsStore = null;
  }

  private void openUrl(Object arguments, Result result) {
    String rawUrl = extractUrl(arguments);
    if (rawUrl == null || rawUrl.isEmpty()) {
      result.error("invalid_url", "openUrl requires a non-empty url string.", null);
      return;
    }
    if (applicationContext == null) {
      result.error("unavailable", "Application context is unavailable.", null);
      return;
    }

    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(rawUrl));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    if (intent.resolveActivity(applicationContext.getPackageManager()) == null) {
      result.error("unavailable", "No activity found to open url.", null);
      return;
    }

    applicationContext.startActivity(intent);
    result.success(null);
  }

  private void copyText(Object arguments, Result result) {
    final String message = extractMessage(arguments);
    if (message == null || applicationContext == null) {
      result.success(null);
      return;
    }

    ClipboardManager clipboard =
        (ClipboardManager) applicationContext.getSystemService(Context.CLIPBOARD_SERVICE);
    if (clipboard != null) {
      clipboard.setPrimaryClip(ClipData.newPlainText("text", message));
    }
    result.success(null);
  }

  private void showToast(Object arguments, Result result) {
    final String message = extractMessage(arguments);
    if (message == null || message.isEmpty() || applicationContext == null) {
      result.success(null);
      return;
    }

    new Handler(Looper.getMainLooper())
        .post(() -> Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show());
    result.success(null);
  }


  // 功能：在 Android 原生宿主里提示日志查看入口。
  // 说明：Flutter 版当前还没有真正的 Continue 日志面板，这里先给出可操作提示。
  private void toggleDevTools(Result result) {
    Log.i(TAG, DEVTOOLS_HINT);
    if (applicationContext != null) {
      new Handler(Looper.getMainLooper())
          .post(() -> Toast.makeText(applicationContext, DEVTOOLS_HINT, Toast.LENGTH_SHORT).show());
    }
    result.success(null);
  }

  // 功能：打开 Continue 官方 walkthrough 作为 Flutter 版教程入口。
  private void showTutorial(Result result) {
    openUrl(CONTINUE_TUTORIAL_URL, result);
  }

  // 功能：接住 GUI 发来的退出控制平面请求。
  // 说明：当前 Flutter 版尚未落地独立控制平面会话，所以这里只做幂等成功返回。
  private void logoutOfControlPlane(Result result) {
    Log.i(TAG, "logoutOfControlPlane requested, but no native control-plane session is stored.");
    result.success(null);
  }

  private Map<String, String> readSecrets(Object arguments) throws Exception {
    List<String> keys = extractKeys(arguments);
    if (keys.isEmpty()) {
      return Collections.emptyMap();
    }

    SharedPreferences store = getSecretsStore();
    Map<String, String> output = new HashMap<>();
    for (String key : keys) {
      String value = store.getString(key, null);
      if (value != null) {
        output.put(key, value);
      }
    }
    return output;
  }

  private void writeSecrets(Object arguments) throws Exception {
    Map<String, Object> secrets = extractSecrets(arguments);
    SharedPreferences.Editor editor = getSecretsStore().edit();
    for (Map.Entry<String, Object> entry : secrets.entrySet()) {
      Object value = entry.getValue();
      if (value == null) {
        editor.remove(entry.getKey());
      } else {
        editor.putString(entry.getKey(), value.toString());
      }
    }
    editor.apply();
  }

  private SharedPreferences getSecretsStore() throws Exception {
    if (secretsStore != null) {
      return secretsStore;
    }

    if (applicationContext == null) {
      throw new IllegalStateException("Application context is unavailable.");
    }

    try {
      MasterKey masterKey =
          new MasterKey.Builder(applicationContext)
              .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
              .build();
      secretsStore =
          EncryptedSharedPreferences.create(
              applicationContext,
              SECRET_STORE_NAME,
              masterKey,
              EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
              EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM);
    } catch (GeneralSecurityException | IOException exception) {
      Log.w(TAG, "Falling back to SharedPreferences for secrets storage.", exception);
      secretsStore = applicationContext.getSharedPreferences(
          SECRET_STORE_NAME + "_fallback",
          Context.MODE_PRIVATE
      );
    }

    return secretsStore;
  }

  private String extractUrl(Object arguments) {
    if (arguments instanceof String) {
      return (String) arguments;
    }
    if (arguments instanceof Map<?, ?>) {
      Map<?, ?> map = (Map<?, ?>) arguments;
      Object url = map.get("url");
      if (url instanceof String) {
        return (String) url;
      }
      Object path = map.get("path");
      if (path instanceof String) {
        return (String) path;
      }
    }
    return null;
  }

  private String extractMessage(Object arguments) {
    if (arguments instanceof String) {
      return (String) arguments;
    }
    if (arguments instanceof List<?>) {
      List<?> list = (List<?>) arguments;
      if (list.size() >= 2 && list.get(1) != null) {
        return list.get(1).toString();
      }
      if (!list.isEmpty() && list.get(0) != null) {
        return list.get(0).toString();
      }
    }
    if (arguments instanceof Map<?, ?>) {
      Map<?, ?> map = (Map<?, ?>) arguments;
      Object message = map.get("message");
      if (message != null) {
        return message.toString();
      }
    }
    return null;
  }

  private List<String> extractKeys(Object arguments) {
    if (!(arguments instanceof Map<?, ?>)) {
      return Collections.emptyList();
    }
    Map<?, ?> map = (Map<?, ?>) arguments;
    Object keys = map.get("keys");
    if (!(keys instanceof List<?>)) {
      return Collections.emptyList();
    }

    List<?> list = (List<?>) keys;
    List<String> output = new ArrayList<>();
    for (Object item : list) {
      if (item != null) {
        output.add(item.toString());
      }
    }
    return output;
  }

  private Map<String, Object> extractSecrets(Object arguments) {
    if (!(arguments instanceof Map<?, ?>)) {
      return Collections.emptyMap();
    }
    Map<?, ?> map = (Map<?, ?>) arguments;
    Object secrets = map.get("secrets");
    if (!(secrets instanceof Map<?, ?>)) {
      return Collections.emptyMap();
    }

    Map<?, ?> rawSecrets = (Map<?, ?>) secrets;
    Map<String, Object> output = new HashMap<>();
    for (Map.Entry<?, ?> entry : rawSecrets.entrySet()) {
      if (entry.getKey() != null) {
        output.put(entry.getKey().toString(), entry.getValue());
      }
    }
    return output;
  }

  private String stringifyArgument(Object argument) {
    return argument == null ? "null" : argument.toString();
  }
}
