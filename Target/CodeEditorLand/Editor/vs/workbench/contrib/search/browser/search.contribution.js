import{KeyCode as k,KeyMod as l}from"../../../../base/common/keyCodes.js";import*as S from"../../../../base/common/platform.js";import{AbstractGotoLineQuickAccessProvider as E}from"../../../../editor/contrib/quickAccess/browser/gotoLineQuickAccess.js";import*as e from"../../../../nls.js";import{ConfigurationScope as i,Extensions as z}from"../../../../platform/configuration/common/configurationRegistry.js";import{ContextKeyExpr as R}from"../../../../platform/contextkey/common/contextkey.js";import{SyncDescriptor as h}from"../../../../platform/instantiation/common/descriptors.js";import{InstantiationType as d,registerSingleton as u}from"../../../../platform/instantiation/common/extensions.js";import{Extensions as v}from"../../../../platform/quickinput/common/quickAccess.js";import{Registry as o}from"../../../../platform/registry/common/platform.js";import{ViewPaneContainer as x}from"../../../browser/parts/views/viewPaneContainer.js";import{defaultQuickAccessContextKeyValue as I}from"../../../browser/quickaccess.js";import{Extensions as p,ViewContainerLocation as D}from"../../../common/views.js";import{GotoSymbolQuickAccessProvider as P}from"../../codeEditor/browser/quickaccess/gotoSymbolQuickAccess.js";import{AnythingQuickAccessProvider as f}from"./anythingQuickAccess.js";import{registerContributions as O}from"./replaceContributions.js";import{registerContributions as A}from"./notebookSearch/notebookSearchContributions.js";import{searchViewIcon as m}from"./searchIcons.js";import{SearchView as T}from"./searchView.js";import{registerContributions as F}from"./searchWidget.js";import{SymbolsQuickAccessProvider as g}from"./symbolsQuickAccess.js";import{ISearchHistoryService as V,SearchHistoryService as M}from"../common/searchHistoryService.js";import{ISearchViewModelWorkbenchService as W,SearchViewModelWorkbenchService as Q}from"./searchModel.js";import{SearchSortOrder as r,SEARCH_EXCLUDE_CONFIG as q,VIEWLET_ID as y,ViewMode as t,VIEW_ID as _,DEFAULT_MAX_SEARCH_RESULTS as L}from"../../../services/search/common/search.js";import{CommandsRegistry as H}from"../../../../platform/commands/common/commands.js";import{assertType as N}from"../../../../base/common/types.js";import{getWorkspaceSymbols as U}from"../common/search.js";import*as b from"../common/constants.js";import"./searchActionsCopy.js";import"./searchActionsFind.js";import"./searchActionsNav.js";import"./searchActionsRemoveReplace.js";import"./searchActionsSymbol.js";import"./searchActionsTopBar.js";import"./searchActionsTextQuickAccess.js";import{TEXT_SEARCH_QUICK_ACCESS_PREFIX as B,TextSearchQuickAccess as K}from"./quickTextSearch/textSearchQuickAccess.js";import{Extensions as G}from"../../../common/configuration.js";u(W,Q,d.Delayed),u(V,M,d.Delayed),O(),A(),F();const X="search.mode",w=o.as(p.ViewContainersRegistry).registerViewContainer({id:y,title:e.localize2("search","Search"),ctorDescriptor:new h(x,[y,{mergeViewWithContainerWhenSingleView:!0}]),hideIfEmpty:!0,icon:m,order:1},D.Sidebar,{doNotRegisterOpenCommand:!0}),$={id:_,containerIcon:m,name:e.localize2("search","Search"),ctorDescriptor:new h(T),canToggleVisibility:!1,canMoveView:!0,openCommandActionDescriptor:{id:w.id,mnemonicTitle:e.localize({key:"miViewSearch",comment:["&& denotes a mnemonic"]},"&&Search"),keybindings:{primary:l.CtrlCmd|l.Shift|k.KeyF,when:R.regex("neverMatch",/doesNotMatch/)},order:1}};o.as(p.ViewsRegistry).registerViews([$],w);const s=o.as(v.Quickaccess);s.registerQuickAccessProvider({ctor:f,prefix:f.PREFIX,placeholder:e.localize("anythingQuickAccessPlaceholder","Search files by name (append {0} to go to line or {1} to go to symbol)",E.PREFIX,P.PREFIX),contextKey:I,helpEntries:[{description:e.localize("anythingQuickAccess","Go to File"),commandId:"workbench.action.quickOpen",commandCenterOrder:10}]}),s.registerQuickAccessProvider({ctor:g,prefix:g.PREFIX,placeholder:e.localize("symbolsQuickAccessPlaceholder","Type the name of a symbol to open."),contextKey:"inWorkspaceSymbolsPicker",helpEntries:[{description:e.localize("symbolsQuickAccess","Go to Symbol in Workspace"),commandId:b.SearchCommandIds.ShowAllSymbolsActionId}]}),s.registerQuickAccessProvider({ctor:K,prefix:B,contextKey:"inTextSearchPicker",placeholder:e.localize("textSearchPickerPlaceholder","Search for text in your workspace files."),helpEntries:[{description:e.localize("textSearchPickerHelp","Search for Text"),commandId:b.SearchCommandIds.QuickTextSearchActionId,commandCenterOrder:25}]});const j=o.as(z.Configuration);j.registerConfiguration({id:"search",order:13,title:e.localize("searchConfigurationTitle","Search"),type:"object",properties:{[q]:{type:"object",markdownDescription:e.localize("exclude","Configure [glob patterns](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options) for excluding files and folders in fulltext searches and file search in quick open. To exclude files from the recently opened list in quick open, patterns must be absolute (for example `**/node_modules/**`). Inherits all glob patterns from the `#files.exclude#` setting."),default:{"**/node_modules":!0,"**/bower_components":!0,"**/*.code-search":!0},additionalProperties:{anyOf:[{type:"boolean",description:e.localize("exclude.boolean","The glob pattern to match file paths against. Set to true or false to enable or disable the pattern.")},{type:"object",properties:{when:{type:"string",pattern:"\\w*\\$\\(basename\\)\\w*",default:"$(basename).ext",markdownDescription:e.localize({key:"exclude.when",comment:["\\$(basename) should not be translated"]},"Additional check on the siblings of a matching file. Use \\$(basename) as variable for the matching file name.")}}}]},scope:i.RESOURCE},[X]:{type:"string",enum:["view","reuseEditor","newEditor"],default:"view",markdownDescription:e.localize("search.mode","Controls where new `Search: Find in Files` and `Find in Folder` operations occur: either in the search view, or in a search editor."),enumDescriptions:[e.localize("search.mode.view","Search in the search view, either in the panel or side bars."),e.localize("search.mode.reuseEditor","Search in an existing search editor if present, otherwise in a new search editor."),e.localize("search.mode.newEditor","Search in a new search editor.")]},"search.useRipgrep":{type:"boolean",description:e.localize("useRipgrep",'This setting is deprecated and now falls back on "search.usePCRE2".'),deprecationMessage:e.localize("useRipgrepDeprecated",'Deprecated. Consider "search.usePCRE2" for advanced regex feature support.'),default:!0},"search.maintainFileSearchCache":{type:"boolean",deprecationMessage:e.localize("maintainFileSearchCacheDeprecated","The search cache is kept in the extension host which never shuts down, so this setting is no longer needed."),description:e.localize("search.maintainFileSearchCache","When enabled, the searchService process will be kept alive instead of being shut down after an hour of inactivity. This will keep the file search cache in memory."),default:!1},"search.useIgnoreFiles":{type:"boolean",markdownDescription:e.localize("useIgnoreFiles","Controls whether to use `.gitignore` and `.ignore` files when searching for files."),default:!0,scope:i.RESOURCE},"search.useGlobalIgnoreFiles":{type:"boolean",markdownDescription:e.localize("useGlobalIgnoreFiles","Controls whether to use your global gitignore file (for example, from `$HOME/.config/git/ignore`) when searching for files. Requires {0} to be enabled.","`#search.useIgnoreFiles#`"),default:!1,scope:i.RESOURCE},"search.useParentIgnoreFiles":{type:"boolean",markdownDescription:e.localize("useParentIgnoreFiles","Controls whether to use `.gitignore` and `.ignore` files in parent directories when searching for files. Requires {0} to be enabled.","`#search.useIgnoreFiles#`"),default:!1,scope:i.RESOURCE},"search.quickOpen.includeSymbols":{type:"boolean",description:e.localize("search.quickOpen.includeSymbols","Whether to include results from a global symbol search in the file results for Quick Open."),default:!1},"search.ripgrep.maxThreads":{type:"number",description:e.localize("search.ripgrep.maxThreads","Number of threads to use for searching. When set to 0, the engine automatically determines this value."),default:0},"search.quickOpen.includeHistory":{type:"boolean",description:e.localize("search.quickOpen.includeHistory","Whether to include results from recently opened files in the file results for Quick Open."),default:!0},"search.quickOpen.history.filterSortOrder":{type:"string",enum:["default","recency"],default:"default",enumDescriptions:[e.localize("filterSortOrder.default","History entries are sorted by relevance based on the filter value used. More relevant entries appear first."),e.localize("filterSortOrder.recency","History entries are sorted by recency. More recently opened entries appear first.")],description:e.localize("filterSortOrder","Controls sorting order of editor history in quick open when filtering.")},"search.followSymlinks":{type:"boolean",description:e.localize("search.followSymlinks","Controls whether to follow symlinks while searching."),default:!0},"search.smartCase":{type:"boolean",description:e.localize("search.smartCase","Search case-insensitively if the pattern is all lowercase, otherwise, search case-sensitively."),default:!1},"search.globalFindClipboard":{type:"boolean",default:!1,description:e.localize("search.globalFindClipboard","Controls whether the search view should read or modify the shared find clipboard on macOS."),included:S.isMacintosh},"search.location":{type:"string",enum:["sidebar","panel"],default:"sidebar",description:e.localize("search.location","Controls whether the search will be shown as a view in the sidebar or as a panel in the panel area for more horizontal space."),deprecationMessage:e.localize("search.location.deprecationMessage","This setting is deprecated. You can drag the search icon to a new location instead.")},"search.maxResults":{type:["number","null"],default:L,markdownDescription:e.localize("search.maxResults","Controls the maximum number of search results, this can be set to `null` (empty) to return unlimited results.")},"search.collapseResults":{type:"string",enum:["auto","alwaysCollapse","alwaysExpand"],enumDescriptions:[e.localize("search.collapseResults.auto","Files with less than 10 results are expanded. Others are collapsed."),"",""],default:"alwaysExpand",description:e.localize("search.collapseAllResults","Controls whether the search results will be collapsed or expanded.")},"search.useReplacePreview":{type:"boolean",default:!0,description:e.localize("search.useReplacePreview","Controls whether to open Replace Preview when selecting or replacing a match.")},"search.showLineNumbers":{type:"boolean",default:!1,description:e.localize("search.showLineNumbers","Controls whether to show line numbers for search results.")},"search.usePCRE2":{type:"boolean",default:!1,description:e.localize("search.usePCRE2","Whether to use the PCRE2 regex engine in text search. This enables using some advanced regex features like lookahead and backreferences. However, not all PCRE2 features are supported - only features that are also supported by JavaScript."),deprecationMessage:e.localize("usePCRE2Deprecated","Deprecated. PCRE2 will be used automatically when using regex features that are only supported by PCRE2.")},"search.actionsPosition":{type:"string",enum:["auto","right"],enumDescriptions:[e.localize("search.actionsPositionAuto","Position the actionbar to the right when the search view is narrow, and immediately after the content when the search view is wide."),e.localize("search.actionsPositionRight","Always position the actionbar to the right.")],default:"right",description:e.localize("search.actionsPosition","Controls the positioning of the actionbar on rows in the search view.")},"search.searchOnType":{type:"boolean",default:!0,description:e.localize("search.searchOnType","Search all files as you type.")},"search.seedWithNearestWord":{type:"boolean",default:!1,description:e.localize("search.seedWithNearestWord","Enable seeding search from the word nearest the cursor when the active editor has no selection.")},"search.seedOnFocus":{type:"boolean",default:!1,markdownDescription:e.localize("search.seedOnFocus","Update the search query to the editor's selected text when focusing the search view. This happens either on click or when triggering the `workbench.views.search.focus` command.")},"search.searchOnTypeDebouncePeriod":{type:"number",default:300,markdownDescription:e.localize("search.searchOnTypeDebouncePeriod","When {0} is enabled, controls the timeout in milliseconds between a character being typed and the search starting. Has no effect when {0} is disabled.","`#search.searchOnType#`")},"search.searchEditor.doubleClickBehaviour":{type:"string",enum:["selectWord","goToLocation","openLocationToSide"],default:"goToLocation",enumDescriptions:[e.localize("search.searchEditor.doubleClickBehaviour.selectWord","Double-clicking selects the word under the cursor."),e.localize("search.searchEditor.doubleClickBehaviour.goToLocation","Double-clicking opens the result in the active editor group."),e.localize("search.searchEditor.doubleClickBehaviour.openLocationToSide","Double-clicking opens the result in the editor group to the side, creating one if it does not yet exist.")],markdownDescription:e.localize("search.searchEditor.doubleClickBehaviour","Configure effect of double-clicking a result in a search editor.")},"search.searchEditor.singleClickBehaviour":{type:"string",enum:["default","peekDefinition"],default:"default",enumDescriptions:[e.localize("search.searchEditor.singleClickBehaviour.default","Single-clicking does nothing."),e.localize("search.searchEditor.singleClickBehaviour.peekDefinition","Single-clicking opens a Peek Definition window.")],markdownDescription:e.localize("search.searchEditor.singleClickBehaviour","Configure effect of single-clicking a result in a search editor.")},"search.searchEditor.reusePriorSearchConfiguration":{type:"boolean",default:!1,markdownDescription:e.localize({key:"search.searchEditor.reusePriorSearchConfiguration",comment:['"Search Editor" is a type of editor that can display search results. "includes, excludes, and flags" refers to the "files to include" and "files to exclude" input boxes, and the flags that control whether a query is case-sensitive or a regex.']},"When enabled, new Search Editors will reuse the includes, excludes, and flags of the previously opened Search Editor.")},"search.searchEditor.defaultNumberOfContextLines":{type:["number","null"],default:1,markdownDescription:e.localize("search.searchEditor.defaultNumberOfContextLines","The default number of surrounding context lines to use when creating new Search Editors. If using `#search.searchEditor.reusePriorSearchConfiguration#`, this can be set to `null` (empty) to use the prior Search Editor's configuration.")},"search.searchEditor.focusResultsOnSearch":{type:"boolean",default:!1,markdownDescription:e.localize("search.searchEditor.focusResultsOnSearch","When a search is triggered, focus the Search Editor results instead of the Search Editor input.")},"search.sortOrder":{type:"string",enum:[r.Default,r.FileNames,r.Type,r.Modified,r.CountDescending,r.CountAscending],default:r.Default,enumDescriptions:[e.localize("searchSortOrder.default","Results are sorted by folder and file names, in alphabetical order."),e.localize("searchSortOrder.filesOnly","Results are sorted by file names ignoring folder order, in alphabetical order."),e.localize("searchSortOrder.type","Results are sorted by file extensions, in alphabetical order."),e.localize("searchSortOrder.modified","Results are sorted by file last modified date, in descending order."),e.localize("searchSortOrder.countDescending","Results are sorted by count per file, in descending order."),e.localize("searchSortOrder.countAscending","Results are sorted by count per file, in ascending order.")],description:e.localize("search.sortOrder","Controls sorting order of search results.")},"search.decorations.colors":{type:"boolean",description:e.localize("search.decorations.colors","Controls whether search file decorations should use colors."),default:!0},"search.decorations.badges":{type:"boolean",description:e.localize("search.decorations.badges","Controls whether search file decorations should use badges."),default:!0},"search.defaultViewMode":{type:"string",enum:[t.Tree,t.List],default:t.List,enumDescriptions:[e.localize("scm.defaultViewMode.tree","Shows search results as a tree."),e.localize("scm.defaultViewMode.list","Shows search results as a list.")],description:e.localize("search.defaultViewMode","Controls the default search result view mode.")},"search.quickAccess.preserveInput":{type:"boolean",description:e.localize("search.quickAccess.preserveInput","Controls whether the last typed input to Quick Search should be restored when opening it the next time."),default:!1},"search.experimental.closedNotebookRichContentResults":{type:"boolean",description:e.localize("search.experimental.closedNotebookResults","Show notebook editor rich content results for closed notebooks. Please refresh your search results after changing this setting."),default:!1}}}),H.registerCommand("_executeWorkspaceSymbolProvider",async function(a,...n){const[c]=n;return N(typeof c=="string"),(await U(c)).map(C=>C.symbol)}),o.as(G.ConfigurationMigration).registerConfigurationMigrations([{key:"search.experimental.quickAccess.preserveInput",migrateFn:(a,n)=>[["search.quickAccess.preserveInput",{value:a}],["search.experimental.quickAccess.preserveInput",{value:void 0}]]}]);