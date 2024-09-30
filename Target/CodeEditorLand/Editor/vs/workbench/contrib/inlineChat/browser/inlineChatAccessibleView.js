import{InlineChatController as s}from"./inlineChatController.js";import{CTX_INLINE_CHAT_FOCUSED as c,CTX_INLINE_CHAT_RESPONSE_FOCUSED as l}from"../common/inlineChat.js";import{ICodeEditorService as m}from"../../../../editor/browser/services/codeEditorService.js";import{ContextKeyExpr as d}from"../../../../platform/contextkey/common/contextkey.js";import{AccessibleViewProviderId as p,AccessibleViewType as i,AccessibleContentProvider as C}from"../../../../platform/accessibility/browser/accessibleView.js";import"../../../../platform/instantiation/common/instantiation.js";import"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import{MarkdownString as a}from"../../../../base/common/htmlContent.js";import{renderMarkdownAsPlaintext as I}from"../../../../base/browser/markdownRenderer.js";import{AccessibilityVerbositySettingId as f}from"../../accessibility/browser/accessibilityConfiguration.js";class P{priority=100;name="inlineChat";when=d.or(c,l);type=i.View;getProvider(n){const r=n.get(m),o=r.getActiveCodeEditor()||r.getFocusedCodeEditor();if(!o)return;const e=s.get(o);if(!e)return;const t=e?.getMessage();if(t)return new C(p.InlineChat,{type:i.View},()=>I(new a(t),!0),()=>e.focus(),f.InlineChat)}}export{P as InlineChatAccessibleView};