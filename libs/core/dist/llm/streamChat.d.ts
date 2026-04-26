import { ChatMessage, IDE, PromptLog } from "..";
import { ConfigHandler } from "../config/ConfigHandler";
import { FromCoreProtocol, ToCoreProtocol } from "../protocol";
import { IMessenger, Message } from "../protocol/messenger";
export declare function llmStreamChat(configHandler: ConfigHandler, abortController: AbortController, msg: Message<ToCoreProtocol["llm/streamChat"][0]>, ide: IDE, messenger: IMessenger<ToCoreProtocol, FromCoreProtocol>): AsyncGenerator<ChatMessage, PromptLog>;
//# sourceMappingURL=streamChat.d.ts.map