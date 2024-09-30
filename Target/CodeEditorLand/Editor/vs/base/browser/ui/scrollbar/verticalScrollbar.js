import{StandardWheelEvent as o}from"../../mouseEvent.js";import{AbstractScrollbar as S}from"./abstractScrollbar.js";import"./scrollableElementOptions.js";import{ARROW_IMG_SIZE as s}from"./scrollbarArrow.js";import{ScrollbarState as h}from"./scrollbarState.js";import{Codicon as c}from"../../../common/codicons.js";import{ScrollbarVisibility as a}from"../../../common/scrollable.js";class y extends S{constructor(e,r,n){const l=e.getScrollDimensions(),d=e.getCurrentScrollPosition();if(super({lazyRender:r.lazyRender,host:n,scrollbarState:new h(r.verticalHasArrows?r.arrowSize:0,r.vertical===a.Hidden?0:r.verticalScrollbarSize,0,l.height,l.scrollHeight,d.scrollTop),visibility:r.vertical,extraScrollbarClassName:"vertical",scrollable:e,scrollByPage:r.scrollByPage}),r.verticalHasArrows){const t=(r.arrowSize-s)/2,i=(r.verticalScrollbarSize-s)/2;this._createArrow({className:"scra",icon:c.scrollbarButtonUp,top:t,left:i,bottom:void 0,right:void 0,bgWidth:r.verticalScrollbarSize,bgHeight:r.arrowSize,onActivate:()=>this._host.onMouseWheel(new o(null,0,1))}),this._createArrow({className:"scra",icon:c.scrollbarButtonDown,top:void 0,left:i,bottom:t,right:void 0,bgWidth:r.verticalScrollbarSize,bgHeight:r.arrowSize,onActivate:()=>this._host.onMouseWheel(new o(null,0,-1))})}this._createSlider(0,Math.floor((r.verticalScrollbarSize-r.verticalSliderSize)/2),r.verticalSliderSize,void 0)}_updateSlider(e,r){this.slider.setHeight(e),this.slider.setTop(r)}_renderDomNode(e,r){this.domNode.setWidth(r),this.domNode.setHeight(e),this.domNode.setRight(0),this.domNode.setTop(0)}onDidScroll(e){return this._shouldRender=this._onElementScrollSize(e.scrollHeight)||this._shouldRender,this._shouldRender=this._onElementScrollPosition(e.scrollTop)||this._shouldRender,this._shouldRender=this._onElementSize(e.height)||this._shouldRender,this._shouldRender}_pointerDownRelativePosition(e,r){return r}_sliderPointerPosition(e){return e.pageY}_sliderOrthogonalPointerPosition(e){return e.pageX}_updateScrollbarSize(e){this.slider.setWidth(e)}writeScrollPosition(e,r){e.scrollTop=r}updateOptions(e){this.updateScrollbarSize(e.vertical===a.Hidden?0:e.verticalScrollbarSize),this._scrollbarState.setOppositeScrollbarSize(0),this._visibilityController.setVisibility(e.vertical),this._scrollByPage=e.scrollByPage}}export{y as VerticalScrollbar};