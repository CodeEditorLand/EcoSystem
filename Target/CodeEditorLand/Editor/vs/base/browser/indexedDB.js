import"../common/errorMessage.js";import{ErrorNoTelemetry as d}from"../common/errors.js";import{mark as l}from"../common/performance.js";class u extends Error{constructor(s){super("Missing stores");this.db=s}}class b extends Error{code="DBClosed";constructor(r){super(`IndexedDB database '${r}' is closed.`)}}class c{constructor(r,s){this.name=s;this.database=r}static async create(r,s,n){const e=await c.openDatabase(r,s,n);return new c(e,r)}static async openDatabase(r,s,n){l(`code/willOpenDatabase/${r}`);try{return await c.doOpenDatabase(r,s,n)}catch(e){if(e instanceof u){try{await c.deleteDatabase(e.db)}catch(o){throw o}return await c.doOpenDatabase(r,s,n)}throw e}finally{l(`code/didOpenDatabase/${r}`)}}static doOpenDatabase(r,s,n){return new Promise((e,o)=>{const a=indexedDB.open(r,s);a.onerror=()=>o(a.error),a.onsuccess=()=>{const t=a.result;for(const i of n)if(!t.objectStoreNames.contains(i)){o(new u(t));return}e(t)},a.onupgradeneeded=()=>{const t=a.result;for(const i of n)t.objectStoreNames.contains(i)||t.createObjectStore(i)}})}static deleteDatabase(r){return new Promise((s,n)=>{r.close();const e=indexedDB.deleteDatabase(r.name);e.onerror=o=>n(e.error),e.onsuccess=()=>s()})}database=null;pendingTransactions=[];hasPendingTransactions(){return this.pendingTransactions.length>0}close(){this.pendingTransactions.length&&this.pendingTransactions.splice(0,this.pendingTransactions.length).forEach(r=>r.abort()),this.database?.close(),this.database=null}async runInTransaction(r,s,n){if(!this.database)throw new b(this.name);const e=this.database.transaction(r,s);return this.pendingTransactions.push(e),new Promise((o,a)=>{e.oncomplete=()=>{Array.isArray(t)?o(t.map(i=>i.result)):o(t.result)},e.onerror=()=>a(e.error?d.fromError(e.error):new d("unknown error")),e.onabort=()=>a(e.error?d.fromError(e.error):new d("unknown error"));const t=n(e.objectStore(r))}).finally(()=>this.pendingTransactions.splice(this.pendingTransactions.indexOf(e),1))}async getKeyValues(r,s){if(!this.database)throw new b(this.name);const n=this.database.transaction(r,"readonly");return this.pendingTransactions.push(n),new Promise(e=>{const o=new Map,t=n.objectStore(r).openCursor();if(!t)return e(o);t.onsuccess=()=>{t.result?(s(t.result.value)&&o.set(t.result.key.toString(),t.result.value),t.result.continue()):e(o)};const i=g=>{e(o)};t.onerror=()=>i(t.error),n.onerror=()=>i(n.error)}).finally(()=>this.pendingTransactions.splice(this.pendingTransactions.indexOf(n),1))}}export{b as DBClosedError,c as IndexedDB};