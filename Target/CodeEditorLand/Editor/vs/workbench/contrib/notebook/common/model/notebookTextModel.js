var P=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var N=(b,p,e,t)=>{for(var n=t>1?void 0:t?A(p,e):p,i=b.length-1,o;i>=0;i--)(o=b[i])&&(n=(t?o(p,e,n):o(n))||n);return t&&n&&P(p,e,n),n},k=(b,p)=>(e,t)=>p(e,t,b);import{Emitter as M,PauseableEmitter as V}from"../../../../../base/common/event.js";import{Disposable as W,dispose as T}from"../../../../../base/common/lifecycle.js";import"../../../../../base/common/uri.js";import{NotebookCellTextModel as w}from"./notebookCellTextModel.js";import{CellEditType as f,CellUri as y,diff as H,NotebookCellsChangeType as m,CellKind as B}from"../notebookCommon.js";import{IUndoRedoService as j,UndoRedoElementType as x}from"../../../../../platform/undoRedo/common/undoRedo.js";import{MoveCellEdit as q,SpliceCellsEdit as z,CellMetadataEdit as F}from"./cellEdit.js";import{LcsDiff as K}from"../../../../../base/common/diff/diff.js";import{hash as G}from"../../../../../base/common/hash.js";import{NotebookCellOutputTextModel as O}from"./notebookCellOutputTextModel.js";import{IModelService as Q}from"../../../../../editor/common/services/model.js";import{Schemas as $}from"../../../../../base/common/network.js";import{isEqual as J}from"../../../../../base/common/resources.js";import{ILanguageService as X}from"../../../../../editor/common/languages/language.js";import"../../../../../editor/common/model.js";import{TextModel as D}from"../../../../../editor/common/model/textModel.js";import{isDefined as Y}from"../../../../../base/common/types.js";import{ILanguageDetectionService as Z}from"../../../../services/languageDetection/common/languageDetectionWorkerService.js";import"../../../../../editor/common/core/position.js";import{Range as ee}from"../../../../../editor/common/core/range.js";import{SearchParams as te}from"../../../../../editor/common/model/textModelSearch.js";import"../../../../../editor/common/textModelEvents.js";class ne{constructor(p,e,t,n,i,o){this.textModel=p;this.undoRedoGroup=e;this._pauseableEmitter=t;this._postUndoRedo=n;this.type=x.Workspace,this._beginSelectionState=i,this._beginAlternativeVersionId=o,this._resultAlternativeVersionId=o}type;get code(){return this._operations.length===1?this._operations[0].code:"undoredo.notebooks.stackOperation"}_operations=[];_beginSelectionState=void 0;_resultSelectionState=void 0;_beginAlternativeVersionId;_resultAlternativeVersionId;get label(){return this._operations.length===1?this._operations[0].label:"edit"}get resources(){return[this.textModel.uri]}get isEmpty(){return this._operations.length===0}pushEndState(p,e){this._resultAlternativeVersionId=p,this._resultSelectionState=e||this._resultSelectionState}pushEditOperation(p,e,t,n){this._operations.length===0&&(this._beginSelectionState=this._beginSelectionState??e),this._operations.push(p),this._resultSelectionState=t,this._resultAlternativeVersionId=n}async undo(){this._pauseableEmitter.pause();try{for(let p=this._operations.length-1;p>=0;p--)await this._operations[p].undo();this._postUndoRedo(this._beginAlternativeVersionId),this._pauseableEmitter.fire({rawEvents:[],synchronous:void 0,versionId:this.textModel.versionId,endSelectionState:this._beginSelectionState})}finally{this._pauseableEmitter.resume()}}async redo(){this._pauseableEmitter.pause();try{for(let p=0;p<this._operations.length;p++)await this._operations[p].redo();this._postUndoRedo(this._resultAlternativeVersionId),this._pauseableEmitter.fire({rawEvents:[],synchronous:void 0,versionId:this.textModel.versionId,endSelectionState:this._resultSelectionState})}finally{this._pauseableEmitter.resume()}}}class ie{constructor(p,e,t,n){this._textModel=p;this._undoService=e;this._pauseableEmitter=t;this._postUndoRedo=n}_pendingStackOperation=null;isUndoStackEmpty(){return this._pendingStackOperation===null||this._pendingStackOperation.isEmpty}pushStackElement(p,e){this._pendingStackOperation&&!this._pendingStackOperation.isEmpty&&(this._pendingStackOperation.pushEndState(p,e),this._undoService.pushElement(this._pendingStackOperation,this._pendingStackOperation.undoRedoGroup)),this._pendingStackOperation=null}_getOrCreateEditStackElement(p,e,t){return this._pendingStackOperation??=new ne(this._textModel,e,this._pauseableEmitter,this._postUndoRedo,p,t||"")}pushEditOperation(p,e,t,n,i){this._getOrCreateEditStackElement(e,i,n).pushEditOperation(p,e,t,n)}}class ae extends V{get isEmpty(){return this._eventQueue.isEmpty()}isDirtyEvent(){for(const p of this._eventQueue)for(let e=0;e<p.rawEvents.length;e++)if(!p.rawEvents[e].transient)return!0;return!1}}let S=class extends W{constructor(e,t,n,i,o,s,l,h,a){super();this.viewType=e;this.uri=t;this._undoService=s;this._modelService=l;this._languageService=h;this._languageDetectionService=a;this.transientOptions=o,this.metadata=i,this._initialize(n);const u=r=>{if(r.uri.scheme===$.vscodeNotebookCell&&r instanceof D){const c=y.parse(r.uri);if(c&&J(c.notebook,this.uri)){const v=this._getCellIndexByHandle(c.handle);if(v>=0){const d=this.cells[v];d&&(d.textModel=r)}}}};this._register(l.onModelAdded(r=>u(r))),this._pauseableEmitter=new ae({merge:r=>{const c=r[0],v=c.rawEvents;let d=c.versionId,_=c.endSelectionState,I=c.synchronous;for(let g=1;g<r.length;g++)v.push(...r[g].rawEvents),d=r[g].versionId,_=r[g].endSelectionState!==void 0?r[g].endSelectionState:_,I=r[g].synchronous!==void 0?r[g].synchronous:I;return{rawEvents:v,versionId:d,endSelectionState:_,synchronous:I}}}),this._register(this._pauseableEmitter.event(r=>{r.rawEvents.length&&this._onDidChangeContent.fire(r)})),this._operationManager=new ie(this,this._undoService,this._pauseableEmitter,r=>{this._increaseVersionId(!0),this._overwriteAlternativeVersionId(r)})}_isDisposed=!1;_onWillDispose=this._register(new M);_onWillAddRemoveCells=this._register(new M);_onDidChangeContent=this._register(new M);onWillDispose=this._onWillDispose.event;onWillAddRemoveCells=this._onWillAddRemoveCells.event;onDidChangeContent=this._onDidChangeContent.event;_cellhandlePool=0;_cellListeners=new Map;_cells=[];_defaultCollapseConfig;metadata={};transientOptions={transientCellMetadata:{},transientDocumentMetadata:{},transientOutputs:!1,cellContentMetadata:{}};_versionId=0;_notebookSpecificAlternativeId=0;_alternativeVersionId="1";_operationManager;_pauseableEmitter;get length(){return this._cells.length}get cells(){return this._cells}get versionId(){return this._versionId}get alternativeVersionId(){return this._alternativeVersionId}get notebookType(){return this.viewType}setCellCollapseDefault(e){this._defaultCollapseConfig=e}_initialize(e,t){this._cells=[],this._versionId=0,this._notebookSpecificAlternativeId=0;const n=e.map(i=>{const o=this._cellhandlePool++,s=y.generate(this.uri,o),l=this._getDefaultCollapseState(i);return new w(s,o,i.source,i.language,i.mime,i.cellKind,i.outputs,i.metadata,i.internalMetadata,l,this.transientOptions,this._languageService,this._languageDetectionService)});for(let i=0;i<n.length;i++){const o=n[i].onDidChangeContent(s=>{this._bindCellContentHandler(n[i],s)});this._cellListeners.set(n[i].handle,o),this._register(n[i])}this._cells.splice(0,0,...n),this._alternativeVersionId=this._generateAlternativeId(),t&&this._pauseableEmitter.fire({rawEvents:[{kind:m.Unknown,transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_bindCellContentHandler(e,t){switch(this._increaseVersionId(t==="content"||typeof t=="object"&&t.type==="model"),t){case"content":this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellContent,index:this._getCellIndexByHandle(e.handle),transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0});break;case"language":this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellLanguage,index:this._getCellIndexByHandle(e.handle),language:e.language,transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0});break;case"mime":this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellMime,index:this._getCellIndexByHandle(e.handle),mime:e.mime,transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0});break;default:typeof t=="object"&&t.type==="model"&&this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellContent,index:this._getCellIndexByHandle(e.handle),transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0});break}}_generateAlternativeId(){return`${this._notebookSpecificAlternativeId}_`+this.cells.map(e=>e.handle+","+e.alternativeId).join(";")}dispose(){this._isDisposed||(this._isDisposed=!0,this._onWillDispose.fire(),this._undoService.removeElements(this.uri),T(this._cellListeners.values()),this._cellListeners.clear(),T(this._cells),this._cells=[],super.dispose())}pushStackElement(){}_getCellIndexByHandle(e){return this.cells.findIndex(t=>t.handle===e)}_getCellIndexWithOutputIdHandleFromEdits(e,t){const n=t.find(i=>"outputs"in i&&i.outputs.some(o=>o.outputId===e));if(n){if("index"in n)return n.index;if("handle"in n){const i=this._getCellIndexByHandle(n.handle);return this._assertIndex(i),i}}return-1}_getCellIndexWithOutputIdHandle(e){return this.cells.findIndex(t=>!!t.outputs.find(n=>n.outputId===e))}reset(e,t,n){this.transientOptions=n;const i=S.computeEdits(this,e);this.applyEdits([...i,{editType:f.DocumentMetadata,metadata:t}],!0,void 0,()=>{},void 0,!1)}static computeEdits(e,t){const n=[],i=this._commonPrefix(e.cells,e.cells.length,0,t,t.length,0);if(i>0)for(let s=0;s<i;s++)n.push({editType:f.Metadata,index:s,metadata:t[s].metadata??{}},...this._computeOutputEdit(s,e.cells[s].outputs,t[s].outputs));if(e.cells.length===t.length&&i===e.cells.length)return n;const o=this._commonSuffix(e.cells,e.cells.length-i,i,t,t.length-i,i);if(o>0?n.push({editType:f.Replace,index:i,count:e.cells.length-i-o,cells:t.slice(i,t.length-o)}):i>0?n.push({editType:f.Replace,index:i,count:e.cells.length-i,cells:t.slice(i)}):n.push({editType:f.Replace,index:0,count:e.cells.length,cells:t}),o>0)for(let s=o;s>0;s--)n.push({editType:f.Metadata,index:e.cells.length-s,metadata:t[t.length-s].metadata??{}},...this._computeOutputEdit(e.cells.length-s,e.cells[e.cells.length-s].outputs,t[t.length-s].outputs));return n}static _computeOutputEdit(e,t,n){return t.length!==n.length?[{editType:f.Output,index:e,outputs:n,append:!1}]:t.length===0?[]:n.map((i,o)=>({editType:f.OutputItems,outputId:t[o].outputId,items:i.outputs,append:!1}))}static _commonPrefix(e,t,n,i,o,s){const l=Math.min(t,o);let h=0;for(let a=0;a<l&&e[n+a].fastEqual(i[s+a]);a++)h++;return h}static _commonSuffix(e,t,n,i,o,s){const l=Math.min(t,o);let h=0;for(let a=0;a<l&&e[n+t-a-1].fastEqual(i[s+o-a-1]);a++)h++;return h}applyEdits(e,t,n,i,o,s){this._pauseableEmitter.pause(),this._operationManager.pushStackElement(this._alternativeVersionId,void 0);try{return this._doApplyEdits(e,t,s,n,o),!0}finally{if(!this._pauseableEmitter.isEmpty){const l=i();this._increaseVersionId(this._operationManager.isUndoStackEmpty()&&!this._pauseableEmitter.isDirtyEvent()),this._operationManager.pushStackElement(this._alternativeVersionId,l),this._pauseableEmitter.fire({rawEvents:[],versionId:this.versionId,synchronous:t,endSelectionState:l})}this._pauseableEmitter.resume()}}_doApplyEdits(e,t,n,i,o){const s=e.map((a,u)=>{let r=-1;if("index"in a)r=a.index;else if("handle"in a)r=this._getCellIndexByHandle(a.handle),this._assertIndex(r);else if("outputId"in a){if(r=this._getCellIndexWithOutputIdHandle(a.outputId),this._indexIsInvalid(r)&&(r=this._getCellIndexWithOutputIdHandleFromEdits(a.outputId,e.slice(0,u))),this._indexIsInvalid(r))return null}else if(a.editType!==f.DocumentMetadata)throw new Error("Invalid cell edit");return{edit:a,cellIndex:r,end:a.editType===f.DocumentMetadata?void 0:a.editType===f.Replace?a.index+a.count:r,originalIndex:u}}).filter(Y),h=this._mergeCellEdits(s).sort((a,u)=>a.end===void 0||u.end===void 0?-1:u.end-a.end||u.originalIndex-a.originalIndex).reduce((a,u)=>{if(!a.length)a.push([u]);else{const r=a[a.length-1],c=r[0].cellIndex;u.cellIndex===c?r.push(u):a.push([u])}return a},[]).map(a=>{const u=[],r=[];return a.forEach(c=>{c.edit.editType===f.Replace?u.push(c):r.push(c)}),[...r.reverse(),...u]}).flat();for(const{edit:a,cellIndex:u}of h)switch(a.editType){case f.Replace:this._replaceCells(a.index,a.count,a.cells,t,n,i,o);break;case f.Output:{this._assertIndex(u);const r=this._cells[u];a.append?this._spliceNotebookCellOutputs(r,{start:r.outputs.length,deleteCount:0,newOutputs:a.outputs.map(c=>new O(c))},!0,n):this._spliceNotebookCellOutputs2(r,a.outputs,n);break}case f.OutputItems:{this._assertIndex(u);const r=this._cells[u];a.append?this._appendNotebookCellOutputItems(r,a.outputId,a.items):this._replaceNotebookCellOutputItems(r,a.outputId,a.items)}break;case f.Metadata:this._assertIndex(a.index),this._changeCellMetadata(this._cells[a.index],a.metadata,n,i,o);break;case f.PartialMetadata:this._assertIndex(u),this._changeCellMetadataPartial(this._cells[u],a.metadata,n,i,o);break;case f.PartialInternalMetadata:this._assertIndex(u),this._changeCellInternalMetadataPartial(this._cells[u],a.internalMetadata);break;case f.CellLanguage:this._assertIndex(a.index),this._changeCellLanguage(this._cells[a.index],a.language,n,i,o);break;case f.DocumentMetadata:this._updateNotebookCellMetadata(a.metadata,n,i,o);break;case f.Move:this._moveCellToIdx(a.index,a.length,a.newIdx,t,n,i,void 0,o);break}}_mergeCellEdits(e){const t=[];return e.forEach(n=>{if(t.length){const i=t[t.length-1];i.edit.editType===f.Output&&i.edit.append&&n.edit.editType===f.Output&&n.edit.append&&i.cellIndex===n.cellIndex?i.edit.outputs=[...i.edit.outputs,...n.edit.outputs]:i.edit.editType===f.Output&&!i.edit.append&&i.edit.outputs.length===0&&n.edit.editType===f.Output&&n.edit.append&&i.cellIndex===n.cellIndex?(i.edit.append=!1,i.edit.outputs=n.edit.outputs):t.push(n)}else t.push(n)}),t}_getDefaultCollapseState(e){const t=e.cellKind===B.Code?this._defaultCollapseConfig?.codeCell:this._defaultCollapseConfig?.markupCell;return e.collapseState??t??void 0}_replaceCells(e,t,n,i,o,s,l){if(t===0&&n.length===0)return;const h=this._cells.slice(0),a=new Set;h.forEach(d=>{a.add(d.handle)});for(let d=e;d<Math.min(e+t,this._cells.length);d++){const _=this._cells[d];this._cellListeners.get(_.handle)?.dispose(),this._cellListeners.delete(_.handle)}const u=n.map(d=>{const _=this._cellhandlePool++,I=y.generate(this.uri,_),g=this._getDefaultCollapseState(d),C=new w(I,_,d.source,d.language,d.mime,d.cellKind,d.outputs||[],d.metadata,d.internalMetadata,g,this.transientOptions,this._languageService,this._languageDetectionService),E=this._modelService.getModel(I);E&&E instanceof D&&(C.textModel=E,C.language=d.language,C.textModel.setValue(d.source),C.resetTextBuffer(C.textModel.getTextBuffer()));const U=C.onDidChangeContent(L=>{this._bindCellContentHandler(C,L)});return this._cellListeners.set(C.handle,U),this._register(C),C}),r=this._cells.slice(0);r.splice(e,t,...u);const c=H(this._cells,r,d=>a.has(d.handle)).map(d=>[d.start,d.deleteCount,d.toInsert]);this._onWillAddRemoveCells.fire({rawEvent:{kind:m.ModelChange,changes:c}}),this._cells=r;const v=c.map(d=>{const _=h.slice(d[0],d[0]+d[1]);return[d[0],_,d[2]]});o&&this._operationManager.pushEditOperation(new z(this.uri,v,{insertCell:(d,_,I)=>{this._insertNewCell(d,[_],!0,I)},deleteCell:(d,_)=>{this._removeCell(d,1,!0,_)},replaceCell:(d,_,I,g)=>{this._replaceNewCells(d,_,I,!0,g)}},void 0,void 0),s,void 0,this._alternativeVersionId,l),this._pauseableEmitter.fire({rawEvents:[{kind:m.ModelChange,changes:c,transient:!1}],versionId:this.versionId,synchronous:i,endSelectionState:void 0})}_increaseVersionId(e){this._versionId=this._versionId+1,e||(this._notebookSpecificAlternativeId=this._versionId),this._alternativeVersionId=this._generateAlternativeId()}_overwriteAlternativeVersionId(e){this._alternativeVersionId=e,this._notebookSpecificAlternativeId=Number(e.substring(0,e.indexOf("_")))}_updateNotebookCellMetadata(e,t,n,i){const o=this.metadata,s=this._isDocumentMetadataChanged(this.metadata,e);if(s&&t){const l=this;this._operationManager.pushEditOperation(new class{type=x.Resource;get resource(){return l.uri}label="Update Cell Metadata";code="undoredo.textBufferEdit";undo(){l._updateNotebookCellMetadata(o,!1,n,i)}redo(){l._updateNotebookCellMetadata(e,!1,n,i)}},n,void 0,this._alternativeVersionId,i)}this.metadata=e,this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeDocumentMetadata,metadata:this.metadata,transient:!s}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_insertNewCell(e,t,n,i){for(let s=0;s<t.length;s++){const l=t[s].onDidChangeContent(h=>{this._bindCellContentHandler(t[s],h)});this._cellListeners.set(t[s].handle,l)}const o=[[e,0,t]];this._onWillAddRemoveCells.fire({rawEvent:{kind:m.ModelChange,changes:o}}),this._cells.splice(e,0,...t),this._pauseableEmitter.fire({rawEvents:[{kind:m.ModelChange,changes:o,transient:!1}],versionId:this.versionId,synchronous:n,endSelectionState:i})}_removeCell(e,t,n,i){for(let s=e;s<e+t;s++){const l=this._cells[s];this._cellListeners.get(l.handle)?.dispose(),this._cellListeners.delete(l.handle)}const o=[[e,t,[]]];this._onWillAddRemoveCells.fire({rawEvent:{kind:m.ModelChange,changes:o}}),this._cells.splice(e,t),this._pauseableEmitter.fire({rawEvents:[{kind:m.ModelChange,changes:o,transient:!1}],versionId:this.versionId,synchronous:n,endSelectionState:i})}_replaceNewCells(e,t,n,i,o){for(let l=e;l<e+t;l++){const h=this._cells[l];this._cellListeners.get(h.handle)?.dispose(),this._cellListeners.delete(h.handle)}for(let l=0;l<n.length;l++){const h=n[l].onDidChangeContent(a=>{this._bindCellContentHandler(n[l],a)});this._cellListeners.set(n[l].handle,h)}const s=[[e,t,n]];this._onWillAddRemoveCells.fire({rawEvent:{kind:m.ModelChange,changes:s}}),this._cells.splice(e,t,...n),this._pauseableEmitter.fire({rawEvents:[{kind:m.ModelChange,changes:s,transient:!1}],versionId:this.versionId,synchronous:i,endSelectionState:o})}_isDocumentMetadataChanged(e,t){const n=new Set([...Object.keys(e||{}),...Object.keys(t||{})]);for(const i of n)if(i==="custom"){if(!this._customMetadataEqual(e[i],t[i])&&!this.transientOptions.transientDocumentMetadata[i])return!0}else if(e[i]!==t[i]&&!this.transientOptions.transientDocumentMetadata[i])return!0;return!1}_isCellMetadataChanged(e,t){const n=new Set([...Object.keys(e||{}),...Object.keys(t||{})]);for(const i of n)if(e[i]!==t[i]&&!this.transientOptions.transientCellMetadata[i])return!0;return!1}_customMetadataEqual(e,t){if(!e&&!t)return!0;if(!e||!t)return!1;const n=Object.getOwnPropertyNames(e),i=Object.getOwnPropertyNames(t);if(n.length!==i.length)return!1;for(let o=0;o<n.length;o++){const s=n[o];if(e[s]!==t[s])return!1}return!0}_changeCellMetadataPartial(e,t,n,i,o){const s={...e.metadata};let l;for(l in t){const h=t[l]??void 0;s[l]=h}return this._changeCellMetadata(e,s,n,i,o)}_changeCellMetadata(e,t,n,i,o){const s=this._isCellMetadataChanged(e.metadata,t);if(s&&n){const l=this._cells.indexOf(e);this._operationManager.pushEditOperation(new F(this.uri,l,Object.freeze(e.metadata),Object.freeze(t),{updateCellMetadata:(h,a)=>{const u=this._cells[h];u&&this._changeCellMetadata(u,a,!1,i,o)}}),i,void 0,this._alternativeVersionId,o)}e.metadata=t,this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellMetadata,index:this._cells.indexOf(e),metadata:e.metadata,transient:!s}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_changeCellInternalMetadataPartial(e,t){const n={...e.internalMetadata};let i;for(i in t){const o=t[i]??void 0;n[i]=o}e.internalMetadata=n,this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellInternalMetadata,index:this._cells.indexOf(e),internalMetadata:e.internalMetadata,transient:!0}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_changeCellLanguage(e,t,n,i,o){if(e.language===t)return;const s=e.language;if(e.language=t,n){const l=this;this._operationManager.pushEditOperation(new class{type=x.Resource;get resource(){return l.uri}label="Update Cell Language";code="undoredo.textBufferEdit";undo(){l._changeCellLanguage(e,s,!1,i,o)}redo(){l._changeCellLanguage(e,t,!1,i,o)}},i,void 0,this._alternativeVersionId,o)}this._pauseableEmitter.fire({rawEvents:[{kind:m.ChangeCellLanguage,index:this._cells.indexOf(e),language:t,transient:!1}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_spliceNotebookCellOutputs2(e,t,n){if(t.length===0&&e.outputs.length===0)return;if(t.length<=1){this._spliceNotebookCellOutputs(e,{start:0,deleteCount:e.outputs.length,newOutputs:t.map(l=>new O(l))},!1,n);return}new K(new R(e.outputs),new R(t)).ComputeDiff(!1).changes.map(l=>({start:l.originalStart,deleteCount:l.originalLength,newOutputs:t.slice(l.modifiedStart,l.modifiedStart+l.modifiedLength).map(h=>new O(h))})).reverse().forEach(l=>{this._spliceNotebookCellOutputs(e,l,!1,n)})}_spliceNotebookCellOutputs(e,t,n,i){e.spliceNotebookCellOutputs(t),this._pauseableEmitter.fire({rawEvents:[{kind:m.Output,index:this._cells.indexOf(e),outputs:e.outputs.map(o=>o.asDto())??[],append:n,transient:this.transientOptions.transientOutputs}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_appendNotebookCellOutputItems(e,t,n){e.changeOutputItems(t,!0,n)&&this._pauseableEmitter.fire({rawEvents:[{kind:m.OutputItem,index:this._cells.indexOf(e),outputId:t,outputItems:n,append:!0,transient:this.transientOptions.transientOutputs}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_replaceNotebookCellOutputItems(e,t,n){e.changeOutputItems(t,!1,n)&&this._pauseableEmitter.fire({rawEvents:[{kind:m.OutputItem,index:this._cells.indexOf(e),outputId:t,outputItems:n,append:!1,transient:this.transientOptions.transientOutputs}],versionId:this.versionId,synchronous:!0,endSelectionState:void 0})}_moveCellToIdx(e,t,n,i,o,s,l,h){o&&this._operationManager.pushEditOperation(new q(this.uri,e,t,n,{moveCell:(u,r,c,v,d)=>{this._moveCellToIdx(u,r,c,!0,!1,v,d,h)}},s,l),s,l,this._alternativeVersionId,h),this._assertIndex(e),this._assertIndex(n);const a=this._cells.splice(e,t);return this._cells.splice(n,0,...a),this._pauseableEmitter.fire({rawEvents:[{kind:m.Move,index:e,length:t,newIdx:n,cells:a,transient:!1}],versionId:this.versionId,synchronous:i,endSelectionState:l}),!0}_assertIndex(e){if(this._indexIsInvalid(e))throw new Error(`model index out of range ${e}`)}_indexIsInvalid(e){return e<0||e>=this._cells.length}findNextMatch(e,t,n,i,o){this._assertIndex(t.cellIndex);const l=new te(e,n,i,o).parseSearchRequest();if(!l)return null;let h=t.cellIndex,a=t.position;for(;h<this._cells.length;){const u=this._cells[h],r=new ee(a.lineNumber,a.column,u.textBuffer.getLineCount(),u.textBuffer.getLineMaxColumn(u.textBuffer.getLineCount())),c=u.textBuffer.findMatchesLineByLine(r,l,!1,1);if(c.length>0)return{cell:u,match:c[0]};h++,a={lineNumber:1,column:1}}return null}};S=N([k(5,j),k(6,Q),k(7,X),k(8,Z)],S);class R{constructor(p){this.outputs=p}getElements(){return this.outputs.map(p=>G(p.outputs.map(e=>({mime:e.mime,data:e.data}))))}}export{S as NotebookTextModel};