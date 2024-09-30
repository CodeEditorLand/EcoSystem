var y=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var p=(i,e,t,n)=>{for(var r=n>1?void 0:n?M(e,t):e,o=i.length-1,l;o>=0;o--)(l=i[o])&&(r=(n?l(e,t,r):l(r))||r);return n&&r&&y(e,t,r),r},u=(i,e)=>(t,n)=>e(t,n,i);import{renderMarkdownAsPlaintext as I}from"../../../../../base/browser/markdownRenderer.js";import"../../../../../base/common/cancellation.js";import{IOutlineModelService as S}from"../../../../../editor/contrib/documentSymbols/browser/outlineModel.js";import{localize as O}from"../../../../../nls.js";import"../notebookBrowser.js";import{getMarkdownHeadersInCell as k}from"./foldingModel.js";import{OutlineEntry as m}from"./OutlineEntry.js";import{CellKind as h}from"../../common/notebookCommon.js";import{INotebookExecutionStateService as w}from"../../common/notebookExecutionStateService.js";import"../../../../../editor/common/core/range.js";import"../../../../../editor/common/languages.js";import{createDecorator as C}from"../../../../../platform/instantiation/common/instantiation.js";import{ITextModelService as x}from"../../../../../editor/common/services/resolverService.js";var E=(e=>(e[e.NonHeaderOutlineLevel=7]="NonHeaderOutlineLevel",e))(E||{});function b(i){const e=Array.from(k(i));if(e.length)return e;const t=i.match(/<h([1-6]).*>(.*)<\/h\1>/i);if(t){const n=parseInt(t[1]),r=t[2].trim();e.push({depth:n,text:r})}return e}const U=C("INotebookOutlineEntryFactory");let f=class{constructor(e,t,n){this.executionStateService=e;this.outlineModelService=t;this.textModelService=n}cellOutlineEntryCache={};cachedMarkdownOutlineEntries=new WeakMap;getOutlineEntries(e,t){const n=[],r=e.cellKind===h.Markup;let o=T(e),l=!1;if(r){const a=e.getText().substring(0,1e4),c=this.cachedMarkdownOutlineEntries.get(e),d=c?.alternativeId===e.getAlternativeId()?c.headers:Array.from(b(a));this.cachedMarkdownOutlineEntries.set(e,{alternativeId:e.getAlternativeId(),headers:d});for(const{depth:s,text:v}of d)l=!0,n.push(new m(t++,s,e,v,!1,!1));l||(o=I({value:o}))}if(!l){const a=!r&&this.executionStateService.getCellExecution(e.uri);let c=o.trim();if(!r){const d=this.cellOutlineEntryCache[e.id];d&&(n.push(new m(t++,7,e,c,!!a,a?a.isPaused:!1)),d.forEach(s=>{n.push(new m(t++,s.level,e,s.name,!1,!1,s.range,s.kind))}))}n.length===0&&(c.length===0&&(c=O("empty","empty cell")),n.push(new m(t++,7,e,c,!!a,a?a.isPaused:!1)))}return n}async cacheSymbols(e,t){if(e.cellKind===h.Markup)return;const n=await this.textModelService.createModelReference(e.uri);try{const r=n.object.textEditorModel,o=await this.outlineModelService.getOrCreate(r,t),l=g(o.getTopLevelSymbols(),8);this.cellOutlineEntryCache[e.id]=l}finally{n.dispose()}}};f=p([u(0,w),u(1,S),u(2,x)],f);function g(i,e){const t=[];return i.forEach(n=>{t.push({name:n.name,range:n.range,level:e,kind:n.kind}),n.children&&t.push(...g(n.children,e+1))}),t}function T(i){const e=i.textBuffer;for(let t=0;t<e.getLineCount();t++){const n=e.getLineFirstNonWhitespaceColumn(t+1),r=e.getLineLength(t+1);if(n<r)return e.getLineContent(t+1)}return i.getText().substring(0,100)}export{U as INotebookOutlineEntryFactory,E as NotebookOutlineConstants,f as NotebookOutlineEntryFactory};