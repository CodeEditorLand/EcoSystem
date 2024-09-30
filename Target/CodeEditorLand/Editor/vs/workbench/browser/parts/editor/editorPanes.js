var C=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var m=(p,u,e,t)=>{for(var i=t>1?void 0:t?R(u,e):u,r=p.length-1,o;r>=0;r--)(o=p[r])&&(i=(t?o(u,e,i):o(i))||i);return t&&i&&C(u,e,i),i},d=(p,u)=>(e,t)=>u(e,t,p);import{localize as v}from"../../../../nls.js";import"../../../../base/common/actions.js";import{Emitter as f}from"../../../../base/common/event.js";import P from"../../../../base/common/severity.js";import{Disposable as T,DisposableStore as A}from"../../../../base/common/lifecycle.js";import{EditorExtensions as k,EditorInputCapabilities as g,isEditorOpenError as I}from"../../../common/editor.js";import"../../../common/editor/editorInput.js";import{Dimension as S,show as W,hide as H,isAncestor as V,getActiveElement as y,getWindowById as B,isEditableElement as L}from"../../../../base/browser/dom.js";import{Registry as M}from"../../../../platform/registry/common/platform.js";import"../../editor.js";import{IWorkbenchLayoutService as x}from"../../../services/layout/browser/layoutService.js";import"./editorPane.js";import{IInstantiationService as F}from"../../../../platform/instantiation/common/instantiation.js";import{IEditorProgressService as N,LongRunningOperation as z}from"../../../../platform/progress/common/progress.js";import{DEFAULT_EDITOR_MIN_DIMENSIONS as D,DEFAULT_EDITOR_MAX_DIMENSIONS as O}from"./editor.js";import{assertIsDefined as w}from"../../../../base/common/types.js";import{IWorkspaceTrustManagementService as G}from"../../../../platform/workspace/common/workspaceTrust.js";import{ErrorPlaceholderEditor as U,WorkspaceTrustRequiredPlaceholderEditor as q}from"./editorPlaceholder.js";import{EditorOpenSource as j}from"../../../../platform/editor/common/editor.js";import{isCancellationError as K}from"../../../../base/common/errors.js";import{toErrorMessage as b}from"../../../../base/common/errorMessage.js";import{ILogService as X}from"../../../../platform/log/common/log.js";import{IDialogService as J}from"../../../../platform/dialogs/common/dialogs.js";import"../../../../base/browser/ui/sash/sash.js";import{IHostService as Q}from"../../../services/host/browser/host.js";let E=class extends T{constructor(e,t,i,r,o,n,a,s,c,l){super();this.editorGroupParent=e;this.editorPanesParent=t;this.groupView=i;this.layoutService=r;this.instantiationService=o;this.editorProgressService=n;this.workspaceTrustService=a;this.logService=s;this.dialogService=c;this.hostService=l;this.registerListeners()}_onDidFocus=this._register(new f);onDidFocus=this._onDidFocus.event;_onDidChangeSizeConstraints=this._register(new f);onDidChangeSizeConstraints=this._onDidChangeSizeConstraints.event;get minimumWidth(){return this._activeEditorPane?.minimumWidth??D.width}get minimumHeight(){return this._activeEditorPane?.minimumHeight??D.height}get maximumWidth(){return this._activeEditorPane?.maximumWidth??O.width}get maximumHeight(){return this._activeEditorPane?.maximumHeight??O.height}_activeEditorPane=null;get activeEditorPane(){return this._activeEditorPane}editorPanes=[];mapEditorPaneToPendingSetInput=new Map;activeEditorPaneDisposables=this._register(new A);pagePosition;boundarySashes;editorOperation=this._register(new z(this.editorProgressService));editorPanesRegistry=M.as(k.EditorPane);registerListeners(){this._register(this.workspaceTrustService.onDidChangeTrust(()=>this.onDidChangeWorkspaceTrust()))}onDidChangeWorkspaceTrust(){const e=this._activeEditorPane?.input,t=this._activeEditorPane?.options;e?.hasCapability(g.RequiresTrust)&&this.groupView.openEditor(e,t)}async openEditor(e,t,i,r=Object.create(null)){try{return await this.doOpenEditor(this.getEditorPaneDescriptor(e),e,t,i,r)}catch(o){return t?.ignoreError?{error:o}:this.doShowError(o,e,t,i,r)}}async doShowError(e,t,i,r,o){this.logService.error(e);let n=!1;if(i?.source===j.USER&&(!I(e)||e.allowDialog)&&(n=await this.doShowErrorDialog(e,t)),n)return{error:e};const a={...i};return K(e)||(a.error=e),{...await this.doOpenEditor(U.DESCRIPTOR,t,a,r,o),error:e}}async doShowErrorDialog(e,t){let i=P.Error,r,o=b(e),n;I(e)&&(n=e.actions,i=e.forceSeverity??P.Error,e.forceMessage&&(r=e.message,o=void 0)),r||(r=v("editorOpenErrorDialog","Unable to open '{0}'",t.getName()));const a=[];if(n&&n.length>0)for(const h of n)a.push({label:h.label,run:()=>h});else a.push({label:v({key:"ok",comment:["&& denotes a mnemonic"]},"&&OK"),run:()=>{}});let s;a.length===1&&(s={run:()=>{c=!0}});let c=!1;const{result:l}=await this.dialogService.prompt({type:i,message:r,detail:o,buttons:a,cancelButton:s});if(l){const h=l.run();h instanceof Promise&&h.catch(_=>this.dialogService.error(b(_))),c=!0}return c}async doOpenEditor(e,t,i,r,o=Object.create(null)){const n=this.doShowEditorPane(e),a=y(),{changed:s,cancelled:c}=await this.doSetInput(n,t,i,o);return c||((!i||!i.preserveFocus)&&this.shouldRestoreFocus(a)?n.focus():r?.preserveWindowOrder||this.hostService.moveTop(B(this.groupView.windowId,!0).window)),{pane:n,changed:s,cancelled:c}}shouldRestoreFocus(e){if(!this.layoutService.isRestored()||!e)return!0;const t=y();return!!(!t||t===e.ownerDocument.body||e===t||!L(t)||V(t,this.editorGroupParent))}getEditorPaneDescriptor(e){return e.hasCapability(g.RequiresTrust)&&!this.workspaceTrustService.isWorkspaceTrusted()?q.DESCRIPTOR:w(this.editorPanesRegistry.getEditorPane(e))}doShowEditorPane(e){if(this._activeEditorPane&&e.describes(this._activeEditorPane))return this._activeEditorPane;this.doHideActiveEditorPane();const t=this.doCreateEditorPane(e);this.doSetActiveEditorPane(t);const i=w(t.getContainer());return this.editorPanesParent.appendChild(i),W(i),t.setVisible(!0),this.pagePosition&&t.layout(new S(this.pagePosition.width,this.pagePosition.height),{top:this.pagePosition.top,left:this.pagePosition.left}),this.boundarySashes&&t.setBoundarySashes(this.boundarySashes),t}doCreateEditorPane(e){const t=this.doInstantiateEditorPane(e);if(!t.getContainer()){const i=document.createElement("div");i.classList.add("editor-instance"),this.editorPanesParent.appendChild(i),t.create(i)}return t}doInstantiateEditorPane(e){const t=this.editorPanes.find(r=>e.describes(r));if(t)return t;const i=this._register(e.instantiate(this.instantiationService,this.groupView));return this.editorPanes.push(i),i}doSetActiveEditorPane(e){this._activeEditorPane=e,this.activeEditorPaneDisposables.clear(),e&&(this.activeEditorPaneDisposables.add(e.onDidChangeSizeConstraints(t=>this._onDidChangeSizeConstraints.fire(t))),this.activeEditorPaneDisposables.add(e.onDidFocus(()=>this._onDidFocus.fire()))),this._onDidChangeSizeConstraints.fire(void 0)}async doSetInput(e,t,i,r){let o=e.input?.matches(t);if(o&&!i?.forceReload)return this.mapEditorPaneToPendingSetInput.has(e)&&await this.mapEditorPaneToPendingSetInput.get(e),o=e.input?.matches(t),o&&e.setOptions(i),{changed:!1,cancelled:!o};const n=this.editorOperation.start(this.layoutService.isRestored()?800:3200);let a=!1;try{e.clearInput();const s=e.setInput(t,i,r,n.token);this.mapEditorPaneToPendingSetInput.set(e,s),await s,n.isCurrent()||(a=!0)}catch(s){if(!n.isCurrent())a=!0;else throw s}finally{n.isCurrent()&&this.mapEditorPaneToPendingSetInput.delete(e),n.stop()}return{changed:!o,cancelled:a}}doHideActiveEditorPane(){if(!this._activeEditorPane)return;this.editorOperation.stop(),this.safeRun(()=>this._activeEditorPane?.clearInput()),this.safeRun(()=>this._activeEditorPane?.setVisible(!1)),this.mapEditorPaneToPendingSetInput.delete(this._activeEditorPane);const e=this._activeEditorPane.getContainer();e&&(e.remove(),H(e)),this.doSetActiveEditorPane(null)}closeEditor(e){this._activeEditorPane?.input&&e.matches(this._activeEditorPane.input)&&this.doHideActiveEditorPane()}setVisible(e){this.safeRun(()=>this._activeEditorPane?.setVisible(e))}layout(e){this.pagePosition=e,this.safeRun(()=>this._activeEditorPane?.layout(new S(e.width,e.height),e))}setBoundarySashes(e){this.boundarySashes=e,this.safeRun(()=>this._activeEditorPane?.setBoundarySashes(e))}safeRun(e){try{e()}catch(t){this.logService.error(t)}}};E=m([d(3,x),d(4,F),d(5,N),d(6,G),d(7,X),d(8,J),d(9,Q)],E);export{E as EditorPanes};