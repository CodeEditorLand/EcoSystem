var v=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var n=(a,e,r,o)=>{for(var t=o>1?void 0:o?m(e,r):e,c=a.length-1,p;c>=0;c--)(p=a[c])&&(t=(o?p(e,r,t):p(t))||t);return o&&t&&v(e,r,t),t};import{memoize as s}from"../../../base/common/decorators.js";import{join as d}from"../../../base/common/path.js";import{isLinux as l}from"../../../base/common/platform.js";import{createStaticIPCHandle as u}from"../../../base/parts/ipc/node/ipc.net.js";import{IEnvironmentService as h}from"../common/environment.js";import{NativeEnvironmentService as f}from"../node/environmentService.js";import{refineServiceDecorator as g}from"../../instantiation/common/instantiation.js";const k=g(h);class i extends f{_snapEnv={};get backupHome(){return d(this.userDataPath,"Backups")}get mainIPCHandle(){return u(this.userDataPath,"main",this.productService.version)}get mainLockfile(){return d(this.userDataPath,"code.lock")}get disableUpdates(){return!!this.args["disable-updates"]}get crossOriginIsolated(){return!!this.args["enable-coi"]}get codeCachePath(){return process.env.VSCODE_CODE_CACHE_PATH||void 0}get useCodeCache(){return!!this.codeCachePath}unsetSnapExportedVariables(){if(l){for(const e in process.env)if(e.endsWith("_VSCODE_SNAP_ORIG")){const r=e.slice(0,-17);if(this._snapEnv[r])continue;process.env[r]&&(this._snapEnv[r]=process.env[r]),process.env[e]?process.env[r]=process.env[e]:delete process.env[r]}}}restoreSnapExportedVariables(){if(l)for(const e in this._snapEnv)process.env[e]=this._snapEnv[e],delete this._snapEnv[e]}}n([s],i.prototype,"backupHome",1),n([s],i.prototype,"mainIPCHandle",1),n([s],i.prototype,"mainLockfile",1),n([s],i.prototype,"disableUpdates",1),n([s],i.prototype,"crossOriginIsolated",1),n([s],i.prototype,"codeCachePath",1),n([s],i.prototype,"useCodeCache",1);export{i as EnvironmentMainService,k as IEnvironmentMainService};