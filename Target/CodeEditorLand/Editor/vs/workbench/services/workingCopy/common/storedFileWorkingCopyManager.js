var m=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var h=(g,p,e,o)=>{for(var i=o>1?void 0:o?k(p,e):p,r=g.length-1,t;r>=0;r--)(t=g[r])&&(i=(o?t(p,e,i):t(i))||i);return o&&i&&m(p,e,i),i},n=(g,p)=>(e,o)=>p(e,o,g);import{localize as I}from"../../../../nls.js";import{DisposableStore as R,dispose as C}from"../../../../base/common/lifecycle.js";import{Event as W,Emitter as d}from"../../../../base/common/event.js";import{StoredFileWorkingCopy as F,StoredFileWorkingCopyState as c}from"./storedFileWorkingCopy.js";import{ResourceMap as S}from"../../../../base/common/map.js";import{Promises as f,ResourceQueue as D}from"../../../../base/common/async.js";import{FileChangeType as u,FileOperation as v,IFileService as M}from"../../../../platform/files/common/files.js";import{ILifecycleService as E}from"../../lifecycle/common/lifecycle.js";import{URI as P}from"../../../../base/common/uri.js";import"../../../../base/common/buffer.js";import{ILabelService as w}from"../../../../platform/label/common/label.js";import{ILogService as _}from"../../../../platform/log/common/log.js";import{joinPath as T}from"../../../../base/common/resources.js";import{IWorkingCopyFileService as b}from"./workingCopyFileService.js";import{IUriIdentityService as U}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{CancellationToken as O}from"../../../../base/common/cancellation.js";import{IWorkingCopyBackupService as x}from"./workingCopyBackup.js";import{BaseFileWorkingCopyManager as L}from"./abstractFileWorkingCopyManager.js";import{INotificationService as q}from"../../../../platform/notification/common/notification.js";import{IEditorService as B}from"../../editor/common/editorService.js";import{IElevatedFileService as j}from"../../files/common/elevatedFileService.js";import{IFilesConfigurationService as N}from"../../filesConfiguration/common/filesConfigurationService.js";import{IWorkingCopyEditorService as V}from"./workingCopyEditorService.js";import{IWorkingCopyService as A}from"./workingCopyService.js";import{isWeb as z}from"../../../../base/common/platform.js";import{onUnexpectedError as Q}from"../../../../base/common/errors.js";import{SnapshotContext as G}from"./fileWorkingCopy.js";import{IProgressService as Y}from"../../../../platform/progress/common/progress.js";let y=class extends L{constructor(e,o,i,r,t,s,l,a,J,H,K,X,Z,$,ee,ie){super(i,s,a);this.workingCopyTypeId=e;this.modelFactory=o;this.lifecycleService=r;this.labelService=t;this.workingCopyFileService=l;this.uriIdentityService=J;this.filesConfigurationService=H;this.workingCopyService=K;this.notificationService=X;this.workingCopyEditorService=Z;this.editorService=$;this.elevatedFileService=ee;this.progressService=ie;this.registerListeners()}_onDidResolve=this._register(new d);onDidResolve=this._onDidResolve.event;_onDidChangeDirty=this._register(new d);onDidChangeDirty=this._onDidChangeDirty.event;_onDidChangeReadonly=this._register(new d);onDidChangeReadonly=this._onDidChangeReadonly.event;_onDidChangeOrphaned=this._register(new d);onDidChangeOrphaned=this._onDidChangeOrphaned.event;_onDidSaveError=this._register(new d);onDidSaveError=this._onDidSaveError.event;_onDidSave=this._register(new d);onDidSave=this._onDidSave.event;_onDidRevert=this._register(new d);onDidRevert=this._onDidRevert.event;_onDidRemove=this._register(new d);onDidRemove=this._onDidRemove.event;mapResourceToWorkingCopyListeners=new S;mapResourceToPendingWorkingCopyResolve=new S;workingCopyResolveQueue=this._register(new D);registerListeners(){this._register(this.fileService.onDidFilesChange(e=>this.onDidFilesChange(e))),this._register(this.fileService.onDidChangeFileSystemProviderCapabilities(e=>this.onDidChangeFileSystemProviderCapabilities(e))),this._register(this.fileService.onDidChangeFileSystemProviderRegistrations(e=>this.onDidChangeFileSystemProviderRegistrations(e))),this._register(this.workingCopyFileService.onWillRunWorkingCopyFileOperation(e=>this.onWillRunWorkingCopyFileOperation(e))),this._register(this.workingCopyFileService.onDidFailWorkingCopyFileOperation(e=>this.onDidFailWorkingCopyFileOperation(e))),this._register(this.workingCopyFileService.onDidRunWorkingCopyFileOperation(e=>this.onDidRunWorkingCopyFileOperation(e))),z?this._register(this.lifecycleService.onBeforeShutdown(e=>e.veto(this.onBeforeShutdownWeb(),"veto.fileWorkingCopyManager"))):this._register(this.lifecycleService.onWillShutdown(e=>e.join(this.onWillShutdownDesktop(),{id:"join.fileWorkingCopyManager",label:I("join.fileWorkingCopyManager","Saving working copies")})))}onBeforeShutdownWeb(){return!!this.workingCopies.some(e=>e.hasState(c.PENDING_SAVE))}async onWillShutdownDesktop(){let e;for(;(e=this.workingCopies.filter(o=>o.hasState(c.PENDING_SAVE))).length>0;)await f.settled(e.map(o=>o.joinState(c.PENDING_SAVE)))}onDidChangeFileSystemProviderCapabilities(e){this.queueWorkingCopyReloads(e.scheme)}onDidChangeFileSystemProviderRegistrations(e){e.added&&this.queueWorkingCopyReloads(e.scheme)}onDidFilesChange(e){this.queueWorkingCopyReloads(e)}queueWorkingCopyReloads(e){for(const o of this.workingCopies){if(o.isDirty())continue;let i=!1;typeof e=="string"?i=e===o.resource.scheme:i=e.contains(o.resource,u.UPDATED,u.ADDED),i&&this.queueWorkingCopyReload(o)}}queueWorkingCopyReload(e){this.workingCopyResolveQueue.queueSize(e.resource)<=1&&this.workingCopyResolveQueue.queueFor(e.resource,async()=>{try{await this.reload(e)}catch(i){this.logService.error(i)}})}mapCorrelationIdToWorkingCopiesToRestore=new Map;onWillRunWorkingCopyFileOperation(e){(e.operation===v.MOVE||e.operation===v.COPY)&&e.waitUntil((async()=>{const o=[];for(const{source:i,target:r}of e.files)if(i){if(this.uriIdentityService.extUri.isEqual(i,r))continue;const t=[];for(const s of this.workingCopies)this.uriIdentityService.extUri.isEqualOrParent(s.resource,i)&&t.push(s);for(const s of t){const l=s.resource;let a;this.uriIdentityService.extUri.isEqual(l,i)?a=r:a=T(r,l.path.substr(i.path.length+1)),o.push({source:l,target:a,snapshot:s.isDirty()?await s.model?.snapshot(G.Save,O.None):void 0})}}this.mapCorrelationIdToWorkingCopiesToRestore.set(e.correlationId,o)})())}onDidFailWorkingCopyFileOperation(e){if(e.operation===v.MOVE||e.operation===v.COPY){const o=this.mapCorrelationIdToWorkingCopiesToRestore.get(e.correlationId);if(o){this.mapCorrelationIdToWorkingCopiesToRestore.delete(e.correlationId);for(const i of o)i.snapshot&&this.get(i.source)?.markModified()}}}onDidRunWorkingCopyFileOperation(e){switch(e.operation){case v.CREATE:e.waitUntil((async()=>{for(const{target:o}of e.files){const i=this.get(o);i&&!i.isDisposed()&&await i.revert()}})());break;case v.MOVE:case v.COPY:e.waitUntil((async()=>{const o=this.mapCorrelationIdToWorkingCopiesToRestore.get(e.correlationId);o&&(this.mapCorrelationIdToWorkingCopiesToRestore.delete(e.correlationId),await f.settled(o.map(async i=>{const r=this.uriIdentityService.asCanonicalUri(i.target);await this.resolve(r,{reload:{async:!1},contents:i.snapshot})})))})());break}}async reload(e){await this.joinPendingResolves(e.resource),!(e.isDirty()||e.isDisposed()||!this.has(e.resource))&&await this.doResolve(e,{reload:{async:!1}})}async resolve(e,o){const i=this.joinPendingResolves(e);return i&&await i,this.doResolve(e,o)}async doResolve(e,o){let i,r;P.isUri(e)?(r=e,i=this.get(r)):(r=e.resource,i=e);let t,s=!1;const l={contents:o?.contents,forceReadFromFile:o?.reload?.force,limits:o?.limits};i?o?.contents?t=i.resolve(l):o?.reload?o.reload.async?(t=Promise.resolve(),(async()=>{try{await i.resolve(l)}catch(a){Q(a)}})()):t=i.resolve(l):t=Promise.resolve():(s=!0,i=new F(this.workingCopyTypeId,r,this.labelService.getUriBasenameLabel(r),this.modelFactory,async a=>{await this.resolve(r,{...a,reload:{async:!1}})},this.fileService,this.logService,this.workingCopyFileService,this.filesConfigurationService,this.workingCopyBackupService,this.workingCopyService,this.notificationService,this.workingCopyEditorService,this.editorService,this.elevatedFileService,this.progressService),t=i.resolve(l),this.registerWorkingCopy(i)),this.mapResourceToPendingWorkingCopyResolve.set(r,t),this.add(r,i),s&&i.isDirty()&&this._onDidChangeDirty.fire(i);try{await t}catch(a){throw s&&i.dispose(),a}finally{this.mapResourceToPendingWorkingCopyResolve.delete(r)}return s&&i.isDirty()&&this._onDidChangeDirty.fire(i),i}joinPendingResolves(e){if(this.mapResourceToPendingWorkingCopyResolve.get(e))return this.doJoinPendingResolves(e)}async doJoinPendingResolves(e){let o;for(;this.mapResourceToPendingWorkingCopyResolve.has(e);){const i=this.mapResourceToPendingWorkingCopyResolve.get(e);if(i===o)return;o=i;try{await i}catch{}}}registerWorkingCopy(e){const o=new R;o.add(e.onDidResolve(()=>this._onDidResolve.fire(e))),o.add(e.onDidChangeDirty(()=>this._onDidChangeDirty.fire(e))),o.add(e.onDidChangeReadonly(()=>this._onDidChangeReadonly.fire(e))),o.add(e.onDidChangeOrphaned(()=>this._onDidChangeOrphaned.fire(e))),o.add(e.onDidSaveError(()=>this._onDidSaveError.fire(e))),o.add(e.onDidSave(i=>this._onDidSave.fire({workingCopy:e,...i}))),o.add(e.onDidRevert(()=>this._onDidRevert.fire(e))),this.mapResourceToWorkingCopyListeners.set(e.resource,o)}remove(e){const o=super.remove(e),i=this.mapResourceToWorkingCopyListeners.get(e);return i&&(C(i),this.mapResourceToWorkingCopyListeners.delete(e)),o&&this._onDidRemove.fire(e),o}canDispose(e){return e.isDisposed()||!this.mapResourceToPendingWorkingCopyResolve.has(e.resource)&&!e.isDirty()?!0:this.doCanDispose(e)}async doCanDispose(e){const o=this.joinPendingResolves(e.resource);return o?(await o,this.canDispose(e)):e.isDirty()?(await W.toPromise(e.onDidChangeDirty),this.canDispose(e)):!0}dispose(){super.dispose(),this.mapResourceToPendingWorkingCopyResolve.clear(),C(this.mapResourceToWorkingCopyListeners.values()),this.mapResourceToWorkingCopyListeners.clear()}};y=h([n(2,M),n(3,E),n(4,w),n(5,_),n(6,b),n(7,x),n(8,U),n(9,N),n(10,A),n(11,q),n(12,V),n(13,B),n(14,j),n(15,Y)],y);export{y as StoredFileWorkingCopyManager};