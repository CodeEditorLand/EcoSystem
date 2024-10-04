import { Event } from '../../../base/common/event.js';
import { ICodeEditor, IDiffEditor } from '../editorBrowser.js';
import { IDecorationRenderOptions } from '../../common/editorCommon.js';
import { IModelDecorationOptions, ITextModel } from '../../common/model.js';
import { ITextResourceEditorInput } from '../../../platform/editor/common/editor.js';
import { URI } from '../../../base/common/uri.js';
import { IDisposable } from '../../../base/common/lifecycle.js';
export declare const ICodeEditorService: import("../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<ICodeEditorService>;
export interface ICodeEditorService {
    readonly _serviceBrand: undefined;
    readonly onWillCreateCodeEditor: Event<void>;
    readonly onCodeEditorAdd: Event<ICodeEditor>;
    readonly onCodeEditorRemove: Event<ICodeEditor>;
    readonly onWillCreateDiffEditor: Event<void>;
    readonly onDiffEditorAdd: Event<IDiffEditor>;
    readonly onDiffEditorRemove: Event<IDiffEditor>;
    readonly onDidChangeTransientModelProperty: Event<ITextModel>;
    readonly onDecorationTypeRegistered: Event<string>;
    willCreateCodeEditor(): void;
    addCodeEditor(editor: ICodeEditor): void;
    removeCodeEditor(editor: ICodeEditor): void;
    listCodeEditors(): readonly ICodeEditor[];
    willCreateDiffEditor(): void;
    addDiffEditor(editor: IDiffEditor): void;
    removeDiffEditor(editor: IDiffEditor): void;
    listDiffEditors(): readonly IDiffEditor[];
    getFocusedCodeEditor(): ICodeEditor | null;
    registerDecorationType(description: string, key: string, options: IDecorationRenderOptions, parentTypeKey?: string, editor?: ICodeEditor): void;
    listDecorationTypes(): string[];
    removeDecorationType(key: string): void;
    resolveDecorationOptions(typeKey: string, writable: boolean): IModelDecorationOptions;
    resolveDecorationCSSRules(decorationTypeKey: string): CSSRuleList | null;
    setModelProperty(resource: URI, key: string, value: any): void;
    getModelProperty(resource: URI, key: string): any;
    setTransientModelProperty(model: ITextModel, key: string, value: any): void;
    getTransientModelProperty(model: ITextModel, key: string): any;
    getTransientModelProperties(model: ITextModel): [string, any][] | undefined;
    getActiveCodeEditor(): ICodeEditor | null;
    openCodeEditor(input: ITextResourceEditorInput, source: ICodeEditor | null, sideBySide?: boolean): Promise<ICodeEditor | null>;
    registerCodeEditorOpenHandler(handler: ICodeEditorOpenHandler): IDisposable;
}
export interface ICodeEditorOpenHandler {
    (input: ITextResourceEditorInput, source: ICodeEditor | null, sideBySide?: boolean): Promise<ICodeEditor | null>;
}