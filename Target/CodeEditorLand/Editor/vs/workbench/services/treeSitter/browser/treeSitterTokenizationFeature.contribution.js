var b=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var s=(n,e,t,o)=>{for(var r=o>1?void 0:o?k(e,t):e,c=n.length-1,m;c>=0;c--)(m=n[c])&&(r=(o?m(e,t,r):m(r))||r);return o&&r&&b(e,t,r),r},a=(n,e)=>(t,o)=>e(t,o,n);import{registerSingleton as p,InstantiationType as u}from"../../../../platform/instantiation/common/extensions.js";import{WorkbenchPhase as I,registerWorkbenchContribution2 as h}from"../../../common/contributions.js";import{TreeSitterTextModelService as l}from"../../../../editor/browser/services/treeSitter/treeSitterParserService.js";import{ITreeSitterParserService as S}from"../../../../editor/common/services/treeSitterParserService.js";import{ITreeSitterTokenizationFeature as T}from"./treeSitterTokenizationFeature.js";let i=class{static ID="workbench.contrib.treeSitterTokenizationInstantiator";constructor(e,t){}};i=s([a(0,S),a(1,T)],i),p(S,l,u.Eager),h(i.ID,i,I.BlockRestore);