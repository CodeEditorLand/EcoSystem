import{Codicon as d}from"../../../../../base/common/codicons.js";import{KeyCode as u,KeyMod as E}from"../../../../../base/common/keyCodes.js";import"../../../../../editor/browser/editorExtensions.js";import{localize2 as w}from"../../../../../nls.js";import{AccessibilitySignal as _,IAccessibilitySignalService as C}from"../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";import{Action2 as g,MenuId as n,registerAction2 as p}from"../../../../../platform/actions/common/actions.js";import{ContextKeyExpr as h}from"../../../../../platform/contextkey/common/contextkey.js";import{KeybindingWeight as V}from"../../../../../platform/keybinding/common/keybindingsRegistry.js";import{ActiveEditorContext as N}from"../../../../common/contextkeys.js";import{CHAT_CATEGORY as f,isChatViewTitleActionContext as S}from"./chatActions.js";import{clearChatEditor as b}from"./chatClear.js";import{CHAT_VIEW_ID as I,EDITS_VIEW_ID as A,IChatWidgetService as T}from"../chat.js";import{ChatEditorInput as x}from"../chatEditorInput.js";import"../chatViewPane.js";import{CONTEXT_IN_CHAT_SESSION as D,CONTEXT_CHAT_ENABLED as m,CONTEXT_CHAT_EDITING_PARTICIPANT_REGISTERED as W}from"../../common/chatContextKeys.js";import{IViewsService as v}from"../../../../services/views/common/viewsService.js";import{ChatAgentLocation as O}from"../../common/chatAgents.js";const H="workbench.action.chat.newChat",K="workbench.action.chat.newEditSession";function ne(){p(class extends g{constructor(){super({id:"workbench.action.chatEditor.newChat",title:w("chat.newChat.label","New Chat"),icon:d.plus,f1:!1,precondition:m,menu:[{id:n.EditorTitle,group:"navigation",order:0,when:N.isEqualTo(x.EditorID)}]})}async run(e,...a){r(e.get(C)),await b(e)}}),p(class extends g{constructor(){super({id:H,title:w("chat.newChat.label","New Chat"),category:f,icon:d.plus,precondition:m,f1:!0,keybinding:{weight:V.WorkbenchContrib,primary:E.CtrlCmd|u.KeyL,mac:{primary:E.WinCtrl|u.KeyL},when:D},menu:[{id:n.ChatContext,group:"z_clear"},{id:n.ViewTitle,when:h.equals("view",I),group:"navigation",order:-1}]})}async run(e,...a){const i=a[0],o=e.get(C);if(S(i))r(o),i.chatView.widget.clear(),i.chatView.widget.focusInput();else{const s=e.get(T),l=e.get(v);let t=s.lastFocusedWidget;t||(t=(await l.openView(I)).widget),r(o),t.clear(),t.focusInput()}}}),p(class extends g{constructor(){super({id:K,title:w("chat.newEdits.label","New Edit Session"),category:f,icon:d.plus,precondition:h.and(m,W),f1:!0,menu:[{id:n.ChatContext,group:"z_clear"},{id:n.ViewTitle,when:h.equals("view",A),group:"navigation",order:-1}]})}async run(e,...a){const i=a[0],o=e.get(C);if(S(i))r(o),i.chatView.widget.clear(),i.chatView.widget.focusInput();else{const s=e.get(T),l=e.get(v);let t=s.lastFocusedWidget;(!t||t.location!==O.EditingSession)&&(t=(await l.openView(A)).widget),r(o),t.clear(),t.focusInput()}}})}function r(c){c.playSignal(_.clear)}export{H as ACTION_ID_NEW_CHAT,K as ACTION_ID_NEW_EDIT_SESSION,ne as registerNewChatActions};
