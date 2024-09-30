var E=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var v=(b,o,t,e)=>{for(var r=e>1?void 0:e?w(o,t):o,i=b.length-1,a;i>=0;i--)(a=b[i])&&(r=(e?a(o,t,r):a(r))||r);return e&&r&&E(o,t,r),r},k=(b,o)=>(t,e)=>o(t,e,b);import{VSBuffer as T}from"../../../base/common/buffer.js";import{CancellationToken as g}from"../../../base/common/cancellation.js";import{Emitter as I}from"../../../base/common/event.js";import{DisposableStore as h,dispose as $}from"../../../base/common/lifecycle.js";import{StopWatch as y}from"../../../base/common/stopwatch.js";import{assertType as p}from"../../../base/common/types.js";import{URI as H}from"../../../base/common/uri.js";import{CommandsRegistry as D}from"../../../platform/commands/common/commands.js";import{ILogService as M}from"../../../platform/log/common/log.js";import{NotebookDto as u}from"./mainThreadNotebookDto.js";import{INotebookCellStatusBarService as F}from"../../contrib/notebook/common/notebookCellStatusBarService.js";import"../../contrib/notebook/common/notebookCommon.js";import{INotebookService as d,SimpleNotebookProviderInfo as C}from"../../contrib/notebook/common/notebookService.js";import{extHostNamedCustomer as O}from"../../services/extensions/common/extHostCustomers.js";import{SerializableObjectWithBuffers as _}from"../../services/extensions/common/proxyIdentifier.js";import{ExtHostContext as U,MainContext as V}from"../common/extHost.protocol.js";import"../../../base/common/glob.js";import{revive as L}from"../../../base/common/marshalling.js";import"../../contrib/search/common/searchNotebookHelpers.js";import"../../contrib/search/common/search.js";import{coalesce as j}from"../../../base/common/arrays.js";let f=class{constructor(o,t,e,r){this._notebookService=t;this._cellStatusBarService=e;this._logService=r;this._proxy=o.getProxy(U.ExtHostNotebook)}_disposables=new h;_proxy;_notebookSerializer=new Map;_notebookCellStatusBarRegistrations=new Map;dispose(){this._disposables.dispose(),$(this._notebookSerializer.values())}$registerNotebookSerializer(o,t,e,r,i){const a=new h;a.add(this._notebookService.registerNotebookSerializer(e,t,{options:r,dataToNotebook:async s=>{const c=new y;let n;if(s.byteLength===0&&e==="interactive")n=u.fromNotebookDataDto({cells:[],metadata:{}});else{const l=await this._proxy.$dataToNotebook(o,s,g.None);n=u.fromNotebookDataDto(l.value)}return this._logService.trace(`[NotebookSerializer] dataToNotebook DONE after ${c.elapsed()}ms`,{viewType:e,extensionId:t.id.value}),n},notebookToData:s=>{const c=new y,n=this._proxy.$notebookToData(o,new _(u.toNotebookDataDto(s)),g.None);return this._logService.trace(`[NotebookSerializer] notebookToData DONE after ${c.elapsed()}`,{viewType:e,extensionId:t.id.value}),n},save:async(s,c,n,l)=>({...await this._proxy.$saveNotebook(o,s,c,n,l),children:void 0,resource:s}),searchInNotebooks:async(s,c,n)=>{const l=this._notebookService.getContributedNotebookType(e);if(!l)return{results:[],limitHit:!1};const S=l.selectors.map(m=>(m.include||m).toString());if(!S.length)return{results:[],limitHit:!1};const B=j([{isFromSettings:!1,filenamePatterns:S},...n.get(e)??[]]),P=Array.from(n.keys()).flatMap(m=>m!==e?n.get(m)??[]:[]),N=await this._proxy.$searchInNotebooks(o,s,B,P,c);return{results:N.results.map(m=>({resource:H.revive(m.resource),cellResults:m.cellResults.map(z=>L(z))})),limitHit:N.limitHit}}})),i&&a.add(this._notebookService.registerContributedNotebookType(e,i)),this._notebookSerializer.set(o,a),this._logService.trace("[NotebookSerializer] registered notebook serializer",{viewType:e,extensionId:t.id.value})}$unregisterNotebookSerializer(o){this._notebookSerializer.get(o)?.dispose(),this._notebookSerializer.delete(o)}$emitCellStatusBarEvent(o){const t=this._notebookCellStatusBarRegistrations.get(o);t instanceof I&&t.fire(void 0)}async $registerNotebookCellStatusBarItemProvider(o,t,e){const r=this,i={async provideCellStatusBarItems(s,c,n){const l=await r._proxy.$provideNotebookCellStatusBarItems(o,s,c,n);return{items:l?.items??[],dispose(){l&&r._proxy.$releaseNotebookCellStatusBarItems(l.cacheId)}}},viewType:e};if(typeof t=="number"){const s=new I;this._notebookCellStatusBarRegistrations.set(t,s),i.onDidChangeStatusBarItems=s.event}const a=this._cellStatusBarService.registerCellStatusBarItemProvider(i);this._notebookCellStatusBarRegistrations.set(o,a)}async $unregisterNotebookCellStatusBarItemProvider(o,t){const e=r=>{this._notebookCellStatusBarRegistrations.get(r)&&(this._notebookCellStatusBarRegistrations.get(r)?.dispose(),this._notebookCellStatusBarRegistrations.delete(r))};e(o),typeof t=="number"&&e(t)}};f=v([O(V.MainThreadNotebook),k(1,d),k(2,F),k(3,M)],f),D.registerCommand("_executeDataToNotebook",async(b,...o)=>{const[t,e]=o;p(typeof t=="string","string"),p(e instanceof T,"VSBuffer");const i=await b.get(d).withNotebookDataProvider(t);if(!(i instanceof C))return;const a=await i.serializer.dataToNotebook(e);return new _(u.toNotebookDataDto(a))}),D.registerCommand("_executeNotebookToData",async(b,...o)=>{const[t,e]=o;p(typeof t=="string","string"),p(typeof e=="object");const i=await b.get(d).withNotebookDataProvider(t);if(!(i instanceof C))return;const a=u.fromNotebookDataDto(e.value);return await i.serializer.notebookToData(a)});export{f as MainThreadNotebooks};