import{Emitter as c,Event as r}from"./event.js";import"./lifecycle.js";const l=Object.freeze(function(t,e){const a=setTimeout(t.bind(e),0);return{dispose(){clearTimeout(a)}}});var s;(i=>{function t(n){return n===i.None||n===i.Cancelled||n instanceof o?!0:!n||typeof n!="object"?!1:typeof n.isCancellationRequested=="boolean"&&typeof n.onCancellationRequested=="function"}i.isCancellationToken=t,i.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:r.None}),i.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:l})})(s||={});class o{_isCancelled=!1;_emitter=null;cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?l:(this._emitter||(this._emitter=new c),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=null)}}class u{_token=void 0;_parentListener=void 0;constructor(e){this._parentListener=e&&e.onCancellationRequested(this.cancel,this)}get token(){return this._token||(this._token=new o),this._token}cancel(){this._token?this._token instanceof o&&this._token.cancel():this._token=s.Cancelled}dispose(e=!1){e&&this.cancel(),this._parentListener?.dispose(),this._token?this._token instanceof o&&this._token.dispose():this._token=s.None}}function _(t){const e=new u;return t.add({dispose(){e.cancel()}}),e.token}export{s as CancellationToken,u as CancellationTokenSource,_ as cancelOnDispose};