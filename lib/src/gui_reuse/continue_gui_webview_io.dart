/// 文件类型：组件
/// 文件作用：继续复用 Continue GUI 的 WebView 容器与静态资源加载器。
/// 主要职责：解析 GUI 路径、启动本地静态服务，并提供更易诊断的错误提示。

import 'dart:async';
import 'dart:convert';
import 'dart:developer' as developer;
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../protocol/continue_message.dart';
import 'continue_gui_shell_port.dart';
import 'continue_gui_source.dart';

class ContinueGuiWebView extends StatefulWidget {
  const ContinueGuiWebView({
    required this.source,
    required this.shellPort,
    this.placeholder,
    super.key,
  });

  final ContinueGuiSource source;
  final ContinueGuiShellPort shellPort;
  final Widget? placeholder;

  @override
  State<ContinueGuiWebView> createState() => _ContinueGuiWebViewState();
}

class _ContinueGuiWebViewState extends State<ContinueGuiWebView> {
  late final WebViewController _controller;
  _StaticGuiServer? _staticGuiServer;
  bool _isLoading = true;
  String? _errorMessage;
  String? _debugDetails;
  String? _resolvedUriLabel;
  String? _resolvedBundleDirectory;
  String? _attemptedBundlePaths;
  String? _lastServerError;

  @override
  void initState() {
    super.initState();
    _logStage('init', details: 'Initialize Continue GUI WebView');

    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'ContinueBridge',
        onMessageReceived: (message) {
          _logStage(
            'webview->bridge/raw',
            details: 'bytes=${message.message.length}',
          );
          widget.shellPort.handleRawIncomingMessage(message.message);
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (url) {
            _logStage('nav/pageStarted', details: url);
            if (mounted) {
              setState(() {
                _isLoading = true;
                _errorMessage = null;
                _debugDetails = null;
              });
            }
          },
          onPageFinished: (url) async {
            _logStage('nav/pageFinished', details: url);
            await _installBridge();
            widget.shellPort.attachPoster(_postToGui);
            if (mounted) {
              setState(() {
                _isLoading = false;
              });
            }
          },
          onWebResourceError: (error) {
            developer.log(
              'WebView resource error ${error.errorCode} (${error.errorType}): ${error.description}',
              name: 'ContinueGuiWebView',
            );
            if (mounted) {
              setState(() {
                _errorMessage =
                    'WebView error ${error.errorCode} (${error.errorType}): ${error.description}';
                _debugDetails = _buildDebugDetails();
                _isLoading = false;
              });
            }
          },
        ),
      );

    unawaited(_loadSource());
  }

  /// 功能：加载 Continue GUI 的入口页面，并记录解析路径以便诊断。
  Future<void> _loadSource() async {
    try {
      final uri = await _resolveUri();
      _resolvedUriLabel = uri.toString();
      _logStage('loadSource/loadRequest', details: '$uri');
      await _controller.loadRequest(uri);
    } catch (error) {
      _logStage('loadSource/error', details: '$error');
      if (!mounted) {
        return;
      }
      setState(() {
        final message = error.toString().trim();
        _errorMessage = message.isEmpty
            ? 'Unknown error while loading Continue GUI.'
            : message;
        _debugDetails = _buildDebugDetails();
        _isLoading = false;
      });
    }
  }

  String _buildDebugDetails() {
    final buffer = StringBuffer();
    if (widget.source.bundleDirectory case final bundleDirectory?) {
      buffer.writeln('bundleDirectory: $bundleDirectory');
    }
    buffer.writeln('entrypoint: ${widget.source.entrypoint}');
    if (_resolvedBundleDirectory != null) {
      buffer.writeln('resolvedBundleDirectory: $_resolvedBundleDirectory');
    }
    if (_resolvedUriLabel != null) {
      buffer.writeln('resolvedUri: $_resolvedUriLabel');
    }
    if (_errorMessage != null && _errorMessage!.trim().isNotEmpty) {
      buffer.writeln('errorMessage: $_errorMessage');
    }
    if (_attemptedBundlePaths != null && _attemptedBundlePaths!.isNotEmpty) {
      buffer.writeln('attemptedPaths:');
      buffer.writeln(_attemptedBundlePaths);
    }
    if (_lastServerError != null && _lastServerError!.trim().isNotEmpty) {
      buffer.writeln('serverError: $_lastServerError');
    }
    return buffer.toString().trim();
  }

  Future<Uri> _resolveUri() async {
    if (widget.source.url case final url?) {
      return url;
    }

    if (widget.source.bundleDirectory case final bundleDirectory?) {
      final resolvedDirectory = await _resolveBundleDirectory(bundleDirectory);
      final server = await _StaticGuiServer.start(
        rootDirectory: resolvedDirectory,
        entrypoint: widget.source.entrypoint,
        onError: (message) {
          developer.log(message, name: 'ContinueGuiWebView');
          if (mounted) {
            setState(() {
              _lastServerError = message;
              _debugDetails = _buildDebugDetails();
            });
          }
        },
      );
      _staticGuiServer = server;
      _resolvedUriLabel = server.entryUri.toString();
      developer.log(
        'Started Continue GUI static server at ${server.entryUri}',
        name: 'ContinueGuiWebView',
      );
      return server.entryUri;
    }

    throw StateError(
      'ContinueGuiSource is missing both url and bundleDirectory.',
    );
  }

  Future<Directory> _resolveBundleDirectory(String bundleDirectory) async {
    final rawDirectory = Directory(bundleDirectory);
    if (rawDirectory.isAbsolute) {
      if (await rawDirectory.exists()) {
        _resolvedBundleDirectory = rawDirectory.absolute.path;
        return rawDirectory.absolute;
      }
      throw ArgumentError(
        'Continue GUI directory does not exist: ${rawDirectory.path}',
      );
    }

    final attemptedPaths = <String>[];
    final seenPaths = <String>{};

    Future<Directory?> checkBaseDirectory(Directory baseDirectory) async {
      final resolvedPath = Uri.directory(
        baseDirectory.absolute.path,
      ).resolve(bundleDirectory).toFilePath();
      final normalizedDirectory = Directory(resolvedPath).absolute;
      if (!seenPaths.add(normalizedDirectory.path)) {
        return null;
      }
      attemptedPaths.add(normalizedDirectory.path);
      if (await normalizedDirectory.exists()) {
        return normalizedDirectory;
      }
      return null;
    }

    final fromCurrentDirectory = await checkBaseDirectory(Directory.current);
    if (fromCurrentDirectory != null) {
      _resolvedBundleDirectory = fromCurrentDirectory.path;
      developer.log(
        'Resolved Continue GUI bundle via current directory: ${fromCurrentDirectory.path}',
        name: 'ContinueGuiWebView',
      );
      return fromCurrentDirectory;
    }

    var searchDirectory = File(Platform.resolvedExecutable).parent;
    while (true) {
      final resolvedDirectory = await checkBaseDirectory(searchDirectory);
      if (resolvedDirectory != null) {
        _resolvedBundleDirectory = resolvedDirectory.path;
        developer.log(
          'Resolved Continue GUI bundle via executable search: ${resolvedDirectory.path}',
          name: 'ContinueGuiWebView',
        );
        return resolvedDirectory;
      }

      final parentDirectory = searchDirectory.parent;
      if (parentDirectory.path == searchDirectory.path) {
        break;
      }
      searchDirectory = parentDirectory;
    }

    _attemptedBundlePaths = attemptedPaths.join('\n');
    throw ArgumentError(
      'Continue GUI directory does not exist: $bundleDirectory\n'
      'Tried:\n${attemptedPaths.join('\n')}',
    );
  }

  Future<void> _installBridge() {
    const bridgeScript = '''
      if (!window.__continueFlutterBridgeInstalled) {
        window.__continueFlutterBridgeInstalled = true;
        window.vscode = {
          postMessage: function(message) {
            ContinueBridge.postMessage(JSON.stringify(message));
          }
        };
        globalThis.vscode = window.vscode;
        window.acquireVsCodeApi = function() {
          return window.vscode;
        };
      }

      if (!window.__continueFlutterEnterSubmitInstalled) {
        window.__continueFlutterEnterSubmitInstalled = true;
        document.addEventListener('keydown', function(event) {
          if (event.key !== 'Enter') return;
          if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;

          const target = event.target;
          const isTextArea = target instanceof HTMLTextAreaElement;
          const isEditable = target instanceof HTMLElement && target.isContentEditable;
          if (!isTextArea && !isEditable) return;

          const buttons = Array.from(document.querySelectorAll('button'));
          const sendButton = buttons.find(function(button) {
            const label = (button.textContent || '').trim().toLowerCase();
            return label.startsWith('send');
          });

          if (!sendButton || sendButton.disabled) return;

          event.preventDefault();
          event.stopPropagation();
          sendButton.click();
        }, true);
      }
    ''';

    _logStage('bridge/install/start');
    return _controller
        .runJavaScript(bridgeScript)
        .then((_) {
          _logStage('bridge/install/success');
        })
        .catchError((Object error) {
          _logStage('bridge/install/error', details: '$error');
          throw error;
        });
  }

  Future<void> _postToGui(ContinueMessage message) {
    _logStage(
      'bridge->webview/post',
      details:
          'messageType=${message.messageType} messageId=${message.messageId}',
    );
    final encodedMessage = jsonEncode(message.toJson());
    return _controller
        .runJavaScript('''
      (function() {
        const payload = $encodedMessage;
        try {
          window.postMessage(payload, "*");
        } catch (_) {}
        try {
          const event = new MessageEvent("message", {
            data: payload,
            origin: window.location.origin,
            source: window
          });
          window.dispatchEvent(event);
        } catch (_) {}
      })();
      ''')
        .catchError((Object error) {
          _logStage(
            'bridge->webview/post/error',
            details:
                'messageType=${message.messageType} messageId=${message.messageId} error=$error',
          );
          throw error;
        });
  }

  @override
  void dispose() {
    _logStage('dispose', details: 'Dispose Continue GUI WebView');
    widget.shellPort.detachPoster();
    unawaited(_staticGuiServer?.dispose());
    super.dispose();
  }

  void _logStage(String stage, {String? details}) {
    developer.log(
      '[stage=$stage]${details == null ? '' : ' $details'}',
      name: 'ContinueGuiWebView',
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_errorMessage case final errorMessage?) {
      return _ErrorPane(
        message: errorMessage,
        source: widget.source,
        debugDetails: _debugDetails,
      );
    }

    return Stack(
      children: [
        Positioned.fill(child: WebViewWidget(controller: _controller)),
        if (_isLoading)
          Positioned.fill(
            child:
                widget.placeholder ??
                const ColoredBox(
                  color: Colors.white,
                  child: Center(child: CircularProgressIndicator()),
                ),
          ),
      ],
    );
  }
}

class _ErrorPane extends StatelessWidget {
  const _ErrorPane({
    required this.message,
    required this.source,
    this.debugDetails,
  });

  final String message;
  final ContinueGuiSource source;
  final String? debugDetails;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return DecoratedBox(
      decoration: const BoxDecoration(color: Color(0xFFFDF4F2)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Continue GUI failed to load',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 10),
              Text(message),
              const SizedBox(height: 14),
              Text(
                source.isDevServer
                    ? 'Check that CONTINUE_GUI_URL is reachable.'
                    : 'Check that CONTINUE_GUI_DIST points to a built gui/dist directory.',
              ),
              if (debugDetails != null && debugDetails!.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Wrap(
                        crossAxisAlignment: WrapCrossAlignment.center,
                        spacing: 8,
                        runSpacing: 6,
                        children: [
                          Text(
                            'Debug details',
                            style: theme.textTheme.bodySmall?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          OutlinedButton.icon(
                            onPressed: () async {
                              await Clipboard.setData(
                                ClipboardData(text: debugDetails!),
                              );
                              if (context.mounted) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Debug details copied'),
                                    duration: Duration(seconds: 2),
                                  ),
                                );
                              }
                            },
                            icon: const Icon(Icons.copy, size: 16),
                            label: const Text('Copy'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        debugDetails!,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF8B5E58),
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StaticGuiServer {
  _StaticGuiServer._({
    required HttpServer server,
    required this.rootDirectory,
    required this.entrypoint,
    this.onError,
  }) : _server = server;

  final HttpServer _server;
  final Directory rootDirectory;
  final String entrypoint;
  final void Function(String message)? onError;

  Uri get entryUri =>
      Uri.parse('http://${_server.address.host}:${_server.port}/$entrypoint');

  static Future<_StaticGuiServer> start({
    required Directory rootDirectory,
    required String entrypoint,
    void Function(String message)? onError,
  }) async {
    if (!await rootDirectory.exists()) {
      throw ArgumentError(
        'Continue GUI directory does not exist: ${rootDirectory.path}',
      );
    }

    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    final staticServer = _StaticGuiServer._(
      server: server,
      rootDirectory: rootDirectory,
      entrypoint: entrypoint,
      onError: onError,
    );

    server.listen(staticServer._handleRequest);
    return staticServer;
  }

  Future<void> _handleRequest(HttpRequest request) async {
    try {
      final requestPath = request.uri.path == '/'
          ? '/$entrypoint'
          : request.uri.path;
      final sanitizedPath = requestPath.replaceAll('..', '');
      final filePath = '${rootDirectory.path}$sanitizedPath';
      final file = File(filePath);

      File resolvedFile = file;
      if (!await resolvedFile.exists()) {
        resolvedFile = File('${rootDirectory.path}/$entrypoint');
        if (!await resolvedFile.exists()) {
          request.response.statusCode = HttpStatus.notFound;
          await request.response.close();
          return;
        }
      }

      request.response.headers.contentType = _contentTypeFor(resolvedFile.path);
      await request.response.addStream(resolvedFile.openRead());
      await request.response.close();
    } catch (error) {
      onError?.call('Static server error: $error');
      request.response.statusCode = HttpStatus.internalServerError;
      request.response.write('Static server error: $error');
      await request.response.close();
    }
  }

  ContentType _contentTypeFor(String path) {
    if (path.endsWith('.html')) {
      return ContentType.html;
    }
    if (path.endsWith('.js') || path.endsWith('.mjs')) {
      return ContentType('application', 'javascript', charset: 'utf-8');
    }
    if (path.endsWith('.css')) {
      return ContentType('text', 'css', charset: 'utf-8');
    }
    if (path.endsWith('.json')) {
      return ContentType.json;
    }
    if (path.endsWith('.svg')) {
      return ContentType('image', 'svg+xml');
    }
    if (path.endsWith('.png')) {
      return ContentType('image', 'png');
    }
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      return ContentType('image', 'jpeg');
    }
    if (path.endsWith('.woff')) {
      return ContentType('font', 'woff');
    }
    if (path.endsWith('.woff2')) {
      return ContentType('font', 'woff2');
    }
    if (path.endsWith('.ttf')) {
      return ContentType('font', 'ttf');
    }
    if (path.endsWith('.map')) {
      return ContentType('application', 'json', charset: 'utf-8');
    }
    return ContentType.binary;
  }

  Future<void> dispose() async {
    await _server.close(force: true);
  }
}
