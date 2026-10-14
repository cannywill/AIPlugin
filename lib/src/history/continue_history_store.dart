abstract class ContinueHistoryStore {
  Future<void> init();

  Future<List<Map<String, Object?>>> list({
    int? limit,
    int? offset,
    String? workspaceDirectory,
  });

  Future<Map<String, Object?>> load(String sessionId);

  Future<Map<String, Object?>> loadRemote(String remoteId);

  Future<void> save(Map<String, Object?> session);

  Future<void> delete(String sessionId);

  Future<void> clear();
}
