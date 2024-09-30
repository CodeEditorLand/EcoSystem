var v=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var p=(a,e,o,n)=>{for(var i=n>1?void 0:n?h(e,o):e,r=a.length-1,t;r>=0;r--)(t=a[r])&&(i=(n?t(e,o,i):t(i))||i);return n&&i&&v(e,o,i),i},c=(a,e)=>(o,n)=>e(o,n,a);import{app as I}from"electron";import{coalesce as P}from"../../../base/common/arrays.js";import{isMacintosh as m}from"../../../base/common/platform.js";import{URI as u}from"../../../base/common/uri.js";import{whenDeleted as S}from"../../../base/node/pfs.js";import{IConfigurationService as W}from"../../configuration/common/configuration.js";import"../../environment/common/argv.js";import{isLaunchedFromCli as M}from"../../environment/node/argvHelper.js";import{createDecorator as y}from"../../instantiation/common/instantiation.js";import{ILogService as g}from"../../log/common/log.js";import{IURLService as C}from"../../url/common/url.js";import"../../window/electron-main/window.js";import"../../window/common/window.js";import{IWindowsMainService as E,OpenContext as w}from"../../windows/electron-main/windows.js";import"../../url/electron-main/url.js";const A="launchMainService",Y=y(A);let l=class{constructor(e,o,n,i){this.logService=e;this.windowsMainService=o;this.urlService=n;this.configurationService=i}async start(e,o){this.logService.trace("Received data from other instance: ",e,o),m&&I.focus({steal:!0});const n=this.parseOpenUrl(e);if(n.length){let i=Promise.resolve();if(this.windowsMainService.getWindowCount()===0){const r=(await this.windowsMainService.openEmptyWindow({context:w.DESKTOP})).at(0);r&&(i=r.ready())}i.then(()=>{for(const{uri:r,originalUrl:t}of n)this.urlService.open(r,{originalUrl:t})})}else return this.startOpenWindow(e,o)}parseOpenUrl(e){return e["open-url"]&&e._urls&&e._urls.length>0?P(e._urls.map(o=>{try{return{uri:u.parse(o),originalUrl:o}}catch{return null}})):[]}async startOpenWindow(e,o){const n=M(o)?w.CLI:w.DESKTOP;let i=[];const r=e.wait&&e.waitMarkerFilePath?u.file(e.waitMarkerFilePath):void 0,t=e.remote||void 0,s={context:n,cli:e,userEnv:e["preserve-env"]||n===w.CLI?o:void 0,waitMarkerFileURI:r,remoteAuthority:t,forceProfile:e.profile,forceTempProfile:e["profile-temp"]};if(e.extensionDevelopmentPath)await this.windowsMainService.openExtensionDevelopmentHostWindow(e.extensionDevelopmentPath,s);else if(!e._.length&&!e["folder-uri"]&&!e["file-uri"]){let d=!1;if(e["new-window"]||s.forceProfile||s.forceTempProfile)d=!0;else if(e["reuse-window"])d=!1;else switch(this.configurationService.getValue("window")?.openWithoutArgumentsInNewWindow||"default"){case"on":d=!0;break;case"off":d=!1;break;default:d=!m}if(d)i=await this.windowsMainService.open({...s,forceNewWindow:!0,forceEmpty:!0});else{const f=this.windowsMainService.getLastActiveWindow();f?(this.windowsMainService.openExistingWindow(f,s),i=[f]):i=await this.windowsMainService.open({...s,forceEmpty:!0})}}else i=await this.windowsMainService.open({...s,forceNewWindow:e["new-window"],preferNewWindow:!e["reuse-window"]&&!e.wait,forceReuseWindow:e["reuse-window"],diffMode:e.diff,mergeMode:e.merge,addMode:e.add,noRecentEntry:!!e["skip-add-to-recently-opened"],gotoLineMode:e.goto});if(r&&i.length===1&&i[0])return Promise.race([i[0].whenClosedOrLoaded,S(r.fsPath)]).then(()=>{},()=>{})}async getMainProcessId(){return this.logService.trace("Received request for process ID from other instance."),process.pid}};l=p([c(0,g),c(1,E),c(2,C),c(3,W)],l);export{A as ID,Y as ILaunchMainService,l as LaunchMainService};