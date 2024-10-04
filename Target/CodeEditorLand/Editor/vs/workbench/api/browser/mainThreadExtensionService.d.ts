import { SerializedError } from '../../../base/common/errors.js';
import { UriComponents } from '../../../base/common/uri.js';
import { ICommandService } from '../../../platform/commands/common/commands.js';
import { ExtensionIdentifier } from '../../../platform/extensions/common/extensions.js';
import { INotificationService } from '../../../platform/notification/common/notification.js';
import { MainThreadExtensionServiceShape } from '../common/extHost.protocol.js';
import { IExtensionsWorkbenchService } from '../../contrib/extensions/common/extensions.js';
import { IWorkbenchEnvironmentService } from '../../services/environment/common/environmentService.js';
import { IWorkbenchExtensionEnablementService } from '../../services/extensionManagement/common/extensionManagement.js';
import { ExtensionActivationReason, IExtensionService, MissingExtensionDependency } from '../../services/extensions/common/extensions.js';
import { IExtHostContext } from '../../services/extensions/common/extHostCustomers.js';
import { IHostService } from '../../services/host/browser/host.js';
import { ITimerService } from '../../services/timer/browser/timerService.js';
export declare class MainThreadExtensionService implements MainThreadExtensionServiceShape {
    private readonly _extensionService;
    private readonly _notificationService;
    private readonly _extensionsWorkbenchService;
    private readonly _hostService;
    private readonly _extensionEnablementService;
    private readonly _timerService;
    private readonly _commandService;
    protected readonly _environmentService: IWorkbenchEnvironmentService;
    private readonly _extensionHostKind;
    private readonly _internalExtensionService;
    constructor(extHostContext: IExtHostContext, _extensionService: IExtensionService, _notificationService: INotificationService, _extensionsWorkbenchService: IExtensionsWorkbenchService, _hostService: IHostService, _extensionEnablementService: IWorkbenchExtensionEnablementService, _timerService: ITimerService, _commandService: ICommandService, _environmentService: IWorkbenchEnvironmentService);
    dispose(): void;
    $getExtension(extensionId: string): Promise<Readonly<import("../../../platform/extensions/common/extensions.js").IRelaxedExtensionDescription> | undefined>;
    $activateExtension(extensionId: ExtensionIdentifier, reason: ExtensionActivationReason): Promise<void>;
    $onWillActivateExtension(extensionId: ExtensionIdentifier): Promise<void>;
    $onDidActivateExtension(extensionId: ExtensionIdentifier, codeLoadingTime: number, activateCallTime: number, activateResolvedTime: number, activationReason: ExtensionActivationReason): void;
    $onExtensionRuntimeError(extensionId: ExtensionIdentifier, data: SerializedError): void;
    $onExtensionActivationError(extensionId: ExtensionIdentifier, data: SerializedError, missingExtensionDependency: MissingExtensionDependency | null): Promise<void>;
    private _handleMissingInstalledDependency;
    private _handleMissingNotInstalledDependency;
    $setPerformanceMarks(marks: PerformanceMark[]): Promise<void>;
    $asBrowserUri(uri: UriComponents): Promise<UriComponents>;
}