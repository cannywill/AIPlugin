import 'dart:convert';

class ContinueMessage {
  const ContinueMessage({
    required this.messageType,
    required this.messageId,
    required this.data,
  });

  final String messageType;
  final String messageId;
  final Object? data;

  Map<String, Object?> toJson() {
    return {'messageType': messageType, 'messageId': messageId, 'data': data};
  }

  String toLine() => jsonEncode(toJson());

  factory ContinueMessage.fromJson(Map<String, Object?> json) {
    return ContinueMessage(
      messageType: json['messageType'] as String,
      messageId: json['messageId'] as String,
      data: json['data'],
    );
  }

  factory ContinueMessage.fromLine(String line) {
    return ContinueMessage.fromJson(jsonDecode(line) as Map<String, Object?>);
  }
}
