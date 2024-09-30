var v=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var g=(h,r,i,s)=>{for(var e=s>1?void 0:s?_(r,i):r,n=h.length-1,o;n>=0;n--)(o=h[n])&&(e=(s?o(r,i,e):o(e))||e);return s&&e&&v(r,i,e),e},d=(h,r)=>(i,s)=>r(i,s,h);import{Disposable as c,toDisposable as w}from"../../../../../base/common/lifecycle.js";import"../../../../../base/common/htmlContent.js";import{Widget as y}from"../../../../../base/browser/ui/widget.js";import"./widgets.js";import*as m from"../../../../../base/browser/dom.js";import{IHoverService as f}from"../../../../../platform/hover/browser/hover.js";import{IConfigurationService as u}from"../../../../../platform/configuration/common/configuration.js";import{TerminalSettingId as x}from"../../../../../platform/terminal/common/terminal.js";const a=m.$;let l=class extends c{constructor(i,s,e,n,o,t){super();this._targetOptions=i;this._text=s;this._actions=e;this._linkHandler=n;this._hoverService=o;this._configurationService=t}id="hover";attach(i){if(!this._configurationService.getValue(x.ShowLinkHover))return;const e=new D(i,this._targetOptions),n=this._hoverService.showHover({target:e,content:this._text,actions:this._actions,linkHandler:this._linkHandler,additionalClasses:["xterm-hover"]});n&&this._register(n)}};l=g([d(4,f),d(5,u)],l);class D extends y{constructor(i,s){super();this._options=s;this._domNode=a("div.terminal-hover-targets.xterm-hover");const e=this._options.viewportRange.end.y-this._options.viewportRange.start.y+1,n=(this._options.viewportRange.end.y>this._options.viewportRange.start.y?this._options.terminalDimensions.width-this._options.viewportRange.start.x:this._options.viewportRange.end.x-this._options.viewportRange.start.x+1)*this._options.cellDimensions.width,o=a("div.terminal-hover-target.hoverHighlight");if(o.style.left=`${this._options.viewportRange.start.x*this._options.cellDimensions.width}px`,o.style.bottom=`${(this._options.terminalDimensions.height-this._options.viewportRange.start.y-1)*this._options.cellDimensions.height}px`,o.style.width=`${n}px`,o.style.height=`${this._options.cellDimensions.height}px`,this._targetElements.push(this._domNode.appendChild(o)),e>2){const t=a("div.terminal-hover-target.hoverHighlight");t.style.left="0px",t.style.bottom=`${(this._options.terminalDimensions.height-this._options.viewportRange.start.y-1-(e-2))*this._options.cellDimensions.height}px`,t.style.width=`${this._options.terminalDimensions.width*this._options.cellDimensions.width}px`,t.style.height=`${(e-2)*this._options.cellDimensions.height}px`,this._targetElements.push(this._domNode.appendChild(t))}if(e>1){const t=a("div.terminal-hover-target.hoverHighlight");t.style.left="0px",t.style.bottom=`${(this._options.terminalDimensions.height-this._options.viewportRange.end.y-1)*this._options.cellDimensions.height}px`,t.style.width=`${(this._options.viewportRange.end.x+1)*this._options.cellDimensions.width}px`,t.style.height=`${this._options.cellDimensions.height}px`,this._targetElements.push(this._domNode.appendChild(t))}if(this._options.modifierDownCallback&&this._options.modifierUpCallback){let t=!1;this._register(m.addDisposableListener(i.ownerDocument,"keydown",p=>{p.ctrlKey&&!t&&(t=!0,this._options.modifierDownCallback())})),this._register(m.addDisposableListener(i.ownerDocument,"keyup",p=>{p.ctrlKey||(t=!1,this._options.modifierUpCallback())}))}i.appendChild(this._domNode),this._register(w(()=>this._domNode?.remove()))}_domNode;_targetElements=[];get targetElements(){return this._targetElements}}export{l as TerminalHover};