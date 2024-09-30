var c=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var g=(i,e,o,t)=>{for(var n=t>1?void 0:t?a(e,o):e,r=i.length-1,p;r>=0;r--)(p=i[r])&&(n=(t?p(e,o,n):p(n))||n);return t&&n&&c(e,o,n),n},l=(i,e)=>(o,t)=>e(o,t,i);import"./debug.js";import{ITelemetryService as d}from"../../../../platform/telemetry/common/telemetry.js";import"./debugger.js";let s=class{constructor(e,o){this.model=e;this.telemetryService=o}logDebugSessionStart(e,o){const t=e.getMainExtensionDescriptor();this.telemetryService.publicLog("debugSessionStart",{type:e.type,breakpointCount:this.model.getBreakpoints().length,exceptionBreakpoints:this.model.getExceptionBreakpoints(),watchExpressionsCount:this.model.getWatchExpressions().length,extensionName:t.identifier.value,isBuiltin:t.isBuiltin,launchJsonExists:o})}logDebugSessionStop(e,o){const t=this.model.getBreakpoints();this.telemetryService.publicLog("debugSessionStop",{type:e&&e.configuration.type,success:o.emittedStopped||t.length===0,sessionLengthInSeconds:o.sessionLengthInSeconds,breakpointCount:t.length,watchExpressionsCount:this.model.getWatchExpressions().length})}};s=g([l(1,d)],s);export{s as DebugTelemetry};