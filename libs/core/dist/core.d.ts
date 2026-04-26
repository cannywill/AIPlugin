import { CompletionProvider } from "./autocomplete/CompletionProvider";
import { ConfigHandler } from "./config/ConfigHandler";
import { CodebaseIndexer } from "./indexing/CodebaseIndexer";
import { type IDE } from ".";
import { LLMLogger } from "./llm/logger";
import { NextEditProvider } from "./nextEdit/NextEditProvider";
import type { FromCoreProtocol, ToCoreProtocol } from "./protocol";
import type { IMessenger } from "./protocol/messenger";
export declare class Core {
    private readonly messenger;
    private readonly ide;
    configHandler: ConfigHandler;
    codeBaseIndexer: CodebaseIndexer;
    completionProvider: CompletionProvider;
    nextEditProvider: NextEditProvider;
    private docsService;
    private globalContext;
    llmLogger: LLMLogger;
    private messageAbortControllers;
    private addMessageAbortController;
    private abortById;
    invoke<T extends keyof ToCoreProtocol>(messageType: T, data: ToCoreProtocol[T][0]): ToCoreProtocol[T][1];
    send<T extends keyof FromCoreProtocol>(messageType: T, data: FromCoreProtocol[T][0], messageId?: string): string;
    constructor(messenger: IMessenger<ToCoreProtocol, FromCoreProtocol>, ide: IDE);
    private registerMessageHandlers;
    private handleToolCall;
    private isItemTooBig;
    private handleAddAutocompleteModel;
    private handleFilesChanged;
    private handleListModels;
    private handleCompleteOnboarding;
    private getContextItems;
}
//# sourceMappingURL=core.d.ts.map