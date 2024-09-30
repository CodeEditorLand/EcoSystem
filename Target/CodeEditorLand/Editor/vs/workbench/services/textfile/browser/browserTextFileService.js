var y=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var I=(c,i,t,o)=>{for(var r=o>1?void 0:o?C(i,t):i,n=c.length-1,v;n>=0;n--)(v=c[n])&&(r=(o?v(i,t,r):v(r))||r);return o&&r&&y(i,t,r),r},e=(c,i)=>(t,o)=>i(t,o,c);import{AbstractTextFileService as L}from"./textFileService.js";import{ITextFileService as x,TextFileEditorModelState as D}from"../common/textfiles.js";import{InstantiationType as T,registerSingleton as b}from"../../../../platform/instantiation/common/extensions.js";import{IWorkbenchEnvironmentService as k}from"../../environment/common/environmentService.js";import{ICodeEditorService as U}from"../../../../editor/browser/services/codeEditorService.js";import{IModelService as W}from"../../../../editor/common/services/model.js";import{ILanguageService as M}from"../../../../editor/common/languages/language.js";import{ITextResourceConfigurationService as P}from"../../../../editor/common/services/textResourceConfiguration.js";import{IDialogService as A,IFileDialogService as N}from"../../../../platform/dialogs/common/dialogs.js";import{IFileService as R}from"../../../../platform/files/common/files.js";import{IInstantiationService as _}from"../../../../platform/instantiation/common/instantiation.js";import{ILogService as G}from"../../../../platform/log/common/log.js";import{IElevatedFileService as V}from"../../files/common/elevatedFileService.js";import{IFilesConfigurationService as j}from"../../filesConfiguration/common/filesConfigurationService.js";import{ILifecycleService as q}from"../../lifecycle/common/lifecycle.js";import{IPathService as w}from"../../path/common/pathService.js";import{IUntitledTextEditorService as z}from"../../untitled/common/untitledTextEditorService.js";import{IUriIdentityService as B}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{IWorkingCopyFileService as H}from"../../workingCopy/common/workingCopyFileService.js";import{IDecorationsService as J}from"../../decorations/common/decorations.js";let m=class extends L{constructor(i,t,o,r,n,v,S,a,f,l,s,p,d,g,u,h,E,F){super(i,t,o,r,n,v,S,a,f,l,s,p,d,g,u,E,h,F),this.registerListeners()}registerListeners(){this._register(this.lifecycleService.onBeforeShutdown(i=>i.veto(this.onBeforeShutdown(),"veto.textFiles")))}onBeforeShutdown(){return!!this.files.models.some(i=>i.hasState(D.PENDING_SAVE))}};m=I([e(0,R),e(1,z),e(2,q),e(3,_),e(4,W),e(5,k),e(6,A),e(7,N),e(8,P),e(9,j),e(10,U),e(11,w),e(12,H),e(13,B),e(14,M),e(15,V),e(16,G),e(17,J)],m),b(x,m,T.Eager);export{m as BrowserTextFileService};