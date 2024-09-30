var P=Object.defineProperty;var B=Object.getOwnPropertyDescriptor;var C=(d,s,n,i)=>{for(var a=i>1?void 0:i?B(s,n):s,e=d.length-1,t;e>=0;e--)(t=d[e])&&(a=(i?t(s,n,a):t(a))||a);return i&&a&&P(s,n,a),a},D=(d,s)=>(n,i)=>s(n,i,d);import{Delayer as L}from"../../../../../base/common/async.js";import{VSBuffer as F}from"../../../../../base/common/buffer.js";import{Event as T}from"../../../../../base/common/event.js";import{Disposable as W,DisposableMap as X,DisposableStore as _,MutableDisposable as M,combinedDisposable as k,dispose as $}from"../../../../../base/common/lifecycle.js";import{URI as H}from"../../../../../base/common/uri.js";import"./media/developer.css";import{localize as w,localize2 as v}from"../../../../../nls.js";import{Categories as f}from"../../../../../platform/action/common/actionCommonCategories.js";import{IClipboardService as q}from"../../../../../platform/clipboard/common/clipboardService.js";import{ICommandService as z}from"../../../../../platform/commands/common/commands.js";import{IConfigurationService as O}from"../../../../../platform/configuration/common/configuration.js";import{ContextKeyExpr as U}from"../../../../../platform/contextkey/common/contextkey.js";import{IFileService as V}from"../../../../../platform/files/common/files.js";import{IOpenerService as K}from"../../../../../platform/opener/common/opener.js";import{IQuickInputService as j}from"../../../../../platform/quickinput/common/quickInput.js";import{TerminalCapability as x}from"../../../../../platform/terminal/common/capabilities/capabilities.js";import{ITerminalLogService as J,TerminalSettingId as E}from"../../../../../platform/terminal/common/terminal.js";import{IWorkspaceContextService as N}from"../../../../../platform/workspace/common/workspace.js";import"../../../terminal/browser/terminal.js";import{registerTerminalAction as b}from"../../../terminal/browser/terminalActions.js";import{registerTerminalContribution as Q}from"../../../terminal/browser/terminalExtensions.js";import"../../../terminal/browser/widgets/widgetManager.js";import"../../../terminal/common/terminal.js";import{TerminalContextKeys as G}from"../../../terminal/common/terminalContextKey.js";import{TerminalDeveloperCommandId as y}from"../common/terminal.developer.js";import{IStatusbarService as A,StatusbarAlignment as R}from"../../../../services/statusbar/browser/statusbar.js";b({id:y.ShowTextureAtlas,title:v("workbench.action.terminal.showTextureAtlas","Show Terminal Texture Atlas"),category:f.Developer,precondition:U.or(G.isOpen),run:async(d,s)=>{const n=s.get(V),i=s.get(K),a=s.get(N),e=await d.service.activeInstance?.xterm?.textureAtlas;if(!e)return;const t=a.getWorkspace().folders[0].uri,o=H.joinPath(t,"textureAtlas.png"),m=document.createElement("canvas");m.width=e.width,m.height=e.height;const r=m.getContext("bitmaprenderer");if(!r)return;r.transferFromImageBitmap(e);const c=await new Promise(p=>m.toBlob(p));c&&(await n.writeFile(o,F.wrap(new Uint8Array(await c.arrayBuffer()))),i.open(o))}}),b({id:y.WriteDataToTerminal,title:v("workbench.action.terminal.writeDataToTerminal","Write Data to Terminal"),category:f.Developer,run:async(d,s)=>{const n=s.get(j),i=await d.service.getActiveOrCreateInstance();if(await d.service.revealActiveTerminal(),await i.processReady,!i.xterm)throw new Error("Cannot write data to terminal if xterm isn't initialized");const a=await n.input({value:"",placeHolder:"Enter data, use \\x to escape",prompt:w("workbench.action.terminal.writeDataToTerminal.prompt","Enter data to write directly to the terminal, bypassing the pty")});if(!a)return;let e=a.replace(/\\n/g,`
`).replace(/\\r/g,"\r");for(;;){const o=e.match(/\\x([0-9a-fA-F]{2})/);if(o===null||o.index===void 0||o.length<2)break;e=e.slice(0,o.index)+String.fromCharCode(parseInt(o[1],16))+e.slice(o.index+4)}i.xterm._writeText(e)}}),b({id:y.RecordSession,title:v("workbench.action.terminal.recordSession","Record Terminal Session"),category:f.Developer,run:async(d,s)=>{const n=s.get(q),i=s.get(z),a=s.get(A),e=new _,t=w("workbench.action.terminal.recordSession.recording","Recording terminal session..."),o={text:t,name:t,ariaLabel:t,showProgress:!0},m=a.addEntry(o,"recordSession",R.LEFT);e.add(m);const r=await d.service.createTerminal();return d.service.setActiveInstance(r),await d.service.revealActiveTerminal(),await Promise.all([r.processReady,r.focusWhenReady(!0)]),new Promise(c=>{const p=[],g=()=>{const l=JSON.stringify(p,null,2);n.writeText(l),e.dispose(),c()},h=e.add(new L(5e3));e.add(T.runAndSubscribe(r.onDimensionsChanged,()=>{p.push({type:"resize",cols:r.cols,rows:r.rows}),h.trigger(g)})),e.add(i.onWillExecuteCommand(l=>{p.push({type:"command",id:l.commandId}),h.trigger(g)})),e.add(r.onWillData(l=>{p.push({type:"output",data:l}),h.trigger(g)})),e.add(r.onDidSendText(l=>{p.push({type:"sendText",data:l}),h.trigger(g)})),e.add(r.xterm.raw.onData(l=>{p.push({type:"input",data:l}),h.trigger(g)}));let S=!1;e.add(T.runAndSubscribe(r.capabilities.onDidAddCapability,l=>{if(S)return;const I=r.capabilities.get(x.CommandDetection);I&&(e.add(I.promptInputModel.onDidChangeInput(Y=>{p.push({type:"promptInputChange",data:I.promptInputModel.getCombinedString()}),h.trigger(g)})),S=!0)}))})}}),b({id:y.RestartPtyHost,title:v("workbench.action.terminal.restartPtyHost","Restart Pty Host"),category:f.Developer,run:async(d,s)=>{const n=s.get(J),i=Array.from(d.instanceService.getRegisteredBackends()),a=i.filter(t=>!t.isResponsive),e=a.length>0?a:i;for(const t of e)n.warn(`Restarting pty host for authority "${t.remoteAuthority}"`),t.restartPtyHost()}});let u=class extends W{constructor(n,i,a,e,t){super();this._instance=n;this._configurationService=e;this._statusbarService=t;this._register(this._configurationService.onDidChangeConfiguration(o=>{o.affectsConfiguration(E.DevMode)&&this._updateDevMode()}))}static ID="terminal.devMode";static get(n){return n.getContribution(u.ID)}_xterm;_activeDevModeDisposables=new M;_currentColor=0;_statusbarEntry;_statusbarEntryAccessor=this._register(new M);xtermReady(n){this._xterm=n,this._updateDevMode()}_updateDevMode(){const n=this._isEnabled();this._xterm?.raw.element?.classList.toggle("dev-mode",n);const i=this._instance.capabilities.get(x.CommandDetection);if(n)if(i){const a=new X,e=new _;this._activeDevModeDisposables.value=k(a,e,this._instance.onDidBlur(()=>this._updateDevMode()),this._instance.onDidFocus(()=>this._updateDevMode()),i.promptInputModel.onDidChangeInput(()=>this._updateDevMode()),i.onCommandFinished(t=>{const o=`color-${this._currentColor}`,m=[];if(a.set(t,k(...m)),t.promptStartMarker){const r=this._instance.xterm.raw?.registerDecoration({marker:t.promptStartMarker});r&&(m.push(r),e.add(r.onRender(c=>{c.textContent="A",c.classList.add("xterm-sequence-decoration","top","left",o)})))}if(t.marker){const r=this._instance.xterm.raw?.registerDecoration({marker:t.marker,x:t.startX});r&&(m.push(r),e.add(r.onRender(c=>{c.textContent="B",c.classList.add("xterm-sequence-decoration","top","right",o)})))}if(t.executedMarker){const r=this._instance.xterm.raw?.registerDecoration({marker:t.executedMarker,x:t.executedX});r&&(m.push(r),e.add(r.onRender(c=>{c.textContent="C",c.classList.add("xterm-sequence-decoration","bottom","left",o)})))}if(t.endMarker){const r=this._instance.xterm.raw?.registerDecoration({marker:t.endMarker});r&&(m.push(r),e.add(r.onRender(c=>{c.textContent="D",c.classList.add("xterm-sequence-decoration","bottom","right",o)})))}this._currentColor=(this._currentColor+1)%2}),i.onCommandInvalidated(t=>{for(const o of t){const m=a.get(o);m&&$(m),a.deleteAndDispose(o)}})),this._updatePromptInputStatusBar(i)}else this._activeDevModeDisposables.value=this._instance.capabilities.onDidAddCapabilityType(a=>{a===x.CommandDetection&&this._updateDevMode()});else this._activeDevModeDisposables.clear()}_isEnabled(){return this._configurationService.getValue(E.DevMode)||!1}_updatePromptInputStatusBar(n){const i=n.promptInputModel;if(i){const a=w("terminalDevMode","Terminal Dev Mode"),e=i.cursorIndex===-1;this._statusbarEntry={name:a,text:`$(${e?"loading~spin":"terminal"}) ${i.getCombinedString()}`,ariaLabel:a,tooltip:"The detected terminal prompt input",kind:"prominent"},this._statusbarEntryAccessor.value?this._statusbarEntryAccessor.value.update(this._statusbarEntry):this._statusbarEntryAccessor.value=this._statusbarService.addEntry(this._statusbarEntry,`terminal.promptInput.${this._instance.instanceId}`,R.LEFT),this._statusbarService.updateEntryVisibility(`terminal.promptInput.${this._instance.instanceId}`,this._instance.hasFocus)}}};u=C([D(3,O),D(4,A)],u),Q(u.ID,u);