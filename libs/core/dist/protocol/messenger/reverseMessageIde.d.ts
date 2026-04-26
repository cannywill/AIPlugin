import { IDE } from "../../index";
import { ToIdeFromWebviewOrCoreProtocol } from "../ide";
import { Message } from ".";
export declare class ReverseMessageIde {
    private readonly _on;
    private readonly ide;
    private on;
    constructor(_on: <T extends keyof ToIdeFromWebviewOrCoreProtocol>(messageType: T, handler: (message: Message<ToIdeFromWebviewOrCoreProtocol[T][0]>) => Promise<ToIdeFromWebviewOrCoreProtocol[T][1]> | ToIdeFromWebviewOrCoreProtocol[T][1]) => void, ide: IDE);
    private initializeListeners;
}
//# sourceMappingURL=reverseMessageIde.d.ts.map