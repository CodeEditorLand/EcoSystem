import"../../../../base/common/uri.js";import"../../../../base/common/worker/simpleWorker.js";import"./search.js";class r{static CHANNEL_NAME="localFileSearchWorkerHost";static getChannel(e){return e.getChannel(r.CHANNEL_NAME)}static setChannel(e,o){e.setChannel(r.CHANNEL_NAME,o)}}export{r as LocalFileSearchSimpleWorkerHost};