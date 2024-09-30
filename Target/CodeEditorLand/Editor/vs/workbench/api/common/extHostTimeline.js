import"vscode";import{URI as u}from"../../../base/common/uri.js";import{createDecorator as x}from"../../../platform/instantiation/common/instantiation.js";import{MainContext as y}from"./extHost.protocol.js";import"../../contrib/timeline/common/timeline.js";import{toDisposable as M,DisposableStore as C}from"../../../base/common/lifecycle.js";import"../../../base/common/cancellation.js";import"./extHostCommands.js";import{ThemeIcon as U,MarkdownString as h}from"./extHostTypes.js";import{MarkdownString as g}from"./extHostTypeConverters.js";import{ExtensionIdentifier as S}from"../../../platform/extensions/common/extensions.js";import{MarshalledId as _}from"../../../base/common/marshallingIds.js";import{isString as I}from"../../../base/common/types.js";const Y=x("IExtHostTimeline");class Z{_proxy;_providers=new Map;_itemsBySourceAndUriMap=new Map;constructor(e,i){this._proxy=e.getProxy(y.MainThreadTimeline),i.registerArgumentProcessor({processArgument:(o,s)=>{if(o&&o.$mid===_.TimelineActionContext)if(this._providers.get(o.source)&&S.equals(s,this._providers.get(o.source)?.extension)){const m=o.uri===void 0?void 0:u.revive(o.uri);return this._itemsBySourceAndUriMap.get(o.source)?.get(v(m))?.get(o.handle)}else return;return o}})}async $getTimeline(e,i,o,s){return this._providers.get(e)?.provider.provideTimeline(u.revive(i),o,s)}registerTimelineProvider(e,i,o,s){const m=new C,a=this.convertTimelineItem(i.id,s,m).bind(this);let n;i.onDidChange&&(n=i.onDidChange(t=>this._proxy.$emitTimelineChangeEvent({uri:void 0,reset:!0,...t,id:i.id}),this));const r=this._itemsBySourceAndUriMap;return this.registerTimelineProviderCore({...i,scheme:e,onDidChange:void 0,async provideTimeline(t,l,c){l?.resetCache&&(m.clear(),r.get(i.id)?.clear());const d=await i.provideTimeline(t,l,c);if(d==null)return;const f=a(t,l);return{...d,source:i.id,items:d.items.map(f)}},dispose(){for(const t of r.values())t.get(i.id)?.clear();n?.dispose(),m.dispose()}},o)}convertTimelineItem(e,i,o){return(s,m)=>{let a;if(m?.cacheResults){let n=this._itemsBySourceAndUriMap.get(e);n===void 0&&(n=new Map,this._itemsBySourceAndUriMap.set(e,n));const r=v(s);a=n.get(r),a===void 0&&(a=new Map,n.set(r,a))}return n=>{const{iconPath:r,...t}=n,l=`${e}|${n.id??n.timestamp}`;a?.set(l,n);let c,d,f;n.iconPath&&(r instanceof U?f={id:r.id,color:r.color}:u.isUri(r)?(c=r,d=r):{light:c,dark:d}=r);let p;return h.isMarkdownString(t.tooltip)?p=g.from(t.tooltip):I(t.tooltip)?p=t.tooltip:h.isMarkdownString(t.detail)?p=g.from(t.detail):I(t.detail)&&(p=t.detail),{...t,id:t.id??void 0,handle:l,source:e,command:n.command?i.toInternal(n.command,o):void 0,icon:c,iconDark:d,themeIcon:f,tooltip:p,accessibilityInformation:n.accessibilityInformation}}}}registerTimelineProviderCore(e,i){if(this._providers.get(e.id))throw new Error(`Timeline Provider ${e.id} already exists.`);return this._proxy.$registerTimelineProvider({id:e.id,label:e.label,scheme:e.scheme}),this._providers.set(e.id,{provider:e,extension:i}),M(()=>{for(const s of this._itemsBySourceAndUriMap.values())s.get(e.id)?.clear();this._providers.delete(e.id),this._proxy.$unregisterTimelineProvider(e.id),e.dispose()})}}function v(T){return T?.toString()}export{Z as ExtHostTimeline,Y as IExtHostTimeline};