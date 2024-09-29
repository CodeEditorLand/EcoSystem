var p=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var c=(o,r,e,i)=>{for(var t=i>1?void 0:i?g(r,e):r,n=o.length-1,a;n>=0;n--)(a=o[n])&&(t=(i?a(r,e,t):a(t))||t);return i&&t&&p(r,e,t),t},l=(o,r)=>(e,i)=>r(e,i,o);import*as P from"../../../../base/common/arrays.js";import*as h from"../../../../base/common/objects.js";import{AutoOpenBarrier as _}from"../../../../base/common/async.js";import{throttle as b}from"../../../../base/common/decorators.js";import{Emitter as y}from"../../../../base/common/event.js";import{Disposable as I,MutableDisposable as C,toDisposable as x}from"../../../../base/common/lifecycle.js";import{isMacintosh as S,isWeb as T,isWindows as w,OperatingSystem as u,OS as A}from"../../../../base/common/platform.js";import{ConfigurationTarget as v,IConfigurationService as D}from"../../../../platform/configuration/common/configuration.js";import{IContextKeyService as E}from"../../../../platform/contextkey/common/contextkey.js";import{TerminalSettingPrefix as s,TerminalSettingId as K}from"../../../../platform/terminal/common/terminal.js";import{registerTerminalDefaultProfileConfiguration as N}from"../../../../platform/terminal/common/terminalPlatformConfiguration.js";import{terminalIconsEqual as R,terminalProfileArgsMatch as $}from"../../../../platform/terminal/common/terminalProfiles.js";import{ITerminalInstanceService as M}from"./terminal.js";import{refreshTerminalActions as O}from"./terminalActions.js";import"../common/terminal.js";import{TerminalContextKeys as W}from"../common/terminalContextKey.js";import{ITerminalContributionService as B}from"../common/terminalExtensionPoints.js";import{IWorkbenchEnvironmentService as k}from"../../../services/environment/common/environmentService.js";import{IExtensionService as V}from"../../../services/extensions/common/extensions.js";import{IRemoteAgentService as q}from"../../../services/remote/common/remoteAgentService.js";let m=class extends I{constructor(e,i,t,n,a,f,d){super();this._contextKeyService=e;this._configurationService=i;this._terminalContributionService=t;this._extensionService=n;this._remoteAgentService=a;this._environmentService=f;this._terminalInstanceService=d;this._register(this._extensionService.onDidChangeExtensions(()=>this.refreshAvailableProfiles())),this._webExtensionContributedProfileContextKey=W.webExtensionContributedProfile.bindTo(this._contextKeyService),this._updateWebContextKey(),this._profilesReadyPromise=this._remoteAgentService.getEnvironment().then(()=>(this._profilesReadyBarrier=new _(2e4),this._profilesReadyBarrier.wait().then(()=>{}))),this.refreshAvailableProfiles(),this._setupConfigListener()}_webExtensionContributedProfileContextKey;_profilesReadyBarrier;_profilesReadyPromise;_availableProfiles;_automationProfile;_contributedProfiles=[];_defaultProfileName;_platformConfigJustRefreshed=!1;_refreshTerminalActionsDisposable=this._register(new C);_profileProviders=new Map;_onDidChangeAvailableProfiles=this._register(new y);get onDidChangeAvailableProfiles(){return this._onDidChangeAvailableProfiles.event}get profilesReady(){return this._profilesReadyPromise}get availableProfiles(){return this._platformConfigJustRefreshed||this.refreshAvailableProfiles(),this._availableProfiles||[]}get contributedProfiles(){const e=this._availableProfiles?.map(i=>i.profileName)||[];return this._contributedProfiles?.filter(i=>!e.includes(i.title))||[]}async _setupConfigListener(){const e=await this.getPlatformKey();this._register(this._configurationService.onDidChangeConfiguration(async i=>{(i.affectsConfiguration(s.AutomationProfile+e)||i.affectsConfiguration(s.DefaultProfile+e)||i.affectsConfiguration(s.Profiles+e)||i.affectsConfiguration(K.UseWslProfiles))&&(i.source!==v.DEFAULT?(this.refreshAvailableProfiles(),this._platformConfigJustRefreshed=!1):this._platformConfigJustRefreshed=!0)}))}getDefaultProfileName(){return this._defaultProfileName}getDefaultProfile(e){let i;if(e){if(i=this._configurationService.getValue(`${s.DefaultProfile}${this._getOsKey(e)}`),!i||typeof i!="string")return}else i=this._defaultProfileName;if(i)return this.availableProfiles.find(t=>t.profileName===i&&!t.isAutoDetected)}_getOsKey(e){switch(e){case u.Linux:return"linux";case u.Macintosh:return"osx";case u.Windows:return"windows"}}refreshAvailableProfiles(){this._refreshAvailableProfilesNow()}async _refreshAvailableProfilesNow(){const e=await this._detectProfiles(!0),i=!P.equals(e,this._availableProfiles,j),t=await this._updateContributedProfiles(),n=await this.getPlatformKey(),a=this._configurationService.getValue(`${s.AutomationProfile}${n}`),f=!h.equals(a,this._automationProfile);(i||t||f)&&(this._availableProfiles=e,this._automationProfile=a,this._onDidChangeAvailableProfiles.fire(this._availableProfiles),this._profilesReadyBarrier.open(),this._updateWebContextKey(),await this._refreshPlatformConfig(this._availableProfiles))}async _updateContributedProfiles(){const e=await this.getPlatformKey(),i=[],t=this._configurationService.getValue(s.Profiles+e);for(const[f,d]of Object.entries(t))d===null&&i.push(f);const n=Array.from(this._terminalContributionService.terminalProfiles.filter(f=>!i.includes(f.title))),a=!P.equals(n,this._contributedProfiles,J);return this._contributedProfiles=n,a}getContributedProfileProvider(e,i){return this._profileProviders.get(e)?.get(i)}async _detectProfiles(e){const i=await this._terminalInstanceService.getBackend(this._environmentService.remoteAuthority);if(!i)return this._availableProfiles||[];const t=await this.getPlatformKey();return this._defaultProfileName=this._configurationService.getValue(`${s.DefaultProfile}${t}`)??void 0,i.getProfiles(this._configurationService.getValue(`${s.Profiles}${t}`),this._defaultProfileName,e)}_updateWebContextKey(){this._webExtensionContributedProfileContextKey.set(T&&this._contributedProfiles.length>0)}async _refreshPlatformConfig(e){const i=await this._remoteAgentService.getEnvironment();N({os:i?.os||A,profiles:e},this._contributedProfiles),this._refreshTerminalActionsDisposable.value=O(e)}async getPlatformKey(){const e=await this._remoteAgentService.getEnvironment();return e?e.os===u.Windows?"windows":e.os===u.Macintosh?"osx":"linux":w?"windows":S?"osx":"linux"}registerTerminalProfileProvider(e,i,t){let n=this._profileProviders.get(e);return n||(n=new Map,this._profileProviders.set(e,n)),n.set(i,t),x(()=>this._profileProviders.delete(i))}async registerContributedProfile(e){const i=await this.getPlatformKey(),t=await this._configurationService.getValue(`${s.Profiles}${i}`);if(typeof t=="object"){const n={extensionIdentifier:e.extensionIdentifier,icon:e.options.icon,id:e.id,title:e.title,color:e.options.color};t[e.title]=n}await this._configurationService.updateValue(`${s.Profiles}${i}`,t,v.USER)}async getContributedDefaultProfile(e){if(e&&!e.extHostTerminalId&&!("executable"in e)){const i=await this.getPlatformKey(),t=this._configurationService.getValue(`${s.DefaultProfile}${i}`);return this.contributedProfiles.find(a=>a.title===t)}}};c([b(2e3)],m.prototype,"refreshAvailableProfiles",1),m=c([l(0,E),l(1,D),l(2,B),l(3,V),l(4,q),l(5,k),l(6,M)],m);function j(o,r){return o.profileName===r.profileName&&$(o.args,r.args)&&o.color===r.color&&R(o.icon,r.icon)&&o.isAutoDetected===r.isAutoDetected&&o.isDefault===r.isDefault&&o.overrideName===r.overrideName&&o.path===r.path}function J(o,r){return o.extensionIdentifier===r.extensionIdentifier&&o.color===r.color&&o.icon===r.icon&&o.id===r.id&&o.title===r.title}export{m as TerminalProfileService};
