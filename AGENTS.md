# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project mission

Migrate the [Continue](https://github.com/continuedev/continue) IDE-extension idea into a **Flutter plugin shell** (primary target: macOS desktop). The strategy is *not* to keep building VSCode/JetBrains extensions but to:

- Use **Flutter** for the shell UI, native capabilities (secure storage, toast, openUrl), and to host a WebView.
- **Reuse the existing Continue GUI** (a Vite/React app) inside that WebView rather than rewriting it.
- Vendor and progressively Flutter-ify the Continue **core** (TypeScript) under `libs/core`.
- Replace `Host`/extension hooks with Flutter MethodChannel + Dart adapters.

The reference upstream Continue source lives outside this repo at `/Users/linzhibin/Desktop/code/continue-main`.

## Repository layout

```
lib/                    Flutter plugin Dart code (public package: app_ai_plugin)
  app_ai_plugin.dart        Public API entrypoint
  app_ai_plugin_ui.dart     Reusable UI widgets entrypoint
  src/
    app/                    ContinueShellController (state + routing)
    plugin/                 AppAiPluginClient (MethodChannel wrapper)
    protocol/               ContinueMessage + route tables (host vs core handled types)
    transport/              CoreTransport impls: mock + ProcessCoreTransport (stdin/stdout to continue-binary)
    host/                   HostAdapter impls: ChannelBackedHostAdapter, LocalWorkspaceHostAdapter, StaticHostAdapter
    gui_reuse/              ContinueGuiSource, ContinueGuiShellPort, ContinueGuiWebView (postMessage bridge)
    demo/                   In-memory demo bridge so the GUI can render without a real binary
    ui/                     AppAiShell, sidebar/timeline/composer/reuse-pane widgets and models
example/                Runnable Flutter example app (main desktop entry while developing)
libs/
  core/                 Vendored Continue TypeScript core (the binary subprocess loads from here)
  gui/                  Vendored Continue React/Vite GUI; produces dist/ for the WebView to load
android/ ios/ macos/ linux/ windows/   Per-platform native plugin code (MethodChannel implementations
                                        of openUrl, showToast, secret storage via Keychain / EncryptedSharedPreferences)
test/                   Plugin unit tests (controller + method channel)
example/integration_test/   Flutter integration tests
```

## Architecture: how a chat message flows

```
Continue GUI (React in WebView)
    │  postMessage / addEventListener ("vscode" message protocol)
    ▼
ContinueGuiShellPort  (lib/src/gui_reuse/continue_gui_shell_port.dart)
    │  ContinueMessage stream
    ▼
ContinueShellController (lib/src/app/continue_shell_controller.dart)
    ├── if message type ∈ kHostHandledMessageTypes → HostAdapter
    │     (ChannelBackedHostAdapter → MethodChannel → native impl,
    │      or LocalWorkspaceHostAdapter for fs reads, StaticHostAdapter for fixed values)
    └── else → CoreTransport
           (ProcessCoreTransport spawns continue-binary and speaks JSON over stdin/stdout,
            or MockContinueCoreTransport / demo transport for local development)
```

Key invariants:

- `kHostHandledMessageTypes` in [lib/src/protocol/continue_routes.dart](lib/src/protocol/continue_routes.dart) is the source of truth for which messages the controller answers locally vs. forwards to core. Add new IDE-style requests there when wiring host capabilities.
- `ContinueShellController` also owns Flutter-shell-only lifecycle: apply/diff bookkeeping, edit-mode stream id, and background-agent records. Don't push that state into the WebView.
- The GUI is a *consumer* of these messages — keep the reply schema matching what `continue-main`'s GUI expects, otherwise it crashes silently inside React.

## Common commands

Run from the project root unless noted.

```bash
# Flutter package
flutter pub get
flutter analyze
flutter test                              # plugin unit tests
flutter test test/continue_shell_controller_test.dart   # single file
flutter test --plain-name "<test name>"   # single test by name

# Example app (the usual dev loop, runs the macOS shell)
cd example
RBENV_VERSION=3.2.4 flutter run -d macos   # rbenv pin matters for CocoaPods
flutter test integration_test/             # integration tests on a device

# Continue GUI (vendored)
cd libs/gui
npm install
npx vite build           # PREFERRED — produces dist/ for the WebView
# npm run build          # AVOID: runs tsc, which has historical type errors on this branch and blocks the build
npm run dev              # Vite dev server on :5173 (use with --dart-define=CONTINUE_GUI_URL=http://127.0.0.1:5173)

# Continue core (vendored)
cd libs/core
npm install
# Build/test scripts mirror upstream Continue; consult libs/core/package.json before running.

# Local continue-binary (built from this repo, outputs binary/bin/<target>/continue-binary)
./scripts/build_local_continue_binary.sh
# or manually:
cd binary
npm install
npm run build
```

### Run the example wired to the real Continue binary

```bash
cd example
flutter run -d macos \
  --dart-define=CONTINUE_GUI_DIST=/absolute/path/to/AppAIPlugin/libs/gui/dist \
  --dart-define=CONTINUE_BINARY_EXECUTABLE=/absolute/path/to/AppAIPlugin/binary/bin/darwin-arm64/continue-binary \
  --dart-define=CONTINUE_WORKSPACE_DIR=/absolute/path/to/AppAIPlugin/libs/core
```

Without `CONTINUE_BINARY_EXECUTABLE` the example falls back to the in-memory demo bridge (`createContinueGuiDemoCoreTransport` / `createContinueGuiDemoHostAdapter`).

The example also resolves `../libs/gui/dist` automatically on desktop, so once you've run `npx vite build` in `libs/gui` you can just `flutter run -d macos`.

## Important context (handoff state, kept brief)

- **Working state**: Flutter shell renders; Continue GUI loads in WebView; OpenAI requests are reaching the API; secrets are stored via the native plugin (Keychain on macOS/iOS, EncryptedSharedPreferences on Android). The most visible end-user errors right now are typically OpenAI `429 / insufficient_quota`, *not* a broken pipeline.
- **Known fix already applied**: `libs/gui/src/redux/util/constructMessages.ts` — `item.contextItems` is coalesced with `?? []` to avoid `undefined.map(...)` crashes when pressing Enter. If you re-pull upstream Continue GUI, re-apply this guard and rebuild with `npx vite build`.
- **Layout in progress**: `lib/src/ui/widgets/app_ai_shell.dart` is being moved from a vertically stacked Flutter chat + Continue WebView to a side-by-side split. Verify proportions when touching it.
- **Default model**: `gpt-4.1-mini` is hard-coded in `example/lib/main.dart` (`_openAiModel`). It's a demo default, not part of a real Continue model config — don't treat it as canonical.
- **Known noisy issues to watch when editing input/keyboard code**:
  - macOS Flutter assertion: `A KeyDownEvent is dispatched, but the state shows that the physical key is already pressed` (suspected WebView-focus interaction).
  - Continue GUI's `Enter` and `Send` paths are not fully equivalent — keyboard events through WebView are still flaky.
- **Debug surface**: `example/lib/main.dart` contains a temporary white runtime-log panel (`_runtimeDebugLines`). Keep it gated/toggle-able rather than visible by default in any UI work.

## Conventions worth knowing

- Public Dart surface is exported from exactly two files: `lib/app_ai_plugin.dart` (logic, transports, host adapters, protocol) and `lib/app_ai_plugin_ui.dart` (widgets + WebView). Don't export from anywhere else.
- IO-vs-stub split: files ending in `_io.dart` use `dart:io`; their `_stub.dart` siblings exist so the package compiles on web. Keep both in sync when adding methods, and keep the conditional `export ... if (dart.library.io) ...` lines in the public entrypoints.
- Prefer extending `ContinueShellController` and the route table over reaching into the WebView from Flutter — the GUI should remain replaceable with an upstream Continue GUI build.
- Don't write secrets to disk from Dart; route through `HostAdapter.readSecrets/writeSecrets` so the platform-appropriate secure store is used.
