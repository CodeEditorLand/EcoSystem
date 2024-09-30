import{URI as d}from"../../../../base/common/uri.js";import{localize as t,localize2 as l}from"../../../../nls.js";import{MenuId as f,MenuRegistry as g,Action2 as b,registerAction2 as k}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as C}from"../../../../platform/commands/common/commands.js";import{LifecyclePhase as I}from"../../../services/lifecycle/common/lifecycle.js";import{IQuickInputService as h}from"../../../../platform/quickinput/common/quickInput.js";import{Registry as i}from"../../../../platform/registry/common/platform.js";import{IURLService as R}from"../../../../platform/url/common/url.js";import{Extensions as y,WorkbenchPhase as n,registerWorkbenchContribution2 as s}from"../../../common/contributions.js";import{ExternalUriResolverContribution as m}from"./externalUriResolver.js";import{manageTrustedDomainSettingsCommand as o}from"./trustedDomains.js";import{TrustedDomainsFileSystemProvider as p}from"./trustedDomainsFileSystemProvider.js";import{OpenerValidatorContributions as v}from"./trustedDomainsValidator.js";import"../../../../platform/instantiation/common/instantiation.js";import{Categories as S}from"../../../../platform/action/common/actionCommonCategories.js";import{ConfigurationScope as D,Extensions as W}from"../../../../platform/configuration/common/configurationRegistry.js";import{workbenchConfigurationNodeBase as T}from"../../../common/configuration.js";import{ITrustedDomainService as U,TrustedDomainService as w}from"./trustedDomainService.js";import{registerSingleton as A,InstantiationType as P}from"../../../../platform/instantiation/common/extensions.js";class x extends b{constructor(){super({id:"workbench.action.url.openUrl",title:l("openUrl","Open URL"),category:S.Developer,f1:!0})}async run(e){const a=e.get(h),c=e.get(R);return a.input({prompt:t("urlToOpen","URL to open")}).then(r=>{if(r){const u=d.parse(r);c.open(u,{originalUrl:r})}})}}k(x),C.registerCommand(o),g.appendMenuItem(f.CommandPalette,{command:{id:o.id,title:o.description.description}}),i.as(y.Workbench).registerWorkbenchContribution(v,I.Restored),s(p.ID,p,n.BlockRestore),s(m.ID,m,n.BlockRestore);const E=i.as(W.Configuration);E.registerConfiguration({...T,properties:{"workbench.trustedDomains.promptInTrustedWorkspace":{scope:D.APPLICATION,type:"boolean",default:!1,description:t("workbench.trustedDomains.promptInTrustedWorkspace","When enabled, trusted domain prompts will appear when opening links in trusted workspaces.")}}}),A(U,w,P.Delayed);