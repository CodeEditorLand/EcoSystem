import{timeout as L}from"../../../../../../base/common/async.js";import{KeyCode as t,KeyMod as n}from"../../../../../../base/common/keyCodes.js";import"../../../../../../editor/browser/editorBrowser.js";import{EditorExtensionsRegistry as T}from"../../../../../../editor/browser/editorExtensions.js";import{EditorContextKeys as C}from"../../../../../../editor/common/editorContextKeys.js";import{localize as a}from"../../../../../../nls.js";import{CONTEXT_ACCESSIBILITY_MODE_ENABLED as h}from"../../../../../../platform/accessibility/common/accessibility.js";import{Action2 as M,registerAction2 as d}from"../../../../../../platform/actions/common/actions.js";import{Extensions as B}from"../../../../../../platform/configuration/common/configurationRegistry.js";import{ContextKeyExpr as o}from"../../../../../../platform/contextkey/common/contextkey.js";import{InputFocusedContextKey as u,IsWindowsContext as R}from"../../../../../../platform/contextkey/common/contextkeys.js";import"../../../../../../platform/instantiation/common/instantiation.js";import{KeybindingWeight as l}from"../../../../../../platform/keybinding/common/keybindingsRegistry.js";import{Registry as q}from"../../../../../../platform/registry/common/platform.js";import{InlineChatController as k}from"../../../../inlineChat/browser/inlineChatController.js";import{CTX_NOTEBOOK_CHAT_OUTER_FOCUS_POSITION as y}from"../../controller/chat/notebookChatContext.js";import{NotebookAction as S,NotebookCellAction as m,NOTEBOOK_EDITOR_WIDGET_ACTION_WEIGHT as f,findTargetCellEditor as I}from"../../controller/coreActions.js";import{CellEditState as P}from"../../notebookBrowser.js";import{CellKind as v,NOTEBOOK_EDITOR_CURSOR_BOUNDARY as A}from"../../../common/notebookCommon.js";import{NOTEBOOK_CELL_HAS_OUTPUTS as G,NOTEBOOK_CELL_MARKDOWN_EDIT_MODE as x,NOTEBOOK_CELL_TYPE as D,NOTEBOOK_CURSOR_NAVIGATION_MODE as U,NOTEBOOK_EDITOR_FOCUSED as c,NOTEBOOK_OUTPUT_INPUT_FOCUSED as W,NOTEBOOK_OUTPUT_FOCUSED as _,NOTEBOOK_CELL_EDITOR_FOCUSED as K,IS_COMPOSITE_NOTEBOOK as H}from"../../../common/notebookContextKeys.js";const z="notebook.focusTop",V="notebook.focusBottom",X="notebook.focusPreviousEditor",Y="notebook.focusNextEditor",j="notebook.cell.focusInOutput",J="notebook.cell.focusOutOutput",Q="notebook.centerActiveCell",Z="notebook.cell.cursorPageUp",$="notebook.cell.cursorPageUpSelect",oo="notebook.cell.cursorPageDown",eo="notebook.cell.cursorPageDownSelect";d(class extends M{constructor(){super({id:"notebook.cell.nullAction",title:a("notebook.cell.webviewHandledEvents","Keypresses that should be handled by the focused element in the cell output."),keybinding:[{when:W,primary:t.DownArrow,weight:l.WorkbenchContrib+1},{when:W,primary:t.UpArrow,weight:l.WorkbenchContrib+1}],f1:!1})}run(){}}),d(class extends m{constructor(){super({id:Y,title:a("cursorMoveDown","Focus Next Cell Editor"),keybinding:[{when:o.and(c,h.negate(),o.equals("config.notebook.navigation.allowNavigateToSurroundingCells",!0),o.and(o.has(u),C.editorTextFocus,A.notEqualsTo("top"),A.notEqualsTo("none")),C.isEmbeddedDiffEditor.negate()),primary:t.DownArrow,weight:f},{when:o.and(c,h.negate(),o.equals("config.notebook.navigation.allowNavigateToSurroundingCells",!0),o.and(D.isEqualTo("markup"),x.isEqualTo(!1),U),C.isEmbeddedDiffEditor.negate()),primary:t.DownArrow,weight:l.WorkbenchContrib},{when:o.and(c,_),primary:n.CtrlCmd|t.DownArrow,mac:{primary:n.WinCtrl|n.CtrlCmd|t.DownArrow},weight:l.WorkbenchContrib},{when:o.and(K,h),primary:n.CtrlCmd|t.PageDown,mac:{primary:n.WinCtrl|t.PageUp},weight:l.WorkbenchContrib+1}]})}async runWithContext(r,e){const i=e.notebookEditor,O=e.cell,g=i.getCellIndex(O);if(typeof g!="number"||g>=i.getLength()-1)return;const E=O.textBuffer.getLineCount(),w=e.cell??e.selectedCells?.[0],b=w?I(e,w):void 0;if(b&&b.hasTextFocus()&&k.get(b)?.getWidgetPosition()?.lineNumber===E)k.get(b)?.focus();else{const p=i.cellAt(g+1),F=p.cellKind===v.Markup&&p.getEditState()===P.Preview?"container":"editor";await i.focusNotebookCell(p,F,{focusEditorLine:1})}}}),d(class extends m{constructor(){super({id:X,title:a("cursorMoveUp","Focus Previous Cell Editor"),keybinding:[{when:o.and(c,h.negate(),o.equals("config.notebook.navigation.allowNavigateToSurroundingCells",!0),o.and(o.has(u),C.editorTextFocus,A.notEqualsTo("bottom"),A.notEqualsTo("none")),C.isEmbeddedDiffEditor.negate()),primary:t.UpArrow,weight:f},{when:o.and(c,h.negate(),o.equals("config.notebook.navigation.allowNavigateToSurroundingCells",!0),o.and(D.isEqualTo("markup"),x.isEqualTo(!1),U),C.isEmbeddedDiffEditor.negate()),primary:t.UpArrow,weight:l.WorkbenchContrib},{when:o.and(K,h),primary:n.CtrlCmd|t.PageUp,mac:{primary:n.WinCtrl|t.PageUp},weight:l.WorkbenchContrib+1}]})}async runWithContext(r,e){const i=e.notebookEditor,O=e.cell,g=i.getCellIndex(O);if(typeof g!="number"||g<1||i.getLength()===0)return;const E=i.cellAt(g-1),w=E.cellKind===v.Markup&&E.getEditState()===P.Preview?"container":"editor",b=E.textBuffer.getLineCount();await i.focusNotebookCell(E,w,{focusEditorLine:b});const p=I(e,E);p&&k.get(p)?.getWidgetPosition()?.lineNumber===b&&k.get(p)?.focus()}}),d(class extends S{constructor(){super({id:z,title:a("focusFirstCell","Focus First Cell"),keybinding:[{when:o.and(c,o.not(u)),primary:n.CtrlCmd|t.Home,weight:l.WorkbenchContrib},{when:o.and(c,o.not(u),y.isEqualTo("")),mac:{primary:n.CtrlCmd|t.UpArrow},weight:l.WorkbenchContrib}]})}async runWithContext(s,r){const e=r.notebookEditor;if(e.getLength()===0)return;const i=e.cellAt(0);await e.focusNotebookCell(i,"container")}}),d(class extends S{constructor(){super({id:V,title:a("focusLastCell","Focus Last Cell"),keybinding:[{when:o.and(c,o.not(u)),primary:n.CtrlCmd|t.End,mac:void 0,weight:l.WorkbenchContrib},{when:o.and(c,o.not(u),y.isEqualTo("")),mac:{primary:n.CtrlCmd|t.DownArrow},weight:l.WorkbenchContrib}]})}async runWithContext(s,r){const e=r.notebookEditor;if(!e.hasModel()||e.getLength()===0)return;const i=e.getLength()-1,O=e.getPreviousVisibleCellIndex(i);if(O){const g=e.cellAt(O);await e.focusNotebookCell(g,"container")}}}),d(class extends m{constructor(){super({id:j,title:a("focusOutput","Focus In Active Cell Output"),keybinding:[{primary:n.CtrlCmd|n.Shift|t.DownArrow,mac:{primary:n.WinCtrl|n.CtrlCmd|t.DownArrow},weight:l.WorkbenchContrib},{when:o.and(H.negate(),R),primary:n.CtrlCmd|t.DownArrow,weight:l.WorkbenchContrib}],precondition:o.and(c,G)})}async runWithContext(s,r){const e=r.notebookEditor,i=r.cell;return L(0).then(()=>e.focusNotebookCell(i,"output"))}}),d(class extends m{constructor(){super({id:J,title:a("focusOutputOut","Focus Out Active Cell Output"),keybinding:{primary:n.CtrlCmd|n.Shift|t.UpArrow,mac:{primary:n.WinCtrl|n.CtrlCmd|t.UpArrow},weight:l.WorkbenchContrib},precondition:o.and(c,_)})}async runWithContext(s,r){const e=r.notebookEditor,i=r.cell;await e.focusNotebookCell(i,"editor")}}),d(class extends m{constructor(){super({id:Q,title:a("notebookActions.centerActiveCell","Center Active Cell"),keybinding:{when:c,primary:n.CtrlCmd|t.KeyL,mac:{primary:n.WinCtrl|t.KeyL},weight:l.WorkbenchContrib}})}async runWithContext(r,e){return e.notebookEditor.revealInCenter(e.cell)}}),d(class extends m{constructor(){super({id:Z,title:a("cursorPageUp","Cell Cursor Page Up"),keybinding:[{when:o.and(c,o.has(u),C.editorTextFocus),primary:t.PageUp,weight:f}]})}async runWithContext(s,r){T.getEditorCommand("cursorPageUp").runCommand(s,{pageSize:N(r)})}}),d(class extends m{constructor(){super({id:$,title:a("cursorPageUpSelect","Cell Cursor Page Up Select"),keybinding:[{when:o.and(c,o.has(u),C.editorTextFocus,_.negate()),primary:n.Shift|t.PageUp,weight:f}]})}async runWithContext(s,r){T.getEditorCommand("cursorPageUpSelect").runCommand(s,{pageSize:N(r)})}}),d(class extends m{constructor(){super({id:oo,title:a("cursorPageDown","Cell Cursor Page Down"),keybinding:[{when:o.and(c,o.has(u),C.editorTextFocus),primary:t.PageDown,weight:f}]})}async runWithContext(s,r){T.getEditorCommand("cursorPageDown").runCommand(s,{pageSize:N(r)})}}),d(class extends m{constructor(){super({id:eo,title:a("cursorPageDownSelect","Cell Cursor Page Down Select"),keybinding:[{when:o.and(c,o.has(u),C.editorTextFocus,_.negate()),primary:n.Shift|t.PageDown,weight:f}]})}async runWithContext(s,r){T.getEditorCommand("cursorPageDownSelect").runCommand(s,{pageSize:N(r)})}});function N(s){const e=s.notebookEditor.getViewModel().layoutInfo,i=e?.fontInfo.lineHeight||17;return Math.max(1,Math.floor((e?.height||0)/i)-2)}q.as(B.Configuration).registerConfiguration({id:"notebook",order:100,type:"object",properties:{"notebook.navigation.allowNavigateToSurroundingCells":{type:"boolean",default:!0,markdownDescription:a("notebook.navigation.allowNavigateToSurroundingCells","When enabled cursor can navigate to the next/previous cell when the current cursor in the cell editor is at the first/last line.")}}});export{Q as CENTER_ACTIVE_CELL};