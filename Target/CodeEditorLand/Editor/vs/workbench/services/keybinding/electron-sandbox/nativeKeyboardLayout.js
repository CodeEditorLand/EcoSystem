var f=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var s=(r,e,o,a)=>{for(var n=a>1?void 0:a?K(e,o):e,d=r.length-1,p;d>=0;d--)(p=r[d])&&(n=(a?p(e,o,n):p(n))||n);return a&&n&&f(e,o,n),n},u=(r,e)=>(o,a)=>e(o,a,r);import{Disposable as c}from"../../../../base/common/lifecycle.js";import{IKeyboardLayoutService as l}from"../../../../platform/keyboardLayout/common/keyboardLayout.js";import{Emitter as I}from"../../../../base/common/event.js";import{OperatingSystem as i,OS as t}from"../../../../base/common/platform.js";import{CachedKeyboardMapper as g}from"../../../../platform/keyboardLayout/common/keyboardMapper.js";import{WindowsKeyboardMapper as M}from"../common/windowsKeyboardMapper.js";import{FallbackKeyboardMapper as b}from"../common/fallbackKeyboardMapper.js";import{MacLinuxKeyboardMapper as L}from"../common/macLinuxKeyboardMapper.js";import{DispatchConfig as m,readKeyboardConfig as h}from"../../../../platform/keyboardLayout/common/keyboardConfig.js";import"../../../../platform/keybinding/common/keybinding.js";import{IConfigurationService as v}from"../../../../platform/configuration/common/configuration.js";import{INativeKeyboardLayoutService as C}from"./nativeKeyboardLayoutService.js";import{InstantiationType as _,registerSingleton as k}from"../../../../platform/instantiation/common/extensions.js";let y=class extends c{constructor(o,a){super();this._nativeKeyboardLayoutService=o;this._configurationService=a;this._keyboardMapper=null,this._register(this._nativeKeyboardLayoutService.onDidChangeKeyboardLayout(async()=>{this._keyboardMapper=null,this._onDidChangeKeyboardLayout.fire()})),this._register(a.onDidChangeConfiguration(async n=>{n.affectsConfiguration("keyboard")&&(this._keyboardMapper=null,this._onDidChangeKeyboardLayout.fire())}))}_onDidChangeKeyboardLayout=this._register(new I);onDidChangeKeyboardLayout=this._onDidChangeKeyboardLayout.event;_keyboardMapper;getRawKeyboardMapping(){return this._nativeKeyboardLayoutService.getRawKeyboardMapping()}getCurrentKeyboardLayout(){return this._nativeKeyboardLayoutService.getCurrentKeyboardLayout()}getAllKeyboardLayouts(){return[]}getKeyboardMapper(){const o=h(this._configurationService);return o.dispatch===m.KeyCode?new b(o.mapAltGrToCtrlAlt,t):(this._keyboardMapper||(this._keyboardMapper=new g(S(this.getCurrentKeyboardLayout(),this.getRawKeyboardMapping(),o.mapAltGrToCtrlAlt))),this._keyboardMapper)}validateCurrentKeyboardMapping(o){}};y=s([u(0,C),u(1,v)],y);function S(r,e,o){const a=w(r);return t===i.Windows?new M(a,e,o):!e||Object.keys(e).length===0?new b(o,t):t===i.Macintosh&&r.id==="com.apple.keylayout.DVORAK-QWERTYCMD"?new b(o,t):new L(a,e,o,t)}function w(r){if(!r)return!1;if(t===i.Linux){const e=r;return e.layout.split(/,/g)[e.group]==="us"}return t===i.Macintosh?r.id==="com.apple.keylayout.US":t===i.Windows?r.name==="00000409":!1}k(l,y,_.Delayed);export{y as KeyboardLayoutService};