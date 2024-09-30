import{localize as n}from"../../../../nls.js";import{RawContextKey as t}from"../../../../platform/contextkey/common/contextkey.js";import{TestExplorerViewMode as p,TestExplorerViewSorting as d}from"./constants.js";import{TestRunProfileBitset as s}from"./testTypes.js";var u;(e=>(e.providerCount=new t("testing.providerCount",0),e.canRefreshTests=new t("testing.canRefresh",!1,{type:"boolean",description:n("testing.canRefresh","Indicates whether any test controller has an attached refresh handler.")}),e.isRefreshingTests=new t("testing.isRefreshing",!1,{type:"boolean",description:n("testing.isRefreshing","Indicates whether any test controller is currently refreshing tests.")}),e.isContinuousModeOn=new t("testing.isContinuousModeOn",!1,{type:"boolean",description:n("testing.isContinuousModeOn","Indicates whether continuous test mode is on.")}),e.hasDebuggableTests=new t("testing.hasDebuggableTests",!1,{type:"boolean",description:n("testing.hasDebuggableTests","Indicates whether any test controller has registered a debug configuration")}),e.hasRunnableTests=new t("testing.hasRunnableTests",!1,{type:"boolean",description:n("testing.hasRunnableTests","Indicates whether any test controller has registered a run configuration")}),e.hasCoverableTests=new t("testing.hasCoverableTests",!1,{type:"boolean",description:n("testing.hasCoverableTests","Indicates whether any test controller has registered a coverage configuration")}),e.hasNonDefaultProfile=new t("testing.hasNonDefaultProfile",!1,{type:"boolean",description:n("testing.hasNonDefaultConfig","Indicates whether any test controller has registered a non-default configuration")}),e.hasConfigurableProfile=new t("testing.hasConfigurableProfile",!1,{type:"boolean",description:n("testing.hasConfigurableConfig","Indicates whether any test configuration can be configured")}),e.supportsContinuousRun=new t("testing.supportsContinuousRun",!1,{type:"boolean",description:n("testing.supportsContinuousRun","Indicates whether continous test running is supported")}),e.isParentRunningContinuously=new t("testing.isParentRunningContinuously",!1,{type:"boolean",description:n("testing.isParentRunningContinuously","Indicates whether the parent of a test is continuously running, set in the menu context of test items")}),e.activeEditorHasTests=new t("testing.activeEditorHasTests",!1,{type:"boolean",description:n("testing.activeEditorHasTests","Indicates whether any tests are present in the current editor")}),e.cursorInsideTestRange=new t("testing.cursorInsideTestRange",!1,{type:"boolean",description:n("testing.cursorInsideTestRange","Whether the cursor is currently inside a test range")}),e.isTestCoverageOpen=new t("testing.isTestCoverageOpen",!1,{type:"boolean",description:n("testing.isTestCoverageOpen","Indicates whether a test coverage report is open")}),e.hasPerTestCoverage=new t("testing.hasPerTestCoverage",!1,{type:"boolean",description:n("testing.hasPerTestCoverage","Indicates whether per-test coverage is available")}),e.isCoverageFilteredToTest=new t("testing.isCoverageFilteredToTest",!1,{type:"boolean",description:n("testing.isCoverageFilteredToTest","Indicates whether coverage has been filterd to a single test")}),e.coverageToolbarEnabled=new t("testing.coverageToolbarEnabled",!0,{type:"boolean",description:n("testing.coverageToolbarEnabled","Indicates whether the coverage toolbar is enabled")}),e.inlineCoverageEnabled=new t("testing.inlineCoverageEnabled",!1,{type:"boolean",description:n("testing.inlineCoverageEnabled","Indicates whether inline coverage is shown")}),e.canGoToRelatedCode=new t("testing.canGoToRelatedCode",!1,{type:"boolean",description:n("testing.canGoToRelatedCode","Whether a controller implements a capability to find code related to a test")}),e.canGoToRelatedTest=new t("testing.canGoToRelatedTest",!1,{type:"boolean",description:n("testing.canGoToRelatedTest","Whether a controller implements a capability to find tests related to code")}),e.peekHasStack=new t("testing.peekHasStack",!1,{type:"boolean",description:n("testing.peekHasStack","Whether the message shown in a peek view has a stack trace")}),e.capabilityToContextKey={[s.Run]:e.hasRunnableTests,[s.Coverage]:e.hasCoverableTests,[s.Debug]:e.hasDebuggableTests,[s.HasNonDefaultProfile]:e.hasNonDefaultProfile,[s.HasConfigurable]:e.hasConfigurableProfile,[s.SupportsContinuousRun]:e.supportsContinuousRun},e.hasAnyResults=new t("testing.hasAnyResults",!1),e.viewMode=new t("testing.explorerViewMode",p.List),e.viewSorting=new t("testing.explorerViewSorting",d.ByLocation),e.isRunning=new t("testing.isRunning",!1),e.isInPeek=new t("testing.isInPeek",!1),e.isPeekVisible=new t("testing.isPeekVisible",!1),e.peekItemType=new t("peekItemType",void 0,{type:"string",description:n("testing.peekItemType",'Type of the item in the output peek view. Either a "test", "message", "task", or "result".')}),e.controllerId=new t("controllerId",void 0,{type:"string",description:n("testing.controllerId","Controller ID of the current test item")}),e.testItemExtId=new t("testId",void 0,{type:"string",description:n("testing.testId","ID of the current test item, set when creating or opening menus on test items")}),e.testItemHasUri=new t("testing.testItemHasUri",!1,{type:"boolean",description:n("testing.testItemHasUri","Boolean indicating whether the test item has a URI defined")}),e.testItemIsHidden=new t("testing.testItemIsHidden",!1,{type:"boolean",description:n("testing.testItemIsHidden","Boolean indicating whether the test item is hidden")}),e.testMessageContext=new t("testMessage",void 0,{type:"string",description:n("testing.testMessage","Value set in `testMessage.contextValue`, available in editor/content and testing/message/context")}),e.testResultOutdated=new t("testResultOutdated",void 0,{type:"boolean",description:n("testing.testResultOutdated","Value available in editor/content and testing/message/context when the result is outdated")}),e.testResultState=new t("testResultState",void 0,{type:"string",description:n("testing.testResultState","Value available testing/item/result indicating the state of the item.")}),e.testProfileContextGroup=new t("testing.profile.context.group",void 0,{type:"string",description:n("testing.profile.context.group",'Type of menu where the configure testing profile submenu exists. Either "run", "debug", or "coverage"')})))(u||={});export{u as TestingContextKeys};