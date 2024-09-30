import{Disposable as s}from"../../../../../base/common/lifecycle.js";import"../chat.js";import{ChatWidget as r}from"../chatWidget.js";import{isChatRequestVariableEntry as h}from"../../common/chatModel.js";class n extends s{constructor(e){super();this.widget=e;this._register(this.widget.onDidChangeContext(({removed:a,added:i})=>{a?.forEach(t=>this._attachedContext.delete(t.id)),i?.forEach(t=>{this._attachedContext.has(t.id)||this._attachedContext.set(t.id,t)})})),this._register(this.widget.onDidSubmitAgent(()=>{this._clearAttachedContext()}))}_attachedContext=new Map;static ID="chatContextAttachments";get id(){return n.ID}getInputState(){return[...this._attachedContext.values()]}setInputState(e){const a=Array.isArray(e)?e.filter(h):[];this.setContext(!0,...a)}getContext(){return new Set(this._attachedContext.keys())}setContext(e,...a){e&&this._attachedContext.clear();const i=[];for(const t of a)this._attachedContext.has(t.id)||(this._attachedContext.set(t.id,t),i.push(t));this.widget.setContext(e,...i)}_clearAttachedContext(){this._attachedContext.clear()}}r.CONTRIBS.push(n);export{n as ChatContextAttachments};