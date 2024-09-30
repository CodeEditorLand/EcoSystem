var x=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var g=(m,t,n,i)=>{for(var e=i>1?void 0:i?S(t,n):t,s=m.length-1,c;s>=0;s--)(c=m[s])&&(e=(i?c(t,n,e):c(e))||e);return i&&e&&x(t,n,e),e},u=(m,t)=>(n,i)=>t(n,i,m);import{Codicon as k}from"../../../../../base/common/codicons.js";import{fromNow as A}from"../../../../../base/common/date.js";import{DisposableStore as E}from"../../../../../base/common/lifecycle.js";import{ThemeIcon as _}from"../../../../../base/common/themables.js";import{localize as a,localize2 as I}from"../../../../../nls.js";import{Action2 as w}from"../../../../../platform/actions/common/actions.js";import{ICommandService as y}from"../../../../../platform/commands/common/commands.js";import{IDialogService as b}from"../../../../../platform/dialogs/common/dialogs.js";import{IInstantiationService as P}from"../../../../../platform/instantiation/common/instantiation.js";import{IProductService as Q}from"../../../../../platform/product/common/productService.js";import{IQuickInputService as T}from"../../../../../platform/quickinput/common/quickInput.js";import{IAuthenticationAccessService as L}from"../../../../services/authentication/browser/authenticationAccessService.js";import{IAuthenticationUsageService as U}from"../../../../services/authentication/browser/authenticationUsageService.js";import{IAuthenticationService as D}from"../../../../services/authentication/common/authentication.js";import{IExtensionService as C}from"../../../../services/extensions/common/extensions.js";class ie extends w{constructor(){super({id:"_manageTrustedExtensionsForAccount",title:I("manageTrustedExtensionsForAccount","Manage Trusted Extensions For Account"),category:I("accounts","Accounts"),f1:!0})}run(t,n){return t.get(P).createInstance(h).run(n)}}let h=class{constructor(t,n,i,e,s,c,r,p){this._productService=t;this._extensionService=n;this._dialogService=i;this._quickInputService=e;this._authenticationService=s;this._authenticationUsageService=c;this._authenticationAccessService=r;this._commandService=p}async run(t){const{providerId:n,accountLabel:i}=await this._resolveProviderAndAccountLabel(t?.providerId,t?.accountLabel);if(!n||!i)return;const e=await this._getItems(n,i);if(!e.length)return;const s=new E,c=this._createQuickPick(s,n,i);c.items=e,c.selectedItems=e.filter(r=>r.type!=="separator"&&!!r.picked),c.show()}async _resolveProviderAndAccountLabel(t,n){if(!t||!n){const i=new Array;for(const s of this._authenticationService.getProviderIds()){const c=this._authenticationService.getProvider(s).label,r=await this._authenticationService.getSessions(s),p=new Set;for(const v of r)p.has(v.account.label)||(p.add(v.account.label),i.push({providerId:s,providerLabel:c,accountLabel:v.account.label}))}const e=await this._quickInputService.pick(i.map(s=>({providerId:s.providerId,label:s.accountLabel,description:s.providerLabel})),{placeHolder:a("pickAccount","Pick an account to manage trusted extensions for"),matchOnDescription:!0});if(e)t=e.providerId,n=e.label;else return{providerId:void 0,accountLabel:void 0}}return{providerId:t,accountLabel:n}}async _getItems(t,n){let i=this._authenticationAccessService.readAllowedExtensions(t,n);i=(await Promise.all(i.map(o=>this._extensionService.getExtension(o.id)))).map((o,d)=>o?i[d]:void 0).filter(o=>!!o);const s=this._productService.trustedExtensionAuthAccess,c=Array.isArray(s)?s:typeof s=="object"?s[t]??[]:[];for(const o of c){const d=i.find(l=>l.id===o);if(d)d.allowed=!0,d.trusted=!0;else{const l=await this._extensionService.getExtension(o);l&&i.push({id:o,name:l.displayName||l.name,allowed:!0,trusted:!0})}}if(!i.length)return this._dialogService.info(a("noTrustedExtensions","This account has not been used by any extensions.")),[];const r=this._authenticationUsageService.readAccountUsages(t,n),p=[],v=[];for(const o of i){const d=r.find(l=>o.id===l.extensionId);o.lastUsed=d?.lastUsed,o.trusted?p.push(o):v.push(o)}const f=(o,d)=>(d.lastUsed||0)-(o.lastUsed||0);return[...v.sort(f).map(this._toQuickPickItem),{type:"separator",label:a("trustedExtensions","Trusted by Microsoft")},...p.sort(f).map(this._toQuickPickItem)]}_toQuickPickItem(t){const n=t.lastUsed,i=n?a({key:"accountLastUsedDate",comment:['The placeholder {0} is a string with time information, such as "3 days ago"']},"Last used this account {0}",A(n,!0)):a("notUsed","Has not used this account");let e,s;return t.trusted&&(e=a("trustedExtensionTooltip",`This extension is trusted by Microsoft and
always has access to this account`),s=!0),{label:t.name,extension:t,description:i,tooltip:e,disabled:s,buttons:[{tooltip:a("accountPreferences","Manage account preferences for this extension"),iconClass:_.asClassName(k.settingsGear)}],picked:t.allowed===void 0||t.allowed}}_createQuickPick(t,n,i){const e=t.add(this._quickInputService.createQuickPick({useSeparators:!0}));return e.canSelectMany=!0,e.customButton=!0,e.customLabel=a("manageTrustedExtensions.cancel","Cancel"),e.title=a("manageTrustedExtensions","Manage Trusted Extensions"),e.placeholder=a("manageExtensions","Choose which extensions can access this account"),t.add(e.onDidAccept(()=>{const s=e.items.filter(r=>r.type!=="separator").map(r=>r.extension),c=new Set(e.selectedItems.map(r=>r.extension));s.forEach(r=>{r.allowed=c.has(r)}),this._authenticationAccessService.updateAllowedExtensions(n,i,s),e.hide()})),t.add(e.onDidHide(()=>{t.dispose()})),t.add(e.onDidCustom(()=>{e.hide()})),t.add(e.onDidTriggerItemButton(s=>this._commandService.executeCommand("_manageAccountPreferencesForExtension",s.item.extension.id,n))),e}};h=g([u(0,Q),u(1,C),u(2,b),u(3,T),u(4,D),u(5,U),u(6,L),u(7,y)],h);export{ie as ManageTrustedExtensionsForAccountAction};