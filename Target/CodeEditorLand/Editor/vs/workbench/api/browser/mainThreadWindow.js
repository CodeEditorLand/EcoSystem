var v=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var c=(s,o,e,i)=>{for(var t=i>1?void 0:i?d(o,e):o,r=s.length-1,a;r>=0;r--)(a=s[r])&&(t=(i?a(o,e,t):a(t))||t);return i&&t&&v(o,e,t),t},n=(s,o)=>(e,i)=>o(e,i,s);import{Event as m}from"../../../base/common/event.js";import{DisposableStore as h}from"../../../base/common/lifecycle.js";import{URI as l}from"../../../base/common/uri.js";import{IOpenerService as x}from"../../../platform/opener/common/opener.js";import{extHostNamedCustomer as u}from"../../services/extensions/common/extHostCustomers.js";import{ExtHostContext as y,MainContext as S}from"../common/extHost.protocol.js";import{IHostService as C}from"../../services/host/browser/host.js";import{IUserActivityService as I}from"../../services/userActivity/common/userActivityService.js";let p=class{constructor(o,e,i,t){this.hostService=e;this.openerService=i;this.userActivityService=t;this.proxy=o.getProxy(y.ExtHostWindow),m.latch(e.onDidChangeFocus)(this.proxy.$onDidChangeWindowFocus,this.proxy,this.disposables),t.onDidChangeIsActive(this.proxy.$onDidChangeWindowActive,this.proxy,this.disposables)}proxy;disposables=new h;dispose(){this.disposables.dispose()}$getInitialState(){return Promise.resolve({isFocused:this.hostService.hasFocus,isActive:this.userActivityService.isActive})}async $openUri(o,e,i){const t=l.from(o);let r;return e&&l.parse(e).toString()===t.toString()?r=e:r=t,this.openerService.open(r,{openExternal:!0,allowTunneling:i.allowTunneling,allowContributedOpeners:i.allowContributedOpeners})}async $asExternalUri(o,e){return(await this.openerService.resolveExternalUri(l.revive(o),e)).resolved}};p=c([u(S.MainThreadWindow),n(1,C),n(2,x),n(3,I)],p);export{p as MainThreadWindow};