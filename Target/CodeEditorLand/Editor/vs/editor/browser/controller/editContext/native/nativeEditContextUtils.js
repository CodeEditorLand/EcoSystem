import{addDisposableListener as n}from"../../../../../base/browser/dom.js";import{Disposable as a}from"../../../../../base/common/lifecycle.js";class l extends a{constructor(e,o){super();this._domNode=e;this._onFocusChange=o;this._register(n(this._domNode,"focus",()=>this._handleFocusedChanged(!0))),this._register(n(this._domNode,"blur",()=>this._handleFocusedChanged(!1)))}_isFocused=!1;_handleFocusedChanged(e){this._isFocused!==e&&(this._isFocused=e,this._onFocusChange(this._isFocused))}focus(){this._handleFocusedChanged(!0),this._domNode.focus()}get isFocused(){return this._isFocused}}function u(s,t,e,o){return s.addEventListener(t,e,o),{dispose(){s.removeEventListener(t,e)}}}export{l as FocusTracker,u as editContextAddDisposableListener};