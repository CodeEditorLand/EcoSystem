import{URI as r}from"../../../base/common/uri.js";import{MainContext as t}from"./extHost.protocol.js";import{checkProposedApiEnabled as a}from"../../services/extensions/common/extensions.js";import"../../../platform/extensions/common/extensions.js";class v{_proxy;constructor(o){this._proxy=o.getProxy(t.MainThreadDialogs)}showOpenDialog(o,e){return e?.allowUIResources&&a(o,"showLocal"),this._proxy.$showOpenDialog(e).then(i=>i?i.map(n=>r.revive(n)):void 0)}showSaveDialog(o){return this._proxy.$showSaveDialog(o).then(e=>e?r.revive(e):void 0)}}export{v as ExtHostDialogs};