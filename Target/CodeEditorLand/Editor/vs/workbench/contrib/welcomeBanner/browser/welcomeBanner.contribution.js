var S=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var E=(t,r,o,i)=>{for(var e=i>1?void 0:i?a(r,o):r,s=t.length-1,m;s>=0;s--)(m=t[s])&&(e=(i?m(r,o,e):m(e))||e);return i&&e&&S(r,o,e),e},c=(t,r)=>(o,i)=>r(o,i,t);import{LifecyclePhase as f}from"../../../services/lifecycle/common/lifecycle.js";import{Registry as g}from"../../../../platform/registry/common/platform.js";import{Extensions as h}from"../../../common/contributions.js";import{IBannerService as p}from"../../../services/banner/browser/bannerService.js";import{IStorageService as R,StorageScope as I,StorageTarget as d}from"../../../../platform/storage/common/storage.js";import{IBrowserWorkbenchEnvironmentService as v}from"../../../services/environment/browser/environmentService.js";import{URI as b}from"../../../../base/common/uri.js";import{ThemeIcon as k}from"../../../../base/common/themables.js";let n=class{static WELCOME_BANNER_DISMISSED_KEY="workbench.banner.welcome.dismissed";constructor(r,o,i){const e=i.options?.welcomeBanner;if(!e||o.getBoolean(n.WELCOME_BANNER_DISMISSED_KEY,I.PROFILE,!1))return;let s;typeof e.icon=="string"?s=k.fromId(e.icon):e.icon&&(s=b.revive(e.icon)),r.show({id:"welcome.banner",message:e.message,icon:s,actions:e.actions,onClose:()=>{o.store(n.WELCOME_BANNER_DISMISSED_KEY,!0,I.PROFILE,d.MACHINE)}})}};n=E([c(0,p),c(1,R),c(2,v)],n),g.as(h.Workbench).registerWorkbenchContribution(n,f.Restored);