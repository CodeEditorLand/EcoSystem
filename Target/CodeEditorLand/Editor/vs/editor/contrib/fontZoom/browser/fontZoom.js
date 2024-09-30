import"../../../browser/editorBrowser.js";import{EditorAction as e,registerEditorAction as t}from"../../../browser/editorExtensions.js";import{EditorZoom as o}from"../../../common/config/editorZoom.js";import*as i from"../../../../nls.js";class n extends e{constructor(){super({id:"editor.action.fontZoomIn",label:i.localize("EditorFontZoomIn.label","Increase Editor Font Size"),alias:"Increase Editor Font Size",precondition:void 0})}run(s,d){o.setZoomLevel(o.getZoomLevel()+1)}}class c extends e{constructor(){super({id:"editor.action.fontZoomOut",label:i.localize("EditorFontZoomOut.label","Decrease Editor Font Size"),alias:"Decrease Editor Font Size",precondition:void 0})}run(s,d){o.setZoomLevel(o.getZoomLevel()-1)}}class l extends e{constructor(){super({id:"editor.action.fontZoomReset",label:i.localize("EditorFontZoomReset.label","Reset Editor Font Size"),alias:"Reset Editor Font Size",precondition:void 0})}run(s,d){o.setZoomLevel(0)}}t(n),t(c),t(l);