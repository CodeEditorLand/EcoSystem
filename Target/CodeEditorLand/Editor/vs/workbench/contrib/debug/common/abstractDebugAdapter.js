import{Emitter as i}from"../../../../base/common/event.js";import"./debug.js";import{timeout as a}from"../../../../base/common/async.js";import{localize as l}from"../../../../nls.js";class v{sequence;pendingRequests=new Map;requestCallback;eventCallback;messageCallback;queue=[];_onError=new i;_onExit=new i;constructor(){this.sequence=1}get onError(){return this._onError.event}get onExit(){return this._onExit.event}onMessage(e){this.messageCallback&&this._onError.fire(new Error("attempt to set more than one 'Message' callback")),this.messageCallback=e}onEvent(e){this.eventCallback&&this._onError.fire(new Error("attempt to set more than one 'Event' callback")),this.eventCallback=e}onRequest(e){this.requestCallback&&this._onError.fire(new Error("attempt to set more than one 'Request' callback")),this.requestCallback=e}sendResponse(e){e.seq>0?this._onError.fire(new Error(`attempt to send more than one response for command ${e.command}`)):this.internalSend("response",e)}sendRequest(e,t,s,r){const o={command:e};if(t&&Object.keys(t).length>0&&(o.arguments=t),this.internalSend("request",o),typeof r=="number"){const u=setTimeout(()=>{clearTimeout(u);const n=this.pendingRequests.get(o.seq);if(n){this.pendingRequests.delete(o.seq);const c={type:"response",seq:0,request_seq:o.seq,success:!1,command:e,message:l("timeout","Timeout after {0} ms for '{1}'",r,e)};n(c)}},r)}return s&&this.pendingRequests.set(o.seq,s),o.seq}acceptMessage(e){this.messageCallback?this.messageCallback(e):(this.queue.push(e),this.queue.length===1&&this.processQueue())}needsTaskBoundaryBetween(e,t){return e.type!=="event"||t.type!=="event"}async processQueue(){let e;for(;this.queue.length;){if((!e||this.needsTaskBoundaryBetween(this.queue[0],e))&&await a(0),e=this.queue.shift(),!e)return;switch(e.type){case"event":this.eventCallback?.(e);break;case"request":this.requestCallback?.(e);break;case"response":{const t=e,s=this.pendingRequests.get(t.request_seq);s&&(this.pendingRequests.delete(t.request_seq),s(t));break}}}}internalSend(e,t){t.type=e,t.seq=this.sequence++,this.sendMessage(t)}async cancelPendingRequests(){if(this.pendingRequests.size===0)return Promise.resolve();const e=new Map;this.pendingRequests.forEach((t,s)=>e.set(s,t)),await a(500),e.forEach((t,s)=>{t({type:"response",seq:0,request_seq:s,success:!1,command:"canceled",message:"canceled"}),this.pendingRequests.delete(s)})}getPendingRequestIds(){return Array.from(this.pendingRequests.keys())}dispose(){this.queue=[]}}export{v as AbstractDebugAdapter};