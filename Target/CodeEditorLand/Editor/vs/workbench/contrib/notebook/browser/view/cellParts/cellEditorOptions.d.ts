import { Event } from '../../../../../../base/common/event.js';
import { URI } from '../../../../../../base/common/uri.js';
import { IEditorOptions } from '../../../../../../editor/common/config/editorOptions.js';
import { IConfigurationService } from '../../../../../../platform/configuration/common/configuration.js';
import { IBaseCellEditorOptions, ICellViewModel } from '../../notebookBrowser.js';
import { CellContentPart } from '../cellPart.js';
import { NotebookCellInternalMetadata } from '../../../common/notebookCommon.js';
import { NotebookOptions } from '../../notebookOptions.js';
import { CellViewModelStateChangeEvent } from '../../notebookViewEvents.js';
import { ITextModelUpdateOptions } from '../../../../../../editor/common/model.js';
export declare class CellEditorOptions extends CellContentPart implements ITextModelUpdateOptions {
    private readonly base;
    readonly notebookOptions: NotebookOptions;
    readonly configurationService: IConfigurationService;
    private _lineNumbers;
    private _tabSize?;
    private _indentSize?;
    private _insertSpaces?;
    set tabSize(value: number | undefined);
    get tabSize(): number | undefined;
    set indentSize(value: number | 'tabSize' | undefined);
    get indentSize(): number | 'tabSize' | undefined;
    set insertSpaces(value: boolean | undefined);
    get insertSpaces(): boolean | undefined;
    private readonly _onDidChange;
    readonly onDidChange: Event<void>;
    private _value;
    constructor(base: IBaseCellEditorOptions, notebookOptions: NotebookOptions, configurationService: IConfigurationService);
    updateState(element: ICellViewModel, e: CellViewModelStateChangeEvent): void;
    private _recomputeOptions;
    private _computeEditorOptions;
    getUpdatedValue(internalMetadata: NotebookCellInternalMetadata, cellUri: URI): IEditorOptions;
    getValue(internalMetadata: NotebookCellInternalMetadata, cellUri: URI): IEditorOptions;
    getDefaultValue(): IEditorOptions;
    setLineNumbers(lineNumbers: 'on' | 'off' | 'inherit'): void;
}