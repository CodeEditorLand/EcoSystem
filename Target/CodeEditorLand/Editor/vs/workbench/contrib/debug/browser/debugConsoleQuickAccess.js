var S=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var k=(o,s,i,c)=>{for(var r=c>1?void 0:c?d(s,i):s,e=o.length-1,t;e>=0;e--)(t=o[e])&&(r=(c?t(s,i,r):t(r))||r);return c&&r&&S(s,i,r),r},n=(o,s)=>(i,c)=>s(i,c,o);import"../../../../base/common/cancellation.js";import{matchesFuzzy as I}from"../../../../base/common/filters.js";import"../../../../base/common/lifecycle.js";import{localize as v}from"../../../../nls.js";import{ICommandService as P}from"../../../../platform/commands/common/commands.js";import{PickerQuickAccessProvider as f}from"../../../../platform/quickinput/browser/pickerQuickAccess.js";import"../../../../platform/quickinput/common/quickInput.js";import{IViewsService as h}from"../../../services/views/common/viewsService.js";import{DEBUG_CONSOLE_QUICK_ACCESS_PREFIX as _,SELECT_AND_START_ID as b}from"./debugCommands.js";import{IDebugService as g,REPL_VIEW_ID as l}from"../common/debug.js";let m=class extends f{constructor(i,c,r){super(_,{canAcceptInBackground:!0});this._debugService=i;this._viewsService=c;this._commandService=r}_getPicks(i,c,r){const e=[];this._debugService.getModel().getSessions(!0).filter(a=>a.hasSeparateRepl()).forEach((a,u)=>{const p=this._createPick(a,u,i);p&&e.push(p)}),e.length>0&&e.push({type:"separator"});const t=v("workbench.action.debug.startDebug","Start a New Debug Session");return e.push({label:`$(plus) ${t}`,ariaLabel:t,accept:()=>this._commandService.executeCommand(b)}),e}_createPick(i,c,r){const e=i.name,t=I(r,e,!0);if(t)return{label:e,highlights:{label:t},accept:(a,u)=>{this._debugService.focusStackFrame(void 0,void 0,i,{explicit:!0}),this._viewsService.isViewVisible(l)||this._viewsService.openView(l,!0)}}}};m=k([n(0,g),n(1,h),n(2,P)],m);export{m as DebugConsoleQuickAccess};