var W=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var f=(y,i,t,o)=>{for(var e=o>1?void 0:o?G(i,t):i,r=y.length-1,n;r>=0;r--)(n=y[r])&&(e=(o?n(i,t,e):n(e))||e);return o&&e&&W(i,t,e),e},l=(y,i)=>(t,o)=>i(t,o,y);import*as a from"../../../../base/browser/dom.js";import{CountBadge as A}from"../../../../base/browser/ui/countBadge/countBadge.js";import"../../../../base/browser/ui/list/list.js";import"../../../../base/browser/ui/list/listWidget.js";import"../../../../base/browser/ui/tree/tree.js";import{Disposable as x,DisposableStore as M}from"../../../../base/common/lifecycle.js";import*as q from"../../../../base/common/path.js";import*as d from"../../../../nls.js";import{IConfigurationService as H}from"../../../../platform/configuration/common/configuration.js";import{FileKind as C}from"../../../../platform/files/common/files.js";import{ILabelService as O}from"../../../../platform/label/common/label.js";import"../../../services/search/common/search.js";import{IWorkspaceContextService as L}from"../../../../platform/workspace/common/workspace.js";import"../../../browser/labels.js";import"./searchView.js";import{FileMatch as V,Match as P,FolderMatch as D,FolderMatchNoRoot as U,FolderMatchWorkspaceRoot as X,TextSearchResult as j,AI_TEXT_SEARCH_RESULT_ID as J}from"./searchModel.js";import{isEqual as Q}from"../../../../base/common/resources.js";import"../../../../base/browser/ui/tree/objectTree.js";import"../../../../base/browser/ui/tree/compressedObjectTreeModel.js";import{MenuId as F}from"../../../../platform/actions/common/actions.js";import{IInstantiationService as w}from"../../../../platform/instantiation/common/instantiation.js";import{HiddenItemStrategy as K,MenuWorkbenchToolBar as N}from"../../../../platform/actions/browser/toolbar.js";import"./searchActionsRemoveReplace.js";import{IContextKeyService as g}from"../../../../platform/contextkey/common/contextkey.js";import{ServiceCollection as R}from"../../../../platform/instantiation/common/serviceCollection.js";import{defaultCountBadgeStyles as _}from"../../../../platform/theme/browser/defaultStyles.js";import{SearchContext as p}from"../common/constants.js";import{getDefaultHoverDelegate as z}from"../../../../base/browser/ui/hover/hoverDelegateFactory.js";import{IHoverService as Y}from"../../../../platform/hover/browser/hover.js";class ${static ITEM_HEIGHT=22;getHeight(i){return $.ITEM_HEIGHT}getTemplateId(i){if(i instanceof D)return T.TEMPLATE_ID;if(i instanceof V)return S.TEMPLATE_ID;if(i instanceof P)return v.TEMPLATE_ID;if(i instanceof j)return I.TEMPLATE_ID;throw new Error("Invalid search tree element")}}let I=class extends x{constructor(t,o){super();this.labels=t;this.contextService=o}static TEMPLATE_ID="textResultMatch";templateId=I.TEMPLATE_ID;disposeCompressedElements(t,o,e,r){}renderTemplate(t){const o=new M,e=a.append(t,a.$(".textsearchresult")),r=this.labels.create(e,{supportDescriptionHighlights:!0,supportHighlights:!0});return o.add(r),{label:r,disposables:o}}async renderElement(t,o,e,r){if(t.element.id()===J){const n=await t.element.parent().searchModel.getAITextResultProviderName();e.label.setLabel(d.localize({key:"searchFolderMatch.aiText.label",comment:["This is displayed before the AI text search results, where {0} will be in the place of the AI name (ie: Copilot)"]},"{0} Results",n))}else e.label.setLabel(d.localize("searchFolderMatch.plainText.label","Text Results"))}disposeTemplate(t){t.disposables.dispose()}renderCompressedElements(t,o,e,r){}};I=f([l(1,L)],I);let T=class extends x{constructor(t,o,e,r,n,s){super();this.searchView=t;this.labels=o;this.contextService=e;this.labelService=r;this.instantiationService=n;this.contextKeyService=s}static TEMPLATE_ID="folderMatch";templateId=T.TEMPLATE_ID;renderCompressedElements(t,o,e,r){const n=t.element,s=n.elements[n.elements.length-1],m=n.elements.map(c=>c.name());if(s.resource){const c=s instanceof X?C.ROOT_FOLDER:C.FOLDER;e.label.setResource({resource:s.resource,name:m},{fileKind:c,separator:this.labelService.getSeparator(s.resource.scheme)})}else e.label.setLabel(d.localize("searchFolderMatch.other.label","Other files"));this.renderFolderDetails(s,e)}renderTemplate(t){const o=new M,e=a.append(t,a.$(".foldermatch")),r=this.labels.create(e,{supportDescriptionHighlights:!0,supportHighlights:!0});o.add(r);const n=new A(a.append(e,a.$(".badge")),{},_),s=a.append(e,a.$(".actionBarContainer")),m=new M;o.add(m);const c=o.add(this.contextKeyService.createScoped(t));p.MatchFocusKey.bindTo(c).set(!1),p.FileFocusKey.bindTo(c).set(!1),p.FolderFocusKey.bindTo(c).set(!0);const u=this._register(this.instantiationService.createChild(new R([g,c]))),h=o.add(u.createInstance(N,s,F.SearchActionMenu,{menuOptions:{shouldForwardArgs:!0},hiddenItemStrategy:K.Ignore,toolbarOptions:{primaryGroup:b=>/^inline/.test(b)}}));return{label:r,badge:n,actions:h,disposables:o,elementDisposables:m,contextKeyService:c}}renderElement(t,o,e){const r=t.element;if(r.resource){const n=this.contextService.getWorkspaceFolder(r.resource);n&&Q(n.uri,r.resource)?e.label.setFile(r.resource,{fileKind:C.ROOT_FOLDER,hidePath:!0}):e.label.setFile(r.resource,{fileKind:C.FOLDER,hidePath:this.searchView.isTreeLayoutViewVisible})}else e.label.setLabel(d.localize("searchFolderMatch.other.label","Other files"));p.IsEditableItemKey.bindTo(e.contextKeyService).set(!r.hasOnlyReadOnlyMatches()),e.elementDisposables.add(r.onChange(()=>{p.IsEditableItemKey.bindTo(e.contextKeyService).set(!r.hasOnlyReadOnlyMatches())})),this.renderFolderDetails(r,e)}disposeElement(t,o,e){e.elementDisposables.clear()}disposeCompressedElements(t,o,e,r){e.elementDisposables.clear()}disposeTemplate(t){t.disposables.dispose()}renderFolderDetails(t,o){const e=t.recursiveMatchCount();o.badge.setCount(e),o.badge.setTitleFormat(e>1?d.localize("searchFileMatches","{0} files found",e):d.localize("searchFileMatch","{0} file found",e)),o.actions.context={viewer:this.searchView.getControl(),element:t}}};T=f([l(2,L),l(3,O),l(4,w),l(5,g)],T);let S=class extends x{constructor(t,o,e,r,n,s){super();this.searchView=t;this.labels=o;this.contextService=e;this.configurationService=r;this.instantiationService=n;this.contextKeyService=s}static TEMPLATE_ID="fileMatch";templateId=S.TEMPLATE_ID;renderCompressedElements(t,o,e,r){throw new Error("Should never happen since node is incompressible.")}renderTemplate(t){const o=new M,e=new M;o.add(e);const r=a.append(t,a.$(".filematch")),n=this.labels.create(r);o.add(n);const s=new A(a.append(r,a.$(".badge")),{},_),m=a.append(r,a.$(".actionBarContainer")),c=o.add(this.contextKeyService.createScoped(t));p.MatchFocusKey.bindTo(c).set(!1),p.FileFocusKey.bindTo(c).set(!0),p.FolderFocusKey.bindTo(c).set(!1);const u=this._register(this.instantiationService.createChild(new R([g,c]))),h=o.add(u.createInstance(N,m,F.SearchActionMenu,{menuOptions:{shouldForwardArgs:!0},hiddenItemStrategy:K.Ignore,toolbarOptions:{primaryGroup:b=>/^inline/.test(b)}}));return{el:r,label:n,badge:s,actions:h,disposables:o,elementDisposables:e,contextKeyService:c}}renderElement(t,o,e){const r=t.element;e.el.setAttribute("data-resource",r.resource.toString());const n=this.configurationService.getValue("search").decorations;e.label.setFile(r.resource,{hidePath:this.searchView.isTreeLayoutViewVisible&&!(r.parent()instanceof U),hideIcon:!1,fileDecorations:{colors:n.colors,badges:n.badges}});const s=r.count();e.badge.setCount(s),e.badge.setTitleFormat(s>1?d.localize("searchMatches","{0} matches found",s):d.localize("searchMatch","{0} match found",s)),e.actions.context={viewer:this.searchView.getControl(),element:r},p.IsEditableItemKey.bindTo(e.contextKeyService).set(!r.hasOnlyReadOnlyMatches()),e.elementDisposables.add(r.onChange(()=>{p.IsEditableItemKey.bindTo(e.contextKeyService).set(!r.hasOnlyReadOnlyMatches())})),e.el.parentElement?.parentElement?.querySelector(".monaco-tl-twistie")?.classList.add("force-twistie")}disposeElement(t,o,e){e.elementDisposables.clear()}disposeTemplate(t){t.disposables.dispose()}};S=f([l(2,L),l(3,H),l(4,w),l(5,g)],S);let v=class extends x{constructor(t,o,e,r,n,s){super();this.searchView=t;this.contextService=o;this.configurationService=e;this.instantiationService=r;this.contextKeyService=n;this.hoverService=s}static TEMPLATE_ID="match";templateId=v.TEMPLATE_ID;renderCompressedElements(t,o,e,r){throw new Error("Should never happen since node is incompressible.")}renderTemplate(t){t.classList.add("linematch");const o=a.append(t,a.$("span.matchLineNum")),e=a.append(t,a.$("a.plain.match")),r=a.append(e,a.$("span")),n=a.append(e,a.$("span.findInFileMatch")),s=a.append(e,a.$("span.replaceMatch")),m=a.append(e,a.$("span")),c=a.append(t,a.$("span.actionBarContainer")),u=new M,h=u.add(this.contextKeyService.createScoped(t));p.MatchFocusKey.bindTo(h).set(!0),p.FileFocusKey.bindTo(h).set(!1),p.FolderFocusKey.bindTo(h).set(!1);const b=this._register(this.instantiationService.createChild(new R([g,h]))),B=u.add(b.createInstance(N,c,F.SearchActionMenu,{menuOptions:{shouldForwardArgs:!0},hiddenItemStrategy:K.Ignore,toolbarOptions:{primaryGroup:k=>/^inline/.test(k)}}));return{parent:e,before:r,match:n,replace:s,after:m,lineNumber:o,actions:B,disposables:u,contextKeyService:h}}renderElement(t,o,e){const r=t.element,n=r.preview(),s=this.searchView.model.isReplaceActive()&&!!this.searchView.model.replaceString&&!r.isReadonly();e.before.textContent=n.before,e.match.textContent=n.inside,e.match.classList.toggle("replace",s),e.replace.textContent=s?r.replaceString:"",e.after.textContent=n.after;const m=(n.fullBefore+(s?r.replaceString:n.inside)+n.after).trim().substr(0,999);e.disposables.add(this.hoverService.setupManagedHover(z("mouse"),e.parent,m)),p.IsEditableItemKey.bindTo(e.contextKeyService).set(!r.isReadonly());const c=r.range().endLineNumber-r.range().startLineNumber,u=c>0?`+${c}`:"",h=this.configurationService.getValue("search").showLineNumbers,b=h?`${r.range().startLineNumber}:`:"";e.lineNumber.classList.toggle("show",c>0||h),e.lineNumber.textContent=b+u,e.disposables.add(this.hoverService.setupManagedHover(z("mouse"),e.lineNumber,this.getMatchTitle(r,h))),e.actions.context={viewer:this.searchView.getControl(),element:r}}disposeTemplate(t){t.disposables.dispose()}getMatchTitle(t,o){const e=t.range().startLineNumber,r=t.range().endLineNumber-t.range().startLineNumber,n=o?d.localize("lineNumStr","From line {0}",e,r)+" ":"",s=r>0?"+ "+d.localize("numLinesStr","{0} more lines",r):"";return n+s}};v=f([l(1,L),l(2,H),l(3,w),l(4,g),l(5,Y)],v);let E=class{constructor(i,t){this.searchView=i;this.labelService=t}getWidgetAriaLabel(){return d.localize("search","Search")}getAriaLabel(i){if(i instanceof D){const t=i.allDownstreamFileMatches().reduce((o,e)=>o+e.count(),0);return i.resource?d.localize("folderMatchAriaLabel","{0} matches in folder root {1}, Search result",t,i.name()):d.localize("otherFilesAriaLabel","{0} matches outside of the workspace, Search result",t)}if(i instanceof V){const t=this.labelService.getUriLabel(i.resource,{relative:!0})||i.resource.fsPath;return d.localize("fileMatchAriaLabel","{0} matches in file {1} of folder {2}, Search result",i.count(),i.name(),q.dirname(t))}if(i instanceof P){const t=i,o=this.searchView.model,e=o.isReplaceActive()&&!!o.replaceString,r=t.getMatchString(),n=t.range(),s=t.text().substr(0,n.endColumn+150);return e?d.localize("replacePreviewResultAria","'{0}' at column {1} replace {2} with {3}",s,n.startColumn,r,t.replaceString):d.localize("searchResultAria","'{0}' at column {1} found {2}",s,n.startColumn,r)}return null}};E=f([l(1,O)],E);export{S as FileMatchRenderer,T as FolderMatchRenderer,v as MatchRenderer,E as SearchAccessibilityProvider,$ as SearchDelegate,I as TextSearchResultRenderer};