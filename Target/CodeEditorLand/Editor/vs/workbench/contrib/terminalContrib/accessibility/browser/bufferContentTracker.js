var u=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var g=(l,o,i,e)=>{for(var t=e>1?void 0:e?m(o,i):o,r=l.length-1,n;r>=0;r--)(n=l[r])&&(t=(e?n(o,i,t):n(t))||t);return e&&t&&u(o,i,t),t},d=(l,o)=>(i,e)=>o(i,e,l);import{Disposable as v}from"../../../../../base/common/lifecycle.js";import{IConfigurationService as w}from"../../../../../platform/configuration/common/configuration.js";import{ITerminalLogService as b,TerminalSettingId as C}from"../../../../../platform/terminal/common/terminal.js";import"../../../terminal/browser/terminal.js";let p=class extends v{constructor(i,e,t){super();this._xterm=i;this._logService=e;this._configurationService=t}_lastCachedMarker;_priorEditorViewportLineCount=0;_lines=[];get lines(){return this._lines}bufferToEditorLineMapping=new Map;reset(){this._lines=[],this._lastCachedMarker=void 0,this.update()}update(){this._lastCachedMarker?.isDisposed&&(this._lines=[],this._lastCachedMarker=void 0),this._removeViewportContent(),this._updateCachedContent(),this._updateViewportContent(),this._lastCachedMarker=this._register(this._xterm.raw.registerMarker()),this._logService.debug("Buffer content tracker: set ",this._lines.length," lines")}_updateCachedContent(){const i=this._xterm.raw.buffer.active,e=this._lastCachedMarker?.line?this._lastCachedMarker.line-this._xterm.raw.rows+1:0,t=i.baseY;if(e<0||e>t)return;const n=this._configurationService.getValue(C.Scrollback)+this._xterm.raw.rows-1,f=t-e;if(f+this._lines.length>n){const s=f+this._lines.length-n;for(let a=0;a<s;a++)this._lines.shift();this._logService.debug("Buffer content tracker: removed ",s," lines from top of cached lines, now ",this._lines.length," lines")}const h=[];let c="";for(let s=e;s<t;s++){const a=i.getLine(s);if(!a)continue;this.bufferToEditorLineMapping.set(s,this._lines.length+h.length);const _=i.getLine(s+1)?.isWrapped;c+=a.translateToString(!_),(c&&!_||s===i.baseY+this._xterm.raw.rows-1)&&a.length&&(h.push(c),c="")}this._logService.debug("Buffer content tracker:",h.length," lines cached"),this._lines.push(...h)}_removeViewportContent(){if(!this._lines.length)return;let i=this._priorEditorViewportLineCount,e=1;for(;i;)this.bufferToEditorLineMapping.forEach((t,r)=>{t===this._lines.length-e&&this.bufferToEditorLineMapping.delete(r)}),this._lines.pop(),e++,i--;this._logService.debug("Buffer content tracker: removed lines from viewport, now ",this._lines.length," lines cached")}_updateViewportContent(){const i=this._xterm.raw.buffer.active;this._priorEditorViewportLineCount=0;let e="";for(let t=i.baseY;t<i.baseY+this._xterm.raw.rows;t++){const r=i.getLine(t);if(!r)continue;this.bufferToEditorLineMapping.set(t,this._lines.length);const n=i.getLine(t+1)?.isWrapped;e+=r.translateToString(!n),(e&&!n||t===i.baseY+this._xterm.raw.rows-1)&&e.length&&(this._priorEditorViewportLineCount++,this._lines.push(e),e="")}this._logService.debug("Viewport content update complete, ",this._lines.length," lines in the viewport")}};p=g([d(1,b),d(2,w)],p);export{p as BufferContentTracker};
