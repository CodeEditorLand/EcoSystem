var C=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var u=(i,e,t,n)=>{for(var o=n>1?void 0:n?d(e,t):e,m=i.length-1,c;m>=0;m--)(c=i[m])&&(o=(n?c(e,t,o):c(o))||o);return n&&o&&C(e,t,o),o},I=(i,e)=>(t,n)=>e(t,n,i);import"../../../../base/common/lifecycle.js";import"../../../../platform/contextkey/common/contextkey.js";import{IMenuService as a,MenuId as r}from"../../../../platform/actions/common/actions.js";import"../../../../base/common/actions.js";import"../../../../editor/common/languages.js";import{createAndFillInContextMenuActions as M}from"../../../../platform/actions/browser/menuEntryActionViewItem.js";let s=class{constructor(e){this.menuService=e}getCommentThreadTitleActions(e){return this.getMenu(r.CommentThreadTitle,e)}getCommentThreadActions(e){return this.getMenu(r.CommentThreadActions,e)}getCommentEditorActions(e){return this.getMenu(r.CommentEditorActions,e)}getCommentThreadAdditionalActions(e){return this.getMenu(r.CommentThreadAdditionalActions,e)}getCommentTitleActions(e,t){return this.getMenu(r.CommentTitle,t)}getCommentActions(e,t){return this.getMenu(r.CommentActions,t)}getCommentThreadTitleContextActions(e){return this.getMenu(r.CommentThreadTitleContext,e)}getMenu(e,t){const n=this.menuService.createMenu(e,t);return M(n,{shouldForwardArgs:!0},{primary:[],secondary:[]},"inline"),n}dispose(){}};s=u([I(0,a)],s);export{s as CommentMenus};
