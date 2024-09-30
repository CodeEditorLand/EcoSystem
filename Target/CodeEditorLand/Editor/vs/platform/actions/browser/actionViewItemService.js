import"../../../base/browser/ui/actionbar/actionbar.js";import{Emitter as I,Event as m}from"../../../base/common/event.js";import{toDisposable as o}from"../../../base/common/lifecycle.js";import{InstantiationType as a,registerSingleton as v}from"../../instantiation/common/extensions.js";import{createDecorator as c}from"../../instantiation/common/instantiation.js";import"../common/actions.js";const p=c("IActionViewItemService");class M{_serviceBrand;onDidChange=m.None;register(e,i,r,t){return o(()=>{})}lookUp(e,i){}}class u{_providers=new Map;_onDidChange=new I;onDidChange=this._onDidChange.event;dispose(){this._onDidChange.dispose()}register(e,i,r,t){const n=this._makeKey(e,i);if(this._providers.has(n))throw new Error(`A provider for the command ${i} and menu ${e} is already registered.`);this._providers.set(n,r);const s=t?.(()=>{this._onDidChange.fire(e)});return o(()=>{s?.dispose(),this._providers.delete(n)})}lookUp(e,i){return this._providers.get(this._makeKey(e,i))}_makeKey(e,i){return e.id+i}}v(p,u,a.Delayed);export{p as IActionViewItemService,M as NullActionViewItemService};