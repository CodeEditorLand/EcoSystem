import{Range as g}from"../../../../editor/common/core/range.js";import"../../../../editor/common/model.js";import{TextSearchMatch as M}from"./search.js";function l(e,o,n){const a=e[0].range.startLineNumber,i=e[e.length-1].range.endLineNumber,r=[];for(let t=a;t<=i;t++)r.push(o.getLineContent(t));return new M(r.join(`
`)+`
`,e.map(t=>new g(t.range.startLineNumber-1,t.range.startColumn-1,t.range.endLineNumber-1,t.range.endColumn-1)),n)}function N(e,o,n){let a=-1;const i=[];let r=[];return e.forEach(t=>{t.range.startLineNumber!==a&&(r=[],i.push(r)),r.push(t),a=t.range.endLineNumber}),i.map(t=>l(t,o,n))}function R(e,o,n){const a=[];let i=-1;for(let r=0;r<e.length;r++){const{start:t,end:u}=x(e[r]);if(typeof n.surroundingContext=="number"&&n.surroundingContext>0){const s=Math.max(i+1,t-n.surroundingContext);for(let c=s;c<t;c++)a.push({text:o.getLineContent(c+1),lineNumber:c+1})}a.push(e[r]);const h=e[r+1],d=h?x(h).start:Number.MAX_VALUE;if(typeof n.surroundingContext=="number"&&n.surroundingContext>0){const s=Math.min(d-1,u+n.surroundingContext,o.getLineCount()-1);for(let c=u+1;c<=s;c++)a.push({text:o.getLineContent(c+1),lineNumber:c+1})}i=u}return a}function x(e){const o=e.rangeLocations.map(i=>i.source),n=o[0].startLineNumber,a=o[o.length-1].endLineNumber;return{start:n,end:a}}export{N as editorMatchesToTextSearchResults,R as getTextSearchMatchWithModelContext};