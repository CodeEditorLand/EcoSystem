import"../../../../base/common/buffer.js";import"../../../../base/common/uri.js";import"../../../../platform/files/common/files.js";import{InstantiationType as r,registerSingleton as t}from"../../../../platform/instantiation/common/extensions.js";import{IElevatedFileService as i}from"../common/elevatedFileService.js";class a{_serviceBrand;isSupported(e){return!1}async writeFileElevated(e,l,f){throw new Error("Unsupported")}}t(i,a,r.Delayed);export{a as BrowserElevatedFileService};