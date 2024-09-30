var x=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=(a,o,s,t)=>{for(var n=t>1?void 0:t?u(o,s):o,i=a.length-1,r;i>=0;i--)(r=a[i])&&(n=(t?r(o,s,n):r(n))||n);return t&&n&&x(o,s,n),n},c=(a,o)=>(s,t)=>o(s,t,a);import{Disposable as d}from"../../../../base/common/lifecycle.js";import{FoldingController as f}from"../../../../editor/contrib/folding/browser/folding.js";import*as p from"../../../../nls.js";import{Registry as l}from"../../../../platform/registry/common/platform.js";import{Extensions as h}from"../../../common/contributions.js";import{Extensions as g}from"../../../../platform/configuration/common/configurationRegistry.js";import{editorConfigurationBaseNode as I}from"../../../../editor/common/config/editorConfigurationSchema.js";import{LifecyclePhase as b}from"../../../services/lifecycle/common/lifecycle.js";import{IExtensionService as C}from"../../../services/extensions/common/extensions.js";import"../../../../editor/common/languages.js";import"../../../../editor/common/model.js";import{IConfigurationService as v}from"../../../../platform/configuration/common/configuration.js";import"../../../../platform/extensions/common/extensions.js";let e=class extends d{constructor(s,t){super();this._extensionService=s;this._configurationService=t;this._store.add(this._extensionService.onDidChangeExtensions(this._updateConfigValues,this)),this._store.add(f.setFoldingRangeProviderSelector(this._selectFoldingRangeProvider.bind(this))),this._updateConfigValues()}static configName="editor.defaultFoldingRangeProvider";static extensionIds=[];static extensionItemLabels=[];static extensionDescriptions=[];async _updateConfigValues(){await this._extensionService.whenInstalledExtensionsRegistered(),e.extensionIds.length=0,e.extensionItemLabels.length=0,e.extensionDescriptions.length=0,e.extensionIds.push(null),e.extensionItemLabels.push(p.localize("null","All")),e.extensionDescriptions.push(p.localize("nullFormatterDescription","All active folding range providers"));const s=[],t=[];for(const i of this._extensionService.extensions)(i.main||i.browser)&&(i.categories?.find(r=>r==="Programming Languages")?s.push(i):t.push(i));const n=(i,r)=>i.name.localeCompare(r.name);for(const i of s.sort(n))e.extensionIds.push(i.identifier.value),e.extensionItemLabels.push(i.displayName??""),e.extensionDescriptions.push(i.description??"");for(const i of t.sort(n))e.extensionIds.push(i.identifier.value),e.extensionItemLabels.push(i.displayName??""),e.extensionDescriptions.push(i.description??"")}_selectFoldingRangeProvider(s,t){const n=this._configurationService.getValue(e.configName,{overrideIdentifier:t.getLanguageId()});if(n)return s.filter(i=>i.id===n)}};e=m([c(0,C),c(1,v)],e),l.as(g.Configuration).registerConfiguration({...I,properties:{[e.configName]:{description:p.localize("formatter.default","Defines a default folding range provider that takes precedence over all other folding range providers. Must be the identifier of an extension contributing a folding range provider."),type:["string","null"],default:null,enum:e.extensionIds,enumItemLabels:e.extensionItemLabels,markdownEnumDescriptions:e.extensionDescriptions}}}),l.as(h.Workbench).registerWorkbenchContribution(e,b.Restored);