import { IChannel, ProxyChannel } from '../../../base/parts/ipc/common/ipc.js';
import { ServiceIdentifier } from '../../instantiation/common/instantiation.js';
import { IRemoteService } from '../common/services.js';
type ChannelClientCtor<T> = {
    new (channel: IChannel, ...args: any[]): T;
};
export interface IRemoteServiceWithChannelClientOptions<T> {
    readonly channelClientCtor: ChannelClientCtor<T>;
}
export interface IRemoteServiceWithProxyOptions {
    readonly proxyOptions?: ProxyChannel.ICreateProxyServiceOptions;
}
export declare function registerMainProcessRemoteService<T>(id: ServiceIdentifier<T>, channelName: string, options?: IRemoteServiceWithChannelClientOptions<T> | IRemoteServiceWithProxyOptions): void;
export declare const ISharedProcessService: ServiceIdentifier<ISharedProcessService>;
export interface ISharedProcessService extends IRemoteService {
    createRawConnection(): Promise<MessagePort>;
    notifyRestored(): void;
}
export declare function registerSharedProcessRemoteService<T>(id: ServiceIdentifier<T>, channelName: string, options?: IRemoteServiceWithChannelClientOptions<T> | IRemoteServiceWithProxyOptions): void;
export {};