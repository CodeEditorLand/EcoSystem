import"../../../../base/common/cancellation.js";import"../../../../base/common/event.js";import"../../../../base/common/lifecycle.js";import"../../../../base/common/severity.js";import{compare as n}from"../../../../base/common/strings.js";import"../../../../editor/common/model.js";import"../../../../editor/common/languages.js";import{LanguageFeatureRegistry as o}from"../../../../editor/common/languageFeatureRegistry.js";import"../../../../editor/common/languageSelector.js";import"../../../../platform/accessibility/common/accessibility.js";import{InstantiationType as i,registerSingleton as s}from"../../../../platform/instantiation/common/extensions.js";import{createDecorator as g}from"../../../../platform/instantiation/common/instantiation.js";const d=g("ILanguageStatusService");class u{_provider=new o;onDidChange=this._provider.onDidChange;addStatus(t){return this._provider.register(t.selector,t)}getLanguageStatus(t){return this._provider.ordered(t).sort((a,r)=>{let e=r.severity-a.severity;return e===0&&(e=n(a.source,r.source)),e===0&&(e=n(a.id,r.id)),e})}}s(d,u,i.Delayed);export{d as ILanguageStatusService};