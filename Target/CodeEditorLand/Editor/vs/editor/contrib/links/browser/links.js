var E=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var f=(a,n,e,i)=>{for(var t=i>1?void 0:i?S(n,e):n,r=a.length-1,o;r>=0;r--)(o=a[r])&&(t=(i?o(n,e,t):o(t))||t);return i&&t&&E(n,e,t),t},m=(a,n)=>(e,i)=>n(e,i,a);import{createCancelablePromise as y,RunOnceScheduler as w}from"../../../../base/common/async.js";import{CancellationToken as P}from"../../../../base/common/cancellation.js";import{onUnexpectedError as L}from"../../../../base/common/errors.js";import{MarkdownString as b}from"../../../../base/common/htmlContent.js";import{Disposable as F}from"../../../../base/common/lifecycle.js";import{Schemas as k}from"../../../../base/common/network.js";import*as I from"../../../../base/common/platform.js";import*as D from"../../../../base/common/resources.js";import{StopWatch as A}from"../../../../base/common/stopwatch.js";import{URI as N}from"../../../../base/common/uri.js";import"./links.css";import{MouseTargetType as T}from"../../../browser/editorBrowser.js";import{EditorAction as _,EditorContributionInstantiation as x,registerEditorAction as R,registerEditorContribution as z}from"../../../browser/editorExtensions.js";import{EditorOption as g}from"../../../common/config/editorOptions.js";import"../../../common/core/position.js";import"../../../common/editorCommon.js";import"../../../common/languageFeatureRegistry.js";import"../../../common/languages.js";import{TrackedRangeStickiness as M}from"../../../common/model.js";import{ModelDecorationOptions as C}from"../../../common/model/textModel.js";import{ILanguageFeatureDebounceService as K}from"../../../common/services/languageFeatureDebounce.js";import{ILanguageFeaturesService as U}from"../../../common/services/languageFeatures.js";import{ClickLinkGesture as W}from"../../gotoSymbol/browser/link/clickLinkGesture.js";import{getLinks as $}from"./getLinks.js";import*as u from"../../../../nls.js";import{INotificationService as G}from"../../../../platform/notification/common/notification.js";import{IOpenerService as j}from"../../../../platform/opener/common/opener.js";let d=class extends F{constructor(e,i,t,r,o){super();this.editor=e;this.openerService=i;this.notificationService=t;this.languageFeaturesService=r;this.providers=this.languageFeaturesService.linkProvider,this.debounceInformation=o.for(this.providers,"Links",{min:1e3,max:4e3}),this.computeLinks=this._register(new w(()=>this.computeLinksNow(),1e3)),this.computePromise=null,this.activeLinksList=null,this.currentOccurrences={},this.activeLinkDecorationId=null;const c=this._register(new W(e));this._register(c.onMouseMoveOrRelevantKeyDown(([s,l])=>{this._onEditorMouseMove(s,l)})),this._register(c.onExecute(s=>{this.onEditorMouseUp(s)})),this._register(c.onCancel(s=>{this.cleanUpActiveLinkDecoration()})),this._register(e.onDidChangeConfiguration(s=>{s.hasChanged(g.links)&&(this.updateDecorations([]),this.stop(),this.computeLinks.schedule(0))})),this._register(e.onDidChangeModelContent(s=>{this.editor.hasModel()&&this.computeLinks.schedule(this.debounceInformation.get(this.editor.getModel()))})),this._register(e.onDidChangeModel(s=>{this.currentOccurrences={},this.activeLinkDecorationId=null,this.stop(),this.computeLinks.schedule(0)})),this._register(e.onDidChangeModelLanguage(s=>{this.stop(),this.computeLinks.schedule(0)})),this._register(this.providers.onDidChange(s=>{this.stop(),this.computeLinks.schedule(0)})),this.computeLinks.schedule(0)}static ID="editor.linkDetector";static get(e){return e.getContribution(d.ID)}providers;debounceInformation;computeLinks;computePromise;activeLinksList;activeLinkDecorationId;currentOccurrences;async computeLinksNow(){if(!this.editor.hasModel()||!this.editor.getOption(g.links))return;const e=this.editor.getModel();if(!e.isTooLargeForSyncing()&&this.providers.has(e)){this.activeLinksList&&(this.activeLinksList.dispose(),this.activeLinksList=null),this.computePromise=y(i=>$(this.providers,e,i));try{const i=new A(!1);if(this.activeLinksList=await this.computePromise,this.debounceInformation.update(e,i.elapsed()),e.isDisposed())return;this.updateDecorations(this.activeLinksList.links)}catch(i){L(i)}finally{this.computePromise=null}}}updateDecorations(e){const i=this.editor.getOption(g.multiCursorModifier)==="altKey",t=[],r=Object.keys(this.currentOccurrences);for(const c of r){const s=this.currentOccurrences[c];t.push(s.decorationId)}const o=[];if(e)for(const c of e)o.push(h.decoration(c,i));this.editor.changeDecorations(c=>{const s=c.deltaDecorations(t,o);this.currentOccurrences={},this.activeLinkDecorationId=null;for(let l=0,p=s.length;l<p;l++){const v=new h(e[l],s[l]);this.currentOccurrences[v.decorationId]=v}})}_onEditorMouseMove(e,i){const t=this.editor.getOption(g.multiCursorModifier)==="altKey";if(this.isEnabled(e,i)){this.cleanUpActiveLinkDecoration();const r=this.getLinkOccurrence(e.target.position);r&&this.editor.changeDecorations(o=>{r.activate(o,t),this.activeLinkDecorationId=r.decorationId})}else this.cleanUpActiveLinkDecoration()}cleanUpActiveLinkDecoration(){const e=this.editor.getOption(g.multiCursorModifier)==="altKey";if(this.activeLinkDecorationId){const i=this.currentOccurrences[this.activeLinkDecorationId];i&&this.editor.changeDecorations(t=>{i.deactivate(t,e)}),this.activeLinkDecorationId=null}}onEditorMouseUp(e){if(!this.isEnabled(e))return;const i=this.getLinkOccurrence(e.target.position);i&&this.openLinkOccurrence(i,e.hasSideBySideModifier,!0)}openLinkOccurrence(e,i,t=!1){if(!this.openerService)return;const{link:r}=e;r.resolve(P.None).then(o=>{if(typeof o=="string"&&this.editor.hasModel()){const c=this.editor.getModel().uri;if(c.scheme===k.file&&o.startsWith(`${k.file}:`)){const s=N.parse(o);if(s.scheme===k.file){const l=D.originalFSPath(s);let p=null;l.startsWith("/./")||l.startsWith("\\.\\")?p=`.${l.substr(1)}`:(l.startsWith("//./")||l.startsWith("\\\\.\\"))&&(p=`.${l.substr(2)}`),p&&(o=D.joinPath(c,p))}}}return this.openerService.open(o,{openToSide:i,fromUserGesture:t,allowContributedOpeners:!0,allowCommands:!0,fromWorkspace:!0})},o=>{const c=o instanceof Error?o.message:o;c==="invalid"?this.notificationService.warn(u.localize("invalid.url","Failed to open this link because it is not well-formed: {0}",r.url.toString())):c==="missing"?this.notificationService.warn(u.localize("missing.url","Failed to open this link because its target is missing.")):L(o)})}getLinkOccurrence(e){if(!this.editor.hasModel()||!e)return null;const i=this.editor.getModel().getDecorationsInRange({startLineNumber:e.lineNumber,startColumn:e.column,endLineNumber:e.lineNumber,endColumn:e.column},0,!0);for(const t of i){const r=this.currentOccurrences[t.id];if(r)return r}return null}isEnabled(e,i){return!!(e.target.type===T.CONTENT_TEXT&&(e.hasTriggerModifier||i&&i.keyCodeIsTriggerKey))}stop(){this.computeLinks.cancel(),this.activeLinksList&&(this.activeLinksList?.dispose(),this.activeLinksList=null),this.computePromise&&(this.computePromise.cancel(),this.computePromise=null)}dispose(){super.dispose(),this.stop()}};d=f([m(1,j),m(2,G),m(3,U),m(4,K)],d);const O={general:C.register({description:"detected-link",stickiness:M.NeverGrowsWhenTypingAtEdges,collapseOnReplaceEdit:!0,inlineClassName:"detected-link"}),active:C.register({description:"detected-link-active",stickiness:M.NeverGrowsWhenTypingAtEdges,collapseOnReplaceEdit:!0,inlineClassName:"detected-link-active"})};class h{static decoration(n,e){return{range:n.range,options:h._getOptions(n,e,!1)}}static _getOptions(n,e,i){const t={...i?O.active:O.general};return t.hoverMessage=B(n,e),t}decorationId;link;constructor(n,e){this.link=n,this.decorationId=e}activate(n,e){n.changeDecorationOptions(this.decorationId,h._getOptions(this.link,e,!0))}deactivate(n,e){n.changeDecorationOptions(this.decorationId,h._getOptions(this.link,e,!1))}}function B(a,n){const e=a.url&&/^command:/i.test(a.url.toString()),i=a.tooltip?a.tooltip:e?u.localize("links.navigate.executeCmd","Execute command"):u.localize("links.navigate.follow","Follow link"),t=n?I.isMacintosh?u.localize("links.navigate.kb.meta.mac","cmd + click"):u.localize("links.navigate.kb.meta","ctrl + click"):I.isMacintosh?u.localize("links.navigate.kb.alt.mac","option + click"):u.localize("links.navigate.kb.alt","alt + click");if(a.url){let r="";if(/^command:/i.test(a.url.toString())){const c=a.url.toString().match(/^command:([^?#]+)/);if(c){const s=c[1];r=u.localize("tooltip.explanation","Execute command {0}",s)}}return new b("",!0).appendLink(a.url.toString(!0).replace(/ /g,"%20"),i,r).appendMarkdown(` (${t})`)}else return new b().appendText(`${i} (${t})`)}class H extends _{constructor(){super({id:"editor.action.openLink",label:u.localize("label","Open Link"),alias:"Open Link",precondition:void 0})}run(n,e){const i=d.get(e);if(!i||!e.hasModel())return;const t=e.getSelections();for(const r of t){const o=i.getLinkOccurrence(r.getEndPosition());o&&i.openLinkOccurrence(o,!1)}}}z(d.ID,d,x.AfterFirstRender),R(H);export{d as LinkDetector};