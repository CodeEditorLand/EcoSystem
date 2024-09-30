var g=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var S=(c,o,r,i)=>{for(var t=i>1?void 0:i?y(o,r):o,n=c.length-1,m;n>=0;n--)(m=c[n])&&(t=(i?m(o,r,t):m(t))||t);return i&&t&&g(o,r,t),t},e=(c,o)=>(r,i)=>o(r,i,c);import*as a from"../../../../nls.js";import{IRemoteAgentService as R}from"../common/remoteAgentService.js";import{IRemoteAuthorityResolverService as u,RemoteConnectionType as b,RemoteAuthorityResolverError as d}from"../../../../platform/remote/common/remoteAuthorityResolver.js";import{IProductService as A}from"../../../../platform/product/common/productService.js";import{AbstractRemoteAgentService as k}from"../common/abstractRemoteAgentService.js";import{ISignService as T}from"../../../../platform/sign/common/sign.js";import{ILogService as E}from"../../../../platform/log/common/log.js";import{IWorkbenchEnvironmentService as f}from"../../environment/common/environmentService.js";import{INotificationService as D,Severity as U}from"../../../../platform/notification/common/notification.js";import{WorkbenchPhase as W,registerWorkbenchContribution2 as P}from"../../../common/contributions.js";import{ITelemetryService as _}from"../../../../platform/telemetry/common/telemetry.js";import{INativeHostService as L}from"../../../../platform/native/common/native.js";import{URI as x}from"../../../../base/common/uri.js";import{IOpenerService as C}from"../../../../platform/opener/common/opener.js";import{IUserDataProfileService as O}from"../../userDataProfile/common/userDataProfile.js";import{IRemoteSocketFactoryService as w}from"../../../../platform/remote/common/remoteSocketFactoryService.js";let s=class extends k{constructor(o,r,i,t,n,m,l){super(o,r,i,t,n,m,l)}};s=S([e(0,w),e(1,O),e(2,f),e(3,A),e(4,u),e(5,T),e(6,E)],s);let v=class{constructor(o,r,i,t,n,m,l){this._remoteAgentService=o;this._remoteAuthorityResolverService=m;this._remoteAgentService.getRawEnvironment().then(void 0,p=>{if(!d.isHandled(p)){const h=[{label:a.localize("devTools","Open Developer Tools"),run:()=>n.openDevTools()}],I=this._getTroubleshootingURL();I&&h.push({label:a.localize("directUrl","Open in browser"),run:()=>l.open(I,{openExternal:!0})}),r.prompt(U.Error,a.localize("connectionError","Failed to connect to the remote extension host server (Error: {0})",p?p.message:""),h)}})}static ID="workbench.contrib.nativeRemoteConnectionFailureNotification";_getTroubleshootingURL(){const o=this._remoteAgentService.getConnection();if(!o)return null;const r=this._remoteAuthorityResolverService.getConnectionData(o.remoteAuthority);return!r||r.connectTo.type!==b.WebSocket?null:x.from({scheme:"http",authority:`${r.connectTo.host}:${r.connectTo.port}`,path:"/version"})}};v=S([e(0,R),e(1,D),e(2,f),e(3,_),e(4,L),e(5,u),e(6,C)],v),P(v.ID,v,W.BlockRestore);export{s as RemoteAgentService};