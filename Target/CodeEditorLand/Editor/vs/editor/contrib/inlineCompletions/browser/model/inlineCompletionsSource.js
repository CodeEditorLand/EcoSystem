var D=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var R=(l,e,i,t)=>{for(var n=t>1?void 0:t?w(e,i):e,o=l.length-1,r;o>=0;o--)(r=l[o])&&(n=(t?r(e,i,n):r(n))||n);return t&&n&&D(e,i,n),n},f=(l,e)=>(i,t)=>e(i,t,l);import{CancellationTokenSource as P}from"../../../../../base/common/cancellation.js";import{equalsIfDefined as V,itemEquals as k}from"../../../../../base/common/equals.js";import{matchesSubString as E}from"../../../../../base/common/filters.js";import{Disposable as U,MutableDisposable as F}from"../../../../../base/common/lifecycle.js";import{derivedOpts as L,disposableObservableValue as T,transaction as W}from"../../../../../base/common/observable.js";import{IConfigurationService as A}from"../../../../../platform/configuration/common/configuration.js";import{ILogService as K}from"../../../../../platform/log/common/log.js";import{observableConfigValue as N}from"../../../../../platform/observable/common/platformObservableUtils.js";import"../../../../common/core/position.js";import{Range as S}from"../../../../common/core/range.js";import{SingleTextEdit as y}from"../../../../common/core/textEdit.js";import{TextLength as M}from"../../../../common/core/textLength.js";import{InlineCompletionTriggerKind as C}from"../../../../common/languages.js";import{ILanguageConfigurationService as B}from"../../../../common/languages/languageConfigurationRegistry.js";import{EndOfLinePreference as J}from"../../../../common/model.js";import"../../../../common/services/languageFeatureDebounce.js";import{ILanguageFeaturesService as z}from"../../../../common/services/languageFeatures.js";import{provideInlineCompletions as G}from"./provideInlineCompletions.js";import{singleTextRemoveCommonPrefix as j}from"./singleTextEditHelpers.js";let g=class extends U{constructor(i,t,n,o,r,d,s){super();this._textModel=i;this._versionId=t;this._debounceValue=n;this._languageFeaturesService=o;this._languageConfigurationService=r;this._logService=d;this._configurationService=s;this._register(this._textModel.onDidChangeContent(()=>{this._updateOperation.clear()}))}static _requestId=0;_updateOperation=this._register(new F);inlineCompletions=T("inlineCompletions",void 0);suggestWidgetInlineCompletions=T("suggestWidgetInlineCompletions",void 0);_loggingEnabled=N("editor.inlineSuggest.logFetch",!1,this._configurationService).recomputeInitiallyAndOnChange(this._store);_log(i){this._logService.info("InlineCompletionsSource.fetch "+JSON.stringify(i))}fetch(i,t,n){const o=new Q(i,t,this._textModel.getVersionId()),r=t.selectedSuggestionInfo?this.suggestWidgetInlineCompletions:this.inlineCompletions;if(this._updateOperation.value?.request.satisfies(o))return this._updateOperation.value.promise;if(r.get()?.request.satisfies(o))return Promise.resolve(!0);const d=!!this._updateOperation.value;this._updateOperation.clear();const s=new P,u=(async()=>{if((d||t.triggerKind===C.Automatic)&&await H(this._debounceValue.get(this._textModel),s.token),s.token.isCancellationRequested||this._store.isDisposed||this._textModel.getVersionId()!==o.versionId)return!1;const p=g._requestId++;this._loggingEnabled.get()&&this._log({kind:"start",requestId:p,uri:this._textModel.uri.toString(),modelVersion:this._textModel.getVersionId(),context:{triggerKind:t.triggerKind}});const h=new Date;let I,_;try{I=await G(this._languageFeaturesService.inlineCompletionsProvider,i,this._textModel,t,s.token,this._languageConfigurationService)}catch(a){throw _=a,a}finally{if(this._loggingEnabled.get()){s.token.isCancellationRequested&&(_="canceled");const a=I?.completions.map(b=>({range:b.range.toString(),text:b.insertText,isInlineEdit:!!b.sourceInlineCompletion.isInlineEdit,source:b.source.provider.groupId}));this._log({kind:"end",requestId:p,durationMs:Date.now()-h.getTime(),error:_,result:a})}}if(s.token.isCancellationRequested||this._store.isDisposed||this._textModel.getVersionId()!==o.versionId)return!1;const q=new Date;this._debounceValue.update(this._textModel,q.getTime()-h.getTime());const x=new Y(I,o,this._textModel,this._versionId);if(n){const a=n.toInlineCompletion(void 0);n.canBeReused(this._textModel,i)&&!I.has(a)&&x.prepend(n.inlineCompletion,a.range,!0)}return this._updateOperation.clear(),W(a=>{r.set(x,a)}),!0})(),c=new X(o,s,u);return this._updateOperation.value=c,u}clear(i){this._updateOperation.clear(),this.inlineCompletions.set(void 0,i),this.suggestWidgetInlineCompletions.set(void 0,i)}clearSuggestWidgetInlineCompletions(i){this._updateOperation.value?.request.context.selectedSuggestionInfo&&this._updateOperation.clear(),this.suggestWidgetInlineCompletions.set(void 0,i)}cancelUpdate(){this._updateOperation.clear()}};g=R([f(3,z),f(4,B),f(5,K),f(6,A)],g);function H(l,e){return new Promise(i=>{let t;const n=setTimeout(()=>{t&&t.dispose(),i()},l);e&&(t=e.onCancellationRequested(()=>{clearTimeout(n),t&&t.dispose(),i()}))})}class Q{constructor(e,i,t){this.position=e;this.context=i;this.versionId=t}satisfies(e){return this.position.equals(e.position)&&V(this.context.selectedSuggestionInfo,e.context.selectedSuggestionInfo,k())&&(e.context.triggerKind===C.Automatic||this.context.triggerKind===C.Explicit)&&this.versionId===e.versionId}}class X{constructor(e,i,t){this.request=e;this.cancellationTokenSource=i;this.promise=t}dispose(){this.cancellationTokenSource.cancel()}}class Y{constructor(e,i,t,n){this.inlineCompletionProviderResult=e;this.request=i;this._textModel=t;this._versionId=n;const o=t.deltaDecorations([],e.completions.map(r=>({range:r.range,options:{description:"inline-completion-tracking-range"}})));this._inlineCompletions=e.completions.map((r,d)=>new O(r,o[d],this._textModel,this._versionId))}_inlineCompletions;get inlineCompletions(){return this._inlineCompletions}_refCount=1;_prependedInlineCompletionItems=[];clone(){return this._refCount++,this}dispose(){if(this._refCount--,this._refCount===0){setTimeout(()=>{this._textModel.isDisposed()||this._textModel.deltaDecorations(this._inlineCompletions.map(e=>e.decorationId),[])},0),this.inlineCompletionProviderResult.dispose();for(const e of this._prependedInlineCompletionItems)e.source.removeRef()}}prepend(e,i,t){t&&e.source.addRef();const n=this._textModel.deltaDecorations([],[{range:i,options:{description:"inline-completion-tracking-range"}}])[0];this._inlineCompletions.unshift(new O(e,n,this._textModel,this._versionId)),this._prependedInlineCompletionItems.push(e)}}class O{constructor(e,i,t,n){this.inlineCompletion=e;this.decorationId=i;this._textModel=t;this._modelVersion=n}semanticId=JSON.stringify([this.inlineCompletion.filterText,this.inlineCompletion.insertText,this.inlineCompletion.range.getStartPosition().toString()]);get forwardStable(){return this.inlineCompletion.source.inlineCompletions.enableForwardStability??!1}_updatedRange=L({owner:this,equalsFn:S.equalsRange},e=>(this._modelVersion.read(e),this._textModel.getDecorationRange(this.decorationId)));toInlineCompletion(e){return this.inlineCompletion.withRange(this._updatedRange.read(e)??v)}toSingleTextEdit(e){return new y(this._updatedRange.read(e)??v,this.inlineCompletion.insertText)}isVisible(e,i,t){const n=j(this._toFilterTextReplacement(t),e),o=this._updatedRange.read(t);if(!o||!this.inlineCompletion.range.getStartPosition().equals(o.getStartPosition())||i.lineNumber!==n.range.startLineNumber||n.isEmpty)return!1;const r=e.getValueInRange(n.range,J.LF),d=n.text,s=Math.max(0,i.column-n.range.startColumn);let u=d.substring(0,s),c=d.substring(s),m=r.substring(0,s),p=r.substring(s);const h=e.getLineIndentColumn(n.range.startLineNumber);return n.range.startColumn<=h&&(m=m.trimStart(),m.length===0&&(p=p.trimStart()),u=u.trimStart(),u.length===0&&(c=c.trimStart())),u.startsWith(m)&&!!E(p,c)}canBeReused(e,i){const t=this._updatedRange.read(void 0);return!!t&&t.containsPosition(i)&&this.isVisible(e,i,void 0)&&M.ofRange(t).isGreaterThanOrEqualTo(M.ofRange(this.inlineCompletion.range))}_toFilterTextReplacement(e){return new y(this._updatedRange.read(e)??v,this.inlineCompletion.filterText)}}const v=new S(1,1,1,1);export{O as InlineCompletionWithUpdatedRange,g as InlineCompletionsSource,Y as UpToDateInlineCompletions};