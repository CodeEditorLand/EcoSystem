var b=Object.defineProperty;var T=Object.getOwnPropertyDescriptor;var p=(a,n,e,i)=>{for(var t=i>1?void 0:i?T(n,e):n,o=a.length-1,s;o>=0;o--)(s=a[o])&&(t=(i?s(n,e,t):s(t))||t);return i&&t&&b(n,e,t),t},r=(a,n)=>(e,i)=>n(e,i,a);import{Disposable as y,dispose as S}from"../../../../base/common/lifecycle.js";import{isEqual as g}from"../../../../base/common/resources.js";import*as c from"../../../../nls.js";import{ConfigurationTarget as d,IConfigurationService as R}from"../../../../platform/configuration/common/configuration.js";import{ConfigurationScope as h,Extensions as k}from"../../../../platform/configuration/common/configurationRegistry.js";import{Registry as D}from"../../../../platform/registry/common/platform.js";import{IWorkspaceContextService as O,WorkbenchState as v}from"../../../../platform/workspace/common/workspace.js";import{workbenchConfigurationNodeBase as W}from"../../../common/configuration.js";import"../../../common/contributions.js";import"../../../common/editor.js";import{SideBySideEditorInput as L}from"../../../common/editor/sideBySideEditorInput.js";import{RegisteredEditorPriority as w,IEditorResolverService as P}from"../../../services/editor/common/editorResolverService.js";import{ITextEditorService as _}from"../../../services/textfile/common/textEditorService.js";import{DEFAULT_SETTINGS_EDITOR_SETTING as u,FOLDER_SETTINGS_PATH as m,IPreferencesService as x,USE_SPLIT_JSON_SETTING as I}from"../../../services/preferences/common/preferences.js";import{IUserDataProfileService as N}from"../../../services/userDataProfile/common/userDataProfile.js";import{IFileService as F}from"../../../../platform/files/common/files.js";import{SettingsFileSystemProvider as E}from"./settingsFilesystemProvider.js";import{IInstantiationService as A}from"../../../../platform/instantiation/common/instantiation.js";let l=class extends y{constructor(e,i,t,o,s,z,U,G){super();this.instantiationService=i;this.preferencesService=t;this.userDataProfileService=o;this.workspaceService=s;this.configurationService=z;this.editorResolverService=U;this.textEditorService=G;this._register(this.configurationService.onDidChangeConfiguration(f=>{(f.affectsConfiguration(I)||f.affectsConfiguration(u))&&this.handleSettingsEditorRegistration()})),this.handleSettingsEditorRegistration();const C=this._register(this.instantiationService.createInstance(E));this._register(e.registerProvider(E.SCHEMA,C))}static ID="workbench.contrib.preferences";editorOpeningListener;handleSettingsEditorRegistration(){S(this.editorOpeningListener),(this.configurationService.getValue(I)||this.configurationService.getValue(u))&&(this.editorOpeningListener=this.editorResolverService.registerEditor("**/settings.json",{id:L.ID,label:c.localize("splitSettingsEditorLabel","Split Settings Editor"),priority:w.builtin},{},{createEditorInput:({resource:e,options:i})=>{if(g(e,this.userDataProfileService.currentProfile.settingsResource))return{editor:this.preferencesService.createSplitJsonEditorInput(d.USER_LOCAL,e),options:i};const t=this.workspaceService.getWorkbenchState();if(t===v.FOLDER){const o=this.workspaceService.getWorkspace().folders;if(g(e,o[0].toResource(m)))return{editor:this.preferencesService.createSplitJsonEditorInput(d.WORKSPACE,e),options:i}}else if(t===v.WORKSPACE){const o=this.workspaceService.getWorkspace().folders;for(const s of o)if(g(e,s.toResource(m)))return{editor:this.preferencesService.createSplitJsonEditorInput(d.WORKSPACE_FOLDER,e),options:i}}return{editor:this.textEditorService.createTextEditor({resource:e}),options:i}}}))}dispose(){S(this.editorOpeningListener),super.dispose()}};l=p([r(0,F),r(1,A),r(2,x),r(3,N),r(4,O),r(5,R),r(6,P),r(7,_)],l);const B=D.as(k.Configuration);B.registerConfiguration({...W,properties:{"workbench.settings.enableNaturalLanguageSearch":{type:"boolean",description:c.localize("enableNaturalLanguageSettingsSearch","Controls whether to enable the natural language search mode for settings. The natural language search is provided by a Microsoft online service."),default:!0,scope:h.WINDOW,tags:["usesOnlineServices"]},"workbench.settings.settingsSearchTocBehavior":{type:"string",enum:["hide","filter"],enumDescriptions:[c.localize("settingsSearchTocBehavior.hide","Hide the Table of Contents while searching."),c.localize("settingsSearchTocBehavior.filter","Filter the Table of Contents to just categories that have matching settings. Clicking on a category will filter the results to that category.")],description:c.localize("settingsSearchTocBehavior","Controls the behavior of the Settings editor Table of Contents while searching. If this setting is being changed in the Settings editor, the setting will take effect after the search query is modified."),default:"filter",scope:h.WINDOW}}});export{l as PreferencesContribution};