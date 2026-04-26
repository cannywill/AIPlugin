class AppAiSessionSummary {
  const AppAiSessionSummary({
    required this.id,
    required this.title,
    this.subtitle,
  });

  final String id;
  final String title;
  final String? subtitle;
}
