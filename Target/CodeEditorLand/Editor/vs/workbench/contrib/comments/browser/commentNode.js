var P=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var b=(d,c,e,i)=>{for(var t=i>1?void 0:i?$(c,e):c,r=d.length-1,n;r>=0;r--)(n=d[r])&&(t=(i?n(c,e,t):n(t))||t);return i&&t&&P(c,e,t),t},a=(d,c)=>(e,i)=>c(e,i,d);import*as l from"../../../../nls.js";import*as o from"../../../../base/browser/dom.js";import*as C from"../../../../editor/common/languages.js";import{ActionsOrientation as W,ActionBar as B}from"../../../../base/browser/ui/actionbar/actionbar.js";import{Action as F,Separator as K,ActionRunner as k}from"../../../../base/common/actions.js";import{Disposable as O,dispose as I}from"../../../../base/common/lifecycle.js";import{URI as p}from"../../../../base/common/uri.js";import"../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";import{IInstantiationService as U}from"../../../../platform/instantiation/common/instantiation.js";import{ICommentService as z}from"./commentService.js";import{MIN_EDITOR_HEIGHT as q,SimpleCommentEditor as S,calculateEditorHeight as j}from"./simpleCommentEditor.js";import{Selection as G}from"../../../../editor/common/core/selection.js";import{Emitter as X}from"../../../../base/common/event.js";import{INotificationService as Z}from"../../../../platform/notification/common/notification.js";import{ToolBar as J}from"../../../../base/browser/ui/toolbar/toolbar.js";import{IContextMenuService as Q}from"../../../../platform/contextview/browser/contextView.js";import{AnchorAlignment as T}from"../../../../base/browser/ui/contextview/contextview.js";import{ToggleReactionsAction as h,ReactionAction as y,ReactionActionViewItem as Y}from"./reactionsAction.js";import"../common/commentThreadWidget.js";import{MenuItemAction as M,SubmenuItemAction as ee,MenuId as te}from"../../../../platform/actions/common/actions.js";import{MenuEntryActionViewItem as ie,SubmenuEntryActionViewItem as oe}from"../../../../platform/actions/browser/menuEntryActionViewItem.js";import{IContextKeyService as ne}from"../../../../platform/contextkey/common/contextkey.js";import{CommentFormActions as x}from"./commentFormActions.js";import{MOUSE_CURSOR_TEXT_CSS_CLASS_NAME as R}from"../../../../base/browser/ui/mouseCursor/mouseCursor.js";import{ActionViewItem as re}from"../../../../base/browser/ui/actionbar/actionViewItems.js";import{DropdownMenuActionViewItem as A}from"../../../../base/browser/ui/dropdown/dropdownActionViewItem.js";import{Codicon as w}from"../../../../base/common/codicons.js";import{ThemeIcon as L}from"../../../../base/common/themables.js";import{MarshalledId as g}from"../../../../base/common/marshallingIds.js";import{TimestampWidget as se}from"./timestamp.js";import{IConfigurationService as me}from"../../../../platform/configuration/common/configuration.js";import"../../../../base/common/htmlContent.js";import"../../../../editor/common/core/range.js";import"../../notebook/common/notebookRange.js";import"./commentMenus.js";import{Scrollable as ce,ScrollbarVisibility as H}from"../../../../base/common/scrollable.js";import{SmoothScrollableElement as ae}from"../../../../base/browser/ui/scrollbar/scrollableElement.js";import{DomEmitter as de}from"../../../../base/browser/event.js";import{CommentContextKeys as le}from"../common/commentContextKeys.js";import{FileAccess as he,Schemas as ue}from"../../../../base/common/network.js";import{COMMENTS_SECTION as pe}from"../common/commentsConfiguration.js";import{StandardMouseEvent as ge}from"../../../../base/browser/mouseEvent.js";import{IAccessibilityService as _e}from"../../../../platform/accessibility/common/accessibility.js";import{IKeybindingService as ve}from"../../../../platform/keybinding/common/keybinding.js";import"../../../common/comments.js";import{IHoverService as fe}from"../../../../platform/hover/browser/hover.js";import{ITextModelService as Ee}from"../../../../editor/common/services/resolverService.js";class D extends k{async runAction(c,e){await c.run(...e)}}let _=class extends O{constructor(e,i,t,r,n,s,m,u,v,f,Ae,be,N,V,Ce,Ie,Se,ye){super();this.parentEditor=e;this.commentThread=i;this.comment=t;this.pendingEdit=r;this.owner=n;this.resource=s;this.parentThread=m;this.markdownRenderer=u;this.instantiationService=v;this.commentService=f;this.notificationService=Ae;this.contextMenuService=be;this.configurationService=V;this.hoverService=Ce;this.accessibilityService=Ie;this.keybindingService=Se;this.textModelService=ye;this._domNode=o.$("div.review-comment"),this._contextKeyService=this._register(N.createScoped(this._domNode)),this._commentContextValue=le.commentContext.bindTo(this._contextKeyService),this.comment.contextValue&&this._commentContextValue.set(this.comment.contextValue),this._commentMenus=this.commentService.getCommentMenus(this.owner),this._domNode.tabIndex=-1,this._avatar=o.append(this._domNode,o.$("div.avatar-container")),this.updateCommentUserIcon(this.comment.userIconPath),this._commentDetailsContainer=o.append(this._domNode,o.$(".review-comment-contents")),this.createHeader(this._commentDetailsContainer),this._body=document.createElement("div"),this._body.classList.add("comment-body",R),V.getValue(pe)?.maxHeight!==!1&&this._body.classList.add("comment-body-max-height"),this.createScroll(this._commentDetailsContainer,this._body),this.updateCommentBody(this.comment.body),this.comment.commentReactions&&this.comment.commentReactions.length&&this.comment.commentReactions.filter(E=>!!E.count).length&&this.createReactionsContainer(this._commentDetailsContainer),this._domNode.setAttribute("aria-label",`${t.userName}, ${this.commentBodyValue}`),this._domNode.setAttribute("role","treeitem"),this._clearTimeout=null,this._register(o.addDisposableListener(this._domNode,o.EventType.CLICK,()=>this.isEditing||this._onDidClick.fire(this))),this._register(o.addDisposableListener(this._domNode,o.EventType.CONTEXT_MENU,E=>this.onContextMenu(E))),r&&this.switchToEditMode(),this._register(this.accessibilityService.onDidChangeScreenReaderOptimized(()=>{this.toggleToolbarHidden(!0)})),this.activeCommentListeners()}_domNode;_body;_avatar;_md;_plainText;_clearTimeout;_editAction=null;_commentEditContainer=null;_commentDetailsContainer;_actionsToolbarContainer;_reactionsActionBar;_reactionActionsContainer;_commentEditor=null;_commentEditorDisposables=[];_commentEditorModel=null;_editorHeight=q;_isPendingLabel;_timestamp;_timestampWidget;_contextKeyService;_commentContextValue;_commentMenus;_scrollable;_scrollableElement;actionRunner;toolbar;_commentFormActions=null;_commentEditorActions=null;_onDidClick=new X;get domNode(){return this._domNode}isEditing=!1;activeCommentListeners(){this._register(o.addDisposableListener(this._domNode,o.EventType.FOCUS_IN,()=>{this.commentService.setActiveCommentAndThread(this.owner,{thread:this.commentThread,comment:this.comment})},!0))}createScroll(e,i){this._scrollable=new ce({forceIntegerValues:!0,smoothScrollDuration:125,scheduleAtNextAnimationFrame:r=>o.scheduleAtNextAnimationFrame(o.getWindow(e),r)}),this._scrollableElement=this._register(new ae(i,{horizontal:H.Visible,vertical:H.Visible},this._scrollable)),this._register(this._scrollableElement.onScroll(r=>{r.scrollLeftChanged&&(i.scrollLeft=r.scrollLeft),r.scrollTopChanged&&(i.scrollTop=r.scrollTop)}));const t=this._register(new de(i,"scroll")).event;this._register(t(r=>{const n=this._scrollableElement.getScrollPosition(),s=Math.abs(i.scrollLeft-n.scrollLeft)<=1?void 0:i.scrollLeft,m=Math.abs(i.scrollTop-n.scrollTop)<=1?void 0:i.scrollTop;(s!==void 0||m!==void 0)&&this._scrollableElement.setScrollPosition({scrollLeft:s,scrollTop:m})})),e.appendChild(this._scrollableElement.getDomNode())}updateCommentBody(e){this._body.innerText="",this._md=void 0,this._plainText=void 0,typeof e=="string"?(this._plainText=o.append(this._body,o.$(".comment-body-plainstring")),this._plainText.innerText=e):(this._md=this.markdownRenderer.render(e).element,this._body.appendChild(this._md))}updateCommentUserIcon(e){if(this._avatar.textContent="",e){const i=o.append(this._avatar,o.$("img.avatar"));i.src=he.uriToBrowserUri(p.revive(e)).toString(!0),i.onerror=t=>i.remove()}}get onDidClick(){return this._onDidClick.event}createTimestamp(e){this._timestamp=o.append(e,o.$("span.timestamp-container")),this.updateTimestamp(this.comment.timestamp)}updateTimestamp(e){if(!this._timestamp)return;const i=e!==void 0?new Date(e):void 0;i?this._timestampWidget?this._timestampWidget.setTimestamp(i):(this._timestampWidget=new se(this.configurationService,this.hoverService,this._timestamp,i),this._register(this._timestampWidget)):this._timestampWidget?.dispose()}createHeader(e){const i=o.append(e,o.$(`div.comment-title.${R}`)),t=o.append(i,o.$("comment-header-info")),r=o.append(t,o.$("strong.author"));r.innerText=this.comment.userName,this.createTimestamp(t),this._isPendingLabel=o.append(t,o.$("span.isPending")),this.comment.label?this._isPendingLabel.innerText=this.comment.label:this._isPendingLabel.innerText="",this._actionsToolbarContainer=o.append(i,o.$(".comment-actions")),this.toggleToolbarHidden(!0),this.createActionsToolbar()}toggleToolbarHidden(e){e&&!this.accessibilityService.isScreenReaderOptimized()?this._actionsToolbarContainer.classList.add("hidden"):this._actionsToolbarContainer.classList.remove("hidden")}getToolbarActions(e){const i=e.getActions({shouldForwardArgs:!0}),n={primary:[],secondary:[]};return Te(i,n,!1,s=>/^inline/.test(s)),n}get commentNodeContext(){return[{thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,$mid:g.CommentNode},{commentControlHandle:this.commentThread.controllerHandle,commentThreadHandle:this.commentThread.commentThreadHandle,$mid:g.CommentThread}]}createToolbar(){this.toolbar=new J(this._actionsToolbarContainer,this.contextMenuService,{actionViewItemProvider:(e,i)=>e.id===h.ID?new A(e,e.menuActions,this.contextMenuService,{...i,actionViewItemProvider:(t,r)=>this.actionViewItemProvider(t,r),actionRunner:this.actionRunner,classNames:["toolbar-toggle-pickReactions",...L.asClassNameArray(w.reactions)],anchorAlignmentProvider:()=>T.RIGHT}):this.actionViewItemProvider(e,i),orientation:W.HORIZONTAL}),this.toolbar.context=this.commentNodeContext,this.toolbar.actionRunner=new D,this.registerActionBarListeners(this._actionsToolbarContainer),this._register(this.toolbar)}createActionsToolbar(){const e=[];if(this.commentService.hasReactionHandler(this.owner)){const s=this.createReactionPicker(this.comment.commentReactions||[]);e.push(s)}const t=this._commentMenus.getCommentTitleActions(this.comment,this._contextKeyService);this._register(t),this._register(t.onDidChange(s=>{const{primary:m,secondary:u}=this.getToolbarActions(t);!this.toolbar&&(m.length||u.length)&&this.createToolbar(),this.toolbar.setActions(m,u)}));const{primary:r,secondary:n}=this.getToolbarActions(t);e.push(...r),(e.length||n.length)&&(this.createToolbar(),this.toolbar.setActions(e,n))}actionViewItemProvider(e,i){return e.id===h.ID?i={label:!1,icon:!0}:i={label:!1,icon:!0},e.id===y.ID?new Y(e):e instanceof M?this.instantiationService.createInstance(ie,e,{hoverDelegate:i.hoverDelegate}):e instanceof ee?this.instantiationService.createInstance(oe,e,i):new re({},e,i)}async submitComment(){this._commentEditor&&this._commentFormActions&&(await this._commentFormActions.triggerDefaultAction(),this.pendingEdit=void 0)}createReactionPicker(e){const i=this._register(new h(()=>{r?.show()},l.localize("commentToggleReaction","Toggle Reaction")));let t=[];e&&e.length&&(t=e.map(n=>new F(`reaction.command.${n.label}`,`${n.label}`,"",!0,async()=>{try{await this.commentService.toggleReaction(this.owner,this.resource,this.commentThread,this.comment,n)}catch(s){const m=s.message?l.localize("commentToggleReactionError","Toggling the comment reaction failed: {0}.",s.message):l.localize("commentToggleReactionDefaultError","Toggling the comment reaction failed");this.notificationService.error(m)}}))),i.menuActions=t;const r=new A(i,i.menuActions,this.contextMenuService,{actionViewItemProvider:(n,s)=>n.id===h.ID?r:this.actionViewItemProvider(n,s),actionRunner:this.actionRunner,classNames:"toolbar-toggle-pickReactions",anchorAlignmentProvider:()=>T.RIGHT});return i}createReactionsContainer(e){this._reactionActionsContainer=o.append(e,o.$("div.comment-reactions")),this._reactionsActionBar=new B(this._reactionActionsContainer,{actionViewItemProvider:(t,r)=>t.id===h.ID?new A(t,t.menuActions,this.contextMenuService,{actionViewItemProvider:(n,s)=>this.actionViewItemProvider(n,s),actionRunner:this.actionRunner,classNames:["toolbar-toggle-pickReactions",...L.asClassNameArray(w.reactions)],anchorAlignmentProvider:()=>T.RIGHT}):this.actionViewItemProvider(t,r)}),this._register(this._reactionsActionBar);const i=this.commentService.hasReactionHandler(this.owner);if(this.comment.commentReactions.filter(t=>!!t.count).map(t=>{const r=new y(`reaction.${t.label}`,`${t.label}`,t.hasReacted&&(t.canEdit||i)?"active":"",t.canEdit||i,async()=>{try{await this.commentService.toggleReaction(this.owner,this.resource,this.commentThread,this.comment,t)}catch(n){let s;t.hasReacted?s=n.message?l.localize("commentDeleteReactionError","Deleting the comment reaction failed: {0}.",n.message):l.localize("commentDeleteReactionDefaultError","Deleting the comment reaction failed"):s=n.message?l.localize("commentAddReactionError","Deleting the comment reaction failed: {0}.",n.message):l.localize("commentAddReactionDefaultError","Deleting the comment reaction failed"),this.notificationService.error(s)}},t.reactors,t.iconPath,t.count);this._reactionsActionBar?.push(r,{label:!0,icon:!0})}),i){const t=this.createReactionPicker(this.comment.commentReactions||[]);this._reactionsActionBar.push(t,{label:!1,icon:!0})}}get commentBodyValue(){return typeof this.comment.body=="string"?this.comment.body:this.comment.body.value}async createCommentEditor(e){const i=o.append(e,o.$(".edit-textarea"));this._commentEditor=this.instantiationService.createInstance(S,i,S.getEditorOptions(this.configurationService),this._contextKeyService,this.parentThread);const t=p.from({scheme:ue.commentsInput,path:`/commentinput-${this.comment.uniqueIdInThread}-${Date.now()}.md`}),r=await this.textModelService.createModelReference(t);this._commentEditorModel=r,this._commentEditor.setModel(this._commentEditorModel.object.textEditorModel),this._commentEditor.setValue(this.pendingEdit??this.commentBodyValue),this.pendingEdit=void 0,this._commentEditor.layout({width:i.clientWidth-14,height:this._editorHeight}),this._commentEditor.focus(),o.scheduleAtNextAnimationFrame(o.getWindow(e),()=>{this._commentEditor.layout({width:i.clientWidth-14,height:this._editorHeight}),this._commentEditor.focus()});const n=this._commentEditorModel.object.textEditorModel.getLineCount(),s=this._commentEditorModel.object.textEditorModel.getLineLength(n)+1;this._commentEditor.setSelection(new G(n,s,n,s));const m=this.commentThread;m.input={uri:this._commentEditor.getModel().uri,value:this.commentBodyValue},this.commentService.setActiveEditingCommentThread(m),this.commentService.setActiveCommentAndThread(this.owner,{thread:m,comment:this.comment}),this._commentEditorDisposables.push(this._commentEditor.onDidFocusEditorWidget(()=>{m.input={uri:this._commentEditor.getModel().uri,value:this.commentBodyValue},this.commentService.setActiveEditingCommentThread(m),this.commentService.setActiveCommentAndThread(this.owner,{thread:m,comment:this.comment})})),this._commentEditorDisposables.push(this._commentEditor.onDidChangeModelContent(u=>{if(m.input&&this._commentEditor&&this._commentEditor.getModel().uri===m.input.uri){const v=this._commentEditor.getValue();if(v!==m.input.value){const f=m.input;f.value=v,m.input=f,this.commentService.setActiveEditingCommentThread(m),this.commentService.setActiveCommentAndThread(this.owner,{thread:m,comment:this.comment})}}})),this.calculateEditorHeight(),this._register(this._commentEditorModel.object.textEditorModel.onDidChangeContent(()=>{this._commentEditor&&this.calculateEditorHeight()&&(this._commentEditor.layout({height:this._editorHeight,width:this._commentEditor.getLayoutInfo().width}),this._commentEditor.render(!0))})),this._register(this._commentEditor),this._register(this._commentEditorModel)}calculateEditorHeight(){if(this._commentEditor){const e=j(this.parentEditor,this._commentEditor,this._editorHeight);if(e!==this._editorHeight)return this._editorHeight=e,!0}return!1}getPendingEdit(){const e=this._commentEditor?.getModel();if(e&&e.getValueLength()>0)return e.getValue()}removeCommentEditor(){this.isEditing=!1,this._editAction&&(this._editAction.enabled=!0),this._body.classList.remove("hidden"),this._commentEditorModel?.dispose(),I(this._commentEditorDisposables),this._commentEditorDisposables=[],this._commentEditor?.dispose(),this._commentEditor=null,this._commentEditContainer.remove()}layout(e){const i=e!==void 0?e-72:this._commentEditor?.getLayoutInfo().width??0;this._commentEditor?.layout({width:i,height:this._editorHeight});const t=this._body.scrollWidth,r=o.getContentWidth(this._body),n=this._body.scrollHeight,s=o.getContentHeight(this._body)+4;this._scrollableElement.setScrollDimensions({width:r,scrollWidth:t,height:s,scrollHeight:n})}async switchToEditMode(){if(this.isEditing)return;this.isEditing=!0,this._body.classList.add("hidden"),this._commentEditContainer=o.append(this._commentDetailsContainer,o.$(".edit-container")),await this.createCommentEditor(this._commentEditContainer);const e=o.append(this._commentEditContainer,o.$(".form-actions")),i=o.append(e,o.$(".other-actions"));this.createCommentWidgetFormActions(i);const t=o.append(e,o.$(".editor-actions"));this.createCommentWidgetEditorActions(t)}createCommentWidgetFormActions(e){const t=this.commentService.getCommentMenus(this.owner).getCommentActions(this.comment,this._contextKeyService);this._register(t),this._register(t.onDidChange(()=>{this._commentFormActions?.setActions(t)})),this._commentFormActions=new x(this.keybindingService,this._contextKeyService,this.contextMenuService,e,r=>{const n=this._commentEditor.getValue();r.run({thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,text:n,$mid:g.CommentThreadNode}),this.removeCommentEditor()}),this._register(this._commentFormActions),this._commentFormActions.setActions(t)}createCommentWidgetEditorActions(e){const t=this.commentService.getCommentMenus(this.owner).getCommentEditorActions(this._contextKeyService);this._register(t),this._register(t.onDidChange(()=>{this._commentEditorActions?.setActions(t)})),this._commentEditorActions=new x(this.keybindingService,this._contextKeyService,this.contextMenuService,e,r=>{const n=this._commentEditor.getValue();r.run({thread:this.commentThread,commentUniqueId:this.comment.uniqueIdInThread,text:n,$mid:g.CommentThreadNode}),this._commentEditor?.focus()}),this._register(this._commentEditorActions),this._commentEditorActions.setActions(t,!0)}setFocus(e,i=!1){e?(this._domNode.focus(),this.toggleToolbarHidden(!1),this._actionsToolbarContainer.classList.add("tabfocused"),this._domNode.tabIndex=0,this.comment.mode===C.CommentMode.Editing&&this._commentEditor?.focus()):(this._actionsToolbarContainer.classList.contains("tabfocused")&&!this._actionsToolbarContainer.classList.contains("mouseover")&&(this.toggleToolbarHidden(!0),this._domNode.tabIndex=-1),this._actionsToolbarContainer.classList.remove("tabfocused"))}registerActionBarListeners(e){this._register(o.addDisposableListener(this._domNode,"mouseenter",()=>{this.toggleToolbarHidden(!1),e.classList.add("mouseover")})),this._register(o.addDisposableListener(this._domNode,"mouseleave",()=>{e.classList.contains("mouseover")&&!e.classList.contains("tabfocused")&&this.toggleToolbarHidden(!0),e.classList.remove("mouseover")}))}async update(e){e.body!==this.comment.body&&this.updateCommentBody(e.body),this.comment.userIconPath&&e.userIconPath&&p.from(this.comment.userIconPath).toString()!==p.from(e.userIconPath).toString()&&this.updateCommentUserIcon(e.userIconPath);const i=e.mode!==void 0&&e.mode!==this.comment.mode;this.comment=e,i&&(e.mode===C.CommentMode.Editing?await this.switchToEditMode():this.removeCommentEditor()),e.label?this._isPendingLabel.innerText=e.label:this._isPendingLabel.innerText="",this._reactionActionsContainer?.remove(),this._reactionsActionBar?.clear(),this.comment.commentReactions&&this.comment.commentReactions.some(t=>!!t.count)&&this.createReactionsContainer(this._commentDetailsContainer),this.comment.contextValue?this._commentContextValue.set(this.comment.contextValue):this._commentContextValue.reset(),this.comment.timestamp&&this.updateTimestamp(this.comment.timestamp)}onContextMenu(e){const i=new ge(o.getWindow(this._domNode),e);this.contextMenuService.showContextMenu({getAnchor:()=>i,menuId:te.CommentThreadCommentContext,menuActionOptions:{shouldForwardArgs:!0},contextKeyService:this._contextKeyService,actionRunner:new D,getActionsContext:()=>this.commentNodeContext})}focus(){this.domNode.focus(),this._clearTimeout||(this.domNode.classList.add("focus"),this._clearTimeout=setTimeout(()=>{this.domNode.classList.remove("focus")},3e3))}dispose(){super.dispose(),I(this._commentEditorDisposables)}};_=b([a(8,U),a(9,z),a(10,Z),a(11,Q),a(12,ne),a(13,me),a(14,fe),a(15,_e),a(16,ve),a(17,Ee)],_);function Te(d,c,e,i=t=>t==="navigation"){for(const t of d){let[r,n]=t;if(e&&(n=n.map(s=>s instanceof M&&s.alt?s.alt:s)),i(r))(Array.isArray(c)?c:c.primary).unshift(...n);else{const s=Array.isArray(c)?c:c.secondary;s.length>0&&s.push(new K),s.push(...n)}}}export{_ as CommentNode};