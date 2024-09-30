var Ie=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var L=(i,t,e,o)=>{for(var r=o>1?void 0:o?Ee(t,e):t,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(t,e,r):n(r))||r);return o&&r&&Ie(t,e,r),r},g=(i,t)=>(e,o)=>t(e,o,i);import{Iterable as he}from"../../../../base/common/iterator.js";import{KeyCode as p,KeyMod as h}from"../../../../base/common/keyCodes.js";import{Disposable as ie}from"../../../../base/common/lifecycle.js";import{parse as be}from"../../../../base/common/marshalling.js";import{Schemas as T}from"../../../../base/common/network.js";import{extname as G,isEqual as ye}from"../../../../base/common/resources.js";import{isFalsyOrWhitespace as Ce}from"../../../../base/common/strings.js";import{URI as b}from"../../../../base/common/uri.js";import{IBulkEditService as we}from"../../../../editor/browser/services/bulkEditService.js";import{EditOperation as Se}from"../../../../editor/common/core/editOperation.js";import{PLAINTEXT_LANGUAGE_ID as ke}from"../../../../editor/common/languages/modesRegistry.js";import"../../../../editor/common/model.js";import{IModelService as xe}from"../../../../editor/common/services/model.js";import{ITextModelService as Te}from"../../../../editor/common/services/resolverService.js";import{peekViewBorder as K}from"../../../../editor/contrib/peekView/browser/peekView.js";import{Context as re}from"../../../../editor/contrib/suggest/browser/suggest.js";import{localize as y,localize2 as R}from"../../../../nls.js";import"../../../../platform/action/common/action.js";import{Action2 as C,MenuId as $,registerAction2 as w}from"../../../../platform/actions/common/actions.js";import{IConfigurationService as Re}from"../../../../platform/configuration/common/configuration.js";import{Extensions as Oe}from"../../../../platform/configuration/common/configurationRegistry.js";import{ContextKeyExpr as a}from"../../../../platform/contextkey/common/contextkey.js";import{EditorActivation as We}from"../../../../platform/editor/common/editor.js";import{SyncDescriptor as De}from"../../../../platform/instantiation/common/descriptors.js";import{InstantiationType as ne,registerSingleton as ce}from"../../../../platform/instantiation/common/extensions.js";import{IInstantiationService as se}from"../../../../platform/instantiation/common/instantiation.js";import{KeybindingWeight as D}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{ILogService as Ne}from"../../../../platform/log/common/log.js";import{Registry as j}from"../../../../platform/registry/common/platform.js";import{contrastBorder as de,ifDefinedThenElse as F,listInactiveSelectionBackground as q,registerColor as ae}from"../../../../platform/theme/common/colorRegistry.js";import{EditorPaneDescriptor as Pe}from"../../../browser/editor.js";import{WorkbenchPhase as Ue,registerWorkbenchContribution2 as Q}from"../../../common/contributions.js";import{EditorExtensions as le,EditorsOrder as Y}from"../../../common/editor.js";import"../../../common/editor/editorInput.js";import{PANEL_BORDER as ue}from"../../../common/theme.js";import{ResourceNotebookCellEdit as _e}from"../../bulkEdit/browser/bulkCellEdits.js";import{InteractiveWindowSetting as J,INTERACTIVE_INPUT_CURSOR_BOUNDARY as _}from"./interactiveCommon.js";import{IInteractiveDocumentService as Ae,InteractiveDocumentService as Me}from"./interactiveDocumentService.js";import{InteractiveEditor as Ve}from"./interactiveEditor.js";import{InteractiveEditorInput as m}from"./interactiveEditorInput.js";import{IInteractiveHistoryService as B,InteractiveHistoryService as Be}from"./interactiveHistoryService.js";import{NOTEBOOK_EDITOR_WIDGET_ACTION_WEIGHT as X}from"../../notebook/browser/controller/coreActions.js";import"../../notebook/browser/notebookBrowser.js";import*as Le from"../../notebook/browser/notebookIcons.js";import{INotebookEditorService as Ke}from"../../notebook/browser/services/notebookEditorService.js";import{CellEditType as Fe,CellKind as qe,CellUri as pe,INTERACTIVE_WINDOW_EDITOR_ID as Z,NotebookSetting as He,NotebookWorkingCopyTypeIdentifier as ze}from"../../notebook/common/notebookCommon.js";import{InteractiveWindowOpen as Ge,IS_COMPOSITE_NOTEBOOK as H,NOTEBOOK_EDITOR_FOCUSED as z}from"../../notebook/common/notebookContextKeys.js";import{INotebookKernelService as $e}from"../../notebook/common/notebookKernelService.js";import{INotebookService as je}from"../../notebook/common/notebookService.js";import{columnToEditorGroup as Qe}from"../../../services/editor/common/editorGroupColumn.js";import{IEditorGroupsService as Ye}from"../../../services/editor/common/editorGroupsService.js";import{IEditorResolverService as Je,RegisteredEditorPriority as ee}from"../../../services/editor/common/editorResolverService.js";import{IEditorService as I}from"../../../services/editor/common/editorService.js";import{IExtensionService as Xe}from"../../../services/extensions/common/extensions.js";import"../../../services/workingCopy/common/workingCopy.js";import{IWorkingCopyEditorService as Ze}from"../../../services/workingCopy/common/workingCopyEditorService.js";import{isReplEditorControl as S}from"../../replNotebook/browser/replEditor.js";import{InlineChatController as et}from"../../inlineChat/browser/inlineChatController.js";import{IsLinuxContext as tt,IsWindowsContext as ot}from"../../../../platform/contextkey/common/contextkeys.js";const k=R("interactiveWindow","Interactive Window");j.as(le.EditorPane).registerEditorPane(Pe.create(Ve,Z,"Interactive Window"),[new De(m)]);let A=class extends ie{constructor(e,o,r,s){super();this.instantiationService=s;e.getContributedNotebookType("interactive")||this._register(e.registerContributedNotebookType("interactive",{providerDisplayName:"Interactive Notebook",displayName:"Interactive",filenamePattern:["*.interactive"],priority:ee.builtin})),o.registerEditor(`${T.vscodeInteractiveInput}:/**`,{id:"vscode-interactive-input",label:"Interactive Editor",priority:ee.exclusive},{canSupportResource:c=>c.scheme===T.vscodeInteractiveInput,singlePerResource:!0},{createEditorInput:({resource:c})=>r.getEditors(Y.SEQUENTIAL).find(l=>l.editor instanceof m&&l.editor.inputResource.toString()===c.toString())}),o.registerEditor("*.interactive",{id:"interactive",label:"Interactive Editor",priority:ee.exclusive},{canSupportResource:c=>c.scheme===T.untitled&&G(c)===".interactive"||c.scheme===T.vscodeNotebookCell&&G(c)===".interactive",singlePerResource:!0},{createEditorInput:({resource:c,options:d})=>{const l=pe.parse(c);let f,u=c;l&&(f={resource:c,options:d},u=l.notebook);const E={...d,cellOptions:f,cellRevealType:void 0,cellSelections:void 0,isReadOnly:void 0,viewState:void 0,indexedCellOptions:void 0};return{editor:te(u,this.instantiationService),options:E}},createUntitledEditorInput:({resource:c,options:d})=>{if(!c)throw new Error("Interactive window editors must have a resource name");const l=pe.parse(c);let f;l&&(f={resource:c,options:d});const u={...d,cellOptions:f,cellRevealType:void 0,cellSelections:void 0,isReadOnly:void 0,viewState:void 0,indexedCellOptions:void 0};return{editor:te(c,this.instantiationService),options:u}}})}static ID="workbench.contrib.interactiveDocument"};A=L([g(0,je),g(1,Je),g(2,I),g(3,se)],A);let M=class{constructor(t,e){this._modelService=e;this._registration=t.registerTextModelContentProvider(T.vscodeInteractiveInput,this)}static ID="workbench.contrib.interactiveInputContentProvider";_registration;dispose(){this._registration.dispose()}async provideTextContent(t){const e=this._modelService.getModel(t);return e||this._modelService.createModel("",null,t,!1)}};M=L([g(0,Te),g(1,xe)],M);function te(i,t){const e=/\/Interactive-(\d+)/.exec(i.path),o=e&&e[1]?`/InteractiveInput-${e[1]}`:"InteractiveInput",r=b.from({scheme:T.vscodeInteractiveInput,path:o});return m.create(t,i,r)}let V=class extends ie{constructor(e,o,r){super();this._instantiationService=e;this._workingCopyEditorService=o;this._extensionService=r;this._installHandler()}static ID="workbench.contrib.interactiveWindowWorkingCopyEditorHandler";handles(e){const o=this._getViewType(e);return!!o&&o==="interactive"}isOpen(e,o){return this.handles(e)?o instanceof m&&ye(e.resource,o.resource):!1}createEditor(e){return te(e.resource,this._instantiationService)}async _installHandler(){await this._extensionService.whenInstalledExtensionsRegistered(),this._register(this._workingCopyEditorService.registerHandler(this))}_getViewType(e){return ze.parse(e.typeId)?.viewType}};V=L([g(0,se),g(1,Ze),g(2,Xe)],V),Q(A.ID,A,Ue.BlockRestore),Q(M.ID,M,{editorTypeId:Z}),Q(V.ID,V,{editorTypeId:Z});class ve{static ID=m.ID;canSerialize(t){return t instanceof m?b.isUri(t.primary.resource)&&b.isUri(t.inputResource):!1}serialize(t){if(this.canSerialize(t))return JSON.stringify({resource:t.primary.resource,inputResource:t.inputResource,name:t.getName(),language:t.language})}deserialize(t,e){const o=be(e);if(!o)return;const{resource:r,inputResource:s,name:n,language:c}=o;return!b.isUri(r)||!b.isUri(s)?void 0:m.create(t,r,s,n,c)}}j.as(le.EditorFactory).registerEditorSerializer(ve.ID,ve),ce(B,Be,ne.Delayed),ce(Ae,Me,ne.Delayed),w(class extends C{constructor(){super({id:"_interactive.open",title:R("interactive.open","Open Interactive Window"),f1:!1,category:k,metadata:{description:y("interactive.open","Open Interactive Window"),args:[{name:"showOptions",description:"Show Options",schema:{type:"object",properties:{viewColumn:{type:"number",default:-1},preserveFocus:{type:"boolean",default:!0}}}},{name:"resource",description:"Interactive resource Uri",isOptional:!0},{name:"controllerId",description:"Notebook controller Id",isOptional:!0},{name:"title",description:"Notebook editor title",isOptional:!0}]}})}async run(i,t,e,o,r){const s=i.get(I),n=i.get(Ye),c=i.get(B),d=i.get($e),l=i.get(Ne),f=i.get(Re),u=Qe(n,f,typeof t=="number"?t:t?.viewColumn),E={activation:We.PRESERVE,preserveFocus:typeof t!="number"?t?.preserveFocus??!1:!1};if(e&&G(e)===".interactive"){l.debug("Open interactive window from resource:",e.toString());const P=b.revive(e),U=s.findEditors(P).filter(x=>x.editor instanceof m&&x.editor.resource?.toString()===P.toString());if(U.length){l.debug("Find existing interactive window:",e.toString());const x=U[0].editor,fe=U[0].groupId,ge=(await s.openEditor(x,E,fe))?.getControl();return{notebookUri:x.resource,inputUri:x.inputResource,notebookEditorId:ge?.notebookEditor?.getId()}}}const N=new Set;s.getEditors(Y.SEQUENTIAL).forEach(P=>{P.editor.resource&&N.add(P.editor.resource.toString())});let v,O,W=1;do v=b.from({scheme:T.untitled,path:`/Interactive-${W}.interactive`}),O=b.from({scheme:T.vscodeInteractiveInput,path:`/InteractiveInput-${W}`}),W++;while(N.has(v.toString()));if(m.setName(v,r),l.debug("Open new interactive window:",v.toString(),O.toString()),o){const U=d.getMatchingKernel({uri:v,notebookType:"interactive"}).all.find(x=>x.id===o);U&&d.preselectKernelForNotebook(U,{uri:v,notebookType:"interactive"})}c.clearHistory(v);const me={resource:v,options:E},oe=(await s.openEditor(me,u))?.getControl();return l.debug("New interactive window opened. Notebook editor id",oe?.notebookEditor?.getId()),{notebookUri:v,inputUri:O,notebookEditorId:oe?.notebookEditor?.getId()}}}),w(class extends C{constructor(){super({id:"interactive.execute",title:R("interactive.execute","Execute Code"),category:k,keybinding:[{when:a.equals("activeEditor","workbench.editor.interactive"),primary:h.CtrlCmd|p.Enter,weight:X},{when:a.and(a.equals("activeEditor","workbench.editor.interactive"),a.equals("config.interactiveWindow.executeWithShiftEnter",!0)),primary:h.Shift|p.Enter,weight:X},{when:a.and(a.equals("activeEditor","workbench.editor.interactive"),a.equals("config.interactiveWindow.executeWithShiftEnter",!1)),primary:p.Enter,weight:X}],menu:[{id:$.InteractiveInputExecute}],icon:Le.executeIcon,f1:!1,metadata:{description:"Execute the Contents of the Input Box",args:[{name:"resource",description:"Interactive resource Uri",isOptional:!0}]}})}async run(i,t){const e=i.get(I),o=i.get(we),r=i.get(B),s=i.get(Ke);let n;if(t){const c=b.revive(t),d=e.findEditors(c);for(const l of d)if(l.editor.typeId===m.ID){n=(await e.openEditor(l.editor,l.groupId))?.getControl();break}}else n=e.activeEditorPane?.getControl();if(n&&S(n)&&n.notebookEditor){const c=n.notebookEditor.textModel,d=n.activeCodeEditor.getModel(),f=n.notebookEditor.activeKernel?.supportedLanguages[0]??ke;if(c&&d){const u=c.length,E=d.getValue();if(Ce(E))return;const N=et.get(n.activeCodeEditor);N&&N.acceptHunk(),r.replaceLast(c.uri,E),r.addToHistory(c.uri,""),d.setValue("");const v=n.notebookEditor.notebookOptions.getDisplayOptions().interactiveWindowCollapseCodeCells==="fromEditor"?{inputCollapsed:!1,outputCollapsed:!1}:void 0;await o.apply([new _e(c.uri,{editType:Fe.Replace,index:u,count:0,cells:[{cellKind:qe.Code,mime:void 0,language:f,source:E,outputs:[],metadata:{},collapseState:v}]})]);const O={start:u,end:u+1};n.notebookEditor.revealCellRangeInView(O),await n.notebookEditor.executeNotebookCells(n.notebookEditor.getCellsInRange({start:u,end:u+1}));const W=s.getNotebookEditor(n.notebookEditor.getId());W&&(W.setSelections([O]),W.setFocus(O))}}}}),w(class extends C{constructor(){super({id:"interactive.input.clear",title:R("interactive.input.clear","Clear the interactive window input editor contents"),category:k,f1:!1})}async run(i){const e=i.get(I).activeEditorPane?.getControl();if(e&&S(e)&&e.notebookEditor){const o=e.notebookEditor.textModel,r=e.activeCodeEditor.getModel(),s=e.activeCodeEditor.getModel()?.getFullModelRange();o&&r&&s&&e.activeCodeEditor.executeEdits("",[Se.replace(s,null)])}}}),w(class extends C{constructor(){super({id:"interactive.history.previous",title:R("interactive.history.previous","Previous value in history"),category:k,f1:!1,keybinding:{when:a.and(_.notEqualsTo("bottom"),_.notEqualsTo("none"),re.Visible.toNegated()),primary:p.UpArrow,weight:D.WorkbenchContrib},precondition:a.and(H,z.negate())})}async run(i){const t=i.get(I),e=i.get(B),o=t.activeEditorPane?.getControl();if(o&&S(o)&&o.notebookEditor){const r=o.notebookEditor.textModel,s=o.activeCodeEditor.getModel();if(r&&s){const n=e.getPreviousValue(r.uri);n&&s.setValue(n)}}}}),w(class extends C{constructor(){super({id:"interactive.history.next",title:R("interactive.history.next","Next value in history"),category:k,f1:!1,keybinding:{when:a.and(_.notEqualsTo("top"),_.notEqualsTo("none"),re.Visible.toNegated()),primary:p.DownArrow,weight:D.WorkbenchContrib},precondition:a.and(H,z.negate())})}async run(i){const t=i.get(I),e=i.get(B),o=t.activeEditorPane?.getControl();if(o&&S(o)&&o.notebookEditor){const r=o.notebookEditor.textModel,s=o.activeCodeEditor.getModel();if(r&&s){const n=e.getNextValue(r.uri);n!==null&&s.setValue(n)}}}}),w(class extends C{constructor(){super({id:"interactive.scrollToTop",title:y("interactiveScrollToTop","Scroll to Top"),keybinding:{when:a.equals("activeEditor","workbench.editor.interactive"),primary:h.CtrlCmd|p.Home,mac:{primary:h.CtrlCmd|p.UpArrow},weight:D.WorkbenchContrib},category:k})}async run(i){const e=i.get(I).activeEditorPane?.getControl();if(e&&S(e)&&e.notebookEditor){if(e.notebookEditor.getLength()===0)return;e.notebookEditor.revealCellRangeInView({start:0,end:1})}}}),w(class extends C{constructor(){super({id:"interactive.scrollToBottom",title:y("interactiveScrollToBottom","Scroll to Bottom"),keybinding:{when:a.equals("activeEditor","workbench.editor.interactive"),primary:h.CtrlCmd|p.End,mac:{primary:h.CtrlCmd|p.DownArrow},weight:D.WorkbenchContrib},category:k})}async run(i){const e=i.get(I).activeEditorPane?.getControl();if(e&&S(e)&&e.notebookEditor){if(e.notebookEditor.getLength()===0)return;const o=e.notebookEditor.getLength();e.notebookEditor.revealCellRangeInView({start:o-1,end:o})}}}),w(class extends C{constructor(){super({id:"interactive.input.focus",title:R("interactive.input.focus","Focus Input Editor"),category:k,menu:{id:$.CommandPalette,when:Ge},keybinding:{when:a.and(H,z),weight:D.WorkbenchContrib+5,primary:h.CtrlCmd|p.DownArrow}})}async run(i){const t=i.get(I),e=t.activeEditorPane?.getControl();if(e&&S(e)&&e.notebookEditor)t.activeEditorPane?.focus();else{const o=t.getEditors(Y.MOST_RECENTLY_ACTIVE),r=he.find(o,s=>s.editor.typeId===m.ID);if(r){const s=r.editor,n=r.groupId,d=(await t.openEditor(s,n))?.getControl();d&&S(d)&&d.notebookEditor&&t.activeEditorPane?.focus()}}}}),w(class extends C{constructor(){super({id:"interactive.history.focus",title:R("interactive.history.focus","Focus History"),category:k,menu:{id:$.CommandPalette,when:a.equals("activeEditor","workbench.editor.interactive")},keybinding:[{when:a.and(_.notEqualsTo("bottom"),_.notEqualsTo("none")),weight:D.WorkbenchContrib+5,primary:h.CtrlCmd|p.UpArrow},{when:a.or(ot,tt),weight:D.WorkbenchContrib,primary:h.CtrlCmd|p.UpArrow}],precondition:a.and(H,z.negate())})}async run(i){const e=i.get(I).activeEditorPane?.getControl();e&&S(e)&&e.notebookEditor&&e.notebookEditor.focus()}}),ae("interactive.activeCodeBorder",{dark:F(K,K,"#007acc"),light:F(K,K,"#007acc"),hcDark:de,hcLight:de},y("interactive.activeCodeBorder","The border color for the current interactive code cell when the editor has focus.")),ae("interactive.inactiveCodeBorder",{dark:F(q,q,"#37373D"),light:F(q,q,"#E4E6F1"),hcDark:ue,hcLight:ue},y("interactive.inactiveCodeBorder","The border color for the current interactive code cell when the editor does not have focus.")),j.as(Oe.Configuration).registerConfiguration({id:"interactiveWindow",order:100,type:"object",properties:{[J.interactiveWindowAlwaysScrollOnNewCell]:{type:"boolean",default:!0,markdownDescription:y("interactiveWindow.alwaysScrollOnNewCell","Automatically scroll the interactive window to show the output of the last statement executed. If this value is false, the window will only scroll if the last cell was already the one scrolled to.")},[He.InteractiveWindowPromptToSave]:{type:"boolean",default:!1,markdownDescription:y("interactiveWindow.promptToSaveOnClose","Prompt to save the interactive window when it is closed. Only new interactive windows will be affected by this setting change.")},[J.executeWithShiftEnter]:{type:"boolean",default:!1,markdownDescription:y("interactiveWindow.executeWithShiftEnter","Execute the Interactive Window (REPL) input box with shift+enter, so that enter can be used to create a newline."),tags:["replExecute"]},[J.showExecutionHint]:{type:"boolean",default:!0,markdownDescription:y("interactiveWindow.showExecutionHint","Display a hint in the Interactive Window (REPL) input box to indicate how to execute code."),tags:["replExecute"]}}});export{A as InteractiveDocumentContribution,ve as InteractiveEditorSerializer};