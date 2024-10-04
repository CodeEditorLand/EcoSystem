import { IScrollPosition, Scrollable } from '../../base/common/scrollable.js';
import { IPosition, Position } from './core/position.js';
import { Range } from './core/range.js';
import { CursorConfiguration, CursorState, EditOperationType, IColumnSelectData, ICursorSimpleModel, PartialCursorState } from './cursorCommon.js';
import { CursorChangeReason } from './cursorEvents.js';
import { INewScrollPosition, ScrollType } from './editorCommon.js';
import { EditorTheme } from './editorTheme.js';
import { EndOfLinePreference, IGlyphMarginLanesModel, IModelDecorationOptions, ITextModel, PositionAffinity } from './model.js';
import { ILineBreaksComputer, InjectedText } from './modelLineProjectionData.js';
import { BracketGuideOptions, IActiveIndentGuideInfo, IndentGuide } from './textModelGuides.js';
import { IViewLineTokens } from './tokens/lineTokens.js';
import { ViewEventHandler } from './viewEventHandler.js';
import { VerticalRevealType } from './viewEvents.js';
export interface IViewModel extends ICursorSimpleModel {
    readonly model: ITextModel;
    readonly coordinatesConverter: ICoordinatesConverter;
    readonly viewLayout: IViewLayout;
    readonly cursorConfig: CursorConfiguration;
    readonly glyphLanes: IGlyphMarginLanesModel;
    addViewEventHandler(eventHandler: ViewEventHandler): void;
    removeViewEventHandler(eventHandler: ViewEventHandler): void;
    setViewport(startLineNumber: number, endLineNumber: number, centeredLineNumber: number): void;
    visibleLinesStabilized(): void;
    setHasFocus(hasFocus: boolean): void;
    onCompositionStart(): void;
    onCompositionEnd(): void;
    getMinimapDecorationsInRange(range: Range): ViewModelDecoration[];
    getDecorationsInViewport(visibleRange: Range): ViewModelDecoration[];
    getViewportViewLineRenderingData(visibleRange: Range, lineNumber: number): ViewLineRenderingData;
    getViewLineRenderingData(lineNumber: number): ViewLineRenderingData;
    getViewLineData(lineNumber: number): ViewLineData;
    getMinimapLinesRenderingData(startLineNumber: number, endLineNumber: number, needed: boolean[]): MinimapLinesRenderingData;
    getCompletelyVisibleViewRange(): Range;
    getCompletelyVisibleViewRangeAtScrollTop(scrollTop: number): Range;
    getHiddenAreas(): Range[];
    getLineCount(): number;
    getLineContent(lineNumber: number): string;
    getLineLength(lineNumber: number): number;
    getActiveIndentGuide(lineNumber: number, minLineNumber: number, maxLineNumber: number): IActiveIndentGuideInfo;
    getLinesIndentGuides(startLineNumber: number, endLineNumber: number): number[];
    getBracketGuidesInRangeByLine(startLineNumber: number, endLineNumber: number, activePosition: IPosition | null, options: BracketGuideOptions): IndentGuide[][];
    getLineMinColumn(lineNumber: number): number;
    getLineMaxColumn(lineNumber: number): number;
    getLineFirstNonWhitespaceColumn(lineNumber: number): number;
    getLineLastNonWhitespaceColumn(lineNumber: number): number;
    getAllOverviewRulerDecorations(theme: EditorTheme): OverviewRulerDecorationsGroup[];
    getValueInRange(range: Range, eol: EndOfLinePreference): string;
    getValueLengthInRange(range: Range, eol: EndOfLinePreference): number;
    modifyPosition(position: Position, offset: number): Position;
    getInjectedTextAt(viewPosition: Position): InjectedText | null;
    deduceModelPositionRelativeToViewPosition(viewAnchorPosition: Position, deltaOffset: number, lineFeedCnt: number): Position;
    getPlainTextToCopy(modelRanges: Range[], emptySelectionClipboard: boolean, forceCRLF: boolean): string | string[];
    getRichTextToCopy(modelRanges: Range[], emptySelectionClipboard: boolean): {
        html: string;
        mode: string;
    } | null;
    createLineBreaksComputer(): ILineBreaksComputer;
    getPrimaryCursorState(): CursorState;
    getLastAddedCursorIndex(): number;
    getCursorStates(): CursorState[];
    setCursorStates(source: string | null | undefined, reason: CursorChangeReason, states: PartialCursorState[] | null): boolean;
    getCursorColumnSelectData(): IColumnSelectData;
    getCursorAutoClosedCharacters(): Range[];
    setCursorColumnSelectData(columnSelectData: IColumnSelectData): void;
    getPrevEditOperationType(): EditOperationType;
    setPrevEditOperationType(type: EditOperationType): void;
    revealAllCursors(source: string | null | undefined, revealHorizontal: boolean, minimalReveal?: boolean): void;
    revealPrimaryCursor(source: string | null | undefined, revealHorizontal: boolean, minimalReveal?: boolean): void;
    revealTopMostCursor(source: string | null | undefined): void;
    revealBottomMostCursor(source: string | null | undefined): void;
    revealRange(source: string | null | undefined, revealHorizontal: boolean, viewRange: Range, verticalType: VerticalRevealType, scrollType: ScrollType): void;
    changeWhitespace(callback: (accessor: IWhitespaceChangeAccessor) => void): void;
    batchEvents(callback: () => void): void;
}
export interface IViewLayout {
    getScrollable(): Scrollable;
    getScrollWidth(): number;
    getScrollHeight(): number;
    getCurrentScrollLeft(): number;
    getCurrentScrollTop(): number;
    getCurrentViewport(): Viewport;
    getFutureViewport(): Viewport;
    setScrollPosition(position: INewScrollPosition, type: ScrollType): void;
    deltaScrollNow(deltaScrollLeft: number, deltaScrollTop: number): void;
    validateScrollPosition(scrollPosition: INewScrollPosition): IScrollPosition;
    setMaxLineWidth(maxLineWidth: number): void;
    setOverlayWidgetsMinWidth(overlayWidgetsMinWidth: number): void;
    getLinesViewportData(): IPartialViewLinesViewportData;
    getLinesViewportDataAtScrollTop(scrollTop: number): IPartialViewLinesViewportData;
    getWhitespaces(): IEditorWhitespace[];
    isAfterLines(verticalOffset: number): boolean;
    isInTopPadding(verticalOffset: number): boolean;
    isInBottomPadding(verticalOffset: number): boolean;
    getLineNumberAtVerticalOffset(verticalOffset: number): number;
    getVerticalOffsetForLineNumber(lineNumber: number, includeViewZones?: boolean): number;
    getVerticalOffsetAfterLineNumber(lineNumber: number, includeViewZones?: boolean): number;
    getWhitespaceAtVerticalOffset(verticalOffset: number): IViewWhitespaceViewportData | null;
    getWhitespaceViewportData(): IViewWhitespaceViewportData[];
}
export interface IEditorWhitespace {
    readonly id: string;
    readonly afterLineNumber: number;
    readonly height: number;
}
export interface IWhitespaceChangeAccessor {
    insertWhitespace(afterLineNumber: number, ordinal: number, heightInPx: number, minWidth: number): string;
    changeOneWhitespace(id: string, newAfterLineNumber: number, newHeight: number): void;
    removeWhitespace(id: string): void;
}
export interface IPartialViewLinesViewportData {
    readonly bigNumbersDelta: number;
    readonly startLineNumber: number;
    readonly endLineNumber: number;
    readonly relativeVerticalOffset: number[];
    readonly centeredLineNumber: number;
    readonly completelyVisibleStartLineNumber: number;
    readonly completelyVisibleEndLineNumber: number;
    readonly lineHeight: number;
}
export interface IViewWhitespaceViewportData {
    readonly id: string;
    readonly afterLineNumber: number;
    readonly verticalOffset: number;
    readonly height: number;
}
export declare class Viewport {
    readonly _viewportBrand: void;
    readonly top: number;
    readonly left: number;
    readonly width: number;
    readonly height: number;
    constructor(top: number, left: number, width: number, height: number);
}
export interface ICoordinatesConverter {
    convertViewPositionToModelPosition(viewPosition: Position): Position;
    convertViewRangeToModelRange(viewRange: Range): Range;
    validateViewPosition(viewPosition: Position, expectedModelPosition: Position): Position;
    validateViewRange(viewRange: Range, expectedModelRange: Range): Range;
    convertModelPositionToViewPosition(modelPosition: Position, affinity?: PositionAffinity, allowZeroLineNumber?: boolean, belowHiddenRanges?: boolean): Position;
    convertModelRangeToViewRange(modelRange: Range, affinity?: PositionAffinity): Range;
    modelPositionIsVisible(modelPosition: Position): boolean;
    getModelLineViewLineCount(modelLineNumber: number): number;
    getViewLineNumberOfModelPosition(modelLineNumber: number, modelColumn: number): number;
}
export declare class MinimapLinesRenderingData {
    readonly tabSize: number;
    readonly data: Array<ViewLineData | null>;
    constructor(tabSize: number, data: Array<ViewLineData | null>);
}
export declare class ViewLineData {
    _viewLineDataBrand: void;
    readonly content: string;
    readonly continuesWithWrappedLine: boolean;
    readonly minColumn: number;
    readonly maxColumn: number;
    readonly startVisibleColumn: number;
    readonly tokens: IViewLineTokens;
    readonly inlineDecorations: readonly SingleLineInlineDecoration[] | null;
    constructor(content: string, continuesWithWrappedLine: boolean, minColumn: number, maxColumn: number, startVisibleColumn: number, tokens: IViewLineTokens, inlineDecorations: readonly SingleLineInlineDecoration[] | null);
}
export declare class ViewLineRenderingData {
    readonly minColumn: number;
    readonly maxColumn: number;
    readonly content: string;
    readonly continuesWithWrappedLine: boolean;
    readonly containsRTL: boolean;
    readonly isBasicASCII: boolean;
    readonly tokens: IViewLineTokens;
    readonly inlineDecorations: InlineDecoration[];
    readonly tabSize: number;
    readonly startVisibleColumn: number;
    constructor(minColumn: number, maxColumn: number, content: string, continuesWithWrappedLine: boolean, mightContainRTL: boolean, mightContainNonBasicASCII: boolean, tokens: IViewLineTokens, inlineDecorations: InlineDecoration[], tabSize: number, startVisibleColumn: number);
    static isBasicASCII(lineContent: string, mightContainNonBasicASCII: boolean): boolean;
    static containsRTL(lineContent: string, isBasicASCII: boolean, mightContainRTL: boolean): boolean;
}
export declare const enum InlineDecorationType {
    Regular = 0,
    Before = 1,
    After = 2,
    RegularAffectingLetterSpacing = 3
}
export declare class InlineDecoration {
    readonly range: Range;
    readonly inlineClassName: string;
    readonly type: InlineDecorationType;
    constructor(range: Range, inlineClassName: string, type: InlineDecorationType);
}
export declare class SingleLineInlineDecoration {
    readonly startOffset: number;
    readonly endOffset: number;
    readonly inlineClassName: string;
    readonly inlineClassNameAffectsLetterSpacing: boolean;
    constructor(startOffset: number, endOffset: number, inlineClassName: string, inlineClassNameAffectsLetterSpacing: boolean);
    toInlineDecoration(lineNumber: number): InlineDecoration;
}
export declare class ViewModelDecoration {
    _viewModelDecorationBrand: void;
    readonly range: Range;
    readonly options: IModelDecorationOptions;
    constructor(range: Range, options: IModelDecorationOptions);
}
export declare class OverviewRulerDecorationsGroup {
    readonly color: string;
    readonly zIndex: number;
    readonly data: number[];
    constructor(color: string, zIndex: number, data: number[]);
    static compareByRenderingProps(a: OverviewRulerDecorationsGroup, b: OverviewRulerDecorationsGroup): number;
    static equals(a: OverviewRulerDecorationsGroup, b: OverviewRulerDecorationsGroup): boolean;
    static equalsArr(a: OverviewRulerDecorationsGroup[], b: OverviewRulerDecorationsGroup[]): boolean;
}