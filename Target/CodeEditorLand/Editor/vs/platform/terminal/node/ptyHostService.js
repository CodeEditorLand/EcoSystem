var S=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var p=(c,a,e,t)=>{for(var s=t>1?void 0:t?R(a,e):a,i=c.length-1,r;i>=0;i--)(r=c[i])&&(s=(t?r(a,e,s):r(s))||s);return t&&s&&S(a,e,s),s},l=(c,a)=>(e,t)=>a(e,t,c);import{Emitter as n,Event as T}from"../../../base/common/event.js";import{Disposable as H,toDisposable as x}from"../../../base/common/lifecycle.js";import{OS as w,isWindows as C}from"../../../base/common/platform.js";import{ProxyChannel as y}from"../../../base/parts/ipc/common/ipc.js";import{IConfigurationService as E}from"../../configuration/common/configuration.js";import{ILogService as D,ILoggerService as q,LogLevel as L}from"../../log/common/log.js";import{RemoteLoggerChannelClient as V}from"../../log/common/logIpc.js";import{getResolvedShellEnv as A}from"../../shell/node/shellEnv.js";import"../common/capabilities/capabilities.js";import{RequestStore as M}from"../common/requestStore.js";import{HeartbeatConstants as o,TerminalIpcChannels as u,TerminalSettingId as _}from"../common/terminal.js";import{registerTerminalPlatformConfiguration as N}from"../common/terminalPlatformConfiguration.js";import"../common/terminalProcess.js";import"./ptyHost.js";import{detectAvailableProfiles as F}from"./terminalProfiles.js";import"../../../base/common/performance.js";import{getSystemShell as B}from"../../../base/node/shell.js";import{StopWatch as W}from"../../../base/common/stopwatch.js";var k=(a=>(a[a.MaxRestarts=5]="MaxRestarts",a))(k||{});let h=class extends H{constructor(e,t,s,i){super();this._ptyHostStarter=e;this._configurationService=t;this._logService=s;this._loggerService=i;N(),this._register(this._ptyHostStarter),this._register(x(()=>this._disposePtyHost())),this._resolveVariablesRequestStore=this._register(new M(void 0,this._logService)),this._register(this._resolveVariablesRequestStore.onCreateRequest(this._onPtyHostRequestResolveVariables.fire,this._onPtyHostRequestResolveVariables)),this._ptyHostStarter.onRequestConnection&&this._register(T.once(this._ptyHostStarter.onRequestConnection)(()=>this._ensurePtyHost())),this._ptyHostStarter.onWillShutdown&&this._register(this._ptyHostStarter.onWillShutdown(()=>this._wasQuitRequested=!0))}__connection;__proxy;get _connection(){return this._ensurePtyHost(),this.__connection}get _proxy(){return this._ensurePtyHost(),this.__proxy}get _optionalProxy(){return this.__proxy}_ensurePtyHost(){this.__connection||this._startPtyHost()}_resolveVariablesRequestStore;_wasQuitRequested=!1;_restartCount=0;_isResponsive=!0;_heartbeatFirstTimeout;_heartbeatSecondTimeout;_onPtyHostExit=this._register(new n);onPtyHostExit=this._onPtyHostExit.event;_onPtyHostStart=this._register(new n);onPtyHostStart=this._onPtyHostStart.event;_onPtyHostUnresponsive=this._register(new n);onPtyHostUnresponsive=this._onPtyHostUnresponsive.event;_onPtyHostResponsive=this._register(new n);onPtyHostResponsive=this._onPtyHostResponsive.event;_onPtyHostRequestResolveVariables=this._register(new n);onPtyHostRequestResolveVariables=this._onPtyHostRequestResolveVariables.event;_onProcessData=this._register(new n);onProcessData=this._onProcessData.event;_onProcessReady=this._register(new n);onProcessReady=this._onProcessReady.event;_onProcessReplay=this._register(new n);onProcessReplay=this._onProcessReplay.event;_onProcessOrphanQuestion=this._register(new n);onProcessOrphanQuestion=this._onProcessOrphanQuestion.event;_onDidRequestDetach=this._register(new n);onDidRequestDetach=this._onDidRequestDetach.event;_onDidChangeProperty=this._register(new n);onDidChangeProperty=this._onDidChangeProperty.event;_onProcessExit=this._register(new n);onProcessExit=this._onProcessExit.event;get _ignoreProcessNames(){return this._configurationService.getValue(_.IgnoreProcessNames)}async _refreshIgnoreProcessNames(){return this._optionalProxy?.refreshIgnoreProcessNames?.(this._ignoreProcessNames)}async _resolveShellEnv(){if(C)return process.env;try{return await A(this._configurationService,this._logService,{_:[]},process.env)}catch(e){return this._logService.error("ptyHost was unable to resolve shell environment",e),{}}}_startPtyHost(){const e=this._ptyHostStarter.start(),t=e.client;this._logService.getLevel()===L.Trace&&this._logService.trace("PtyHostService#_startPtyHost",new Error().stack?.replace(/^Error/,"")),y.toService(t.getChannel(u.Heartbeat)).onBeat(()=>this._handleHeartbeat()),this._handleHeartbeat(!0),this._register(e.onDidProcessExit(r=>{this._onPtyHostExit.fire(r.code),!this._wasQuitRequested&&!this._store.isDisposed&&(this._restartCount<=5?(this._logService.error(`ptyHost terminated unexpectedly with code ${r.code}`),this._restartCount++,this.restartPtyHost()):this._logService.error(`ptyHost terminated unexpectedly with code ${r.code}, giving up`))}));const i=y.toService(t.getChannel(u.PtyHost));return this._register(i.onProcessData(r=>this._onProcessData.fire(r))),this._register(i.onProcessReady(r=>this._onProcessReady.fire(r))),this._register(i.onProcessExit(r=>this._onProcessExit.fire(r))),this._register(i.onDidChangeProperty(r=>this._onDidChangeProperty.fire(r))),this._register(i.onProcessReplay(r=>this._onProcessReplay.fire(r))),this._register(i.onProcessOrphanQuestion(r=>this._onProcessOrphanQuestion.fire(r))),this._register(i.onDidRequestDetach(r=>this._onDidRequestDetach.fire(r))),this._register(new V(this._loggerService,t.getChannel(u.Logger))),this.__connection=e,this.__proxy=i,this._onPtyHostStart.fire(),this._register(this._configurationService.onDidChangeConfiguration(async r=>{r.affectsConfiguration(_.IgnoreProcessNames)&&await this._refreshIgnoreProcessNames()})),this._refreshIgnoreProcessNames(),[e,i]}async createProcess(e,t,s,i,r,m,P,v,d,g,f){const I=setTimeout(()=>this._handleUnresponsiveCreateProcess(),o.CreateProcessTimeout),b=await this._proxy.createProcess(e,t,s,i,r,m,P,v,d,g,f);return clearTimeout(I),b}updateTitle(e,t,s){return this._proxy.updateTitle(e,t,s)}updateIcon(e,t,s,i){return this._proxy.updateIcon(e,t,s,i)}attachToProcess(e){return this._proxy.attachToProcess(e)}detachFromProcess(e,t){return this._proxy.detachFromProcess(e,t)}shutdownAll(){return this._proxy.shutdownAll()}listProcesses(){return this._proxy.listProcesses()}async getPerformanceMarks(){return this._optionalProxy?.getPerformanceMarks()??[]}async reduceConnectionGraceTime(){return this._optionalProxy?.reduceConnectionGraceTime()}start(e){return this._proxy.start(e)}shutdown(e,t){return this._proxy.shutdown(e,t)}input(e,t){return this._proxy.input(e,t)}processBinary(e,t){return this._proxy.processBinary(e,t)}resize(e,t,s){return this._proxy.resize(e,t,s)}clearBuffer(e){return this._proxy.clearBuffer(e)}acknowledgeDataEvent(e,t){return this._proxy.acknowledgeDataEvent(e,t)}setUnicodeVersion(e,t){return this._proxy.setUnicodeVersion(e,t)}getInitialCwd(e){return this._proxy.getInitialCwd(e)}getCwd(e){return this._proxy.getCwd(e)}async getLatency(){const e=new W,t=await this._proxy.getLatency();return e.stop(),[{label:"ptyhostservice<->ptyhost",latency:e.elapsed()},...t]}orphanQuestionReply(e){return this._proxy.orphanQuestionReply(e)}installAutoReply(e,t){return this._proxy.installAutoReply(e,t)}uninstallAllAutoReplies(){return this._proxy.uninstallAllAutoReplies()}uninstallAutoReply(e){return this._proxy.uninstallAutoReply(e)}getDefaultSystemShell(e){return this._optionalProxy?.getDefaultSystemShell(e)??B(e??w,process.env)}async getProfiles(e,t,s,i=!1){const r=await this._resolveShellEnv();return F(t,s,i,this._configurationService,r,void 0,this._logService,this._resolveVariables.bind(this,e))}async getEnvironment(){return this.__proxy?this._proxy.getEnvironment():{...process.env}}getWslPath(e,t){return this._proxy.getWslPath(e,t)}getRevivedPtyNewId(e,t){return this._proxy.getRevivedPtyNewId(e,t)}setTerminalLayoutInfo(e){return this._proxy.setTerminalLayoutInfo(e)}async getTerminalLayoutInfo(e){return this._optionalProxy?.getTerminalLayoutInfo(e)}async requestDetachInstance(e,t){return this._proxy.requestDetachInstance(e,t)}async acceptDetachInstanceReply(e,t){return this._proxy.acceptDetachInstanceReply(e,t)}async freePortKillProcess(e){if(!this._proxy.freePortKillProcess)throw new Error("freePortKillProcess does not exist on the pty proxy");return this._proxy.freePortKillProcess(e)}async serializeTerminalState(e){return this._proxy.serializeTerminalState(e)}async reviveTerminalProcesses(e,t,s){return this._proxy.reviveTerminalProcesses(e,t,s)}async refreshProperty(e,t){return this._proxy.refreshProperty(e,t)}async updateProperty(e,t,s){return this._proxy.updateProperty(e,t,s)}async restartPtyHost(){this._disposePtyHost(),this._isResponsive=!0,this._startPtyHost()}_disposePtyHost(){this._proxy.shutdownAll(),this._connection.store.dispose()}_handleHeartbeat(e){this._clearHeartbeatTimeouts(),this._heartbeatFirstTimeout=setTimeout(()=>this._handleHeartbeatFirstTimeout(),e?o.ConnectingBeatInterval:o.BeatInterval*o.FirstWaitMultiplier),this._isResponsive||(this._isResponsive=!0,this._onPtyHostResponsive.fire())}_handleHeartbeatFirstTimeout(){this._logService.warn(`No ptyHost heartbeat after ${o.BeatInterval*o.FirstWaitMultiplier/1e3} seconds`),this._heartbeatFirstTimeout=void 0,this._heartbeatSecondTimeout=setTimeout(()=>this._handleHeartbeatSecondTimeout(),o.BeatInterval*o.SecondWaitMultiplier)}_handleHeartbeatSecondTimeout(){this._logService.error(`No ptyHost heartbeat after ${(o.BeatInterval*o.FirstWaitMultiplier+o.BeatInterval*o.FirstWaitMultiplier)/1e3} seconds`),this._heartbeatSecondTimeout=void 0,this._isResponsive&&(this._isResponsive=!1,this._onPtyHostUnresponsive.fire())}_handleUnresponsiveCreateProcess(){this._clearHeartbeatTimeouts(),this._logService.error(`No ptyHost response to createProcess after ${o.CreateProcessTimeout/1e3} seconds`),this._isResponsive&&(this._isResponsive=!1,this._onPtyHostUnresponsive.fire())}_clearHeartbeatTimeouts(){this._heartbeatFirstTimeout&&(clearTimeout(this._heartbeatFirstTimeout),this._heartbeatFirstTimeout=void 0),this._heartbeatSecondTimeout&&(clearTimeout(this._heartbeatSecondTimeout),this._heartbeatSecondTimeout=void 0)}_resolveVariables(e,t){return this._resolveVariablesRequestStore.createRequest({workspaceId:e,originalText:t})}async acceptPtyHostResolvedVariables(e,t){this._resolveVariablesRequestStore.acceptReply(e,t)}};h=p([l(1,E),l(2,D),l(3,q)],h);export{h as PtyHostService};