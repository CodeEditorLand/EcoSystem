import"../../../../base/common/uri.js";import"../../../../base/common/event.js";import"../../../../base/common/lifecycle.js";import"../../../common/editor.js";import"../../../../base/common/stream.js";import{FileOperationError as d,FileOperationResult as s}from"../../../../platform/files/common/files.js";import{createDecorator as l}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../editor/common/services/resolverService.js";import"../../../../editor/common/model.js";import{VSBuffer as i}from"../../../../base/common/buffer.js";import{areFunctions as I,isUndefinedOrNull as p}from"../../../../base/common/types.js";import"../../workingCopy/common/workingCopy.js";import"../../untitled/common/untitledTextEditorService.js";import"../../../../base/common/cancellation.js";import"../../../../platform/progress/common/progress.js";import"../../workingCopy/common/workingCopyFileService.js";const re=l("textFileService");var x=(e=>(e[e.FILE_IS_BINARY=0]="FILE_IS_BINARY",e))(x||{});class ne extends d{constructor(t,n,a){super(t,s.FILE_OTHER_ERROR);this.textFileOperationResult=n;this.options=a}static isTextFileOperationError(t){return t instanceof Error&&!p(t.textFileOperationResult)}options}var c=(o=>(o[o.SAVED=0]="SAVED",o[o.DIRTY=1]="DIRTY",o[o.PENDING_SAVE=2]="PENDING_SAVE",o[o.CONFLICT=3]="CONFLICT",o[o.ORPHAN=4]="ORPHAN",o[o.ERROR=5]="ERROR",o))(c||{}),f=(n=>(n[n.EDITOR=1]="EDITOR",n[n.REFERENCE=2]="REFERENCE",n[n.OTHER=3]="OTHER",n))(f||{}),u=(t=>(t[t.Encode=0]="Encode",t[t.Decode=1]="Decode",t))(u||{});function ie(r){const e=r;return I(e.setEncoding,e.getEncoding,e.save,e.revert,e.isDirty,e.getLanguageId)}function ae(r){const e=[];let t;for(;typeof(t=r.read())=="string";)e.push(t);return e.join("")}function de(r){let e=!1;return{read(){return e?null:(e=!0,r)}}}function se(r){if(!(typeof r>"u"))return typeof r=="string"?i.fromString(r):{read:()=>{const e=r.read();return typeof e=="string"?i.fromString(e):null}}}export{u as EncodingMode,re as ITextFileService,c as TextFileEditorModelState,ne as TextFileOperationError,x as TextFileOperationResult,f as TextFileResolveReason,ie as isTextFileEditorModel,ae as snapshotToString,de as stringToSnapshot,se as toBufferOrReadable};