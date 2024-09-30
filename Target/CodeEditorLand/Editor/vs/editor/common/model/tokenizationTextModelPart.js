var B=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var T=(u,n,e,t)=>{for(var i=t>1?void 0:t?x(n,e):n,a=u.length-1,o;a>=0;a--)(o=u[a])&&(i=(t?o(n,e,i):o(i))||i);return t&&i&&B(n,e,i),i},l=(u,n)=>(e,t)=>n(e,t,u);import{CharCode as D}from"../../../base/common/charCode.js";import{BugIndicatingError as w,onUnexpectedError as A}from"../../../base/common/errors.js";import{Emitter as k,Event as y}from"../../../base/common/event.js";import{DisposableMap as P,DisposableStore as R,MutableDisposable as f}from"../../../base/common/lifecycle.js";import{countEOL as _}from"../core/eolCounter.js";import{LineRange as W}from"../core/lineRange.js";import{Position as m}from"../core/position.js";import"../core/range.js";import{getWordAtText as p}from"../core/wordHelper.js";import{StandardTokenType as V}from"../encodedTokenAttributes.js";import{TokenizationRegistry as C,TreeSitterTokenizationRegistry as b}from"../languages.js";import{ILanguageService as O}from"../languages/language.js";import{ILanguageConfigurationService as F}from"../languages/languageConfigurationRegistry.js";import"../model.js";import"./bracketPairsTextModelPart/bracketPairsImpl.js";import"./textModel.js";import{TextModelPart as N}from"./textModelPart.js";import{DefaultBackgroundTokenizer as G,TokenizerWithStateStoreAndTextModel as H,TrackingTokenizationStateStore as L}from"./textModelTokens.js";import{AbstractTokens as U,AttachedViewHandler as q}from"./tokens.js";import{TreeSitterTokens as v}from"./treeSitterTokens.js";import{ITreeSitterParserService as j}from"../services/treeSitterParserService.js";import"../textModelEvents.js";import{BackgroundTokenizationState as z}from"../tokenizationTextModelPart.js";import"../tokens/contiguousMultilineTokens.js";import{ContiguousMultilineTokensBuilder as S}from"../tokens/contiguousMultilineTokensBuilder.js";import{ContiguousTokensStore as I}from"../tokens/contiguousTokensStore.js";import"../tokens/lineTokens.js";import"../tokens/sparseMultilineTokens.js";import{SparseTokensStore as J}from"../tokens/sparseTokensStore.js";let d=class extends N{constructor(e,t,i,a,o,r,g){super();this._textModel=e;this._bracketPairsTextModelPart=t;this._languageId=i;this._attachedViews=a;this._languageService=o;this._languageConfigurationService=r;this._treeSitterService=g;this._register(this._languageConfigurationService.onDidChange(s=>{s.affects(this._languageId)&&this._onDidChangeLanguageConfiguration.fire({})})),this._register(y.filter(b.onDidChange,s=>s.changedLanguages.includes(this._languageId))(()=>{this.createPreferredTokenProvider()})),this.createPreferredTokenProvider()}_semanticTokens=new J(this._languageService.languageIdCodec);_onDidChangeLanguage=this._register(new k);onDidChangeLanguage=this._onDidChangeLanguage.event;_onDidChangeLanguageConfiguration=this._register(new k);onDidChangeLanguageConfiguration=this._onDidChangeLanguageConfiguration.event;_onDidChangeTokens=this._register(new k);onDidChangeTokens=this._onDidChangeTokens.event;_tokens;_tokensDisposables=this._register(new R);createGrammarTokens(){return this._register(new M(this._languageService.languageIdCodec,this._textModel,()=>this._languageId,this._attachedViews))}createTreeSitterTokens(){return this._register(new v(this._treeSitterService,this._languageService.languageIdCodec,this._textModel,()=>this._languageId))}createTokens(e){const t=this._tokens!==void 0;this._tokens?.dispose(),this._tokens=e?this.createTreeSitterTokens():this.createGrammarTokens(),this._tokensDisposables.clear(),this._tokensDisposables.add(this._tokens.onDidChangeTokens(i=>{this._emitModelTokensChangedEvent(i)})),this._tokensDisposables.add(this._tokens.onDidChangeBackgroundTokenizationState(i=>{this._bracketPairsTextModelPart.handleDidChangeBackgroundTokenizationState()})),t&&this._tokens.resetTokenization()}createPreferredTokenProvider(){b.get(this._languageId)?this._tokens instanceof v||this.createTokens(!0):this._tokens instanceof M||this.createTokens(!1)}_hasListeners(){return this._onDidChangeLanguage.hasListeners()||this._onDidChangeLanguageConfiguration.hasListeners()||this._onDidChangeTokens.hasListeners()}handleLanguageConfigurationServiceChange(e){e.affects(this._languageId)&&this._onDidChangeLanguageConfiguration.fire({})}handleDidChangeContent(e){if(e.isFlush)this._semanticTokens.flush();else if(!e.isEolChange)for(const t of e.changes){const[i,a,o]=_(t.text);this._semanticTokens.acceptEdit(t.range,i,a,o,t.text.length>0?t.text.charCodeAt(0):D.Null)}this._tokens.handleDidChangeContent(e)}handleDidChangeAttached(){this._tokens.handleDidChangeAttached()}getLineTokens(e){this.validateLineNumber(e);const t=this._tokens.getLineTokens(e);return this._semanticTokens.addSparseTokens(e,t)}_emitModelTokensChangedEvent(e){this._textModel._isDisposing()||(this._bracketPairsTextModelPart.handleDidChangeTokens(e),this._onDidChangeTokens.fire(e))}validateLineNumber(e){if(e<1||e>this._textModel.getLineCount())throw new w("Illegal value for lineNumber")}get hasTokens(){return this._tokens.hasTokens}resetTokenization(){this._tokens.resetTokenization()}get backgroundTokenizationState(){return this._tokens.backgroundTokenizationState}forceTokenization(e){this.validateLineNumber(e),this._tokens.forceTokenization(e)}hasAccurateTokensForLine(e){return this.validateLineNumber(e),this._tokens.hasAccurateTokensForLine(e)}isCheapToTokenize(e){return this.validateLineNumber(e),this._tokens.isCheapToTokenize(e)}tokenizeIfCheap(e){this.validateLineNumber(e),this._tokens.tokenizeIfCheap(e)}getTokenTypeIfInsertingCharacter(e,t,i){return this._tokens.getTokenTypeIfInsertingCharacter(e,t,i)}tokenizeLineWithEdit(e,t){return this._tokens.tokenizeLineWithEdit(e,t)}setSemanticTokens(e,t){this._semanticTokens.set(e,t),this._emitModelTokensChangedEvent({semanticTokensApplied:e!==null,ranges:[{fromLineNumber:1,toLineNumber:this._textModel.getLineCount()}]})}hasCompleteSemanticTokens(){return this._semanticTokens.isComplete()}hasSomeSemanticTokens(){return!this._semanticTokens.isEmpty()}setPartialSemanticTokens(e,t){if(this.hasCompleteSemanticTokens())return;const i=this._textModel.validateRange(this._semanticTokens.setPartial(e,t));this._emitModelTokensChangedEvent({semanticTokensApplied:!0,ranges:[{fromLineNumber:i.startLineNumber,toLineNumber:i.endLineNumber}]})}getWordAtPosition(e){this.assertNotDisposed();const t=this._textModel.validatePosition(e),i=this._textModel.getLineContent(t.lineNumber),a=this.getLineTokens(t.lineNumber),o=a.findTokenIndexAtOffset(t.column-1),[r,g]=d._findLanguageBoundaries(a,o),s=p(t.column,this.getLanguageConfiguration(a.getLanguageId(o)).getWordDefinition(),i.substring(r,g),r);if(s&&s.startColumn<=e.column&&e.column<=s.endColumn)return s;if(o>0&&r===t.column-1){const[c,E]=d._findLanguageBoundaries(a,o-1),h=p(t.column,this.getLanguageConfiguration(a.getLanguageId(o-1)).getWordDefinition(),i.substring(c,E),c);if(h&&h.startColumn<=e.column&&e.column<=h.endColumn)return h}return null}getLanguageConfiguration(e){return this._languageConfigurationService.getLanguageConfiguration(e)}static _findLanguageBoundaries(e,t){const i=e.getLanguageId(t);let a=0;for(let r=t;r>=0&&e.getLanguageId(r)===i;r--)a=e.getStartOffset(r);let o=e.getLineContent().length;for(let r=t,g=e.getCount();r<g&&e.getLanguageId(r)===i;r++)o=e.getEndOffset(r);return[a,o]}getWordUntilPosition(e){const t=this.getWordAtPosition(e);return t?{word:t.word.substr(0,e.column-t.startColumn),startColumn:t.startColumn,endColumn:e.column}:{word:"",startColumn:e.column,endColumn:e.column}}getLanguageId(){return this._languageId}getLanguageIdAtPosition(e,t){const i=this._textModel.validatePosition(new m(e,t)),a=this.getLineTokens(i.lineNumber);return a.getLanguageId(a.findTokenIndexAtOffset(i.column-1))}setLanguageId(e,t="api"){if(this._languageId===e)return;const i={oldLanguage:this._languageId,newLanguage:e,source:t};this._languageId=e,this._bracketPairsTextModelPart.handleDidChangeLanguage(i),this._tokens.resetTokenization(),this.createPreferredTokenProvider(),this._onDidChangeLanguage.fire(i),this._onDidChangeLanguageConfiguration.fire({})}};d=T([l(4,O),l(5,F),l(6,j)],d);class M extends U{_tokenizer=null;_defaultBackgroundTokenizer=null;_backgroundTokenizer=this._register(new f);_tokens=new I(this._languageIdCodec);_debugBackgroundTokens;_debugBackgroundStates;_debugBackgroundTokenizer=this._register(new f);_attachedViewStates=this._register(new P);constructor(n,e,t,i){super(n,e,t),this._register(C.onDidChange(a=>{const o=this.getLanguageId();a.changedLanguages.indexOf(o)!==-1&&this.resetTokenization()})),this.resetTokenization(),this._register(i.onDidChangeVisibleRanges(({view:a,state:o})=>{if(o){let r=this._attachedViewStates.get(a);r||(r=new q(()=>this.refreshRanges(r.lineRanges)),this._attachedViewStates.set(a,r)),r.handleStateChange(o)}else this._attachedViewStates.deleteAndDispose(a)}))}resetTokenization(n=!0){this._tokens.flush(),this._debugBackgroundTokens?.flush(),this._debugBackgroundStates&&(this._debugBackgroundStates=new L(this._textModel.getLineCount())),n&&this._onDidChangeTokens.fire({semanticTokensApplied:!1,ranges:[{fromLineNumber:1,toLineNumber:this._textModel.getLineCount()}]});const e=()=>{if(this._textModel.isTooLargeForTokenization())return[null,null];const a=C.get(this.getLanguageId());if(!a)return[null,null];let o;try{o=a.getInitialState()}catch(r){return A(r),[null,null]}return[a,o]},[t,i]=e();if(t&&i?this._tokenizer=new H(this._textModel.getLineCount(),t,this._textModel,this._languageIdCodec):this._tokenizer=null,this._backgroundTokenizer.clear(),this._defaultBackgroundTokenizer=null,this._tokenizer){const a={setTokens:o=>{this.setTokens(o)},backgroundTokenizationFinished:()=>{if(this._backgroundTokenizationState===z.Completed)return;const o=z.Completed;this._backgroundTokenizationState=o,this._onDidChangeBackgroundTokenizationState.fire()},setEndState:(o,r)=>{if(!this._tokenizer)return;const g=this._tokenizer.store.getFirstInvalidEndStateLineNumber();g!==null&&o>=g&&this._tokenizer?.store.setEndState(o,r)}};t&&t.createBackgroundTokenizer&&!t.backgroundTokenizerShouldOnlyVerifyTokens&&(this._backgroundTokenizer.value=t.createBackgroundTokenizer(this._textModel,a)),!this._backgroundTokenizer.value&&!this._textModel.isTooLargeForTokenization()&&(this._backgroundTokenizer.value=this._defaultBackgroundTokenizer=new G(this._tokenizer,a),this._defaultBackgroundTokenizer.handleChanges()),t?.backgroundTokenizerShouldOnlyVerifyTokens&&t.createBackgroundTokenizer?(this._debugBackgroundTokens=new I(this._languageIdCodec),this._debugBackgroundStates=new L(this._textModel.getLineCount()),this._debugBackgroundTokenizer.clear(),this._debugBackgroundTokenizer.value=t.createBackgroundTokenizer(this._textModel,{setTokens:o=>{this._debugBackgroundTokens?.setMultilineTokens(o,this._textModel)},backgroundTokenizationFinished(){},setEndState:(o,r)=>{this._debugBackgroundStates?.setEndState(o,r)}})):(this._debugBackgroundTokens=void 0,this._debugBackgroundStates=void 0,this._debugBackgroundTokenizer.value=void 0)}this.refreshAllVisibleLineTokens()}handleDidChangeAttached(){this._defaultBackgroundTokenizer?.handleChanges()}handleDidChangeContent(n){if(n.isFlush)this.resetTokenization(!1);else if(!n.isEolChange){for(const e of n.changes){const[t,i]=_(e.text);this._tokens.acceptEdit(e.range,t,i),this._debugBackgroundTokens?.acceptEdit(e.range,t,i)}this._debugBackgroundStates?.acceptChanges(n.changes),this._tokenizer&&this._tokenizer.store.acceptChanges(n.changes),this._defaultBackgroundTokenizer?.handleChanges()}}setTokens(n){const{changes:e}=this._tokens.setMultilineTokens(n,this._textModel);return e.length>0&&this._onDidChangeTokens.fire({semanticTokensApplied:!1,ranges:e}),{changes:e}}refreshAllVisibleLineTokens(){const n=W.joinMany([...this._attachedViewStates].map(([e,t])=>t.lineRanges));this.refreshRanges(n)}refreshRanges(n){for(const e of n)this.refreshRange(e.startLineNumber,e.endLineNumberExclusive-1)}refreshRange(n,e){if(!this._tokenizer)return;n=Math.max(1,Math.min(this._textModel.getLineCount(),n)),e=Math.min(this._textModel.getLineCount(),e);const t=new S,{heuristicTokens:i}=this._tokenizer.tokenizeHeuristically(t,n,e),a=this.setTokens(t.finalize());if(i)for(const o of a.changes)this._backgroundTokenizer.value?.requestTokens(o.fromLineNumber,o.toLineNumber+1);this._defaultBackgroundTokenizer?.checkFinished()}forceTokenization(n){const e=new S;this._tokenizer?.updateTokensUntilLine(e,n),this.setTokens(e.finalize()),this._defaultBackgroundTokenizer?.checkFinished()}hasAccurateTokensForLine(n){return this._tokenizer?this._tokenizer.hasAccurateTokensForLine(n):!0}isCheapToTokenize(n){return this._tokenizer?this._tokenizer.isCheapToTokenize(n):!0}getLineTokens(n){const e=this._textModel.getLineContent(n),t=this._tokens.getTokens(this._textModel.getLanguageId(),n-1,e);if(this._debugBackgroundTokens&&this._debugBackgroundStates&&this._tokenizer&&this._debugBackgroundStates.getFirstInvalidEndStateLineNumberOrMax()>n&&this._tokenizer.store.getFirstInvalidEndStateLineNumberOrMax()>n){const i=this._debugBackgroundTokens.getTokens(this._textModel.getLanguageId(),n-1,e);!t.equals(i)&&this._debugBackgroundTokenizer.value?.reportMismatchingTokens&&this._debugBackgroundTokenizer.value.reportMismatchingTokens(n)}return t}getTokenTypeIfInsertingCharacter(n,e,t){if(!this._tokenizer)return V.Other;const i=this._textModel.validatePosition(new m(n,e));return this.forceTokenization(i.lineNumber),this._tokenizer.getTokenTypeIfInsertingCharacter(i,t)}tokenizeLineWithEdit(n,e){return this._tokenizer?(this.forceTokenization(n),this._tokenizer.tokenizeLineWithEdit(n,e)):{mainLineTokens:null,additionalLines:null}}get hasTokens(){return this._tokens.hasTokens}}export{d as TokenizationTextModelPart};