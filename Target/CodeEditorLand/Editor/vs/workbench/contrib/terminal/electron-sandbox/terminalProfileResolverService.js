var l=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var g=(i,t,n,o)=>{for(var e=o>1?void 0:o?u(t,n):t,m=i.length-1,a;m>=0;m--)(a=i[m])&&(e=(o?a(t,n,e):a(e))||e);return o&&e&&l(t,n,e),e},r=(i,t)=>(n,o)=>t(n,o,i);import{ErrorNoTelemetry as v}from"../../../../base/common/errors.js";import{IConfigurationService as h}from"../../../../platform/configuration/common/configuration.js";import{ITerminalLogService as d}from"../../../../platform/terminal/common/terminal.js";import{IWorkspaceContextService as k}from"../../../../platform/workspace/common/workspace.js";import{ITerminalInstanceService as w}from"../browser/terminal.js";import{BaseTerminalProfileResolverService as y}from"../browser/terminalProfileResolverService.js";import{ITerminalProfileService as C}from"../common/terminal.js";import{IConfigurationResolverService as T}from"../../../services/configurationResolver/common/configurationResolver.js";import{IHistoryService as b}from"../../../services/history/common/history.js";import{IRemoteAgentService as x}from"../../../services/remote/common/remoteAgentService.js";let f=class extends y{constructor(t,n,o,e,m,a,p,I){super({getDefaultSystemShell:async(c,s)=>{const S=await I.getBackend(c);if(!S)throw new v(`Cannot get default system shell when there is no backend for remote authority '${c}'`);return S.getDefaultSystemShell(s)},getEnvironment:async c=>{const s=await I.getBackend(c);if(!s)throw new v(`Cannot get environment when there is no backend for remote authority '${c}'`);return s.getEnvironment()}},n,t,o,e,a,m,p)}};f=g([r(0,T),r(1,h),r(2,b),r(3,d),r(4,k),r(5,C),r(6,x),r(7,w)],f);export{f as ElectronTerminalProfileResolverService};
