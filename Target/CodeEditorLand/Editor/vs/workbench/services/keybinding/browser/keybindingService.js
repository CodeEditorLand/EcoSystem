var V=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var U=(l,c,i,e)=>{for(var n=e>1?void 0:e?Q(c,i):c,r=l.length-1,t;r>=0;r--)(t=l[r])&&(n=(e?t(c,i,n):t(n))||n);return e&&n&&V(c,i,n),n},g=(l,c)=>(i,e)=>c(i,e,l);import*as a from"../../../../nls.js";import*as E from"../../../../base/browser/browser.js";import{BrowserFeatures as x,KeyboardSupport as M}from"../../../../base/browser/canIUse.js";import*as S from"../../../../base/browser/dom.js";import{printKeyboardEvent as X,printStandardKeyboardEvent as Z,StandardKeyboardEvent as z}from"../../../../base/browser/keyboardEvent.js";import{DeferredPromise as ee,RunOnceScheduler as ie}from"../../../../base/common/async.js";import{Emitter as ne,Event as $}from"../../../../base/common/event.js";import{parse as te}from"../../../../base/common/json.js";import"../../../../base/common/jsonSchema.js";import{UserSettingsLabelProvider as re}from"../../../../base/common/keybindingLabels.js";import{KeybindingParser as J}from"../../../../base/common/keybindingParser.js";import{KeyCodeChord as N,ScanCodeChord as H}from"../../../../base/common/keybindings.js";import{IMMUTABLE_CODE_TO_KEY_CODE as T,KeyCode as u,KeyCodeUtils as se,KeyMod as h,ScanCode as o,ScanCodeUtils as q}from"../../../../base/common/keyCodes.js";import{Disposable as oe,DisposableStore as F}from"../../../../base/common/lifecycle.js";import*as ae from"../../../../base/common/objects.js";import{isMacintosh as de,OperatingSystem as L,OS as w}from"../../../../base/common/platform.js";import{dirname as le}from"../../../../base/common/resources.js";import{mainWindow as D}from"../../../../base/browser/window.js";import{MenuRegistry as j}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as ce,ICommandService as me}from"../../../../platform/commands/common/commands.js";import{ContextKeyExpr as P,IContextKeyService as ue}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/extensions/common/extensions.js";import{FileOperation as ge,IFileService as ye}from"../../../../platform/files/common/files.js";import{InstantiationType as pe,registerSingleton as he}from"../../../../platform/instantiation/common/extensions.js";import{Extensions as be}from"../../../../platform/jsonschemas/common/jsonContributionRegistry.js";import{AbstractKeybindingService as fe}from"../../../../platform/keybinding/common/abstractKeybindingService.js";import{IKeybindingService as ve}from"../../../../platform/keybinding/common/keybinding.js";import{KeybindingResolver as Ke}from"../../../../platform/keybinding/common/keybindingResolver.js";import{KeybindingsRegistry as O,KeybindingWeight as B}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{ResolvedKeybindingItem as R}from"../../../../platform/keybinding/common/resolvedKeybindingItem.js";import{IKeyboardLayoutService as Ce}from"../../../../platform/keyboardLayout/common/keyboardLayout.js";import"../../../../platform/keyboardLayout/common/keyboardMapper.js";import{ILogService as Se}from"../../../../platform/log/common/log.js";import{INotificationService as ke}from"../../../../platform/notification/common/notification.js";import{Registry as Ie}from"../../../../platform/registry/common/platform.js";import{ITelemetryService as _e}from"../../../../platform/telemetry/common/telemetry.js";import{IUriIdentityService as we}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{isLocalizedString as De}from"../../../../platform/action/common/action.js";import{commandsExtensionPoint as Re}from"../../actions/common/menusExtensionPoint.js";import{IExtensionService as Ee}from"../../extensions/common/extensions.js";import{ExtensionsRegistry as xe}from"../../extensions/common/extensionsRegistry.js";import{IHostService as Me}from"../../host/browser/host.js";import"./navigatorKeyboard.js";import{getAllUnboundCommands as Ne}from"./unboundCommands.js";import{KeybindingIO as G,OutputBuilder as Le}from"../common/keybindingIO.js";import{IUserDataProfileService as Pe}from"../../userDataProfile/common/userDataProfile.js";function Oe(l,c){return l?typeof l.command!="string"?(c.push(a.localize("requirestring","property `{0}` is mandatory and must be of type `string`","command")),!1):l.key&&typeof l.key!="string"?(c.push(a.localize("optstring","property `{0}` can be omitted or must be of type `string`","key")),!1):l.when&&typeof l.when!="string"?(c.push(a.localize("optstring","property `{0}` can be omitted or must be of type `string`","when")),!1):l.mac&&typeof l.mac!="string"?(c.push(a.localize("optstring","property `{0}` can be omitted or must be of type `string`","mac")),!1):l.linux&&typeof l.linux!="string"?(c.push(a.localize("optstring","property `{0}` can be omitted or must be of type `string`","linux")),!1):l.win&&typeof l.win!="string"?(c.push(a.localize("optstring","property `{0}` can be omitted or must be of type `string`","win")),!1):!0:(c.push(a.localize("nonempty","expected non-empty value.")),!1)}const W={type:"object",default:{command:"",key:""},properties:{command:{description:a.localize("vscode.extension.contributes.keybindings.command","Identifier of the command to run when keybinding is triggered."),type:"string"},args:{description:a.localize("vscode.extension.contributes.keybindings.args","Arguments to pass to the command to execute.")},key:{description:a.localize("vscode.extension.contributes.keybindings.key","Key or key sequence (separate keys with plus-sign and sequences with space, e.g. Ctrl+O and Ctrl+L L for a chord)."),type:"string"},mac:{description:a.localize("vscode.extension.contributes.keybindings.mac","Mac specific key or key sequence."),type:"string"},linux:{description:a.localize("vscode.extension.contributes.keybindings.linux","Linux specific key or key sequence."),type:"string"},win:{description:a.localize("vscode.extension.contributes.keybindings.win","Windows specific key or key sequence."),type:"string"},when:{description:a.localize("vscode.extension.contributes.keybindings.when","Condition when the key is active."),type:"string"}}},Y=xe.registerExtensionPoint({extensionPoint:"keybindings",deps:[Re],jsonSchema:{description:a.localize("vscode.extension.contributes.keybindings","Contributes keybindings."),oneOf:[W,{type:"array",items:W}]}}),Ae=[o.NumpadDivide,o.NumpadMultiply,o.NumpadSubtract,o.NumpadAdd,o.Numpad1,o.Numpad2,o.Numpad3,o.Numpad4,o.Numpad5,o.Numpad6,o.Numpad7,o.Numpad8,o.Numpad9,o.Numpad0,o.NumpadDecimal],p=new Map;p.set(o.Numpad1,u.Digit1),p.set(o.Numpad2,u.Digit2),p.set(o.Numpad3,u.Digit3),p.set(o.Numpad4,u.Digit4),p.set(o.Numpad5,u.Digit5),p.set(o.Numpad6,u.Digit6),p.set(o.Numpad7,u.Digit7),p.set(o.Numpad8,u.Digit8),p.set(o.Numpad9,u.Digit9),p.set(o.Numpad0,u.Digit0);let v=class extends fe{constructor(i,e,n,r,t,d,s,m,b,f,A){super(i,e,n,r,f);this.hostService=d;this.keyboardLayoutService=A;this.isComposingGlobalContextKey=i.createKey("isComposing",!1),this.kbsJsonSchema=new k,this.updateKeybindingsJsonSchema(),this._keyboardMapper=this.keyboardLayoutService.getKeyboardMapper(),this._register(this.keyboardLayoutService.onDidChangeKeyboardLayout(()=>{this._keyboardMapper=this.keyboardLayoutService.getKeyboardMapper(),this.updateResolver()})),this._keybindingHoldMode=null,this._cachedResolver=null,this.userKeybindings=this._register(new Ue(t,b,m,f)),this.userKeybindings.initialize().then(()=>{this.userKeybindings.keybindings.length&&this.updateResolver()}),this._register(this.userKeybindings.onDidChange(()=>{f.debug("User keybindings changed"),this.updateResolver()})),Y.setHandler(K=>{const y=[];for(const C of K)this._handleKeybindingsExtensionPointUser(C.description.identifier,C.description.isBuiltin,C.value,C.collector,y);O.setExtensionKeybindings(y),this.updateResolver()}),this.updateKeybindingsJsonSchema(),this._register(s.onDidRegisterExtensions(()=>this.updateKeybindingsJsonSchema())),this._register($.runAndSubscribe(S.onDidRegisterWindow,({window:K,disposables:y})=>y.add(this._registerKeyListeners(K)),{window:D,disposables:this._store})),this._register(E.onDidChangeFullscreen(K=>{if(K!==D.vscodeWindowId)return;const y=navigator.keyboard;x.keyboard!==M.None&&(E.isFullscreen(D)?y?.lock(["Escape"]):y?.unlock(),this._cachedResolver=null,this._onDidUpdateKeybindings.fire())}))}_keyboardMapper;_cachedResolver;userKeybindings;isComposingGlobalContextKey;_keybindingHoldMode;_contributions=[];kbsJsonSchema;_registerKeyListeners(i){const e=new F;return e.add(S.addDisposableListener(i,S.EventType.KEY_DOWN,n=>{if(this._keybindingHoldMode)return;this.isComposingGlobalContextKey.set(n.isComposing);const r=new z(n);this._log(`/ Received  keydown event - ${X(n)}`),this._log(`| Converted keydown event - ${Z(r)}`),this._dispatch(r,r.target)&&r.preventDefault(),this.isComposingGlobalContextKey.set(!1)})),e.add(S.addDisposableListener(i,S.EventType.KEY_UP,n=>{this._resetKeybindingHoldMode(),this.isComposingGlobalContextKey.set(n.isComposing);const r=new z(n);this._singleModifierDispatch(r,r.target)&&r.preventDefault(),this.isComposingGlobalContextKey.set(!1)})),e}registerSchemaContribution(i){this._contributions.push(i),i.onDidChange&&this._register(i.onDidChange(()=>this.updateKeybindingsJsonSchema())),this.updateKeybindingsJsonSchema()}updateKeybindingsJsonSchema(){this.kbsJsonSchema.updateSchema(this._contributions.flatMap(i=>i.getSchemaAdditions()))}_printKeybinding(i){return re.toLabel(w,i.chords,e=>e instanceof N?se.toString(e.keyCode):q.toString(e.scanCode))||"[null]"}_printResolvedKeybinding(i){return i.getDispatchChords().map(e=>e||"[null]").join(" ")}_printResolvedKeybindings(i,e,n){const t=`${e.padStart(35," ")} => `;if(n.length===0){i.push(`${t}${"[NO BINDING]".padStart(35," ")}`);return}const d=t.length,s=!0;for(const m of n)s?i.push(`${t}${this._printResolvedKeybinding(m).padStart(35," ")}`):i.push(`${" ".repeat(d)}${this._printResolvedKeybinding(m).padStart(35," ")}`)}_dumpResolveKeybindingDebugInfo(){const i=new Set,e=[];e.push("Default Resolved Keybindings (unique only):");for(const n of O.getDefaultKeybindings()){if(!n.keybinding)continue;const r=this._printKeybinding(n.keybinding);if(i.has(r))continue;i.add(r);const t=this._keyboardMapper.resolveKeybinding(n.keybinding);this._printResolvedKeybindings(e,r,t)}e.push("User Resolved Keybindings (unique only):");for(const n of this.userKeybindings.keybindings){if(!n.keybinding)continue;const r=n._sourceKey??"Impossible: missing source key, but has keybinding";if(i.has(r))continue;i.add(r);const t=this._keyboardMapper.resolveKeybinding(n.keybinding);this._printResolvedKeybindings(e,r,t)}return e.join(`
`)}_dumpDebugInfo(){const i=JSON.stringify(this.keyboardLayoutService.getCurrentKeyboardLayout(),null,"	"),e=this._keyboardMapper.dumpDebugInfo(),n=this._dumpResolveKeybindingDebugInfo(),r=JSON.stringify(this.keyboardLayoutService.getRawKeyboardMapping(),null,"	");return`Layout info:
${i}

${n}

${e}

Raw mapping:
${r}`}_dumpDebugInfoJSON(){const i={layout:this.keyboardLayoutService.getCurrentKeyboardLayout(),rawMapping:this.keyboardLayoutService.getRawKeyboardMapping()};return JSON.stringify(i,null,"	")}enableKeybindingHoldMode(i){if(this._currentlyDispatchingCommandId!==i)return;this._keybindingHoldMode=new ee;const e=S.trackFocus(S.getWindow(void 0)),n=e.onDidBlur(()=>this._resetKeybindingHoldMode());return this._keybindingHoldMode.p.finally(()=>{n.dispose(),e.dispose()}),this._log(`+ Enabled hold-mode for ${i}.`),this._keybindingHoldMode.p}_resetKeybindingHoldMode(){this._keybindingHoldMode&&(this._keybindingHoldMode?.complete(),this._keybindingHoldMode=null)}customKeybindingsCount(){return this.userKeybindings.keybindings.length}updateResolver(){this._cachedResolver=null,this._onDidUpdateKeybindings.fire()}_getResolver(){if(!this._cachedResolver){const i=this._resolveKeybindingItems(O.getDefaultKeybindings(),!0),e=this._resolveUserKeybindingItems(this.userKeybindings.keybindings,!1);this._cachedResolver=new Ke(i,e,n=>this._log(n))}return this._cachedResolver}_documentHasFocus(){return this.hostService.hasFocus}_resolveKeybindingItems(i,e){const n=[];let r=0;for(const t of i){const d=t.when||void 0,s=t.keybinding;if(!s)n[r++]=new R(void 0,t.command,t.commandArgs,d,e,t.extensionId,t.isBuiltinExtension);else{if(this._assertBrowserConflicts(s))continue;const m=this._keyboardMapper.resolveKeybinding(s);for(let b=m.length-1;b>=0;b--){const f=m[b];n[r++]=new R(f,t.command,t.commandArgs,d,e,t.extensionId,t.isBuiltinExtension)}}}return n}_resolveUserKeybindingItems(i,e){const n=[];let r=0;for(const t of i){const d=t.when||void 0;if(!t.keybinding)n[r++]=new R(void 0,t.command,t.commandArgs,d,e,null,!1);else{const s=this._keyboardMapper.resolveKeybinding(t.keybinding);for(const m of s)n[r++]=new R(m,t.command,t.commandArgs,d,e,null,!1)}}return n}_assertBrowserConflicts(i){if(x.keyboard===M.Always||x.keyboard===M.FullScreen&&E.isFullscreen(D))return!1;for(const e of i.chords){if(!e.metaKey&&!e.altKey&&!e.ctrlKey&&!e.shiftKey)continue;const n=h.CtrlCmd|h.Alt|h.Shift;let r=0;if(e.metaKey&&(r|=h.CtrlCmd),e.shiftKey&&(r|=h.Shift),e.altKey&&(r|=h.Alt),e.ctrlKey&&w===L.Macintosh&&(r|=h.WinCtrl),(r&n)===(h.CtrlCmd|h.Alt)&&(e instanceof H&&(e.scanCode===o.ArrowLeft||e.scanCode===o.ArrowRight)||e instanceof N&&(e.keyCode===u.LeftArrow||e.keyCode===u.RightArrow))||(r&n)===h.CtrlCmd&&(e instanceof H&&e.scanCode>=o.Digit1&&e.scanCode<=o.Digit0||e instanceof N&&e.keyCode>=u.Digit0&&e.keyCode<=u.Digit9))return!0}return!1}resolveKeybinding(i){return this._keyboardMapper.resolveKeybinding(i)}resolveKeyboardEvent(i){return this.keyboardLayoutService.validateCurrentKeyboardMapping(i),this._keyboardMapper.resolveKeyboardEvent(i)}resolveUserBinding(i){const e=J.parseKeybinding(i);return e?this._keyboardMapper.resolveKeybinding(e):[]}_handleKeybindingsExtensionPointUser(i,e,n,r,t){if(Array.isArray(n))for(let d=0,s=n.length;d<s;d++)this._handleKeybinding(i,e,d+1,n[d],r,t);else this._handleKeybinding(i,e,1,n,r,t)}_handleKeybinding(i,e,n,r,t,d){const s=[];if(Oe(r,s)){const m=this._asCommandRule(i,e,n++,r);m&&d.push(m)}s.length>0&&t.error(a.localize("invalid.keybindings","Invalid `contributes.{0}`: {1}",Y.name,s.join(`
`)))}static bindToCurrentPlatform(i,e,n,r){if(w===L.Windows&&r){if(r)return r}else if(w===L.Macintosh){if(e)return e}else if(n)return n;return i}_asCommandRule(i,e,n,r){const{command:t,args:d,when:s,key:m,mac:b,linux:f,win:A}=r,K=v.bindToCurrentPlatform(m,b,f,A);if(!K)return;let y;e?y=B.BuiltinExtension+n:y=B.ExternalExtension+n;const C=j.getCommand(t),I=C&&C.precondition;let _;return s&&I?_=P.and(I,P.deserialize(s)):s?_=P.deserialize(s):I&&(_=I),{id:t,args:d,when:_,weight:y,keybinding:J.parseKeybinding(K),extensionId:i.value,isBuiltinExtension:e}}getDefaultKeybindingsContent(){const i=this._getResolver(),e=i.getDefaultKeybindings(),n=i.getDefaultBoundCommands();return v._getDefaultKeybindings(e)+`

`+v._getAllCommandsAsComment(n)}static _getDefaultKeybindings(i){const e=new Le;e.writeLine("[");const n=i.length-1;return i.forEach((r,t)=>{G.writeKeybindingItem(e,r),t!==n?e.writeLine(","):e.writeLine()}),e.writeLine("]"),e.toString()}static _getAllCommandsAsComment(i){const n=Ne(i).sort().join(`
// - `);return"// "+a.localize("unboundCommands","Here are other available commands: ")+`
// - `+n}mightProducePrintableCharacter(i){if(i.ctrlKey||i.metaKey||i.altKey)return!1;const e=q.toEnum(i.code);if(Ae.indexOf(e)!==-1)return!!(i.keyCode===T[e]||de&&i.keyCode===p.get(e));if(T[e]!==-1)return!1;const r=this.keyboardLayoutService.getRawKeyboardMapping();if(!r)return!1;const t=r[i.code];return!(!t||!t.value||/\s/.test(t.value))}};v=U([g(0,ue),g(1,me),g(2,_e),g(3,ke),g(4,Pe),g(5,Me),g(6,Ee),g(7,ye),g(8,we),g(9,Se),g(10,Ce)],v);class Ue extends oe{constructor(i,e,n,r){super();this.userDataProfileService=i;this.uriIdentityService=e;this.fileService=n;this.watch(),this.reloadConfigurationScheduler=this._register(new ie(()=>this.reload().then(t=>{t&&this._onDidChange.fire()}),50)),this._register($.filter(this.fileService.onDidFilesChange,t=>t.contains(this.userDataProfileService.currentProfile.keybindingsResource))(()=>{r.debug("Keybindings file changed"),this.reloadConfigurationScheduler.schedule()})),this._register(this.fileService.onDidRunOperation(t=>{t.operation===ge.WRITE&&t.resource.toString()===this.userDataProfileService.currentProfile.keybindingsResource.toString()&&(r.debug("Keybindings file written"),this.reloadConfigurationScheduler.schedule())})),this._register(i.onDidChangeCurrentProfile(t=>{this.uriIdentityService.extUri.isEqual(t.previous.keybindingsResource,t.profile.keybindingsResource)||t.join(this.whenCurrentProfileChanged())}))}_rawKeybindings=[];_keybindings=[];get keybindings(){return this._keybindings}reloadConfigurationScheduler;watchDisposables=this._register(new F);_onDidChange=this._register(new ne);onDidChange=this._onDidChange.event;async whenCurrentProfileChanged(){this.watch(),this.reloadConfigurationScheduler.schedule()}watch(){this.watchDisposables.clear(),this.watchDisposables.add(this.fileService.watch(le(this.userDataProfileService.currentProfile.keybindingsResource))),this.watchDisposables.add(this.fileService.watch(this.userDataProfileService.currentProfile.keybindingsResource))}async initialize(){await this.reload()}async reload(){const i=await this.readUserKeybindings();return ae.equals(this._rawKeybindings,i)?!1:(this._rawKeybindings=i,this._keybindings=this._rawKeybindings.map(e=>G.readUserKeybindingItem(e)),!0)}async readUserKeybindings(){try{const i=await this.fileService.readFile(this.userDataProfileService.currentProfile.keybindingsResource),e=te(i.value.toString());return Array.isArray(e)?e.filter(n=>n&&typeof n=="object"):[]}catch{return[]}}}class k{static schemaId="vscode://schemas/keybindings";commandsSchemas=[];commandsEnum=[];removalCommandsEnum=[];commandsEnumDescriptions=[];schema={id:k.schemaId,type:"array",title:a.localize("keybindings.json.title","Keybindings configuration"),allowTrailingCommas:!0,allowComments:!0,definitions:{editorGroupsSchema:{type:"array",items:{type:"object",properties:{groups:{$ref:"#/definitions/editorGroupsSchema",default:[{},{}]},size:{type:"number",default:.5}}}},commandNames:{type:"string",enum:this.commandsEnum,enumDescriptions:this.commandsEnumDescriptions,description:a.localize("keybindings.json.command","Name of the command to execute")},commandType:{anyOf:[{$ref:"#/definitions/commandNames"},{type:"string",enum:this.removalCommandsEnum,enumDescriptions:this.commandsEnumDescriptions,description:a.localize("keybindings.json.removalCommand","Name of the command to remove keyboard shortcut for")},{type:"string"}]},commandsSchemas:{allOf:this.commandsSchemas}},items:{required:["key"],type:"object",defaultSnippets:[{body:{key:"$1",command:"$2",when:"$3"}}],properties:{key:{type:"string",description:a.localize("keybindings.json.key","Key or key sequence (separated by space)")},command:{anyOf:[{if:{type:"array"},then:{not:{type:"array"},errorMessage:a.localize("keybindings.commandsIsArray",`Incorrect type. Expected "{0}". The field 'command' does not support running multiple commands. Use command 'runCommands' to pass it multiple commands to run.`,"string")},else:{$ref:"#/definitions/commandType"}},{$ref:"#/definitions/commandType"}]},when:{type:"string",description:a.localize("keybindings.json.when","Condition when the key is active.")},args:{description:a.localize("keybindings.json.args","Arguments to pass to the command to execute.")}},$ref:"#/definitions/commandsSchemas"}};schemaRegistry=Ie.as(be.JSONContribution);constructor(){this.schemaRegistry.registerSchema(k.schemaId,this.schema)}updateSchema(c){this.commandsSchemas.length=0,this.commandsEnum.length=0,this.removalCommandsEnum.length=0,this.commandsEnumDescriptions.length=0;const i=new Set,e=(t,d)=>{/^_/.test(t)||i.has(t)||(i.add(t),this.commandsEnum.push(t),this.commandsEnumDescriptions.push(De(d)?d.value:d),this.removalCommandsEnum.push(`-${t}`))},n=ce.getCommands();for(const[t,d]of n){const s=d.metadata;if(e(t,s?.description),!s||!s.args||s.args.length!==1||!s.args[0].schema)continue;const m=s.args[0].schema,b=typeof s.args[0].isOptional<"u"?!s.args[0].isOptional:Array.isArray(m.required)&&m.required.length>0,f={if:{required:["command"],properties:{command:{const:t}}},then:{required:[].concat(b?["args"]:[]),properties:{args:m}}};this.commandsSchemas.push(f)}const r=j.getCommands();for(const t of r.keys())e(t);this.commandsSchemas.push(...c),this.schemaRegistry.notifySchemaChanged(k.schemaId)}}he(ve,v,pe.Eager);export{v as WorkbenchKeybindingService};