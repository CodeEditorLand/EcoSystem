import{Codicon as e}from"../../../../../base/common/codicons.js";import"../../../../../editor/browser/editorExtensions.js";import{localize2 as r}from"../../../../../nls.js";import{Categories as i}from"../../../../../platform/action/common/actionCommonCategories.js";import{Action2 as c,registerAction2 as s}from"../../../../../platform/actions/common/actions.js";import{IChatWidgetService as a}from"../chat.js";function f(){s(t)}class t extends c{static ID="workbench.action.chat.logInputHistory";constructor(){super({id:t.ID,title:r("workbench.action.chat.logInputHistory.label","Log Chat Input History"),icon:e.attach,category:i.Developer,f1:!0})}async run(o,...n){o.get(a).lastFocusedWidget?.logInputHistory()}}export{f as registerChatDeveloperActions};