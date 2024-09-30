var x=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var A=(r,n,e,i)=>{for(var t=i>1?void 0:i?B(n,e):n,o=r.length-1,s;o>=0;o--)(s=r[o])&&(t=(i?s(n,e,t):s(t))||t);return i&&t&&x(n,e,t),t},a=(r,n)=>(e,i)=>n(e,i,r);import"./media/bannerpart.css";import{localize2 as L}from"../../../../nls.js";import{$ as c,addDisposableListener as k,append as m,asCSSUrl as T,clearNode as I,EventType as R,isHTMLElement as N}from"../../../../base/browser/dom.js";import{ActionBar as E}from"../../../../base/browser/ui/actionbar/actionbar.js";import{InstantiationType as _,registerSingleton as K}from"../../../../platform/instantiation/common/extensions.js";import{IInstantiationService as M}from"../../../../platform/instantiation/common/instantiation.js";import{IStorageService as P}from"../../../../platform/storage/common/storage.js";import{IThemeService as D}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as v}from"../../../../base/common/themables.js";import{Part as H}from"../../part.js";import{IWorkbenchLayoutService as S,Parts as l}from"../../../services/layout/browser/layoutService.js";import{Action as W}from"../../../../base/common/actions.js";import{Link as V}from"../../../../platform/opener/browser/link.js";import"../../../../base/common/htmlContent.js";import{Emitter as F}from"../../../../base/common/event.js";import{IBannerService as u}from"../../../services/banner/browser/bannerService.js";import{MarkdownRenderer as U}from"../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";import{Action2 as z,registerAction2 as O}from"../../../../platform/actions/common/actions.js";import{Categories as $}from"../../../../platform/action/common/actionCommonCategories.js";import{KeybindingsRegistry as p,KeybindingWeight as b}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{KeyCode as d}from"../../../../base/common/keyCodes.js";import{IContextKeyService as j}from"../../../../platform/contextkey/common/contextkey.js";import{URI as J}from"../../../../base/common/uri.js";import{widgetClose as Y}from"../../../../platform/theme/common/iconRegistry.js";import{BannerFocused as f}from"../../../common/contextkeys.js";let h=class extends H{constructor(e,i,t,o,s){super(l.BANNER_PART,{hasTitle:!1},e,t,i);this.contextKeyService=o;this.instantiationService=s;this.markdownRenderer=this.instantiationService.createInstance(U,{})}height=26;minimumWidth=0;maximumWidth=Number.POSITIVE_INFINITY;get minimumHeight(){return this.visible?this.height:0}get maximumHeight(){return this.visible?this.height:0}_onDidChangeSize=this._register(new F);get onDidChange(){return this._onDidChangeSize.event}item;markdownRenderer;visible=!1;actionBar;messageActionsContainer;focusedActionIndex=-1;createContentArea(e){this.element=e,this.element.tabIndex=0,this._register(k(this.element,R.FOCUS,()=>{this.focusedActionIndex!==-1&&this.focusActionLink()}));const i=this._register(this.contextKeyService.createScoped(this.element));return f.bindTo(i).set(!0),this.element}close(e){this.setVisibility(!1),I(this.element),typeof e.onClose=="function"&&e.onClose(),this.item=void 0}focusActionLink(){const e=this.item?.actions?.length??0;if(this.focusedActionIndex<e){const i=this.messageActionsContainer?.children[this.focusedActionIndex];N(i)&&(this.actionBar?.setFocusable(!1),i.focus())}else this.actionBar?.focus(0)}getAriaLabel(e){if(e.ariaLabel)return e.ariaLabel;if(typeof e.message=="string")return e.message}getBannerMessage(e){if(typeof e=="string"){const i=c("span");return i.innerText=e,i}return this.markdownRenderer.render(e).element}setVisibility(e){e!==this.visible&&(this.visible=e,this.focusedActionIndex=-1,this.layoutService.setPartHidden(!e,l.BANNER_PART),this._onDidChangeSize.fire(void 0))}focus(){this.focusedActionIndex=-1,this.element.focus()}focusNextAction(){const e=this.item?.actions?.length??0;this.focusedActionIndex=this.focusedActionIndex<e?this.focusedActionIndex+1:0,this.focusActionLink()}focusPreviousAction(){const e=this.item?.actions?.length??0;this.focusedActionIndex=this.focusedActionIndex>0?this.focusedActionIndex-1:e,this.focusActionLink()}hide(e){this.item?.id===e&&this.setVisibility(!1)}show(e){if(e.id===this.item?.id){this.setVisibility(!0);return}I(this.element);const i=this.getAriaLabel(e);i&&this.element.setAttribute("aria-label",i);const t=m(this.element,c("div.icon-container"));t.setAttribute("aria-hidden","true"),v.isThemeIcon(e.icon)?t.appendChild(c(`div${v.asCSSSelector(e.icon)}`)):(t.classList.add("custom-icon"),J.isUri(e.icon)&&(t.style.backgroundImage=T(e.icon)));const o=m(this.element,c("div.message-container"));if(o.setAttribute("aria-hidden","true"),o.appendChild(this.getBannerMessage(e.message)),this.messageActionsContainer=m(this.element,c("div.message-actions-container")),e.actions)for(const w of e.actions)this._register(this.instantiationService.createInstance(V,this.messageActionsContainer,{...w,tabIndex:-1},{}));const s=m(this.element,c("div.action-container"));this.actionBar=this._register(new E(s));const y=e.closeLabel??"Close Banner",C=this._register(new W("banner.close",y,v.asClassName(Y),!0,()=>this.close(e)));this.actionBar.push(C,{icon:!0,label:!1}),this.actionBar.setFocusable(!1),this.setVisibility(!0),this.item=e}toJSON(){return{type:l.BANNER_PART}}};h=A([a(0,D),a(1,S),a(2,P),a(3,j),a(4,M)],h),K(u,h,_.Eager),p.registerCommandAndKeybindingRule({id:"workbench.banner.focusBanner",weight:b.WorkbenchContrib,primary:d.Escape,when:f,handler:r=>{r.get(u).focus()}}),p.registerCommandAndKeybindingRule({id:"workbench.banner.focusNextAction",weight:b.WorkbenchContrib,primary:d.RightArrow,secondary:[d.DownArrow],when:f,handler:r=>{r.get(u).focusNextAction()}}),p.registerCommandAndKeybindingRule({id:"workbench.banner.focusPreviousAction",weight:b.WorkbenchContrib,primary:d.LeftArrow,secondary:[d.UpArrow],when:f,handler:r=>{r.get(u).focusPreviousAction()}});class g extends z{static ID="workbench.action.focusBanner";static LABEL=L("focusBanner","Focus Banner");constructor(){super({id:g.ID,title:g.LABEL,category:$.View,f1:!0})}async run(n){n.get(S).focusPart(l.BANNER_PART)}}O(g);export{h as BannerPart};