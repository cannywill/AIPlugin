import Cocoa
import FlutterMacOS

public class AppAiPlugin: NSObject, FlutterPlugin {
  private static let channelName = "app_ai_plugin"
  // macOS 上把 secret 持久化为应用支持目录下的 JSON 文件（权限 0600），
  // 而不是写 Keychain。Keychain 在 debug 构建里每次签名都会变，导致反复弹
  // "想要使用你存储在钥匙串中的机密信息" 对话框；改成文件后免弹窗，仍持久化。
  // iOS 端依然走 Keychain（重装频率低，且是 iOS 原生推荐做法）。
  private static let secretsFileName = "secrets.json"
  private static let secretsBundleFallback = "com.cannywill.app_ai_plugin"
  private static let continueTutorialUrl = "https://continue.dev/walkthrough"
  private static let devToolsHint = "Continue 日志面板暂未映射到 Flutter 原生宿主，请查看 Flutter 调试控制台或原生日志。"

  public static func register(with registrar: FlutterPluginRegistrar) {
    let channel = FlutterMethodChannel(name: channelName, binaryMessenger: registrar.messenger)
    let instance = AppAiPlugin()
    registrar.addMethodCallDelegate(instance, channel: channel)
  }

  public func handle(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
    switch call.method {
    case "getPlatformVersion":
      result("macOS " + ProcessInfo.processInfo.operatingSystemVersionString)
    case "openUrl":
      handleOpenUrl(call.arguments, result: result)
    case "copyText":
      copyText(call.arguments)
      result(nil)
    case "showToast":
      showToast(call.arguments)
      result(nil)
    case "readSecrets":
      result(readSecrets(call.arguments))
    case "writeSecrets":
      writeSecrets(call.arguments)
      result(nil)
    case "reportError":
      NSLog("[AppAiPlugin] %@", String(describing: call.arguments))
      result(nil)
    case "focusEditor":
      result(nil)
    case "toggleDevTools":
      toggleDevTools()
      result(nil)
    case "showTutorial":
      handleOpenUrl(Self.continueTutorialUrl, result: result)
    case "logoutOfControlPlane":
      logoutOfControlPlane()
      result(nil)
    case "closeSidebar":
      result(nil)
    default:
      result(FlutterMethodNotImplemented)
    }
  }

  private func handleOpenUrl(_ arguments: Any?, result: @escaping FlutterResult) {
    guard let rawUrl = extractUrl(arguments), let url = URL(string: rawUrl) else {
      result(FlutterError(code: "invalid_url", message: "openUrl requires a non-empty url string.", details: nil))
      return
    }

    DispatchQueue.main.async {
      let success = NSWorkspace.shared.open(url)
      if success {
        result(nil)
      } else {
        result(FlutterError(code: "open_failed", message: "Unable to open url.", details: rawUrl))
      }
    }
  }

  private func copyText(_ arguments: Any?) {
    guard let message = extractMessage(arguments) else {
      return
    }

    DispatchQueue.main.async {
      NSPasteboard.general.clearContents()
      NSPasteboard.general.setString(message, forType: .string)
    }
  }

  private func showToast(_ arguments: Any?) {
    guard let message = extractMessage(arguments), !message.isEmpty else {
      return
    }

    DispatchQueue.main.async {
      let alert = NSAlert()
      alert.messageText = message
      alert.alertStyle = .informational
      alert.addButton(withTitle: "OK")

      if let window = NSApp.keyWindow ?? NSApp.mainWindow {
        alert.beginSheetModal(for: window, completionHandler: nil)
      } else {
        alert.runModal()
      }
    }
  }


  /// 功能：在 macOS 原生宿主里提示日志查看方式。
  /// 说明：Flutter 版当前还没有真正的 Continue 日志面板，这里先给出提示并打印系统日志。
  private func toggleDevTools() {
    NSLog("[AppAiPlugin] %@", Self.devToolsHint)
    showToast(Self.devToolsHint)
  }

  /// 功能：处理 GUI 发来的控制平面退出请求。
  /// 说明：当前 Flutter 版还没有独立控制平面会话，所以这里只做幂等日志记录。
  private func logoutOfControlPlane() {
    NSLog("[AppAiPlugin] logoutOfControlPlane requested, but no native control-plane session is stored.")
  }

  private func readSecrets(_ arguments: Any?) -> [String: String] {
    guard
      let payload = arguments as? [String: Any],
      let keys = payload["keys"] as? [Any]
    else {
      return [:]
    }

    var secrets: [String: String] = [:]
    for keyValue in keys {
      guard let key = keyValue as? String else {
        continue
      }
      if let value = readKeychainValue(for: key) {
        secrets[key] = value
      }
    }
    return secrets
  }

  private func writeSecrets(_ arguments: Any?) {
    guard
      let payload = arguments as? [String: Any],
      let secrets = payload["secrets"] as? [String: Any]
    else {
      return
    }

    for (key, value) in secrets {
      if let stringValue = value as? String {
        writeKeychainValue(stringValue, for: key)
      } else {
        deleteKeychainValue(for: key)
      }
    }
  }

  private func readKeychainValue(for key: String) -> String? {
    return Self.loadSecretsFile()[key]
  }

  private func writeKeychainValue(_ value: String, for key: String) {
    var stored = Self.loadSecretsFile()
    stored[key] = value
    Self.saveSecretsFile(stored)
  }

  private func deleteKeychainValue(for key: String) {
    var stored = Self.loadSecretsFile()
    if stored.removeValue(forKey: key) != nil {
      Self.saveSecretsFile(stored)
    }
  }

  /// secrets.json 路径：~/Library/Application Support/<bundleId>/secrets.json
  /// 返回 nil 表示既不能定位也无法创建目录（极少见，比如磁盘只读）。
  private static func secretsFileURL() -> URL? {
    let fm = FileManager.default
    guard let baseDir = fm.urls(for: .applicationSupportDirectory, in: .userDomainMask).first else {
      return nil
    }
    let bundleId = Bundle.main.bundleIdentifier ?? Self.secretsBundleFallback
    let dir = baseDir.appendingPathComponent(bundleId, isDirectory: true)
    if !fm.fileExists(atPath: dir.path) {
      do {
        try fm.createDirectory(at: dir, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
      } catch {
        NSLog("[AppAiPlugin] failed to create secrets dir: %@", String(describing: error))
        return nil
      }
    }
    return dir.appendingPathComponent(Self.secretsFileName)
  }

  private static func loadSecretsFile() -> [String: String] {
    guard let url = secretsFileURL() else { return [:] }
    guard let data = try? Data(contentsOf: url) else { return [:] }
    guard
      let object = try? JSONSerialization.jsonObject(with: data),
      let dict = object as? [String: String]
    else {
      return [:]
    }
    return dict
  }

  private static func saveSecretsFile(_ secrets: [String: String]) {
    guard let url = secretsFileURL() else { return }
    do {
      let data = try JSONSerialization.data(withJSONObject: secrets, options: [.prettyPrinted, .sortedKeys])
      try data.write(to: url, options: .atomic)
      // 0600 — 仅当前用户可读写。
      try FileManager.default.setAttributes([.posixPermissions: 0o600], ofItemAtPath: url.path)
    } catch {
      NSLog("[AppAiPlugin] failed to write secrets: %@", String(describing: error))
    }
  }

  private func extractUrl(_ arguments: Any?) -> String? {
    if let string = arguments as? String {
      return string
    }
    if let payload = arguments as? [String: Any] {
      return payload["url"] as? String ?? payload["path"] as? String
    }
    return nil
  }

  private func extractMessage(_ arguments: Any?) -> String? {
    if let string = arguments as? String {
      return string
    }
    if let items = arguments as? [Any] {
      if items.count >= 2, let message = items[1] as? String {
        return message
      }
      if let message = items.first as? String {
        return message
      }
    }
    if let payload = arguments as? [String: Any] {
      return payload["message"] as? String
    }
    return nil
  }
}
