import"../../../../platform/environment/common/environment.js";import"../../../../platform/ipc/common/mainProcessService.js";import{RemoteStorageService as s}from"../../../../platform/storage/common/storageService.js";import"../../../../platform/userDataProfile/common/userDataProfile.js";import"../../../../platform/workspace/common/workspace.js";import"../../userDataProfile/common/userDataProfile.js";class h extends s{constructor(e,r,i,o,t){super(e,{currentProfile:r.currentProfile,defaultProfile:i.defaultProfile},o,t);this.userDataProfileService=r;this.registerListeners()}registerListeners(){this._register(this.userDataProfileService.onDidChangeCurrentProfile(e=>e.join(this.switchToProfile(e.profile))))}}export{h as NativeWorkbenchStorageService};