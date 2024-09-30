import*as o from"../../../services/extensions/common/extensionsRegistry.js";import{terminalContributionsDescriptor as a}from"./terminal.js";import{createDecorator as l}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../platform/terminal/common/terminal.js";import{URI as n}from"../../../../base/common/uri.js";const s=o.ExtensionsRegistry.registerExtensionPoint(a),P=l("terminalContributionsService");class v{_terminalProfiles=[];get terminalProfiles(){return this._terminalProfiles}constructor(){s.setHandler(t=>{this._terminalProfiles=t.map(e=>e.value?.profiles?.filter(r=>m(r)).map(r=>({...r,extensionIdentifier:e.description.identifier.value}))||[]).flat()})}}function m(i){return!i.icon||typeof i.icon=="string"||n.isUri(i.icon)||"light"in i.icon&&"dark"in i.icon&&n.isUri(i.icon.light)&&n.isUri(i.icon.dark)}export{P as ITerminalContributionService,v as TerminalContributionService};