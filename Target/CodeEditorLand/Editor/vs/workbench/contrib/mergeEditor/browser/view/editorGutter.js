import{h as b,reset as w}from"../../../../../base/browser/dom.js";import{Disposable as N,toDisposable as C}from"../../../../../base/common/lifecycle.js";import{autorun as h,observableFromEvent as g,observableSignal as f,observableSignalFromEvent as c,transaction as _}from"../../../../../base/common/observable.js";import"../../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";import{LineRange as T}from"../model/lineRange.js";class M extends N{constructor(e,n,d){super();this._editor=e;this._domNode=n;this.itemProvider=d;this._domNode.className="gutter monaco-editor";const s=this._domNode.appendChild(b("div.scroll-decoration",{role:"presentation",ariaHidden:"true",style:{width:"100%"}}).root),o=new ResizeObserver(()=>{_(t=>{this.domNodeSizeChanged.trigger(t)})});o.observe(this._domNode),this._register(C(()=>o.disconnect())),this._register(h(t=>{s.className=this.isScrollTopZero.read(t)?"":"scroll-decoration"})),this._register(h(t=>this.render(t)))}scrollTop=g(this,this._editor.onDidScrollChange,e=>this._editor.getScrollTop());isScrollTopZero=this.scrollTop.map(e=>e===0);modelAttached=g(this,this._editor.onDidChangeModel,e=>this._editor.hasModel());editorOnDidChangeViewZones=c("onDidChangeViewZones",this._editor.onDidChangeViewZones);editorOnDidContentSizeChange=c("onDidContentSizeChange",this._editor.onDidContentSizeChange);domNodeSizeChanged=f("domNodeSizeChanged");dispose(){super.dispose(),w(this._domNode)}views=new Map;render(e){if(!this.modelAttached.read(e))return;this.domNodeSizeChanged.read(e),this.editorOnDidChangeViewZones.read(e),this.editorOnDidContentSizeChange.read(e);const n=this.scrollTop.read(e),d=this._editor.getVisibleRanges(),s=new Set(this.views.keys());if(d.length>0){const o=d[0],t=new T(o.startLineNumber,o.endLineNumber-o.startLineNumber).deltaEnd(1),v=this.itemProvider.getIntersectingGutterItems(t,e);for(const i of v){if(!i.range.touches(t))continue;s.delete(i.id);let r=this.views.get(i.id);if(r)r.gutterItemView.update(i);else{const m=document.createElement("div");this._domNode.appendChild(m);const I=this.itemProvider.createView(i,m);r=new y(I,m),this.views.set(i.id,r)}const a=i.range.startLineNumber<=this._editor.getModel().getLineCount()?this._editor.getTopForLineNumber(i.range.startLineNumber,!0)-n:this._editor.getBottomForLineNumber(i.range.startLineNumber-1,!1)-n,l=this._editor.getBottomForLineNumber(i.range.endLineNumberExclusive-1,!0)-n-a;r.domNode.style.top=`${a}px`,r.domNode.style.height=`${l}px`,r.gutterItemView.layout(a,l,0,this._domNode.clientHeight)}}for(const o of s){const t=this.views.get(o);t.gutterItemView.dispose(),t.domNode.remove(),this.views.delete(o)}}}class y{constructor(p,e){this.gutterItemView=p;this.domNode=e}}export{M as EditorGutter};