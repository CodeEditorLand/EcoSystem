var re=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var C=(l,a,e,i)=>{for(var o=i>1?void 0:i?se(a,e):a,d=l.length-1,c;d>=0;d--)(c=l[d])&&(o=(i?c(a,e,o):c(o))||o);return i&&o&&re(a,e,o),o},n=(l,a)=>(e,i)=>a(e,i,l);import*as t from"../../../../nls.js";import T from"../../../../base/common/severity.js";import{Disposable as G,MutableDisposable as le}from"../../../../base/common/lifecycle.js";import{URI as j}from"../../../../base/common/uri.js";import{IActivityService as ce,NumberBadge as de,ProgressBadge as L}from"../../../services/activity/common/activity.js";import{IInstantiationService as O}from"../../../../platform/instantiation/common/instantiation.js";import{IOpenerService as _}from"../../../../platform/opener/common/opener.js";import"../../../common/contributions.js";import{IStorageService as q,StorageScope as p,StorageTarget as D}from"../../../../platform/storage/common/storage.js";import{IUpdateService as pe,StateType as r,DisablementReason as ue}from"../../../../platform/update/common/update.js";import{INotificationService as F,Severity as W}from"../../../../platform/notification/common/notification.js";import{IDialogService as H}from"../../../../platform/dialogs/common/dialogs.js";import{IBrowserWorkbenchEnvironmentService as Q}from"../../../services/environment/browser/environmentService.js";import{ReleaseNotesManager as ve}from"./releaseNotesEditor.js";import{isMacintosh as me,isWeb as he,isWindows as Se}from"../../../../base/common/platform.js";import{IConfigurationService as Y}from"../../../../platform/configuration/common/configuration.js";import{RawContextKey as k,IContextKeyService as $,ContextKeyExpr as z}from"../../../../platform/contextkey/common/contextkey.js";import{MenuRegistry as S,MenuId as u,registerAction2 as ge,Action2 as ye}from"../../../../platform/actions/common/actions.js";import{CommandsRegistry as v}from"../../../../platform/commands/common/commands.js";import{IHostService as J}from"../../../services/host/browser/host.js";import{IProductService as R}from"../../../../platform/product/common/productService.js";import{IUserDataSyncEnablementService as fe,IUserDataSyncService as Ie,IUserDataSyncStoreManagementService as we,SyncStatus as X}from"../../../../platform/userDataSync/common/userDataSync.js";import{IsWebContext as Z}from"../../../../platform/contextkey/common/contextkeys.js";import{Promises as be}from"../../../../base/common/async.js";import{IUserDataSyncWorkbenchService as Ue}from"../../../services/userDataSync/common/userDataSync.js";import{Event as ee}from"../../../../base/common/event.js";import{Action as Ae}from"../../../../base/common/actions.js";const m=new k("updateState",r.Uninitialized),te=new k("majorMinorUpdateAvailable",!1),Ne=new k("releaseNotesUrl",""),Ce=new k("downloadUrl","");let B;function ie(l,a,e){return B||(B=l.createInstance(ve)),B.show(a,e)}async function Te(l){const a=l.get(_),e=l.get(R);if(e.releaseNotesUrl){const i=j.parse(e.releaseNotesUrl);await a.open(i)}else throw new Error(t.localize("update.noReleaseNotesOnline","This version of {0} does not have release notes online",e.nameLong))}async function E(l,a){const e=l.get(O);try{await ie(e,a,!1)}catch(i){try{await e.invokeFunction(Te)}catch(o){throw new Error(`${i.message} and ${o.message}`)}}}function V(l){const a=/([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(l);if(a)return{major:parseInt(a[1]),minor:parseInt(a[2]),patch:parseInt(a[3])}}function oe(l,a){return l.major<a.major||l.minor<a.minor}let f=class{static KEY="releaseNotes/lastVersion";constructor(a,e,i,o,d,c,I,s,h){s.releaseNotesUrl&&Ne.bindTo(h).set(s.releaseNotesUrl),s.downloadUrl&&Ce.bindTo(h).set(s.downloadUrl),!he&&I.hadLastFocus().then(async w=>{if(!w)return;const b=V(a.get(f.KEY,p.APPLICATION,"")),g=V(s.version),A=c.getValue("update.showReleaseNotes"),y=s.releaseNotesUrl;A&&!o.skipReleaseNotes&&y&&b&&g&&oe(b,g)&&ie(e,s.version,!1).then(void 0,()=>{i.prompt(T.Info,t.localize("read the release notes","Welcome to {0} v{1}! Would you like to read the Release Notes?",s.nameLong,s.version),[{label:t.localize("releaseNotes","Release Notes"),run:()=>{const P=j.parse(y);d.open(P)}}])}),a.store(f.KEY,s.version,p.APPLICATION,D.MACHINE)})}};f=C([n(0,q),n(1,O),n(2,F),n(3,Q),n(4,_),n(5,Y),n(6,J),n(7,R),n(8,$)],f);let x=class extends G{constructor(e,i,o,d,c,I,s,h,w,b,g){super();this.storageService=e;this.instantiationService=i;this.notificationService=o;this.dialogService=d;this.updateService=c;this.activityService=I;this.contextKeyService=s;this.productService=h;this.openerService=w;this.configurationService=b;this.hostService=g;this.state=c.state,this.updateStateContextKey=m.bindTo(this.contextKeyService),this.majorMinorUpdateAvailableContextKey=te.bindTo(this.contextKeyService),this._register(c.onStateChange(this.onUpdateStateChange,this)),this.onUpdateStateChange(this.updateService.state);const A=this.productService.commit,y=this.storageService.get("update/lastKnownVersion",p.APPLICATION);A!==y&&(this.storageService.remove("update/lastKnownVersion",p.APPLICATION),this.storageService.remove("update/updateNotificationTime",p.APPLICATION)),this.registerGlobalActivityActions()}state;badgeDisposable=this._register(new le);updateStateContextKey;majorMinorUpdateAvailableContextKey;async onUpdateStateChange(e){switch(this.updateStateContextKey.set(e.type),e.type){case r.Disabled:e.reason===ue.RunningAsAdmin&&this.notificationService.notify({severity:W.Info,message:t.localize("update service disabled","Updates are disabled because you are running the user-scope installation of {0} as Administrator.",this.productService.nameLong),actions:{primary:[new Ae("",t.localize("learn more","Learn More"),void 0,void 0,()=>{this.openerService.open("https://aka.ms/vscode-windows-setup")})]},neverShowAgain:{id:"no-updates-running-as-admin"}});break;case r.Idle:e.error?this.onError(e.error):this.state.type===r.CheckingForUpdates&&this.state.explicit&&await this.hostService.hadLastFocus()&&this.onUpdateNotAvailable();break;case r.AvailableForDownload:this.onUpdateAvailable(e.update);break;case r.Downloaded:this.onUpdateDownloaded(e.update);break;case r.Ready:{const d=e.update.productVersion;if(d){const c=V(this.productService.version),I=V(d);this.majorMinorUpdateAvailableContextKey.set(!!(c&&I&&oe(c,I))),this.onUpdateReady(e.update)}break}}let i,o;e.type===r.AvailableForDownload||e.type===r.Downloaded||e.type===r.Ready?i=new de(1,()=>t.localize("updateIsReady","New {0} update available.",this.productService.nameShort)):e.type===r.CheckingForUpdates?(i=new L(()=>t.localize("checkingForUpdates","Checking for Updates...")),o=1):e.type===r.Downloading?(i=new L(()=>t.localize("downloading","Downloading...")),o=1):e.type===r.Updating&&(i=new L(()=>t.localize("updating","Updating...")),o=1),this.badgeDisposable.clear(),i&&(this.badgeDisposable.value=this.activityService.showGlobalActivity({badge:i,priority:o})),this.state=e}onError(e){/The request timed out|The network connection was lost/i.test(e)||(e=e.replace(/See https:\/\/github\.com\/Squirrel\/Squirrel\.Mac\/issues\/182 for more information/,"This might mean the application was put on quarantine by macOS. See [this link](https://github.com/microsoft/vscode/issues/7426#issuecomment-425093469) for more information"),this.notificationService.notify({severity:W.Error,message:e,source:t.localize("update service","Update Service")}))}onUpdateNotAvailable(){this.dialogService.info(t.localize("noUpdatesAvailable","There are currently no updates available."))}onUpdateAvailable(e){if(!this.shouldShowNotification())return;const i=e.productVersion;i&&this.notificationService.prompt(T.Info,t.localize("thereIsUpdateAvailable","There is an available update."),[{label:t.localize("download update","Download Update"),run:()=>this.updateService.downloadUpdate()},{label:t.localize("later","Later"),run:()=>{}},{label:t.localize("releaseNotes","Release Notes"),run:()=>{this.instantiationService.invokeFunction(o=>E(o,i))}}])}onUpdateDownloaded(e){if(me||this.configurationService.getValue("update.enableWindowsBackgroundUpdates")&&this.productService.target==="user"||!this.shouldShowNotification())return;const i=e.productVersion;i&&this.notificationService.prompt(T.Info,t.localize("updateAvailable","There's an update available: {0} {1}",this.productService.nameLong,i),[{label:t.localize("installUpdate","Install Update"),run:()=>this.updateService.applyUpdate()},{label:t.localize("later","Later"),run:()=>{}},{label:t.localize("releaseNotes","Release Notes"),run:()=>{this.instantiationService.invokeFunction(o=>E(o,i))}}])}onUpdateReady(e){if(!(Se&&this.productService.target!=="user")&&!this.shouldShowNotification())return;const i=[{label:t.localize("updateNow","Update Now"),run:()=>this.updateService.quitAndInstall()},{label:t.localize("later","Later"),run:()=>{}}],o=e.productVersion;o&&i.push({label:t.localize("releaseNotes","Release Notes"),run:()=>{this.instantiationService.invokeFunction(d=>E(d,o))}}),this.notificationService.prompt(T.Info,t.localize("updateAvailableAfterRestart","Restart {0} to apply the latest update.",this.productService.nameLong),i,{sticky:!0})}shouldShowNotification(){const e=this.productService.commit,i=new Date().getTime(),o=this.storageService.get("update/lastKnownVersion",p.APPLICATION);e!==o&&(this.storageService.store("update/lastKnownVersion",e,p.APPLICATION,D.MACHINE),this.storageService.store("update/updateNotificationTime",i,p.APPLICATION,D.MACHINE));const d=this.storageService.getNumber("update/updateNotificationTime",p.APPLICATION,i);return(i-d)/(1e3*60*60*24)>5}registerGlobalActivityActions(){v.registerCommand("update.check",()=>this.updateService.checkForUpdates(!0)),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.check",title:t.localize("checkForUpdates","Check for Updates...")},when:m.isEqualTo(r.Idle)}),v.registerCommand("update.checking",()=>{}),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.checking",title:t.localize("checkingForUpdates","Checking for Updates..."),precondition:z.false()},when:m.isEqualTo(r.CheckingForUpdates)}),v.registerCommand("update.downloadNow",()=>this.updateService.downloadUpdate()),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.downloadNow",title:t.localize("download update_1","Download Update (1)")},when:m.isEqualTo(r.AvailableForDownload)}),v.registerCommand("update.downloading",()=>{}),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.downloading",title:t.localize("DownloadingUpdate","Downloading Update..."),precondition:z.false()},when:m.isEqualTo(r.Downloading)}),v.registerCommand("update.install",()=>this.updateService.applyUpdate()),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.install",title:t.localize("installUpdate...","Install Update... (1)")},when:m.isEqualTo(r.Downloaded)}),v.registerCommand("update.updating",()=>{}),S.appendMenuItem(u.GlobalActivity,{group:"7_update",command:{id:"update.updating",title:t.localize("installingUpdate","Installing Update..."),precondition:z.false()},when:m.isEqualTo(r.Updating)}),this.productService.quality==="stable"&&(v.registerCommand("update.showUpdateReleaseNotes",()=>{if(this.updateService.state.type!==r.Ready)return;const e=this.updateService.state.update.productVersion;e&&this.instantiationService.invokeFunction(i=>E(i,e))}),S.appendMenuItem(u.GlobalActivity,{group:"7_update",order:1,command:{id:"update.showUpdateReleaseNotes",title:t.localize("showUpdateReleaseNotes","Show Update Release Notes")},when:z.and(m.isEqualTo(r.Ready),te)})),v.registerCommand("update.restart",()=>this.updateService.quitAndInstall()),S.appendMenuItem(u.GlobalActivity,{group:"7_update",order:2,command:{id:"update.restart",title:t.localize("restartToUpdate","Restart to Update (1)")},when:m.isEqualTo(r.Ready)}),v.registerCommand("_update.state",()=>this.state)}};x=C([n(0,q),n(1,O),n(2,F),n(3,H),n(4,pe),n(5,ce),n(6,$),n(7,R),n(8,_),n(9,Y),n(10,J)],x);let M=class extends G{constructor(e,i){super();this.productService=e;this.environmentService=i;this.registerGlobalActivityActions()}registerGlobalActivityActions(){const e=this.productService.quality,i=this.environmentService.options?.productQualityChangeHandler;if(i&&(e==="stable"||e==="insider")){const o=e==="stable"?"insider":"stable",d=`update.switchQuality.${o}`,c=o==="insider";this._register(ge(class extends ye{constructor(){super({id:d,title:c?t.localize("switchToInsiders","Switch to Insiders Version..."):t.localize("switchToStable","Switch to Stable Version..."),precondition:Z,menu:{id:u.GlobalActivity,when:Z,group:"7_update"}})}async run(s){const h=s.get(H),w=s.get(fe),b=s.get(we),g=s.get(q),A=s.get(Ue),y=s.get(Ie),P=s.get(F);try{const N="switchQuality.selectSettingsSyncServiceDialogShown",ae=b.userDataSyncStore;let U;if(ae&&c&&w.isEnabled()&&!g.getBoolean(N,p.APPLICATION,!1)){if(U=await this.selectSettingsSyncService(h),!U)return;g.store(N,!0,p.APPLICATION,D.USER),U==="stable"&&await b.switch(U)}if((await h.confirm({type:"info",message:t.localize("relaunchMessage","Changing the version requires a reload to take effect"),detail:o==="insider"?t.localize("relaunchDetailInsiders","Press the reload button to switch to the Insiders version of VS Code."):t.localize("relaunchDetailStable","Press the reload button to switch to the Stable version of VS Code."),primaryButton:t.localize({key:"reload",comment:["&& denotes a mnemonic"]},"&&Reload")})).confirmed){const K=[];y.status===X.Syncing&&K.push(ee.toPromise(ee.filter(y.onDidChangeStatus,ne=>ne!==X.Syncing))),c&&U&&K.push(A.synchroniseUserDataSyncStoreType()),await be.settled(K),i(o)}else U&&g.remove(N,p.APPLICATION)}catch(N){P.error(N)}}async selectSettingsSyncService(s){const{result:h}=await s.prompt({type:W.Info,message:t.localize("selectSyncService.message","Choose the settings sync service to use after changing the version"),detail:t.localize("selectSyncService.detail","The Insiders version of VS Code will synchronize your settings, keybindings, extensions, snippets and UI State using separate insiders settings sync service by default."),buttons:[{label:t.localize({key:"use insiders",comment:["&& denotes a mnemonic"]},"&&Insiders"),run:()=>"insiders"},{label:t.localize({key:"use stable",comment:["&& denotes a mnemonic"]},"&&Stable (current)"),run:()=>"stable"}],cancelButton:!0});return h}}))}}};M=C([n(0,R),n(1,Q)],M);export{m as CONTEXT_UPDATE_STATE,Ce as DOWNLOAD_URL,te as MAJOR_MINOR_UPDATE_AVAILABLE,f as ProductContribution,Ne as RELEASE_NOTES_URL,M as SwitchProductQualityContribution,x as UpdateContribution,ie as showReleaseNotesInEditor};