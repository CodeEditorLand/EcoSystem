var j=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var R=(m,e,n,i)=>{for(var o=i>1?void 0:i?G(e,n):e,t=m.length-1,s;t>=0;t--)(s=m[t])&&(o=(i?s(e,n,o):s(o))||o);return i&&o&&j(e,n,o),o},u=(m,e)=>(n,i)=>e(n,i,m);import*as F from"../../../../../base/browser/dom.js";import{Button as q}from"../../../../../base/browser/ui/button/button.js";import"../../../../../base/browser/ui/list/list.js";import"../../../../../base/common/actions.js";import{coalesce as U}from"../../../../../base/common/arrays.js";import{Codicon as I}from"../../../../../base/common/codicons.js";import{Emitter as z}from"../../../../../base/common/event.js";import{Disposable as P,DisposableStore as Y}from"../../../../../base/common/lifecycle.js";import{matchesSomeScheme as J,Schemas as M}from"../../../../../base/common/network.js";import{basename as V}from"../../../../../base/common/path.js";import{basenameOrAuthority as Q,isEqualAuthority as H}from"../../../../../base/common/resources.js";import{ThemeIcon as x}from"../../../../../base/common/themables.js";import{URI as S}from"../../../../../base/common/uri.js";import{localize as v,localize2 as X}from"../../../../../nls.js";import{createAndFillInContextMenuActions as Z}from"../../../../../platform/actions/browser/menuEntryActionViewItem.js";import{MenuWorkbenchToolBar as ee}from"../../../../../platform/actions/browser/toolbar.js";import{Action2 as te,IMenuService as ie,MenuId as W,registerAction2 as ne}from"../../../../../platform/actions/common/actions.js";import{IContextMenuService as re}from"../../../../../platform/contextview/browser/contextView.js";import{FileKind as oe}from"../../../../../platform/files/common/files.js";import{IInstantiationService as w}from"../../../../../platform/instantiation/common/instantiation.js";import{ILabelService as se}from"../../../../../platform/label/common/label.js";import{WorkbenchList as ae}from"../../../../../platform/list/browser/listService.js";import{IOpenerService as le}from"../../../../../platform/opener/common/opener.js";import{IProductService as ce}from"../../../../../platform/product/common/productService.js";import{IThemeService as O}from"../../../../../platform/theme/common/themeService.js";import{fillEditorsDragData as de}from"../../../../browser/dnd.js";import{ResourceLabels as ue}from"../../../../browser/labels.js";import{ColorScheme as me}from"../../../../browser/web.api.js";import{ResourceContextKey as he}from"../../../../common/contextkeys.js";import{SETTINGS_AUTHORITY as pe}from"../../../../services/preferences/common/preferences.js";import{createFileIconThemableTreeContainerScope as fe}from"../../../files/browser/views/explorerView.js";import{ExplorerFolderContext as be}from"../../../files/common/files.js";import{ChatResponseReferencePartStatusKind as $}from"../../common/chatService.js";import{IChatVariablesService as B}from"../../common/chatVariables.js";import"../../common/chatViewModel.js";import{IChatWidgetService as ge}from"../chat.js";import{ResourcePool as Ie}from"./chatCollections.js";import"./chatContentParts.js";const L=F.$;let T=class extends P{constructor(n,i,o,t,s,c,r,l){super();this.data=n;this.instantiationService=r;this.contextMenuService=l;const h=i??(n.length>1?v("usedReferencesPlural","Used {0} references",n.length):v("usedReferencesSingular","Used {0} reference",1)),b=L(".chat-used-context-icon"),E=a=>a.usedReferencesExpanded?I.chevronDown:I.chevronRight;b.classList.add(...x.asClassNameArray(E(o)));const D=L(".chat-used-context-label",void 0),C=this._register(new q(D,{buttonBackground:void 0,buttonBorder:void 0,buttonForeground:void 0,buttonHoverBackground:void 0,buttonSecondaryBackground:void 0,buttonSecondaryForeground:void 0,buttonSecondaryHoverBackground:void 0,buttonSeparator:void 0}));this.domNode=L(".chat-used-context",void 0,D),C.label=h,C.element.prepend(b),this.updateAriaLabel(C.element,h,o.usedReferencesExpanded),this.domNode.classList.toggle("chat-used-context-collapsed",!o.usedReferencesExpanded),this._register(C.onDidClick(()=>{b.classList.remove(...x.asClassNameArray(E(o))),o.usedReferencesExpanded=!o.usedReferencesExpanded,b.classList.add(...x.asClassNameArray(E(o))),this.domNode.classList.toggle("chat-used-context-collapsed",!o.usedReferencesExpanded),this._onDidChangeHeight.fire(),this.updateAriaLabel(C.element,h,o.usedReferencesExpanded)}));const p=this._register(t.get()).object;this.domNode.appendChild(p.getHTMLElement().parentElement),this._register(p.onDidOpen(a=>{if(a.element&&"reference"in a.element&&typeof a.element.reference=="object"){const d="variableName"in a.element.reference?a.element.reference.value:a.element.reference,g=S.isUri(d)?d:d?.uri;g&&s.open(g,{fromUserGesture:!0,editorOptions:{...a.editorOptions,selection:d&&"range"in d?d.range:void 0}})}})),this._register(p.onContextMenu(a=>{F.EventHelper.stop(a.browserEvent,!0);const d=a.element&&y(a.element);d&&this.contextMenuService.showContextMenu({getAnchor:()=>a.anchor,getActions:()=>{const g=c.getMenuActions(W.ChatAttachmentsContext,p.contextKeyService,{shouldForwardArgs:!0,arg:d}),N=[];return Z(g,N),N}})}));const k=this._register(this.instantiationService.createInstance(he));this._register(p.onDidChangeFocus(a=>{k.reset();const d=a.elements.length?a.elements[0]:void 0,g=d&&y(d);k.set(g??null)}));const _=Math.min(n.length,6)*22;p.layout(_),p.getHTMLElement().style.height=`${_}px`,p.splice(0,p.length,n)}domNode;_onDidChangeHeight=this._register(new z);onDidChangeHeight=this._onDidChangeHeight.event;hasSameContent(n,i,o){return n.kind==="references"&&n.references.length===this.data.length||n.kind==="codeCitations"&&n.citations.length===this.data.length}updateAriaLabel(n,i,o){n.ariaLabel=o?v("usedReferencesExpanded","{0}, expanded",i):v("usedReferencesCollapsed","{0}, collapsed",i)}addDisposable(n){this._register(n)}};T=R([u(4,le),u(5,ie),u(6,w),u(7,re)],T);let A=class extends P{constructor(n,i,o,t,s,c){super();this._onDidChangeVisibility=n;this.menuId=i;this.options=o;this.instantiationService=t;this.themeService=s;this.labelService=c;this._pool=this._register(new Ie(()=>this.listFactory()))}_pool;get inUse(){return this._pool.inUse}listFactory(){const n=this._register(this.instantiationService.createInstance(ue,{onDidChangeVisibility:this._onDidChangeVisibility})),i=L(".chat-used-context-list");return this._register(fe(i,this.themeService)),this.instantiationService.createInstance(ae,"ChatListRenderer",i,new ve,[this.instantiationService.createInstance(f,n,this.menuId,this.options)],{alwaysConsumeMouseWheel:!1,accessibilityProvider:{getAriaLabel:t=>{if(t.kind==="warning")return t.content.value;const s=t.reference;return typeof s=="string"?s:"variableName"in s?s.variableName:S.isUri(s)?V(s.path):V(s.uri.path)},getWidgetAriaLabel:()=>v("chatCollapsibleList","Collapsible Chat List")},dnd:{getDragURI:t=>y(t)?.toString()??null,getDragLabel:(t,s)=>{const c=U(t.map(y));if(c.length)return c.length===1?this.labelService.getUriLabel(c[0],{relative:!0}):`${c.length}`},dispose:()=>{},onDragOver:()=>!1,drop:()=>{},onDragStart:(t,s)=>{try{const c=t.getData(),r=U(c.map(y));this.instantiationService.invokeFunction(l=>de(l,r,s))}catch{}}}})}get(){const n=this._pool.get();let i=!1;return{object:n,isStale:()=>i,dispose:()=>{i=!0,this._pool.release(n)}}}};A=R([u(3,w),u(4,O),u(5,se)],A);class ve{getHeight(e){return 22}getTemplateId(e){return f.TEMPLATE_ID}}let f=class{constructor(e,n,i,o,t,s,c){this.labels=e;this.menuId=n;this.options=i;this.themeService=o;this.chatVariablesService=t;this.productService=s;this.instantiationService=c}static TEMPLATE_ID="chatCollapsibleListRenderer";templateId=f.TEMPLATE_ID;renderTemplate(e){const n=new Y,i=n.add(this.labels.create(e,{supportHighlights:!0,supportIcons:!0}));return{templateDisposables:n,label:i,toolbar:void 0}}getReferenceIcon(e){return x.isThemeIcon(e.iconPath)?e.iconPath:this.themeService.getColorTheme().type===me.DARK&&e.iconPath?.dark?e.iconPath?.dark:e.iconPath?.light}renderElement(e,n,i,o){if(i.toolbar?.dispose(),e.kind==="warning"){i.label.setResource({name:e.content.value},{icon:I.warning});return}const t=e.reference,s=this.getReferenceIcon(e);i.label.element.style.display="flex";let c;if(typeof t=="object"&&"variableName"in t)if(t.value){const r=S.isUri(t.value)?t.value:t.value.uri;i.label.setResource({resource:r,name:Q(r),description:`#${t.variableName}`,range:"range"in t.value?t.value.range:void 0},{icon:s,title:e.options?.status?.description??e.title})}else if(t.variableName.startsWith("kernelVariable")){const l=`${t.variableName.split(":")[1]}`;i.label.setLabel("Kernel variable",l,{title:e.options?.status?.description})}else{const r=this.chatVariablesService.getVariable(t.variableName),l=r?.icon?`$(${r.icon.id}) `:"",h=`#${t.variableName}`,b=`${l}${r?.fullName??h}`;i.label.setLabel(b,h,{title:e.options?.status?.description??r?.description})}else if(typeof t=="string")i.label.setLabel(t,void 0,{iconPath:S.isUri(s)?s:void 0,title:e.options?.status?.description??e.title});else{const r="uri"in t?t.uri:t;if(c=r,r.scheme==="https"&&H(r.authority,"github.com")&&r.path.includes("/tree/")){const l=r.path.split("/").slice(1,3).join("/"),h=r.path.split("/").slice(5).join("/");i.label.setResource({resource:r,name:l,description:h},{icon:I.github,title:e.title})}else if(r.scheme===this.productService.urlProtocol&&H(r.authority,pe)){const l=r.path.substring(1);i.label.setResource({resource:r,name:l},{icon:I.settingsGear,title:v("setting.hover","Open setting '{0}'",l)})}else J(r,M.mailto,M.http,M.https)?i.label.setResource({resource:r,name:r.toString()},{icon:s??I.globe,title:e.options?.status?.description??e.title??r.toString()}):i.label.setFile(r,{fileKind:oe.FILE,fileDecorations:this.options?.enableFileDecorations?{badges:!0,colors:!0}:{badges:!1,colors:!1},range:"range"in t?t.range:void 0,title:e.options?.status?.description??e.title})}for(const r of[".monaco-icon-suffix-container",".monaco-icon-name-container"]){const l=i.label.element.querySelector(r);l&&(e.options?.status?.kind===$.Omitted||e.options?.status?.kind===$.Partial?l.classList.add("warning"):l.classList.remove("warning"))}if(this.menuId){const r=L(".chat-collapsible-list-action-bar");i.toolbar=i.templateDisposables.add(this.instantiationService.createInstance(ee,r,this.menuId,{menuOptions:{shouldForwardArgs:!0,arg:c}})),i.label.element.appendChild(r)}}disposeTemplate(e){e.templateDisposables.dispose()}};f=R([u(3,O),u(4,B),u(5,ce),u(6,w)],f);function y(m){if(m.kind==="warning")return null;const{reference:e}=m;return typeof e=="string"||"variableName"in e?null:S.isUri(e)?e:e.uri}ne(class K extends te{static id="workbench.action.chat.addToChatAction";constructor(){super({id:K.id,title:{...X("addToChat","Add File to Chat")},f1:!1,menu:[{id:W.ChatAttachmentsContext,group:"chat",order:1,when:be.negate()}]})}async run(e,n){const i=e.get(ge),o=e.get(B);if(!n)return;const t=i.lastFocusedWidget;t&&o.attachContext("file",n,t.location)}});export{T as ChatCollapsibleListContentPart,A as CollapsibleListPool};