var I=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var l=(n,t,i,e)=>{for(var o=e>1?void 0:e?W(t,i):t,r=n.length-1,p;r>=0;r--)(p=n[r])&&(o=(e?p(t,i,o):p(o))||o);return e&&o&&I(t,i,o),o},c=(n,t)=>(i,e)=>t(i,e,n);import{localize as s,localize2 as g}from"../../../../nls.js";import{Registry as y}from"../../../../platform/registry/common/platform.js";import{Extensions as w}from"../../../common/contributions.js";import{LifecyclePhase as E}from"../../../services/lifecycle/common/lifecycle.js";import{hasWorkspaceFileExtension as b,IWorkspaceContextService as m,WorkbenchState as f,WORKSPACE_SUFFIX as x}from"../../../../platform/workspace/common/workspace.js";import{Disposable as A}from"../../../../base/common/lifecycle.js";import{IFileService as C}from"../../../../platform/files/common/files.js";import{INotificationService as S,NeverShowAgainScope as O,NotificationPriority as k,Severity as v}from"../../../../platform/notification/common/notification.js";import"../../../../base/common/uri.js";import{isEqual as R,joinPath as h}from"../../../../base/common/resources.js";import{IHostService as d}from"../../../services/host/browser/host.js";import{IQuickInputService as P}from"../../../../platform/quickinput/common/quickInput.js";import{IStorageService as T,StorageScope as u}from"../../../../platform/storage/common/storage.js";import{isVirtualWorkspace as N}from"../../../../platform/workspace/common/virtualWorkspace.js";import{Action2 as F,MenuId as L,registerAction2 as K}from"../../../../platform/actions/common/actions.js";import"../../../../editor/browser/editorExtensions.js";import{ActiveEditorContext as U,ResourceContextKey as D,TemporaryWorkspaceContext as q}from"../../../common/contextkeys.js";import{ContextKeyExpr as H}from"../../../../platform/contextkey/common/contextkey.js";import{TEXT_FILE_EDITOR_ID as Q}from"../../files/common/files.js";let a=class extends A{constructor(i,e,o,r,p,_){super();this.contextService=i;this.notificationService=e;this.fileService=o;this.quickInputService=r;this.hostService=p;this.storageService=_;this.findWorkspaces()}async findWorkspaces(){const i=this.contextService.getWorkspace().folders[0];if(!i||this.contextService.getWorkbenchState()!==f.FOLDER||N(this.contextService.getWorkspace()))return;const e=(await this.fileService.resolve(i.uri)).children?.map(o=>o.name);if(Array.isArray(e)){const o=e.filter(b);o.length>0&&this.doHandleWorkspaceFiles(i.uri,o)}}doHandleWorkspaceFiles(i,e){const o={id:"workspaces.dontPromptToOpen",scope:O.WORKSPACE,isSecondary:!0};if(e.length===1){const r=e[0];this.notificationService.prompt(v.Info,s({key:"foundWorkspace",comment:['{Locked="]({1})"}']},"This folder contains a workspace file '{0}'. Do you want to open it? [Learn more]({1}) about workspace files.",r,"https://go.microsoft.com/fwlink/?linkid=2025315"),[{label:s("openWorkspace","Open Workspace"),run:()=>this.hostService.openWindow([{workspaceUri:h(i,r)}])}],{neverShowAgain:o,priority:this.storageService.isNew(u.WORKSPACE)?void 0:k.SILENT})}else e.length>1&&this.notificationService.prompt(v.Info,s({key:"foundWorkspaces",comment:['{Locked="]({0})"}']},"This folder contains multiple workspace files. Do you want to open one? [Learn more]({0}) about workspace files.","https://go.microsoft.com/fwlink/?linkid=2025315"),[{label:s("selectWorkspace","Select Workspace"),run:()=>{this.quickInputService.pick(e.map(r=>({label:r})),{placeHolder:s("selectToOpen","Select a workspace to open")}).then(r=>{r&&this.hostService.openWindow([{workspaceUri:h(i,r.label)}])})}}],{neverShowAgain:o,priority:this.storageService.isNew(u.WORKSPACE)?void 0:k.SILENT})}};a=l([c(0,m),c(1,S),c(2,C),c(3,P),c(4,d),c(5,T)],a),y.as(w.Workbench).registerWorkbenchContribution(a,E.Eventually),K(class extends F{constructor(){super({id:"workbench.action.openWorkspaceFromEditor",title:g("openWorkspace","Open Workspace"),f1:!1,menu:{id:L.EditorContent,when:H.and(D.Extension.isEqualTo(x),U.isEqualTo(Q),q.toNegated())}})}async run(n,t){const i=n.get(d),e=n.get(m),o=n.get(S);if(e.getWorkbenchState()===f.WORKSPACE){const r=e.getWorkspace().configuration;if(r&&R(r,t)){o.info(s("alreadyOpen","This workspace is already open."));return}}return i.openWindow([{workspaceUri:t}])}});export{a as WorkspacesFinderContribution};