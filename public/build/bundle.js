var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function s(){return Object.create(null)}function l(t){t.forEach(n)}function c(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let r,i;function a(t,e){return r||(r=document.createElement("a")),r.href=e,t===r.href}function u(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function p(t,e,n){t.$$.on_destroy.push(u(e,n))}function f(t,e,n,s){if(t){const l=$(t,e,n,s);return t[0](l)}}function $(t,n,s,l){return t[1]&&l?e(s.ctx.slice(),t[1](l(n))):s.ctx}function h(t,e,n,s){if(t[2]&&s){const l=t[2](s(n));if(void 0===e.dirty)return l;if("object"==typeof l){const t=[],n=Math.max(e.dirty.length,l.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|l[s];return t}return e.dirty|l}return e.dirty}function m(t,e,n,s,l,c){if(l){const o=$(e,n,s,c);t.p(o,l)}}function d(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function g(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function v(t,e){const n={};e=new Set(e);for(const s in t)e.has(s)||"$"===s[0]||(n[s]=t[s]);return n}function x(t){return null==t?"":t}function q(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode.removeChild(t)}function w(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function E(){return k(" ")}function A(){return k("")}function L(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function M(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function N(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const s in e)null==e[s]?t.removeAttribute(s):"style"===s?t.style.cssText=e[s]:"__value"===s?t.value=t[s]=e[s]:n[s]&&n[s].set?t[s]=e[s]:M(t,s,e[s])}function j(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function T(t){i=t}function P(){if(!i)throw new Error("Function called outside component initialization");return i}function C(t){P().$$.on_destroy.push(t)}function H(){const t=P();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const l=function(t,e,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,!1,e),s}(e,n);s.slice().forEach((e=>{e.call(t,l)}))}}}function O(t,e){P().$$.context.set(t,e)}function S(t){return P().$$.context.get(t)}const R=[],I=[],U=[],z=[],D=Promise.resolve();let G=!1;function B(t){U.push(t)}const K=new Set;let W=0;function F(){const t=i;do{for(;W<R.length;){const t=R[W];W++,T(t),V(t.$$)}for(T(null),R.length=0,W=0;I.length;)I.pop()();for(let t=0;t<U.length;t+=1){const e=U[t];K.has(e)||(K.add(e),e())}U.length=0}while(R.length);for(;z.length;)z.pop()();G=!1,K.clear(),T(t)}function V(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const J=new Set;let Q;function Y(){Q={r:0,c:[],p:Q}}function X(){Q.r||l(Q.c),Q=Q.p}function Z(t,e){t&&t.i&&(J.delete(t),t.i(e))}function tt(t,e,n,s){if(t&&t.o){if(J.has(t))return;J.add(t),Q.c.push((()=>{J.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function et(t,e){const n={},s={},l={$$scope:1};let c=t.length;for(;c--;){const o=t[c],r=e[c];if(r){for(const t in o)t in r||(s[t]=1);for(const t in r)l[t]||(n[t]=r[t],l[t]=1);t[c]=r}else for(const t in o)l[t]=1}for(const t in s)t in n||(n[t]=void 0);return n}function nt(t){return"object"==typeof t&&null!==t?t:{}}function st(t){t&&t.c()}function lt(t,e,s,o){const{fragment:r,on_mount:i,on_destroy:a,after_update:u}=t.$$;r&&r.m(e,s),o||B((()=>{const e=i.map(n).filter(c);a?a.push(...e):l(e),t.$$.on_mount=[]})),u.forEach(B)}function ct(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ot(t,e){-1===t.$$.dirty[0]&&(R.push(t),G||(G=!0,D.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function rt(e,n,c,o,r,a,u,p=[-1]){const f=i;T(e);const $=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:r,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:s(),dirty:p,skip_bound:!1,root:n.target||f.$$.root};u&&u($.root);let h=!1;if($.ctx=c?c(e,n.props||{},((t,n,...s)=>{const l=s.length?s[0]:n;return $.ctx&&r($.ctx[t],$.ctx[t]=l)&&(!$.skip_bound&&$.bound[t]&&$.bound[t](l),h&&ot(e,t)),n})):[],$.update(),h=!0,l($.before_update),$.fragment=!!o&&o($.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);$.fragment&&$.fragment.l(t),t.forEach(y)}else $.fragment&&$.fragment.c();n.intro&&Z(e.$$.fragment),lt(e,n.target,n.anchor,n.customElement),F()}T(f)}class it{$destroy(){ct(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const at=[];function ut(e,n=t){let s;const l=new Set;function c(t){if(o(e,t)&&(e=t,s)){const t=!at.length;for(const t of l)t[1](),at.push(t,e);if(t){for(let t=0;t<at.length;t+=2)at[t][0](at[t+1]);at.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(o,r=t){const i=[o,r];return l.add(i),1===l.size&&(s=n(c)||t),o(e),()=>{l.delete(i),0===l.size&&(s(),s=null)}}}}function pt(e,n,s){const o=!Array.isArray(e),r=o?[e]:e,i=n.length<2;return a=e=>{let s=!1;const a=[];let p=0,f=t;const $=()=>{if(p)return;f();const s=n(o?a[0]:a,e);i?e(s):f=c(s)?s:t},h=r.map(((t,e)=>u(t,(t=>{a[e]=t,p&=~(1<<e),s&&$()}),(()=>{p|=1<<e}))));return s=!0,$(),function(){l(h),f()}},{subscribe:ut(s,a).subscribe};var a}const ft={},$t={};function ht(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const mt=function(t,e){const n=[];let s=ht(t);return{get location(){return s},listen(e){n.push(e);const l=()=>{s=ht(t),e({location:s,action:"POP"})};return t.addEventListener("popstate",l),()=>{t.removeEventListener("popstate",l);const s=n.indexOf(e);n.splice(s,1)}},navigate(e,{state:l,replace:c=!1}={}){l={...l,key:Date.now()+""};try{c?t.history.replaceState(l,null,e):t.history.pushState(l,null,e)}catch(n){t.location[c?"replace":"assign"](e)}s=ht(t),n.forEach((t=>t({location:s,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],s=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return s[e]},pushState(t,l,c){const[o,r=""]=c.split("?");e++,n.push({pathname:o,search:r}),s.push(t)},replaceState(t,l,c){const[o,r=""]=c.split("?");n[e]={pathname:o,search:r},s[e]=t}}}}()),{navigate:dt}=mt,gt=/^:(.+)/;function vt(t,e){return t.substr(0,e.length)===e}function xt(t){return"*"===t[0]}function qt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function bt(t){return t.replace(/(^\/+|\/+$)/g,"")}function yt(t,e){return{route:t,score:t.default?0:qt(t.path).reduce(((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return gt.test(t)}(e)?xt(e)?t-=5:t+=3:t+=2:t+=1,t)),0),index:e}}function wt(t,e){let n,s;const[l]=e.split("?"),c=qt(l),o=""===c[0],r=function(t){return t.map(yt).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,l=r.length;t<l;t++){const l=r[t].route;let i=!1;if(l.default){s={route:l,params:{},uri:e};continue}const a=qt(l.path),u={},p=Math.max(c.length,a.length);let f=0;for(;f<p;f++){const t=a[f],e=c[f];if(void 0!==t&&xt(t)){u["*"===t?"*":t.slice(1)]=c.slice(f).map(decodeURIComponent).join("/");break}if(void 0===e){i=!0;break}let n=gt.exec(t);if(n&&!o){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){i=!0;break}}if(!i){n={route:l,params:u,uri:"/"+c.slice(0,f).join("/")};break}}return n||s||null}function _t(t,e){return t+(e?`?${e}`:"")}function kt(t,e){return`${bt("/"===e?t:`${bt(t)}/${bt(e)}`)}/`}function Et(t){let e;const n=t[9].default,s=f(n,t,t[8],null);return{c(){s&&s.c()},m(t,n){s&&s.m(t,n),e=!0},p(t,[l]){s&&s.p&&(!e||256&l)&&m(s,n,t,t[8],e?h(n,t[8],l,null):d(t[8]),null)},i(t){e||(Z(s,t),e=!0)},o(t){tt(s,t),e=!1},d(t){s&&s.d(t)}}}function At(t,e,n){let s,l,c,{$$slots:o={},$$scope:r}=e,{basepath:i="/"}=e,{url:a=null}=e;const u=S(ft),f=S($t),$=ut([]);p(t,$,(t=>n(6,l=t)));const h=ut(null);let m=!1;const d=u||ut(a?{pathname:a}:mt.location);p(t,d,(t=>n(5,s=t)));const g=f?f.routerBase:ut({path:i,uri:i});p(t,g,(t=>n(7,c=t)));const v=pt([g,h],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:s,uri:l}=e;return{path:s.default?n:s.path.replace(/\*.*$/,""),uri:l}}));var x;return u||(x=()=>mt.listen((t=>{d.set(t.location)})),P().$$.on_mount.push(x),O(ft,d)),O($t,{activeRoute:h,base:g,routerBase:v,registerRoute:function(t){const{path:e}=c;let{path:n}=t;if(t._path=n,t.path=kt(e,n),"undefined"==typeof window){if(m)return;const e=function(t,e){return wt([t],e)}(t,s.pathname);e&&(h.set(e),m=!0)}else $.update((e=>(e.push(t),e)))},unregisterRoute:function(t){$.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,i=t.basepath),"url"in t&&n(4,a=t.url),"$$scope"in t&&n(8,r=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=c;$.update((e=>(e.forEach((e=>e.path=kt(t,e._path))),e)))}if(96&t.$$.dirty){const t=wt(l,s.pathname);h.set(t)}},[$,d,g,i,a,s,l,c,r,o]}class Lt extends it{constructor(t){super(),rt(this,t,At,Et,o,{basepath:3,url:4})}}const Mt=t=>({params:4&t,location:16&t}),Nt=t=>({params:t[2],location:t[4]});function jt(t){let e,n,s,l;const c=[Pt,Tt],o=[];function r(t,e){return null!==t[0]?0:1}return e=r(t),n=o[e]=c[e](t),{c(){n.c(),s=A()},m(t,n){o[e].m(t,n),b(t,s,n),l=!0},p(t,l){let i=e;e=r(t),e===i?o[e].p(t,l):(Y(),tt(o[i],1,1,(()=>{o[i]=null})),X(),n=o[e],n?n.p(t,l):(n=o[e]=c[e](t),n.c()),Z(n,1),n.m(s.parentNode,s))},i(t){l||(Z(n),l=!0)},o(t){tt(n),l=!1},d(t){o[e].d(t),t&&y(s)}}}function Tt(t){let e;const n=t[10].default,s=f(n,t,t[9],Nt);return{c(){s&&s.c()},m(t,n){s&&s.m(t,n),e=!0},p(t,l){s&&s.p&&(!e||532&l)&&m(s,n,t,t[9],e?h(n,t[9],l,Mt):d(t[9]),Nt)},i(t){e||(Z(s,t),e=!0)},o(t){tt(s,t),e=!1},d(t){s&&s.d(t)}}}function Pt(t){let n,s,l;const c=[{location:t[4]},t[2],t[3]];var o=t[0];function r(t){let n={};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}return o&&(n=new o(r())),{c(){n&&st(n.$$.fragment),s=A()},m(t,e){n&&lt(n,t,e),b(t,s,e),l=!0},p(t,e){const l=28&e?et(c,[16&e&&{location:t[4]},4&e&&nt(t[2]),8&e&&nt(t[3])]):{};if(o!==(o=t[0])){if(n){Y();const t=n;tt(t.$$.fragment,1,0,(()=>{ct(t,1)})),X()}o?(n=new o(r()),st(n.$$.fragment),Z(n.$$.fragment,1),lt(n,s.parentNode,s)):n=null}else o&&n.$set(l)},i(t){l||(n&&Z(n.$$.fragment,t),l=!0)},o(t){n&&tt(n.$$.fragment,t),l=!1},d(t){t&&y(s),n&&ct(n,t)}}}function Ct(t){let e,n,s=null!==t[1]&&t[1].route===t[7]&&jt(t);return{c(){s&&s.c(),e=A()},m(t,l){s&&s.m(t,l),b(t,e,l),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?s?(s.p(t,n),2&n&&Z(s,1)):(s=jt(t),s.c(),Z(s,1),s.m(e.parentNode,e)):s&&(Y(),tt(s,1,1,(()=>{s=null})),X())},i(t){n||(Z(s),n=!0)},o(t){tt(s),n=!1},d(t){s&&s.d(t),t&&y(e)}}}function Ht(t,n,s){let l,c,{$$slots:o={},$$scope:r}=n,{path:i=""}=n,{component:a=null}=n;const{registerRoute:u,unregisterRoute:f,activeRoute:$}=S($t);p(t,$,(t=>s(1,l=t)));const h=S(ft);p(t,h,(t=>s(4,c=t)));const m={path:i,default:""===i};let d={},v={};return u(m),"undefined"!=typeof window&&C((()=>{f(m)})),t.$$set=t=>{s(13,n=e(e({},n),g(t))),"path"in t&&s(8,i=t.path),"component"in t&&s(0,a=t.component),"$$scope"in t&&s(9,r=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&l&&l.route===m&&s(2,d=l.params);{const{path:t,component:e,...l}=n;s(3,v=l)}},n=g(n),[a,l,d,v,c,$,h,m,i,r,o]}class Ot extends it{constructor(t){super(),rt(this,t,Ht,Ct,o,{path:8,component:0})}}function St(t){let n,s,l,c;const o=t[16].default,r=f(o,t,t[15],null);let i=[{href:t[0]},{"aria-current":t[2]},t[1],t[6]],a={};for(let t=0;t<i.length;t+=1)a=e(a,i[t]);return{c(){n=_("a"),r&&r.c(),N(n,a)},m(e,o){b(e,n,o),r&&r.m(n,null),s=!0,l||(c=L(n,"click",t[5]),l=!0)},p(t,[e]){r&&r.p&&(!s||32768&e)&&m(r,o,t,t[15],s?h(o,t[15],e,null):d(t[15]),null),N(n,a=et(i,[(!s||1&e)&&{href:t[0]},(!s||4&e)&&{"aria-current":t[2]},2&e&&t[1],64&e&&t[6]]))},i(t){s||(Z(r,t),s=!0)},o(t){tt(r,t),s=!1},d(t){t&&y(n),r&&r.d(t),l=!1,c()}}}function Rt(t,n,s){let l;const c=["to","replace","state","getProps"];let o,r,i=v(n,c),{$$slots:a={},$$scope:u}=n,{to:f="#"}=n,{replace:$=!1}=n,{state:h={}}=n,{getProps:m=(()=>({}))}=n;const{base:d}=S($t);p(t,d,(t=>s(14,r=t)));const x=S(ft);p(t,x,(t=>s(13,o=t)));const q=H();let b,y,w,_;return t.$$set=t=>{n=e(e({},n),g(t)),s(6,i=v(n,c)),"to"in t&&s(7,f=t.to),"replace"in t&&s(8,$=t.replace),"state"in t&&s(9,h=t.state),"getProps"in t&&s(10,m=t.getProps),"$$scope"in t&&s(15,u=t.$$scope)},t.$$.update=()=>{16512&t.$$.dirty&&s(0,b="/"===f?r.uri:function(t,e){if(vt(t,"/"))return t;const[n,s]=t.split("?"),[l]=e.split("?"),c=qt(n),o=qt(l);if(""===c[0])return _t(l,s);if(!vt(c[0],"."))return _t(("/"===l?"":"/")+o.concat(c).join("/"),s);const r=o.concat(c),i=[];return r.forEach((t=>{".."===t?i.pop():"."!==t&&i.push(t)})),_t("/"+i.join("/"),s)}(f,r.uri)),8193&t.$$.dirty&&s(11,y=vt(o.pathname,b)),8193&t.$$.dirty&&s(12,w=b===o.pathname),4096&t.$$.dirty&&s(2,l=w?"page":void 0),15361&t.$$.dirty&&s(1,_=m({location:o,href:b,isPartiallyCurrent:y,isCurrent:w}))},[b,_,l,d,x,function(t){if(q("click",t),function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)){t.preventDefault();const e=o.pathname===b||$;dt(b,{state:h,replace:e})}},i,f,$,h,m,y,w,o,r,u,a]}class It extends it{constructor(t){super(),rt(this,t,Rt,St,o,{to:7,replace:8,state:9,getProps:10})}}function Ut(e){let n;return{c(){n=_("footer"),M(n,"class","footer svelte-g82txz")},m(t,e){b(t,n,e)},p:t,i:t,o:t,d(t){t&&y(n)}}}class zt extends it{constructor(t){super(),rt(this,t,null,Ut,o,{})}}function Dt(t){let e,n,s,l,o;const r=t[4].default,i=f(r,t,t[3],null);return{c(){e=_("button"),i&&i.c(),M(e,"class",n=x("button "+t[1]+(t[2]?"":" inactive"))+" svelte-1gxov00")},m(n,r){b(n,e,r),i&&i.m(e,null),s=!0,l||(o=L(e,"click",(function(){c(t[2]&&t[0])&&(t[2]&&t[0]).apply(this,arguments)})),l=!0)},p(l,[c]){t=l,i&&i.p&&(!s||8&c)&&m(i,r,t,t[3],s?h(r,t[3],c,null):d(t[3]),null),(!s||6&c&&n!==(n=x("button "+t[1]+(t[2]?"":" inactive"))+" svelte-1gxov00"))&&M(e,"class",n)},i(t){s||(Z(i,t),s=!0)},o(t){tt(i,t),s=!1},d(t){t&&y(e),i&&i.d(t),l=!1,o()}}}function Gt(t,e,n){let{$$slots:s={},$$scope:l}=e,{onclick:c=(()=>{})}=e,{className:o=""}=e,{isActive:r=!0}=e;return t.$$set=t=>{"onclick"in t&&n(0,c=t.onclick),"className"in t&&n(1,o=t.className),"isActive"in t&&n(2,r=t.isActive),"$$scope"in t&&n(3,l=t.$$scope)},[c,o,r,l,s]}class Bt extends it{constructor(t){super(),rt(this,t,Gt,Dt,o,{onclick:0,className:1,isActive:2})}}function Kt(t,e,n){const s=t.slice();return s[9]=e[n],s[11]=n,s}function Wt(e){let n;return{c(){n=_("div"),n.textContent="Congratulations! Well done!",M(n,"class","victory svelte-9r8605")},m(t,e){b(t,n,e)},p:t,i:t,o:t,d(t){t&&y(n)}}}function Ft(t){let n,s,l,c,o,r,i=t[0][t[2]].question+"",a=t[0][t[2]].wrongAnswers,u=[];for(let e=0;e<a.length;e+=1)u[e]=Qt(Kt(t,a,e));const p=t=>tt(u[t],1,1,(()=>{u[t]=null}));let f=3==t[4]&&function(t){let n,s,l;const c=[t[5]];var o=Bt;function r(t){let n={$$slots:{default:[Yt]},$$scope:{ctx:t}};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}o&&(n=new o(r(t)));return{c(){n&&st(n.$$.fragment),s=A()},m(t,e){n&&lt(n,t,e),b(t,s,e),l=!0},p(t,e){const l=32&e?et(c,[nt(t[5])]):{};if(4101&e&&(l.$$scope={dirty:e,ctx:t}),o!==(o=Bt)){if(n){Y();const t=n;tt(t.$$.fragment,1,0,(()=>{ct(t,1)})),X()}o?(n=new o(r(t)),st(n.$$.fragment),Z(n.$$.fragment,1),lt(n,s.parentNode,s)):n=null}else o&&n.$set(l)},i(t){l||(n&&Z(n.$$.fragment,t),l=!0)},o(t){n&&tt(n.$$.fragment,t),l=!1},d(t){t&&y(s),n&&ct(n,t)}}}(t);return{c(){n=_("h"),s=k(i),l=E(),c=_("div");for(let t=0;t<u.length;t+=1)u[t].c();o=E(),f&&f.c(),M(n,"class","question svelte-9r8605"),M(c,"class","answers svelte-9r8605")},m(t,e){b(t,n,e),q(n,s),b(t,l,e),b(t,c,e);for(let t=0;t<u.length;t+=1)u[t].m(c,null);q(c,o),f&&f.m(c,null),r=!0},p(t,e){if((!r||5&e)&&i!==(i=t[0][t[2]].question+"")&&j(s,i),63&e){let n;for(a=t[0][t[2]].wrongAnswers,n=0;n<a.length;n+=1){const s=Kt(t,a,n);u[n]?(u[n].p(s,e),Z(u[n],1)):(u[n]=Qt(s),u[n].c(),Z(u[n],1),u[n].m(c,o))}for(Y(),n=a.length;n<u.length;n+=1)p(n);X()}3==t[4]&&f.p(t,e)},i(t){if(!r){for(let t=0;t<a.length;t+=1)Z(u[t]);Z(f),r=!0}},o(t){u=u.filter(Boolean);for(let t=0;t<u.length;t+=1)tt(u[t]);tt(f),r=!1},d(t){t&&y(n),t&&y(l),t&&y(c),w(u,t),f&&f.d()}}}function Vt(t){let e,n=t[0][t[2]].rightAnswer+"";return{c(){e=k(n)},m(t,n){b(t,e,n)},p(t,s){5&s&&n!==(n=t[0][t[2]].rightAnswer+"")&&j(e,n)},d(t){t&&y(e)}}}function Jt(t){let e,n=t[9]+"";return{c(){e=k(n)},m(t,n){b(t,e,n)},p(t,s){5&s&&n!==(n=t[9]+"")&&j(e,n)},d(t){t&&y(e)}}}function Qt(t){let n,s,l,c=t[11]==t[4]&&function(t){let n,s,l;const c=[t[5]];var o=Bt;function r(t){let n={$$slots:{default:[Vt]},$$scope:{ctx:t}};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}return o&&(n=new o(r(t))),{c(){n&&st(n.$$.fragment),s=A()},m(t,e){n&&lt(n,t,e),b(t,s,e),l=!0},p(t,e){const l=32&e?et(c,[nt(t[5])]):{};if(4101&e&&(l.$$scope={dirty:e,ctx:t}),o!==(o=Bt)){if(n){Y();const t=n;tt(t.$$.fragment,1,0,(()=>{ct(t,1)})),X()}o?(n=new o(r(t)),st(n.$$.fragment),Z(n.$$.fragment,1),lt(n,s.parentNode,s)):n=null}else o&&n.$set(l)},i(t){l||(n&&Z(n.$$.fragment,t),l=!0)},o(t){n&&tt(n.$$.fragment,t),l=!1},d(t){t&&y(s),n&&ct(n,t)}}}(t);return s=new Bt({props:{onclick:function(){return t[6](t[11])},isActive:!t[1][t[11]],$$slots:{default:[Jt]},$$scope:{ctx:t}}}),{c(){c&&c.c(),n=E(),st(s.$$.fragment)},m(t,e){c&&c.m(t,e),b(t,n,e),lt(s,t,e),l=!0},p(e,n){(t=e)[11]==t[4]&&c.p(t,n);const l={};2&n&&(l.isActive=!t[1][t[11]]),4101&n&&(l.$$scope={dirty:n,ctx:t}),s.$set(l)},i(t){l||(Z(c),Z(s.$$.fragment,t),l=!0)},o(t){tt(c),tt(s.$$.fragment,t),l=!1},d(t){c&&c.d(t),t&&y(n),ct(s,t)}}}function Yt(t){let e,n=t[0][t[2]].rightAnswer+"";return{c(){e=k(n)},m(t,n){b(t,e,n)},p(t,s){5&s&&n!==(n=t[0][t[2]].rightAnswer+"")&&j(e,n)},d(t){t&&y(e)}}}function Xt(t){let e,n,s,l;const c=[Ft,Wt],o=[];function r(t,e){return t[2]<t[0].length?0:1}return n=r(t),s=o[n]=c[n](t),{c(){e=_("div"),s.c(),M(e,"class","game svelte-9r8605")},m(t,s){b(t,e,s),o[n].m(e,null),l=!0},p(t,[l]){let i=n;n=r(t),n===i?o[n].p(t,l):(Y(),tt(o[i],1,1,(()=>{o[i]=null})),X(),s=o[n],s?s.p(t,l):(s=o[n]=c[n](t),s.c()),Z(s,1),s.m(e,null))},i(t){l||(Z(s),l=!0)},o(t){tt(s),l=!1},d(t){t&&y(e),o[n].d()}}}function Zt(t,e,n){let{questions:s}=e;const l=[!1,!1,!1],c=t=>{n(1,l[t]=!0,l),console.log("Wrong!")};let o=0,r=Math.floor(4*Math.random());const i={onclick:()=>{l.forEach(((t,e)=>n(1,l[e]=!1,l))),n(2,o++,o),console.log("bom"),s.length}};return t.$$set=t=>{"questions"in t&&n(0,s=t.questions)},[s,l,o,c,r,i,t=>c(t)]}class te extends it{constructor(t){super(),rt(this,t,Zt,Xt,o,{questions:0})}}var ee,ne;!function(t){t[t.LANDING=0]="LANDING",t[t.LOGGED=1]="LOGGED",t[t.KID=2]="KID"}(ee||(ee={})),function(t){t[t.RU=0]="RU",t[t.EN=1]="EN"}(ne||(ne={})),ut(ee.LANDING);let se=ut(ne.RU);function le(e){let n;return{c(){n=k(e[0])},m(t,e){b(t,n,e)},p(t,[e]){1&e&&j(n,t[0])},i:t,o:t,d(t){t&&y(n)}}}function ce(t,e,n){let{values:s}=e,l=s[0];return C(se.subscribe((t=>n(0,l=t==ne.RU?s[0]:s[1])))),t.$$set=t=>{"values"in t&&n(1,s=t.values)},[l,s]}class oe extends it{constructor(t){super(),rt(this,t,ce,le,o,{values:1})}}function re(e){let n,s;return n=new oe({props:{values:["ВОЙТИ","LOG IN"]}}),{c(){st(n.$$.fragment)},m(t,e){lt(n,t,e),s=!0},p:t,i(t){s||(Z(n.$$.fragment,t),s=!0)},o(t){tt(n.$$.fragment,t),s=!1},d(t){ct(n,t)}}}function ie(t){let e,n,s,l,c,o,r,i,a,u,p,f;return o=new oe({props:{values:["О НАС","ABOUT US"]}}),a=new oe({props:{values:["КОНТАКТЫ","CONTACTS"]}}),p=new It({props:{to:"/MathCourses/game",$$slots:{default:[re]},$$scope:{ctx:t}}}),{c(){e=_("nav"),n=_("div"),n.textContent="EnglishMath",s=E(),l=_("div"),c=_("a"),st(o.$$.fragment),r=E(),i=_("a"),st(a.$$.fragment),u=E(),st(p.$$.fragment),M(n,"class","logo svelte-16kqlss"),M(c,"href","/"),M(c,"class","svelte-16kqlss"),M(i,"href","/"),M(i,"class","svelte-16kqlss"),M(e,"class","navigation svelte-16kqlss")},m(t,$){b(t,e,$),q(e,n),q(e,s),q(e,l),q(l,c),lt(o,c,null),q(l,r),q(l,i),lt(a,i,null),q(l,u),lt(p,l,null),f=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),p.$set(n)},i(t){f||(Z(o.$$.fragment,t),Z(a.$$.fragment,t),Z(p.$$.fragment,t),f=!0)},o(t){tt(o.$$.fragment,t),tt(a.$$.fragment,t),tt(p.$$.fragment,t),f=!1},d(t){t&&y(e),ct(o),ct(a),ct(p)}}}class ae extends it{constructor(t){super(),rt(this,t,null,ie,o,{})}}function ue(t){let e,n,s;const l=t[1].default,c=f(l,t,t[0],null);return{c(){e=_("div"),n=_("div"),c&&c.c(),M(n,"class","content svelte-1of9asz"),M(e,"class","container svelte-1of9asz")},m(t,l){b(t,e,l),q(e,n),c&&c.m(n,null),s=!0},p(t,[e]){c&&c.p&&(!s||1&e)&&m(c,l,t,t[0],s?h(l,t[0],e,null):d(t[0]),null)},i(t){s||(Z(c,t),s=!0)},o(t){tt(c,t),s=!1},d(t){t&&y(e),c&&c.d(t)}}}function pe(t,e,n){let{$$slots:s={},$$scope:l}=e;return t.$$set=t=>{"$$scope"in t&&n(0,l=t.$$scope)},[l,s]}class fe extends it{constructor(t){super(),rt(this,t,pe,ue,o,{})}}function $e(t,e,n){const s=t.slice();return s[4]=e[n],s}function he(t,e,n){const s=t.slice();return s[4]=e[n],s}function me(t,e,n){const s=t.slice();return s[4]=e[n],s}function de(t){let e;return{c(){e=k("Попробовать")},m(t,n){b(t,e,n)},d(t){t&&y(e)}}}function ge(e){let n,s,l,c,o,r,i,u,p,f=e[4].name+"",$=e[4].text+"";return{c(){n=_("div"),s=_("img"),c=E(),o=_("span"),r=k(f),i=E(),u=_("span"),p=E(),a(s.src,l=e[4].image)||M(s,"src",l),M(s,"alt","item"),M(s,"class","svelte-qcx5ql"),M(o,"class","name svelte-qcx5ql"),M(u,"class","svelte-qcx5ql"),M(n,"class","item svelte-qcx5ql")},m(t,e){b(t,n,e),q(n,s),q(n,c),q(n,o),q(o,r),q(n,i),q(n,u),u.innerHTML=$,q(n,p)},p:t,d(t){t&&y(n)}}}function ve(e){let n,s,l,c,o,r,i=e[4].name+"",a=e[4].text+"";return{c(){n=_("div"),s=_("div"),l=k(i),c=E(),o=_("span"),r=E(),M(s,"class","name svelte-qcx5ql"),M(o,"class","text svelte-qcx5ql"),M(n,"class","item svelte-qcx5ql")},m(t,e){b(t,n,e),q(n,s),q(s,l),q(n,c),q(n,o),o.innerHTML=a,q(n,r)},p:t,d(t){t&&y(n)}}}function xe(e){let n,s,l,c,o,r,i=e[4].text+"";return{c(){n=_("div"),s=_("img"),c=E(),o=_("span"),r=E(),a(s.src,l=e[4].image)||M(s,"src",l),M(s,"alt",""),M(s,"class","svelte-qcx5ql"),M(o,"class","text svelte-qcx5ql"),M(n,"class","item svelte-qcx5ql")},m(t,e){b(t,n,e),q(n,s),q(n,c),q(n,o),o.innerHTML=i,q(n,r)},p:t,d(t){t&&y(n)}}}function qe(t){let e;return{c(){e=k("Оставить заявку")},m(t,n){b(t,e,n)},d(t){t&&y(e)}}}function be(t){let e,n,s,l,c,o,r,i,u,p,f,$,h,m,d,g,v,x,k,A,L,N,j,T,P,C,H,O,S,R,I,U,z,D,G,B,K,W,F,V,J,Q,Y,X,et,nt,ot,rt,it,at;p=new Bt({props:{class:"button",$$slots:{default:[de]},$$scope:{ctx:t}}});let ut=t[0],pt=[];for(let e=0;e<ut.length;e+=1)pt[e]=ge(me(t,ut,e));let ft=t[1],$t=[];for(let e=0;e<ft.length;e+=1)$t[e]=ve(he(t,ft,e));let ht=t[2],mt=[];for(let e=0;e<ht.length;e+=1)mt[e]=xe($e(t,ht,e));return it=new Bt({props:{$$slots:{default:[qe]},$$scope:{ctx:t}}}),{c(){e=_("div"),n=_("div"),s=_("div"),l=_("div"),l.innerHTML='Математика <span class="highlight svelte-qcx5ql">на английском</span>  \n                <br/>для детей 5-7 лет',c=E(),o=_("h"),o.textContent="Поможем вашему ребенку развить абстрактное мышление и выучить английский.",r=E(),i=_("h"),i.innerHTML="Попробуйте 1 неделю <b>бесплатно</b>",u=E(),st(p.$$.fragment),f=E(),$=_("img"),m=E(),d=_("div"),g=_("div"),g.innerHTML='<img class="main-image svelte-qcx5ql" src="https://www.kids-in-trips.ru/wp-content/uploads/2020/07/onlajn-lager-dlya-detej.jpg" alt="girl"/> \n            <div class="description svelte-qcx5ql"><h class="title svelte-qcx5ql">Что такое <span class="highlight svelte-qcx5ql">English Math</span>?</h> \n                <p class="paragraph __first svelte-qcx5ql"><b>Math English</b> - это онлайн-школа развития интеллекта для детей в возрасте от <b>5</b> до <b>7</b> лет.</p> \n                <p class="paragraph __second svelte-qcx5ql">Вместе с опытными преподавателями мы разработали программу, которая поможет вашему ребенку освоить арифметику и математику, развить логику в игровом формате.</p> \n                <p class="paragraph svelte-qcx5ql"><b>Наша программа нацелена на развитие у ребенка</b></p> \n                <ul class="list svelte-qcx5ql"><li class="svelte-qcx5ql">Cамостоятельности</li> \n                    <li class="svelte-qcx5ql">Креативности</li> \n                    <li class="svelte-qcx5ql">Концентрации и внимательности</li> \n                    <li class="svelte-qcx5ql">Абстрактного мышления</li></ul> \n                <p class="paragraph svelte-qcx5ql">Все это достигается засчет обучения на <span class="highlight svelte-qcx5ql">английском языке</span>.</p></div>',v=E(),x=_("div");for(let t=0;t<pt.length;t+=1)pt[t].c();k=E(),A=_("div"),L=_("h"),L.innerHTML='Как устроена <span class="highlight svelte-qcx5ql">платформа</span>?',N=E(),j=_("div"),j.innerHTML='<ul class="list svelte-qcx5ql"><li class="svelte-qcx5ql">Небольшой размер группы помогает сделать процесс обучения персонализированным</li> \n                <li class="svelte-qcx5ql">Удаленный формат - проходите задания на платформе из любого места в любое время</li> \n                <li class="svelte-qcx5ql">Доступ к статистике ребенка и всем учебным материалам в кабинете родителя</li> \n                <li class="svelte-qcx5ql">Быстрая связь с учителем</li></ul> \n            <img src="https://sun9-51.userapi.com/impf/80gOc79PgB_LpWNSbsOkOzV2wNWHUI_osYhQXA/r43sN_dtI8U.jpg?size=448x327&amp;quality=95&amp;sign=b380db9b83b47c311bd15431baad0424&amp;type=album" alt="riba" class="svelte-qcx5ql"/>',T=E(),P=_("div");for(let t=0;t<$t.length;t+=1)$t[t].c();C=E(),H=_("div"),H.innerHTML='<h class="title svelte-qcx5ql"><span class="highlight svelte-qcx5ql">Почему математика на английском -</span><br/> \n            <span class="highlight svelte-qcx5ql">- это совсем не страшно</span></h> \n        <div class="content svelte-qcx5ql"><img src="https://sun9-52.userapi.com/impf/EnhwbyugPISPWdeT4EG_FpstBBigqR9w1MWc-g/j7GW1Y6VIJ0.jpg?size=590x340&amp;quality=95&amp;sign=37900aecf834bcb6851d0dd6c2218608&amp;type=album" alt="" class="svelte-qcx5ql"/> \n            <div class="text svelte-qcx5ql">Даже если ребенок никогда не изучал английский, прохождение курса не будет слишком сложным. Уроки составлены так, что язык будет изучаться с самых основ.<br/><br/>\n                Новые слова вводятся естественно, очень важную роль играет в уроке видео, где учитель показывает слова картинками или жестами, закрепляя ассоциации.<br/><br/>\n                Уже через 2 недели ребенок сможет сказать простые фразы, показывать объекты и называть цифры. А через 3 месяца у 99% детей пропадает барьер перед иностранным языком, дети начинают строить диалоги на английском достаточно свободно на пройденные темы.<br/><br/>\n                В школе и дома приходится считать и учить английский, что дает несомненное преимущество выпускникам English Math, ребята легко справляются с задачками и готовы не только ответить на уроке английского, но и сходить за покупками за границей.</div></div>',O=E(),S=_("div"),R=_("h"),R.innerHTML='<span class="highlight svelte-qcx5ql">Отзывы</span>',I=E(),U=_("div");for(let t=0;t<mt.length;t+=1)mt[t].c();z=E(),D=_("div"),D.innerHTML='<h class="title svelte-qcx5ql"><span class="highlight svelte-qcx5ql">Наши преподаватели</span></h> \n\n        <div class="teachers"><div class="teacher svelte-qcx5ql"><img src="https://sun9-87.userapi.com/impf/acx8KSxLPRxu18PUmm32jJS24xiF1OQVx_xbxw/qP7xhrtIoas.jpg?size=264x264&amp;quality=95&amp;sign=a656554822efbe707c30d1c97b88dc4c&amp;type=album" alt="" class="svelte-qcx5ql"/> \n                <div class="text svelte-qcx5ql"><h class="name svelte-qcx5ql">Алевтина Фетодова</h> \n                    <h>Образование:<br/>\n                        2010-2016, Педагогический институт Герцена, С-Пб<br/>\n                        2018, повышение квалификации Стендфордский университет, направление “Внедрение иностранного языка в повседневную жизнь ребенка”\n                        <br/> \n                        <br/>\n                        Находит подход как к маленьким детям с 3 лет в их первых шагах к познанию мира, так и с подростками 12 лет преодолевает барьеры мышления и языковой барьер.</h></div></div> \n\n                        <br/> \n                        <br/> \n                        <br/> \n\n            <div class="teacher svelte-qcx5ql"><img src="https://images.pexels.com/photos/8423388/pexels-photo-8423388.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940" alt="" class="svelte-qcx5ql"/> \n                <div class="text svelte-qcx5ql"><h class="name svelte-qcx5ql">Катрин Игорева</h> \n                    <h>Образование:<br/>\n                        2005-2011, Педагогический институт Нового Орлеана<br/>\n                        2014- 2020, лаборатория образовательных исследований ВШЭ в Москве<br/>\n                        2021 - почетный профессор ВШЭ<br/> \n                        <br/><br/>\n                        Для Катрин дети - это особенные люди, они очень пластичны во всем, как физически, так и в мышлении. Исследования лаборатории, новые подходы и практики Катрин переносит в свои занятия. Катрин считает, что работать с детьми, смотреть как они развиваются - это истинное счастье.</h></div></div></div>',G=E(),B=_("div"),K=_("h"),K.innerHTML='<span class="highlight svelte-qcx5ql">Запишитесь на пробное занятие</span><br/> \n            <span class="highlight2 svelte-qcx5ql">или получите консультацию</span>',W=E(),F=_("div"),V=_("div"),V.innerHTML='<h class="cost svelte-qcx5ql">Стоимость курса</h> \n                <span class="highlight svelte-qcx5ql">7000 руб/мес</span> \n                <span class="subtitle svelte-qcx5ql">Возврат денег</span> \n                <span class="text svelte-qcx5ql">У вас есть три занятия, чтобы попробовать. Если передумаете учиться, скажите — и мы вернём вам всю сумму.</span> \n                <span class="subtitle svelte-qcx5ql">Сэкономьте еще 13%</span> \n                <span class="text svelte-qcx5ql">Вы можете получить налоговый вычет. Спросите об этом менеджера при записи на курс или прочитайте в нашей статье.</span>  <span class="subtitle svelte-qcx5ql">Есть вопросы?</span> \n                <span class="text svelte-qcx5ql">Звоните нам 8 (800) 555-05-05 <br/>\n                    по будням с 10:00 до 19:00 МСК.<br/>\n                    Звонок бесплатный.</span>',J=E(),Q=_("div"),Y=_("input"),X=E(),et=_("input"),nt=E(),ot=_("input"),rt=E(),st(it.$$.fragment),M(l,"class","title svelte-qcx5ql"),M(o,"class","content svelte-qcx5ql"),M(i,"class","subcontent svelte-qcx5ql"),a($.src,h="https://cdn-icons-png.flaticon.com/512/3557/3557694.png")||M($,"src","https://cdn-icons-png.flaticon.com/512/3557/3557694.png"),M($,"alt",""),M($,"class","svelte-qcx5ql"),M(s,"class","container svelte-qcx5ql"),M(n,"class","section1 svelte-qcx5ql"),M(g,"class","content svelte-qcx5ql"),M(x,"class","series svelte-qcx5ql"),M(d,"class","section2 svelte-qcx5ql"),M(L,"class","title svelte-qcx5ql"),M(j,"class","description svelte-qcx5ql"),M(P,"class","series svelte-qcx5ql"),M(A,"class","section3 svelte-qcx5ql"),M(H,"class","section4 svelte-qcx5ql"),M(R,"class","title svelte-qcx5ql"),M(U,"class","series svelte-qcx5ql"),M(S,"class","section5 svelte-qcx5ql"),M(D,"class","section6 svelte-qcx5ql"),M(K,"class","title svelte-qcx5ql"),M(V,"class","left-column svelte-qcx5ql"),M(Y,"placeholder","Имя"),M(Y,"class","svelte-qcx5ql"),M(et,"placeholder","Телефон"),M(et,"class","svelte-qcx5ql"),M(ot,"placeholder","Email"),M(ot,"class","svelte-qcx5ql"),M(Q,"class","right-column svelte-qcx5ql"),M(F,"class","content svelte-qcx5ql"),M(B,"class","section7 svelte-qcx5ql"),M(e,"class","main-content svelte-qcx5ql")},m(t,a){b(t,e,a),q(e,n),q(n,s),q(s,l),q(s,c),q(s,o),q(s,r),q(s,i),q(s,u),lt(p,s,null),q(s,f),q(s,$),q(e,m),q(e,d),q(d,g),q(d,v),q(d,x);for(let t=0;t<pt.length;t+=1)pt[t].m(x,null);q(e,k),q(e,A),q(A,L),q(A,N),q(A,j),q(A,T),q(A,P);for(let t=0;t<$t.length;t+=1)$t[t].m(P,null);q(e,C),q(e,H),q(e,O),q(e,S),q(S,R),q(S,I),q(S,U);for(let t=0;t<mt.length;t+=1)mt[t].m(U,null);q(e,z),q(e,D),q(e,G),q(e,B),q(B,K),q(B,W),q(B,F),q(F,V),q(F,J),q(F,Q),q(Q,Y),q(Q,X),q(Q,et),q(Q,nt),q(Q,ot),q(Q,rt),lt(it,Q,null),at=!0},p(t,[e]){const n={};if(2048&e&&(n.$$scope={dirty:e,ctx:t}),p.$set(n),1&e){let n;for(ut=t[0],n=0;n<ut.length;n+=1){const s=me(t,ut,n);pt[n]?pt[n].p(s,e):(pt[n]=ge(s),pt[n].c(),pt[n].m(x,null))}for(;n<pt.length;n+=1)pt[n].d(1);pt.length=ut.length}if(2&e){let n;for(ft=t[1],n=0;n<ft.length;n+=1){const s=he(t,ft,n);$t[n]?$t[n].p(s,e):($t[n]=ve(s),$t[n].c(),$t[n].m(P,null))}for(;n<$t.length;n+=1)$t[n].d(1);$t.length=ft.length}if(4&e){let n;for(ht=t[2],n=0;n<ht.length;n+=1){const s=$e(t,ht,n);mt[n]?mt[n].p(s,e):(mt[n]=xe(s),mt[n].c(),mt[n].m(U,null))}for(;n<mt.length;n+=1)mt[n].d(1);mt.length=ht.length}const s={};2048&e&&(s.$$scope={dirty:e,ctx:t}),it.$set(s)},i(t){at||(Z(p.$$.fragment,t),Z(it.$$.fragment,t),at=!0)},o(t){tt(p.$$.fragment,t),tt(it.$$.fragment,t),at=!1},d(t){t&&y(e),ct(p),w(pt,t),w($t,t),w(mt,t),ct(it)}}}function ye(t){return[[{image:"https://img.icons8.com/external-flaticons-lineal-color-flat-icons/452/external-online-web-store-flaticons-lineal-color-flat-icons-2.png",name:"Формат обучения",text:"Онлайн в группах по <b>5</b> человек"},{image:"https://img.icons8.com/fluency/452/overtime.png",name:"Расписание",text:"<b>2</b> раза в неделю по <b>30</b> минут"},{image:"https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/452/external-game-game-development-icongeek26-outline-colour-icongeek26-1.png",name:"Дополнительно",text:"Интерактивные задания на платформе"}],[{name:"1",text:"<b>2</b> раза в неделю ребенок занимается с учителем в группе. Занятия проходят на платформе Zoom."},{name:"2",text:"Во время занятия учитель дает задания в онлайн-тренажере в виде игры."},{name:"3",text:"В конце недели учитель высылает родителям персональные рекомендации для ребенка и дополнительные материалы"}],[{image:"https://images.pexels.com/photos/286625/pexels-photo-286625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",text:"Мы с женой на фрилансе, много путешествуем, поэтому часто Камилле приходится учиться даже в дороге. Развитием жертвовать не хочется, так что онлайн курасы - это просто спасение. Еще и язык учится заодно, что абсолютный бонус!"},{image:"https://images.pexels.com/photos/5082634/pexels-photo-5082634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",text:"Петру очень нравится играть на платформе, эти забавные рыбки заставляют его счиатать даже в выходные. Рад, что на российском рынке есть курсы математики на английском, потому что Петр билингв."},{image:"https://images.pexels.com/photos/7307937/pexels-photo-7307937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",text:"Мы с Лизой проводим это время вместе, мне нравится, что я вижу как она занимается, пока читаю рядом. Это весело, и я не боюсь, что она оплатит все курсы на сто лет, потому что есть детский режим."}]]}class we extends it{constructor(t){super(),rt(this,t,ye,be,o,{})}}const _e=[{question:"How much is two plus two?",rightAnswer:"four",wrongAnswers:["one","two","three"]},{question:"How much is three plus four?",rightAnswer:"seven",wrongAnswers:["eight","two","six"]}];function ke(t){let e,n,s,l,c,o;return e=new ae({}),s=new we({}),c=new zt({}),{c(){st(e.$$.fragment),n=E(),st(s.$$.fragment),l=E(),st(c.$$.fragment)},m(t,r){lt(e,t,r),b(t,n,r),lt(s,t,r),b(t,l,r),lt(c,t,r),o=!0},i(t){o||(Z(e.$$.fragment,t),Z(s.$$.fragment,t),Z(c.$$.fragment,t),o=!0)},o(t){tt(e.$$.fragment,t),tt(s.$$.fragment,t),tt(c.$$.fragment,t),o=!1},d(t){ct(e,t),t&&y(n),ct(s,t),t&&y(l),ct(c,t)}}}function Ee(e){let n,s;return n=new te({props:{questions:_e}}),{c(){st(n.$$.fragment)},m(t,e){lt(n,t,e),s=!0},p:t,i(t){s||(Z(n.$$.fragment,t),s=!0)},o(t){tt(n.$$.fragment,t),s=!1},d(t){ct(n,t)}}}function Ae(t){let e,n;return e=new fe({props:{$$slots:{default:[Ee]},$$scope:{ctx:t}}}),{c(){st(e.$$.fragment)},m(t,s){lt(e,t,s),n=!0},p(t,n){const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){tt(e.$$.fragment,t),n=!1},d(t){ct(e,t)}}}function Le(t){let e,n,s,l;return e=new Ot({props:{path:"/",$$slots:{default:[ke]},$$scope:{ctx:t}}}),s=new Ot({props:{path:"/game",$$slots:{default:[Ae]},$$scope:{ctx:t}}}),{c(){st(e.$$.fragment),n=E(),st(s.$$.fragment)},m(t,c){lt(e,t,c),b(t,n,c),lt(s,t,c),l=!0},p(t,n){const l={};1&n&&(l.$$scope={dirty:n,ctx:t}),e.$set(l);const c={};1&n&&(c.$$scope={dirty:n,ctx:t}),s.$set(c)},i(t){l||(Z(e.$$.fragment,t),Z(s.$$.fragment,t),l=!0)},o(t){tt(e.$$.fragment,t),tt(s.$$.fragment,t),l=!1},d(t){ct(e,t),t&&y(n),ct(s,t)}}}function Me(t){let e,n;return e=new Lt({props:{basepath:"/MathCourses",$$slots:{default:[Le]},$$scope:{ctx:t}}}),{c(){st(e.$$.fragment)},m(t,s){lt(e,t,s),n=!0},p(t,[n]){const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){tt(e.$$.fragment,t),n=!1},d(t){ct(e,t)}}}return new class extends it{constructor(t){super(),rt(this,t,null,Me,o,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
