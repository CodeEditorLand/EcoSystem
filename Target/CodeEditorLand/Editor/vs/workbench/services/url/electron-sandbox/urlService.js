var l=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var c=(n,i,e,t)=>{for(var r=t>1?void 0:t?v(i,e):i,a=n.length-1,p;a>=0;a--)(p=n[a])&&(r=(t?p(i,e,r):p(r))||r);return t&&r&&l(i,e,r),r},o=(n,i)=>(e,t)=>i(e,t,n);import{IURLService as d}from"../../../../platform/url/common/url.js";import{URI as I}from"../../../../base/common/uri.js";import{IMainProcessService as m}from"../../../../platform/ipc/common/mainProcessService.js";import{URLHandlerChannel as S}from"../../../../platform/url/common/urlIpc.js";import{IOpenerService as h}from"../../../../platform/opener/common/opener.js";import{matchesScheme as U}from"../../../../base/common/network.js";import{IProductService as f}from"../../../../platform/product/common/productService.js";import{InstantiationType as u,registerSingleton as R}from"../../../../platform/instantiation/common/extensions.js";import{ProxyChannel as w}from"../../../../base/parts/ipc/common/ipc.js";import{INativeHostService as g}from"../../../../platform/native/common/native.js";import{NativeURLService as L}from"../../../../platform/url/common/urlService.js";import{ILogService as O}from"../../../../platform/log/common/log.js";let s=class extends L{constructor(e,t,r,a,p){super(a);this.nativeHostService=r;this.logService=p;this.urlService=w.toService(e.getChannel("url")),e.registerChannel("urlHandler",new S(this)),t.registerOpener(this)}urlService;create(e){const t=super.create(e);let r=t.query;return r?r+=`&windowId=${encodeURIComponent(this.nativeHostService.windowId)}`:r=`windowId=${encodeURIComponent(this.nativeHostService.windowId)}`,t.with({query:r})}async open(e,t){return U(e,this.productService.urlProtocol)?(typeof e=="string"&&(e=I.parse(e)),await this.urlService.open(e,t)):!1}async handleURL(e,t){const r=await super.open(e,t);return r?(this.logService.trace("URLService#handleURL(): handled",e.toString(!0)),await this.nativeHostService.focusWindow({force:!0,targetWindowId:this.nativeHostService.windowId})):this.logService.trace("URLService#handleURL(): not handled",e.toString(!0)),r}};s=c([o(0,m),o(1,h),o(2,g),o(3,f),o(4,O)],s),R(d,s,u.Eager);export{s as RelayURLService};