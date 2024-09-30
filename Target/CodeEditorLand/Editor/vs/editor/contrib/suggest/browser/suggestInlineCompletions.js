var _=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var I=(d,l,t,e)=>{for(var o=e>1?void 0:e?P(l,t):l,r=d.length-1,n;r>=0;r--)(n=d[r])&&(o=(e?n(l,t,o):n(o))||o);return e&&o&&_(l,t,o),o},c=(d,l)=>(t,e)=>l(t,e,d);import{CancellationToken as M}from"../../../../base/common/cancellation.js";import{FuzzyScore as k}from"../../../../base/common/filters.js";import{Iterable as v}from"../../../../base/common/iterator.js";import{Disposable as N,RefCountedDisposable as E}from"../../../../base/common/lifecycle.js";import"../../../browser/editorBrowser.js";import{ICodeEditorService as O}from"../../../browser/services/codeEditorService.js";import{EditorOption as h}from"../../../common/config/editorOptions.js";import"../../../common/core/editOperation.js";import"../../../common/core/position.js";import{Range as S}from"../../../common/core/range.js";import"../../../common/core/wordHelper.js";import{registerEditorFeature as F}from"../../../common/editorFeatures.js";import{CompletionItemInsertTextRule as L,CompletionTriggerKind as z}from"../../../common/languages.js";import"../../../common/model.js";import{ILanguageFeaturesService as A}from"../../../common/services/languageFeatures.js";import{CompletionModel as D,LineContext as b}from"./completionModel.js";import{CompletionOptions as W,provideSuggestionItems as B,QuickSuggestionsOptions as y}from"./suggest.js";import{ISuggestMemoryService as w}from"./suggestMemory.js";import{SuggestModel as K}from"./suggestModel.js";import{WordDistance as q}from"./wordDistance.js";import{IClipboardService as V}from"../../../../platform/clipboard/common/clipboardService.js";class Q{constructor(l,t,e,o,r,n){this.range=l;this.insertText=t;this.filterText=e;this.additionalTextEdits=o;this.command=r;this.completion=n}}let p=class extends E{constructor(t,e,o,r,n,u){super(n.disposable);this.model=t;this.line=e;this.word=o;this.completionModel=r;this._suggestMemoryService=u}canBeReused(t,e,o){return this.model===t&&this.line===e&&this.word.word.length>0&&this.word.startColumn===o.startColumn&&this.word.endColumn<o.endColumn&&this.completionModel.getIncompleteProvider().size===0}get items(){const t=[],{items:e}=this.completionModel,o=this._suggestMemoryService.select(this.model,{lineNumber:this.line,column:this.word.endColumn+this.completionModel.lineContext.characterCountDelta},e),r=v.slice(e,o),n=v.slice(e,0,o);let u=5;for(const i of v.concat(r,n)){if(i.score===k.Default)continue;const C=new S(i.editStart.lineNumber,i.editStart.column,i.editInsertEnd.lineNumber,i.editInsertEnd.column+this.completionModel.lineContext.characterCountDelta),s=i.completion.insertTextRules&&i.completion.insertTextRules&L.InsertAsSnippet?{snippet:i.completion.insertText}:i.completion.insertText;t.push(new Q(C,s,i.filterTextLow??i.labelLow,i.completion.additionalTextEdits,i.completion.command,i)),u-->=0&&i.resolve(M.None)}return t}};p=I([c(5,w)],p);let g=class extends N{constructor(t,e,o,r){super();this._languageFeatureService=t;this._clipboardService=e;this._suggestMemoryService=o;this._editorService=r;this._store.add(t.inlineCompletionsProvider.register("*",this))}_lastResult;async provideInlineCompletions(t,e,o,r){if(o.selectedSuggestionInfo)return;let n;for(const m of this._editorService.listCodeEditors())if(m.getModel()===t){n=m;break}if(!n)return;const u=n.getOption(h.quickSuggestions);if(y.isAllOff(u))return;t.tokenization.tokenizeIfCheap(e.lineNumber);const i=t.tokenization.getLineTokens(e.lineNumber),C=i.getStandardTokenType(i.findTokenIndexAtOffset(Math.max(e.column-1-1,0)));if(y.valueFor(u,C)!=="inline")return;let s=t.getWordAtPosition(e),a;if(s?.word||(a=this._getTriggerCharacterInfo(t,e)),!s?.word&&!a||(s||(s=t.getWordUntilPosition(e)),s.endColumn!==e.column))return;let f;const x=t.getValueInRange(new S(e.lineNumber,1,e.lineNumber,e.column));if(!a&&this._lastResult?.canBeReused(t,e.lineNumber,s)){const m=new b(x,e.column-this._lastResult.word.endColumn);this._lastResult.completionModel.lineContext=m,this._lastResult.acquire(),f=this._lastResult}else{const m=await B(this._languageFeatureService.completionProvider,t,e,new W(void 0,K.createSuggestFilter(n).itemKind,a?.providers),a&&{triggerKind:z.TriggerCharacter,triggerCharacter:a.ch},r);let T;m.needsClipboard&&(T=await this._clipboardService.readText());const R=new D(m.items,e.column,new b(x,0),q.None,n.getOption(h.suggest),n.getOption(h.snippetSuggestions),{boostFullMatch:!1,firstMatchCanBeWeak:!1},T);f=new p(t,e.lineNumber,s,R,m,this._suggestMemoryService)}return this._lastResult=f,f}handleItemDidShow(t,e){e.completion.resolve(M.None)}freeInlineCompletions(t){t.release()}_getTriggerCharacterInfo(t,e){const o=t.getValueInRange(S.fromPositions({lineNumber:e.lineNumber,column:e.column-1},e)),r=new Set;for(const n of this._languageFeatureService.completionProvider.all(t))n.triggerCharacters?.includes(o)&&r.add(n);if(r.size!==0)return{providers:r,ch:o}}};g=I([c(0,A),c(1,V),c(2,w),c(3,O)],g),F(g);export{g as SuggestInlineCompletions};