// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';

import 'package:app_ai_plugin_example/main.dart';

void main() {
  testWidgets('renders componentized plugin shell', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('App AI Plugin Example'), findsOneWidget);
    expect(find.text('AI Sessions'), findsOneWidget);
    expect(find.text('New Session'), findsOneWidget);
    expect(find.text('Send'), findsOneWidget);
  });
}
