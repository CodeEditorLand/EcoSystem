import"../../../base/common/cancellation.js";import{Color as h}from"../../../base/common/color.js";import"../../../base/common/lifecycle.js";import"../../common/core/position.js";import{Range as f}from"../../common/core/range.js";import{MetadataConsts as E}from"../../common/encodedTokenAttributes.js";import*as v from"../../common/languages.js";import{ILanguageService as m}from"../../common/languages/language.js";import"../../common/languages/languageConfiguration.js";import{ILanguageConfigurationService as R}from"../../common/languages/languageConfigurationRegistry.js";import{ModesRegistry as L}from"../../common/languages/modesRegistry.js";import"../../common/languageSelector.js";import"../../common/model.js";import{ILanguageFeaturesService as a}from"../../common/services/languageFeatures.js";import*as u from"../../common/standalone/standaloneEnums.js";import{StandaloneServices as t}from"./standaloneServices.js";import{compile as C}from"../common/monarch/monarchCompile.js";import{MonarchTokenizer as b}from"../common/monarch/monarchLexer.js";import"../common/monarch/monarchTypes.js";import{IStandaloneThemeService as P}from"../common/standaloneTheme.js";import{IConfigurationService as F}from"../../../platform/configuration/common/configuration.js";import{IMarkerService as A}from"../../../platform/markers/common/markers.js";function z(e){L.registerLanguage(e)}function w(){let e=[];return e=e.concat(L.getLanguages()),e}function H(e){return t.get(m).languageIdCodec.encodeLanguageId(e)}function K(e,r){return t.withServices(()=>{const o=t.get(m).onDidRequestRichLanguageFeatures(i=>{i===e&&(o.dispose(),r())});return o})}function M(e,r){return t.withServices(()=>{const o=t.get(m).onDidRequestBasicLanguageFeatures(i=>{i===e&&(o.dispose(),r())});return o})}function _(e,r){if(!t.get(m).isRegisteredLanguageId(e))throw new Error(`Cannot set configuration for unknown language ${e}`);return t.get(R).register(e,r,100)}class N{_languageId;_actual;constructor(r,n){this._languageId=r,this._actual=n}dispose(){}getInitialState(){return this._actual.getInitialState()}tokenize(r,n,o){if(typeof this._actual.tokenize=="function")return S.adaptTokenize(this._languageId,this._actual,r,o);throw new Error("Not supported!")}tokenizeEncoded(r,n,o){const i=this._actual.tokenizeEncoded(r,o);return new v.EncodedTokenizationResult(i.tokens,i.endState)}}class S{constructor(r,n,o,i){this._languageId=r;this._actual=n;this._languageService=o;this._standaloneThemeService=i}dispose(){}getInitialState(){return this._actual.getInitialState()}static _toClassicTokens(r,n){const o=[];let i=0;for(let g=0,s=r.length;g<s;g++){const l=r[g];let c=l.startIndex;g===0?c=0:c<i&&(c=i),o[g]=new v.Token(c,l.scopes,n),i=c}return o}static adaptTokenize(r,n,o,i){const g=n.tokenize(o,i),s=S._toClassicTokens(g.tokens,r);let l;return g.endState.equals(i)?l=i:l=g.endState,new v.TokenizationResult(s,l)}tokenize(r,n,o){return S.adaptTokenize(this._languageId,this._actual,r,o)}_toBinaryTokens(r,n){const o=r.encodeLanguageId(this._languageId),i=this._standaloneThemeService.getColorTheme().tokenTheme,g=[];let s=0,l=0;for(let d=0,I=n.length;d<I;d++){const k=n[d],y=i.match(o,k.scopes)|E.BALANCED_BRACKETS_MASK;if(s>0&&g[s-1]===y)continue;let p=k.startIndex;d===0?p=0:p<l&&(p=l),g[s++]=p,g[s++]=y,l=p}const c=new Uint32Array(s);for(let d=0;d<s;d++)c[d]=g[d];return c}tokenizeEncoded(r,n,o){const i=this._actual.tokenize(r,o),g=this._toBinaryTokens(this._languageService.languageIdCodec,i.tokens);let s;return i.endState.equals(o)?s=o:s=i.endState,new v.EncodedTokenizationResult(g,s)}}function O(e){return typeof e.getInitialState=="function"}function B(e){return"tokenizeEncoded"in e}function x(e){return e&&typeof e.then=="function"}function q(e){const r=t.get(P);if(e){const n=[null];for(let o=1,i=e.length;o<i;o++)n[o]=h.fromHex(e[o]);r.setColorMapOverride(n)}else r.setColorMapOverride(null)}function D(e,r){return B(r)?new N(e,r):new S(e,r,t.get(m),t.get(P))}function T(e,r){const n=new v.LazyTokenizationSupport(async()=>{const o=await Promise.resolve(r.create());return o?O(o)?D(e,o):new b(t.get(m),t.get(P),e,C(e,o),t.get(F)):null});return v.TokenizationRegistry.registerFactory(e,n)}function U(e,r){if(!t.get(m).isRegisteredLanguageId(e))throw new Error(`Cannot set tokens provider for unknown language ${e}`);return x(r)?T(e,{create:()=>r}):v.TokenizationRegistry.register(e,D(e,r))}function V(e,r){const n=o=>new b(t.get(m),t.get(P),e,C(e,o),t.get(F));return x(r)?T(e,{create:()=>r}):v.TokenizationRegistry.register(e,n(r))}function $(e,r){return t.get(a).referenceProvider.register(e,r)}function W(e,r){return t.get(a).renameProvider.register(e,r)}function j(e,r){return t.get(a).newSymbolNamesProvider.register(e,r)}function G(e,r){return t.get(a).signatureHelpProvider.register(e,r)}function J(e,r){return t.get(a).hoverProvider.register(e,{provideHover:async(o,i,g,s)=>{const l=o.getWordAtPosition(i);return Promise.resolve(r.provideHover(o,i,g,s)).then(c=>{if(c)return!c.range&&l&&(c.range=new f(i.lineNumber,l.startColumn,i.lineNumber,l.endColumn)),c.range||(c.range=new f(i.lineNumber,i.column,i.lineNumber,i.column)),c})}})}function Q(e,r){return t.get(a).documentSymbolProvider.register(e,r)}function X(e,r){return t.get(a).documentHighlightProvider.register(e,r)}function Y(e,r){return t.get(a).linkedEditingRangeProvider.register(e,r)}function Z(e,r){return t.get(a).definitionProvider.register(e,r)}function ee(e,r){return t.get(a).implementationProvider.register(e,r)}function re(e,r){return t.get(a).typeDefinitionProvider.register(e,r)}function ne(e,r){return t.get(a).codeLensProvider.register(e,r)}function te(e,r,n){return t.get(a).codeActionProvider.register(e,{providedCodeActionKinds:n?.providedCodeActionKinds,documentation:n?.documentation,provideCodeActions:(i,g,s,l)=>{const d=t.get(A).read({resource:i.uri}).filter(I=>f.areIntersectingOrTouching(I,g));return r.provideCodeActions(i,g,{markers:d,only:s.only,trigger:s.trigger},l)},resolveCodeAction:r.resolveCodeAction})}function oe(e,r){return t.get(a).documentFormattingEditProvider.register(e,r)}function ie(e,r){return t.get(a).documentRangeFormattingEditProvider.register(e,r)}function ae(e,r){return t.get(a).onTypeFormattingEditProvider.register(e,r)}function ge(e,r){return t.get(a).linkProvider.register(e,r)}function se(e,r){return t.get(a).completionProvider.register(e,r)}function ue(e,r){return t.get(a).colorProvider.register(e,r)}function le(e,r){return t.get(a).foldingRangeProvider.register(e,r)}function ce(e,r){return t.get(a).declarationProvider.register(e,r)}function de(e,r){return t.get(a).selectionRangeProvider.register(e,r)}function ve(e,r){return t.get(a).documentSemanticTokensProvider.register(e,r)}function me(e,r){return t.get(a).documentRangeSemanticTokensProvider.register(e,r)}function pe(e,r){return t.get(a).inlineCompletionsProvider.register(e,r)}function Se(e,r){return t.get(a).inlineEditProvider.register(e,r)}function Pe(e,r){return t.get(a).inlayHintsProvider.register(e,r)}function We(){return{register:z,getLanguages:w,onLanguage:K,onLanguageEncountered:M,getEncodedLanguageId:H,setLanguageConfiguration:_,setColorMap:q,registerTokensProviderFactory:T,setTokensProvider:U,setMonarchTokensProvider:V,registerReferenceProvider:$,registerRenameProvider:W,registerNewSymbolNameProvider:j,registerCompletionItemProvider:se,registerSignatureHelpProvider:G,registerHoverProvider:J,registerDocumentSymbolProvider:Q,registerDocumentHighlightProvider:X,registerLinkedEditingRangeProvider:Y,registerDefinitionProvider:Z,registerImplementationProvider:ee,registerTypeDefinitionProvider:re,registerCodeLensProvider:ne,registerCodeActionProvider:te,registerDocumentFormattingEditProvider:oe,registerDocumentRangeFormattingEditProvider:ie,registerOnTypeFormattingEditProvider:ae,registerLinkProvider:ge,registerColorProvider:ue,registerFoldingRangeProvider:le,registerDeclarationProvider:ce,registerSelectionRangeProvider:de,registerDocumentSemanticTokensProvider:ve,registerDocumentRangeSemanticTokensProvider:me,registerInlineCompletionsProvider:pe,registerInlineEditProvider:Se,registerInlayHintsProvider:Pe,DocumentHighlightKind:u.DocumentHighlightKind,CompletionItemKind:u.CompletionItemKind,CompletionItemTag:u.CompletionItemTag,CompletionItemInsertTextRule:u.CompletionItemInsertTextRule,SymbolKind:u.SymbolKind,SymbolTag:u.SymbolTag,IndentAction:u.IndentAction,CompletionTriggerKind:u.CompletionTriggerKind,SignatureHelpTriggerKind:u.SignatureHelpTriggerKind,InlayHintKind:u.InlayHintKind,InlineCompletionTriggerKind:u.InlineCompletionTriggerKind,InlineEditTriggerKind:u.InlineEditTriggerKind,CodeActionTriggerType:u.CodeActionTriggerType,NewSymbolNameTag:u.NewSymbolNameTag,NewSymbolNameTriggerKind:u.NewSymbolNameTriggerKind,PartialAcceptTriggerKind:u.PartialAcceptTriggerKind,HoverVerbosityAction:u.HoverVerbosityAction,FoldingRangeKind:v.FoldingRangeKind,SelectedSuggestionInfo:v.SelectedSuggestionInfo}}export{N as EncodedTokenizationSupportAdapter,S as TokenizationSupportAdapter,We as createMonacoLanguagesAPI,H as getEncodedLanguageId,w as getLanguages,K as onLanguage,M as onLanguageEncountered,z as register,te as registerCodeActionProvider,ne as registerCodeLensProvider,ue as registerColorProvider,se as registerCompletionItemProvider,ce as registerDeclarationProvider,Z as registerDefinitionProvider,oe as registerDocumentFormattingEditProvider,X as registerDocumentHighlightProvider,ie as registerDocumentRangeFormattingEditProvider,me as registerDocumentRangeSemanticTokensProvider,ve as registerDocumentSemanticTokensProvider,Q as registerDocumentSymbolProvider,le as registerFoldingRangeProvider,J as registerHoverProvider,ee as registerImplementationProvider,Pe as registerInlayHintsProvider,pe as registerInlineCompletionsProvider,Se as registerInlineEditProvider,ge as registerLinkProvider,Y as registerLinkedEditingRangeProvider,j as registerNewSymbolNameProvider,ae as registerOnTypeFormattingEditProvider,$ as registerReferenceProvider,W as registerRenameProvider,de as registerSelectionRangeProvider,G as registerSignatureHelpProvider,T as registerTokensProviderFactory,re as registerTypeDefinitionProvider,q as setColorMap,_ as setLanguageConfiguration,V as setMonarchTokensProvider,U as setTokensProvider};