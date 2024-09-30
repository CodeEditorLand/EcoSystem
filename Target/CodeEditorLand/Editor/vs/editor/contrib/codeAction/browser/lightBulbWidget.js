var Q=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var N=(b,u,t,i)=>{for(var e=i>1?void 0:i?j(u,t):u,s=b.length-1,r;s>=0;s--)(r=b[s])&&(e=(i?r(u,t,e):r(e))||e);return i&&e&&Q(u,t,e),e},k=(b,u)=>(t,i)=>u(t,i,b);import*as _ from"../../../../base/browser/dom.js";import{Gesture as J}from"../../../../base/browser/touch.js";import{Codicon as d}from"../../../../base/common/codicons.js";import{Emitter as V,Event as Y}from"../../../../base/common/event.js";import{Disposable as Z}from"../../../../base/common/lifecycle.js";import{ThemeIcon as A}from"../../../../base/common/themables.js";import"./lightBulbWidget.css";import{ContentWidgetPositionPreference as tt}from"../../../browser/editorBrowser.js";import{EditorOption as v}from"../../../common/config/editorOptions.js";import"../../../common/core/position.js";import{GlyphMarginLane as E,TrackedRangeStickiness as F}from"../../../common/model.js";import{ModelDecorationOptions as G}from"../../../common/model/textModel.js";import{computeIndentLevel as et}from"../../../common/model/utils.js";import{autoFixCommandId as it,quickFixCommandId as ot}from"./codeAction.js";import"../common/types.js";import*as l from"../../../../nls.js";import{IKeybindingService as nt}from"../../../../platform/keybinding/common/keybinding.js";import{registerIcon as I}from"../../../../platform/theme/common/iconRegistry.js";import{Range as H}from"../../../common/core/range.js";const P=I("gutter-lightbulb",d.lightBulb,l.localize("gutterLightbulbWidget","Icon which spawns code actions menu from the gutter when there is no space in the editor.")),O=I("gutter-lightbulb-auto-fix",d.lightbulbAutofix,l.localize("gutterLightbulbAutoFixWidget","Icon which spawns code actions menu from the gutter when there is no space in the editor and a quick fix is available.")),M=I("gutter-lightbulb-sparkle",d.lightbulbSparkle,l.localize("gutterLightbulbAIFixWidget","Icon which spawns code actions menu from the gutter when there is no space in the editor and an AI fix is available.")),B=I("gutter-lightbulb-aifix-auto-fix",d.lightbulbSparkleAutofix,l.localize("gutterLightbulbAIFixAutoFixWidget","Icon which spawns code actions menu from the gutter when there is no space in the editor and an AI fix and a quick fix is available.")),R=I("gutter-lightbulb-sparkle-filled",d.sparkleFilled,l.localize("gutterLightbulbSparkleFilledWidget","Icon which spawns code actions menu from the gutter when there is no space in the editor and an AI fix and a quick fix is available."));var h;(i=>{let b;(r=>(r[r.Hidden=0]="Hidden",r[r.Showing=1]="Showing"))(b=i.Type||={}),i.Hidden={type:0};class t{constructor(s,r,n,o){this.actions=s;this.trigger=r;this.editorPosition=n;this.widgetPosition=o}type=1}i.Showing=t})(h||={});let c=class extends Z{constructor(t,i){super();this._editor=t;this._keybindingService=i;this._domNode=_.$("div.lightBulbWidget"),this._domNode.role="listbox",this._register(J.ignoreTarget(this._domNode)),this._editor.addContentWidget(this),this._register(this._editor.onDidChangeModelContent(e=>{const s=this._editor.getModel();(this.state.type!==1||!s||this.state.editorPosition.lineNumber>=s.getLineCount())&&this.hide(),(this.gutterState.type!==1||!s||this.gutterState.editorPosition.lineNumber>=s.getLineCount())&&this.gutterHide()})),this._register(_.addStandardDisposableGenericMouseDownListener(this._domNode,e=>{if(this.state.type!==1)return;this._editor.focus(),e.preventDefault();const{top:s,height:r}=_.getDomNodePagePosition(this._domNode),n=this._editor.getOption(v.lineHeight);let o=Math.floor(n/3);this.state.widgetPosition.position!==null&&this.state.widgetPosition.position.lineNumber<this.state.editorPosition.lineNumber&&(o+=n),this._onClick.fire({x:e.posx,y:s+r+o,actions:this.state.actions,trigger:this.state.trigger})})),this._register(_.addDisposableListener(this._domNode,"mouseenter",e=>{(e.buttons&1)===1&&this.hide()})),this._register(Y.runAndSubscribe(this._keybindingService.onDidUpdateKeybindings,()=>{this._preferredKbLabel=this._keybindingService.lookupKeybinding(it)?.getLabel()??void 0,this._quickFixKbLabel=this._keybindingService.lookupKeybinding(ot)?.getLabel()??void 0,this._updateLightBulbTitleAndIcon()})),this._register(this._editor.onMouseDown(async e=>{if(!e.target.element||!this.lightbulbClasses.some(C=>e.target.element&&e.target.element.classList.contains(C))||this.gutterState.type!==1)return;this._editor.focus();const{top:s,height:r}=_.getDomNodePagePosition(e.target.element),n=this._editor.getOption(v.lineHeight);let o=Math.floor(n/3);this.gutterState.widgetPosition.position!==null&&this.gutterState.widgetPosition.position.lineNumber<this.gutterState.editorPosition.lineNumber&&(o+=n),this._onClick.fire({x:e.event.posx,y:s+r+o,actions:this.gutterState.actions,trigger:this.gutterState.trigger})}))}_gutterDecorationID;static GUTTER_DECORATION=G.register({description:"codicon-gutter-lightbulb-decoration",glyphMarginClassName:A.asClassName(d.lightBulb),glyphMargin:{position:E.Left},stickiness:F.NeverGrowsWhenTypingAtEdges});static ID="editor.contrib.lightbulbWidget";static _posPref=[tt.EXACT];_domNode;_onClick=this._register(new V);onClick=this._onClick.event;_state=h.Hidden;_gutterState=h.Hidden;_iconClasses=[];lightbulbClasses=["codicon-"+P.id,"codicon-"+B.id,"codicon-"+O.id,"codicon-"+M.id,"codicon-"+R.id];_preferredKbLabel;_quickFixKbLabel;gutterDecoration=c.GUTTER_DECORATION;dispose(){super.dispose(),this._editor.removeContentWidget(this),this._gutterDecorationID&&this._removeGutterDecoration(this._gutterDecorationID)}getId(){return"LightBulbWidget"}getDomNode(){return this._domNode}getPosition(){return this._state.type===1?this._state.widgetPosition:null}update(t,i,e){if(t.validActions.length<=0)return this.gutterHide(),this.hide();if(!this._editor.hasTextFocus())return this.gutterHide(),this.hide();if(!this._editor.getOptions().get(v.lightbulb).enabled)return this.gutterHide(),this.hide();const n=this._editor.getModel();if(!n)return this.gutterHide(),this.hide();const{lineNumber:o,column:C}=n.validatePosition(e),W=n.getOptions().tabSize,D=this._editor.getOptions().get(v.fontInfo),K=n.getLineContent(o),U=et(K,W),z=D.spaceWidth*U>22,T=a=>a>2&&this._editor.getTopForLineNumber(a)===this._editor.getTopForLineNumber(a-1),w=this._editor.getLineDecorations(o);let L=!1;if(w)for(const a of w){const f=a.options.glyphMarginClassName;if(f&&!this.lightbulbClasses.some(p=>f.includes(p))){L=!0;break}}let g=o,m=1;if(!z){const a=f=>{const p=n.getLineContent(f);return/^\s*$|^\s+/.test(p)||p.length<=m};if(o>1&&!T(o-1)){const f=n.getLineCount(),p=o===f,S=o>1&&a(o-1),y=!p&&a(o+1),x=a(o),$=!y&&!S;if(!y&&!S&&!L)return this.gutterState=new h.Showing(t,i,e,{position:{lineNumber:g,column:m},preference:c._posPref}),this.renderGutterLightbub(),this.hide();S||p||S&&!x?g-=1:(y||$&&x)&&(g+=1)}else if(o===1&&(o===n.getLineCount()||!a(o+1)&&!a(o)))if(this.gutterState=new h.Showing(t,i,e,{position:{lineNumber:g,column:m},preference:c._posPref}),L)this.gutterHide();else return this.renderGutterLightbub(),this.hide();else if(o<n.getLineCount()&&!T(o+1))g+=1;else if(C*D.spaceWidth<22)return this.hide();m=/^\S\s*$/.test(n.getLineContent(g))?2:1}this.state=new h.Showing(t,i,e,{position:{lineNumber:g,column:m},preference:c._posPref}),this._gutterDecorationID&&(this._removeGutterDecoration(this._gutterDecorationID),this.gutterHide());const q=t.validActions,X=t.validActions[0].action.kind;if(q.length!==1||!X){this._editor.layoutContentWidget(this);return}this._editor.layoutContentWidget(this)}hide(){this.state!==h.Hidden&&(this.state=h.Hidden,this._editor.layoutContentWidget(this))}gutterHide(){this.gutterState!==h.Hidden&&(this._gutterDecorationID&&this._removeGutterDecoration(this._gutterDecorationID),this.gutterState=h.Hidden)}get state(){return this._state}set state(t){this._state=t,this._updateLightBulbTitleAndIcon()}get gutterState(){return this._gutterState}set gutterState(t){this._gutterState=t,this._updateGutterLightBulbTitleAndIcon()}_updateLightBulbTitleAndIcon(){if(this._domNode.classList.remove(...this._iconClasses),this._iconClasses=[],this.state.type!==1)return;let t,i=!1;this.state.actions.allAIFixes?(t=d.sparkleFilled,this.state.actions.validActions.length===1&&(i=!0)):this.state.actions.hasAutoFix?this.state.actions.hasAIFix?t=d.lightbulbSparkleAutofix:t=d.lightbulbAutofix:this.state.actions.hasAIFix?t=d.lightbulbSparkle:t=d.lightBulb,this._updateLightbulbTitle(this.state.actions.hasAutoFix,i),this._iconClasses=A.asClassNameArray(t),this._domNode.classList.add(...this._iconClasses)}_updateGutterLightBulbTitleAndIcon(){if(this.gutterState.type!==1)return;let t,i=!1;this.gutterState.actions.allAIFixes?(t=R,this.gutterState.actions.validActions.length===1&&(i=!0)):this.gutterState.actions.hasAutoFix?this.gutterState.actions.hasAIFix?t=B:t=O:this.gutterState.actions.hasAIFix?t=M:t=P,this._updateLightbulbTitle(this.gutterState.actions.hasAutoFix,i);const e=G.register({description:"codicon-gutter-lightbulb-decoration",glyphMarginClassName:A.asClassName(t),glyphMargin:{position:E.Left},stickiness:F.NeverGrowsWhenTypingAtEdges});this.gutterDecoration=e}renderGutterLightbub(){const t=this._editor.getSelection();t&&(this._gutterDecorationID===void 0?this._addGutterDecoration(t.startLineNumber):this._updateGutterDecoration(this._gutterDecorationID,t.startLineNumber))}_addGutterDecoration(t){this._editor.changeDecorations(i=>{this._gutterDecorationID=i.addDecoration(new H(t,0,t,0),this.gutterDecoration)})}_removeGutterDecoration(t){this._editor.changeDecorations(i=>{i.removeDecoration(t),this._gutterDecorationID=void 0})}_updateGutterDecoration(t,i){this._editor.changeDecorations(e=>{e.changeDecoration(t,new H(i,0,i,0)),e.changeDecorationOptions(t,this.gutterDecoration)})}_updateLightbulbTitle(t,i){this.state.type===1&&(i?this.title=l.localize("codeActionAutoRun","Run: {0}",this.state.actions.validActions[0].action.title):t&&this._preferredKbLabel?this.title=l.localize("preferredcodeActionWithKb","Show Code Actions. Preferred Quick Fix Available ({0})",this._preferredKbLabel):!t&&this._quickFixKbLabel?this.title=l.localize("codeActionWithKb","Show Code Actions ({0})",this._quickFixKbLabel):t||(this.title=l.localize("codeAction","Show Code Actions")))}set title(t){this._domNode.title=t}};c=N([k(1,nt)],c);export{c as LightBulbWidget};