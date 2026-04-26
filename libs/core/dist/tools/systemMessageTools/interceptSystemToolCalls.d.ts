import { ChatMessage, PromptLog } from "../..";
import { SystemMessageToolsFramework } from "./types";
export declare function interceptSystemToolCalls(messageGenerator: AsyncGenerator<ChatMessage[], PromptLog | undefined>, abortController: AbortController, systemToolFramework: SystemMessageToolsFramework): AsyncGenerator<ChatMessage[], PromptLog | undefined>;
//# sourceMappingURL=interceptSystemToolCalls.d.ts.map