var d=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var l=(m,n,e,t)=>{for(var i=t>1?void 0:t?y(n,e):n,s=m.length-1,r;s>=0;s--)(r=m[s])&&(i=(t?r(n,e,i):r(i))||i);return t&&i&&d(n,e,i),i},o=(m,n)=>(e,t)=>n(e,t,m);import{localize as g}from"../../../../nls.js";import{Emitter as S}from"../../../../base/common/event.js";import"../../../../base/common/cancellation.js";import{Disposable as C,MutableDisposable as f}from"../../../../base/common/lifecycle.js";import"../../../common/contributions.js";import{ITimelineService as u}from"../../timeline/common/timeline.js";import{IWorkingCopyHistoryService as E}from"../../../services/workingCopy/common/workingCopyHistory.js";import{URI as I}from"../../../../base/common/uri.js";import{IPathService as _}from"../../../services/path/common/pathService.js";import{API_OPEN_DIFF_EDITOR_COMMAND_ID as D}from"../../../browser/parts/editor/editorCommands.js";import{IFileService as k}from"../../../../platform/files/common/files.js";import{LocalHistoryFileSystemProvider as c}from"./localHistoryFileSystemProvider.js";import{IWorkbenchEnvironmentService as T}from"../../../services/environment/common/environmentService.js";import{SaveSourceRegistry as v}from"../../../common/editor.js";import{IConfigurationService as H}from"../../../../platform/configuration/common/configuration.js";import{COMPARE_WITH_FILE_LABEL as b,toDiffEditorArguments as W}from"./localHistoryCommands.js";import{MarkdownString as L}from"../../../../base/common/htmlContent.js";import{getLocalHistoryDateFormatter as A,LOCAL_HISTORY_ICON_ENTRY as R,LOCAL_HISTORY_MENU_CONTEXT_VALUE as w}from"./localHistory.js";import{Schemas as O}from"../../../../base/common/network.js";import{IWorkspaceContextService as P}from"../../../../platform/workspace/common/workspace.js";import{getVirtualWorkspaceAuthority as N}from"../../../../platform/workspace/common/virtualWorkspace.js";let a=class extends C{constructor(e,t,i,s,r,p,h){super();this.timelineService=e;this.workingCopyHistoryService=t;this.pathService=i;this.fileService=s;this.environmentService=r;this.configurationService=p;this.contextService=h;this.registerComponents(),this.registerListeners()}static ID="workbench.contrib.localHistoryTimeline";static LOCAL_HISTORY_ENABLED_SETTINGS_KEY="workbench.localHistory.enabled";id="timeline.localHistory";label=g("localHistory","Local History");scheme="*";_onDidChange=this._register(new S);onDidChange=this._onDidChange.event;timelineProviderDisposable=this._register(new f);registerComponents(){this.updateTimelineRegistration(),this._register(this.fileService.registerProvider(c.SCHEMA,new c(this.fileService)))}updateTimelineRegistration(){this.configurationService.getValue(a.LOCAL_HISTORY_ENABLED_SETTINGS_KEY)?this.timelineProviderDisposable.value=this.timelineService.registerTimelineProvider(this):this.timelineProviderDisposable.clear()}registerListeners(){this._register(this.workingCopyHistoryService.onDidAddEntry(e=>this.onDidChangeWorkingCopyHistoryEntry(e.entry))),this._register(this.workingCopyHistoryService.onDidChangeEntry(e=>this.onDidChangeWorkingCopyHistoryEntry(e.entry))),this._register(this.workingCopyHistoryService.onDidReplaceEntry(e=>this.onDidChangeWorkingCopyHistoryEntry(e.entry))),this._register(this.workingCopyHistoryService.onDidRemoveEntry(e=>this.onDidChangeWorkingCopyHistoryEntry(e.entry))),this._register(this.workingCopyHistoryService.onDidRemoveEntries(()=>this.onDidChangeWorkingCopyHistoryEntry(void 0))),this._register(this.workingCopyHistoryService.onDidMoveEntries(()=>this.onDidChangeWorkingCopyHistoryEntry(void 0))),this._register(this.configurationService.onDidChangeConfiguration(e=>{e.affectsConfiguration(a.LOCAL_HISTORY_ENABLED_SETTINGS_KEY)&&this.updateTimelineRegistration()}))}onDidChangeWorkingCopyHistoryEntry(e){this._onDidChange.fire({id:this.id,uri:e?.workingCopy.resource,reset:!0})}async provideTimeline(e,t,i){const s=[];let r;if(e.scheme===c.SCHEMA?r=c.fromLocalHistoryFileSystem(e).associatedResource:e.scheme===this.pathService.defaultUriScheme||e.scheme===O.vscodeUserData?r=e:this.fileService.hasProvider(e)&&(r=I.from({scheme:this.pathService.defaultUriScheme,authority:this.environmentService.remoteAuthority??N(this.contextService.getWorkspace()),path:e.path})),r){const p=await this.workingCopyHistoryService.getEntries(r,i);for(const h of p)s.push(this.toTimelineItem(h))}return{source:this.id,items:s}}toTimelineItem(e){return{handle:e.id,label:v.getSourceLabel(e.source),tooltip:new L(`$(history) ${A().format(e.timestamp)}

${v.getSourceLabel(e.source)}${e.sourceDescription?` (${e.sourceDescription})`:""}`,{supportThemeIcons:!0}),source:this.id,timestamp:e.timestamp,themeIcon:R,contextValue:w,command:{id:D,title:b.value,arguments:W(e,e.workingCopy.resource)}}}};a=l([o(0,u),o(1,E),o(2,_),o(3,k),o(4,T),o(5,H),o(6,P)],a);export{a as LocalHistoryTimeline};