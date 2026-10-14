import 'dart:convert';

import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import 'continue_history_store.dart';

/// 文件类型：本地 SQLite 管理器
/// 文件作用：在 Flutter 宿主进程内持久化 Continue 会话历史，替代 history/* 对 core 的依赖。
/// 主要职责：提供与 Continue HistoryManager 对齐的 list/load/save/delete/clear 能力，并保持单例初始化方式。
class ContinueHistorySqliteManager implements ContinueHistoryStore {
  ContinueHistorySqliteManager._();

  static ContinueHistorySqliteManager? _instance;

  static ContinueHistorySqliteManager getInstance() {
    _instance ??= ContinueHistorySqliteManager._();
    return _instance!;
  }

  static const String _databaseFileName = 'continue_history.db';
  static const String _sessionsTable = 'continue_sessions';

  Future<Database>? _databaseFuture;

  @override
  Future<void> init() async {
    await database;
  }

  Future<Database> get database {
    return _databaseFuture ??= _openDatabase();
  }

  @override
  Future<List<Map<String, Object?>>> list({
    int? limit,
    int? offset,
    String? workspaceDirectory,
  }) async {
    final db = await database;
    final whereClauses = <String>[];
    final whereArgs = <Object?>[];

    if (workspaceDirectory != null && workspaceDirectory.isNotEmpty) {
      whereClauses.add('LOWER(workspace_directory) = ?');
      whereArgs.add(workspaceDirectory.toLowerCase());
    }

    final rows = await db.query(
      _sessionsTable,
      columns: const <String>[
        'session_id',
        'title',
        'date_created',
        'workspace_directory',
        'message_count',
      ],
      where: whereClauses.isEmpty ? null : whereClauses.join(' AND '),
      whereArgs: whereArgs.isEmpty ? null : whereArgs,
      orderBy: 'date_created DESC',
      limit: limit,
      offset: offset,
    );

    return rows.map(_sessionListItemFromRow).toList(growable: false);
  }

  @override
  Future<Map<String, Object?>> load(String sessionId) async {
    final db = await database;
    final rows = await db.query(
      _sessionsTable,
      where: 'session_id = ?',
      whereArgs: <Object?>[sessionId],
      limit: 1,
    );

    if (rows.isEmpty) {
      return <String, Object?>{
        'sessionId': sessionId,
        'title': 'New Session',
        'workspaceDirectory': '',
        'history': const <Object?>[],
      };
    }

    return _sessionFromRow(rows.first);
  }

  @override
  Future<Map<String, Object?>> loadRemote(String remoteId) async {
    return <String, Object?>{
      'sessionId': remoteId,
      'title': 'Remote Session',
      'workspaceDirectory': '',
      'history': const <Object?>[],
    };
  }

  @override
  Future<void> save(Map<String, Object?> session) async {
    final db = await database;
    final sessionId = session['sessionId'] as String?;
    if (sessionId == null || sessionId.isEmpty) {
      throw ArgumentError('history/save requires a non-empty sessionId.');
    }

    final existingRows = await db.query(
      _sessionsTable,
      columns: const <String>['date_created'],
      where: 'session_id = ?',
      whereArgs: <Object?>[sessionId],
      limit: 1,
    );
    final history = _sessionHistory(session);
    final messageCount = history.where((item) {
      final map = item is Map ? item.cast<Object?, Object?>() : null;
      final message = map?['message'];
      if (message is! Map) {
        return false;
      }
      return message['role'] == 'assistant';
    }).length;

    await db.insert(_sessionsTable, <String, Object?>{
      'session_id': sessionId,
      'title': (session['title'] as String?) ?? 'New Session',
      'workspace_directory': (session['workspaceDirectory'] as String?) ?? '',
      'date_created': existingRows.isNotEmpty
          ? existingRows.first['date_created']
          : DateTime.now().toUtc().toIso8601String(),
      'message_count': messageCount,
      'session_json': jsonEncode(_normalizeJsonValue(session)),
    }, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  @override
  Future<void> delete(String sessionId) async {
    final db = await database;
    await db.delete(
      _sessionsTable,
      where: 'session_id = ?',
      whereArgs: <Object?>[sessionId],
    );
  }

  @override
  Future<void> clear() async {
    final db = await database;
    await db.delete(_sessionsTable);
  }

  Future<Database> _openDatabase() async {
    final supportDirectory = await getApplicationSupportDirectory();
    final databasePath = path.join(supportDirectory.path, _databaseFileName);
    return openDatabase(
      databasePath,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE $_sessionsTable (
            session_id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            workspace_directory TEXT NOT NULL,
            date_created TEXT NOT NULL,
            message_count INTEGER NOT NULL DEFAULT 0,
            session_json TEXT NOT NULL
          )
        ''');
      },
    );
  }

  Map<String, Object?> _sessionListItemFromRow(Map<String, Object?> row) {
    return <String, Object?>{
      'sessionId': row['session_id'],
      'title': row['title'],
      'dateCreated': row['date_created'],
      'workspaceDirectory': row['workspace_directory'],
      'messageCount': row['message_count'],
    };
  }

  Map<String, Object?> _sessionFromRow(Map<String, Object?> row) {
    final decoded = jsonDecode(row['session_json'] as String) as Map;
    return decoded.cast<String, Object?>();
  }

  List<Object?> _sessionHistory(Map<String, Object?> session) {
    final history = session['history'];
    if (history is List<Object?>) {
      return history;
    }
    if (history is List) {
      return history.cast<Object?>();
    }
    return const <Object?>[];
  }

  Object? _normalizeJsonValue(Object? value) {
    if (value is Map) {
      return value.map<String, Object?>(
        (key, nestedValue) =>
            MapEntry('$key', _normalizeJsonValue(nestedValue)),
      );
    }
    if (value is List) {
      return value.map(_normalizeJsonValue).toList(growable: false);
    }
    return value;
  }
}
