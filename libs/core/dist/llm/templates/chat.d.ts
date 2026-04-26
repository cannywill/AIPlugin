import { ChatMessage } from "../../index.js";
/**
 * @description Template for LLAMA2 messages:
 *
 * <s>[INST] <<SYS>>
 * {{ system_prompt }}
 * <</SYS>>
 *
 * {{ user_msg_1 }} [/INST] {{ model_answer_1 }} </s><s>[INST] {{ user_msg_2 }} [/INST] {{ model_answer_2 }} </s><s>[INST] {{ user_msg_3 }} [/INST]
 */
declare function llama2TemplateMessages(msgs: ChatMessage[]): string;
declare function codestralTemplateMessages(msgs: ChatMessage[]): string;
declare function anthropicTemplateMessages(messages: ChatMessage[]): string;
declare const llavaTemplateMessages: (msgs: ChatMessage[]) => string;
declare const zephyrTemplateMessages: (msgs: ChatMessage[]) => string;
declare const chatmlTemplateMessages: (msgs: ChatMessage[]) => string;
declare const templateAlpacaMessages: (msgs: ChatMessage[]) => string;
declare function deepseekTemplateMessages(msgs: ChatMessage[]): string;
declare const phi2TemplateMessages: (msgs: ChatMessage[]) => string;
declare const phindTemplateMessages: (msgs: ChatMessage[]) => string;
/**
 * OpenChat Template, used by CodeNinja
 * GPT4 Correct User: Hello<|end_of_turn|>GPT4 Correct Assistant: Hi<|end_of_turn|>GPT4 Correct User: How are you today?<|end_of_turn|>GPT4 Correct Assistant:
 */
declare const openchatTemplateMessages: (msgs: ChatMessage[]) => string;
/**
 * Chat template used by https://huggingface.co/TheBloke/XwinCoder-13B-GPTQ
 *

<system>: You are an AI coding assistant that helps people with programming. Write a response that appropriately completes the user's request.
<user>: {prompt}
<AI>:
 */
declare const xWinCoderTemplateMessages: (msgs: ChatMessage[]) => string;
/**
 * NeuralChat Template
 * ### System:\n{system_input}\n### User:\n{user_input}\n### Assistant:\n
 */
declare const neuralChatTemplateMessages: (msgs: ChatMessage[]) => string;
/**
'<s>Source: system\n\n System prompt <step> Source: user\n\n First user query <step> Source: assistant\n\n Model response to first query <step> Source: user\n\n Second user query <step> Source: assistant\nDestination: user\n\n '
 */
declare function codeLlama70bTemplateMessages(msgs: ChatMessage[]): string;
declare const llama3TemplateMessages: (msgs: ChatMessage[]) => string;
/**
 <start_of_turn>user
 What is Cramer's Rule?<end_of_turn>
 <start_of_turn>model
 */
declare const gemmaTemplateMessage: (msgs: ChatMessage[]) => string;
declare const graniteTemplateMessages: (msgs: ChatMessage[]) => string;
export { anthropicTemplateMessages, chatmlTemplateMessages, codeLlama70bTemplateMessages, deepseekTemplateMessages, gemmaTemplateMessage, graniteTemplateMessages, llama2TemplateMessages, llama3TemplateMessages, llavaTemplateMessages, neuralChatTemplateMessages, openchatTemplateMessages, phi2TemplateMessages, phindTemplateMessages, templateAlpacaMessages, xWinCoderTemplateMessages, zephyrTemplateMessages, codestralTemplateMessages, };
//# sourceMappingURL=chat.d.ts.map