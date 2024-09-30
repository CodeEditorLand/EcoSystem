var h=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var l=(s,e,t,o)=>{for(var r=o>1?void 0:o?m(e,t):e,i=s.length-1,n;i>=0;i--)(n=s[i])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&h(e,t,r),r},d=(s,e)=>(t,o)=>e(t,o,s);import"./media/editortitlecontrol.css";import{Dimension as b,clearNode as C}from"../../../../base/browser/dom.js";import{IInstantiationService as E}from"../../../../platform/instantiation/common/instantiation.js";import{IThemeService as T,Themable as v}from"../../../../platform/theme/common/themeService.js";import{BreadcrumbsControl as p,BreadcrumbsControlFactory as I}from"./breadcrumbsControl.js";import"./editor.js";import"./editorTabsControl.js";import{MultiEditorTabsControl as w}from"./multiEditorTabsControl.js";import{SingleEditorTabsControl as f}from"./singleEditorTabsControl.js";import"../../../common/editor.js";import"../../../common/editor/editorInput.js";import{DisposableStore as u}from"../../../../base/common/lifecycle.js";import{MultiRowEditorControl as g}from"./multiRowEditorTabsControl.js";import"../../../common/editor/editorGroupModel.js";import{NoEditorTabsControl as y}from"./noEditorTabsControl.js";let a=class extends v{constructor(t,o,r,i,n,D,c){super(c);this.parent=t;this.editorPartsView=o;this.groupsView=r;this.groupView=i;this.model=n;this.instantiationService=D;this.editorTabsControl=this.createEditorTabsControl(),this.breadcrumbsControlFactory=this.createBreadcrumbsControl()}editorTabsControl;editorTabsControlDisposable=this._register(new u);breadcrumbsControlFactory;breadcrumbsControlDisposables=this._register(new u);get breadcrumbsControl(){return this.breadcrumbsControlFactory?.control}createEditorTabsControl(){let t;switch(this.groupsView.partOptions.showTabs){case"none":t=y;break;case"single":t=f;break;case"multiple":default:t=this.groupsView.partOptions.pinnedTabsOnSeparateRow?g:w;break}const o=this.instantiationService.createInstance(t,this.parent,this.editorPartsView,this.groupsView,this.groupView,this.model);return this.editorTabsControlDisposable.add(o)}createBreadcrumbsControl(){if(this.groupsView.partOptions.showTabs==="single")return;const t=document.createElement("div");t.classList.add("breadcrumbs-below-tabs"),this.parent.appendChild(t);const o=this.breadcrumbsControlDisposables.add(this.instantiationService.createInstance(I,t,this.groupView,{showFileIcons:!0,showSymbolIcons:!0,showDecorationColors:!1,showPlaceholder:!0}));return this.breadcrumbsControlDisposables.add(o.onDidEnablementChange(()=>this.groupView.relayout())),this.breadcrumbsControlDisposables.add(o.onDidVisibilityChange(()=>this.groupView.relayout())),o}openEditor(t,o){const r=this.editorTabsControl.openEditor(t,o);this.handleOpenedEditors(r)}openEditors(t){const o=this.editorTabsControl.openEditors(t);this.handleOpenedEditors(o)}handleOpenedEditors(t){t?this.breadcrumbsControl?.update():this.breadcrumbsControl?.revealLast()}beforeCloseEditor(t){return this.editorTabsControl.beforeCloseEditor(t)}closeEditor(t){this.editorTabsControl.closeEditor(t),this.handleClosedEditors()}closeEditors(t){this.editorTabsControl.closeEditors(t),this.handleClosedEditors()}handleClosedEditors(){this.groupView.activeEditor||this.breadcrumbsControl?.update()}moveEditor(t,o,r,i){return this.editorTabsControl.moveEditor(t,o,r,i)}pinEditor(t){return this.editorTabsControl.pinEditor(t)}stickEditor(t){return this.editorTabsControl.stickEditor(t)}unstickEditor(t){return this.editorTabsControl.unstickEditor(t)}setActive(t){return this.editorTabsControl.setActive(t)}updateEditorSelections(){this.editorTabsControl.updateEditorSelections()}updateEditorLabel(t){return this.editorTabsControl.updateEditorLabel(t)}updateEditorDirty(t){return this.editorTabsControl.updateEditorDirty(t)}updateOptions(t,o){t.showTabs!==o.showTabs||o.showTabs!=="single"&&t.pinnedTabsOnSeparateRow!==o.pinnedTabsOnSeparateRow?(this.editorTabsControlDisposable.clear(),this.breadcrumbsControlDisposables.clear(),C(this.parent),this.editorTabsControl=this.createEditorTabsControl(),this.breadcrumbsControlFactory=this.createBreadcrumbsControl()):this.editorTabsControl.updateOptions(t,o)}layout(t){const o=this.editorTabsControl.layout(t);let r;return this.breadcrumbsControl?.isHidden()===!1&&(r=new b(t.container.width,p.HEIGHT),this.breadcrumbsControl.layout(r)),new b(t.container.width,o.height+(r?r.height:0))}getHeight(){const t=this.editorTabsControl.getHeight(),o=this.breadcrumbsControl?.isHidden()===!1?p.HEIGHT:0;return{total:t+o,offset:t}}};a=l([d(5,E),d(6,T)],a);export{a as EditorTitleControl};