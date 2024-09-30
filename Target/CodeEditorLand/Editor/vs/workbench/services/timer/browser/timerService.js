var v=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var y=(n,e,r,t)=>{for(var i=t>1?void 0:t?_(e,r):e,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(t?s(e,r,i):s(i))||i);return t&&i&&v(e,r,i),i},a=(n,e)=>(r,t)=>e(r,t,n);import*as M from"../../../../base/common/performance.js";import{createDecorator as I}from"../../../../platform/instantiation/common/instantiation.js";import{IWorkspaceContextService as W,WorkbenchState as R}from"../../../../platform/workspace/common/workspace.js";import{IExtensionService as C}from"../../extensions/common/extensions.js";import{IUpdateService as P}from"../../../../platform/update/common/update.js";import{ILifecycleService as D,LifecyclePhase as b}from"../../lifecycle/common/lifecycle.js";import{IEditorService as T}from"../../editor/common/editorService.js";import{IAccessibilityService as x}from"../../../../platform/accessibility/common/accessibility.js";import{ITelemetryService as L}from"../../../../platform/telemetry/common/telemetry.js";import{Barrier as E,timeout as B}from"../../../../base/common/async.js";import{IWorkbenchLayoutService as U}from"../../layout/browser/layoutService.js";import{IPaneCompositePartService as V}from"../../panecomposite/browser/panecomposite.js";import{ViewContainerLocation as S}from"../../../common/views.js";import{TelemetryTrustedValue as A}from"../../../../platform/telemetry/common/telemetryUtils.js";import{isWeb as O}from"../../../../base/common/platform.js";import{createBlobWorker as q}from"../../../../base/browser/defaultWorkerFactory.js";import{Registry as N}from"../../../../platform/registry/common/platform.js";import{TerminalExtensions as z}from"../../../../platform/terminal/common/terminal.js";const me=I("timerService");class j{_entries=[];setMarks(e,r){this._entries.push([e,r])}getDuration(e,r){const t=this._findEntry(e);if(!t)return 0;const i=this._findEntry(r);return i?i.startTime-t.startTime:0}getStartTime(e){const r=this._findEntry(e);return r?r.startTime:-1}_findEntry(e){for(const[,r]of this._entries)for(let t=r.length-1;t>=0;t--)if(r[t].name===e)return r[t]}getEntries(){return this._entries.slice(0)}}let m=class{constructor(e,r,t,i,o,s,G,F,k){this._lifecycleService=e;this._contextService=r;this._extensionService=t;this._updateService=i;this._paneCompositeService=o;this._editorService=s;this._accessibilityService=G;this._telemetryService=F;Promise.all([this._extensionService.whenInstalledExtensionsRegistered(),e.when(b.Restored),k.whenRestored,Promise.all(Array.from(N.as(z.Backend).backends.values()).map(d=>d.whenReady))]).then(()=>(this.setPerformanceMarks("renderer",M.getMarks()),this._computeStartupMetrics())).then(d=>{this._startupMetrics=d,this._reportStartupTimes(d),this._barrier.open()}),this.perfBaseline=this._barrier.wait().then(()=>this._lifecycleService.when(b.Eventually)).then(()=>B(this._startupMetrics.timers.ellapsedRequire)).then(()=>{const d=function(){let l=!1;function c(p){return l?0:(performance.now()-f>=1e3&&(l=!0),p<=2?p:c(p-1)+c(p-2))}const f=performance.now();c(24);const g=Math.round(performance.now()-f);self.postMessage({value:l?-1:g})}.toString(),w=new Blob([`(${d})();`],{type:"application/javascript"}),u=URL.createObjectURL(w),h=q(u,{name:"perfBaseline"});return new Promise(l=>{h.onmessage=c=>l(c.data.value)}).finally(()=>{h.terminate(),URL.revokeObjectURL(u)})})}_barrier=new E;_marks=new j;_rndValueShouldSendTelemetry=Math.random()<.05;_startupMetrics;perfBaseline;whenReady(){return this._barrier.wait()}get startupMetrics(){if(!this._startupMetrics)throw new Error("illegal state, MUST NOT access startupMetrics before whenReady has resolved");return this._startupMetrics}setPerformanceMarks(e,r){const t=r.filter(i=>i.name.startsWith("code/"));this._marks.setMarks(e,t),this._reportPerformanceMarks(e,t)}getPerformanceMarks(){return this._marks.getEntries()}getDuration(e,r){return this._marks.getDuration(e,r)}getStartTime(e){return this._marks.getStartTime(e)}_reportStartupTimes(e){this._telemetryService.publicLog("startupTimeVaried",e)}_shouldReportPerfMarks(){return this._rndValueShouldSendTelemetry}_reportPerformanceMarks(e,r){if(this._shouldReportPerfMarks())for(const t of r)this._telemetryService.publicLog2("startup.timer.mark",{source:e,name:new A(t.name),startTime:t.startTime})}async _computeStartupMetrics(){const e=this._isInitialStartup();let r;O?r="code/timeOrigin":r=e?"code/didStartMain":"code/willOpenNewWindow";const t=this._paneCompositeService.getActivePaneComposite(S.Sidebar),i=this._paneCompositeService.getActivePaneComposite(S.Panel),o={version:2,ellapsed:this._marks.getDuration(r,"code/didStartWorkbench"),isLatestVersion:!!await this._updateService.isLatestVersion(),didUseCachedData:this._didUseCachedData(),windowKind:this._lifecycleService.startupKind,windowCount:await this._getWindowCount(),viewletId:t?.getId(),editorIds:this._editorService.visibleEditors.map(s=>s.typeId),panelId:i?i.getId():void 0,timers:{ellapsedAppReady:e?this._marks.getDuration("code/didStartMain","code/mainAppReady"):void 0,ellapsedNlsGeneration:e?this._marks.getDuration("code/willGenerateNls","code/didGenerateNls"):void 0,ellapsedLoadMainBundle:e?this._marks.getDuration("code/willLoadMainBundle","code/didLoadMainBundle"):void 0,ellapsedCrashReporter:e?this._marks.getDuration("code/willStartCrashReporter","code/didStartCrashReporter"):void 0,ellapsedMainServer:e?this._marks.getDuration("code/willStartMainServer","code/didStartMainServer"):void 0,ellapsedWindowCreate:e?this._marks.getDuration("code/willCreateCodeWindow","code/didCreateCodeWindow"):void 0,ellapsedWindowRestoreState:e?this._marks.getDuration("code/willRestoreCodeWindowState","code/didRestoreCodeWindowState"):void 0,ellapsedBrowserWindowCreate:e?this._marks.getDuration("code/willCreateCodeBrowserWindow","code/didCreateCodeBrowserWindow"):void 0,ellapsedWindowMaximize:e?this._marks.getDuration("code/willMaximizeCodeWindow","code/didMaximizeCodeWindow"):void 0,ellapsedWindowLoad:e?this._marks.getDuration("code/mainAppReady","code/willOpenNewWindow"):void 0,ellapsedWindowLoadToRequire:this._marks.getDuration("code/willOpenNewWindow","code/willLoadWorkbenchMain"),ellapsedRequire:this._marks.getDuration("code/willLoadWorkbenchMain","code/didLoadWorkbenchMain"),ellapsedWaitForWindowConfig:this._marks.getDuration("code/willWaitForWindowConfig","code/didWaitForWindowConfig"),ellapsedStorageInit:this._marks.getDuration("code/willInitStorage","code/didInitStorage"),ellapsedSharedProcesConnected:this._marks.getDuration("code/willConnectSharedProcess","code/didConnectSharedProcess"),ellapsedWorkspaceServiceInit:this._marks.getDuration("code/willInitWorkspaceService","code/didInitWorkspaceService"),ellapsedRequiredUserDataInit:this._marks.getDuration("code/willInitRequiredUserData","code/didInitRequiredUserData"),ellapsedOtherUserDataInit:this._marks.getDuration("code/willInitOtherUserData","code/didInitOtherUserData"),ellapsedExtensions:this._marks.getDuration("code/willLoadExtensions","code/didLoadExtensions"),ellapsedEditorRestore:this._marks.getDuration("code/willRestoreEditors","code/didRestoreEditors"),ellapsedViewletRestore:this._marks.getDuration("code/willRestoreViewlet","code/didRestoreViewlet"),ellapsedPanelRestore:this._marks.getDuration("code/willRestorePanel","code/didRestorePanel"),ellapsedWorkbenchContributions:this._marks.getDuration("code/willCreateWorkbenchContributions/1","code/didCreateWorkbenchContributions/2"),ellapsedWorkbench:this._marks.getDuration("code/willStartWorkbench","code/didStartWorkbench"),ellapsedExtensionsReady:this._marks.getDuration(r,"code/didLoadExtensions"),ellapsedRenderer:this._marks.getDuration("code/didStartRenderer","code/didStartWorkbench")},platform:void 0,release:void 0,arch:void 0,totalmem:void 0,freemem:void 0,meminfo:void 0,cpus:void 0,loadavg:void 0,isVMLikelyhood:void 0,initialStartup:e,hasAccessibilitySupport:this._accessibilityService.isScreenReaderOptimized(),emptyWorkbench:this._contextService.getWorkbenchState()===R.EMPTY};return await this._extendStartupInfo(o),o}};m=y([a(0,D),a(1,W),a(2,C),a(3,P),a(4,V),a(5,T),a(6,x),a(7,L),a(8,U)],m);class pe extends m{_isInitialStartup(){return!1}_didUseCachedData(){return!1}async _getWindowCount(){return 1}async _extendStartupInfo(e){e.isVMLikelyhood=0,e.isARM64Emulated=!1,e.platform=navigator.userAgent,e.release=navigator.appVersion}}export{m as AbstractTimerService,me as ITimerService,pe as TimerService};