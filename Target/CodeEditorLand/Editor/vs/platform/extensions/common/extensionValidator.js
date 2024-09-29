import{isEqualOrParent as x,joinPath as B}from"../../../base/common/resources.js";import u from"../../../base/common/severity.js";import"../../../base/common/uri.js";import*as s from"../../../nls.js";import*as j from"../../../base/common/semver/semver.js";import{parseApiProposals as z}from"./extensions.js";import{allApiProposals as D}from"./extensionsApiProposals.js";const v=/^(\^|>=)?((\d+)|x)\.((\d+)|x)\.((\d+)|x)(\-.*)?$/,I=/^-(\d{4})(\d{2})(\d{2})$/;function V(e){return e=e.trim(),e==="*"||v.test(e)}function g(e){if(!V(e))return null;if(e=e.trim(),e==="*")return{hasCaret:!1,hasGreaterEquals:!1,majorBase:0,majorMustEqual:!1,minorBase:0,minorMustEqual:!1,patchBase:0,patchMustEqual:!1,preRelease:null};const t=e.match(v);return t?{hasCaret:t[1]==="^",hasGreaterEquals:t[1]===">=",majorBase:t[2]==="x"?0:parseInt(t[2],10),majorMustEqual:t[2]!=="x",minorBase:t[4]==="x"?0:parseInt(t[4],10),minorMustEqual:t[4]!=="x",patchBase:t[6]==="x"?0:parseInt(t[6],10),patchMustEqual:t[6]!=="x",preRelease:t[8]||null}:null}function E(e){if(!e)return null;const t=e.majorBase,n=e.majorMustEqual,o=e.minorBase;let i=e.minorMustEqual;const l=e.patchBase;let r=e.patchMustEqual;e.hasCaret&&(t===0||(i=!1),r=!1);let p=0;if(e.preRelease){const f=I.exec(e.preRelease);if(f){const[,a,c,m]=f;p=Date.UTC(Number(a),Number(c)-1,Number(m))}}return{majorBase:t,majorMustEqual:n,minorBase:o,minorMustEqual:i,patchBase:l,patchMustEqual:r,isMinimum:e.hasGreaterEquals,notBefore:p}}function A(e,t,n){let o;typeof e=="string"?o=E(g(e)):o=e;let i;t instanceof Date?i=t.getTime():typeof t=="string"&&(i=new Date(t).getTime());let l;if(typeof n=="string"?l=E(g(n)):l=n,!o||!l)return!1;const r=o.majorBase,p=o.minorBase,f=o.patchBase;let a=l.majorBase,c=l.minorBase,m=l.patchBase;const y=l.notBefore;let d=l.majorMustEqual,h=l.minorMustEqual,b=l.patchMustEqual;return l.isMinimum?r>a?!0:r<a?!1:p>c?!0:p<c||i&&i<y?!1:f>=m:(r===1&&a===0&&(!d||!h||!b)&&(a=1,c=0,m=0,d=!0,h=!1,b=!1),r<a?!1:r>a?!d:p<c?!1:p>c?!h:f<m?!1:f>m?!b:!(i&&i<y))}function F(e,t,n,o,i,l){const r=[];if(typeof o.publisher<"u"&&typeof o.publisher!="string")return r.push([u.Error,s.localize("extensionDescription.publisher","property publisher must be of type `string`.")]),r;if(typeof o.name!="string")return r.push([u.Error,s.localize("extensionDescription.name","property `{0}` is mandatory and must be of type `string`","name")]),r;if(typeof o.version!="string")return r.push([u.Error,s.localize("extensionDescription.version","property `{0}` is mandatory and must be of type `string`","version")]),r;if(!o.engines)return r.push([u.Error,s.localize("extensionDescription.engines","property `{0}` is mandatory and must be of type `object`","engines")]),r;if(typeof o.engines.vscode!="string")return r.push([u.Error,s.localize("extensionDescription.engines.vscode","property `{0}` is mandatory and must be of type `string`","engines.vscode")]),r;if(typeof o.extensionDependencies<"u"&&!q(o.extensionDependencies))return r.push([u.Error,s.localize("extensionDescription.extensionDependencies","property `{0}` can be omitted or must be of type `string[]`","extensionDependencies")]),r;if(typeof o.activationEvents<"u"){if(!q(o.activationEvents))return r.push([u.Error,s.localize("extensionDescription.activationEvents1","property `{0}` can be omitted or must be of type `string[]`","activationEvents")]),r;if(typeof o.main>"u"&&typeof o.browser>"u")return r.push([u.Error,s.localize("extensionDescription.activationEvents2","property `{0}` should be omitted if the extension doesn't have a `{1}` or `{2}` property.","activationEvents","main","browser")]),r}if(typeof o.extensionKind<"u"&&typeof o.main>"u"&&r.push([u.Warning,s.localize("extensionDescription.extensionKind","property `{0}` can be defined only if property `main` is also defined.","extensionKind")]),typeof o.main<"u"){if(typeof o.main!="string")return r.push([u.Error,s.localize("extensionDescription.main1","property `{0}` can be omitted or must be of type `string`","main")]),r;{const a=B(n,o.main);x(a,n)||r.push([u.Warning,s.localize("extensionDescription.main2","Expected `main` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.",a.path,n.path)])}}if(typeof o.browser<"u"){if(typeof o.browser!="string")return r.push([u.Error,s.localize("extensionDescription.browser1","property `{0}` can be omitted or must be of type `string`","browser")]),r;{const a=B(n,o.browser);x(a,n)||r.push([u.Warning,s.localize("extensionDescription.browser2","Expected `browser` ({0}) to be included inside extension's folder ({1}). This might make the extension non-portable.",a.path,n.path)])}}if(!j.valid(o.version))return r.push([u.Error,s.localize("notSemver","Extension version is not semver compatible.")]),r;const p=[];if(!M(e,t,o,i,p))for(const a of p)r.push([u.Error,a]);if(l&&o.enabledApiProposals?.length){const a=[];if(!N([...o.enabledApiProposals],a))for(const c of a)r.push([u.Error,c])}return r}function M(e,t,n,o,i){return o||typeof n.main>"u"&&typeof n.browser>"u"?!0:P(e,t,n.engines.vscode,i)}function K(e,t,n){return e==="*"||P(t,n,e)}function N(e,t){if(e.length===0)return!0;const n=Array.isArray(t)?t:void 0,o=(n?void 0:t)??D,i=[],l=z(e);for(const{proposalName:r,version:p}of l){const f=o[r];f&&p&&f.version!==p&&i.push(r)}return i.length?(n&&(i.length===1?n.push(s.localize("apiProposalMismatch1","This extension is using the API proposal '{0}' that is not compatible with the current version of VS Code.",i[0])):n.push(s.localize("apiProposalMismatch2","This extension is using the API proposals {0} and '{1}' that are not compatible with the current version of VS Code.",i.slice(0,i.length-1).map(r=>`'${r}'`).join(", "),i[i.length-1]))),!1):!0}function P(e,t,n,o=[]){const i=E(g(n));if(!i)return o.push(s.localize("versionSyntax","Could not parse `engines.vscode` value {0}. Please use, for example: ^1.22.0, ^1.22.x, etc.",n)),!1;if(i.majorBase===0){if(!i.majorMustEqual||!i.minorMustEqual)return o.push(s.localize("versionSpecificity1","Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions before 1.0.0, please define at a minimum the major and minor desired version. E.g. ^0.10.0, 0.10.x, 0.11.0, etc.",n)),!1}else if(!i.majorMustEqual)return o.push(s.localize("versionSpecificity2","Version specified in `engines.vscode` ({0}) is not specific enough. For vscode versions after 1.0.0, please define at a minimum the major desired version. E.g. ^1.10.0, 1.10.x, 1.x.x, 2.x.x, etc.",n)),!1;return A(e,t,i)?!0:(o.push(s.localize("versionMismatch","Extension is not compatible with Code {0}. Extension requires: {1}.",e,n)),!1)}function q(e){if(!Array.isArray(e))return!1;for(let t=0,n=e.length;t<n;t++)if(typeof e[t]!="string")return!1;return!0}export{N as areApiProposalsCompatible,K as isEngineValid,M as isValidExtensionVersion,A as isValidVersion,V as isValidVersionStr,E as normalizeVersion,g as parseVersion,F as validateExtensionManifest};
