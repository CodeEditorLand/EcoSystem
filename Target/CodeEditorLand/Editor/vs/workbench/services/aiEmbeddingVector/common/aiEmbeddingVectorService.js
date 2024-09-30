var p=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var l=(a,e,i,r)=>{for(var o=r>1?void 0:r?b(e,i):e,t=a.length-1,d;t>=0;t--)(d=a[t])&&(o=(r?d(e,i,o):d(o))||o);return r&&o&&p(e,i,o),o},m=(a,e)=>(i,r)=>e(i,r,a);import{createDecorator as v}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../base/common/cancellation.js";import{createCancelablePromise as g,raceCancellablePromises as E,timeout as u}from"../../../../base/common/async.js";import"../../../../base/common/lifecycle.js";import{InstantiationType as h,registerSingleton as f}from"../../../../platform/instantiation/common/extensions.js";import{StopWatch as I}from"../../../../base/common/stopwatch.js";import{ILogService as P}from"../../../../platform/log/common/log.js";const y=v("IAiEmbeddingVectorService");let s=class{constructor(e){this.logService=e}_serviceBrand;static DEFAULT_TIMEOUT=1e3*10;_providers=[];isEnabled(){return this._providers.length>0}registerAiEmbeddingVectorProvider(e,i){return this._providers.push(i),{dispose:()=>{const r=this._providers.indexOf(i);r>=0&&this._providers.splice(r,1)}}}async getEmbeddingVector(e,i){if(this._providers.length===0)throw new Error("No embedding vector providers registered");const r=I.create(),o=[],t=u(s.DEFAULT_TIMEOUT),d=i.onCancellationRequested(()=>{d.dispose(),t.cancel()});for(const n of this._providers)o.push(g(async c=>{try{return await n.provideAiEmbeddingVector(Array.isArray(e)?e:[e],c)}catch{}throw await t,new Error("Embedding vector provider timed out")}));o.push(g(async n=>{const c=n.onCancellationRequested(()=>{t.cancel(),c.dispose()});throw await t,new Error("Embedding vector provider timed out")}));try{const n=await E(o);return n.length===1?n[0]:n}finally{r.stop(),this.logService.trace(`[AiEmbeddingVectorService]: getEmbeddingVector took ${r.elapsed()}ms`)}}};s=l([m(0,P)],s),f(y,s,h.Delayed);export{s as AiEmbeddingVectorService,y as IAiEmbeddingVectorService};