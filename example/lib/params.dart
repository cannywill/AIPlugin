// Dart 镜像：libs/core/dist/utils/params.ts 的 Params 类。
// 修改时请同步两侧，避免行为漂移。
//
// 用途：作为 Flutter 例子里"调试性面板/日志/红字提示"是否显示的总开关。
// 默认 false（生产体验：只看 Continue GUI 主体）。开发联调时改成 true，
// 或通过 --dart-define=APP_AI_DEBUG=true 临时打开，无需改源码。

class Params {
  Params._();

  /// 是否启用调试面板（运行时日志、bridge 事件流、原生错误回显等）。
  static const bool isDebug = bool.fromEnvironment(
    'APP_AI_DEBUG',
    defaultValue: false,
  );
}
