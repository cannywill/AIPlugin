import type { IProtocol } from "../index";
export interface Message<T = any> {
    messageType: string;
    messageId: string;
    data: T;
}
export interface FromMessage<FromProtocol extends IProtocol, T extends keyof FromProtocol> {
    messageType: T;
    messageId: string;
    data: FromProtocol[T][1];
}
export interface IMessenger<ToProtocol extends IProtocol, FromProtocol extends IProtocol> {
    onError(handler: (message: Message, error: Error) => void): void;
    send<T extends keyof FromProtocol>(messageType: T, data: FromProtocol[T][0], messageId?: string): string;
    on<T extends keyof ToProtocol>(messageType: T, handler: (message: Message<ToProtocol[T][0]>) => Promise<ToProtocol[T][1]> | ToProtocol[T][1]): void;
    request<T extends keyof FromProtocol>(messageType: T, data: FromProtocol[T][0]): Promise<FromProtocol[T][1]>;
    invoke<T extends keyof ToProtocol>(messageType: T, data: ToProtocol[T][0], messageId?: string): ToProtocol[T][1];
}
export declare class InProcessMessenger<ToProtocol extends IProtocol, FromProtocol extends IProtocol> implements IMessenger<ToProtocol, FromProtocol> {
    protected myTypeListeners: Map<keyof ToProtocol, (message: Message) => any>;
    protected externalTypeListeners: Map<keyof FromProtocol, (message: Message) => any>;
    protected _onErrorHandlers: ((message: Message, error: Error) => void)[];
    onError(handler: (message: Message, error: Error) => void): void;
    invoke<T extends keyof ToProtocol>(messageType: T, data: ToProtocol[T][0], messageId?: string): ToProtocol[T][1];
    send<T extends keyof FromProtocol>(messageType: T, message: any, _messageId?: string): string;
    on<T extends keyof ToProtocol>(messageType: T, handler: (message: Message<ToProtocol[T][0]>) => ToProtocol[T][1]): void;
    request<T extends keyof FromProtocol>(messageType: T, data: FromProtocol[T][0]): Promise<FromProtocol[T][1]>;
    externalOn<T extends keyof FromProtocol>(messageType: T, handler: (message: Message) => any): void;
    externalRequest<T extends keyof ToProtocol>(messageType: T, data: ToProtocol[T][0], _messageId?: string): Promise<ToProtocol[T][1]>;
}
//# sourceMappingURL=index.d.ts.map