var S=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var c=(s,i,t,e)=>{for(var r=e>1?void 0:e?l(i,t):i,a=s.length-1,n;a>=0;a--)(n=s[a])&&(r=(e?n(i,t,r):n(r))||r);return e&&r&&S(i,t,r),r},h=(s,i)=>(t,e)=>i(t,e,s);import{Emitter as g}from"../../../../base/common/event.js";import{INativeHostService as p}from"../../../../platform/native/common/native.js";import{InstantiationType as v,registerSingleton as C}from"../../../../platform/instantiation/common/extensions.js";import{Disposable as I}from"../../../../base/common/lifecycle.js";import{IHostColorSchemeService as f}from"../common/hostColorSchemeService.js";import{INativeWorkbenchEnvironmentService as u}from"../../environment/electron-sandbox/environmentService.js";import{IStorageService as E,StorageScope as m,StorageTarget as y}from"../../../../platform/storage/common/storage.js";import{isBoolean as d,isObject as O}from"../../../../base/common/types.js";import"../../../../platform/window/common/window.js";let o=class extends I{constructor(t,e,r){super();this.nativeHostService=t;this.storageService=r;this._register(this.nativeHostService.onDidChangeColorScheme(n=>this.update(n)));const a=this.getStoredValue()??e.window.colorScheme;this.dark=a.dark,this.highContrast=a.highContrast,this.nativeHostService.getOSColorScheme().then(n=>this.update(n))}static STORAGE_KEY="HostColorSchemeData";_onDidChangeColorScheme=this._register(new g);onDidChangeColorScheme=this._onDidChangeColorScheme.event;dark;highContrast;getStoredValue(){const t=this.storageService.get(o.STORAGE_KEY,m.APPLICATION);if(t)try{const e=JSON.parse(t);if(O(e)&&d(e.highContrast)&&d(e.dark))return e}catch{}}update({highContrast:t,dark:e}){(e!==this.dark||t!==this.highContrast)&&(this.dark=e,this.highContrast=t,this.storageService.store(o.STORAGE_KEY,JSON.stringify({highContrast:t,dark:e}),m.APPLICATION,y.MACHINE),this._onDidChangeColorScheme.fire())}};o=c([h(0,p),h(1,u),h(2,E)],o),C(f,o,v.Delayed);export{o as NativeHostColorSchemeService};