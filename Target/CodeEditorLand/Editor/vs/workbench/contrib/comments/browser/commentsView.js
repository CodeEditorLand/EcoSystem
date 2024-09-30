var R=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var w=(c,a,e,t)=>{for(var i=t>1?void 0:t?W(a,e):a,o=c.length-1,n;o>=0;o--)(n=c[o])&&(i=(t?n(a,e,i):n(i))||i);return t&&i&&R(a,e,i),i},r=(c,a)=>(e,t)=>a(e,t,c);import"./media/panel.css";import*as s from"../../../../nls.js";import*as h from"../../../../base/browser/dom.js";import{basename as f}from"../../../../base/common/resources.js";import{IInstantiationService as A}from"../../../../platform/instantiation/common/instantiation.js";import{IThemeService as _}from"../../../../platform/theme/common/themeService.js";import{CommentNode as l,ResourceWithCommentThreads as u}from"../common/commentModel.js";import{ICommentService as V}from"./commentService.js";import{IEditorService as B}from"../../../services/editor/common/editorService.js";import{ResourceLabels as D}from"../../../browser/labels.js";import{CommentsList as K,COMMENTS_VIEW_TITLE as U,Filter as H}from"./commentsTreeViewer.js";import{FilterViewPane as P}from"../../../browser/parts/views/viewPane.js";import{IViewDescriptorService as z}from"../../../common/views.js";import{IConfigurationService as k}from"../../../../platform/configuration/common/configuration.js";import{IContextKeyService as j,RawContextKey as y}from"../../../../platform/contextkey/common/contextkey.js";import{IContextMenuService as X}from"../../../../platform/contextview/browser/contextView.js";import{IKeybindingService as $}from"../../../../platform/keybinding/common/keybinding.js";import{IOpenerService as Y}from"../../../../platform/opener/common/opener.js";import{ITelemetryService as G}from"../../../../platform/telemetry/common/telemetry.js";import{IUriIdentityService as q}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{CommentsViewFilterFocusContextKey as J}from"./comments.js";import{CommentsFilters as Q,CommentsSortOrder as b}from"./commentsViewActions.js";import{Memento as Z}from"../../../common/memento.js";import{IStorageService as ee,StorageScope as te,StorageTarget as ie}from"../../../../platform/storage/common/storage.js";import{FilterOptions as x}from"./commentsFilterOptions.js";import{CommentThreadApplicability as F,CommentThreadState as E}from"../../../../editor/common/languages.js";import{revealCommentThread as re}from"./commentsController.js";import{registerNavigableContainer as oe}from"../../../browser/actions/widgetNavigationCommands.js";import{CommentsModel as I,threadHasMeaningfulComments as se}from"./commentsModel.js";import{IHoverService as ne}from"../../../../platform/hover/browser/hover.js";import{AccessibilityVerbositySettingId as ae}from"../../accessibility/browser/accessibilityConfiguration.js";import{AccessibleViewAction as me}from"../../accessibility/browser/accessibleViewActions.js";import{IPathService as de}from"../../../services/path/common/pathService.js";import{isCodeEditor as ce}from"../../../../editor/browser/editorBrowser.js";const he=new y("commentsView.hasComments",!1),le=new y("commentsView.someCommentsExpanded",!1),ue=new y("commentsView.commentFocused",!1),fe="commentsViewState";function ve(c){const a=[];for(const e of c.resourceCommentThreads){const t=[];for(const i of e.commentThreads)se(i.thread)&&t.push({element:i});t.length>0&&a.push({element:e,children:t})}return a}let g=class extends P{constructor(e,t,i,o,n,d,v,m,p,M,pe,N,L,ge,O,Ce){const T=new Z(fe,O),C=T.getMemento(te.WORKSPACE,ie.MACHINE);super({...e,filterOptions:{placeholder:s.localize("comments.filter.placeholder","Filter (e.g. text, author)"),ariaLabel:s.localize("comments.filter.ariaLabel","Filter comments"),history:C.filterHistory||[],text:C.filter||"",focusContextKey:J.key}},m,v,n,d,i,t,p,M,N,L);this.editorService=o;this.commentService=pe;this.uriIdentityService=ge;this.pathService=Ce;this.hasCommentsContextKey=he.bindTo(d),this.someCommentsExpandedContextKey=le.bindTo(d),this.commentsFocusedContextKey=ue.bindTo(d),this.stateMemento=T,this.viewState=C,this.filters=this._register(new Q({showResolved:this.viewState.showResolved!==!1,showUnresolved:this.viewState.showUnresolved!==!1,sortBy:this.viewState.sortBy??b.ResourceAscending},this.contextKeyService)),this.filter=new H(new x(this.filterWidget.getFilterText(),this.filters.showResolved,this.filters.showUnresolved)),this._register(this.filters.onDidChange(S=>{(S.showResolved||S.showUnresolved)&&this.updateFilter(),S.sortBy&&this.refresh()})),this._register(this.filterWidget.onDidChangeFilterText(()=>this.updateFilter()))}treeLabels;tree;treeContainer;messageBoxContainer;totalComments=0;hasCommentsContextKey;someCommentsExpandedContextKey;commentsFocusedContextKey;filter;filters;currentHeight=0;currentWidth=0;viewState;stateMemento;cachedFilterStats=void 0;onDidChangeVisibility=this.onDidChangeBodyVisibility;get focusedCommentNode(){const e=this.tree?.getFocus();if(e?.length===1&&e[0]instanceof l)return e[0]}get focusedCommentInfo(){if(this.focusedCommentNode)return this.getScreenReaderInfoForNode(this.focusedCommentNode)}focusNextNode(){if(!this.tree)return;const e=this.tree.getFocus()?.[0];if(!e)return;let t=this.tree.navigate(e).next();for(;t&&!(t instanceof l);)t=this.tree.navigate(t).next();t&&this.tree.setFocus([t])}focusPreviousNode(){if(!this.tree)return;const e=this.tree.getFocus()?.[0];if(!e)return;let t=this.tree.navigate(e).previous();for(;t&&!(t instanceof l);)t=this.tree.navigate(t).previous();t&&this.tree.setFocus([t])}saveState(){this.viewState.filter=this.filterWidget.getFilterText(),this.viewState.filterHistory=this.filterWidget.getHistory(),this.viewState.showResolved=this.filters.showResolved,this.viewState.showUnresolved=this.filters.showUnresolved,this.viewState.sortBy=this.filters.sortBy,this.stateMemento.saveMemento(),super.saveState()}render(){super.render(),this._register(oe({name:"commentsView",focusNotifiers:[this,this.filterWidget],focusNextWidget:()=>{this.filterWidget.hasFocus()&&this.focus()},focusPreviousWidget:()=>{this.filterWidget.hasFocus()||this.focusFilter()}}))}focusFilter(){this.filterWidget.focus()}clearFilterText(){this.filterWidget.setFilterText("")}getFilterStats(){return this.cachedFilterStats||(this.cachedFilterStats={total:this.totalComments,filtered:this.tree?.getVisibleItemCount()??0}),this.cachedFilterStats}updateFilter(){this.filter.options=new x(this.filterWidget.getFilterText(),this.filters.showResolved,this.filters.showUnresolved),this.tree?.filterComments(),this.cachedFilterStats=void 0;const{total:e,filtered:t}=this.getFilterStats();this.filterWidget.updateBadge(e===t||e===0?void 0:s.localize("showing filtered results","Showing {0} of {1}",t,e)),this.filterWidget.checkMoreFilters(!this.filters.showResolved||!this.filters.showUnresolved)}renderBody(e){super.renderBody(e),e.classList.add("comments-panel");const t=h.append(e,h.$(".comments-panel-container"));this.treeContainer=h.append(t,h.$(".tree-container")),this.treeContainer.classList.add("file-icon-themable-tree","show-file-icons"),this.cachedFilterStats=void 0,this.createTree(),this.createMessageBox(t),this._register(this.commentService.onDidSetAllCommentThreads(this.onAllCommentsChanged,this)),this._register(this.commentService.onDidUpdateCommentThreads(this.onCommentsUpdated,this)),this._register(this.commentService.onDidDeleteDataProvider(this.onDataProviderDeleted,this)),this._register(this.onDidChangeBodyVisibility(i=>{i&&this.refresh()})),this.renderComments()}focus(){super.focus();const e=this.tree?.getHTMLElement();e&&h.isActiveElement(e)||(!this.commentService.commentsModel.hasCommentThreads()&&this.messageBoxContainer?this.messageBoxContainer.focus():this.tree&&this.tree.domFocus())}renderComments(){this.treeContainer.classList.toggle("hidden",!this.commentService.commentsModel.hasCommentThreads()),this.renderMessage(),this.tree?.setChildren(null,ve(this.commentService.commentsModel))}collapseAll(){this.tree&&(this.tree.collapseAll(),this.tree.setSelection([]),this.tree.setFocus([]),this.tree.domFocus(),this.tree.focusFirst())}expandAll(){this.tree&&(this.tree.expandAll(),this.tree.setSelection([]),this.tree.setFocus([]),this.tree.domFocus(),this.tree.focusFirst())}get hasRendered(){return!!this.tree}layoutBodyContent(e=this.currentHeight,t=this.currentWidth){this.messageBoxContainer&&(this.messageBoxContainer.style.height=`${e}px`),this.tree?.layout(e,t),this.currentHeight=e,this.currentWidth=t}createMessageBox(e){this.messageBoxContainer=h.append(e,h.$(".message-box-container")),this.messageBoxContainer.setAttribute("tabIndex","0")}renderMessage(){this.messageBoxContainer.textContent=this.commentService.commentsModel.getMessage(),this.messageBoxContainer.classList.toggle("hidden",this.commentService.commentsModel.hasCommentThreads())}getScreenReaderInfoForNode(e,t){let i="";if(t&&this.configurationService.getValue(ae.Comments)){const p=this.keybindingService.lookupKeybinding(me.id)?.getAriaLabel();i=p?s.localize("acessibleViewHint",`Inspect this in the accessible view ({0}).
`,p):s.localize("acessibleViewHintNoKbOpen",`Inspect this in the accessible view via the command Open Accessible View which is currently not triggerable via keybinding.
`)}const o=this.getReplyCountAsString(e,t),n=this.getRepliesAsString(e,t),d=this.editorService.findEditors(e.resource),v=this.editorService.activeEditorPane?.getControl();let m;return e.range&&d?.length&&ce(v)&&(m=v.getModel()?.getValueInRange(e.range),m&&(m=`
Corresponding code: 
`+m)),e.range?e.threadRelevance===F.Outdated?i+s.localize("resourceWithCommentLabelOutdated",`Outdated from {0} at line {1} column {2} in {3}{4}
Comment: {5}{6}`,e.comment.userName,e.range.startLineNumber,e.range.startColumn,f(e.resource),o,typeof e.comment.body=="string"?e.comment.body:e.comment.body.value,m)+n:i+s.localize("resourceWithCommentLabel",`{0} at line {1} column {2} in {3} {4}
Comment: {5}{6}`,e.comment.userName,e.range.startLineNumber,e.range.startColumn,f(e.resource),o,typeof e.comment.body=="string"?e.comment.body:e.comment.body.value,m)+n:e.threadRelevance===F.Outdated?i+s.localize("resourceWithCommentLabelFileOutdated",`Outdated from {0} in {1} {2}
Comment: {3}{4}{5}`,e.comment.userName,f(e.resource),o,typeof e.comment.body=="string"?e.comment.body:e.comment.body.value)+n:i+s.localize("resourceWithCommentLabelFile",`{0} in {1} {2}
Comment: {3}{4}`,e.comment.userName,f(e.resource),o,typeof e.comment.body=="string"?e.comment.body:e.comment.body.value,m)+n}getRepliesAsString(e,t){return!e.replies.length||t?"":`
`+e.replies.map(i=>s.localize("resourceWithRepliesLabel","{0} {1}",i.comment.userName,typeof i.comment.body=="string"?i.comment.body:i.comment.body.value)).join(`
`)}getReplyCountAsString(e,t){return e.replies.length&&!t?s.localize("replyCount"," {0} replies,",e.replies.length):""}createTree(){this.treeLabels=this._register(this.instantiationService.createInstance(D,this)),this.tree=this._register(this.instantiationService.createInstance(K,this.treeLabels,this.treeContainer,{overrideStyles:this.getLocationBasedColors().listOverrideStyles,selectionNavigation:!0,filter:this.filter,sorter:{compare:(e,t)=>{if(e instanceof I||t instanceof I)return 0;if(this.filters.sortBy===b.UpdatedAtDescending)return e.lastUpdatedAt>t.lastUpdatedAt?-1:1;if(this.filters.sortBy===b.ResourceAscending){if(e instanceof u&&t instanceof u){const i=this.pathService.defaultUriScheme;return e.resource.scheme!==t.resource.scheme&&(e.resource.scheme===i||t.resource.scheme===i)?t.resource.scheme===i?1:-1:e.resource.toString()>t.resource.toString()?1:-1}else if(e instanceof l&&t instanceof l&&e.thread.range&&t.thread.range)return e.thread.range?.startLineNumber>t.thread.range?.startLineNumber?1:-1}return 0}},keyboardNavigationLabelProvider:{getKeyboardNavigationLabel:e=>{}},accessibilityProvider:{getAriaLabel:e=>e instanceof I?s.localize("rootCommentsLabel","Comments for current workspace"):e instanceof u?s.localize("resourceWithCommentThreadsLabel","Comments in {0}, full path {1}",f(e.resource),e.resource.fsPath):e instanceof l?this.getScreenReaderInfoForNode(e,!0):"",getWidgetAriaLabel(){return U.value}}})),this._register(this.tree.onDidOpen(e=>{this.openFile(e.element,e.editorOptions.pinned,e.editorOptions.preserveFocus,e.sideBySide)})),this._register(this.tree.onDidChangeModel(()=>{this.updateSomeCommentsExpanded()})),this._register(this.tree.onDidChangeCollapseState(()=>{this.updateSomeCommentsExpanded()})),this._register(this.tree.onDidFocus(()=>this.commentsFocusedContextKey.set(!0))),this._register(this.tree.onDidBlur(()=>this.commentsFocusedContextKey.set(!1)))}openFile(e,t,i,o){if(!e||!(e instanceof u||e instanceof l))return;const n=e instanceof u?e.commentThreads[0].thread:e.thread,d=e instanceof u?e.commentThreads[0].comment:void 0;return re(this.commentService,this.editorService,this.uriIdentityService,n,d,!1,t,i,o)}async refresh(){if(this.tree&&this.isVisible()&&(this.hasCommentsContextKey.set(this.commentService.commentsModel.hasCommentThreads()),this.cachedFilterStats=void 0,this.renderComments(),this.tree.getSelection().length===0&&this.commentService.commentsModel.hasCommentThreads())){const e=this.commentService.commentsModel.resourceCommentThreads[0].commentThreads[0];e&&(this.tree.setFocus([e]),this.tree.setSelection([e]))}}onAllCommentsChanged(e){this.cachedFilterStats=void 0,this.totalComments+=e.commentThreads.length;let t=0;for(const i of e.commentThreads)i.state===E.Unresolved&&t++;this.refresh()}onCommentsUpdated(e){this.cachedFilterStats=void 0,this.totalComments+=e.added.length,this.totalComments-=e.removed.length;let t=0;for(const i of this.commentService.commentsModel.resourceCommentThreads)for(const o of i.commentThreads)o.threadState===E.Unresolved&&t++;this.refresh()}onDataProviderDeleted(e){this.cachedFilterStats=void 0,this.totalComments=0,this.refresh()}updateSomeCommentsExpanded(){this.someCommentsExpandedContextKey.set(this.isSomeCommentsExpanded())}areAllCommentsExpanded(){if(!this.tree)return!1;const e=this.tree.navigate();for(;e.next();)if(this.tree.isCollapsed(e.current()))return!1;return!0}isSomeCommentsExpanded(){if(!this.tree)return!1;const e=this.tree.navigate();for(;e.next();)if(!this.tree.isCollapsed(e.current()))return!0;return!1}};g=w([r(1,A),r(2,z),r(3,B),r(4,k),r(5,j),r(6,X),r(7,$),r(8,Y),r(9,_),r(10,V),r(11,G),r(12,ne),r(13,q),r(14,ee),r(15,de)],g);export{ue as CONTEXT_KEY_COMMENT_FOCUSED,he as CONTEXT_KEY_HAS_COMMENTS,le as CONTEXT_KEY_SOME_COMMENTS_EXPANDED,g as CommentsPanel};