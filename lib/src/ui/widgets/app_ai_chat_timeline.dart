import 'package:flutter/material.dart';

import '../models/app_ai_chat_entry.dart';

class AppAiChatTimeline extends StatelessWidget {
  const AppAiChatTimeline({required this.messages, super.key});

  final List<AppAiChatEntry> messages;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      itemCount: messages.length,
      separatorBuilder: (_, __) => const SizedBox(height: 14),
      itemBuilder: (context, index) {
        final message = messages[index];
        final isUser = message.role == AppAiMessageRole.user;
        final backgroundColor = switch (message.role) {
          AppAiMessageRole.user => const Color(0xFFDCF6EC),
          AppAiMessageRole.assistant => Colors.white,
          AppAiMessageRole.system => const Color(0xFFF5F7FA),
          AppAiMessageRole.tool => const Color(0xFFFFF4DE),
        };

        return Align(
          alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 760),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: backgroundColor,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: const Color(0xFFD7E4E0)),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x11000000),
                    blurRadius: 8,
                    offset: Offset(0, 3),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _roleLabel(message.role),
                      style: Theme.of(context).textTheme.labelMedium?.copyWith(
                        color: const Color(0xFF4F6B65),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(message.content),
                    if (message.isStreaming) ...[
                      const SizedBox(height: 10),
                      const LinearProgressIndicator(minHeight: 3),
                    ],
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  String _roleLabel(AppAiMessageRole role) {
    return switch (role) {
      AppAiMessageRole.system => 'System',
      AppAiMessageRole.user => 'You',
      AppAiMessageRole.assistant => 'Assistant',
      AppAiMessageRole.tool => 'Tool',
    };
  }
}
