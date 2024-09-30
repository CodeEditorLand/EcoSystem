var O=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var u=(l,a,t,e)=>{for(var i=e>1?void 0:e?w(a,t):a,n=l.length-1,s;n>=0;n--)(s=l[n])&&(i=(e?s(a,t,i):s(i))||i);return e&&i&&O(a,t,i),i},g=(l,a)=>(t,e)=>a(t,e,l);import{$ as R}from"../../../../base/browser/dom.js";import{CancellationToken as E}from"../../../../base/common/cancellation.js";import{Disposable as b,toDisposable as L}from"../../../../base/common/lifecycle.js";import{ObservablePromise as C,autorun as v,autorunWithStore as P,derived as p,derivedDisposable as y,observableSignalFromEvent as T}from"../../../../base/common/observable.js";import{URI as N}from"../../../../base/common/uri.js";import{IInstantiationService as I}from"../../../../platform/instantiation/common/instantiation.js";import"../../../browser/editorBrowser.js";import{observableCodeEditor as D}from"../../../browser/observableCodeEditor.js";import{EmbeddedCodeEditorWidget as W}from"../../../browser/widget/codeEditor/embeddedCodeEditorWidget.js";import{IDiffProviderFactoryService as A}from"../../../browser/widget/diffEditor/diffProviderFactoryService.js";import{diffAddDecoration as S,diffAddDecorationEmpty as U,diffDeleteDecoration as F,diffDeleteDecorationEmpty as V,diffLineAddDecorationBackgroundWithIndicator as k,diffLineDeleteDecorationBackgroundWithIndicator as q,diffWholeLineAddDecoration as H,diffWholeLineDeleteDecoration as j}from"../../../browser/widget/diffEditor/registrations.contribution.js";import{EditorOption as z}from"../../../common/config/editorOptions.js";import{Position as x}from"../../../common/core/position.js";import{Range as G}from"../../../common/core/range.js";import"../../../common/diff/rangeMapping.js";import"../../../common/languages.js";import{PLAINTEXT_LANGUAGE_ID as $}from"../../../common/languages/modesRegistry.js";import"../../../common/model.js";import{TextModel as M}from"../../../common/model/textModel.js";import{IModelService as X}from"../../../common/services/model.js";import"./inlineEditSideBySideWidget.css";function*J(l,a,t=1){a===void 0&&([a,l]=[l,0]);for(let e=l;e<a;e+=t)yield e}function _(l){const a=l[0].match(/^\s*/)?.[0]??"",t=a.length;return{text:l.map(e=>e.replace(new RegExp("^"+a),"")),shift:t}}let c=class extends b{constructor(t,e,i,n,s){super();this._editor=t;this._model=e;this._instantiationService=i;this._diffProviderFactoryService=n;this._modelService=s;this._register(P((f,r)=>{if(!this._model.read(f)||this._position.get()===null)return;const d=r.add(this._instantiationService.createInstance(h,this._editor,this._position,this._text.map(m=>m.text),this._text.map(m=>m.shift),this._diff));t.addOverlayWidget(d),r.add(L(()=>t.removeOverlayWidget(d)))}))}static _modelId=0;static _createUniqueUri(){return N.from({scheme:"inline-edit-widget",path:new Date().toString()+String(c._modelId++)})}_position=p(this,t=>{const e=this._model.read(t);if(!e||e.text.length===0||e.range.startLineNumber===e.range.endLineNumber&&!(e.range.startColumn===e.range.endColumn&&e.range.startColumn===1))return null;const i=this._editor.getModel();if(!i)return null;const n=Array.from(J(e.range.startLineNumber,e.range.endLineNumber+1)),s=n.map(m=>i.getLineLastNonWhitespaceColumn(m)),f=Math.max(...s),r=n[s.indexOf(f)],o=new x(r,f);return{top:e.range.startLineNumber,left:o}});_text=p(this,t=>{const e=this._model.read(t);if(!e)return{text:"",shift:0};const i=_(e.text.split(`
`));return{text:i.text.join(`
`),shift:i.shift}});_originalModel=y(()=>this._modelService.createModel("",null,c._createUniqueUri())).keepObserved(this._store);_modifiedModel=y(()=>this._modelService.createModel("",null,c._createUniqueUri())).keepObserved(this._store);_diff=p(this,t=>this._diffPromise.read(t)?.promiseResult.read(t)?.data);_diffPromise=p(this,t=>{const e=this._model.read(t);if(!e)return;const i=this._editor.getModel();if(!i)return;const n=_(i.getValueInRange(e.range).split(`
`)).text.join(`
`),s=_(e.text.split(`
`)).text.join(`
`);this._originalModel.get().setValue(n),this._modifiedModel.get().setValue(s);const f=this._diffProviderFactoryService.createDiffProvider({diffAlgorithm:"advanced"});return C.fromFn(async()=>{const r=await f.computeDiff(this._originalModel.get(),this._modifiedModel.get(),{computeMoves:!1,ignoreTrimWhitespace:!1,maxComputationTimeMs:1e3},E.None);if(!r.identical)return r.changes})})};c=u([g(2,I),g(3,A),g(4,X)],c);let h=class extends b{constructor(t,e,i,n,s,f){super();this._editor=t;this._position=e;this._text=i;this._shift=n;this._diff=s;this._instantiationService=f;this._previewEditor.setModel(this._previewTextModel),this._register(this._editorObs.setDecorations(this._originalDecorations)),this._register(this._previewEditorObs.setDecorations(this._modifiedDecorations)),this._register(v(r=>{const o=this._previewEditorObs.contentWidth.read(r),d=this._text.read(r).split(`
`).length-1,m=this._editor.getOption(z.lineHeight)*d;o<=0||this._previewEditor.layout({height:m,width:o})})),this._register(v(r=>{this._position.read(r),this._editor.layoutOverlayWidget(this)})),this._register(v(r=>{this._scrollChanged.read(r),this._position.read(r)&&this._editor.layoutOverlayWidget(this)}))}static _dropDownVisible=!1;static get dropDownVisible(){return this._dropDownVisible}static id=0;id=`InlineEditSideBySideContentWidget${h.id++}`;allowEditorOverflow=!1;_nodes=R("div.inlineEditSideBySide",void 0);_scrollChanged=T("editor.onDidScrollChange",this._editor.onDidScrollChange);_previewEditor=this._register(this._instantiationService.createInstance(W,this._nodes,{glyphMargin:!1,lineNumbers:"off",minimap:{enabled:!1},guides:{indentation:!1,bracketPairs:!1,bracketPairsHorizontal:!1,highlightActiveIndentation:!1},folding:!1,selectOnLineNumbers:!1,selectionHighlight:!1,columnSelection:!1,overviewRulerBorder:!1,overviewRulerLanes:0,lineDecorationsWidth:0,lineNumbersMinChars:0,scrollbar:{vertical:"hidden",horizontal:"hidden",alwaysConsumeMouseWheel:!1,handleMouseWheel:!1},readOnly:!0,wordWrap:"off",wordWrapOverride1:"off",wordWrapOverride2:"off",wrappingIndent:"none",wrappingStrategy:void 0},{contributions:[],isSimpleWidget:!0},this._editor));_previewEditorObs=D(this._previewEditor);_editorObs=D(this._editor);_previewTextModel=this._register(this._instantiationService.createInstance(M,"",this._editor.getModel()?.getLanguageId()??$,M.DEFAULT_CREATION_OPTIONS,null));_setText=p(t=>{const e=this._text.read(t);e&&this._previewTextModel.setValue(e)}).recomputeInitiallyAndOnChange(this._store);_decorations=p(this,t=>{this._setText.read(t);const e=this._position.read(t);if(!e)return{org:[],mod:[]};const i=this._diff.read(t);if(!i)return{org:[],mod:[]};const n=[],s=[];if(i.length===1&&i[0].innerChanges[0].modifiedRange.equalsRange(this._previewTextModel.getFullModelRange()))return{org:[],mod:[]};const f=this._shift.get(),r=o=>new G(o.startLineNumber+e.top-1,o.startColumn+f,o.endLineNumber+e.top-1,o.endColumn+f);for(const o of i)if(o.original.isEmpty||n.push({range:r(o.original.toInclusiveRange()),options:q}),o.modified.isEmpty||s.push({range:o.modified.toInclusiveRange(),options:k}),o.modified.isEmpty||o.original.isEmpty)o.original.isEmpty||n.push({range:r(o.original.toInclusiveRange()),options:j}),o.modified.isEmpty||s.push({range:o.modified.toInclusiveRange(),options:H});else for(const d of o.innerChanges||[])o.original.contains(d.originalRange.startLineNumber)&&n.push({range:r(d.originalRange),options:d.originalRange.isEmpty()?V:F}),o.modified.contains(d.modifiedRange.startLineNumber)&&s.push({range:d.modifiedRange,options:d.modifiedRange.isEmpty()?U:S});return{org:n,mod:s}});_originalDecorations=p(this,t=>this._decorations.read(t).org);_modifiedDecorations=p(this,t=>this._decorations.read(t).mod);getId(){return this.id}getDomNode(){return this._nodes}getPosition(){const t=this._position.get();if(!t)return null;const e=this._editor.getLayoutInfo(),i=this._editor.getScrolledVisiblePosition(new x(t.top,1));if(!i)return null;const n=i.top-1,s=this._editor.getOffsetForColumn(t.left.lineNumber,t.left.column);return{preference:{left:e.contentLeft+s+10,top:n}}}};h=u([g(5,I)],h);export{c as InlineEditSideBySideWidget};