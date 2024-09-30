var p=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var u=(t,i,e,o)=>{for(var r=o>1?void 0:o?S(i,e):i,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(o?s(i,e,r):s(r))||r);return o&&r&&p(i,e,r),r},c=(t,i)=>(e,o)=>i(e,o,t);import{WindowIdleValue as f}from"../../../../base/browser/dom.js";import{mainWindow as h}from"../../../../base/browser/window.js";import{Disposable as I,DisposableStore as g}from"../../../../base/common/lifecycle.js";import{URI as d}from"../../../../base/common/uri.js";import{IInstantiationService as v,createDecorator as D}from"../../../../platform/instantiation/common/instantiation.js";import{IStorageService as _,StorageScope as T}from"../../../../platform/storage/common/storage.js";import{TRUSTED_DOMAINS_STORAGE_KEY as R,readStaticTrustedDomains as m}from"./trustedDomains.js";import{testUrlMatchesGlob as U}from"../common/urlGlob.js";const F=D("ITrustedDomainService");let a=class extends I{constructor(e,o){super();this._instantiationService=e;this._storageService=o;const r=()=>new f(h,()=>{const{defaultTrustedDomains:n,trustedDomains:s}=this._instantiationService.invokeFunction(m);return[...n,...s]});this._staticTrustedDomainsResult=r(),this._register(this._storageService.onDidChangeValue(T.APPLICATION,R,this._register(new g))(()=>{this._staticTrustedDomainsResult?.dispose(),this._staticTrustedDomainsResult=r()}))}_serviceBrand;_staticTrustedDomainsResult;isValid(e){const{defaultTrustedDomains:o,trustedDomains:r}=this._instantiationService.invokeFunction(m),n=[...o,...r];return A(e,n)}};a=u([c(0,v),c(1,_)],a);const b=/^localhost(:\d+)?$/i,w=/^127.0.0.1(:\d+)?$/;function y(t){return b.test(t)||w.test(t)}function l(t){const i=["github.com"];try{const e=typeof t=="string"?d.parse(t,!0):t;return i.includes(e.authority)?e.with({path:e.path.toLowerCase()}).toString(!0):e.toString(!0)}catch{return t.toString()}}function A(t,i){if(t=d.parse(l(t)),i=i.map(l),y(t.authority))return!0;for(let e=0;e<i.length;e++)if(i[e]==="*"||U(t,i[e]))return!0;return!1}export{F as ITrustedDomainService,a as TrustedDomainService,A as isURLDomainTrusted};