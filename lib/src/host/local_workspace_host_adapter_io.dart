import 'dart:convert';
import 'dart:io';

import '../protocol/continue_message.dart';
import 'host_adapter.dart';

class LocalWorkspaceHostAdapter extends HostAdapter {
  const LocalWorkspaceHostAdapter({
    required this.workspaceDirs,
    this.currentFilePath,
    this.ideName = 'app-ai-plugin',
    this.ideVersion = '0.0.1',
  });

  final List<String> workspaceDirs;
  final String? currentFilePath;
  final String ideName;
  final String ideVersion;

  @override
  bool canHandle(String messageType) {
    return const {
      'getIdeInfo',
      'getWorkspaceDirs',
      'writeFile',
      'removeFile',
      'openFile',
      'showFile',
      'saveFile',
      'fileExists',
      'readFile',
      'getOpenFiles',
      'getCurrentFile',
      'showLines',
      'focusEditor',
      'readRangeInFile',
      'isTelemetryEnabled',
      'isWorkspaceRemote',
      'getUniqueId',
      'getIdeSettings',
      'runCommand',
      'subprocess',
      'getBranch',
      'getRepoName',
      'getGitRootPath',
      'listDir',
      'getFileResults',
      'getSearchResults',
      'getFileStats',
      'getProblems',
      'getDiff',
      'getTerminalContents',
      'getPinnedFiles',
      'gotoDefinition',
      'gotoTypeDefinition',
      'getSignatureHelp',
      'getReferences',
      'getDocumentSymbols',
      'listBackgroundAgents',
      'getControlPlaneSessionInfo',
      'readSecrets',
    }.contains(messageType);
  }

  @override
  Future<Object?> handle(ContinueMessage message) async {
    final payload = (message.data as Map?)?.cast<String, Object?>();

    switch (message.messageType) {
      case 'getIdeInfo':
        return {
          'ideType': 'flutter-desktop',
          'name': ideName,
          'version': ideVersion,
          'remoteName': 'local',
          'extensionVersion': ideVersion,
          'isPrerelease': true,
        };
      case 'getIdeSettings':
        return {
          'remoteConfigServerUrl': null,
          'remoteConfigSyncPeriod': 60,
          'userToken': '',
          'continueTestEnvironment': 'staging',
          'pauseCodebaseIndexOnStart': false,
        };
      case 'getWorkspaceDirs':
        return workspaceDirs.map(_asUriString).toList(growable: false);
      case 'writeFile':
        final path = payload?['path'] as String?;
        final contents = payload?['contents'] as String? ?? '';
        if (path == null) {
          throw ArgumentError('writeFile requires a path');
        }
        await File(_normalizePath(path)).writeAsString(contents);
        return null;
      case 'removeFile':
        final path = payload?['path'] as String?;
        if (path == null) {
          throw ArgumentError('removeFile requires a path');
        }
        final file = File(_normalizePath(path));
        if (await file.exists()) {
          await file.delete();
        }
        return null;
      case 'openFile':
        final path =
            payload?['path'] as String? ?? payload?['filepath'] as String?;
        if (path == null) {
          return null;
        }
        await _openFile(_normalizePath(path));
        return null;
      case 'showFile':
        final filepath =
            payload?['filepath'] as String? ?? payload?['path'] as String?;
        if (filepath == null) {
          return null;
        }
        final line = (payload?['line'] as num?)?.toInt();
        final resolvedPath = _normalizePath(filepath);
        if (line != null && line > 0) {
          await _showLines(resolvedPath, startLine: line, endLine: line);
        } else {
          await _openFile(resolvedPath);
        }
        return null;
      case 'saveFile':
        final path =
            payload?['filepath'] as String? ?? payload?['path'] as String?;
        if (path == null) {
          return null;
        }
        final file = File(_normalizePath(path));
        if (await file.exists()) {
          await file.stat();
        }
        return null;
      case 'showLines':
        final path = payload?['filepath'] as String?;
        final startLine = (payload?['startLine'] as num?)?.toInt() ?? 0;
        final endLine = (payload?['endLine'] as num?)?.toInt() ?? startLine;
        if (path == null) {
          return null;
        }
        await _showLines(
          _normalizePath(path),
          startLine: startLine,
          endLine: endLine,
        );
        return null;
      case 'focusEditor':
        return null;
      case 'fileExists':
        final path = payload?['filepath'] as String?;
        if (path == null) {
          return false;
        }
        return File(_normalizePath(path)).exists();
      case 'readFile':
        final path = payload?['filepath'] as String?;
        if (path == null) {
          return '';
        }
        return File(_normalizePath(path)).readAsString();
      case 'getOpenFiles':
        return currentFilePath == null
            ? const <String>[]
            : <String>[_asUriString(currentFilePath!)];
      case 'getCurrentFile':
        if (currentFilePath == null) {
          return null;
        }
        final path = _normalizePath(currentFilePath!);
        final file = File(path);
        if (!await file.exists()) {
          return null;
        }
        return {
          'isUntitled': false,
          'path': _asUriString(path),
          'contents': await file.readAsString(),
        };
      case 'readRangeInFile':
        final path = payload?['filepath'] as String?;
        final range = (payload?['range'] as Map?)?.cast<String, Object?>();
        if (path == null) {
          return '';
        }
        return _readRange(
          path: _normalizePath(path),
          startLine: ((range?['start'] as Map?)?['line'] as num?)?.toInt() ?? 0,
          endLine: ((range?['end'] as Map?)?['line'] as num?)?.toInt() ?? 0,
        );
      case 'isTelemetryEnabled':
        return false;
      case 'isWorkspaceRemote':
        return false;
      case 'getUniqueId':
        return Platform.localHostname;
      case 'runCommand':
        final command = payload?['command'] as String?;
        final options = (payload?['options'] as Map?)?.cast<String, Object?>();
        if (command == null || command.trim().isEmpty) {
          return null;
        }
        await _spawnCommand(command, cwd: options?['cwd'] as String?);
        return null;
      case 'subprocess':
        final command = payload?['command'] as String?;
        final cwd = payload?['cwd'] as String?;
        if (command == null || command.trim().isEmpty) {
          return const <String>['', ''];
        }
        return _runCommand(command, cwd: cwd);
      case 'getBranch':
        final dir = payload?['dir'] as String?;
        final gitRoot = await _resolveGitRoot(dir);
        if (gitRoot == null) {
          return 'main';
        }
        final result = await _runCommand(
          'git branch --show-current',
          cwd: gitRoot,
          allowFailure: true,
        );
        final branch = result.$1.trim();
        return branch.isEmpty ? 'main' : branch;
      case 'getRepoName':
        final dir = payload?['dir'] as String?;
        final gitRoot = await _resolveGitRoot(dir);
        if (gitRoot != null) {
          final remoteResult = await _runCommand(
            'git remote get-url origin',
            cwd: gitRoot,
            allowFailure: true,
          );
          final remoteUrl = remoteResult.$1.trim();
          if (remoteUrl.isNotEmpty) {
            return remoteUrl;
          }
        }
        final candidate = gitRoot ?? (dir == null ? null : _normalizePath(dir));
        if (candidate == null || candidate.isEmpty) {
          return null;
        }
        final parts = candidate
            .split(Platform.pathSeparator)
            .where((part) => part.isNotEmpty)
            .toList();
        return parts.isEmpty ? null : parts.last;
      case 'getGitRootPath':
        final dir = payload?['dir'] as String?;
        final gitRoot = await _resolveGitRoot(dir);
        if (gitRoot != null) {
          return _asUriString(gitRoot);
        }
        if (dir == null) {
          return workspaceDirs.isEmpty
              ? null
              : _asUriString(workspaceDirs.first);
        }
        return _asUriString(_normalizePath(dir));
      case 'listDir':
        final dir = payload?['dir'] as String?;
        if (dir == null) {
          return const <Object>[];
        }
        return _listDir(_normalizePath(dir));
      case 'getFileResults':
        final pattern = payload?['pattern'] as String? ?? '';
        final maxResults = (payload?['maxResults'] as num?)?.toInt();
        return _getFileResults(pattern, maxResults: maxResults);
      case 'getSearchResults':
        final query = payload?['query'] as String? ?? '';
        final maxResults = (payload?['maxResults'] as num?)?.toInt();
        return _getSearchResults(query, maxResults: maxResults);
      case 'getFileStats':
        final files = ((payload?['files'] as List?) ?? const <Object?>[])
            .cast<String>();
        return _getFileStats(files);
      case 'getProblems':
        final path = payload?['filepath'] as String?;
        return _getProblems(path);
      case 'getDiff':
        final includeUnstaged = payload?['includeUnstaged'] == true;
        return _getDiff(includeUnstaged: includeUnstaged);
      case 'getPinnedFiles':
        return const <Object?>[];
      case 'gotoDefinition':
        return _gotoDefinition(_parseLocation(payload));
      case 'gotoTypeDefinition':
        return _gotoDefinition(_parseLocation(payload));
      case 'getReferences':
        return _getReferences(_parseLocation(payload));
      case 'getDocumentSymbols':
        final textDocumentIdentifier =
            payload?['textDocumentIdentifier'] as String? ??
            payload?['filepath'] as String?;
        return _getDocumentSymbols(textDocumentIdentifier);
      case 'getSignatureHelp':
        return null;
      case 'getTerminalContents':
        return '';
      case 'listBackgroundAgents':
        return {'agents': const <Object?>[], 'totalCount': 0};
      case 'getControlPlaneSessionInfo':
        return {
          'AUTH_TYPE': 'continue-staging',
          'accessToken': '',
          'account': {'label': 'Flutter Desktop', 'id': 'flutter-desktop'},
        };
      case 'readSecrets':
        return const <String, String>{};
    }

    throw UnsupportedError('Unhandled message type ${message.messageType}');
  }

  String _normalizePath(String path) {
    if (path.startsWith('file://')) {
      return Uri.parse(path).toFilePath();
    }
    return path;
  }

  String _asUriString(String path) {
    if (path.startsWith('file://')) {
      return path;
    }
    return Uri.file(path).toString();
  }

  Future<String> _readRange({
    required String path,
    required int startLine,
    required int endLine,
  }) async {
    final lines = await File(path).readAsLines();
    final safeStart = startLine.clamp(0, lines.length).toInt();
    final safeEnd = endLine.clamp(safeStart, lines.length).toInt();
    return lines.sublist(safeStart, safeEnd).join('\n');
  }

  Future<List<List<Object>>> _listDir(String dir) async {
    final directory = Directory(dir);
    if (!await directory.exists()) {
      return const <List<Object>>[];
    }

    final results = <List<Object>>[];
    await for (final child in directory.list(followLinks: false)) {
      final type = switch (await FileSystemEntity.type(child.path)) {
        FileSystemEntityType.directory => 2,
        FileSystemEntityType.file => 1,
        FileSystemEntityType.link => 64,
        _ => 0,
      };
      results.add([_asUriString(child.path), type]);
    }
    return results;
  }

  Future<List<String>> _getFileResults(
    String pattern, {
    int? maxResults,
  }) async {
    if (pattern.isEmpty) {
      return const <String>[];
    }

    final rg = await _resolveExecutable('rg');
    if (rg != null) {
      final results = <String>[];
      for (final dir in workspaceDirs) {
        final normalizedDir = _normalizePath(dir);
        final output = await _runProcess(
          rg,
          [
            '--files',
            '--iglob',
            pattern,
            '--ignore-file',
            '.continueignore',
            '--ignore-file',
            '.gitignore',
          ],
          cwd: normalizedDir,
          allowFailure: true,
        );
        final lines = LineSplitter.split(output.$1)
            .where((line) => line.trim().isNotEmpty)
            .map(
              (line) =>
                  _asUriString('$normalizedDir${Platform.pathSeparator}$line'),
            );
        results.addAll(lines);
        if (maxResults != null && results.length >= maxResults) {
          return results.take(maxResults).toList(growable: false);
        }
      }
      return results;
    }

    final results = <String>[];
    for (final dir in workspaceDirs) {
      final directory = Directory(_normalizePath(dir));
      if (!await directory.exists()) {
        continue;
      }

      await for (final entity in directory.list(
        recursive: true,
        followLinks: false,
      )) {
        if (entity is! File) {
          continue;
        }
        if (entity.path.contains(pattern)) {
          results.add(_asUriString(entity.path));
          if (maxResults != null && results.length >= maxResults) {
            return results;
          }
        }
      }
    }
    return results;
  }

  Future<String> _getSearchResults(String query, {int? maxResults}) async {
    if (query.isEmpty) {
      return '';
    }

    final rg = await _resolveExecutable('rg');
    if (rg != null) {
      final chunks = <String>[];
      for (final dir in workspaceDirs) {
        final normalizedDir = _normalizePath(dir);
        final output = await _runProcess(
          rg,
          [
            '-i',
            '--ignore-file',
            '.continueignore',
            '--ignore-file',
            '.gitignore',
            '-C',
            '2',
            '--heading',
            if (maxResults != null) ...['-m', '$maxResults'],
            '-e',
            query,
            '.',
          ],
          cwd: normalizedDir,
          allowFailure: true,
        );
        if (output.$1.trim().isNotEmpty) {
          chunks.add(output.$1.trim());
        }
      }
      return chunks.join('\n');
    }

    final matches = <Map<String, Object>>[];
    for (final dir in workspaceDirs) {
      final directory = Directory(_normalizePath(dir));
      if (!await directory.exists()) {
        continue;
      }

      await for (final entity in directory.list(
        recursive: true,
        followLinks: false,
      )) {
        if (entity is! File) {
          continue;
        }

        try {
          final contents = await entity.readAsString();
          if (!contents.contains(query)) {
            continue;
          }
          matches.add({
            'filepath': _asUriString(entity.path),
            'preview': contents.length > 240
                ? contents.substring(0, 240)
                : contents,
          });
          if (maxResults != null && matches.length >= maxResults) {
            return jsonEncode(matches);
          }
        } catch (_) {
          continue;
        }
      }
    }

    return jsonEncode(matches);
  }

  Future<Map<String, Map<String, Object>>> _getFileStats(
    List<String> files,
  ) async {
    final stats = <String, Map<String, Object>>{};
    for (final filePath in files) {
      final path = _normalizePath(filePath);
      final file = File(path);
      if (!await file.exists()) {
        continue;
      }
      final stat = await file.stat();
      stats[filePath] = {
        'lastModified': stat.modified.millisecondsSinceEpoch,
        'size': stat.size,
      };
    }
    return stats;
  }

  Future<List<Map<String, Object?>>> _getProblems(String? filepath) async {
    final targetPath = _resolveProblemTarget(filepath);
    if (targetPath == null || !targetPath.endsWith('.dart')) {
      return const <Map<String, Object?>>[];
    }

    final dart = await _resolveExecutable('dart');
    if (dart == null) {
      return const <Map<String, Object?>>[];
    }

    final cwd =
        _pickWorkspaceDirForPath(targetPath) ?? File(targetPath).parent.path;
    final output = await _runProcess(
      dart,
      ['analyze', '--format', 'json', targetPath],
      cwd: cwd,
      allowFailure: true,
    );

    final raw = output.$1.trim().isNotEmpty ? output.$1 : output.$2;
    if (raw.trim().isEmpty) {
      return const <Map<String, Object?>>[];
    }

    try {
      final decoded = jsonDecode(raw);
      final diagnostics =
          (decoded is Map<String, Object?> ? decoded['diagnostics'] : null)
              as List<dynamic>? ??
          const <dynamic>[];

      return diagnostics
          .map(
            (diagnostic) => _toProblem(diagnostic, requestedPath: targetPath),
          )
          .whereType<Map<String, Object?>>()
          .toList(growable: false);
    } catch (_) {
      return const <Map<String, Object?>>[];
    }
  }

  Future<List<String>> _getDiff({required bool includeUnstaged}) async {
    final chunks = <String>[];
    for (final gitRoot in await _collectGitRoots()) {
      final staged = await _runProcess(
        'git',
        ['diff', '--cached', '--no-ext-diff', '--unified=3'],
        cwd: gitRoot,
        allowFailure: true,
      );
      chunks.addAll(_splitGitDiff(staged.$1));

      if (!includeUnstaged) {
        continue;
      }

      final unstaged = await _runProcess(
        'git',
        ['diff', '--no-ext-diff', '--unified=3'],
        cwd: gitRoot,
        allowFailure: true,
      );
      chunks.addAll(_splitGitDiff(unstaged.$1));
    }
    return chunks
        .where((chunk) => chunk.trim().isNotEmpty)
        .toList(growable: false);
  }

  Future<String?> _resolveGitRoot(String? dir) async {
    final normalized = dir == null || dir.isEmpty
        ? (workspaceDirs.isEmpty ? null : _normalizePath(workspaceDirs.first))
        : _normalizePath(dir);
    if (normalized == null) {
      return null;
    }

    final result = await _runCommand(
      'git rev-parse --show-toplevel',
      cwd: normalized,
      allowFailure: true,
    );
    final root = result.$1.trim();
    if (root.isEmpty) {
      return null;
    }
    return root;
  }

  Future<void> _spawnCommand(String command, {String? cwd}) async {
    final shell = _defaultShell;
    await Process.start(
      shell.executable,
      [...shell.arguments, command],
      workingDirectory: cwd == null ? null : _normalizePath(cwd),
      runInShell: Platform.isWindows,
      mode: ProcessStartMode.detached,
    );
  }

  Future<(String, String)> _runCommand(
    String command, {
    String? cwd,
    bool allowFailure = false,
  }) async {
    final shell = _defaultShell;
    return _runProcess(
      shell.executable,
      [...shell.arguments, command],
      cwd: cwd,
      allowFailure: allowFailure,
    );
  }

  Future<(String, String)> _runProcess(
    String executable,
    List<String> arguments, {
    String? cwd,
    bool allowFailure = false,
  }) async {
    final result = await Process.run(
      executable,
      arguments,
      workingDirectory: cwd == null ? null : _normalizePath(cwd),
      runInShell: Platform.isWindows,
    );

    final stdoutText = '${result.stdout ?? ''}';
    final stderrText = '${result.stderr ?? ''}';

    if (!allowFailure && result.exitCode != 0) {
      throw ProcessException(
        executable,
        arguments,
        stderrText.isEmpty ? stdoutText : stderrText,
        result.exitCode,
      );
    }

    return (stdoutText, stderrText);
  }

  Future<void> _openFile(String path) async {
    final code = await _resolveExecutable('code');
    if (code != null) {
      await Process.start(
        code,
        ['-r', path],
        mode: ProcessStartMode.detached,
        runInShell: Platform.isWindows,
      );
      return;
    }

    final command = _platformOpenCommand(path);
    await Process.start(
      command.executable,
      command.arguments,
      mode: ProcessStartMode.detached,
      runInShell: Platform.isWindows,
    );
  }

  Future<void> _showLines(
    String path, {
    required int startLine,
    required int endLine,
  }) async {
    final code = await _resolveExecutable('code');
    if (code != null) {
      final targetLine = startLine <= 0 ? 1 : startLine;
      final targetColumn = endLine < targetLine ? 1 : 1;
      await Process.start(
        code,
        ['-r', '--goto', '$path:$targetLine:$targetColumn'],
        mode: ProcessStartMode.detached,
        runInShell: Platform.isWindows,
      );
      return;
    }

    await _openFile(path);
  }

  Future<List<Map<String, Object?>>> _gotoDefinition(
    Map<String, Object?>? location,
  ) async {
    final context = await _resolveSymbolContext(location);
    if (context == null) {
      return const <Map<String, Object?>>[];
    }

    final definition = await _findBestDefinition(
      context.symbol,
      sourcePath: context.filepath,
    );
    if (definition == null) {
      return const <Map<String, Object?>>[];
    }

    return <Map<String, Object?>>[_rangeInFile(definition)];
  }

  Future<List<Map<String, Object?>>> _getReferences(
    Map<String, Object?>? location,
  ) async {
    final context = await _resolveSymbolContext(location);
    if (context == null) {
      return const <Map<String, Object?>>[];
    }

    final matches = await _findReferenceMatches(
      context.symbol,
      sourcePath: context.filepath,
    );
    return matches.map(_rangeInFile).toList(growable: false);
  }

  Future<List<Map<String, Object?>>> _getDocumentSymbols(
    String? textDocumentIdentifier,
  ) async {
    if (textDocumentIdentifier == null || textDocumentIdentifier.isEmpty) {
      return const <Map<String, Object?>>[];
    }

    final path = _normalizePath(textDocumentIdentifier);
    final file = File(path);
    if (!await file.exists()) {
      return const <Map<String, Object?>>[];
    }

    final declarations = await _scanSymbolDeclarations(path);
    final topLevel = declarations
        .where((item) => item.containerName == null)
        .toList(growable: false);
    final childrenByContainer = <String, List<_WorkspaceSymbolMatch>>{};
    for (final declaration in declarations.where(
      (item) => item.containerName != null,
    )) {
      childrenByContainer
          .putIfAbsent(
            declaration.containerName!,
            () => <_WorkspaceSymbolMatch>[],
          )
          .add(declaration);
    }

    return topLevel
        .map(
          (declaration) => _documentSymbol(
            declaration,
            children:
                childrenByContainer[declaration.symbol] ??
                const <_WorkspaceSymbolMatch>[],
          ),
        )
        .toList(growable: false);
  }

  Map<String, Object?>? _parseLocation(Map<String, Object?>? payload) {
    if (payload == null) {
      return null;
    }

    final filepath = payload['filepath'] as String?;
    final position = (payload['position'] as Map?)?.cast<String, Object?>();
    if (filepath == null || position == null) {
      return null;
    }

    return {
      'filepath': _normalizePath(filepath),
      'position': {
        'line': (position['line'] as num?)?.toInt() ?? 0,
        'character': (position['character'] as num?)?.toInt() ?? 0,
      },
    };
  }

  Future<_ResolvedSymbolContext?> _resolveSymbolContext(
    Map<String, Object?>? location,
  ) async {
    if (location == null) {
      return null;
    }

    final filepath = location['filepath'] as String?;
    final position = (location['position'] as Map?)?.cast<String, Object?>();
    if (filepath == null || position == null) {
      return null;
    }

    final line = (position['line'] as num?)?.toInt() ?? 0;
    final character = (position['character'] as num?)?.toInt() ?? 0;
    final symbol = await _extractSymbolAt(
      filepath,
      line: line,
      character: character,
    );
    if (symbol == null || symbol.isEmpty) {
      return null;
    }

    return _ResolvedSymbolContext(
      filepath: filepath,
      line: line,
      character: character,
      symbol: symbol,
    );
  }

  Future<String?> _extractSymbolAt(
    String filepath, {
    required int line,
    required int character,
  }) async {
    final file = File(filepath);
    if (!await file.exists()) {
      return null;
    }

    final lines = await file.readAsLines();
    if (line < 0 || line >= lines.length) {
      return null;
    }

    final sourceLine = lines[line];
    if (sourceLine.isEmpty) {
      return null;
    }

    final safeCharacter = character.clamp(0, sourceLine.length).toInt();
    var start = safeCharacter;
    var end = safeCharacter;

    while (start > 0 && _isIdentifierChar(sourceLine.codeUnitAt(start - 1))) {
      start--;
    }
    while (end < sourceLine.length &&
        _isIdentifierChar(sourceLine.codeUnitAt(end))) {
      end++;
    }

    if (start == end) {
      return null;
    }

    return sourceLine.substring(start, end);
  }

  bool _isIdentifierChar(int codeUnit) {
    final isUpper = codeUnit >= 65 && codeUnit <= 90;
    final isLower = codeUnit >= 97 && codeUnit <= 122;
    final isDigit = codeUnit >= 48 && codeUnit <= 57;
    return isUpper || isLower || isDigit || codeUnit == 95 || codeUnit == 36;
  }

  Future<_WorkspaceSymbolMatch?> _findBestDefinition(
    String symbol, {
    required String sourcePath,
  }) async {
    final matches = <_WorkspaceSymbolMatch>[];
    for (final workspaceDir in workspaceDirs) {
      final normalizedDir = _normalizePath(workspaceDir);
      final directory = Directory(normalizedDir);
      if (!await directory.exists()) {
        continue;
      }

      await for (final entity in directory.list(
        recursive: true,
        followLinks: false,
      )) {
        if (entity is! File || !_isSourceFile(entity.path)) {
          continue;
        }
        final declarations = await _scanSymbolDeclarations(entity.path);
        matches.addAll(declarations.where((item) => item.symbol == symbol));
      }
    }

    if (matches.isEmpty) {
      return null;
    }

    matches.sort((a, b) {
      final aScore = _definitionScore(a, sourcePath: sourcePath);
      final bScore = _definitionScore(b, sourcePath: sourcePath);
      if (aScore != bScore) {
        return bScore.compareTo(aScore);
      }
      if (a.filepath != b.filepath) {
        return a.filepath.compareTo(b.filepath);
      }
      if (a.startLine != b.startLine) {
        return a.startLine.compareTo(b.startLine);
      }
      return a.startCharacter.compareTo(b.startCharacter);
    });
    return matches.first;
  }

  int _definitionScore(
    _WorkspaceSymbolMatch match, {
    required String sourcePath,
  }) {
    var score = 0;
    if (match.filepath == sourcePath) {
      score += 100;
    }
    if (match.containerName == null) {
      score += 20;
    }
    switch (match.kind) {
      case 4:
      case 9:
      case 10:
      case 11:
        score += 10;
      default:
        break;
    }
    return score;
  }

  Future<List<_WorkspaceSymbolMatch>> _findReferenceMatches(
    String symbol, {
    required String sourcePath,
  }) async {
    final rg = await _resolveExecutable('rg');
    final matches = <_WorkspaceSymbolMatch>[];

    if (rg != null) {
      for (final workspaceDir in workspaceDirs) {
        final normalizedDir = _normalizePath(workspaceDir);
        final output = await _runProcess(
          rg,
          [
            '--line-number',
            '--column',
            '--no-heading',
            '--word-regexp',
            ..._sourceFileGlobArgs(),
            symbol,
            '.',
          ],
          cwd: normalizedDir,
          allowFailure: true,
        );
        matches.addAll(
          _parseRipgrepMatches(
            output.$1,
            workspaceDir: normalizedDir,
            symbol: symbol,
          ),
        );
      }
    }

    if (matches.isEmpty) {
      final pattern = RegExp('\\b${RegExp.escape(symbol)}\\b');
      for (final workspaceDir in workspaceDirs) {
        final normalizedDir = _normalizePath(workspaceDir);
        final directory = Directory(normalizedDir);
        if (!await directory.exists()) {
          continue;
        }

        await for (final entity in directory.list(
          recursive: true,
          followLinks: false,
        )) {
          if (entity is! File || !_isSourceFile(entity.path)) {
            continue;
          }
          final lines = await entity.readAsLines();
          for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            for (final match in pattern.allMatches(lines[lineIndex])) {
              matches.add(
                _WorkspaceSymbolMatch(
                  symbol: symbol,
                  filepath: entity.path,
                  startLine: lineIndex,
                  startCharacter: match.start,
                  endLine: lineIndex,
                  endCharacter: match.end,
                  kind: 12,
                ),
              );
            }
          }
        }
      }
    }

    matches.sort((a, b) {
      if (a.filepath == sourcePath && b.filepath != sourcePath) {
        return -1;
      }
      if (b.filepath == sourcePath && a.filepath != sourcePath) {
        return 1;
      }
      if (a.filepath != b.filepath) {
        return a.filepath.compareTo(b.filepath);
      }
      if (a.startLine != b.startLine) {
        return a.startLine.compareTo(b.startLine);
      }
      return a.startCharacter.compareTo(b.startCharacter);
    });

    return _dedupeMatches(matches);
  }

  List<_WorkspaceSymbolMatch> _parseRipgrepMatches(
    String output, {
    required String workspaceDir,
    required String symbol,
  }) {
    final matches = <_WorkspaceSymbolMatch>[];
    for (final line in LineSplitter.split(output)) {
      final match = RegExp(r'^(.*?):(\d+):(\d+):(.*)$').firstMatch(line);
      if (match == null) {
        continue;
      }

      final rawPath = match.group(1) ?? '';
      final lineNumber = int.tryParse(match.group(2) ?? '');
      final columnNumber = int.tryParse(match.group(3) ?? '');
      if (rawPath.isEmpty || lineNumber == null || columnNumber == null) {
        continue;
      }

      final normalizedRelativePath = rawPath.startsWith('./')
          ? rawPath.substring(2)
          : rawPath;
      final resolvedPath = rawPath.startsWith('/')
          ? rawPath
          : '$workspaceDir${Platform.pathSeparator}$normalizedRelativePath';
      final startCharacter = columnNumber - 1;
      matches.add(
        _WorkspaceSymbolMatch(
          symbol: symbol,
          filepath: _normalizePath(resolvedPath),
          startLine: lineNumber - 1,
          startCharacter: startCharacter,
          endLine: lineNumber - 1,
          endCharacter: startCharacter + symbol.length,
          kind: 12,
        ),
      );
    }
    return matches;
  }

  List<_WorkspaceSymbolMatch> _dedupeMatches(
    List<_WorkspaceSymbolMatch> matches,
  ) {
    final seen = <String>{};
    final deduped = <_WorkspaceSymbolMatch>[];
    for (final match in matches) {
      final key = [
        match.filepath,
        match.startLine,
        match.startCharacter,
        match.endLine,
        match.endCharacter,
      ].join(':');
      if (seen.add(key)) {
        deduped.add(match);
      }
    }
    return deduped;
  }

  Future<List<_WorkspaceSymbolMatch>> _scanSymbolDeclarations(
    String path,
  ) async {
    final file = File(path);
    if (!await file.exists()) {
      return const <_WorkspaceSymbolMatch>[];
    }

    final lines = await file.readAsLines();
    final declarations = <_WorkspaceSymbolMatch>[];
    final containerStack = <_SymbolContainer>[];
    var braceDepth = 0;

    final classRegex = RegExp(
      r'^\s*(?:abstract\s+)?(class|enum|mixin|extension|typedef|interface)\s+([A-Za-z_][A-Za-z0-9_]*)',
    );
    final functionRegex = RegExp(
      r'^\s*(?:static\s+|external\s+|async\s+|override\s+|factory\s+|const\s+)*'
      r'(?:[A-Za-z_][A-Za-z0-9_<>,\?\[\]\s]*\s+)?'
      r'([A-Za-z_][A-Za-z0-9_]*)\s*\([^;=]*\)\s*(?:async\s*)?(?:=>|\{)',
    );
    final variableRegex = RegExp(
      r'^\s*(?:static\s+)?(?:late\s+)?(final|const|var)\s+([A-Za-z_][A-Za-z0-9_]*)',
    );
    final fieldRegex = RegExp(
      r'^\s*(?:static\s+)?(?:late\s+)?(?:[A-Za-z_][A-Za-z0-9_<>,\?\[\]\s]*\s+)'
      r'([A-Za-z_][A-Za-z0-9_]*)\s*(?:=|;)',
    );
    const controlKeywords = <String>{
      'if',
      'for',
      'while',
      'switch',
      'catch',
      'return',
      'throw',
      'assert',
    };

    for (var index = 0; index < lines.length; index++) {
      while (containerStack.isNotEmpty &&
          braceDepth < containerStack.last.depth) {
        containerStack.removeLast();
      }

      final line = lines[index];
      final trimmed = line.trim();
      final activeContainer = containerStack.isEmpty
          ? null
          : containerStack.last.name;
      final delta = _braceDelta(line);
      _SymbolContainer? pendingContainer;

      if (trimmed.isNotEmpty &&
          !trimmed.startsWith('//') &&
          !trimmed.startsWith('*') &&
          !trimmed.startsWith('@')) {
        final classMatch = classRegex.firstMatch(line);
        if (classMatch != null) {
          final declarationType = classMatch.group(1)!;
          final symbol = classMatch.group(2)!;
          declarations.add(
            _createSymbolMatch(
              symbol: symbol,
              filepath: path,
              line: index,
              sourceLine: line,
              kind: _symbolKindForDeclarationType(declarationType),
              containerName: activeContainer,
            ),
          );
          if (line.contains('{') && delta > 0) {
            pendingContainer = _SymbolContainer(symbol, braceDepth + delta);
          }
        } else {
          final functionMatch = functionRegex.firstMatch(line);
          if (functionMatch != null) {
            final symbol = functionMatch.group(1)!;
            if (!controlKeywords.contains(symbol)) {
              var kind = activeContainer == null ? 11 : 5;
              if (activeContainer != null && symbol == activeContainer) {
                kind = 8;
              }
              declarations.add(
                _createSymbolMatch(
                  symbol: symbol,
                  filepath: path,
                  line: index,
                  sourceLine: line,
                  kind: kind,
                  containerName: activeContainer,
                ),
              );
            }
          } else {
            final variableMatch = variableRegex.firstMatch(line);
            if (variableMatch != null) {
              final qualifier = variableMatch.group(1)!;
              final symbol = variableMatch.group(2)!;
              declarations.add(
                _createSymbolMatch(
                  symbol: symbol,
                  filepath: path,
                  line: index,
                  sourceLine: line,
                  kind: activeContainer == null
                      ? (qualifier == 'const' ? 13 : 12)
                      : 7,
                  containerName: activeContainer,
                ),
              );
            } else if (activeContainer != null && !line.contains('(')) {
              final fieldMatch = fieldRegex.firstMatch(line);
              if (fieldMatch != null) {
                final symbol = fieldMatch.group(1)!;
                declarations.add(
                  _createSymbolMatch(
                    symbol: symbol,
                    filepath: path,
                    line: index,
                    sourceLine: line,
                    kind: 7,
                    containerName: activeContainer,
                  ),
                );
              }
            }
          }
        }
      }

      braceDepth += delta;
      if (pendingContainer != null && braceDepth >= pendingContainer.depth) {
        containerStack.add(pendingContainer);
      }
    }

    return declarations;
  }

  _WorkspaceSymbolMatch _createSymbolMatch({
    required String symbol,
    required String filepath,
    required int line,
    required String sourceLine,
    required int kind,
    String? containerName,
  }) {
    final startCharacter = sourceLine.indexOf(symbol);
    final safeStartCharacter = startCharacter < 0 ? 0 : startCharacter;
    return _WorkspaceSymbolMatch(
      symbol: symbol,
      filepath: filepath,
      startLine: line,
      startCharacter: safeStartCharacter,
      endLine: line,
      endCharacter: safeStartCharacter + symbol.length,
      kind: kind,
      containerName: containerName,
    );
  }

  int _symbolKindForDeclarationType(String declarationType) {
    switch (declarationType) {
      case 'class':
        return 4;
      case 'enum':
        return 9;
      case 'mixin':
      case 'interface':
        return 10;
      case 'extension':
      case 'typedef':
        return 11;
      default:
        return 12;
    }
  }

  int _braceDelta(String line) {
    var opens = 0;
    var closes = 0;
    for (final codeUnit in line.codeUnits) {
      if (codeUnit == 123) {
        opens++;
      } else if (codeUnit == 125) {
        closes++;
      }
    }
    return opens - closes;
  }

  bool _isSourceFile(String path) {
    final lower = path.toLowerCase();
    return const <String>[
      '.dart',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.java',
      '.kt',
      '.swift',
      '.m',
      '.mm',
      '.c',
      '.cc',
      '.cpp',
      '.h',
      '.hpp',
      '.json',
      '.yaml',
      '.yml',
    ].any(lower.endsWith);
  }

  List<String> _sourceFileGlobArgs() {
    return const <String>[
      '--glob',
      '*.dart',
      '--glob',
      '*.ts',
      '--glob',
      '*.tsx',
      '--glob',
      '*.js',
      '--glob',
      '*.jsx',
      '--glob',
      '*.java',
      '--glob',
      '*.kt',
      '--glob',
      '*.swift',
      '--glob',
      '*.m',
      '--glob',
      '*.mm',
      '--glob',
      '*.c',
      '--glob',
      '*.cc',
      '--glob',
      '*.cpp',
      '--glob',
      '*.h',
      '--glob',
      '*.hpp',
      '--glob',
      '*.json',
      '--glob',
      '*.yaml',
      '--glob',
      '*.yml',
    ];
  }

  Map<String, Object?> _rangeInFile(_WorkspaceSymbolMatch match) {
    return {
      'filepath': _asUriString(match.filepath),
      'range': {
        'start': {'line': match.startLine, 'character': match.startCharacter},
        'end': {'line': match.endLine, 'character': match.endCharacter},
      },
    };
  }

  Map<String, Object?> _documentSymbol(
    _WorkspaceSymbolMatch match, {
    List<_WorkspaceSymbolMatch> children = const <_WorkspaceSymbolMatch>[],
  }) {
    return {
      'name': match.symbol,
      'kind': match.kind,
      'range': {
        'start': {'line': match.startLine, 'character': match.startCharacter},
        'end': {'line': match.endLine, 'character': match.endCharacter},
      },
      'selectionRange': {
        'start': {'line': match.startLine, 'character': match.startCharacter},
        'end': {'line': match.endLine, 'character': match.endCharacter},
      },
      if (children.isNotEmpty)
        'children': children
            .map((child) => _documentSymbol(child))
            .toList(growable: false),
    };
  }

  String? _resolveProblemTarget(String? filepath) {
    final candidate = filepath == null || filepath.isEmpty
        ? currentFilePath
        : _normalizePath(filepath);
    if (candidate == null || candidate.isEmpty) {
      return null;
    }
    return _normalizePath(candidate);
  }

  String? _pickWorkspaceDirForPath(String path) {
    for (final workspaceDir in workspaceDirs) {
      final normalizedWorkspace = _normalizePath(workspaceDir);
      if (path == normalizedWorkspace ||
          path.startsWith('$normalizedWorkspace${Platform.pathSeparator}')) {
        return normalizedWorkspace;
      }
    }
    return workspaceDirs.isEmpty ? null : _normalizePath(workspaceDirs.first);
  }

  Map<String, Object?>? _toProblem(
    Object? diagnostic, {
    required String requestedPath,
  }) {
    if (diagnostic is! Map) {
      return null;
    }

    final map = diagnostic.cast<Object?, Object?>();
    final location = map['location'];
    if (location is! Map) {
      return null;
    }

    final locationMap = location.cast<Object?, Object?>();
    final file = '${locationMap['file'] ?? ''}'.trim();
    if (file.isEmpty) {
      return null;
    }

    final normalizedRequested = _normalizePath(requestedPath);
    final normalizedFile = _normalizePath(file);
    if (normalizedFile != normalizedRequested) {
      return null;
    }

    final startLine = ((_intValue(locationMap['startLine']) ?? 1) - 1).clamp(
      0,
      1 << 20,
    );
    final startColumn = ((_intValue(locationMap['startColumn']) ?? 1) - 1)
        .clamp(0, 1 << 20);
    final endLine = ((_intValue(locationMap['endLine']) ?? (startLine + 1)) - 1)
        .clamp(startLine, 1 << 20);
    final endColumn =
        ((_intValue(locationMap['endColumn']) ?? (startColumn + 1)) - 1).clamp(
          0,
          1 << 20,
        );

    final code = '${map['code'] ?? ''}'.trim();
    final severity = '${map['severity'] ?? ''}'.trim();
    final message = '${map['problemMessage'] ?? map['message'] ?? ''}'.trim();
    if (message.isEmpty) {
      return null;
    }

    return {
      'filepath': _asUriString(normalizedFile),
      'range': {
        'start': {'line': startLine, 'character': startColumn},
        'end': {'line': endLine, 'character': endColumn},
      },
      'message': [
        if (severity.isNotEmpty) severity.toUpperCase(),
        if (code.isNotEmpty) code,
        message,
      ].join(': '),
    };
  }

  int? _intValue(Object? value) {
    if (value is int) {
      return value;
    }
    if (value is num) {
      return value.toInt();
    }
    return int.tryParse('$value');
  }

  Future<List<String>> _collectGitRoots() async {
    final roots = <String>{};
    for (final dir in workspaceDirs) {
      final gitRoot = await _resolveGitRoot(dir);
      if (gitRoot != null && gitRoot.isNotEmpty) {
        roots.add(gitRoot);
      }
    }
    return roots.toList(growable: false);
  }

  List<String> _splitGitDiff(String diffText) {
    final trimmed = diffText.trim();
    if (trimmed.isEmpty) {
      return const <String>[];
    }

    final chunks = <String>[];
    final buffer = StringBuffer();
    for (final line in LineSplitter.split(diffText)) {
      if (line.startsWith('diff --git ') && buffer.isNotEmpty) {
        chunks.add(buffer.toString().trimRight());
        buffer.clear();
      }
      buffer.writeln(line);
    }
    if (buffer.isNotEmpty) {
      chunks.add(buffer.toString().trimRight());
    }
    return chunks;
  }

  _PlatformOpenCommand _platformOpenCommand(String path) {
    if (Platform.isMacOS) {
      return _PlatformOpenCommand('open', [path]);
    }
    if (Platform.isWindows) {
      return _PlatformOpenCommand('cmd', ['/c', 'start', '', path]);
    }
    return _PlatformOpenCommand('xdg-open', [path]);
  }

  Future<String?> _resolveExecutable(String command) async {
    try {
      final result = await Process.run(Platform.isWindows ? 'where' : 'which', [
        command,
      ], runInShell: Platform.isWindows);
      if (result.exitCode != 0) {
        return null;
      }
      final output = '${result.stdout ?? ''}'.trim();
      if (output.isEmpty) {
        return null;
      }
      return LineSplitter.split(output).first.trim();
    } catch (_) {
      return null;
    }
  }

  _ShellCommand get _defaultShell {
    if (Platform.isWindows) {
      return const _ShellCommand('cmd', ['/c']);
    }
    if (File('/bin/zsh').existsSync()) {
      return const _ShellCommand('/bin/zsh', ['-lc']);
    }
    return const _ShellCommand('/bin/sh', ['-lc']);
  }
}

class _ResolvedSymbolContext {
  const _ResolvedSymbolContext({
    required this.filepath,
    required this.line,
    required this.character,
    required this.symbol,
  });

  final String filepath;
  final int line;
  final int character;
  final String symbol;
}

class _WorkspaceSymbolMatch {
  const _WorkspaceSymbolMatch({
    required this.symbol,
    required this.filepath,
    required this.startLine,
    required this.startCharacter,
    required this.endLine,
    required this.endCharacter,
    required this.kind,
    this.containerName,
  });

  final String symbol;
  final String filepath;
  final int startLine;
  final int startCharacter;
  final int endLine;
  final int endCharacter;
  final int kind;
  final String? containerName;
}

class _SymbolContainer {
  const _SymbolContainer(this.name, this.depth);

  final String name;
  final int depth;
}

class _ShellCommand {
  const _ShellCommand(this.executable, this.arguments);

  final String executable;
  final List<String> arguments;
}

class _PlatformOpenCommand {
  const _PlatformOpenCommand(this.executable, this.arguments);

  final String executable;
  final List<String> arguments;
}
