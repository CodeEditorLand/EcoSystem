var d=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var g=(a,r,s,t)=>{for(var e=t>1?void 0:t?v(r,s):r,o=a.length-1,i;o>=0;o--)(i=a[o])&&(e=(t?i(r,s,e):i(e))||e);return t&&e&&d(r,s,e),e},l=(a,r)=>(s,t)=>r(s,t,a);import{AbstractExtHostConsoleForwarder as _}from"../common/extHostConsoleForwarder.js";import{IExtHostInitDataService as u}from"../common/extHostInitDataService.js";import{IExtHostRpcService as S}from"../common/extHostRpcService.js";import{NativeLogMarkers as f}from"../../services/extensions/common/extensionHostProtocol.js";const w=1024*1024;let n=class extends _{_isMakingConsoleCall=!1;constructor(r,s){super(r,s),this._wrapStream("stderr","error"),this._wrapStream("stdout","log")}_nativeConsoleLogMessage(r,s,t){const e=r==="error"||r==="warn"?process.stderr:process.stdout;this._isMakingConsoleCall=!0,e.write(`
${f.Start}
`),s.apply(console,t),e.write(`
${f.End}
`),this._isMakingConsoleCall=!1}_wrapStream(r,s){const t=process[r],e=t.write;let o="";Object.defineProperty(t,"write",{set:()=>{},get:()=>(i,c,m)=>{if(!this._isMakingConsoleCall){o+=i.toString(c);const p=o.length>w?o.length:o.lastIndexOf(`
`);p!==-1&&(o=o.slice(p+1))}e.call(t,i,c,m)}})}};n=g([l(0,S),l(1,u)],n);export{n as ExtHostConsoleForwarder};