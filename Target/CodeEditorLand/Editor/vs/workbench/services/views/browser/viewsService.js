var H=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var x=(l,v,e,i)=>{for(var t=i>1?void 0:i?X(v,e):v,n=l.length-1,s;n>=0;n--)(s=l[n])&&(t=(i?s(v,e,t):s(t))||t);return i&&t&&H(v,e,t),t},d=(l,v)=>(e,i)=>v(e,i,l);import{Disposable as q,toDisposable as k,DisposableStore as h,DisposableMap as Y}from"../../../../base/common/lifecycle.js";import{IViewDescriptorService as b,ViewContainerLocation as a}from"../../../common/views.js";import{FocusedViewContext as L,getVisbileViewContextKey as j}from"../../../common/contextkeys.js";import{Registry as F}from"../../../../platform/registry/common/platform.js";import{IStorageService as J}from"../../../../platform/storage/common/storage.js";import{ContextKeyExpr as C,IContextKeyService as W,RawContextKey as Q}from"../../../../platform/contextkey/common/contextkey.js";import{Event as Z,Emitter as T}from"../../../../base/common/event.js";import{isString as ee}from"../../../../base/common/types.js";import{MenuId as S,registerAction2 as D,Action2 as P,MenuRegistry as O}from"../../../../platform/actions/common/actions.js";import{localize as f,localize2 as $}from"../../../../nls.js";import{KeybindingWeight as K}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{InstantiationType as ie,registerSingleton as te}from"../../../../platform/instantiation/common/extensions.js";import"../../../common/panecomposite.js";import{IInstantiationService as ne}from"../../../../platform/instantiation/common/instantiation.js";import"../../../browser/parts/views/viewPaneContainer.js";import{ITelemetryService as oe}from"../../../../platform/telemetry/common/telemetry.js";import{IThemeService as re}from"../../../../platform/theme/common/themeService.js";import{IContextMenuService as se}from"../../../../platform/contextview/browser/contextView.js";import{IExtensionService as ae}from"../../extensions/common/extensions.js";import{IWorkspaceContextService as ce}from"../../../../platform/workspace/common/workspace.js";import{PaneCompositeDescriptor as de,Extensions as R,PaneComposite as le}from"../../../browser/panecomposite.js";import{IWorkbenchLayoutService as _,Parts as m}from"../../layout/browser/layoutService.js";import{URI as pe}from"../../../../base/common/uri.js";import"../../../../platform/progress/common/progress.js";import{Categories as U}from"../../../../platform/action/common/actionCommonCategories.js";import{IEditorGroupsService as z}from"../../editor/common/editorGroupsService.js";import{FilterViewPaneContainer as we}from"../../../browser/parts/views/viewsViewlet.js";import{IPaneCompositePartService as Ce}from"../../panecomposite/browser/panecomposite.js";import"../../../../platform/action/common/action.js";import{IEditorService as ge}from"../../editor/common/editorService.js";import{IViewsService as y}from"../common/viewsService.js";let I=class extends q{constructor(e,i,t,n,s){super();this.viewDescriptorService=e;this.paneCompositeService=i;this.contextKeyService=t;this.layoutService=n;this.editorService=s;this.viewDisposable=new Map,this.enabledViewContainersContextKeys=new Map,this.visibleViewContextKeys=new Map,this.viewPaneContainers=new Map,this._register(k(()=>{this.viewDisposable.forEach(o=>o.dispose()),this.viewDisposable.clear()})),this.viewDescriptorService.viewContainers.forEach(o=>this.onDidRegisterViewContainer(o,this.viewDescriptorService.getViewContainerLocation(o))),this._register(this.viewDescriptorService.onDidChangeViewContainers(({added:o,removed:r})=>this.onDidChangeContainers(o,r))),this._register(this.viewDescriptorService.onDidChangeContainerLocation(({viewContainer:o,from:r,to:c})=>this.onDidChangeContainerLocation(o,r,c))),this._register(this.paneCompositeService.onDidPaneCompositeOpen(o=>this._onDidChangeViewContainerVisibility.fire({id:o.composite.getId(),visible:!0,location:o.viewContainerLocation}))),this._register(this.paneCompositeService.onDidPaneCompositeClose(o=>this._onDidChangeViewContainerVisibility.fire({id:o.composite.getId(),visible:!1,location:o.viewContainerLocation}))),this.focusedViewContextKey=L.bindTo(t)}viewDisposable;viewPaneContainers;_onDidChangeViewVisibility=this._register(new T);onDidChangeViewVisibility=this._onDidChangeViewVisibility.event;_onDidChangeViewContainerVisibility=this._register(new T);onDidChangeViewContainerVisibility=this._onDidChangeViewContainerVisibility.event;_onDidChangeFocusedView=this._register(new T);onDidChangeFocusedView=this._onDidChangeFocusedView.event;viewContainerDisposables=this._register(new Y);enabledViewContainersContextKeys;visibleViewContextKeys;focusedViewContextKey;onViewsAdded(e){for(const i of e)this.onViewsVisibilityChanged(i,i.isBodyVisible())}onViewsVisibilityChanged(e,i){this.getOrCreateActiveViewContextKey(e).set(i),this._onDidChangeViewVisibility.fire({id:e.id,visible:i})}onViewsRemoved(e){for(const i of e)this.onViewsVisibilityChanged(i,!1)}getOrCreateActiveViewContextKey(e){const i=j(e.id);let t=this.visibleViewContextKeys.get(i);return t||(t=new Q(i,!1).bindTo(this.contextKeyService),this.visibleViewContextKeys.set(i,t)),t}onDidChangeContainers(e,i){for(const{container:t,location:n}of i)this.onDidDeregisterViewContainer(t,n);for(const{container:t,location:n}of e)this.onDidRegisterViewContainer(t,n)}onDidRegisterViewContainer(e,i){this.registerPaneComposite(e,i);const t=new h,n=this.viewDescriptorService.getViewContainerModel(e);this.onViewDescriptorsAdded(n.allViewDescriptors,e),t.add(n.onDidChangeAllViewDescriptors(({added:s,removed:o})=>{this.onViewDescriptorsAdded(s,e),this.onViewDescriptorsRemoved(o)})),this.updateViewContainerEnablementContextKey(e),t.add(n.onDidChangeActiveViewDescriptors(()=>this.updateViewContainerEnablementContextKey(e))),t.add(this.registerOpenViewContainerAction(e)),this.viewContainerDisposables.set(e.id,t)}onDidDeregisterViewContainer(e,i){this.deregisterPaneComposite(e,i),this.viewContainerDisposables.deleteAndDispose(e.id)}onDidChangeContainerLocation(e,i,t){this.deregisterPaneComposite(e,i),this.registerPaneComposite(e,t),this.layoutService.isVisible(B(t))&&this.viewDescriptorService.getViewContainersByLocation(t).filter(n=>this.isViewContainerActive(n.id)).length===1&&this.openViewContainer(e.id)}onViewDescriptorsAdded(e,i){if(this.viewDescriptorService.getViewContainerLocation(i)!==null)for(const n of e){const s=new h;s.add(this.registerOpenViewAction(n)),s.add(this.registerFocusViewAction(n,i.title)),s.add(this.registerResetViewLocationAction(n)),this.viewDisposable.set(n,s)}}onViewDescriptorsRemoved(e){for(const i of e){const t=this.viewDisposable.get(i);t&&(t.dispose(),this.viewDisposable.delete(i))}}updateViewContainerEnablementContextKey(e){let i=this.enabledViewContainersContextKeys.get(e.id);i||(i=this.contextKeyService.createKey(E(e.id),!1),this.enabledViewContainersContextKeys.set(e.id,i)),i.set(!(e.hideIfEmpty&&this.viewDescriptorService.getViewContainerModel(e).activeViewDescriptors.length===0))}async openComposite(e,i,t){return this.paneCompositeService.openPaneComposite(e,i,t)}getComposite(e,i){return this.paneCompositeService.getPaneComposite(e,i)}isViewContainerVisible(e){const i=this.viewDescriptorService.getViewContainerById(e);if(!i)return!1;const t=this.viewDescriptorService.getViewContainerLocation(i);return t===null?!1:this.paneCompositeService.getActivePaneComposite(t)?.getId()===e}isViewContainerActive(e){const i=this.viewDescriptorService.getViewContainerById(e);return i?i.hideIfEmpty?this.viewDescriptorService.getViewContainerModel(i).activeViewDescriptors.length>0:!0:!1}getVisibleViewContainer(e){const i=this.paneCompositeService.getActivePaneComposite(e)?.getId();return i?this.viewDescriptorService.getViewContainerById(i):null}getActiveViewPaneContainerWithId(e){const i=this.viewDescriptorService.getViewContainerById(e);return i?this.getActiveViewPaneContainer(i):null}async openViewContainer(e,i){const t=this.viewDescriptorService.getViewContainerById(e);if(t){const n=this.viewDescriptorService.getViewContainerLocation(t);if(n!==null)return await this.paneCompositeService.openPaneComposite(e,n,i)||null}return null}async closeViewContainer(e){const i=this.viewDescriptorService.getViewContainerById(e);if(i){const t=this.viewDescriptorService.getViewContainerLocation(i),n=t!==null&&this.paneCompositeService.getActivePaneComposite(t);if(t!==null)return n?this.layoutService.setPartHidden(!0,B(t)):void 0}}isViewVisible(e){return this.getActiveViewWithId(e)?.isBodyVisible()||!1}getActiveViewWithId(e){const i=this.viewDescriptorService.getViewContainerByViewId(e);if(i){const t=this.getActiveViewPaneContainer(i);if(t)return t.getView(e)}return null}getViewWithId(e){const i=this.viewDescriptorService.getViewContainerByViewId(e);if(i){const t=this.viewPaneContainers.get(i.id);if(t)return t.getView(e)}return null}getFocusedViewName(){const e=this.contextKeyService.getContextKeyValue(L.key)??"",i=this.editorService.activeTextEditorControl?.hasTextFocus()?f("editor","Text Editor"):void 0;return this.viewDescriptorService.getViewDescriptorById(e.toString())?.name?.value??i??""}async openView(e,i){const t=this.viewDescriptorService.getViewContainerByViewId(e);if(!t||!this.viewDescriptorService.getViewContainerModel(t).activeViewDescriptors.some(o=>o.id===e))return null;const n=this.viewDescriptorService.getViewContainerLocation(t),s=this.getComposite(t.id,n);if(s){const o=await this.openComposite(s.id,n);if(o&&o.openView)return o.openView(e,i)||null;i&&o?.focus()}return null}closeView(e){const i=this.viewDescriptorService.getViewContainerByViewId(e);if(i){const t=this.getActiveViewPaneContainer(i);if(t){const n=t.getView(e);if(n)if(t.views.length===1){const s=this.viewDescriptorService.getViewContainerLocation(i);s===a.Sidebar?this.layoutService.setPartHidden(!0,m.SIDEBAR_PART):(s===a.Panel||s===a.AuxiliaryBar)&&this.paneCompositeService.hideActivePaneComposite(s),this.focusedViewContextKey.get()===e&&this.focusedViewContextKey.reset()}else n.setExpanded(!1)}}}getActiveViewPaneContainer(e){const i=this.viewDescriptorService.getViewContainerLocation(e);if(i===null)return null;const t=this.paneCompositeService.getActivePaneComposite(i);return t?.getId()===e.id&&t.getViewPaneContainer()||null}getViewProgressIndicator(e){const i=this.viewDescriptorService.getViewContainerByViewId(e);if(!i)return;const t=this.viewPaneContainers.get(i.id);if(!t)return;const n=t.getView(e);if(n)return t.isViewMergedWithContainer()?this.getViewContainerProgressIndicator(i):n.getProgressIndicator()}getViewContainerProgressIndicator(e){const i=this.viewDescriptorService.getViewContainerLocation(e);if(i!==null)return this.paneCompositeService.getProgressIndicator(e.id,i)}registerOpenViewContainerAction(e){const i=new h;if(e.openCommandActionDescriptor){const{id:t,mnemonicTitle:n,keybindings:s,order:o}=e.openCommandActionDescriptor??{id:e.id},r=e.openCommandActionDescriptor.title??e.title,c=this;if(i.add(D(class extends P{constructor(){super({id:t,get title(){const w=c.viewDescriptorService.getViewContainerLocation(e),g=typeof r=="string"?r:r.value,V=typeof r=="string"?r:r.original;return w===a.Sidebar?{value:f("show view","Show {0}",g),original:`Show ${V}`}:{value:f("toggle view","Toggle {0}",g),original:`Toggle ${V}`}},category:U.View,precondition:C.has(E(e.id)),keybinding:s?{...s,weight:K.WorkbenchContrib}:void 0,f1:!0})}async run(w){const g=w.get(z),V=w.get(b),A=w.get(_),u=w.get(y),M=V.getViewContainerLocation(e);switch(M){case a.AuxiliaryBar:case a.Sidebar:{const G=M===a.Sidebar?m.SIDEBAR_PART:m.AUXILIARYBAR_PART;!u.isViewContainerVisible(e.id)||!A.hasFocus(G)?await u.openViewContainer(e.id,!0):g.activeGroup.focus();break}case a.Panel:!u.isViewContainerVisible(e.id)||!A.hasFocus(m.PANEL_PART)?await u.openViewContainer(e.id,!0):u.closeViewContainer(e.id);break}}})),n){const p=this.viewDescriptorService.getDefaultViewContainerLocation(e);i.add(O.appendMenuItem(S.MenubarViewMenu,{command:{id:t,title:n},group:p===a.Sidebar?"3_views":"4_panels",when:C.has(E(e.id)),order:o??Number.MAX_VALUE}))}}return i}registerOpenViewAction(e){const i=new h;if(e.openCommandActionDescriptor){const t=e.openCommandActionDescriptor.title??e.name,n=e.openCommandActionDescriptor.id,s=this;if(i.add(D(class extends P{constructor(){super({id:n,get title(){const r=s.viewDescriptorService.getViewLocationById(e.id),c=typeof t=="string"?t:t.value,p=typeof t=="string"?t:t.original;return r===a.Sidebar?{value:f("show view","Show {0}",c),original:`Show ${p}`}:{value:f("toggle view","Toggle {0}",c),original:`Toggle ${p}`}},category:U.View,precondition:C.has(`${e.id}.active`),keybinding:e.openCommandActionDescriptor.keybindings?{...e.openCommandActionDescriptor.keybindings,weight:K.WorkbenchContrib}:void 0,f1:!0})}async run(r){const c=r.get(z),p=r.get(b),w=r.get(_),g=r.get(y),V=r.get(W);if(L.getValue(V)===e.id){const u=p.getViewLocationById(e.id);p.getViewLocationById(e.id)===a.Sidebar?c.activeGroup.focus():u!==null&&w.setPartHidden(!0,B(u))}else g.openView(e.id,!0)}})),e.openCommandActionDescriptor.mnemonicTitle){const o=this.viewDescriptorService.getDefaultContainerById(e.id);if(o){const r=this.viewDescriptorService.getDefaultViewContainerLocation(o);i.add(O.appendMenuItem(S.MenubarViewMenu,{command:{id:n,title:e.openCommandActionDescriptor.mnemonicTitle},group:r===a.Sidebar?"3_views":"4_panels",when:C.has(`${e.id}.active`),order:e.openCommandActionDescriptor.order??Number.MAX_VALUE}))}}}return i}registerFocusViewAction(e,i){return D(class extends P{constructor(){const n=$({key:"focus view",comment:["{0} indicates the name of the view to be focused."]},"Focus on {0} View",e.name.value);super({id:e.focusCommand?e.focusCommand.id:`${e.id}.focus`,title:n,category:i,menu:[{id:S.CommandPalette,when:e.when}],keybinding:{when:C.has(`${e.id}.active`),weight:K.WorkbenchContrib,primary:e.focusCommand?.keybindings?.primary,secondary:e.focusCommand?.keybindings?.secondary,linux:e.focusCommand?.keybindings?.linux,mac:e.focusCommand?.keybindings?.mac,win:e.focusCommand?.keybindings?.win},metadata:{description:n.value,args:[{name:"focusOptions",description:"Focus Options",schema:{type:"object",properties:{preserveFocus:{type:"boolean",default:!1}}}}]}})}run(n,s){n.get(y).openView(e.id,!s?.preserveFocus)}})}registerResetViewLocationAction(e){return D(class extends P{constructor(){super({id:`${e.id}.resetViewLocation`,title:$("resetViewLocation","Reset Location"),menu:[{id:S.ViewTitleContext,when:C.or(C.and(C.equals("view",e.id),C.equals(`${e.id}.defaultViewLocation`,!1))),group:"1_hide",order:2}]})}run(t){const n=t.get(b),s=n.getDefaultContainerById(e.id),o=n.getViewContainerModel(s);if(s.hideIfEmpty&&o.visibleViewDescriptors.length===0){const r=n.getDefaultViewContainerLocation(s);n.moveViewContainerToLocation(s,r,void 0,this.desc.id)}n.moveViewsToContainer([e],n.getDefaultContainerById(e.id),void 0,this.desc.id),t.get(y).openView(e.id,!0)}})}registerPaneComposite(e,i){const t=this;let n=class extends le{constructor(o,r,c,p,w,g,V){super(e.id,o,c,p,w,g,V,r)}createViewPaneContainer(o){const r=this._register(new h),c=t.createViewPaneContainer(o,e,i,r,this.instantiationService);return c instanceof we||r.add(Z.any(c.onDidAddViews,c.onDidRemoveViews,c.onTitleAreaUpdate)(()=>{this.updateTitleArea()})),c}};n=x([d(0,oe),d(1,ce),d(2,J),d(3,ne),d(4,re),d(5,se),d(6,ae)],n),F.as(N(i)).registerPaneComposite(de.create(n,e.id,typeof e.title=="string"?e.title:e.title.value,ee(e.icon)?e.icon:void 0,e.order,e.requestedIndex,e.icon instanceof pe?e.icon:void 0))}deregisterPaneComposite(e,i){F.as(N(i)).deregisterPaneComposite(e.id)}createViewPaneContainer(e,i,t,n,s){const o=s.createInstance(i.ctorDescriptor.ctor,...i.ctorDescriptor.staticArguments||[]);return this.viewPaneContainers.set(o.getId(),o),n.add(k(()=>this.viewPaneContainers.delete(o.getId()))),n.add(o.onDidAddViews(r=>this.onViewsAdded(r))),n.add(o.onDidChangeViewVisibility(r=>this.onViewsVisibilityChanged(r,r.isBodyVisible()))),n.add(o.onDidRemoveViews(r=>this.onViewsRemoved(r))),n.add(o.onDidFocusView(r=>{this.focusedViewContextKey.get()!==r.id&&(this.focusedViewContextKey.set(r.id),this._onDidChangeFocusedView.fire())})),n.add(o.onDidBlurView(r=>{this.focusedViewContextKey.get()===r.id&&(this.focusedViewContextKey.reset(),this._onDidChangeFocusedView.fire())})),o}};I=x([d(0,b),d(1,Ce),d(2,W),d(3,_),d(4,ge)],I);function E(l){return`viewContainer.${l}.enabled`}function N(l){switch(l){case a.AuxiliaryBar:return R.Auxiliary;case a.Panel:return R.Panels;case a.Sidebar:default:return R.Viewlets}}function B(l){switch(l){case a.AuxiliaryBar:return m.AUXILIARYBAR_PART;case a.Panel:return m.PANEL_PART;case a.Sidebar:default:return m.SIDEBAR_PART}}te(y,I,ie.Eager);export{I as ViewsService,B as getPartByLocation};