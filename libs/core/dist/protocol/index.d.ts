import { ToCoreFromWebviewProtocol, ToWebviewFromCoreProtocol } from "./coreWebview";
import { ToWebviewOrCoreFromIdeProtocol } from "./ide";
import { ToCoreFromIdeProtocol, ToIdeFromCoreProtocol } from "./ideCore";
import { ToIdeFromWebviewProtocol, ToWebviewFromIdeProtocol } from "./ideWebview";
export type IProtocol = Record<string, [any, any]>;
export type ToIdeProtocol = ToIdeFromWebviewProtocol & ToIdeFromCoreProtocol;
export type FromIdeProtocol = ToWebviewFromIdeProtocol & ToCoreFromIdeProtocol & ToWebviewOrCoreFromIdeProtocol;
export type ToWebviewProtocol = ToWebviewFromIdeProtocol & ToWebviewFromCoreProtocol & ToWebviewOrCoreFromIdeProtocol;
export type FromWebviewProtocol = ToIdeFromWebviewProtocol & ToCoreFromWebviewProtocol;
export type ToCoreProtocol = ToCoreFromIdeProtocol & ToCoreFromWebviewProtocol & ToWebviewOrCoreFromIdeProtocol;
export type FromCoreProtocol = ToWebviewFromCoreProtocol & ToIdeFromCoreProtocol;
//# sourceMappingURL=index.d.ts.map