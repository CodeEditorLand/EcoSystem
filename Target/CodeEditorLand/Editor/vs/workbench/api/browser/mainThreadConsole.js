var p=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var l=(r,e,i,t)=>{for(var o=t>1?void 0:t?x(e,i):e,n=r.length-1,m;n>=0;n--)(m=r[n])&&(o=(t?m(e,i,o):m(o))||o);return t&&o&&p(e,i,o),o},v=(r,e)=>(i,t)=>e(i,t,r);import{extHostNamedCustomer as E}from"../../services/extensions/common/extHostCustomers.js";import{MainContext as a}from"../common/extHost.protocol.js";import{IEnvironmentService as c}from"../../../platform/environment/common/environment.js";import{log as g}from"../../../base/common/console.js";import{logRemoteEntry as C,logRemoteEntryIfError as S}from"../../services/extensions/common/remoteConsoleUtil.js";import{parseExtensionDevOptions as f}from"../../services/extensions/common/extensionDevOptions.js";import{ILogService as I}from"../../../platform/log/common/log.js";let s=class{constructor(e,i,t){this._environmentService=i;this._logService=t;const o=f(this._environmentService);this._isExtensionDevTestFromCli=o.isExtensionDevTestFromCli}_isExtensionDevTestFromCli;dispose(){}$logExtensionHostMessage(e){this._isExtensionDevTestFromCli?C(this._logService,e):(S(this._logService,e,"Extension Host"),g(e,"Extension Host"))}};s=l([E(a.MainThreadConsole),v(1,c),v(2,I)],s);export{s as MainThreadConsole};