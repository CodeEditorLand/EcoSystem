var I=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var y=(h,c,e,t)=>{for(var i=t>1?void 0:t?x(c,e):c,o=h.length-1,a;o>=0;o--)(a=h[o])&&(i=(t?a(c,e,i):a(i))||i);return t&&i&&I(c,e,i),i},l=(h,c)=>(e,t)=>c(e,t,h);import{Promises as E}from"../../../base/common/async.js";import{getErrorMessage as m}from"../../../base/common/errors.js";import{Disposable as P}from"../../../base/common/lifecycle.js";import{Schemas as D}from"../../../base/common/network.js";import{joinPath as v}from"../../../base/common/resources.js";import*as R from"../../../base/common/semver/semver.js";import"../../../base/common/uri.js";import{generateUuid as f}from"../../../base/common/uuid.js";import{Promises as U}from"../../../base/node/pfs.js";import{buffer as b,CorruptZipMessage as M}from"../../../base/node/zip.js";import{INativeEnvironmentService as G}from"../../environment/common/environment.js";import{toExtensionManagementError as w}from"../common/abstractExtensionManagementService.js";import{ExtensionManagementError as A,ExtensionManagementErrorCode as p,ExtensionSignatureVerificationCode as S,IExtensionGalleryService as C}from"../common/extensionManagement.js";import{ExtensionKey as g,groupByExtension as F}from"../common/extensionManagementUtil.js";import{fromExtractError as V}from"./extensionManagementUtil.js";import{IExtensionSignatureVerificationService as L}from"./extensionSignatureVerificationService.js";import"../../extensions/common/extensions.js";import{IFileService as $}from"../../files/common/files.js";import{ILogService as N}from"../../log/common/log.js";import{ITelemetryService as T}from"../../telemetry/common/telemetry.js";let d=class extends P{constructor(e,t,i,o,a,n){super();this.fileService=t;this.extensionGalleryService=i;this.extensionSignatureVerificationService=o;this.telemetryService=a;this.logService=n;this.extensionsDownloadDir=e.extensionsDownloadLocation,this.cache=20,this.cleanUpPromise=this.cleanUp()}static SignatureArchiveExtension=".sigzip";extensionsDownloadDir;cache;cleanUpPromise;async download(e,t,i,o){await this.cleanUpPromise;const a=await this.downloadVSIX(e,t);if(!i||!e.isSigned)return{location:a,verificationStatus:void 0};let n;try{n=await this.downloadSignatureArchive(e);const r=(await this.extensionSignatureVerificationService.verify(e.identifier.id,e.version,a.fsPath,n.fsPath,o))?.code;if(r===S.PackageIsInvalidZip||r===S.SignatureArchiveIsInvalidZip){try{await this.delete(a)}catch(s){this.logService.error(s)}throw new A(M,p.CorruptZip)}return{location:a,verificationStatus:r}}catch(r){try{await this.delete(a)}catch(s){this.logService.error(s)}throw r}finally{if(n)try{await this.delete(n)}catch(r){this.logService.error(r)}}}async downloadVSIX(e,t){try{const i=v(this.extensionsDownloadDir,this.getName(e)),o=await this.doDownload(e,"vsix",async()=>{await this.downloadFile(e,i,a=>this.extensionGalleryService.download(e,a,t));try{await this.validate(i.fsPath,"extension/package.json")}catch(a){try{await this.fileService.del(i)}catch(n){this.logService.warn(`Error while deleting: ${i.path}`,m(n))}throw a}},2);return o>1&&this.telemetryService.publicLog2("extensiongallery:downloadvsix:retry",{extensionId:e.identifier.id,attempts:o}),i}catch(i){throw w(i,p.Download)}}async downloadSignatureArchive(e){try{const t=v(this.extensionsDownloadDir,`.${f()}`),i=await this.doDownload(e,"sigzip",async()=>{await this.extensionGalleryService.downloadSignatureArchive(e,t);try{await this.validate(t.fsPath,".signature.p7s")}catch(o){try{await this.fileService.del(t)}catch(a){this.logService.warn(`Error while deleting: ${t.path}`,m(a))}throw o}},2);return i>1&&this.telemetryService.publicLog2("extensiongallery:downloadsigzip:retry",{extensionId:e.identifier.id,attempts:i}),t}catch(t){throw w(t,p.DownloadSignature)}}async downloadFile(e,t,i){if(await this.fileService.exists(t))return;if(t.scheme!==D.file){await i(t);return}const o=v(this.extensionsDownloadDir,`.${f()}`);try{await i(o)}catch(a){try{await this.fileService.del(o)}catch{}throw a}try{await U.rename(o.fsPath,t.fsPath,2*60*1e3)}catch(a){try{await this.fileService.del(o)}catch{}let n=!1;try{n=await this.fileService.exists(t)}catch{}if(n)this.logService.info("Rename failed because the file was downloaded by another source. So ignoring renaming.",e.identifier.id,t.path);else throw this.logService.info(`Rename failed because of ${m(a)}. Deleted the file from downloaded location`,o.path),a}}async doDownload(e,t,i,o){let a=1;for(;;)try{return await i(),a}catch(n){if(a++>o)throw n;this.logService.warn(`Failed downloading ${t}. ${m(n)}. Retry again...`,e.identifier.id)}}async validate(e,t){try{await b(e,t)}catch(i){throw V(i)}}async delete(e){await this.cleanUpPromise,await this.fileService.del(e)}async cleanUp(){try{if(!await this.fileService.exists(this.extensionsDownloadDir)){this.logService.trace("Extension VSIX downloads cache dir does not exist");return}const e=await this.fileService.resolve(this.extensionsDownloadDir,{resolveMetadata:!0});if(e.children){const t=[],i=[],o=[];for(const r of e.children)if(r.name.endsWith(d.SignatureArchiveExtension))o.push(r.resource);else{const s=g.parse(r.name);s&&i.push([s,r])}const a=F(i,([r])=>r),n=[];for(const r of a)r.sort((s,u)=>R.rcompare(s[0].version,u[0].version)),t.push(...r.slice(1).map(s=>s[1].resource)),n.push(r[0][1]);n.sort((r,s)=>r.mtime-s.mtime),t.push(...n.slice(0,Math.max(0,n.length-this.cache)).map(r=>r.resource)),t.push(...o),await E.settled(t.map(r=>(this.logService.trace("Deleting from cache",r.path),this.fileService.del(r))))}}catch(e){this.logService.error(e)}}getName(e){return this.cache?g.create(e).toString().toLowerCase():f()}};d=y([l(0,G),l(1,$),l(2,C),l(3,L),l(4,T),l(5,N)],d);export{d as ExtensionsDownloader};
