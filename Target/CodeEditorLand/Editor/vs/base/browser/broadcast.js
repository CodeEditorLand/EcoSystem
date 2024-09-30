import{mainWindow as t}from"./window.js";import"../common/errors.js";import{Emitter as n}from"../common/event.js";import{Disposable as i,toDisposable as r}from"../common/lifecycle.js";class v extends i{constructor(e){super();this.channelName=e;if("BroadcastChannel"in t)try{this.broadcastChannel=new BroadcastChannel(e);const a=s=>{this._onDidReceiveData.fire(s.data)};this.broadcastChannel.addEventListener("message",a),this._register(r(()=>{this.broadcastChannel&&(this.broadcastChannel.removeEventListener("message",a),this.broadcastChannel.close())}))}catch{}this.broadcastChannel||(this.channelName=`BroadcastDataChannel.${e}`,this.createBroadcastChannel())}broadcastChannel;_onDidReceiveData=this._register(new n);onDidReceiveData=this._onDidReceiveData.event;createBroadcastChannel(){const e=a=>{a.key===this.channelName&&a.newValue&&this._onDidReceiveData.fire(JSON.parse(a.newValue))};t.addEventListener("storage",e),this._register(r(()=>t.removeEventListener("storage",e)))}postData(e){this.broadcastChannel?this.broadcastChannel.postMessage(e):(localStorage.removeItem(this.channelName),localStorage.setItem(this.channelName,JSON.stringify(e)))}}export{v as BroadcastDataChannel};