var j=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var w=(d,n,e,o)=>{for(var t=o>1?void 0:o?W(n,e):n,i=d.length-1,r;i>=0;i--)(r=d[i])&&(t=(o?r(n,e,t):r(t))||t);return o&&t&&j(n,e,t),t},M=(d,n)=>(e,o)=>n(e,o,d);import{createCancelablePromise as q,Delayer as J,RunOnceScheduler as Y}from"../../../../base/common/async.js";import{CancellationToken as $}from"../../../../base/common/cancellation.js";import{illegalArgument as N,onUnexpectedError as O}from"../../../../base/common/errors.js";import{KeyChord as R,KeyCode as g,KeyMod as s}from"../../../../base/common/keyCodes.js";import{Disposable as Q,DisposableStore as Z}from"../../../../base/common/lifecycle.js";import{escapeRegExpCharacters as ee}from"../../../../base/common/strings.js";import*as L from"../../../../base/common/types.js";import"./folding.css";import{StableEditorScrollState as oe}from"../../../browser/stableEditorScroll.js";import{MouseTargetType as k}from"../../../browser/editorBrowser.js";import{EditorAction as te,EditorContributionInstantiation as ie,registerEditorAction as C,registerEditorContribution as ne,registerInstantiatedEditorAction as re}from"../../../browser/editorExtensions.js";import{EditorOption as u}from"../../../common/config/editorOptions.js";import"../../../common/core/position.js";import"../../../common/core/range.js";import"../../../common/core/selection.js";import{ScrollType as le}from"../../../common/editorCommon.js";import{EditorContextKeys as f}from"../../../common/editorContextKeys.js";import"../../../common/model.js";import"../../../common/textModelEvents.js";import{FoldingRangeKind as I}from"../../../common/languages.js";import{ILanguageConfigurationService as T}from"../../../common/languages/languageConfigurationRegistry.js";import{FoldingModel as de,getNextFoldLine as se,getParentFoldLine as ae,getPreviousFoldLine as ge,setCollapseStateAtLevel as ce,setCollapseStateForMatchingLines as _,setCollapseStateForRest as K,setCollapseStateForType as D,setCollapseStateLevelsDown as x,setCollapseStateLevelsUp as U,setCollapseStateUp as ue,toggleCollapseState as z}from"./foldingModel.js";import{HiddenRangeModel as fe}from"./hiddenRangeModel.js";import{IndentRangeProvider as B}from"./indentRangeProvider.js";import*as p from"../../../../nls.js";import{IContextKeyService as pe,RawContextKey as he}from"../../../../platform/contextkey/common/contextkey.js";import{KeybindingWeight as h}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{FoldingDecorationProvider as me}from"./foldingDecorations.js";import{FoldingRegions as H,FoldSource as Ce}from"./foldingRanges.js";import{SyntaxRangeProvider as V}from"./syntaxRangeProvider.js";import{INotificationService as ve}from"../../../../platform/notification/common/notification.js";import{ILanguageFeatureDebounceService as be}from"../../../common/services/languageFeatureDebounce.js";import{StopWatch as Fe}from"../../../../base/common/stopwatch.js";import{ILanguageFeaturesService as G}from"../../../common/services/languageFeatures.js";import{Emitter as Re}from"../../../../base/common/event.js";import{CommandsRegistry as Ee}from"../../../../platform/commands/common/commands.js";import{URI as ye}from"../../../../base/common/uri.js";import{IModelService as Se}from"../../../common/services/model.js";import{IConfigurationService as Le}from"../../../../platform/configuration/common/configuration.js";const c=new he("foldingEnabled",!1);let E=class extends Q{constructor(e,o,t,i,r,l){super();this.contextKeyService=o;this.languageConfigurationService=t;this.languageFeaturesService=l;this.editor=e,this._foldingLimitReporter=new Me(e);const a=this.editor.getOptions();this._isEnabled=a.get(u.folding),this._useFoldingProviders=a.get(u.foldingStrategy)!=="indentation",this._unfoldOnClickAfterEndOfLine=a.get(u.unfoldOnClickAfterEndOfLine),this._restoringViewState=!1,this._currentModelHasFoldedImports=!1,this._foldingImportsByDefault=a.get(u.foldingImportsByDefault),this.updateDebounceInfo=r.for(l.foldingRangeProvider,"Folding",{min:200}),this.foldingModel=null,this.hiddenRangeModel=null,this.rangeProvider=null,this.foldingRegionPromise=null,this.foldingModelPromise=null,this.updateScheduler=null,this.cursorChangedScheduler=null,this.mouseDownInfo=null,this.foldingDecorationProvider=new me(e),this.foldingDecorationProvider.showFoldingControls=a.get(u.showFoldingControls),this.foldingDecorationProvider.showFoldingHighlights=a.get(u.foldingHighlight),this.foldingEnabled=c.bindTo(this.contextKeyService),this.foldingEnabled.set(this._isEnabled),this._register(this.editor.onDidChangeModel(()=>this.onModelChanged())),this._register(this.editor.onDidChangeConfiguration(F=>{if(F.hasChanged(u.folding)&&(this._isEnabled=this.editor.getOptions().get(u.folding),this.foldingEnabled.set(this._isEnabled),this.onModelChanged()),F.hasChanged(u.foldingMaximumRegions)&&this.onModelChanged(),F.hasChanged(u.showFoldingControls)||F.hasChanged(u.foldingHighlight)){const v=this.editor.getOptions();this.foldingDecorationProvider.showFoldingControls=v.get(u.showFoldingControls),this.foldingDecorationProvider.showFoldingHighlights=v.get(u.foldingHighlight),this.triggerFoldingModelChanged()}F.hasChanged(u.foldingStrategy)&&(this._useFoldingProviders=this.editor.getOptions().get(u.foldingStrategy)!=="indentation",this.onFoldingStrategyChanged()),F.hasChanged(u.unfoldOnClickAfterEndOfLine)&&(this._unfoldOnClickAfterEndOfLine=this.editor.getOptions().get(u.unfoldOnClickAfterEndOfLine)),F.hasChanged(u.foldingImportsByDefault)&&(this._foldingImportsByDefault=this.editor.getOptions().get(u.foldingImportsByDefault))})),this.onModelChanged()}static ID="editor.contrib.folding";static get(e){return e.getContribution(E.ID)}static _foldingRangeSelector;static getFoldingRangeProviders(e,o){const t=e.foldingRangeProvider.ordered(o);return E._foldingRangeSelector?.(t,o)??t}static setFoldingRangeProviderSelector(e){return E._foldingRangeSelector=e,{dispose:()=>{E._foldingRangeSelector=void 0}}}editor;_isEnabled;_useFoldingProviders;_unfoldOnClickAfterEndOfLine;_restoringViewState;_foldingImportsByDefault;_currentModelHasFoldedImports;foldingDecorationProvider;foldingModel;hiddenRangeModel;rangeProvider;foldingRegionPromise;foldingModelPromise;updateScheduler;updateDebounceInfo;foldingEnabled;cursorChangedScheduler;localToDispose=this._register(new Z);mouseDownInfo;_foldingLimitReporter;get limitReporter(){return this._foldingLimitReporter}saveViewState(){const e=this.editor.getModel();if(!e||!this._isEnabled||e.isTooLargeForTokenization())return{};if(this.foldingModel){const o=this.foldingModel.getMemento(),t=this.rangeProvider?this.rangeProvider.id:void 0;return{collapsedRegions:o,lineCount:e.getLineCount(),provider:t,foldedImports:this._currentModelHasFoldedImports}}}restoreViewState(e){const o=this.editor.getModel();if(!(!o||!this._isEnabled||o.isTooLargeForTokenization()||!this.hiddenRangeModel)&&e&&(this._currentModelHasFoldedImports=!!e.foldedImports,e.collapsedRegions&&e.collapsedRegions.length>0&&this.foldingModel)){this._restoringViewState=!0;try{this.foldingModel.applyMemento(e.collapsedRegions)}finally{this._restoringViewState=!1}}}onModelChanged(){this.localToDispose.clear();const e=this.editor.getModel();!this._isEnabled||!e||e.isTooLargeForTokenization()||(this._currentModelHasFoldedImports=!1,this.foldingModel=new de(e,this.foldingDecorationProvider),this.localToDispose.add(this.foldingModel),this.hiddenRangeModel=new fe(this.foldingModel),this.localToDispose.add(this.hiddenRangeModel),this.localToDispose.add(this.hiddenRangeModel.onDidChange(o=>this.onHiddenRangesChanges(o))),this.updateScheduler=new J(this.updateDebounceInfo.get(e)),this.cursorChangedScheduler=new Y(()=>this.revealCursor(),200),this.localToDispose.add(this.cursorChangedScheduler),this.localToDispose.add(this.languageFeaturesService.foldingRangeProvider.onDidChange(()=>this.onFoldingStrategyChanged())),this.localToDispose.add(this.editor.onDidChangeModelLanguageConfiguration(()=>this.onFoldingStrategyChanged())),this.localToDispose.add(this.editor.onDidChangeModelContent(o=>this.onDidChangeModelContent(o))),this.localToDispose.add(this.editor.onDidChangeCursorPosition(()=>this.onCursorPositionChanged())),this.localToDispose.add(this.editor.onMouseDown(o=>this.onEditorMouseDown(o))),this.localToDispose.add(this.editor.onMouseUp(o=>this.onEditorMouseUp(o))),this.localToDispose.add({dispose:()=>{this.foldingRegionPromise&&(this.foldingRegionPromise.cancel(),this.foldingRegionPromise=null),this.updateScheduler?.cancel(),this.updateScheduler=null,this.foldingModel=null,this.foldingModelPromise=null,this.hiddenRangeModel=null,this.cursorChangedScheduler=null,this.rangeProvider?.dispose(),this.rangeProvider=null}}),this.triggerFoldingModelChanged())}onFoldingStrategyChanged(){this.rangeProvider?.dispose(),this.rangeProvider=null,this.triggerFoldingModelChanged()}getRangeProvider(e){if(this.rangeProvider)return this.rangeProvider;const o=new B(e,this.languageConfigurationService,this._foldingLimitReporter);if(this.rangeProvider=o,this._useFoldingProviders&&this.foldingModel){const t=E.getFoldingRangeProviders(this.languageFeaturesService,e);t.length>0&&(this.rangeProvider=new V(e,t,()=>this.triggerFoldingModelChanged(),this._foldingLimitReporter,o))}return this.rangeProvider}getFoldingModel(){return this.foldingModelPromise}onDidChangeModelContent(e){this.hiddenRangeModel?.notifyChangeModelContent(e),this.triggerFoldingModelChanged()}triggerFoldingModelChanged(){this.updateScheduler&&(this.foldingRegionPromise&&(this.foldingRegionPromise.cancel(),this.foldingRegionPromise=null),this.foldingModelPromise=this.updateScheduler.trigger(()=>{const e=this.foldingModel;if(!e)return null;const o=new Fe,t=this.getRangeProvider(e.textModel),i=this.foldingRegionPromise=q(r=>t.compute(r));return i.then(r=>{if(r&&i===this.foldingRegionPromise){let l;if(this._foldingImportsByDefault&&!this._currentModelHasFoldedImports){const v=r.setCollapsedAllOfType(I.Imports.value,!0);v&&(l=oe.capture(this.editor),this._currentModelHasFoldedImports=v)}const a=this.editor.getSelections();e.update(r,Ie(a)),l?.restore(this.editor);const F=this.updateDebounceInfo.update(e.textModel,o.elapsed());this.updateScheduler&&(this.updateScheduler.defaultDelay=F)}return e})}).then(void 0,e=>(O(e),null)))}onHiddenRangesChanges(e){if(this.hiddenRangeModel&&e.length&&!this._restoringViewState){const o=this.editor.getSelections();o&&this.hiddenRangeModel.adjustSelections(o)&&this.editor.setSelections(o)}this.editor.setHiddenAreas(e,this)}onCursorPositionChanged(){this.hiddenRangeModel&&this.hiddenRangeModel.hasRanges()&&this.cursorChangedScheduler.schedule()}revealCursor(){const e=this.getFoldingModel();e&&e.then(o=>{if(o){const t=this.editor.getSelections();if(t&&t.length>0){const i=[];for(const r of t){const l=r.selectionStartLineNumber;this.hiddenRangeModel&&this.hiddenRangeModel.isHidden(l)&&i.push(...o.getAllRegionsAtLine(l,a=>a.isCollapsed&&l>a.startLineNumber))}i.length&&(o.toggleCollapseState(i),this.reveal(t[0].getPosition()))}}}).then(void 0,O)}onEditorMouseDown(e){if(this.mouseDownInfo=null,!this.hiddenRangeModel||!e.target||!e.target.range||!e.event.leftButton&&!e.event.middleButton)return;const o=e.target.range;let t=!1;switch(e.target.type){case k.GUTTER_LINE_DECORATIONS:{const i=e.target.detail,r=e.target.element.offsetLeft;if(i.offsetX-r<4)return;t=!0;break}case k.CONTENT_EMPTY:{if(this._unfoldOnClickAfterEndOfLine&&this.hiddenRangeModel.hasRanges()&&!e.target.detail.isAfterLines)break;return}case k.CONTENT_TEXT:{if(this.hiddenRangeModel.hasRanges()){const i=this.editor.getModel();if(i&&o.startColumn===i.getLineMaxColumn(o.startLineNumber))break}return}default:return}this.mouseDownInfo={lineNumber:o.startLineNumber,iconClicked:t}}onEditorMouseUp(e){const o=this.foldingModel;if(!o||!this.mouseDownInfo||!e.target)return;const t=this.mouseDownInfo.lineNumber,i=this.mouseDownInfo.iconClicked,r=e.target.range;if(!r||r.startLineNumber!==t)return;if(i){if(e.target.type!==k.GUTTER_LINE_DECORATIONS)return}else{const a=this.editor.getModel();if(!a||r.startColumn!==a.getLineMaxColumn(t))return}const l=o.getRegionAtLine(t);if(l&&l.startLineNumber===t){const a=l.isCollapsed;if(i||a){const F=e.event.altKey;let v=[];if(F){const y=b=>!b.containedBy(l)&&!l.containedBy(b),S=o.getRegionsInside(null,y);for(const b of S)b.isCollapsed&&v.push(b);v.length===0&&(v=S)}else{const y=e.event.middleButton||e.event.shiftKey;if(y)for(const S of o.getRegionsInside(l))S.isCollapsed===a&&v.push(S);(a||!y||v.length===0)&&v.push(l)}o.toggleCollapseState(v),this.reveal({lineNumber:t,column:1})}}}reveal(e){this.editor.revealPositionInCenterIfOutsideViewport(e,le.Smooth)}};E=w([M(1,pe),M(2,T),M(3,ve),M(4,be),M(5,G)],E);class Me{constructor(n){this.editor=n}get limit(){return this.editor.getOptions().get(u.foldingMaximumRegions)}_onDidChange=new Re;onDidChange=this._onDidChange.event;_computed=0;_limited=!1;get computed(){return this._computed}get limited(){return this._limited}update(n,e){(n!==this._computed||e!==this._limited)&&(this._computed=n,this._limited=e,this._onDidChange.fire())}}class m extends te{runEditorCommand(n,e,o){const t=n.get(T),i=E.get(e);if(!i)return;const r=i.getFoldingModel();if(r)return this.reportTelemetry(n,e),r.then(l=>{if(l){this.invoke(i,l,e,o,t);const a=e.getSelection();a&&i.reveal(a.getStartPosition())}})}getSelectedLines(n){const e=n.getSelections();return e?e.map(o=>o.startLineNumber):[]}getLineNumbers(n,e){return n&&n.selectionLines?n.selectionLines.map(o=>o+1):this.getSelectedLines(e)}run(n,e){}}function Ie(d){return!d||d.length===0?{startsInside:()=>!1}:{startsInside(n,e){for(const o of d){const t=o.startLineNumber;if(t>=n&&t<=e)return!0}return!1}}}function X(d){if(!L.isUndefined(d)){if(!L.isObject(d))return!1;const n=d;if(!L.isUndefined(n.levels)&&!L.isNumber(n.levels)||!L.isUndefined(n.direction)&&!L.isString(n.direction)||!L.isUndefined(n.selectionLines)&&(!Array.isArray(n.selectionLines)||!n.selectionLines.every(L.isNumber)))return!1}return!0}class xe extends m{constructor(){super({id:"editor.unfold",label:p.localize("unfoldAction.label","Unfold"),alias:"Unfold",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:s.CtrlCmd|s.Shift|g.BracketRight,mac:{primary:s.CtrlCmd|s.Alt|g.BracketRight},weight:h.EditorContrib},metadata:{description:"Unfold the content in the editor",args:[{name:"Unfold editor argument",description:`Property-value pairs that can be passed through this argument:
						* 'levels': Number of levels to unfold. If not set, defaults to 1.
						* 'direction': If 'up', unfold given number of levels up otherwise unfolds down.
						* 'selectionLines': Array of the start lines (0-based) of the editor selections to apply the unfold action to. If not set, the active selection(s) will be used.
						`,constraint:X,schema:{type:"object",properties:{levels:{type:"number",default:1},direction:{type:"string",enum:["up","down"],default:"down"},selectionLines:{type:"array",items:{type:"number"}}}}}]}})}invoke(n,e,o,t){const i=t&&t.levels||1,r=this.getLineNumbers(t,o);t&&t.direction==="up"?U(e,!1,i,r):x(e,!1,i,r)}}class Ae extends m{constructor(){super({id:"editor.unfoldRecursively",label:p.localize("unFoldRecursivelyAction.label","Unfold Recursively"),alias:"Unfold Recursively",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.BracketRight),weight:h.EditorContrib}})}invoke(n,e,o,t){x(e,!1,Number.MAX_VALUE,this.getSelectedLines(o))}}class ke extends m{constructor(){super({id:"editor.fold",label:p.localize("foldAction.label","Fold"),alias:"Fold",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:s.CtrlCmd|s.Shift|g.BracketLeft,mac:{primary:s.CtrlCmd|s.Alt|g.BracketLeft},weight:h.EditorContrib},metadata:{description:"Fold the content in the editor",args:[{name:"Fold editor argument",description:`Property-value pairs that can be passed through this argument:
							* 'levels': Number of levels to fold.
							* 'direction': If 'up', folds given number of levels up otherwise folds down.
							* 'selectionLines': Array of the start lines (0-based) of the editor selections to apply the fold action to. If not set, the active selection(s) will be used.
							If no levels or direction is set, folds the region at the locations or if already collapsed, the first uncollapsed parent instead.
						`,constraint:X,schema:{type:"object",properties:{levels:{type:"number"},direction:{type:"string",enum:["up","down"]},selectionLines:{type:"array",items:{type:"number"}}}}}]}})}invoke(n,e,o,t){const i=this.getLineNumbers(t,o),r=t&&t.levels,l=t&&t.direction;typeof r!="number"&&typeof l!="string"?ue(e,!0,i):l==="up"?U(e,!0,r||1,i):x(e,!0,r||1,i)}}class Pe extends m{constructor(){super({id:"editor.toggleFold",label:p.localize("toggleFoldAction.label","Toggle Fold"),alias:"Toggle Fold",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.KeyL),weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);z(e,1,t)}}class Te extends m{constructor(){super({id:"editor.foldRecursively",label:p.localize("foldRecursivelyAction.label","Fold Recursively"),alias:"Fold Recursively",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.BracketLeft),weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);x(e,!0,Number.MAX_VALUE,t)}}class _e extends m{constructor(){super({id:"editor.toggleFoldRecursively",label:p.localize("toggleFoldRecursivelyAction.label","Toggle Fold Recursively"),alias:"Toggle Fold Recursively",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|s.Shift|g.KeyL),weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);z(e,Number.MAX_VALUE,t)}}class De extends m{constructor(){super({id:"editor.foldAllBlockComments",label:p.localize("foldAllBlockComments.label","Fold All Block Comments"),alias:"Fold All Block Comments",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Slash),weight:h.EditorContrib}})}invoke(n,e,o,t,i){if(e.regions.hasTypes())D(e,I.Comment.value,!0);else{const r=o.getModel();if(!r)return;const l=i.getLanguageConfiguration(r.getLanguageId()).comments;if(l&&l.blockCommentStartToken){const a=new RegExp("^\\s*"+ee(l.blockCommentStartToken));_(e,a,!0)}}}}class we extends m{constructor(){super({id:"editor.foldAllMarkerRegions",label:p.localize("foldAllMarkerRegions.label","Fold All Regions"),alias:"Fold All Regions",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Digit8),weight:h.EditorContrib}})}invoke(n,e,o,t,i){if(e.regions.hasTypes())D(e,I.Region.value,!0);else{const r=o.getModel();if(!r)return;const l=i.getLanguageConfiguration(r.getLanguageId()).foldingRules;if(l&&l.markers&&l.markers.start){const a=new RegExp(l.markers.start);_(e,a,!0)}}}}class Ne extends m{constructor(){super({id:"editor.unfoldAllMarkerRegions",label:p.localize("unfoldAllMarkerRegions.label","Unfold All Regions"),alias:"Unfold All Regions",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Digit9),weight:h.EditorContrib}})}invoke(n,e,o,t,i){if(e.regions.hasTypes())D(e,I.Region.value,!1);else{const r=o.getModel();if(!r)return;const l=i.getLanguageConfiguration(r.getLanguageId()).foldingRules;if(l&&l.markers&&l.markers.start){const a=new RegExp(l.markers.start);_(e,a,!1)}}}}class Oe extends m{constructor(){super({id:"editor.foldAllExcept",label:p.localize("foldAllExcept.label","Fold All Except Selected"),alias:"Fold All Except Selected",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Minus),weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);K(e,!0,t)}}class Ke extends m{constructor(){super({id:"editor.unfoldAllExcept",label:p.localize("unfoldAllExcept.label","Unfold All Except Selected"),alias:"Unfold All Except Selected",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Equal),weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);K(e,!1,t)}}class Ue extends m{constructor(){super({id:"editor.foldAll",label:p.localize("foldAllAction.label","Fold All"),alias:"Fold All",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Digit0),weight:h.EditorContrib}})}invoke(n,e,o){x(e,!0)}}class ze extends m{constructor(){super({id:"editor.unfoldAll",label:p.localize("unfoldAllAction.label","Unfold All"),alias:"Unfold All",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.KeyJ),weight:h.EditorContrib}})}invoke(n,e,o){x(e,!1)}}class A extends m{static ID_PREFIX="editor.foldLevel";static ID=n=>A.ID_PREFIX+n;getFoldingLevel(){return parseInt(this.id.substr(A.ID_PREFIX.length))}invoke(n,e,o){ce(e,this.getFoldingLevel(),!0,this.getSelectedLines(o))}}class Be extends m{constructor(){super({id:"editor.gotoParentFold",label:p.localize("gotoParentFold.label","Go to Parent Fold"),alias:"Go to Parent Fold",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);if(t.length>0){const i=ae(t[0],e);i!==null&&o.setSelection({startLineNumber:i,startColumn:1,endLineNumber:i,endColumn:1})}}}class He extends m{constructor(){super({id:"editor.gotoPreviousFold",label:p.localize("gotoPreviousFold.label","Go to Previous Folding Range"),alias:"Go to Previous Folding Range",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);if(t.length>0){const i=ge(t[0],e);i!==null&&o.setSelection({startLineNumber:i,startColumn:1,endLineNumber:i,endColumn:1})}}}class Ve extends m{constructor(){super({id:"editor.gotoNextFold",label:p.localize("gotoNextFold.label","Go to Next Folding Range"),alias:"Go to Next Folding Range",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,weight:h.EditorContrib}})}invoke(n,e,o){const t=this.getSelectedLines(o);if(t.length>0){const i=se(t[0],e);i!==null&&o.setSelection({startLineNumber:i,startColumn:1,endLineNumber:i,endColumn:1})}}}class Ge extends m{constructor(){super({id:"editor.createFoldingRangeFromSelection",label:p.localize("createManualFoldRange.label","Create Folding Range from Selection"),alias:"Create Folding Range from Selection",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Comma),weight:h.EditorContrib}})}invoke(n,e,o){const t=[],i=o.getSelections();if(i){for(const r of i){let l=r.endLineNumber;r.endColumn===1&&--l,l>r.startLineNumber&&(t.push({startLineNumber:r.startLineNumber,endLineNumber:l,type:void 0,isCollapsed:!0,source:Ce.userDefined}),o.setSelection({startLineNumber:r.startLineNumber,startColumn:1,endLineNumber:r.startLineNumber,endColumn:1}))}if(t.length>0){t.sort((l,a)=>l.startLineNumber-a.startLineNumber);const r=H.sanitizeAndMerge(e.regions,t,o.getModel()?.getLineCount());e.updatePost(H.fromFoldRanges(r))}}}}class Xe extends m{constructor(){super({id:"editor.removeManualFoldingRanges",label:p.localize("removeManualFoldingRanges.label","Remove Manual Folding Ranges"),alias:"Remove Manual Folding Ranges",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Period),weight:h.EditorContrib}})}invoke(n,e,o){const t=o.getSelections();if(t){const i=[];for(const r of t){const{startLineNumber:l,endLineNumber:a}=r;i.push(a>=l?{startLineNumber:l,endLineNumber:a}:{endLineNumber:a,startLineNumber:l})}e.removeManualRanges(i),n.triggerFoldingModelChanged()}}}class je extends m{constructor(){super({id:"editor.toggleImportFold",label:p.localize("toggleImportFold.label","Toggle Import Fold"),alias:"Toggle Import Fold",precondition:c,kbOpts:{kbExpr:f.editorTextFocus,weight:h.EditorContrib}})}async invoke(n,e){const o=[],t=e.regions;for(let i=t.length-1;i>=0;i--)t.getType(i)===I.Imports.value&&o.push(t.toRegion(i));e.toggleCollapseState(o),n.triggerFoldingModelChanged()}}ne(E.ID,E,ie.Eager),C(xe),C(Ae),C(ke),C(Te),C(_e),C(Ue),C(ze),C(De),C(we),C(Ne),C(Oe),C(Ke),C(Pe),C(Be),C(He),C(Ve),C(Ge),C(Xe),C(je);for(let d=1;d<=7;d++)re(new A({id:A.ID(d),label:p.localize("foldLevelAction.label","Fold Level {0}",d),alias:`Fold Level ${d}`,precondition:c,kbOpts:{kbExpr:f.editorTextFocus,primary:R(s.CtrlCmd|g.KeyK,s.CtrlCmd|g.Digit0+d),weight:h.EditorContrib}}));Ee.registerCommand("_executeFoldingRangeProvider",async function(d,...n){const[e]=n;if(!(e instanceof ye))throw N();const o=d.get(G),t=d.get(Se).getModel(e);if(!t)throw N();const i=d.get(Le);if(!i.getValue("editor.folding",{resource:e}))return[];const r=d.get(T),l=i.getValue("editor.foldingStrategy",{resource:e}),a={get limit(){return i.getValue("editor.foldingMaximumRegions",{resource:e})},update:(b,P)=>{}},F=new B(t,r,a);let v=F;if(l!=="indentation"){const b=E.getFoldingRangeProviders(o,t);b.length&&(v=new V(t,b,()=>{},a,F))}const y=await v.compute($.None),S=[];try{if(y)for(let b=0;b<y.length;b++){const P=y.getType(b);S.push({start:y.getStartLineNumber(b),end:y.getEndLineNumber(b),kind:P?I.fromValue(P):void 0})}return S}finally{v.dispose()}});export{E as FoldingController,Me as RangesLimitReporter,Ie as toSelectedLines};
