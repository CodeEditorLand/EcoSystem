var _=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var b=(l,i,e,t)=>{for(var r=t>1?void 0:t?f(i,e):i,a=l.length-1,c;a>=0;a--)(c=l[a])&&(r=(t?c(i,e,r):c(r))||r);return t&&r&&_(i,e,r),r},g=(l,i)=>(e,t)=>i(e,t,l);import{Disposable as u,DisposableStore as v,dispose as S,toDisposable as C}from"../../../../../base/common/lifecycle.js";import"../../../../../base/common/uri.js";import"../../../../../base/common/worker/simpleWorker.js";import{createWebWorker as I}from"../../../../../base/browser/defaultWorkerFactory.js";import"../../common/model/notebookCellTextModel.js";import{CellUri as y,NotebookCellsChangeType as p}from"../../common/notebookCommon.js";import{INotebookService as x}from"../../common/notebookService.js";import"../../common/services/notebookSimpleWorker.js";import"../../common/services/notebookWorkerService.js";import{IModelService as N}from"../../../../../editor/common/services/model.js";import"../../../../../editor/common/model.js";import{TextModel as w}from"../../../../../editor/common/model/textModel.js";import{Schemas as W}from"../../../../../base/common/network.js";import{isEqual as D}from"../../../../../base/common/resources.js";let m=class extends u{_workerManager;constructor(i,e){super(),this._workerManager=this._register(new R(i,e))}canComputeDiff(i,e){throw new Error("Method not implemented.")}computeDiff(i,e){return this._workerManager.withWorker().then(t=>t.computeDiff(i,e))}canPromptRecommendation(i){return this._workerManager.withWorker().then(e=>e.canPromptRecommendation(i))}};m=b([g(0,x),g(1,N)],m);class R extends u{constructor(e,t){super();this._notebookService=e;this._modelService=t;this._editorWorkerClient=null}_editorWorkerClient;withWorker(){return this._editorWorkerClient||(this._editorWorkerClient=new U(this._notebookService,this._modelService)),Promise.resolve(this._editorWorkerClient)}}class E extends u{constructor(e,t,r){super();this._proxy=e;this._notebookService=t;this._modelService=r}_syncedModels=Object.create(null);_syncedModelsLastUsedTime=Object.create(null);ensureSyncedResources(e){for(const t of e){const r=t.toString();this._syncedModels[r]||this._beginModelSync(t),this._syncedModels[r]&&(this._syncedModelsLastUsedTime[r]=new Date().getTime())}}_beginModelSync(e){const t=this._notebookService.listNotebookDocuments().find(o=>o.uri.toString()===e.toString());if(!t)return;const r=e.toString();this._proxy.$acceptNewModel(t.uri.toString(),t.metadata,t.cells.map(o=>({handle:o.handle,url:o.uri.toString(),source:o.textBuffer.getLinesContent(),eol:o.textBuffer.getEOL(),versionId:o.textModel?.getVersionId()??0,language:o.language,mime:o.mime,cellKind:o.cellKind,outputs:o.outputs.map(n=>({outputId:n.outputId,outputs:n.outputs})),metadata:o.metadata,internalMetadata:o.internalMetadata})));const a=new v,c=o=>({handle:o.handle,url:o.uri.toString(),source:o.textBuffer.getLinesContent(),eol:o.textBuffer.getEOL(),versionId:0,language:o.language,cellKind:o.cellKind,outputs:o.outputs.map(n=>({outputId:n.outputId,outputs:n.outputs})),metadata:o.metadata,internalMetadata:o.internalMetadata}),M=new Set,k=o=>{M.add(o),a.add(o.onDidChangeContent(n=>{typeof n=="object"&&n.type==="model"&&this._proxy.$acceptCellModelChanged(r,o.handle,n.event)}))};t.cells.forEach(o=>k(o)),t.cells.length!==M.size&&a.add(this._modelService.onModelAdded(o=>{if(o.uri.scheme!==W.vscodeNotebookCell||!(o instanceof w))return;const n=y.parse(o.uri);if(!n||!D(n.notebook,t.uri))return;const s=t.cells.find(d=>d.handle===n.handle);s&&k(s)})),a.add(t.onDidChangeContent(o=>{const n=[];o.rawEvents.forEach(s=>{switch(s.kind){case p.ModelChange:case p.Initialize:{n.push({kind:s.kind,changes:s.changes.map(d=>[d[0],d[1],d[2].map(h=>c(h))])});for(const d of s.changes)for(const h of d[2])k(h);break}case p.Move:{n.push({kind:p.Move,index:s.index,length:s.length,newIdx:s.newIdx,cells:s.cells.map(d=>c(d))});break}case p.ChangeCellContent:break;case p.ChangeDocumentMetadata:n.push({kind:s.kind,metadata:s.metadata});default:n.push(s)}}),this._proxy.$acceptModelChanged(r.toString(),{rawEvents:n,versionId:o.versionId})})),a.add(t.onWillDispose(()=>{this._stopModelSync(r)})),a.add(C(()=>{this._proxy.$acceptRemovedModel(r)})),this._syncedModels[r]=a}_stopModelSync(e){const t=this._syncedModels[e];delete this._syncedModels[e],delete this._syncedModelsLastUsedTime[e],S(t)}}class U extends u{constructor(e,t){super();this._notebookService=e;this._modelService=t;this._worker=null,this._modelManager=null}_worker;_modelManager;computeDiff(e,t){return this._ensureSyncedResources([e,t]).$computeDiff(e.toString(),t.toString())}canPromptRecommendation(e){return this._ensureSyncedResources([e]).$canPromptRecommendation(e.toString())}_getOrCreateModelManager(e){return this._modelManager||(this._modelManager=this._register(new E(e,this._notebookService,this._modelService))),this._modelManager}_ensureSyncedResources(e){const t=this._getOrCreateWorker().proxy;return this._getOrCreateModelManager(t).ensureSyncedResources(e),t}_getOrCreateWorker(){if(!this._worker)try{this._worker=this._register(I("vs/workbench/contrib/notebook/common/services/notebookSimpleWorker","NotebookEditorWorker"))}catch(e){throw e}return this._worker}}export{m as NotebookEditorWorkerServiceImpl};
