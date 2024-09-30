var _=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var a=(r,n,t,i)=>{for(var e=i>1?void 0:i?w(n,t):n,o=r.length-1,s;o>=0;o--)(s=r[o])&&(e=(i?s(n,t,e):s(e))||e);return i&&e&&_(n,t,e),e},h=(r,n)=>(t,i)=>n(t,i,r);import{AccessibleViewProviderId as b,AccessibleViewType as m,IAccessibleViewService as u}from"../../../../platform/accessibility/browser/accessibleView.js";import{AccessibilityVerbositySettingId as C}from"../../accessibility/browser/accessibilityConfiguration.js";import"../common/debug.js";import"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import"../../../../platform/instantiation/common/instantiation.js";import{getReplView as V}from"./repl.js";import{IViewsService as y}from"../../../services/views/common/viewsService.js";import{ContextKeyExpr as I}from"../../../../platform/contextkey/common/contextkey.js";import{Emitter as v}from"../../../../base/common/event.js";import{Disposable as S}from"../../../../base/common/lifecycle.js";import{Position as g}from"../../../../editor/common/core/position.js";class J{priority=70;name="debugConsole";when=I.equals("focusedView","workbench.panel.repl.view");type=m.View;getProvider(n){const t=n.get(y),i=n.get(u),e=V(t);if(!e)return;const o=e.getFocusedElement();return new l(e,o,i)}}let l=class extends S{constructor(t,i,e){super();this._replView=t;this._focusedElement=i;this._accessibleViewService=e;this._treeHadFocus=!!i}id=b.Repl;_content;_onDidChangeContent=this._register(new v);onDidChangeContent=this._onDidChangeContent.event;_onDidResolveChildren=this._register(new v);onDidResolveChildren=this._onDidResolveChildren.event;verbositySettingKey=C.Debug;options={type:m.View};_elementPositionMap=new Map;_treeHadFocus=!1;provideContent(){const t=this._replView.getDebugSession();if(!t)return"No debug session available.";const i=t.getReplElements();return i.length?(this._content||this._updateContent(i),this._content??i.map(e=>e.toString(!0)).join(`
`)):"No output in the debug console."}onClose(){if(this._content=void 0,this._elementPositionMap.clear(),this._treeHadFocus)return this._replView.focusTree();this._replView.getReplInput().focus()}onOpen(){this._register(this.onDidResolveChildren(()=>{this._onDidChangeContent.fire(),queueMicrotask(()=>{if(this._focusedElement){const t=this._elementPositionMap.get(this._focusedElement.getId());t&&this._accessibleViewService.setPosition(t,!0)}})}))}async _updateContent(t){const i=this._replView.getReplDataSource();if(!i)return;let e=1;const o=[];for(const s of t)if(o.push(s.toString().replace(/\n/g,"")),this._elementPositionMap.set(s.getId(),new g(e,1)),e++,i.hasChildren(s)){const c=[],f=await i.getChildren(s);for(const p of f){const d=p.getId();this._elementPositionMap.has(d)||this._elementPositionMap.set(d,new g(e,1)),c.push("  "+p.toString()),e++}o.push(c.join(`
`))}this._content=o.join(`
`),this._onDidResolveChildren.fire()}};l=a([h(2,u)],l);export{J as ReplAccessibleView};