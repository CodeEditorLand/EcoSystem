var K=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var x=(h,w,e,o)=>{for(var s=o>1?void 0:o?$(w,e):w,r=h.length-1,t;r>=0;r--)(t=h[r])&&(s=(o?t(w,e,s):t(s))||s);return o&&s&&K(w,e,s),s},f=(h,w)=>(e,o)=>w(e,o,h);import"./media/progressService.css";import{localize as P}from"../../../../nls.js";import{dispose as R,DisposableStore as O,Disposable as V,toDisposable as U}from"../../../../base/common/lifecycle.js";import{IProgressService as q,ProgressLocation as y,Progress as z}from"../../../../platform/progress/common/progress.js";import{StatusbarAlignment as G,IStatusbarService as j}from"../../statusbar/browser/statusbar.js";import{DeferredPromise as J,RunOnceScheduler as Q,timeout as L}from"../../../../base/common/async.js";import{ProgressBadge as X,IActivityService as Y}from"../../activity/common/activity.js";import{INotificationService as Z,Severity as ee,NotificationPriority as I,isNotificationSource as re,NotificationsFilter as _}from"../../../../platform/notification/common/notification.js";import{Action as B}from"../../../../base/common/actions.js";import{Event as E,Emitter as T}from"../../../../base/common/event.js";import{InstantiationType as ie,registerSingleton as te}from"../../../../platform/instantiation/common/extensions.js";import{ILayoutService as se}from"../../../../platform/layout/browser/layoutService.js";import{Dialog as oe}from"../../../../base/browser/ui/dialog/dialog.js";import{IKeybindingService as ne}from"../../../../platform/keybinding/common/keybinding.js";import"../../../../base/browser/keyboardEvent.js";import{EventHelper as ae}from"../../../../base/browser/dom.js";import{parseLinkedText as H}from"../../../../base/common/linkedText.js";import{IViewDescriptorService as ce,ViewContainerLocation as k}from"../../../common/views.js";import{IViewsService as de}from"../../views/common/viewsService.js";import{IPaneCompositePartService as le}from"../../panecomposite/browser/panecomposite.js";import{stripIcons as pe}from"../../../../base/common/iconLabels.js";import{defaultButtonStyles as ge,defaultCheckboxStyles as ue,defaultDialogStyles as fe,defaultInputBoxStyles as me}from"../../../../platform/theme/browser/defaultStyles.js";import{ResultKind as Pe}from"../../../../platform/keybinding/common/keybindingResolver.js";import{IUserActivityService as ye}from"../../userActivity/common/userActivityService.js";let b=class extends V{constructor(e,o,s,r,t,a,i,c,d){super();this.activityService=e;this.paneCompositeService=o;this.viewDescriptorService=s;this.viewsService=r;this.notificationService=t;this.statusbarService=a;this.layoutService=i;this.keybindingService=c;this.userActivityService=d}async withProgress(e,o,s){const{location:r}=e,t=async i=>{const c=this.userActivityService.markActive({whenHeldFor:15e3});try{return await o(i)}finally{c.dispose()}},a=i=>{const c=this.viewDescriptorService.getViewContainerById(i);if(c){const d=this.viewDescriptorService.getViewContainerLocation(c);if(d!==null)return this.withPaneCompositeProgress(i,d,t,{...e,location:i})}if(this.viewDescriptorService.getViewDescriptorById(i)!==null)return this.withViewProgress(i,t,{...e,location:i});throw new Error(`Bad progress location: ${i}`)};if(typeof r=="string")return a(r);switch(r){case y.Notification:{let i=e.priority;return i!==I.URGENT&&(this.notificationService.getFilter()===_.ERROR?i=I.SILENT:re(e.source)&&this.notificationService.getFilter(e.source)===_.ERROR&&(i=I.SILENT)),this.withNotificationProgress({...e,location:r,priority:i},t,s)}case y.Window:{const i=e.type;return e.command?this.withWindowProgress({...e,location:r,type:i},t):this.withNotificationProgress({delay:150,...e,priority:I.SILENT,location:y.Notification,type:i},t,s)}case y.Explorer:return this.withPaneCompositeProgress("workbench.view.explorer",k.Sidebar,t,{...e,location:r});case y.Scm:return a("workbench.scm");case y.Extensions:return this.withPaneCompositeProgress("workbench.view.extensions",k.Sidebar,t,{...e,location:r});case y.Dialog:return this.withDialogProgress(e,t,s);default:throw new Error(`Bad progress location: ${r}`)}}windowProgressStack=[];windowProgressStatusEntry=void 0;withWindowProgress(e,o){const s=[e,new z(()=>this.updateWindowProgress())],r=o(s[1]);let t=setTimeout(()=>{t=void 0,this.windowProgressStack.unshift(s),this.updateWindowProgress(),Promise.all([L(150),r]).finally(()=>{const a=this.windowProgressStack.indexOf(s);this.windowProgressStack.splice(a,1),this.updateWindowProgress()})},150);return r.finally(()=>clearTimeout(t))}updateWindowProgress(e=0){if(e<this.windowProgressStack.length){const[o,s]=this.windowProgressStack[e],r=o.title,t=s.value&&s.value.message,a=o.command;let i,c;const d=o.source&&typeof o.source!="string"?o.source.label:o.source;if(r&&t)i=P("progress.text2","{0}: {1}",r,t),c=d?P("progress.title3","[{0}] {1}: {2}",d,r,t):i;else if(r)i=r,c=d?P("progress.title2","[{0}]: {1}",d,r):i;else if(t)i=t,c=d?P("progress.title2","[{0}]: {1}",d,t):i;else{this.updateWindowProgress(e+1);return}const l={name:P("status.progress","Progress Message"),text:i,showProgress:o.type||!0,ariaLabel:i,tooltip:c,command:a};this.windowProgressStatusEntry?this.windowProgressStatusEntry.update(l):this.windowProgressStatusEntry=this.statusbarService.addEntry(l,"status.progress",G.LEFT)}else this.windowProgressStatusEntry?.dispose(),this.windowProgressStatusEntry=void 0}withNotificationProgress(e,o,s){const r=new class extends V{_onDidReport=this._register(new T);onDidReport=this._onDidReport.event;_onWillDispose=this._register(new T);onWillDispose=this._onWillDispose.event;_step=void 0;get step(){return this._step}_done=!1;get done(){return this._done}promise;constructor(){super(),this.promise=o(this),this.promise.finally(()=>{this.dispose()})}report(n){this._step=n,this._onDidReport.fire(n)}cancel(n){s?.(n),this.dispose()}dispose(){this._done=!0,this._onWillDispose.fire(),super.dispose()}},t=()=>{const n=new J;return this.withWindowProgress({location:y.Window,title:e.title?H(e.title).toString():void 0,command:"notifications.showList",type:e.type},p=>{function g(m){m.message&&p.report({message:H(m.message).toString()})}r.step&&g(r.step);const u=r.onDidReport(m=>g(m));return n.p.finally(()=>u.dispose()),E.once(r.onWillDispose)(()=>n.complete()),n.p}),U(()=>n.complete())},a=(n,p,g)=>{const u=new O,m=e.primaryActions?Array.from(e.primaryActions):[],M=e.secondaryActions?Array.from(e.secondaryActions):[];if(e.buttons&&e.buttons.forEach((v,F)=>{const N=new class extends B{constructor(){super(`progress.button.${v}`,v,void 0,!0)}async run(){r.cancel(F)}};u.add(N),m.push(N)}),e.cancellable){const v=new class extends B{constructor(){super("progress.cancel",P("cancel","Cancel"),void 0,!0)}async run(){r.cancel()}};u.add(v),m.push(v)}const C=this.notificationService.notify({severity:ee.Info,message:pe(n),source:e.source,actions:{primary:m,secondary:M},progress:typeof g=="number"&&g>=0?{total:100,worked:g}:{infinite:!0},priority:p});let A;const W=v=>{R(A),!v&&!r.done&&(A=t())};return u.add(C.onDidChangeVisibility(W)),p===I.SILENT&&W(!1),E.once(C.onDidClose)(()=>u.dispose()),C},i=(n,p)=>{typeof p=="number"&&p>=0?(n.progress.total(100),n.progress.worked(p)):n.progress.infinite()};let c,d,l;const S=n=>{n?.message&&e.title?l=`${e.title}: ${n.message}`:l=e.title||n?.message,!c&&l&&(typeof e.delay=="number"&&e.delay>0?typeof d!="number"&&(d=setTimeout(()=>c=a(l,e.priority,n?.increment),e.delay)):c=a(l,e.priority,n?.increment)),c&&(l&&c.updateMessage(l),typeof n?.increment=="number"&&i(c,n.increment))};S(r.step);const D=r.onDidReport(n=>S(n));return E.once(r.onWillDispose)(()=>D.dispose()),(async()=>{try{typeof e.delay=="number"&&e.delay>0?await r.promise:await Promise.all([L(800),r.promise])}finally{clearTimeout(d),c?.close()}})(),r.promise}withPaneCompositeProgress(e,o,s,r){const t=this.paneCompositeService.getProgressIndicator(e,o),a=t?this.withCompositeProgress(t,s,r):s({report:()=>{}});return o===k.Sidebar&&this.showOnActivityBar(e,r,a),a}withViewProgress(e,o,s){const r=this.viewsService.getViewProgressIndicator(e),t=r?this.withCompositeProgress(r,o,s):o({report:()=>{}});if(this.viewDescriptorService.getViewLocationById(e)!==k.Sidebar)return t;const i=this.viewDescriptorService.getViewContainerByViewId(e)?.id;return i===void 0||this.showOnActivityBar(i,s,t),t}showOnActivityBar(e,o,s){let r,t=setTimeout(()=>{t=void 0;const a=this.activityService.showViewContainerActivity(e,{badge:new X(()=>""),priority:100}),i=Date.now(),c=300;r={dispose(){const d=Date.now()-i;d<c?setTimeout(()=>a.dispose(),c-d):a.dispose()}}},o.delay||300);s.finally(()=>{clearTimeout(t),R(r)})}withCompositeProgress(e,o,s){let r;function t(i){let c,d;return typeof i<"u"&&(typeof i=="number"?c=i:typeof i.increment=="number"&&(c=i.total??100,d=i.increment)),typeof c=="number"?(r||(r=e.show(c,s.delay),a.catch(()=>{}).finally(()=>r?.done())),typeof d=="number"&&r.worked(d)):(r?.done(),e.showWhile(a,s.delay)),r}const a=o({report:i=>{t(i)}});return t(s.total),a}withDialogProgress(e,o,s){const r=new O,t=["workbench.action.quit","workbench.action.reloadWindow","copy","cut","editor.action.clipboardCopyAction","editor.action.clipboardCutAction"];let a;const i=n=>{const p=e.buttons||[];return e.sticky||p.push(e.cancellable?P("cancel","Cancel"):P("dismiss","Dismiss")),a=new oe(this.layoutService.activeContainer,n,p,{type:"pending",detail:e.detail,cancelId:p.length-1,disableCloseAction:e.sticky,disableDefaultAction:e.sticky,keyEventProcessor:g=>{const u=this.keybindingService.softDispatch(g,this.layoutService.activeContainer);u.kind===Pe.KbFound&&u.commandId&&(t.includes(u.commandId)||ae.stop(g,!0))},buttonStyles:ge,checkboxStyles:ue,inputBoxStyles:me,dialogStyles:fe}),r.add(a),a.show().then(g=>{s?.(g.button),R(a)}),a};let c=e.delay??0,d;const l=r.add(new Q(()=>{c=0,d&&!a?a=i(d):d&&a.updateMessage(d)},0)),S=function(n){d=n,l.isScheduled()||l.schedule(c)},D=o({report:n=>{S(n.message)}});return D.finally(()=>{R(r)}),e.title&&S(e.title),D}};b=x([f(0,Y),f(1,le),f(2,ce),f(3,de),f(4,Z),f(5,j),f(6,se),f(7,ne),f(8,ye)],b),te(q,b,ie.Delayed);export{b as ProgressService};