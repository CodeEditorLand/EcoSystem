var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var c=(s,r,t,e)=>{for(var n=e>1?void 0:e?p(r,t):r,m=s.length-1,a;m>=0;m--)(a=s[m])&&(n=(e?a(r,t,n):a(n))||n);return e&&n&&l(r,t,n),n},o=(s,r)=>(t,e)=>r(t,e,s);import{generateUuid as u}from"../../../base/common/uuid.js";import{IExtHostRpcService as d}from"../common/extHostRpcService.js";import{BaseExtHostTerminalService as I,ExtHostTerminal as T}from"../common/extHostTerminalService.js";import{IExtHostCommands as v}from"../common/extHostCommands.js";let i=class extends I{constructor(r,t){super(!0,r,t)}createTerminal(r,t,e){return this.createTerminalFromOptions({name:r,shellPath:t,shellArgs:e})}createTerminalFromOptions(r,t){const e=new T(this._proxy,u(),r,r.name);return this._terminals.push(e),e.create(r,this._serializeParentTerminal(r,t)),e.value}};i=c([o(0,v),o(1,d)],i);export{i as ExtHostTerminalService};