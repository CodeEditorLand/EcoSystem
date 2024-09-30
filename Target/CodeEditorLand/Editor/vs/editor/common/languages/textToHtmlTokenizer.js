import{CharCode as a}from"../../../base/common/charCode.js";import*as C from"../../../base/common/strings.js";import{LineTokens as b}from"../tokens/lineTokens.js";import{TokenizationRegistry as z}from"../languages.js";import{LanguageId as L}from"../encodedTokenAttributes.js";import{NullState as h,nullTokenizeEncoded as E}from"./nullTokenize.js";import"./language.js";const S={getInitialState:()=>h,tokenizeEncoded:(i,n,o)=>E(L.Null,o)};function G(i,n,o){return T(n,i.languageIdCodec,z.get(o)||S)}async function H(i,n,o){if(!o)return T(n,i.languageIdCodec,S);const s=await z.getOrCreate(o);return T(n,i.languageIdCodec,s||S)}function M(i,n,o,s,g,p,u){let k="<div>",r=s,d=0,e=!0;for(let l=0,I=n.getCount();l<I;l++){const c=n.getEndOffset(l);if(c<=s)continue;let t="";for(;r<c&&r<g;r++){const m=i.charCodeAt(r);switch(m){case a.Tab:{let f=p-(r+d)%p;for(d+=f-1;f>0;)u&&e?(t+="&#160;",e=!1):(t+=" ",e=!0),f--;break}case a.LessThan:t+="&lt;",e=!1;break;case a.GreaterThan:t+="&gt;",e=!1;break;case a.Ampersand:t+="&amp;",e=!1;break;case a.Null:t+="&#00;",e=!1;break;case a.UTF8_BOM:case a.LINE_SEPARATOR:case a.PARAGRAPH_SEPARATOR:case a.NEXT_LINE:t+="\uFFFD",e=!1;break;case a.CarriageReturn:t+="&#8203",e=!1;break;case a.Space:u&&e?(t+="&#160;",e=!1):(t+=" ",e=!0);break;default:t+=String.fromCharCode(m),e=!1}}if(k+=`<span style="${n.getInlineStyle(l,o)}">${t}</span>`,c>g||r>=g)break}return k+="</div>",k}function T(i,n,o){let s='<div class="monaco-tokenized-source">';const g=C.splitLines(i);let p=o.getInitialState();for(let u=0,k=g.length;u<k;u++){const r=g[u];u>0&&(s+="<br/>");const d=o.tokenizeEncoded(r,!0,p);b.convertToEndOffset(d.tokens,r.length);const l=new b(d.tokens,r,n).inflate();let I=0;for(let c=0,t=l.getCount();c<t;c++){const m=l.getClassName(c),f=l.getEndOffset(c);s+=`<span class="${m}">${C.escape(r.substring(I,f))}</span>`,I=f}p=d.endState}return s+="</div>",s}export{T as _tokenizeToString,M as tokenizeLineToHTML,H as tokenizeToString,G as tokenizeToStringSync};