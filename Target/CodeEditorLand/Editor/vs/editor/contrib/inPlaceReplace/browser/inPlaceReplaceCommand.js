import"../../../common/core/range.js";import{Selection as o}from"../../../common/core/selection.js";import"../../../common/editorCommon.js";import"../../../common/model.js";class C{_editRange;_originalSelection;_text;constructor(i,t,n){this._editRange=i,this._originalSelection=t,this._text=n}getEditOperations(i,t){t.addTrackedEditOperation(this._editRange,this._text)}computeCursorState(i,t){const e=t.getInverseEditOperations()[0].range;return this._originalSelection.isEmpty()?new o(e.endLineNumber,Math.min(this._originalSelection.positionColumn,e.endColumn),e.endLineNumber,Math.min(this._originalSelection.positionColumn,e.endColumn)):new o(e.endLineNumber,e.endColumn-this._text.length,e.endLineNumber,e.endColumn)}}export{C as InPlaceReplaceCommand};