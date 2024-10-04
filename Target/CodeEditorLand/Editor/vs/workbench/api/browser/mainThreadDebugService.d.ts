import { UriComponents } from '../../../base/common/uri.js';
import { IDebugService, IConfig, IDebugAdapter, IDebugSession, IDebugAdapterFactory, DebugConfigurationProviderTriggerKind } from '../../contrib/debug/common/debug.js';
import { MainThreadDebugServiceShape, DebugSessionUUID, ISourceMultiBreakpointDto, IFunctionBreakpointDto, IDebugSessionDto, IDataBreakpointDto, IStartDebuggingOptions, IDebugConfiguration } from '../common/extHost.protocol.js';
import { IExtHostContext } from '../../services/extensions/common/extHostCustomers.js';
import { IWorkspaceFolder } from '../../../platform/workspace/common/workspace.js';
import { IDebugVisualizerService } from '../../contrib/debug/common/debugVisualizers.js';
export declare class MainThreadDebugService implements MainThreadDebugServiceShape, IDebugAdapterFactory {
    private readonly debugService;
    private readonly visualizerService;
    private readonly _proxy;
    private readonly _toDispose;
    private readonly _debugAdapters;
    private _debugAdaptersHandleCounter;
    private readonly _debugConfigurationProviders;
    private readonly _debugAdapterDescriptorFactories;
    private readonly _extHostKnownSessions;
    private readonly _visualizerHandles;
    private readonly _visualizerTreeHandles;
    constructor(extHostContext: IExtHostContext, debugService: IDebugService, visualizerService: IDebugVisualizerService);
    $registerDebugVisualizerTree(treeId: string, canEdit: boolean): void;
    $unregisterDebugVisualizerTree(treeId: string): void;
    $registerDebugVisualizer(extensionId: string, id: string): void;
    $unregisterDebugVisualizer(extensionId: string, id: string): void;
    private sendBreakpointsAndListen;
    dispose(): void;
    createDebugAdapter(session: IDebugSession): IDebugAdapter;
    substituteVariables(folder: IWorkspaceFolder | undefined, config: IConfig): Promise<IConfig>;
    runInTerminal(args: DebugProtocol.RunInTerminalRequestArguments, sessionId: string): Promise<number | undefined>;
    $registerDebugTypes(debugTypes: string[]): void;
    $registerBreakpoints(DTOs: Array<ISourceMultiBreakpointDto | IFunctionBreakpointDto | IDataBreakpointDto>): Promise<void>;
    $unregisterBreakpoints(breakpointIds: string[], functionBreakpointIds: string[], dataBreakpointIds: string[]): Promise<void>;
    $registerDebugConfigurationProvider(debugType: string, providerTriggerKind: DebugConfigurationProviderTriggerKind, hasProvide: boolean, hasResolve: boolean, hasResolve2: boolean, handle: number): Promise<void>;
    $unregisterDebugConfigurationProvider(handle: number): void;
    $registerDebugAdapterDescriptorFactory(debugType: string, handle: number): Promise<void>;
    $unregisterDebugAdapterDescriptorFactory(handle: number): void;
    private getSession;
    $startDebugging(folder: UriComponents | undefined, nameOrConfig: string | IDebugConfiguration, options: IStartDebuggingOptions): Promise<boolean>;
    $setDebugSessionName(sessionId: DebugSessionUUID, name: string): void;
    $customDebugAdapterRequest(sessionId: DebugSessionUUID, request: string, args: any): Promise<any>;
    $getDebugProtocolBreakpoint(sessionId: DebugSessionUUID, breakpoinId: string): Promise<DebugProtocol.Breakpoint | undefined>;
    $stopDebugging(sessionId: DebugSessionUUID | undefined): Promise<void>;
    $appendDebugConsole(value: string): void;
    $acceptDAMessage(handle: number, message: DebugProtocol.ProtocolMessage): void;
    $acceptDAError(handle: number, name: string, message: string, stack: string): void;
    $acceptDAExit(handle: number, code: number, signal: string): void;
    private getDebugAdapter;
    $sessionCached(sessionID: string): void;
    getSessionDto(session: undefined): undefined;
    getSessionDto(session: IDebugSession): IDebugSessionDto;
    getSessionDto(session: IDebugSession | undefined): IDebugSessionDto | undefined;
    private convertToDto;
}