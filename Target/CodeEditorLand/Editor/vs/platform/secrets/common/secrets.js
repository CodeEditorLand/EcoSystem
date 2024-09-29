var l=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var v=(n,s,e,t)=>{for(var r=t>1?void 0:t?y(s,e):s,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(t?o(s,e,r):o(r))||r);return t&&r&&l(s,e,r),r},c=(n,s)=>(e,t)=>s(e,t,n);import{SequencerByKey as h}from"../../../base/common/async.js";import{IEncryptionService as p}from"../../encryption/common/encryptionService.js";import{createDecorator as u}from"../../instantiation/common/instantiation.js";import{IStorageService as _,InMemoryStorageService as m,StorageScope as a,StorageTarget as f}from"../../storage/common/storage.js";import{Emitter as I}from"../../../base/common/event.js";import{ILogService as P}from"../../log/common/log.js";import{Disposable as D,DisposableStore as C}from"../../../base/common/lifecycle.js";import{Lazy as d}from"../../../base/common/lazy.js";const V=u("secretStorageService");let g=class extends D{constructor(e,t,r,i){super();this._useInMemoryStorage=e;this._storageService=t;this._encryptionService=r;this._logService=i}_storagePrefix="secret://";onDidChangeSecretEmitter=this._register(new I);onDidChangeSecret=this.onDidChangeSecretEmitter.event;_sequencer=new h;_type="unknown";_onDidChangeValueDisposable=this._register(new C);get type(){return this._type}_lazyStorageService=new d(()=>this.initialize());get resolvedStorageService(){return this._lazyStorageService.value}get(e){return this._sequencer.queue(e,async()=>{const t=await this.resolvedStorageService,r=this.getKey(e);this._logService.trace("[secrets] getting secret for key:",r);const i=t.get(r,a.APPLICATION);if(!i){this._logService.trace("[secrets] no secret found for key:",r);return}try{this._logService.trace("[secrets] decrypting gotten secret for key:",r);const o=this._type==="in-memory"?i:await this._encryptionService.decrypt(i);return this._logService.trace("[secrets] decrypted secret for key:",r),o}catch(o){this._logService.error(o),this.delete(e);return}})}set(e,t){return this._sequencer.queue(e,async()=>{const r=await this.resolvedStorageService;this._logService.trace("[secrets] encrypting secret for key:",e);let i;try{i=this._type==="in-memory"?t:await this._encryptionService.encrypt(t)}catch(S){throw this._logService.error(S),S}const o=this.getKey(e);this._logService.trace("[secrets] storing encrypted secret for key:",o),r.store(o,i,a.APPLICATION,f.MACHINE),this._logService.trace("[secrets] stored encrypted secret for key:",o)})}delete(e){return this._sequencer.queue(e,async()=>{const t=await this.resolvedStorageService,r=this.getKey(e);this._logService.trace("[secrets] deleting secret for key:",r),t.remove(r,a.APPLICATION),this._logService.trace("[secrets] deleted secret for key:",r)})}async initialize(){let e;if(!this._useInMemoryStorage&&await this._encryptionService.isEncryptionAvailable())this._logService.trace("[SecretStorageService] Encryption is available, using persisted storage"),this._type="persisted",e=this._storageService;else{if(this._type==="in-memory")return this._storageService;this._logService.trace("[SecretStorageService] Encryption is not available, falling back to in-memory storage"),this._type="in-memory",e=this._register(new m)}return this._onDidChangeValueDisposable.clear(),this._onDidChangeValueDisposable.add(e.onDidChangeValue(a.APPLICATION,void 0,this._onDidChangeValueDisposable)(t=>{this.onDidChangeValue(t.key)})),e}reinitialize(){this._lazyStorageService=new d(()=>this.initialize())}onDidChangeValue(e){if(!e.startsWith(this._storagePrefix))return;const t=e.slice(this._storagePrefix.length);this._logService.trace(`[SecretStorageService] Notifying change in value for secret: ${t}`),this.onDidChangeSecretEmitter.fire(t)}getKey(e){return`${this._storagePrefix}${e}`}};g=v([c(1,_),c(2,p),c(3,P)],g);export{g as BaseSecretStorageService,V as ISecretStorageService};
