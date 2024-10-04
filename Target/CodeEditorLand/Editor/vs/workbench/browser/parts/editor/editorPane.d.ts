import { Composite } from '../../composite.js';
import { IEditorPane, IEditorMemento, IEditorOpenContext } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { IEditorGroup, IEditorGroupsService } from '../../../services/editor/common/editorGroupsService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { URI } from '../../../../base/common/uri.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { MementoObject } from '../../../common/memento.js';
import { IExtUri } from '../../../../base/common/resources.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';
import { ITextResourceConfigurationService } from '../../../../editor/common/services/textResourceConfiguration.js';
import { IBoundarySashes } from '../../../../base/browser/ui/sash/sash.js';
export declare abstract class EditorPane extends Composite implements IEditorPane {
    readonly group: IEditorGroup;
    readonly onDidChangeSizeConstraints: Event<any>;
    protected readonly _onDidChangeControl: Emitter<void>;
    readonly onDidChangeControl: Event<void>;
    private static readonly EDITOR_MEMENTOS;
    get minimumWidth(): number;
    get maximumWidth(): number;
    get minimumHeight(): number;
    get maximumHeight(): number;
    protected _input: EditorInput | undefined;
    get input(): EditorInput | undefined;
    protected _options: IEditorOptions | undefined;
    get options(): IEditorOptions | undefined;
    get window(): import("../../../../base/browser/window.js").CodeWindow;
    get scopedContextKeyService(): IContextKeyService | undefined;
    constructor(id: string, group: IEditorGroup, telemetryService: ITelemetryService, themeService: IThemeService, storageService: IStorageService);
    create(parent: HTMLElement): void;
    protected abstract createEditor(parent: HTMLElement): void;
    setInput(input: EditorInput, options: IEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void>;
    clearInput(): void;
    setOptions(options: IEditorOptions | undefined): void;
    setVisible(visible: boolean): void;
    protected setEditorVisible(visible: boolean): void;
    setBoundarySashes(_sashes: IBoundarySashes): void;
    protected getEditorMemento<T>(editorGroupService: IEditorGroupsService, configurationService: ITextResourceConfigurationService, key: string, limit?: number): IEditorMemento<T>;
    getViewState(): object | undefined;
    protected saveState(): void;
    dispose(): void;
}
export declare class EditorMemento<T> extends Disposable implements IEditorMemento<T> {
    readonly id: string;
    private readonly key;
    private readonly memento;
    private readonly limit;
    private readonly editorGroupService;
    private readonly configurationService;
    private static readonly SHARED_EDITOR_STATE;
    private cache;
    private cleanedUp;
    private editorDisposables;
    private shareEditorState;
    constructor(id: string, key: string, memento: MementoObject, limit: number, editorGroupService: IEditorGroupsService, configurationService: ITextResourceConfigurationService);
    private registerListeners;
    private updateConfiguration;
    saveEditorState(group: IEditorGroup, resource: URI, state: T): void;
    saveEditorState(group: IEditorGroup, editor: EditorInput, state: T): void;
    loadEditorState(group: IEditorGroup, resource: URI): T | undefined;
    loadEditorState(group: IEditorGroup, editor: EditorInput): T | undefined;
    clearEditorState(resource: URI, group?: IEditorGroup): void;
    clearEditorState(editor: EditorInput, group?: IEditorGroup): void;
    clearEditorStateOnDispose(resource: URI, editor: EditorInput): void;
    moveEditorState(source: URI, target: URI, comparer: IExtUri): void;
    private doGetResource;
    private doLoad;
    saveState(): void;
    private cleanUp;
}