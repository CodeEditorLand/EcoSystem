import"./decorations.css";import{DynamicViewOverlay as w}from"../../view/dynamicViewOverlay.js";import{HorizontalRange as C}from"../../view/renderingContext.js";import{EditorOption as b}from"../../../common/config/editorOptions.js";import{Range as p}from"../../../common/core/range.js";import"../../../common/viewEvents.js";import"../../../common/viewModel.js";import"../../../common/viewModel/viewContext.js";class H extends w{_context;_typicalHalfwidthCharacterWidth;_renderResult;constructor(e){super(),this._context=e;const o=this._context.configuration.options;this._typicalHalfwidthCharacterWidth=o.get(b.fontInfo).typicalHalfwidthCharacterWidth,this._renderResult=null,this._context.addEventHandler(this)}dispose(){this._context.removeEventHandler(this),this._renderResult=null,super.dispose()}onConfigurationChanged(e){const o=this._context.configuration.options;return this._typicalHalfwidthCharacterWidth=o.get(b.fontInfo).typicalHalfwidthCharacterWidth,!0}onDecorationsChanged(e){return!0}onFlushed(e){return!0}onLinesChanged(e){return!0}onLinesDeleted(e){return!0}onLinesInserted(e){return!0}onScrollChanged(e){return e.scrollTopChanged||e.scrollWidthChanged}onZonesChanged(e){return!0}prepareRender(e){const o=e.getDecorationsInViewport();let r=[],h=0;for(let n=0,i=o.length;n<i;n++){const u=o[n];u.options.className&&(r[h++]=u)}r=r.sort((n,i)=>{if(n.options.zIndex<i.options.zIndex)return-1;if(n.options.zIndex>i.options.zIndex)return 1;const u=n.options.className,t=i.options.className;return u<t?-1:u>t?1:p.compareRangesUsingStarts(n.range,i.range)});const a=e.visibleRange.startLineNumber,c=e.visibleRange.endLineNumber,l=[];for(let n=a;n<=c;n++){const i=n-a;l[i]=""}this._renderWholeLineDecorations(e,r,l),this._renderNormalDecorations(e,r,l),this._renderResult=l}_renderWholeLineDecorations(e,o,r){const h=e.visibleRange.startLineNumber,a=e.visibleRange.endLineNumber;for(let c=0,l=o.length;c<l;c++){const n=o[c];if(!n.options.isWholeLine)continue;const i='<div class="cdr '+n.options.className+'" style="left:0;width:100%;"></div>',u=Math.max(n.range.startLineNumber,h),t=Math.min(n.range.endLineNumber,a);for(let g=u;g<=t;g++){const d=g-h;r[d]+=i}}}_renderNormalDecorations(e,o,r){const h=e.visibleRange.startLineNumber;let a=null,c=!1,l=null,n=!1;for(let i=0,u=o.length;i<u;i++){const t=o[i];if(t.options.isWholeLine)continue;const g=t.options.className,d=!!t.options.showIfCollapsed;let s=t.range;if(d&&s.endColumn===1&&s.endLineNumber!==s.startLineNumber&&(s=new p(s.startLineNumber,s.startColumn,s.endLineNumber-1,this._context.viewModel.getLineMaxColumn(s.endLineNumber-1))),a===g&&c===d&&p.areIntersectingOrTouching(l,s)){l=p.plusRange(l,s);continue}a!==null&&this._renderNormalDecoration(e,l,a,n,c,h,r),a=g,c=d,l=s,n=t.options.shouldFillLineOnLineBreak??!1}a!==null&&this._renderNormalDecoration(e,l,a,n,c,h,r)}_renderNormalDecoration(e,o,r,h,a,c,l){const n=e.linesVisibleRangesForRange(o,r==="findMatch");if(n)for(let i=0,u=n.length;i<u;i++){const t=n[i];if(t.outsideRenderedLine)continue;const g=t.lineNumber-c;if(a&&t.ranges.length===1){const d=t.ranges[0];if(d.width<this._typicalHalfwidthCharacterWidth){const s=Math.round(d.left+d.width/2),v=Math.max(0,Math.round(s-this._typicalHalfwidthCharacterWidth/2));t.ranges[0]=new C(v,this._typicalHalfwidthCharacterWidth)}}for(let d=0,s=t.ranges.length;d<s;d++){const v=h&&t.continuesOnNextLine&&s===1,m=t.ranges[d],f='<div class="cdr '+r+'" style="left:'+String(m.left)+"px;width:"+(v?"100%;":String(m.width)+"px;")+'"></div>';l[g]+=f}}}render(e,o){if(!this._renderResult)return"";const r=o-e;return r<0||r>=this._renderResult.length?"":this._renderResult[r]}}export{H as DecorationsOverlay};