import*as e from"./strings.js";var o=(r=>(r[r.Ignore=0]="Ignore",r[r.Info=1]="Info",r[r.Warning=2]="Warning",r[r.Error=3]="Error",r))(o||{});(u=>{const t="error",i="warning",a="warn",s="info",r="ignore";function g(n){return n?e.equalsIgnoreCase(t,n)?3:e.equalsIgnoreCase(i,n)||e.equalsIgnoreCase(a,n)?2:e.equalsIgnoreCase(s,n)?1:0:0}u.fromValue=g;function f(n){switch(n){case 3:return t;case 2:return i;case 1:return s;default:return r}}u.toString=f})(o||={});var c=o;export{c as default};
