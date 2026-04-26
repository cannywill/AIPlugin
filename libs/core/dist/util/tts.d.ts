import { ChildProcess } from "child_process";
import type { IMessenger } from "../protocol/messenger";
import type { FromCoreProtocol, ToCoreProtocol } from "../protocol";
/**
 * Cleans a message text to safely be used in 'exec' context on host.
 *
 * Return modified message text.
 */
export declare function sanitizeMessageForTTS(message: string): string;
export declare class TTS {
    static os: string | undefined;
    static handle: ChildProcess | undefined;
    static messenger: IMessenger<ToCoreProtocol, FromCoreProtocol>;
    static read(message: string): Promise<void>;
    static kill(): Promise<void>;
    static setup(): Promise<void>;
}
//# sourceMappingURL=tts.d.ts.map