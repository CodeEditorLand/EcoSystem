var P=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var m=(s,e,t,a)=>{for(var i=a>1?void 0:a?F(e,t):e,n=s.length-1,r;n>=0;n--)(r=s[n])&&(i=(a?r(e,t,i):r(i))||i);return a&&i&&P(e,t,i),i},o=(s,e)=>(t,a)=>e(t,a,s);import{spawn as k}from"child_process";import{realpath as q,watch as L}from"fs";import{timeout as _}from"../../../base/common/async.js";import{Emitter as D,Event as f}from"../../../base/common/event.js";import*as c from"../../../base/common/path.js";import{IEnvironmentMainService as U}from"../../environment/electron-main/environmentMainService.js";import{ILifecycleMainService as I}from"../../lifecycle/electron-main/lifecycleMainService.js";import{ILogService as b}from"../../log/common/log.js";import{ITelemetryService as E}from"../../telemetry/common/telemetry.js";import{State as d,StateType as p,UpdateType as S}from"../common/update.js";import"./abstractUpdateService.js";let l=class{constructor(e,t,a){this.lifecycleMainService=e;this.logService=a;if(t.disableUpdates){this.logService.info("update#ctor - updates are disabled");return}this.setState(d.Idle(this.getUpdateType())),this.scheduleCheckForUpdates(30*1e3).then(void 0,i=>this.logService.error(i))}_state=d.Uninitialized;_onStateChange=new D;onStateChange=this._onStateChange.event;get state(){return this._state}setState(e){this.logService.info("update#setState",e.type),this._state=e,this._onStateChange.fire(e)}scheduleCheckForUpdates(e=60*60*1e3){return _(e).then(()=>this.checkForUpdates(!1)).then(()=>this.scheduleCheckForUpdates(60*60*1e3))}async checkForUpdates(e){this.logService.trace("update#checkForUpdates, state = ",this.state.type),this.state.type===p.Idle&&this.doCheckForUpdates(e)}async downloadUpdate(){this.logService.trace("update#downloadUpdate, state = ",this.state.type),this.state.type===p.AvailableForDownload&&await this.doDownloadUpdate(this.state)}doDownloadUpdate(e){return Promise.resolve(void 0)}async applyUpdate(){this.logService.trace("update#applyUpdate, state = ",this.state.type),this.state.type===p.Downloaded&&await this.doApplyUpdate()}doApplyUpdate(){return Promise.resolve(void 0)}quitAndInstall(){return this.logService.trace("update#quitAndInstall, state = ",this.state.type),this.state.type!==p.Ready||(this.logService.trace("update#quitAndInstall(): before lifecycle quit()"),this.lifecycleMainService.quit(!0).then(e=>{this.logService.trace(`update#quitAndInstall(): after lifecycle quit() with veto: ${e}`),!e&&(this.logService.trace("update#quitAndInstall(): running raw#quitAndInstall()"),this.doQuitAndInstall())})),Promise.resolve(void 0)}getUpdateType(){return S.Snap}doQuitAndInstall(){}async _applySpecificUpdate(e){}};l=m([o(0,I),o(1,U),o(2,b)],l);let h=class extends l{constructor(t,a,i,n,r,g){super(i,n,r);this.snap=t;this.snapRevision=a;this.telemetryService=g;const y=L(c.dirname(this.snap)),C=f.fromNodeEventEmitter(y,"change",(u,v)=>v),A=f.filter(C,u=>u==="current"),w=f.debounce(A,(u,v)=>v,2e3)(()=>this.checkForUpdates(!1));i.onWillShutdown(()=>{w.dispose(),y.close()})}doCheckForUpdates(){this.setState(d.CheckingForUpdates(!1)),this.isUpdateAvailable().then(t=>{t?this.setState(d.Ready({version:"something"})):(this.telemetryService.publicLog2("update:notAvailable",{explicit:!1}),this.setState(d.Idle(S.Snap)))},t=>{this.logService.error(t),this.telemetryService.publicLog2("update:notAvailable",{explicit:!1}),this.setState(d.Idle(S.Snap,t.message||t))})}doQuitAndInstall(){this.logService.trace("update#quitAndInstall(): running raw#quitAndInstall()"),k("sleep 3 && "+c.basename(process.argv[0]),{shell:!0,detached:!0,stdio:"ignore"})}async isUpdateAvailable(){const t=await new Promise((i,n)=>q(`${c.dirname(this.snap)}/current`,(r,g)=>r?n(r):i(g))),a=c.basename(t);return this.snapRevision!==a}isLatestVersion(){return this.isUpdateAvailable().then(void 0,t=>{this.logService.error("update#checkForSnapUpdate(): Could not get realpath of application.")})}};h=m([o(2,I),o(3,U),o(4,b),o(5,E)],h);export{h as SnapUpdateService};