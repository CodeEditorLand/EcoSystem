import"../../../base/common/actions.js";import*as p from"../../../base/common/arrays.js";import{IntervalTimer as _,TimeoutTimer as y}from"../../../base/common/async.js";import{illegalState as C}from"../../../base/common/errors.js";import{Emitter as S,Event as K}from"../../../base/common/event.js";import{IME as b}from"../../../base/common/ime.js";import{KeyCode as h}from"../../../base/common/keyCodes.js";import"../../../base/common/keybindings.js";import{Disposable as M}from"../../../base/common/lifecycle.js";import*as g from"../../../nls.js";import"../../commands/common/commands.js";import"../../contextkey/common/contextkey.js";import"./keybinding.js";import{ResultKind as f,NoMatchingKb as v}from"./keybindingResolver.js";import"./resolvedKeybindingItem.js";import"../../log/common/log.js";import"../../notification/common/notification.js";import"../../telemetry/common/telemetry.js";const I=/^(cursor|delete|undo|redo|tab|editor\.action\.clipboard)/;class le extends M{constructor(e,t,r,i,d){super();this._contextKeyService=e;this._commandService=t;this._telemetryService=r;this._notificationService=i;this._logService=d;this._currentChords=[],this._currentChordChecker=new _,this._currentChordStatusMessage=null,this._ignoreSingleModifiers=c.EMPTY,this._currentSingleModifier=null,this._currentSingleModifierClearTimeout=new y,this._currentlyDispatchingCommandId=null,this._logging=!1}_serviceBrand;_onDidUpdateKeybindings=this._register(new S);get onDidUpdateKeybindings(){return this._onDidUpdateKeybindings?this._onDidUpdateKeybindings.event:K.None}_currentChords;_currentChordChecker;_currentChordStatusMessage;_ignoreSingleModifiers;_currentSingleModifier;_currentSingleModifierClearTimeout;_currentlyDispatchingCommandId;_logging;get inChordMode(){return this._currentChords.length>0}dispose(){super.dispose()}getDefaultKeybindingsContent(){return""}toggleLogging(){return this._logging=!this._logging,this._logging}_log(e){this._logging&&this._logService.info(`[KeybindingService]: ${e}`)}getDefaultKeybindings(){return this._getResolver().getDefaultKeybindings()}getKeybindings(){return this._getResolver().getKeybindings()}customKeybindingsCount(){return 0}lookupKeybindings(e){return p.coalesce(this._getResolver().lookupKeybindings(e).map(t=>t.resolvedKeybinding))}lookupKeybinding(e,t){const r=this._getResolver().lookupPrimaryKeybinding(e,t||this._contextKeyService);if(r)return r.resolvedKeybinding}dispatchEvent(e,t){return this._dispatch(e,t)}softDispatch(e,t){this._log("/ Soft dispatching keyboard event");const r=this.resolveKeyboardEvent(e);if(r.hasMultipleChords())return v;const[i]=r.getDispatchChords();if(i===null)return this._log("\\ Keyboard event cannot be dispatched"),v;const d=this._contextKeyService.getContext(t),a=this._currentChords.map(({keypress:u})=>u);return this._getResolver().resolve(d,a,i)}_scheduleLeaveChordMode(){const e=Date.now();this._currentChordChecker.cancelAndSet(()=>{if(!this._documentHasFocus()){this._leaveChordMode();return}Date.now()-e>5e3&&this._leaveChordMode()},500)}_expectAnotherChord(e,t){switch(this._currentChords.push({keypress:e,label:t}),this._currentChords.length){case 0:throw C("impossible");case 1:this._currentChordStatusMessage=this._notificationService.status(g.localize("first.chord","({0}) was pressed. Waiting for second key of chord...",t));break;default:{const r=this._currentChords.map(({label:i})=>i).join(", ");this._currentChordStatusMessage=this._notificationService.status(g.localize("next.chord","({0}) was pressed. Waiting for next key of chord...",r))}}this._scheduleLeaveChordMode(),b.enabled&&b.disable()}_leaveChordMode(){this._currentChordStatusMessage&&(this._currentChordStatusMessage.dispose(),this._currentChordStatusMessage=null),this._currentChordChecker.cancel(),this._currentChords=[],b.enable()}dispatchByUserSettingsLabel(e,t){this._log(`/ Dispatching keybinding triggered via menu entry accelerator - ${e}`);const r=this.resolveUserBinding(e);r.length===0?this._log(`\\ Could not resolve - ${e}`):this._doDispatch(r[0],t,!1)}_dispatch(e,t){return this._doDispatch(this.resolveKeyboardEvent(e),t,!1)}_singleModifierDispatch(e,t){const r=this.resolveKeyboardEvent(e),[i]=r.getSingleModifierDispatchChords();if(i)return this._ignoreSingleModifiers.has(i)?(this._log(`+ Ignoring single modifier ${i} due to it being pressed together with other keys.`),this._ignoreSingleModifiers=c.EMPTY,this._currentSingleModifierClearTimeout.cancel(),this._currentSingleModifier=null,!1):(this._ignoreSingleModifiers=c.EMPTY,this._currentSingleModifier===null?(this._log(`+ Storing single modifier for possible chord ${i}.`),this._currentSingleModifier=i,this._currentSingleModifierClearTimeout.cancelAndSet(()=>{this._log("+ Clearing single modifier due to 300ms elapsed."),this._currentSingleModifier=null},300),!1):i===this._currentSingleModifier?(this._log(`/ Dispatching single modifier chord ${i} ${i}`),this._currentSingleModifierClearTimeout.cancel(),this._currentSingleModifier=null,this._doDispatch(r,t,!0)):(this._log(`+ Clearing single modifier due to modifier mismatch: ${this._currentSingleModifier} ${i}`),this._currentSingleModifierClearTimeout.cancel(),this._currentSingleModifier=null,!1));const[d]=r.getChords();return this._ignoreSingleModifiers=new c(d),this._currentSingleModifier!==null&&this._log("+ Clearing single modifier due to other key up."),this._currentSingleModifierClearTimeout.cancel(),this._currentSingleModifier=null,!1}_doDispatch(e,t,r=!1){let i=!1;if(e.hasMultipleChords())return!1;let d=null,a=null;if(r){const[n]=e.getSingleModifierDispatchChords();d=n,a=n?[n]:[]}else[d]=e.getDispatchChords(),a=this._currentChords.map(({keypress:n})=>n);if(d===null)return this._log("\\ Keyboard event cannot be dispatched in keydown phase."),i;const u=this._contextKeyService.getContext(t),l=e.getLabel(),o=this._getResolver().resolve(u,a,d);switch(o.kind){case f.NoMatchingKb:{if(this._logService.trace("KeybindingService#dispatch",l,"[ No matching keybinding ]"),this.inChordMode){const n=this._currentChords.map(({label:m})=>m).join(", ");this._log(`+ Leaving multi-chord mode: Nothing bound to "${n}, ${l}".`),this._notificationService.status(g.localize("missing.chord","The key combination ({0}, {1}) is not a command.",n,l),{hideAfter:10*1e3}),this._leaveChordMode(),i=!0}return i}case f.MoreChordsNeeded:return this._logService.trace("KeybindingService#dispatch",l,"[ Several keybindings match - more chords needed ]"),i=!0,this._expectAnotherChord(d,l),this._log(this._currentChords.length===1?"+ Entering multi-chord mode...":"+ Continuing multi-chord mode..."),i;case f.KbFound:{if(this._logService.trace("KeybindingService#dispatch",l,`[ Will dispatch command ${o.commandId} ]`),o.commandId===null||o.commandId===""){if(this.inChordMode){const n=this._currentChords.map(({label:m})=>m).join(", ");this._log(`+ Leaving chord mode: Nothing bound to "${n}, ${l}".`),this._notificationService.status(g.localize("missing.chord","The key combination ({0}, {1}) is not a command.",n,l),{hideAfter:10*1e3}),this._leaveChordMode(),i=!0}}else{this.inChordMode&&this._leaveChordMode(),o.isBubble||(i=!0),this._log(`+ Invoking command ${o.commandId}.`),this._currentlyDispatchingCommandId=o.commandId;try{typeof o.commandArgs>"u"?this._commandService.executeCommand(o.commandId).then(void 0,n=>this._notificationService.warn(n)):this._commandService.executeCommand(o.commandId,o.commandArgs).then(void 0,n=>this._notificationService.warn(n))}finally{this._currentlyDispatchingCommandId=null}I.test(o.commandId)||this._telemetryService.publicLog2("workbenchActionExecuted",{id:o.commandId,from:"keybinding",detail:e.getUserSettingsLabel()??void 0})}return i}}}mightProducePrintableCharacter(e){return e.ctrlKey||e.metaKey?!1:e.keyCode>=h.KeyA&&e.keyCode<=h.KeyZ||e.keyCode>=h.Digit0&&e.keyCode<=h.Digit9}}class c{static EMPTY=new c(null);_ctrlKey;_shiftKey;_altKey;_metaKey;constructor(s){this._ctrlKey=s?s.ctrlKey:!1,this._shiftKey=s?s.shiftKey:!1,this._altKey=s?s.altKey:!1,this._metaKey=s?s.metaKey:!1}has(s){switch(s){case"ctrl":return this._ctrlKey;case"shift":return this._shiftKey;case"alt":return this._altKey;case"meta":return this._metaKey}}}export{le as AbstractKeybindingService};