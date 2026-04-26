import 'package:flutter/material.dart';

import 'continue_gui_shell_port.dart';
import 'continue_gui_source.dart';

class ContinueGuiWebView extends StatelessWidget {
  const ContinueGuiWebView({
    required this.source,
    required this.shellPort,
    this.placeholder,
    super.key,
  });

  final ContinueGuiSource source;
  final ContinueGuiShellPort shellPort;
  final Widget? placeholder;

  @override
  Widget build(BuildContext context) {
    return placeholder ??
        const Center(
          child: Text(
            'Continue GUI WebView is only available on IO platforms.',
            textAlign: TextAlign.center,
          ),
        );
  }
}
