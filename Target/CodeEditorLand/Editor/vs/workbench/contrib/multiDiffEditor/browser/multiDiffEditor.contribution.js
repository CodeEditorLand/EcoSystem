import{localize as a}from"../../../../nls.js";import{registerAction2 as i}from"../../../../platform/actions/common/actions.js";import{Extensions as s}from"../../../../platform/configuration/common/configurationRegistry.js";import{SyncDescriptor as p}from"../../../../platform/instantiation/common/descriptors.js";import{Registry as r}from"../../../../platform/registry/common/platform.js";import{EditorPaneDescriptor as u}from"../../../browser/editor.js";import{WorkbenchPhase as o,registerWorkbenchContribution2 as t}from"../../../common/contributions.js";import{EditorExtensions as e}from"../../../common/editor.js";import{MultiDiffEditor as n}from"./multiDiffEditor.js";import{MultiDiffEditorInput as f,MultiDiffEditorResolverContribution as l,MultiDiffEditorSerializer as c}from"./multiDiffEditorInput.js";import{CollapseAllAction as d,ExpandAllAction as E,GoToFileAction as g}from"./actions.js";import{IMultiDiffSourceResolverService as D,MultiDiffSourceResolverService as y}from"./multiDiffSourceResolverService.js";import{InstantiationType as I,registerSingleton as S}from"../../../../platform/instantiation/common/extensions.js";import{OpenScmGroupAction as R,ScmMultiDiffSourceResolverContribution as m}from"./scmMultiDiffSourceResolver.js";i(g),i(d),i(E),r.as(s.Configuration).registerConfiguration({properties:{"multiDiffEditor.experimental.enabled":{type:"boolean",default:!0,description:"Enable experimental multi diff editor."}}}),S(D,y,I.Delayed),t(l.ID,l,o.BlockStartup),r.as(e.EditorPane).registerEditorPane(u.create(n,n.ID,a("name","Multi Diff Editor")),[new p(f)]),r.as(e.EditorFactory).registerEditorSerializer(f.ID,c),i(R),t(m.ID,m,o.BlockStartup);