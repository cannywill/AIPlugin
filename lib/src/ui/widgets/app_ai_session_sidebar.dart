import 'package:flutter/material.dart';

import '../models/app_ai_session_summary.dart';

class AppAiSessionSidebar extends StatelessWidget {
  const AppAiSessionSidebar({
    required this.sessions,
    required this.selectedSessionId,
    required this.onSessionSelected,
    this.onNewSession,
    super.key,
  });

  final List<AppAiSessionSummary> sessions;
  final String? selectedSessionId;
  final ValueChanged<String> onSessionSelected;
  final VoidCallback? onNewSession;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: 280,
      decoration: const BoxDecoration(color: Color(0xFF0F2B28)),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'AI Sessions',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Plugin shell, reusable widgets, and Continue-compatible routing.',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: const Color(0xFFC6DDD7),
                ),
              ),
              const SizedBox(height: 16),
              FilledButton(
                onPressed: onNewSession,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFF2BB08A),
                  minimumSize: const Size.fromHeight(44),
                ),
                child: const Text('New Session'),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.separated(
                  itemCount: sessions.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 8),
                  itemBuilder: (context, index) {
                    final session = sessions[index];
                    final isSelected = session.id == selectedSessionId;
                    return InkWell(
                      onTap: () => onSessionSelected(session.id),
                      borderRadius: BorderRadius.circular(16),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 180),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? const Color(0xFF1E4A44)
                              : const Color(0xFF143532),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected
                                ? const Color(0xFF74D7BC)
                                : Colors.transparent,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              session.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: theme.textTheme.titleSmall?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            if (session.subtitle case final subtitle?) ...[
                              const SizedBox(height: 6),
                              Text(
                                subtitle,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: const Color(0xFFB7CDC7),
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
