import"../../../base/common/event.js";import{Disposable as o}from"../../../base/common/lifecycle.js";import"../../../base/parts/ipc/common/ipc.js";import{TelemetryLevel as m}from"./telemetry.js";import"./telemetryUtils.js";import"./serverTelemetryService.js";class S extends o{constructor(n,e){super();this.telemetryService=n;this.telemetryAppender=e}async call(n,e,r){switch(e){case"updateTelemetryLevel":{const{telemetryLevel:t}=r;return this.telemetryService.updateInjectedTelemetryLevel(t)}case"logTelemetry":{const{eventName:t,data:l}=r;return this.telemetryAppender?this.telemetryAppender.log(t,l):Promise.resolve()}case"flushTelemetry":return this.telemetryAppender?this.telemetryAppender.flush():Promise.resolve();case"ping":return}throw new Error(`IPC Command ${e} not found`)}listen(n,e,r){throw new Error("Not supported")}dispose(){this.telemetryService.updateInjectedTelemetryLevel(m.NONE),super.dispose()}}export{S as ServerTelemetryChannel};