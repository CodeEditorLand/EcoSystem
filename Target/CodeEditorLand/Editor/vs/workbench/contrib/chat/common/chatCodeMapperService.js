import"../../../../base/common/cancellation.js";import{CharCode as f}from"../../../../base/common/charCode.js";import"../../../../base/common/lifecycle.js";import{splitLinesIncludeSeparators as C}from"../../../../base/common/strings.js";import{isString as u}from"../../../../base/common/types.js";import"../../../../base/common/uri.js";import"../../../../editor/common/languages.js";import{createDecorator as m}from"../../../../platform/instantiation/common/instantiation.js";import"./chatModel.js";const L=m("codeMapperService");class w{_serviceBrand;providers=[];registerCodeMapperProvider(r,o){return this.providers.push(o),{dispose:()=>{const e=this.providers.indexOf(o);e>=0&&this.providers.splice(e,1)}}}async mapCode(r,o,e){for(const t of this.providers){const s=await t.mapCode(r,o,e);if(s)return s}}async mapCodeFromResponse(r,o,e){const t=/^`{3,}/,s=[],a=[],l=[];let d,i;for(const p of I(r))if(u(p)){const c=p.match(t);c?i!==void 0&&c[0]===i?(i=void 0,d&&(s.push({code:a.join(""),resource:d}),a.length=0,l.length=0,d=void 0)):i=c[0]:i!==void 0?a.push(p):l.push(p)}else d=p;return this.mapCode({codeBlocks:s,conversation:[]},o,e)}}function I(n){return{*[Symbol.iterator](){let r;for(const o of n.response.value)if(o.kind==="markdownContent"||o.kind==="markdownVuln"){const e=C(o.content.value);if(e.length>0){r!==void 0&&(e[0]=r+e[0]),r=M(e[e.length-1])?e.pop():void 0;for(const t of e)yield t}}else o.kind==="codeblockUri"&&(yield o.uri)}}}function M(n){const r=n.charCodeAt(n.length-1);return r!==f.LineFeed&&r!==f.CarriageReturn}export{w as CodeMapperService,L as ICodeMapperService};