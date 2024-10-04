import { Event } from '../../../../base/common/event.js';
import './media/gotoErrorWidget.css';
import { ICodeEditor } from '../../../browser/editorBrowser.js';
import { PeekViewWidget } from '../../peekView/browser/peekView.js';
import { IMenuService, MenuId } from '../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { ILabelService } from '../../../../platform/label/common/label.js';
import { IMarker, IRelatedInformation } from '../../../../platform/markers/common/markers.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
export declare class MarkerNavigationWidget extends PeekViewWidget {
    private readonly _themeService;
    private readonly _openerService;
    private readonly _menuService;
    private readonly _contextKeyService;
    private readonly _labelService;
    static readonly TitleMenu: MenuId;
    private _parentContainer;
    private _container;
    private _icon;
    private _message;
    private readonly _callOnDispose;
    private _severity;
    private _backgroundColor?;
    private readonly _onDidSelectRelatedInformation;
    private _heightInPixel;
    readonly onDidSelectRelatedInformation: Event<IRelatedInformation>;
    constructor(editor: ICodeEditor, _themeService: IThemeService, _openerService: IOpenerService, _menuService: IMenuService, instantiationService: IInstantiationService, _contextKeyService: IContextKeyService, _labelService: ILabelService);
    private _applyTheme;
    protected _applyStyles(): void;
    dispose(): void;
    focus(): void;
    protected _fillHead(container: HTMLElement): void;
    protected _fillTitleIcon(container: HTMLElement): void;
    protected _fillBody(container: HTMLElement): void;
    show(): void;
    showAtMarker(marker: IMarker, markerIdx: number, markerCount: number): void;
    updateMarker(marker: IMarker): void;
    showStale(): void;
    protected _doLayoutBody(heightInPixel: number, widthInPixel: number): void;
    protected _onWidth(widthInPixel: number): void;
    protected _relayout(): void;
    private computeRequiredHeight;
}