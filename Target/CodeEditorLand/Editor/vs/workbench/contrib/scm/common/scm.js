import"../../../../base/common/uri.js";import{createDecorator as r}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../base/common/event.js";import"../../../../base/common/lifecycle.js";import"../../../../editor/common/languages.js";import"../../../../base/common/actions.js";import"../../../../platform/actions/common/actions.js";import"../../../../base/common/themables.js";import"../../../../base/common/htmlContent.js";import"../../../../base/common/resourceTree.js";import"./history.js";import"../../../../editor/common/model.js";import"../../../../base/common/observable.js";const T="workbench.view.scm",U="workbench.scm",_="workbench.scm.repositories",A="workbench.scm.history",O=r("scm");var n=(e=>(e[e.Error=0]="Error",e[e.Warning=1]="Warning",e[e.Information=2]="Information",e))(n||{}),i=(o=>(o[o.HistoryPrevious=0]="HistoryPrevious",o[o.HistoryNext=1]="HistoryNext",o))(i||{}),t=(e=>(e.DiscoveryTime="discoveryTime",e.Name="name",e.Path="path",e))(t||{});const B=r("scmView"),G="workbench.editor.scmChangesEditor";export{A as HISTORY_VIEW_PANE_ID,t as ISCMRepositorySortKey,O as ISCMService,B as ISCMViewService,n as InputValidationType,_ as REPOSITORIES_VIEW_PANE_ID,i as SCMInputChangeReason,G as SCM_CHANGES_EDITOR_ID,T as VIEWLET_ID,U as VIEW_PANE_ID};