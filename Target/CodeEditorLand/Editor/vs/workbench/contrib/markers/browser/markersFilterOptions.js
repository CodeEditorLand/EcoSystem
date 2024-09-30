import{matchesFuzzy as E,matchesFuzzy2 as b}from"../../../../base/common/filters.js";import{splitGlobAware as g,getEmptyExpression as y,parse as f}from"../../../../base/common/glob.js";import*as n from"../../../../base/common/strings.js";import"../../../../base/common/uri.js";import{relativePath as u}from"../../../../base/common/resources.js";import{TernarySearchTree as R}from"../../../../base/common/ternarySearchTree.js";import"../../../../platform/uriIdentity/common/uriIdentity.js";class I{globalExpression;expressionsByRoot;constructor(s,e,t){this.globalExpression=f(s),this.expressionsByRoot=R.forUris(o=>t.extUri.ignorePathCasing(o));for(const o of e)this.expressionsByRoot.set(o.root,{root:o.root,expression:f(o.expression)})}matches(s){const e=this.expressionsByRoot.findSubstr(s);if(e){const t=u(e.root,s);if(t&&e.expression(t))return!0}return!!this.globalExpression(s.path)}}class d{constructor(s,e,t,o,m,a){this.filter=s;s=s.trim(),this.showWarnings=t,this.showErrors=o,this.showInfos=m;const l=Array.isArray(e)?e:[],p=Array.isArray(e)?y():e;for(const{expression:i}of l)for(const r of Object.keys(i))r.endsWith("/**")||(i[`${n.rtrim(r,"/")}/**`]=i[r]);const c=s.startsWith("!");this.textFilter={text:(c?n.ltrim(s,"!"):s).trim(),negate:c};const x=y();if(s){const i=g(s,",").map(r=>r.trim()).filter(r=>!!r.length);for(const r of i)if(r.startsWith("!")){const h=n.ltrim(r,"!");h&&this.setPattern(p,h)}else this.setPattern(x,r)}this.excludesMatcher=new I(p,l,a),this.includesMatcher=new I(x,[],a)}static _filter=b;static _messageFilter=E;showWarnings=!1;showErrors=!1;showInfos=!1;textFilter;excludesMatcher;includesMatcher;static EMPTY(s){return new d("",[],!1,!1,!1,s)}setPattern(s,e){e[0]==="."&&(e="*"+e),s[`**/${e}/**`]=!0,s[`**/${e}`]=!0}}export{d as FilterOptions,I as ResourceGlobMatcher};