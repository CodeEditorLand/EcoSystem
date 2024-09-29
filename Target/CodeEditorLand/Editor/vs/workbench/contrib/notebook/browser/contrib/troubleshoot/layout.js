import{Disposable as I,DisposableStore as f,dispose as u}from"../../../../../../base/common/lifecycle.js";import{localize2 as n}from"../../../../../../nls.js";import{Categories as a}from"../../../../../../platform/action/common/actionCommonCategories.js";import{Action2 as c,registerAction2 as d}from"../../../../../../platform/actions/common/actions.js";import"../../../../../../platform/instantiation/common/instantiation.js";import{getNotebookEditorFromEditorPane as p}from"../../notebookBrowser.js";import{registerNotebookContribution as v}from"../../notebookEditorExtensions.js";import"../../notebookEditorWidget.js";import{CellStatusbarAlignment as S}from"../../../common/notebookCommon.js";import{INotebookService as E}from"../../../common/notebookService.js";import{IEditorService as g}from"../../../../../services/editor/common/editorService.js";class h extends I{constructor(e){super();this._notebookEditor=e;this._register(this._notebookEditor.onDidChangeModel(()=>{this._update()})),this._update()}static id="workbench.notebook.troubleshoot";_localStore=this._register(new f);_cellStateListeners=[];_enabled=!1;_cellStatusItems=[];toggle(){this._enabled=!this._enabled,this._update()}_update(){this._localStore.clear(),this._cellStateListeners.forEach(e=>e.dispose()),this._notebookEditor.hasModel()&&this._updateListener()}_log(e,o){if(this._enabled){const t=this._notebookEditor.getViewHeight(e)}}_updateListener(){if(!this._notebookEditor.hasModel())return;for(let t=0;t<this._notebookEditor.getLength();t++){const s=this._notebookEditor.cellAt(t);this._cellStateListeners.push(s.onDidChangeLayout(l=>{this._log(s,l)}))}this._localStore.add(this._notebookEditor.onDidChangeViewCells(t=>{[...t.splices].reverse().forEach(s=>{const[l,m,k]=s,_=this._cellStateListeners.splice(l,m,...k.map(b=>b.onDidChangeLayout(C=>{this._log(b,C)})));u(_)})}));const e=this._notebookEditor.getViewModel();let o=[];this._enabled&&(o=this._getItemsForCells()),this._cellStatusItems=e.deltaCellStatusBarItems(this._cellStatusItems,o)}_getItemsForCells(){const e=[];for(let o=0;o<this._notebookEditor.getLength();o++)e.push({handle:o,items:[{text:`index: ${o}`,alignment:S.Left,priority:Number.MAX_SAFE_INTEGER}]});return e}dispose(){u(this._cellStateListeners),super.dispose()}}v(h.id,h),d(class extends c{constructor(){super({id:"notebook.toggleLayoutTroubleshoot",title:n("workbench.notebook.toggleLayoutTroubleshoot","Toggle Layout Troubleshoot"),category:a.Developer,f1:!0})}async run(r){const i=r.get(g),e=p(i.activeEditorPane);if(!e)return;e.getContribution(h.id)?.toggle()}}),d(class extends c{constructor(){super({id:"notebook.inspectLayout",title:n("workbench.notebook.inspectLayout","Inspect Notebook Layout"),category:a.Developer,f1:!0})}async run(r){const i=r.get(g),e=p(i.activeEditorPane);if(!(!e||!e.hasModel()))for(let o=0;o<e.getLength();o++){const t=e.cellAt(o)}}}),d(class extends c{constructor(){super({id:"notebook.clearNotebookEdtitorTypeCache",title:n("workbench.notebook.clearNotebookEdtitorTypeCache","Clear Notebook Editor Type Cache"),category:a.Developer,f1:!0})}async run(r){r.get(E).clearEditorCache()}});export{h as TroubleshootController};
