import"../../../base/common/event.js";import{URI as o}from"../../../base/common/uri.js";import"../../../base/common/uriIpc.js";import"../../../base/parts/ipc/common/ipc.js";import"./download.js";class h{constructor(r){this.service=r}listen(r,e,n){throw new Error("Invalid listen")}call(r,e,n){switch(e){case"download":return this.service.download(o.revive(n[0]),o.revive(n[1]))}throw new Error("Invalid call")}}class f{constructor(r,e){this.channel=r;this.getUriTransformer=e}async download(r,e){const n=this.getUriTransformer();n&&(r=n.transformOutgoingURI(r),e=n.transformOutgoingURI(e)),await this.channel.call("download",[r,e])}}export{h as DownloadServiceChannel,f as DownloadServiceChannelClient};