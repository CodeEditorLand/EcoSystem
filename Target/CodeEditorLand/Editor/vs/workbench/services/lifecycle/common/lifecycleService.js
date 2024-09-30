var c=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var u=(s,n,e,t)=>{for(var r=t>1?void 0:t?w(n,e):n,a=s.length-1,d;a>=0;a--)(d=s[a])&&(r=(t?d(n,e,r):d(r))||r);return t&&r&&c(n,e,r),r},h=(s,n)=>(e,t)=>n(e,t,s);import{Emitter as i}from"../../../../base/common/event.js";import{Barrier as _}from"../../../../base/common/async.js";import{Disposable as f}from"../../../../base/common/lifecycle.js";import{StartupKind as S,LifecyclePhase as v,LifecyclePhaseToString as g,ShutdownReason as l}from"./lifecycle.js";import{ILogService as E}from"../../../../platform/log/common/log.js";import{mark as y}from"../../../../base/common/performance.js";import{IStorageService as K,StorageScope as p,StorageTarget as W,WillSaveStateReason as m}from"../../../../platform/storage/common/storage.js";let o=class extends f{constructor(e,t){super();this.logService=e;this.storageService=t;this._startupKind=this.resolveStartupKind(),this._register(this.storageService.onWillSaveState(r=>{r.reason===m.SHUTDOWN&&this.storageService.store(o.LAST_SHUTDOWN_REASON_KEY,this.shutdownReason,p.WORKSPACE,W.MACHINE)}))}static LAST_SHUTDOWN_REASON_KEY="lifecyle.lastShutdownReason";_onBeforeShutdown=this._register(new i);onBeforeShutdown=this._onBeforeShutdown.event;_onWillShutdown=this._register(new i);onWillShutdown=this._onWillShutdown.event;_onDidShutdown=this._register(new i);onDidShutdown=this._onDidShutdown.event;_onBeforeShutdownError=this._register(new i);onBeforeShutdownError=this._onBeforeShutdownError.event;_onShutdownVeto=this._register(new i);onShutdownVeto=this._onShutdownVeto.event;_startupKind;get startupKind(){return this._startupKind}_phase=v.Starting;get phase(){return this._phase}phaseWhen=new Map;shutdownReason;resolveStartupKind(){const e=this.doResolveStartupKind()??S.NewWindow;return this.logService.trace(`[lifecycle] starting up (startup kind: ${e})`),e}doResolveStartupKind(){const e=this.storageService.getNumber(o.LAST_SHUTDOWN_REASON_KEY,p.WORKSPACE);this.storageService.remove(o.LAST_SHUTDOWN_REASON_KEY,p.WORKSPACE);let t;switch(e){case l.RELOAD:t=S.ReloadedWindow;break;case l.LOAD:t=S.ReopenedWindow;break}return t}set phase(e){if(e<this.phase)throw new Error("Lifecycle cannot go backwards");if(this._phase===e)return;this.logService.trace(`lifecycle: phase changed (value: ${e})`),this._phase=e,y(`code/LifecyclePhase/${g(e)}`);const t=this.phaseWhen.get(this._phase);t&&(t.open(),this.phaseWhen.delete(this._phase))}async when(e){if(e<=this._phase)return;let t=this.phaseWhen.get(e);t||(t=new _,this.phaseWhen.set(e,t)),await t.wait()}};o=u([h(0,E),h(1,K)],o);export{o as AbstractLifecycleService};