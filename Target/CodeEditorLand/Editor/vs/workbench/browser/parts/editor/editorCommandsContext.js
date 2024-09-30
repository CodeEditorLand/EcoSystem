import{getActiveElement as x}from"../../../../base/browser/dom.js";import{List as C}from"../../../../base/browser/ui/list/listWidget.js";import{URI as v}from"../../../../base/common/uri.js";import"../../../../platform/list/browser/listService.js";import{isEditorCommandsContext as g,isEditorIdentifier as G}from"../../../common/editor.js";import"../../../common/editor/editorInput.js";import{isEditorGroup as m}from"../../../services/editor/common/editorGroupsService.js";import"../../../services/editor/common/editorService.js";function D(o,e,n,r){const s=L(o,e,n,r),d=s.length&&s[0].preserveFocus||!1,t={groupedEditors:[],preserveFocus:d};for(const i of s){const u=S(i,n);if(!u)continue;const{group:f,editor:p}=u;let I;for(const E of t.groupedEditors)if(E.group.id===f.id){I=E;break}I||(I={group:f,editors:[]},t.groupedEditors.push(I)),p&&I.editors.push(p)}return t}function L(o,e,n,r){const s=r.lastFocusedList;let d=s instanceof C&&s.getHTMLElement()===x(),t=h(o,d,e,n,r);if(!t){const u=n.activeGroup,f=u.activeEditor;t={groupId:u.id,editorIndex:f?u.getIndexOfEditor(f):void 0},d=!1}const i=a(t,d,e,n,r);return F(t,i)}function F(o,e){if(e.length<=1)return e;const n=e.findIndex(r=>r.groupId===o.groupId&&r.editorIndex===o.editorIndex);if(n!==-1)e.splice(n,1),e.unshift(o);else if(o.editorIndex===void 0)e.unshift(o);else throw new Error("Editor context not found in multi editor context");return e}function h(o,e,n,r,s){const d=o.filter(t=>g(t)||v.isUri(t));for(const t of d)if(g(t))return t;for(const t of d){const i=n.findEditors(t);if(i.length){const u=i[0],f=r.getGroup(u.groupId);return{groupId:u.groupId,editorIndex:f?.getIndexOfEditor(u.editor)}}}if(e){const t=s.lastFocusedList;for(const i of t.getFocusedElements())if(l(i))return c(i,void 0,r)}}function a(o,e,n,r,s){if(e){const t=s.lastFocusedList.getSelectedElements().filter(l);if(t.length>1)return t.map(i=>c(i,o.preserveFocus,r));if(t.length===0)return a(o,!1,n,r,s)}else{const d=r.getGroup(o.groupId),t=o.editorIndex!==void 0?d?.getEditorByIndex(o.editorIndex):d?.activeEditor;if(d&&t&&d.isSelected(t))return d.selectedEditors.map(i=>c({editor:i,groupId:d.id},o.preserveFocus,r))}return[o]}function c(o,e,n){if(m(o))return{groupId:o.id,editorIndex:void 0,preserveFocus:e};const r=n.getGroup(o.groupId);return{groupId:o.groupId,editorIndex:r?r.getIndexOfEditor(o.editor):-1,preserveFocus:e}}function l(o){return m(o)||G(o)}function S(o,e){const n=e.getGroup(o.groupId);if(!n)return;if(o.editorIndex===void 0)return{group:n,editor:void 0};const r=n.getEditorByIndex(o.editorIndex);return{group:n,editor:r}}export{D as resolveCommandsContext};