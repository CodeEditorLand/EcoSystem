var m=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var f=(c,t,e,r)=>{for(var n=r>1?void 0:r?v(t,e):t,i=c.length-1,u;i>=0;i--)(u=c[i])&&(n=(r?u(t,e,n):u(n))||n);return r&&n&&m(t,e,n),n},d=(c,t)=>(e,r)=>t(e,r,c);import*as g from"../../../../nls.js";import{isObject as p}from"../../../../base/common/types.js";import"../../../../base/common/jsonSchema.js";import"../../../../platform/workspace/common/workspace.js";import{IDebugService as C,debuggerDisabledMessage as y,DebugConfigurationProviderTriggerKind as S}from"./debug.js";import{IConfigurationService as I}from"../../../../platform/configuration/common/configuration.js";import{IConfigurationResolverService as x}from"../../../services/configurationResolver/common/configurationResolver.js";import*as D from"../../../services/configurationResolver/common/configurationResolverUtils.js";import{ITextResourcePropertiesService as E}from"../../../../editor/common/services/textResourceConfiguration.js";import{URI as M}from"../../../../base/common/uri.js";import{Schemas as P}from"../../../../base/common/network.js";import{isDebuggerMainContribution as W}from"./debugUtils.js";import"../../../../platform/extensions/common/extensions.js";import"../../../../platform/telemetry/common/telemetry.js";import{cleanRemoteAuthority as R}from"../../../../platform/telemetry/common/telemetryUtils.js";import{IWorkbenchEnvironmentService as $}from"../../../services/environment/common/environmentService.js";import{ContextKeyExpr as l,IContextKeyService as O}from"../../../../platform/contextkey/common/contextkey.js";import{filter as T}from"../../../../base/common/objects.js";let b=class{constructor(t,e,r,n,i,u,s,o,a){this.adapterManager=t;this.configurationService=n;this.resourcePropertiesService=i;this.configurationResolverService=u;this.environmentService=s;this.debugService=o;this.contextKeyService=a;this.debuggerContribution={type:e.type},this.merge(e,r),this.debuggerWhen=typeof this.debuggerContribution.when=="string"?l.deserialize(this.debuggerContribution.when):void 0,this.debuggerHiddenWhen=typeof this.debuggerContribution.hiddenWhen=="string"?l.deserialize(this.debuggerContribution.hiddenWhen):void 0}debuggerContribution;mergedExtensionDescriptions=[];mainExtensionDescription;debuggerWhen;debuggerHiddenWhen;merge(t,e){function r(n,i,u,s=0){return p(n)?(p(i)&&Object.keys(i).forEach(o=>{o!=="__proto__"&&(p(n[o])&&p(i[o])?r(n[o],i[o],u,s+1):o in n?u&&(s===0&&o==="type"||(n[o]=i[o])):n[o]=i[o])}),n):i}this.mergedExtensionDescriptions.indexOf(e)<0&&(this.mergedExtensionDescriptions.push(e),r(this.debuggerContribution,t,e.isBuiltin),W(t)&&(this.mainExtensionDescription=e))}async startDebugging(t,e){const r=this.debugService.getModel().getSession(e);return await this.debugService.startDebugging(void 0,t,{parentSession:r},void 0)}async createDebugAdapter(t){await this.adapterManager.activateDebuggers("onDebugAdapterProtocolTracker",this.type);const e=this.adapterManager.createDebugAdapter(t);if(e)return Promise.resolve(e);throw new Error(g.localize("cannot.find.da","Cannot find debug adapter for type '{0}'.",this.type))}async substituteVariables(t,e){const r=await this.adapterManager.substituteVariables(this.type,t,e);return await this.configurationResolverService.resolveWithInteractionReplace(t,r,"launch",this.variables,r.__configurationTarget)}runInTerminal(t,e){return this.adapterManager.runInTerminal(this.type,t,e)}get label(){return this.debuggerContribution.label||this.debuggerContribution.type}get type(){return this.debuggerContribution.type}get variables(){return this.debuggerContribution.variables}get configurationSnippets(){return this.debuggerContribution.configurationSnippets}get languages(){return this.debuggerContribution.languages}get when(){return this.debuggerWhen}get hiddenWhen(){return this.debuggerHiddenWhen}get enabled(){return!this.debuggerWhen||this.contextKeyService.contextMatchesRules(this.debuggerWhen)}get isHiddenFromDropdown(){return this.debuggerHiddenWhen?this.contextKeyService.contextMatchesRules(this.debuggerHiddenWhen):!1}get strings(){return this.debuggerContribution.strings??this.debuggerContribution.uiMessages}interestedInLanguage(t){return!!(this.languages&&this.languages.indexOf(t)>=0)}hasInitialConfiguration(){return!!this.debuggerContribution.initialConfigurations}hasDynamicConfigurationProviders(){return this.debugService.getConfigurationManager().hasDebugConfigurationProvider(this.type,S.Dynamic)}hasConfigurationProvider(){return this.debugService.getConfigurationManager().hasDebugConfigurationProvider(this.type)}getInitialConfigurationContent(t){let e=this.debuggerContribution.initialConfigurations||[];t&&(e=e.concat(t));const r=this.resourcePropertiesService.getEOL(M.from({scheme:P.untitled,path:"1"}))===`\r
`?`\r
`:`
`,n=JSON.stringify(e,null,"	").split(`
`).map(h=>"	"+h).join(r).trim(),i=g.localize("launch.config.comment1","Use IntelliSense to learn about possible attributes."),u=g.localize("launch.config.comment2","Hover to view descriptions of existing attributes."),s=g.localize("launch.config.comment3","For more information, visit: {0}","https://go.microsoft.com/fwlink/?linkid=830387");let o=["{",`	// ${i}`,`	// ${u}`,`	// ${s}`,'	"version": "0.2.0",',`	"configurations": ${n}`,"}"].join(r);const a=this.configurationService.getValue();return a.editor&&a.editor.insertSpaces&&(o=o.replace(new RegExp("	","g")," ".repeat(a.editor.tabSize))),Promise.resolve(o)}getMainExtensionDescriptor(){return this.mainExtensionDescription||this.mergedExtensionDescriptions[0]}getCustomTelemetryEndpoint(){const t=this.debuggerContribution.aiKey;if(!t)return;const e=R(this.environmentService.remoteAuthority)!=="other";return{id:`${this.getMainExtensionDescriptor().publisher}.${this.type}`,aiKey:t,sendErrorTelemetry:e}}getSchemaAttributes(t){return this.debuggerContribution.configurationAttributes?Object.keys(this.debuggerContribution.configurationAttributes).map(e=>{const r=`${this.type}:${e}`,n=`${this.type}:${e}:platform`,i=this.debuggerContribution.configurationAttributes[e],u=["name","type","request"];i.required=i.required&&i.required.length?u.concat(i.required):u,i.additionalProperties=!1,i.type="object",i.properties||(i.properties={});const s=i.properties;s.type={enum:[this.type],enumDescriptions:[this.label],description:g.localize("debugType","Type of configuration."),pattern:"^(?!node2)",deprecationMessage:this.debuggerContribution.deprecated||(this.enabled?void 0:y(this.type)),doNotSuggest:!!this.debuggerContribution.deprecated,errorMessage:g.localize("debugTypeNotRecognised","The debug type is not recognized. Make sure that you have a corresponding debug extension installed and that it is enabled."),patternErrorMessage:g.localize("node2NotSupported",'"node2" is no longer supported, use "node" instead and set the "protocol" attribute to "inspector".')},s.request={enum:[e],description:g.localize("debugRequest",'Request type of configuration. Can be "launch" or "attach".')};for(const a in t.common.properties)s[a]={$ref:`#/definitions/common/properties/${a}`};Object.keys(s).forEach(a=>{D.applyDeprecatedVariableMessage(s[a])}),t[r]={...i},t[n]={type:"object",additionalProperties:!1,properties:T(s,a=>a!=="type"&&a!=="request"&&a!=="name")};const o={...i};return o.properties={...s,windows:{$ref:`#/definitions/${n}`,description:g.localize("debugWindowsConfiguration","Windows specific launch configuration attributes.")},osx:{$ref:`#/definitions/${n}`,description:g.localize("debugOSXConfiguration","OS X specific launch configuration attributes.")},linux:{$ref:`#/definitions/${n}`,description:g.localize("debugLinuxConfiguration","Linux specific launch configuration attributes.")}},o}):null}};b=f([d(3,I),d(4,E),d(5,x),d(6,$),d(7,C),d(8,O)],b);export{b as Debugger};