var u=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var f=(d,o,i,e)=>{for(var t=e>1?void 0:e?g(o,i):o,a=d.length-1,n;a>=0;a--)(n=d[a])&&(t=(e?n(o,i,t):n(t))||t);return e&&t&&u(o,i,t),t},v=(d,o)=>(i,e)=>o(i,e,d);import{URI as y}from"../../../base/common/uri.js";import{MainContext as x}from"./extHost.protocol.js";import{Disposable as _,FileDecoration as I}from"./extHostTypes.js";import"../../../base/common/cancellation.js";import"../../../platform/extensions/common/extensions.js";import{createDecorator as P}from"../../../platform/instantiation/common/instantiation.js";import{IExtHostRpcService as S}from"./extHostRpcService.js";import{ILogService as b}from"../../../platform/log/common/log.js";import{asArray as E,groupBy as C}from"../../../base/common/arrays.js";import{compare as R,count as k}from"../../../base/common/strings.js";import{dirname as $}from"../../../base/common/path.js";import{checkProposedApiEnabled as F}from"../../services/extensions/common/extensions.js";let s=class{constructor(o,i){this._logService=i;this._proxy=o.getProxy(x.MainThreadDecorations)}static _handlePool=0;static _maxEventSize=250;_serviceBrand;_provider=new Map;_proxy;registerFileDecorationProvider(o,i){const e=s._handlePool++;this._provider.set(e,{provider:o,extensionDescription:i}),this._proxy.$registerDecorationProvider(e,i.identifier.value);const t=o.onDidChangeFileDecorations&&o.onDidChangeFileDecorations(a=>{if(!a){this._proxy.$onDidChange(e,null);return}const n=E(a);if(n.length<=s._maxEventSize){this._proxy.$onDidChange(e,n);return}this._logService.warn("[Decorations] CAPPING events from decorations provider",i.identifier.value,n.length);const m=n.map(r=>({uri:r,rank:k(r.path,"/")})),p=C(m,(r,c)=>r.rank-c.rank||R(r.uri.path,c.uri.path)),l=[];e:for(const r of p){let c;for(const D of r){const h=$(D.uri.path);if(c!==h&&(c=h,l.push(D.uri)>=s._maxEventSize))break e}}this._proxy.$onDidChange(e,l)});return new _(()=>{t?.dispose(),this._proxy.$unregisterDecorationProvider(e),this._provider.delete(e)})}async $provideDecorations(o,i,e){if(!this._provider.has(o))return Object.create(null);const t=Object.create(null),{provider:a,extensionDescription:n}=this._provider.get(o);return await Promise.all(i.map(async m=>{try{const{uri:p,id:l}=m,r=await Promise.resolve(a.provideFileDecoration(y.revive(p),e));if(!r)return;try{I.validate(r),r.badge&&typeof r.badge!="string"&&F(n,"codiconDecoration"),t[l]=[r.propagate,r.tooltip,r.badge,r.color]}catch(c){this._logService.warn(`INVALID decoration from extension '${n.identifier.value}': ${c}`)}}catch(p){this._logService.error(p)}})),t}};s=f([v(0,S),v(1,b)],s);const Y=P("IExtHostDecorations");export{s as ExtHostDecorations,Y as IExtHostDecorations};