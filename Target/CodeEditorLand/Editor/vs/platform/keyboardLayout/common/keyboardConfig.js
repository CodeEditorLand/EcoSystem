import*as e from"../../../nls.js";import"../../configuration/common/configuration.js";import{OS as t,OperatingSystem as r}from"../../../base/common/platform.js";import{ConfigurationScope as n,Extensions as l}from"../../configuration/common/configurationRegistry.js";import{Registry as s}from"../../registry/common/platform.js";var c=(o=>(o[o.Code=0]="Code",o[o.KeyCode=1]="KeyCode",o))(c||{});function k(a){const i=a.getValue("keyboard"),o=i?.dispatch==="keyCode"?1:0,d=!!i?.mapAltGrToCtrlAlt;return{dispatch:o,mapAltGrToCtrlAlt:d}}const p=s.as(l.Configuration),C={id:"keyboard",order:15,type:"object",title:e.localize("keyboardConfigurationTitle","Keyboard"),properties:{"keyboard.dispatch":{scope:n.APPLICATION,type:"string",enum:["code","keyCode"],default:"code",markdownDescription:e.localize("dispatch","Controls the dispatching logic for key presses to use either `code` (recommended) or `keyCode`."),included:t===r.Macintosh||t===r.Linux},"keyboard.mapAltGrToCtrlAlt":{scope:n.APPLICATION,type:"boolean",default:!1,markdownDescription:e.localize("mapAltGrToCtrlAlt","Controls if the AltGraph+ modifier should be treated as Ctrl+Alt+."),included:t===r.Windows}}};p.registerConfiguration(C);export{c as DispatchConfig,k as readKeyboardConfig};