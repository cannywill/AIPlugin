## 0.0.1

Initial preview release.

* `ContinueShellController` routing host vs core messages over the Continue
  protocol.
* `ContinueGuiShellPort` + `ContinueGuiWebView` for embedding the upstream
  Continue React GUI inside a Flutter `WebView`.
* `MockContinueCoreTransport` for in-memory development; `ProcessCoreTransport`
  for the real Continue binary subprocess (desktop only).
* `HostAdapter` impls: `ChannelBackedHostAdapter`, `LocalWorkspaceHostAdapter`,
  `StaticHostAdapter`, plus `CompositeHostAdapter`.
* Native method-channel implementations:
  * Android: `Toast`, Intent-based `openUrl`, `EncryptedSharedPreferences` for
    secret storage with a `SharedPreferences` fallback.
  * iOS: `UIApplication.open`, transient `UIAlertController` toast, Keychain
    for secrets.
  * macOS: `NSWorkspace.open`, alert-style toast, Keychain for secrets.
* Reusable Flutter UI: `AppAiShell`, `AppAiSessionSidebar`,
  `AppAiChatTimeline`, `AppAiChatComposer`, `AppAiContinueReusePane`.
