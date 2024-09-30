var R=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var s=(a,e,i,n)=>{for(var g=n>1?void 0:n?y(e,i):e,l=a.length-1,p;l>=0;l--)(p=a[l])&&(g=(n?p(e,i,g):p(g))||g);return n&&g&&R(e,i,g),g};import{toLocalISOString as H}from"../../../base/common/date.js";import{memoize as t}from"../../../base/common/decorators.js";import{FileAccess as I,Schemas as U}from"../../../base/common/network.js";import{dirname as O,join as d,normalize as f,resolve as m}from"../../../base/common/path.js";import{env as h}from"../../../base/common/process.js";import{joinPath as u}from"../../../base/common/resources.js";import{URI as o}from"../../../base/common/uri.js";import"./argv.js";import"./environment.js";import"../../product/common/productService.js";const x=/^([^.]+\..+)[:=](.+)$/;class r{constructor(e,i,n){this._args=e;this.paths=i;this.productService=n}get appRoot(){return O(I.asFileUri("").fsPath)}get userHome(){return o.file(this.paths.homeDir)}get userDataPath(){return this.paths.userDataDir}get appSettingsHome(){return o.file(d(this.userDataPath,"User"))}get tmpDir(){return o.file(this.paths.tmpDir)}get cacheHome(){return o.file(this.userDataPath)}get stateResource(){return u(this.appSettingsHome,"globalStorage","storage.json")}get userRoamingDataHome(){return this.appSettingsHome.with({scheme:U.vscodeUserData})}get userDataSyncHome(){return u(this.appSettingsHome,"sync")}get logsHome(){if(!this.args.logsPath){const e=H(new Date).replace(/-|:|\.\d+Z$/g,"");this.args.logsPath=d(this.userDataPath,"logs",e)}return o.file(this.args.logsPath)}get sync(){return this.args.sync}get machineSettingsResource(){return u(o.file(d(this.userDataPath,"Machine")),"settings.json")}get workspaceStorageHome(){return u(this.appSettingsHome,"workspaceStorage")}get localHistoryHome(){return u(this.appSettingsHome,"History")}get keyboardLayoutResource(){return u(this.userRoamingDataHome,"keyboardLayout.json")}get argvResource(){const e=h.VSCODE_PORTABLE;return e?o.file(d(e,"argv.json")):u(this.userHome,this.productService.dataFolderName,"argv.json")}get isExtensionDevelopment(){return!!this.args.extensionDevelopmentPath}get untitledWorkspacesHome(){return o.file(d(this.userDataPath,"Workspaces"))}get builtinExtensionsPath(){const e=this.args["builtin-extensions-dir"];return e?m(e):f(d(I.asFileUri("").fsPath,"..","extensions"))}get extensionsDownloadLocation(){const e=this.args["extensions-download-dir"];return e?o.file(m(e)):o.file(d(this.userDataPath,"CachedExtensionVSIXs"))}get extensionsPath(){const e=this.args["extensions-dir"];if(e)return m(e);const i=h.VSCODE_EXTENSIONS;if(i)return i;const n=h.VSCODE_PORTABLE;return n?d(n,"extensions"):u(this.userHome,this.productService.dataFolderName,"extensions").fsPath}get extensionDevelopmentLocationURI(){const e=this.args.extensionDevelopmentPath;if(Array.isArray(e))return e.map(i=>/^[^:/?#]+?:\/\//.test(i)?o.parse(i):o.file(f(i)))}get extensionDevelopmentKind(){return this.args.extensionDevelopmentKind?.map(e=>e==="ui"||e==="workspace"||e==="web"?e:"workspace")}get extensionTestsLocationURI(){const e=this.args.extensionTestsPath;if(e)return/^[^:/?#]+?:\/\//.test(e)?o.parse(e):o.file(f(e))}get disableExtensions(){if(this.args["disable-extensions"])return!0;const e=this.args["disable-extension"];if(e){if(typeof e=="string")return[e];if(Array.isArray(e)&&e.length>0)return e}return!1}get debugExtensionHost(){return b(this.args,this.isBuilt)}get debugRenderer(){return!!this.args.debugRenderer}get isBuilt(){return!h.VSCODE_DEV}get verbose(){return!!this.args.verbose}get logLevel(){return this.args.log?.find(e=>!x.test(e))}get extensionLogLevel(){const e=[];for(const i of this.args.log||[]){const n=x.exec(i);n&&n[1]&&n[2]&&e.push([n[1],n[2]])}return e.length?e:void 0}get serviceMachineIdResource(){return u(o.file(this.userDataPath),"machineid")}get crashReporterId(){return this.args["crash-reporter-id"]}get crashReporterDirectory(){return this.args["crash-reporter-directory"]}get disableTelemetry(){return!!this.args["disable-telemetry"]}get disableWorkspaceTrust(){return!!this.args["disable-workspace-trust"]}get useInMemorySecretStorage(){return!!this.args["use-inmemory-secretstorage"]}get policyFile(){if(this.args["__enable-file-policy"]){const e=h.VSCODE_PORTABLE;return e?o.file(d(e,"policy.json")):u(this.userHome,this.productService.dataFolderName,"policy.json")}}editSessionId=this.args.editSessionId;get continueOn(){return this.args.continueOn}set continueOn(e){this.args.continueOn=e}get args(){return this._args}}s([t],r.prototype,"appRoot",1),s([t],r.prototype,"userHome",1),s([t],r.prototype,"userDataPath",1),s([t],r.prototype,"appSettingsHome",1),s([t],r.prototype,"tmpDir",1),s([t],r.prototype,"cacheHome",1),s([t],r.prototype,"stateResource",1),s([t],r.prototype,"userRoamingDataHome",1),s([t],r.prototype,"userDataSyncHome",1),s([t],r.prototype,"sync",1),s([t],r.prototype,"machineSettingsResource",1),s([t],r.prototype,"workspaceStorageHome",1),s([t],r.prototype,"localHistoryHome",1),s([t],r.prototype,"keyboardLayoutResource",1),s([t],r.prototype,"argvResource",1),s([t],r.prototype,"isExtensionDevelopment",1),s([t],r.prototype,"untitledWorkspacesHome",1),s([t],r.prototype,"builtinExtensionsPath",1),s([t],r.prototype,"extensionsPath",1),s([t],r.prototype,"extensionDevelopmentLocationURI",1),s([t],r.prototype,"extensionDevelopmentKind",1),s([t],r.prototype,"extensionTestsLocationURI",1),s([t],r.prototype,"debugExtensionHost",1),s([t],r.prototype,"logLevel",1),s([t],r.prototype,"extensionLogLevel",1),s([t],r.prototype,"serviceMachineIdResource",1),s([t],r.prototype,"disableTelemetry",1),s([t],r.prototype,"disableWorkspaceTrust",1),s([t],r.prototype,"useInMemorySecretStorage",1),s([t],r.prototype,"policyFile",1);function b(a,e){return _(a["inspect-extensions"],a["inspect-brk-extensions"],5870,e,a.debugId,a.extensionEnvironment)}function _(a,e,i,n,g,l){const c=Number(e||a)||(n?null:i),P=c?!!e:!1;let D;if(l)try{D=JSON.parse(l)}catch{}return{port:c,break:P,debugId:g,env:D}}export{r as AbstractNativeEnvironmentService,x as EXTENSION_IDENTIFIER_WITH_LOG_REGEX,_ as parseDebugParams,b as parseExtensionHostDebugPort};