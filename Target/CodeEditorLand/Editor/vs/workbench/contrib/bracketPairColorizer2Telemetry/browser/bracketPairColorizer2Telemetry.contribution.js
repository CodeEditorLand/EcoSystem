var d=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=(r,i,e,t)=>{for(var o=t>1?void 0:t?h(i,e):i,n=r.length-1,c;n>=0;n--)(c=r[n])&&(o=(t?c(i,e,o):c(o))||o);return t&&o&&d(i,e,o),o},s=(r,i)=>(e,t)=>i(e,t,r);import{onUnexpectedError as m}from"../../../../base/common/errors.js";import{IConfigurationService as v}from"../../../../platform/configuration/common/configuration.js";import{Registry as p}from"../../../../platform/registry/common/platform.js";import{ITelemetryService as k}from"../../../../platform/telemetry/common/telemetry.js";import{Extensions as f}from"../../../common/contributions.js";import{IExtensionsWorkbenchService as y}from"../../extensions/common/extensions.js";import{EnablementState as b}from"../../../services/extensionManagement/common/extensionManagement.js";import{LifecyclePhase as S}from"../../../services/lifecycle/common/lifecycle.js";let a=class{constructor(i,e,t){this.configurationService=i;this.extensionsWorkbenchService=e;this.telemetryService=t;this.init().catch(m)}async init(){const i="coenraads.bracket-pair-colorizer-2";await this.extensionsWorkbenchService.queryLocal();const e=this.extensionsWorkbenchService.installed.find(n=>n.identifier.id===i);if(!e||e.enablementState!==b.EnabledGlobally&&e.enablementState!==b.EnabledWorkspace)return;const o=!!this.configurationService.getValue("editor.bracketPairColorization.enabled");this.telemetryService.publicLog2("bracketPairColorizerTwoUsage",{nativeColorizationEnabled:o})}};a=l([s(0,v),s(1,y),s(2,k)],a),p.as(f.Workbench).registerWorkbenchContribution(a,S.Restored);