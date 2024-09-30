var f=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var v=(s,n,e,t)=>{for(var o=t>1?void 0:t?b(n,e):n,i=s.length-1,r;i>=0;i--)(r=s[i])&&(o=(t?r(n,e,o):r(o))||o);return t&&o&&f(n,e,o),o},c=(s,n)=>(e,t)=>n(e,t,s);import*as h from"../../../../base/browser/dom.js";import{KeyCode as m}from"../../../../base/common/keyCodes.js";import{Disposable as R}from"../../../../base/common/lifecycle.js";import{MouseTargetType as p}from"../../../browser/editorBrowser.js";import{EditorOption as g}from"../../../common/config/editorOptions.js";import"../../../common/core/range.js";import{TokenizationRegistry as I}from"../../../common/languages.js";import{HoverOperation as y,HoverStartMode as H,HoverStartSource as _}from"./hoverOperation.js";import{HoverParticipantRegistry as W,HoverRangeAnchor as u}from"./hoverTypes.js";import{IInstantiationService as A}from"../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as O}from"../../../../platform/keybinding/common/keybinding.js";import"../../../common/standalone/standaloneEnums.js";import{ContentHoverWidget as P}from"./contentHoverWidget.js";import{ContentHoverComputer as S}from"./contentHoverComputer.js";import{ContentHoverResult as M}from"./contentHoverTypes.js";import{Emitter as E}from"../../../../base/common/event.js";import{RenderedContentHover as w}from"./contentHoverRendered.js";import{isMousePositionWithinElement as T}from"./hoverUtils.js";let a=class extends R{constructor(e,t,o){super();this._editor=e;this._instantiationService=t;this._keybindingService=o;this._contentHoverWidget=this._register(this._instantiationService.createInstance(P,this._editor)),this._participants=this._initializeHoverParticipants(),this._hoverOperation=this._register(new y(this._editor,new S(this._editor,this._participants))),this._registerListeners()}_currentResult=null;_renderedContentHover;_contentHoverWidget;_participants;_hoverOperation;_onContentsChanged=this._register(new E);onContentsChanged=this._onContentsChanged.event;_initializeHoverParticipants(){const e=[];for(const t of W.getAll()){const o=this._instantiationService.createInstance(t,this._editor);e.push(o)}return e.sort((t,o)=>t.hoverOrdinal-o.hoverOrdinal),this._register(this._contentHoverWidget.onDidResize(()=>{this._participants.forEach(t=>t.handleResize?.())})),e}_registerListeners(){this._register(this._hoverOperation.onResult(t=>{const o=t.hasLoadingMessage?this._addLoadingMessage(t):t.value;this._withResult(new M(o,t.isComplete,t.options))}));const e=this._contentHoverWidget.getDomNode();this._register(h.addStandardDisposableListener(e,"keydown",t=>{t.equals(m.Escape)&&this.hide()})),this._register(h.addStandardDisposableListener(e,"mouseleave",t=>{this._onMouseLeave(t)})),this._register(I.onDidChange(()=>{this._contentHoverWidget.position&&this._currentResult&&this._setCurrentResult(this._currentResult)}))}_startShowingOrUpdateHover(e,t,o,i,r){if(!(this._contentHoverWidget.position&&this._currentResult))return e?(this._startHoverOperationIfNecessary(e,t,o,i,!1),!0):!1;const d=this._editor.getOption(g.hover).sticky,C=r&&this._contentHoverWidget.isMouseGettingCloser(r.event.posx,r.event.posy);return d&&C?(e&&this._startHoverOperationIfNecessary(e,t,o,i,!0),!0):e?this._currentResult&&this._currentResult.options.anchor.equals(e)?!0:this._currentResult&&e.canAdoptVisibleHover(this._currentResult.options.anchor,this._contentHoverWidget.position)?(this._currentResult&&this._setCurrentResult(this._currentResult.filter(e)),this._startHoverOperationIfNecessary(e,t,o,i,!1),!0):(this._setCurrentResult(null),this._startHoverOperationIfNecessary(e,t,o,i,!1),!0):(this._setCurrentResult(null),!1)}_startHoverOperationIfNecessary(e,t,o,i,r){if(this._hoverOperation.options&&this._hoverOperation.options.anchor.equals(e))return;this._hoverOperation.cancel();const d={anchor:e,source:o,shouldFocus:i,insistOnKeepingHoverVisible:r};this._hoverOperation.start(t,d)}_setCurrentResult(e){let t=e;if(this._currentResult===t)return;t&&t.hoverParts.length===0&&(t=null),this._currentResult=t,this._currentResult?this._showHover(this._currentResult):this._hideHover()}_addLoadingMessage(e){for(const t of this._participants){if(!t.createLoadingMessage)continue;const o=t.createLoadingMessage(e.options.anchor);if(o)return e.value.slice(0).concat([o])}return e.value}_withResult(e){if(this._contentHoverWidget.position&&this._currentResult&&this._currentResult.isComplete||this._setCurrentResult(e),!e.isComplete)return;const i=e.hoverParts.length===0,r=e.options.insistOnKeepingHoverVisible;i&&r||this._setCurrentResult(e)}_showHover(e){const t=this._getHoverContext();this._renderedContentHover=new w(this._editor,e,this._participants,t,this._keybindingService),this._renderedContentHover.domNodeHasChildren?this._contentHoverWidget.show(this._renderedContentHover):this._renderedContentHover.dispose()}_hideHover(){this._contentHoverWidget.hide()}_getHoverContext(){return{hide:()=>{this.hide()},onContentsChanged:()=>{this._onContentsChanged.fire(),this._contentHoverWidget.onContentsChanged()},setMinimumDimensions:i=>{this._contentHoverWidget.setMinimumDimensions(i)}}}showsOrWillShow(e){if(this._contentHoverWidget.isResizing)return!0;const o=this._findHoverAnchorCandidates(e);if(!(o.length>0))return this._startShowingOrUpdateHover(null,H.Delayed,_.Mouse,!1,e);const r=o[0];return this._startShowingOrUpdateHover(r,H.Delayed,_.Mouse,!1,e)}_findHoverAnchorCandidates(e){const t=[];for(const i of this._participants){if(!i.suggestHoverAnchor)continue;const r=i.suggestHoverAnchor(e);r&&t.push(r)}const o=e.target;switch(o.type){case p.CONTENT_TEXT:{t.push(new u(0,o.range,e.event.posx,e.event.posy));break}case p.CONTENT_EMPTY:{const i=this._editor.getOption(g.fontInfo).typicalHalfwidthCharacterWidth/2;if(!(!o.detail.isAfterLines&&typeof o.detail.horizontalDistanceToText=="number"&&o.detail.horizontalDistanceToText<i))break;t.push(new u(0,o.range,e.event.posx,e.event.posy));break}}return t.sort((i,r)=>r.priority-i.priority),t}_onMouseLeave(e){const t=this._editor.getDomNode();(!t||!T(t,e.x,e.y))&&this.hide()}startShowingAtRange(e,t,o,i){this._startShowingOrUpdateHover(new u(0,e,void 0,void 0),t,o,i,null)}getWidgetContent(){const e=this._contentHoverWidget.getDomNode();if(e.textContent)return e.textContent}async updateHoverVerbosityLevel(e,t,o){this._renderedContentHover?.updateHoverVerbosityLevel(e,t,o)}doesHoverAtIndexSupportVerbosityAction(e,t){return this._renderedContentHover?.doesHoverAtIndexSupportVerbosityAction(e,t)??!1}getAccessibleWidgetContent(){return this._renderedContentHover?.getAccessibleWidgetContent()}getAccessibleWidgetContentAtIndex(e){return this._renderedContentHover?.getAccessibleWidgetContentAtIndex(e)}focusedHoverPartIndex(){return this._renderedContentHover?.focusedHoverPartIndex??-1}containsNode(e){return e?this._contentHoverWidget.getDomNode().contains(e):!1}focus(){this._contentHoverWidget.focus()}focusHoverPartWithIndex(e){this._renderedContentHover?.focusHoverPartWithIndex(e)}scrollUp(){this._contentHoverWidget.scrollUp()}scrollDown(){this._contentHoverWidget.scrollDown()}scrollLeft(){this._contentHoverWidget.scrollLeft()}scrollRight(){this._contentHoverWidget.scrollRight()}pageUp(){this._contentHoverWidget.pageUp()}pageDown(){this._contentHoverWidget.pageDown()}goToTop(){this._contentHoverWidget.goToTop()}goToBottom(){this._contentHoverWidget.goToBottom()}hide(){this._hoverOperation.cancel(),this._setCurrentResult(null)}getDomNode(){return this._contentHoverWidget.getDomNode()}get isColorPickerVisible(){return this._renderedContentHover?.isColorPickerVisible()??!1}get isVisibleFromKeyboard(){return this._contentHoverWidget.isVisibleFromKeyboard}get isVisible(){return this._contentHoverWidget.isVisible}get isFocused(){return this._contentHoverWidget.isFocused}get isResizing(){return this._contentHoverWidget.isResizing}get widget(){return this._contentHoverWidget}};a=v([c(1,A),c(2,O)],a);export{a as ContentHoverWidgetWrapper};