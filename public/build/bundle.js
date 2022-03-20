var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,l;function i(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function a(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function u(t){return null==t?"":t}function f(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function m(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function $(){return g(" ")}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t){l=t}function x(t){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_destroy.push(t)}const b=[],y=[],j=[],z=[],N=Promise.resolve();let _=!1;function w(t){j.push(t)}const A=new Set;let E=0;function k(){const t=l;do{for(;E<b.length;){const t=b[E];E++,v(t),C(t.$$)}for(v(null),b.length=0,E=0;y.length;)y.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];A.has(e)||(A.add(e),e())}j.length=0}while(b.length);for(;z.length;)z.pop()();_=!1,A.clear(),v(t)}function C(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(w)}}const L=new Set;function G(t,e){t&&t.i&&(L.delete(t),t.i(e))}function O(t,e,n,s){if(t&&t.o){if(L.has(t))return;L.add(t),undefined.c.push((()=>{L.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function U(t){t&&t.c()}function q(t,n,r,c){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,r),c||w((()=>{const n=i.map(e).filter(o);a?a.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(w)}function D(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function I(t,e){-1===t.$$.dirty[0]&&(b.push(t),_||(_=!0,N.then(k)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,o,r,c,i,a,u,f=[-1]){const d=l;v(e);const p=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(d?d.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:o.target||d.$$.root};u&&u(p.root);let g=!1;if(p.ctx=r?r(e,o.props||{},((t,n,...s)=>{const o=s.length?s[0]:n;return p.ctx&&i(p.ctx[t],p.ctx[t]=o)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](o),g&&I(e,t)),n})):[],p.update(),g=!0,s(p.before_update),p.fragment=!!c&&c(p.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);p.fragment&&p.fragment.l(t),t.forEach(m)}else p.fragment&&p.fragment.c();o.intro&&G(e.$$.fragment),q(e,o.target,o.anchor,o.customElement),k()}v(d)}class S{$destroy(){D(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function T(e){let n;return{c(){n=p("footer"),h(n,"class","footer svelte-1deatvv")},m(t,e){d(t,n,e)},p:t,i:t,o:t,d(t){t&&m(n)}}}class B extends S{constructor(t){super(),R(this,t,null,T,r,{})}}const M=[];function F(e,n=t){let s;const o=new Set;function c(t){if(r(e,t)&&(e=t,s)){const t=!M.length;for(const t of o)t[1](),M.push(t,e);if(t){for(let t=0;t<M.length;t+=2)M[t][0](M[t+1]);M.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(r,l=t){const i=[r,l];return o.add(i),1===o.size&&(s=n(c)||t),r(e),()=>{o.delete(i),0===o.size&&(s(),s=null)}}}}var H,K;!function(t){t[t.LANDING=0]="LANDING",t[t.LOGGED=1]="LOGGED",t[t.KID=2]="KID"}(H||(H={})),function(t){t[t.RU=0]="RU",t[t.EN=1]="EN"}(K||(K={})),F(H.LANDING);let P=F(K.RU);function X(e){let n;return{c(){n=g(e[0])},m(t,e){d(t,n,e)},p(t,[e]){1&e&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(n,t[0])},i:t,o:t,d(t){t&&m(n)}}}function Y(t,e,n){let{values:s}=e,o=s[0];return x(P.subscribe((t=>n(0,o=t==K.RU?s[0]:s[1])))),t.$$set=t=>{"values"in t&&n(1,s=t.values)},[o,s]}class J extends S{constructor(t){super(),R(this,t,Y,X,r,{values:1})}}function Q(e){let n,s,o,r,c,l,i,a,u,g,v,x,b;return l=new J({props:{values:["О НАС","ABOUT US"]}}),u=new J({props:{values:["КОНТАКТЫ","CONTACTS"]}}),x=new J({props:{values:["ВОЙТИ","LOG IN"]}}),{c(){n=p("nav"),s=p("div"),s.textContent="Math Courses",o=$(),r=p("div"),c=p("a"),U(l.$$.fragment),i=$(),a=p("a"),U(u.$$.fragment),g=$(),v=p("a"),U(x.$$.fragment),h(s,"class","logo svelte-19m44a"),h(c,"href","/"),h(c,"class","svelte-19m44a"),h(a,"href","/"),h(a,"class","svelte-19m44a"),h(v,"href","/"),h(v,"class","svelte-19m44a"),h(n,"class","navigation svelte-19m44a")},m(t,e){d(t,n,e),f(n,s),f(n,o),f(n,r),f(r,c),q(l,c,null),f(r,i),f(r,a),q(u,a,null),f(r,g),f(r,v),q(x,v,null),b=!0},p:t,i(t){b||(G(l.$$.fragment,t),G(u.$$.fragment,t),G(x.$$.fragment,t),b=!0)},o(t){O(l.$$.fragment,t),O(u.$$.fragment,t),O(x.$$.fragment,t),b=!1},d(t){t&&m(n),D(l),D(u),D(x)}}}class V extends S{constructor(t){super(),R(this,t,null,Q,r,{})}}function W(t){let e,n,s,r,c;const l=t[3].default,i=function(t,e,n,s){if(t){const o=a(t,e,n,s);return t[0](o)}}(l,t,t[2],null);return{c(){e=p("button"),i&&i.c(),h(e,"class",n=u("button "+t[1])+" svelte-1go49ph")},m(n,l){var a,u,f,m;d(n,e,l),i&&i.m(e,null),s=!0,r||(u="click",f=function(){o(t[0])&&t[0].apply(this,arguments)},(a=e).addEventListener(u,f,m),c=()=>a.removeEventListener(u,f,m),r=!0)},p(o,[r]){t=o,i&&i.p&&(!s||4&r)&&function(t,e,n,s,o,r){if(o){const c=a(e,n,s,r);t.p(c,o)}}(i,l,t,t[2],s?function(t,e,n,s){if(t[2]&&s){const o=t[2](s(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|o[s];return t}return e.dirty|o}return e.dirty}(l,t[2],r,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[2]),null),(!s||2&r&&n!==(n=u("button "+t[1])+" svelte-1go49ph"))&&h(e,"class",n)},i(t){s||(G(i,t),s=!0)},o(t){O(i,t),s=!1},d(t){t&&m(e),i&&i.d(t),r=!1,c()}}}function Z(t,e,n){let{$$slots:s={},$$scope:o}=e,{onclick:r=(()=>{})}=e,{className:c=""}=e;return t.$$set=t=>{"onclick"in t&&n(0,r=t.onclick),"className"in t&&n(1,c=t.className),"$$scope"in t&&n(2,o=t.$$scope)},[r,c,o,s]}class tt extends S{constructor(t){super(),R(this,t,Z,W,r,{onclick:0,className:1})}}function et(t,e,n){const s=t.slice();return s[1]=e[n],s}function nt(t){let e;return{c(){e=g("Попробовать неделю бесплатно")},m(t,n){d(t,e,n)},d(t){t&&m(e)}}}function st(e){let n,s,o,r,c,l,a,u,v,x,b=e[1].name+"",y=e[1].text+"";return{c(){n=p("div"),s=p("img"),r=$(),c=p("span"),l=g(b),a=$(),u=p("span"),v=g(y),x=$(),i(s.src,o=e[1].image)||h(s,"src",o),h(s,"alt","item"),h(s,"class","svelte-1gajinz"),h(c,"class","name svelte-1gajinz"),h(u,"class","svelte-1gajinz"),h(n,"class","item svelte-1gajinz")},m(t,e){d(t,n,e),f(n,s),f(n,r),f(n,c),f(c,l),f(n,a),f(n,u),f(u,v),f(n,x)},p:t,d(t){t&&m(n)}}}function ot(t){let e;return{c(){e=g("Ладно...")},m(t,n){d(t,e,n)},d(t){t&&m(e)}}}function rt(t){let e,n,s,o,r,c,l,a,u,g,v,x,b,y,j,z,N,_,w,A,E,k,C,L,I;a=new tt({props:{className:"button",$$slots:{default:[nt]},$$scope:{ctx:t}}});let R=t[0],S=[];for(let e=0;e<R.length;e+=1)S[e]=st(et(t,R,e));return L=new tt({props:{className:"button",$$slots:{default:[ot]},$$scope:{ctx:t}}}),{c(){e=p("div"),n=p("div"),s=p("div"),o=p("div"),o.innerHTML='Математика для детей 5-7 лет\n                <br/> \n                <span class="svelte-1gajinz">на английском языке</span>',r=$(),c=p("h"),c.textContent="Поможем вашему ребенку развить абстрактное мышление и выучить английский",l=$(),U(a.$$.fragment),u=$(),g=p("img"),x=$(),b=p("div"),y=p("h"),y.textContent="Отзывы о нас",j=$(),z=p("div");for(let t=0;t<S.length;t+=1)S[t].c();N=$(),_=p("div"),w=p("div"),A=p("div"),A.textContent="Записывайся!",E=$(),k=p("h"),k.textContent="плати деньги, сука!",C=$(),U(L.$$.fragment),h(o,"class","title svelte-1gajinz"),h(c,"class","content svelte-1gajinz"),i(g.src,v="https://cdn-icons-png.flaticon.com/512/3557/3557694.png")||h(g,"src","https://cdn-icons-png.flaticon.com/512/3557/3557694.png"),h(g,"alt",""),h(g,"class","svelte-1gajinz"),h(s,"class","container svelte-1gajinz"),h(n,"class","section1 svelte-1gajinz"),h(y,"class","title svelte-1gajinz"),h(z,"class","vitrine svelte-1gajinz"),h(b,"class","section2 svelte-1gajinz"),h(A,"class","title svelte-1gajinz"),h(k,"class","content svelte-1gajinz"),h(w,"class","container svelte-1gajinz"),h(_,"class","section1 svelte-1gajinz"),h(e,"class","main-content svelte-1gajinz")},m(t,i){d(t,e,i),f(e,n),f(n,s),f(s,o),f(s,r),f(s,c),f(s,l),q(a,s,null),f(s,u),f(s,g),f(e,x),f(e,b),f(b,y),f(b,j),f(b,z);for(let t=0;t<S.length;t+=1)S[t].m(z,null);f(e,N),f(e,_),f(_,w),f(w,A),f(w,E),f(w,k),f(w,C),q(L,w,null),I=!0},p(t,[e]){const n={};if(16&e&&(n.$$scope={dirty:e,ctx:t}),a.$set(n),1&e){let n;for(R=t[0],n=0;n<R.length;n+=1){const s=et(t,R,n);S[n]?S[n].p(s,e):(S[n]=st(s),S[n].c(),S[n].m(z,null))}for(;n<S.length;n+=1)S[n].d(1);S.length=R.length}const s={};16&e&&(s.$$scope={dirty:e,ctx:t}),L.$set(s)},i(t){I||(G(a.$$.fragment,t),G(L.$$.fragment,t),I=!0)},o(t){O(a.$$.fragment,t),O(L.$$.fragment,t),I=!1},d(t){t&&m(e),D(a),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(S,t),D(L)}}}function ct(t){return[[{image:"https://assets3.thrillist.com/v1/image/1299823/414x310/crop;webp=auto;jpeg_quality=60;progressive.jpg",name:"Олег",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus."},{image:"https://st.depositphotos.com/1771835/2035/i/600/depositphotos_20355973-stock-photo-portrait-real-high-definition-grey.jpg",name:"Олег",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus."},{image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXC2HxEPlRBjYllA84A52N3BeFlN4S0w6OUg&usqp=CAU",name:"Олег",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed varius tellus."}]]}class lt extends S{constructor(t){super(),R(this,t,ct,rt,r,{})}}function it(e){let n,s,o,r,c,l,i;return s=new V({}),r=new lt({}),l=new B({}),{c(){n=p("main"),U(s.$$.fragment),o=$(),U(r.$$.fragment),c=$(),U(l.$$.fragment),h(n,"class","svelte-153arzm")},m(t,e){d(t,n,e),q(s,n,null),f(n,o),q(r,n,null),f(n,c),q(l,n,null),i=!0},p:t,i(t){i||(G(s.$$.fragment,t),G(r.$$.fragment,t),G(l.$$.fragment,t),i=!0)},o(t){O(s.$$.fragment,t),O(r.$$.fragment,t),O(l.$$.fragment,t),i=!1},d(t){t&&m(n),D(s),D(r),D(l)}}}return new class extends S{constructor(t){super(),R(this,t,null,it,r,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
