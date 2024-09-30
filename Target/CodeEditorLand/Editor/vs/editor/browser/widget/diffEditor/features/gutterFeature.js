var H=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var M=(h,m,e,i)=>{for(var t=i>1?void 0:i?U(m,e):m,n=h.length-1,s;n>=0;n--)(s=h[n])&&(t=(i?s(m,e,t):s(t))||t);return i&&t&&H(m,e,t),t},g=(h,m)=>(e,i)=>m(e,i,h);import{EventType as V,addDisposableListener as E,h as I}from"../../../../../base/browser/dom.js";import"../../../../../base/browser/mouseEvent.js";import{ActionsOrientation as W}from"../../../../../base/browser/ui/actionbar/actionbar.js";import{HoverPosition as k}from"../../../../../base/browser/ui/hover/hoverWidget.js";import"../../../../../base/browser/ui/sash/sash.js";import{Disposable as D}from"../../../../../base/common/lifecycle.js";import{autorun as G,autorunWithStore as P,derived as c,derivedDisposable as F,derivedWithSetter as K,observableFromEvent as N,observableValue as B}from"../../../../../base/common/observable.js";import"../../../../../base/common/uri.js";import{HiddenItemStrategy as z,MenuWorkbenchToolBar as $}from"../../../../../platform/actions/browser/toolbar.js";import{IMenuService as j,MenuId as w}from"../../../../../platform/actions/common/actions.js";import{IContextKeyService as q}from"../../../../../platform/contextkey/common/contextkey.js";import{WorkbenchHoverDelegate as J}from"../../../../../platform/hover/browser/hover.js";import{IInstantiationService as L}from"../../../../../platform/instantiation/common/instantiation.js";import{EditorOption as Q}from"../../../../common/config/editorOptions.js";import{LineRange as X,LineRangeSet as Y}from"../../../../common/core/lineRange.js";import{OffsetRange as x}from"../../../../common/core/offsetRange.js";import{Range as Z}from"../../../../common/core/range.js";import{TextEdit as ee}from"../../../../common/core/textEdit.js";import{DetailedLineRangeMapping as te}from"../../../../common/diff/rangeMapping.js";import{TextModelText as O}from"../../../../common/model/textModelText.js";import{ActionRunnerWithContext as ie}from"../../multiDiffEditor/utils.js";import"../components/diffEditorEditors.js";import{DiffEditorSash as ne}from"../components/diffEditorSash.js";import"../diffEditorOptions.js";import"../diffEditorViewModel.js";import{appendRemoveOnDispose as re,applyStyle as se,prependRemoveOnDispose as oe}from"../utils.js";import{EditorGutter as ae}from"../utils/editorGutter.js";const R=[],b=35;let S=class extends D{constructor(e,i,t,n,s,a,o,r,p){super();this._diffModel=i;this._editors=t;this._options=n;this._sashLayout=s;this._boundarySashes=a;this._instantiationService=o;this._contextKeyService=r;this._menuService=p;this._register(oe(e,this.elements.root)),this._register(E(this.elements.root,"click",()=>{this._editors.modified.focus()})),this._register(se(this.elements.root,{display:this._hasActions.map(d=>d?"block":"none")})),F(this,d=>this._showSash.read(d)?new ne(e,this._sashLayout.dimensions,this._options.enableSplitViewResizing,this._boundarySashes,K(this,u=>this._sashLayout.sashLeft.read(u)-b,(u,v)=>this._sashLayout.sashLeft.set(u+b,v)),()=>this._sashLayout.resetSash()):void 0).recomputeInitiallyAndOnChange(this._store);const f=c(this,d=>{const l=this._diffModel.read(d);if(!l)return[];const u=l.diff.read(d);if(!u)return[];const v=this._selectedDiffs.read(d);if(v.length>0){const y=te.fromRangeMappings(v.flatMap(T=>T.rangeMappings));return[new C(y,!0,w.DiffEditorSelectionToolbar,void 0,l.model.original.uri,l.model.modified.uri)]}const A=this._currentDiff.read(d);return u.mappings.map(y=>new C(y.lineRangeMapping.withInnerChangesFromLineRanges(),y.lineRangeMapping===A?.lineRangeMapping,w.DiffEditorHunkToolbar,void 0,l.model.original.uri,l.model.modified.uri))});this._register(new ae(this._editors.modified,this.elements.root,{getIntersectingGutterItems:(d,l)=>f.read(l),createView:(d,l)=>this._instantiationService.createInstance(_,d,l,this)})),this._register(E(this.elements.gutter,V.MOUSE_WHEEL,d=>{this._editors.modified.getOption(Q.scrollbar).handleMouseWheel&&this._editors.modified.delegateScrollFromMouseWheelEvent(d)},{passive:!1}))}_menu=this._register(this._menuService.createMenu(w.DiffEditorHunkToolbar,this._contextKeyService));_actions=N(this,this._menu.onDidChange,()=>this._menu.getActions());_hasActions=this._actions.map(e=>e.length>0);_showSash=c(this,e=>this._options.renderSideBySide.read(e)&&this._hasActions.read(e));width=c(this,e=>this._hasActions.read(e)?b:0);elements=I("div.gutter@gutter",{style:{position:"absolute",height:"100%",width:b+"px"}},[]);computeStagedValue(e){const i=e.innerChanges??[],t=new O(this._editors.modifiedModel.get()),n=new O(this._editors.original.getModel());return new ee(i.map(o=>o.toTextEdit(t))).apply(n)}_currentDiff=c(this,e=>{const i=this._diffModel.read(e);if(!i)return;const t=i.diff.read(e)?.mappings,n=this._editors.modifiedCursor.read(e);if(n)return t?.find(s=>s.lineRangeMapping.modified.contains(n.lineNumber))});_selectedDiffs=c(this,e=>{const t=this._diffModel.read(e)?.diff.read(e);if(!t)return R;const n=this._editors.modifiedSelections.read(e);if(n.every(r=>r.isEmpty()))return R;const s=new Y(n.map(r=>X.fromRangeInclusive(r))),o=t.mappings.filter(r=>r.lineRangeMapping.innerChanges&&s.intersects(r.lineRangeMapping.modified)).map(r=>({mapping:r,rangeMappings:r.lineRangeMapping.innerChanges.filter(p=>n.some(f=>Z.areIntersecting(p.modifiedRange,f)))}));return o.length===0||o.every(r=>r.rangeMappings.length===0)?R:o});layout(e){this.elements.gutter.style.left=e+"px"}};S=M([g(6,L),g(7,q),g(8,j)],S);class C{constructor(m,e,i,t,n,s){this.mapping=m;this.showAlways=e;this.menuId=i;this.rangeOverride=t;this.originalUri=n;this.modifiedUri=s}get id(){return this.mapping.modified.toString()}get range(){return this.rangeOverride??this.mapping.modified}}let _=class extends D{constructor(e,i,t,n){super();this._item=e;const s=this._register(n.createInstance(J,"element",!0,{position:{hoverPosition:k.RIGHT}}));this._register(re(i,this._elements.root)),this._register(G(a=>{const o=this._showAlways.read(a);this._elements.root.classList.toggle("noTransition",!0),this._elements.root.classList.toggle("showAlways",o),setTimeout(()=>{this._elements.root.classList.toggle("noTransition",!1)},0)})),this._register(P((a,o)=>{this._elements.buttons.replaceChildren();const r=o.add(n.createInstance($,this._elements.buttons,this._menuId.read(a),{orientation:W.VERTICAL,hoverDelegate:s,toolbarOptions:{primaryGroup:p=>p.startsWith("primary")},overflowBehavior:{maxItems:this._isSmall.read(a)?1:3},hiddenItemStrategy:z.Ignore,actionRunner:new ie(()=>{const p=this._item.get(),f=p.mapping;return{mapping:f,originalWithModifiedChanges:t.computeStagedValue(f),originalUri:p.originalUri,modifiedUri:p.modifiedUri}}),menuOptions:{shouldForwardArgs:!0}}));o.add(r.onDidChangeMenuItems(()=>{this._lastItemRange&&this.layout(this._lastItemRange,this._lastViewRange)}))}))}_elements=I("div.gutterItem",{style:{height:"20px",width:"34px"}},[I("div.background@background",{},[]),I("div.buttons@buttons",{},[])]);_showAlways=this._item.map(this,e=>e.showAlways);_menuId=this._item.map(this,e=>e.menuId);_isSmall=B(this,!1);_lastItemRange=void 0;_lastViewRange=void 0;layout(e,i){this._lastItemRange=e,this._lastViewRange=i;let t=this._elements.buttons.clientHeight;this._isSmall.set(this._item.get().mapping.original.startLineNumber===1&&e.length<30,void 0),t=this._elements.buttons.clientHeight;const n=e.length/2-t/2,s=t;let a=e.start+n;const o=x.tryCreate(s,i.endExclusive-s-t),r=x.tryCreate(e.start+s,e.endExclusive-t-s);r&&o&&r.start<r.endExclusive&&(a=o.clip(a),a=r.clip(a)),this._elements.buttons.style.top=`${a-e.start}px`}};_=M([g(3,L)],_);export{S as DiffEditorGutter};