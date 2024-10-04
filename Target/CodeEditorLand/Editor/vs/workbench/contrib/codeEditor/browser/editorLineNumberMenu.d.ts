import { IAction } from '../../../../base/common/actions.js';
import { Disposable, IDisposable } from '../../../../base/common/lifecycle.js';
import { ICodeEditor, IEditorMouseEvent } from '../../../../editor/browser/editorBrowser.js';
import { IEditorContribution } from '../../../../editor/common/editorCommon.js';
import { IMenuService } from '../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
export interface IGutterActionsGenerator {
    (context: {
        lineNumber: number;
        editor: ICodeEditor;
        accessor: ServicesAccessor;
    }, result: {
        push(action: IAction, group?: string): void;
    }): void;
}
export declare class GutterActionsRegistryImpl {
    private _registeredGutterActionsGenerators;
    registerGutterActionsGenerator(gutterActionsGenerator: IGutterActionsGenerator): IDisposable;
    getGutterActionsGenerators(): IGutterActionsGenerator[];
}
export declare const GutterActionsRegistry: GutterActionsRegistryImpl;
export declare class EditorLineNumberContextMenu extends Disposable implements IEditorContribution {
    private readonly editor;
    private readonly contextMenuService;
    private readonly menuService;
    private readonly contextKeyService;
    private readonly instantiationService;
    static readonly ID = "workbench.contrib.editorLineNumberContextMenu";
    constructor(editor: ICodeEditor, contextMenuService: IContextMenuService, menuService: IMenuService, contextKeyService: IContextKeyService, instantiationService: IInstantiationService);
    show(e: IEditorMouseEvent): void;
    private doShow;
}