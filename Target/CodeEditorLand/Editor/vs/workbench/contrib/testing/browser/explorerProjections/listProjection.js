var u=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var I=(a,n,e,t)=>{for(var r=t>1?void 0:t?g(n,e):n,s=a.length-1,i;s>=0;s--)(i=a[s])&&(r=(t?i(n,e,r):i(r))||r);return t&&r&&u(n,e,r),r},l=(a,n)=>(e,t)=>n(e,t,a);import"../../../../../base/browser/ui/tree/objectTree.js";import{Emitter as S}from"../../../../../base/common/event.js";import"../../../../../base/common/filters.js";import{Iterable as c}from"../../../../../base/common/iterator.js";import{Disposable as v}from"../../../../../base/common/lifecycle.js";import{flatTestItemDelimiter as y}from"./display.js";import{TestItemTreeElement as b,TestTreeErrorMessage as E,getChildrenForParent as C,testIdentityProvider as x}from"./index.js";import{isCollapsedInSerializedTestTree as D}from"./testingViewState.js";import{TestId as p}from"../../common/testId.js";import{TestResultItemChangeReason as R}from"../../common/testResult.js";import{ITestResultService as w}from"../../common/testResultService.js";import{ITestService as z}from"../../common/testService.js";import{TestDiffOpType as h,TestItemExpandState as U,TestResultState as f,applyTestItemUpdate as k}from"../../common/testTypes.js";class T extends b{constructor(e,t,r){super({...e,item:{...e.item}},t);this.chain=r;this.updateErrorVisibility()}errorChild;descriptionParts=[];get description(){return this.chain.map(e=>e.item.label).join(y)}update(e){k(this.test,e),this.updateErrorVisibility(e),this.fireChange()}fireChange(){this.changeEmitter.fire()}updateErrorVisibility(e){this.errorChild&&(!this.test.item.error||e?.item?.error)&&(this.children.delete(this.errorChild),this.errorChild=void 0),this.test.item.error&&!this.errorChild&&(this.errorChild=new E(this.test.item.error,this),this.children.add(this.errorChild))}}let m=class extends v{constructor(e,t,r){super();this.lastState=e;this.testService=t;this.results=r;this._register(t.onDidProcessDiff(s=>this.applyDiff(s))),this._register(r.onResultsChanged(s=>{if("removed"in s)for(const i of this.items.values()){const o=this.results.getStateById(i.test.item.extId)?.[1];i.duration=o?.ownDuration,i.state=o?.ownComputedState||f.Unset,i.fireChange()}})),this._register(r.onTestChanged(s=>{if(s.reason===R.NewMessage)return;let i=s.item;if(i.ownComputedState===f.Unset||s.result!==r.results[0]){const d=r.getStateById(i.item.extId);d&&(i=d[1])}const o=this.items.get(i.item.extId);o&&(o.retired=!!i.retired,o.state=i.computedState,o.duration=i.ownDuration,o.fireChange())}));for(const s of t.collection.all)this.storeItem(s)}updateEmitter=new S;items=new Map;get rootsWithChildren(){const e=c.map(this.testService.collection.rootItems,t=>this.items.get(t.item.extId));return c.filter(e,t=>!!t?.children.size)}onUpdate=this.updateEmitter.event;getElementByTestId(e){return this.items.get(e)}applyDiff(e){for(const t of e)switch(t.op){case h.Add:{this.storeItem(t.item);break}case h.Update:{this.items.get(t.item.extId)?.update(t.item);break}case h.Remove:{for(const[r,s]of this.items)(r===t.itemId||p.isChild(t.itemId,r))&&this.unstoreItem(s);break}}e.length!==0&&this.updateEmitter.fire()}applyTo(e){e.setChildren(null,C(this.lastState,this.rootsWithChildren,null),{diffIdentityProvider:x,diffDepth:1/0})}expandElement(e,t){e instanceof T&&e.test.expand!==U.NotExpandable&&this.testService.collection.expand(e.test.item.extId,t)}unstoreItem(e){this.items.delete(e.test.item.extId),e.parent?.children.delete(e);const t=p.fromString(e.test.item.extId).parentId;if(t)for(const r of t.idsToRoot()){const s=this.testService.collection.getNodeById(r.toString());if(s){s.children.size===0&&!this.items.has(r.toString())&&this._storeItem(t,s);break}}}_storeItem(e,t){const r=e.isRoot?null:this.items.get(t.controllerId),s=[...e.idsFromRoot()].slice(1,-1).map(d=>this.testService.collection.getNodeById(d.toString())),i=new T(t,r,s);r?.children.add(i),this.items.set(i.test.item.extId,i),(i.depth===0||D(this.lastState,i.test.item.extId)===!1)&&this.expandElement(i,1/0);const o=this.results.getStateById(i.test.item.extId)?.[1];o&&(i.retired=!!o.retired,i.state=o.computedState,i.duration=o.ownDuration)}storeItem(e){const t=p.fromString(e.item.extId);for(const r of t.idsToRoot())if(!r.isRoot){const s=this.items.get(r.toString());if(s){this.unstoreItem(s);break}}this._storeItem(t,e)}};m=I([l(1,z),l(2,w)],m);export{m as ListProjection};