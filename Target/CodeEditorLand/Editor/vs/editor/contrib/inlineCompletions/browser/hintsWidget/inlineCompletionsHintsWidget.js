var R=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var A=(c,n,e,t)=>{for(var i=t>1?void 0:t?$(n,e):n,r=c.length-1,d;r>=0;r--)(d=c[r])&&(i=(t?d(n,e,i):d(i))||i);return t&&i&&R(n,e,i),i},s=(c,n)=>(e,t)=>n(e,t,c);import{h as x}from"../../../../../base/browser/dom.js";import{ActionViewItem as H}from"../../../../../base/browser/ui/actionbar/actionViewItems.js";import{KeybindingLabel as j,unthemedKeybindingLabelOptions as q}from"../../../../../base/browser/ui/keybindingLabel/keybindingLabel.js";import{Action as P,Separator as X}from"../../../../../base/common/actions.js";import{equals as T}from"../../../../../base/common/arrays.js";import{RunOnceScheduler as O}from"../../../../../base/common/async.js";import{Codicon as M}from"../../../../../base/common/codicons.js";import{Disposable as B,toDisposable as J}from"../../../../../base/common/lifecycle.js";import{autorun as g,autorunWithStore as Q,derived as U,derivedObservableWithCache as Y,derivedWithStore as Z,observableFromEvent as z}from"../../../../../base/common/observable.js";import{OS as ee}from"../../../../../base/common/platform.js";import{ThemeIcon as D}from"../../../../../base/common/themables.js";import{localize as f}from"../../../../../nls.js";import{MenuEntryActionViewItem as te,createAndFillInActionBarActions as ie}from"../../../../../platform/actions/browser/menuEntryActionViewItem.js";import{WorkbenchToolBar as oe}from"../../../../../platform/actions/browser/toolbar.js";import{IMenuService as E,MenuId as N,MenuItemAction as K}from"../../../../../platform/actions/common/actions.js";import{ICommandService as L}from"../../../../../platform/commands/common/commands.js";import{IContextKeyService as k}from"../../../../../platform/contextkey/common/contextkey.js";import{IContextMenuService as ne}from"../../../../../platform/contextview/browser/contextView.js";import{IInstantiationService as V}from"../../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as W}from"../../../../../platform/keybinding/common/keybinding.js";import{ITelemetryService as re}from"../../../../../platform/telemetry/common/telemetry.js";import{registerIcon as F}from"../../../../../platform/theme/common/iconRegistry.js";import{ContentWidgetPositionPreference as G}from"../../../../browser/editorBrowser.js";import{EditorOption as se}from"../../../../common/config/editorOptions.js";import{Position as ae}from"../../../../common/core/position.js";import{InlineCompletionTriggerKind as de}from"../../../../common/languages.js";import{PositionAffinity as le}from"../../../../common/model.js";import{showNextInlineSuggestionActionId as ce,showPreviousInlineSuggestionActionId as ue}from"../controller/commandIds.js";import"../model/inlineCompletionsModel.js";import"./inlineCompletionsHintsWidget.css";let C=class extends B{constructor(e,t,i){super();this.editor=e;this.model=t;this.instantiationService=i;this._register(Q((r,d)=>{const a=this.model.read(r);if(!a||!this.alwaysShowToolbar.read(r))return;const I=Z((u,v)=>{const S=v.add(this.instantiationService.createInstance(p,this.editor,!0,this.position,a.selectedInlineCompletionIndex,a.inlineCompletionsCount,a.activeCommands));return e.addContentWidget(S),v.add(J(()=>e.removeContentWidget(S))),v.add(g(o=>{this.position.read(o)&&a.lastTriggerKind.read(o)!==de.Explicit&&a.triggerExplicitly()})),S}),h=Y(this,(u,v)=>!!this.position.read(u)||!!v);d.add(g(u=>{h.read(u)&&I.read(u)}))}))}alwaysShowToolbar=z(this,this.editor.onDidChangeConfiguration,()=>this.editor.getOption(se.inlineSuggest).showToolbar==="always");sessionPosition=void 0;position=U(this,e=>{const t=this.model.read(e)?.primaryGhostText.read(e);if(!this.alwaysShowToolbar.read(e)||!t||t.parts.length===0)return this.sessionPosition=void 0,null;const i=t.parts[0].column;this.sessionPosition&&this.sessionPosition.lineNumber!==t.lineNumber&&(this.sessionPosition=void 0);const r=new ae(t.lineNumber,Math.min(i,this.sessionPosition?.column??Number.MAX_SAFE_INTEGER));return this.sessionPosition=r,r})};C=A([s(2,V)],C);const pe=F("inline-suggestion-hints-next",M.chevronRight,f("parameterHintsNextIcon","Icon for show next parameter hint.")),me=F("inline-suggestion-hints-previous",M.chevronLeft,f("parameterHintsPreviousIcon","Icon for show previous parameter hint."));let p=class extends B{constructor(e,t,i,r,d,a,I,h,u,v,S){super();this.editor=e;this.withBorder=t;this._position=i;this._currentSuggestionIdx=r;this._suggestionCount=d;this._extraCommands=a;this._commandService=I;this.keybindingService=u;this._contextKeyService=v;this._menuService=S;this.toolBar=this._register(h.createInstance(y,this.nodes.toolBar,N.InlineSuggestionToolbar,{menuOptions:{renderShortTitle:!0},toolbarOptions:{primaryGroup:o=>o.startsWith("primary")},actionViewItemProvider:(o,m)=>{if(o instanceof K)return h.createInstance(ve,o,void 0);if(o===this.availableSuggestionCountAction){const l=new he(void 0,o,{label:!0,icon:!1});return l.setClass("availableSuggestionCount"),l}},telemetrySource:"InlineSuggestionToolbar"})),this.toolBar.setPrependedPrimaryActions([this.previousAction,this.availableSuggestionCountAction,this.nextAction]),this._register(this.toolBar.onDidChangeDropdownVisibility(o=>{p._dropDownVisible=o})),this._register(g(o=>{this._position.read(o),this.editor.layoutContentWidget(this)})),this._register(g(o=>{const m=this._suggestionCount.read(o),l=this._currentSuggestionIdx.read(o);m!==void 0?(this.clearAvailableSuggestionCountLabelDebounced.cancel(),this.availableSuggestionCountAction.label=`${l+1}/${m}`):this.clearAvailableSuggestionCountLabelDebounced.schedule(),m!==void 0&&m>1?(this.disableButtonsDebounced.cancel(),this.previousAction.enabled=this.nextAction.enabled=!0):this.disableButtonsDebounced.schedule()})),this._register(g(o=>{const l=this._extraCommands.read(o).map(b=>({class:void 0,id:b.id,enabled:!0,tooltip:b.tooltip||"",label:b.title,run:_=>this._commandService.executeCommand(b.id)}));for(const[b,_]of this.inlineCompletionsActionsMenus.getActions())for(const w of _)w instanceof K&&l.push(w);l.length>0&&l.unshift(new X),this.toolBar.setAdditionalSecondaryActions(l)}))}static _dropDownVisible=!1;static get dropDownVisible(){return this._dropDownVisible}static id=0;id=`InlineSuggestionHintsContentWidget${p.id++}`;allowEditorOverflow=!0;suppressMouseDown=!1;nodes=x("div.inlineSuggestionsHints",{className:this.withBorder?".withBorder":""},[x("div@toolBar")]);createCommandAction(e,t,i){const r=new P(e,t,i,!0,()=>this._commandService.executeCommand(e)),d=this.keybindingService.lookupKeybinding(e,this._contextKeyService);let a=t;return d&&(a=f({key:"content",comment:["A label","A keybinding"]},"{0} ({1})",t,d.getLabel())),r.tooltip=a,r}previousAction=this.createCommandAction(ue,f("previous","Previous"),D.asClassName(me));availableSuggestionCountAction=new P("inlineSuggestionHints.availableSuggestionCount","",void 0,!1);nextAction=this.createCommandAction(ce,f("next","Next"),D.asClassName(pe));toolBar;inlineCompletionsActionsMenus=this._register(this._menuService.createMenu(N.InlineCompletionsActions,this._contextKeyService));clearAvailableSuggestionCountLabelDebounced=this._register(new O(()=>{this.availableSuggestionCountAction.label=""},100));disableButtonsDebounced=this._register(new O(()=>{this.previousAction.enabled=this.nextAction.enabled=!1},100));getId(){return this.id}getDomNode(){return this.nodes.root}getPosition(){return{position:this._position.get(),preference:[G.ABOVE,G.BELOW],positionAffinity:le.LeftOfInjectedText}}};p=A([s(6,L),s(7,V),s(8,W),s(9,k),s(10,E)],p);class he extends H{_className=void 0;setClass(n){this._className=n}render(n){super.render(n),this._className&&n.classList.add(this._className)}updateTooltip(){}}class ve extends te{updateLabel(){const n=this._keybindingService.lookupKeybinding(this._action.id,this._contextKeyService);if(!n)return super.updateLabel();if(this.label){const e=x("div.keybinding").root;this._register(new j(e,ee,{disableTitle:!0,...q})).set(n),this.label.textContent=this._action.label,this.label.appendChild(e),this.label.classList.add("inlineSuggestionStatusBarItemLabel")}}updateTooltip(){}}let y=class extends oe{constructor(e,t,i,r,d,a,I,h,u){super(e,{resetMenu:t,...i},r,d,a,I,h,u);this.menuId=t;this.options2=i;this.menuService=r;this.contextKeyService=d;this._store.add(this.menu.onDidChange(()=>this.updateToolbar())),this.updateToolbar()}menu=this._store.add(this.menuService.createMenu(this.menuId,this.contextKeyService,{emitEventsForSubmenuChanges:!0}));additionalActions=[];prependedPrimaryActions=[];updateToolbar(){const e=[],t=[];ie(this.menu,this.options2?.menuOptions,{primary:e,secondary:t},this.options2?.toolbarOptions?.primaryGroup,this.options2?.toolbarOptions?.shouldInlineSubmenu,this.options2?.toolbarOptions?.useSeparatorsInPrimaryActions),t.push(...this.additionalActions),e.unshift(...this.prependedPrimaryActions),this.setActions(e,t)}setPrependedPrimaryActions(e){T(this.prependedPrimaryActions,e,(t,i)=>t===i)||(this.prependedPrimaryActions=e,this.updateToolbar())}setAdditionalSecondaryActions(e){T(this.additionalActions,e,(t,i)=>t===i)||(this.additionalActions=e,this.updateToolbar())}};y=A([s(3,E),s(4,k),s(5,ne),s(6,W),s(7,L),s(8,re)],y);export{y as CustomizedMenuWorkbenchToolBar,C as InlineCompletionsHintsWidget,p as InlineSuggestionHintsContentWidget};