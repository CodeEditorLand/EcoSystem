import{distinct as Ee}from"../../../../base/common/arrays.js";import"../../../../base/common/cancellation.js";import{Codicon as O}from"../../../../base/common/codicons.js";import{Iterable as Pe}from"../../../../base/common/iterator.js";import{KeyChord as A,KeyCode as d,KeyMod as p}from"../../../../base/common/keyCodes.js";import{DisposableStore as ke}from"../../../../base/common/lifecycle.js";import{isDefined as W}from"../../../../base/common/types.js";import"../../../../base/common/uri.js";import"../../../../editor/browser/editorBrowser.js";import{ICodeEditorService as oe}from"../../../../editor/browser/services/codeEditorService.js";import{EmbeddedCodeEditorWidget as se}from"../../../../editor/browser/widget/codeEditor/embeddedCodeEditorWidget.js";import{EditorOption as re}from"../../../../editor/common/config/editorOptions.js";import{Position as Ve}from"../../../../editor/common/core/position.js";import{Range as N}from"../../../../editor/common/core/range.js";import{EditorContextKeys as k}from"../../../../editor/common/editorContextKeys.js";import"../../../../editor/common/model.js";import{SymbolNavigationAction as De}from"../../../../editor/contrib/gotoSymbol/browser/goToCommands.js";import{ReferencesModel as ie}from"../../../../editor/contrib/gotoSymbol/browser/referencesModel.js";import{MessageController as ne}from"../../../../editor/contrib/message/browser/messageController.js";import{PeekContext as ue}from"../../../../editor/contrib/peekView/browser/peekView.js";import{localize as E,localize2 as c}from"../../../../nls.js";import{Categories as qe}from"../../../../platform/action/common/actionCommonCategories.js";import{Action2 as R,MenuId as a}from"../../../../platform/actions/common/actions.js";import{ICommandService as G}from"../../../../platform/commands/common/commands.js";import{IConfigurationService as Fe}from"../../../../platform/configuration/common/configuration.js";import{ContextKeyExpr as f,ContextKeyGreaterExpr as Me}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/instantiation/common/instantiation.js";import{KeybindingWeight as S}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{INotificationService as M,Severity as Be}from"../../../../platform/notification/common/notification.js";import{IProgressService as L,ProgressLocation as Oe}from"../../../../platform/progress/common/progress.js";import{IQuickInputService as le}from"../../../../platform/quickinput/common/quickInput.js";import{widgetClose as Ge}from"../../../../platform/theme/common/iconRegistry.js";import{IUriIdentityService as _}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{ViewAction as P}from"../../../browser/parts/views/viewPane.js";import{FocusedViewContext as Le}from"../../../common/contextkeys.js";import{IExtensionsWorkbenchService as Ue}from"../../extensions/common/extensions.js";import{TestItemTreeElement as ce}from"./explorerProjections/index.js";import*as b from"./icons.js";import"./testingExplorerView.js";import"./testingOutputPeek.js";import{TestingConfigKeys as Ke,getTestingConfiguration as We}from"../common/configuration.js";import{TestCommandId as u,TestExplorerViewMode as U,TestExplorerViewSorting as D,Testing as I,testConfigurationGroupNames as Ne}from"../common/constants.js";import{ITestCoverageService as ae}from"../common/testCoverageService.js";import{TestId as de}from"../common/testId.js";import{ITestProfileService as V,canUseProfileWithTest as _e}from"../common/testProfileService.js";import"../common/testResult.js";import{ITestResultService as q}from"../common/testResultService.js";import{ITestService as y,expandAndGetTestById as He,testsInFile as Qe,testsUnderUri as ze}from"../common/testService.js";import{ExtTestRunProfileKind as H,TestItemExpandState as ge,TestRunProfileBitset as T}from"../common/testTypes.js";import{TestingContextKeys as l}from"../common/testingContextKeys.js";import{ITestingContinuousRunService as K}from"../common/testingContinuousRunService.js";import{ITestingPeekOpener as Ye}from"../common/testingPeekOpener.js";import{isFailedState as Xe}from"../common/testingStates.js";import{IEditorService as je}from"../../../services/editor/common/editorService.js";import{IViewsService as pe}from"../../../services/views/common/viewsService.js";const m=qe.Test;var Je=(v=>(v[v.Refresh=10]="Refresh",v[v.Run=11]="Run",v[v.Debug=12]="Debug",v[v.Coverage=13]="Coverage",v[v.RunContinuous=14]="RunContinuous",v[v.RunUsing=15]="RunUsing",v[v.Collapse=16]="Collapse",v[v.ClearResults=17]="ClearResults",v[v.DisplayMode=18]="DisplayMode",v[v.Sort=19]="Sort",v[v.GoToTest=20]="GoToTest",v[v.HideTest=21]="HideTest",v[v.ContinuousRunTest=2147483647]="ContinuousRunTest",v))(Je||{});const Q=Me.create(l.providerCount.key,0),Te=c("runSelectedTests","Run Tests"),me=c("debugSelectedTests","Debug Tests"),fe=c("coverageSelectedTests","Run Tests with Coverage");class Ze extends R{constructor(){super({id:u.HideTestAction,title:c("hideTest","Hide Test"),menu:{id:a.TestItem,group:"builtin@2",when:l.testItemIsHidden.isEqualTo(!1)}})}run(t,...e){const o=t.get(y);for(const n of e)o.excluded.toggle(n.test,!0);return Promise.resolve()}}class $e extends R{constructor(){super({id:u.UnhideTestAction,title:c("unhideTest","Unhide Test"),menu:{id:a.TestItem,order:21,when:l.testItemIsHidden.isEqualTo(!0)}})}run(t,...e){const o=t.get(y);for(const n of e)n instanceof ce&&o.excluded.toggle(n.test,!1);return Promise.resolve()}}class et extends R{constructor(){super({id:u.UnhideAllTestsAction,title:c("unhideAllTests","Unhide All Tests")})}run(t){return t.get(y).excluded.clear(),Promise.resolve()}}const B=(s,t)=>[{id:a.TestItem,group:"inline",order:s,when:t},{id:a.TestItem,group:"builtin@1",order:s,when:t}];class z extends P{constructor(e,o){super({...o,viewId:I.ExplorerViewId});this.bitset=e}runInView(e,o,...n){const{include:r,exclude:i}=o.getTreeIncludeExclude(n.map(h=>h.test));return e.get(y).runTests({tests:r,exclude:i,group:this.bitset})}}class tt extends z{constructor(){super(T.Debug,{id:u.DebugAction,title:c("debug test","Debug Test"),icon:b.testingDebugIcon,menu:B(12,l.hasDebuggableTests.isEqualTo(!0))})}}class ot extends z{constructor(){super(T.Coverage,{id:u.RunWithCoverageAction,title:c("run with cover test","Run Test with Coverage"),icon:b.testingCoverageIcon,menu:B(13,l.hasCoverableTests.isEqualTo(!0))})}}class st extends R{constructor(){super({id:u.RunUsingProfileAction,title:c("testing.runUsing","Execute Using Profile..."),icon:b.testingDebugIcon,menu:{id:a.TestItem,order:15,group:"builtin@2",when:l.hasNonDefaultProfile.isEqualTo(!0)}})}async run(t,...e){const o=t.get(G),n=t.get(y),r=await o.executeCommand("vscode.pickTestProfile",{onlyForTest:e[0].test});r&&n.runResolvedTests({group:r.group,targets:[{profileId:r.profileId,controllerId:r.controllerId,testIds:e.filter(i=>_e(r,i.test)).map(i=>i.test.item.extId)}]})}}class rt extends z{constructor(){super(T.Run,{id:u.RunAction,title:c("run test","Run Test"),icon:b.testingRunIcon,menu:B(11,l.hasRunnableTests.isEqualTo(!0))})}}class it extends R{constructor(){super({id:u.SelectDefaultTestProfiles,title:c("testing.selectDefaultTestProfiles","Select Default Profile"),icon:b.testingUpdateProfiles,category:m})}async run(t,e){const o=t.get(G),n=t.get(V),r=await o.executeCommand("vscode.pickMultipleTestProfiles",{showConfigureButtons:!1,selected:n.getGroupDefaultProfiles(e),onlyGroup:e});r?.length&&n.setGroupDefaultProfiles(e,r)}}class nt extends R{constructor(){super({id:u.ToggleContinousRunForTest,title:c("testing.toggleContinuousRunOn","Turn on Continuous Run"),icon:b.testingTurnContinuousRunOn,precondition:f.or(l.isContinuousModeOn.isEqualTo(!0),l.isParentRunningContinuously.isEqualTo(!1)),toggled:{condition:l.isContinuousModeOn.isEqualTo(!0),icon:b.testingContinuousIsOn,title:E("testing.toggleContinuousRunOff","Turn off Continuous Run")},menu:B(2147483647,l.supportsContinuousRun.isEqualTo(!0))})}async run(t,...e){const o=t.get(K);for(const n of e){const r=n.test.item.extId;if(o.isSpecificallyEnabledFor(r)){o.stop(r);continue}o.start(T.Run,r)}}}class ut extends R{constructor(){super({id:u.ContinousRunUsingForTest,title:c("testing.startContinuousRunUsing","Start Continous Run Using..."),icon:b.testingDebugIcon,menu:[{id:a.TestItem,order:14,group:"builtin@2",when:f.and(l.supportsContinuousRun.isEqualTo(!0),l.isContinuousModeOn.isEqualTo(!1))}]})}async run(t,...e){const o=t.get(K),n=t.get(V),r=t.get(M),i=t.get(le);for(const h of e){const w=await ve(o,r,i,[{profiles:n.getControllerProfiles(h.test.controllerId)}]);w.length&&o.start(w,h.test.item.extId)}}}class lt extends R{constructor(){super({id:u.ConfigureTestProfilesAction,title:c("testing.configureProfile","Configure Test Profiles"),icon:b.testingUpdateProfiles,f1:!0,category:m,menu:{id:a.CommandPalette,when:l.hasConfigurableProfile.isEqualTo(!0)}})}async run(t,e){const o=t.get(G),n=t.get(V),r=await o.executeCommand("vscode.pickTestProfile",{placeholder:E("configureProfile","Select a profile to update"),showConfigureButtons:!1,onlyConfigurable:!0,onlyGroup:e});r&&n.configure(r.controllerId,r.profileId)}}const Ce=s=>[{id:a.ViewTitle,group:"navigation",order:15,when:f.and(f.equals("view",I.ExplorerViewId),l.supportsContinuousRun.isEqualTo(!0),l.isContinuousModeOn.isEqualTo(s))},{id:a.CommandPalette,when:l.supportsContinuousRun.isEqualTo(!0)}];class ct extends R{constructor(){super({id:u.StopContinousRun,title:c("testing.stopContinuous","Stop Continuous Run"),category:m,icon:b.testingTurnContinuousRunOff,menu:Ce(!0)})}run(t){t.get(K).stop()}}function ve(s,t,e,o){const n=[];for(const{controller:C,profiles:x}of o)for(const F of x)F.supportsContinuousRun&&n.push({label:F.label||C?.label.get()||"",description:C?.label.get(),profile:F});if(n.length===0)return t.info(E("testing.noProfiles","No test continuous run-enabled profiles were found")),Promise.resolve([]);if(n.length===1)return Promise.resolve([n[0].profile]);const r=[],i=[],h=s.lastRunProfileIds;n.sort((C,x)=>C.profile.group-x.profile.group||C.profile.controllerId.localeCompare(x.profile.controllerId)||C.label.localeCompare(x.label));for(let C=0;C<n.length;C++){const x=n[C];(C===0||n[C-1].profile.group!==x.profile.group)&&r.push({type:"separator",label:Ne[x.profile.group]}),r.push(x),h.has(x.profile.profileId)&&i.push(x)}const w=new ke,g=w.add(e.createQuickPick({useSeparators:!0}));return g.title=E("testing.selectContinuousProfiles","Select profiles to run when files change:"),g.canSelectMany=!0,g.items=r,g.selectedItems=i,g.show(),new Promise(C=>{w.add(g.onDidAccept(()=>{C(g.selectedItems.map(x=>x.profile)),w.dispose()})),w.add(g.onDidHide(()=>{C([]),w.dispose()}))})}class at extends R{constructor(){super({id:u.StartContinousRun,title:c("testing.startContinuous","Start Continuous Run"),category:m,icon:b.testingTurnContinuousRunOn,menu:Ce(!1)})}async run(t,...e){const o=t.get(K),n=await ve(o,t.get(M),t.get(le),t.get(V).all());n.length&&o.start(n)}}class Y extends P{constructor(e,o){super({...e,menu:[{id:a.ViewTitle,order:o===T.Run?11:o===T.Debug?12:13,group:"navigation",when:f.and(f.equals("view",I.ExplorerViewId),l.isRunning.isEqualTo(!1),l.capabilityToContextKey[o].isEqualTo(!0))}],category:m,viewId:I.ExplorerViewId});this.group=o}runInView(e,o){const{include:n,exclude:r}=o.getTreeIncludeExclude();return e.get(y).runTests({tests:n,exclude:r,group:this.group})}}class dt extends R{constructor(){super({id:u.GetSelectedProfiles,title:c("getSelectedProfiles","Get Selected Profiles")})}run(t){const e=t.get(V);return[...e.getGroupDefaultProfiles(T.Run),...e.getGroupDefaultProfiles(T.Debug),...e.getGroupDefaultProfiles(T.Coverage)].map(o=>({controllerId:o.controllerId,label:o.label,kind:o.group&T.Coverage?H.Coverage:o.group&T.Debug?H.Debug:H.Run}))}}class gt extends P{constructor(){super({id:u.GetExplorerSelection,title:c("getExplorerSelection","Get Explorer Selection"),viewId:I.ExplorerViewId})}runInView(t,e){const{include:o,exclude:n}=e.getTreeIncludeExclude(void 0,void 0,"selected"),r=i=>i.item.extId;return{include:o.map(r),exclude:n.map(r)}}}class pt extends Y{constructor(){super({id:u.RunSelectedAction,title:Te,icon:b.testingRunAllIcon},T.Run)}}class Tt extends Y{constructor(){super({id:u.DebugSelectedAction,title:me,icon:b.testingDebugAllIcon},T.Debug)}}class mt extends Y{constructor(){super({id:u.CoverageSelectedAction,title:fe,icon:b.testingCoverageAllIcon},T.Coverage)}}const Re=(s,t)=>s.withProgress({location:Oe.Window,title:E("discoveringTests","Discovering Tests")},()=>t);class X extends R{constructor(e,o,n){super({...e,category:m,menu:[{id:a.CommandPalette,when:l.capabilityToContextKey[o].isEqualTo(!0)}]});this.group=o;this.noTestsFoundError=n}async run(e){const o=e.get(y),n=e.get(M),r=[...o.collection.rootItems].filter(i=>i.children.size||i.expand===ge.Expandable||i.expand===ge.BusyExpanding);if(!r.length){n.info(this.noTestsFoundError);return}await o.runTests({tests:r,group:this.group})}}class ft extends X{constructor(){super({id:u.RunAllAction,title:c("runAllTests","Run All Tests"),icon:b.testingRunAllIcon,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,d.KeyA)}},T.Run,E("noTestProvider","No tests found in this workspace. You may need to install a test provider extension"))}}class Ct extends X{constructor(){super({id:u.DebugAllAction,title:c("debugAllTests","Debug All Tests"),icon:b.testingDebugIcon,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyA)}},T.Debug,E("noDebugTestProvider","No debuggable tests found in this workspace. You may need to install a test provider extension"))}}class vt extends X{constructor(){super({id:u.RunAllWithCoverageAction,title:c("runAllWithCoverage","Run All Tests with Coverage"),icon:b.testingCoverageIcon,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|p.Shift|d.KeyA)}},T.Coverage,E("noCoverageTestProvider","No tests with coverage runners found in this workspace. You may need to install a test provider extension"))}}class Rt extends R{constructor(){super({id:u.CancelTestRunAction,title:c("testing.cancelRun","Cancel Test Run"),icon:b.testingCancelIcon,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyX)},menu:[{id:a.ViewTitle,order:11,group:"navigation",when:f.and(f.equals("view",I.ExplorerViewId),f.equals(l.isRunning.serialize(),!0))}]})}async run(t,e,o){const n=t.get(q),r=t.get(y);if(e)r.cancelTestRun(e,o);else for(const i of n.results)i.completedAt||r.cancelTestRun(i.id)}}class It extends P{constructor(){super({id:u.TestingViewAsListAction,viewId:I.ExplorerViewId,title:c("testing.viewAsList","View as List"),toggled:l.viewMode.isEqualTo(U.List),menu:{id:a.ViewTitle,order:18,group:"viewAs",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.viewMode=U.List}}class wt extends P{constructor(){super({id:u.TestingViewAsTreeAction,viewId:I.ExplorerViewId,title:c("testing.viewAsTree","View as Tree"),toggled:l.viewMode.isEqualTo(U.Tree),menu:{id:a.ViewTitle,order:18,group:"viewAs",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.viewMode=U.Tree}}class xt extends P{constructor(){super({id:u.TestingSortByStatusAction,viewId:I.ExplorerViewId,title:c("testing.sortByStatus","Sort by Status"),toggled:l.viewSorting.isEqualTo(D.ByStatus),menu:{id:a.ViewTitle,order:19,group:"sortBy",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.viewSorting=D.ByStatus}}class ht extends P{constructor(){super({id:u.TestingSortByLocationAction,viewId:I.ExplorerViewId,title:c("testing.sortByLocation","Sort by Location"),toggled:l.viewSorting.isEqualTo(D.ByLocation),menu:{id:a.ViewTitle,order:19,group:"sortBy",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.viewSorting=D.ByLocation}}class St extends P{constructor(){super({id:u.TestingSortByDurationAction,viewId:I.ExplorerViewId,title:c("testing.sortByDuration","Sort by Duration"),toggled:l.viewSorting.isEqualTo(D.ByDuration),menu:{id:a.ViewTitle,order:19,group:"sortBy",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.viewSorting=D.ByDuration}}class bt extends R{constructor(){super({id:u.ShowMostRecentOutputAction,title:c("testing.showMostRecentOutput","Show Output"),category:m,icon:O.terminal,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyO)},precondition:l.hasAnyResults.isEqualTo(!0),menu:[{id:a.ViewTitle,order:16,group:"navigation",when:f.equals("view",I.ExplorerViewId)},{id:a.CommandPalette,when:l.hasAnyResults.isEqualTo(!0)}]})}async run(t){(await t.get(pe).openView(I.ResultsViewId,!0))?.showLatestRun()}}class At extends P{constructor(){super({id:u.CollapseAllAction,viewId:I.ExplorerViewId,title:c("testing.collapseAll","Collapse All Tests"),icon:O.collapseAll,menu:{id:a.ViewTitle,order:16,group:"displayAction",when:f.equals("view",I.ExplorerViewId)}})}runInView(t,e){e.viewModel.collapseAll()}}class yt extends R{constructor(){super({id:u.ClearTestResultsAction,title:c("testing.clearResults","Clear All Results"),category:m,icon:O.clearAll,menu:[{id:a.TestPeekTitle},{id:a.CommandPalette,when:l.hasAnyResults.isEqualTo(!0)},{id:a.ViewTitle,order:17,group:"displayAction",when:f.equals("view",I.ExplorerViewId)},{id:a.ViewTitle,order:17,group:"navigation",when:f.equals("view",I.ResultsViewId)}]})}run(t){t.get(q).clear()}}class Et extends R{constructor(){super({id:u.GoToTest,title:c("testing.editFocusedTest","Go to Test"),icon:O.goToFile,menu:B(20,l.testItemHasUri.isEqualTo(!0)),keybinding:{weight:S.EditorContrib-10,when:Le.isEqualTo(I.ExplorerViewId),primary:d.Enter|p.Alt}})}async run(t,e,o){e||(e=t.get(pe).getActiveViewWithId(I.ExplorerViewId)?.focusedTreeElements[0]),e&&e instanceof ce&&t.get(G).executeCommand("vscode.revealTest",e.test.item.extId,o)}}async function Ie(s,t,e,o,n){let r=[],i,h=[],w;for await(const g of Qe(s,t,e)){if(!g.item.range||n?.(g)===!1)continue;const C=N.lift(g.item.range);C.containsPosition(o)?i&&N.equalsRange(g.item.range,i)?r.some(x=>de.isChild(x.item.extId,g.item.extId))||r.push(g):(i=C,r=[g]):Ve.isBefore(C.getStartPosition(),o)&&(!w||w.getStartPosition().isBefore(C.getStartPosition())?(w=C,h=[g]):C.equalsRange(w)&&!h.some(x=>de.isChild(x.item.extId,g.item.extId))&&h.push(g))}return r.length?r:h}var Pt=(i=>(i[i.RunAtCursor=0]="RunAtCursor",i[i.DebugAtCursor=1]="DebugAtCursor",i[i.RunInFile=2]="RunInFile",i[i.DebugInFile=3]="DebugInFile",i[i.GoToRelated=4]="GoToRelated",i[i.PeekRelated=5]="PeekRelated",i))(Pt||{});class j extends R{constructor(e,o){super({...e,menu:[{id:a.CommandPalette,when:Q},{id:a.EditorContext,group:"testing",order:o===T.Run?0:1,when:f.and(l.activeEditorHasTests,l.capabilityToContextKey[o])}]});this.group=o}async run(e){const o=e.get(oe),n=e.get(je),r=n.activeEditorPane;let i=o.getActiveCodeEditor();if(!r||!i)return;i instanceof se&&(i=i.getParentEditor());const h=i?.getPosition(),w=i?.getModel();if(!h||!w||!("uri"in w))return;const g=e.get(y),C=e.get(V),x=e.get(_),F=e.get(L),v=e.get(Fe);We(v,Ke.SaveBeforeTest)&&(await n.save({editor:r.input,groupId:r.group.id}),await g.syncTests());const ee=await Re(F,Ie(g,x,w.uri,h,ye=>!!(C.capabilitiesForTest(ye.item)&this.group)));if(ee.length){await g.runTests({group:this.group,tests:ee});return}const te=await g.getTestsRelatedToCode(w.uri,h);if(te.length){await g.runTests({group:this.group,tests:te});return}i&&ne.get(i)?.showMessage(E("noTestsAtCursor","No tests found here"),h)}}class kt extends j{constructor(){super({id:u.RunAtCursor,title:c("testing.runAtCursor","Run Test at Cursor"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,d.KeyC)}},T.Run)}}class Vt extends j{constructor(){super({id:u.DebugAtCursor,title:c("testing.debugAtCursor","Debug Test at Cursor"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyC)}},T.Debug)}}class Dt extends j{constructor(){super({id:u.CoverageAtCursor,title:c("testing.coverageAtCursor","Run Test at Cursor with Coverage"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|p.Shift|d.KeyC)}},T.Coverage)}}class J extends R{constructor(e,o){super({...e,menu:[{id:a.ExplorerContext,when:l.capabilityToContextKey[o].isEqualTo(!0),group:"6.5_testing",order:(o===T.Run?11:12)+.1}]});this.group=o}async run(e,o){const n=e.get(y),r=e.get(M),i=await Pe.asyncToArray(ze(n,e.get(_),o));if(!i.length){r.notify({message:E("noTests","No tests found in the selected file or folder"),severity:Be.Info});return}return n.runTests({tests:i,group:this.group})}}class qt extends J{constructor(){super({id:u.RunByUri,title:Te,category:m},T.Run)}}class Ft extends J{constructor(){super({id:u.DebugByUri,title:me,category:m},T.Debug)}}class Mt extends J{constructor(){super({id:u.CoverageByUri,title:fe,category:m},T.Coverage)}}class Z extends R{constructor(e,o){super({...e,menu:[{id:a.CommandPalette,when:l.capabilityToContextKey[o].isEqualTo(!0)},{id:a.EditorContext,group:"testing",order:o===T.Run?2:3,when:f.and(l.activeEditorHasTests,l.capabilityToContextKey[o])}]});this.group=o}run(e){let o=e.get(oe).getActiveCodeEditor();if(!o)return;o instanceof se&&(o=o.getParentEditor());const n=o?.getPosition(),r=o?.getModel();if(!n||!r||!("uri"in r))return;const i=e.get(y),h=r.uri.toString(),w=[i.collection.rootIds],g=[];for(;w.length;)for(const C of w.pop()){const x=i.collection.getNodeById(C);x.item.uri?.toString()===h?g.push(x):w.push(x.children)}if(g.length)return i.runTests({tests:g,group:this.group});o&&ne.get(o)?.showMessage(E("noTestsInFile","No tests found in this file"),n)}}class Bt extends Z{constructor(){super({id:u.RunCurrentFile,title:c("testing.runCurrentFile","Run Tests in Current File"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,d.KeyF)}},T.Run)}}class Ot extends Z{constructor(){super({id:u.DebugCurrentFile,title:c("testing.debugCurrentFile","Debug Tests in Current File"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyF)}},T.Debug)}}class Gt extends Z{constructor(){super({id:u.CoverageCurrentFile,title:c("testing.coverageCurrentFile","Run Tests with Coverage in Current File"),category:m,keybinding:{weight:S.WorkbenchContrib,when:k.editorTextFocus,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|p.Shift|d.KeyF)}},T.Coverage)}}const we=async(s,t,e,o)=>{const n=Promise.all(e.map(i=>He(s,i))),r=(await Re(t,n)).filter(W);return r.length?await o(r):void 0};class Lt extends R{async run(t,...e){const o=t.get(y);await we(t.get(y).collection,t.get(L),[...this.getTestExtIdsToRun(t,...e)],n=>this.runTest(o,n))}}class xe extends Lt{constructor(t){super({...t,menu:{id:a.CommandPalette,when:Q}})}getTestExtIdsToRun(t){const{results:e}=t.get(q),o=new Set;for(let n=e.length-1;n>=0;n--){const r=e[n];for(const i of r.tests)Xe(i.ownComputedState)?o.add(i.item.extId):o.delete(i.item.extId)}return o}}class $ extends R{constructor(t){super({...t,menu:{id:a.CommandPalette,when:f.and(Q,l.hasAnyResults.isEqualTo(!0))}})}getLastTestRunRequest(t,e){const o=t.get(q);return(e?o.results.find(r=>r.id===e):o.results[0])?.request}async run(t,e){const o=t.get(q),n=e?o.results.find(g=>g.id===e):o.results[0];if(!n)return;const r=n.request,i=t.get(y),h=t.get(V),w=g=>h.getControllerProfiles(g.controllerId).some(C=>C.profileId===g.profileId);await we(i.collection,t.get(L),r.targets.flatMap(g=>g.testIds),g=>this.getGroup()&r.group&&r.targets.every(w)?i.runResolvedTests({targets:r.targets,group:r.group,exclude:r.exclude}):i.runTests({tests:g,group:this.getGroup()}))}}class Ut extends xe{constructor(){super({id:u.ReRunFailedTests,title:c("testing.reRunFailTests","Rerun Failed Tests"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,d.KeyE)}})}runTest(t,e){return t.runTests({group:T.Run,tests:e})}}class Kt extends xe{constructor(){super({id:u.DebugFailedTests,title:c("testing.debugFailTests","Debug Failed Tests"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyE)}})}runTest(t,e){return t.runTests({group:T.Debug,tests:e})}}class Wt extends ${constructor(){super({id:u.ReRunLastRun,title:c("testing.reRunLastRun","Rerun Last Run"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,d.KeyL)}})}getGroup(){return T.Run}}class Nt extends ${constructor(){super({id:u.DebugLastRun,title:c("testing.debugLastRun","Debug Last Run"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyL)}})}getGroup(){return T.Debug}}class _t extends ${constructor(){super({id:u.CoverageLastRun,title:c("testing.coverageLastRun","Rerun Last Run with Coverage"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|p.Shift|d.KeyL)}})}getGroup(){return T.Coverage}}class Ht extends R{constructor(){super({id:u.SearchForTestExtension,title:c("testing.searchForTestExtension","Search for Test Extension")})}async run(t){t.get(Ue).openSearch('@category:"testing"')}}class Qt extends R{constructor(){super({id:u.OpenOutputPeek,title:c("testing.openOutputPeek","Peek Output"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyM)},menu:{id:a.CommandPalette,when:l.hasAnyResults.isEqualTo(!0)}})}async run(t){t.get(Ye).open()}}class zt extends R{constructor(){super({id:u.ToggleInlineTestOutput,title:c("testing.toggleInlineTestOutput","Toggle Inline Test Output"),category:m,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyI)},menu:{id:a.CommandPalette,when:l.hasAnyResults.isEqualTo(!0)}})}async run(t){const e=t.get(y);e.showInlineOutput.value=!e.showInlineOutput.value}}const he=s=>[{id:a.TestItem,group:"inline",order:10,when:f.and(l.canRefreshTests.isEqualTo(!0),l.isRefreshingTests.isEqualTo(s))},{id:a.ViewTitle,group:"navigation",order:10,when:f.and(f.equals("view",I.ExplorerViewId),l.canRefreshTests.isEqualTo(!0),l.isRefreshingTests.isEqualTo(s))},{id:a.CommandPalette,when:l.canRefreshTests.isEqualTo(!0)}];class Yt extends R{constructor(){super({id:u.RefreshTestsAction,title:c("testing.refreshTests","Refresh Tests"),category:m,icon:b.testingRefreshTests,keybinding:{weight:S.WorkbenchContrib,primary:A(p.CtrlCmd|d.Semicolon,p.CtrlCmd|d.KeyR),when:l.canRefreshTests.isEqualTo(!0)},menu:he(!1)})}async run(t,...e){const o=t.get(y),n=t.get(L),r=Ee(e.filter(W).map(i=>i.test.controllerId));return n.withProgress({location:I.ViewletId},async()=>{r.length?await Promise.all(r.map(i=>o.refreshTests(i))):await o.refreshTests()})}}class Xt extends R{constructor(){super({id:u.CancelTestRefreshAction,title:c("testing.cancelTestRefresh","Cancel Test Refresh"),category:m,icon:b.testingCancelRefreshTests,menu:he(!0)})}async run(t){t.get(y).cancelRefreshTests()}}class jt extends R{constructor(){super({id:u.CoverageClear,title:c("testing.clearCoverage","Clear Coverage"),icon:Ge,category:m,menu:[{id:a.ViewTitle,group:"navigation",order:10,when:f.equals("view",I.CoverageViewId)},{id:a.CommandPalette,when:l.isTestCoverageOpen.isEqualTo(!0)}]})}run(t){t.get(ae).closeCoverage()}}class Jt extends R{constructor(){super({id:u.OpenCoverage,title:c("testing.openCoverage","Open Coverage"),category:m,menu:[{id:a.CommandPalette,when:l.hasAnyResults.isEqualTo(!0)}]})}run(t){const e=t.get(q).results,o=e.length&&e[0].tasks.find(n=>n.coverage);if(!o){t.get(M).info(E("testing.noCoverage","No coverage information available on the last test run."));return}t.get(ae).openCoverage(o,!0)}}class Se extends De{testService;uriIdentityService;runEditorCommand(t,e,...o){return this.testService=t.get(y),this.uriIdentityService=t.get(_),super.runEditorCommand(t,e,...o)}_getAlternativeCommand(t){return t.getOption(re.gotoLocation).alternativeTestsCommand}_getGoToPreference(t){return t.getOption(re.gotoLocation).multipleTests||"peek"}}class be extends Se{async _getLocationModel(t,e,o,n){const r=await this.testService.getTestsRelatedToCode(e.uri,o,n);return new ie(r.map(i=>i.item.uri&&{uri:i.item.uri,range:i.item.range||new N(1,1,1,1)}).filter(W),E("relatedTests","Related Tests"))}_getNoResultFoundMessage(){return E("noTestFound","No related tests found.")}}class Zt extends be{constructor(){super({openToSide:!1,openInPeek:!1,muteMessage:!1},{id:u.GoToRelatedTest,title:c("testing.goToRelatedTest","Go to Related Test"),category:m,precondition:f.and(f.not(l.activeEditorHasTests.key),l.canGoToRelatedTest),menu:[{id:a.EditorContext,group:"testing",order:4}]})}}class $t extends be{constructor(){super({openToSide:!1,openInPeek:!0,muteMessage:!1},{id:u.PeekRelatedTest,title:c("testing.peekToRelatedTest","Peek Related Test"),category:m,precondition:f.and(l.canGoToRelatedTest,f.not(l.activeEditorHasTests.key),ue.notInPeekEditor,k.isInEmbeddedEditor.toNegated()),menu:[{id:a.EditorContext,group:"testing",order:5}]})}}class Ae extends Se{async _getLocationModel(t,e,o,n){const r=await Ie(this.testService,this.uriIdentityService,e.uri,o),i=await Promise.all(r.map(h=>this.testService.getCodeRelatedToTest(h)));return new ie(i.flat(),E("relatedCode","Related Code"))}_getNoResultFoundMessage(){return E("noRelatedCode","No related code found.")}}class eo extends Ae{constructor(){super({openToSide:!1,openInPeek:!1,muteMessage:!1},{id:u.GoToRelatedCode,title:c("testing.goToRelatedCode","Go to Related Code"),category:m,precondition:f.and(l.activeEditorHasTests,l.canGoToRelatedCode),menu:[{id:a.EditorContext,group:"testing",order:4}]})}}class to extends Ae{constructor(){super({openToSide:!1,openInPeek:!0,muteMessage:!1},{id:u.PeekRelatedCode,title:c("testing.peekToRelatedCode","Peek Related Code"),category:m,precondition:f.and(l.activeEditorHasTests,l.canGoToRelatedCode,ue.notInPeekEditor,k.isInEmbeddedEditor.toNegated()),menu:[{id:a.EditorContext,group:"testing",order:5}]})}}const hs=[Xt,Rt,jt,yt,At,lt,nt,ut,ot,vt,Dt,Gt,_t,mt,Mt,tt,Ct,Vt,Ot,Kt,Nt,Tt,Ft,gt,dt,eo,Zt,Et,Ze,Jt,Qt,to,$t,Yt,Ut,Wt,rt,ft,kt,Bt,pt,qt,st,Ht,it,bt,at,ct,St,ht,xt,It,wt,zt,et,$e];export{Xt as CancelTestRefreshAction,Rt as CancelTestRunAction,yt as ClearTestResultsAction,jt as CleareCoverage,At as CollapseAllAction,lt as ConfigureTestProfilesAction,nt as ContinuousRunTestAction,ut as ContinuousRunUsingProfileTestAction,ot as CoverageAction,vt as CoverageAllAction,Dt as CoverageAtCursor,Gt as CoverageCurrentFile,_t as CoverageLastRun,mt as CoverageSelectedAction,tt as DebugAction,Ct as DebugAllAction,Vt as DebugAtCursor,Ot as DebugCurrentFile,Kt as DebugFailedTests,Nt as DebugLastRun,Tt as DebugSelectedAction,gt as GetExplorerSelection,dt as GetSelectedProfiles,Et as GoToTest,Ze as HideTestAction,Jt as OpenCoverage,Qt as OpenOutputPeek,Ut as ReRunFailedTests,Wt as ReRunLastRun,Yt as RefreshTestsAction,rt as RunAction,ft as RunAllAction,kt as RunAtCursor,Bt as RunCurrentFile,pt as RunSelectedAction,st as RunUsingProfileAction,Ht as SearchForTestExtension,it as SelectDefaultTestProfiles,bt as ShowMostRecentOutputAction,St as TestingSortByDurationAction,ht as TestingSortByLocationAction,xt as TestingSortByStatusAction,It as TestingViewAsListAction,wt as TestingViewAsTreeAction,zt as ToggleInlineTestOutput,et as UnhideAllTestsAction,$e as UnhideTestAction,hs as allTestActions,we as discoverAndRunTests};