import"../../../../../editor/browser/editorExtensions.js";import{localize as n}from"../../../../../nls.js";import{Action2 as p,MenuId as f,registerAction2 as s}from"../../../../../platform/actions/common/actions.js";import{IClipboardService as b}from"../../../../../platform/clipboard/common/clipboardService.js";import{IOpenerService as k}from"../../../../../platform/opener/common/opener.js";import{NOTEBOOK_ACTIONS_CATEGORY as c}from"./coreActions.js";import{NOTEBOOK_CELL_HAS_HIDDEN_OUTPUTS as E,NOTEBOOK_CELL_HAS_OUTPUTS as O}from"../../common/notebookContextKeys.js";import*as m from"../notebookIcons.js";import{ILogService as V}from"../../../../../platform/log/common/log.js";import{copyCellOutput as v}from"../contrib/clipboard/cellOutputClipboard.js";import{IEditorService as I}from"../../../../services/editor/common/editorService.js";import{getNotebookEditorFromEditorPane as M}from"../notebookBrowser.js";import{CellKind as a,CellUri as C}from"../../common/notebookCommon.js";import"../viewModel/codeCellViewModel.js";import{ContextKeyExpr as g}from"../../../../../platform/contextkey/common/contextkey.js";import{INotebookEditorModelResolverService as A}from"../../common/notebookEditorModelResolverService.js";const N="notebook.cellOutput.copy";s(class extends p{constructor(){super({id:"notebook.cellOuput.showEmptyOutputs",title:n("notebookActions.showAllOutput","Show empty outputs"),menu:{id:f.NotebookOutputToolbar,when:g.and(O,E)},f1:!1,category:c})}run(i,e){const t=e.cell;if(t&&t.cellKind===a.Code)for(let o=1;o<t.outputsViewModels.length;o++)t.outputsViewModels[o].visible.get()||(t.outputsViewModels[o].setVisible(!0,!0),t.updateOutputHeight(o,1,"command"))}}),s(class extends p{constructor(){super({id:N,title:n("notebookActions.copyOutput","Copy Cell Output"),menu:{id:f.NotebookOutputToolbar,when:O},category:c,icon:m.copyIcon})}getNoteboookEditor(i,e){return e&&"notebookEditor"in e?e.notebookEditor:M(i.activeEditorPane)}async run(i,e){const t=this.getNoteboookEditor(i.get(I),e);if(!t)return;let o;if(e&&"outputId"in e&&typeof e.outputId=="string"?o=w(e.outputId,t):e&&"outputViewModel"in e&&(o=e.outputViewModel),!o){const l=t.getActiveCell();if(!l)return;l.focusedOutputId!==void 0?o=l.outputsViewModels.find(d=>d.model.outputId===l.focusedOutputId):o=l.outputsViewModels.find(d=>d.pickedMimeType?.isTrusted)}if(!o)return;const r=o.pickedMimeType?.mimeType;if(r?.startsWith("image/")){const l={skipReveal:!0,outputId:o.model.outputId,altOutputId:o.model.alternativeOutputId};await t.focusNotebookCell(o.cellViewModel,"output",l),t.copyOutputImage(o)}else{const l=i.get(b),d=i.get(V);v(r,o,l,d)}}});function w(u,i){const e=i.getViewModel();if(e){const t=e.viewCells.filter(o=>o.cellKind===a.Code);for(const o of t){const r=o.outputsViewModels.find(l=>l.model.outputId===u||l.model.alternativeOutputId===u);if(r)return r}}}const y="notebook.cellOutput.openInTextEditor";s(class extends p{constructor(){super({id:y,title:n("notebookActions.openOutputInEditor","Open Cell Output in Text Editor"),f1:!1,category:c,icon:m.copyIcon})}getNoteboookEditor(i,e){return e&&"notebookEditor"in e?e.notebookEditor:M(i.activeEditorPane)}async run(i,e){const t=this.getNoteboookEditor(i.get(I),e),o=i.get(A);if(!t)return;let r;e&&"outputId"in e&&typeof e.outputId=="string"?r=w(e.outputId,t):e&&"outputViewModel"in e&&(r=e.outputViewModel);const l=i.get(k);if(r?.model.outputId&&t.textModel?.uri){const d=await o.resolve(t.textModel.uri);await l.open(C.generateCellOutputUri(t.textModel.uri,r.model.outputId)),d.dispose()}}});export{N as COPY_OUTPUT_COMMAND_ID,y as OPEN_OUTPUT_COMMAND_ID};