import{SimpleWorkerServer as o}from"./simpleWorker.js";let a=!1;function n(s){if(a)return;a=!0;const t=new o(e=>globalThis.postMessage(e),e=>s(e));globalThis.onmessage=e=>{t.onmessage(e.data)}}function l(s){globalThis.onmessage=t=>{a||n(s)}}export{l as bootstrapSimpleWorker};