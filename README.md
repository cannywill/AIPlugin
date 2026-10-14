# app_ai_plugin

[![pub package](https://img.shields.io/pub/v/app_ai_plugin.svg)](https://pub.dev/packages/app_ai_plugin)

Flutter plugin shell that hosts the [Continue](https://github.com/continuedev/continue)
GUI inside a WebView and routes its host/core protocol to Dart adapters and a
native Continue binary subprocess.

> **Status:** early preview. APIs may change in 0.x releases.

## What this package gives you

- **Continue GUI in a WebView** — load a built Continue GUI bundle (`dist/`)
  from disk or a Vite dev server URL, with the postMessage bridge wired.
- **Protocol layer** — `ContinueShellController` routes incoming
  `ContinueMessage`s to either a `HostAdapter` (IDE-style requests) or a
  `CoreTransport` (LLM / config / history requests).
- **Transports**
  - `MockContinueCoreTransport` — in-memory fake for development; lets the GUI
    render and stream replies without launching the real Continue binary.
  - `ProcessCoreTransport` — spawns the upstream Continue binary and speaks
    JSON over stdin/stdout (desktop only).
- **Host adapters** for workspace reads, IDE-info responses, and native bridges
  (`openUrl`, `showToast`, `readSecrets` / `writeSecrets`).
- **Native plumbing** — Method-channel implementations on Android (Toast +
  `EncryptedSharedPreferences`), iOS / macOS (Keychain + `NSWorkspace` /
  `UIApplication`).

## Supported platforms

| Platform | Webview | Native host methods |
|---|---|---|
| macOS    | ✅ | Keychain / NSWorkspace |
| iOS      | ✅ | Keychain / UIApplication |
| Android  | ✅ | EncryptedSharedPreferences / Intent |

Linux, Windows and Web are out of scope for this release.

## Install

```yaml
dependencies:
  app_ai_plugin: ^0.0.1
```

## Quick start

The package does **not** bundle the Continue GUI dist or the Continue binary —
both are large native artifacts you wire up at runtime. The recommended setup:

1. **Build the Continue GUI** somewhere on disk and note the path to its
   `dist/` directory (this is a vanilla Vite build of the upstream
   [Continue GUI](https://github.com/continuedev/continue/tree/main/gui)).
2. **Download or build a Continue binary** for your target platform.
   This repo can now build its own local binary from vendored `libs/core`:

```bash
./scripts/build_local_continue_binary.sh
```

   On Apple Silicon Macs the output path is usually:
   `/abs/path/to/AppAIPlugin/binary/bin/darwin-arm64/continue-binary`
3. **Pass paths via `--dart-define`** when launching your Flutter app:

```bash
flutter run -d macos \
  --dart-define=CONTINUE_GUI_DIST=/abs/path/to/gui/dist \
  --dart-define=CONTINUE_BINARY_EXECUTABLE=/abs/path/to/continue-binary \
  --dart-define=CONTINUE_WORKSPACE_DIR=/abs/path/to/your/project
```

If you omit `CONTINUE_BINARY_EXECUTABLE` the example falls back to a fully
in-memory demo transport — useful for UI work, but no real LLM calls happen.

## Minimal usage

```dart
import 'package:app_ai_plugin/app_ai_plugin.dart';
import 'package:app_ai_plugin_ui/app_ai_plugin_ui.dart';
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = ContinueShellController(
      hostAdapter: createContinueGuiDemoHostAdapter(),
      coreTransport: createContinueGuiDemoCoreTransport(),
    );

    return MaterialApp(
      home: AppAiShell(
        controller: controller,
        // Point at a built Continue GUI dist or a Vite dev URL.
        guiSource: ContinueGuiSource.fromDistPath('/abs/path/to/gui/dist'),
      ),
    );
  }
}
```

The full example app (`example/`) shows:

- mounting the GUI in a WebView via `ContinueGuiWebView`;
- swapping between the demo bridge and a real `ProcessCoreTransport`;
- handling streamed `llm/streamChat` chunks;
- secret storage via the native `HostAdapter`.

## Architecture

```
Continue GUI (React in WebView)
    │  postMessage bridge
    ▼
ContinueGuiShellPort
    │  Stream<ContinueMessage>
    ▼
ContinueShellController
    ├── if message.type ∈ kHostHandledMessageTypes → HostAdapter
    │     (ChannelBackedHostAdapter → native impls,
    │      LocalWorkspaceHostAdapter for fs reads,
    │      StaticHostAdapter for fixed values)
    └── else → CoreTransport
          (ProcessCoreTransport → continue-binary subprocess,
           or MockContinueCoreTransport for development)
```

`kHostHandledMessageTypes` in `lib/src/protocol/continue_routes.dart` is the
source of truth for which messages the controller answers locally vs. forwards
to core. Add to it when you wire up new host capabilities.

## Public Dart entrypoints

```dart
import 'package:app_ai_plugin/app_ai_plugin.dart';      // logic / protocol / transports
import 'package:app_ai_plugin/app_ai_plugin_ui.dart';   // widgets / WebView
```

## Native host methods

`ChannelBackedHostAdapter` is backed by native platform code for:

- `openUrl`, `showToast`, `closeSidebar`, `reportError`
- `readSecrets`, `writeSecrets` (Keychain on macOS / iOS,
  `EncryptedSharedPreferences` with SharedPreferences fallback on Android)

## Continue compatibility

This plugin tracks the
[Continue](https://github.com/continuedev/continue) host/core protocol. The
bridge expects a Continue binary built from the upstream repo and a GUI dist
built from `gui/`. Major-version protocol drift in upstream Continue may
require updating `kHostHandledMessageTypes` and message-handling code.

## License

Apache 2.0. See [LICENSE](LICENSE).

The reference Continue source code is © Continue Dev, Inc., licensed under
Apache 2.0; this package does **not** redistribute Continue source — users
build it themselves and point this plugin at the artifacts.
