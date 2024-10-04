import { IAction } from '../../../../base/common/actions.js';
import { AsyncIterableObject } from '../../../../base/common/async.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Event } from '../../../../base/common/event.js';
import { IDisposable } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { ExtensionIdentifier } from '../../../../platform/extensions/common/extensions.js';
import { INotebookKernelSourceAction } from './notebookCommon.js';
export interface ISelectedNotebooksChangeEvent {
    notebook: URI;
    oldKernel: string | undefined;
    newKernel: string | undefined;
}
export interface INotebookKernelMatchResult {
    readonly selected: INotebookKernel | undefined;
    readonly suggestions: INotebookKernel[];
    readonly all: INotebookKernel[];
    readonly hidden: INotebookKernel[];
}
export interface INotebookKernelChangeEvent {
    label?: true;
    description?: true;
    detail?: true;
    supportedLanguages?: true;
    hasExecutionOrder?: true;
    hasInterruptHandler?: true;
    hasVariableProvider?: true;
}
export interface VariablesResult {
    id: number;
    name: string;
    value: string;
    type?: string;
    hasNamedChildren: boolean;
    indexedChildrenCount: number;
}
export declare const variablePageSize = 100;
export interface INotebookKernel {
    readonly id: string;
    readonly viewType: string;
    readonly onDidChange: Event<Readonly<INotebookKernelChangeEvent>>;
    readonly extension: ExtensionIdentifier;
    readonly localResourceRoot: URI;
    readonly preloadUris: URI[];
    readonly preloadProvides: string[];
    label: string;
    description?: string;
    detail?: string;
    supportedLanguages: string[];
    implementsInterrupt?: boolean;
    implementsExecutionOrder?: boolean;
    hasVariableProvider?: boolean;
    executeNotebookCellsRequest(uri: URI, cellHandles: number[]): Promise<void>;
    cancelNotebookCellExecution(uri: URI, cellHandles: number[]): Promise<void>;
    provideVariables(notebookUri: URI, parentId: number | undefined, kind: 'named' | 'indexed', start: number, token: CancellationToken): AsyncIterableObject<VariablesResult>;
}
export declare const enum ProxyKernelState {
    Disconnected = 1,
    Connected = 2,
    Initializing = 3
}
export interface INotebookProxyKernelChangeEvent extends INotebookKernelChangeEvent {
    connectionState?: true;
}
export interface INotebookKernelDetectionTask {
    readonly notebookType: string;
}
export interface ISourceAction {
    readonly action: IAction;
    readonly onDidChangeState: Event<void>;
    readonly isPrimary?: boolean;
    execution: Promise<void> | undefined;
    runAction: () => Promise<void>;
}
export interface INotebookSourceActionChangeEvent {
    notebook?: URI;
    viewType: string;
}
export interface IKernelSourceActionProvider {
    readonly viewType: string;
    onDidChangeSourceActions?: Event<void>;
    provideKernelSourceActions(): Promise<INotebookKernelSourceAction[]>;
}
export interface INotebookTextModelLike {
    uri: URI;
    notebookType: string;
}
export declare const INotebookKernelService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<INotebookKernelService>;
export interface INotebookKernelService {
    _serviceBrand: undefined;
    readonly onDidAddKernel: Event<INotebookKernel>;
    readonly onDidRemoveKernel: Event<INotebookKernel>;
    readonly onDidChangeSelectedNotebooks: Event<ISelectedNotebooksChangeEvent>;
    readonly onDidChangeNotebookAffinity: Event<void>;
    readonly onDidNotebookVariablesUpdate: Event<URI>;
    registerKernel(kernel: INotebookKernel): IDisposable;
    getMatchingKernel(notebook: INotebookTextModelLike): INotebookKernelMatchResult;
    getSelectedOrSuggestedKernel(notebook: INotebookTextModelLike): INotebookKernel | undefined;
    selectKernelForNotebook(kernel: INotebookKernel, notebook: INotebookTextModelLike): void;
    preselectKernelForNotebook(kernel: INotebookKernel, notebook: INotebookTextModelLike): void;
    updateKernelNotebookAffinity(kernel: INotebookKernel, notebook: URI, preference: number | undefined): void;
    readonly onDidChangeKernelDetectionTasks: Event<string>;
    registerNotebookKernelDetectionTask(task: INotebookKernelDetectionTask): IDisposable;
    getKernelDetectionTasks(notebook: INotebookTextModelLike): INotebookKernelDetectionTask[];
    readonly onDidChangeSourceActions: Event<INotebookSourceActionChangeEvent>;
    getSourceActions(notebook: INotebookTextModelLike, contextKeyService: IContextKeyService | undefined): ISourceAction[];
    getRunningSourceActions(notebook: INotebookTextModelLike): ISourceAction[];
    registerKernelSourceActionProvider(viewType: string, provider: IKernelSourceActionProvider): IDisposable;
    getKernelSourceActions2(notebook: INotebookTextModelLike): Promise<INotebookKernelSourceAction[]>;
    notifyVariablesChange(notebookUri: URI): void;
}
export declare const INotebookKernelHistoryService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<INotebookKernelHistoryService>;
export interface INotebookKernelHistoryService {
    _serviceBrand: undefined;
    getKernels(notebook: INotebookTextModelLike): {
        selected: INotebookKernel | undefined;
        all: INotebookKernel[];
    };
    addMostRecentKernel(kernel: INotebookKernel): void;
}