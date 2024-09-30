var C=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var d=(s,t,o,i)=>{for(var e=i>1?void 0:i?u(t,o):t,n=s.length-1,a;n>=0;n--)(a=s[n])&&(e=(i?a(t,o,e):a(e))||e);return i&&e&&C(t,o,e),e},l=(s,t)=>(o,i)=>t(o,i,s);import{IContextKeyService as h}from"../../../../../platform/contextkey/common/contextkey.js";import{IInstantiationService as p}from"../../../../../platform/instantiation/common/instantiation.js";import"../../../../browser/editorBrowser.js";import"../../../../common/editorCommon.js";import{EditorContextKeys as c}from"../../../../common/editorContextKeys.js";import{StandaloneColorPickerWidget as b}from"./standaloneColorPickerWidget.js";import{Disposable as _}from"../../../../../base/common/lifecycle.js";let r=class extends _{constructor(o,i,e){super();this._editor=o;this._instantiationService=e;this._standaloneColorPickerVisible=c.standaloneColorPickerVisible.bindTo(i),this._standaloneColorPickerFocused=c.standaloneColorPickerFocused.bindTo(i)}static ID="editor.contrib.standaloneColorPickerController";_standaloneColorPickerWidget=null;_standaloneColorPickerVisible;_standaloneColorPickerFocused;showOrFocus(){this._editor.hasModel()&&(this._standaloneColorPickerVisible.get()?this._standaloneColorPickerFocused.get()||this._standaloneColorPickerWidget?.focus():this._standaloneColorPickerWidget=this._instantiationService.createInstance(b,this._editor,this._standaloneColorPickerVisible,this._standaloneColorPickerFocused))}hide(){this._standaloneColorPickerFocused.set(!1),this._standaloneColorPickerVisible.set(!1),this._standaloneColorPickerWidget?.hide(),this._editor.focus()}insertColor(){this._standaloneColorPickerWidget?.updateEditor(),this.hide()}static get(o){return o.getContribution(r.ID)}};r=d([l(1,h),l(2,p)],r);export{r as StandaloneColorPickerController};