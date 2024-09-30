import*as n from"../../../../nls.js";import"../../../../platform/commands/common/commands.js";import"../../../../platform/instantiation/common/instantiation.js";import{WorkbenchListFocusContextKey as K}from"../../../../platform/list/browser/listService.js";import{IViewsService as u}from"../../../services/views/common/viewsService.js";import{searchClearIcon as E,searchCollapseAllIcon as F,searchExpandAllIcon as L,searchRefreshIcon as N,searchShowAsList as q,searchShowAsTree as z,searchStopIcon as P}from"./searchIcons.js";import*as e from"../common/constants.js";import{ISearchHistoryService as M}from"../common/searchHistoryService.js";import{FileMatch as H,FolderMatch as v,FolderMatchNoRoot as b,FolderMatchWorkspaceRoot as V,Match as x,SearchResult as y}from"./searchModel.js";import{VIEW_ID as S}from"../../../services/search/common/search.js";import{ContextKeyExpr as a}from"../../../../platform/contextkey/common/contextkey.js";import{Action2 as l,MenuId as m,registerAction2 as d}from"../../../../platform/actions/common/actions.js";import{KeybindingWeight as k}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{KeyCode as W}from"../../../../base/common/keyCodes.js";import{SearchStateKey as I,SearchUIState as T}from"../common/search.js";import{category as h,getSearchView as p}from"./searchActionsBase.js";d(class extends l{constructor(){super({id:e.SearchCommandIds.ClearSearchHistoryCommandId,title:n.localize2("clearSearchHistoryLabel","Clear Search History"),category:h,f1:!0})}async run(t){D(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.CancelSearchActionId,title:n.localize2("CancelSearchAction.label","Cancel Search"),icon:P,category:h,f1:!0,precondition:I.isEqualTo(T.Idle).negate(),keybinding:{weight:k.WorkbenchContrib,when:a.and(e.SearchContext.SearchViewVisibleKey,K),primary:W.Escape},menu:[{id:m.ViewTitle,group:"navigation",order:0,when:a.and(a.equals("view",S),I.isEqualTo(T.SlowSearch))}]})}run(t){return _(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.RefreshSearchResultsActionId,title:n.localize2("RefreshAction.label","Refresh"),icon:N,precondition:e.SearchContext.ViewHasSearchPatternKey,category:h,f1:!0,menu:[{id:m.ViewTitle,group:"navigation",order:0,when:a.and(a.equals("view",S),I.isEqualTo(T.SlowSearch).negate())}]})}run(t,...c){return j(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.CollapseSearchResultsActionId,title:n.localize2("CollapseDeepestExpandedLevelAction.label","Collapse All"),category:h,icon:F,f1:!0,precondition:a.and(e.SearchContext.HasSearchResults,e.SearchContext.ViewHasSomeCollapsibleKey),menu:[{id:m.ViewTitle,group:"navigation",order:4,when:a.and(a.equals("view",S),a.or(e.SearchContext.HasSearchResults.negate(),e.SearchContext.ViewHasSomeCollapsibleKey))}]})}run(t,...c){return B(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.ExpandSearchResultsActionId,title:n.localize2("ExpandAllAction.label","Expand All"),category:h,icon:L,f1:!0,precondition:a.and(e.SearchContext.HasSearchResults,e.SearchContext.ViewHasSomeCollapsibleKey.toNegated()),menu:[{id:m.ViewTitle,group:"navigation",order:4,when:a.and(a.equals("view",S),e.SearchContext.HasSearchResults,e.SearchContext.ViewHasSomeCollapsibleKey.toNegated())}]})}async run(t,...c){return Q(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.ClearSearchResultsActionId,title:n.localize2("ClearSearchResultsAction.label","Clear Search Results"),category:h,icon:E,f1:!0,precondition:a.or(e.SearchContext.HasSearchResults,e.SearchContext.ViewHasSearchPatternKey,e.SearchContext.ViewHasReplacePatternKey,e.SearchContext.ViewHasFilePatternKey),menu:[{id:m.ViewTitle,group:"navigation",order:1,when:a.equals("view",S)}]})}run(t,...c){return U(t)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.ViewAsTreeActionId,title:n.localize2("ViewAsTreeAction.label","View as Tree"),category:h,icon:q,f1:!0,precondition:a.and(e.SearchContext.HasSearchResults,e.SearchContext.InTreeViewKey.toNegated()),menu:[{id:m.ViewTitle,group:"navigation",order:2,when:a.and(a.equals("view",S),e.SearchContext.InTreeViewKey.toNegated())}]})}async run(t,...c){const r=p(t.get(u));r&&await r.setTreeView(!0)}}),d(class extends l{constructor(){super({id:e.SearchCommandIds.ViewAsListActionId,title:n.localize2("ViewAsListAction.label","View as List"),category:h,icon:z,f1:!0,precondition:a.and(e.SearchContext.HasSearchResults,e.SearchContext.InTreeViewKey),menu:[{id:m.ViewTitle,group:"navigation",order:2,when:a.and(a.equals("view",S),e.SearchContext.InTreeViewKey)}]})}async run(t,...c){const r=p(t.get(u));r&&await r.setTreeView(!1)}});const D=o=>{o.get(M).clearHistory()};async function Q(o){const t=o.get(u),c=p(t);if(c){const r=c.getControl();c.shouldShowAIResults()?c.model.hasAIResults?r.expandAll():await r.expand(c.model.searchResult.plainTextSearchResult,!0):r.expandAll()}}function U(o){const t=o.get(u);p(t)?.clearSearchResults()}function _(o){const t=o.get(u);p(t)?.cancelSearch()}function j(o){const t=o.get(u);p(t)?.triggerQueryChange({preserveFocus:!1})}function B(o){const t=o.get(u),c=p(t);if(c){const r=c.getControl(),f=r.navigate();let s=f.first(),R=!1,g=!1;if(s instanceof V||c.isTreeLayoutViewVisible)for(;s=f.next();){if(s instanceof x){R=!0;break}if(c.isTreeLayoutViewVisible&&!g){let A=s;if(s instanceof v){const i=r.getCompressedTreeNode(s)?.elements[0].element;A=i&&!(i instanceof x)&&!(i instanceof y)?i:s}const w=A.parent();w instanceof V||w instanceof b||w instanceof y||(g=!0)}}if(R){s=f.first();do s instanceof H&&r.collapse(s);while(s=f.next())}else if(g){if(s=f.first(),s)do{let A=s;if(s instanceof v){const i=r.getCompressedTreeNode(s)?.elements[0].element;A=i&&!(i instanceof x)&&!(i instanceof y)?i:s}const w=A.parent();(w instanceof V||w instanceof b)&&(r.hasNode(s)?r.collapse(s,!0):r.collapseAll())}while(s=f.next())}else r.collapseAll();const C=r.getFocus()[0]?.parent();C&&(C instanceof v||C instanceof H)&&r.hasNode(C)&&r.isCollapsed(C)&&(r.domFocus(),r.focusFirst(),r.setSelection(r.getFocus()))}}