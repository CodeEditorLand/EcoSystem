import{Emitter as l}from"../../../../base/common/event.js";import{Disposable as a}from"../../../../base/common/lifecycle.js";import"../codeEditor/codeEditorWidget.js";import"../../../common/config/editorOptions.js";import"../../../common/core/dimension.js";import"../../../common/core/position.js";import"../../../common/core/range.js";import"../../../common/core/selection.js";import{ScrollType as i}from"../../../common/editorCommon.js";import"../../../common/model.js";class r extends a{static idCounter=0;_id=++r.idCounter;_onDidDispose=this._register(new l);onDidDispose=this._onDidDispose.event;getId(){return this.getEditorType()+":v2:"+this._id}getVisibleColumnFromPosition(e){return this._targetEditor.getVisibleColumnFromPosition(e)}getStatusbarColumn(e){return this._targetEditor.getStatusbarColumn(e)}getPosition(){return this._targetEditor.getPosition()}setPosition(e,t="api"){this._targetEditor.setPosition(e,t)}revealLine(e,t=i.Smooth){this._targetEditor.revealLine(e,t)}revealLineInCenter(e,t=i.Smooth){this._targetEditor.revealLineInCenter(e,t)}revealLineInCenterIfOutsideViewport(e,t=i.Smooth){this._targetEditor.revealLineInCenterIfOutsideViewport(e,t)}revealLineNearTop(e,t=i.Smooth){this._targetEditor.revealLineNearTop(e,t)}revealPosition(e,t=i.Smooth){this._targetEditor.revealPosition(e,t)}revealPositionInCenter(e,t=i.Smooth){this._targetEditor.revealPositionInCenter(e,t)}revealPositionInCenterIfOutsideViewport(e,t=i.Smooth){this._targetEditor.revealPositionInCenterIfOutsideViewport(e,t)}revealPositionNearTop(e,t=i.Smooth){this._targetEditor.revealPositionNearTop(e,t)}getSelection(){return this._targetEditor.getSelection()}getSelections(){return this._targetEditor.getSelections()}setSelection(e,t="api"){this._targetEditor.setSelection(e,t)}setSelections(e,t="api"){this._targetEditor.setSelections(e,t)}revealLines(e,t,o=i.Smooth){this._targetEditor.revealLines(e,t,o)}revealLinesInCenter(e,t,o=i.Smooth){this._targetEditor.revealLinesInCenter(e,t,o)}revealLinesInCenterIfOutsideViewport(e,t,o=i.Smooth){this._targetEditor.revealLinesInCenterIfOutsideViewport(e,t,o)}revealLinesNearTop(e,t,o=i.Smooth){this._targetEditor.revealLinesNearTop(e,t,o)}revealRange(e,t=i.Smooth,o=!1,n=!0){this._targetEditor.revealRange(e,t,o,n)}revealRangeInCenter(e,t=i.Smooth){this._targetEditor.revealRangeInCenter(e,t)}revealRangeInCenterIfOutsideViewport(e,t=i.Smooth){this._targetEditor.revealRangeInCenterIfOutsideViewport(e,t)}revealRangeNearTop(e,t=i.Smooth){this._targetEditor.revealRangeNearTop(e,t)}revealRangeNearTopIfOutsideViewport(e,t=i.Smooth){this._targetEditor.revealRangeNearTopIfOutsideViewport(e,t)}revealRangeAtTop(e,t=i.Smooth){this._targetEditor.revealRangeAtTop(e,t)}getSupportedActions(){return this._targetEditor.getSupportedActions()}focus(){this._targetEditor.focus()}trigger(e,t,o){this._targetEditor.trigger(e,t,o)}createDecorationsCollection(e){return this._targetEditor.createDecorationsCollection(e)}changeDecorations(e){return this._targetEditor.changeDecorations(e)}}export{r as DelegatingEditor};