import Flutter
import Security
import UIKit

public class AppAiPlugin: NSObject, FlutterPlugin {
  private static let channelName = "app_ai_plugin"
  private static let keychainService = "com.cannywill.app_ai_plugin.secrets"
  private static let continueTutorialUrl = "https://continue.dev/walkthrough"
  private static let devToolsHint = "Continue 日志面板暂未映射到 Flutter 原生宿主，请查看 Flutter 调试控制台或原生日志。"

  public static func register(with registrar: FlutterPluginRegistrar) {
    let channel = FlutterMethodChannel(name: channelName, binaryMessenger: registrar.messenger())
    let instance = AppAiPlugin()
    registrar.addMethodCallDelegate(instance, channel: channel)
  }

  public func handle(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
    switch call.method {
    case "getPlatformVersion":
      result("iOS " + UIDevice.current.systemVersion)
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
      UIApplication.shared.open(url, options: [:]) { success in
        if success {
          result(nil)
        } else {
          result(FlutterError(code: "open_failed", message: "Unable to open url.", details: rawUrl))
        }
      }
    }
  }

  private func copyText(_ arguments: Any?) {
    guard let message = extractMessage(arguments) else {
      return
    }

    DispatchQueue.main.async {
      UIPasteboard.general.string = message
    }
  }

  private func showToast(_ arguments: Any?) {
    guard let message = extractMessage(arguments), !message.isEmpty else {
      return
    }

    DispatchQueue.main.async {
      guard let viewController = self.topViewController() else {
        return
      }

      let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
      viewController.present(alert, animated: true)
      DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
        alert.dismiss(animated: true)
      }
    }
  }


  /// 功能：在 iOS 原生宿主里提示日志查看方式。
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
    var query = keychainQuery(for: key)
    query[kSecReturnData as String] = true
    query[kSecMatchLimit as String] = kSecMatchLimitOne

    var result: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &result)
    guard status == errSecSuccess, let data = result as? Data else {
      return nil
    }
    return String(data: data, encoding: .utf8)
  }

  private func writeKeychainValue(_ value: String, for key: String) {
    let data = Data(value.utf8)
    let query = keychainQuery(for: key)
    let attributes = [kSecValueData as String: data]
    let updateStatus = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)

    if updateStatus == errSecItemNotFound {
      var item = query
      item[kSecValueData as String] = data
      SecItemAdd(item as CFDictionary, nil)
    }
  }

  private func deleteKeychainValue(for key: String) {
    SecItemDelete(keychainQuery(for: key) as CFDictionary)
  }

  private func keychainQuery(for key: String) -> [String: Any] {
    [
      kSecClass as String: kSecClassGenericPassword,
      kSecAttrService as String: Self.keychainService,
      kSecAttrAccount as String: key,
    ]
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

  private func topViewController() -> UIViewController? {
    let root = UIApplication.shared.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap { $0.windows }
      .first(where: { $0.isKeyWindow })?
      .rootViewController
    return topViewController(from: root)
  }

  private func topViewController(from controller: UIViewController?) -> UIViewController? {
    if let navigation = controller as? UINavigationController {
      return topViewController(from: navigation.visibleViewController)
    }
    if let tab = controller as? UITabBarController {
      return topViewController(from: tab.selectedViewController)
    }
    if let presented = controller?.presentedViewController {
      return topViewController(from: presented)
    }
    return controller
  }
}
