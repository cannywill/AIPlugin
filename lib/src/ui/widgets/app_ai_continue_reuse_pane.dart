import 'package:flutter/material.dart';

class AppAiContinueReusePane extends StatelessWidget {
  const AppAiContinueReusePane({
    required this.child,
    this.title = 'Continue GUI Reuse Pane',
    this.subtitle = 'Mount a WebView here to reuse Continue GUI screens.',
    super.key,
  });

  final Widget child;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFF6FBF9), Color(0xFFE7F4F0)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFB8D8CF)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              subtitle,
              style: theme.textTheme.bodySmall?.copyWith(
                color: const Color(0xFF4E6D66),
              ),
            ),
            const SizedBox(height: 14),
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: ColoredBox(color: Colors.white, child: child),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
