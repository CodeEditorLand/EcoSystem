var b=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var m=(r,s,e,n)=>{for(var t=n>1?void 0:n?R(s,e):s,i=r.length-1,o;i>=0;i--)(o=r[i])&&(t=(n?o(s,e,t):o(t))||t);return n&&t&&b(s,e,t),t},c=(r,s)=>(e,n)=>s(e,n,r);import{ExtensionIdentifier as S,ExtensionType as I,TargetPlatform as v}from"../../../../platform/extensions/common/extensions.js";import{InstallOperation as P,IExtensionGalleryService as D}from"../../../../platform/extensionManagement/common/extensionManagement.js";import{URI as f}from"../../../../base/common/uri.js";import{Emitter as T,Event as x}from"../../../../base/common/event.js";import{areSameExtensions as w,getGalleryExtensionId as y}from"../../../../platform/extensionManagement/common/extensionManagementUtil.js";import{IWebExtensionsScannerService as L}from"./extensionManagement.js";import{ILogService as M}from"../../../../platform/log/common/log.js";import"../../../../base/common/cancellation.js";import{AbstractExtensionManagementService as k,AbstractExtensionTask as U,toExtensionManagementError as C}from"../../../../platform/extensionManagement/common/abstractExtensionManagementService.js";import{ITelemetryService as A}from"../../../../platform/telemetry/common/telemetry.js";import{IExtensionManifestPropertiesService as V}from"../../extensions/common/extensionManifestPropertiesService.js";import{IProductService as G}from"../../../../platform/product/common/productService.js";import{isBoolean as _,isUndefined as O}from"../../../../base/common/types.js";import{IUserDataProfileService as B}from"../../userDataProfile/common/userDataProfile.js";import{delta as W}from"../../../../base/common/arrays.js";import{compare as $}from"../../../../base/common/strings.js";import{IUserDataProfilesService as F}from"../../../../platform/userDataProfile/common/userDataProfile.js";import{IUriIdentityService as K}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{DisposableStore as N}from"../../../../base/common/lifecycle.js";let h=class extends k{constructor(e,n,t,i,o,l,a,d,E){super(e,n,E,t,a,d);this.webExtensionsScannerService=i;this.extensionManifestPropertiesService=o;this.userDataProfileService=l;this._register(l.onDidChangeCurrentProfile(u=>{this.uriIdentityService.extUri.isEqual(u.previous.extensionsResource,u.profile.extensionsResource)||u.join(this.whenProfileChanged(u))}))}disposables=this._register(new N);get onProfileAwareInstallExtension(){return super.onInstallExtension}get onInstallExtension(){return x.filter(this.onProfileAwareInstallExtension,e=>this.filterEvent(e),this.disposables)}get onProfileAwareDidInstallExtensions(){return super.onDidInstallExtensions}get onDidInstallExtensions(){return x.filter(x.map(this.onProfileAwareDidInstallExtensions,e=>e.filter(n=>this.filterEvent(n)),this.disposables),e=>e.length>0,this.disposables)}get onProfileAwareUninstallExtension(){return super.onUninstallExtension}get onUninstallExtension(){return x.filter(this.onProfileAwareUninstallExtension,e=>this.filterEvent(e),this.disposables)}get onProfileAwareDidUninstallExtension(){return super.onDidUninstallExtension}get onDidUninstallExtension(){return x.filter(this.onProfileAwareDidUninstallExtension,e=>this.filterEvent(e),this.disposables)}_onDidChangeProfile=this._register(new T);onDidChangeProfile=this._onDidChangeProfile.event;get onProfileAwareDidUpdateExtensionMetadata(){return super.onDidUpdateExtensionMetadata}filterEvent({profileLocation:e,applicationScoped:n}){return e=e??this.userDataProfileService.currentProfile.extensionsResource,n||this.uriIdentityService.extUri.isEqual(this.userDataProfileService.currentProfile.extensionsResource,e)}async getTargetPlatform(){return v.WEB}async canInstall(e){return!!(await super.canInstall(e)||this.isConfiguredToExecuteOnWeb(e))}async getInstalled(e,n){const t=[];if(e===void 0||e===I.System){const i=await this.webExtensionsScannerService.scanSystemExtensions();t.push(...i)}if(e===void 0||e===I.User){const i=await this.webExtensionsScannerService.scanUserExtensions(n??this.userDataProfileService.currentProfile.extensionsResource);t.push(...i)}return t.map(i=>p(i))}async install(e,n={}){this.logService.trace("ExtensionManagementService#install",e.toString());const t=await this.webExtensionsScannerService.scanExtensionManifest(e);if(!t||!t.name||!t.version)throw new Error(`Cannot find a valid extension from the location ${e.toString()}`);const i=await this.installExtensions([{manifest:t,extension:e,options:n}]);if(i[0]?.local)return i[0]?.local;throw i[0]?.error?i[0].error:C(new Error(`Unknown error while installing extension ${y(t.publisher,t.name)}`))}installFromLocation(e,n){return this.install(e,{profileLocation:n})}async copyExtension(e,n,t,i){const o=await this.webExtensionsScannerService.scanExistingExtension(e.location,e.type,t);i={...(await this.webExtensionsScannerService.scanExistingExtension(e.location,e.type,n))?.metadata,...i};let a;return o?a=await this.webExtensionsScannerService.updateMetadata(e,{...o.metadata,...i},t):a=await this.webExtensionsScannerService.addExtension(e.location,i,t),p(a)}async installExtensionsFromProfile(e,n,t){const i=[],o=(await this.webExtensionsScannerService.scanUserExtensions(n)).filter(l=>e.some(a=>w(a,l.identifier)));return o.length&&await Promise.allSettled(o.map(async l=>{let a=await this.installFromLocation(l.location,t);l.metadata&&(a=await this.updateMetadata(a,l.metadata,n)),i.push(a)})),i}async updateMetadata(e,n,t){n.isMachineScoped===!1&&(n.isMachineScoped=void 0),n.isBuiltin===!1&&(n.isBuiltin=void 0),n.pinned===!1&&(n.pinned=void 0);const i=await this.webExtensionsScannerService.updateMetadata(e,n,t),o=p(i);return this._onDidUpdateExtensionMetadata.fire({local:o,profileLocation:t}),o}async copyExtensions(e,n){await this.webExtensionsScannerService.copyExtensions(e,n,t=>!t.metadata?.isApplicationScoped)}async getCompatibleVersion(e,n,t,i){const o=await super.getCompatibleVersion(e,n,t,i);return o||(this.isConfiguredToExecuteOnWeb(e)?e:null)}isConfiguredToExecuteOnWeb(e){const n=this.extensionManifestPropertiesService.getUserConfiguredExtensionKind(e.identifier);return!!n&&n.includes("web")}getCurrentExtensionsManifestLocation(){return this.userDataProfileService.currentProfile.extensionsResource}createInstallExtensionTask(e,n,t){return new q(e,n,t,this.webExtensionsScannerService,this.userDataProfilesService)}createUninstallExtensionTask(e,n){return new j(e,n,this.webExtensionsScannerService)}zip(e){throw new Error("unsupported")}getManifest(e){throw new Error("unsupported")}download(){throw new Error("unsupported")}reinstallFromGallery(){throw new Error("unsupported")}async cleanUp(){}async whenProfileChanged(e){const n=e.previous.extensionsResource,t=e.profile.extensionsResource;if(!n||!t)throw new Error("This should not happen");const i=await this.webExtensionsScannerService.scanUserExtensions(n),o=await this.webExtensionsScannerService.scanUserExtensions(t),{added:l,removed:a}=W(i,o,(d,E)=>$(`${S.toKey(d.identifier.id)}@${d.manifest.version}`,`${S.toKey(E.identifier.id)}@${E.manifest.version}`));this._onDidChangeProfile.fire({added:l.map(d=>p(d)),removed:a.map(d=>p(d))})}};h=m([c(0,D),c(1,A),c(2,M),c(3,L),c(4,V),c(5,B),c(6,G),c(7,F),c(8,K)],h);function p(r){const s=g(void 0,r);return{...r,identifier:{id:r.identifier.id,uuid:s.id??r.identifier.uuid},isMachineScoped:!!s.isMachineScoped,isApplicationScoped:!!s.isApplicationScoped,publisherId:s.publisherId||null,publisherDisplayName:s.publisherDisplayName,installedTimestamp:s.installedTimestamp,isPreReleaseVersion:!!s.isPreReleaseVersion,hasPreReleaseVersion:!!s.hasPreReleaseVersion,preRelease:!!s.preRelease,targetPlatform:v.WEB,updated:!!s.updated,pinned:!!s?.pinned,isWorkspaceScoped:!1,source:s?.source??(r.identifier.uuid?"gallery":"resource")}}function g(r,s){const e={...s?.metadata||{}};return e.isMachineScoped=r?.isMachineScoped||e.isMachineScoped,e}class q extends U{constructor(e,n,t,i,o){super();this.manifest=e;this.extension=n;this.options=t;this.webExtensionsScannerService=i;this.userDataProfilesService=o;this.identifier=f.isUri(n)?{id:y(e.publisher,e.name)}:n.identifier,this.source=n}identifier;source;_profileLocation=this.options.profileLocation;get profileLocation(){return this._profileLocation}_operation=P.Install;get operation(){return O(this.options.operation)?this._operation:this.options.operation}async doRun(e){const t=(await this.webExtensionsScannerService.scanUserExtensions(this.options.profileLocation)).find(l=>w(l.identifier,this.identifier));t&&(this._operation=P.Update);const i=g(this.options,t);f.isUri(this.extension)||(i.id=this.extension.identifier.uuid,i.publisherDisplayName=this.extension.publisherDisplayName,i.publisherId=this.extension.publisherId,i.installedTimestamp=Date.now(),i.isPreReleaseVersion=this.extension.properties.isPreReleaseVersion,i.hasPreReleaseVersion=i.hasPreReleaseVersion||this.extension.properties.isPreReleaseVersion,i.isBuiltin=this.options.isBuiltin||t?.isBuiltin,i.isSystem=t?.type===I.System?!0:void 0,i.updated=!!t,i.isApplicationScoped=this.options.isApplicationScoped||i.isApplicationScoped,i.preRelease=_(this.options.preRelease)?this.options.preRelease:this.options.installPreReleaseVersion||this.extension.properties.isPreReleaseVersion||i.preRelease,i.source=f.isUri(this.extension)?"resource":"gallery"),i.pinned=this.options.installGivenVersion?!0:this.options.pinned??i.pinned,this._profileLocation=i.isApplicationScoped?this.userDataProfilesService.defaultProfile.extensionsResource:this.options.profileLocation;const o=f.isUri(this.extension)?await this.webExtensionsScannerService.addExtension(this.extension,i,this.profileLocation):await this.webExtensionsScannerService.addExtensionFromGallery(this.extension,i,this.profileLocation);return p(o)}}class j extends U{constructor(e,n,t){super();this.extension=e;this.options=n;this.webExtensionsScannerService=t}doRun(e){return this.webExtensionsScannerService.removeExtension(this.extension,this.options.profileLocation)}}export{h as WebExtensionManagementService};