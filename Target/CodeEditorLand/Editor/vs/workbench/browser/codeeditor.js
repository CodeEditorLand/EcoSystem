var m=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var h=(s,r,i,e)=>{for(var t=e>1?void 0:e?u(r,i):r,o=s.length-1,c;o>=0;o--)(c=s[o])&&(t=(e?c(r,i,t):c(t))||t);return e&&t&&m(r,i,t),t},d=(s,r)=>(i,e)=>r(i,e,s);import"../../base/common/actions.js";import{Emitter as f}from"../../base/common/event.js";import{Disposable as E,DisposableStore as H}from"../../base/common/lifecycle.js";import{isEqual as C}from"../../base/common/resources.js";import"../../base/common/uri.js";import{OverlayWidgetPositionPreference as R,isCodeEditor as p,isCompositeEditor as D}from"../../editor/browser/editorBrowser.js";import{EmbeddedCodeEditorWidget as y}from"../../editor/browser/widget/codeEditor/embeddedCodeEditorWidget.js";import{EditorOption as b}from"../../editor/common/config/editorOptions.js";import"../../editor/common/core/range.js";import{CursorChangeReason as g}from"../../editor/common/cursorEvents.js";import"../../editor/common/editorCommon.js";import{TrackedRangeStickiness as v}from"../../editor/common/model.js";import{ModelDecorationOptions as I}from"../../editor/common/model/textModel.js";import{AbstractFloatingClickMenu as S,FloatingClickWidget as W}from"../../platform/actions/browser/floatingMenu.js";import{IMenuService as _,MenuId as O}from"../../platform/actions/common/actions.js";import{IContextKeyService as G}from"../../platform/contextkey/common/contextkey.js";import{IInstantiationService as x}from"../../platform/instantiation/common/instantiation.js";import{IKeybindingService as L}from"../../platform/keybinding/common/keybinding.js";import{IEditorService as N}from"../services/editor/common/editorService.js";let n=class extends E{constructor(i){super();this.editorService=i}_onHighlightRemoved=this._register(new f);onHighlightRemoved=this._onHighlightRemoved.event;rangeHighlightDecorationId=null;editor=null;editorDisposables=this._register(new H);removeHighlightRange(){if(this.editor&&this.rangeHighlightDecorationId){const i=this.rangeHighlightDecorationId;this.editor.changeDecorations(e=>{e.removeDecoration(i)}),this._onHighlightRemoved.fire()}this.rangeHighlightDecorationId=null}highlightRange(i,e){e=e??this.getEditor(i),p(e)?this.doHighlightRange(e,i):D(e)&&p(e.activeCodeEditor)&&this.doHighlightRange(e.activeCodeEditor,i)}doHighlightRange(i,e){this.removeHighlightRange(),i.changeDecorations(t=>{this.rangeHighlightDecorationId=t.addDecoration(e.range,this.createRangeHighlightDecoration(e.isWholeLine))}),this.setEditor(i)}getEditor(i){const e=this.editorService.activeEditor?.resource;if(e&&C(e,i.resource)&&p(this.editorService.activeTextEditorControl))return this.editorService.activeTextEditorControl}setEditor(i){this.editor!==i&&(this.editorDisposables.clear(),this.editor=i,this.editorDisposables.add(this.editor.onDidChangeCursorPosition(e=>{(e.reason===g.NotSet||e.reason===g.Explicit||e.reason===g.Undo||e.reason===g.Redo)&&this.removeHighlightRange()})),this.editorDisposables.add(this.editor.onDidChangeModel(()=>{this.removeHighlightRange()})),this.editorDisposables.add(this.editor.onDidDispose(()=>{this.removeHighlightRange(),this.editor=null})))}static _WHOLE_LINE_RANGE_HIGHLIGHT=I.register({description:"codeeditor-range-highlight-whole",stickiness:v.NeverGrowsWhenTypingAtEdges,className:"rangeHighlight",isWholeLine:!0});static _RANGE_HIGHLIGHT=I.register({description:"codeeditor-range-highlight",stickiness:v.NeverGrowsWhenTypingAtEdges,className:"rangeHighlight"});createRangeHighlightDecoration(i=!0){return i?n._WHOLE_LINE_RANGE_HIGHLIGHT:n._RANGE_HIGHLIGHT}dispose(){super.dispose(),this.editor?.getModel()&&(this.removeHighlightRange(),this.editor=null)}};n=h([d(0,N)],n);let a=class extends W{constructor(i,e,t,o){super(t&&o.lookupKeybinding(t)?`${e} (${o.lookupKeybinding(t).getLabel()})`:e);this.editor=i}getId(){return"editor.overlayWidget.floatingClickWidget"}getPosition(){return{preference:R.BOTTOM_RIGHT_CORNER}}render(){super.render(),this.editor.addOverlayWidget(this)}dispose(){this.editor.removeOverlayWidget(this),super.dispose()}};a=h([d(3,L)],a);let l=class extends S{constructor(i,e,t,o){super(O.EditorContent,t,o);this.editor=i;this.instantiationService=e;this.render()}static ID="editor.contrib.floatingClickMenu";createWidget(i){return this.instantiationService.createInstance(a,this.editor,i.label,i.id)}isVisible(){return!(this.editor instanceof y)&&this.editor?.hasModel()&&!this.editor.getOption(b.inDiffEditor)}getActionArg(){return this.editor.getModel()?.uri}};l=h([d(1,x),d(2,_),d(3,G)],l);export{l as FloatingEditorClickMenu,a as FloatingEditorClickWidget,n as RangeHighlightDecorations};