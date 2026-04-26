# app_ai_plugin

Flutter plugin scaffold for a Continue-style AI plugin shell.

## What is in this package

- Plugin bridge API
  - `AppAiPlugin`
  - `AppAiPluginPlatform`
  - `MethodChannelAppAiPlugin`
- Continue-compatible shell primitives
  - `ContinueMessage`
  - `ContinueShellController`
  - `HostAdapter`
  - `CoreTransport`
- Reusable Flutter UI
  - `AppAiShell`
  - `AppAiSessionSidebar`
  - `AppAiChatTimeline`
  - `AppAiChatComposer`
  - `AppAiContinueReusePane`

## Public entrypoints

- `package:app_ai_plugin/app_ai_plugin.dart`
- `package:app_ai_plugin/app_ai_plugin_ui.dart`

## Structure

```text
lib/
  app_ai_plugin.dart
  app_ai_plugin_ui.dart
  src/
    app/
    host/
    plugin/
    protocol/
    transport/
    ui/
```

## Continue GUI reuse

The reusable Flutter shell intentionally keeps a `reuseGuiChild` slot.
That slot is where you can mount a WebView and progressively reuse Continue's
existing GUI instead of rewriting everything at once.

This package now includes:

- `ContinueGuiSource`
- `ContinueGuiShellPort`
- `ContinueGuiWebView`

## Running with Continue GUI

### Recommended: vendor the GUI inside the plugin repo

The Continue GUI source is now vendored under:

```text
/Users/linzhibin/Desktop/code/AppAIPlugin/libs/gui
```

The Continue core source is now vendored under:

```text
/Users/linzhibin/Desktop/code/AppAIPlugin/libs/core
```

The example app will look for `../libs/gui/dist` by default on desktop, so after a local build you can launch the example without passing `CONTINUE_GUI_DIST`.

Build the vendored GUI:

```bash
cd /Users/linzhibin/Desktop/code/AppAIPlugin/libs/gui
npm install
npm run build
```

Then run the Flutter example:

```bash
cd /Users/linzhibin/Desktop/code/AppAIPlugin/example
flutter run -d macos
```

### Option 1: Reuse a vendored Vite dev server

```bash
cd /Users/linzhibin/Desktop/code/AppAIPlugin/libs/gui
npm run dev

cd /Users/linzhibin/Desktop/code/AppAIPlugin/example
flutter run -d macos --dart-define=CONTINUE_GUI_URL=http://127.0.0.1:5173
```

### Option 2: Override the built bundle path manually

```bash
cd /Users/linzhibin/Desktop/code/AppAIPlugin/example
flutter run -d macos --dart-define=CONTINUE_GUI_DIST=/absolute/path/to/gui/dist
```

The plugin starts a local static server and loads the built `index.html` through WebView.

For local development, keeping the source and dist together under `libs/gui` is the cleanest setup. If you later want a fully self-contained distributable app, the next step is to copy the built dist into Flutter-managed assets or extract it into an app-managed runtime directory during packaging.

## Example

The example app now demonstrates:

- componentized shell UI
- session sidebar
- chat timeline
- composer
- a placeholder pane for Continue GUI WebView reuse
- direct Continue GUI WebView reuse when `CONTINUE_GUI_URL` or
  `CONTINUE_GUI_DIST` is provided

## Continue GUI Demo Bridge

When `example/lib/main.dart` mounts `ContinueGuiWebView`, it also starts a demo shell bridge:

- `createContinueGuiDemoHostAdapter()` handles IDE-style requests such as `getWorkspaceDirs`, `getCurrentFile`, and `getControlPlaneSessionInfo`
- `createContinueGuiDemoCoreTransport()` responds to core requests such as `config/getSerializedProfileInfo`, `history/list`, and `llm/streamChat`

This lets the reused Continue GUI render inside Flutter before wiring the real Continue binary and host method bridge.

## Real Continue Binary Bridge

The plugin now supports a desktop subprocess transport that talks to the real Continue binary over `stdin/stdout`, matching `binary/src/index.ts` in the upstream Continue repository.

You can switch the example app from demo mode to real binary mode with `dart-define` values:

```bash
flutter run \
  --dart-define=CONTINUE_GUI_DIST=/absolute/path/to/AppAIPlugin/libs/gui/dist \
  --dart-define=CONTINUE_BINARY_EXECUTABLE=/absolute/path/to/continue-main/binary/bin/darwin-arm64/continue-binary \
  --dart-define=CONTINUE_WORKSPACE_DIR=/absolute/path/to/AppAIPlugin/libs/core
```

For desktop integration this uses:

- `ProcessCoreTransport` for the Continue binary subprocess
- `LocalWorkspaceHostAdapter` for workspace/file IDE-style requests
- `ChannelBackedHostAdapter` for native host actions such as `openUrl` and `showToast`

If `CONTINUE_BINARY_EXECUTABLE` is omitted, the example keeps using the demo bridge.

## Native Host Methods

`ChannelBackedHostAdapter` is now backed by native platform implementations for:

- `openUrl`
- `showToast`
- `readSecrets`
- `writeSecrets`
- `reportError`
- `closeSidebar`

Current behavior by platform:

- Android: `openUrl` uses `Intent.ACTION_VIEW`, `showToast` uses native `Toast`, secrets use `EncryptedSharedPreferences` with a SharedPreferences fallback
- iOS: `openUrl` uses `UIApplication.shared.open`, `showToast` uses a transient `UIAlertController`, secrets use Keychain
- macOS: `openUrl` uses `NSWorkspace.shared.open`, `showToast` uses an alert-style native presentation, secrets use Keychain
