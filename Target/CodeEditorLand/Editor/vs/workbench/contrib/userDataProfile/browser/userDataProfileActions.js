import{localize2 as o}from"../../../../nls.js";import{Categories as i}from"../../../../platform/action/common/actionCommonCategories.js";import{Action2 as s,registerAction2 as t}from"../../../../platform/actions/common/actions.js";import"../../../../platform/instantiation/common/instantiation.js";import{IUserDataProfilesService as a}from"../../../../platform/userDataProfile/common/userDataProfile.js";import{IUserDataProfileManagementService as l,PROFILES_CATEGORY as p,PROFILES_ENABLEMENT_CONTEXT as c}from"../../../services/userDataProfile/common/userDataProfile.js";class r extends s{static ID="workbench.profiles.actions.createTemporaryProfile";static TITLE=o("create temporary profile","Create a Temporary Profile");constructor(){super({id:r.ID,title:r.TITLE,category:p,f1:!0,precondition:c})}async run(e){return e.get(l).createAndEnterTransientProfile()}}t(r),t(class extends s{constructor(){super({id:"workbench.profiles.actions.cleanupProfiles",title:o("cleanup profile","Cleanup Profiles"),category:i.Developer,f1:!0,precondition:c})}async run(e){return e.get(a).cleanUp()}}),t(class extends s{constructor(){super({id:"workbench.profiles.actions.resetWorkspaces",title:o("reset workspaces","Reset Workspace Profiles Associations"),category:i.Developer,f1:!0,precondition:c})}async run(e){return e.get(a).resetWorkspaces()}});