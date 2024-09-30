import{toDisposable as c}from"../../../base/common/lifecycle.js";import"../../../base/parts/ipc/common/ipc.net.js";import{createDecorator as i}from"../../instantiation/common/instantiation.js";import"./remoteAuthorityResolver.js";const R=i("remoteSocketFactoryService");class u{factories={};register(e,t){return this.factories[e]??=[],this.factories[e].push(t),c(()=>{const o=this.factories[e]?.indexOf(t);typeof o=="number"&&o>=0&&this.factories[e]?.splice(o,1)})}getSocketFactory(e){return(this.factories[e.type]||[]).find(o=>o.supports(e))}connect(e,t,o,n){const r=this.getSocketFactory(e);if(!r)throw new Error(`No socket factory found for ${e}`);return r.connect(e,t,o,n)}}export{R as IRemoteSocketFactoryService,u as RemoteSocketFactoryService};