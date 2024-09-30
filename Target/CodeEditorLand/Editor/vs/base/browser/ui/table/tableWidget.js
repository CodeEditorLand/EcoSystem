import{$ as d,append as h,clearNode as I,createStyleSheet as E,getContentHeight as R,getContentWidth as f}from"../../dom.js";import{getBaseLayerHoverDelegate as D}from"../hover/hoverDelegate2.js";import{getDefaultHoverDelegate as M}from"../hover/hoverDelegateFactory.js";import"../list/list.js";import{List as y,unthemedListStyles as C}from"../list/listWidget.js";import{Orientation as S,SplitView as L}from"../splitview/splitview.js";import"./table.js";import{Emitter as H,Event as T}from"../../../common/event.js";import{Disposable as x,DisposableStore as O}from"../../../common/lifecycle.js";import{ScrollbarVisibility as N}from"../../../common/scrollable.js";import"../../../common/sequence.js";import"./table.css";class m{constructor(e,t,i){this.columns=e;this.getColumnSize=i;const l=new Map(t.map(n=>[n.templateId,n]));this.renderers=[];for(const n of e){const s=l.get(n.templateId);if(!s)throw new Error(`Table cell renderer for template id ${n.templateId} not found.`);this.renderers.push(s)}}static TemplateId="row";templateId=m.TemplateId;renderers;renderedTemplates=new Set;renderTemplate(e){const t=h(e,d(".monaco-table-tr")),i=[],l=[];for(let s=0;s<this.columns.length;s++){const r=this.renderers[s],a=h(t,d(".monaco-table-td",{"data-col-index":s}));a.style.width=`${this.getColumnSize(s)}px`,i.push(a),l.push(r.renderTemplate(a))}const n={container:e,cellContainers:i,cellTemplateData:l};return this.renderedTemplates.add(n),n}renderElement(e,t,i,l){for(let n=0;n<this.columns.length;n++){const r=this.columns[n].project(e);this.renderers[n].renderElement(r,t,i.cellTemplateData[n],l)}}disposeElement(e,t,i,l){for(let n=0;n<this.columns.length;n++){const s=this.renderers[n];if(s.disposeElement){const a=this.columns[n].project(e);s.disposeElement(a,t,i.cellTemplateData[n],l)}}}disposeTemplate(e){for(let t=0;t<this.columns.length;t++)this.renderers[t].disposeTemplate(e.cellTemplateData[t]);I(e.container),this.renderedTemplates.delete(e)}layoutColumn(e,t){for(const{cellContainers:i}of this.renderedTemplates)i[e].style.width=`${t}px`}}function V(c){return{getHeight(e){return c.getHeight(e)},getTemplateId(){return m.TemplateId}}}class F extends x{constructor(t,i){super();this.column=t;this.index=i;this.element=d(".monaco-table-th",{"data-col-index":i},t.label),t.tooltip&&this._register(D().setupManagedHover(M("mouse"),this.element,t.tooltip))}element;get minimumSize(){return this.column.minimumWidth??120}get maximumSize(){return this.column.maximumWidth??Number.POSITIVE_INFINITY}get onDidChange(){return this.column.onDidChangeWidthConstraints??T.None}_onDidLayout=new H;onDidLayout=this._onDidLayout.event;layout(t){this._onDidLayout.fire([this.index,t])}}class v{constructor(e,t,i,l,n,s){this.virtualDelegate=i;this.columns=l;this.domNode=h(t,d(`.monaco-table.${this.domId}`));const r=l.map((o,u)=>this.disposables.add(new F(o,u))),a={size:r.reduce((o,u)=>o+u.column.weight,0),views:r.map(o=>({size:o.column.weight,view:o}))};this.splitview=this.disposables.add(new L(this.domNode,{orientation:S.HORIZONTAL,scrollbarVisibility:N.Hidden,getSashOrthogonalSize:()=>this.cachedHeight,descriptor:a})),this.splitview.el.style.height=`${i.headerRowHeight}px`,this.splitview.el.style.lineHeight=`${i.headerRowHeight}px`;const p=new m(l,n,o=>this.splitview.getViewSize(o));this.list=this.disposables.add(new y(e,this.domNode,V(i),[p],s)),T.any(...r.map(o=>o.onDidLayout))(([o,u])=>p.layoutColumn(o,u),null,this.disposables),this.splitview.onDidSashReset(o=>{const u=l.reduce((b,w)=>b+w.weight,0),g=l[o].weight/u*this.cachedWidth;this.splitview.resizeView(o,g)},null,this.disposables),this.styleElement=E(this.domNode),this.style(C)}static InstanceCount=0;domId=`table_id_${++v.InstanceCount}`;domNode;splitview;list;styleElement;disposables=new O;cachedWidth=0;cachedHeight=0;get onDidChangeFocus(){return this.list.onDidChangeFocus}get onDidChangeSelection(){return this.list.onDidChangeSelection}get onDidScroll(){return this.list.onDidScroll}get onMouseClick(){return this.list.onMouseClick}get onMouseDblClick(){return this.list.onMouseDblClick}get onMouseMiddleClick(){return this.list.onMouseMiddleClick}get onPointer(){return this.list.onPointer}get onMouseUp(){return this.list.onMouseUp}get onMouseDown(){return this.list.onMouseDown}get onMouseOver(){return this.list.onMouseOver}get onMouseMove(){return this.list.onMouseMove}get onMouseOut(){return this.list.onMouseOut}get onTouchStart(){return this.list.onTouchStart}get onTap(){return this.list.onTap}get onContextMenu(){return this.list.onContextMenu}get onDidFocus(){return this.list.onDidFocus}get onDidBlur(){return this.list.onDidBlur}get scrollTop(){return this.list.scrollTop}set scrollTop(e){this.list.scrollTop=e}get scrollLeft(){return this.list.scrollLeft}set scrollLeft(e){this.list.scrollLeft=e}get scrollHeight(){return this.list.scrollHeight}get renderHeight(){return this.list.renderHeight}get onDidDispose(){return this.list.onDidDispose}getColumnLabels(){return this.columns.map(e=>e.label)}resizeColumn(e,t){const i=Math.round(t/100*this.cachedWidth);this.splitview.resizeView(e,i)}updateOptions(e){this.list.updateOptions(e)}splice(e,t,i=[]){this.list.splice(e,t,i)}rerender(){this.list.rerender()}row(e){return this.list.element(e)}indexOf(e){return this.list.indexOf(e)}get length(){return this.list.length}getHTMLElement(){return this.domNode}layout(e,t){e=e??R(this.domNode),t=t??f(this.domNode),this.cachedWidth=t,this.cachedHeight=e,this.splitview.layout(t);const i=e-this.virtualDelegate.headerRowHeight;this.list.getHTMLElement().style.height=`${i}px`,this.list.layout(i,t)}triggerTypeNavigation(){this.list.triggerTypeNavigation()}style(e){const t=[];t.push(`.monaco-table.${this.domId} > .monaco-split-view2 .monaco-sash.vertical::before {
			top: ${this.virtualDelegate.headerRowHeight+1}px;
			height: calc(100% - ${this.virtualDelegate.headerRowHeight}px);
		}`),this.styleElement.textContent=t.join(`
`),this.list.style(e)}domFocus(){this.list.domFocus()}setAnchor(e){this.list.setAnchor(e)}getAnchor(){return this.list.getAnchor()}getSelectedElements(){return this.list.getSelectedElements()}setSelection(e,t){this.list.setSelection(e,t)}getSelection(){return this.list.getSelection()}setFocus(e,t){this.list.setFocus(e,t)}focusNext(e=1,t=!1,i){this.list.focusNext(e,t,i)}focusPrevious(e=1,t=!1,i){this.list.focusPrevious(e,t,i)}focusNextPage(e){return this.list.focusNextPage(e)}focusPreviousPage(e){return this.list.focusPreviousPage(e)}focusFirst(e){this.list.focusFirst(e)}focusLast(e){this.list.focusLast(e)}getFocus(){return this.list.getFocus()}getFocusedElements(){return this.list.getFocusedElements()}getRelativeTop(e){return this.list.getRelativeTop(e)}reveal(e,t){this.list.reveal(e,t)}dispose(){this.disposables.dispose()}}export{v as Table};