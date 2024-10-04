import { URI } from '../../../../base/common/uri.js';
import { IResourceEditorInput } from '../../../../platform/editor/common/editor.js';
import { IEditorPane, GroupIdentifier, IEditorPaneSelection, IEditorPaneSelectionChangeEvent } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { IEditorService } from '../../editor/common/editorService.js';
import { GoFilter, GoScope, IHistoryService } from '../common/history.js';
import { FileChangesEvent, IFileService, FileOperationEvent } from '../../../../platform/files/common/files.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { Event } from '../../../../base/common/event.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IEditorGroupsService } from '../../editor/common/editorGroupsService.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { EditorServiceImpl } from '../../../browser/parts/editor/editor.js';
import { IWorkbenchLayoutService } from '../../layout/browser/layoutService.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IWorkspacesService } from '../../../../platform/workspaces/common/workspaces.js';
import { ILogService } from '../../../../platform/log/common/log.js';
export declare class HistoryService extends Disposable implements IHistoryService {
    private readonly editorService;
    private readonly editorGroupService;
    private readonly contextService;
    private readonly storageService;
    private readonly configurationService;
    private readonly fileService;
    private readonly workspacesService;
    private readonly instantiationService;
    private readonly layoutService;
    private readonly contextKeyService;
    private readonly logService;
    readonly _serviceBrand: undefined;
    private static readonly MOUSE_NAVIGATION_SETTING;
    private static readonly NAVIGATION_SCOPE_SETTING;
    private readonly activeEditorListeners;
    private lastActiveEditor;
    private readonly editorHelper;
    constructor(editorService: EditorServiceImpl, editorGroupService: IEditorGroupsService, contextService: IWorkspaceContextService, storageService: IStorageService, configurationService: IConfigurationService, fileService: IFileService, workspacesService: IWorkspacesService, instantiationService: IInstantiationService, layoutService: IWorkbenchLayoutService, contextKeyService: IContextKeyService, logService: ILogService);
    private registerListeners;
    private onDidCloseEditor;
    private registerMouseNavigationListener;
    private onMouseDownOrUp;
    private onDidRemoveGroup;
    private onDidActiveEditorChange;
    private onDidFilesChange;
    private handleActiveEditorChange;
    private handleActiveEditorSelectionChangeEvent;
    private move;
    private remove;
    private removeFromRecentlyOpened;
    clear(): void;
    private readonly canNavigateBackContextKey;
    private readonly canNavigateForwardContextKey;
    private readonly canNavigateBackInNavigationsContextKey;
    private readonly canNavigateForwardInNavigationsContextKey;
    private readonly canNavigateToLastNavigationLocationContextKey;
    private readonly canNavigateBackInEditsContextKey;
    private readonly canNavigateForwardInEditsContextKey;
    private readonly canNavigateToLastEditLocationContextKey;
    private readonly canReopenClosedEditorContextKey;
    updateContextKeys(): void;
    private readonly _onDidChangeEditorNavigationStack;
    readonly onDidChangeEditorNavigationStack: Event<void>;
    private defaultScopedEditorNavigationStack;
    private readonly editorGroupScopedNavigationStacks;
    private readonly editorScopedNavigationStacks;
    private editorNavigationScope;
    private registerEditorNavigationScopeChangeListener;
    private getStack;
    goForward(filter?: GoFilter): Promise<void>;
    goBack(filter?: GoFilter): Promise<void>;
    goPrevious(filter?: GoFilter): Promise<void>;
    goLast(filter?: GoFilter): Promise<void>;
    private handleActiveEditorChangeInNavigationStacks;
    private handleActiveEditorSelectionChangeInNavigationStacks;
    private handleEditorCloseEventInHistory;
    private handleEditorGroupRemoveInNavigationStacks;
    private clearEditorNavigationStacks;
    private removeFromEditorNavigationStacks;
    private moveInEditorNavigationStacks;
    private withEachEditorNavigationStack;
    private disposeEditorNavigationStacks;
    private recentlyUsedEditorsStack;
    private recentlyUsedEditorsStackIndex;
    private recentlyUsedEditorsInGroupStack;
    private recentlyUsedEditorsInGroupStackIndex;
    private navigatingInRecentlyUsedEditorsStack;
    private navigatingInRecentlyUsedEditorsInGroupStack;
    openNextRecentlyUsedEditor(groupId?: GroupIdentifier): Promise<void>;
    openPreviouslyUsedEditor(groupId?: GroupIdentifier): Promise<void>;
    private doNavigateInRecentlyUsedEditorsStack;
    private ensureRecentlyUsedStack;
    private handleEditorEventInRecentEditorsStack;
    private static readonly MAX_RECENTLY_CLOSED_EDITORS;
    private recentlyClosedEditors;
    private ignoreEditorCloseEvent;
    private handleEditorCloseEventInReopen;
    reopenLastClosedEditor(): Promise<void>;
    private doReopenLastClosedEditor;
    private removeFromRecentlyClosedEditors;
    private static readonly MAX_HISTORY_ITEMS;
    private static readonly HISTORY_STORAGE_KEY;
    private history;
    private readonly editorHistoryListeners;
    private readonly resourceExcludeMatcher;
    private handleActiveEditorChangeInHistory;
    private addToHistory;
    private updateHistoryOnEditorDispose;
    private includeInHistory;
    private removeExcludedFromHistory;
    private moveInHistory;
    removeFromHistory(arg1: EditorInput | IResourceEditorInput | FileChangesEvent | FileOperationEvent): boolean;
    private replaceInHistory;
    clearRecentlyOpened(): void;
    getHistory(): readonly (EditorInput | IResourceEditorInput)[];
    private ensureHistoryLoaded;
    private loadHistory;
    private loadHistoryFromStorage;
    private saveState;
    getLastActiveWorkspaceRoot(schemeFilter?: string, authorityFilter?: string): URI | undefined;
    getLastActiveFile(filterByScheme: string, filterByAuthority?: string): URI | undefined;
    dispose(): void;
}
interface IEditorNavigationStackEntry {
    groupId: GroupIdentifier;
    editor: EditorInput | IResourceEditorInput;
    selection?: IEditorPaneSelection;
}
export declare class EditorNavigationStack extends Disposable {
    private readonly filter;
    private readonly scope;
    private readonly instantiationService;
    private readonly editorService;
    private readonly editorGroupService;
    private readonly logService;
    private static readonly MAX_STACK_SIZE;
    private readonly _onDidChange;
    readonly onDidChange: Event<void>;
    private readonly mapEditorToDisposable;
    private readonly mapGroupToDisposable;
    private readonly editorHelper;
    private stack;
    private index;
    private previousIndex;
    private navigating;
    private currentSelectionState;
    get current(): IEditorNavigationStackEntry | undefined;
    private set current(value);
    constructor(filter: GoFilter, scope: GoScope, instantiationService: IInstantiationService, editorService: IEditorService, editorGroupService: IEditorGroupsService, logService: ILogService);
    private registerListeners;
    private traceStack;
    private trace;
    private traceEvent;
    private registerGroupListeners;
    private onWillMoveEditor;
    notifyNavigation(editorPane: IEditorPane | undefined, event?: IEditorPaneSelectionChangeEvent): void;
    private onSelectionAwareEditorNavigation;
    private onNonSelectionAwareEditorNavigation;
    private doAdd;
    private doReplace;
    addOrReplace(groupId: GroupIdentifier, editorCandidate: EditorInput | IResourceEditorInput, selection?: IEditorPaneSelection, forceReplace?: boolean): void;
    private shouldReplaceStackEntry;
    move(event: FileOperationEvent): void;
    remove(arg1: EditorInput | FileChangesEvent | FileOperationEvent | GroupIdentifier): void;
    private flatten;
    clear(): void;
    dispose(): void;
    canGoForward(): boolean;
    goForward(): Promise<void>;
    canGoBack(): boolean;
    goBack(): Promise<void>;
    goPrevious(): Promise<void>;
    canGoLast(): boolean;
    goLast(): Promise<void>;
    private maybeGoCurrent;
    private isCurrentSelectionActive;
    private setIndex;
    private navigate;
    private doNavigate;
    isNavigating(): boolean;
}
export {};