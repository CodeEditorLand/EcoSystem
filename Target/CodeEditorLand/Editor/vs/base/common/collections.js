function a(s,e){const t=Object.create(null);for(const o of s){const r=e(o);let n=t[r];n||(n=t[r]=[]),n.push(o)}return t}function i(s,e){const t=[],o=[];for(const r of s)e.has(r)||t.push(r);for(const r of e)s.has(r)||o.push(r);return{removed:t,added:o}}function l(s,e){const t=[],o=[];for(const[r,n]of s)e.has(r)||t.push(n);for(const[r,n]of e)s.has(r)||o.push(n);return{removed:t,added:o}}function d(s,e){const t=new Set;for(const o of e)s.has(o)&&t.add(o);return t}class c{constructor(e,t){this.toKey=t;for(const o of e)this.add(o)}_map=new Map;get size(){return this._map.size}add(e){const t=this.toKey(e);return this._map.set(t,e),this}delete(e){return this._map.delete(this.toKey(e))}has(e){return this._map.has(this.toKey(e))}*entries(){for(const e of this._map.values())yield[e,e]}keys(){return this.values()}*values(){for(const e of this._map.values())yield e}clear(){this._map.clear()}forEach(e,t){this._map.forEach(o=>e.call(t,o,o,this))}[Symbol.iterator](){return this.values()}[Symbol.toStringTag]="SetWithKey"}export{c as SetWithKey,l as diffMaps,i as diffSets,a as groupBy,d as intersection};