import"./currentLineHighlight.css";import{DynamicViewOverlay as L}from"../../view/dynamicViewOverlay.js";import{editorLineHighlight as w,editorLineHighlightBorder as g}from"../../../common/core/editorColorRegistry.js";import"../../view/renderingContext.js";import"../../../common/viewModel/viewContext.js";import"../../../common/viewEvents.js";import*as x from"../../../../base/common/arrays.js";import{registerThemingParticipant as C}from"../../../../platform/theme/common/themeService.js";import{Selection as y}from"../../../common/core/selection.js";import{EditorOption as d}from"../../../common/config/editorOptions.js";import{isHighContrast as E}from"../../../../platform/theme/common/theme.js";import{Position as u}from"../../../common/core/position.js";class p extends L{_context;_renderLineHighlight;_wordWrap;_contentLeft;_contentWidth;_selectionIsEmpty;_renderLineHighlightOnlyWhenFocus;_focused;_cursorLineNumbers;_selections;_renderData;constructor(e){super(),this._context=e;const n=this._context.configuration.options,t=n.get(d.layoutInfo);this._renderLineHighlight=n.get(d.renderLineHighlight),this._renderLineHighlightOnlyWhenFocus=n.get(d.renderLineHighlightOnlyWhenFocus),this._wordWrap=t.isViewportWrapping,this._contentLeft=t.contentLeft,this._contentWidth=t.contentWidth,this._selectionIsEmpty=!0,this._focused=!1,this._cursorLineNumbers=[1],this._selections=[new y(1,1,1,1)],this._renderData=null,this._context.addEventHandler(this)}dispose(){this._context.removeEventHandler(this),super.dispose()}_readFromSelections(){let e=!1;const n=new Set;for(const s of this._selections)n.add(s.positionLineNumber);const t=Array.from(n);t.sort((s,r)=>s-r),x.equals(this._cursorLineNumbers,t)||(this._cursorLineNumbers=t,e=!0);const o=this._selections.every(s=>s.isEmpty());return this._selectionIsEmpty!==o&&(this._selectionIsEmpty=o,e=!0),e}onThemeChanged(e){return this._readFromSelections()}onConfigurationChanged(e){const n=this._context.configuration.options,t=n.get(d.layoutInfo);return this._renderLineHighlight=n.get(d.renderLineHighlight),this._renderLineHighlightOnlyWhenFocus=n.get(d.renderLineHighlightOnlyWhenFocus),this._wordWrap=t.isViewportWrapping,this._contentLeft=t.contentLeft,this._contentWidth=t.contentWidth,!0}onCursorStateChanged(e){return this._selections=e.selections,this._readFromSelections()}onFlushed(e){return!0}onLinesDeleted(e){return!0}onLinesInserted(e){return!0}onScrollChanged(e){return e.scrollWidthChanged||e.scrollTopChanged}onZonesChanged(e){return!0}onFocusChanged(e){return this._renderLineHighlightOnlyWhenFocus?(this._focused=e.isFocused,!0):!1}prepareRender(e){if(!this._shouldRenderThis()){this._renderData=null;return}const n=e.visibleRange.startLineNumber,t=e.visibleRange.endLineNumber,o=[];for(let r=n;r<=t;r++){const l=r-n;o[l]=""}if(this._wordWrap){const r=this._renderOne(e,!1);for(const l of this._cursorLineNumbers){const a=this._context.viewModel.coordinatesConverter,h=a.convertViewPositionToModelPosition(new u(l,1)).lineNumber,m=a.convertModelPositionToViewPosition(new u(h,1)).lineNumber,_=a.convertModelPositionToViewPosition(new u(h,this._context.viewModel.model.getLineMaxColumn(h))).lineNumber,b=Math.max(m,n),v=Math.min(_,t);for(let c=b;c<=v;c++){const f=c-n;o[f]=r}}}const s=this._renderOne(e,!0);for(const r of this._cursorLineNumbers){if(r<n||r>t)continue;const l=r-n;o[l]=s}this._renderData=o}render(e,n){if(!this._renderData)return"";const t=n-e;return t>=this._renderData.length?"":this._renderData[t]}_shouldRenderInMargin(){return(this._renderLineHighlight==="gutter"||this._renderLineHighlight==="all")&&(!this._renderLineHighlightOnlyWhenFocus||this._focused)}_shouldRenderInContent(){return(this._renderLineHighlight==="line"||this._renderLineHighlight==="all")&&this._selectionIsEmpty&&(!this._renderLineHighlightOnlyWhenFocus||this._focused)}}class $ extends p{_renderOne(e,n){return`<div class="${"current-line"+(this._shouldRenderInMargin()?" current-line-both":"")+(n?" current-line-exact":"")}" style="width:${Math.max(e.scrollWidth,this._contentWidth)}px;"></div>`}_shouldRenderThis(){return this._shouldRenderInContent()}_shouldRenderOther(){return this._shouldRenderInMargin()}}class k extends p{_renderOne(e,n){return`<div class="${"current-line"+(this._shouldRenderInMargin()?" current-line-margin":"")+(this._shouldRenderOther()?" current-line-margin-both":"")+(this._shouldRenderInMargin()&&n?" current-line-exact-margin":"")}" style="width:${this._contentLeft}px"></div>`}_shouldRenderThis(){return!0}_shouldRenderOther(){return this._shouldRenderInContent()}}C((i,e)=>{const n=i.getColor(w);if(n&&(e.addRule(`.monaco-editor .view-overlays .current-line { background-color: ${n}; }`),e.addRule(`.monaco-editor .margin-view-overlays .current-line-margin { background-color: ${n}; border: none; }`)),!n||n.isTransparent()||i.defines(g)){const t=i.getColor(g);t&&(e.addRule(`.monaco-editor .view-overlays .current-line-exact { border: 2px solid ${t}; }`),e.addRule(`.monaco-editor .margin-view-overlays .current-line-exact-margin { border: 2px solid ${t}; }`),E(i.type)&&(e.addRule(".monaco-editor .view-overlays .current-line-exact { border-width: 1px; }"),e.addRule(".monaco-editor .margin-view-overlays .current-line-exact-margin { border-width: 1px; }")))}});export{p as AbstractLineHighlightOverlay,$ as CurrentLineHighlightOverlay,k as CurrentLineMarginHighlightOverlay};