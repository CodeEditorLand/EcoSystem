var _=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var d=(s,t,e,r)=>{for(var i=r>1?void 0:r?p(t,e):t,o=s.length-1,l;o>=0;o--)(l=s[o])&&(i=(r?l(t,e,i):l(i))||i);return r&&i&&_(t,e,i),i},n=(s,t)=>(e,r)=>t(e,r,s);import{Event as f}from"../../../../../base/common/event.js";import{Disposable as y,MutableDisposable as c}from"../../../../../base/common/lifecycle.js";import"./media/stickyScroll.css";import{IConfigurationService as b}from"../../../../../platform/configuration/common/configuration.js";import{IContextKeyService as I}from"../../../../../platform/contextkey/common/contextkey.js";import{IInstantiationService as g}from"../../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as u}from"../../../../../platform/keybinding/common/keybinding.js";import{TerminalCapability as m}from"../../../../../platform/terminal/common/capabilities/capabilities.js";import"../../../terminal/browser/terminal.js";import{TerminalInstance as S,TerminalInstanceColorProvider as T}from"../../../terminal/browser/terminalInstance.js";import"../../../terminal/browser/widgets/widgetManager.js";import"../../../terminal/common/terminal.js";import{TerminalStickyScrollSettingId as h}from"../common/terminalStickyScrollConfiguration.js";import{TerminalStickyScrollOverlay as C}from"./terminalStickyScrollOverlay.js";let a=class extends y{constructor(e,r,i,o,l,x,D){super();this._instance=e;this._configurationService=o;this._contextKeyService=l;this._instantiationService=x;this._keybindingService=D;this._register(f.runAndSubscribe(this._configurationService.onDidChangeConfiguration,v=>{(!v||v.affectsConfiguration(h.Enabled))&&this._refreshState()}))}static ID="terminal.stickyScroll";static get(e){return e.getContribution(a.ID)}_xterm;_overlay=this._register(new c);_enableListeners=this._register(new c);_disableListeners=this._register(new c);xtermReady(e){this._xterm=e,this._refreshState()}xtermOpen(e){this._refreshState()}hideLock(){this._overlay.value?.lockHide()}hideUnlock(){this._overlay.value?.unlockHide()}_refreshState(){this._overlay.value?this._tryDisable():this._tryEnable(),this._overlay.value?(this._enableListeners.clear(),this._disableListeners.value||(this._disableListeners.value=this._instance.capabilities.onDidRemoveCapability(e=>{e.id===m.CommandDetection&&this._refreshState()}))):(this._disableListeners.clear(),this._enableListeners.value||(this._enableListeners.value=this._instance.capabilities.onDidAddCapability(e=>{e.id===m.CommandDetection&&this._refreshState()})))}_tryEnable(){if(this._shouldBeEnabled()){const e=S.getXtermConstructor(this._keybindingService,this._contextKeyService);this._overlay.value=this._instantiationService.createInstance(C,this._instance,this._xterm,this._instantiationService.createInstance(T,this._instance.targetRef),this._instance.capabilities.get(m.CommandDetection),e)}}_tryDisable(){this._shouldBeEnabled()||this._overlay.clear()}_shouldBeEnabled(){const e=this._instance.capabilities.get(m.CommandDetection);return!!(this._configurationService.getValue(h.Enabled)&&e&&this._xterm?.raw?.element)}};a=d([n(3,b),n(4,I),n(5,g),n(6,u)],a);export{a as TerminalStickyScrollContribution};