import { Event } from '../../../../../base/common/event.js';
import { IDisposable } from '../../../../../base/common/lifecycle.js';
import { IAction } from '../../../../../base/common/actions.js';
import { CancellationToken } from '../../../../../base/common/cancellation.js';
import { URI } from '../../../../../base/common/uri.js';
import { ITerminalCommandSelector, ITerminalOutputMatch, ITerminalOutputMatcher } from '../../../../../platform/terminal/common/terminal.js';
import { ITerminalCommand } from '../../../../../platform/terminal/common/capabilities/capabilities.js';
export declare const ITerminalQuickFixService: import("../../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<ITerminalQuickFixService>;
export interface ITerminalQuickFixService {
    onDidRegisterProvider: Event<ITerminalQuickFixProviderSelector>;
    onDidRegisterCommandSelector: Event<ITerminalCommandSelector>;
    onDidUnregisterProvider: Event<string>;
    readonly _serviceBrand: undefined;
    readonly extensionQuickFixes: Promise<Array<ITerminalCommandSelector>>;
    providers: Map<string, ITerminalQuickFixProvider>;
    registerQuickFixProvider(id: string, provider: ITerminalQuickFixProvider): IDisposable;
    registerCommandSelector(selector: ITerminalCommandSelector): void;
}
export interface ITerminalQuickFixProviderSelector {
    selector: ITerminalCommandSelector;
    provider: ITerminalQuickFixProvider;
}
export type TerminalQuickFixActionInternal = IAction | ITerminalQuickFixTerminalCommandAction | ITerminalQuickFixOpenerAction;
export type TerminalQuickFixCallback = (matchResult: ITerminalCommandMatchResult) => TerminalQuickFixActionInternal[] | TerminalQuickFixActionInternal | undefined;
export type TerminalQuickFixCallbackExtension = (terminalCommand: ITerminalCommand, lines: string[] | undefined, option: ITerminalQuickFixOptions, token: CancellationToken) => Promise<ITerminalQuickFix[] | ITerminalQuickFix | undefined>;
export interface ITerminalQuickFixProvider {
    provideTerminalQuickFixes(terminalCommand: ITerminalCommand, lines: string[] | undefined, option: ITerminalQuickFixOptions, token: CancellationToken): Promise<ITerminalQuickFix[] | ITerminalQuickFix | undefined>;
}
export declare enum TerminalQuickFixType {
    TerminalCommand = 0,
    Opener = 1,
    Port = 2,
    VscodeCommand = 3
}
export interface ITerminalQuickFixOptions {
    type: 'internal' | 'resolved' | 'unresolved';
    id: string;
    commandLineMatcher: string | RegExp;
    outputMatcher?: ITerminalOutputMatcher;
    commandExitResult: 'success' | 'error';
    kind?: 'fix' | 'explain';
}
export interface ITerminalQuickFix {
    type: TerminalQuickFixType;
    id: string;
    source: string;
}
export interface ITerminalQuickFixTerminalCommandAction extends ITerminalQuickFix {
    type: TerminalQuickFixType.TerminalCommand;
    terminalCommand: string;
    shouldExecute?: boolean;
}
export interface ITerminalQuickFixOpenerAction extends ITerminalQuickFix {
    type: TerminalQuickFixType.Opener;
    uri: URI;
}
export interface ITerminalQuickFixCommandAction extends ITerminalQuickFix {
    title: string;
}
export interface ITerminalCommandMatchResult {
    commandLine: string;
    commandLineMatch: RegExpMatchArray;
    outputMatch?: ITerminalOutputMatch;
}
export interface ITerminalQuickFixInternalOptions extends ITerminalQuickFixOptions {
    type: 'internal';
    getQuickFixes: TerminalQuickFixCallback;
}
export interface ITerminalQuickFixResolvedExtensionOptions extends ITerminalQuickFixOptions {
    type: 'resolved';
    getQuickFixes: TerminalQuickFixCallbackExtension;
}
export interface ITerminalQuickFixUnresolvedExtensionOptions extends ITerminalQuickFixOptions {
    type: 'unresolved';
}