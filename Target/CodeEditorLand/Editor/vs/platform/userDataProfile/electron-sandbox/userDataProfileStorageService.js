var p=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var n=(s,e,i,o)=>{for(var r=o>1?void 0:o?S(e,i):e,c=s.length-1,I;c>=0;c--)(I=s[c])&&(r=(o?I(e,i,r):I(r))||r);return o&&r&&p(e,i,r),r},t=(s,e)=>(i,o)=>e(i,o,s);import{IUserDataProfileStorageService as f,RemoteUserDataProfileStorageService as a}from"../common/userDataProfileStorageService.js";import{InstantiationType as g,registerSingleton as l}from"../../instantiation/common/extensions.js";import{IStorageService as v}from"../../storage/common/storage.js";import{ILogService as P}from"../../log/common/log.js";import{IUserDataProfilesService as d}from"../common/userDataProfile.js";import{IMainProcessService as u}from"../../ipc/common/mainProcessService.js";let m=class extends a{constructor(e,i,o,r){super(!1,e,i,o,r)}};m=n([t(0,u),t(1,d),t(2,v),t(3,P)],m),l(f,m,g.Delayed);export{m as NativeUserDataProfileStorageService};