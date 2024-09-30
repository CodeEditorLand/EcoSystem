var b=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var S=(s,a,e,t)=>{for(var i=t>1?void 0:t?x(a,e):a,r=s.length-1,n;r>=0;r--)(n=s[r])&&(i=(t?n(a,e,i):n(i))||i);return t&&i&&b(a,e,i),i},T=(s,a)=>(e,t)=>a(e,t,s);import"../../../../../base/browser/ui/tree/objectTree.js";import{Emitter as E}from"../../../../../base/common/event.js";import"../../../../../base/common/filters.js";import{Iterable as l}from"../../../../../base/common/iterator.js";import{Disposable as y}from"../../../../../base/common/lifecycle.js";import{TestItemTreeElement as g,TestTreeErrorMessage as D,getChildrenForParent as P,testIdentityProvider as R}from"./index.js";import{isCollapsedInSerializedTestTree as z}from"./testingViewState.js";import{refreshComputedState as h}from"../../common/getComputedState.js";import{TestId as U}from"../../common/testId.js";import{TestResultItemChangeReason as v}from"../../common/testResult.js";import{ITestResultService as O}from"../../common/testResultService.js";import{ITestService as k}from"../../common/testService.js";import{TestDiffOpType as C,TestItemExpandState as w,TestResultState as c,applyTestItemUpdate as A}from"../../common/testTypes.js";const u={getOwnState:s=>s instanceof g?s.ownState:c.Unset,getCurrentComputedState:s=>s.state,setComputedState:(s,a)=>s.state=a,getCurrentComputedDuration:s=>s.duration,getOwnDuration:s=>s instanceof g?s.ownDuration:void 0,setComputedDuration:(s,a)=>s.duration=a,getChildren:s=>l.filter(s.children.values(),a=>a instanceof p),*getParents(s){for(let a=s.parent;a;a=a.parent)yield a}};class p extends g{constructor(e,t,i){super({...e,item:{...e.item}},t);this.addedOrRemoved=i;this.updateErrorVisibility()}ownState=c.Unset;ownDuration;get description(){return this.test.item.description}errorChild;update(e){A(this.test,e),this.updateErrorVisibility(e),this.fireChange()}fireChange(){this.changeEmitter.fire()}updateErrorVisibility(e){this.errorChild&&(!this.test.item.error||e?.item?.error)&&(this.addedOrRemoved(this),this.children.delete(this.errorChild),this.errorChild=void 0),this.test.item.error&&!this.errorChild&&(this.errorChild=new D(this.test.item.error,this),this.children.add(this.errorChild),this.addedOrRemoved(this))}}let f=class extends y{constructor(e,t,i){super();this.lastState=e;this.testService=t;this.results=i;this._register(t.onDidProcessDiff(r=>this.applyDiff(r))),this._register(i.onResultsChanged(r=>{if("removed"in r)for(const n of[...this.items.values()].sort((o,d)=>d.depth-o.depth)){const o=this.results.getStateById(n.test.item.extId)?.[1];n.ownDuration=o?.ownDuration,h(u,n,o?.ownComputedState??c.Unset).forEach(d=>d.fireChange())}})),this._register(i.onTestChanged(r=>{if(r.reason===v.NewMessage)return;let n=r.item;if(n.ownComputedState===c.Unset||r.result!==i.results[0]){const m=i.getStateById(n.item.extId);m&&(n=m[1])}const o=this.items.get(n.item.extId);if(!o)return;const d=r.reason===v.OwnStateChange&&r.previousOwnDuration!==n.ownDuration,I=o.children.size?void 0:n.computedState;o.retired=!!n.retired,o.ownState=n.ownComputedState,o.ownDuration=n.ownDuration,o.fireChange(),h(u,o,I,d).forEach(m=>m.fireChange())}));for(const r of t.collection.all)this.storeItem(this.createItem(r))}updateEmitter=new E;changedParents=new Set;resortedParents=new Set;items=new Map;get rootsWithChildren(){const e=l.map(this.testService.collection.rootItems,t=>this.items.get(t.item.extId));return l.filter(e,t=>!!t?.children.size)}onUpdate=this.updateEmitter.event;getElementByTestId(e){return this.items.get(e)}applyDiff(e){for(const t of e)switch(t.op){case C.Add:{const i=this.createItem(t.item);this.storeItem(i);break}case C.Update:{const i=t.item,r=this.items.get(i.extId);if(!r)break;const n=r.test.expand===w.NotExpandable&&i.expand;r.update(i),n?this.changedParents.add(r.parent):this.resortedParents.add(r.parent);break}case C.Remove:{const i=this.items.get(t.itemId);if(!i)break;const r=i.parent,n=i.depth===1&&(r?.children.size===1||!l.some(this.rootsWithChildren,(d,I)=>I===1));this.changedParents.add(n?null:r);const o=[[i]];for(;o.length;)for(const d of o.pop())d instanceof p&&o.push(this.unstoreItem(d));r instanceof p&&h(u,r,void 0,!!r.duration).forEach(d=>d.fireChange())}}e.length!==0&&this.updateEmitter.fire()}applyTo(e){for(const t of this.changedParents)(!t||e.hasElement(t))&&e.setChildren(t,P(this.lastState,this.rootsWithChildren,t),{diffIdentityProvider:R});for(const t of this.resortedParents)(!t||e.hasElement(t))&&e.resort(t,!1);this.changedParents.clear(),this.resortedParents.clear()}expandElement(e,t){e instanceof p&&e.test.expand!==w.NotExpandable&&this.testService.collection.expand(e.test.item.extId,t)}createItem(e){const t=U.parentId(e.item.extId),i=t?this.items.get(t):null;return new p(e,i,r=>this.changedParents.add(r))}unstoreItem(e){return e.parent?.children.delete(e),this.items.delete(e.test.item.extId),e.children}storeItem(e){e.parent?.children.add(e),this.items.set(e.test.item.extId,e);const i=e.parent?.children.size===1?e.parent.parent:e.parent;this.changedParents.add(i),i?.depth===0&&this.changedParents.add(null),(e.depth===0||z(this.lastState,e.test.item.extId)===!1)&&this.expandElement(e,0);const r=this.results.getStateById(e.test.item.extId)?.[1];r&&(e.retired=!!r.retired,e.ownState=r.computedState,e.ownDuration=r.ownDuration,h(u,e,void 0,!!e.ownDuration).forEach(n=>n.fireChange()))}};f=S([T(1,k),T(2,O)],f);export{f as TreeProjection};