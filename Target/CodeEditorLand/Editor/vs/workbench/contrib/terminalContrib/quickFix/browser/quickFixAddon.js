var O=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var R=(s,a,e,i)=>{for(var n=i>1?void 0:i?w(a,e):a,r=s.length-1,c;r>=0;r--)(c=s[r])&&(n=(i?c(a,e,n):c(n))||n);return i&&n&&O(a,e,n),n},u=(s,a)=>(e,i)=>a(e,i,s);import{Emitter as U}from"../../../../../base/common/event.js";import{Disposable as W}from"../../../../../base/common/lifecycle.js";import{TerminalCapability as S}from"../../../../../platform/terminal/common/capabilities/capabilities.js";import*as A from"../../../../../base/browser/dom.js";import"../../../../../base/common/actions.js";import{asArray as H}from"../../../../../base/common/arrays.js";import{localize as T}from"../../../../../nls.js";import{IConfigurationService as K}from"../../../../../platform/configuration/common/configuration.js";import{IOpenerService as P}from"../../../../../platform/opener/common/opener.js";import{DecorationSelector as y,updateLayout as B}from"../../../terminal/browser/xterm/decorationStyles.js";import{ITelemetryService as N}from"../../../../../platform/telemetry/common/telemetry.js";import{CancellationTokenSource as E}from"../../../../../base/common/cancellation.js";import{IExtensionService as V}from"../../../../services/extensions/common/extensions.js";import{AccessibilitySignal as z,IAccessibilitySignalService as X}from"../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";import{IActionWidgetService as $}from"../../../../../platform/actionWidget/browser/actionWidget.js";import"../../../../../platform/actionWidget/common/actionWidget.js";import{getLinesForCommand as L}from"../../../../../platform/terminal/common/capabilities/commandDetectionCapability.js";import"../../../../../base/browser/ui/contextview/contextview.js";import{ILabelService as j}from"../../../../../platform/label/common/label.js";import{Schemas as g}from"../../../../../base/common/network.js";import"../../../../../base/common/uri.js";import{ITerminalQuickFixService as G,TerminalQuickFixType as l}from"./quickFix.js";import"../../../../../platform/terminal/common/terminal.js";import{ActionListItemKind as M}from"../../../../../platform/actionWidget/browser/actionList.js";import{CodeActionKind as q}from"../../../../../editor/contrib/codeAction/common/types.js";import{Codicon as f}from"../../../../../base/common/codicons.js";import{ThemeIcon as J}from"../../../../../base/common/themables.js";import{ICommandService as Y}from"../../../../../platform/commands/common/commands.js";var Z=(a=>(a.QuickFix="quick-fix",a))(Z||{});const ee=["quick-fix",y.Codicon,y.CommandDecoration,y.XtermDecoration];let _=class extends W{constructor(e,i,n,r,c,d,p,x,v,F,Q){super();this._aliases=e;this._capabilities=i;this._quickFixService=n;this._commandService=r;this._configurationService=c;this._accessibilitySignalService=d;this._openerService=p;this._telemetryService=x;this._extensionService=v;this._actionWidgetService=F;this._labelService=Q;this._capabilities.get(S.CommandDetection)?this._registerCommandHandlers():this._register(this._capabilities.onDidAddCapabilityType(o=>{o===S.CommandDetection&&this._registerCommandHandlers()})),this._register(this._quickFixService.onDidRegisterProvider(o=>this.registerCommandFinishedListener(te(o)))),this._quickFixService.extensionQuickFixes.then(o=>{for(const k of o)this.registerCommandSelector(k)}),this._register(this._quickFixService.onDidRegisterCommandSelector(o=>this.registerCommandSelector(o))),this._register(this._quickFixService.onDidUnregisterProvider(o=>this._commandListeners.delete(o)))}_onDidRequestRerunCommand=new U;onDidRequestRerunCommand=this._onDidRequestRerunCommand.event;_terminal;_commandListeners=new Map;_quickFixes;_decoration;_currentRenderContext;_lastQuickFixId;_registeredSelectors=new Set;activate(e){this._terminal=e}showMenu(){if(!this._currentRenderContext)return;const e=this._currentRenderContext.quickFixes.map(r=>new ne(r,r.type,r.source,r.label,r.kind)),i={allActions:e,hasAutoFix:!1,hasAIFix:!1,allAIFixes:!1,validActions:e,dispose:()=>{}},n={onSelect:async r=>{r.action?.run(),this._actionWidgetService.hide(),this._disposeQuickFix(r.action.id,!0)},onHide:()=>{this._terminal?.focus()}};this._actionWidgetService.show("quickFixWidget",!1,re(i.validActions,!0),n,this._currentRenderContext.anchor,this._currentRenderContext.parentElement)}registerCommandSelector(e){if(this._registeredSelectors.has(e.id))return;const i=e.commandLineMatcher.toString(),n=this._commandListeners.get(i)||[];n.push({id:e.id,type:"unresolved",commandLineMatcher:e.commandLineMatcher,outputMatcher:e.outputMatcher,commandExitResult:e.commandExitResult,kind:e.kind}),this._registeredSelectors.add(e.id),this._commandListeners.set(i,n)}registerCommandFinishedListener(e){const i=e.commandLineMatcher.toString();let n=this._commandListeners.get(i)||[];n=n.filter(r=>r.id!==e.id),n.push(e),this._commandListeners.set(i,n)}_registerCommandHandlers(){const e=this._terminal,i=this._capabilities.get(S.CommandDetection);!e||!i||this._register(i.onCommandFinished(async n=>await this._resolveQuickFixes(n,this._aliases)))}async _resolveQuickFixes(e,i){const n=this._terminal;if(!n||e.wasReplayed)return;e.command!==""&&this._lastQuickFixId&&this._disposeQuickFix(this._lastQuickFixId,!1);const r=async(d,p)=>{if(p===void 0)return;const x=d.id;return await this._extensionService.activateByEvent(`onTerminalQuickFixRequest:${x}`),this._quickFixService.providers.get(x)?.provideTerminalQuickFixes(e,p,{type:"resolved",commandLineMatcher:d.commandLineMatcher,outputMatcher:d.outputMatcher,commandExitResult:d.commandExitResult,kind:d.kind,id:d.id},new E().token)},c=await ie(i,n,e,this._commandListeners,this._commandService,this._openerService,this._labelService,this._onDidRequestRerunCommand,r);c&&(this._quickFixes=c,this._lastQuickFixId=this._quickFixes[0].id,this._registerQuickFixDecoration())}_disposeQuickFix(e,i){this._telemetryService?.publicLog2("terminal/quick-fix",{quickFixId:e,ranQuickFix:i}),this._decoration?.dispose(),this._decoration=void 0,this._quickFixes=void 0,this._lastQuickFixId=void 0}_registerQuickFixDecoration(){if(!this._terminal||!this._quickFixes)return;const e=this._terminal.registerMarker();if(!e)return;const i=this._terminal.registerDecoration({marker:e,width:2,layer:"top"});if(!i)return;this._decoration=i;const n=this._quickFixes;if(!n){i.dispose();return}i?.onRender(r=>{const c=r.getBoundingClientRect(),d={x:c.x,y:c.y,width:c.width,height:c.height};if(r.classList.contains("quick-fix")){this._currentRenderContext&&(this._currentRenderContext.anchor=d);return}r.classList.add(...ee);const p=n.every(v=>v.kind==="explain");p&&r.classList.add("explainOnly"),r.classList.add(...J.asClassNameArray(p?f.sparkle:f.lightBulb)),B(this._configurationService,r),this._accessibilitySignalService.playSignal(z.terminalQuickFix);const x=r.closest(".xterm")?.parentElement;x&&(this._currentRenderContext={quickFixes:n,anchor:d,parentElement:x},this._register(A.addDisposableListener(r,A.EventType.CLICK,()=>this.showMenu())))}),i.onDispose(()=>this._currentRenderContext=void 0),this._quickFixes=void 0}};_=R([u(2,G),u(3,Y),u(4,K),u(5,X),u(6,P),u(7,N),u(8,V),u(9,$),u(10,j)],_);async function ie(s,a,e,i,n,r,c,d,p){const x=new Set,v=new Set,F=[],Q=e.command;for(const C of i.values())for(const o of C){if(o.commandExitResult==="success"&&e.exitCode!==0||o.commandExitResult==="error"&&e.exitCode===0)continue;let k;if(o.type==="resolved")k=await o.getQuickFixes(e,L(a.buffer.active,e,a.cols,o.outputMatcher),o,new E().token);else if(o.type==="unresolved"){if(!p)throw new Error("No resolved fix provider");k=await p(o,o.outputMatcher?L(a.buffer.active,e,a.cols,o.outputMatcher):void 0)}else if(o.type==="internal"){const m=Q.match(o.commandLineMatcher);if(!m)continue;const h=o.outputMatcher;let t;if(h&&(t=e.getOutputMatch(h)),!t)continue;const I={commandLineMatch:m,outputMatch:t,commandLine:e.command};k=o.getQuickFixes(I)}if(k)for(const m of H(k)){let h;if("type"in m){switch(m.type){case l.TerminalCommand:{const t=m;if(x.has(t.terminalCommand))continue;x.add(t.terminalCommand);const I=T("quickFix.command","Run: {0}",t.terminalCommand);h={type:l.TerminalCommand,kind:o.kind,class:void 0,source:m.source,id:m.id,label:I,enabled:!0,run:()=>{d?.fire({command:t.terminalCommand,shouldExecute:t.shouldExecute??!0})},tooltip:I,command:t.terminalCommand,shouldExecute:t.shouldExecute};break}case l.Opener:{const t=m;if(!t.uri)return;if(v.has(t.uri.toString()))continue;v.add(t.uri.toString());const D=t.uri.scheme===g.http||t.uri.scheme===g.https?encodeURI(t.uri.toString(!0)):c.getUriLabel(t.uri),b=T("quickFix.opener","Open: {0}",D);h={source:m.source,id:m.id,label:b,type:l.Opener,kind:o.kind,class:void 0,enabled:!0,run:()=>r.open(t.uri),tooltip:b,uri:t.uri};break}case l.Port:{const t=m;h={source:"builtin",type:t.type,kind:o.kind,id:t.id,label:t.label,class:t.class,enabled:t.enabled,run:()=>{t.run()},tooltip:t.tooltip};break}case l.VscodeCommand:{const t=m;h={source:m.source,type:t.type,kind:o.kind,id:t.id,label:t.title,class:void 0,enabled:!0,run:()=>n.executeCommand(t.id),tooltip:t.title};break}}h&&F.push(h)}}}return F.length>0?F:void 0}function te(s){return{id:s.selector.id,type:"resolved",commandLineMatcher:s.selector.commandLineMatcher,outputMatcher:s.selector.outputMatcher,commandExitResult:s.selector.commandExitResult,kind:s.selector.kind,getQuickFixes:s.provider.provideTerminalQuickFixes}}class ne{constructor(a,e,i,n,r="fix"){this.action=a;this.type=e;this.source=i;this.title=n;this.kind=r}disabled=!1}function re(s,a){const e=[];e.push({kind:M.Header,group:{kind:q.QuickFix,title:T("codeAction.widget.id.quickfix","Quick Fix")}});for(const i of a?s:s.filter(n=>!!n.action))!i.disabled&&i.action&&e.push({kind:M.Action,item:i,group:{kind:q.QuickFix,icon:oe(i),title:i.action.label},disabled:!1,label:i.title});return e}function oe(s){if(s.kind==="explain")return f.sparkle;switch(s.type){case l.Opener:if("uri"in s.action&&s.action.uri)return s.action.uri.scheme===g.http||s.action.uri.scheme===g.https?f.linkExternal:f.goToFile;case l.TerminalCommand:return f.run;case l.Port:return f.debugDisconnect;case l.VscodeCommand:return f.lightbulb}}export{_ as TerminalQuickFixAddon,ie as getQuickFixesForCommand};