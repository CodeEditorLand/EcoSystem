var v=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var l=(n,e,r,t)=>{for(var i=t>1?void 0:t?y(e,r):e,c=n.length-1,m;c>=0;c--)(m=n[c])&&(i=(t?m(e,r,i):m(i))||i);return t&&i&&v(e,r,i),i},o=(n,e)=>(r,t)=>e(r,t,n);import{FileAccess as S}from"../../../base/common/network.js";import{Client as a}from"../../../base/parts/ipc/node/ipc.cp.js";import{IConfigurationService as p}from"../../configuration/common/configuration.js";import{IEnvironmentService as g}from"../../environment/common/environment.js";import{ILogService as d,ILoggerService as u}from"../../log/common/log.js";import{IProductService as T}from"../../product/common/productService.js";import{ITelemetryService as I}from"../common/telemetry.js";import{TelemetryAppenderClient as f}from"../common/telemetryIpc.js";import{TelemetryLogAppender as h}from"../common/telemetryLogAppender.js";import{TelemetryService as E}from"../common/telemetryService.js";let s=class{constructor(e,r,t,i,c,m){this.configurationService=e;this.telemetryService=r;this.logService=t;this.loggerService=i;this.environmentService=c;this.productService=m}customTelemetryServices=new Map;getCustomTelemetryService(e){if(!this.customTelemetryServices.has(e.id)){const r=Object.create(null);r["common.vscodemachineid"]=this.telemetryService.machineId,r["common.vscodesessionid"]=this.telemetryService.sessionId;const t=[e.id,JSON.stringify(r),e.aiKey],c=new a(S.asFileUri("bootstrap-fork").fsPath,{serverName:"Debug Telemetry",timeout:1e3*60*5,args:t,env:{ELECTRON_RUN_AS_NODE:1,VSCODE_PIPE_LOGGING:"true",VSCODE_ESM_ENTRYPOINT:"vs/workbench/contrib/debug/node/telemetryApp"}}).getChannel("telemetryAppender"),m=[new f(c),new h(this.logService,this.loggerService,this.environmentService,this.productService,`[${e.id}] `)];this.customTelemetryServices.set(e.id,new E({appenders:m,sendErrorTelemetry:e.sendErrorTelemetry},this.configurationService,this.productService))}return this.customTelemetryServices.get(e.id)}publicLog(e,r,t){this.getCustomTelemetryService(e).publicLog(r,t)}publicLogError(e,r,t){this.getCustomTelemetryService(e).publicLogError(r,t)}};s=l([o(0,p),o(1,I),o(2,d),o(3,u),o(4,g),o(5,T)],s);export{s as CustomEndpointTelemetryService};