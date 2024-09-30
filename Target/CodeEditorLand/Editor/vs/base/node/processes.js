import"child_process";import{promises as p}from"fs";import*as s from"../common/path.js";import*as m from"../common/platform.js";import*as l from"../common/process.js";import{Source as d,TerminateResponseCode as g}from"../common/processes.js";import*as y from"../common/types.js";import*as x from"./pfs.js";function j(f=l.env){return f.comspec||"cmd.exe"}function k(f){let a=[],r=!1;const t=function(n){if(r){a.push(n);return}(!f.send(n,u=>{if(r=!1,a.length>0){const i=a.slice(0);a=[],i.forEach(e=>t(e))}})||m.isWindows)&&(r=!0)};return{send:t}}var P;(a=>{async function f(r,t,n){if(s.isAbsolute(r))return r;if(t===void 0&&(t=l.cwd()),s.dirname(r)!=="."||(n===void 0&&y.isString(l.env.PATH)&&(n=l.env.PATH.split(s.delimiter)),n===void 0||n.length===0))return s.join(t,r);async function u(i){if(await x.Promises.exists(i)){let e;try{e=await p.stat(i)}catch(o){o.message.startsWith("EACCES")&&(e=await p.lstat(i))}return e?!e.isDirectory():!1}return!1}for(const i of n){let e;if(s.isAbsolute(i)?e=s.join(i,r):e=s.join(t,i,r),await u(e))return e;let o=e+".com";if(await u(o)||(o=e+".exe",await u(o)))return o}return s.join(t,r)}a.findExecutable=f})(P||={});export{d as Source,g as TerminateResponseCode,k as createQueuedSender,j as getWindowsShell,P as win32};