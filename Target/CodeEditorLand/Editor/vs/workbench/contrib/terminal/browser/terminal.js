import"../../../../base/browser/dom.js";import"../../../../base/browser/ui/splitview/splitview.js";import"../../../../base/common/color.js";import"../../../../base/common/event.js";import"../../../../base/common/lifecycle.js";import"../../../../base/common/platform.js";import"../../../../base/common/uri.js";import{createDecorator as o}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../platform/quickinput/common/quickInput.js";import"../../../../platform/terminal/common/capabilities/capabilities.js";import"../../../../platform/terminal/common/environmentVariable.js";import"../../../../platform/terminal/common/terminal.js";import"../../../../platform/theme/common/themeService.js";import"../../../../platform/workspace/common/workspace.js";import"../../../common/editor/editorInput.js";import"../../../common/views.js";import"./terminalStatusList.js";import"./xterm/xtermTerminal.js";import"../common/terminal.js";import"./xterm/markNavigationAddon.js";import"../../../../platform/contextkey/common/contextkey.js";import"../../../common/editor.js";import"../../../services/editor/common/editorService.js";const Me=o("terminalService"),Ae=o("terminalConfigurationService"),Oe=o("terminalEditorService"),we=o("terminalGroupService"),Ge=o("terminalInstanceService");var a=(e=>(e[e.Left=0]="Left",e[e.Right=1]="Right",e[e.Up=2]="Up",e[e.Down=3]="Down",e))(a||{}),l=(r=>(r[r.Connecting=0]="Connecting",r[r.Connected=1]="Connected",r))(l||{});const Be=t=>typeof t.instanceId!="number";class Fe extends MouseEvent{}const Ue="terminalEditor";var s=(i=>(i[i.SearchHighlightLimit=1e3]="SearchHighlightLimit",i))(s||{}),d=(n=>(n[n.Unknown=1]="Unknown",n[n.Fedora=2]="Fedora",n[n.Ubuntu=3]="Ubuntu",n))(d||{}),c=(i=>(i.Terminals="Terminals",i))(c||{});export{a as Direction,Ae as ITerminalConfigurationService,Oe as ITerminalEditorService,we as ITerminalGroupService,Ge as ITerminalInstanceService,Me as ITerminalService,d as LinuxDistro,l as TerminalConnectionState,c as TerminalDataTransfers,Fe as TerminalLinkQuickPickEvent,s as XtermTerminalConstants,Be as isDetachedTerminalInstance,Ue as terminalEditorId};