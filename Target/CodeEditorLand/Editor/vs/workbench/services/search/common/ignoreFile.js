import*as p from"../../../../base/common/glob.js";class x{constructor(e,r,t){this.location=r;this.parent=t;if(r[r.length-1]==="\\")throw Error("Unexpected path format, do not use trailing backslashes");r[r.length-1]!=="/"&&(r+="/"),this.isPathIgnored=this.parseIgnoreFile(e,this.location,this.parent)}isPathIgnored;updateContents(e){this.isPathIgnored=this.parseIgnoreFile(e,this.location,this.parent)}isPathIncludedInTraversal(e,r){if(e[0]!=="/"||e[e.length-1]==="/")throw Error("Unexpected path format, expectred to begin with slash and end without. got:"+e);return!this.isPathIgnored(e,r)}isArbitraryPathIgnored(e,r){if(e[0]!=="/"||e[e.length-1]==="/")throw Error("Unexpected path format, expectred to begin with slash and end without. got:"+e);const t=e.split("/").filter(i=>i);let o=!1,s="";for(let i=0;i<t.length;i++){const g=i===t.length-1,l=t[i];if(s=s+"/"+l,!this.isPathIncludedInTraversal(s,g?r:!0)){o=!0;break}}return o}gitignoreLinesToExpression(e,r,t){const o=e.map(i=>this.gitignoreLineToGlob(i,r)),s=Object.create(null);for(const i of o)s[i]=!0;return p.parse(s,{trimForExclusions:t})}parseIgnoreFile(e,r,t){const o=e.split(`
`).map(n=>n.trim()).filter(n=>n&&n[0]!=="#"),s=o.filter(n=>!n.endsWith("/")),i=s.filter(n=>!n.includes("!")),g=this.gitignoreLinesToExpression(i,r,!0),l=s.filter(n=>n.includes("!")).map(n=>n.replace(/!/g,"")),c=this.gitignoreLinesToExpression(l,r,!1),d=o.filter(n=>!n.includes("!")),f=this.gitignoreLinesToExpression(d,r,!0),u=o.filter(n=>n.includes("!")).map(n=>n.replace(/!/g,"")),h=this.gitignoreLinesToExpression(u,r,!1);return(n,a)=>n.startsWith(r)?a&&f(n)&&!h(n)||g(n)&&!c(n)?!0:t?t.isPathIgnored(n,a):!1:!1}gitignoreLineToGlob(e,r){const t=e.indexOf("/");return t===-1||t===e.length-1?e="**/"+e:(t===0?r.slice(-1)==="/"&&(e=e.slice(1)):r.slice(-1)!=="/"&&(e="/"+e),e=r+e),e}}export{x as IgnoreFile};