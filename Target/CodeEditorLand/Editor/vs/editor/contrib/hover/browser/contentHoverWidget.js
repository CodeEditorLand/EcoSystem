var y=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var p=(h,d,e,i)=>{for(var t=i>1?void 0:i?H(d,e):d,o=h.length-1,s;o>=0;o--)(s=h[o])&&(t=(i?s(d,e,t):s(t))||t);return i&&t&&y(d,e,t),t},a=(h,d)=>(e,i)=>d(e,i,h);import*as n from"../../../../base/browser/dom.js";import{ContentWidgetPositionPreference as v}from"../../../browser/editorBrowser.js";import{EditorOption as c}from"../../../common/config/editorOptions.js";import{HoverStartSource as N}from"./hoverOperation.js";import{IKeybindingService as S}from"../../../../platform/keybinding/common/keybinding.js";import{ResizableContentWidget as P}from"./resizableContentWidget.js";import{IContextKeyService as C}from"../../../../platform/contextkey/common/contextkey.js";import{IConfigurationService as x}from"../../../../platform/configuration/common/configuration.js";import{IAccessibilityService as M}from"../../../../platform/accessibility/common/accessibility.js";import{EditorContextKeys as g}from"../../../common/editorContextKeys.js";import{getHoverAccessibleViewHint as w,HoverWidget as W}from"../../../../base/browser/ui/hover/hoverWidget.js";import{PositionAffinity as I}from"../../../common/model.js";import{Emitter as T}from"../../../../base/common/event.js";import"./contentHoverRendered.js";const f=30,z=6;let r=class extends P{constructor(e,i,t,o,s){const _=e.getOption(c.lineHeight)+8,m=150,l=new n.Dimension(m,_);super(e,l);this._configurationService=t;this._accessibilityService=o;this._keybindingService=s;this._minimumSize=l,this._hoverVisibleKey=g.hoverVisible.bindTo(i),this._hoverFocusedKey=g.hoverFocused.bindTo(i),n.append(this._resizableNode.domNode,this._hover.containerDomNode),this._resizableNode.domNode.style.zIndex="50",this._register(this._editor.onDidLayoutChange(()=>{this.isVisible&&this._updateMaxDimensions()})),this._register(this._editor.onDidChangeConfiguration(D=>{D.hasChanged(c.fontInfo)&&this._updateFont()}));const u=this._register(n.trackFocus(this._resizableNode.domNode));this._register(u.onDidFocus(()=>{this._hoverFocusedKey.set(!0)})),this._register(u.onDidBlur(()=>{this._hoverFocusedKey.set(!1)})),this._setRenderedHover(void 0),this._editor.addContentWidget(this)}static ID="editor.contrib.resizableContentHoverWidget";static _lastDimensions=new n.Dimension(0,0);_renderedHover;_positionPreference;_minimumSize;_contentWidth;_hover=this._register(new W);_hoverVisibleKey;_hoverFocusedKey;_onDidResize=this._register(new T);onDidResize=this._onDidResize.event;get isVisibleFromKeyboard(){return this._renderedHover?.source===N.Keyboard}get isVisible(){return this._hoverVisibleKey.get()??!1}get isFocused(){return this._hoverFocusedKey.get()??!1}dispose(){super.dispose(),this._renderedHover?.dispose(),this._editor.removeContentWidget(this)}getId(){return r.ID}static _applyDimensions(e,i,t){const o=typeof i=="number"?`${i}px`:i,s=typeof t=="number"?`${t}px`:t;e.style.width=o,e.style.height=s}_setContentsDomNodeDimensions(e,i){const t=this._hover.contentsDomNode;return r._applyDimensions(t,e,i)}_setContainerDomNodeDimensions(e,i){const t=this._hover.containerDomNode;return r._applyDimensions(t,e,i)}_setHoverWidgetDimensions(e,i){this._setContentsDomNodeDimensions(e,i),this._setContainerDomNodeDimensions(e,i),this._layoutContentWidget()}static _applyMaxDimensions(e,i,t){const o=typeof i=="number"?`${i}px`:i,s=typeof t=="number"?`${t}px`:t;e.style.maxWidth=o,e.style.maxHeight=s}_setHoverWidgetMaxDimensions(e,i){r._applyMaxDimensions(this._hover.contentsDomNode,e,i),r._applyMaxDimensions(this._hover.containerDomNode,e,i),this._hover.containerDomNode.style.setProperty("--vscode-hover-maxWidth",typeof e=="number"?`${e}px`:e),this._layoutContentWidget()}_setAdjustedHoverWidgetDimensions(e){this._setHoverWidgetMaxDimensions("none","none");const i=e.width,t=e.height;this._setHoverWidgetDimensions(i,t)}_updateResizableNodeMaxDimensions(){const e=this._findMaximumRenderingWidth()??1/0,i=this._findMaximumRenderingHeight()??1/0;this._resizableNode.maxSize=new n.Dimension(e,i),this._setHoverWidgetMaxDimensions(e,i)}_resize(e){r._lastDimensions=new n.Dimension(e.width,e.height),this._setAdjustedHoverWidgetDimensions(e),this._resizableNode.layout(e.height,e.width),this._updateResizableNodeMaxDimensions(),this._hover.scrollbar.scanDomNode(),this._editor.layoutContentWidget(this),this._onDidResize.fire()}_findAvailableSpaceVertically(){const e=this._renderedHover?.showAtPosition;if(e)return this._positionPreference===v.ABOVE?this._availableVerticalSpaceAbove(e):this._availableVerticalSpaceBelow(e)}_findMaximumRenderingHeight(){const e=this._findAvailableSpaceVertically();if(!e)return;let i=z;return Array.from(this._hover.contentsDomNode.children).forEach(t=>{i+=t.clientHeight}),Math.min(e,i)}_isHoverTextOverflowing(){this._hover.containerDomNode.style.setProperty("--vscode-hover-whiteSpace","nowrap"),this._hover.containerDomNode.style.setProperty("--vscode-hover-sourceWhiteSpace","nowrap");const e=Array.from(this._hover.contentsDomNode.children).some(i=>i.scrollWidth>i.clientWidth);return this._hover.containerDomNode.style.removeProperty("--vscode-hover-whiteSpace"),this._hover.containerDomNode.style.removeProperty("--vscode-hover-sourceWhiteSpace"),e}_findMaximumRenderingWidth(){if(!this._editor||!this._editor.hasModel())return;const e=this._isHoverTextOverflowing(),i=typeof this._contentWidth>"u"?0:this._contentWidth-2;return e||this._hover.containerDomNode.clientWidth<i?n.getClientArea(this._hover.containerDomNode.ownerDocument.body).width-14:this._hover.containerDomNode.clientWidth+2}isMouseGettingCloser(e,i){if(!this._renderedHover)return!1;if(this._renderedHover.initialMousePosX===void 0||this._renderedHover.initialMousePosY===void 0)return this._renderedHover.initialMousePosX=e,this._renderedHover.initialMousePosY=i,!1;const t=n.getDomNodePagePosition(this.getDomNode());this._renderedHover.closestMouseDistance===void 0&&(this._renderedHover.closestMouseDistance=b(this._renderedHover.initialMousePosX,this._renderedHover.initialMousePosY,t.left,t.top,t.width,t.height));const o=b(e,i,t.left,t.top,t.width,t.height);return o>this._renderedHover.closestMouseDistance+4?!1:(this._renderedHover.closestMouseDistance=Math.min(this._renderedHover.closestMouseDistance,o),!0)}_setRenderedHover(e){this._renderedHover?.dispose(),this._renderedHover=e,this._hoverVisibleKey.set(!!e),this._hover.containerDomNode.classList.toggle("hidden",!e)}_updateFont(){const{fontSize:e,lineHeight:i}=this._editor.getOption(c.fontInfo),t=this._hover.contentsDomNode;t.style.fontSize=`${e}px`,t.style.lineHeight=`${i/e}`,Array.prototype.slice.call(this._hover.contentsDomNode.getElementsByClassName("code")).forEach(s=>this._editor.applyFontInfo(s))}_updateContent(e){const i=this._hover.contentsDomNode;i.style.paddingBottom="",i.textContent="",i.appendChild(e)}_layoutContentWidget(){this._editor.layoutContentWidget(this),this._hover.onContentsChanged()}_updateMaxDimensions(){const e=Math.max(this._editor.getLayoutInfo().height/4,250,r._lastDimensions.height),i=Math.max(this._editor.getLayoutInfo().width*.66,750,r._lastDimensions.width);this._setHoverWidgetMaxDimensions(i,e)}_render(e){this._setRenderedHover(e),this._updateFont(),this._updateContent(e.domNode),this._updateMaxDimensions(),this.onContentsChanged(),this._editor.render()}getPosition(){return this._renderedHover?{position:this._renderedHover.showAtPosition,secondaryPosition:this._renderedHover.showAtSecondaryPosition,positionAffinity:this._renderedHover.shouldAppearBeforeContent?I.LeftOfInjectedText:void 0,preference:[this._positionPreference??v.ABOVE]}:null}show(e){if(!this._editor||!this._editor.hasModel())return;this._render(e);const i=n.getTotalHeight(this._hover.containerDomNode),t=e.showAtPosition;this._positionPreference=this._findPositionPreference(i,t)??v.ABOVE,this.onContentsChanged(),e.shouldFocus&&this._hover.containerDomNode.focus(),this._onDidResize.fire();const s=this._hover.containerDomNode.ownerDocument.activeElement===this._hover.containerDomNode&&w(this._configurationService.getValue("accessibility.verbosity.hover")===!0&&this._accessibilityService.isScreenReaderOptimized(),this._keybindingService.lookupKeybinding("editor.action.accessibleView")?.getAriaLabel()??"");s&&(this._hover.contentsDomNode.ariaLabel=this._hover.contentsDomNode.textContent+", "+s)}hide(){if(!this._renderedHover)return;const e=this._renderedHover.shouldFocus||this._hoverFocusedKey.get();this._setRenderedHover(void 0),this._resizableNode.maxSize=new n.Dimension(1/0,1/0),this._resizableNode.clearSashHoverState(),this._hoverFocusedKey.set(!1),this._editor.layoutContentWidget(this),e&&this._editor.focus()}_removeConstraintsRenderNormally(){const e=this._editor.getLayoutInfo();this._resizableNode.layout(e.height,e.width),this._setHoverWidgetDimensions("auto","auto")}setMinimumDimensions(e){this._minimumSize=new n.Dimension(Math.max(this._minimumSize.width,e.width),Math.max(this._minimumSize.height,e.height)),this._updateMinimumWidth()}_updateMinimumWidth(){const e=typeof this._contentWidth>"u"?this._minimumSize.width:Math.min(this._contentWidth,this._minimumSize.width);this._resizableNode.minSize=new n.Dimension(e,this._minimumSize.height)}onContentsChanged(){this._removeConstraintsRenderNormally();const e=this._hover.containerDomNode;let i=n.getTotalHeight(e),t=n.getTotalWidth(e);if(this._resizableNode.layout(i,t),this._setHoverWidgetDimensions(t,i),i=n.getTotalHeight(e),t=n.getTotalWidth(e),this._contentWidth=t,this._updateMinimumWidth(),this._resizableNode.layout(i,t),this._renderedHover?.showAtPosition){const o=n.getTotalHeight(this._hover.containerDomNode);this._positionPreference=this._findPositionPreference(o,this._renderedHover.showAtPosition)}this._layoutContentWidget()}focus(){this._hover.containerDomNode.focus()}scrollUp(){const e=this._hover.scrollbar.getScrollPosition().scrollTop,i=this._editor.getOption(c.fontInfo);this._hover.scrollbar.setScrollPosition({scrollTop:e-i.lineHeight})}scrollDown(){const e=this._hover.scrollbar.getScrollPosition().scrollTop,i=this._editor.getOption(c.fontInfo);this._hover.scrollbar.setScrollPosition({scrollTop:e+i.lineHeight})}scrollLeft(){const e=this._hover.scrollbar.getScrollPosition().scrollLeft;this._hover.scrollbar.setScrollPosition({scrollLeft:e-f})}scrollRight(){const e=this._hover.scrollbar.getScrollPosition().scrollLeft;this._hover.scrollbar.setScrollPosition({scrollLeft:e+f})}pageUp(){const e=this._hover.scrollbar.getScrollPosition().scrollTop,i=this._hover.scrollbar.getScrollDimensions().height;this._hover.scrollbar.setScrollPosition({scrollTop:e-i})}pageDown(){const e=this._hover.scrollbar.getScrollPosition().scrollTop,i=this._hover.scrollbar.getScrollDimensions().height;this._hover.scrollbar.setScrollPosition({scrollTop:e+i})}goToTop(){this._hover.scrollbar.setScrollPosition({scrollTop:0})}goToBottom(){this._hover.scrollbar.setScrollPosition({scrollTop:this._hover.scrollbar.getScrollDimensions().scrollHeight})}};r=p([a(1,C),a(2,x),a(3,M),a(4,S)],r);function b(h,d,e,i,t,o){const s=e+t/2,_=i+o/2,m=Math.max(Math.abs(h-s)-t/2,0),l=Math.max(Math.abs(d-_)-o/2,0);return Math.sqrt(m*m+l*l)}export{r as ContentHoverWidget};
