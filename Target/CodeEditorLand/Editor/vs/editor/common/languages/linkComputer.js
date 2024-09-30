import{CharCode as e}from"../../../base/common/charCode.js";import{CharacterClassifier as A}from"../core/characterClassifier.js";import"../languages.js";var H=(t=>(t[t.Invalid=0]="Invalid",t[t.Start=1]="Start",t[t.H=2]="H",t[t.HT=3]="HT",t[t.HTT=4]="HTT",t[t.HTTP=5]="HTTP",t[t.F=6]="F",t[t.FI=7]="FI",t[t.FIL=8]="FIL",t[t.BeforeColon=9]="BeforeColon",t[t.AfterColon=10]="AfterColon",t[t.AlmostThere=11]="AlmostThere",t[t.End=12]="End",t[t.Accept=13]="Accept",t[t.LastKnownState=14]="LastKnownState",t))(H||{});class g{_data;rows;cols;constructor(n,a,r){const l=new Uint8Array(n*a);for(let s=0,i=n*a;s<i;s++)l[s]=r;this._data=l,this.rows=n,this.cols=a}get(n,a){return this._data[n*this.cols+a]}set(n,a,r){this._data[n*this.cols+a]=r}}class N{_states;_maxCharCode;constructor(n){let a=0,r=0;for(let s=0,i=n.length;s<i;s++){const[c,C,u]=n[s];C>a&&(a=C),c>r&&(r=c),u>r&&(r=u)}a++,r++;const l=new g(r,a,0);for(let s=0,i=n.length;s<i;s++){const[c,C,u]=n[s];l.set(c,C,u)}this._states=l,this._maxCharCode=a}nextState(n,a){return a<0||a>=this._maxCharCode?0:this._states.get(n,a)}}let F=null;function B(){return F===null&&(F=new N([[1,e.h,2],[1,e.H,2],[1,e.f,6],[1,e.F,6],[2,e.t,3],[2,e.T,3],[3,e.t,4],[3,e.T,4],[4,e.p,5],[4,e.P,5],[5,e.s,9],[5,e.S,9],[5,e.Colon,10],[6,e.i,7],[6,e.I,7],[7,e.l,8],[7,e.L,8],[8,e.e,9],[8,e.E,9],[9,e.Colon,10],[10,e.Slash,11],[11,e.Slash,12]])),F}var _=(r=>(r[r.None=0]="None",r[r.ForceTermination=1]="ForceTermination",r[r.CannotEndIn=2]="CannotEndIn",r))(_||{});let m=null;function y(){if(m===null){m=new A(0);const h=` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;for(let a=0;a<h.length;a++)m.set(h.charCodeAt(a),1);const n=".,;:";for(let a=0;a<n.length;a++)m.set(n.charCodeAt(a),2)}return m}class k{static _createLink(n,a,r,l,s){let i=s-1;do{const c=a.charCodeAt(i);if(n.get(c)!==2)break;i--}while(i>l);if(l>0){const c=a.charCodeAt(l-1),C=a.charCodeAt(i);(c===e.OpenParen&&C===e.CloseParen||c===e.OpenSquareBracket&&C===e.CloseSquareBracket||c===e.OpenCurlyBrace&&C===e.CloseCurlyBrace)&&i--}return{range:{startLineNumber:r,startColumn:l+1,endLineNumber:r,endColumn:i+2},url:a.substring(l,i+1)}}static computeLinks(n,a=B()){const r=y(),l=[];for(let s=1,i=n.getLineCount();s<=i;s++){const c=n.getLineContent(s),C=c.length;let u=0,d=0,S=0,f=1,I=!1,p=!1,t=!1,L=!1;for(;u<C;){let b=!1;const T=c.charCodeAt(u);if(f===13){let o;switch(T){case e.OpenParen:I=!0,o=0;break;case e.CloseParen:o=I?0:1;break;case e.OpenSquareBracket:t=!0,p=!0,o=0;break;case e.CloseSquareBracket:t=!1,o=p?0:1;break;case e.OpenCurlyBrace:L=!0,o=0;break;case e.CloseCurlyBrace:o=L?0:1;break;case e.SingleQuote:case e.DoubleQuote:case e.BackTick:S===T?o=1:S===e.SingleQuote||S===e.DoubleQuote||S===e.BackTick?o=0:o=1;break;case e.Asterisk:o=S===e.Asterisk?1:0;break;case e.Pipe:o=S===e.Pipe?1:0;break;case e.Space:o=t?0:1;break;default:o=r.get(T)}o===1&&(l.push(k._createLink(r,c,s,d,u)),b=!0)}else if(f===12){let o;T===e.OpenSquareBracket?(p=!0,o=0):o=r.get(T),o===1?b=!0:f=13}else f=a.nextState(f,T),f===0&&(b=!0);b&&(f=1,I=!1,p=!1,L=!1,d=u+1,S=T),u++}f===13&&l.push(k._createLink(r,c,s,d,C))}return l}}function v(h){return!h||typeof h.getLineCount!="function"||typeof h.getLineContent!="function"?[]:k.computeLinks(h)}export{k as LinkComputer,H as State,N as StateMachine,v as computeLinks};