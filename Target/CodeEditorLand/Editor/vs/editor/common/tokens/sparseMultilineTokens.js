import{CharCode as p}from"../../../base/common/charCode.js";import{Position as C}from"../core/position.js";import{Range as d}from"../core/range.js";import{countEOL as T}from"../core/eolCounter.js";class L{static create(e,t){return new L(e,new g(t))}_startLineNumber;_endLineNumber;_tokens;get startLineNumber(){return this._startLineNumber}get endLineNumber(){return this._endLineNumber}constructor(e,t){this._startLineNumber=e,this._tokens=t,this._endLineNumber=this._startLineNumber+this._tokens.getMaxDeltaLine()}toString(){return this._tokens.toString(this._startLineNumber)}_updateEndLineNumber(){this._endLineNumber=this._startLineNumber+this._tokens.getMaxDeltaLine()}isEmpty(){return this._tokens.isEmpty()}getLineTokens(e){return this._startLineNumber<=e&&e<=this._endLineNumber?this._tokens.getLineTokens(e-this._startLineNumber):null}getRange(){const e=this._tokens.getRange();return e&&new d(this._startLineNumber+e.startLineNumber,e.startColumn,this._startLineNumber+e.endLineNumber,e.endColumn)}removeTokens(e){const t=e.startLineNumber-this._startLineNumber,n=e.endLineNumber-this._startLineNumber;this._startLineNumber+=this._tokens.removeTokens(t,e.startColumn-1,n,e.endColumn-1),this._updateEndLineNumber()}split(e){const t=e.startLineNumber-this._startLineNumber,n=e.endLineNumber-this._startLineNumber,[i,s,o]=this._tokens.split(t,e.startColumn-1,n,e.endColumn-1);return[new L(this._startLineNumber,i),new L(this._startLineNumber+o,s)]}applyEdit(e,t){const[n,i,s]=T(t);this.acceptEdit(e,n,i,s,t.length>0?t.charCodeAt(0):p.Null)}acceptEdit(e,t,n,i,s){this._acceptDeleteRange(e),this._acceptInsertText(new C(e.startLineNumber,e.startColumn),t,n,i,s),this._updateEndLineNumber()}_acceptDeleteRange(e){if(e.startLineNumber===e.endLineNumber&&e.startColumn===e.endColumn)return;const t=e.startLineNumber-this._startLineNumber,n=e.endLineNumber-this._startLineNumber;if(n<0){const s=n-t;this._startLineNumber-=s;return}const i=this._tokens.getMaxDeltaLine();if(!(t>=i+1)){if(t<0&&n>=i+1){this._startLineNumber=0,this._tokens.clear();return}if(t<0){const s=-t;this._startLineNumber-=s,this._tokens.acceptDeleteRange(e.startColumn-1,0,0,n,e.endColumn-1)}else this._tokens.acceptDeleteRange(0,t,e.startColumn-1,n,e.endColumn-1)}}_acceptInsertText(e,t,n,i,s){if(t===0&&n===0)return;const o=e.lineNumber-this._startLineNumber;if(o<0){this._startLineNumber+=t;return}const b=this._tokens.getMaxDeltaLine();o>=b+1||this._tokens.acceptInsertText(o,e.column-1,t,n,i,s)}}class g{_tokens;_tokenCount;constructor(e){this._tokens=e,this._tokenCount=e.length/4}toString(e){const t=[];for(let n=0;n<this._tokenCount;n++)t.push(`(${this._getDeltaLine(n)+e},${this._getStartCharacter(n)}-${this._getEndCharacter(n)})`);return`[${t.join(",")}]`}getMaxDeltaLine(){const e=this._getTokenCount();return e===0?-1:this._getDeltaLine(e-1)}getRange(){const e=this._getTokenCount();if(e===0)return null;const t=this._getStartCharacter(0),n=this._getDeltaLine(e-1),i=this._getEndCharacter(e-1);return new d(0,t+1,n,i+1)}_getTokenCount(){return this._tokenCount}_getDeltaLine(e){return this._tokens[4*e]}_getStartCharacter(e){return this._tokens[4*e+1]}_getEndCharacter(e){return this._tokens[4*e+2]}isEmpty(){return this._getTokenCount()===0}getLineTokens(e){let t=0,n=this._getTokenCount()-1;for(;t<n;){const i=t+Math.floor((n-t)/2),s=this._getDeltaLine(i);if(s<e)t=i+1;else if(s>e)n=i-1;else{let o=i;for(;o>t&&this._getDeltaLine(o-1)===e;)o--;let b=i;for(;b<n&&this._getDeltaLine(b+1)===e;)b++;return new N(this._tokens.subarray(4*o,4*b+4))}}return this._getDeltaLine(t)===e?new N(this._tokens.subarray(4*t,4*t+4)):null}clear(){this._tokenCount=0}removeTokens(e,t,n,i){const s=this._tokens,o=this._tokenCount;let b=0,k=!1,c=0;for(let _=0;_<o;_++){const m=4*_,l=s[m],r=s[m+1],u=s[m+2],a=s[m+3];if((l>e||l===e&&u>=t)&&(l<n||l===n&&r<=i))k=!0;else{if(b===0&&(c=l),k){const h=4*b;s[h]=l-c,s[h+1]=r,s[h+2]=u,s[h+3]=a}b++}}return this._tokenCount=b,c}split(e,t,n,i){const s=this._tokens,o=this._tokenCount,b=[],k=[];let c=b,_=0,m=0;for(let l=0;l<o;l++){const r=4*l,u=s[r],a=s[r+1],h=s[r+2],f=s[r+3];if(u>e||u===e&&h>=t){if(u<n||u===n&&a<=i)continue;c!==k&&(c=k,_=0,m=u)}c[_++]=u-m,c[_++]=a,c[_++]=h,c[_++]=f}return[new g(new Uint32Array(b)),new g(new Uint32Array(k)),m]}acceptDeleteRange(e,t,n,i,s){const o=this._tokens,b=this._tokenCount,k=i-t;let c=0,_=!1;for(let m=0;m<b;m++){const l=4*m;let r=o[l],u=o[l+1],a=o[l+2];const h=o[l+3];if(r<t||r===t&&a<=n){c++;continue}else if(r===t&&u<n)r===i&&a>s?a-=s-n:a=n;else if(r===t&&u===n)if(r===i&&a>s)a-=s-n;else{_=!0;continue}else if(r<i||r===i&&u<s)if(r===i&&a>s)r=t,u=n,a=u+(a-s);else{_=!0;continue}else if(r>i){if(k===0&&!_){c=b;break}r-=k}else if(r===i&&u>=s)e&&r===0&&(u+=e,a+=e),r-=k,u-=s-n,a-=s-n;else throw new Error("Not possible!");const f=4*c;o[f]=r,o[f+1]=u,o[f+2]=a,o[f+3]=h,c++}this._tokenCount=c}acceptInsertText(e,t,n,i,s,o){const b=n===0&&i===1&&(o>=p.Digit0&&o<=p.Digit9||o>=p.A&&o<=p.Z||o>=p.a&&o<=p.z),k=this._tokens,c=this._tokenCount;for(let _=0;_<c;_++){const m=4*_;let l=k[m],r=k[m+1],u=k[m+2];if(!(l<e||l===e&&u<t)){if(l===e&&u===t)if(b)u+=1;else continue;else if(l===e&&r<t&&t<u)n===0?u+=i:u=t;else{if(l===e&&r===t&&b)continue;if(l===e)if(l+=n,n===0)r+=i,u+=i;else{const a=u-r;r=s+(r-t),u=r+a}else l+=n}k[m]=l,k[m+1]=r,k[m+2]=u}}}}class N{_tokens;constructor(e){this._tokens=e}getCount(){return this._tokens.length/4}getStartCharacter(e){return this._tokens[4*e+1]}getEndCharacter(e){return this._tokens[4*e+2]}getMetadata(e){return this._tokens[4*e+3]}}export{N as SparseLineTokens,L as SparseMultilineTokens};