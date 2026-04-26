import 'dart:async';
import 'dart:convert';
import 'dart:io';

import '../protocol/continue_message.dart';
import 'core_transport.dart';

class ProcessCoreTransport implements CoreTransport {
  ProcessCoreTransport({
    required this.executablePath,
    this.arguments = const [],
    this.workingDirectory,
    this.environment = const {},
  });

  final String executablePath;
  final List<String> arguments;
  final String? workingDirectory;
  final Map<String, String> environment;

  final StreamController<ContinueMessage> _messages =
      StreamController<ContinueMessage>.broadcast();

  Process? _process;
  StreamSubscription<String>? _stdoutSubscription;
  StreamSubscription<String>? _stderrSubscription;

  @override
  Stream<ContinueMessage> get messages => _messages.stream;

  @override
  bool get isConnected => _process != null;

  @override
  Future<void> start() async {
    if (_process != null) {
      return;
    }

    final process = await Process.start(
      executablePath,
      arguments,
      workingDirectory: workingDirectory,
      environment: environment,
    );

    _process = process;

    _stdoutSubscription = process.stdout
        .transform(utf8.decoder)
        .transform(const LineSplitter())
        .where((line) => line.trim().isNotEmpty)
        .listen((line) {
          final trimmed = line.trimLeft();
          if (!trimmed.startsWith('{')) {
            return;
          }

          try {
            _messages.add(ContinueMessage.fromLine(line));
          } catch (error, stackTrace) {
            _messages.addError(error, stackTrace);
          }
        });

    _stderrSubscription = process.stderr
        .transform(utf8.decoder)
        .transform(const LineSplitter())
        .listen((line) {
          if (line.trim().isEmpty || _messages.isClosed) {
            return;
          }
          _messages.addError(StateError('Continue core stderr: $line'));
        });

    unawaited(
      process.exitCode.then((code) {
        _process = null;
        if (!_messages.isClosed) {
          _messages.addError(
            StateError('Continue core exited with code $code'),
          );
        }
      }),
    );
  }

  @override
  Future<void> send(ContinueMessage message) async {
    final process = _process;
    if (process == null) {
      throw StateError('Core process has not been started.');
    }
    process.stdin.writeln(message.toLine());
    await process.stdin.flush();
  }

  @override
  Future<void> dispose() async {
    await _stdoutSubscription?.cancel();
    await _stderrSubscription?.cancel();

    final process = _process;
    _process = null;
    if (process != null) {
      process.kill();
    }

    await _messages.close();
  }
}
