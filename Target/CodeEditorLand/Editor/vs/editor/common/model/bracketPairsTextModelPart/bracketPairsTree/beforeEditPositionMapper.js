import{Range as C}from"../../../core/range.js";import{lengthAdd as O,lengthDiffNonNegative as g,lengthLessThanEqual as c,lengthOfString as x,lengthToObj as o,positionToLength as r,toLength as l}from"./length.js";import"../../../core/textLength.js";import"../../../textModelEvents.js";class u{constructor(t,e,n){this.startOffset=t;this.endOffset=e;this.newLength=n}static fromModelContentChanges(t){return t.map(n=>{const i=C.lift(n.range);return new u(r(i.getStartPosition()),r(i.getEndPosition()),x(n.text))}).reverse()}toString(){return`[${o(this.startOffset)}...${o(this.endOffset)}) -> ${o(this.newLength)}`}}class N{nextEditIdx=0;deltaOldToNewLineCount=0;deltaOldToNewColumnCount=0;deltaLineIdxInOld=-1;edits;constructor(t){this.edits=t.map(e=>s.from(e))}getOffsetBeforeChange(t){return this.adjustNextEdit(t),this.translateCurToOld(t)}getDistanceToNextChange(t){this.adjustNextEdit(t);const e=this.edits[this.nextEditIdx],n=e?this.translateOldToCur(e.offsetObj):null;return n===null?null:g(t,n)}translateOldToCur(t){return t.lineCount===this.deltaLineIdxInOld?l(t.lineCount+this.deltaOldToNewLineCount,t.columnCount+this.deltaOldToNewColumnCount):l(t.lineCount+this.deltaOldToNewLineCount,t.columnCount)}translateCurToOld(t){const e=o(t);return e.lineCount-this.deltaOldToNewLineCount===this.deltaLineIdxInOld?l(e.lineCount-this.deltaOldToNewLineCount,e.columnCount-this.deltaOldToNewColumnCount):l(e.lineCount-this.deltaOldToNewLineCount,e.columnCount)}adjustNextEdit(t){for(;this.nextEditIdx<this.edits.length;){const e=this.edits[this.nextEditIdx],n=this.translateOldToCur(e.endOffsetAfterObj);if(c(n,t)){this.nextEditIdx++;const i=o(n),d=o(this.translateOldToCur(e.endOffsetBeforeObj)),a=i.lineCount-d.lineCount;this.deltaOldToNewLineCount+=a;const h=this.deltaLineIdxInOld===e.endOffsetBeforeObj.lineCount?this.deltaOldToNewColumnCount:0,f=i.columnCount-d.columnCount;this.deltaOldToNewColumnCount=h+f,this.deltaLineIdxInOld=e.endOffsetBeforeObj.lineCount}else break}}}class s{static from(t){return new s(t.startOffset,t.endOffset,t.newLength)}endOffsetBeforeObj;endOffsetAfterObj;offsetObj;constructor(t,e,n){this.endOffsetBeforeObj=o(e),this.endOffsetAfterObj=o(O(t,n)),this.offsetObj=o(t)}}export{N as BeforeEditPositionMapper,u as TextEditInfo};