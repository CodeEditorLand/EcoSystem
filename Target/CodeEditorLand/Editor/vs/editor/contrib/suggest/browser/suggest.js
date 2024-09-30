import{CancellationToken as D}from"../../../../base/common/cancellation.js";import{CancellationError as _,isCancellationError as W,onUnexpectedExternalError as F}from"../../../../base/common/errors.js";import{FuzzyScore as O}from"../../../../base/common/filters.js";import{DisposableStore as K,isDisposable as A}from"../../../../base/common/lifecycle.js";import{StopWatch as x}from"../../../../base/common/stopwatch.js";import{assertType as S}from"../../../../base/common/types.js";import{URI as z}from"../../../../base/common/uri.js";import"../../../browser/editorBrowser.js";import{Position as I}from"../../../common/core/position.js";import{Range as y}from"../../../common/core/range.js";import"../../../common/editorCommon.js";import"../../../common/model.js";import*as l from"../../../common/languages.js";import{ITextModelService as Q}from"../../../common/services/resolverService.js";import{SnippetParser as V}from"../../snippet/browser/snippetParser.js";import{localize as g}from"../../../../nls.js";import{MenuId as H}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as U}from"../../../../platform/commands/common/commands.js";import{RawContextKey as m}from"../../../../platform/contextkey/common/contextkey.js";import"../../../common/languageFeatureRegistry.js";import{ILanguageFeaturesService as j}from"../../../common/services/languageFeatures.js";import{historyNavigationVisible as B}from"../../../../platform/history/browser/contextScopedHistoryWidget.js";import"../../../common/config/editorOptions.js";import"../../../../platform/extensions/common/extensions.js";import{StandardTokenType as M}from"../../../common/encodedTokenAttributes.js";const Ne={Visible:B,HasFocusedSuggestion:new m("suggestWidgetHasFocusedSuggestion",!1,g("suggestWidgetHasSelection","Whether any suggestion is focused")),DetailsVisible:new m("suggestWidgetDetailsVisible",!1,g("suggestWidgetDetailsVisible","Whether suggestion details are visible")),MultipleSuggestions:new m("suggestWidgetMultipleSuggestions",!1,g("suggestWidgetMultipleSuggestions","Whether there are multiple suggestions to pick from")),MakesTextEdit:new m("suggestionMakesTextEdit",!0,g("suggestionMakesTextEdit","Whether inserting the current suggestion yields in a change or has everything already been typed")),AcceptSuggestionsOnEnter:new m("acceptSuggestionOnEnter",!0,g("acceptSuggestionOnEnter","Whether suggestions are inserted when pressing Enter")),HasInsertAndReplaceRange:new m("suggestionHasInsertAndReplaceRange",!1,g("suggestionHasInsertAndReplaceRange","Whether the current suggestion has insert and replace behaviour")),InsertMode:new m("suggestionInsertMode",void 0,{type:"string",description:g("suggestionInsertMode","Whether the default behaviour is to insert or replace")}),CanResolve:new m("suggestionCanResolve",!1,g("suggestionCanResolve","Whether the current suggestion supports to resolve further details"))},_e=new H("suggestWidgetStatusBar");class q{constructor(t,e,r,i){this.position=t;this.completion=e;this.container=r;this.provider=i;this.textLabel=typeof e.label=="string"?e.label:e.label?.label,this.labelLow=this.textLabel.toLowerCase(),this.isInvalid=!this.textLabel,this.sortTextLow=e.sortText&&e.sortText.toLowerCase(),this.filterTextLow=e.filterText&&e.filterText.toLowerCase(),this.extensionId=e.extensionId,y.isIRange(e.range)?(this.editStart=new I(e.range.startLineNumber,e.range.startColumn),this.editInsertEnd=new I(e.range.endLineNumber,e.range.endColumn),this.editReplaceEnd=new I(e.range.endLineNumber,e.range.endColumn),this.isInvalid=this.isInvalid||y.spansMultipleLines(e.range)||e.range.startLineNumber!==t.lineNumber):(this.editStart=new I(e.range.insert.startLineNumber,e.range.insert.startColumn),this.editInsertEnd=new I(e.range.insert.endLineNumber,e.range.insert.endColumn),this.editReplaceEnd=new I(e.range.replace.endLineNumber,e.range.replace.endColumn),this.isInvalid=this.isInvalid||y.spansMultipleLines(e.range.insert)||y.spansMultipleLines(e.range.replace)||e.range.insert.startLineNumber!==t.lineNumber||e.range.replace.startLineNumber!==t.lineNumber||e.range.insert.startColumn!==e.range.replace.startColumn),typeof i.resolveCompletionItem!="function"&&(this._resolveCache=Promise.resolve(),this._resolveDuration=0)}_brand;editStart;editInsertEnd;editReplaceEnd;textLabel;labelLow;sortTextLow;filterTextLow;isInvalid=!1;score=O.Default;distance=0;idx;word;extensionId;_resolveDuration;_resolveCache;get isResolved(){return this._resolveDuration!==void 0}get resolveDuration(){return this._resolveDuration!==void 0?this._resolveDuration:-1}async resolve(t){if(!this._resolveCache){const e=t.onCancellationRequested(()=>{this._resolveCache=void 0,this._resolveDuration=void 0}),r=new x(!0);this._resolveCache=Promise.resolve(this.provider.resolveCompletionItem(this.completion,t)).then(i=>{Object.assign(this.completion,i),this._resolveDuration=r.elapsed()},i=>{W(i)&&(this._resolveCache=void 0,this._resolveDuration=void 0)}).finally(()=>{e.dispose()})}return this._resolveCache}}var G=(r=>(r[r.Top=0]="Top",r[r.Inline=1]="Inline",r[r.Bottom=2]="Bottom",r))(G||{});class E{constructor(t=2,e=new Set,r=new Set,i=new Map,u=!0){this.snippetSortOrder=t;this.kindFilter=e;this.providerFilter=r;this.providerItemsToReuse=i;this.showDeprecated=u}static default=new E}let p;function We(){return p}function Fe(n){const t=p;return p=n,t}class J{constructor(t,e,r,i){this.items=t;this.needsClipboard=e;this.durations=r;this.disposable=i}}async function X(n,t,e,r=E.default,i={triggerKind:l.CompletionTriggerKind.Invoke},u=D.None){const L=new x;e=e.clone();const c=t.getWordAtPosition(e),f=c?new y(e.lineNumber,c.startColumn,e.lineNumber,c.endColumn):y.fromPositions(e),w={replace:f,insert:f.setEndPosition(e.lineNumber,e.column)},h=[],b=new K,v=[];let P=!1;const k=(C,s,d)=>{let a=!1;if(!s)return a;for(const o of s.suggestions)if(!r.kindFilter.has(o.kind)){if(!r.showDeprecated&&o?.tags?.includes(l.CompletionItemTag.Deprecated))continue;o.range||(o.range=w),o.sortText||(o.sortText=typeof o.label=="string"?o.label:o.label.label),!P&&o.insertTextRules&&o.insertTextRules&l.CompletionItemInsertTextRule.InsertAsSnippet&&(P=V.guessNeedsClipboard(o.insertText)),h.push(new q(e,o,s,C)),a=!0}return A(s)&&b.add(s),v.push({providerName:C._debugDisplayName??"unknown_provider",elapsedProvider:s.duration??-1,elapsedOverall:d.elapsed()}),a},N=(async()=>{if(!p||r.kindFilter.has(l.CompletionItemKind.Snippet))return;const C=r.providerItemsToReuse.get(p);if(C){C.forEach(a=>h.push(a));return}if(r.providerFilter.size>0&&!r.providerFilter.has(p))return;const s=new x,d=await p.provideCompletionItems(t,e,i,u);k(p,d,s)})();for(const C of n.orderedGroups(t)){let s=!1;if(await Promise.all(C.map(async d=>{if(r.providerItemsToReuse.has(d)){const a=r.providerItemsToReuse.get(d);a.forEach(o=>h.push(o)),s=s||a.length>0;return}if(!(r.providerFilter.size>0&&!r.providerFilter.has(d)))try{const a=new x,o=await d.provideCompletionItems(t,e,i,u);s=k(d,o,a)||s}catch(a){F(a)}})),s||u.isCancellationRequested)break}return await N,u.isCancellationRequested?(b.dispose(),Promise.reject(new _)):new J(h.sort($(r.snippetSortOrder)),P,{entries:v,elapsed:L.elapsed()},b)}function R(n,t){if(n.sortTextLow&&t.sortTextLow){if(n.sortTextLow<t.sortTextLow)return-1;if(n.sortTextLow>t.sortTextLow)return 1}return n.textLabel<t.textLabel?-1:n.textLabel>t.textLabel?1:n.completion.kind-t.completion.kind}function Y(n,t){if(n.completion.kind!==t.completion.kind){if(n.completion.kind===l.CompletionItemKind.Snippet)return-1;if(t.completion.kind===l.CompletionItemKind.Snippet)return 1}return R(n,t)}function Z(n,t){if(n.completion.kind!==t.completion.kind){if(n.completion.kind===l.CompletionItemKind.Snippet)return 1;if(t.completion.kind===l.CompletionItemKind.Snippet)return-1}return R(n,t)}const T=new Map;T.set(0,Y),T.set(2,Z),T.set(1,R);function $(n){return T.get(n)}U.registerCommand("_executeCompletionItemProvider",async(n,...t)=>{const[e,r,i,u]=t;S(z.isUri(e)),S(I.isIPosition(r)),S(typeof i=="string"||!i),S(typeof u=="number"||!u);const{completionProvider:L}=n.get(j),c=await n.get(Q).createModelReference(e);try{const f={incomplete:!1,suggestions:[]},w=[],h=c.object.textEditorModel.validatePosition(r),b=await X(L,c.object.textEditorModel,h,void 0,{triggerCharacter:i??void 0,triggerKind:i?l.CompletionTriggerKind.TriggerCharacter:l.CompletionTriggerKind.Invoke});for(const v of b.items)w.length<(u??0)&&w.push(v.resolve(D.None)),f.incomplete=f.incomplete||v.container.incomplete,f.suggestions.push(v.completion);try{return await Promise.all(w),f}finally{setTimeout(()=>b.disposable.dispose(),100)}}finally{c.dispose()}});function Oe(n,t){n.getContribution("editor.contrib.suggestController")?.triggerSuggest(new Set().add(t),void 0,!0)}class Ke{static isAllOff(t){return t.other==="off"&&t.comments==="off"&&t.strings==="off"}static isAllOn(t){return t.other==="on"&&t.comments==="on"&&t.strings==="on"}static valueFor(t,e){switch(e){case M.Comment:return t.comments;case M.String:return t.strings;default:return t.other}}}export{q as CompletionItem,J as CompletionItemModel,E as CompletionOptions,Ne as Context,Ke as QuickSuggestionsOptions,G as SnippetSortOrder,We as getSnippetSuggestSupport,$ as getSuggestionComparator,X as provideSuggestionItems,Fe as setSnippetSuggestSupport,Oe as showSimpleSuggestions,_e as suggestWidgetStatusbarMenu};