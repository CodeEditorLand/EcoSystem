var D=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var R=(l,d,e,n)=>{for(var t=n>1?void 0:n?S(d,e):d,o=l.length-1,r;o>=0;o--)(r=l[o])&&(t=(n?r(d,e,t):r(t))||t);return n&&t&&D(d,e,t),t},s=(l,d)=>(e,n)=>d(e,n,l);import"../../../../editor/common/languages.js";import{createDecorator as w,IInstantiationService as O}from"../../../../platform/instantiation/common/instantiation.js";import{Event as y,Emitter as i}from"../../../../base/common/event.js";import{Disposable as P,DisposableStore as M}from"../../../../base/common/lifecycle.js";import"../../../../base/common/uri.js";import{Range as _}from"../../../../editor/common/core/range.js";import{CancellationToken as I}from"../../../../base/common/cancellation.js";import"../common/commentModel.js";import{CommentMenus as k}from"./commentMenus.js";import"../../notebook/common/notebookRange.js";import{IWorkbenchLayoutService as U}from"../../../services/layout/browser/layoutService.js";import{IConfigurationService as A}from"../../../../platform/configuration/common/configuration.js";import{COMMENTS_SECTION as N}from"../common/commentsConfiguration.js";import{IContextKeyService as q}from"../../../../platform/contextkey/common/contextkey.js";import{IStorageService as x,StorageScope as f,StorageTarget as H}from"../../../../platform/storage/common/storage.js";import{CommentContextKeys as W}from"../common/commentContextKeys.js";import{ILogService as K}from"../../../../platform/log/common/log.js";import{CommentsModel as L}from"./commentsModel.js";import{IModelService as j}from"../../../../editor/common/services/model.js";const we=w("commentService"),p="comments.continueOnComments";let c=class extends P{constructor(e,n,t,o,r,a,g){super();this.instantiationService=e;this.layoutService=n;this.configurationService=t;this.storageService=r;this.logService=a;this.modelService=g;this._handleConfiguration(),this._handleZenMode(),this._workspaceHasCommenting=W.WorkspaceHasCommenting.bindTo(o);const T=this._register(new M),E=y.debounce(this.storageService.onDidChangeValue(f.WORKSPACE,p,T),(m,C)=>m?.external?m:C,500);T.add(E(m=>{if(!m.external)return;const C=this.storageService.getObject(p,f.WORKSPACE);if(!C)return;this.logService.debug(`Comments: URIs of continue on comments from storage ${C.map(h=>h.uri.toString()).join(", ")}.`);const u=this._addContinueOnComments(C,this._continueOnComments);for(const h of u){const v=this._commentControls.get(h);if(!v)continue;const b={uniqueOwner:h,owner:v.owner,ownerLabel:v.label,pending:this._continueOnComments.get(h)||[],added:[],removed:[],changed:[]};this.updateModelThreads(b)}})),this._register(r.onWillSaveState(()=>{const m=new Map;for(const C of this._continueOnCommentProviders){const u=C.provideContinueOnComments();this._addContinueOnComments(u,m)}this._saveContinueOnComments(m)})),this._register(this.modelService.onModelAdded(m=>{this._commentingRangeResources.has(m.uri.toString())||this.getDocumentComments(m.uri)}))}_onDidSetDataProvider=this._register(new i);onDidSetDataProvider=this._onDidSetDataProvider.event;_onDidDeleteDataProvider=this._register(new i);onDidDeleteDataProvider=this._onDidDeleteDataProvider.event;_onDidSetResourceCommentInfos=this._register(new i);onDidSetResourceCommentInfos=this._onDidSetResourceCommentInfos.event;_onDidSetAllCommentThreads=this._register(new i);onDidSetAllCommentThreads=this._onDidSetAllCommentThreads.event;_onDidUpdateCommentThreads=this._register(new i);onDidUpdateCommentThreads=this._onDidUpdateCommentThreads.event;_onDidUpdateNotebookCommentThreads=this._register(new i);onDidUpdateNotebookCommentThreads=this._onDidUpdateNotebookCommentThreads.event;_onDidUpdateCommentingRanges=this._register(new i);onDidUpdateCommentingRanges=this._onDidUpdateCommentingRanges.event;_onDidChangeActiveEditingCommentThread=this._register(new i);onDidChangeActiveEditingCommentThread=this._onDidChangeActiveEditingCommentThread.event;_onDidChangeCurrentCommentThread=this._register(new i);onDidChangeCurrentCommentThread=this._onDidChangeCurrentCommentThread.event;_onDidChangeCommentingEnabled=this._register(new i);onDidChangeCommentingEnabled=this._onDidChangeCommentingEnabled.event;_onDidChangeActiveCommentingRange=this._register(new i);onDidChangeActiveCommentingRange=this._onDidChangeActiveCommentingRange.event;_commentControls=new Map;_commentMenus=new Map;_isCommentingEnabled=!0;_workspaceHasCommenting;_continueOnComments=new Map;_continueOnCommentProviders=new Set;_commentsModel=this._register(new L);commentsModel=this._commentsModel;_commentingRangeResources=new Set;_commentingRangeResourceHintSchemes=new Set;_updateResourcesWithCommentingRanges(e,n){for(const t of n)t&&(t.commentingRanges.ranges.length>0||t.threads.length>0)&&this._commentingRangeResources.add(e.toString())}_handleConfiguration(){this._isCommentingEnabled=this._defaultCommentingEnablement,this._register(this.configurationService.onDidChangeConfiguration(e=>{e.affectsConfiguration("comments.visible")&&this.enableCommenting(this._defaultCommentingEnablement)}))}_handleZenMode(){let e=this._isCommentingEnabled;this._register(this.layoutService.onDidChangeZenMode(n=>{n?(e=this._isCommentingEnabled,this.enableCommenting(!1)):this.enableCommenting(e)}))}get _defaultCommentingEnablement(){return!!this.configurationService.getValue(N)?.visible}get isCommentingEnabled(){return this._isCommentingEnabled}enableCommenting(e){e!==this._isCommentingEnabled&&(this._isCommentingEnabled=e,this._onDidChangeCommentingEnabled.fire(e))}setCurrentCommentThread(e){this._onDidChangeCurrentCommentThread.fire(e)}setActiveEditingCommentThread(e){this._onDidChangeActiveEditingCommentThread.fire(e)}get lastActiveCommentcontroller(){return this._lastActiveCommentController}_lastActiveCommentController;async setActiveCommentAndThread(e,n){const t=this._commentControls.get(e);if(t)return t!==this._lastActiveCommentController&&await this._lastActiveCommentController?.setActiveCommentAndThread(void 0),this._lastActiveCommentController=t,t.setActiveCommentAndThread(n)}setDocumentComments(e,n){this._onDidSetResourceCommentInfos.fire({resource:e,commentInfos:n})}setModelThreads(e,n,t,o){this._commentsModel.setCommentThreads(e,n,t,o),this._onDidSetAllCommentThreads.fire({ownerId:e,ownerLabel:t,commentThreads:o})}updateModelThreads(e){this._commentsModel.updateCommentThreads(e),this._onDidUpdateCommentThreads.fire(e)}setWorkspaceComments(e,n){n.length&&this._workspaceHasCommenting.set(!0);const t=this._commentControls.get(e);t&&this.setModelThreads(e,t.owner,t.label,n)}removeWorkspaceComments(e){const n=this._commentControls.get(e);n&&this.setModelThreads(e,n.owner,n.label,[])}registerCommentController(e,n){this._commentControls.set(e,n),this._onDidSetDataProvider.fire()}unregisterCommentController(e){e?this._commentControls.delete(e):this._commentControls.clear(),this._commentsModel.deleteCommentsByOwner(e),this._onDidDeleteDataProvider.fire(e)}getCommentController(e){return this._commentControls.get(e)}async createCommentThreadTemplate(e,n,t,o){const r=this._commentControls.get(e);if(r)return r.createCommentThreadTemplate(n,t,o)}async updateCommentThreadTemplate(e,n,t){const o=this._commentControls.get(e);o&&await o.updateCommentThreadTemplate(n,t)}disposeCommentThread(e,n){this.getCommentController(e)?.deleteCommentThreadMain(n)}getCommentMenus(e){if(this._commentMenus.get(e))return this._commentMenus.get(e);const n=this.instantiationService.createInstance(k);return this._commentMenus.set(e,n),n}updateComments(e,n){const t=this._commentControls.get(e);if(t){const o=Object.assign({},n,{uniqueOwner:e,ownerLabel:t.label,owner:t.owner});this.updateModelThreads(o)}}updateNotebookComments(e,n){const t=Object.assign({},n,{uniqueOwner:e});this._onDidUpdateNotebookCommentThreads.fire(t)}updateCommentingRanges(e,n){if(n?.schemes&&n.schemes.length>0)for(const t of n.schemes)this._commentingRangeResourceHintSchemes.add(t);this._workspaceHasCommenting.set(!0),this._onDidUpdateCommentingRanges.fire({uniqueOwner:e})}async toggleReaction(e,n,t,o,r){const a=this._commentControls.get(e);if(a)return a.toggleReaction(n,t,o,r,I.None);throw new Error("Not supported")}hasReactionHandler(e){const n=this._commentControls.get(e);return n?!!n.features.reactionHandler:!1}async getDocumentComments(e){const n=[];for(const o of this._commentControls.values())n.push(o.getDocumentComments(e,I.None).then(r=>{for(const g of r.threads)g.comments?.length===0&&g.range&&this.removeContinueOnComment({range:g.range,uri:e,uniqueOwner:r.uniqueOwner});const a=this._continueOnComments.get(r.uniqueOwner);return r.pendingCommentThreads=a?.filter(g=>g.uri.toString()===e.toString()),r}).catch(r=>null));const t=await Promise.all(n);return this._updateResourcesWithCommentingRanges(e,t),t}async getNotebookComments(e){const n=[];return this._commentControls.forEach(t=>{n.push(t.getNotebookComments(e,I.None).catch(o=>null))}),Promise.all(n)}registerContinueOnCommentProvider(e){return this._continueOnCommentProviders.add(e),{dispose:()=>{this._continueOnCommentProviders.delete(e)}}}_saveContinueOnComments(e){const n=[];for(const t of e.values())n.push(...t);this.logService.debug(`Comments: URIs of continue on comments to add to storage ${n.map(t=>t.uri.toString()).join(", ")}.`),this.storageService.store(p,n,f.WORKSPACE,H.USER)}removeContinueOnComment(e){const n=this._continueOnComments.get(e.uniqueOwner);if(n){const t=n.findIndex(o=>o.uri.toString()===e.uri.toString()&&_.equalsRange(o.range,e.range)&&(e.isReply===void 0||o.isReply===e.isReply));if(t>-1)return n.splice(t,1)[0]}}_addContinueOnComments(e,n){const t=new Set;for(const o of e)if(!n.has(o.uniqueOwner))n.set(o.uniqueOwner,[o]),t.add(o.uniqueOwner);else{const r=n.get(o.uniqueOwner);r.every(a=>a.uri.toString()!==o.uri.toString()||!_.equalsRange(a.range,o.range))&&(r.push(o),t.add(o.uniqueOwner))}return t}resourceHasCommentingRanges(e){return this._commentingRangeResourceHintSchemes.has(e.scheme)||this._commentingRangeResources.has(e.toString())}};c=R([s(0,O),s(1,U),s(2,A),s(3,q),s(4,x),s(5,K),s(6,j)],c);export{c as CommentService,we as ICommentService};