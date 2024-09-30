import"../list/list.js";import{IndexTreeModel as p}from"./indexTreeModel.js";import{ObjectTreeElementCollapseState as d,TreeError as c}from"./tree.js";import"../../../common/event.js";import{Iterable as T}from"../../../common/iterator.js";class P{constructor(t,e={}){this.user=t;this.model=new p(t,null,e),this.onDidSpliceModel=this.model.onDidSpliceModel,this.onDidSpliceRenderedNodes=this.model.onDidSpliceRenderedNodes,this.onDidChangeCollapseState=this.model.onDidChangeCollapseState,this.onDidChangeRenderNodeCount=this.model.onDidChangeRenderNodeCount,e.sorter&&(this.sorter={compare(l,o){return e.sorter.compare(l.element,o.element)}}),this.identityProvider=e.identityProvider}rootRef=null;model;nodes=new Map;nodesByIdentity=new Map;identityProvider;sorter;onDidSpliceModel;onDidSpliceRenderedNodes;onDidChangeCollapseState;onDidChangeRenderNodeCount;get size(){return this.nodes.size}setChildren(t,e=T.empty(),l={}){const o=this.getElementLocation(t);this._setChildren(o,this.preserveCollapseState(e),l)}_setChildren(t,e=T.empty(),l){const o=new Set,n=new Set,r=s=>{if(s.element===null)return;const i=s;if(o.add(i.element),this.nodes.set(i.element,i),this.identityProvider){const a=this.identityProvider.getId(i.element).toString();n.add(a),this.nodesByIdentity.set(a,i)}l.onDidCreateNode?.(i)},h=s=>{if(s.element===null)return;const i=s;if(o.has(i.element)||this.nodes.delete(i.element),this.identityProvider){const a=this.identityProvider.getId(i.element).toString();n.has(a)||this.nodesByIdentity.delete(a)}l.onDidDeleteNode?.(i)};this.model.splice([...t,0],Number.MAX_VALUE,e,{...l,onDidCreateNode:r,onDidDeleteNode:h})}preserveCollapseState(t=T.empty()){return this.sorter&&(t=[...t].sort(this.sorter.compare.bind(this.sorter))),T.map(t,e=>{let l=this.nodes.get(e.element);if(!l&&this.identityProvider){const r=this.identityProvider.getId(e.element).toString();l=this.nodesByIdentity.get(r)}if(!l){let r;return typeof e.collapsed>"u"?r=void 0:e.collapsed===d.Collapsed||e.collapsed===d.PreserveOrCollapsed?r=!0:e.collapsed===d.Expanded||e.collapsed===d.PreserveOrExpanded?r=!1:r=!!e.collapsed,{...e,children:this.preserveCollapseState(e.children),collapsed:r}}const o=typeof e.collapsible=="boolean"?e.collapsible:l.collapsible;let n;return typeof e.collapsed>"u"||e.collapsed===d.PreserveOrCollapsed||e.collapsed===d.PreserveOrExpanded?n=l.collapsed:e.collapsed===d.Collapsed?n=!0:e.collapsed===d.Expanded?n=!1:n=!!e.collapsed,{...e,collapsible:o,collapsed:n,children:this.preserveCollapseState(e.children)}})}rerender(t){const e=this.getElementLocation(t);this.model.rerender(e)}resort(t=null,e=!0){if(!this.sorter)return;const l=this.getElementLocation(t),o=this.model.getNode(l);this._setChildren(l,this.resortChildren(o,e),{})}resortChildren(t,e,l=!0){let o=[...t.children];return(e||l)&&(o=o.sort(this.sorter.compare.bind(this.sorter))),T.map(o,n=>({element:n.element,collapsible:n.collapsible,collapsed:n.collapsed,children:this.resortChildren(n,e,!1)}))}getFirstElementChild(t=null){const e=this.getElementLocation(t);return this.model.getFirstElementChild(e)}getLastElementAncestor(t=null){const e=this.getElementLocation(t);return this.model.getLastElementAncestor(e)}has(t){return this.nodes.has(t)}getListIndex(t){const e=this.getElementLocation(t);return this.model.getListIndex(e)}getListRenderCount(t){const e=this.getElementLocation(t);return this.model.getListRenderCount(e)}isCollapsible(t){const e=this.getElementLocation(t);return this.model.isCollapsible(e)}setCollapsible(t,e){const l=this.getElementLocation(t);return this.model.setCollapsible(l,e)}isCollapsed(t){const e=this.getElementLocation(t);return this.model.isCollapsed(e)}setCollapsed(t,e,l){const o=this.getElementLocation(t);return this.model.setCollapsed(o,e,l)}expandTo(t){const e=this.getElementLocation(t);this.model.expandTo(e)}refilter(){this.model.refilter()}getNode(t=null){if(t===null)return this.model.getNode(this.model.rootRef);const e=this.nodes.get(t);if(!e)throw new c(this.user,`Tree element not found: ${t}`);return e}getNodeLocation(t){return t.element}getParentNodeLocation(t){if(t===null)throw new c(this.user,"Invalid getParentNodeLocation call");const e=this.nodes.get(t);if(!e)throw new c(this.user,`Tree element not found: ${t}`);const l=this.model.getNodeLocation(e),o=this.model.getParentNodeLocation(l);return this.model.getNode(o).element}getElementLocation(t){if(t===null)return[];const e=this.nodes.get(t);if(!e)throw new c(this.user,`Tree element not found: ${t}`);return this.model.getNodeLocation(e)}}export{P as ObjectTreeModel};