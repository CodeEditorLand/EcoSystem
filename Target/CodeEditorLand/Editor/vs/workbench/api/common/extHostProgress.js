var m=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var p=(s,e,o,t)=>{for(var r=t>1?void 0:t?g(e,o):e,n=s.length-1,i;n>=0;n--)(i=s[n])&&(r=(t?i(e,o,r):i(r))||r);return t&&r&&m(e,o,r),r};import"vscode";import"./extHost.protocol.js";import{ProgressLocation as h}from"./extHostTypeConverters.js";import{Progress as d}from"../../../platform/progress/common/progress.js";import{CancellationTokenSource as P,CancellationToken as S}from"../../../base/common/cancellation.js";import{throttle as u}from"../../../base/common/decorators.js";import"../../../platform/extensions/common/extensions.js";import{onUnexpectedExternalError as f}from"../../../base/common/errors.js";class D{_proxy;_handles=0;_mapHandleToCancellationSource=new Map;constructor(e){this._proxy=e}async withProgress(e,o,t){const r=this._handles++,{title:n,location:i,cancellable:a}=o,l={label:e.displayName||e.name,id:e.identifier.value};return this._proxy.$startProgress(r,{location:h.from(i),title:n,source:l,cancellable:a},e.isUnderDevelopment?void 0:e.identifier.value).catch(f),this._withProgress(r,t,!!a)}_withProgress(e,o,t){let r;t&&(r=new P,this._mapHandleToCancellationSource.set(e,r));const n=a=>{this._proxy.$progressEnd(a),this._mapHandleToCancellationSource.delete(a),r?.dispose()};let i;try{i=o(new c(this._proxy,e),t&&r?r.token:S.None)}catch(a){throw n(e),a}return i.then(a=>n(e),a=>n(e)),i}$acceptProgressCanceled(e){const o=this._mapHandleToCancellationSource.get(e);o&&(o.cancel(),this._mapHandleToCancellationSource.delete(e))}}function T(s,e){return s.message=e.message,typeof e.increment=="number"&&(typeof s.increment=="number"?s.increment+=e.increment:s.increment=e.increment),s}class c extends d{constructor(o,t){super(r=>this.throttledReport(r));this._proxy=o;this._handle=t}throttledReport(o){this._proxy.$progressReport(this._handle,o)}}p([u(100,(o,t)=>T(o,t),()=>Object.create(null))],c.prototype,"throttledReport",1);export{D as ExtHostProgress};