import*as m from"../../../../nls.js";import"../../contextmenu.js";import{$ as u,addDisposableListener as h,append as a,EventType as A,h as c}from"../../dom.js";import{StandardKeyboardEvent as w}from"../../keyboardEvent.js";import"../actionbar/actionbar.js";import{ActionViewItem as I,BaseActionViewItem as v}from"../actionbar/actionViewItems.js";import"../contextview/contextview.js";import{DropdownMenu as g}from"./dropdown.js";import{Action as f}from"../../../common/actions.js";import{Codicon as b}from"../../../common/codicons.js";import{ThemeIcon as M}from"../../../common/themables.js";import{Emitter as y}from"../../../common/event.js";import{KeyCode as l}from"../../../common/keyCodes.js";import"../../../common/keybindings.js";import"../../../common/lifecycle.js";import"./dropdown.css";import{getDefaultHoverDelegate as P}from"../hover/hoverDelegateFactory.js";import{getBaseLayerHoverDelegate as V}from"../hover/hoverDelegate2.js";class D extends v{menuActionsOrProvider;dropdownMenu;contextMenuProvider;actionItem=null;_onDidChangeVisibility=this._register(new y);onDidChangeVisibility=this._onDidChangeVisibility.event;options;constructor(e,i,n,r=Object.create(null)){super(null,e,r),this.menuActionsOrProvider=i,this.contextMenuProvider=n,this.options=r,this.options.actionRunner&&(this.actionRunner=this.options.actionRunner)}render(e){this.actionItem=e;const i=o=>{this.element=a(o,u("a.action-label"));let t=[];return typeof this.options.classNames=="string"?t=this.options.classNames.split(/\s+/g).filter(s=>!!s):this.options.classNames&&(t=this.options.classNames),t.find(s=>s==="icon")||t.push("codicon"),this.element.classList.add(...t),this.element.setAttribute("role","button"),this.element.setAttribute("aria-haspopup","true"),this.element.setAttribute("aria-expanded","false"),this._action.label&&this._register(V().setupManagedHover(this.options.hoverDelegate??P("mouse"),this.element,this._action.label)),this.element.ariaLabel=this._action.label||"",null},n=Array.isArray(this.menuActionsOrProvider),r={contextMenuProvider:this.contextMenuProvider,labelRenderer:i,menuAsChild:this.options.menuAsChild,actions:n?this.menuActionsOrProvider:void 0,actionProvider:n?void 0:this.menuActionsOrProvider,skipTelemetry:this.options.skipTelemetry};if(this.dropdownMenu=this._register(new g(e,r)),this._register(this.dropdownMenu.onDidChangeVisibility(o=>{this.element?.setAttribute("aria-expanded",`${o}`),this._onDidChangeVisibility.fire(o)})),this.dropdownMenu.menuOptions={actionViewItemProvider:this.options.actionViewItemProvider,actionRunner:this.actionRunner,getKeyBinding:this.options.keybindingProvider,context:this._context},this.options.anchorAlignmentProvider){const o=this;this.dropdownMenu.menuOptions={...this.dropdownMenu.menuOptions,get anchorAlignment(){return o.options.anchorAlignmentProvider()}}}this.updateTooltip(),this.updateEnabled()}getTooltip(){let e=null;return this.action.tooltip?e=this.action.tooltip:this.action.label&&(e=this.action.label),e??void 0}setActionContext(e){super.setActionContext(e),this.dropdownMenu&&(this.dropdownMenu.menuOptions?this.dropdownMenu.menuOptions.context=e:this.dropdownMenu.menuOptions={context:e})}show(){this.dropdownMenu?.show()}updateEnabled(){const e=!this.action.enabled;this.actionItem?.classList.toggle("disabled",e),this.element?.classList.toggle("disabled",e)}}class ie extends I{constructor(i,n,r,o){super(i,n,r);this.contextMenuProvider=o}dropdownMenuActionViewItem;render(i){if(super.render(i),this.element){this.element.classList.add("action-dropdown-item");const n={getActions:()=>{const t=this.options.menuActionsOrProvider;return Array.isArray(t)?t:t.getActions()}},r=this.options.menuActionClassNames||[],o=c("div.action-dropdown-item-separator",[c("div",{})]).root;o.classList.toggle("prominent",r.includes("prominent")),a(this.element,o),this.dropdownMenuActionViewItem=this._register(new D(this._register(new f("dropdownAction",m.localize("moreActions","More Actions..."))),n,this.contextMenuProvider,{classNames:["dropdown",...M.asClassNameArray(b.dropDownButton),...r],hoverDelegate:this.options.hoverDelegate})),this.dropdownMenuActionViewItem.render(this.element),this._register(h(this.element,A.KEY_DOWN,t=>{if(n.getActions().length===0)return;const s=new w(t);let d=!1;this.dropdownMenuActionViewItem?.isFocused()&&s.equals(l.LeftArrow)?(d=!0,this.dropdownMenuActionViewItem?.blur(),this.focus()):this.isFocused()&&s.equals(l.RightArrow)&&(d=!0,this.blur(),this.dropdownMenuActionViewItem?.focus()),d&&(s.preventDefault(),s.stopPropagation())}))}}blur(){super.blur(),this.dropdownMenuActionViewItem?.blur()}setFocusable(i){super.setFocusable(i),this.dropdownMenuActionViewItem?.setFocusable(i)}}export{ie as ActionWithDropdownActionViewItem,D as DropdownMenuActionViewItem};