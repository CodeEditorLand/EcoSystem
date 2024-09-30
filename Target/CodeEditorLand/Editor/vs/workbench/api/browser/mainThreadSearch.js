var S=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=(a,e,r,i)=>{for(var t=i>1?void 0:i?u(e,r):e,o=a.length-1,s;o>=0;o--)(s=a[o])&&(t=(i?s(e,r,t):s(t))||t);return i&&t&&S(e,r,t),t},h=(a,e)=>(r,i)=>e(r,i,a);import{CancellationToken as n}from"../../../base/common/cancellation.js";import{DisposableStore as I,dispose as y}from"../../../base/common/lifecycle.js";import{URI as _}from"../../../base/common/uri.js";import{IConfigurationService as x}from"../../../platform/configuration/common/configuration.js";import{ITelemetryService as g}from"../../../platform/telemetry/common/telemetry.js";import{extHostNamedCustomer as P}from"../../services/extensions/common/extHostCustomers.js";import{ISearchService as f,QueryType as v,SearchProviderType as d}from"../../services/search/common/search.js";import{ExtHostContext as C,MainContext as w}from"../common/extHost.protocol.js";import{revive as M}from"../../../base/common/marshalling.js";import*as T from"../../contrib/search/common/constants.js";import{IContextKeyService as b}from"../../../platform/contextkey/common/contextkey.js";let c=class{constructor(e,r,i,t,o){this._searchService=r;this._telemetryService=i;this.contextKeyService=o;this._proxy=e.getProxy(C.ExtHostSearch),this._proxy.$enableExtensionHostSearch()}_proxy;_searchProvider=new Map;dispose(){this._searchProvider.forEach(e=>e.dispose()),this._searchProvider.clear()}$registerTextSearchProvider(e,r){this._searchProvider.set(e,new l(this._searchService,d.text,r,e,this._proxy))}$registerAITextSearchProvider(e,r){T.SearchContext.hasAIResultProvider.bindTo(this.contextKeyService).set(!0),this._searchProvider.set(e,new l(this._searchService,d.aiText,r,e,this._proxy))}$registerFileSearchProvider(e,r){this._searchProvider.set(e,new l(this._searchService,d.file,r,e,this._proxy))}$unregisterProvider(e){y(this._searchProvider.get(e)),this._searchProvider.delete(e)}$handleFileMatch(e,r,i){const t=this._searchProvider.get(e);if(!t)throw new Error("Got result for unknown provider");t.handleFindMatch(r,i)}$handleTextMatch(e,r,i){const t=this._searchProvider.get(e);if(!t)throw new Error("Got result for unknown provider");t.handleFindMatch(r,i)}$handleTelemetry(e,r){this._telemetryService.publicLog(e,r)}};c=m([P(w.MainThreadSearch),h(1,f),h(2,g),h(3,x),h(4,b)],c);class p{constructor(e,r=++p._idPool,i=new Map){this.progress=e;this.id=r;this.matches=i}static _idPool=0;addMatch(e){const r=this.matches.get(e.resource.toString());r?r.results&&e.results&&r.results.push(...e.results):this.matches.set(e.resource.toString(),e),this.progress?.(e)}}class l{constructor(e,r,i,t,o){this._scheme=i;this._handle=t;this._proxy=o;this._registrations.add(e.registerSearchResultProvider(this._scheme,r,this))}_registrations=new I;_searches=new Map;cachedAIName;async getAIName(){return this.cachedAIName===void 0&&(this.cachedAIName=await this._proxy.$getAIName(this._handle)),this.cachedAIName}dispose(){this._registrations.dispose()}fileSearch(e,r=n.None){return this.doSearch(e,void 0,r)}textSearch(e,r,i=n.None){return this.doSearch(e,r,i)}doSearch(e,r,i=n.None){if(!e.folderQueries.length)throw new Error("Empty folderQueries");const t=new p(r);this._searches.set(t.id,t);const o=this._provideSearchResults(e,t.id,i);return Promise.resolve(o).then(s=>(this._searches.delete(t.id),{results:Array.from(t.matches.values()),stats:s.stats,limitHit:s.limitHit,messages:s.messages}),s=>(this._searches.delete(t.id),Promise.reject(s)))}clearCache(e){return Promise.resolve(this._proxy.$clearCache(e))}handleFindMatch(e,r){const i=this._searches.get(e);i&&r.forEach(t=>{t.results?i.addMatch(M(t)):i.addMatch({resource:_.revive(t)})})}_provideSearchResults(e,r,i){switch(e.type){case v.File:return this._proxy.$provideFileSearchResults(this._handle,r,e,i);case v.Text:return this._proxy.$provideTextSearchResults(this._handle,r,e,i);default:return this._proxy.$provideAITextSearchResults(this._handle,r,e,i)}}}export{c as MainThreadSearch};