var p=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var l=(a,n,t,r)=>{for(var e=r>1?void 0:r?v(n,t):n,s=a.length-1,o;s>=0;s--)(o=a[s])&&(e=(r?o(n,t,e):o(e))||e);return r&&e&&p(n,t,e),e},i=(a,n)=>(t,r)=>n(t,r,a);import{joinPath as u}from"../../base/common/resources.js";import{URI as m}from"../../base/common/uri.js";import{INativeEnvironmentService as g}from"../../platform/environment/common/environment.js";import{IExtensionsProfileScannerService as P}from"../../platform/extensionManagement/common/extensionsProfileScannerService.js";import{AbstractExtensionsScannerService as d}from"../../platform/extensionManagement/common/extensionsScannerService.js";import{IFileService as h}from"../../platform/files/common/files.js";import{IInstantiationService as x}from"../../platform/instantiation/common/instantiation.js";import{ILogService as y}from"../../platform/log/common/log.js";import{IProductService as U}from"../../platform/product/common/productService.js";import{IUriIdentityService as F}from"../../platform/uriIdentity/common/uriIdentity.js";import{IUserDataProfilesService as N}from"../../platform/userDataProfile/common/userDataProfile.js";import{getNLSConfiguration as b}from"./remoteLanguagePacks.js";let c=class extends d{constructor(t,r,e,s,o,f,I,S){super(m.file(o.builtinExtensionsPath),m.file(o.extensionsPath),u(o.userHome,".vscode-oss-dev","extensions","control.json"),t.defaultProfile,t,r,e,s,o,f,I,S);this.nativeEnvironmentService=o}async getTranslations(t){const r=await b(t,this.nativeEnvironmentService.userDataPath);if(r.languagePack)try{const e=await this.fileService.readFile(m.file(r.languagePack.translationsConfigFile));return JSON.parse(e.value.toString())}catch{}return Object.create(null)}};c=l([i(0,N),i(1,P),i(2,h),i(3,y),i(4,g),i(5,U),i(6,F),i(7,x)],c);export{c as ExtensionsScannerService};