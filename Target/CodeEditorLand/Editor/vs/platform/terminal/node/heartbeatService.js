import{Emitter as t}from"../../../base/common/event.js";import{Disposable as r,toDisposable as a}from"../../../base/common/lifecycle.js";import{HeartbeatConstants as o}from"../common/terminal.js";class m extends r{_onBeat=this._register(new t);onBeat=this._onBeat.event;constructor(){super();const e=setInterval(()=>{this._onBeat.fire()},o.BeatInterval);this._register(a(()=>clearInterval(e)))}}export{m as HeartbeatService};