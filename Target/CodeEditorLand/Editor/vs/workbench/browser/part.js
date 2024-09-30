import"./media/part.css";import{Component as h}from"../common/component.js";import"../../platform/theme/common/themeService.js";import{Dimension as o,size as u,getActiveDocument as p,prepend as c}from"../../base/browser/dom.js";import"../../platform/storage/common/storage.js";import"../../base/browser/ui/grid/grid.js";import{Emitter as l}from"../../base/common/event.js";import"../services/layout/browser/layoutService.js";import{assertIsDefined as f}from"../../base/common/types.js";import{toDisposable as b}from"../../base/common/lifecycle.js";class F extends h{constructor(e,i,r,n,s){super(e,r,n);this.options=i;this.layoutService=s;this._register(s.registerPart(this))}_dimension;get dimension(){return this._dimension}_contentPosition;get contentPosition(){return this._contentPosition}_onDidVisibilityChange=this._register(new l);onDidVisibilityChange=this._onDidVisibilityChange.event;parent;headerArea;titleArea;contentArea;footerArea;partLayout;onThemeChange(e){this.parent&&super.onThemeChange(e)}create(e,i){this.parent=e,this.titleArea=this.createTitleArea(e,i),this.contentArea=this.createContentArea(e,i),this.partLayout=new a(this.options,this.contentArea),this.updateStyles()}getContainer(){return this.parent}createTitleArea(e,i){}getTitleArea(){return this.titleArea}createContentArea(e,i){}getContentArea(){return this.contentArea}setHeaderArea(e){if(this.headerArea)throw new Error("Header already exists");!this.parent||!this.titleArea||(c(this.parent,e),e.classList.add("header-or-footer"),e.classList.add("header"),this.headerArea=e,this.partLayout?.setHeaderVisibility(!0),this.relayout())}setFooterArea(e){if(this.footerArea)throw new Error("Footer already exists");!this.parent||!this.titleArea||(this.parent.appendChild(e),e.classList.add("header-or-footer"),e.classList.add("footer"),this.footerArea=e,this.partLayout?.setFooterVisibility(!0),this.relayout())}removeHeaderArea(){this.headerArea&&(this.headerArea.remove(),this.headerArea=void 0,this.partLayout?.setHeaderVisibility(!1),this.relayout())}removeFooterArea(){this.footerArea&&(this.footerArea.remove(),this.footerArea=void 0,this.partLayout?.setFooterVisibility(!1),this.relayout())}relayout(){this.dimension&&this.contentPosition&&this.layout(this.dimension.width,this.dimension.height,this.contentPosition.top,this.contentPosition.left)}layoutContents(e,i){return f(this.partLayout).layout(e,i)}_onDidChange=this._register(new l);get onDidChange(){return this._onDidChange.event}element;layout(e,i,r,n){this._dimension=new o(e,i),this._contentPosition={top:r,left:n}}setVisible(e){this._onDidVisibilityChange.fire(e)}}class a{constructor(t,e){this.options=t;this.contentArea=e}static HEADER_HEIGHT=35;static TITLE_HEIGHT=35;static Footer_HEIGHT=35;headerVisible=!1;footerVisible=!1;layout(t,e){let i;this.options.hasTitle?i=new o(t,Math.min(e,a.TITLE_HEIGHT)):i=o.None;let r;this.headerVisible?r=new o(t,Math.min(e,a.HEADER_HEIGHT)):r=o.None;let n;this.footerVisible?n=new o(t,Math.min(e,a.Footer_HEIGHT)):n=o.None;let s=t;this.options&&typeof this.options.borderWidth=="function"&&(s-=this.options.borderWidth());const d=new o(s,e-i.height-r.height-n.height);return this.contentArea&&u(this.contentArea,d.width,d.height),{headerSize:r,titleSize:i,contentSize:d,footerSize:n}}setFooterVisibility(t){this.footerVisible=t}setHeaderVisibility(t){this.headerVisible=t}}class G extends h{_parts=new Set;get parts(){return Array.from(this._parts)}registerPart(t){return this._parts.add(t),b(()=>this.unregisterPart(t))}unregisterPart(t){this._parts.delete(t)}getPart(t){return this.getPartByDocument(t.ownerDocument)}getPartByDocument(t){if(this._parts.size>1){for(const e of this._parts)if(e.element?.ownerDocument===t)return e}return this.mainPart}get activePart(){return this.getPartByDocument(p())}}export{G as MultiWindowParts,F as Part};