import{equals as d}from"../../../base/common/arrays.js";import{RunOnceScheduler as s}from"../../../base/common/async.js";import{Emitter as o}from"../../../base/common/event.js";import{Disposable as r}from"../../../base/common/lifecycle.js";import{LineRange as l}from"../core/lineRange.js";import"../encodedTokenAttributes.js";import"../languages.js";import"../model.js";import"./textModel.js";import"../textModelEvents.js";import{BackgroundTokenizationState as c}from"../tokenizationTextModelPart.js";import"../tokens/lineTokens.js";class x{_onDidChangeVisibleRanges=new o;onDidChangeVisibleRanges=this._onDidChangeVisibleRanges.event;_views=new Set;attachView(){const n=new h(e=>{this._onDidChangeVisibleRanges.fire({view:n,state:e})});return this._views.add(n),n}detachView(n){this._views.delete(n),this._onDidChangeVisibleRanges.fire({view:n,state:void 0})}}class h{constructor(n){this.handleStateChange=n}setVisibleLines(n,e){const t=n.map(a=>new l(a.startLineNumber,a.endLineNumber+1));this.handleStateChange({visibleLineRanges:t,stabilized:e})}}class N extends r{constructor(e){super();this._refreshTokens=e}runner=this._register(new s(()=>this.update(),50));_computedLineRanges=[];_lineRanges=[];get lineRanges(){return this._lineRanges}update(){d(this._computedLineRanges,this._lineRanges,(e,t)=>e.equals(t))||(this._computedLineRanges=this._lineRanges,this._refreshTokens())}handleStateChange(e){this._lineRanges=e.visibleLineRanges,e.stabilized?(this.runner.cancel(),this.update()):this.runner.schedule()}}class M extends r{constructor(e,t,a){super();this._languageIdCodec=e;this._textModel=t;this.getLanguageId=a}_backgroundTokenizationState=c.InProgress;get backgroundTokenizationState(){return this._backgroundTokenizationState}_onDidChangeBackgroundTokenizationState=this._register(new o);onDidChangeBackgroundTokenizationState=this._onDidChangeBackgroundTokenizationState.event;_onDidChangeTokens=this._register(new o);onDidChangeTokens=this._onDidChangeTokens.event;tokenizeIfCheap(e){this.isCheapToTokenize(e)&&this.forceTokenization(e)}}export{M as AbstractTokens,N as AttachedViewHandler,x as AttachedViews};