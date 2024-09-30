var p=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var m=(n,e,i,t)=>{for(var r=t>1?void 0:t?v(e,i):e,a=n.length-1,l;a>=0;a--)(l=n[a])&&(r=(t?l(e,i,r):l(r))||r);return t&&r&&p(e,i,r),r},s=(n,e)=>(i,t)=>e(i,t,n);import{IStorageService as f,StorageScope as h}from"../../../../platform/storage/common/storage.js";import{IFileService as S}from"../../../../platform/files/common/files.js";import"../../../../platform/instantiation/common/instantiation.js";import{ILogService as I}from"../../../../platform/log/common/log.js";import{Barrier as u,Promises as d}from"../../../../base/common/async.js";import{IUriIdentityService as P}from"../../../../platform/uriIdentity/common/uriIdentity.js";import"../../userData/browser/userDataInit.js";import{IUserDataProfileService as z}from"../common/userDataProfile.js";import{SettingsResourceInitializer as g}from"./settingsResource.js";import{GlobalStateResourceInitializer as y}from"./globalStateResource.js";import{KeybindingsResourceInitializer as T}from"./keybindingsResource.js";import{TasksResourceInitializer as w}from"./tasksResource.js";import{SnippetsResourceInitializer as D}from"./snippetsResource.js";import{ExtensionsResourceInitializer as R}from"./extensionsResource.js";import{IBrowserWorkbenchEnvironmentService as U}from"../../environment/browser/environmentService.js";import{isString as E}from"../../../../base/common/types.js";import{IRequestService as x,asJson as b}from"../../../../platform/request/common/request.js";import{CancellationToken as k}from"../../../../base/common/cancellation.js";import{URI as q}from"../../../../base/common/uri.js";import{ProfileResourceType as o}from"../../../../platform/userDataProfile/common/userDataProfile.js";let c=class{constructor(e,i,t,r,a,l,F){this.environmentService=e;this.fileService=i;this.userDataProfileService=t;this.storageService=r;this.logService=a;this.uriIdentityService=l;this.requestService=F}_serviceBrand;initialized=[];initializationFinished=new u;async whenInitializationFinished(){await this.initializationFinished.wait()}async requiresInitialization(){return!(!this.environmentService.options?.profile?.contents||!this.storageService.isNew(h.PROFILE))}async initializeRequiredResources(){this.logService.trace("UserDataProfileInitializer#initializeRequiredResources");const e=[],i=await this.getProfileTemplate();i?.settings&&e.push(this.initialize(new g(this.userDataProfileService,this.fileService,this.logService),i.settings,o.Settings)),i?.globalState&&e.push(this.initialize(new y(this.storageService),i.globalState,o.GlobalState)),await Promise.all(e)}async initializeOtherResources(e){try{this.logService.trace("UserDataProfileInitializer#initializeOtherResources");const i=[],t=await this.getProfileTemplate();t?.keybindings&&i.push(this.initialize(new T(this.userDataProfileService,this.fileService,this.logService),t.keybindings,o.Keybindings)),t?.tasks&&i.push(this.initialize(new w(this.userDataProfileService,this.fileService,this.logService),t.tasks,o.Tasks)),t?.snippets&&i.push(this.initialize(new D(this.userDataProfileService,this.fileService,this.uriIdentityService),t.snippets,o.Snippets)),i.push(this.initializeInstalledExtensions(e)),await d.settled(i)}finally{this.initializationFinished.open()}}initializeInstalledExtensionsPromise;async initializeInstalledExtensions(e){if(!this.initializeInstalledExtensionsPromise){const i=await this.getProfileTemplate();i?.extensions?this.initializeInstalledExtensionsPromise=this.initialize(e.createInstance(R),i.extensions,o.Extensions):this.initializeInstalledExtensionsPromise=Promise.resolve()}return this.initializeInstalledExtensionsPromise}profileTemplatePromise;getProfileTemplate(){return this.profileTemplatePromise||(this.profileTemplatePromise=this.doGetProfileTemplate()),this.profileTemplatePromise}async doGetProfileTemplate(){if(!this.environmentService.options?.profile?.contents)return null;if(E(this.environmentService.options.profile.contents))try{return JSON.parse(this.environmentService.options.profile.contents)}catch(e){return this.logService.error(e),null}try{const e=q.revive(this.environmentService.options.profile.contents).toString(!0),i=await this.requestService.request({type:"GET",url:e},k.None);if(i.res.statusCode===200)return await b(i);this.logService.warn(`UserDataProfileInitializer: Failed to get profile from URL: ${e}. Status code: ${i.res.statusCode}.`)}catch(e){this.logService.error(e)}return null}async initialize(e,i,t){try{if(this.initialized.includes(t)){this.logService.info(`UserDataProfileInitializer: ${t} initialized already.`);return}this.initialized.push(t),this.logService.trace(`UserDataProfileInitializer: Initializing ${t}`),await e.initialize(i),this.logService.info(`UserDataProfileInitializer: Initialized ${t}`)}catch(r){this.logService.info(`UserDataProfileInitializer: Error while initializing ${t}`),this.logService.error(r)}}};c=m([s(0,U),s(1,S),s(2,z),s(3,f),s(4,I),s(5,P),s(6,x)],c);export{c as UserDataProfileInitializer};