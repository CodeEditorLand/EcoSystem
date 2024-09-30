import{shuffle as c}from"./arrays.js";import{CharCode as o}from"./charCode.js";import{compare as m,compareIgnoreCase as v,compareSubstring as p,compareSubstringIgnoreCase as I}from"./strings.js";import"./uri.js";class y{_value="";_pos=0;reset(e){return this._value=e,this._pos=0,this}next(){return this._pos+=1,this}hasNext(){return this._pos<this._value.length-1}cmp(e){const s=e.charCodeAt(0),i=this._value.charCodeAt(this._pos);return s-i}value(){return this._value[this._pos]}}class K{constructor(e=!0){this._caseSensitive=e}_value;_from;_to;reset(e){return this._value=e,this._from=0,this._to=0,this.next()}hasNext(){return this._to<this._value.length}next(){this._from=this._to;let e=!0;for(;this._to<this._value.length;this._to++)if(this._value.charCodeAt(this._to)===o.Period)if(e)this._from++;else break;else e=!1;return this}cmp(e){return this._caseSensitive?p(e,this._value,0,e.length,this._from,this._to):I(e,this._value,0,e.length,this._from,this._to)}value(){return this._value.substring(this._from,this._to)}}class b{constructor(e=!0,s=!0){this._splitOnBackslash=e;this._caseSensitive=s}_value;_valueLen;_from;_to;reset(e){this._from=0,this._to=0,this._value=e,this._valueLen=e.length;for(let s=e.length-1;s>=0;s--,this._valueLen--){const i=this._value.charCodeAt(s);if(!(i===o.Slash||this._splitOnBackslash&&i===o.Backslash))break}return this.next()}hasNext(){return this._to<this._valueLen}next(){this._from=this._to;let e=!0;for(;this._to<this._valueLen;this._to++){const s=this._value.charCodeAt(this._to);if(s===o.Slash||this._splitOnBackslash&&s===o.Backslash)if(e)this._from++;else break;else e=!1}return this}cmp(e){return this._caseSensitive?p(e,this._value,0,e.length,this._from,this._to):I(e,this._value,0,e.length,this._from,this._to)}value(){return this._value.substring(this._from,this._to)}}var x=(t=>(t[t.Scheme=1]="Scheme",t[t.Authority=2]="Authority",t[t.Path=3]="Path",t[t.Query=4]="Query",t[t.Fragment=5]="Fragment",t))(x||{});class S{constructor(e,s){this._ignorePathCasing=e;this._ignoreQueryAndFragment=s}_pathIterator;_value;_states=[];_stateIdx=0;reset(e){return this._value=e,this._states=[],this._value.scheme&&this._states.push(1),this._value.authority&&this._states.push(2),this._value.path&&(this._pathIterator=new b(!1,!this._ignorePathCasing(e)),this._pathIterator.reset(e.path),this._pathIterator.value()&&this._states.push(3)),this._ignoreQueryAndFragment(e)||(this._value.query&&this._states.push(4),this._value.fragment&&this._states.push(5)),this._stateIdx=0,this}next(){return this._states[this._stateIdx]===3&&this._pathIterator.hasNext()?this._pathIterator.next():this._stateIdx+=1,this}hasNext(){return this._states[this._stateIdx]===3&&this._pathIterator.hasNext()||this._stateIdx<this._states.length-1}cmp(e){if(this._states[this._stateIdx]===1)return v(e,this._value.scheme);if(this._states[this._stateIdx]===2)return v(e,this._value.authority);if(this._states[this._stateIdx]===3)return this._pathIterator.cmp(e);if(this._states[this._stateIdx]===4)return m(e,this._value.query);if(this._states[this._stateIdx]===5)return m(e,this._value.fragment);throw new Error}value(){if(this._states[this._stateIdx]===1)return this._value.scheme;if(this._states[this._stateIdx]===2)return this._value.authority;if(this._states[this._stateIdx]===3)return this._pathIterator.value();if(this._states[this._stateIdx]===4)return this._value.query;if(this._states[this._stateIdx]===5)return this._value.fragment;throw new Error}}class g{height=1;segment;value;key;left;mid;right;isEmpty(){return!this.left&&!this.mid&&!this.right&&!this.value}rotateLeft(){const e=this.right;return this.right=e.left,e.left=this,this.updateHeight(),e.updateHeight(),e}rotateRight(){const e=this.left;return this.left=e.right,e.right=this,this.updateHeight(),e.updateHeight(),e}updateHeight(){this.height=1+Math.max(this.heightLeft,this.heightRight)}balanceFactor(){return this.heightRight-this.heightLeft}get heightLeft(){return this.left?.height??0}get heightRight(){return this.right?.height??0}}var V=(i=>(i[i.Left=-1]="Left",i[i.Mid=0]="Mid",i[i.Right=1]="Right",i))(V||{});class l{static forUris(e=()=>!1,s=()=>!1){return new l(new S(e,s))}static forPaths(e=!1){return new l(new b(void 0,!e))}static forStrings(){return new l(new y)}static forConfigKeys(){return new l(new K)}_iter;_root;constructor(e){this._iter=e}clear(){this._root=void 0}fill(e,s){if(s){const i=s.slice(0);c(i);for(const r of i)this.set(r,e)}else{const i=e.slice(0);c(i);for(const r of i)this.set(r[0],r[1])}}set(e,s){const i=this._iter.reset(e);let r;this._root||(this._root=new g,this._root.segment=i.value());const t=[];for(r=this._root;;){const a=i.cmp(r.segment);if(a>0)r.left||(r.left=new g,r.left.segment=i.value()),t.push([-1,r]),r=r.left;else if(a<0)r.right||(r.right=new g,r.right.segment=i.value()),t.push([1,r]),r=r.right;else if(i.hasNext())i.next(),r.mid||(r.mid=new g,r.mid.segment=i.value()),t.push([0,r]),r=r.mid;else break}const h=r.value;r.value=s,r.key=e;for(let a=t.length-1;a>=0;a--){const n=t[a][1];n.updateHeight();const f=n.balanceFactor();if(f<-1||f>1){const _=t[a][0],d=t[a+1][0];if(_===1&&d===1)t[a][1]=n.rotateLeft();else if(_===-1&&d===-1)t[a][1]=n.rotateRight();else if(_===1&&d===-1)n.right=t[a+1][1]=t[a+1][1].rotateRight(),t[a][1]=n.rotateLeft();else if(_===-1&&d===1)n.left=t[a+1][1]=t[a+1][1].rotateLeft(),t[a][1]=n.rotateRight();else throw new Error;if(a>0)switch(t[a-1][0]){case-1:t[a-1][1].left=t[a][1];break;case 1:t[a-1][1].right=t[a][1];break;case 0:t[a-1][1].mid=t[a][1];break}else this._root=t[0][1]}}return h}get(e){return this._getNode(e)?.value}_getNode(e){const s=this._iter.reset(e);let i=this._root;for(;i;){const r=s.cmp(i.segment);if(r>0)i=i.left;else if(r<0)i=i.right;else if(s.hasNext())s.next(),i=i.mid;else break}return i}has(e){const s=this._getNode(e);return!(s?.value===void 0&&s?.mid===void 0)}delete(e){return this._delete(e,!1)}deleteSuperstr(e){return this._delete(e,!0)}_delete(e,s){const i=this._iter.reset(e),r=[];let t=this._root;for(;t;){const h=i.cmp(t.segment);if(h>0)r.push([-1,t]),t=t.left;else if(h<0)r.push([1,t]),t=t.right;else if(i.hasNext())i.next(),r.push([0,t]),t=t.mid;else break}if(t){if(s?(t.left=void 0,t.mid=void 0,t.right=void 0,t.height=1):(t.key=void 0,t.value=void 0),!t.mid&&!t.value)if(t.left&&t.right){const h=this._min(t.right);if(h.key){const{key:a,value:n,segment:f}=h;this._delete(h.key,!1),t.key=a,t.value=n,t.segment=f}}else{const h=t.left??t.right;if(r.length>0){const[a,n]=r[r.length-1];switch(a){case-1:n.left=h;break;case 0:n.mid=h;break;case 1:n.right=h;break}}else this._root=h}for(let h=r.length-1;h>=0;h--){const a=r[h][1];a.updateHeight();const n=a.balanceFactor();if(n>1?(a.right.balanceFactor()>=0||(a.right=a.right.rotateRight()),r[h][1]=a.rotateLeft()):n<-1&&(a.left.balanceFactor()<=0||(a.left=a.left.rotateLeft()),r[h][1]=a.rotateRight()),h>0)switch(r[h-1][0]){case-1:r[h-1][1].left=r[h][1];break;case 1:r[h-1][1].right=r[h][1];break;case 0:r[h-1][1].mid=r[h][1];break}else this._root=r[0][1]}}}_min(e){for(;e.left;)e=e.left;return e}findSubstr(e){const s=this._iter.reset(e);let i=this._root,r;for(;i;){const t=s.cmp(i.segment);if(t>0)i=i.left;else if(t<0)i=i.right;else if(s.hasNext())s.next(),r=i.value||r,i=i.mid;else break}return i&&i.value||r}findSuperstr(e){return this._findSuperstrOrElement(e,!1)}_findSuperstrOrElement(e,s){const i=this._iter.reset(e);let r=this._root;for(;r;){const t=i.cmp(r.segment);if(t>0)r=r.left;else if(t<0)r=r.right;else if(i.hasNext())i.next(),r=r.mid;else return r.mid?this._entries(r.mid):s?r.value:void 0}}hasElementOrSubtree(e){return this._findSuperstrOrElement(e,!0)!==void 0}forEach(e){for(const[s,i]of this)e(i,s)}*[Symbol.iterator](){yield*this._entries(this._root)}_entries(e){const s=[];return this._dfsEntries(e,s),s[Symbol.iterator]()}_dfsEntries(e,s){e&&(e.left&&this._dfsEntries(e.left,s),e.value&&s.push([e.key,e.value]),e.mid&&this._dfsEntries(e.mid,s),e.right&&this._dfsEntries(e.right,s))}_isBalanced(){const e=s=>{if(!s)return!0;const i=s.balanceFactor();return i<-1||i>1?!1:e(s.left)&&e(s.right)};return e(this._root)}}export{K as ConfigKeysIterator,b as PathIterator,y as StringIterator,l as TernarySearchTree,S as UriIterator};