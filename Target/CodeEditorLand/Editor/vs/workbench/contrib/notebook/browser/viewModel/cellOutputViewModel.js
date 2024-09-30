import{Emitter as s}from"../../../../../base/common/event.js";import{Disposable as u}from"../../../../../base/common/lifecycle.js";import{observableValue as d}from"../../../../../base/common/observable.js";import"../notebookBrowser.js";import"../../common/model/notebookTextModel.js";import{RENDERER_NOT_AVAILABLE as l}from"../../common/notebookCommon.js";import"../../common/notebookService.js";let n=0;class O extends u{constructor(e,t,i){super();this.cellViewModel=e;this._outputRawData=t;this._notebookService=i}_onDidResetRendererEmitter=this._register(new s);onDidResetRenderer=this._onDidResetRendererEmitter.event;alwaysShow=!1;visible=d("outputVisible",!1);setVisible(e=!0,t=!1){!e&&this.alwaysShow||(t&&e&&(this.alwaysShow=!0),this.visible.set(e,void 0))}outputHandle=n++;get model(){return this._outputRawData}_pickedMimeType;get pickedMimeType(){return this._pickedMimeType}set pickedMimeType(e){this._pickedMimeType=e}hasMultiMimeType(){if(this._outputRawData.outputs.length<2)return!1;const e=this._outputRawData.outputs[0].mime;return this._outputRawData.outputs.some(t=>t.mime!==e)}resolveMimeTypes(e,t){const i=this._notebookService.getOutputMimeTypeInfo(e,t,this.model),r=i.findIndex(o=>o.rendererId!==l&&o.isTrusted);return[i,Math.max(r,0)]}resetRenderer(){this._pickedMimeType=void 0,this.model.bumpVersion(),this._onDidResetRendererEmitter.fire()}toRawJSON(){return{outputs:this._outputRawData.outputs}}}export{O as CellOutputViewModel};