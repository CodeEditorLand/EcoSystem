import s from"./vs_code_editor_walkthrough.js";import{localize as l,localize2 as e}from"../../../../../nls.js";import{IEditorService as u}from"../../../../services/editor/common/editorService.js";import{IInstantiationService as d}from"../../../../../platform/instantiation/common/instantiation.js";import{WalkThroughInput as o}from"../walkThroughInput.js";import{FileAccess as h,Schemas as p}from"../../../../../base/common/network.js";import"../../../../common/editor.js";import"../../../../common/editor/editorInput.js";import{Action2 as m}from"../../../../../platform/actions/common/actions.js";import{Categories as g}from"../../../../../platform/action/common/actionCommonCategories.js";import{walkThroughContentRegistry as I}from"../../common/walkThroughContentProvider.js";I.registerProvider("vs/workbench/contrib/welcomeWalkthrough/browser/editor/vs_code_editor_walkthrough",s);const i="workbench.editors.walkThroughInput",n={typeId:i,name:l("editorWalkThrough.title","Editor Playground"),resource:h.asBrowserUri("vs/workbench/contrib/welcomeWalkthrough/browser/editor/vs_code_editor_walkthrough.md").with({scheme:p.walkThrough,query:JSON.stringify({moduleId:"vs/workbench/contrib/welcomeWalkthrough/browser/editor/vs_code_editor_walkthrough"})}),telemetryFrom:"walkThrough"};class t extends m{static ID="workbench.action.showInteractivePlayground";static LABEL=e("editorWalkThrough","Interactive Editor Playground");constructor(){super({id:t.ID,title:t.LABEL,category:g.Help,f1:!0,metadata:{description:e("editorWalkThroughMetadata","Opens an interactive playground for learning about the editor.")}})}run(r){const a=r.get(u),c=r.get(d).createInstance(o,n);return a.openEditor(c,{pinned:!0}).then(()=>{})}}class B{static ID=i;canSerialize(r){return!0}serialize(r){return""}deserialize(r){return r.createInstance(o,n)}}export{t as EditorWalkThroughAction,B as EditorWalkThroughInputSerializer};
