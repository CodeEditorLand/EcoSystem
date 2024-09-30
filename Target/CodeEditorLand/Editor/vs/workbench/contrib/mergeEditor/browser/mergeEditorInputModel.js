var U=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var v=(a,n,e,t)=>{for(var o=t>1?void 0:t?q(n,e):n,i=a.length-1,l;i>=0;i--)(l=a[i])&&(o=(t?l(n,e,o):l(o))||o);return t&&o&&U(n,e,o),o},d=(a,n)=>(e,t)=>n(e,t,a);import{assertFn as W}from"../../../../base/common/assert.js";import{BugIndicatingError as B}from"../../../../base/common/errors.js";import{Event as T}from"../../../../base/common/event.js";import{DisposableStore as E}from"../../../../base/common/lifecycle.js";import{derived as L,observableFromEvent as b,observableValue as j}from"../../../../base/common/observable.js";import{basename as M,isEqual as Y}from"../../../../base/common/resources.js";import x from"../../../../base/common/severity.js";import"../../../../base/common/uri.js";import{IModelService as z}from"../../../../editor/common/services/model.js";import{ITextModelService as w}from"../../../../editor/common/services/resolverService.js";import{localize as r}from"../../../../nls.js";import{ConfirmResult as c,IDialogService as D}from"../../../../platform/dialogs/common/dialogs.js";import{IInstantiationService as R}from"../../../../platform/instantiation/common/instantiation.js";import{IStorageService as G,StorageScope as _,StorageTarget as H}from"../../../../platform/storage/common/storage.js";import{SaveSourceRegistry as J}from"../../../common/editor.js";import{EditorModel as A}from"../../../common/editor/editorModel.js";import"./mergeEditorInput.js";import{conflictMarkers as K}from"./mergeMarkers/mergeMarkersController.js";import{MergeDiffComputer as N}from"./model/diffComputer.js";import{MergeEditorModel as k}from"./model/mergeEditorModel.js";import"./telemetry.js";import{StorageCloseWithConflicts as F}from"../common/mergeEditor.js";import{IEditorService as Q}from"../../../services/editor/common/editorService.js";import{ITextFileService as P}from"../../../services/textfile/common/textfiles.js";let I=class{constructor(n,e,t,o){this._mergeEditorTelemetry=n;this._instantiationService=e;this._textModelService=t;this._modelService=o}async createInputModel(n){const e=new E,[t,o,i,l]=await Promise.all([this._textModelService.createModelReference(n.base),this._textModelService.createModelReference(n.result),g(n.input1,this._textModelService,e),g(n.input2,this._textModelService,e)]);e.add(t),e.add(o);const s=o.object.textEditorModel.uri.with({scheme:"merge-result"}),m=this._modelService.createModel("",{languageId:o.object.textEditorModel.getLanguageId(),onDidChange:T.None},s);e.add(m);const h=this._instantiationService.createInstance(N),S=this._instantiationService.createInstance(k,t.object.textEditorModel,i,l,m,h,{resetResult:!0},this._mergeEditorTelemetry);return e.add(S),await S.onInitialized,this._instantiationService.createInstance(p,S,e,o.object,n.result)}};I=v([d(1,R),d(2,w),d(3,z)],I);let p=class extends A{constructor(e,t,o,i,l,s,m){super();this.model=e;this.disposable=t;this.result=o;this.resultUri=i;this.textFileService=l;this.dialogService=s;this.editorService=m}savedAltVersionId=j(this,this.model.resultTextModel.getAlternativeVersionId());altVersionId=b(this,e=>this.model.resultTextModel.onDidChangeContent(e),()=>this.model.resultTextModel.getAlternativeVersionId());isDirty=L(this,e=>this.altVersionId.read(e)!==this.savedAltVersionId.read(e));finished=!1;dispose(){this.disposable.dispose(),super.dispose()}async accept(){const e=await this.model.resultTextModel.getValue();this.result.textEditorModel.setValue(e),this.savedAltVersionId.set(this.model.resultTextModel.getAlternativeVersionId(),void 0),await this.textFileService.save(this.result.textEditorModel.uri),this.finished=!0}async _discard(){await this.textFileService.revert(this.model.resultTextModel.uri),this.savedAltVersionId.set(this.model.resultTextModel.getAlternativeVersionId(),void 0),this.finished=!0}shouldConfirmClose(){return!0}async confirmClose(e){W(()=>e.some(i=>i===this));const t=e.some(i=>i.isDirty.get());let o;if(t){const i=e.length>1,l=i?r("messageN","Do you want keep the merge result of {0} files?",e.length):r("message1","Do you want keep the merge result of {0}?",M(e[0].model.resultTextModel.uri)),s=e.some(h=>h.model.hasUnhandledConflicts.get()),m=[{label:s?r({key:"saveWithConflict",comment:["&& denotes a mnemonic"]},"&&Save With Conflicts"):r({key:"save",comment:["&& denotes a mnemonic"]},"&&Save"),run:()=>c.SAVE},{label:r({key:"discard",comment:["&& denotes a mnemonic"]},"Do&&n't Save"),run:()=>c.DONT_SAVE}];o=(await this.dialogService.prompt({type:x.Info,message:l,detail:s?i?r("detailNConflicts","The files contain unhandled conflicts. The merge results will be lost if you don't save them."):r("detail1Conflicts","The file contains unhandled conflicts. The merge result will be lost if you don't save it."):i?r("detailN","The merge results will be lost if you don't save them."):r("detail1","The merge result will be lost if you don't save it."),buttons:m,cancelButton:{run:()=>c.CANCEL}})).result}else o=c.DONT_SAVE;return o===c.SAVE?await Promise.all(e.map(i=>i.accept())):o===c.DONT_SAVE&&await Promise.all(e.map(i=>i._discard())),o}async save(e){this.finished||(async()=>{const{confirmed:t}=await this.dialogService.confirm({message:r("saveTempFile.message","Do you want to accept the merge result?"),detail:r("saveTempFile.detail","This will write the merge result to the original file and close the merge editor."),primaryButton:r({key:"acceptMerge",comment:["&& denotes a mnemonic"]},"&&Accept Merge")});if(t){await this.accept();const o=this.editorService.findEditors(this.resultUri).filter(i=>i.editor.typeId==="mergeEditor.Input");await this.editorService.closeEditors(o)}})()}async revert(e){}};p=v([d(4,P),d(5,D),d(6,Q)],p);let u=class{constructor(n,e,t,o){this._mergeEditorTelemetry=n;this._instantiationService=e;this._textModelService=t;this.textFileService=o}static FILE_SAVED_SOURCE=J.registerSource("merge-editor.source",r("merge-editor.source","Before Resolving Conflicts In Merge Editor"));async createInputModel(n){const e=new E;let t;const o=e.add(new E),i=y=>{Y(n.result,y.resource)&&(o.clear(),t=y)};o.add(this.textFileService.files.onDidCreate(i)),this.textFileService.files.models.forEach(i);const[l,s,m,h]=await Promise.all([this._textModelService.createModelReference(n.base),this._textModelService.createModelReference(n.result),g(n.input1,this._textModelService,e),g(n.input2,this._textModelService,e)]);if(e.add(l),e.add(s),!t)throw new B;await t.save({source:u.FILE_SAVED_SOURCE});const V=t.textEditorModel.getLinesContent().some(y=>y.startsWith(K.start)),O=this._instantiationService.createInstance(N),C=this._instantiationService.createInstance(k,l.object.textEditorModel,m,h,s.object.textEditorModel,O,{resetResult:V},this._mergeEditorTelemetry);return e.add(C),await C.onInitialized,this._instantiationService.createInstance(f,C,e,t,this._mergeEditorTelemetry)}};u=v([d(1,R),d(2,w),d(3,P)],u);let f=class extends A{constructor(e,t,o,i,l,s){super();this.model=e;this.disposableStore=t;this.resultTextFileModel=o;this.telemetry=i;this._dialogService=l;this._storageService=s}isDirty=b(this,T.any(this.resultTextFileModel.onDidChangeDirty,this.resultTextFileModel.onDidSaveError),()=>this.resultTextFileModel.isDirty());reported=!1;dateTimeOpened=new Date;dispose(){this.disposableStore.dispose(),super.dispose(),this.reportClose(!1)}reportClose(e){if(!this.reported){const t=this.model.unhandledConflictsCount.get(),o=new Date().getTime()-this.dateTimeOpened.getTime();this.telemetry.reportMergeEditorClosed({durationOpenedSecs:o/1e3,remainingConflictCount:t,accepted:e,conflictCount:this.model.conflictCount,combinableConflictCount:this.model.combinableConflictCount,conflictsResolvedWithBase:this.model.conflictsResolvedWithBase,conflictsResolvedWithInput1:this.model.conflictsResolvedWithInput1,conflictsResolvedWithInput2:this.model.conflictsResolvedWithInput2,conflictsResolvedWithSmartCombination:this.model.conflictsResolvedWithSmartCombination,manuallySolvedConflictCountThatEqualNone:this.model.manuallySolvedConflictCountThatEqualNone,manuallySolvedConflictCountThatEqualSmartCombine:this.model.manuallySolvedConflictCountThatEqualSmartCombine,manuallySolvedConflictCountThatEqualInput1:this.model.manuallySolvedConflictCountThatEqualInput1,manuallySolvedConflictCountThatEqualInput2:this.model.manuallySolvedConflictCountThatEqualInput2,manuallySolvedConflictCountThatEqualNoneAndStartedWithBase:this.model.manuallySolvedConflictCountThatEqualNoneAndStartedWithBase,manuallySolvedConflictCountThatEqualNoneAndStartedWithInput1:this.model.manuallySolvedConflictCountThatEqualNoneAndStartedWithInput1,manuallySolvedConflictCountThatEqualNoneAndStartedWithInput2:this.model.manuallySolvedConflictCountThatEqualNoneAndStartedWithInput2,manuallySolvedConflictCountThatEqualNoneAndStartedWithBothNonSmart:this.model.manuallySolvedConflictCountThatEqualNoneAndStartedWithBothNonSmart,manuallySolvedConflictCountThatEqualNoneAndStartedWithBothSmart:this.model.manuallySolvedConflictCountThatEqualNoneAndStartedWithBothSmart}),this.reported=!0}}async accept(){this.reportClose(!0),await this.resultTextFileModel.save()}get resultUri(){return this.resultTextFileModel.resource}async save(e){await this.resultTextFileModel.save(e)}async revert(e){await this.resultTextFileModel.revert(e)}shouldConfirmClose(){return!0}async confirmClose(e){const t=e.length>1,o=e.some(l=>l.isDirty.get()),i=e.some(l=>l.model.hasUnhandledConflicts.get());if(o){const l=t?r("workspace.messageN","Do you want to save the changes you made to {0} files?",e.length):r("workspace.message1","Do you want to save the changes you made to {0}?",M(e[0].resultUri)),{result:s}=await this._dialogService.prompt({type:x.Info,message:l,detail:i?t?r("workspace.detailN.unhandled","The files contain unhandled conflicts. Your changes will be lost if you don't save them."):r("workspace.detail1.unhandled","The file contains unhandled conflicts. Your changes will be lost if you don't save them."):t?r("workspace.detailN.handled","Your changes will be lost if you don't save them."):r("workspace.detail1.handled","Your changes will be lost if you don't save them."),buttons:[{label:i?r({key:"workspace.saveWithConflict",comment:["&& denotes a mnemonic"]},"&&Save with Conflicts"):r({key:"workspace.save",comment:["&& denotes a mnemonic"]},"&&Save"),run:()=>c.SAVE},{label:r({key:"workspace.doNotSave",comment:["&& denotes a mnemonic"]},"Do&&n't Save"),run:()=>c.DONT_SAVE}],cancelButton:{run:()=>c.CANCEL}});return s}else if(i&&!this._storageService.getBoolean(F,_.PROFILE,!1)){const{confirmed:l,checkboxChecked:s}=await this._dialogService.confirm({message:t?r("workspace.messageN.nonDirty","Do you want to close {0} merge editors?",e.length):r("workspace.message1.nonDirty","Do you want to close the merge editor for {0}?",M(e[0].resultUri)),detail:i?t?r("workspace.detailN.unhandled.nonDirty","The files contain unhandled conflicts."):r("workspace.detail1.unhandled.nonDirty","The file contains unhandled conflicts."):void 0,primaryButton:i?r({key:"workspace.closeWithConflicts",comment:["&& denotes a mnemonic"]},"&&Close with Conflicts"):r({key:"workspace.close",comment:["&& denotes a mnemonic"]},"&&Close"),checkbox:{label:r("noMoreWarn","Do not ask me again")}});return s&&this._storageService.store(F,!0,_.PROFILE,H.USER),l?c.SAVE:c.CANCEL}else return c.SAVE}};f=v([d(4,D),d(5,G)],f);async function g(a,n,e){const t=await n.createModelReference(a.uri);return e.add(t),{textModel:t.object.textEditorModel,title:a.title,description:a.description,detail:a.detail}}export{I as TempFileMergeEditorModeFactory,u as WorkspaceMergeEditorModeFactory};