import{getErrorMessage as a}from"../../../../base/common/errors.js";import{Disposable as p,DisposableStore as v}from"../../../../base/common/lifecycle.js";import{Schemas as s}from"../../../../base/common/network.js";import{OperatingSystem as g}from"../../../../base/common/platform.js";import"../../../../platform/files/common/files.js";import{DiskFileSystemProviderClient as l}from"../../../../platform/files/common/diskFileSystemProviderClient.js";import"../../../../platform/log/common/log.js";import"../../../../platform/remote/common/remoteAgentEnvironment.js";import"./remoteAgentService.js";const d="remoteFilesystem";class m extends l{static register(o,t,n){const i=o.getConnection();if(!i)return p.None;const r=new v,c=(async()=>{try{const e=await o.getRawEnvironment();e?t.registerProvider(s.vscodeRemote,r.add(new m(e,i))):n.error("Cannot register remote filesystem provider. Remote environment doesnot exist.")}catch(e){n.error("Cannot register remote filesystem provider. Error while fetching remote environment.",a(e))}})();return r.add(t.onWillActivateFileSystemProvider(e=>{e.scheme===s.vscodeRemote&&e.join(c)})),r}constructor(o,t){super(t.getChannel(d),{pathCaseSensitive:o.os===g.Linux})}}export{d as REMOTE_FILE_SYSTEM_CHANNEL_NAME,m as RemoteFileSystemProviderClient};