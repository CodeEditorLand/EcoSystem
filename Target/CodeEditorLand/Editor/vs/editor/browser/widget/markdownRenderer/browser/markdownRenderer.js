var m=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var l=(i,e,o,n)=>{for(var t=n>1?void 0:n?f(e,o):e,r=i.length-1,s;r>=0;r--)(s=i[r])&&(t=(n?s(e,o,t):s(t))||t);return n&&t&&m(e,o,t),t},p=(i,e)=>(o,n)=>e(o,n,i);import{renderMarkdown as g}from"../../../../../base/browser/markdownRenderer.js";import{createTrustedTypesPolicy as u}from"../../../../../base/browser/trustedTypes.js";import{onUnexpectedError as y}from"../../../../../base/common/errors.js";import{Emitter as k}from"../../../../../base/common/event.js";import"../../../../../base/common/htmlContent.js";import{DisposableStore as I}from"../../../../../base/common/lifecycle.js";import"./renderedMarkdown.css";import{applyFontInfo as S}from"../../../config/domFontInfo.js";import"../../../editorBrowser.js";import{EditorOption as _}from"../../../../common/config/editorOptions.js";import{ILanguageService as w}from"../../../../common/languages/language.js";import{PLAINTEXT_LANGUAGE_ID as M}from"../../../../common/languages/modesRegistry.js";import{tokenizeToString as O}from"../../../../common/languages/textToHtmlTokenizer.js";import{IOpenerService as h}from"../../../../../platform/opener/common/opener.js";let d=class{constructor(e,o,n){this._options=e;this._languageService=o;this._openerService=n}static _ttpTokenizer=u("tokenizeToString",{createHTML(e){return e}});_onDidRenderAsync=new k;onDidRenderAsync=this._onDidRenderAsync.event;dispose(){this._onDidRenderAsync.dispose()}render(e,o,n){if(!e)return{element:document.createElement("span"),dispose:()=>{}};const t=new I,r=t.add(g(e,{...this._getRenderOptions(e,t),...o},n));return r.element.classList.add("rendered-markdown"),{element:r.element,dispose:()=>t.dispose()}}_getRenderOptions(e,o){return{codeBlockRenderer:async(n,t)=>{let r;n?r=this._languageService.getLanguageIdByLanguageName(n):this._options.editor&&(r=this._options.editor.getModel()?.getLanguageId()),r||(r=M);const s=await O(this._languageService,t,r),a=document.createElement("span");if(a.innerHTML=d._ttpTokenizer?.createHTML(s)??s,this._options.editor){const c=this._options.editor.getOption(_.fontInfo);S(a,c)}else this._options.codeBlockFontFamily&&(a.style.fontFamily=this._options.codeBlockFontFamily);return this._options.codeBlockFontSize!==void 0&&(a.style.fontSize=this._options.codeBlockFontSize),a},asyncRenderCallback:()=>this._onDidRenderAsync.fire(),actionHandler:{callback:n=>this.openMarkdownLink(n,e),disposables:o}}}async openMarkdownLink(e,o){await v(this._openerService,e,o.isTrusted)}};d=l([p(1,w),p(2,h)],d);async function v(i,e,o){try{return await i.open(e,{fromUserGesture:!0,allowContributedOpeners:!0,allowCommands:b(o)})}catch(n){return y(n),!1}}function b(i){return i===!0?!0:i&&Array.isArray(i.enabledCommands)?i.enabledCommands:!1}export{d as MarkdownRenderer,v as openLinkFromMarkdown};