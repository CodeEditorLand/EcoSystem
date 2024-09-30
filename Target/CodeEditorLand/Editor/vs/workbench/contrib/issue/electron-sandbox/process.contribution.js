import{localize as r,localize2 as s}from"../../../../nls.js";import{MenuRegistry as S,MenuId as f,registerAction2 as n,Action2 as c}from"../../../../platform/actions/common/actions.js";import{IWorkbenchProcessService as y}from"../common/issue.js";import{CommandsRegistry as I}from"../../../../platform/commands/common/commands.js";import{Categories as a}from"../../../../platform/action/common/actionCommonCategories.js";import"../../../../platform/instantiation/common/instantiation.js";import{INativeEnvironmentService as P}from"../../../../platform/environment/common/environment.js";import{IDialogService as T}from"../../../../platform/dialogs/common/dialogs.js";import{INativeHostService as h}from"../../../../platform/native/common/native.js";import{IProgressService as D,ProgressLocation as x}from"../../../../platform/progress/common/progress.js";import{IProcessMainService as m}from"../../../../platform/issue/common/issue.js";import"./processService.js";import"./issueMainService.js";class o extends c{static ID="workbench.action.openProcessExplorer";constructor(){super({id:o.ID,title:s("openProcessExplorer","Open Process Explorer"),category:a.Developer,f1:!0})}async run(e){return e.get(y).openProcessExplorer()}}n(o),S.appendMenuItem(f.MenubarHelpMenu,{group:"5_tools",command:{id:o.ID,title:r({key:"miOpenProcessExplorerer",comment:["&& denotes a mnemonic"]},"Open &&Process Explorer")},order:2});class t extends c{static ID="workbench.action.stopTracing";constructor(){super({id:t.ID,title:s("stopTracing","Stop Tracing"),category:a.Developer,f1:!0})}async run(e){const i=e.get(m),g=e.get(P),l=e.get(T),u=e.get(h),v=e.get(D);if(!g.args.trace){const{confirmed:d}=await l.confirm({message:r("stopTracing.message","Tracing requires to launch with a '--trace' argument"),primaryButton:r({key:"stopTracing.button",comment:["&& denotes a mnemonic"]},"&&Relaunch and Enable Tracing")});if(d)return u.relaunch({addArgs:["--trace"]})}await v.withProgress({location:x.Dialog,title:r("stopTracing.title","Creating trace file..."),cancellable:!1,detail:r("stopTracing.detail","This can take up to one minute to complete.")},()=>i.stopTracing())}}n(t),I.registerCommand("_issues.getSystemStatus",p=>p.get(m).getSystemStatus());