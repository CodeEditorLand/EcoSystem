var C=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var v=(f,u,e,i)=>{for(var r=i>1?void 0:i?T(u,e):u,o=f.length-1,t;o>=0;o--)(t=f[o])&&(r=(i?t(u,e,r):t(r))||r);return i&&r&&C(u,e,r),r},d=(f,u)=>(e,i)=>u(e,i,f);import{Emitter as g,Event as c}from"../../../../base/common/event.js";import{IHostService as _}from"./host.js";import{InstantiationType as M,registerSingleton as N}from"../../../../platform/instantiation/common/extensions.js";import{ILayoutService as B}from"../../../../platform/layout/browser/layoutService.js";import{IEditorService as H}from"../../editor/common/editorService.js";import{IConfigurationService as K}from"../../../../platform/configuration/common/configuration.js";import{isFolderToOpen as y,isWorkspaceToOpen as O,isFileToOpen as V}from"../../../../platform/window/common/window.js";import{isResourceEditorInput as p,pathsToEditors as I}from"../../../common/editor.js";import{whenEditorClosed as q}from"../../../browser/editor.js";import"../../../browser/web.api.js";import{IFileService as G}from"../../../../platform/files/common/files.js";import{ILabelService as j,Verbosity as P}from"../../../../platform/label/common/label.js";import{EventType as b,ModifierKeyEmitter as R,addDisposableListener as z,addDisposableThrottledListener as Z,detectFullscreen as L,disposableWindowInterval as J,getActiveDocument as Q,getWindowId as U,onDidRegisterWindow as W,trackFocus as A}from"../../../../base/browser/dom.js";import{Disposable as X}from"../../../../base/common/lifecycle.js";import{IBrowserWorkbenchEnvironmentService as Y}from"../../environment/browser/environmentService.js";import{memoize as F}from"../../../../base/common/decorators.js";import{parseLineAndColumnAware as $}from"../../../../base/common/extpath.js";import"../../../../platform/workspaces/common/workspaces.js";import{IWorkspaceEditingService as D}from"../../workspaces/common/workspaceEditing.js";import{IInstantiationService as ee}from"../../../../platform/instantiation/common/instantiation.js";import{ILifecycleService as ie,ShutdownReason as E}from"../../lifecycle/common/lifecycle.js";import"../../lifecycle/browser/lifecycleService.js";import{ILogService as re}from"../../../../platform/log/common/log.js";import{getWorkspaceIdentifier as oe}from"../../workspaces/browser/workspaces.js";import{localize as x}from"../../../../nls.js";import ne from"../../../../base/common/severity.js";import{IDialogService as te}from"../../../../platform/dialogs/common/dialogs.js";import{DomEmitter as se}from"../../../../base/browser/event.js";import{isUndefined as ae}from"../../../../base/common/types.js";import{isTemporaryWorkspace as de,IWorkspaceContextService as ce}from"../../../../platform/workspace/common/workspace.js";import"../../../../editor/browser/editorExtensions.js";import{Schemas as le}from"../../../../base/common/network.js";import"../../../../platform/editor/common/editor.js";import{coalesce as k}from"../../../../base/common/arrays.js";import{mainWindow as w,isAuxiliaryWindow as ue}from"../../../../base/browser/window.js";import{isIOS as pe,isMacintosh as fe}from"../../../../base/common/platform.js";import{IUserDataProfilesService as he}from"../../../../platform/userDataProfile/common/userDataProfile.js";var me=(i=>(i[i.Unknown=1]="Unknown",i[i.Keyboard=2]="Keyboard",i[i.Api=3]="Api",i))(me||{});let l=class extends X{constructor(e,i,r,o,t,s,h,S,n,a,m){super();this.layoutService=e;this.configurationService=i;this.fileService=r;this.labelService=o;this.environmentService=t;this.instantiationService=s;this.lifecycleService=h;this.logService=S;this.dialogService=n;this.contextService=a;this.userDataProfilesService=m;t.options?.workspaceProvider?this.workspaceProvider=t.options.workspaceProvider:this.workspaceProvider=new class{workspace=void 0;trusted=void 0;async open(){return!0}},this.registerListeners()}workspaceProvider;shutdownReason=1;registerListeners(){this._register(this.lifecycleService.onBeforeShutdown(e=>this.onBeforeShutdown(e))),this._register(R.getInstance().event(()=>this.updateShutdownReasonFromEvent()))}onBeforeShutdown(e){switch(this.shutdownReason){case 1:case 2:{const i=this.configurationService.getValue("window.confirmBeforeClose");(i==="always"||i==="keyboardOnly"&&this.shutdownReason===2)&&e.veto(!0,"veto.confirmBeforeClose");break}case 3:break}this.shutdownReason=1}updateShutdownReasonFromEvent(){this.shutdownReason!==3&&(R.getInstance().isModifierPressed?this.shutdownReason=2:this.shutdownReason=1)}get onDidChangeFocus(){const e=this._register(new g);return this._register(c.runAndSubscribe(W,({window:i,disposables:r})=>{const o=r.add(A(i)),t=r.add(new se(i.document,"visibilitychange"));c.any(c.map(o.onDidFocus,()=>this.hasFocus,r),c.map(o.onDidBlur,()=>this.hasFocus,r),c.map(t.event,()=>this.hasFocus,r),c.map(this.onDidChangeActiveWindow,()=>this.hasFocus,r))(s=>e.fire(s))},{window:w,disposables:this._store})),c.latch(e.event,void 0,this._store)}get hasFocus(){return Q().hasFocus()}async hadLastFocus(){return!0}async focus(e){e.focus()}get onDidChangeActiveWindow(){const e=this._register(new g);return this._register(c.runAndSubscribe(W,({window:i,disposables:r})=>{const o=U(i),t=r.add(A(i));r.add(t.onDidFocus(()=>e.fire(o))),ue(i)&&r.add(J(i,()=>{const s=i.document.hasFocus();return s&&e.fire(o),s},100,20))},{window:w,disposables:this._store})),c.latch(e.event,void 0,this._store)}get onDidChangeFullScreen(){const e=this._register(new g);return this._register(c.runAndSubscribe(W,({window:i,disposables:r})=>{const o=U(i),t=pe&&i.visualViewport?i.visualViewport:i;for(const s of[b.FULLSCREEN_CHANGE,b.WK_FULLSCREEN_CHANGE])r.add(z(i.document,s,()=>e.fire({windowId:o,fullscreen:!!L(i)})));r.add(Z(t,b.RESIZE,()=>e.fire({windowId:o,fullscreen:!!L(i)}),void 0,fe?2e3:800))},{window:w,disposables:this._store})),e.event}openWindow(e,i){return Array.isArray(e)?this.doOpenWindow(e,i):this.doOpenEmptyWindow(e)}async doOpenWindow(e,i){const r=this.preservePayload(!1,i),o=[],t=[];for(const s of e)s.label=s.label||this.getRecentLabel(s),y(s)?i?.addMode?t.push({uri:s.folderUri}):this.doOpen({folderUri:s.folderUri},{reuse:this.shouldReuse(i,!1),payload:r}):O(s)?this.doOpen({workspaceUri:s.workspaceUri},{reuse:this.shouldReuse(i,!1),payload:r}):V(s)&&o.push(s);t.length>0&&this.withServices(s=>{s.get(D).addFolders(t)}),o.length>0&&this.withServices(async s=>{const h=s.get(H);if(i?.mergeMode&&o.length===4){const n=k(await I(o,this.fileService,this.logService));if(n.length!==4||!p(n[0])||!p(n[1])||!p(n[2])||!p(n[3]))return;if(this.shouldReuse(i,!0))h.openEditor({input1:{resource:n[0].resource},input2:{resource:n[1].resource},base:{resource:n[2].resource},result:{resource:n[3].resource},options:{pinned:!0}});else{const a=new Map;a.set("mergeFile1",n[0].resource.toString()),a.set("mergeFile2",n[1].resource.toString()),a.set("mergeFileBase",n[2].resource.toString()),a.set("mergeFileResult",n[3].resource.toString()),this.doOpen(void 0,{payload:Array.from(a.entries())})}}else if(i?.diffMode&&o.length===2){const n=k(await I(o,this.fileService,this.logService));if(n.length!==2||!p(n[0])||!p(n[1]))return;if(this.shouldReuse(i,!0))h.openEditor({original:{resource:n[0].resource},modified:{resource:n[1].resource},options:{pinned:!0}});else{const a=new Map;a.set("diffFileSecondary",n[0].resource.toString()),a.set("diffFilePrimary",n[1].resource.toString()),this.doOpen(void 0,{payload:Array.from(a.entries())})}}else for(const n of o)if(this.shouldReuse(i,!0)){let a=[];if(i?.gotoLineMode){const m=$(n.fileUri.path);a=[{fileUri:n.fileUri.with({path:m.path}),options:{selection:ae(m.line)?void 0:{startLineNumber:m.line,startColumn:m.column||1}}}]}else a=[n];h.openEditors(k(await I(a,this.fileService,this.logService)),void 0,{validateTrust:!0})}else{const a=new Map;a.set("openFile",n.fileUri.toString()),i?.gotoLineMode&&a.set("gotoLineMode","true"),this.doOpen(void 0,{payload:Array.from(a.entries())})}const S=i?.waitMarkerFileURI;S&&(async()=>(await this.instantiationService.invokeFunction(n=>q(n,o.map(a=>a.fileUri))),await this.fileService.del(S)))()})}withServices(e){this.instantiationService.invokeFunction(i=>e(i))}preservePayload(e,i){const r=new Array;!e&&this.environmentService.extensionDevelopmentLocationURI&&(r.push(["extensionDevelopmentPath",this.environmentService.extensionDevelopmentLocationURI.toString()]),this.environmentService.debugExtensionHost.debugId&&r.push(["debugId",this.environmentService.debugExtensionHost.debugId]),this.environmentService.debugExtensionHost.port&&r.push(["inspect-brk-extensions",String(this.environmentService.debugExtensionHost.port)]));const o=i?.forceProfile?this.userDataProfilesService.profiles.find(t=>t.name===i?.forceProfile):void 0;return o&&!o.isDefault&&r.push(["profile",o.name]),r.length?r:void 0}getRecentLabel(e){return y(e)?this.labelService.getWorkspaceLabel(e.folderUri,{verbose:P.LONG}):O(e)?this.labelService.getWorkspaceLabel(oe(e.workspaceUri),{verbose:P.LONG}):this.labelService.getUriLabel(e.fileUri)}shouldReuse(e=Object.create(null),i){if(e.waitMarkerFileURI)return!0;const r=this.configurationService.getValue("window"),o=i?r?.openFilesInNewWindow||"off":r?.openFoldersInNewWindow||"default";let t=(e.preferNewWindow||!!e.forceNewWindow)&&!e.forceReuseWindow;return!e.forceNewWindow&&!e.forceReuseWindow&&(o==="on"||o==="off")&&(t=o==="on"),!t}async doOpenEmptyWindow(e){return this.doOpen(void 0,{reuse:e?.forceReuseWindow,payload:this.preservePayload(!0,e)})}async doOpen(e,i){if(e&&y(e)&&e.folderUri.scheme===le.file&&de(this.contextService.getWorkspace())){this.withServices(async o=>{await o.get(D).updateFolders(0,this.contextService.getWorkspace().folders.length,[{uri:e.folderUri}])});return}if(i?.reuse&&await this.handleExpectedShutdown(E.LOAD),!await this.workspaceProvider.open(e,i)){const{confirmed:o}=await this.dialogService.confirm({type:ne.Warning,message:x("unableToOpenExternal","The browser interrupted the opening of a new tab or window. Press 'Open' to open it anyway."),primaryButton:x({key:"open",comment:["&& denotes a mnemonic"]},"&&Open")});o&&await this.workspaceProvider.open(e,i)}}async toggleFullScreen(e){const i=this.layoutService.getContainer(e);if(e.document.fullscreen!==void 0)if(e.document.fullscreen)try{return await e.document.exitFullscreen()}catch{this.logService.warn("toggleFullScreen(): exitFullscreen failed")}else try{return await i.requestFullscreen()}catch{this.logService.warn("toggleFullScreen(): requestFullscreen failed")}if(e.document.webkitIsFullScreen!==void 0)try{e.document.webkitIsFullScreen?e.document.webkitExitFullscreen():i.webkitRequestFullscreen()}catch{this.logService.warn("toggleFullScreen(): requestFullscreen/exitFullscreen failed")}}async moveTop(e){}async getCursorScreenPoint(){}async restart(){this.reload()}async reload(){await this.handleExpectedShutdown(E.RELOAD),w.location.reload()}async close(){await this.handleExpectedShutdown(E.CLOSE),w.close()}async withExpectedShutdown(e){const i=this.shutdownReason;try{return this.shutdownReason=3,await e()}finally{this.shutdownReason=i}}async handleExpectedShutdown(e){return this.shutdownReason=3,this.lifecycleService.withExpectedShutdown(e)}getPathForFile(){}};v([F],l.prototype,"onDidChangeFocus",1),v([F],l.prototype,"onDidChangeActiveWindow",1),v([F],l.prototype,"onDidChangeFullScreen",1),l=v([d(0,B),d(1,K),d(2,G),d(3,j),d(4,Y),d(5,ee),d(6,ie),d(7,re),d(8,te),d(9,ce),d(10,he)],l),N(_,l,M.Delayed);export{l as BrowserHostService};