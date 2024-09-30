import"./ast.js";import{lengthAdd as f,lengthZero as l,lengthLessThan as r}from"./length.js";class g{nextNodes;offsets;idxs;lastOffset=l;constructor(e){this.nextNodes=[e],this.offsets=[l],this.idxs=[]}readLongestNodeAt(e,h){if(r(e,this.lastOffset))throw new Error("Invalid offset");for(this.lastOffset=e;;){const t=d(this.nextNodes);if(!t)return;const s=d(this.offsets);if(r(e,s))return;if(r(s,e))if(f(s,t.length)<=e)this.nextNodeAfterCurrent();else{const i=o(t);i!==-1?(this.nextNodes.push(t.getChild(i)),this.offsets.push(s),this.idxs.push(i)):this.nextNodeAfterCurrent()}else{if(h(t))return this.nextNodeAfterCurrent(),t;{const i=o(t);if(i===-1){this.nextNodeAfterCurrent();return}else this.nextNodes.push(t.getChild(i)),this.offsets.push(s),this.idxs.push(i)}}}}nextNodeAfterCurrent(){for(;;){const e=d(this.offsets),h=d(this.nextNodes);if(this.nextNodes.pop(),this.offsets.pop(),this.idxs.length===0)break;const t=d(this.nextNodes),s=o(t,this.idxs[this.idxs.length-1]);if(s!==-1){this.nextNodes.push(t.getChild(s)),this.offsets.push(f(e,h.length)),this.idxs[this.idxs.length-1]=s;break}else this.idxs.pop()}}}function o(n,e=-1){for(;;){if(e++,e>=n.childrenLength)return-1;if(n.getChild(e))return e}}function d(n){return n.length>0?n[n.length-1]:void 0}export{g as NodeReader};