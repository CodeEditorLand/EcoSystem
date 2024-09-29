var v=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var D=(u,i,e,t)=>{for(var r=t>1?void 0:t?f(i,e):i,o=u.length-1,s;o>=0;o--)(s=u[o])&&(r=(t?s(i,e,r):s(r))||r);return t&&r&&v(i,e,r),r},b=(u,i)=>(e,t)=>i(e,t,u);import{DisposableMap as S,DisposableStore as l,toDisposable as I}from"../../../base/common/lifecycle.js";import{URI as h}from"../../../base/common/uri.js";import{IDebugService as y,IDebugVisualization as _,DataBreakpointSetType as m}from"../../contrib/debug/common/debug.js";import{ExtHostContext as k,MainContext as x}from"../common/extHost.protocol.js";import{extHostNamedCustomer as C}from"../../services/extensions/common/extHostCustomers.js";import A from"../../../base/common/severity.js";import{AbstractDebugAdapter as P}from"../../contrib/debug/common/abstractDebugAdapter.js";import"../../../platform/workspace/common/workspace.js";import{convertToVSCPaths as $,convertToDAPaths as B,isSessionAttach as M}from"../../contrib/debug/common/debugUtils.js";import{ErrorNoTelemetry as g}from"../../../base/common/errors.js";import{IDebugVisualizerService as F}from"../../contrib/debug/common/debugVisualizers.js";import{ExtensionIdentifier as T}from"../../../platform/extensions/common/extensions.js";import{Event as w}from"../../../base/common/event.js";import{isDefined as E}from"../../../base/common/types.js";let p=class{constructor(i,e,t){this.debugService=e;this.visualizerService=t;this._proxy=i.getProxy(k.ExtHostDebugService);const r=new S;this._toDispose.add(r),this._toDispose.add(e.onDidNewSession(s=>{this._proxy.$acceptDebugSessionStarted(this.getSessionDto(s)),r.get(s)?.add(s.onDidChangeName(a=>{this._proxy.$acceptDebugSessionNameChanged(this.getSessionDto(s),a)}))})),this._toDispose.add(e.onWillNewSession(s=>{let n=r.get(s);n||(n=new l,r.set(s,n)),n.add(s.onDidCustomEvent(a=>this._proxy.$acceptDebugSessionCustomEvent(this.getSessionDto(s),a)))})),this._toDispose.add(e.onDidEndSession(({session:s,restart:n})=>{this._proxy.$acceptDebugSessionTerminated(this.getSessionDto(s)),this._extHostKnownSessions.delete(s.getId()),n||r.deleteAndDispose(s);for(const[a,d]of this._debugAdapters)d.session===s&&this._debugAdapters.delete(a)})),this._toDispose.add(e.getViewModel().onDidFocusSession(s=>{this._proxy.$acceptDebugSessionActiveChanged(this.getSessionDto(s))})),this._toDispose.add(I(()=>{for(const[s,n]of this._debugAdapters)n.fireError(s,new Error("Extension host shut down"))})),this._debugAdapters=new Map,this._debugConfigurationProviders=new Map,this._debugAdapterDescriptorFactories=new Map,this._extHostKnownSessions=new Set;const o=this.debugService.getViewModel();this._toDispose.add(w.any(o.onDidFocusStackFrame,o.onDidFocusThread)(()=>{const s=o.focusedStackFrame,n=o.focusedThread;s?this._proxy.$acceptStackFrameFocus({kind:"stackFrame",threadId:s.thread.threadId,frameId:s.frameId,sessionId:s.thread.session.getId()}):n?this._proxy.$acceptStackFrameFocus({kind:"thread",threadId:n.threadId,sessionId:n.session.getId()}):this._proxy.$acceptStackFrameFocus(void 0)})),this.sendBreakpointsAndListen()}_proxy;_toDispose=new l;_debugAdapters;_debugAdaptersHandleCounter=1;_debugConfigurationProviders;_debugAdapterDescriptorFactories;_extHostKnownSessions;_visualizerHandles=new Map;_visualizerTreeHandles=new Map;$registerDebugVisualizerTree(i,e){this.visualizerService.registerTree(i,{disposeItem:t=>this._proxy.$disposeVisualizedTree(t),getChildren:t=>this._proxy.$getVisualizerTreeItemChildren(i,t),getTreeItem:t=>this._proxy.$getVisualizerTreeItem(i,t),editItem:e?(t,r)=>this._proxy.$editVisualizerTreeItem(t,r):void 0})}$unregisterDebugVisualizerTree(i){this._visualizerTreeHandles.get(i)?.dispose(),this._visualizerTreeHandles.delete(i)}$registerDebugVisualizer(i,e){const t=this.visualizerService.register({extensionId:new T(i),id:e,disposeDebugVisualizers:r=>this._proxy.$disposeDebugVisualizers(r),executeDebugVisualizerCommand:r=>this._proxy.$executeDebugVisualizerCommand(r),provideDebugVisualizers:(r,o)=>this._proxy.$provideDebugVisualizers(i,e,r,o).then(s=>s.map(_.deserialize)),resolveDebugVisualizer:(r,o)=>this._proxy.$resolveDebugVisualizer(r.id,o)});this._visualizerHandles.set(`${i}/${e}`,t)}$unregisterDebugVisualizer(i,e){const t=`${i}/${e}`;this._visualizerHandles.get(t)?.dispose(),this._visualizerHandles.delete(t)}sendBreakpointsAndListen(){this._toDispose.add(this.debugService.getModel().onDidChangeBreakpoints(r=>{if(r&&!r.sessionOnly){const o={};r.added&&(o.added=this.convertToDto(r.added)),r.removed&&(o.removed=r.removed.map(s=>s.getId())),r.changed&&(o.changed=this.convertToDto(r.changed)),(o.added||o.removed||o.changed)&&this._proxy.$acceptBreakpointsDelta(o)}}));const i=this.debugService.getModel().getBreakpoints(),e=this.debugService.getModel().getFunctionBreakpoints(),t=this.debugService.getModel().getDataBreakpoints();(i.length>0||e.length>0)&&this._proxy.$acceptBreakpointsDelta({added:this.convertToDto(i).concat(this.convertToDto(e)).concat(this.convertToDto(t))})}dispose(){this._toDispose.dispose()}createDebugAdapter(i){const e=this._debugAdaptersHandleCounter++,t=new V(this,e,this._proxy,i);return this._debugAdapters.set(e,t),t}substituteVariables(i,e){return Promise.resolve(this._proxy.$substituteVariables(i?i.uri:void 0,e))}runInTerminal(i,e){return this._proxy.$runInTerminal(i,e)}$registerDebugTypes(i){this._toDispose.add(this.debugService.getAdapterManager().registerDebugAdapterFactory(i,this))}$registerBreakpoints(i){for(const e of i)if(e.type==="sourceMulti"){const t=e.lines.map(r=>({id:r.id,enabled:r.enabled,lineNumber:r.line+1,column:r.character>0?r.character+1:void 0,condition:r.condition,hitCondition:r.hitCondition,logMessage:r.logMessage,mode:r.mode}));this.debugService.addBreakpoints(h.revive(e.uri),t)}else e.type==="function"?this.debugService.addFunctionBreakpoint({name:e.functionName,mode:e.mode,condition:e.condition,hitCondition:e.hitCondition,enabled:e.enabled,logMessage:e.logMessage},e.id):e.type==="data"&&this.debugService.addDataBreakpoint({description:e.label,src:{type:m.Variable,dataId:e.dataId},canPersist:e.canPersist,accessTypes:e.accessTypes,accessType:e.accessType,mode:e.mode});return Promise.resolve()}$unregisterBreakpoints(i,e,t){return i.forEach(r=>this.debugService.removeBreakpoints(r)),e.forEach(r=>this.debugService.removeFunctionBreakpoints(r)),t.forEach(r=>this.debugService.removeDataBreakpoints(r)),Promise.resolve()}$registerDebugConfigurationProvider(i,e,t,r,o,s){const n={type:i,triggerKind:e};return t&&(n.provideDebugConfigurations=(a,d)=>this._proxy.$provideDebugConfigurations(s,a,d)),r&&(n.resolveDebugConfiguration=(a,d,c)=>this._proxy.$resolveDebugConfiguration(s,a,d,c)),o&&(n.resolveDebugConfigurationWithSubstitutedVariables=(a,d,c)=>this._proxy.$resolveDebugConfigurationWithSubstitutedVariables(s,a,d,c)),this._debugConfigurationProviders.set(s,n),this._toDispose.add(this.debugService.getConfigurationManager().registerDebugConfigurationProvider(n)),Promise.resolve(void 0)}$unregisterDebugConfigurationProvider(i){const e=this._debugConfigurationProviders.get(i);e&&(this._debugConfigurationProviders.delete(i),this.debugService.getConfigurationManager().unregisterDebugConfigurationProvider(e))}$registerDebugAdapterDescriptorFactory(i,e){const t={type:i,createDebugAdapterDescriptor:r=>Promise.resolve(this._proxy.$provideDebugAdapter(e,this.getSessionDto(r)))};return this._debugAdapterDescriptorFactories.set(e,t),this._toDispose.add(this.debugService.getAdapterManager().registerDebugAdapterDescriptorFactory(t)),Promise.resolve(void 0)}$unregisterDebugAdapterDescriptorFactory(i){const e=this._debugAdapterDescriptorFactories.get(i);e&&(this._debugAdapterDescriptorFactories.delete(i),this.debugService.getAdapterManager().unregisterDebugAdapterDescriptorFactory(e))}getSession(i){if(i)return this.debugService.getModel().getSession(i,!0)}async $startDebugging(i,e,t){const r=i?h.revive(i):void 0,o=this.debugService.getConfigurationManager().getLaunch(r),s=this.getSession(t.parentSessionID),n=typeof t.suppressSaveBeforeStart=="boolean"?!t.suppressSaveBeforeStart:void 0,a={noDebug:t.noDebug,parentSession:s,lifecycleManagedByParent:t.lifecycleManagedByParent,repl:t.repl,compact:t.compact,compoundRoot:s?.compoundRoot,saveBeforeRestart:n,testRun:t.testRun,suppressDebugStatusbar:t.suppressDebugStatusbar,suppressDebugToolbar:t.suppressDebugToolbar,suppressDebugView:t.suppressDebugView};try{return this.debugService.startDebugging(o,e,a,n)}catch(d){throw new g(d&&d.message?d.message:"cannot start debugging")}}$setDebugSessionName(i,e){this.debugService.getModel().getSession(i)?.setName(e)}$customDebugAdapterRequest(i,e,t){const r=this.debugService.getModel().getSession(i,!0);return r?r.customRequest(e,t).then(o=>o&&o.success?o.body:Promise.reject(new g(o?o.message:"custom request failed"))):Promise.reject(new g("debug session not found"))}$getDebugProtocolBreakpoint(i,e){const t=this.debugService.getModel().getSession(i,!0);return t?Promise.resolve(t.getDebugProtocolBreakpoint(e)):Promise.reject(new g("debug session not found"))}$stopDebugging(i){if(i){const e=this.debugService.getModel().getSession(i,!0);if(e)return this.debugService.stopSession(e,M(e))}else return this.debugService.stopSession(void 0);return Promise.reject(new g("debug session not found"))}$appendDebugConsole(i){this.debugService.getViewModel().focusedSession?.appendToRepl({output:i,sev:A.Warning})}$acceptDAMessage(i,e){this.getDebugAdapter(i).acceptMessage($(e,!1))}$acceptDAError(i,e,t,r){this._debugAdapters.get(i)?.fireError(i,new Error(`${e}: ${t}
${r}`))}$acceptDAExit(i,e,t){this.getDebugAdapter(i).fireExit(i,e,t)}getDebugAdapter(i){const e=this._debugAdapters.get(i);if(!e)throw new Error("Invalid debug adapter");return e}$sessionCached(i){this._extHostKnownSessions.add(i)}getSessionDto(i){if(i){const e=i.getId();return this._extHostKnownSessions.has(e)?e:{id:e,type:i.configuration.type,name:i.name,folderUri:i.root?i.root.uri:void 0,configuration:i.configuration,parent:i.parentSession?.getId()}}}convertToDto(i){return i.map(e=>{if("name"in e){const t=e;return{type:"function",id:t.getId(),enabled:t.enabled,condition:t.condition,hitCondition:t.hitCondition,logMessage:t.logMessage,functionName:t.name}}else if("src"in e){const t=e;return{type:"data",id:t.getId(),dataId:t.src.type===m.Variable?t.src.dataId:t.src.address,enabled:t.enabled,condition:t.condition,hitCondition:t.hitCondition,logMessage:t.logMessage,accessType:t.accessType,label:t.description,canPersist:t.canPersist}}else if("uri"in e){const t=e;return{type:"source",id:t.getId(),enabled:t.enabled,condition:t.condition,hitCondition:t.hitCondition,logMessage:t.logMessage,uri:t.uri,line:t.lineNumber>0?t.lineNumber-1:0,character:typeof t.column=="number"&&t.column>0?t.column-1:0}}else return}).filter(E)}};p=D([C(x.MainThreadDebugService),b(1,y),b(2,F)],p);class V extends P{constructor(e,t,r,o){super();this._ds=e;this._handle=t;this._proxy=r;this.session=o}fireError(e,t){this._onError.fire(t)}fireExit(e,t,r){this._onExit.fire(t)}startSession(){return Promise.resolve(this._proxy.$startDASession(this._handle,this._ds.getSessionDto(this.session)))}sendMessage(e){this._proxy.$sendDAMessage(this._handle,B(e,!0))}async stopSession(){return await this.cancelPendingRequests(),Promise.resolve(this._proxy.$stopDASession(this._handle))}}export{p as MainThreadDebugService};
