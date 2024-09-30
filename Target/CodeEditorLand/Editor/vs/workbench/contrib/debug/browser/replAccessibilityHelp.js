import"../../../../editor/browser/editorExtensions.js";import{AccessibleViewProviderId as l,AccessibleViewType as n}from"../../../../platform/accessibility/browser/accessibleView.js";import"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import{ContextKeyExpr as s}from"../../../../platform/contextkey/common/contextkey.js";import{Disposable as c}from"../../../../base/common/lifecycle.js";import{getReplView as a}from"./repl.js";import{IViewsService as p}from"../../../services/views/common/viewsService.js";import{AccessibilityVerbositySettingId as u}from"../../accessibility/browser/accessibilityConfiguration.js";import{localize as e}from"../../../../nls.js";class I{priority=120;name="replHelp";when=s.equals("focusedView","workbench.panel.repl.view");type=n.Help;getProvider(o){const i=o.get(p),t=a(i);if(t)return new d(t)}}class d extends c{constructor(i){super();this._replView=i;this._treeHadFocus=!!i.getFocusedElement()}id=l.ReplHelp;verbositySettingKey=u.Debug;options={type:n.Help};_treeHadFocus=!1;onClose(){if(this._treeHadFocus)return this._replView.focusTree();this._replView.getReplInput().focus()}provideContent(){return[e("repl.help","The debug console is a Read-Eval-Print-Loop that allows you to evaluate expressions and run commands and can be focused with{0}.","<keybinding:workbench.panel.repl.view.focus>"),e("repl.output","The debug console output can be navigated to from the input field with the Focus Previous Widget command{0}.","<keybinding:widgetNavigation.focusPrevious>"),e("repl.input","The debug console input can be navigated to from the output with the Focus Next Widget command{0}.","<keybinding:widgetNavigation.focusNext>"),e("repl.history","The debug console output history can be navigated with the up and down arrow keys."),e("repl.accessibleView","The Open Accessible View command{0} will allow character by character navigation of the console output.","<keybinding:editor.action.accessibleView>"),e("repl.showRunAndDebug","The Show Run and Debug view command{0} will open the Run and Debug view and provides more information about debugging.","<keybinding:workbench.view.debug>"),e("repl.clear","The Debug: Clear Console command{0} will clear the console output.","<keybinding:workbench.debug.panel.action.clearReplAction>"),e("repl.lazyVariables","The setting `debug.expandLazyVariables` controls whether variables are evaluated automatically. This is enabled by default when using a screen reader.")].join(`
`)}}export{I as ReplAccessibilityHelp};