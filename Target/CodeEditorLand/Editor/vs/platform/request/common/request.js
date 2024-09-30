import{streamToBuffer as u}from"../../../base/common/buffer.js";import"../../../base/common/cancellation.js";import{getErrorMessage as d}from"../../../base/common/errors.js";import{Disposable as f}from"../../../base/common/lifecycle.js";import"../../../base/parts/request/common/request.js";import{localize as r}from"../../../nls.js";import{ConfigurationScope as h,Extensions as m}from"../../configuration/common/configurationRegistry.js";import{createDecorator as y}from"../../instantiation/common/instantiation.js";import"../../log/common/log.js";import{Registry as g}from"../../registry/common/platform.js";const N=y("requestService");class x{constructor(o){this.original=o}headers;toJSON(){if(!this.headers){const o=Object.create(null);for(const t in this.original)t.toLowerCase()==="authorization"||t.toLowerCase()==="proxy-authorization"?o[t]="*****":o[t]=this.original[t];this.headers=o}return this.headers}}class $ extends f{constructor(t){super();this.logService=t}counter=0;async logAndRequest(t,i){const n=`[network] #${++this.counter}: ${t.url}`;this.logService.trace(`${n} - begin`,t.type,new x(t.headers??{}));try{const s=await i();return this.logService.trace(`${n} - end`,t.type,s.res.statusCode,s.res.headers),s}catch(s){throw this.logService.error(`${n} - error`,t.type,d(s)),s}}}function p(e){return e.res.statusCode&&e.res.statusCode>=200&&e.res.statusCode<300||e.res.statusCode===1223}function l(e){return e.res.statusCode===204}async function C(e){return l(e)?null:(await u(e.stream)).toString()}async function K(e){if(!p(e))throw new Error("Server returned "+e.res.statusCode);return C(e)}async function F(e){if(!p(e))throw new Error("Server returned "+e.res.statusCode);if(l(e))return null;const t=(await u(e.stream)).toString();try{return JSON.parse(t)}catch(i){throw i.message+=`:
`+t,i}}function _(e){c(e)}let a;function c(e){const o=g.as(m.Configuration),t=a;a={id:"http",order:15,title:r("httpConfigurationTitle","HTTP"),type:"object",scope:e,properties:{"http.proxy":{type:"string",pattern:"^(https?|socks|socks4a?|socks5h?)://([^:]*(:[^@]*)?@)?([^:]+|\\[[:0-9a-fA-F]+\\])(:\\d+)?/?$|^$",markdownDescription:r("proxy","The proxy setting to use. If not set, will be inherited from the `http_proxy` and `https_proxy` environment variables."),restricted:!0},"http.proxyStrictSSL":{type:"boolean",default:!0,description:r("strictSSL","Controls whether the proxy server certificate should be verified against the list of supplied CAs."),restricted:!0},"http.proxyKerberosServicePrincipal":{type:"string",markdownDescription:r("proxyKerberosServicePrincipal","Overrides the principal service name for Kerberos authentication with the HTTP proxy. A default based on the proxy hostname is used when this is not set."),restricted:!0},"http.noProxy":{type:"array",items:{type:"string"},markdownDescription:r("noProxy","Specifies domain names for which proxy settings should be ignored for HTTP/HTTPS requests."),restricted:!0},"http.proxyAuthorization":{type:["null","string"],default:null,markdownDescription:r("proxyAuthorization","The value to send as the `Proxy-Authorization` header for every network request."),restricted:!0},"http.proxySupport":{type:"string",enum:["off","on","fallback","override"],enumDescriptions:[r("proxySupportOff","Disable proxy support for extensions."),r("proxySupportOn","Enable proxy support for extensions."),r("proxySupportFallback","Enable proxy support for extensions, fall back to request options, when no proxy found."),r("proxySupportOverride","Enable proxy support for extensions, override request options.")],default:"override",description:r("proxySupport","Use the proxy support for extensions."),restricted:!0},"http.systemCertificates":{type:"boolean",default:!0,description:r("systemCertificates","Controls whether CA certificates should be loaded from the OS. (On Windows and macOS, a reload of the window is required after turning this off.)"),restricted:!0},"http.experimental.systemCertificatesV2":{type:"boolean",tags:["experimental"],default:!1,description:r("systemCertificatesV2","Controls whether experimental loading of CA certificates from the OS should be enabled. This uses a more general approach than the default implemenation."),restricted:!0},"http.electronFetch":{type:"boolean",default:!1,description:r("electronFetch","Controls whether use of Electron's fetch implementation instead of Node.js' should be enabled. All local extensions will get Electron's fetch implementation for the global fetch API."),restricted:!0}}},o.updateConfigurations({add:[a],remove:t?[t]:[]})}c(h.APPLICATION);export{$ as AbstractRequestService,N as IRequestService,F as asJson,C as asText,K as asTextOrError,l as hasNoContent,p as isSuccess,_ as updateProxyConfigurationsScope};