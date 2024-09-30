import{createTrustedTypesPolicy as S}from"../../../base/browser/trustedTypes.js";import*as C from"../../../base/common/strings.js";import{ColorId as h,FontStyle as k,MetadataConsts as I}from"../../common/encodedTokenAttributes.js";import{TokenizationRegistry as b}from"../../common/languages.js";import"../../common/languages/language.js";import"../../common/model.js";import{LineTokens as d}from"../../common/tokens/lineTokens.js";import{RenderLineInput as T,renderViewLine2 as L}from"../../common/viewLayout/viewLineRenderer.js";import{ViewLineRenderingData as f}from"../../common/viewModel.js";import{MonarchTokenizer as R}from"../common/monarch/monarchLexer.js";import"../common/standaloneTheme.js";const O=S("standaloneColorizer",{createHTML:c=>c});class W{static colorizeElement(i,t,n,r){r=r||{};const s=r.theme||"vs",e=r.mimeType||n.getAttribute("lang")||n.getAttribute("data-lang");if(!e)return Promise.resolve();const a=t.getLanguageIdByMimeType(e)||e;i.setTheme(s);const o=n.firstChild?n.firstChild.nodeValue:"";n.className+=" "+s;const u=l=>{const g=O?.createHTML(l)??l;n.innerHTML=g};return this.colorize(t,o||"",a,r).then(u,l=>{})}static async colorize(i,t,n,r){const s=i.languageIdCodec;let e=4;r&&typeof r.tabSize=="number"&&(e=r.tabSize),C.startsWithUTF8BOM(t)&&(t=t.substr(1));const a=C.splitLines(t);if(!i.isRegisteredLanguageId(n))return p(a,e,s);const o=await b.getOrCreate(n);return o?w(a,e,o,s):p(a,e,s)}static colorizeLine(i,t,n,r,s=4){const e=f.isBasicASCII(i,t),a=f.containsRTL(i,e,n);return L(new T(!1,!0,i,!1,e,a,0,r,[],s,0,0,0,0,-1,"none",!1,!1,null)).html}static colorizeModelLine(i,t,n=4){const r=i.getLineContent(t);i.tokenization.forceTokenization(t);const e=i.tokenization.getLineTokens(t).inflate();return this.colorizeLine(r,i.mightContainNonBasicASCII(),i.mightContainRTL(),e,n)}}function w(c,i,t,n){return new Promise((r,s)=>{const e=()=>{const a=y(c,i,t,n);if(t instanceof R){const o=t.getLoadStatus();if(o.loaded===!1){o.promise.then(e,s);return}}r(a)};e()})}function p(c,i,t){let n=[];const r=(k.None<<I.FONT_STYLE_OFFSET|h.DefaultForeground<<I.FOREGROUND_OFFSET|h.DefaultBackground<<I.BACKGROUND_OFFSET)>>>0,s=new Uint32Array(2);s[0]=0,s[1]=r;for(let e=0,a=c.length;e<a;e++){const o=c[e];s[0]=o.length;const u=new d(s,o,t),l=f.isBasicASCII(o,!0),g=f.containsRTL(o,l,!0),m=L(new T(!1,!0,o,!1,l,g,0,u,[],i,0,0,0,0,-1,"none",!1,!1,null));n=n.concat(m.html),n.push("<br/>")}return n.join("")}function y(c,i,t,n){let r=[],s=t.getInitialState();for(let e=0,a=c.length;e<a;e++){const o=c[e],u=t.tokenizeEncoded(o,!0,s);d.convertToEndOffset(u.tokens,o.length);const l=new d(u.tokens,o,n),g=f.isBasicASCII(o,!0),m=f.containsRTL(o,g,!0),z=L(new T(!1,!0,o,!1,g,m,0,l.inflate(),[],i,0,0,0,0,-1,"none",!1,!1,null));r=r.concat(z.html),r.push("<br/>"),s=u.endState}return r.join("")}export{W as Colorizer};