var G=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var w=(a,e,t,i)=>{for(var s=i>1?void 0:i?Y(e,t):e,u=a.length-1,o;u>=0;u--)(o=a[u])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&G(e,t,s),s},n=(a,e)=>(t,i)=>e(t,i,a);import{$ as R,append as k}from"../../../../../base/browser/dom.js";import{DEFAULT_FONT_FAMILY as j}from"../../../../../base/browser/fonts.js";import"../../../../../base/browser/history.js";import{Widget as J}from"../../../../../base/browser/ui/widget.js";import{Emitter as E,Event as A}from"../../../../../base/common/event.js";import{HistoryNavigator as Q}from"../../../../../base/common/history.js";import{KeyCode as z}from"../../../../../base/common/keyCodes.js";import{mixin as X}from"../../../../../base/common/objects.js";import{isMacintosh as Z}from"../../../../../base/common/platform.js";import{URI as ee}from"../../../../../base/common/uri.js";import"./suggestEnabledInput.css";import"../../../../../editor/browser/config/editorConfiguration.js";import{EditorExtensionsRegistry as te}from"../../../../../editor/browser/editorExtensions.js";import{CodeEditorWidget as ie}from"../../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";import"../../../../../editor/common/config/editorOptions.js";import{EditOperation as oe}from"../../../../../editor/common/core/editOperation.js";import{Position as re}from"../../../../../editor/common/core/position.js";import{Range as $}from"../../../../../editor/common/core/range.js";import{ensureValidWordDefinition as ne,getWordAtText as se}from"../../../../../editor/common/core/wordHelper.js";import*as le from"../../../../../editor/common/languages.js";import"../../../../../editor/common/model.js";import{ILanguageFeaturesService as M}from"../../../../../editor/common/services/languageFeatures.js";import{IModelService as K}from"../../../../../editor/common/services/model.js";import{ContextMenuController as ae}from"../../../../../editor/contrib/contextmenu/browser/contextmenu.js";import{SnippetController2 as ue}from"../../../../../editor/contrib/snippet/browser/snippetController2.js";import{SuggestController as de}from"../../../../../editor/contrib/suggest/browser/suggestController.js";import{IConfigurationService as F}from"../../../../../platform/configuration/common/configuration.js";import{IContextKeyService as V}from"../../../../../platform/contextkey/common/contextkey.js";import{registerAndCreateHistoryNavigationContext as ge}from"../../../../../platform/history/browser/contextScopedHistoryWidget.js";import{IInstantiationService as L}from"../../../../../platform/instantiation/common/instantiation.js";import{ServiceCollection as pe}from"../../../../../platform/instantiation/common/serviceCollection.js";import{asCssVariable as W,asCssVariableWithDefault as ce,inputBackground as he,inputBorder as me,inputForeground as q,inputPlaceholderForeground as fe}from"../../../../../platform/theme/common/colorRegistry.js";import{MenuPreventer as ye}from"../menuPreventer.js";import{SelectionClipboardContributionID as Ce}from"../selectionClipboard.js";import{getSimpleEditorOptions as ve,setupSimpleEditorSelectionStyling as xe}from"../simpleEditorOptions.js";let x=class extends J{_onShouldFocusResults=new E;onShouldFocusResults=this._onShouldFocusResults.event;_onInputDidChange=new E;onInputDidChange=this._onInputDidChange.event;_onDidFocus=this._register(new E);onDidFocus=this._onDidFocus.event;_onDidBlur=this._register(new E);onDidBlur=this._onDidBlur.event;inputWidget;inputModel;stylingContainer;element;placeholderText;constructor(e,t,i,s,u,o,h,y,C,p,d){super(),this.stylingContainer=k(t,R(".suggest-input-container")),this.element=t,this.placeholderText=k(this.stylingContainer,R(".suggest-input-placeholder",void 0,o.placeholderText||""));const m=X(ve(d),Ie(s));m.overflowWidgetsDomNode=o.overflowWidgetsDomNode;const c=this.getScopedContextKeyService(C),U=c?this._register(h.createChild(new pe([V,c]))):h;this.inputWidget=this._register(U.createInstance(ie,this.stylingContainer,m,{contributions:te.getSomeEditorContributions([de.ID,ue.ID,ae.ID,ye.ID,Ce]),isSimpleWidget:!0})),this._register(d.onDidChangeConfiguration(r=>{if(r.affectsConfiguration("editor.accessibilitySupport")||r.affectsConfiguration("editor.cursorBlinking")){const l=d.getValue("editor.accessibilitySupport"),O=d.getValue("editor.cursorBlinking");this.inputWidget.updateOptions({accessibilitySupport:l,cursorBlinking:O})}})),this._register(this.inputWidget.onDidFocusEditorText(()=>this._onDidFocus.fire())),this._register(this.inputWidget.onDidBlurEditorText(()=>this._onDidBlur.fire()));const T=ee.parse(u);this.inputModel=y.createModel("",null,T,!0),this._register(this.inputModel),this.inputWidget.setModel(this.inputModel),this._register(this.inputWidget.onDidPaste(()=>this.setValue(this.getValue()))),this._register(this.inputWidget.onDidFocusEditorText(()=>{o.focusContextKey&&o.focusContextKey.set(!0),this.stylingContainer.classList.add("synthetic-focus")})),this._register(this.inputWidget.onDidBlurEditorText(()=>{o.focusContextKey&&o.focusContextKey.set(!1),this.stylingContainer.classList.remove("synthetic-focus")})),this._register(A.chain(this.inputWidget.onKeyDown,r=>r.filter(l=>l.keyCode===z.Enter))(r=>{r.preventDefault()},this)),this._register(A.chain(this.inputWidget.onKeyDown,r=>r.filter(l=>l.keyCode===z.DownArrow&&(Z?l.metaKey:l.ctrlKey)))(()=>this._onShouldFocusResults.fire(),this));let N=this.getValue();const H=this.inputWidget.getModel();H&&this._register(H.onDidChangeContent(()=>{const r=this.getValue();this.placeholderText.style.visibility=r?"hidden":"visible",N.trim()!==r.trim()&&(this._onInputDidChange.fire(void 0),N=r)}));const f={provideResults:i.provideResults,sortKey:i.sortKey||(r=>r),triggerCharacters:i.triggerCharacters||[],wordDefinition:i.wordDefinition?ne(i.wordDefinition):void 0,alwaysShowSuggestions:!!i.alwaysShowSuggestions};this.setValue(o.value||""),this._register(p.completionProvider.register({scheme:T.scheme,pattern:"**/"+T.path,hasAccessToAllModels:!0},{_debugDisplayName:`suggestEnabledInput/${e}`,triggerCharacters:f.triggerCharacters,provideCompletionItems:(r,l,O)=>{const S=r.getValue(),P=l.column-1;let b=0,D=0;if(f.wordDefinition){const g=se(l.column,f.wordDefinition,S,0);b=g?.word.length??0,D=g?g.startColumn-1:0}else D=S.lastIndexOf(" ",P-1)+1,b=P-D;return!f.alwaysShowSuggestions&&b>0&&f.triggerCharacters?.indexOf(S[D])===-1?{suggestions:[]}:{suggestions:i.provideResults(S).map(g=>{let v,B;return typeof g=="string"?v=g:(v=g.label,B=g),{label:v,insertText:v,range:$.fromPositions(l.delta(0,-b),l),sortText:f.sortKey(v),kind:le.CompletionItemKind.Keyword,...B}})}}})),this.style(o.styleOverrides||{})}getScopedContextKeyService(e){}updateAriaLabel(e){this.inputWidget.updateOptions({ariaLabel:e})}setValue(e){e=e.replace(/\s/g," ");const t=this.inputModel.getFullModelRange();this.inputWidget.executeEdits("suggestEnabledInput.setValue",[oe.replace(t,e)]),this.inputWidget.setScrollTop(0),this.inputWidget.setPosition(new re(1,e.length+1))}getValue(){return this.inputWidget.getValue()}style(e){this.stylingContainer.style.backgroundColor=W(e.inputBackground??he),this.stylingContainer.style.color=W(e.inputForeground??q),this.placeholderText.style.color=W(e.inputPlaceholderForeground??fe),this.stylingContainer.style.borderWidth="1px",this.stylingContainer.style.borderStyle="solid",this.stylingContainer.style.borderColor=ce(e.inputBorder??me,"transparent");const t=this.stylingContainer.getElementsByClassName("cursor")[0];t&&(t.style.backgroundColor=W(e.inputForeground??q))}focus(e){this.inputWidget.focus(),e&&this.inputWidget.getValue()&&this.selectAll()}onHide(){this.inputWidget.onHide()}layout(e){this.inputWidget.layout(e),this.placeholderText.style.width=`${e.width-2}px`}selectAll(){this.inputWidget.setSelection(new $(1,1,1,this.getValue().length+1))}};x=w([n(6,L),n(7,K),n(8,V),n(9,M),n(10,F)],x);let I=class extends x{history;constructor({id:e,parent:t,ariaLabel:i,suggestionProvider:s,resourceHandle:u,suggestOptions:o,history:h},y,C,p,d,m){super(e,t,s,i,u,o,y,C,p,d,m),this.history=new Q(h,100)}addToHistory(){const e=this.getValue();e&&e!==this.getCurrentValue()&&this.history.add(e)}getHistory(){return this.history.getHistory()}showNextValue(){this.history.has(this.getValue())||this.addToHistory();let e=this.getNextValue();e&&(e=e===this.getValue()?this.getNextValue():e),this.setValue(e??"")}showPreviousValue(){this.history.has(this.getValue())||this.addToHistory();let e=this.getPreviousValue();e&&(e=e===this.getValue()?this.getPreviousValue():e),e&&(this.setValue(e),this.inputWidget.setPosition({lineNumber:0,column:0}))}clearHistory(){this.history.clear()}getCurrentValue(){let e=this.history.current();return e||(e=this.history.last(),this.history.next()),e}getPreviousValue(){return this.history.previous()||this.history.first()}getNextValue(){return this.history.next()}};I=w([n(1,L),n(2,K),n(3,V),n(4,M),n(5,F)],I);let _=class extends I{historyContext;constructor(e,t,i,s,u,o){super(e,t,i,s,u,o);const{historyNavigationBackwardsEnablement:h,historyNavigationForwardsEnablement:y}=this.historyContext;this._register(this.inputWidget.onDidChangeCursorPosition(({position:C})=>{const p=this.inputWidget._getViewModel(),d=p.getLineCount(),m=p.getLineLength(d)+1,c=p.coordinatesConverter.convertModelPositionToViewPosition(C);h.set(c.lineNumber===1&&c.column===1),y.set(c.lineNumber===d&&c.column===m)}))}getScopedContextKeyService(e){const t=this._register(e.createScoped(this.element));return this.historyContext=this._register(ge(t,this)),t}};_=w([n(1,L),n(2,K),n(3,V),n(4,M),n(5,F)],_),xe(".suggest-input-container");function Ie(a){return{fontSize:13,lineHeight:20,wordWrap:"off",scrollbar:{vertical:"hidden"},roundedSelection:!1,guides:{indentation:!1},cursorWidth:1,fontFamily:j,ariaLabel:a||"",snippetSuggestions:"none",suggest:{filterGraceful:!1,showIcons:!1},autoClosingBrackets:"never"}}export{_ as ContextScopedSuggestEnabledInputWithHistory,x as SuggestEnabledInput,I as SuggestEnabledInputWithHistory};