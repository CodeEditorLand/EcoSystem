var W=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var I=(u,e,r,t)=>{for(var n=t>1?void 0:t?V(e,r):e,i=u.length-1,s;i>=0;i--)(s=u[i])&&(n=(t?s(e,r,n):s(n))||n);return t&&n&&W(e,r,n),n},d=(u,e)=>(r,t)=>e(r,t,u);import*as o from"../../../../base/browser/dom.js";import*as p from"../../../../nls.js";import{renderMarkdown as k}from"../../../../base/browser/markdownRenderer.js";import{DisposableStore as P}from"../../../../base/common/lifecycle.js";import{IOpenerService as K}from"../../../../platform/opener/common/opener.js";import"../../../browser/labels.js";import{CommentNode as T,ResourceWithCommentThreads as b}from"../common/commentModel.js";import{TreeVisibility as y}from"../../../../base/browser/ui/tree/tree.js";import"../../../../base/browser/ui/list/list.js";import{IConfigurationService as w}from"../../../../platform/configuration/common/configuration.js";import{IContextKeyService as _}from"../../../../platform/contextkey/common/contextkey.js";import{IListService as z,WorkbenchObjectTree as B}from"../../../../platform/list/browser/listService.js";import{IThemeService as U}from"../../../../platform/theme/common/themeService.js";import{IInstantiationService as D}from"../../../../platform/instantiation/common/instantiation.js";import{TimestampWidget as L}from"./timestamp.js";import{Codicon as x}from"../../../../base/common/codicons.js";import{ThemeIcon as N}from"../../../../base/common/themables.js";import"../../../../base/common/htmlContent.js";import{commentViewThreadStateColorVar as E,getCommentThreadStateIconColor as q}from"./commentColors.js";import{CommentThreadApplicability as j,CommentThreadState as R}from"../../../../editor/common/languages.js";import"../../../../base/common/color.js";import"../../../../base/common/filters.js";import{FilterOptions as f}from"./commentsFilterOptions.js";import{basename as G}from"../../../../base/common/resources.js";import{openLinkFromMarkdown as J}from"../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";import"../../../../platform/theme/browser/defaultStyles.js";import"../../../../base/browser/ui/list/listWidget.js";import"../../../../platform/action/common/action.js";import{CommentsModel as Q}from"./commentsModel.js";import{getDefaultHoverDelegate as X}from"../../../../base/browser/ui/hover/hoverDelegateFactory.js";import{ActionBar as Y}from"../../../../base/browser/ui/actionbar/actionbar.js";import{createActionViewItem as Z,createAndFillInContextMenuActions as ee}from"../../../../platform/actions/browser/menuEntryActionViewItem.js";import{IMenuService as te,MenuId as F}from"../../../../platform/actions/common/actions.js";import"../../../../base/common/actions.js";import{MarshalledId as A}from"../../../../base/common/marshallingIds.js";import{IContextMenuService as re}from"../../../../platform/contextview/browser/contextView.js";import{ActionViewItem as ne}from"../../../../base/browser/ui/actionbar/actionViewItems.js";import{IKeybindingService as oe}from"../../../../platform/keybinding/common/keybinding.js";import"../../../common/comments.js";import{IHoverService as ie}from"../../../../platform/hover/browser/hover.js";const ht="workbench.panel.comments",ft="Comments",vt=p.localize2("comments.view.title","Comments");class M{static RESOURCE_ID="resource-with-comments";static COMMENT_ID="comment-node";getHeight(e){return e instanceof T&&e.hasReply()?44:22}getTemplateId(e){return e instanceof b?M.RESOURCE_ID:e instanceof T?M.COMMENT_ID:""}}class se{constructor(e){this.labels=e}templateId="resource-with-comments";renderTemplate(e){const r=o.append(e,o.$(".resource-container")),t=this.labels.create(r),n=o.append(r,o.$(".separator")),i=r.appendChild(o.$(".owner"));return{resourceLabel:t,owner:i,separator:n}}renderElement(e,r,t,n){t.resourceLabel.setFile(e.element.resource),t.separator.innerText="\xB7",e.element.ownerLabel?(t.owner.innerText=e.element.ownerLabel,t.separator.style.display="inline"):(t.owner.innerText="",t.separator.style.display="none")}disposeTemplate(e){e.resourceLabel.dispose()}}let v=class{constructor(e){this.menuService=e}contextKeyService;getResourceActions(e){return{actions:this.getActions(F.CommentsViewThreadActions,e).primary}}getResourceContextActions(e){return this.getActions(F.CommentsViewThreadActions,e).secondary}setContextKeyService(e){this.contextKeyService=e}getActions(e,r){if(!this.contextKeyService)return{primary:[],secondary:[]};const t=[["commentController",r.owner],["resourceScheme",r.resource.scheme],["commentThread",r.contextValue],["canReply",r.thread.canReply]],n=this.contextKeyService.createOverlay(t),i=this.menuService.getMenuActions(e,n,{shouldForwardArgs:!0}),m={primary:[],secondary:[],menu:i};return ee(i,m,"inline"),m}dispose(){this.contextKeyService=void 0}};v=I([d(0,te)],v);let C=class{constructor(e,r,t,n,i,s){this.actionViewItemProvider=e;this.menus=r;this.openerService=t;this.configurationService=n;this.hoverService=i;this.themeService=s}templateId="comment-node";renderTemplate(e){const r=o.append(e,o.$(".comment-thread-container")),t=o.append(r,o.$(".comment-metadata-container")),n=o.append(t,o.$(".comment-metadata")),i={icon:o.append(n,o.$(".icon")),userNames:o.append(n,o.$(".user")),timestamp:new L(this.configurationService,this.hoverService,o.append(n,o.$(".timestamp-container"))),relevance:o.append(n,o.$(".relevance")),separator:o.append(n,o.$(".separator")),commentPreview:o.append(n,o.$(".text")),range:o.append(n,o.$(".range"))};i.separator.innerText="\xB7";const s=o.append(t,o.$(".actions")),a=new Y(s,{actionViewItemProvider:this.actionViewItemProvider}),m=o.append(r,o.$(".comment-snippet-container")),c={container:m,icon:o.append(m,o.$(".icon")),count:o.append(m,o.$(".count")),lastReplyDetail:o.append(m,o.$(".reply-detail")),separator:o.append(m,o.$(".separator")),timestamp:new L(this.configurationService,this.hoverService,o.append(m,o.$(".timestamp-container")))};c.separator.innerText="\xB7",c.icon.classList.add(...N.asClassNameArray(x.indent));const h=[i.timestamp,c.timestamp];return{threadMetadata:i,repliesMetadata:c,actionBar:a,disposables:h}}getCountString(e){return e>2?p.localize("commentsCountReplies","{0} replies",e-1):e===2?p.localize("commentsCountReply","1 reply"):p.localize("commentCount","1 comment")}getRenderedComment(e,r){const t=k(e,{inline:!0,actionHandler:{callback:i=>J(this.openerService,i,e.isTrusted),disposables:r}}),n=t.element.getElementsByTagName("img");for(let i=0;i<n.length;i++){const s=n[i],a=o.$("");a.textContent=s.alt?p.localize("imageWithLabel","Image: {0}",s.alt):p.localize("image","Image"),s.parentNode.replaceChild(a,s)}for(;t.element.children.length>1&&t.element.firstElementChild?.tagName==="HR";)t.element.removeChild(t.element.firstElementChild);return t}getIcon(e){return e===R.Unresolved?x.commentUnresolved:x.comment}renderElement(e,r,t,n){t.actionBar.clear();const i=e.element.replies.length+1;if(e.element.threadRelevance===j.Outdated?(t.threadMetadata.relevance.style.display="",t.threadMetadata.relevance.innerText=p.localize("outdated","Outdated"),t.threadMetadata.separator.style.display="none"):(t.threadMetadata.relevance.innerText="",t.threadMetadata.relevance.style.display="none",t.threadMetadata.separator.style.display=""),t.threadMetadata.icon.classList.remove(...Array.from(t.threadMetadata.icon.classList.values()).filter(c=>c.startsWith("codicon"))),t.threadMetadata.icon.classList.add(...N.asClassNameArray(this.getIcon(e.element.threadState))),e.element.threadState!==void 0){const c=this.getCommentThreadWidgetStateColor(e.element.threadState,this.themeService.getColorTheme());t.threadMetadata.icon.style.setProperty(E,`${c}`),t.threadMetadata.icon.style.color=`var(${E})`}t.threadMetadata.userNames.textContent=e.element.comment.userName,t.threadMetadata.timestamp.setTimestamp(e.element.comment.timestamp?new Date(e.element.comment.timestamp):void 0);const s=e.element;if(t.threadMetadata.commentPreview.innerText="",t.threadMetadata.commentPreview.style.height="22px",typeof s.comment.body=="string")t.threadMetadata.commentPreview.innerText=s.comment.body;else{const c=new P;t.disposables.push(c);const h=this.getRenderedComment(s.comment.body,c);t.disposables.push(h),t.threadMetadata.commentPreview.appendChild(h.element.firstElementChild??h.element),t.disposables.push(this.hoverService.setupManagedHover(X("mouse"),t.threadMetadata.commentPreview,h.element.textContent??""))}e.element.range&&(e.element.range.startLineNumber===e.element.range.endLineNumber?t.threadMetadata.range.textContent=p.localize("commentLine","[Ln {0}]",e.element.range.startLineNumber):t.threadMetadata.range.textContent=p.localize("commentRange","[Ln {0}-{1}]",e.element.range.startLineNumber,e.element.range.endLineNumber));const a=this.menus.getResourceActions(e.element);if(t.actionBar.push(a.actions,{icon:!0,label:!1}),t.actionBar.context={commentControlHandle:e.element.controllerHandle,commentThreadHandle:e.element.threadHandle,$mid:A.CommentThread},!e.element.hasReply()){t.repliesMetadata.container.style.display="none";return}t.repliesMetadata.container.style.display="",t.repliesMetadata.count.textContent=this.getCountString(i);const m=e.element.replies[e.element.replies.length-1].comment;t.repliesMetadata.lastReplyDetail.textContent=p.localize("lastReplyFrom","Last reply from {0}",m.userName),t.repliesMetadata.timestamp.setTimestamp(m.timestamp?new Date(m.timestamp):void 0)}getCommentThreadWidgetStateColor(e,r){return e!==void 0?q(e,r):void 0}disposeTemplate(e){e.disposables.forEach(r=>r.dispose()),e.actionBar.dispose()}};C=I([d(2,K),d(3,w),d(4,ie),d(5,U)],C);var ae=(r=>(r[r.Resource=0]="Resource",r[r.Comment=1]="Comment",r))(ae||{});class Ct{constructor(e){this.options=e}filter(e,r){return this.options.filter===""&&this.options.showResolved&&this.options.showUnresolved?y.Visible:e instanceof b?this.filterResourceMarkers(e):this.filterCommentNode(e,r)}filterResourceMarkers(e){if(this.options.textFilter.text&&!this.options.textFilter.negate){const r=f._filter(this.options.textFilter.text,G(e.resource));if(r)return{visibility:!0,data:{type:0,uriMatches:r||[]}}}return y.Recurse}filterCommentNode(e,r){if(!(e.threadState===void 0||this.options.showResolved&&R.Resolved===e.threadState||this.options.showUnresolved&&R.Unresolved===e.threadState))return!1;if(!this.options.textFilter.text)return!0;const n=f._messageFilter(this.options.textFilter.text,typeof e.comment.body=="string"?e.comment.body:e.comment.body.value)||f._messageFilter(this.options.textFilter.text,e.comment.userName)||e.replies.map(i=>f._messageFilter(this.options.textFilter.text,i.comment.userName)||f._messageFilter(this.options.textFilter.text,typeof i.comment.body=="string"?i.comment.body:i.comment.body.value)).filter(i=>!!i).flat();return n.length&&!this.options.textFilter.negate?{visibility:!0,data:{type:1,textMatches:n}}:n.length&&this.options.textFilter.negate&&r===y.Recurse?!1:n.length===0&&this.options.textFilter.negate&&r===y.Recurse?!0:r}}let g=class extends B{constructor(r,t,n,i,s,a,m,c,h){const H=new M,$=Z.bind(void 0,a),S=a.createInstance(v);S.setContextKeyService(i);const O=[a.createInstance(se,r),a.createInstance(C,$,S)];super("CommentsTree",t,H,O,{accessibilityProvider:n.accessibilityProvider,identityProvider:{getId:l=>l instanceof Q?"root":l instanceof b?`${l.uniqueOwner}-${l.id}`:l instanceof T?`${l.uniqueOwner}-${l.resource.toString()}-${l.threadId}-${l.comment.uniqueIdInThread}`+(l.isRoot?"-root":""):""},expandOnlyOnTwistieClick:!0,collapseByDefault:!1,overrideStyles:n.overrideStyles,filter:n.filter,sorter:n.sorter,findWidgetEnabled:!1,multipleSelectionSupport:!1},a,i,s,m);this.contextMenuService=c;this.keybindingService=h;this.menus=S,this.disposables.add(this.onContextMenu(l=>this.commentsOnContextMenu(l)))}menus;commentsOnContextMenu(r){const t=r.element;if(!(t instanceof T))return;const n=r.browserEvent;n.preventDefault(),n.stopPropagation(),this.setFocus([t]);const i=this.menus.getResourceContextActions(t);i.length&&this.contextMenuService.showContextMenu({getAnchor:()=>r.anchor,getActions:()=>i,getActionViewItem:s=>{const a=this.keybindingService.lookupKeybinding(s.id);if(a)return new ne(s,s,{label:!0,keybinding:a.getLabel()})},onHide:s=>{s&&this.domFocus()},getActionsContext:()=>({commentControlHandle:t.controllerHandle,commentThreadHandle:t.threadHandle,$mid:A.CommentThread,thread:t.thread})})}filterComments(){this.refilter()}getVisibleItemCount(){let r=0;const t=this.getNode();for(const n of t.children)for(const i of n.children)i.visible&&n.visible&&r++;return r}};g=I([d(3,_),d(4,z),d(5,D),d(6,w),d(7,re),d(8,oe)],g);export{ht as COMMENTS_VIEW_ID,ft as COMMENTS_VIEW_STORAGE_ID,vt as COMMENTS_VIEW_TITLE,C as CommentNodeRenderer,g as CommentsList,v as CommentsMenus,Ct as Filter,se as ResourceWithCommentsRenderer};