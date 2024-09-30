import*as w from"child_process";import*as E from"net";import"stream";import*as v from"../../../../base/common/objects.js";import*as h from"../../../../base/common/path.js";import*as u from"../../../../base/common/platform.js";import*as D from"../../../../base/common/strings.js";import{Promises as P}from"../../../../base/node/pfs.js";import*as g from"../../../../nls.js";import"../../../../platform/extensions/common/extensions.js";import"../common/debug.js";import{AbstractDebugAdapter as S}from"../common/abstractDebugAdapter.js";class c extends S{static TWO_CRLF=`\r
\r
`;static HEADER_LINESEPARATOR=/\r?\n/;static HEADER_FIELDSEPARATOR=/: */;outputStream;rawData=Buffer.allocUnsafe(0);contentLength=-1;constructor(){super()}connect(n,e){this.outputStream=e,this.rawData=Buffer.allocUnsafe(0),this.contentLength=-1,n.on("data",r=>this.handleData(r))}sendMessage(n){if(this.outputStream){const e=JSON.stringify(n);this.outputStream.write(`Content-Length: ${Buffer.byteLength(e,"utf8")}${c.TWO_CRLF}${e}`,"utf8")}}handleData(n){for(this.rawData=Buffer.concat([this.rawData,n]);;){if(this.contentLength>=0){if(this.rawData.length>=this.contentLength){const e=this.rawData.toString("utf8",0,this.contentLength);if(this.rawData=this.rawData.slice(this.contentLength),this.contentLength=-1,e.length>0)try{this.acceptMessage(JSON.parse(e))}catch(r){this._onError.fire(new Error((r.message||r)+`
`+e))}continue}}else{const e=this.rawData.indexOf(c.TWO_CRLF);if(e!==-1){const t=this.rawData.toString("utf8",0,e).split(c.HEADER_LINESEPARATOR);for(const s of t){const i=s.split(c.HEADER_FIELDSEPARATOR);i[0]==="Content-Length"&&(this.contentLength=Number(i[1]))}this.rawData=this.rawData.slice(e+c.TWO_CRLF.length);continue}}break}}}class b extends c{socket;startSession(){return new Promise((n,e)=>{let r=!1;this.socket=this.createConnection(()=>{this.connect(this.socket,this.socket),n(),r=!0}),this.socket.on("close",()=>{r?this._onError.fire(new Error("connection closed")):e(new Error("connection closed"))}),this.socket.on("error",t=>{r?this._onError.fire(t):e(t)})})}async stopSession(){await this.cancelPendingRequests(),this.socket&&(this.socket.end(),this.socket=void 0)}}class B extends b{constructor(e){super();this.adapterServer=e}createConnection(e){return E.createConnection(this.adapterServer.port,this.adapterServer.host||"127.0.0.1",e)}}class j extends b{constructor(e){super();this.adapterServer=e}createConnection(e){return E.createConnection(this.adapterServer.path,e)}}class d extends c{constructor(e,r){super();this.adapterExecutable=e;this.debugType=r}serverProcess;async startSession(){const e=this.adapterExecutable.command,r=this.adapterExecutable.args,t=this.adapterExecutable.options||{};try{if(e)if(h.isAbsolute(e)){if(!await P.exists(e))throw new Error(g.localize("debugAdapterBinNotFound","Debug adapter executable '{0}' does not exist.",e))}else e.indexOf("/")<0&&e.indexOf("\\")<0;else throw new Error(g.localize({key:"debugAdapterCannotDetermineExecutable",comment:["Adapter executable file not found"]},"Cannot determine executable for debug adapter '{0}'.",this.debugType));let s=process.env;if(t.env&&Object.keys(t.env).length>0&&(s=v.mixin(v.deepClone(process.env),t.env)),e==="node")if(Array.isArray(r)&&r.length>0){const i=!!process.env.ELECTRON_RUN_AS_NODE||!!process.versions.electron,o={env:s,execArgv:i?["-e","delete process.env.ELECTRON_RUN_AS_NODE;require(process.argv[1])"]:[],silent:!0};t.cwd&&(o.cwd=t.cwd);const a=w.fork(r[0],r.slice(1),o);if(!a.pid)throw new Error(g.localize("unableToLaunchDebugAdapter","Unable to launch debug adapter from '{0}'.",r[0]));this.serverProcess=a}else throw new Error(g.localize("unableToLaunchDebugAdapterNoArgs","Unable to launch debug adapter."));else{let i=e,o=r;const a={env:s};t.cwd&&(a.cwd=t.cwd),u.isWindows&&(e.endsWith(".bat")||e.endsWith(".cmd"))&&(a.shell=!0,i=`"${e}"`,o=r.map(p=>(p=p.replace(/"/g,'\\"'),`"${p}"`))),this.serverProcess=w.spawn(i,o,a)}this.serverProcess.on("error",i=>{this._onError.fire(i)}),this.serverProcess.on("exit",(i,o)=>{this._onExit.fire(i)}),this.serverProcess.stdout.on("close",()=>{this._onError.fire(new Error("read error"))}),this.serverProcess.stdout.on("error",i=>{this._onError.fire(i)}),this.serverProcess.stdin.on("error",i=>{this._onError.fire(i)}),this.serverProcess.stderr.resume(),this.connect(this.serverProcess.stdout,this.serverProcess.stdin)}catch(s){this._onError.fire(s)}}async stopSession(){return this.serverProcess?(await this.cancelPendingRequests(),u.isWindows?new Promise((e,r)=>{const t=w.exec(`taskkill /F /T /PID ${this.serverProcess.pid}`,function(s,i,o){if(s)return r(s)});t.on("exit",e),t.on("error",r)}):(this.serverProcess.kill("SIGTERM"),Promise.resolve(void 0))):Promise.resolve(void 0)}static extract(e,r){if(!e)return;const t=Object.create(null);e.runtime&&(e.runtime.indexOf("./")===0?t.runtime=h.join(r,e.runtime):t.runtime=e.runtime),e.runtimeArgs&&(t.runtimeArgs=e.runtimeArgs),e.program&&(h.isAbsolute(e.program)?t.program=e.program:t.program=h.join(r,e.program)),e.args&&(t.args=e.args);const s=e;return s.win&&(t.win=d.extract(s.win,r)),s.winx86&&(t.winx86=d.extract(s.winx86,r)),s.windows&&(t.windows=d.extract(s.windows,r)),s.osx&&(t.osx=d.extract(s.osx,r)),s.linux&&(t.linux=d.extract(s.linux,r)),t}static platformAdapterExecutable(e,r){let t=Object.create(null);r=r.toLowerCase();for(const f of e)if(f.contributes){const m=f.contributes.debuggers;m&&m.length>0&&m.filter(l=>typeof l.type=="string"&&D.equalsIgnoreCase(l.type,r)).forEach(l=>{const A=d.extract(l,f.extensionLocation.fsPath);t=v.mixin(t,A,f.isBuiltin)})}let s;u.isWindows&&!process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")?s=t.winx86||t.win||t.windows:u.isWindows?s=t.win||t.windows:u.isMacintosh?s=t.osx:u.isLinux&&(s=t.linux),s=s||t;const i=s.program||t.program,o=s.args||t.args,a=s.runtime||t.runtime,p=s.runtimeArgs||t.runtimeArgs;if(a)return{type:"executable",command:a,args:(p||[]).concat(typeof i=="string"?[i]:[]).concat(o||[])};if(i)return{type:"executable",command:i,args:o||[]}}}export{d as ExecutableDebugAdapter,j as NamedPipeDebugAdapter,b as NetworkDebugAdapter,B as SocketDebugAdapter,c as StreamDebugAdapter};