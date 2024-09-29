var g=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=(l,s,r,e)=>{for(var i=e>1?void 0:e?d(s,r):s,n=l.length-1,t;n>=0;n--)(t=l[n])&&(i=(e?t(s,r,i):t(i))||i);return e&&i&&g(s,r,i),i},a=(l,s)=>(r,e)=>s(r,e,l);import{Promises as I}from"../../../base/common/async.js";import{VSBuffer as y}from"../../../base/common/buffer.js";import{toLocalISOString as R}from"../../../base/common/date.js";import{Disposable as D}from"../../../base/common/lifecycle.js";import{joinPath as f}from"../../../base/common/resources.js";import"../../../base/common/uri.js";import{IConfigurationService as U}from"../../configuration/common/configuration.js";import{IEnvironmentService as w}from"../../environment/common/environment.js";import{FileOperationResult as v,IFileService as F,toFileOperationResult as p}from"../../files/common/files.js";import{IUserDataProfilesService as P}from"../../userDataProfile/common/userDataProfile.js";import{ALL_SYNC_RESOURCES as S,IUserDataSyncLogService as b}from"./userDataSync.js";let u=class extends D{constructor(r,e,i,n,t){super();this.environmentService=r;this.fileService=e;this.configurationService=i;this.logService=n;this.userDataProfilesService=t;this.cleanUp()}_serviceBrand;async cleanUp(){for(const e of this.userDataProfilesService.profiles)for(const i of S)try{await this.cleanUpBackup(this.getResourceBackupHome(i,e.isDefault?void 0:e.id))}catch(n){this.logService.error(n)}let r;try{r=await this.fileService.resolve(this.environmentService.userDataSyncHome)}catch(e){p(e)!==v.FILE_NOT_FOUND&&this.logService.error(e);return}if(r.children){for(const e of r.children)if(e.isDirectory&&!S.includes(e.name)&&!this.userDataProfilesService.profiles.some(i=>i.id===e.name))try{this.logService.info("Deleting non existing profile from backup",e.resource.path),await this.fileService.del(e.resource,{recursive:!0})}catch(i){this.logService.error(i)}}}async getAllResourceRefs(r,e,i){const n=this.getResourceBackupHome(r,e,i);try{const t=await this.fileService.resolve(n);if(t.children)return t.children.filter(o=>o.isFile&&!o.name.startsWith("lastSync")).sort().reverse().map(o=>({ref:o.name,created:this.getCreationTime(o)}))}catch(t){if(p(t)!==v.FILE_NOT_FOUND)throw t}return[]}async resolveResourceContent(r,e,i,n){const t=this.getResourceBackupHome(r,i,n),c=f(t,e);try{return(await this.fileService.readFile(c)).value.toString()}catch(o){return this.logService.error(o),null}}async writeResource(r,e,i,n,t){const c=this.getResourceBackupHome(r,n,t),o=f(c,`${R(i).replace(/-|:|\.\d+Z$/g,"")}.json`);try{await this.fileService.writeFile(o,y.fromString(e))}catch(h){this.logService.error(h)}}getResourceBackupHome(r,e,i=this.environmentService.userDataSyncHome){return f(i,...e?[e,r]:[r])}async cleanUpBackup(r){try{try{if(!await this.fileService.exists(r))return}catch{return}const e=await this.fileService.resolve(r);if(e.children){const i=e.children.filter(o=>o.isFile&&/^\d{8}T\d{6}(\.json)?$/.test(o.name)).sort(),n=1e3*60*60*24*(this.configurationService.getValue("sync.localBackupDuration")||30);let t=i.filter(o=>Date.now()-this.getCreationTime(o)>n);const c=i.length-t.length;c<10&&(t=t.slice(10-c)),await I.settled(t.map(async o=>{this.logService.info("Deleting from backup",o.resource.path),await this.fileService.del(o.resource)}))}}catch(e){this.logService.error(e)}}getCreationTime(r){return new Date(parseInt(r.name.substring(0,4)),parseInt(r.name.substring(4,6))-1,parseInt(r.name.substring(6,8)),parseInt(r.name.substring(9,11)),parseInt(r.name.substring(11,13)),parseInt(r.name.substring(13,15))).getTime()}};u=m([a(0,w),a(1,F),a(2,U),a(3,b),a(4,P)],u);export{u as UserDataSyncLocalStoreService};
