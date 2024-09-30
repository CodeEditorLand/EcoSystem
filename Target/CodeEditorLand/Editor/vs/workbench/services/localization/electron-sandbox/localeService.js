var S=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var d=(o,e,a,r)=>{for(var t=r>1?void 0:r?f(e,a):e,n=o.length-1,v;n>=0;n--)(v=o[n])&&(t=(r?v(e,a,t):v(t))||t);return r&&t&&S(e,a,t),t},i=(o,e)=>(a,r)=>e(a,r,o);import{Language as g,LANGUAGE_DEFAULT as h}from"../../../../base/common/platform.js";import{IEnvironmentService as I}from"../../../../platform/environment/common/environment.js";import{INotificationService as y,Severity as w}from"../../../../platform/notification/common/notification.js";import{IJSONEditingService as P}from"../../configuration/common/jsonEditing.js";import{IActiveLanguagePackService as L,ILocaleService as E}from"../common/locale.js";import{ILanguagePackService as m}from"../../../../platform/languagePacks/common/languagePacks.js";import{IPaneCompositePartService as x}from"../../panecomposite/browser/panecomposite.js";import{ViewContainerLocation as D}from"../../../common/views.js";import{IExtensionManagementService as C}from"../../../../platform/extensionManagement/common/extensionManagement.js";import{IProgressService as V,ProgressLocation as b}from"../../../../platform/progress/common/progress.js";import{localize as s}from"../../../../nls.js";import{toAction as R}from"../../../../base/common/actions.js";import{ITextFileService as F}from"../../textfile/common/textfiles.js";import{parse as T}from"../../../../base/common/jsonc.js";import{IEditorService as k}from"../../editor/common/editorService.js";import{IHostService as M}from"../../host/browser/host.js";import{IDialogService as A}from"../../../../platform/dialogs/common/dialogs.js";import{IProductService as _}from"../../../../platform/product/common/productService.js";import{InstantiationType as p,registerSingleton as u}from"../../../../platform/instantiation/common/extensions.js";const O="workbench.view.extensions";let c=class{constructor(e,a,r,t,n,v,B,G,U,j,H,J){this.jsonEditingService=e;this.environmentService=a;this.notificationService=r;this.languagePackService=t;this.paneCompositePartService=n;this.extensionManagementService=v;this.progressService=B;this.textFileService=G;this.editorService=U;this.dialogService=j;this.hostService=H;this.productService=J}_serviceBrand;async validateLocaleFile(){try{const e=await this.textFileService.read(this.environmentService.argvResource,{encoding:"utf8"});T(e.value)}catch{return this.notificationService.notify({severity:w.Error,message:s("argvInvalid","Unable to write display language. Please open the runtime settings, correct errors/warnings in it and try again."),actions:{primary:[R({id:"openArgv",label:s("openArgv","Open Runtime Settings"),run:()=>this.editorService.openEditor({resource:this.environmentService.argvResource})})]}}),!1}return!0}async writeLocaleValue(e){return await this.validateLocaleFile()?(await this.jsonEditingService.write(this.environmentService.argvResource,[{path:["locale"],value:e}],!0),!0):!1}async setLocale(e,a=!1){const r=e.id;if(r===g.value()||!r&&g.isDefaultVariant())return;const t=await this.languagePackService.getInstalledLanguages();try{if(!t.some(n=>n.id===e.id)){if(e.galleryExtension?.publisher.toLowerCase()!=="ms-ceintl"){((await this.paneCompositePartService.openPaneComposite(O,D.Sidebar))?.getViewPaneContainer()).search(`@id:${e.extensionId}`);return}await this.progressService.withProgress({location:b.Notification,title:s("installing","Installing {0} language support...",e.label)},n=>this.extensionManagementService.installFromGallery(e.galleryExtension,{isMachineScoped:!1}))}if(!a&&!await this.showRestartDialog(e.label))return;await this.writeLocaleValue(r),await this.hostService.restart()}catch(n){this.notificationService.error(n)}}async clearLocalePreference(){try{await this.writeLocaleValue(void 0),g.isDefaultVariant()||await this.showRestartDialog("English")}catch(e){this.notificationService.error(e)}}async showRestartDialog(e){const{confirmed:a}=await this.dialogService.confirm({message:s("restartDisplayLanguageMessage1","Restart {0} to switch to {1}?",this.productService.nameLong,e),detail:s("restartDisplayLanguageDetail1","To change the display language to {0}, {1} needs to restart.",e,this.productService.nameLong),primaryButton:s({key:"restart",comment:["&& denotes a mnemonic character"]},"&&Restart")});return a}};c=d([i(0,P),i(1,I),i(2,y),i(3,m),i(4,x),i(5,C),i(6,V),i(7,F),i(8,k),i(9,A),i(10,M),i(11,_)],c);let l=class{constructor(e){this.languagePackService=e}_serviceBrand;async getExtensionIdProvidingCurrentLocale(){const e=g.value();return e===h?void 0:(await this.languagePackService.getInstalledLanguages()).find(t=>t.id===e)?.extensionId}};l=d([i(0,m)],l),u(E,c,p.Delayed),u(L,l,p.Delayed);