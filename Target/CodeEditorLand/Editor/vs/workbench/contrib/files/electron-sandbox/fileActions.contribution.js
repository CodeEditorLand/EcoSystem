import*as t from"../../../../nls.js";import"../../../../base/common/uri.js";import{IWorkspaceContextService as u}from"../../../../platform/workspace/common/workspace.js";import{isWindows as E,isMacintosh as y}from"../../../../base/common/platform.js";import{Schemas as c}from"../../../../base/common/network.js";import{INativeHostService as I}from"../../../../platform/native/common/native.js";import{KeybindingsRegistry as C,KeybindingWeight as S}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{EditorContextKeys as R}from"../../../../editor/common/editorContextKeys.js";import{KeyMod as i,KeyCode as m,KeyChord as A}from"../../../../base/common/keyCodes.js";import"../../../../platform/instantiation/common/instantiation.js";import{getMultiSelectedResources as M,IExplorerService as _}from"../browser/files.js";import{IEditorService as f}from"../../../services/editor/common/editorService.js";import{revealResourcesInOS as h}from"./fileCommands.js";import{MenuRegistry as n,MenuId as r}from"../../../../platform/actions/common/actions.js";import{ResourceContextKey as v}from"../../../common/contextkeys.js";import{appendToCommandPalette as K,appendEditorTitleContextMenuItem as x}from"../browser/fileActions.contribution.js";import{SideBySideEditor as O,EditorResourceAccessor as w}from"../../../common/editor.js";import{ContextKeyExpr as b}from"../../../../platform/contextkey/common/contextkey.js";import{IListService as N}from"../../../../platform/list/browser/listService.js";import{IEditorGroupsService as L}from"../../../services/editor/common/editorGroupsService.js";const a="revealFileInOS",l=E?t.localize2("revealInWindows","Reveal in File Explorer"):y?t.localize2("revealInMac","Reveal in Finder"):t.localize2("openContainer","Open Containing Folder"),o=b.or(v.Scheme.isEqualTo(c.file),v.Scheme.isEqualTo(c.vscodeUserData));C.registerCommandAndKeybindingRule({id:a,weight:S.WorkbenchContrib,when:R.focus.toNegated(),primary:i.CtrlCmd|i.Alt|m.KeyR,win:{primary:i.Shift|i.Alt|m.KeyR},handler:(e,p)=>{const s=M(p,e.get(N),e.get(f),e.get(L),e.get(_));h(s,e.get(I),e.get(u))}});const W="workbench.action.files.revealActiveFileInWindows";C.registerCommandAndKeybindingRule({weight:S.WorkbenchContrib,when:void 0,primary:A(i.CtrlCmd|m.KeyK,m.KeyR),id:W,handler:e=>{const s=e.get(f).activeEditor,g=w.getOriginalUri(s,{filterByScheme:c.file,supportSideBySide:O.PRIMARY});h(g?[g]:[],e.get(I),e.get(u))}}),x(a,l.value,o,"2_files",!1,0);const d={id:a,title:l.value};n.appendMenuItem(r.OpenEditorsContext,{group:"navigation",order:20,command:d,when:o}),n.appendMenuItem(r.OpenEditorsContextShare,{title:t.localize("miShare","Share"),submenu:r.MenubarShare,group:"share",order:3}),n.appendMenuItem(r.ExplorerContext,{group:"navigation",order:20,command:d,when:o});const F=t.localize2("filesCategory","File");K({id:a,title:l,category:F},o),n.appendMenuItem(r.ChatAttachmentsContext,{group:"navigation",order:20,command:d,when:o}),n.appendMenuItem(r.ChatInlineResourceAnchorContext,{group:"navigation",order:20,command:d,when:o});