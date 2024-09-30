import*as M from"../../../base/common/arrays.js";import"../core/range.js";import{LineTokens as C}from"./lineTokens.js";import"./sparseMultilineTokens.js";import"../languages.js";import{MetadataConsts as l}from"../encodedTokenAttributes.js";class E{_pieces;_isComplete;_languageIdCodec;constructor(s){this._pieces=[],this._isComplete=!1,this._languageIdCodec=s}flush(){this._pieces=[],this._isComplete=!1}isEmpty(){return this._pieces.length===0}set(s,e){this._pieces=s||[],this._isComplete=e}setPartial(s,e){let n=s;if(e.length>0){const t=e[0].getRange(),a=e[e.length-1].getRange();if(!t||!a)return s;n=s.plusRange(t).plusRange(a)}let r=null;for(let t=0,a=this._pieces.length;t<a;t++){const o=this._pieces[t];if(o.endLineNumber<n.startLineNumber)continue;if(o.startLineNumber>n.endLineNumber){r=r||{index:t};break}if(o.removeTokens(n),o.isEmpty()){this._pieces.splice(t,1),t--,a--;continue}if(o.endLineNumber<n.startLineNumber)continue;if(o.startLineNumber>n.endLineNumber){r=r||{index:t};continue}const[i,d]=o.split(n);if(i.isEmpty()){r=r||{index:t};continue}d.isEmpty()||(this._pieces.splice(t,1,i,d),t++,a++,r=r||{index:t})}return r=r||{index:this._pieces.length},e.length>0&&(this._pieces=M.arrayInsert(this._pieces,r.index,e)),n}isComplete(){return this._isComplete}addSparseTokens(s,e){if(e.getLineContent().length===0)return e;const n=this._pieces;if(n.length===0)return e;const r=E._findFirstPieceWithLine(n,s),t=n[r].getLineTokens(s);if(!t)return e;const a=e.getCount(),o=t.getCount();let i=0;const d=[];let _=0,b=0;const g=(u,p)=>{u!==b&&(b=u,d[_++]=u,d[_++]=p)};for(let u=0;u<o;u++){const p=t.getStartCharacter(u),f=t.getEndCharacter(u),c=t.getMetadata(u),m=((c&l.SEMANTIC_USE_ITALIC?l.ITALIC_MASK:0)|(c&l.SEMANTIC_USE_BOLD?l.BOLD_MASK:0)|(c&l.SEMANTIC_USE_UNDERLINE?l.UNDERLINE_MASK:0)|(c&l.SEMANTIC_USE_STRIKETHROUGH?l.STRIKETHROUGH_MASK:0)|(c&l.SEMANTIC_USE_FOREGROUND?l.FOREGROUND_MASK:0)|(c&l.SEMANTIC_USE_BACKGROUND?l.BACKGROUND_MASK:0))>>>0,h=~m>>>0;for(;i<a&&e.getEndOffset(i)<=p;)g(e.getEndOffset(i),e.getMetadata(i)),i++;for(i<a&&e.getStartOffset(i)<p&&g(p,e.getMetadata(i));i<a&&e.getEndOffset(i)<f;)g(e.getEndOffset(i),e.getMetadata(i)&h|c&m),i++;if(i<a)g(f,e.getMetadata(i)&h|c&m),e.getEndOffset(i)===f&&i++;else{const L=Math.min(Math.max(0,i-1),a-1);g(f,e.getMetadata(L)&h|c&m)}}for(;i<a;)g(e.getEndOffset(i),e.getMetadata(i)),i++;return new C(new Uint32Array(d),e.getLineContent(),this._languageIdCodec)}static _findFirstPieceWithLine(s,e){let n=0,r=s.length-1;for(;n<r;){let t=n+Math.floor((r-n)/2);if(s[t].endLineNumber<e)n=t+1;else if(s[t].startLineNumber>e)r=t-1;else{for(;t>n&&s[t-1].startLineNumber<=e&&e<=s[t-1].endLineNumber;)t--;return t}}return n}acceptEdit(s,e,n,r,t){for(const a of this._pieces)a.acceptEdit(s,e,n,r,t)}}export{E as SparseTokensStore};