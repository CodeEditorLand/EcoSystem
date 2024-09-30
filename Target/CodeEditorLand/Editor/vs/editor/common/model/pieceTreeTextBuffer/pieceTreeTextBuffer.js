import{Emitter as M}from"../../../../base/common/event.js";import*as C from"../../../../base/common/strings.js";import"../../core/position.js";import{Range as L}from"../../core/range.js";import{ApplyEditsResult as S,EndOfLinePreference as O}from"../../model.js";import{PieceTreeBase as B}from"./pieceTreeBase.js";import{countEOL as x,StringEOL as R}from"../../core/eolCounter.js";import{TextChange as V}from"../../core/textChange.js";import{Disposable as w}from"../../../../base/common/lifecycle.js";class N extends w{_pieceTree;_BOM;_mightContainRTL;_mightContainUnusualLineTerminators;_mightContainNonBasicASCII;_onDidChangeContent=this._register(new M);onDidChangeContent=this._onDidChangeContent.event;constructor(e,t,n,i,a,l,c){super(),this._BOM=t,this._mightContainNonBasicASCII=!l,this._mightContainRTL=i,this._mightContainUnusualLineTerminators=a,this._pieceTree=new B(e,n,c)}equals(e){return!(e instanceof N)||this._BOM!==e._BOM||this.getEOL()!==e.getEOL()?!1:this._pieceTree.equal(e._pieceTree)}mightContainRTL(){return this._mightContainRTL}mightContainUnusualLineTerminators(){return this._mightContainUnusualLineTerminators}resetMightContainUnusualLineTerminators(){this._mightContainUnusualLineTerminators=!1}mightContainNonBasicASCII(){return this._mightContainNonBasicASCII}getBOM(){return this._BOM}getEOL(){return this._pieceTree.getEOL()}createSnapshot(e){return this._pieceTree.createSnapshot(e?this._BOM:"")}getOffsetAt(e,t){return this._pieceTree.getOffsetAt(e,t)}getPositionAt(e){return this._pieceTree.getPositionAt(e)}getRangeAt(e,t){const n=e+t,i=this.getPositionAt(e),a=this.getPositionAt(n);return new L(i.lineNumber,i.column,a.lineNumber,a.column)}getValueInRange(e,t=O.TextDefined){if(e.isEmpty())return"";const n=this._getEndOfLine(t);return this._pieceTree.getValueInRange(e,n)}getValueLengthInRange(e,t=O.TextDefined){if(e.isEmpty())return 0;if(e.startLineNumber===e.endLineNumber)return e.endColumn-e.startColumn;const n=this.getOffsetAt(e.startLineNumber,e.startColumn),i=this.getOffsetAt(e.endLineNumber,e.endColumn);let a=0;const l=this._getEndOfLine(t),c=this.getEOL();if(l.length!==c.length){const r=l.length-c.length,g=e.endLineNumber-e.startLineNumber;a=r*g}return i-n+a}getCharacterCountInRange(e,t=O.TextDefined){if(this._mightContainNonBasicASCII){let n=0;const i=e.startLineNumber,a=e.endLineNumber;for(let l=i;l<=a;l++){const c=this.getLineContent(l),r=l===i?e.startColumn-1:0,g=l===a?e.endColumn-1:c.length;for(let h=r;h<g;h++)C.isHighSurrogate(c.charCodeAt(h))?(n=n+1,h=h+1):n=n+1}return n+=this._getEndOfLine(t).length*(a-i),n}return this.getValueLengthInRange(e,t)}getNearestChunk(e){return this._pieceTree.getNearestChunk(e)}getLength(){return this._pieceTree.getLength()}getLineCount(){return this._pieceTree.getLineCount()}getLinesContent(){return this._pieceTree.getLinesContent()}getLineContent(e){return this._pieceTree.getLineContent(e)}getLineCharCode(e,t){return this._pieceTree.getLineCharCode(e,t)}getCharCode(e){return this._pieceTree.getCharCode(e)}getLineLength(e){return this._pieceTree.getLineLength(e)}getLineMinColumn(e){return 1}getLineMaxColumn(e){return this.getLineLength(e)+1}getLineFirstNonWhitespaceColumn(e){const t=C.firstNonWhitespaceIndex(this.getLineContent(e));return t===-1?0:t+1}getLineLastNonWhitespaceColumn(e){const t=C.lastNonWhitespaceIndex(this.getLineContent(e));return t===-1?0:t+2}_getEndOfLine(e){switch(e){case O.LF:return`
`;case O.CRLF:return`\r
`;case O.TextDefined:return this.getEOL();default:throw new Error("Unknown EOL preference")}}setEOL(e){this._pieceTree.setEOL(e)}applyEdits(e,t,n){let i=this._mightContainRTL,a=this._mightContainUnusualLineTerminators,l=this._mightContainNonBasicASCII,c=!0,r=[];for(let o=0;o<e.length;o++){const s=e[o];c&&s._isTracked&&(c=!1);const u=s.range;if(s.text){let b=!0;l||(b=!C.isBasicASCII(s.text),l=b),!i&&b&&(i=C.containsRTL(s.text)),!a&&b&&(a=C.containsUnusualLineTerminators(s.text))}let m="",f=0,_=0,T=0;if(s.text){let b;[f,_,T,b]=x(s.text);const v=this.getEOL(),A=v===`\r
`?R.CRLF:R.LF;b===R.Unknown||b===A?m=s.text:m=s.text.replace(/\r\n|\r|\n/g,v)}r[o]={sortIndex:o,identifier:s.identifier||null,range:u,rangeOffset:this.getOffsetAt(u.startLineNumber,u.startColumn),rangeLength:this.getValueLengthInRange(u),text:m,eolCount:f,firstLineLength:_,lastLineLength:T,forceMoveMarkers:!!s.forceMoveMarkers,isAutoWhitespaceEdit:s.isAutoWhitespaceEdit||!1}}r.sort(N._sortOpsAscending);let g=!1;for(let o=0,s=r.length-1;o<s;o++){const u=r[o].range.getEndPosition(),m=r[o+1].range.getStartPosition();if(m.isBeforeOrEqual(u)){if(m.isBefore(u))throw new Error("Overlapping ranges are not allowed!");g=!0}}c&&(r=this._reduceOperations(r));const h=n||t?N._getInverseEditRanges(r):[],d=[];if(t)for(let o=0;o<r.length;o++){const s=r[o],u=h[o];if(s.isAutoWhitespaceEdit&&s.range.isEmpty())for(let m=u.startLineNumber;m<=u.endLineNumber;m++){let f="";m===u.startLineNumber&&(f=this.getLineContent(s.range.startLineNumber),C.firstNonWhitespaceIndex(f)!==-1)||d.push({lineNumber:m,oldContent:f})}}let p=null;if(n){let o=0;p=[];for(let s=0;s<r.length;s++){const u=r[s],m=h[s],f=this.getValueInRange(u.range),_=u.rangeOffset+o;o+=u.text.length-f.length,p[s]={sortIndex:u.sortIndex,identifier:u.identifier,range:m,text:f,textChange:new V(u.rangeOffset,f,_,u.text)}}g||p.sort((s,u)=>s.sortIndex-u.sortIndex)}this._mightContainRTL=i,this._mightContainUnusualLineTerminators=a,this._mightContainNonBasicASCII=l;const E=this._doApplyEdits(r);let I=null;if(t&&d.length>0){d.sort((o,s)=>s.lineNumber-o.lineNumber),I=[];for(let o=0,s=d.length;o<s;o++){const u=d[o].lineNumber;if(o>0&&d[o-1].lineNumber===u)continue;const m=d[o].oldContent,f=this.getLineContent(u);f.length===0||f===m||C.firstNonWhitespaceIndex(f)!==-1||I.push(u)}}return this._onDidChangeContent.fire(),new S(p,E,I)}_reduceOperations(e){return e.length<1e3?e:[this._toSingleEditOperation(e)]}_toSingleEditOperation(e){let t=!1;const n=e[0].range,i=e[e.length-1].range,a=new L(n.startLineNumber,n.startColumn,i.endLineNumber,i.endColumn);let l=n.startLineNumber,c=n.startColumn;const r=[];for(let E=0,I=e.length;E<I;E++){const o=e[E],s=o.range;t=t||o.forceMoveMarkers,r.push(this.getValueInRange(new L(l,c,s.startLineNumber,s.startColumn))),o.text.length>0&&r.push(o.text),l=s.endLineNumber,c=s.endColumn}const g=r.join(""),[h,d,p]=x(g);return{sortIndex:0,identifier:e[0].identifier,range:a,rangeOffset:this.getOffsetAt(a.startLineNumber,a.startColumn),rangeLength:this.getValueLengthInRange(a,O.TextDefined),text:g,eolCount:h,firstLineLength:d,lastLineLength:p,forceMoveMarkers:t,isAutoWhitespaceEdit:!1}}_doApplyEdits(e){e.sort(N._sortOpsDescending);const t=[];for(let n=0;n<e.length;n++){const i=e[n],a=i.range.startLineNumber,l=i.range.startColumn,c=i.range.endLineNumber,r=i.range.endColumn;if(a===c&&l===r&&i.text.length===0)continue;i.text?(this._pieceTree.delete(i.rangeOffset,i.rangeLength),this._pieceTree.insert(i.rangeOffset,i.text,!0)):this._pieceTree.delete(i.rangeOffset,i.rangeLength);const g=new L(a,l,c,r);t.push({range:g,rangeLength:i.rangeLength,text:i.text,rangeOffset:i.rangeOffset,forceMoveMarkers:i.forceMoveMarkers})}return t}findMatchesLineByLine(e,t,n,i){return this._pieceTree.findMatchesLineByLine(e,t,n,i)}getPieceTree(){return this._pieceTree}static _getInverseEditRange(e,t){const n=e.startLineNumber,i=e.startColumn,[a,l,c]=x(t);let r;if(t.length>0){const g=a+1;g===1?r=new L(n,i,n,i+l):r=new L(n,i,n+g-1,c+1)}else r=new L(n,i,n,i);return r}static _getInverseEditRanges(e){const t=[];let n=0,i=0,a=null;for(let l=0,c=e.length;l<c;l++){const r=e[l];let g,h;a?a.range.endLineNumber===r.range.startLineNumber?(g=n,h=i+(r.range.startColumn-a.range.endColumn)):(g=n+(r.range.startLineNumber-a.range.endLineNumber),h=r.range.startColumn):(g=r.range.startLineNumber,h=r.range.startColumn);let d;if(r.text.length>0){const p=r.eolCount+1;p===1?d=new L(g,h,g,h+r.firstLineLength):d=new L(g,h,g+p-1,r.lastLineLength+1)}else d=new L(g,h,g,h);n=d.endLineNumber,i=d.endColumn,t.push(d),a=r}return t}static _sortOpsAscending(e,t){const n=L.compareRangesUsingEnds(e.range,t.range);return n===0?e.sortIndex-t.sortIndex:n}static _sortOpsDescending(e,t){const n=L.compareRangesUsingEnds(e.range,t.range);return n===0?t.sortIndex-e.sortIndex:-n}}export{N as PieceTreeTextBuffer};