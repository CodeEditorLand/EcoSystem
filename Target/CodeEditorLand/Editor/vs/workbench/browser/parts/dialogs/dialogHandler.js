var f=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var h=(u,r,e,t)=>{for(var o=t>1?void 0:t?k(r,e):r,i=u.length-1,n;i>=0;i--)(n=u[i])&&(o=(t?n(r,e,o):n(o))||o);return t&&o&&f(r,e,o),o},s=(u,r)=>(e,t)=>r(e,t,u);import{localize as S}from"../../../../nls.js";import{AbstractDialogHandler as C}from"../../../../platform/dialogs/common/dialogs.js";import{ILayoutService as w}from"../../../../platform/layout/browser/layoutService.js";import{ILogService as D}from"../../../../platform/log/common/log.js";import x from"../../../../base/common/severity.js";import{Dialog as A}from"../../../../base/browser/ui/dialog/dialog.js";import{DisposableStore as L}from"../../../../base/common/lifecycle.js";import"../../../../base/browser/keyboardEvent.js";import{EventHelper as P}from"../../../../base/browser/dom.js";import{IKeybindingService as R}from"../../../../platform/keybinding/common/keybinding.js";import{IProductService as E}from"../../../../platform/product/common/productService.js";import{IClipboardService as T}from"../../../../platform/clipboard/common/clipboardService.js";import{fromNow as B}from"../../../../base/common/date.js";import{IInstantiationService as K}from"../../../../platform/instantiation/common/instantiation.js";import{MarkdownRenderer as M}from"../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";import{defaultButtonStyles as j,defaultCheckboxStyles as N,defaultDialogStyles as O,defaultInputBoxStyles as U}from"../../../../platform/theme/browser/defaultStyles.js";import{ResultKind as q}from"../../../../platform/keybinding/common/keybindingResolver.js";let d=class extends C{constructor(e,t,o,i,n,m){super();this.logService=e;this.layoutService=t;this.keybindingService=o;this.instantiationService=i;this.productService=n;this.clipboardService=m}static ALLOWABLE_COMMANDS=["copy","cut","editor.action.selectAll","editor.action.clipboardCopyAction","editor.action.clipboardCutAction","editor.action.clipboardPasteAction"];markdownRenderer=this.instantiationService.createInstance(M,{});async prompt(e){this.logService.trace("DialogService#prompt",e.message);const t=this.getPromptButtons(e),{button:o,checkboxChecked:i}=await this.doShow(e.type,e.message,t,e.detail,e.cancelButton?t.length-1:-1,e.checkbox,void 0,typeof e?.custom=="object"?e.custom:void 0);return this.getPromptResult(e,o,i)}async confirm(e){this.logService.trace("DialogService#confirm",e.message);const t=this.getConfirmationButtons(e),{button:o,checkboxChecked:i}=await this.doShow(e.type??"question",e.message,t,e.detail,t.length-1,e.checkbox,void 0,typeof e?.custom=="object"?e.custom:void 0);return{confirmed:o===0,checkboxChecked:i}}async input(e){this.logService.trace("DialogService#input",e.message);const t=this.getInputButtons(e),{button:o,checkboxChecked:i,values:n}=await this.doShow(e.type??"question",e.message,t,e.detail,t.length-1,e?.checkbox,e.inputs,typeof e.custom=="object"?e.custom:void 0);return{confirmed:o===0,checkboxChecked:i,values:n}}async about(){const e=n=>S("aboutDetail",`Version: {0}
Commit: {1}
Date: {2}
Browser: {3}`,this.productService.version||"Unknown",this.productService.commit||"Unknown",this.productService.date?`${this.productService.date}${n?" ("+B(new Date(this.productService.date),!0)+")":""}`:"Unknown",navigator.userAgent),t=e(!0),o=e(!1),{button:i}=await this.doShow(x.Info,this.productService.nameLong,[S({key:"copy",comment:["&& denotes a mnemonic"]},"&&Copy"),S("ok","OK")],t,1);i===0&&this.clipboardService.writeText(o)}async doShow(e,t,o,i,n,m,b,c){const p=new L,I=c?l=>{l.classList.add(...c.classes||[]),c.markdownDetails?.forEach(a=>{const v=this.markdownRenderer.render(a.markdown);l.appendChild(v.element),v.element.classList.add(...a.classes||[]),p.add(v)})}:void 0,y=new A(this.layoutService.activeContainer,t,o,{detail:i,cancelId:n,type:this.getDialogType(e),keyEventProcessor:l=>{const a=this.keybindingService.softDispatch(l,this.layoutService.activeContainer);a.kind===q.KbFound&&a.commandId&&d.ALLOWABLE_COMMANDS.indexOf(a.commandId)===-1&&P.stop(l,!0)},renderBody:I,icon:c?.icon,disableCloseAction:c?.disableCloseAction,buttonDetails:c?.buttonDetails,checkboxLabel:m?.label,checkboxChecked:m?.checked,inputs:b,buttonStyles:j,checkboxStyles:N,inputBoxStyles:U,dialogStyles:O});p.add(y);const g=await y.show();return p.dispose(),g}};d=h([s(0,D),s(1,w),s(2,R),s(3,K),s(4,E),s(5,T)],d);export{d as BrowserDialogHandler};