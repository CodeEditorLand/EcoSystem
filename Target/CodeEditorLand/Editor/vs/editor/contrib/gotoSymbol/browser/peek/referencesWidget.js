var R=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var g=(d,n,e,t)=>{for(var o=t>1?void 0:t?I(n,e):n,r=d.length-1,i;r>=0;r--)(i=d[r])&&(o=(t?i(n,e,o):i(o))||o);return t&&o&&R(n,e,o),o},l=(d,n)=>(e,t)=>n(e,t,d);import*as s from"../../../../../base/browser/dom.js";import"../../../../../base/browser/mouseEvent.js";import{Orientation as b}from"../../../../../base/browser/ui/sash/sash.js";import{Sizing as w,SplitView as T}from"../../../../../base/browser/ui/splitview/splitview.js";import{Color as y}from"../../../../../base/common/color.js";import{Emitter as O,Event as S}from"../../../../../base/common/event.js";import"../../../../../base/common/filters.js";import{KeyCode as L}from"../../../../../base/common/keyCodes.js";import{DisposableStore as _,dispose as p}from"../../../../../base/common/lifecycle.js";import{Schemas as E}from"../../../../../base/common/network.js";import{basenameOrAuthority as k,dirname as V}from"../../../../../base/common/resources.js";import"./referencesWidget.css";import"../../../../browser/editorBrowser.js";import{EmbeddedCodeEditorWidget as N}from"../../../../browser/widget/codeEditor/embeddedCodeEditorWidget.js";import"../../../../common/config/editorOptions.js";import{Range as v}from"../../../../common/core/range.js";import{ScrollType as C}from"../../../../common/editorCommon.js";import{TrackedRangeStickiness as A}from"../../../../common/model.js";import{ModelDecorationOptions as x,TextModel as M}from"../../../../common/model/textModel.js";import"../../../../common/languages.js";import{PLAINTEXT_LANGUAGE_ID as z}from"../../../../common/languages/modesRegistry.js";import{ITextModelService as F}from"../../../../common/services/resolverService.js";import{AccessibilityProvider as P,DataSource as K,Delegate as B,FileReferencesRenderer as H,IdentityProvider as W,OneReferenceRenderer as U,StringRepresentationProvider as $}from"./referencesTree.js";import*as h from"../../../peekView/browser/peekView.js";import*as u from"../../../../../nls.js";import{IInstantiationService as G}from"../../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as X}from"../../../../../platform/keybinding/common/keybinding.js";import{ILabelService as Z}from"../../../../../platform/label/common/label.js";import{WorkbenchAsyncDataTree as q}from"../../../../../platform/list/browser/listService.js";import{IThemeService as J}from"../../../../../platform/theme/common/themeService.js";import{FileReferences as j,OneReference as D}from"../referencesModel.js";class f{constructor(n,e){this._editor=n;this._model=e;this._callOnDispose.add(this._editor.onDidChangeModel(()=>this._onModelChanged())),this._onModelChanged()}static DecorationOptions=x.register({description:"reference-decoration",stickiness:A.NeverGrowsWhenTypingAtEdges,className:"reference-decoration"});_decorations=new Map;_decorationIgnoreSet=new Set;_callOnDispose=new _;_callOnModelChange=new _;dispose(){this._callOnModelChange.dispose(),this._callOnDispose.dispose(),this.removeDecorations()}_onModelChanged(){this._callOnModelChange.clear();const n=this._editor.getModel();if(n){for(const e of this._model.references)if(e.uri.toString()===n.uri.toString()){this._addDecorations(e.parent);return}}}_addDecorations(n){if(!this._editor.hasModel())return;this._callOnModelChange.add(this._editor.getModel().onDidChangeDecorations(()=>this._onDecorationChanged()));const e=[],t=[];for(let o=0,r=n.children.length;o<r;o++){const i=n.children[o];this._decorationIgnoreSet.has(i.id)||i.uri.toString()===this._editor.getModel().uri.toString()&&(e.push({range:i.range,options:f.DecorationOptions}),t.push(o))}this._editor.changeDecorations(o=>{const r=o.deltaDecorations([],e);for(let i=0;i<r.length;i++)this._decorations.set(r[i],n.children[t[i]])})}_onDecorationChanged(){const n=[],e=this._editor.getModel();if(e){for(const[t,o]of this._decorations){const r=e.getDecorationRange(t);if(!r)continue;let i=!1;if(!v.equalsRange(r,o.range)){if(v.spansMultipleLines(r))i=!0;else{const a=o.range.endColumn-o.range.startColumn,c=r.endColumn-r.startColumn;a!==c&&(i=!0)}i?(this._decorationIgnoreSet.add(o.id),n.push(t)):o.range=r}}for(let t=0,o=n.length;t<o;t++)this._decorations.delete(n[t]);this._editor.removeDecorations(n)}}removeDecorations(){this._editor.removeDecorations([...this._decorations.keys()]),this._decorations.clear()}}class Ue{ratio=.7;heightInLines=18;static fromJSON(n){let e,t;try{const o=JSON.parse(n);e=o.ratio,t=o.heightInLines}catch{}return{ratio:e||.7,heightInLines:t||18}}}class Q extends q{}let m=class extends h.PeekViewWidget{constructor(e,t,o,r,i,a,c,Y,ee){super(e,{showFrame:!1,showArrow:!0,isResizeable:!0,isAccessible:!0,supportOnTitleClick:!0},a);this._defaultTreeKeyboardSupport=t;this.layoutData=o;this._textModelResolverService=i;this._instantiationService=a;this._peekViewService=c;this._uriLabel=Y;this._keybindingService=ee;this._applyTheme(r.getColorTheme()),this._callOnDispose.add(r.onDidColorThemeChange(this._applyTheme.bind(this))),this._peekViewService.addExclusiveWidget(e,this),this.create()}_model;_decorationsManager;_disposeOnNewModel=new _;_callOnDispose=new _;_onDidSelectReference=new O;onDidSelectReference=this._onDidSelectReference.event;_tree;_treeContainer;_splitView;_preview;_previewModelReference;_previewNotAvailableMessage;_previewContainer;_messageContainer;_dim=new s.Dimension(0,0);_isClosing=!1;get isClosing(){return this._isClosing}dispose(){this._isClosing=!0,this.setModel(void 0),this._callOnDispose.dispose(),this._disposeOnNewModel.dispose(),p(this._preview),p(this._previewNotAvailableMessage),p(this._tree),p(this._previewModelReference),this._splitView.dispose(),super.dispose()}_applyTheme(e){const t=e.getColor(h.peekViewBorder)||y.transparent;this.style({arrowColor:t,frameColor:t,headerBackgroundColor:e.getColor(h.peekViewTitleBackground)||y.transparent,primaryHeadingColor:e.getColor(h.peekViewTitleForeground),secondaryHeadingColor:e.getColor(h.peekViewTitleInfoForeground)})}show(e){super.show(e,this.layoutData.heightInLines||18)}focusOnReferenceTree(){this._tree.domFocus()}focusOnPreviewEditor(){this._preview.focus()}isPreviewEditorFocused(){return this._preview.hasTextFocus()}_onTitleClick(e){this._preview&&this._preview.getModel()&&this._onDidSelectReference.fire({element:this._getFocusedReference(),kind:e.ctrlKey||e.metaKey||e.altKey?"side":"open",source:"title"})}_fillBody(e){this.setCssClass("reference-zone-widget"),this._messageContainer=s.append(e,s.$("div.messages")),s.hide(this._messageContainer),this._splitView=new T(e,{orientation:b.HORIZONTAL}),this._previewContainer=s.append(e,s.$("div.preview.inline"));const t={scrollBeyondLastLine:!1,scrollbar:{verticalScrollbarSize:14,horizontal:"auto",useShadows:!0,verticalHasArrows:!1,horizontalHasArrows:!1,alwaysConsumeMouseWheel:!0},overviewRulerLanes:2,fixedOverflowWidgets:!0,minimap:{enabled:!1}};this._preview=this._instantiationService.createInstance(N,this._previewContainer,t,{},this.editor),s.hide(this._previewContainer),this._previewNotAvailableMessage=this._instantiationService.createInstance(M,u.localize("missingPreviewMessage","no preview available"),z,M.DEFAULT_CREATION_OPTIONS,null),this._treeContainer=s.append(e,s.$("div.ref-tree.inline"));const o={keyboardSupport:this._defaultTreeKeyboardSupport,accessibilityProvider:new P,keyboardNavigationLabelProvider:this._instantiationService.createInstance($),identityProvider:new W,openOnSingleClick:!0,selectionNavigation:!0,overrideStyles:{listBackground:h.peekViewResultsBackground}};this._defaultTreeKeyboardSupport&&this._callOnDispose.add(s.addStandardDisposableListener(this._treeContainer,"keydown",i=>{i.equals(L.Escape)&&(this._keybindingService.dispatchEvent(i,i.target),i.stopPropagation())},!0)),this._tree=this._instantiationService.createInstance(Q,"ReferencesWidget",this._treeContainer,new B,[this._instantiationService.createInstance(H),this._instantiationService.createInstance(U)],this._instantiationService.createInstance(K),o),this._splitView.addView({onDidChange:S.None,element:this._previewContainer,minimumSize:200,maximumSize:Number.MAX_VALUE,layout:i=>{this._preview.layout({height:this._dim.height,width:i})}},w.Distribute),this._splitView.addView({onDidChange:S.None,element:this._treeContainer,minimumSize:100,maximumSize:Number.MAX_VALUE,layout:i=>{this._treeContainer.style.height=`${this._dim.height}px`,this._treeContainer.style.width=`${i}px`,this._tree.layout(this._dim.height,i)}},w.Distribute),this._disposables.add(this._splitView.onDidSashChange(()=>{this._dim.width&&(this.layoutData.ratio=this._splitView.getViewSize(0)/this._dim.width)},void 0));const r=(i,a)=>{i instanceof D&&(a==="show"&&this._revealReference(i,!1),this._onDidSelectReference.fire({element:i,kind:a,source:"tree"}))};this._disposables.add(this._tree.onDidOpen(i=>{i.sideBySide?r(i.element,"side"):i.editorOptions.pinned?r(i.element,"goto"):r(i.element,"show")})),s.hide(this._treeContainer)}_onWidth(e){this._dim&&this._doLayoutBody(this._dim.height,e)}_doLayoutBody(e,t){super._doLayoutBody(e,t),this._dim=new s.Dimension(t,e),this.layoutData.heightInLines=this._viewZone?this._viewZone.heightInLines:this.layoutData.heightInLines,this._splitView.layout(t),this._splitView.resizeView(0,t*this.layoutData.ratio)}setSelection(e){return this._revealReference(e,!0).then(()=>{this._model&&(this._tree.setSelection([e]),this._tree.setFocus([e]))})}setModel(e){return this._disposeOnNewModel.clear(),this._model=e,this._model?this._onNewModel():Promise.resolve()}_onNewModel(){return this._model?this._model.isEmpty?(this.setTitle(""),this._messageContainer.innerText=u.localize("noResults","No results"),s.show(this._messageContainer),Promise.resolve(void 0)):(s.hide(this._messageContainer),this._decorationsManager=new f(this._preview,this._model),this._disposeOnNewModel.add(this._decorationsManager),this._disposeOnNewModel.add(this._model.onDidChangeReferenceRange(e=>this._tree.rerender(e))),this._disposeOnNewModel.add(this._preview.onMouseDown(e=>{const{event:t,target:o}=e;if(t.detail!==2)return;const r=this._getFocusedReference();r&&this._onDidSelectReference.fire({element:{uri:r.uri,range:o.range},kind:t.ctrlKey||t.metaKey||t.altKey?"side":"open",source:"editor"})})),this.container.classList.add("results-loaded"),s.show(this._treeContainer),s.show(this._previewContainer),this._splitView.layout(this._dim.width),this.focusOnReferenceTree(),this._tree.setInput(this._model.groups.length===1?this._model.groups[0]:this._model)):Promise.resolve(void 0)}_getFocusedReference(){const[e]=this._tree.getFocus();if(e instanceof D)return e;if(e instanceof j&&e.children.length>0)return e.children[0]}async revealReference(e){await this._revealReference(e,!1),this._onDidSelectReference.fire({element:e,kind:"goto",source:"tree"})}_revealedReference;async _revealReference(e,t){if(this._revealedReference===e)return;this._revealedReference=e,e.uri.scheme!==E.inMemory?this.setTitle(k(e.uri),this._uriLabel.getUriLabel(V(e.uri))):this.setTitle(u.localize("peekView.alternateTitle","References"));const o=this._textModelResolverService.createModelReference(e.uri);this._tree.getInput()===e.parent?this._tree.reveal(e):(t&&this._tree.reveal(e.parent),await this._tree.expand(e.parent),this._tree.reveal(e));const r=await o;if(!this._model){r.dispose();return}p(this._previewModelReference);const i=r.object;if(i){const a=this._preview.getModel()===i.textEditorModel?C.Smooth:C.Immediate,c=v.lift(e.range).collapseToStart();this._previewModelReference=r,this._preview.setModel(i.textEditorModel),this._preview.setSelection(c),this._preview.revealRangeInCenter(c,a)}else this._preview.setModel(this._previewNotAvailableMessage),r.dispose()}};m=g([l(3,J),l(4,F),l(5,G),l(6,h.IPeekViewService),l(7,Z),l(8,X)],m);export{Ue as LayoutData,m as ReferenceWidget};