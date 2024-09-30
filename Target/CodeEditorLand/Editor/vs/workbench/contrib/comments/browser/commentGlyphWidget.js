import*as o from"../../../../nls.js";import{Color as r}from"../../../../base/common/color.js";import{ContentWidgetPositionPreference as u}from"../../../../editor/browser/editorBrowser.js";import{OverviewRulerLane as h}from"../../../../editor/common/model.js";import{ModelDecorationOptions as p}from"../../../../editor/common/model/textModel.js";import{darken as g,editorBackground as s,editorForeground as m,listInactiveSelectionBackground as c,opaque as d,registerColor as t}from"../../../../platform/theme/common/colorRegistry.js";import{themeColorFromId as v}from"../../../../platform/theme/common/themeService.js";import"../../../../editor/common/editorCommon.js";import{CommentThreadState as _}from"../../../../editor/common/languages.js";import{Disposable as D,toDisposable as b}from"../../../../base/common/lifecycle.js";import{Emitter as C}from"../../../../base/common/event.js";const f=t("editorGutter.commentRangeForeground",{dark:d(c,s),light:g(d(c,s),.05),hcDark:r.white,hcLight:r.black},o.localize("editorGutterCommentRangeForeground","Editor gutter decoration color for commenting ranges. This color should be opaque.")),a=t("editorOverviewRuler.commentForeground",f,o.localize("editorOverviewRuler.commentForeground","Editor overview ruler decoration color for resolved comments. This color should be opaque.")),N=t("editorOverviewRuler.commentUnresolvedForeground",a,o.localize("editorOverviewRuler.commentUnresolvedForeground","Editor overview ruler decoration color for unresolved comments. This color should be opaque.")),O=t("editorGutter.commentGlyphForeground",{dark:m,light:m,hcDark:r.black,hcLight:r.white},o.localize("editorGutterCommentGlyphForeground","Editor gutter decoration color for commenting glyphs."));t("editorGutter.commentUnresolvedGlyphForeground",O,o.localize("editorGutterCommentUnresolvedGlyphForeground","Editor gutter decoration color for commenting glyphs for unresolved comment threads."));class l extends D{static description="comment-glyph-widget";_lineNumber;_editor;_threadState;_commentsDecorations;_commentsOptions;_onDidChangeLineNumber=this._register(new C);onDidChangeLineNumber=this._onDidChangeLineNumber.event;constructor(e,i){super(),this._commentsOptions=this.createDecorationOptions(),this._editor=e,this._commentsDecorations=this._editor.createDecorationsCollection(),this._register(this._commentsDecorations.onDidChange(F=>{const n=this._commentsDecorations.length>0?this._commentsDecorations.getRange(0):null;n&&n.endLineNumber!==this._lineNumber&&(this._lineNumber=n.endLineNumber,this._onDidChangeLineNumber.fire(this._lineNumber))})),this._register(b(()=>this._commentsDecorations.clear())),this.setLineNumber(i)}createDecorationOptions(){const e=this._threadState===_.Unresolved,i={description:l.description,isWholeLine:!0,overviewRuler:{color:v(e?N:a),position:h.Center},collapseOnReplaceEdit:!0,linesDecorationsClassName:`comment-range-glyph comment-thread${e?"-unresolved":""}`};return p.createDynamic(i)}setThreadState(e){this._threadState!==e&&(this._threadState=e,this._commentsOptions=this.createDecorationOptions(),this._updateDecorations())}_updateDecorations(){const e=[{range:{startLineNumber:this._lineNumber,startColumn:1,endLineNumber:this._lineNumber,endColumn:1},options:this._commentsOptions}];this._commentsDecorations.set(e)}setLineNumber(e){this._lineNumber=e,this._updateDecorations()}getPosition(){const e=this._commentsDecorations.length>0?this._commentsDecorations.getRange(0):null;return{position:{lineNumber:e?e.endLineNumber:this._lineNumber,column:1},preference:[u.EXACT]}}}export{l as CommentGlyphWidget,f as overviewRulerCommentingRangeForeground};