var X=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var b=(p,d,e,t)=>{for(var n=t>1?void 0:t?q(d,e):d,i=p.length-1,r;i>=0;i--)(r=p[i])&&(n=(t?r(d,e,n):r(n))||n);return t&&n&&X(d,e,n),n},a=(p,d)=>(e,t)=>d(e,t,p);import{Disposable as y,DisposableStore as E,MutableDisposable as F}from"../../../../../base/common/lifecycle.js";import{ITerminalEditorService as O,ITerminalGroupService as V,ITerminalService as G}from"../../../terminal/browser/terminal.js";import{registerTerminalContribution as z}from"../../../terminal/browser/terminalExtensions.js";import"../../../terminal/browser/widgets/widgetManager.js";import"../../../terminal/common/terminal.js";import{TerminalCapability as D}from"../../../../../platform/terminal/common/capabilities/capabilities.js";import{IKeybindingService as U}from"../../../../../platform/keybinding/common/keybinding.js";import{localize as f}from"../../../../../nls.js";import{Emitter as $,Event as L}from"../../../../../base/common/event.js";import{OS as B}from"../../../../../base/common/platform.js";import{KeybindingLabel as j}from"../../../../../base/browser/ui/keybindingLabel/keybindingLabel.js";import{renderFormattedText as J}from"../../../../../base/browser/formattedTextRenderer.js";import"../../../../../base/common/actions.js";import{AccessibilityVerbositySettingId as w}from"../../../accessibility/browser/accessibilityConfiguration.js";import{IConfigurationService as M}from"../../../../../platform/configuration/common/configuration.js";import{ICommandService as Q}from"../../../../../platform/commands/common/commands.js";import{IProductService as Y}from"../../../../../platform/product/common/productService.js";import{ITelemetryService as Z}from"../../../../../platform/telemetry/common/telemetry.js";import{status as ee}from"../../../../../base/browser/ui/aria/aria.js";import*as l from"../../../../../base/browser/dom.js";import{IInstantiationService as te}from"../../../../../platform/instantiation/common/instantiation.js";import{TerminalChatCommandId as T}from"./terminalChat.js";import{TerminalInstance as ie}from"../../../terminal/browser/terminalInstance.js";import"./media/terminalInitialHint.css";import{TerminalInitialHintSettingId as h}from"../common/terminalInitialHintConfiguration.js";import{ChatAgentLocation as A,IChatAgentService as k}from"../../../chat/common/chatAgents.js";import{IStorageService as N,StorageScope as S,StorageTarget as P}from"../../../../../platform/storage/common/storage.js";import{IContextMenuService as ne}from"../../../../../platform/contextview/browser/contextView.js";import{StandardMouseEvent as re}from"../../../../../base/browser/mouseEvent.js";const C=l.$;var ae=(d=>(d.InitialHintHideStorageKey="terminal.initialHint.hide",d))(ae||{});class oe extends y{constructor(e,t){super();this._capabilities=e;this._onDidChangeAgents=t}_onDidRequestCreateHint=this._register(new $);get onDidRequestCreateHint(){return this._onDidRequestCreateHint.event}_disposables=this._register(new F);activate(e){const t=this._register(new E);this._disposables.value=t;const n=this._capabilities.get(D.CommandDetection);n?t.add(L.once(n.promptInputModel.onDidStartInput)(()=>this._onDidRequestCreateHint.fire())):this._register(this._capabilities.onDidAddCapability(r=>{if(r.id===D.CommandDetection){const s=r.capability;t.add(L.once(s.promptInputModel.onDidStartInput)(()=>this._onDidRequestCreateHint.fire())),s.promptInputModel.value||this._onDidRequestCreateHint.fire()}}));const i=this._onDidChangeAgents(r=>{r?.locations.includes(A.Terminal)&&(this._onDidRequestCreateHint.fire(),i.dispose())});this._disposables.value?.add(i)}}let m=class extends y{constructor(e,t,n,i,r,s,o,g,v){super();this._instance=e;this._instantiationService=i;this._configurationService=r;this._terminalGroupService=s;this._terminalEditorService=o;this._chatAgentService=g;this._storageService=v;this._register(this._configurationService.onDidChangeConfiguration(c=>{c.affectsConfiguration(h.Enabled)&&this._storageService.remove("terminal.initialHint.hide",S.APPLICATION)}))}static ID="terminal.initialHint";_addon;_hintWidget;static get(e){return e.getContribution(m.ID)}_decoration;_xterm;xtermOpen(e){"shellLaunchConfig"in this._instance&&(this._instance.shellLaunchConfig.isExtensionOwnedTerminal||this._instance.shellLaunchConfig.isFeatureTerminal)||this._storageService.getBoolean("terminal.initialHint.hide",S.APPLICATION,!1)||this._terminalGroupService.instances.length+this._terminalEditorService.instances.length===1&&(this._xterm=e,this._addon=this._register(this._instantiationService.createInstance(oe,this._instance.capabilities,this._chatAgentService.onDidChangeAgents)),this._xterm.raw.loadAddon(this._addon),this._register(this._addon.onDidRequestCreateHint(()=>this._createHint())))}_createHint(){const e=this._instance instanceof ie?this._instance:void 0,t=e?.capabilities.get(D.CommandDetection);if(!e||!this._xterm||this._hintWidget||!t||t.promptInputModel.value||e.shellLaunchConfig.attachPersistentProcess||!this._configurationService.getValue(h.Enabled))return;if(!this._decoration){const i=this._xterm.raw.registerMarker();if(!i||this._xterm.raw.buffer.active.cursorX===0)return;this._register(i),this._decoration=this._xterm.raw.registerDecoration({marker:i,x:this._xterm.raw.buffer.active.cursorX+1}),this._decoration&&this._register(this._decoration)}this._register(this._xterm.raw.onKey(()=>this.dispose())),this._register(this._configurationService.onDidChangeConfiguration(i=>{i.affectsConfiguration(h.Enabled)&&!this._configurationService.getValue(h.Enabled)&&this.dispose()}));const n=t.promptInputModel;n&&this._register(n.onDidChangeInput(()=>{n.value&&this.dispose()})),this._decoration&&(this._register(this._decoration),this._register(this._decoration.onRender(i=>{if(!this._hintWidget&&this._xterm?.isFocused&&this._terminalGroupService.instances.length+this._terminalEditorService.instances.length===1){const r=this._chatAgentService.getActivatedAgents().filter(s=>s.locations.includes(A.Terminal));if(r?.length){const s=this._register(this._instantiationService.createInstance(_,e));if(this._addon?.dispose(),this._hintWidget=s.getDomNode(r),!this._hintWidget)return;i.appendChild(this._hintWidget),i.classList.add("terminal-initial-hint");const o=this._xterm.getFont();o&&(i.style.fontFamily=o.fontFamily,i.style.fontSize=o.fontSize+"px")}}if(this._hintWidget&&this._xterm){const r=this._hintWidget.parentElement;r&&(r.style.width=(this._xterm.raw.cols-this._xterm.raw.buffer.active.cursorX)/this._xterm.raw.cols*100+"%")}})))}};m=b([a(3,te),a(4,M),a(5,V),a(6,O),a(7,k),a(8,N)],m),z(m.ID,m,!1);let _=class extends y{constructor(e,t,n,i,r,s,o,g,v,c){super();this._instance=e;this._chatAgentService=t;this.commandService=n;this.configurationService=i;this.keybindingService=r;this.telemetryService=s;this.productService=o;this.terminalService=g;this._storageService=v;this.contextMenuService=c;this.toDispose.add(e.onDidFocus(()=>{this._instance.hasFocus&&this.isVisible&&this.ariaLabel&&this.configurationService.getValue(w.TerminalChat)&&ee(this.ariaLabel)})),this.toDispose.add(g.onDidChangeInstances(()=>{this.terminalService.instances.length!==1&&this.dispose()})),this.toDispose.add(this.configurationService.onDidChangeConfiguration(u=>{u.affectsConfiguration(h.Enabled)&&!this.configurationService.getValue(h.Enabled)&&this.dispose()}))}domNode;toDispose=this._register(new E);isVisible=!1;ariaLabel="";_getHintInlineChat(e){let t=(e.length===1?e[0].fullName:void 0)??this.productService.nameShort;const n=this._chatAgentService.getDefaultAgent(A.Panel);n?.extensionId.value===e[0].extensionId.value&&(t=n.fullName??t);let i=`Ask ${t} something or start typing to dismiss.`;const r=()=>{this._storageService.store("terminal.initialHint.hide",!0,S.APPLICATION,P.USER),this.telemetryService.publicLog2("workbenchActionExecuted",{id:"terminalInlineChat.hintAction",from:"hint"}),this.commandService.executeCommand(T.Start,{from:"hint"})};this.toDispose.add(this.commandService.onDidExecuteCommand(c=>{c.commandId===T.Start&&(this._storageService.store("terminal.initialHint.hide",!0,S.APPLICATION,P.USER),this.dispose())}));const s={disposables:this.toDispose,callback:(c,u)=>{switch(c){case"0":r();break}}},o=C("div.terminal-initial-hint");o.style.display="block";const g=this.keybindingService.lookupKeybinding(T.Start),v=g?.getLabel();if(g&&v){const c=f("emptyHintText","Press {0} to ask {1} to do something. ",v,t),[u,R]=c.split(v).map(W=>{const H=C("a",void 0,W);return this.toDispose.add(l.addDisposableListener(H,l.EventType.CLICK,r)),H});o.appendChild(u);const I=s.disposables.add(new j(o,B));I.set(g),I.element.style.width="min-content",I.element.style.display="inline",I.element.style.cursor="pointer",this.toDispose.add(l.addDisposableListener(I.element,l.EventType.CLICK,r)),o.appendChild(R);const x=f("hintTextDismiss","Start typing to dismiss."),K=C("span.detail",void 0,x);o.appendChild(K),i=c.concat(x)}else{const c=f({key:"inlineChatHint",comment:["Preserve double-square brackets and their order"]},"[[Ask {0} to do something]] or start typing to dismiss.",t),u=J(c,{actionHandler:s});o.appendChild(u)}return{ariaLabel:i,hintHandler:s,hintElement:o}}getDomNode(e){if(!this.domNode){this.domNode=C(".terminal-initial-hint"),this.domNode.style.paddingLeft="4px";const{hintElement:t,ariaLabel:n}=this._getHintInlineChat(e);this.domNode.append(t),this.ariaLabel=n.concat(f("disableHint"," Toggle {0} in settings to disable this hint.",w.TerminalChat)),this.toDispose.add(l.addDisposableListener(this.domNode,"click",()=>{this.domNode?.remove(),this.domNode=void 0})),this.toDispose.add(l.addDisposableListener(this.domNode,l.EventType.CONTEXT_MENU,i=>{this.contextMenuService.showContextMenu({getAnchor:()=>new re(l.getActiveWindow(),i),getActions:()=>[{id:"workench.action.disableTerminalInitialHint",label:f("disableInitialHint","Disable Initial Hint"),tooltip:f("disableInitialHint","Disable Initial Hint"),enabled:!0,class:void 0,run:()=>this.configurationService.updateValue(h.Enabled,!1)}]})}))}return this.domNode}dispose(){this.domNode?.remove(),super.dispose()}};_=b([a(1,k),a(2,Q),a(3,M),a(4,U),a(5,Z),a(6,Y),a(7,G),a(8,N),a(9,ne)],_);export{oe as InitialHintAddon,m as TerminalInitialHintContribution};