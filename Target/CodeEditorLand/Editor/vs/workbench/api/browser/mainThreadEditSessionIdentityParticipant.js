var m=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var c=(r,t,e,i)=>{for(var o=i>1?void 0:i?d(t,e):t,s=r.length-1,n;s>=0;s--)(n=r[s])&&(o=(i?n(t,e,o):n(o))||o);return i&&o&&m(t,e,o),o},p=(r,t)=>(e,i)=>t(e,i,r);import"../../../base/common/cancellation.js";import{localize as l}from"../../../nls.js";import{IInstantiationService as I}from"../../../platform/instantiation/common/instantiation.js";import{extHostCustomer as x}from"../../services/extensions/common/extHostCustomers.js";import"../../../base/common/lifecycle.js";import{raceCancellationError as y}from"../../../base/common/async.js";import{IEditSessionIdentityService as v}from"../../../platform/workspace/common/editSessions.js";import{ExtHostContext as E}from"../common/extHost.protocol.js";import"../../../platform/workspace/common/workspace.js";class S{_proxy;timeout=1e4;constructor(t){this._proxy=t.getProxy(E.ExtHostWorkspace)}async participate(t,e){const i=new Promise((o,s)=>{setTimeout(()=>s(new Error(l("timeout.onWillCreateEditSessionIdentity","Aborted onWillCreateEditSessionIdentity-event after 10000ms"))),this.timeout),this._proxy.$onWillCreateEditSessionIdentity(t.uri,e,this.timeout).then(o,s)});return y(i,e)}}let a=class{constructor(t,e,i){this._editSessionIdentityService=i;this._saveParticipantDisposable=this._editSessionIdentityService.addEditSessionIdentityCreateParticipant(e.createInstance(S,t))}_saveParticipantDisposable;dispose(){this._saveParticipantDisposable.dispose()}};a=c([x,p(1,I),p(2,v)],a);export{a as EditSessionIdentityCreateParticipant};