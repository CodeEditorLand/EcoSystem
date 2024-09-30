var p=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var g=(r,i,e,t)=>{for(var o=t>1?void 0:t?y(i,e):i,a=r.length-1,d;a>=0;a--)(d=r[a])&&(o=(t?d(i,e,o):d(o))||o);return t&&o&&p(i,e,o),o},s=(r,i)=>(e,t)=>i(e,t,r);import{KeyMod as f,KeyCode as b}from"../../../base/common/keyCodes.js";import{ContextKeyExpr as l,IContextKeyService as I,RawContextKey as N}from"../../../platform/contextkey/common/contextkey.js";import{KeybindingWeight as C,KeybindingsRegistry as v}from"../../../platform/keybinding/common/keybindingsRegistry.js";import{WorkbenchListFocusContextKey as m,WorkbenchListScrollAtBottomContextKey as h,WorkbenchListScrollAtTopContextKey as S}from"../../../platform/list/browser/listService.js";import"../../../base/common/event.js";import{combinedDisposable as c,toDisposable as D,Disposable as K}from"../../../base/common/lifecycle.js";import{WorkbenchPhase as w,registerWorkbenchContribution2 as A}from"../../common/contributions.js";import{ILogService as x}from"../../../platform/log/common/log.js";import{IConfigurationService as E}from"../../../platform/configuration/common/configuration.js";function W(r,i,e){const t=new Set;return c(...r.map((o,a)=>c(o.onDidFocus(()=>{e?.(a,"focus"),t.size||i(!0),t.add(a)}),o.onDidBlur(()=>{e?.(a,"blur"),t.delete(a),t.size||i(!1)}))))}const u=new N("navigableContainerFocused",!1);let n=class{constructor(i,e,t){this.logService=e;this.configurationService=t;this.focused=u.bindTo(i),n.INSTANCE=this}static ID="workbench.contrib.navigableContainerManager";static INSTANCE;containers=new Set;lastContainer;focused;dispose(){this.containers.clear(),this.focused.reset(),n.INSTANCE=void 0}get debugEnabled(){return this.configurationService.getValue("workbench.navigibleContainer.enableDebug")}log(i,...e){this.debugEnabled&&this.logService.debug(i,...e)}static register(i){const e=this.INSTANCE;return e?(e.containers.add(i),e.log("NavigableContainerManager.register",i.name),c(W(i.focusNotifiers,t=>{t?(e.log("NavigableContainerManager.focus",i.name),e.focused.set(!0),e.lastContainer=i):(e.log("NavigableContainerManager.blur",i.name,e.lastContainer?.name),e.lastContainer===i&&(e.focused.set(!1),e.lastContainer=void 0))},(t,o)=>{e.log("NavigableContainerManager.partFocusChange",i.name,t,o)}),D(()=>{e.containers.delete(i),e.log("NavigableContainerManager.unregister",i.name,e.lastContainer?.name),e.lastContainer===i&&(e.focused.set(!1),e.lastContainer=void 0)}))):K.None}static getActive(){return this.INSTANCE?.lastContainer}};n=g([s(0,I),s(1,x),s(2,E)],n);function q(r){return n.register(r)}A(n.ID,n,w.BlockStartup),v.registerCommandAndKeybindingRule({id:"widgetNavigation.focusPrevious",weight:C.WorkbenchContrib,when:l.and(u,l.or(m?.negate(),S)),primary:f.CtrlCmd|b.UpArrow,handler:()=>{n.getActive()?.focusPreviousWidget()}}),v.registerCommandAndKeybindingRule({id:"widgetNavigation.focusNext",weight:C.WorkbenchContrib,when:l.and(u,l.or(m?.negate(),h)),primary:f.CtrlCmd|b.DownArrow,handler:()=>{n.getActive()?.focusNextWidget()}});export{q as registerNavigableContainer};