var f=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var h=(s,o,e,t)=>{for(var i=t>1?void 0:t?m(o,e):o,n=s.length-1,c;n>=0;n--)(c=s[n])&&(i=(t?c(o,e,i):c(i))||i);return t&&i&&f(o,e,i),i},l=(s,o)=>(e,t)=>o(e,t,s);import*as a from"../../../../base/browser/dom.js";import{Disposable as d}from"../../../../base/common/lifecycle.js";import"../../../../base/common/uri.js";import{IConfigurationService as y}from"../../../../platform/configuration/common/configuration.js";import{ILifecycleService as S,LifecyclePhase as p}from"../../../services/lifecycle/common/lifecycle.js";let r=class extends d{constructor(e,t){super();this._lifecycleService=e;this._configService=t;this._register(this._configService.onDidChangeConfiguration(i=>{i.affectsConfiguration("workbench.iconTheme")&&this.updateStyleSheet()}))}_icons=new Map;_styleElement;dispose(){super.dispose(),this._styleElement=void 0}get styleElement(){return this._styleElement||(this._styleElement=a.createStyleSheet(void 0,void 0,this._store),this._styleElement.className="webview-icons"),this._styleElement}setIcons(e,t){t?this._icons.set(e,t):this._icons.delete(e),this.updateStyleSheet()}async updateStyleSheet(){await this._lifecycleService.when(p.Starting);const e=[];if(this._configService.getValue("workbench.iconTheme")!==null)for(const[t,i]of this._icons){const n=`.show-file-icons .webview-${t}-name-file-icon::before`;try{e.push(`.monaco-workbench.vs ${n}, .monaco-workbench.hc-light ${n} { content: ""; background-image: ${a.asCSSUrl(i.light)}; }`,`.monaco-workbench.vs-dark ${n}, .monaco-workbench.hc-black ${n} { content: ""; background-image: ${a.asCSSUrl(i.dark)}; }`)}catch{}}this.styleElement.textContent=e.join(`
`)}};r=h([l(0,S),l(1,y)],r);export{r as WebviewIconManager};