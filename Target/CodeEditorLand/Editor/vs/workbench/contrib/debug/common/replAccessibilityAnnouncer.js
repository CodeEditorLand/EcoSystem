var u=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var m=(n,r,t,e)=>{for(var i=e>1?void 0:e?a(r,t):r,s=n.length-1,o;s>=0;s--)(o=n[s])&&(i=(e?o(r,t,i):o(i))||i);return e&&i&&u(r,t,i),i},c=(n,r)=>(t,e)=>r(t,e,n);import{Disposable as b}from"../../../../base/common/lifecycle.js";import{IAccessibilityService as l}from"../../../../platform/accessibility/common/accessibility.js";import{ILogService as I}from"../../../../platform/log/common/log.js";import"../../../common/contributions.js";import{IDebugService as v}from"./debug.js";let g=class extends b{static ID="debug.replAccessibilityAnnouncer";constructor(r,t,e){super();const i=r.getViewModel();this._register(i.onDidFocusSession(s=>{s&&this._register(s.onDidChangeReplElements(o=>{if(!o||!("originalExpression"in o))return;const p=o.toString();t.status(p),e.trace("ReplAccessibilityAnnouncer#onDidChangeReplElements",o.originalExpression+": "+p)}))}))}};g=m([c(0,v),c(1,l),c(2,I)],g);export{g as ReplAccessibilityAnnouncer};