import{getNLSLanguage as u,getNLSMessages as d}from"./nls.messages.js";import{getNLSLanguage as I,getNLSMessages as b}from"./nls.messages.js";const c=u()==="pseudo"||typeof document<"u"&&document.location&&typeof document.location.hash=="string"&&document.location.hash.indexOf("pseudo=true")>=0;function a(r,e){let n;return e.length===0?n=r:n=r.replace(/\{(\d+)\}/g,(t,i)=>{const s=i[0],o=e[s];let l=t;return typeof o=="string"?l=o:(typeof o=="number"||typeof o=="boolean"||o===void 0||o===null)&&(l=String(o)),l}),c&&(n="\uFF3B"+n.replace(/[aouei]/g,"$&$&")+"\uFF3D"),n}function y(r,e,...n){return a(typeof r=="number"?g(r,e):e,n)}function g(r,e){const n=d()?.[r];if(typeof n!="string"){if(typeof e=="string")return e;throw new Error(`!!! NLS MISSING: ${r} !!!`)}return n}function p(r,e,...n){let t;typeof r=="number"?t=g(r,e):t=e;const i=a(t,n);return{value:i,original:e===t?i:a(e,n)}}export{I as getNLSLanguage,b as getNLSMessages,y as localize,p as localize2};