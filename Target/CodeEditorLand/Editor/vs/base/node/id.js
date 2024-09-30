import{networkInterfaces as u}from"os";import{TernarySearchTree as o}from"../common/ternarySearchTree.js";import*as h from"../common/uuid.js";import{getMac as d}from"./macAddress.js";import{isWindows as v}from"../common/platform.js";const g=new class{_virtualMachineOUIs;_value;_isVirtualMachineMacAddress(e){return this._virtualMachineOUIs||(this._virtualMachineOUIs=o.forStrings(),this._virtualMachineOUIs.set("00-50-56",!0),this._virtualMachineOUIs.set("00-0C-29",!0),this._virtualMachineOUIs.set("00-05-69",!0),this._virtualMachineOUIs.set("00-03-FF",!0),this._virtualMachineOUIs.set("00-1C-42",!0),this._virtualMachineOUIs.set("00-16-3E",!0),this._virtualMachineOUIs.set("08-00-27",!0),this._virtualMachineOUIs.set("00:50:56",!0),this._virtualMachineOUIs.set("00:0C:29",!0),this._virtualMachineOUIs.set("00:05:69",!0),this._virtualMachineOUIs.set("00:03:FF",!0),this._virtualMachineOUIs.set("00:1C:42",!0),this._virtualMachineOUIs.set("00:16:3E",!0),this._virtualMachineOUIs.set("08:00:27",!0)),!!this._virtualMachineOUIs.findSubstr(e)}value(){if(this._value===void 0){let e=0,t=0;const r=u();for(const n in r){const a=r[n];if(a)for(const{mac:s,internal:c}of a)c||(t+=1,this._isVirtualMachineMacAddress(s.toUpperCase())&&(e+=1))}this._value=t>0?e/t:0}return this._value}};let i;async function O(e){return i||(i=(async()=>await l(e)||h.generateUuid())()),i}async function l(e){try{const t=await import("crypto"),r=d();return t.createHash("sha256").update(r,"utf8").digest("hex")}catch(t){e(t);return}}const M="Software\\Microsoft\\SQMClient";async function U(e){if(v){const t=await import("@vscode/windows-registry");try{return t.GetStringRegKey("HKEY_LOCAL_MACHINE",M,"MachineId")||""}catch(r){return e(r),""}}return""}async function p(e){try{return await(await import("@vscode/deviceid")).getDeviceId()}catch(t){return e(t),""}}export{O as getMachineId,U as getSqmMachineId,p as getdevDeviceId,g as virtualMachineHint};