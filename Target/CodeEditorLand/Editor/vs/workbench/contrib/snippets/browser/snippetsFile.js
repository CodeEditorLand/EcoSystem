import{parse as S,getNodeType as u}from"../../../../base/common/json.js";import{localize as c}from"../../../../nls.js";import{extname as m,basename as h}from"../../../../base/common/path.js";import{SnippetParser as g,Variable as b,Placeholder as f,Text as y}from"../../../../editor/contrib/snippet/browser/snippetParser.js";import{KnownSnippetVariableNames as x}from"../../../../editor/contrib/snippet/browser/snippetVariables.js";import"../../../../base/common/uri.js";import"../../../../platform/files/common/files.js";import"../../../../platform/extensions/common/extensions.js";import"../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";import{relativePath as _}from"../../../../base/common/resources.js";import{isObject as v}from"../../../../base/common/types.js";import{tail as I}from"../../../../base/common/arrays.js";import{Iterable as w}from"../../../../base/common/iterator.js";import{WindowIdleValue as T,getActiveWindow as E}from"../../../../base/browser/dom.js";class P{codeSnippet;isBogous;isTrivial;usesClipboardVariable;usesSelectionVariable;constructor(s){this.isBogous=!1,this.isTrivial=!1,this.usesClipboardVariable=!1,this.usesSelectionVariable=!1,this.codeSnippet=s;const i=new g().parse(s,!1),t=new Map;let n=0;for(const e of i.placeholders)n=Math.max(n,e.index);if(i.placeholders.length===0)this.isTrivial=!0;else if(n===0){const e=I(i.children);this.isTrivial=e instanceof f&&e.isFinalTabstop}const o=[...i.children];for(;o.length>0;){const e=o.shift();if(e instanceof b){if(e.children.length===0&&!x[e.name]){const r=t.has(e.name)?t.get(e.name):++n;t.set(e.name,r);const a=new f(r).appendChild(new y(e.name));i.replace(e,[a]),this.isBogous=!0}switch(e.name){case"CLIPBOARD":this.usesClipboardVariable=!0;break;case"SELECTION":case"TM_SELECTED_TEXT":this.usesSelectionVariable=!0;break}}else o.push(...e.children)}this.isBogous&&(this.codeSnippet=i.toTextmateString())}}class B{constructor(s,i,t,n,o,e,r,a,l,d){this.isFileTemplate=s;this.scopes=i;this.name=t;this.prefix=n;this.description=o;this.body=e;this.source=r;this.snippetSource=a;this.snippetIdentifier=l;this.extensionId=d;this.prefixLow=n.toLowerCase(),this._bodyInsights=new T(E(),()=>new P(this.body))}_bodyInsights;prefixLow;get codeSnippet(){return this._bodyInsights.value.codeSnippet}get isBogous(){return this._bodyInsights.value.isBogous}get isTrivial(){return this._bodyInsights.value.isTrivial}get needsClipboard(){return this._bodyInsights.value.usesClipboardVariable}get usesSelection(){return this._bodyInsights.value.usesSelectionVariable}}function V(p){return v(p)&&!!p.body}var L=(t=>(t[t.User=1]="User",t[t.Workspace=2]="Workspace",t[t.Extension=3]="Extension",t))(L||{});class H{constructor(s,i,t,n,o,e){this.source=s;this.location=i;this.defaultScopes=t;this._extension=n;this._fileService=o;this._extensionResourceLoaderService=e;this.isGlobalSnippets=m(i.path)===".code-snippets",this.isUserSnippets=!this._extension}data=[];isGlobalSnippets;isUserSnippets;_loadPromise;select(s,i){this.isGlobalSnippets||!this.isUserSnippets?this._scopeSelect(s,i):this._filepathSelect(s,i)}_filepathSelect(s,i){s+".json"===h(this.location.path)&&i.push(...this.data)}_scopeSelect(s,i){for(const n of this.data){const o=n.scopes.length;if(o===0)i.push(n);else for(let e=0;e<o;e++)if(n.scopes[e]===s){i.push(n);break}}const t=s.lastIndexOf(".");t>=0&&this._scopeSelect(s.substring(0,t),i)}async _load(){return this._extension?this._extensionResourceLoaderService.readExtensionResource(this.location):(await this._fileService.readFile(this.location)).value.toString()}load(){return this._loadPromise||(this._loadPromise=Promise.resolve(this._load()).then(s=>{const i=S(s);if(u(i)==="object")for(const[t,n]of Object.entries(i))if(V(n))this._parseSnippet(t,n,this.data);else for(const[o,e]of Object.entries(n))this._parseSnippet(o,e,this.data);return this})),this._loadPromise}reset(){this._loadPromise=void 0,this.data.length=0}_parseSnippet(s,i,t){let{isFileTemplate:n,prefix:o,body:e,description:r}=i;if(o||(o=""),Array.isArray(e)&&(e=e.join(`
`)),typeof e!="string")return;Array.isArray(r)&&(r=r.join(`
`));let a;this.defaultScopes?a=this.defaultScopes:typeof i.scope=="string"?a=i.scope.split(",").map(d=>d.trim()).filter(Boolean):a=[];let l;this._extension?l=this._extension.displayName||this._extension.name:this.source===2?l=c("source.workspaceSnippetGlobal","Workspace Snippet"):this.isGlobalSnippets?l=c("source.userSnippetGlobal","Global User Snippet"):l=c("source.userSnippet","User Snippet");for(const d of w.wrap(o))t.push(new B(!!n,a,s,d,r,e,l,this.source,this._extension?`${_(this._extension.extensionLocation,this.location)}/${s}`:`${h(this.location.path)}/${s}`,this._extension?.identifier))}}export{B as Snippet,H as SnippetFile,L as SnippetSource};