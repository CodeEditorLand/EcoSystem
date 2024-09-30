import{localize as I}from"../../nls.js";import"../../base/common/event.js";import{assertIsDefined as O}from"../../base/common/types.js";import{URI as u}from"../../base/common/uri.js";import{Disposable as v,toDisposable as U}from"../../base/common/lifecycle.js";import"../../editor/common/editorCommon.js";import"../../platform/editor/common/editor.js";import{IInstantiationService as b}from"../../platform/instantiation/common/instantiation.js";import"../../platform/contextkey/common/contextkey.js";import{Registry as D}from"../../platform/registry/common/platform.js";import"../services/textfile/common/textfiles.js";import"../services/editor/common/editorGroupsService.js";import"./composite.js";import{FileType as l}from"../../platform/files/common/files.js";import"../../platform/window/common/window.js";import"../../base/common/resources.js";import{Schemas as T}from"../../base/common/network.js";import"../services/editor/common/editorService.js";import"../../platform/log/common/log.js";import{createErrorWithActions as h,isErrorWithActions as P}from"../../base/common/errorMessage.js";import{toAction as m}from"../../base/common/actions.js";import A from"../../base/common/severity.js";import"../services/preferences/common/preferences.js";import"./editor/editorGroupModel.js";const B={EditorPane:"workbench.contributions.editors",EditorFactory:"workbench.contributions.editor.inputFactories"},tr={id:"default",displayName:I("promptOpenWith.defaultEditor.displayName","Text Editor"),providerDisplayName:I("builtinProviderDisplayName","Built-in")},ir="workbench.editor.sidebysideEditor",or="workbench.editors.textDiffEditor",nr="workbench.editors.binaryResourceDiffEditor";var w=(d=>(d[d.PROGRAMMATIC=1]="PROGRAMMATIC",d[d.USER=2]="USER",d[d.EDIT=3]="EDIT",d[d.NAVIGATION=4]="NAVIGATION",d[d.JUMP=5]="JUMP",d))(w||{}),F=(t=>(t[t.IDENTICAL=1]="IDENTICAL",t[t.SIMILAR=2]="SIMILAR",t[t.DIFFERENT=3]="DIFFERENT",t))(F||{});function dr(i){const e=i;return!!e&&typeof e.getSelection=="function"&&!!e.onDidChangeSelection}function sr(i){const e=i;return!!e&&typeof e.getScrollPosition=="function"&&typeof e.setScrollPosition=="function"&&!!e.onDidChangeScroll}function ar(i,e,r){for(const t of r.visibleEditorPanes)if(t.group.id===e&&i.matches(t.input))return t.getViewState()}function ur(i){if(a(i))return!1;const e=i;return u.isUri(e?.resource)}function p(i){if(a(i))return!1;const e=i;return e?.original!==void 0&&e.modified!==void 0}function g(i){if(a(i))return!1;const e=i;return!e||e.resources&&!Array.isArray(e.resources)?!1:!!e.resources||!!e.multiDiffSource}function S(i){if(a(i)||p(i))return!1;const e=i;return e?.primary!==void 0&&e.secondary!==void 0}function cr(i){if(a(i))return!1;const e=i;return e?e.resource===void 0||e.resource.scheme===T.untitled||e.forceUntitled===!0:!1}function f(i){if(a(i))return!1;const e=i;return u.isUri(e?.base?.resource)&&u.isUri(e?.input1?.resource)&&u.isUri(e?.input2?.resource)&&u.isUri(e?.result?.resource)}var N=(t=>(t[t.SHORT=0]="SHORT",t[t.MEDIUM=1]="MEDIUM",t[t.LONG=2]="LONG",t))(N||{}),z=(o=>(o[o.EXPLICIT=1]="EXPLICIT",o[o.AUTO=2]="AUTO",o[o.FOCUS_CHANGE=3]="FOCUS_CHANGE",o[o.WINDOW_CHANGE=4]="WINDOW_CHANGE",o))(z||{});class L{mapIdToSaveSource=new Map;registerSource(e,r){let t=this.mapIdToSaveSource.get(e);return t||(t={source:e,label:r},this.mapIdToSaveSource.set(e,t)),t.source}getSourceLabel(e){return this.mapIdToSaveSource.get(e)?.label??e}}const Ir=new L;var W=(s=>(s[s.None=0]="None",s[s.Readonly=2]="Readonly",s[s.Untitled=4]="Untitled",s[s.Singleton=8]="Singleton",s[s.RequiresTrust=16]="RequiresTrust",s[s.CanSplitInGroup=32]="CanSplitInGroup",s[s.ForceDescription=64]="ForceDescription",s[s.CanDropIntoEditor=128]="CanDropIntoEditor",s[s.MultipleEditors=256]="MultipleEditors",s[s.Scratchpad=512]="Scratchpad",s))(W||{});class k extends v{}function a(i){return i instanceof k}function _(i){const e=i;return u.isUri(e?.preferredResource)}function C(i){const e=i;return a(e?.primary)&&a(e?.secondary)}function Y(i){const e=i;return a(e?.modified)&&a(e?.original)}function pr(i,e,r,t,o){return Z(t,[m({id:"workbench.action.openLargeFile",label:I("openLargeFile","Open Anyway"),run:()=>{const d={...r,limits:{size:Number.MAX_VALUE}};i.openEditor(e,d)}}),m({id:"workbench.action.configureEditorLargeFileConfirmation",label:I("configureEditorLargeFileConfirmation","Configure Limit"),run:()=>o.openUserSettings({query:"workbench.editorLargeFileConfirmation"})})],{forceMessage:!0,forceSeverity:A.Warning})}function M(i){return a(i?.editor)}function fr(i){const e=i;return M(i)&&e?.group!==void 0}function Er(i){const e=i;return typeof e?.groupId=="number"&&a(e.editor)}function lr(i){return typeof i?.groupId=="number"}var V=(o=>(o[o.UNKNOWN=0]="UNKNOWN",o[o.REPLACE=1]="REPLACE",o[o.MOVE=2]="MOVE",o[o.UNPIN=3]="UNPIN",o))(V||{}),H=(n=>(n[n.GROUP_ACTIVE=0]="GROUP_ACTIVE",n[n.GROUP_INDEX=1]="GROUP_INDEX",n[n.GROUP_LABEL=2]="GROUP_LABEL",n[n.GROUP_LOCKED=3]="GROUP_LOCKED",n[n.EDITORS_SELECTION=4]="EDITORS_SELECTION",n[n.EDITOR_OPEN=5]="EDITOR_OPEN",n[n.EDITOR_CLOSE=6]="EDITOR_CLOSE",n[n.EDITOR_MOVE=7]="EDITOR_MOVE",n[n.EDITOR_ACTIVE=8]="EDITOR_ACTIVE",n[n.EDITOR_LABEL=9]="EDITOR_LABEL",n[n.EDITOR_CAPABILITIES=10]="EDITOR_CAPABILITIES",n[n.EDITOR_PIN=11]="EDITOR_PIN",n[n.EDITOR_TRANSIENT=12]="EDITOR_TRANSIENT",n[n.EDITOR_STICKY=13]="EDITOR_STICKY",n[n.EDITOR_DIRTY=14]="EDITOR_DIRTY",n[n.EDITOR_WILL_DISPOSE=15]="EDITOR_WILL_DISPOSE",n))(H||{}),G=(o=>(o[o.PRIMARY=1]="PRIMARY",o[o.SECONDARY=2]="SECONDARY",o[o.BOTH=3]="BOTH",o[o.ANY=4]="ANY",o))(G||{});class q{getOriginalUri(e,r){if(!e)return;if(f(e))return R.getOriginalUri(e.result,r);if(r?.supportSideBySide){const{primary:o,secondary:d}=this.getSideEditors(e);if(o&&d){if(r?.supportSideBySide===3)return{primary:this.getOriginalUri(o,{filterByScheme:r.filterByScheme}),secondary:this.getOriginalUri(d,{filterByScheme:r.filterByScheme})};if(r?.supportSideBySide===4)return this.getOriginalUri(o,{filterByScheme:r.filterByScheme})??this.getOriginalUri(d,{filterByScheme:r.filterByScheme});e=r.supportSideBySide===1?o:d}}if(p(e)||g(e)||S(e)||f(e))return;const t=_(e)?e.preferredResource:e.resource;return!t||!r||!r.filterByScheme?t:this.filterUri(t,r.filterByScheme)}getSideEditors(e){return C(e)||S(e)?{primary:e.primary,secondary:e.secondary}:Y(e)||p(e)?{primary:e.modified,secondary:e.original}:{primary:void 0,secondary:void 0}}getCanonicalUri(e,r){if(!e)return;if(f(e))return R.getCanonicalUri(e.result,r);if(r?.supportSideBySide){const{primary:o,secondary:d}=this.getSideEditors(e);if(o&&d){if(r?.supportSideBySide===3)return{primary:this.getCanonicalUri(o,{filterByScheme:r.filterByScheme}),secondary:this.getCanonicalUri(d,{filterByScheme:r.filterByScheme})};if(r?.supportSideBySide===4)return this.getCanonicalUri(o,{filterByScheme:r.filterByScheme})??this.getCanonicalUri(d,{filterByScheme:r.filterByScheme});e=r.supportSideBySide===1?o:d}}if(p(e)||g(e)||S(e)||f(e))return;const t=e.resource;return!t||!r||!r.filterByScheme?t:this.filterUri(t,r.filterByScheme)}filterUri(e,r){if(Array.isArray(r)){if(r.some(t=>e.scheme===t))return e}else if(r===e.scheme)return e}}var j=(t=>(t[t.UNKNOWN=0]="UNKNOWN",t[t.KEYBOARD=1]="KEYBOARD",t[t.MOUSE=2]="MOUSE",t))(j||{});function Sr(i,e,r,t){if(!i.isSticky(e))return!1;switch(t.preventPinnedEditorClose){case"keyboardAndMouse":return r===2||r===1;case"mouse":return r===2;case"keyboard":return r===1}return!1}const R=new q;var X=(r=>(r[r.LEFT=0]="LEFT",r[r.RIGHT=1]="RIGHT",r))(X||{});class Q{instantiationService;fileEditorFactory;editorSerializerConstructors=new Map;editorSerializerInstances=new Map;start(e){const r=this.instantiationService=e.get(b);for(const[t,o]of this.editorSerializerConstructors)this.createEditorSerializer(t,o,r);this.editorSerializerConstructors.clear()}createEditorSerializer(e,r,t){const o=t.createInstance(r);this.editorSerializerInstances.set(e,o)}registerFileEditorFactory(e){if(this.fileEditorFactory)throw new Error("Can only register one file editor factory.");this.fileEditorFactory=e}getFileEditorFactory(){return O(this.fileEditorFactory)}registerEditorSerializer(e,r){if(this.editorSerializerConstructors.has(e)||this.editorSerializerInstances.has(e))throw new Error(`A editor serializer with type ID '${e}' was already registered.`);return this.instantiationService?this.createEditorSerializer(e,r,this.instantiationService):this.editorSerializerConstructors.set(e,r),U(()=>{this.editorSerializerConstructors.delete(e),this.editorSerializerInstances.delete(e)})}getEditorSerializer(e){return this.editorSerializerInstances.get(typeof e=="string"?e:e.typeId)}}D.add(B.EditorFactory,new Q);async function yr(i,e,r){return!i||!i.length?[]:await Promise.all(i.map(async t=>{const o=u.revive(t.fileUri);if(!o){r.info("Cannot resolve the path because it is not valid.",t);return}if(!await e.canHandleResource(o)){r.info("Cannot resolve the path because it cannot be handled",t);return}let c=t.exists,E=t.type;if(typeof c!="boolean"||typeof E!="number")try{E=(await e.stat(o)).isDirectory?l.Directory:l.Unknown,c=!0}catch(x){r.error(x),c=!1}if(!c&&t.openOnlyIfExists){r.info("Cannot resolve the path because it does not exist",t);return}if(E===l.Directory){r.info("Cannot resolve the path because it is a directory",t);return}const y={...t.options,pinned:!0};return c?{resource:o,options:y}:{resource:o,options:y,forceUntitled:!0}}))}var J=(r=>(r[r.MOST_RECENTLY_ACTIVE=0]="MOST_RECENTLY_ACTIVE",r[r.SEQUENTIAL=1]="SEQUENTIAL",r))(J||{});function $(i){const e=i;if(!e)return!1;const r=e;if(r.modified)return $(r.modified);const t=e;return!!(t.contributionsState&&t.viewState&&Array.isArray(t.cursorState))}function mr(i){return P(i)}function Z(i,e,r){const t=h(i,e);return t.forceMessage=r?.forceMessage,t.forceSeverity=r?.forceSeverity,t.allowDialog=r?.allowDialog,t}export{k as AbstractEditorInput,nr as BINARY_DIFF_EDITOR_ID,X as CloseDirection,tr as DEFAULT_EDITOR_ASSOCIATION,V as EditorCloseContext,j as EditorCloseMethod,B as EditorExtensions,W as EditorInputCapabilities,w as EditorPaneSelectionChangeReason,F as EditorPaneSelectionCompareResult,R as EditorResourceAccessor,J as EditorsOrder,H as GroupModelChangeKind,ir as SIDE_BY_SIDE_EDITOR_ID,z as SaveReason,Ir as SaveSourceRegistry,G as SideBySideEditor,or as TEXT_DIFF_EDITOR_ID,N as Verbosity,Z as createEditorOpenError,pr as createTooLargeFileError,ar as findViewStateForEditor,Y as isDiffEditorInput,lr as isEditorCommandsContext,Er as isEditorIdentifier,a as isEditorInput,M as isEditorInputWithOptions,fr as isEditorInputWithOptionsAndGroup,mr as isEditorOpenError,sr as isEditorPaneWithScrolling,dr as isEditorPaneWithSelection,p as isResourceDiffEditorInput,ur as isResourceEditorInput,f as isResourceMergeEditorInput,g as isResourceMultiDiffEditorInput,S as isResourceSideBySideEditorInput,C as isSideBySideEditorInput,$ as isTextEditorViewState,cr as isUntitledResourceEditorInput,yr as pathsToEditors,Sr as preventEditorClose};