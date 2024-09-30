import"./style.js";import{runWhenWindowIdle as E}from"../../base/browser/dom.js";import{Event as S,Emitter as I,setGlobalLeakWarningThreshold as L}from"../../base/common/event.js";import{RunOnceScheduler as W,timeout as R}from"../../base/common/async.js";import{isFirefox as P,isSafari as _,isChrome as F}from"../../base/browser/browser.js";import{mark as d}from"../../base/common/performance.js";import{onUnexpectedError as g,setUnexpectedErrorHandler as k}from"../../base/common/errors.js";import{Registry as b}from"../../platform/registry/common/platform.js";import{isWindows as T,isLinux as D,isWeb as y,isNative as N,isMacintosh as x}from"../../base/common/platform.js";import{Extensions as V}from"../common/contributions.js";import{EditorExtensions as H}from"../common/editor.js";import{getSingletonServiceDescriptors as U}from"../../platform/instantiation/common/extensions.js";import{Position as p,Parts as a,IWorkbenchLayoutService as B,positionToString as O}from"../services/layout/browser/layoutService.js";import{IStorageService as M,WillSaveStateReason as $,StorageScope as C,StorageTarget as q}from"../../platform/storage/common/storage.js";import{IConfigurationService as w}from"../../platform/configuration/common/configuration.js";import"../../platform/instantiation/common/instantiation.js";import"../../platform/instantiation/common/serviceCollection.js";import{LifecyclePhase as u,ILifecycleService as A}from"../services/lifecycle/common/lifecycle.js";import{INotificationService as z}from"../../platform/notification/common/notification.js";import"../services/notification/common/notificationService.js";import{NotificationsCenter as J}from"./parts/notifications/notificationsCenter.js";import{NotificationsAlerts as Y}from"./parts/notifications/notificationsAlerts.js";import{NotificationsStatus as j}from"./parts/notifications/notificationsStatus.js";import{NotificationsTelemetry as G}from"./parts/notifications/notificationsTelemetry.js";import{registerNotificationCommands as K}from"./parts/notifications/notificationsCommands.js";import{NotificationsToasts as X}from"./parts/notifications/notificationsToasts.js";import{setARIAContainer as Q}from"../../base/browser/ui/aria/aria.js";import{FontMeasurements as v}from"../../editor/browser/config/fontMeasurements.js";import{BareFontInfo as Z}from"../../editor/common/config/fontInfo.js";import"../../platform/log/common/log.js";import{toErrorMessage as ee}from"../../base/common/errorMessage.js";import{WorkbenchContextKeysHandler as te}from"./contextkeys.js";import{coalesce as ie}from"../../base/common/arrays.js";import{InstantiationService as re}from"../../platform/instantiation/common/instantiationService.js";import{Layout as oe}from"./layout.js";import{IHostService as ne}from"../services/host/browser/host.js";import{IDialogService as se}from"../../platform/dialogs/common/dialogs.js";import{mainWindow as c}from"../../base/browser/window.js";import{PixelRatio as ae}from"../../base/browser/pixelRatio.js";import{IHoverService as ce,WorkbenchHoverDelegate as le}from"../../platform/hover/browser/hover.js";import{setHoverDelegateFactory as de}from"../../base/browser/ui/hover/hoverDelegateFactory.js";import{setBaseLayerHoverDelegate as he}from"../../base/browser/ui/hover/hoverDelegate2.js";import{AccessibilityProgressSignalScheduler as fe}from"../../platform/accessibilitySignal/browser/progressAccessibilitySignalScheduler.js";import{setProgressAcccessibilitySignalScheduler as me}from"../../base/browser/ui/progressbar/progressAccessibilitySignal.js";import{AccessibleViewRegistry as ge}from"../../platform/accessibility/browser/accessibleViewRegistry.js";import{NotificationAccessibleView as pe}from"./parts/notifications/notificationAccessibleView.js";class St extends oe{constructor(t,e,r,i){super(t);this.options=e;this.serviceCollection=r;d("code/willStartWorkbench"),this.registerErrorHandler(i)}_onWillShutdown=this._register(new I);onWillShutdown=this._onWillShutdown.event;_onDidShutdown=this._register(new I);onDidShutdown=this._onDidShutdown.event;registerErrorHandler(t){c.addEventListener("unhandledrejection",e=>{g(e.reason),e.preventDefault()}),k(e=>this.handleUnexpectedError(e,t))}previousUnexpectedError={message:void 0,time:0};handleUnexpectedError(t,e){const r=ee(t,!0);if(!r)return;const i=Date.now();r===this.previousUnexpectedError.message&&i-this.previousUnexpectedError.time<=1e3||(this.previousUnexpectedError.time=i,this.previousUnexpectedError.message=r,e.error(r))}startup(){try{this._register(L(175));const t=this.initServices(this.serviceCollection);return t.invokeFunction(e=>{const r=e.get(A),i=e.get(M),o=e.get(w),n=e.get(ne),s=e.get(ce),l=e.get(se),h=e.get(z);de((f,m)=>t.createInstance(le,f,m,{})),he(s),this.initLayout(e),b.as(V.Workbench).start(e),b.as(H.EditorFactory).start(e),this._register(t.createInstance(te)),this.registerListeners(r,i,o,n,l),this.renderWorkbench(t,h,i,o),this.createWorkbenchLayout(),this.layout(),this.restore(r)}),t}catch(t){throw g(t),t}}initServices(t){t.set(B,this);const e=U();for(const[i,o]of e)t.set(i,o);const r=new re(t,!0);return r.invokeFunction(i=>{const o=i.get(A),n=i.get(w);typeof n.acquireInstantiationService=="function"&&n.acquireInstantiationService(r),o.phase=u.Ready}),r}registerListeners(t,e,r,i,o){this._register(r.onDidChangeConfiguration(n=>this.updateFontAliasing(n,r))),N?this._register(e.onWillSaveState(n=>{n.reason===$.SHUTDOWN&&this.storeFontInfo(e)})):this._register(t.onWillShutdown(()=>this.storeFontInfo(e))),this._register(t.onWillShutdown(n=>this._onWillShutdown.fire(n))),this._register(t.onDidShutdown(()=>{this._onDidShutdown.fire(),this.dispose()})),this._register(i.onDidChangeFocus(n=>{n||e.flush()})),this._register(o.onWillShowDialog(()=>this.mainContainer.classList.add("modal-dialog-visible"))),this._register(o.onDidShowDialog(()=>this.mainContainer.classList.remove("modal-dialog-visible")))}fontAliasing;updateFontAliasing(t,e){if(!x||t&&!t.affectsConfiguration("workbench.fontAliasing"))return;const r=e.getValue("workbench.fontAliasing");if(this.fontAliasing===r)return;this.fontAliasing=r;const i=["antialiased","none","auto"];this.mainContainer.classList.remove(...i.map(o=>`monaco-font-aliasing-${o}`)),i.some(o=>o===r)&&this.mainContainer.classList.add(`monaco-font-aliasing-${r}`)}restoreFontInfo(t,e){const r=t.get("editorFontInfo",C.APPLICATION);if(r)try{const i=JSON.parse(r);Array.isArray(i)&&v.restoreFontInfo(c,i)}catch{}v.readFontInfo(c,Z.createFromRawSettings(e.getValue("editor"),ae.getInstance(c).value))}storeFontInfo(t){const e=v.serializeFontInfo(c);e&&t.store("editorFontInfo",JSON.stringify(e),C.APPLICATION,q.MACHINE)}renderWorkbench(t,e,r,i){Q(this.mainContainer),me((s,l)=>t.createInstance(fe,s,l));const o=T?"windows":D?"linux":"mac",n=ie(["monaco-workbench",o,y?"web":void 0,F?"chromium":P?"firefox":_?"safari":void 0,...this.getLayoutClasses(),...this.options?.extraClasses?this.options.extraClasses:[]]);this.mainContainer.classList.add(...n),c.document.body.classList.add(o),y&&c.document.body.classList.add("web"),this.updateFontAliasing(void 0,i),this.restoreFontInfo(r,i);for(const{id:s,role:l,classes:h,options:f}of[{id:a.TITLEBAR_PART,role:"none",classes:["titlebar"]},{id:a.BANNER_PART,role:"banner",classes:["banner"]},{id:a.ACTIVITYBAR_PART,role:"none",classes:["activitybar",this.getSideBarPosition()===p.LEFT?"left":"right"]},{id:a.SIDEBAR_PART,role:"none",classes:["sidebar",this.getSideBarPosition()===p.LEFT?"left":"right"]},{id:a.EDITOR_PART,role:"main",classes:["editor"],options:{restorePreviousState:this.willRestoreEditors()}},{id:a.PANEL_PART,role:"none",classes:["panel","basepanel",O(this.getPanelPosition())]},{id:a.AUXILIARYBAR_PART,role:"none",classes:["auxiliarybar","basepanel",this.getSideBarPosition()===p.LEFT?"right":"left"]},{id:a.STATUSBAR_PART,role:"status",classes:["statusbar"]}]){const m=this.createPart(s,l,h);d(`code/willCreatePart/${s}`),this.getPart(s).create(m,f),d(`code/didCreatePart/${s}`)}this.createNotificationsHandlers(t,e),this.parent.appendChild(this.mainContainer)}createPart(t,e,r){const i=document.createElement(e==="status"?"footer":"div");return i.classList.add("part",...r),i.id=t,i.setAttribute("role",e),e==="status"&&i.setAttribute("aria-live","off"),i}createNotificationsHandlers(t,e){const r=this._register(t.createInstance(J,this.mainContainer,e.model)),i=this._register(t.createInstance(X,this.mainContainer,e.model));this._register(t.createInstance(Y,e.model));const o=t.createInstance(j,e.model);this._register(t.createInstance(G)),this._register(r.onDidChangeVisibility(()=>{o.update(r.isVisible,i.isVisible),i.update(r.isVisible)})),this._register(i.onDidChangeVisibility(()=>{o.update(r.isVisible,i.isVisible)})),K(r,i,e.model),ge.register(new pe),this.registerNotifications({onDidChangeNotificationsVisibility:S.map(S.any(i.onDidChangeVisibility,r.onDidChangeVisibility),()=>i.isVisible||r.isVisible)})}restore(t){try{this.restoreParts()}catch(e){g(e)}this.whenReady.finally(()=>Promise.race([this.whenRestored,R(2e3)]).finally(()=>{function e(){d("code/didStartWorkbench"),performance.measure("perf: workbench create & restore","code/didLoadWorkbenchMain","code/didStartWorkbench")}this.isRestored()?e():this.whenRestored.finally(()=>e()),t.phase=u.Restored,this._register(new W(()=>{this._register(E(c,()=>t.phase=u.Eventually,2500))},2500)).schedule()}))}}export{St as Workbench};