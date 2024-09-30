import{StorageScope as r}from"../../platform/storage/common/storage.js";import{isEmptyObject as a}from"../../base/common/types.js";import{onUnexpectedError as n}from"../../base/common/errors.js";import"../../base/common/lifecycle.js";import"../../base/common/event.js";class t{constructor(e,o){this.storageService=o;this.id=t.COMMON_PREFIX+e}static applicationMementos=new Map;static profileMementos=new Map;static workspaceMementos=new Map;static COMMON_PREFIX="memento/";id;getMemento(e,o){switch(e){case r.WORKSPACE:{let i=t.workspaceMementos.get(this.id);return i||(i=new s(this.id,e,o,this.storageService),t.workspaceMementos.set(this.id,i)),i.getMemento()}case r.PROFILE:{let i=t.profileMementos.get(this.id);return i||(i=new s(this.id,e,o,this.storageService),t.profileMementos.set(this.id,i)),i.getMemento()}case r.APPLICATION:{let i=t.applicationMementos.get(this.id);return i||(i=new s(this.id,e,o,this.storageService),t.applicationMementos.set(this.id,i)),i.getMemento()}}}onDidChangeValue(e,o){return this.storageService.onDidChangeValue(e,this.id,o)}saveMemento(){t.workspaceMementos.get(this.id)?.save(),t.profileMementos.get(this.id)?.save(),t.applicationMementos.get(this.id)?.save()}reloadMemento(e){let o;switch(e){case r.APPLICATION:o=t.applicationMementos.get(this.id);break;case r.PROFILE:o=t.profileMementos.get(this.id);break;case r.WORKSPACE:o=t.workspaceMementos.get(this.id);break}o?.reload()}static clear(e){switch(e){case r.WORKSPACE:t.workspaceMementos.clear();break;case r.PROFILE:t.profileMementos.clear();break;case r.APPLICATION:t.applicationMementos.clear();break}}}class s{constructor(e,o,i,p){this.id=e;this.scope=o;this.target=i;this.storageService=p;this.mementoObj=this.doLoad()}mementoObj;doLoad(){try{return this.storageService.getObject(this.id,this.scope,{})}catch(e){n(`[memento]: failed to parse contents: ${e} (id: ${this.id}, scope: ${this.scope}, contents: ${this.storageService.get(this.id,this.scope)})`)}return{}}getMemento(){return this.mementoObj}reload(){for(const e of Object.getOwnPropertyNames(this.mementoObj))delete this.mementoObj[e];Object.assign(this.mementoObj,this.doLoad())}save(){a(this.mementoObj)?this.storageService.remove(this.id,this.scope):this.storageService.store(this.id,this.mementoObj,this.scope,this.target)}}export{t as Memento};