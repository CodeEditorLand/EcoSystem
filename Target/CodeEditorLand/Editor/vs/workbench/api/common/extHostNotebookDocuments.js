import{Emitter as i}from"../../../base/common/event.js";import{URI as t}from"../../../base/common/uri.js";import"./extHost.protocol.js";import"./extHostNotebook.js";import"../../contrib/notebook/common/notebookCommon.js";import"../../services/extensions/common/proxyIdentifier.js";class h{constructor(o){this._notebooksAndEditors=o}_onDidSaveNotebookDocument=new i;onDidSaveNotebookDocument=this._onDidSaveNotebookDocument.event;_onDidChangeNotebookDocument=new i;onDidChangeNotebookDocument=this._onDidChangeNotebookDocument.event;$acceptModelChanged(o,e,n,r){const c=this._notebooksAndEditors.getNotebookDocument(t.revive(o)).acceptModelChanged(e.value,n,r);this._onDidChangeNotebookDocument.fire(c)}$acceptDirtyStateChanged(o,e){this._notebooksAndEditors.getNotebookDocument(t.revive(o)).acceptDirty(e)}$acceptModelSaved(o){const e=this._notebooksAndEditors.getNotebookDocument(t.revive(o));this._onDidSaveNotebookDocument.fire(e.apiNotebook)}}export{h as ExtHostNotebookDocuments};