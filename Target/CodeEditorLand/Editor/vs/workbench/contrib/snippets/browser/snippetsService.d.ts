import { Position } from '../../../../editor/common/core/position.js';
import { ILanguageService } from '../../../../editor/common/languages/language.js';
import { IEnvironmentService } from '../../../../platform/environment/common/environment.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { ILifecycleService } from '../../../services/lifecycle/common/lifecycle.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { ISnippetGetOptions, ISnippetsService } from './snippets.js';
import { Snippet, SnippetFile } from './snippetsFile.js';
import { IExtensionResourceLoaderService } from '../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { ITextFileService } from '../../../services/textfile/common/textfiles.js';
import { ILanguageConfigurationService } from '../../../../editor/common/languages/languageConfigurationRegistry.js';
import { IUserDataProfileService } from '../../../services/userDataProfile/common/userDataProfile.js';
export declare class SnippetsService implements ISnippetsService {
    private readonly _environmentService;
    private readonly _userDataProfileService;
    private readonly _contextService;
    private readonly _languageService;
    private readonly _logService;
    private readonly _fileService;
    private readonly _textfileService;
    private readonly _extensionResourceLoaderService;
    readonly _serviceBrand: undefined;
    private readonly _disposables;
    private readonly _pendingWork;
    private readonly _files;
    private readonly _enablement;
    private readonly _usageTimestamps;
    constructor(_environmentService: IEnvironmentService, _userDataProfileService: IUserDataProfileService, _contextService: IWorkspaceContextService, _languageService: ILanguageService, _logService: ILogService, _fileService: IFileService, _textfileService: ITextFileService, _extensionResourceLoaderService: IExtensionResourceLoaderService, lifecycleService: ILifecycleService, instantiationService: IInstantiationService, languageConfigurationService: ILanguageConfigurationService);
    dispose(): void;
    isEnabled(snippet: Snippet): boolean;
    updateEnablement(snippet: Snippet, enabled: boolean): void;
    updateUsageTimestamp(snippet: Snippet): void;
    private _joinSnippets;
    getSnippetFiles(): Promise<Iterable<SnippetFile>>;
    getSnippets(languageId: string | undefined, opts?: ISnippetGetOptions): Promise<Snippet[]>;
    getSnippetsSync(languageId: string, opts?: ISnippetGetOptions): Snippet[];
    private _filterAndSortSnippets;
    private _compareSnippet;
    private _initExtensionSnippets;
    private _initWorkspaceSnippets;
    private _initWorkspaceFolderSnippets;
    private _initUserSnippets;
    private _initFolderSnippets;
    private _addSnippetFile;
}
export interface ISimpleModel {
    getLineContent(lineNumber: number): string;
}
export declare function getNonWhitespacePrefix(model: ISimpleModel, position: Position): string;