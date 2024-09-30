import*as d from"../../../../base/browser/dom.js";import"../../../../base/common/keybindings.js";import*as h from"../../../../nls.js";import"../../../../platform/list/browser/listService.js";import"../../../services/views/common/viewsService.js";import"./searchView.js";import{FileMatch as a,FolderMatch as f,Match as o,searchComparer as l}from"./searchModel.js";import{VIEW_ID as c}from"../../../services/search/common/search.js";const C=h.localize2("search","Search");function F(r){const e=u(r);return!!(e&&d.isAncestorOfActiveElement(e.getContainer()))}function K(r,e){return b(r,e)}function u(r){return r.getActiveViewWithId(c)}function O(r,e,n){let t=r.getSelection().filter(i=>i!==null).sort((i,s)=>l(i,s,n.sortOrder));return e&&!(t.length>1&&t.includes(e))&&(t=[e]),t}function W(r,e){return e?!e||r.includes(e)||p(r,e):!1}function p(r,e){for(const n of r)if(n instanceof a&&e instanceof o&&n.matches().includes(e)||n instanceof f&&(e instanceof a&&n.getDownstreamFileMatch(e.resource)||e instanceof o&&n.getDownstreamFileMatch(e.parent().resource)))return!0;return!1}function L(r,e){return r.openView(c,e).then(n=>n??void 0)}function b(r,e){return e?r+" ("+e.getLabel()+")":r}export{K as appendKeyBindingLabel,C as category,O as getElementsToOperateOn,u as getSearchView,F as isSearchViewFocused,L as openSearchView,W as shouldRefocus};