import{getErrorMessage as F}from"../../../../base/common/errors.js";import"../../../../base/common/uri.js";import{IEnvironmentService as L}from"../../../../platform/environment/common/environment.js";import{IExtensionStorageService as k}from"../../../../platform/extensionManagement/common/extensionStorage.js";import{FileSystemProviderErrorCode as U,IFileService as h}from"../../../../platform/files/common/files.js";import"../../../../platform/instantiation/common/instantiation.js";import{ILogService as M}from"../../../../platform/log/common/log.js";import{IStorageService as K,StorageScope as l,StorageTarget as R}from"../../../../platform/storage/common/storage.js";import{IUriIdentityService as H}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{IUserDataProfilesService as W}from"../../../../platform/userDataProfile/common/userDataProfile.js";import{IWorkspaceContextService as j}from"../../../../platform/workspace/common/workspace.js";async function V(e,r,t,w){return w.invokeFunction(async o=>{const P=o.get(L),$=o.get(W),n=o.get(k),g=o.get(K),S=o.get(H),y=o.get(h),C=o.get(j),m=o.get(M),c=`extensionStorage.migrate.${e}-${r}`,f=e.toLowerCase()===r.toLowerCase()?`extension.storage.migrateFromLowerCaseKey.${e.toLowerCase()}`:void 0;if(e===r)return;const p=(i,a)=>a?S.extUri.joinPath($.defaultProfile.globalStorageHome,i.toLowerCase()):S.extUri.joinPath(P.workspaceStorageHome,C.getWorkspace().id,i),s=t?l.PROFILE:l.WORKSPACE;if(!g.getBoolean(c,s,!1)&&!(f&&g.getBoolean(f,s,!1))){m.info(`Migrating ${t?"global":"workspace"} extension storage from ${e} to ${r}...`);const i=n.getExtensionState(e,t);i&&(n.setExtensionState(r,i,t),n.setExtensionState(e,void 0,t));const a=p(e,t),v=p(r,t);if(!S.extUri.isEqual(a,v))try{await y.move(a,v,!0)}catch(u){u.code!==U.FileNotFound&&m.info(`Error while migrating ${t?"global":"workspace"} file storage from '${e}' to '${r}'`,F(u))}m.info(`Migrated ${t?"global":"workspace"} extension storage from ${e} to ${r}`),g.store(c,!0,s,R.MACHINE)}})}export{V as migrateExtensionStorage};