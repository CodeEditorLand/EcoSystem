import"../../../base/common/severity.js";import*as a from"../../../base/common/strings.js";import"../../../base/common/uri.js";import"../../action/common/action.js";import"../../environment/common/environment.js";import{createDecorator as l}from"../../instantiation/common/instantiation.js";import{getRemoteName as d}from"../../remote/common/remoteHosts.js";const S="extensions.user.cache",k="extensions.builtin.cache",N="undefined_publisher",w=["ui","workspace","web"];function _(n){if(typeof n=="object"&&n!==null&&n.supported!==!0)return n.description}const C=["AI","Azure","Chat","Data Science","Debuggers","Extension Packs","Education","Formatters","Keymaps","Language Packs","Linters","Machine Learning","Notebooks","Programming Languages","SCM Providers","Snippets","Testing","Themes","Visualization","Other"];var p=(t=>(t[t.System=0]="System",t[t.User=1]="User",t))(p||{}),g=(i=>(i.WIN32_X64="win32-x64",i.WIN32_ARM64="win32-arm64",i.LINUX_X64="linux-x64",i.LINUX_ARM64="linux-arm64",i.LINUX_ARMHF="linux-armhf",i.ALPINE_X64="alpine-x64",i.ALPINE_ARM64="alpine-arm64",i.DARWIN_X64="darwin-x64",i.DARWIN_ARM64="darwin-arm64",i.WEB="web",i.UNIVERSAL="universal",i.UNKNOWN="unknown",i.UNDEFINED="undefined",i))(g||{});class r{value;_lower;constructor(e){this.value=e,this._lower=e.toLowerCase()}static equals(e,t){if(typeof e>"u"||e===null)return typeof t>"u"||t===null;if(typeof t>"u"||t===null)return!1;if(typeof e=="string"||typeof t=="string"){const o=typeof e=="string"?e:e.value,s=typeof t=="string"?t:t.value;return a.equalsIgnoreCase(o,s)}return e._lower===t._lower}static toKey(e){return typeof e=="string"?e.toLowerCase():e._lower}}class A{_set=new Set;get size(){return this._set.size}constructor(e){if(e)for(const t of e)this.add(t)}add(e){this._set.add(r.toKey(e))}delete(e){return this._set.delete(r.toKey(e))}has(e){return this._set.has(r.toKey(e))}}class L{_map=new Map;clear(){this._map.clear()}delete(e){this._map.delete(r.toKey(e))}get(e){return this._map.get(r.toKey(e))}has(e){return this._map.has(r.toKey(e))}set(e,t){this._map.set(r.toKey(e),t)}values(){return this._map.values()}forEach(e){this._map.forEach(e)}[Symbol.iterator](){return this._map[Symbol.iterator]()}}function R(n){return u(n)}function u(n){return n.contributes&&n.contributes.localizations?n.contributes.localizations.length>0:!1}function W(n){return n.contributes&&n.contributes.authentication?n.contributes.authentication.length>0:!1}function M(n,e){if(e){const t=`onResolveRemoteAuthority:${d(e)}`;return!!n.activationEvents?.includes(t)}return!1}function U(n){return n.map(e=>{const[t,o]=e.split("@");return{proposalName:t,version:o?parseInt(o):void 0}})}function D(n){return n.map(e=>e.split("@")[0])}const T=l("IBuiltinExtensionsScannerService");export{w as ALL_EXTENSION_KINDS,k as BUILTIN_MANIFEST_CACHE_FILE,C as EXTENSION_CATEGORIES,r as ExtensionIdentifier,L as ExtensionIdentifierMap,A as ExtensionIdentifierSet,p as ExtensionType,T as IBuiltinExtensionsScannerService,g as TargetPlatform,N as UNDEFINED_PUBLISHER,S as USER_MANIFEST_CACHE_FILE,_ as getWorkspaceSupportTypeMessage,R as isApplicationScopedExtension,W as isAuthenticationProviderExtension,u as isLanguagePackExtension,M as isResolverExtension,U as parseApiProposals,D as parseEnabledApiProposalNames};