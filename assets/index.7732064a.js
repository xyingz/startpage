import{d as F,r as j,c as v,a as i,F as k,b,o as m,u as I,e as p,n as D,f as P,g as J,w as K,h as S,i as x,j as ne,P as L,k as ue,l as W,m as y,p as w,q as le,Q as U,s as re,t as G,v as C,x as ae,y as ie,z as X,T as ce,A as de,B as Y,C as me,D as Z,E as pe,G as fe,H as he,I as _e,J as ve,K as ge,L as ye,M as we,N as Ee,O as Fe,R as Se,S as Te,U as be}from"./vendor.6bd43f21.js";const Ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const r of u.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerpolicy&&(u.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?u.credentials="include":o.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function n(o){if(o.ep)return;o.ep=!0;const u=s(o);fetch(o.href,u)}};Ce();var O=(t,e)=>{const s=t.__vccOpts||t;for(const[n,o]of e)s[n]=o;return s};const xe=F({name:"App",components:{}}),ke=b("footer",null,"CopyRight @ JeremyJone",-1);function Be(t,e,s,n,o,u){const r=j("router-view");return m(),v(k,null,[i(r,{style:{height:"100vh"}}),ke],64)}var De=O(xe,[["render",Be]]);const Oe="modulepreload",ee={},$e="./",Ae=function(e,s){return!s||s.length===0?e():Promise.all(s.map(n=>{if(n=`${$e}${n}`,n in ee)return;ee[n]=!0;const o=n.endsWith(".css"),u=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${u}`))return;const r=document.createElement("link");if(r.rel=o?"stylesheet":Oe,o||(r.as="script",r.crossOrigin=""),r.href=n,document.head.appendChild(r),o)return new Promise((d,g)=>{r.addEventListener("load",d),r.addEventListener("error",g)})})).then(()=>e())};function _(t,e=16){const s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),n=[];let o;if(e=e||s.length,t)for(o=0;o<t;o++)n[o]=s[0|Math.random()*e];else{let u;for(n[8]=n[13]=n[18]=n[23]="-",n[14]="4",o=0;o<36;o++)n[o]||(u=0|Math.random()*16,n[o]=s[o===19?u&3|8:u])}return n.join("")}function q(t,e="yyyy-MM-dd",s="zh"){const n={zh:["\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};["zh","en"].indexOf(s)===-1&&(s="zh"),t=new Date(t);const o={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours()%12==0?12:t.getHours()%12,"H+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};let u;for(u in o)if(new RegExp(`(${u})`).test(e)){const r=o[u].toString();e=e.replace(RegExp.$1,RegExp.$1.length===1?r:`00${r}`.substr(`${r}`.length))}return/(y+)/.test(e)&&(e=e.replace(RegExp.$1,`${t.getFullYear()}`.substr(4-RegExp.$1.length))),/(D+)/.test(e)&&(e=e.replace(RegExp.$1,n[s][t.getDay()])),e}const Me=F({props:{size:{type:Number,default:2}},setup(t,{expose:e}){I(a=>({"2f478d60":t.size}));const s=p(""),n=p(""),o=p("down"),u=p(!1);function r(a,l,c){u.value||(s.value=l.toString(),n.value=c.toString(),o.value=a,u.value=!0,setTimeout(()=>{u.value=!1,s.value=c.toString()},600))}function d(a,l){r("down",a,l)}function g(a,l){r("up",a,l)}function h(a){s.value=a.toString()}function f(a){n.value=a.toString()}return e({flipDown:d,flipUp:g,setFront:h,setBack:f}),(a,l)=>(m(),v("div",{class:D(["flipper-bar",[o.value,{go:u.value}]])},[b("div",{class:D(["digital front",`number${s.value}`])},null,2),b("div",{class:D(["digital back",`number${n.value}`])},null,2)],2))}});var B=O(Me,[["__scopeId","data-v-74a815c4"]]);const Le={class:"clock"},Ve={key:1},ze={key:3},He=F({props:{time:{type:Date,default:new Date},direction:{type:String,default:"down"},showHour:{type:Boolean,default:!0},showMinute:{type:Boolean,default:!0},showSecond:{type:Boolean,default:!0}},setup(t){const e=t;I(f=>({"994d584c":s.value}));const s=p(1.5),n=p(),o=p(),u=p(),r=p(),d=p(),g=p(),h=P([]);return J(()=>{var a,l;h.push(n,o,u,r,d,g);const f=q(e.time,"HHmmss");for(let c=0;c<h.length;c++)(l=(a=h[c])==null?void 0:a.value)==null||l.setFront(f[c])}),K(()=>e.time,()=>{var l,c,T,Q;const f=q(new Date(e.time.getTime()-1e3),"HHmmss"),a=q(e.time,"HHmmss");for(let E=0;E<h.length;E++)f[E]!==a[E]&&(e.direction==="up"?(c=(l=h[E])==null?void 0:l.value)==null||c.flipUp(f[E],a[E]):(Q=(T=h[E])==null?void 0:T.value)==null||Q.flipDown(f[E],a[E]))}),(f,a)=>(m(),v("div",Le,[t.showHour?(m(),v(k,{key:0},[i(B,{ref_key:"flipperHour1",ref:n,size:s.value},null,8,["size"]),i(B,{ref_key:"flipperHour2",ref:o,size:s.value},null,8,["size"])],64)):S("",!0),t.showHour&&t.showMinute?(m(),v("span",Ve,":")):S("",!0),t.showMinute?(m(),v(k,{key:2},[i(B,{ref_key:"flipperMinute1",ref:u,size:s.value},null,8,["size"]),i(B,{ref_key:"flipperMinute2",ref:r,size:s.value},null,8,["size"])],64)):S("",!0),t.showMinute&&t.showSecond?(m(),v("span",ze,":")):S("",!0),t.showSecond?(m(),v(k,{key:4},[i(B,{ref_key:"flipperSecond1",ref:d,size:s.value},null,8,["size"]),i(B,{ref_key:"flipperSecond2",ref:g,size:s.value},null,8,["size"])],64)):S("",!0)]))}});var Re=O(He,[["__scopeId","data-v-19e042d6"]]);const Ne=F({components:{Clock:Re},setup(){const t=p(new Date);return setInterval(()=>{t.value=new Date},1e3),{time:t}}});function Ie(t,e,s,n,o,u){const r=j("Clock");return m(),x(r,{time:t.time},null,8,["time"])}var Ue=O(Ne,[["render",Ie]]);const $="SET_FOCUS_MODE",V="SET_SHOW_TOOLBOX",z="ADD_TOOL",H="REMOVE_TOOL",A="SET_REMOVE_TOOL_STATE",R="SET_TOOL_LIST",N="x-start-toolList",qe=[{name:"baidu",url:"https://www.baidu.com/s?wd=",icon:"baidu",comment:"\u767E\u5EA6"},{name:"bing",url:"https://www.bing.com/search?q=",icon:"bing",comment:"\u5FC5\u5E94"},{name:"google",url:"https://www.google.com/search?q=",icon:"google",comment:"\u8C37\u6B4C\uFF08\u9700\u8981\u68AF\u5B50\uFF09"},{name:"magi",url:"https://magi.com/search?q=",icon:"magi",comment:"Magi\uFF08\u641C\u4EBA\u3001\u4E8B\u3001\u7269\u3001\u6982\u5FF5\uFF0C\u6216\u8005\u76F4\u63A5\u63D0\u95EE\uFF09"}],te=Symbol("store_key");var oe=ne({strict:!0,state:{focusMode:!1,isShowToolBox:!1,tools:[],searchEngines:qe,removeToolState:!1},mutations:{[$](t,e){t.focusMode=e},[V](t,e){t.isShowToolBox=e},[R](t,e){t.tools=e},[z](t,e){t.tools.push({id:_(12),url:e.url,comment:e.comment}),L.set(N,JSON.stringify(t.tools))},[H](t,e){const s=t.tools.findIndex(n=>n.id===e.id);s!==-1&&t.tools.splice(s,1),L.set(N,JSON.stringify(t.tools))},[A](t,e){t.removeToolState=e}},actions:{[$](t,e){t.commit($,e)},[V](t,e){t.commit(V,e)},[R](t,e){t.commit(R,e)},[z](t,e){t.commit(z,e)},[H](t,e){t.commit(H,e)},[A](t,e){t.commit(A,e)}},modules:{}});function M(){return ue(te)}const Qe=F({setup(t){var a;const e=M(),s=e.state.searchEngines.map(l=>({value:l.name,icon:`img:/assets/icons/${l.icon}.svg`,url:l.url,slot:l.name,comment:l.comment})),n=p((a=s[0])==null?void 0:a.value);function o(){return s.find(l=>l.value===n.value)}function u(l){var c;n.value=l,(c=h.value)==null||c.focus()}const r=W(()=>{const l=o();return`\u4F7F\u7528 ${l==null?void 0:l.comment} \u641C\u7D22`||"\u5F00\u59CB\u641C\u7D22"}),d=p("");function g(){var c;if(!d.value){(c=h.value)==null||c.focus();return}const l=o();l&&(window.open(l.url+d.value),d.value="")}const h=p();J(()=>{var l;(l=h.value)==null||l.focus()});function f(){document.body.classList.add("global-search-active"),e.dispatch($,!0)}return(l,c)=>(m(),v("div",{class:"column items-center",onClick:c[3]||(c[3]=G(()=>{},["stop"]))},[i(U,{ref_key:"inputBar",ref:h,modelValue:d.value,"onUpdate:modelValue":c[0]||(c[0]=T=>d.value=T),dark:"",dense:"",standout:"",rounded:"",class:"search-bar","bg-color":"white",placeholder:w(r),"aria-placeholder":"\u641C\u7D22\u6846",onKeypress:le(g,["enter"]),onFocusin:f},{append:y(()=>[i(C,{flat:"",rounded:"",icon:"search",color:"primary",onClick:g})]),_:1},8,["modelValue","placeholder","onKeypress"]),i(re,null,{default:y(()=>[w(e).state.isShowToolBox?S("",!0):(m(),x(ae,{key:0,modelValue:n.value,"onUpdate:modelValue":[c[1]||(c[1]=T=>n.value=T),c[2]||(c[2]=T=>u(T))],class:"search-bar-engine-toggle-wrap","toggle-color":"primary",glossy:w(e).state.focusMode,rounded:"",options:w(s)},null,8,["modelValue","glossy","options"]))]),_:1})]))}});const je={class:"tool-box-name ellipsis text-white"},Pe=F({props:{tool:null},setup(t){const e=ie(),s=M();function n(r){r.url&&window.open(r.url,"_blank")}function o(){s.state.removeToolState||s.dispatch(A,!0)}function u(r){s.dispatch(H,r)}return(r,d)=>(m(),v("div",{class:D(["tool-box-btn-wrap relative-position",{"tool-box-btn-wrap-swing":w(s).state.removeToolState}])},[X((m(),x(C,{unelevated:"",color:"dark",padding:w(e).screen.lt.sm?"none":"",class:"tool-box-btn",onClick:d[1]||(d[1]=()=>n(t.tool))},{default:y(()=>[t.tool.url?(m(),x(de,{key:0,src:`https://ico.kucat.cn/get.php?url=${t.tool.url}`,alt:t.tool.comment,ratio:"1",width:"100%",height:"100%",fit:"contain"},{error:y(()=>[i(Y,{name:"public",size:"2rem",class:D({"error-btn-icon":w(e).screen.gt.xs})},null,8,["class"])]),_:1},8,["src","alt"])):S("",!0),w(s).state.removeToolState?(m(),x(C,{key:1,icon:"close",color:"warning",round:"",size:"0.3rem",class:"absolute tool-box-btn-delete",onClick:d[0]||(d[0]=G(()=>u(t.tool),["stop"]))})):S("",!0)]),_:1},8,["padding"])),[[ce,o,void 0,{mouse:!0}]]),b("div",je,me(t.tool.comment),1)],2))}});var Je=O(Pe,[["__scopeId","data-v-13a5071c"]]);const Ke=b("div",{class:"text-h6 text-white"},"\u6DFB\u52A0\u5BFC\u822A",-1),We=F({props:{showDialog:{default:!1,type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const s=t,n=W({get(){return s.showDialog},set(f){e("update:modelValue",f)}}),o=p(""),u=p(""),r=p(),d=p(),g=M();function h(){var f,a;if(!o.value){(f=r.value)==null||f.focus();return}if(!u.value){(a=d.value)==null||a.focus();return}g.dispatch(z,{comment:o.value,url:u.value}),o.value="",u.value="",n.value=!1}return(f,a)=>(m(),x(_e,{modelValue:w(n),"onUpdate:modelValue":a[2]||(a[2]=l=>he(n)?n.value=l:null),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:y(()=>[i(fe,{style:{width:"50%"}},{default:y(()=>[i(Z,{class:"bg-primary"},{default:y(()=>[Ke]),_:1}),i(Z,{class:"q-pt-none"},{default:y(()=>[i(U,{ref_key:"toolNameRef",ref:r,modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=l=>o.value=l),dense:"",placeholder:"\u5BFC\u822A\u540D\u79F0",rules:[l=>!!l||"\u5BFC\u822A\u540D\u79F0\u662F\u5FC5\u8981\u7684"]},null,8,["modelValue","rules"]),i(U,{ref_key:"toolUrlRef",ref:d,modelValue:u.value,"onUpdate:modelValue":a[1]||(a[1]=l=>u.value=l),dense:"",placeholder:"\u5B8C\u6574\u7684 URL\uFF0C\u901A\u5E38\u4EE5 http:// \u6216 https:// \u8D77\u59CB",rules:[l=>!!l||"URL \u662F\u5FC5\u8981\u7684"]},null,8,["modelValue","rules"])]),_:1}),i(pe,{align:"right"},{default:y(()=>[i(C,{color:"primary",label:"\u6DFB\u52A0",onClick:h}),X(i(C,{outline:"",color:"primary",label:"\u53D6\u6D88"},null,512),[[ve]])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});const Ge={key:0},Xe={key:0},Ye=b("div",{class:"text-h5 text-bold text-info q-my-md"}," \u5DE5\u5177\u7BB1\u662F\u7A7A\u7684\uFF0C\u5FEB\u53BB\u6DFB\u52A0\u4E00\u4E2A\u5427 ",-1),Ze={key:1,class:"tool-box"},et=F({setup(t){I(h=>({"20fb1d7c":n.value,"167de4a9":o.value}));const e=M(),s=P(e.state.tools),n=p("4rem"),o=p("10"),u=p("down");function r(){e.dispatch(V,!e.state.isShowToolBox),u.value=e.state.isShowToolBox?"up":"down"}K(()=>e.state.focusMode,h=>{h&&e.state.isShowToolBox&&r()});const d=p(!1);function g(){d.value=!0}return(h,f)=>(m(),v(k,null,[i(C,{class:"drop-btn",flat:"",rounded:"",color:"primary",icon:`keyboard_double_arrow_${u.value}`,onClick:r},null,8,["icon"]),i(ge,{name:"scale-to-top"},{default:y(()=>[w(e).state.isShowToolBox?(m(),v("div",Ge,[w(s).length?(m(),v("div",Ze,[i(ye,{name:"scale"},{default:y(()=>[(m(!0),v(k,null,we(w(s),a=>(m(),x(Je,{key:a.id,tool:a},null,8,["tool"]))),128))]),_:1}),i(C,{class:"add-tool-btn",onClick:g},{default:y(()=>[i(Y,{size:"3em",name:"add"})]),_:1})])):(m(),v("div",Xe,[Ye,i(C,{label:"\u6DFB\u52A0\u5DE5\u5177",color:"primary",onClick:g})]))])):S("",!0)]),_:1}),i(We,{modelValue:d.value,"onUpdate:modelValue":f[0]||(f[0]=a=>d.value=a)},null,8,["modelValue"])],64))}}),tt={class:"col-5 column full-width justify-end q-gutter-y-md"},ot={class:"col-7 q-py-md"},st=F({setup(t){const e=M();function s(){document.body.classList.contains("global-search-active")&&document.body.classList.remove("global-search-active"),e.state.focusMode&&e.dispatch($,!1),e.state.removeToolState&&e.dispatch(A,!1)}return(n,o)=>(m(),v("div",{class:"column",onClickPassive:s},[b("div",tt,[i(Ue),i(Qe)]),b("div",ot,[i(et)])],32))}}),nt=[{id:_(12),url:"https://pan.baidu.com",comment:"\u767E\u5EA6\u7F51\u76D8"},{id:_(12),url:"https://mail.qq.com",comment:"QQ\u90AE\u7BB1"},{id:_(12),url:"https://mail.163.com/",comment:"163\u90AE\u7BB1"},{id:_(12),url:"https://www.jd.com",comment:"\u4EAC\u4E1C"},{id:_(12),url:"https://www.taobao.com",comment:"\u6DD8\u5B9D"},{id:_(12),url:"https://www.bilibili.com",comment:"Bilibili"},{id:_(12),url:"https://www.weibo.com",comment:"\u5FAE\u535A"},{id:_(12),url:"https://www.zhihu.com",comment:"\u77E5\u4E4E"},{id:_(12),url:"https://web.wechat.com/?lang=zh_CN",comment:"\u5FAE\u4FE1\u7F51\u9875\u7248"},{id:_(12),url:"https://www.npmjs.com",comment:"npm"},{id:_(12),url:"https://juejin.im",comment:"\u6398\u91D1"},{id:_(12),url:"https://segmentfault.com",comment:"SegmentFault"},{id:_(12),url:"https://www.jianshu.com",comment:"\u7B80\u4E66"},{id:_(12),url:"https://www.csdn.net",comment:"CSDN"},{id:_(12),url:"https://github.com",comment:"GitHub"},{id:_(12),url:"https://gitee.com",comment:"\u7801\u4E91Gitee"},{id:_(12),url:"https://stackoverflow.com",comment:"StackOverflow"},{id:_(12),url:"https://greasyfork.org/zh-CN/scripts",comment:"\u6CB9\u7334\u811A\u672C"}];function ut(){const t=L.getItem(N);let e=[];t?e=JSON.parse(t):(e=nt,L.set(N,JSON.stringify(e))),oe.dispatch(R,e)}const lt=[{path:"/",name:"Home",component:st},{path:"/:pathMatch(.*)*",component:()=>Ae(()=>import("./404.be627b66.js"),["assets/404.be627b66.js","assets/404.eae921f3.css","assets/vendor.6bd43f21.js"])}],se=Ee({history:Fe(),routes:lt});se.beforeEach((t,e,s)=>{ut(),s()});const rt=Se(De);rt.use(Te,{plugins:{},lang:be}).use(se).use(oe,te).mount("#app");export{O as _};
