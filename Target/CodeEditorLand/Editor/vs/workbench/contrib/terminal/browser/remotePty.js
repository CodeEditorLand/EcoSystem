var m=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var l=(n,i,e,r)=>{for(var t=r>1?void 0:r?c(i,e):i,s=n.length-1,o;s>=0;s--)(o=n[s])&&(t=(r?o(i,e,t):o(t))||t);return r&&t&&m(i,e,t),t},h=(n,i)=>(e,r)=>i(e,r,n);import{Barrier as d}from"../../../../base/common/async.js";import{ITerminalLogService as p}from"../../../../platform/terminal/common/terminal.js";import{BasePty as _}from"../common/basePty.js";import"../common/remote/remoteTerminalChannel.js";import{IRemoteAgentService as P}from"../../../services/remote/common/remoteAgentService.js";let a=class extends _{constructor(e,r,t,s,o){super(e,r);this._remoteTerminalChannel=t;this._remoteAgentService=s;this._logService=o;this._startBarrier=new d}_startBarrier;async start(){if(!await this._remoteAgentService.getEnvironment())throw new Error("Could not fetch remote environment");this._logService.trace("Spawning remote agent process",{terminalId:this.id});const r=await this._remoteTerminalChannel.start(this.id);return r&&"message"in r||this._startBarrier.open(),r}async detach(e){return await this._startBarrier.wait(),this._remoteTerminalChannel.detachFromProcess(this.id,e)}shutdown(e){this._startBarrier.wait().then(r=>{this._remoteTerminalChannel.shutdown(this.id,e)})}input(e){this._inReplay||this._startBarrier.wait().then(r=>{this._remoteTerminalChannel.input(this.id,e)})}processBinary(e){return this._remoteTerminalChannel.processBinary(this.id,e)}resize(e,r){this._inReplay||this._lastDimensions.cols===e&&this._lastDimensions.rows===r||this._startBarrier.wait().then(t=>{this._lastDimensions.cols=e,this._lastDimensions.rows=r,this._remoteTerminalChannel.resize(this.id,e,r)})}async clearBuffer(){await this._remoteTerminalChannel.clearBuffer(this.id)}freePortKillProcess(e){if(!this._remoteTerminalChannel.freePortKillProcess)throw new Error("freePortKillProcess does not exist on the local pty service");return this._remoteTerminalChannel.freePortKillProcess(e)}acknowledgeDataEvent(e){this._inReplay||this._startBarrier.wait().then(r=>{this._remoteTerminalChannel.acknowledgeDataEvent(this.id,e)})}async setUnicodeVersion(e){return this._remoteTerminalChannel.setUnicodeVersion(this.id,e)}async refreshProperty(e){return this._remoteTerminalChannel.refreshProperty(this.id,e)}async updateProperty(e,r){return this._remoteTerminalChannel.updateProperty(this.id,e,r)}handleOrphanQuestion(){this._remoteTerminalChannel.orphanQuestionReply(this.id)}};a=l([h(3,P),h(4,p)],a);export{a as RemotePty};