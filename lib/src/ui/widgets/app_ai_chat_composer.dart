import 'package:flutter/material.dart';

class AppAiChatComposer extends StatefulWidget {
  const AppAiChatComposer({
    required this.onSubmit,
    this.hintText =
        'Ask about the workspace, request an edit, or trigger an agent flow...',
    super.key,
  });

  final ValueChanged<String> onSubmit;
  final String hintText;

  @override
  State<AppAiChatComposer> createState() => _AppAiChatComposerState();
}

class _AppAiChatComposerState extends State<AppAiChatComposer> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _submit() {
    final value = _controller.text.trim();
    if (value.isEmpty) {
      final messenger = ScaffoldMessenger.maybeOf(context);
      messenger?.showSnackBar(
        const SnackBar(content: Text('Please enter a prompt before sending.')),
      );
      return;
    }
    widget.onSubmit(value);
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Color(0xFFD7E4E0))),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              minLines: 1,
              maxLines: 4,
              decoration: InputDecoration(
                hintText: widget.hintText,
                filled: true,
                fillColor: const Color(0xFFF4F8F6),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: Color(0xFFCBDDD6)),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: const BorderSide(color: Color(0xFFCBDDD6)),
                ),
              ),
              onSubmitted: (_) => _submit(),
            ),
          ),
          const SizedBox(width: 12),
          FilledButton(
            onPressed: _submit,
            style: FilledButton.styleFrom(
              minimumSize: const Size(100, 52),
              backgroundColor: const Color(0xFF157E69),
            ),
            child: const Text('Send'),
          ),
        ],
      ),
    );
  }
}
