var p=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var P=(s,o,e,i)=>{for(var r=i>1?void 0:i?v(o,e):o,c=s.length-1,t;c>=0;c--)(t=s[c])&&(r=(i?t(o,e,r):t(r))||r);return i&&r&&p(o,e,r),r},d=(s,o)=>(e,i)=>o(e,i,s);import{ILogService as k}from"../../../../platform/log/common/log.js";import{Disposable as W,DisposableStore as h,toDisposable as I}from"../../../../base/common/lifecycle.js";import{IMainProcessService as S}from"../../../../platform/ipc/common/mainProcessService.js";import{Client as u}from"../../../../base/parts/ipc/common/ipc.mp.js";import{createDecorator as f}from"../../../../platform/instantiation/common/instantiation.js";import{ProxyChannel as w}from"../../../../base/parts/ipc/common/ipc.js";import{generateUuid as U}from"../../../../base/common/uuid.js";import{acquirePort as g}from"../../../../base/parts/ipc/electron-sandbox/ipc.mp.js";import{ipcUtilityProcessWorkerChannelName as C}from"../../../../platform/utilityProcess/common/utilityProcessWorkerService.js";import{Barrier as b,timeout as D}from"../../../../base/common/async.js";const G=f("utilityProcessWorkerWorkbenchService");let l=class extends W{constructor(e,i,r){super();this.windowId=e;this.logService=i;this.mainProcessService=r}_utilityProcessWorkerService=void 0;get utilityProcessWorkerService(){if(!this._utilityProcessWorkerService){const e=this.mainProcessService.getChannel(C);this._utilityProcessWorkerService=w.toService(e)}return this._utilityProcessWorkerService}restoredBarrier=new b;async createWorker(e){this.logService.trace("Renderer->UtilityProcess#createWorker"),await Promise.race([this.restoredBarrier.wait(),D(2e3)]);const i=U(),r="vscode:createUtilityProcessWorkerMessageChannelResult",c=g(void 0,r,i),t=this.utilityProcessWorkerService.createWorker({process:e,reply:{windowId:this.windowId,channel:r,nonce:i}}),a=new h;a.add(I(()=>{this.logService.trace("Renderer->UtilityProcess#disposeWorker",e),this.utilityProcessWorkerService.disposeWorker({process:e,reply:{windowId:this.windowId}})}));const y=await c,m=a.add(new u(y,`window:${this.windowId},module:${e.moduleId}`));return this.logService.trace("Renderer->UtilityProcess#createWorkerChannel: connection established"),t.then(({reason:n})=>{n?.code===0?this.logService.trace(`[UtilityProcessWorker]: terminated normally with code ${n.code}, signal: ${n.signal}`):this.logService.error(`[UtilityProcessWorker]: terminated unexpectedly with code ${n?.code}, signal: ${n?.signal}`)}),{client:m,onDidTerminate:t,dispose:()=>a.dispose()}}notifyRestored(){this.restoredBarrier.isOpen()||this.restoredBarrier.open()}};l=P([d(1,k),d(2,S)],l);export{G as IUtilityProcessWorkerWorkbenchService,l as UtilityProcessWorkerWorkbenchService};