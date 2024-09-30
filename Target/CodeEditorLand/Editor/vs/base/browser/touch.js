var S=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var C=(b,e,a,t)=>{for(var o=t>1?void 0:t?w(e,a):e,i=b.length-1,s;i>=0;i--)(s=b[i])&&(o=(t?s(e,a,o):s(o))||o);return t&&o&&S(e,a,o),o};import*as f from"./dom.js";import{mainWindow as Y}from"./window.js";import*as u from"../common/arrays.js";import{memoize as x}from"../common/decorators.js";import{Event as A}from"../common/event.js";import{Disposable as P,markAsSingleton as X,toDisposable as D}from"../common/lifecycle.js";import{LinkedList as N}from"../common/linkedList.js";var h;(i=>(i.Tap="-monaco-gesturetap",i.Change="-monaco-gesturechange",i.Start="-monaco-gesturestart",i.End="-monaco-gesturesend",i.Contextmenu="-monaco-gesturecontextmenu"))(h||={});const r=class r extends P{static SCROLL_FRICTION=-.005;static INSTANCE;static HOLD_DELAY=700;dispatched=!1;targets=new N;ignoreTargets=new N;handle;activeTouches;_lastSetTapCountTime;static CLEAR_TAP_COUNT_TIME=400;constructor(){super(),this.activeTouches={},this.handle=null,this._lastSetTapCountTime=0,this._register(A.runAndSubscribe(f.onDidRegisterWindow,({window:e,disposables:a})=>{a.add(f.addDisposableListener(e.document,"touchstart",t=>this.onTouchStart(t),{passive:!1})),a.add(f.addDisposableListener(e.document,"touchend",t=>this.onTouchEnd(e,t))),a.add(f.addDisposableListener(e.document,"touchmove",t=>this.onTouchMove(t),{passive:!1}))},{window:Y,disposables:this._store}))}static addTarget(e){if(!r.isTouchDevice())return P.None;r.INSTANCE||(r.INSTANCE=X(new r));const a=r.INSTANCE.targets.push(e);return D(a)}static ignoreTarget(e){if(!r.isTouchDevice())return P.None;r.INSTANCE||(r.INSTANCE=X(new r));const a=r.INSTANCE.ignoreTargets.push(e);return D(a)}static isTouchDevice(){return"ontouchstart"in Y||navigator.maxTouchPoints>0}dispose(){this.handle&&(this.handle.dispose(),this.handle=null),super.dispose()}onTouchStart(e){const a=Date.now();this.handle&&(this.handle.dispose(),this.handle=null);for(let t=0,o=e.targetTouches.length;t<o;t++){const i=e.targetTouches.item(t);this.activeTouches[i.identifier]={id:i.identifier,initialTarget:i.target,initialTimeStamp:a,initialPageX:i.pageX,initialPageY:i.pageY,rollingTimestamps:[a],rollingPageX:[i.pageX],rollingPageY:[i.pageY]};const s=this.newGestureEvent(h.Start,i.target);s.pageX=i.pageX,s.pageY=i.pageY,this.dispatchEvent(s)}this.dispatched&&(e.preventDefault(),e.stopPropagation(),this.dispatched=!1)}onTouchEnd(e,a){const t=Date.now(),o=Object.keys(this.activeTouches).length;for(let i=0,s=a.changedTouches.length;i<s;i++){const l=a.changedTouches.item(i);if(!this.activeTouches.hasOwnProperty(String(l.identifier)))continue;const n=this.activeTouches[l.identifier],v=Date.now()-n.initialTimeStamp;if(v<r.HOLD_DELAY&&Math.abs(n.initialPageX-u.tail(n.rollingPageX))<30&&Math.abs(n.initialPageY-u.tail(n.rollingPageY))<30){const c=this.newGestureEvent(h.Tap,n.initialTarget);c.pageX=u.tail(n.rollingPageX),c.pageY=u.tail(n.rollingPageY),this.dispatchEvent(c)}else if(v>=r.HOLD_DELAY&&Math.abs(n.initialPageX-u.tail(n.rollingPageX))<30&&Math.abs(n.initialPageY-u.tail(n.rollingPageY))<30){const c=this.newGestureEvent(h.Contextmenu,n.initialTarget);c.pageX=u.tail(n.rollingPageX),c.pageY=u.tail(n.rollingPageY),this.dispatchEvent(c)}else if(o===1){const c=u.tail(n.rollingPageX),g=u.tail(n.rollingPageY),p=u.tail(n.rollingTimestamps)-n.rollingTimestamps[0],m=c-n.rollingPageX[0],d=g-n.rollingPageY[0],T=[...this.targets].filter(E=>n.initialTarget instanceof Node&&E.contains(n.initialTarget));this.inertia(e,T,t,Math.abs(m)/p,m>0?1:-1,c,Math.abs(d)/p,d>0?1:-1,g)}this.dispatchEvent(this.newGestureEvent(h.End,n.initialTarget)),delete this.activeTouches[l.identifier]}this.dispatched&&(a.preventDefault(),a.stopPropagation(),this.dispatched=!1)}newGestureEvent(e,a){const t=document.createEvent("CustomEvent");return t.initEvent(e,!1,!0),t.initialTarget=a,t.tapCount=0,t}dispatchEvent(e){if(e.type===h.Tap){const a=new Date().getTime();let t=0;a-this._lastSetTapCountTime>r.CLEAR_TAP_COUNT_TIME?t=1:t=2,this._lastSetTapCountTime=a,e.tapCount=t}else(e.type===h.Change||e.type===h.Contextmenu)&&(this._lastSetTapCountTime=0);if(e.initialTarget instanceof Node){for(const t of this.ignoreTargets)if(t.contains(e.initialTarget))return;const a=[];for(const t of this.targets)if(t.contains(e.initialTarget)){let o=0,i=e.initialTarget;for(;i&&i!==t;)o++,i=i.parentElement;a.push([o,t])}a.sort((t,o)=>t[0]-o[0]);for(const[t,o]of a)o.dispatchEvent(e),this.dispatched=!0}}inertia(e,a,t,o,i,s,l,n,v){this.handle=f.scheduleAtNextAnimationFrame(e,()=>{const c=Date.now(),g=c-t;let p=0,m=0,d=!0;o+=r.SCROLL_FRICTION*g,l+=r.SCROLL_FRICTION*g,o>0&&(d=!1,p=i*o*g),l>0&&(d=!1,m=n*l*g);const T=this.newGestureEvent(h.Change);T.translationX=p,T.translationY=m,a.forEach(E=>E.dispatchEvent(T)),d||this.inertia(e,a,c,o,i,s+p,l,n,v+m)})}onTouchMove(e){const a=Date.now();for(let t=0,o=e.changedTouches.length;t<o;t++){const i=e.changedTouches.item(t);if(!this.activeTouches.hasOwnProperty(String(i.identifier)))continue;const s=this.activeTouches[i.identifier],l=this.newGestureEvent(h.Change,s.initialTarget);l.translationX=i.pageX-u.tail(s.rollingPageX),l.translationY=i.pageY-u.tail(s.rollingPageY),l.pageX=i.pageX,l.pageY=i.pageY,this.dispatchEvent(l),s.rollingPageX.length>3&&(s.rollingPageX.shift(),s.rollingPageY.shift(),s.rollingTimestamps.shift()),s.rollingPageX.push(i.pageX),s.rollingPageY.push(i.pageY),s.rollingTimestamps.push(a)}this.dispatched&&(e.preventDefault(),e.stopPropagation(),this.dispatched=!1)}};C([x],r,"isTouchDevice",1);let L=r;export{h as EventType,L as Gesture};