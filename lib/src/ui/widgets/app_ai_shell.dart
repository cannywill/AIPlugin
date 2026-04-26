import 'package:flutter/material.dart';

import '../models/app_ai_chat_entry.dart';
import '../models/app_ai_session_summary.dart';
import 'app_ai_chat_composer.dart';
import 'app_ai_chat_timeline.dart';
import 'app_ai_continue_reuse_pane.dart';
import 'app_ai_session_sidebar.dart';

class AppAiShell extends StatelessWidget {
  const AppAiShell({
    required this.sessions,
    required this.messages,
    required this.selectedSessionId,
    required this.onSessionSelected,
    required this.onSubmitPrompt,
    this.onNewSession,
    this.title = 'App AI Plugin',
    this.subtitle =
        'Formal plugin shell with reusable Flutter UI and Continue-compatible bridge points.',
    this.statusLabel = 'Ready',
    this.reuseGuiChild,
    this.headerActions = const <Widget>[],
    super.key,
  });

  final List<AppAiSessionSummary> sessions;
  final List<AppAiChatEntry> messages;
  final String? selectedSessionId;
  final ValueChanged<String> onSessionSelected;
  final ValueChanged<String> onSubmitPrompt;
  final VoidCallback? onNewSession;
  final String title;
  final String subtitle;
  final String statusLabel;
  final Widget? reuseGuiChild;
  final List<Widget> headerActions;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return LayoutBuilder(
      builder: (context, constraints) {
        final showReusePane =
            reuseGuiChild != null &&
            constraints.maxWidth > 900 &&
            constraints.maxHeight > 760;

        return Scaffold(
          body: Row(
            children: [
              AppAiSessionSidebar(
                sessions: sessions,
                selectedSessionId: selectedSessionId,
                onSessionSelected: onSessionSelected,
                onNewSession: onNewSession,
              ),
              Expanded(
                child: DecoratedBox(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Color(0xFFF3F8F6), Color(0xFFEAF2EF)],
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                    ),
                  ),
                  child: SafeArea(
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      title,
                                      style: theme.textTheme.headlineSmall
                                          ?.copyWith(
                                            fontWeight: FontWeight.w800,
                                          ),
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      subtitle,
                                      style: theme.textTheme.bodyMedium
                                          ?.copyWith(
                                            color: const Color(0xFF58716C),
                                          ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 16),
                              ConstrainedBox(
                                constraints: const BoxConstraints(
                                  maxWidth: 320,
                                ),
                                child: Wrap(
                                  alignment: WrapAlignment.end,
                                  crossAxisAlignment: WrapCrossAlignment.center,
                                  spacing: 12,
                                  runSpacing: 12,
                                  children: [
                                    ...headerActions,
                                    DecoratedBox(
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.circular(
                                          999,
                                        ),
                                        border: Border.all(
                                          color: const Color(0xFFCCE0D9),
                                        ),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 14,
                                          vertical: 10,
                                        ),
                                        child: Text(
                                          statusLabel,
                                          style: theme.textTheme.labelLarge
                                              ?.copyWith(
                                                color: const Color(0xFF256C5E),
                                                fontWeight: FontWeight.w700,
                                              ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 18),
                          Expanded(
                            child: showReusePane
                                ? Row(
                                    children: [
                                      Expanded(
                                        flex: 3,
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.circular(
                                            24,
                                          ),
                                          child: DecoratedBox(
                                            decoration: const BoxDecoration(
                                              color: Color(0xFFF9FBFA),
                                            ),
                                            child: Column(
                                              children: [
                                                Expanded(
                                                  child: AppAiChatTimeline(
                                                    messages: messages,
                                                  ),
                                                ),
                                                AppAiChatComposer(
                                                  onSubmit: onSubmitPrompt,
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 18),
                                      Expanded(
                                        flex: 2,
                                        child: AppAiContinueReusePane(
                                          child: reuseGuiChild!,
                                        ),
                                      ),
                                    ],
                                  )
                                : ClipRRect(
                                    borderRadius: BorderRadius.circular(24),
                                    child: DecoratedBox(
                                      decoration: const BoxDecoration(
                                        color: Color(0xFFF9FBFA),
                                      ),
                                      child: Column(
                                        children: [
                                          Expanded(
                                            child: AppAiChatTimeline(
                                              messages: messages,
                                            ),
                                          ),
                                          AppAiChatComposer(
                                            onSubmit: onSubmitPrompt,
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
