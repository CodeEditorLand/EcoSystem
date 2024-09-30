var B=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var R=(p,h,e,t)=>{for(var i=t>1?void 0:t?L(h,e):h,n=p.length-1,o;n>=0;n--)(o=p[n])&&(i=(t?o(h,e,i):o(i))||i);return t&&i&&B(h,e,i),i},u=(p,h)=>(e,t)=>h(e,t,p);import{getWindow as H}from"../../../../../../base/browser/dom.js";import"../../../../../../base/browser/mouseEvent.js";import"../../../../../../base/browser/window.js";import"../../../../../../base/common/actions.js";import{coalesce as K}from"../../../../../../base/common/arrays.js";import{DeferredPromise as E,runWhenGlobalIdle as $}from"../../../../../../base/common/async.js";import{decodeBase64 as V}from"../../../../../../base/common/buffer.js";import{Emitter as A}from"../../../../../../base/common/event.js";import"../../../../../../base/common/lifecycle.js";import{getExtensionForMimeType as G}from"../../../../../../base/common/mime.js";import{FileAccess as q,Schemas as g,matchesScheme as T,matchesSomeScheme as Y}from"../../../../../../base/common/network.js";import{equals as j}from"../../../../../../base/common/objects.js";import*as X from"../../../../../../base/common/path.js";import{isMacintosh as J,isWeb as Q}from"../../../../../../base/common/platform.js";import{dirname as b,extname as Z,isEqual as ee,joinPath as te}from"../../../../../../base/common/resources.js";import{URI as m}from"../../../../../../base/common/uri.js";import*as S from"../../../../../../base/common/uuid.js";import{TokenizationRegistry as x}from"../../../../../../editor/common/languages.js";import{ILanguageService as oe}from"../../../../../../editor/common/languages/language.js";import{generateTokensCSSForColorMap as ie}from"../../../../../../editor/common/languages/supports/tokenization.js";import{tokenizeToString as re}from"../../../../../../editor/common/languages/textToHtmlTokenizer.js";import*as y from"../../../../../../nls.js";import{MenuId as ne}from"../../../../../../platform/actions/common/actions.js";import{IConfigurationService as se}from"../../../../../../platform/configuration/common/configuration.js";import{IContextKeyService as ae}from"../../../../../../platform/contextkey/common/contextkey.js";import{IContextMenuService as de}from"../../../../../../platform/contextview/browser/contextView.js";import{IFileDialogService as le}from"../../../../../../platform/dialogs/common/dialogs.js";import"../../../../../../platform/editor/common/editor.js";import{IFileService as ue}from"../../../../../../platform/files/common/files.js";import{IOpenerService as pe}from"../../../../../../platform/opener/common/opener.js";import{IStorageService as ce}from"../../../../../../platform/storage/common/storage.js";import{ITelemetryService as he}from"../../../../../../platform/telemetry/common/telemetry.js";import{editorFindMatch as ge,editorFindMatchHighlight as me}from"../../../../../../platform/theme/common/colorRegistry.js";import{IThemeService as fe,Themable as be}from"../../../../../../platform/theme/common/themeService.js";import{IWorkspaceContextService as P}from"../../../../../../platform/workspace/common/workspace.js";import{IWorkspaceTrustManagementService as ve}from"../../../../../../platform/workspace/common/workspaceTrust.js";import"../../../../../common/editor/editorInput.js";import{CellEditState as Ie,RenderOutputType as k}from"../../notebookBrowser.js";import{NOTEBOOK_WEBVIEW_BOUNDARY as ke}from"../notebookCellList.js";import{preloadsScriptStr as we}from"./webviewPreloads.js";import{transformWebviewThemeVars as ye}from"./webviewThemeMapping.js";import{MarkupCellViewModel as _}from"../../viewModel/markupCellViewModel.js";import{CellUri as Me,RendererMessagingSpec as Ce}from"../../../common/notebookCommon.js";import"../../../common/notebookKernelService.js";import{INotebookLoggingService as Se}from"../../../common/notebookLoggingService.js";import"../../../common/notebookRendererMessagingService.js";import{INotebookService as _e}from"../../../common/notebookService.js";import{IWebviewService as Oe,WebviewContentPurpose as We,WebviewOriginStore as Re}from"../../../../webview/browser/webview.js";import{WebviewWindowDragMonitor as Ee}from"../../../../webview/browser/webviewWindowDragMonitor.js";import{asWebviewUri as Te,webviewGenericCspSource as M}from"../../../../webview/common/webview.js";import{IEditorGroupsService as xe}from"../../../../../services/editor/common/editorGroupsService.js";import{IWorkbenchEnvironmentService as Pe}from"../../../../../services/environment/common/environmentService.js";import{IPathService as Ne}from"../../../../../services/path/common/pathService.js";import"./webviewMessages.js";const De=/:([\d]+)(?::([\d]+))?$/,Ue=/line=(\d+)$/,Fe=/^(.*)#([^#]*)$/;let v=class extends be{constructor(e,t,i,n,o,r,s,a,d,l,c,I,f,O,w,U,Be,Le,He,Ke,$e,Ve,Ae,F,Ge){super(F);this.notebookEditor=e;this.id=t;this.notebookViewType=i;this.documentUri=n;this.options=o;this.rendererMessaging=r;this.webviewService=s;this.openerService=a;this.notebookService=d;this.contextService=l;this.environmentService=c;this.fileDialogService=I;this.fileService=f;this.contextMenuService=O;this.contextKeyService=w;this.workspaceTrustManagementService=U;this.configurationService=Be;this.languageService=Le;this.workspaceContextService=He;this.editorGroupService=Ke;this.storageService=$e;this.pathService=Ve;this.notebookLogService=Ae;this.telemetryService=Ge;this._logRendererDebugMessage("Creating backlayer webview for notebook"),this.element=document.createElement("div"),this.element.style.height="1400px",this.element.style.position="absolute",r&&(this._register(r),r.receiveMessageHandler=(W,C)=>!this.webview||this._disposed?Promise.resolve(!1):(this._sendMessageToWebview({__vscode_notebook_message:!0,type:"customRendererMessage",rendererId:W,message:C}),Promise.resolve(!0))),this._register(U.onDidChangeTrust(W=>{const C=this.asWebviewUri(this.getNotebookBaseUri(),void 0),z=this.generateContent(C.toString());this.webview?.setHtml(z)})),this._register(x.onDidChange(()=>{this._sendMessageToWebview({type:"tokenizedStylesChanged",css:D()})}))}static _originStore;static getOriginStore(e){return this._originStore??=new Re("notebook.backlayerWebview.origins",e),this._originStore}element;webview=void 0;insetMapping=new Map;pendingWebviewIdleCreationRequest=new Map;pendingWebviewIdleInsetMapping=new Map;reversedPendingWebviewIdleInsetMapping=new Map;markupPreviewMapping=new Map;hiddenInsetMapping=new Set;reversedInsetMapping=new Map;localResourceRootsCache=void 0;_onMessage=this._register(new A);_preloadsCache=new Set;onMessage=this._onMessage.event;_disposed=!1;_currentKernel;firstInit=!0;initializeMarkupPromise;nonce=S.generateUuid();updateOptions(e){this.options=e,this._updateStyles(),this._updateOptions()}_logRendererDebugMessage(e){this.notebookLogService.debug("BacklayerWebview",`${this.documentUri} (${this.id}) - ${e}`)}_updateStyles(){this._sendMessageToWebview({type:"notebookStyles",styles:this._generateStyles()})}_updateOptions(){this._sendMessageToWebview({type:"notebookOptions",options:{dragAndDropEnabled:this.options.dragAndDropEnabled},renderOptions:{lineLimit:this.options.outputLineLimit,outputScrolling:this.options.outputScrolling,outputWordWrap:this.options.outputWordWrap,linkifyFilePaths:this.options.outputLinkifyFilePaths,minimalError:this.options.minimalError}})}_generateStyles(){return{"notebook-output-left-margin":`${this.options.leftMargin+this.options.runGutter}px`,"notebook-output-width":`calc(100% - ${this.options.leftMargin+this.options.rightMargin+this.options.runGutter}px)`,"notebook-output-node-padding":`${this.options.outputNodePadding}px`,"notebook-run-gutter":`${this.options.runGutter}px`,"notebook-preview-node-padding":`${this.options.previewNodePadding}px`,"notebook-markdown-left-margin":`${this.options.markdownLeftMargin}px`,"notebook-output-node-left-padding":`${this.options.outputNodeLeftPadding}px`,"notebook-markdown-min-height":`${this.options.previewNodePadding*2}px`,"notebook-markup-font-size":typeof this.options.markupFontSize=="number"&&this.options.markupFontSize>0?`${this.options.markupFontSize}px`:`calc(${this.options.fontSize}px * 1.2)`,"notebook-markdown-line-height":typeof this.options.markdownLineHeight=="number"&&this.options.markdownLineHeight>0?`${this.options.markdownLineHeight}px`:"normal","notebook-cell-output-font-size":`${this.options.outputFontSize||this.options.fontSize}px`,"notebook-cell-output-line-height":`${this.options.outputLineHeight}px`,"notebook-cell-output-max-height":`${this.options.outputLineHeight*this.options.outputLineLimit+2}px`,"notebook-cell-output-font-family":this.options.outputFontFamily||this.options.fontFamily,"notebook-cell-markup-empty-content":y.localize("notebook.emptyMarkdownPlaceholder","Empty markdown cell, double-click or press enter to edit."),"notebook-cell-renderer-not-found-error":y.localize({key:"notebook.error.rendererNotFound",comment:["$0 is a placeholder for the mime type"]},"No renderer found for '$0'"),"notebook-cell-renderer-fallbacks-exhausted":y.localize({key:"notebook.error.rendererFallbacksExhausted",comment:["$0 is a placeholder for the mime type"]},"Could not render content for '$0'")}}generateContent(e){const t=this.getRendererData(),i=this.getStaticPreloadsData(),n={lineLimit:this.options.outputLineLimit,outputScrolling:this.options.outputScrolling,outputWordWrap:this.options.outputWordWrap,linkifyFilePaths:this.options.outputLinkifyFilePaths,minimalError:this.options.minimalError},o=we({...this.options,tokenizationCss:D()},{dragAndDropEnabled:this.options.dragAndDropEnabled},n,t,i,this.workspaceTrustManagementService.isWorkspaceTrusted(),this.nonce),r=this.configurationService.getValue("notebook.experimental.enableCsp"),s=this.getColor(ge),a=this.getColor(me);return`
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<base href="${e}/" />
				${r?`<meta http-equiv="Content-Security-Policy" content="
					default-src 'none';
					script-src ${M} 'unsafe-inline' 'unsafe-eval';
					style-src ${M} 'unsafe-inline';
					img-src ${M} https: http: data:;
					font-src ${M} https:;
					connect-src https:;
					child-src https: data:;
				">`:""}
				<style nonce="${this.nonce}">
					::highlight(find-highlight) {
						background-color: var(--vscode-editor-findMatchBackground, ${a});
					}

					::highlight(current-find-highlight) {
						background-color: var(--vscode-editor-findMatchHighlightBackground, ${s});
					}

					#container .cell_container {
						width: 100%;
					}

					#container .output_container {
						width: 100%;
					}

					#container > div > div > div.output {
						font-size: var(--notebook-cell-output-font-size);
						width: var(--notebook-output-width);
						margin-left: var(--notebook-output-left-margin);
						background-color: var(--theme-notebook-output-background);
						padding-top: var(--notebook-output-node-padding);
						padding-right: var(--notebook-output-node-padding);
						padding-bottom: var(--notebook-output-node-padding);
						padding-left: var(--notebook-output-node-left-padding);
						box-sizing: border-box;
						border-top: none;
					}

					/* markdown */
					#container div.preview {
						width: 100%;
						padding-right: var(--notebook-preview-node-padding);
						padding-left: var(--notebook-markdown-left-margin);
						padding-top: var(--notebook-preview-node-padding);
						padding-bottom: var(--notebook-preview-node-padding);

						box-sizing: border-box;
						white-space: nowrap;
						overflow: hidden;
						white-space: initial;

						font-size: var(--notebook-markup-font-size);
						line-height: var(--notebook-markdown-line-height);
						color: var(--theme-ui-foreground);
					}

					#container div.preview.draggable {
						user-select: none;
						-webkit-user-select: none;
						-ms-user-select: none;
						cursor: grab;
					}

					#container div.preview.selected {
						background: var(--theme-notebook-cell-selected-background);
					}

					#container div.preview.dragging {
						background-color: var(--theme-background);
						opacity: 0.5 !important;
					}

					.monaco-workbench.vs-dark .notebookOverlay .cell.markdown .latex img,
					.monaco-workbench.vs-dark .notebookOverlay .cell.markdown .latex-block img {
						filter: brightness(0) invert(1)
					}

					#container .markup > div.nb-symbolHighlight {
						background-color: var(--theme-notebook-symbol-highlight-background);
					}

					#container .nb-symbolHighlight .output_container .output {
						background-color: var(--theme-notebook-symbol-highlight-background);
					}

					#container .markup > div.nb-multiCellHighlight {
						background-color: var(--theme-notebook-symbol-highlight-background);
					}

					#container .nb-multiCellHighlight .output_container .output {
						background-color: var(--theme-notebook-symbol-highlight-background);
					}

					#container .nb-chatGenerationHighlight .output_container .output {
						background-color: var(--vscode-notebook-selectedCellBackground);
					}

					#container > div.nb-cellDeleted .output_container {
						background-color: var(--theme-notebook-diff-removed-background);
					}

					#container > div.nb-cellAdded .output_container {
						background-color: var(--theme-notebook-diff-inserted-background);
					}

					#container > div > div:not(.preview) > div {
						overflow-x: auto;
					}

					#container .no-renderer-error {
						color: var(--vscode-editorError-foreground);
					}

					body {
						padding: 0px;
						height: 100%;
						width: 100%;
					}

					table, thead, tr, th, td, tbody {
						border: none;
						border-color: transparent;
						border-spacing: 0;
						border-collapse: collapse;
					}

					table, th, tr {
						vertical-align: middle;
						text-align: right;
					}

					thead {
						font-weight: bold;
						background-color: rgba(130, 130, 130, 0.16);
					}

					th, td {
						padding: 4px 8px;
					}

					tr:nth-child(even) {
						background-color: rgba(130, 130, 130, 0.08);
					}

					tbody th {
						font-weight: normal;
					}

					.find-match {
						background-color: var(--vscode-editor-findMatchHighlightBackground);
					}

					.current-find-match {
						background-color: var(--vscode-editor-findMatchBackground);
					}

					#_defaultColorPalatte {
						color: var(--vscode-editor-findMatchHighlightBackground);
						background-color: var(--vscode-editor-findMatchBackground);
					}
				</style>
			</head>
			<body style="overflow: hidden;">
				<div id='findStart' tabIndex=-1></div>
				<div id='container' class="widgetarea" style="position: absolute;width:100%;top: 0px"></div>
				<div id="_defaultColorPalatte"></div>
				<script type="module">${o}</script>
			</body>
		</html>`}getRendererData(){return this.notebookService.getRenderers().map(e=>{const t={extends:e.entrypoint.extends,path:this.asWebviewUri(e.entrypoint.path,e.extensionLocation).toString()};return{id:e.id,entrypoint:t,mimeTypes:e.mimeTypes,messaging:e.messaging!==Ce.Never&&!!this.rendererMessaging,isBuiltin:e.isBuiltin}})}getStaticPreloadsData(){return Array.from(this.notebookService.getStaticPreloads(this.notebookViewType),e=>({entrypoint:this.asWebviewUri(e.entrypoint,e.extensionLocation).toString().toString()}))}asWebviewUri(e,t){return Te(e,t?.scheme===g.vscodeRemote?{isRemote:!0,authority:t.authority}:void 0)}postKernelMessage(e){this._sendMessageToWebview({__vscode_notebook_message:!0,type:"customKernelMessage",message:e})}resolveOutputId(e){const t=this.reversedInsetMapping.get(e);return t?{cellInfo:this.insetMapping.get(t).cellInfo,output:t}:void 0}isResolved(){return!!this.webview}createWebview(e){const t=this.asWebviewUri(this.getNotebookBaseUri(),void 0),i=this.generateContent(t.toString());return this._initialize(i,e)}getNotebookBaseUri(){if(this.documentUri.scheme===g.untitled){const e=this.workspaceContextService.getWorkspaceFolder(this.documentUri);if(e)return e.uri;const t=this.workspaceContextService.getWorkspace().folders;if(t.length)return t[0].uri}return b(this.documentUri)}getBuiltinLocalResourceRoots(){return this.documentUri.path.toLowerCase().endsWith(".ipynb")?Q?[]:[b(q.asFileUri("vs/nls.js"))]:[]}_initialize(e,t){if(!H(this.element).document.body.contains(this.element))throw new Error("Element is already detached from the DOM tree");this.webview=this._createInset(this.webviewService,e),this.webview.mountTo(this.element,t),this._register(this.webview),this._register(new Ee(t,()=>this.webview));const i=new E;return this._register(this.webview.onFatalError(n=>{i.error(new Error(`Could not initialize webview: ${n.message}}`))})),this._register(this.webview.onMessage(async n=>{const o=n.message;if(!this._disposed&&o.__vscode_notebook_message)switch(o.type){case"initialized":{i.complete(),this.initializeWebViewState();break}case"initializedMarkup":{this.initializeMarkupPromise?.requestId===o.requestId&&(this.initializeMarkupPromise?.p.complete(),this.initializeMarkupPromise=void 0);break}case"dimension":{for(const r of o.updates){const s=r.height;if(r.isOutput){const a=this.resolveOutputId(r.id);if(a){const{cellInfo:d,output:l}=a;this.notebookEditor.updateOutputHeight(d,l,s,!!r.init,"webview#dimension"),this.notebookEditor.scheduleOutputHeightAck(d,r.id,s)}else if(r.init){const d=this.reversedPendingWebviewIdleInsetMapping.get(r.id);if(d){const l=this.pendingWebviewIdleInsetMapping.get(d);this.pendingWebviewIdleCreationRequest.delete(d),this.pendingWebviewIdleCreationRequest.delete(d);const c=l.cellInfo;this.reversedInsetMapping.set(r.id,d),this.insetMapping.set(d,l),this.notebookEditor.updateOutputHeight(c,d,s,!!r.init,"webview#dimension"),this.notebookEditor.scheduleOutputHeightAck(c,r.id,s)}this.reversedPendingWebviewIdleInsetMapping.delete(r.id)}{if(!r.init)continue;const d=this.reversedInsetMapping.get(r.id);if(!d)continue;const l=this.insetMapping.get(d);l.initialized=!0}}else this.notebookEditor.updateMarkupCellHeight(r.id,s,!!r.init)}break}case"mouseenter":{const r=this.resolveOutputId(o.id);if(r){const s=this.notebookEditor.getCellByInfo(r.cellInfo);s&&(s.outputIsHovered=!0)}break}case"mouseleave":{const r=this.resolveOutputId(o.id);if(r){const s=this.notebookEditor.getCellByInfo(r.cellInfo);s&&(s.outputIsHovered=!1)}break}case"outputFocus":{const r=this.resolveOutputId(o.id);if(r){const s=this.notebookEditor.getCellByInfo(r.cellInfo);s&&(s.outputIsFocused=!0,this.notebookEditor.focusNotebookCell(s,"output",{outputId:r.output.model.outputId,skipReveal:!0,outputWebviewFocused:!0}))}break}case"outputBlur":{const r=this.resolveOutputId(o.id);if(r){const s=this.notebookEditor.getCellByInfo(r.cellInfo);s&&(s.outputIsFocused=!1,s.inputInOutputIsFocused=!1)}break}case"scroll-ack":break;case"scroll-to-reveal":{this.notebookEditor.setScrollTop(o.scrollTop-ke);break}case"did-scroll-wheel":{this.notebookEditor.triggerScroll({...o.payload,preventDefault:()=>{},stopPropagation:()=>{}});break}case"focus-editor":{const r=this.notebookEditor.getCellById(o.cellId);r&&(o.focusNext?this.notebookEditor.focusNextNotebookCell(r,"editor"):await this.notebookEditor.focusNotebookCell(r,"editor"));break}case"clicked-data-url":{this._onDidClickDataLink(o);break}case"clicked-link":{if(T(o.href,g.command)){const r=m.parse(o.href);if(r.path==="workbench.action.openLargeOutput"){const s=r.query,a=this.editorGroupService.activeGroup;a&&a.activeEditor&&a.pinEditor(a.activeEditor),this.openerService.open(Me.generateCellOutputUri(this.documentUri,s));return}if(r.path==="cellOutput.enableScrolling"){const s=r.query,a=this.reversedInsetMapping.get(s);a&&(this.telemetryService.publicLog2("workbenchActionExecuted",{id:"notebook.cell.toggleOutputScrolling",from:"inlineLink"}),a.cellViewModel.outputsViewModels.forEach(d=>{d.model.metadata&&(d.model.metadata.scrollable=!0,d.resetRenderer())}));return}this.openerService.open(o.href,{fromUserGesture:!0,fromWorkspace:!0,allowCommands:["github-issues.authNow","workbench.extensions.search","workbench.action.openSettings","_notebook.selectKernel","jupyter.viewOutput"]});return}if(Y(o.href,g.http,g.https,g.mailto))this.openerService.open(o.href,{fromUserGesture:!0,fromWorkspace:!0});else if(T(o.href,g.vscodeNotebookCell)){const r=m.parse(o.href);await this._handleNotebookCellResource(r)}else/^[\w\-]+:/.test(o.href)?X.isAbsolute(o.href)?this._openUri(m.file(o.href)):this._openUri(m.parse(o.href)):await this._handleResourceOpening(ze(o.href));break}case"customKernelMessage":{this._onMessage.fire({message:o.message});break}case"customRendererMessage":{this.rendererMessaging?.postMessage(o.rendererId,o.message);break}case"clickMarkupCell":{const r=this.notebookEditor.getCellById(o.cellId);r&&(o.shiftKey||(J?o.metaKey:o.ctrlKey)?this.notebookEditor.toggleNotebookCellSelection(r,o.shiftKey):await this.notebookEditor.focusNotebookCell(r,"container",{skipReveal:!0}));break}case"contextMenuMarkupCell":{const r=this.notebookEditor.getCellById(o.cellId);if(r){await this.notebookEditor.focusNotebookCell(r,"container",{skipReveal:!0});const s=this.element.getBoundingClientRect();this.contextMenuService.showContextMenu({menuId:ne.NotebookCellTitle,contextKeyService:this.contextKeyService,getAnchor:()=>({x:s.x+o.clientX,y:s.y+o.clientY})})}break}case"toggleMarkupPreview":{const r=this.notebookEditor.getCellById(o.cellId);r&&!this.notebookEditor.creationOptions.isReadOnly&&(this.notebookEditor.setMarkupCellEditState(o.cellId,Ie.Editing),await this.notebookEditor.focusNotebookCell(r,"editor",{skipReveal:!0}));break}case"mouseEnterMarkupCell":{const r=this.notebookEditor.getCellById(o.cellId);r instanceof _&&(r.cellIsHovered=!0);break}case"mouseLeaveMarkupCell":{const r=this.notebookEditor.getCellById(o.cellId);r instanceof _&&(r.cellIsHovered=!1);break}case"cell-drag-start":{this.notebookEditor.didStartDragMarkupCell(o.cellId,o);break}case"cell-drag":{this.notebookEditor.didDragMarkupCell(o.cellId,o);break}case"cell-drop":{this.notebookEditor.didDropMarkupCell(o.cellId,{dragOffsetY:o.dragOffsetY,ctrlKey:o.ctrlKey,altKey:o.altKey});break}case"cell-drag-end":{this.notebookEditor.didEndDragMarkupCell(o.cellId);break}case"renderedMarkup":{const r=this.notebookEditor.getCellById(o.cellId);r instanceof _&&(r.renderedHtml=o.html),this._handleHighlightCodeBlock(o.codeBlocks);break}case"renderedCellOutput":{this._handleHighlightCodeBlock(o.codeBlocks);break}case"outputResized":{this.notebookEditor.didResizeOutput(o.cellId);break}case"getOutputItem":{const s=this.resolveOutputId(o.outputId)?.output.model.outputs.find(a=>a.mime===o.mime);this._sendMessageToWebview({type:"returnOutputItem",requestId:o.requestId,output:s?{mime:s.mime,valueBytes:s.data.buffer}:void 0});break}case"logRendererDebugMessage":{this._logRendererDebugMessage(`${o.message}${o.data?" "+JSON.stringify(o.data,null,4):""}`);break}case"notebookPerformanceMessage":{this.notebookEditor.updatePerformanceMetadata(o.cellId,o.executionId,o.duration,o.rendererId),o.mimeType&&o.outputSize&&o.rendererId==="vscode.builtin-renderer"&&this._sendPerformanceData(o.mimeType,o.outputSize,o.duration);break}case"outputInputFocus":{const r=this.resolveOutputId(o.id);if(r){const s=this.notebookEditor.getCellByInfo(r.cellInfo);s&&(s.inputInOutputIsFocused=o.inputFocused)}this.notebookEditor.didFocusOutputInputChange(o.inputFocused)}}})),i.p}_sendPerformanceData(e,t,i){const n={mimeType:e,outputSize:t,renderTime:i};this.telemetryService.publicLog2("NotebookCellOutputRender",n)}_handleNotebookCellResource(e){const t=e.path.length>0?e:this.documentUri,i=/(?:^|&)line=([^&]+)/.exec(e.query);let n;if(i){const s=parseInt(i[1],10);isNaN(s)||(n={selection:{startLineNumber:s,startColumn:1}})}const o=/(?:^|&)execution_count=([^&]+)/.exec(e.query);if(o){const s=parseInt(o[1],10);if(!isNaN(s)){const d=this.notebookService.getNotebookTextModel(t)?.cells.slice().reverse().find(l=>l.internalMetadata.executionOrder===s);if(d?.uri)return this.openerService.open(d.uri,{fromUserGesture:!0,fromWorkspace:!0,editorOptions:n})}}const r=/\?line=(\d+)$/.exec(e.fragment);if(r){const s=parseInt(r[1],10);if(!isNaN(s)){const a=s+1,d=e.fragment.substring(0,r.index),l={selection:{startLineNumber:a,startColumn:1,endLineNumber:a,endColumn:1}};return this.openerService.open(t.with({fragment:d}),{fromUserGesture:!0,fromWorkspace:!0,editorOptions:l})}}return this.openerService.open(t,{fromUserGesture:!0,fromWorkspace:!0})}async _handleResourceOpening(e){let t,i;const n=Fe.exec(e);if(n&&(e=n[1],i=n[2]),e.startsWith("/")){t=await this.pathService.fileURI(e);const o=this.workspaceContextService.getWorkspace().folders;o.length&&(t=t.with({scheme:o[0].uri.scheme,authority:o[0].uri.authority}))}else if(e.startsWith("~")){const o=await this.pathService.userHome();o&&(t=m.joinPath(o,e.substring(2)))}else if(this.documentUri.scheme===g.untitled){const o=this.workspaceContextService.getWorkspace().folders;if(!o.length)return;t=m.joinPath(o[0].uri,e)}else t=m.joinPath(b(this.documentUri),e);t&&(i&&(t=t.with({fragment:i})),this._openUri(t))}_openUri(e){let t,i;const n=De.exec(e.path);n&&(e=e.with({path:e.path.slice(0,n.index),fragment:`L${n[0].slice(1)}`}),t=parseInt(n[1],10),i=parseInt(n[2],10));const o=Ue.exec(e.query);if(o){const s=parseInt(o[1],10);isNaN(s)||(t=s+1,i=1,e=e.with({fragment:`L${t}`}))}e=e.with({query:null});let r;for(const s of this.editorGroupService.groups){const a=s.editors.find(d=>d.resource&&ee(d.resource,e,!0));if(a){r={group:s,editor:a};break}}if(r){const s=t!==void 0&&i!==void 0?{startLineNumber:t,startColumn:i}:void 0,a={selection:s};r.group.openEditor(r.editor,s?a:void 0)}else this.openerService.open(e,{fromUserGesture:!0,fromWorkspace:!0})}_handleHighlightCodeBlock(e){for(const{id:t,value:i,lang:n}of e){const o=this.languageService.getLanguageIdByLanguageName(n);o&&re(this.languageService,i,o).then(r=>{this._disposed||this._sendMessageToWebview({type:"tokenizedCodeBlock",html:r,codeBlockId:t})})}}async _onDidClickDataLink(e){if(typeof e.data!="string")return;const[t,i]=e.data.split(";base64,");if(!i||!t)return;const n=Z(this.documentUri)===".interactive"?this.workspaceContextService.getWorkspace().folders[0]?.uri??await this.fileDialogService.defaultFilePath():b(this.documentUri);let o;if(e.downloadName)o=e.downloadName;else{const d=t.replace(/^data:/,""),l=d&&G(d);o=l?`download${l}`:"download"}const r=te(n,o),s=await this.fileDialogService.showSaveDialog({defaultUri:r});if(!s)return;const a=V(i);await this.fileService.writeFile(s,a),await this.openerService.open(s)}_createInset(e,t){this.localResourceRootsCache=this._getResourceRootsCache();const i=e.createWebviewElement({origin:v.getOriginStore(this.storageService).getOrigin(this.notebookViewType,void 0),title:y.localize("webview title","Notebook webview content"),options:{purpose:We.NotebookRenderer,enableFindWidget:!1,transformCssVariables:ye},contentOptions:{allowMultipleAPIAcquire:!0,allowScripts:!0,localResourceRoots:this.localResourceRootsCache},extension:void 0,providedViewType:"notebook.output"});return i.setHtml(t),i.setContextKeyService(this.contextKeyService),i}_getResourceRootsCache(){const e=this.contextService.getWorkspace().folders.map(i=>i.uri),t=this.getNotebookBaseUri();return[this.notebookService.getNotebookProviderResourceRoots(),this.notebookService.getRenderers().map(i=>b(i.entrypoint.path)),...Array.from(this.notebookService.getStaticPreloads(this.notebookViewType),i=>[b(i.entrypoint),...i.localResourceRoots]),e,t,this.getBuiltinLocalResourceRoots()].flat()}initializeWebViewState(){this._preloadsCache.clear(),this._currentKernel&&this._updatePreloadsFromKernel(this._currentKernel);for(const[e,t]of this.insetMapping.entries())this._sendMessageToWebview({...t.cachedCreation,initiallyHidden:this.hiddenInsetMapping.has(e)});if(!this.initializeMarkupPromise?.isFirstInit){const e=[...this.markupPreviewMapping.values()];this.markupPreviewMapping.clear(),this.initializeMarkup(e)}this._updateStyles(),this._updateOptions()}shouldUpdateInset(e,t,i,n){if(this._disposed||"isOutputCollapsed"in e&&e.isOutputCollapsed)return!1;if(this.hiddenInsetMapping.has(t))return!0;const o=this.insetMapping.get(t);return!(!o||n===o.cachedCreation.outputOffset&&i===o.cachedCreation.cellTop)}ackHeight(e){this._sendMessageToWebview({type:"ack-dimension",updates:e})}updateScrollTops(e,t){if(this._disposed)return;const i=K(e.map(n=>{const o=this.insetMapping.get(n.output);if(!o||!n.forceDisplay&&!this.shouldUpdateInset(n.cell,n.output,n.cellTop,n.outputOffset))return;const r=o.outputId;return o.cachedCreation.cellTop=n.cellTop,o.cachedCreation.outputOffset=n.outputOffset,this.hiddenInsetMapping.delete(n.output),{cellId:n.cell.id,outputId:r,cellTop:n.cellTop,outputOffset:n.outputOffset,forceDisplay:n.forceDisplay}}));!i.length&&!t.length||this._sendMessageToWebview({type:"view-scroll",widgets:i,markupCells:t})}async createMarkupPreview(e){this._disposed||this.markupPreviewMapping.has(e.cellId)||(this.markupPreviewMapping.set(e.cellId,e),this._sendMessageToWebview({type:"createMarkupCell",cell:e}))}async showMarkupPreview(e){if(this._disposed)return;const t=this.markupPreviewMapping.get(e.cellId);if(!t)return this.createMarkupPreview(e);const i=e.content===t.content,n=j(e.metadata,t.metadata);(!i||!n||!t.visible)&&this._sendMessageToWebview({type:"showMarkupCell",id:e.cellId,handle:e.cellHandle,content:i?void 0:e.content,top:e.offset,metadata:n?void 0:e.metadata}),t.metadata=e.metadata,t.content=e.content,t.offset=e.offset,t.visible=!0}async hideMarkupPreviews(e){if(this._disposed)return;const t=[];for(const i of e){const n=this.markupPreviewMapping.get(i);n&&n.visible&&(t.push(i),n.visible=!1)}t.length&&this._sendMessageToWebview({type:"hideMarkupCells",ids:t})}async unhideMarkupPreviews(e){if(this._disposed)return;const t=[];for(const i of e){const n=this.markupPreviewMapping.get(i);n&&(n.visible||(n.visible=!0,t.push(i)))}this._sendMessageToWebview({type:"unhideMarkupCells",ids:t})}async deleteMarkupPreviews(e){if(!this._disposed){for(const t of e)this.markupPreviewMapping.has(t),this.markupPreviewMapping.delete(t);e.length&&this._sendMessageToWebview({type:"deleteMarkupCell",ids:e})}}async updateMarkupPreviewSelections(e){this._disposed||this._sendMessageToWebview({type:"updateSelectedMarkupCells",selectedCellIds:e.filter(t=>this.markupPreviewMapping.has(t))})}async initializeMarkup(e){if(this._disposed)return;this.initializeMarkupPromise?.p.complete();const t=S.generateUuid();this.initializeMarkupPromise={p:new E,requestId:t,isFirstInit:this.firstInit},this.firstInit=!1;for(const i of e)this.markupPreviewMapping.set(i.cellId,i);return this._sendMessageToWebview({type:"initializeMarkup",cells:e,requestId:t}),this.initializeMarkupPromise.p.p}_cachedInsetEqual(e,t){return t.type===k.Extension?e.renderer?.id===t.renderer.id:e.cachedCreation.type==="html"}requestCreateOutputWhenWebviewIdle(e,t,i,n){this._disposed||this.insetMapping.has(t.source)||this.pendingWebviewIdleCreationRequest.has(t.source)||this.pendingWebviewIdleInsetMapping.has(t.source)||this.pendingWebviewIdleCreationRequest.set(t.source,$(()=>{const{message:o,renderer:r,transfer:s}=this._createOutputCreationMessage(e,t,i,n,!0,!0);this._sendMessageToWebview(o,s),this.pendingWebviewIdleInsetMapping.set(t.source,{outputId:o.outputId,versionId:t.source.model.versionId,cellInfo:e,renderer:r,cachedCreation:o}),this.reversedPendingWebviewIdleInsetMapping.set(o.outputId,t.source),this.pendingWebviewIdleCreationRequest.delete(t.source)}))}createOutput(e,t,i,n){if(this._disposed)return;const o=this.insetMapping.get(t.source);if(this.pendingWebviewIdleCreationRequest.get(t.source)?.dispose(),this.pendingWebviewIdleCreationRequest.delete(t.source),this.pendingWebviewIdleInsetMapping.delete(t.source),o&&this.reversedPendingWebviewIdleInsetMapping.delete(o.outputId),o&&this._cachedInsetEqual(o,t)){this.hiddenInsetMapping.delete(t.source),this._sendMessageToWebview({type:"showOutput",cellId:o.cellInfo.cellId,outputId:o.outputId,cellTop:i,outputOffset:n});return}const{message:r,renderer:s,transfer:a}=this._createOutputCreationMessage(e,t,i,n,!1,!1);this._sendMessageToWebview(r,a),this.insetMapping.set(t.source,{outputId:r.outputId,versionId:t.source.model.versionId,cellInfo:e,renderer:s,cachedCreation:r}),this.hiddenInsetMapping.delete(t.source),this.reversedInsetMapping.set(r.outputId,t.source)}createMetadata(e,t){if(t.startsWith("image")){const i=e.outputs.find(n=>n.mime==="text/plain")?.data.buffer;if(i?.length&&i?.length>0){const n=new TextDecoder().decode(i);return{...e.metadata,vscode_altText:n}}}return e.metadata}_createOutputCreationMessage(e,t,i,n,o,r){const s={type:"html",executionId:e.executionId,cellId:e.cellId,cellTop:i,outputOffset:n,left:0,requiredPreloads:[],createOnIdle:o},a=[];let d,l;if(t.type===k.Extension){const c=t.source.model;l=t.renderer;const I=c.outputs.find(w=>w.mime===t.mimeType),f=this.createMetadata(c,t.mimeType),O=N(I.data.buffer,a);d={...s,outputId:c.outputId,rendererId:t.renderer.id,content:{type:k.Extension,outputId:c.outputId,metadata:f,output:{mime:I.mime,valueBytes:O},allOutputs:c.outputs.map(w=>({mime:w.mime}))},initiallyHidden:r}}else d={...s,outputId:S.generateUuid(),content:{type:t.type,htmlContent:t.htmlContent},initiallyHidden:r};return{message:d,renderer:l,transfer:a}}updateOutput(e,t,i,n){if(this._disposed)return;if(!this.insetMapping.has(t.source)){this.createOutput(e,t,i,n);return}const o=this.insetMapping.get(t.source);if(o.versionId===t.source.model.versionId)return;this.hiddenInsetMapping.delete(t.source);let r;const s=[];if(t.type===k.Extension){const a=t.source.model,d=a.outputs.find(f=>f.mime===t.mimeType),l=a.appendedSinceVersion(o.versionId,t.mimeType),c=l?{valueBytes:l.buffer,previousVersion:o.versionId}:void 0,I=N(d.data.buffer,s);r={type:k.Extension,outputId:o.outputId,metadata:a.metadata,output:{mime:t.mimeType,valueBytes:I,appended:c},allOutputs:a.outputs.map(f=>({mime:f.mime}))}}this._sendMessageToWebview({type:"showOutput",cellId:o.cellInfo.cellId,outputId:o.outputId,cellTop:i,outputOffset:n,content:r},s),o.versionId=t.source.model.versionId}async copyImage(e){this._sendMessageToWebview({type:"copyImage",outputId:e.model.outputId,altOutputId:e.model.alternativeOutputId})}removeInsets(e){if(!this._disposed)for(const t of e){const i=this.insetMapping.get(t);if(!i)continue;const n=i.outputId;this._sendMessageToWebview({type:"clearOutput",rendererId:i.cachedCreation.rendererId,cellUri:i.cellInfo.cellUri.toString(),outputId:n,cellId:i.cellInfo.cellId}),this.insetMapping.delete(t),this.pendingWebviewIdleCreationRequest.get(t)?.dispose(),this.pendingWebviewIdleCreationRequest.delete(t),this.pendingWebviewIdleInsetMapping.delete(t),this.reversedPendingWebviewIdleInsetMapping.delete(n),this.reversedInsetMapping.delete(n)}}hideInset(e){if(this._disposed)return;const t=this.insetMapping.get(e);t&&(this.hiddenInsetMapping.add(e),this._sendMessageToWebview({type:"hideOutput",outputId:t.outputId,cellId:t.cellInfo.cellId}))}focusWebview(){this._disposed||this.webview?.focus()}selectOutputContents(e){if(this._disposed)return;const t=e.outputsViewModels.find(n=>n.model.outputId===e.focusedOutputId),i=t?this.insetMapping.get(t)?.outputId:void 0;this._sendMessageToWebview({type:"select-output-contents",cellOrOutputId:i||e.id})}selectInputContents(e){if(this._disposed)return;const t=e.outputsViewModels.find(n=>n.model.outputId===e.focusedOutputId),i=t?this.insetMapping.get(t)?.outputId:void 0;this._sendMessageToWebview({type:"select-input-contents",cellOrOutputId:i||e.id})}focusOutput(e,t,i){this._disposed||(i||this.webview?.focus(),this._sendMessageToWebview({type:"focus-output",cellOrOutputId:e,alternateId:t}))}blurOutput(){this._disposed||this._sendMessageToWebview({type:"blur-output"})}async find(e,t){if(e==="")return this._sendMessageToWebview({type:"findStop",ownerID:t.ownerID}),[];const i=new Promise(o=>{const r=this.webview?.onMessage(s=>{s.message.type==="didFind"&&(o(s.message.matches),r?.dispose())})});return this._sendMessageToWebview({type:"find",query:e,options:t}),await i}findStop(e){this._sendMessageToWebview({type:"findStop",ownerID:e})}async findHighlightCurrent(e,t){const i=new Promise(o=>{const r=this.webview?.onMessage(s=>{s.message.type==="didFindHighlightCurrent"&&(o(s.message.offset),r?.dispose())})});return this._sendMessageToWebview({type:"findHighlightCurrent",index:e,ownerID:t}),await i}async findUnHighlightCurrent(e,t){this._sendMessageToWebview({type:"findUnHighlightCurrent",index:e,ownerID:t})}deltaCellContainerClassNames(e,t,i){this._sendMessageToWebview({type:"decorations",cellId:e,addedClassNames:t,removedClassNames:i})}updateOutputRenderers(){if(!this.webview)return;const e=this.getRendererData();this.localResourceRootsCache=this._getResourceRootsCache();const t=[...this.localResourceRootsCache||[],...this._currentKernel?[this._currentKernel.localResourceRoot]:[]];this.webview.localResourcesRoot=t,this._sendMessageToWebview({type:"updateRenderers",rendererData:e})}async updateKernelPreloads(e){if(this._disposed||e===this._currentKernel)return;const t=this._currentKernel;this._currentKernel=e,t&&t.preloadUris.length>0?this.webview?.reload():e&&this._updatePreloadsFromKernel(e)}_updatePreloadsFromKernel(e){const t=[];for(const i of e.preloadUris){const n=this.environmentService.isExtensionDevelopment&&(i.scheme==="http"||i.scheme==="https")?i:this.asWebviewUri(i,void 0);this._preloadsCache.has(n.toString())||(t.push({uri:n.toString(),originalUri:i.toString()}),this._preloadsCache.add(n.toString()))}t.length&&this._updatePreloads(t)}_updatePreloads(e){if(!this.webview)return;const t=[...this.localResourceRootsCache||[],...this._currentKernel?[this._currentKernel.localResourceRoot]:[]];this.webview.localResourcesRoot=t,this._sendMessageToWebview({type:"preload",resources:e})}_sendMessageToWebview(e,t){this._disposed||this.webview?.postMessage(e,t)}dispose(){this._disposed=!0,this.webview?.dispose(),this.webview=void 0,this.notebookEditor=null,this.insetMapping.clear(),this.pendingWebviewIdleCreationRequest.clear(),super.dispose()}};v=R([u(6,Oe),u(7,pe),u(8,_e),u(9,P),u(10,Pe),u(11,le),u(12,ue),u(13,de),u(14,ae),u(15,ve),u(16,se),u(17,oe),u(18,P),u(19,xe),u(20,ce),u(21,Ne),u(22,Se),u(23,fe),u(24,he)],v);function N(p,h){if(p.byteLength===p.buffer.byteLength)return p;{const e=new Uint8Array(p);return h.push(e.buffer),e}}function D(){const p=x.getColorMap();return p?ie(p):""}function ze(p){try{return decodeURIComponent(p)}catch{return p}}export{v as BackLayerWebView};