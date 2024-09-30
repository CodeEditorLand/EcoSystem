var se=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var G=(n,e,o,t)=>{for(var i=t>1?void 0:t?ce(e,o):e,r=n.length-1,s;r>=0;r--)(s=n[r])&&(i=(t?s(e,o,i):s(i))||i);return t&&i&&se(e,o,i),i},Y=(n,e)=>(o,t)=>e(o,t,n);import{localize as E,localize2 as le}from"../../../../../../nls.js";import{Disposable as de}from"../../../../../../base/common/lifecycle.js";import{WorkbenchPhase as ae,registerWorkbenchContribution2 as ue}from"../../../../../common/contributions.js";import{IEditorService as j}from"../../../../../services/editor/common/editorService.js";import{NOTEBOOK_CELL_EDITABLE as fe,NOTEBOOK_EDITOR_EDITABLE as z,NOTEBOOK_EDITOR_FOCUSED as C,NOTEBOOK_OUTPUT_FOCUSED as pe}from"../../../common/notebookContextKeys.js";import{cellRangeToViewCells as X,expandCellRangesWithHiddenCells as $,getNotebookEditorFromEditorPane as q}from"../../notebookBrowser.js";import{CopyAction as M,CutAction as W,PasteAction as R}from"../../../../../../editor/contrib/clipboard/browser/clipboard.js";import{IClipboardService as J}from"../../../../../../platform/clipboard/common/clipboardService.js";import{cloneNotebookCellTextModel as F}from"../../../common/model/notebookCellTextModel.js";import{CellEditType as k,SelectionStateType as f}from"../../../common/notebookCommon.js";import{INotebookService as w}from"../../../common/notebookService.js";import*as L from"../../../../../../base/common/platform.js";import{Action2 as me,MenuId as D,registerAction2 as y}from"../../../../../../platform/actions/common/actions.js";import{CellOverflowToolbarGroups as K,NotebookAction as be,NotebookCellAction as N,NOTEBOOK_EDITOR_WIDGET_ACTION_WEIGHT as Ce,NOTEBOOK_OUTPUT_WEBVIEW_ACTION_WEIGHT as ge}from"../../controller/coreActions.js";import{KeyCode as a,KeyMod as d}from"../../../../../../base/common/keyCodes.js";import{ContextKeyExpr as p}from"../../../../../../platform/contextkey/common/contextkey.js";import{InputFocusedContextKey as O}from"../../../../../../platform/contextkey/common/contextkeys.js";import{KeybindingWeight as P}from"../../../../../../platform/keybinding/common/keybindingsRegistry.js";import"../../../../../../platform/instantiation/common/instantiation.js";import{RedoCommand as ve,UndoCommand as Ie}from"../../../../../../editor/browser/editorExtensions.js";import"../../../../webview/browser/webview.js";import{Categories as ke}from"../../../../../../platform/action/common/actionCommonCategories.js";import{ILogService as Q}from"../../../../../../platform/log/common/log.js";import{ICommandService as ye}from"../../../../../../platform/commands/common/commands.js";import{showWindowLogActionId as Se}from"../../../../../services/log/common/logConstants.js";import{getActiveElement as V,getWindow as Z,isAncestor as Ee,isEditableElement as B,isHTMLElement as we}from"../../../../../../base/browser/dom.js";let _=!1;function xe(){_=!_}function b(n,e){_&&n.info(`[NotebookClipboard]: ${e}`)}function ee(n){const e=n.get(Q),o=n.get(j),t=q(o.activeEditorPane);if(!t){b(e,"[Revive Webview] No notebook editor found for active editor pane, bypass");return}if(!t.hasEditorFocus()){b(e,"[Revive Webview] Notebook editor is not focused, bypass");return}if(!t.hasWebviewFocus()){b(e,"[Revive Webview] Notebook editor backlayer webview is not focused, bypass");return}const i=t.getViewModel();if(!(i&&i.viewCells.every(r=>!r.outputIsFocused&&!r.outputIsHovered)))return{editor:t,loggerService:e}}function he(n){const e=ee(n);if(!e)return;const o=e.editor.getInnerWebview();return b(e.loggerService,"[Revive Webview] Notebook editor backlayer webview is focused"),o}function x(n,e){const o=he(n);return o?(e(o),!0):!1}function Te(n,e){const o=ee(n);return o?e(o.editor):!1}const h=105;Ie.addImplementation(h,"notebook-webview",n=>x(n,e=>e.undo())),ve.addImplementation(h,"notebook-webview",n=>x(n,e=>e.redo())),M?.addImplementation(h,"notebook-webview",n=>x(n,e=>e.copy())),R?.addImplementation(h,"notebook-webview",n=>x(n,e=>e.paste())),W?.addImplementation(h,"notebook-webview",n=>x(n,e=>e.cut()));function te(n,e,o){if(!n.hasModel())return!1;const t=n.textModel;if(n.isReadOnly)return!1;const i={kind:f.Index,focus:n.getFocus(),selections:n.getSelections()};if(e){const r=n.getCellIndex(e),s=typeof r=="number"?r+1:0;t.applyEdits([{editType:k.Replace,index:s,count:0,cells:o.items.map(c=>F(c))}],!0,i,()=>({kind:f.Index,focus:{start:s,end:s+1},selections:[{start:s,end:s+o.items.length}]}),void 0,!0)}else{if(n.getLength()!==0)return!1;t.applyEdits([{editType:k.Replace,index:0,count:0,cells:o.items.map(r=>F(r))}],!0,i,()=>({kind:f.Index,focus:{start:0,end:1},selections:[{start:1,end:o.items.length+1}]}),void 0,!0)}return!0}function oe(n,e,o){if(!e.hasModel())return!1;if(e.hasOutputTextSelection())return Z(e.getDomNode()).document.execCommand("copy"),!0;const t=n.get(J),i=n.get(w),r=e.getSelections();if(o){const u=e.getCellIndex(o);if(!r.find(v=>v.start<=u&&u<v.end))return t.writeText(o.getText()),i.setToCopy([o.model],!0),!0}const s=$(e,e.getSelections()),c=X(e,s);return c.length?(t.writeText(c.map(u=>u.getText()).join(`
`)),i.setToCopy(c.map(u=>u.model),!0),!0):!1}function ne(n,e,o){if(!e.hasModel()||e.isReadOnly)return!1;const t=e.textModel,i=n.get(J),r=n.get(w),s=e.getSelections();if(o){const l=e.getCellIndex(o);if(!s.find(m=>m.start<=l&&l<m.end)){i.writeText(o.getText());const m=e.getFocus(),I=m.end<=l?m:{start:m.start-1,end:m.end-1},re=s.map(A=>A.end<=l?A:{start:A.start-1,end:A.end-1});return t.applyEdits([{editType:k.Replace,index:l,count:1,cells:[]}],!0,{kind:f.Index,focus:e.getFocus(),selections:s},()=>({kind:f.Index,focus:I,selections:re}),void 0,!0),r.setToCopy([o.model],!1),!0}}const c=e.getFocus();if(!s.find(l=>l.start<=c.start&&c.end<=l.end)){const l=e.cellAt(c.start);i.writeText(l.getText());const U=c.end===e.getLength()?{start:c.start-1,end:c.end-1}:c,m=s.map(I=>I.end<=c.start?I:{start:I.start-1,end:I.end-1});return t.applyEdits([{editType:k.Replace,index:c.start,count:1,cells:[]}],!0,{kind:f.Index,focus:e.getFocus(),selections:s},()=>({kind:f.Index,focus:U,selections:m}),void 0,!0),r.setToCopy([l.model],!1),!0}const g=$(e,e.getSelections()),v=X(e,g);if(!v.length)return!1;i.writeText(v.map(l=>l.getText()).join(`
`));const ie=g.map(l=>({editType:k.Replace,index:l.start,count:l.end-l.start,cells:[]})),H=g[0].start,T=H<t.cells.length-1?H:Math.max(t.cells.length-2,0);return t.applyEdits(ie,!0,{kind:f.Index,focus:e.getFocus(),selections:g},()=>({kind:f.Index,focus:{start:T,end:T+1},selections:[{start:T,end:T+1}]}),void 0,!0),r.setToCopy(v.map(l=>l.model),!1),!0}let S=class extends de{constructor(o){super();this._editorService=o;const t=105;M&&this._register(M.addImplementation(t,"notebook-clipboard",i=>this.runCopyAction(i))),R&&this._register(R.addImplementation(t,"notebook-clipboard",i=>this.runPasteAction(i))),W&&this._register(W.addImplementation(t,"notebook-clipboard",i=>this.runCutAction(i)))}static ID="workbench.contrib.notebookClipboard";_getContext(){const o=q(this._editorService.activeEditorPane),t=o?.getActiveCell();return{editor:o,activeCell:t}}_focusInsideEmebedMonaco(o){const t=Z(o.getDomNode()).getSelection();if(t?.rangeCount!==1)return!1;const i=t.getRangeAt(0);if(i.startContainer===i.endContainer&&i.endOffset-i.startOffset===0)return!1;let r=i.commonAncestorContainer;const s=o.getDomNode();if(!s.contains(r))return!1;for(;r&&r!==s;){if(r.classList&&r.classList.contains("monaco-editor"))return!0;r=r.parentNode}return!1}runCopyAction(o){const t=o.get(Q),i=V();if(we(i)&&B(i))return b(t,"[NotebookEditor] focus is on input or textarea element, bypass"),!1;const{editor:r}=this._getContext();return r?Ee(i,r.getDomNode())?this._focusInsideEmebedMonaco(r)?(b(t,"[NotebookEditor] focus is on embed monaco editor, bypass"),!1):(b(t,"[NotebookEditor] run copy actions on notebook model"),oe(o,r,void 0)):(b(t,"[NotebookEditor] focus is outside of the notebook editor, bypass"),!1):(b(t,"[NotebookEditor] no active notebook editor, bypass"),!1)}runPasteAction(o){const t=V();if(t&&B(t))return!1;const r=o.get(w).getToCopy();if(!r)return!1;const{editor:s,activeCell:c}=this._getContext();return s?te(s,c,r):!1}runCutAction(o){const t=V();if(t&&B(t))return!1;const{editor:i}=this._getContext();return i?ne(o,i,void 0):!1}};S=G([Y(0,j)],S),ue(S.ID,S,ae.BlockRestore);const Ae="notebook.cell.copy",Ne="notebook.cell.cut",Oe="notebook.cell.paste",_e="notebook.cell.pasteAbove";y(class extends N{constructor(){super({id:Ae,title:E("notebookActions.copy","Copy Cell"),menu:{id:D.NotebookCellTitle,when:C,group:K.Copy,order:2},keybinding:L.isNative?void 0:{primary:d.CtrlCmd|a.KeyC,win:{primary:d.CtrlCmd|a.KeyC,secondary:[d.CtrlCmd|a.Insert]},when:p.and(C,p.not(O)),weight:P.WorkbenchContrib}})}async runWithContext(n,e){oe(n,e.notebookEditor,e.cell)}}),y(class extends N{constructor(){super({id:Ne,title:E("notebookActions.cut","Cut Cell"),menu:{id:D.NotebookCellTitle,when:p.and(C,z,fe),group:K.Copy,order:1},keybinding:L.isNative?void 0:{when:p.and(C,p.not(O)),primary:d.CtrlCmd|a.KeyX,win:{primary:d.CtrlCmd|a.KeyX,secondary:[d.Shift|a.Delete]},weight:P.WorkbenchContrib}})}async runWithContext(n,e){ne(n,e.notebookEditor,e.cell)}}),y(class extends be{constructor(){super({id:Oe,title:E("notebookActions.paste","Paste Cell"),menu:{id:D.NotebookCellTitle,when:p.and(C,z),group:K.Copy,order:3},keybinding:L.isNative?void 0:{when:p.and(C,p.not(O)),primary:d.CtrlCmd|a.KeyV,win:{primary:d.CtrlCmd|a.KeyV,secondary:[d.Shift|a.Insert]},linux:{primary:d.CtrlCmd|a.KeyV,secondary:[d.Shift|a.Insert]},weight:P.EditorContrib}})}async runWithContext(n,e){const t=n.get(w).getToCopy();!e.notebookEditor.hasModel()||e.notebookEditor.isReadOnly||t&&te(e.notebookEditor,e.cell,t)}}),y(class extends N{constructor(){super({id:_e,title:E("notebookActions.pasteAbove","Paste Cell Above"),keybinding:{when:p.and(C,p.not(O)),primary:d.CtrlCmd|d.Shift|a.KeyV,weight:Ce}})}async runWithContext(n,e){const t=n.get(w).getToCopy(),i=e.notebookEditor,r=i.textModel;if(i.isReadOnly||!t)return;const s={kind:f.Index,focus:i.getFocus(),selections:i.getSelections()},c=e.notebookEditor.getCellIndex(e.cell),u=c;r.applyEdits([{editType:k.Replace,index:c,count:0,cells:t.items.map(g=>F(g))}],!0,s,()=>({kind:f.Index,focus:{start:u,end:u+1},selections:[{start:u,end:u+t.items.length}]}),void 0,!0)}}),y(class extends me{constructor(){super({id:"workbench.action.toggleNotebookClipboardLog",title:le("toggleNotebookClipboardLog","Toggle Notebook Clipboard Troubleshooting"),category:ke.Developer,f1:!0})}run(n){xe(),_&&n.get(ye).executeCommand(Se)}}),y(class extends N{constructor(){super({id:"notebook.cell.output.selectAll",title:E("notebook.cell.output.selectAll","Select All"),keybinding:{primary:d.CtrlCmd|a.KeyA,when:p.and(C,pe),weight:ge}})}async runWithContext(n,e){Te(n,o=>{if(!o.hasEditorFocus())return!1;if(o.hasEditorFocus()&&!o.hasWebviewFocus())return!0;const t=o.getActiveCell();return!t||!t.outputIsFocused||!o.hasWebviewFocus()||(t.inputInOutputIsFocused?o.selectInputContents(t):o.selectOutputContent(t)),!0})}});export{S as NotebookClipboardContribution,oe as runCopyCells,ne as runCutCells,te as runPasteCells};