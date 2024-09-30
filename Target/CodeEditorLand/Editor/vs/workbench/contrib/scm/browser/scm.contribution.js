import{localize as e,localize2 as w}from"../../../../nls.js";import{Registry as h}from"../../../../platform/registry/common/platform.js";import{registerWorkbenchContribution2 as _,Extensions as x,WorkbenchPhase as L}from"../../../common/contributions.js";import{DirtyDiffWorkbenchController as F}from"./dirtydiffDecorator.js";import{VIEWLET_ID as z,ISCMService as f,VIEW_PANE_ID as m,ISCMViewService as H,REPOSITORIES_VIEW_PANE_ID as j,HISTORY_VIEW_PANE_ID as E}from"../common/scm.js";import{KeyMod as a,KeyCode as d}from"../../../../base/common/keyCodes.js";import{MenuRegistry as K,MenuId as G}from"../../../../platform/actions/common/actions.js";import{SCMActiveResourceContextKeyController as Q,SCMActiveRepositoryController as $}from"./activity.js";import{LifecyclePhase as k}from"../../../services/lifecycle/common/lifecycle.js";import{Extensions as Y,ConfigurationScope as J}from"../../../../platform/configuration/common/configurationRegistry.js";import{IContextKeyService as y,ContextKeyExpr as o}from"../../../../platform/contextkey/common/contextkey.js";import{CommandsRegistry as N,ICommandService as M}from"../../../../platform/commands/common/commands.js";import{KeybindingsRegistry as c,KeybindingWeight as u}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{InstantiationType as W,registerSingleton as A}from"../../../../platform/instantiation/common/extensions.js";import{SCMService as X}from"../common/scmService.js";import{ViewContainerLocation as Z,Extensions as B}from"../../../common/views.js";import{SCMViewPaneContainer as ee}from"./scmViewPaneContainer.js";import{SyncDescriptor as C}from"../../../../platform/instantiation/common/descriptors.js";import{ModesRegistry as oe}from"../../../../editor/common/languages/modesRegistry.js";import{Codicon as te}from"../../../../base/common/codicons.js";import{registerIcon as ie}from"../../../../platform/theme/common/iconRegistry.js";import{ContextKeys as P,SCMViewPane as re}from"./scmViewPane.js";import{SCMViewService as ne}from"./scmViewService.js";import{SCMRepositoriesViewPane as se}from"./scmRepositoriesViewPane.js";import"../../../../platform/instantiation/common/instantiation.js";import{Context as T}from"../../../../editor/contrib/suggest/browser/suggest.js";import{MANAGE_TRUST_COMMAND_ID as ce,WorkspaceTrustContext as S}from"../../workspace/common/workspace.js";import{IQuickDiffService as ae}from"../common/quickDiff.js";import{QuickDiffService as de}from"../common/quickDiffService.js";import{getActiveElement as v,isActiveElement as me}from"../../../../base/browser/dom.js";import{SCMWorkingSetController as O}from"./workingSet.js";import{IViewsService as b}from"../../../services/views/common/viewsService.js";import{IListService as ue,WorkbenchList as le}from"../../../../platform/list/browser/listService.js";import{isSCMRepository as pe}from"./util.js";import{SCMHistoryViewPane as he}from"./scmHistoryViewPane.js";import{IsWebContext as fe}from"../../../../platform/contextkey/common/contextkeys.js";import{RemoteNameContext as ge}from"../../../common/contextkeys.js";oe.registerLanguage({id:"scminput",extensions:[],aliases:[],mimetypes:["text/x-scm-input"]}),h.as(x.Workbench).registerWorkbenchContribution(F,k.Restored);const I=ie("source-control-view-icon",te.sourceControl,e("sourceControlViewIcon","View icon of the Source Control view.")),R=h.as(B.ViewContainersRegistry).registerViewContainer({id:z,title:w("source control","Source Control"),ctorDescriptor:new C(ee),storageId:"workbench.scm.views.state",icon:I,alwaysUseContainerInfo:!0,order:2,hideIfEmpty:!0},Z.Sidebar,{doNotRegisterOpenCommand:!0}),p=h.as(B.ViewsRegistry);p.registerViewWelcomeContent(m,{content:e("no open repo","No source control providers registered."),when:"default"}),p.registerViewWelcomeContent(m,{content:e("no open repo in an untrusted workspace","None of the registered source control providers work in Restricted Mode."),when:o.and(o.equals("scm.providerCount",0),S.IsEnabled,S.IsTrusted.toNegated())}),p.registerViewWelcomeContent(m,{content:`[${e("manageWorkspaceTrustAction","Manage Workspace Trust")}](command:${ce})`,when:o.and(o.equals("scm.providerCount",0),S.IsEnabled,S.IsTrusted.toNegated())}),p.registerViewWelcomeContent(E,{content:e("no history items","The selected source control provider does not have any source control history items."),when:P.SCMHistoryItemCount.isEqualTo(0)}),p.registerViews([{id:j,name:w("source control repositories","Source Control Repositories"),ctorDescriptor:new C(se),canToggleVisibility:!0,hideByDefault:!0,canMoveView:!0,weight:20,order:0,when:o.and(o.has("scm.providerCount"),o.notEquals("scm.providerCount",0)),containerIcon:I}],R),p.registerViews([{id:m,name:w("source control","Source Control"),ctorDescriptor:new C(re),canToggleVisibility:!0,canMoveView:!0,weight:40,order:1,containerIcon:I,openCommandActionDescriptor:{id:R.id,mnemonicTitle:e({key:"miViewSCM",comment:["&& denotes a mnemonic"]},"Source &&Control"),keybindings:{primary:0,win:{primary:a.CtrlCmd|a.Shift|d.KeyG},linux:{primary:a.CtrlCmd|a.Shift|d.KeyG},mac:{primary:a.WinCtrl|a.Shift|d.KeyG}},order:2}}],R),p.registerViews([{id:E,name:w("source control history","Source Control Graph"),ctorDescriptor:new C(he),canToggleVisibility:!0,canMoveView:!0,weight:40,order:2,when:o.and(o.and(o.has("scm.providerCount"),o.notEquals("scm.providerCount",0)),o.and(fe,ge.isEqualTo(""))?.negate()),containerIcon:I}],R),h.as(x.Workbench).registerWorkbenchContribution($,k.Restored),h.as(x.Workbench).registerWorkbenchContribution(Q,k.Restored),_(O.ID,O,L.AfterRestored),h.as(Y.Configuration).registerConfiguration({id:"scm",order:5,title:e("scmConfigurationTitle","Source Control"),type:"object",scope:J.RESOURCE,properties:{"scm.diffDecorations":{type:"string",enum:["all","gutter","overview","minimap","none"],enumDescriptions:[e("scm.diffDecorations.all","Show the diff decorations in all available locations."),e("scm.diffDecorations.gutter","Show the diff decorations only in the editor gutter."),e("scm.diffDecorations.overviewRuler","Show the diff decorations only in the overview ruler."),e("scm.diffDecorations.minimap","Show the diff decorations only in the minimap."),e("scm.diffDecorations.none","Do not show the diff decorations.")],default:"all",description:e("diffDecorations","Controls diff decorations in the editor.")},"scm.diffDecorationsGutterWidth":{type:"number",enum:[1,2,3,4,5],default:3,description:e("diffGutterWidth","Controls the width(px) of diff decorations in gutter (added & modified).")},"scm.diffDecorationsGutterVisibility":{type:"string",enum:["always","hover"],enumDescriptions:[e("scm.diffDecorationsGutterVisibility.always","Show the diff decorator in the gutter at all times."),e("scm.diffDecorationsGutterVisibility.hover","Show the diff decorator in the gutter only on hover.")],description:e("scm.diffDecorationsGutterVisibility","Controls the visibility of the Source Control diff decorator in the gutter."),default:"always"},"scm.diffDecorationsGutterAction":{type:"string",enum:["diff","none"],enumDescriptions:[e("scm.diffDecorationsGutterAction.diff","Show the inline diff Peek view on click."),e("scm.diffDecorationsGutterAction.none","Do nothing.")],description:e("scm.diffDecorationsGutterAction","Controls the behavior of Source Control diff gutter decorations."),default:"diff"},"scm.diffDecorationsGutterPattern":{type:"object",description:e("diffGutterPattern","Controls whether a pattern is used for the diff decorations in gutter."),additionalProperties:!1,properties:{added:{type:"boolean",description:e("diffGutterPatternAdded","Use pattern for the diff decorations in gutter for added lines.")},modified:{type:"boolean",description:e("diffGutterPatternModifed","Use pattern for the diff decorations in gutter for modified lines.")}},default:{added:!1,modified:!0}},"scm.diffDecorationsIgnoreTrimWhitespace":{type:"string",enum:["true","false","inherit"],enumDescriptions:[e("scm.diffDecorationsIgnoreTrimWhitespace.true","Ignore leading and trailing whitespace."),e("scm.diffDecorationsIgnoreTrimWhitespace.false","Do not ignore leading and trailing whitespace."),e("scm.diffDecorationsIgnoreTrimWhitespace.inherit","Inherit from `diffEditor.ignoreTrimWhitespace`.")],description:e("diffDecorationsIgnoreTrimWhitespace","Controls whether leading and trailing whitespace is ignored in Source Control diff gutter decorations."),default:"false"},"scm.alwaysShowActions":{type:"boolean",description:e("alwaysShowActions","Controls whether inline actions are always visible in the Source Control view."),default:!1},"scm.countBadge":{type:"string",enum:["all","focused","off"],enumDescriptions:[e("scm.countBadge.all","Show the sum of all Source Control Provider count badges."),e("scm.countBadge.focused","Show the count badge of the focused Source Control Provider."),e("scm.countBadge.off","Disable the Source Control count badge.")],description:e("scm.countBadge","Controls the count badge on the Source Control icon on the Activity Bar."),default:"all"},"scm.providerCountBadge":{type:"string",enum:["hidden","auto","visible"],enumDescriptions:[e("scm.providerCountBadge.hidden","Hide Source Control Provider count badges."),e("scm.providerCountBadge.auto","Only show count badge for Source Control Provider when non-zero."),e("scm.providerCountBadge.visible","Show Source Control Provider count badges.")],markdownDescription:e("scm.providerCountBadge","Controls the count badges on Source Control Provider headers. These headers appear in the Source Control view when there is more than one provider or when the {0} setting is enabled, and in the Source Control Repositories view.","`#scm.alwaysShowRepositories#`"),default:"hidden"},"scm.defaultViewMode":{type:"string",enum:["tree","list"],enumDescriptions:[e("scm.defaultViewMode.tree","Show the repository changes as a tree."),e("scm.defaultViewMode.list","Show the repository changes as a list.")],description:e("scm.defaultViewMode","Controls the default Source Control repository view mode."),default:"list"},"scm.defaultViewSortKey":{type:"string",enum:["name","path","status"],enumDescriptions:[e("scm.defaultViewSortKey.name","Sort the repository changes by file name."),e("scm.defaultViewSortKey.path","Sort the repository changes by path."),e("scm.defaultViewSortKey.status","Sort the repository changes by Source Control status.")],description:e("scm.defaultViewSortKey","Controls the default Source Control repository changes sort order when viewed as a list."),default:"path"},"scm.autoReveal":{type:"boolean",description:e("autoReveal","Controls whether the Source Control view should automatically reveal and select files when opening them."),default:!0},"scm.inputFontFamily":{type:"string",markdownDescription:e("inputFontFamily","Controls the font for the input message. Use `default` for the workbench user interface font family, `editor` for the `#editor.fontFamily#`'s value, or a custom font family."),default:"default"},"scm.inputFontSize":{type:"number",markdownDescription:e("inputFontSize","Controls the font size for the input message in pixels."),default:13},"scm.inputMaxLineCount":{type:"number",markdownDescription:e("inputMaxLines","Controls the maximum number of lines that the input will auto-grow to."),minimum:1,maximum:50,default:10},"scm.inputMinLineCount":{type:"number",markdownDescription:e("inputMinLines","Controls the minimum number of lines that the input will auto-grow from."),minimum:1,maximum:50,default:1},"scm.alwaysShowRepositories":{type:"boolean",markdownDescription:e("alwaysShowRepository","Controls whether repositories should always be visible in the Source Control view."),default:!1},"scm.repositories.sortOrder":{type:"string",enum:["discovery time","name","path"],enumDescriptions:[e("scm.repositoriesSortOrder.discoveryTime","Repositories in the Source Control Repositories view are sorted by discovery time. Repositories in the Source Control view are sorted in the order that they were selected."),e("scm.repositoriesSortOrder.name","Repositories in the Source Control Repositories and Source Control views are sorted by repository name."),e("scm.repositoriesSortOrder.path","Repositories in the Source Control Repositories and Source Control views are sorted by repository path.")],description:e("repositoriesSortOrder","Controls the sort order of the repositories in the source control repositories view."),default:"discovery time"},"scm.repositories.visible":{type:"number",description:e("providersVisible","Controls how many repositories are visible in the Source Control Repositories section. Set to 0, to be able to manually resize the view."),default:10},"scm.showActionButton":{type:"boolean",markdownDescription:e("showActionButton","Controls whether an action button can be shown in the Source Control view."),default:!0},"scm.showInputActionButton":{type:"boolean",markdownDescription:e("showInputActionButton","Controls whether an action button can be shown in the Source Control input."),default:!0},"scm.workingSets.enabled":{type:"boolean",description:e("scm.workingSets.enabled","Controls whether to store editor working sets when switching between source control history item groups."),default:!1},"scm.workingSets.default":{type:"string",enum:["empty","current"],enumDescriptions:[e("scm.workingSets.default.empty","Use an empty working set when switching to a source control history item group that does not have a working set."),e("scm.workingSets.default.current","Use the current working set when switching to a source control history item group that does not have a working set.")],description:e("scm.workingSets.default","Controls the default working set to use when switching to a source control history item group that does not have a working set."),default:"current"},"scm.compactFolders":{type:"boolean",description:e("scm.compactFolders","Controls whether the Source Control view should render folders in a compact form. In such a form, single child folders will be compressed in a combined tree element."),default:!0},"scm.graph.pageOnScroll":{type:"boolean",description:e("scm.graph.pageOnScroll","Controls whether the Source Control Graph view will load the next page of items when you scroll to the end of the list."),default:!0},"scm.graph.pageSize":{type:"number",description:e("scm.graph.pageSize","The number of items to show in the Source Control Graph view by default and when loading more items."),minimum:1,maximum:1e3,default:50},"scm.graph.badges":{type:"string",enum:["all","filter"],enumDescriptions:[e("scm.graph.badges.all","Show badges of all history item groups in the Source Control Graph view."),e("scm.graph.badges.filter","Show only the badges of history item groups used as a filter in the Source Control Graph view.")],description:e("scm.graph.badges","Controls which badges are shown in the Source Control Graph view. The badges are shown on the right side of the graph indicating the names of history item groups."),default:"filter"}}}),c.registerCommandAndKeybindingRule({id:"scm.acceptInput",metadata:{description:e("scm accept","Source Control: Accept Input"),args:[]},weight:u.WorkbenchContrib,when:o.has("scmRepository"),primary:a.CtrlCmd|d.Enter,handler:t=>{const l=t.get(y).getContext(v()).getValue("scmRepository");if(!l)return Promise.resolve(null);const s=t.get(f).getRepository(l);if(!s?.provider.acceptInputCommand)return Promise.resolve(null);const g=s.provider.acceptInputCommand.id,V=s.provider.acceptInputCommand.arguments;return t.get(M).executeCommand(g,...V||[])}}),c.registerCommandAndKeybindingRule({id:"scm.clearInput",weight:u.WorkbenchContrib,when:o.and(o.has("scmRepository"),T.Visible.toNegated()),primary:d.Escape,handler:async t=>{const r=t.get(f),n=t.get(y).getContext(v()).getValue("scmRepository");(n?r.getRepository(n):void 0)?.input.setValue("",!0)}});const U={description:{description:e("scm view next commit","Source Control: View Next Commit"),args:[]},weight:u.WorkbenchContrib,handler:t=>{const r=t.get(y),i=t.get(f),n=r.getContext(v()).getValue("scmRepository");(n?i.getRepository(n):void 0)?.input.showNextHistoryValue()}},q={description:{description:e("scm view previous commit","Source Control: View Previous Commit"),args:[]},weight:u.WorkbenchContrib,handler:t=>{const r=t.get(y),i=t.get(f),n=r.getContext(v()).getValue("scmRepository");(n?i.getRepository(n):void 0)?.input.showPreviousHistoryValue()}};c.registerCommandAndKeybindingRule({...U,id:"scm.viewNextCommit",when:o.and(o.has("scmRepository"),o.has("scmInputIsInLastPosition"),T.Visible.toNegated()),primary:d.DownArrow}),c.registerCommandAndKeybindingRule({...q,id:"scm.viewPreviousCommit",when:o.and(o.has("scmRepository"),o.has("scmInputIsInFirstPosition"),T.Visible.toNegated()),primary:d.UpArrow}),c.registerCommandAndKeybindingRule({...U,id:"scm.forceViewNextCommit",when:o.has("scmRepository"),primary:a.Alt|d.DownArrow}),c.registerCommandAndKeybindingRule({...q,id:"scm.forceViewPreviousCommit",when:o.has("scmRepository"),primary:a.Alt|d.UpArrow}),N.registerCommand("scm.openInIntegratedTerminal",async(t,...r)=>{if(!r||r.length===0)return;const i=t.get(M),l=t.get(ue);let n=r.length===1?r[0]:void 0;if(!n){const s=l.lastFocusedList,g=s?.getHTMLElement();if(s instanceof le&&g&&me(g)){const[V]=s.getFocus(),D=s.element(V);pe(D)&&(n=D.provider)}}n?.rootUri&&await i.executeCommand("openInIntegratedTerminal",n.rootUri)}),N.registerCommand("scm.openInTerminal",async(t,r)=>{if(!r||!r.rootUri)return;await t.get(M).executeCommand("openInTerminal",r.rootUri)}),K.appendMenuItem(G.SCMSourceControl,{group:"100_end",command:{id:"scm.openInTerminal",title:e("open in external terminal","Open in External Terminal")},when:o.and(o.equals("scmProviderHasRootUri",!0),o.or(o.equals("config.terminal.sourceControlRepositoriesKind","external"),o.equals("config.terminal.sourceControlRepositoriesKind","both")))}),K.appendMenuItem(G.SCMSourceControl,{group:"100_end",command:{id:"scm.openInIntegratedTerminal",title:e("open in integrated terminal","Open in Integrated Terminal")},when:o.and(o.equals("scmProviderHasRootUri",!0),o.or(o.equals("config.terminal.sourceControlRepositoriesKind","integrated"),o.equals("config.terminal.sourceControlRepositoriesKind","both")))}),c.registerCommandAndKeybindingRule({id:"workbench.scm.action.focusPreviousInput",weight:u.WorkbenchContrib,when:P.RepositoryVisibilityCount.notEqualsTo(0),handler:async t=>{const i=await t.get(b).openView(m);i&&i.focusPreviousInput()}}),c.registerCommandAndKeybindingRule({id:"workbench.scm.action.focusNextInput",weight:u.WorkbenchContrib,when:P.RepositoryVisibilityCount.notEqualsTo(0),handler:async t=>{const i=await t.get(b).openView(m);i&&i.focusNextInput()}}),c.registerCommandAndKeybindingRule({id:"workbench.scm.action.focusPreviousResourceGroup",weight:u.WorkbenchContrib,handler:async t=>{const i=await t.get(b).openView(m);i&&i.focusPreviousResourceGroup()}}),c.registerCommandAndKeybindingRule({id:"workbench.scm.action.focusNextResourceGroup",weight:u.WorkbenchContrib,handler:async t=>{const i=await t.get(b).openView(m);i&&i.focusNextResourceGroup()}}),A(f,X,W.Delayed),A(H,ne,W.Delayed),A(ae,de,W.Delayed);