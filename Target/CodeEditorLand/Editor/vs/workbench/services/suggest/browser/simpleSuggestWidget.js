var I=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var y=(g,p,e,s)=>{for(var t=s>1?void 0:s?M(p,e):p,o=g.length-1,i;o>=0;o--)(i=g[o])&&(t=(s?i(p,e,t):i(t))||t);return s&&t&&I(p,e,t),t},H=(g,p)=>(e,s)=>p(e,s,g);import"./media/suggest.css";import*as l from"../../../../base/browser/dom.js";import"../../../../base/browser/ui/list/list.js";import{List as L}from"../../../../base/browser/ui/list/listWidget.js";import{ResizableHTMLElement as z}from"../../../../base/browser/ui/resizable/resizable.js";import"./simpleCompletionItem.js";import"./simpleCompletionModel.js";import{SimpleSuggestWidgetItemRenderer as D}from"./simpleSuggestWidgetRenderer.js";import{TimeoutTimer as x}from"../../../../base/common/async.js";import{Emitter as b}from"../../../../base/common/event.js";import{MutableDisposable as E,Disposable as C}from"../../../../base/common/lifecycle.js";import{clamp as P}from"../../../../base/common/numbers.js";import{localize as S}from"../../../../nls.js";import{IInstantiationService as W}from"../../../../platform/instantiation/common/instantiation.js";import{SuggestWidgetStatus as N}from"../../../../editor/contrib/suggest/browser/suggestWidgetStatus.js";import"../../../../platform/actions/common/actions.js";const A=l.$;var R=(i=>(i[i.Hidden=0]="Hidden",i[i.Loading=1]="Loading",i[i.Empty=2]="Empty",i[i.Open=3]="Open",i[i.Frozen=4]="Frozen",i[i.Details=5]="Details",i))(R||{}),F=(e=>(e[e.Above=0]="Above",e[e.Below=1]="Below",e))(F||{});let v=class extends C{constructor(e,s,t,o,i){super();this._container=e;this._persistedSize=s;this._getFontInfo=t;this.element=this._register(new z),this.element.domNode.classList.add("workbench-suggest-widget"),this._container.appendChild(this.element.domNode);class c{constructor(h,m,d=!1,a=!1){this.persistedSize=h;this.currentSize=m;this.persistHeight=d;this.persistWidth=a}}let r;this._register(this.element.onDidWillResize(()=>{r=new c(this._persistedSize.restore(),this.element.size)})),this._register(this.element.onDidResize(n=>{if(this._resize(n.dimension.width,n.dimension.height),r&&(r.persistHeight=r.persistHeight||!!n.north||!!n.south,r.persistWidth=r.persistWidth||!!n.east||!!n.west),!!n.done){if(r){const{itemHeight:h,defaultSize:m}=this._getLayoutInfo(),d=Math.round(h/2);let{width:a,height:_}=this.element.size;(!r.persistHeight||Math.abs(r.currentSize.height-_)<=d)&&(_=r.persistedSize?.height??m.height),(!r.persistWidth||Math.abs(r.currentSize.width-a)<=d)&&(a=r.persistedSize?.width??m.width),this._persistedSize.store(new l.Dimension(a,_))}r=void 0}}));const u=new D(t);this._register(u),this._listElement=l.append(this.element.domNode,A(".tree")),this._list=this._register(new L("SuggestWidget",this._listElement,{getHeight:n=>this._getLayoutInfo().itemHeight,getTemplateId:n=>"suggestion"},[u],{alwaysConsumeMouseWheel:!0,useShadows:!1,mouseSupport:!1,multipleSelectionSupport:!1,accessibilityProvider:{getRole:()=>"option",getWidgetAriaLabel:()=>S("suggest","Suggest"),getWidgetRole:()=>"listbox",getAriaLabel:n=>{let h=n.completion.label;if(typeof n.completion.label!="string"){const{detail:d,description:a}=n.completion.label;d&&a?h=S("label.full","{0}{1}, {2}",h,d,a):d?h=S("label.detail","{0}{1}",h,d):a&&(h=S("label.desc","{0}, {1}",h,a))}const{detail:m}=n.completion;return S("ariaCurrenttSuggestionReadDetails","{0}, docs: {1}",h,m)}}})),o.statusBarMenuId&&(this._status=this._register(i.createInstance(N,this.element.domNode,o.statusBarMenuId)),this.element.domNode.classList.toggle("with-status-bar",!0)),this._register(this._list.onMouseDown(n=>this._onListMouseDownOrTap(n))),this._register(this._list.onTap(n=>this._onListMouseDownOrTap(n))),this._register(this._list.onDidChangeSelection(n=>this._onListSelection(n)))}_state=0;_completionModel;_cappedHeight;_forceRenderingAbove=!1;_preference;_pendingLayout=this._register(new E);element;_listElement;_list;_status;_showTimeout=this._register(new x);_onDidSelect=this._register(new b);onDidSelect=this._onDidSelect.event;_onDidHide=this._register(new b);onDidHide=this._onDidHide.event;_onDidShow=this._register(new b);onDidShow=this._onDidShow.event;get list(){return this._list}_cursorPosition;setCompletionModel(e){this._completionModel=e}hasCompletions(){return this._completionModel?.items.length!==0}showSuggestions(e,s,t,o){if(this._cursorPosition=o,s&&this._state!==2&&this._state!==0){this._setState(4);return}if((this._completionModel?.items.length??0)===0){this._setState(t?0:2),this._completionModel=void 0;return}try{this._list.splice(0,this._list.length,this._completionModel?.items??[]),this._setState(s?4:3),this._list.reveal(e,0),this._list.setFocus([e])}finally{}this._pendingLayout.value=l.runAtThisOrScheduleAtNextAnimationFrame(l.getWindow(this.element.domNode),()=>{this._pendingLayout.clear(),this._layout(this.element.size)})}setLineContext(e){this._completionModel&&(this._completionModel.lineContext=e)}_setState(e){if(this._state!==e)switch(this._state=e,this.element.domNode.classList.toggle("frozen",e===4),this.element.domNode.classList.remove("message"),e){case 0:l.hide(this._listElement),this._status&&l.hide(this._status?.element),this._status?.hide(),this._showTimeout.cancel(),this.element.domNode.classList.remove("visible"),this._list.splice(0,this._list.length),this._cappedHeight=void 0;break;case 1:this.element.domNode.classList.add("message"),l.hide(this._listElement),this._status&&l.hide(this._status?.element),this._show();break;case 2:this.element.domNode.classList.add("message"),l.hide(this._listElement),this._status&&l.hide(this._status?.element),this._show();break;case 3:l.show(this._listElement),this._status&&l.show(this._status?.element),this._show();break;case 4:l.show(this._listElement),this._status&&l.show(this._status?.element),this._show();break;case 5:l.show(this._listElement),this._status&&l.show(this._status?.element),this._show();break}}_show(){this._status?.show(),l.show(this.element.domNode),this._layout(this._persistedSize.restore()),this._showTimeout.cancelAndSet(()=>{this.element.domNode.classList.add("visible"),this._onDidShow.fire(this)},100)}hide(){this._pendingLayout.clear(),this._setState(0),this._onDidHide.fire(this),l.hide(this.element.domNode),this.element.clearSashHoverState();const e=this._persistedSize.restore(),s=Math.ceil(this._getLayoutInfo().itemHeight*4.3);e&&e.height<s&&this._persistedSize.store(e.with(void 0,s))}_layout(e){if(!this._cursorPosition)return;const s=l.getClientArea(this._container.ownerDocument.body),t=this._getLayoutInfo();e||(e=t.defaultSize);let o=e.height,i=e.width;this._status&&(this._status.element.style.lineHeight=`${t.itemHeight}px`);const c=s.width-t.borderHeight-2*t.horizontalPadding;i>c&&(i=c);const r=this._completionModel?this._completionModel.stats.pLabelLen*t.typicalHalfwidthCharacterWidth:i,u=t.statusBarHeight+this._list.contentHeight+t.borderHeight,n=t.itemHeight+t.statusBarHeight,h=l.getDomNodePagePosition(this._container),m=this._cursorPosition,d=h.top+m.top+m.height,a=Math.min(s.height-d-t.verticalPadding,u),_=h.top+m.top-t.verticalPadding,w=Math.min(_,u);let f=Math.min(Math.max(w,a)+t.borderHeight,u);o===this._cappedHeight?.capped&&(o=this._cappedHeight.wanted),o<n&&(o=n),o>f&&(o=f),o>a||this._forceRenderingAbove&&_>150?(this._preference=0,this.element.enableSashes(!0,!0,!1,!1),f=w):(this._preference=1,this.element.enableSashes(!1,!0,!0,!1),f=a),this.element.preferredSize=new l.Dimension(r,t.defaultSize.height),this.element.maxSize=new l.Dimension(c,f),this.element.minSize=new l.Dimension(220,n),this._cappedHeight=o===u?{wanted:this._cappedHeight?.wanted??e.height,capped:o}:void 0,this.element.domNode.style.left=`${this._cursorPosition.left}px`,this._preference===0?this.element.domNode.style.top=`${this._cursorPosition.top-o-t.borderHeight}px`:this.element.domNode.style.top=`${this._cursorPosition.top+this._cursorPosition.height}px`,this._resize(i,o)}_resize(e,s){const{width:t,height:o}=this.element.maxSize;e=Math.min(t,e),o&&(s=Math.min(o,s));const{statusBarHeight:i}=this._getLayoutInfo();this._list.layout(s-i,e),this._listElement.style.height=`${s-i}px`,this._listElement.style.width=`${e}px`,this._listElement.style.height=`${s}px`,this.element.layout(s,e)}_getLayoutInfo(){const e=this._getFontInfo(),s=P(Math.ceil(e.lineHeight),8,1e3),t=0;const o=1,i=2*o;return{itemHeight:s,statusBarHeight:t,borderWidth:o,borderHeight:i,typicalHalfwidthCharacterWidth:10,verticalPadding:22,horizontalPadding:14,defaultSize:new l.Dimension(430,t+12*s+i)}}_onListMouseDownOrTap(e){typeof e.element>"u"||typeof e.index>"u"||(e.browserEvent.preventDefault(),e.browserEvent.stopPropagation(),this._select(e.element,e.index))}_onListSelection(e){e.elements.length&&this._select(e.elements[0],e.indexes[0])}_select(e,s){const t=this._completionModel;t&&this._onDidSelect.fire({item:e,index:s,model:t})}selectNext(){this._list.focusNext(1,!0);const e=this._list.getFocus();return e.length>0&&this._list.reveal(e[0]),!0}selectNextPage(){this._list.focusNextPage();const e=this._list.getFocus();return e.length>0&&this._list.reveal(e[0]),!0}selectPrevious(){this._list.focusPrevious(1,!0);const e=this._list.getFocus();return e.length>0&&this._list.reveal(e[0]),!0}selectPreviousPage(){this._list.focusPreviousPage();const e=this._list.getFocus();return e.length>0&&this._list.reveal(e[0]),!0}getFocusedItem(){if(this._completionModel)return{item:this._list.getFocusedElements()[0],index:this._list.getFocus()[0],model:this._completionModel}}forceRenderingAbove(){this._forceRenderingAbove||(this._forceRenderingAbove=!0,this._layout(this._persistedSize.restore()))}stopForceRenderingAbove(){this._forceRenderingAbove=!1}};v=y([H(4,W)],v);export{v as SimpleSuggestWidget};