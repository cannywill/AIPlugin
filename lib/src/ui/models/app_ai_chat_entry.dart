enum AppAiMessageRole { system, user, assistant, tool }

class AppAiChatEntry {
  const AppAiChatEntry({
    required this.id,
    required this.role,
    required this.content,
    this.isStreaming = false,
  });

  final String id;
  final AppAiMessageRole role;
  final String content;
  final bool isStreaming;
}
