var F=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var u=(f,o,e,r)=>{for(var i=r>1?void 0:r?D(o,e):o,s=f.length-1,n;s>=0;s--)(n=f[s])&&(i=(r?n(o,e,i):n(i))||i);return r&&i&&F(o,e,i),i},t=(f,o)=>(e,r)=>o(e,r,f);import"../../../../../base/common/uri.js";import{EditorInputCapabilities as d,DEFAULT_EDITOR_ASSOCIATION as L,findViewStateForEditor as g,isResourceEditorInput as M}from"../../../../common/editor.js";import"../../../../common/editor/editorInput.js";import{AbstractTextResourceEditorInput as O}from"../../../../common/editor/textResourceEditorInput.js";import"../../../../../platform/editor/common/editor.js";import{BinaryEditorModel as C}from"../../../../common/editor/binaryEditorModel.js";import{IFileService as P}from"../../../../../platform/files/common/files.js";import{ITextFileService as b,TextFileEditorModelState as l,TextFileResolveReason as A,TextFileOperationResult as N}from"../../../../services/textfile/common/textfiles.js";import{IInstantiationService as _}from"../../../../../platform/instantiation/common/instantiation.js";import{dispose as w,DisposableStore as B}from"../../../../../base/common/lifecycle.js";import{ITextModelService as U}from"../../../../../editor/common/services/resolverService.js";import{FILE_EDITOR_INPUT_ID as V,TEXT_FILE_EDITOR_ID as $,BINARY_FILE_EDITOR_ID as G}from"../../common/files.js";import{ILabelService as k}from"../../../../../platform/label/common/label.js";import{IFilesConfigurationService as Y}from"../../../../services/filesConfiguration/common/filesConfigurationService.js";import{IEditorService as j}from"../../../../services/editor/common/editorService.js";import{isEqual as I}from"../../../../../base/common/resources.js";import{Event as q}from"../../../../../base/common/event.js";import{Schemas as c}from"../../../../../base/common/network.js";import{createTextBufferFactory as H}from"../../../../../editor/common/model/textModel.js";import{IPathService as W}from"../../../../services/path/common/pathService.js";import{ITextResourceConfigurationService as X}from"../../../../../editor/common/services/textResourceConfiguration.js";import"../../../../../base/common/htmlContent.js";import{ICustomEditorLabelService as z}from"../../../../services/editor/common/customEditorLabelService.js";var J=(r=>(r[r.None=0]="None",r[r.Text=1]="Text",r[r.Binary=2]="Binary",r))(J||{});let a=class extends O{constructor(e,r,i,s,n,p,h,K,v,Q,m,E,S,T,Z,y,R){super(e,r,T,v,m,E,S,y,R);this.instantiationService=K;this.textModelService=Q;this.pathService=Z;this.model=this.textFileService.files.get(e),i&&this.setPreferredName(i),s&&this.setPreferredDescription(s),n&&this.setPreferredEncoding(n),p&&this.setPreferredLanguageId(p),typeof h=="string"&&this.setPreferredContents(h),this._register(this.textFileService.files.onDidCreate(x=>this.onDidCreateTextFileModel(x))),this.model&&this.registerModelListeners(this.model)}get typeId(){return V}get editorId(){return L.id}get capabilities(){let e=d.CanSplitInGroup;return this.model?this.model.isReadonly()&&(e|=d.Readonly):this.fileService.hasProvider(this.resource)?this.filesConfigurationService.isReadonly(this.resource)&&(e|=d.Readonly):e|=d.Untitled,e&d.Readonly||(e|=d.CanDropIntoEditor),e}preferredName;preferredDescription;preferredEncoding;preferredLanguageId;preferredContents;forceOpenAs=0;model=void 0;cachedTextFileModelReference=void 0;modelListeners=this._register(new B);onDidCreateTextFileModel(e){I(e.resource,this.resource)&&(this.model=e,this.registerModelListeners(e))}registerModelListeners(e){this.modelListeners.clear(),this.modelListeners.add(e.onDidChangeDirty(()=>this._onDidChangeDirty.fire())),this.modelListeners.add(e.onDidChangeReadonly(()=>this._onDidChangeCapabilities.fire())),this.modelListeners.add(e.onDidSaveError(()=>this._onDidChangeDirty.fire())),this.modelListeners.add(q.once(e.onWillDispose)(()=>{this.modelListeners.clear(),this.model=void 0}))}getName(){return this.preferredName||super.getName()}setPreferredName(e){this.allowLabelOverride()&&this.preferredName!==e&&(this.preferredName=e,this._onDidChangeLabel.fire())}allowLabelOverride(){return this.resource.scheme!==this.pathService.defaultUriScheme&&this.resource.scheme!==c.vscodeUserData&&this.resource.scheme!==c.file&&this.resource.scheme!==c.vscodeRemote}getPreferredName(){return this.preferredName}isReadonly(){return this.model?this.model.isReadonly():this.filesConfigurationService.isReadonly(this.resource)}getDescription(e){return this.preferredDescription||super.getDescription(e)}setPreferredDescription(e){this.allowLabelOverride()&&this.preferredDescription!==e&&(this.preferredDescription=e,this._onDidChangeLabel.fire())}getPreferredDescription(){return this.preferredDescription}getTitle(e){let r=super.getTitle(e);const i=this.getPreferredTitle();return i&&(r=`${i} (${r})`),r}getPreferredTitle(){if(this.preferredName&&this.preferredDescription)return`${this.preferredName} ${this.preferredDescription}`;if(this.preferredName||this.preferredDescription)return this.preferredName??this.preferredDescription}getEncoding(){return this.model?this.model.getEncoding():this.preferredEncoding}getPreferredEncoding(){return this.preferredEncoding}async setEncoding(e,r){return this.setPreferredEncoding(e),this.model?.setEncoding(e,r)}setPreferredEncoding(e){this.preferredEncoding=e,this.setForceOpenAsText()}getLanguageId(){return this.model?this.model.getLanguageId():this.preferredLanguageId}getPreferredLanguageId(){return this.preferredLanguageId}setLanguageId(e,r){this.setPreferredLanguageId(e),this.model?.setLanguageId(e,r)}setPreferredLanguageId(e){this.preferredLanguageId=e,this.setForceOpenAsText()}setPreferredContents(e){this.preferredContents=e,this.setForceOpenAsText()}setForceOpenAsText(){this.forceOpenAs=1}setForceOpenAsBinary(){this.forceOpenAs=2}isDirty(){return!!this.model?.isDirty()}isSaving(){return this.model?.hasState(l.SAVED)||this.model?.hasState(l.CONFLICT)||this.model?.hasState(l.ERROR)?!1:this.filesConfigurationService.hasShortAutoSaveDelay(this)?!0:super.isSaving()}prefersEditorPane(e){return this.forceOpenAs===2?e.find(r=>r.typeId===G):e.find(r=>r.typeId===$)}resolve(e){return this.forceOpenAs===2?this.doResolveAsBinary():this.doResolveAsText(e)}async doResolveAsText(e){try{const r=this.preferredContents;this.preferredContents=void 0,await this.textFileService.files.resolve(this.resource,{languageId:this.preferredLanguageId,encoding:this.preferredEncoding,contents:typeof r=="string"?H(r):void 0,reload:{async:!0},allowBinary:this.forceOpenAs===1,reason:A.EDITOR,limits:this.ensureLimits(e)}),this.cachedTextFileModelReference||(this.cachedTextFileModelReference=await this.textModelService.createModelReference(this.resource));const i=this.cachedTextFileModelReference.object;return this.isDisposed()&&this.disposeModelReference(),i}catch(r){if(r.textFileOperationResult===N.FILE_IS_BINARY)return this.doResolveAsBinary();throw r}}async doResolveAsBinary(){const e=this.instantiationService.createInstance(C,this.preferredResource,this.getName());return await e.resolve(),e}isResolved(){return!!this.model}async rename(e,r){return{editor:{resource:r,encoding:this.getEncoding(),options:{viewState:g(this,e,this.editorService)}}}}toUntyped(e){const r={resource:this.preferredResource,forceFile:!0,options:{override:this.editorId}};return typeof e?.preserveViewState=="number"&&(r.encoding=this.getEncoding(),r.languageId=this.getLanguageId(),r.contents=(()=>{const i=this.textFileService.files.get(this.resource);if(i?.isDirty()&&!i.textEditorModel.isTooLargeForHeapOperation())return i.textEditorModel.getValue()})(),r.options={...r.options,viewState:g(this,e.preserveViewState,this.editorService)}),r}matches(e){return this===e?!0:e instanceof a?I(e.resource,this.resource):M(e)?super.matches(e):!1}dispose(){this.model=void 0,this.disposeModelReference(),super.dispose()}disposeModelReference(){w(this.cachedTextFileModelReference),this.cachedTextFileModelReference=void 0}};a=u([t(7,_),t(8,b),t(9,U),t(10,k),t(11,P),t(12,Y),t(13,j),t(14,W),t(15,X),t(16,z)],a);export{a as FileEditorInput};