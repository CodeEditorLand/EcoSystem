import{IEditorPaneService as n}from"../common/editorPaneService.js";import{EditorPaneDescriptor as e}from"../../../browser/editor.js";import{InstantiationType as i,registerSingleton as r}from"../../../../platform/instantiation/common/extensions.js";class a{onWillInstantiateEditorPane=e.onWillInstantiateEditorPane;didInstantiateEditorPane(t){return e.didInstantiateEditorPane(t)}}r(n,a,i.Delayed);export{a as EditorPaneService};
