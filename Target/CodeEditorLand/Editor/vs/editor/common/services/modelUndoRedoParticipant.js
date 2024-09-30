var f=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=(n,i,s,e)=>{for(var t=e>1?void 0:e?u(i,s):i,r=n.length-1,o;r>=0;r--)(o=n[r])&&(t=(e?o(i,s,t):o(t))||t);return e&&t&&f(i,s,t),t},c=(n,i)=>(s,e)=>i(s,e,n);import{IModelService as v}from"./model.js";import{ITextModelService as S}from"./resolverService.js";import{Disposable as m,dispose as g}from"../../../base/common/lifecycle.js";import{IUndoRedoService as I}from"../../../platform/undoRedo/common/undoRedo.js";import{MultiModelEditStackElement as p}from"../model/editStack.js";let d=class extends m{constructor(s,e,t){super();this._modelService=s;this._textModelService=e;this._undoRedoService=t;this._register(this._modelService.onModelRemoved(r=>{const o=this._undoRedoService.getElements(r.uri);if(!(o.past.length===0&&o.future.length===0)){for(const l of o.past)l instanceof p&&l.setDelegate(this);for(const l of o.future)l instanceof p&&l.setDelegate(this)}}))}prepareUndoRedo(s){const e=s.getMissingModels();if(e.length===0)return m.None;const t=e.map(async r=>{try{return await this._textModelService.createModelReference(r)}catch{return m.None}});return Promise.all(t).then(r=>({dispose:()=>g(r)}))}};d=a([c(0,v),c(1,S),c(2,I)],d);export{d as ModelUndoRedoParticipant};