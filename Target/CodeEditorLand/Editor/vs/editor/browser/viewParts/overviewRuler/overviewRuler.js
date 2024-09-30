import{createFastDomNode as v}from"../../../../base/browser/fastDomNode.js";import"../../editorBrowser.js";import{EditorOption as a}from"../../../common/config/editorOptions.js";import{OverviewZoneManager as _}from"../../../common/viewModel/overviewZoneManager.js";import"../../../common/viewModel/viewContext.js";import"../../../common/viewEvents.js";import{ViewEventHandler as m}from"../../../common/viewEventHandler.js";class E extends m{_context;_domNode;_zoneManager;constructor(e,t){super(),this._context=e;const n=this._context.configuration.options;this._domNode=v(document.createElement("canvas")),this._domNode.setClassName(t),this._domNode.setPosition("absolute"),this._domNode.setLayerHinting(!0),this._domNode.setContain("strict"),this._zoneManager=new _(r=>this._context.viewLayout.getVerticalOffsetForLineNumber(r)),this._zoneManager.setDOMWidth(0),this._zoneManager.setDOMHeight(0),this._zoneManager.setOuterHeight(this._context.viewLayout.getScrollHeight()),this._zoneManager.setLineHeight(n.get(a.lineHeight)),this._zoneManager.setPixelRatio(n.get(a.pixelRatio)),this._context.addEventHandler(this)}dispose(){this._context.removeEventHandler(this),super.dispose()}onConfigurationChanged(e){const t=this._context.configuration.options;return e.hasChanged(a.lineHeight)&&(this._zoneManager.setLineHeight(t.get(a.lineHeight)),this._render()),e.hasChanged(a.pixelRatio)&&(this._zoneManager.setPixelRatio(t.get(a.pixelRatio)),this._domNode.setWidth(this._zoneManager.getDOMWidth()),this._domNode.setHeight(this._zoneManager.getDOMHeight()),this._domNode.domNode.width=this._zoneManager.getCanvasWidth(),this._domNode.domNode.height=this._zoneManager.getCanvasHeight(),this._render()),!0}onFlushed(e){return this._render(),!0}onScrollChanged(e){return e.scrollHeightChanged&&(this._zoneManager.setOuterHeight(e.scrollHeight),this._render()),!0}onZonesChanged(e){return this._render(),!0}getDomNode(){return this._domNode.domNode}setLayout(e){this._domNode.setTop(e.top),this._domNode.setRight(e.right);let t=!1;t=this._zoneManager.setDOMWidth(e.width)||t,t=this._zoneManager.setDOMHeight(e.height)||t,t&&(this._domNode.setWidth(this._zoneManager.getDOMWidth()),this._domNode.setHeight(this._zoneManager.getDOMHeight()),this._domNode.domNode.width=this._zoneManager.getCanvasWidth(),this._domNode.domNode.height=this._zoneManager.getCanvasHeight(),this._render())}setZones(e){this._zoneManager.setZones(e),this._render()}_render(){if(this._zoneManager.getOuterHeight()===0)return!1;const e=this._zoneManager.getCanvasWidth(),t=this._zoneManager.getCanvasHeight(),n=this._zoneManager.resolveColorZones(),r=this._zoneManager.getId2Color(),s=this._domNode.domNode.getContext("2d");return s.clearRect(0,0,e,t),n.length>0&&this._renderOneLane(s,n,r,e),!0}_renderOneLane(e,t,n,r){let s=0,o=0,i=0;for(const h of t){const l=h.colorId,d=h.from,g=h.to;l!==s?(e.fillRect(0,o,r,i-o),s=l,e.fillStyle=n[s],o=d,i=g):i>=d?i=Math.max(i,g):(e.fillRect(0,o,r,i-o),o=d,i=g)}e.fillRect(0,o,r,i-o)}}export{E as OverviewRuler};