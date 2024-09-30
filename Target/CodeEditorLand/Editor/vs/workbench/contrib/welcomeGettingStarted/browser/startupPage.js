var E=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var S=(c,a,t,r)=>{for(var e=r>1?void 0:r?w(a,t):a,o=c.length-1,n;o>=0;o--)(n=c[o])&&(e=(r?n(a,t,e):n(e))||e);return r&&e&&E(a,t,e),e},i=(c,a)=>(t,r)=>a(t,r,c);import"../../../../base/common/uri.js";import{ICommandService as W}from"../../../../platform/commands/common/commands.js";import*as b from"../../../../base/common/arrays.js";import"../../../common/contributions.js";import{IInstantiationService as C}from"../../../../platform/instantiation/common/instantiation.js";import{IEditorService as R}from"../../../services/editor/common/editorService.js";import{onUnexpectedError as f}from"../../../../base/common/errors.js";import{IWorkspaceContextService as O,UNKNOWN_EMPTY_WINDOW_WORKSPACE as P,WorkbenchState as x}from"../../../../platform/workspace/common/workspace.js";import{IConfigurationService as L}from"../../../../platform/configuration/common/configuration.js";import{IWorkingCopyBackupService as D}from"../../../services/workingCopy/common/workingCopyBackup.js";import{ILifecycleService as U,LifecyclePhase as F,StartupKind as T}from"../../../services/lifecycle/common/lifecycle.js";import{Disposable as V}from"../../../../base/common/lifecycle.js";import{IFileService as G}from"../../../../platform/files/common/files.js";import{joinPath as N}from"../../../../base/common/resources.js";import{IWorkbenchLayoutService as K}from"../../../services/layout/browser/layoutService.js";import{GettingStartedInput as d,gettingStartedInputTypeId as h}from"./gettingStartedInput.js";import{IWorkbenchEnvironmentService as B}from"../../../services/environment/common/environmentService.js";import{IStorageService as _,StorageScope as p,StorageTarget as M}from"../../../../platform/storage/common/storage.js";import{getTelemetryLevel as $}from"../../../../platform/telemetry/common/telemetryUtils.js";import{TelemetryLevel as Y}from"../../../../platform/telemetry/common/telemetry.js";import{IProductService as j}from"../../../../platform/product/common/productService.js";import{ILogService as z}from"../../../../platform/log/common/log.js";import{INotificationService as A}from"../../../../platform/notification/common/notification.js";import{localize as g}from"../../../../nls.js";import{IEditorResolverService as J,RegisteredEditorPriority as q}from"../../../services/editor/common/editorResolverService.js";import{TerminalCommandId as H}from"../../terminal/common/terminal.js";const y="workbench.welcomePage.restorableWalkthroughs",I="workbench.startupEditor",Q="workbench.welcome.enabled",k="workbench.telemetryOptOutShown";let m=class{constructor(a,t){this.instantiationService=a;t.registerEditor(`${d.RESOURCE.scheme}:/**`,{id:d.ID,label:g("welcome.displayName","Welcome Page"),priority:q.builtin},{singlePerResource:!1,canSupportResource:r=>r.scheme===d.RESOURCE.scheme},{createEditorInput:({resource:r,options:e})=>({editor:this.instantiationService.createInstance(d,e),options:{...e,pinned:!1}})})}static ID="workbench.contrib.startupPageEditorResolver"};m=S([i(0,C),i(1,J)],m);let v=class extends V{constructor(t,r,e,o,n,l,s,Z,ee,re,te,ie,oe){super();this.configurationService=t;this.editorService=r;this.workingCopyBackupService=e;this.fileService=o;this.contextService=n;this.lifecycleService=l;this.layoutService=s;this.productService=Z;this.commandService=ee;this.environmentService=re;this.storageService=te;this.logService=ie;this.notificationService=oe;this.run().then(void 0,f),this._register(this.editorService.onDidCloseEditor(u=>{u.editor instanceof d&&(u.editor.selectedCategory=void 0,u.editor.selectedStep=void 0)}))}static ID="workbench.contrib.startupPageRunner";async run(){if(await this.lifecycleService.when(F.Restored),this.productService.enableTelemetry&&this.productService.showTelemetryOptOut&&$(this.configurationService)!==Y.NONE&&!this.environmentService.skipWelcome&&!this.storageService.get(k,p.PROFILE)){this.storageService.store(k,!0,p.PROFILE,M.USER),await this.openGettingStarted(!0);return}if(this.tryOpenWalkthroughForFolder())return;if(X(this.configurationService,this.contextService,this.environmentService)&&this.lifecycleService.startupKind!==T.ReloadedWindow){if(await this.workingCopyBackupService.hasBackups())return;if(!this.editorService.activeEditor||this.layoutService.openedDefaultEditors){const e=this.configurationService.inspect(I),o=e.value==="readme",n=e.userValue==="readme",l=e.defaultValue==="readme";o&&(!n||!l)&&this.logService.warn(`Warning: 'workbench.startupEditor: readme' setting ignored due to being set somewhere other than user or default settings (user=${e.userValue}, default=${e.defaultValue})`),o&&(n||l)?await this.openReadme():e.value==="welcomePage"||e.value==="welcomePageInEmptyWorkbench"?await this.openGettingStarted():e.value==="terminal"&&this.commandService.executeCommand(H.CreateTerminalEditor)}}}tryOpenWalkthroughForFolder(){const t=this.storageService.get(y,p.PROFILE);if(t){const r=JSON.parse(t),e=this.contextService.getWorkspace();if(r.folder===P.id||r.folder===e.folders[0].uri.toString()){const o={selectedCategory:r.category,selectedStep:r.step,pinned:!1};return this.editorService.openEditor({resource:d.RESOURCE,options:o}),this.storageService.remove(y,p.PROFILE),!0}}else return!1;return!1}async openReadme(){const t=b.coalesce(await Promise.all(this.contextService.getWorkspace().folders.map(async r=>{const e=r.uri,o=await this.fileService.resolve(e).catch(f),n=o?.children?o.children.map(s=>s.name).sort():[],l=n.find(s=>s.toLowerCase()==="readme.md")||n.find(s=>s.toLowerCase().startsWith("readme"));if(l)return N(e,l)})));if(!this.editorService.activeEditor)if(t.length){const r=e=>e.path.toLowerCase().endsWith(".md");await Promise.all([this.commandService.executeCommand("markdown.showPreview",null,t.filter(r),{locked:!0}).catch(e=>{this.notificationService.error(g("startupPage.markdownPreviewError",`Could not open markdown preview: {0}.

Please make sure the markdown extension is enabled.`,e.message))}),this.editorService.openEditors(t.filter(e=>!r(e)).map(e=>({resource:e})))])}else await this.openGettingStarted()}async openGettingStarted(t){const r=h,e=this.editorService.activeEditor;if(e?.typeId===r||this.editorService.editors.some(n=>n.typeId===r))return;const o=e?{pinned:!1,index:0,showTelemetryNotice:t}:{pinned:!1,showTelemetryNotice:t};r===h&&this.editorService.openEditor({resource:d.RESOURCE,options:o})}};v=S([i(0,L),i(1,R),i(2,D),i(3,G),i(4,O),i(5,U),i(6,K),i(7,j),i(8,W),i(9,B),i(10,_),i(11,z),i(12,A)],v);function X(c,a,t){if(t.skipWelcome)return!1;const r=c.inspect(I);if(!r.userValue&&!r.workspaceValue){const e=c.inspect(Q);if(e.value!==void 0&&e.value!==null)return e.value}return r.value==="welcomePage"||r.value==="readme"&&(r.userValue==="readme"||r.defaultValue==="readme")||a.getWorkbenchState()===x.EMPTY&&r.value==="welcomePageInEmptyWorkbench"||r.value==="terminal"}export{m as StartupPageEditorResolverContribution,v as StartupPageRunnerContribution,y as restoreWalkthroughsConfigurationKey};