import{Emitter as d}from"../../../../../base/common/event.js";import{DisposableStore as a}from"../../../../../base/common/lifecycle.js";import"../../../../../platform/configuration/common/configuration.js";function h(n){return g(n)}function g(n){const o=new a,t=o.add(new d),e={options:{enabled:n.getValue("diffEditor.hideUnchangedRegions.enabled"),minimumLineCount:n.getValue("diffEditor.hideUnchangedRegions.minimumLineCount"),contextLineCount:n.getValue("diffEditor.hideUnchangedRegions.contextLineCount"),revealLineCount:n.getValue("diffEditor.hideUnchangedRegions.revealLineCount")},onDidChangeEnablement:t.event.bind(t),dispose:()=>o.dispose()};return o.add(n.onDidChangeConfiguration(i=>{i.affectsConfiguration("diffEditor.hideUnchangedRegions.minimumLineCount")&&(e.options.minimumLineCount=n.getValue("diffEditor.hideUnchangedRegions.minimumLineCount")),i.affectsConfiguration("diffEditor.hideUnchangedRegions.contextLineCount")&&(e.options.contextLineCount=n.getValue("diffEditor.hideUnchangedRegions.contextLineCount")),i.affectsConfiguration("diffEditor.hideUnchangedRegions.revealLineCount")&&(e.options.revealLineCount=n.getValue("diffEditor.hideUnchangedRegions.revealLineCount")),i.affectsConfiguration("diffEditor.hideUnchangedRegions.enabled")&&(e.options.enabled=n.getValue("diffEditor.hideUnchangedRegions.enabled"),t.fire(e.options.enabled))})),e}export{h as getUnchangedRegionSettings};