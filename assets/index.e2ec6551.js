var Je=Object.defineProperty;var Ce=Object.getOwnPropertySymbols;var We=Object.prototype.hasOwnProperty,Ye=Object.prototype.propertyIsEnumerable;var Be=(t,e,s)=>e in t?Je(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,$e=(t,e)=>{for(var s in e||(e={}))We.call(e,s)&&Be(t,s,e[s]);if(Ce)for(var s of Ce(e))Ye.call(e,s)&&Be(t,s,e[s]);return t};import{d as O,c as y,a as o,F as N,b as F,r as Oe,o as f,e as Ze,u as Ee,f as p,n as R,g as Ie,h as he,w as J,i as B,j as T,t as I,p as Ae,k as xe,P as A,l as et,m as tt,q as M,s as l,Q as k,v as b,x as ot,y as ve,z as st,A as nt,B as Se,C as W,D as $,T as ut,E as be,G as ye,H,I as lt,J as z,K as Fe,L as G,M as Te,N as Ve,O as Le,R as ee,S as at,U as te,V as rt,W as it,X as ct,Y as De,Z as oe,_ as x,$ as D,a0 as C,a1 as w,a2 as dt,a3 as mt,a4 as Re,a5 as we,a6 as ft,a7 as _t,a8 as pt,a9 as gt,aa as Et,ab as ht,ac as vt,ad as St,ae as bt,af as yt,ag as Ft,ah as Tt}from"./vendor.98971a76.js";const Dt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}};Dt();var q=(t,e)=>{const s=t.__vccOpts||t;for(const[i,n]of e)s[i]=n;return s};const wt=O({name:"App"}),kt=F("footer",null,"CopyRight @ JeremyJone",-1);function Ct(t,e,s,i,n,r){const d=Oe("router-view");return f(),y(N,null,[o(d,{style:{height:"100vh"}}),kt],64)}var Bt=q(wt,[["render",Ct]]);const $t="modulepreload",Me={},Ot="./",It=function(e,s){return!s||s.length===0?e():Promise.all(s.map(i=>{if(i=`${Ot}${i}`,i in Me)return;Me[i]=!0;const n=i.endsWith(".css"),r=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${r}`))return;const d=document.createElement("link");if(d.rel=n?"stylesheet":$t,n||(d.as="script",d.crossOrigin=""),d.href=i,document.head.appendChild(d),n)return new Promise((_,E)=>{d.addEventListener("load",_),d.addEventListener("error",E)})})).then(()=>e())},At="",se=Ze.create({baseURL:At,timeout:1e4});se.interceptors.request.use(t=>t,t=>Promise.reject(t));se.interceptors.response.use(t=>t,t=>{let{response:e}=t;if(t&&t.response)switch(t.response.status){case 400:e.message="\u672A\u77E5\u9519\u8BEF";break;case 401:e.message="\u672A\u6388\u6743";break;case 403:e.message="\u6743\u9650\u4E0D\u8DB3";break;case 404:e.message="\u6570\u636E\u4E0D\u5B58\u5728";break;case 405:e.message="\u4E0D\u5141\u8BB8\u7684\u8BF7\u6C42\u65B9\u6CD5";break;case 408:e.message="\u8BF7\u6C42\u8D85\u65F6";break;case 415:e.message="\u4E0D\u652F\u6301\u7684\u5A92\u4F53\u7C7B\u578B";break;case 500:e.message="\u670D\u52A1\u5668\u51FA\u73B0\u5F02\u5E38";break;case 501:e.message="\u7F51\u7EDC\u672A\u5B9E\u73B0";break;case 502:e.message="\u7F51\u7EDC\u9519\u8BEF";break;case 503:e.message="\u670D\u52A1\u4E0D\u53EF\u7528";break;case 504:e.message="\u7F51\u7EDC\u8D85\u65F6";break;case 505:e.message="http\u7248\u672C\u4E0D\u652F\u6301\u8BE5\u8BF7\u6C42";break;default:e.message=`\u5176\u4ED6\u9519\u8BEF\u3002\u9519\u8BEF\u4EE3\u7801\uFF1A${t.response.status}`}else e={message:"\u65E0\u6CD5\u8FDE\u63A5\u5230\u670D\u52A1\u5668\uFF01"};return Promise.reject(e)});function xt(t,e){return t.then(s=>[null,s]).catch(s=>(e&&Object.assign(s,e),[s,void 0]))}function ke(t,e={}){return xt(new Promise((s,i)=>{se.get(t,{params:e}).then(n=>{s(n.data)}).catch(n=>{i(n)})}))}function Vt(t,e,s,i={}){return new Promise((n,r)=>{se($e({url:t,responseType:"blob",method:"GET"},i)).then(d=>{const _=window.URL.createObjectURL(new Blob([d.data],{type:s})),E=document.createElement("a");E.href=_,E.setAttribute("download",e),document.body.appendChild(E),E.click(),n(d)}).catch(d=>{r(d)})})}async function Lt(){const[t,e]=await ke("https://api.seniverse.com/v3/life/chinese_calendar.json?key=SwOzxhRmO3o7iDBsR");return t||!e?"\u65E5\u5386\u6682\u65F6\u4E0D\u53EF\u7528":e.results.chinese_calendar}async function Rt(){const[t,e]=await ke("https://api.seniverse.com/v3/weather/now.json?key=SwOzxhRmO3o7iDBsR&location=ip&language=zh-Hans&unit=c");return t||!e?"\u5929\u6C14\u6682\u65F6\u4E0D\u53EF\u7528":e.results}const ne=navigator.userAgent.toLowerCase(),Ne=()=>/android|webos|iphone|ipod|balckberry/i.test(ne),Mt=()=>ne.indexOf("iphone")>-1,Nt=()=>ne.indexOf("android")>-1||ne.indexOf("linux")>-1;function Ut(t,e=16){const s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),i=[];let n;if(e=e||s.length,t)for(n=0;n<t;n++)i[n]=s[0|Math.random()*e];else{let r;for(i[8]=i[13]=i[18]=i[23]="-",i[14]="4",n=0;n<36;n++)i[n]||(r=0|Math.random()*16,i[n]=s[n===19?r&3|8:r])}return i.join("")}function ue(t,e="yyyy-MM-dd",s="zh"){const i={zh:["\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"],en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};["zh","en"].indexOf(s)===-1&&(s="zh"),t=new Date(t);const n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours()%12==0?12:t.getHours()%12,"H+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};let r;for(r in n)if(new RegExp(`(${r})`).test(e)){const d=n[r].toString();e=e.replace(RegExp.$1,RegExp.$1.length===1?d:`00${d}`.substr(`${d}`.length))}return/(y+)/.test(e)&&(e=e.replace(RegExp.$1,`${t.getFullYear()}`.substr(4-RegExp.$1.length))),/(D+)/.test(e)&&(e=e.replace(RegExp.$1,i[s][t.getDay()])),e}function Ht(t,e){if(!!Ne()){if(Mt())window.onload=()=>{document.body.addEventListener("focusin",()=>{t()}),document.body.addEventListener("focusout",()=>{e()})};else if(Nt()){const s=document.documentElement.clientHeight||document.body.clientHeight;window.onload=()=>{window.addEventListener("resize",()=>{(document.documentElement.clientHeight||document.body.clientHeight)<s?t():e()})}}}}function Ue(t){return t[Math.floor(Math.random()*t.length)]}function He(t,e){t.classList.contains(e)||t.classList.add(e)}function zt(t,e){t.classList.remove(e)}const Gt=O({props:{size:{type:Number,default:2}},setup(t,{expose:e}){Ee(g=>({"5ae0ba49":t.size}));const s=p(""),i=p(""),n=p("down"),r=p(!1);function d(g,c,a){r.value||(s.value=c.toString(),i.value=a.toString(),n.value=g,r.value=!0,setTimeout(()=>{r.value=!1,s.value=a.toString()},600))}function _(g,c){d("down",g,c)}function E(g,c){d("up",g,c)}function h(g){s.value=g.toString()}function v(g){i.value=g.toString()}return e({flipDown:_,flipUp:E,setFront:h,setBack:v}),(g,c)=>(f(),y("div",{class:R(["flipper-bar",[n.value,{go:r.value}]])},[F("div",{class:R(["digital front",`number${s.value}`])},null,2),F("div",{class:R(["digital back",`number${i.value}`])},null,2)],2))}});var j=q(Gt,[["__scopeId","data-v-49d88e9e"]]);const qt={class:"clock"},Qt={key:1},Pt={key:3},jt=O({props:{time:{type:Date,default:new Date},direction:{type:String,default:"down"},showHour:{type:Boolean,default:!0},showMinute:{type:Boolean,default:!0},showSecond:{type:Boolean,default:!0}},setup(t){const e=t;Ee(v=>({"5280bf80":s.value}));const s=p(1.5),i=p(),n=p(),r=p(),d=p(),_=p(),E=p(),h=Ie([]);return he(()=>{var g,c;h.push(i,n,r,d,_,E);const v=ue(e.time,"HHmmss");for(let a=0;a<h.length;a++)(c=(g=h[a])==null?void 0:g.value)==null||c.setFront(v[a])}),J(()=>e.time,()=>{var c,a,u,m;const v=ue(new Date(e.time.getTime()-1e3),"HHmmss"),g=ue(e.time,"HHmmss");for(let S=0;S<h.length;S++)v[S]!==g[S]&&(e.direction==="up"?(a=(c=h[S])==null?void 0:c.value)==null||a.flipUp(v[S],g[S]):(m=(u=h[S])==null?void 0:u.value)==null||m.flipDown(v[S],g[S]))}),(v,g)=>(f(),y("div",qt,[t.showHour?(f(),y(N,{key:0},[o(j,{ref_key:"flipperHour1",ref:i,size:s.value},null,8,["size"]),o(j,{ref_key:"flipperHour2",ref:n,size:s.value},null,8,["size"])],64)):B("",!0),t.showHour&&t.showMinute?(f(),y("span",Qt,":")):B("",!0),t.showMinute?(f(),y(N,{key:2},[o(j,{ref_key:"flipperMinute1",ref:r,size:s.value},null,8,["size"]),o(j,{ref_key:"flipperMinute2",ref:d,size:s.value},null,8,["size"])],64)):B("",!0),t.showMinute&&t.showSecond?(f(),y("span",Pt,":")):B("",!0),t.showSecond?(f(),y(N,{key:4},[o(j,{ref_key:"flipperSecond1",ref:_,size:s.value},null,8,["size"]),o(j,{ref_key:"flipperSecond2",ref:E,size:s.value},null,8,["size"])],64)):B("",!0)]))}});var Kt=q(jt,[["__scopeId","data-v-1489bb38"]]);const Xt=O({components:{Clock:Kt},setup(){const t=p(new Date);return setInterval(()=>{t.value=new Date},1e3),{time:t}}});function Jt(t,e,s,i,n,r){const d=Oe("Clock");return f(),T(d,{time:t.time},null,8,["time"])}var Wt=q(Xt,[["render",Jt]]);const Yt=t=>(Ae("data-v-86d286ce"),t=t(),xe(),t),Zt={class:"flex justify-center"},eo=Yt(()=>F("div",{class:"fit absolute shadow-5 info-panel-bg"},null,-1)),to={class:"text-caption"},oo={class:"text-caption"},so={class:"text-weight-bold"},no=O({setup(t){const e=p("");Rt().then(r=>{typeof r=="string"?e.value=r:e.value=`${r[0].location.name} \u5F53\u524D\uFF1A${r[0].now.temperature}\xB0C ${r[0].now.text}`});const s=p(""),i=p(""),n=p("");return Lt().then(r=>{let d=new Date;typeof r!="string"&&(d=r[0].date,i.value=`${r[0].lunar_month_name}${r[0].lunar_day_name}`,n.value=`${r[0].ganzhi_year}\u5E74 ${r[0].ganzhi_month}\u6708 ${r[0].ganzhi_day}\u65E5 ${r[0].lunar_festival}`),s.value=ue(d,"yyyy-MM-dd")}),(r,d)=>(f(),y("div",Zt,[F("div",{class:R(["relative-position",r.$q.screen.gt.xs?"row":"column"])},[eo,o(Wt,{class:"q-pa-md"}),F("div",{class:R(["column justify-center text-grey-1",{"q-mr-md":r.$q.screen.gt.xs,"q-mb-md":!r.$q.screen.gt.xs}])},[F("div",to,I(s.value)+" \u519C\u5386 "+I(i.value),1),F("div",oo,I(n.value),1),F("div",so,I(e.value),1)],2)],2)]))}});var uo=q(no,[["__scopeId","data-v-86d286ce"]]);const le="SET_FOCUS_MODE",ae="SET_SHOW_TOOLBOX",re="SET_REMOVE_TOOL_STATE",ie="SET_SEARCH_ENGINE_IDX",ze="SEARCH_ENGINE_INDEX",ce="SET_BACKGROUND_IMAGE",K="controllers",U={SET_FOCUS_MODE:`${K}/${le}`,SET_SHOW_TOOLBOX:`${K}/${ae}`,SET_REMOVE_TOOL_STATE:`${K}/${re}`,SET_SEARCH_ENGINE_IDX:`${K}/${ie}`,GET_SEARCH_ENGINE_INDEX:`${K}/${ze}`,SET_BACKGROUND_IMAGE:`${K}/${ce}`},de="ADD_TOOL",me="REMOVE_TOOL",fe="SET_TOOL_LIST",_e="SET_SEARCH_ENGINE_LIST",pe="SAVE_USER_SETTINGS",Y="settings",V={ADD_TOOL:`${Y}/${de}`,REMOVE_TOOL:`${Y}/${me}`,SET_TOOL_LIST:`${Y}/${fe}`,SET_SEARCH_ENGINE_LIST:`${Y}/${_e}`,SAVE_USER_SETTINGS:`${Y}/${pe}`},lo={namespaced:!0,state:{focusMode:!1,isShowToolBox:!1,removeToolState:!1,defaultEngineIdx:0,backgroundImage:void 0},getters:{[ze]:(t,e,s)=>t.defaultEngineIdx>=0&&t.defaultEngineIdx<s.settings.searchEngines.length?t.defaultEngineIdx:0},mutations:{[le](t,e){t.focusMode=e},[ae](t,e){t.isShowToolBox=e},[re](t,e){t.removeToolState=e},[ie](t,e){t.defaultEngineIdx=e},[ce](t,e){t.backgroundImage=e}},actions:{[le](t,e){t.commit(le,e)},[ae](t,e){t.commit(ae,e)},[re](t,e){t.commit(re,e)},[ie](t,e){let s=0;e>=0&&e<t.rootState.settings.searchEngines.length&&(s=e),t.commit(ie,s)},[ce](t,e){t.commit(ce,e)}}},ge="x-start-toolList",Ge="x-start-searchEngineList",qe="x-start-defaultSearchEngineIdx",Qe="x-start-user-settings",ao={namespaced:!0,state:{tools:[],searchEngines:[],userSettings:{isSaveDefaultSearchEngine:!0,toolRadius:10,isDefaultFocusMode:!0,isShowInfoPanel:!0}},mutations:{[fe](t,e){t.tools=e},[de](t,e){var s;t.tools.length<24&&(t.tools.push({id:(s=e.id)!=null?s:Ut(12),url:e.url,name:e.name}),A.set(ge,JSON.stringify(t.tools)))},[me](t,e){const s=t.tools.findIndex(i=>i.id===e.id);s!==-1&&t.tools.splice(s,1),A.set(ge,JSON.stringify(t.tools))},[_e](t,e){t.searchEngines=e},[pe](t,e){Object.assign(t.userSettings,e)}},actions:{[fe](t,e){t.commit(fe,e)},[de](t,e){t.commit(de,e)},[me](t,e){t.commit(me,e)},[_e](t,e){t.commit(_e,e)},[pe](t,e){t.commit(pe,e)}}},Pe=Symbol("store_key");var Q=et({strict:!0,modules:{controllers:lo,settings:ao}});function P(){return tt(Pe)}const je={isSaveDefaultSearchEngine:!0,toolRadius:10,isDefaultFocusMode:!0,isShowInfoPanel:!0};function Z(t){A.set(Qe,JSON.stringify(Object.assign(je,t)))}function ro(t){A.set(ge,JSON.stringify(t))}function io(t){A.set(Ge,JSON.stringify(t))}function Ke(t){!Q.state.settings.userSettings.isSaveDefaultSearchEngine||A.set(qe,t)}function co(){A.clear()}const mo=O({setup(t){var g;const e=P(),s=e.state.settings.searchEngines.map(c=>({value:c.name,icon:`img:/assets/icons/${c.icon}.svg`,url:c.url,slot:c.name,comment:c.comment})),i=p((g=s[e.getters[U.GET_SEARCH_ENGINE_INDEX]])==null?void 0:g.value),n=M(()=>s.find(c=>c.value===i.value));function r(c){var a;i.value=c,(a=h.value)==null||a.focus(),Ke(s.findIndex(u=>u.value===c))}const d=M(()=>{var c;return`\u4F7F\u7528 ${(c=n.value)==null?void 0:c.comment} \u641C\u7D22`||"\u5F00\u59CB\u641C\u7D22"}),_=p("");function E(){var c;if(!_.value){(c=h.value)==null||c.focus();return}n.value&&(window.open(n.value.url+_.value),_.value="")}const h=p();he(()=>{var c;e.state.controllers.focusMode&&((c=h.value)==null||c.focus())});function v(){e.dispatch(U.SET_FOCUS_MODE,!0),He(document.body,"global-search-active")}return J(()=>e.state.controllers.focusMode,c=>{var a;c&&(He(document.body,"global-search-active"),(a=h.value)==null||a.focus())}),(c,a)=>(f(),y("div",{class:"column items-center",onClick:a[3]||(a[3]=Se(()=>{},["stop"]))},[o(ve,{ref_key:"inputBar",ref:h,modelValue:_.value,"onUpdate:modelValue":a[0]||(a[0]=u=>_.value=u),dark:"",dense:"",standout:"",rounded:"",class:"search-bar","bg-color":"white",placeholder:b(d),"aria-placeholder":"\u641C\u7D22\u6846",onKeypress:ot(E,["enter"]),onFocusin:v},{append:l(()=>[o(k,{flat:"",rounded:"",icon:"search",color:"primary",onClick:E})]),_:1},8,["modelValue","placeholder","onKeypress"]),o(nt,null,{default:l(()=>[b(e).state.controllers.isShowToolBox?B("",!0):(f(),T(st,{key:0,modelValue:i.value,"onUpdate:modelValue":[a[1]||(a[1]=u=>i.value=u),a[2]||(a[2]=u=>r(u))],class:"search-bar-engine-toggle-wrap","toggle-color":"primary",glossy:b(e).state.controllers.focusMode,rounded:"",options:b(s)},null,8,["modelValue","glossy","options"]))]),_:1})]))}});const fo={key:0,class:"tool-box-btn-img-wrap"},_o={class:"tool-box-name ellipsis text-white"},po=O({props:{tool:null},setup(t){const e=W(),s=P();function i(d){d.url&&window.open(d.url,"_blank")}function n(){s.state.controllers.removeToolState||s.dispatch(U.SET_REMOVE_TOOL_STATE,!0)}function r(d){s.dispatch(V.REMOVE_TOOL,d)}return(d,_)=>(f(),y("div",{class:R(["tool-box-btn-wrap relative-position",{"tool-box-btn-wrap-swing":b(s).state.controllers.removeToolState}])},[$((f(),T(k,{unelevated:"",color:"dark",padding:b(e).screen.lt.sm?"none":"",class:"tool-box-btn",onClick:_[1]||(_[1]=()=>i(t.tool))},{default:l(()=>[t.tool.url?(f(),y("div",fo,[o(ye,{src:`https://ico.kucat.cn/get.php?url=${t.tool.url}`,alt:t.tool.name,ratio:"1",width:"100%",height:"100%",fit:"contain"},{error:l(()=>[o(be,{name:"public",size:"2rem",class:R({"error-btn-icon":b(e).screen.gt.xs})},null,8,["class"])]),_:1},8,["src","alt"])])):B("",!0),b(s).state.controllers.removeToolState?(f(),T(k,{key:1,icon:"close",color:"warning",round:"",size:"0.3rem",class:"absolute tool-box-btn-delete",onClick:_[0]||(_[0]=Se(()=>r(t.tool),["stop"]))})):B("",!0)]),_:1},8,["padding"])),[[ut,n,void 0,{mouse:!0}]]),F("div",_o,I(t.tool.name),1)],2))}});var go=q(po,[["__scopeId","data-v-428ae20a"]]);const Eo=F("div",{class:"text-h6 text-white"},"\u6DFB\u52A0\u5BFC\u822A",-1),ho=O({props:{showDialog:{default:!1,type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const s=t,i=W(),n=M({get(){return s.showDialog},set(c){e("update:modelValue",c)}}),r=p(""),d=p(""),_=p(),E=p(),h=p(),v=P();function g(){var c,a,u,m;if(!r.value){(c=_.value)==null||c.focus(),(a=h.value)==null||a.shake();return}if(!d.value){(u=E.value)==null||u.focus(),(m=h.value)==null||m.shake();return}if(v.state.settings.tools.length>=18){i.notify({color:"warning",message:"\u5DE5\u5177\u7BB1\u5DF2\u6EE1\u3002\u6700\u591A\u53EF\u4EE5\u653E\u7F6E 24 \u4E2A\u5DE5\u5177",position:"center"});return}v.dispatch(V.ADD_TOOL,{name:r.value,url:d.value}),r.value="",d.value="",n.value=!1}return(c,a)=>(f(),T(Te,{ref_key:"dialogRef",ref:h,modelValue:b(n),"onUpdate:modelValue":a[2]||(a[2]=u=>G(n)?n.value=u:null),persistent:"","transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(Fe,{style:{width:"50%"}},{default:l(()=>[o(H,{class:"bg-primary"},{default:l(()=>[Eo]),_:1}),o(H,{class:"q-pt-none"},{default:l(()=>[o(ve,{ref_key:"toolNameRef",ref:_,modelValue:r.value,"onUpdate:modelValue":a[0]||(a[0]=u=>r.value=u),dense:"",placeholder:"\u5BFC\u822A\u540D\u79F0",rules:[u=>!!u||"\u5BFC\u822A\u540D\u79F0\u662F\u5FC5\u8981\u7684"]},null,8,["modelValue","rules"]),o(ve,{ref_key:"toolUrlRef",ref:E,modelValue:d.value,"onUpdate:modelValue":a[1]||(a[1]=u=>d.value=u),dense:"",placeholder:"\u5B8C\u6574\u7684 URL\uFF0C\u901A\u5E38\u4EE5 http:// \u6216 https:// \u8D77\u59CB",rules:[u=>!!u||"URL \u662F\u5FC5\u8981\u7684"]},null,8,["modelValue","rules"])]),_:1}),o(lt,{align:"right"},{default:l(()=>[o(k,{color:"primary",label:"\u6DFB\u52A0",onClick:g}),$(o(k,{outline:"",color:"primary",label:"\u53D6\u6D88"},null,512),[[z]])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}}),vo=w(" \u6DFB\u52A0\u5BFC\u822A\u5DE5\u5177 "),So={key:1},bo=F("span",null,"\u5DF2\u6DFB\u52A0",-1),yo=O({props:{showDialog:{default:!1,type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const s=t,i=M({get(){return s.showDialog},set(a){e("update:modelValue",a)}}),n=p(!1);function r(){n.value=!0}const d=P();function _(a){return d.state.settings.tools.find(u=>u.id===a.id)}const E=p({}),h=p(),v=p();fetch("/tools.json").then(a=>a.json()).then(a=>{var u;E.value=a,h.value=Object.keys(a),v.value=(u=h.value)==null?void 0:u[0]});function g(a){d.dispatch(V.ADD_TOOL,a)}function c(a){d.dispatch(V.REMOVE_TOOL,a)}return(a,u)=>(f(),T(Te,{modelValue:b(i),"onUpdate:modelValue":u[3]||(u[3]=m=>G(i)?i.value=m:null),"transition-show":"scale","transition-hide":"scale"},{default:l(()=>[o(Fe,{class:"fit"},{default:l(()=>[o(H,{class:"bg-primary q-pa-none"},{default:l(()=>[o(Ve,null,{default:l(()=>[o(k,{flat:"",round:"",dense:"",icon:"add",class:"q-mr-sm",onClick:r}),o(Le,{class:"text-center text-bold"},{default:l(()=>[vo]),_:1}),$(o(k,{flat:"",round:"",dense:"",icon:"close"},null,512),[[z]])]),_:1})]),_:1}),o(ee),o(H,{horizontal:""},{default:l(()=>[o(H,{class:"col-3 q-pa-none"},{default:l(()=>[o(at,{modelValue:v.value,"onUpdate:modelValue":u[0]||(u[0]=m=>v.value=m),vertical:"","active-color":"primary","indicator-color":"primary"},{default:l(()=>[(f(!0),y(N,null,te(h.value,m=>(f(),T(rt,{key:m,name:m,label:m},null,8,["name","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(ee,{vertical:""}),o(H,{class:"fit"},{default:l(()=>[o(it,{modelValue:v.value,"onUpdate:modelValue":u[1]||(u[1]=m=>v.value=m),animated:"",swipeable:"",vertical:"","transition-prev":"jump-up","transition-next":"jump-up"},{default:l(()=>[(f(!0),y(N,null,te(h.value,m=>(f(),T(ct,{key:m,name:m,class:"q-pa-none"},{default:l(()=>[(f(!0),y(N,null,te(E.value[m],S=>(f(),T(De,{key:S.id,bordered:"",separator:""},{default:l(()=>[$((f(),T(x,{clickable:""},{default:l(()=>[a.$q.screen.gt.xs?(f(),T(D,{key:0,avatar:"",style:{width:"2rem",height:"2rem"}},{default:l(()=>[o(ye,{src:`https://ico.kucat.cn/get.php?url=${S.url}`,alt:S.name,ratio:"1",width:"100%",height:"100%",fit:"contain"},{error:l(()=>[o(be,{name:"public",size:"2rem",class:R({"error-btn-icon":a.$q.screen.gt.xs})},null,8,["class"])]),_:2},1032,["src","alt"])]),_:2},1024)):B("",!0),o(D,null,{default:l(()=>[o(C,{class:"ellipsis"},{default:l(()=>[w(I(S.name),1)]),_:2},1024),o(C,{caption:"",class:"ellipsis-2-lines"},{default:l(()=>[w(I(S.comment||"\u65E0\u63CF\u8FF0"),1)]),_:2},1024)]),_:2},1024),o(D,{side:""},{default:l(()=>[_(S)?(f(),y("div",So,[bo,o(k,{flat:"",round:"",icon:"delete",size:"sm",onClick:L=>c(S)},null,8,["onClick"])])):(f(),T(k,{key:0,flat:"",size:"sm",color:"primary",label:"\u6DFB\u52A0",onClick:L=>g(S)},null,8,["onClick"]))]),_:2},1024)]),_:2},1024)),[[oe]])]),_:2},1024))),128))]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),o(ho,{modelValue:n.value,"onUpdate:modelValue":u[2]||(u[2]=m=>n.value=m)},null,8,["modelValue"])]),_:1},8,["modelValue"]))}});const Fo={key:0},To={key:0},Do=F("div",{class:"text-h5 text-bold text-info q-my-md"}," \u5DE5\u5177\u7BB1\u662F\u7A7A\u7684\uFF0C\u5FEB\u53BB\u6DFB\u52A0\u4E00\u4E2A\u5427 ",-1),wo=O({setup(t){Ee(v=>({"92b74e78":n.value,c67c7ed6:b(d)}));const e=W(),s=P(),i=Ie(s.state.settings.tools),n=p("4rem"),r=p("down"),d=M(()=>s.state.settings.userSettings.toolRadius);function _(){s.dispatch(U.SET_SHOW_TOOLBOX,!s.state.controllers.isShowToolBox),r.value=s.state.controllers.isShowToolBox?"up":"down"}he(()=>{!s.state.controllers.focusMode&&!s.state.controllers.isShowToolBox&&_()}),J(()=>s.state.controllers.focusMode,v=>{v&&s.state.controllers.isShowToolBox&&_()});const E=p(!1);function h(){E.value=!0}return(v,g)=>(f(),y(N,null,[o(k,{class:"drop-btn",flat:"",rounded:"",color:"primary",icon:`keyboard_double_arrow_${r.value}`,onClick:_},null,8,["icon"]),o(Re,{name:"scale-to-top"},{default:l(()=>[b(s).state.controllers.isShowToolBox?(f(),y("div",Fo,[b(i).length?(f(),y("div",{key:1,class:"tool-box",style:dt(`grid-gap: ${b(e).screen.lt.sm?1:b(e).screen.lt.md?1.5:3}rem 1rem`)},[o(mt,{name:"scale"},{default:l(()=>[(f(!0),y(N,null,te(b(i),c=>(f(),T(go,{key:c.id,tool:c},null,8,["tool"]))),128))]),_:1}),b(i).length<24?(f(),T(k,{key:0,class:"add-tool-btn",onClick:h},{default:l(()=>[o(be,{size:`${b(e).screen.lt.sm?1.5:3}rem`,name:"add"},null,8,["size"])]),_:1})):B("",!0)],4)):(f(),y("div",To,[Do,o(k,{label:"\u6DFB\u52A0\u5DE5\u5177",color:"primary",onClick:h})]))])):B("",!0)]),_:1}),o(yo,{modelValue:E.value,"onUpdate:modelValue":g[0]||(g[0]=c=>E.value=c)},null,8,["modelValue"])],64))}});const ko=t=>(Ae("data-v-9131ac8e"),t=t(),xe(),t),Co=w("\u8BBE\u7F6E"),Bo=w("\u529F\u80FD"),$o=w("\u5207\u6362\u641C\u7D22\u5F15\u64CE\u65F6\u4FDD\u5B58\u4E3A\u9ED8\u8BA4\u5F15\u64CE"),Oo=w("\u542F\u52A8\u65F6\u542F\u7528\u805A\u7126\u6A21\u5F0F"),Io=w("\u663E\u793A"),Ao=w("\u4FE1\u606F\u9762\u677F"),xo=w("\u5DE5\u5177\u7BB1\u56FE\u6807\u5706\u89D2"),Vo=w("\u80CC\u666F\u56FE\u7247"),Lo={class:"image-tip absolute-bottom text-caption text-center"},Ro=["href"],Mo=ko(()=>F("span",null,[w(" \u56FE\u7247\u6E90\u81EA "),F("a",{style:{display:"inline"},target:"_blank",href:"https://bing.com"}," Bing ")],-1)),No=w("\u4E0B\u8F7D\u5C0F\u56FE"),Uo=w("\u4E0B\u8F7D\u5927\u56FE(2K)"),Ho=w("\u4E0B\u8F7D\u9AD8\u6E05\u56FE(4K)"),zo=w("\u4E0B\u8F7D\u624B\u673A\u684C\u9762"),Go=w("\u91CD\u7F6E"),qo=w("\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E"),Qo=O({props:{showDialog:{default:!1,type:Boolean}},emits:["update:modelValue"],setup(t,{emit:e}){const s=t,i=M({get(){return s.showDialog},set(a){e("update:modelValue",a)}}),n=P(),r=M({get(){return n.state.settings.userSettings.isSaveDefaultSearchEngine},set(a){const u={isSaveDefaultSearchEngine:a};n.commit(V.SAVE_USER_SETTINGS,u),Z(u)}}),d=M({get(){return n.state.settings.userSettings.isDefaultFocusMode},set(a){const u={isDefaultFocusMode:a};n.commit(V.SAVE_USER_SETTINGS,u),Z(u)}}),_=M({get(){return n.state.settings.userSettings.isShowInfoPanel},set(a){const u={isShowInfoPanel:a};n.commit(V.SAVE_USER_SETTINGS,u),Z(u)}}),E=M({get(){return n.state.settings.userSettings.toolRadius||10},set(a){const u={toolRadius:a};n.commit(V.SAVE_USER_SETTINGS,u)}});function h(a){Z({toolRadius:a})}const v=W();function g(){v.dialog({title:"\u8B66\u544A",message:"\u786E\u8BA4\u540E\u7CFB\u7EDF\u4F1A\u6E05\u9664\u6240\u6709\u6570\u636E\u5E76\u6062\u590D\u9ED8\u8BA4\u503C\uFF0C\u60A8\u786E\u5B9A\u7EE7\u7EED\u5417?",color:"negative",ok:"\u662F\u7684",cancel:"\u4E0D\uFF0C\u6211\u518D\u60F3\u60F3"}).onOk(()=>{co(),location.reload()})}function c(a){var m,S,L,X;let u="";switch(a){case"small":u=(m=n.state.controllers.backgroundImage)==null?void 0:m.smallUrl;break;case"4k":u=(S=n.state.controllers.backgroundImage)==null?void 0:S.uhdUrl;break;case"mobile":u=(L=n.state.controllers.backgroundImage)==null?void 0:L.standardUrl_M;break;case"2k":default:u=(X=n.state.controllers.backgroundImage)==null?void 0:X.standardUrl}u&&Vt(u,"background.png","image/png")}return(a,u)=>(f(),T(Te,{modelValue:b(i),"onUpdate:modelValue":u[11]||(u[11]=m=>G(i)?i.value=m:null)},{default:l(()=>[o(Fe,{class:"fit"},{default:l(()=>[o(H,{class:"bg-primary q-pa-none"},{default:l(()=>[o(Ve,null,{default:l(()=>[o(Le,{class:"text-center text-bold"},{default:l(()=>[Co]),_:1}),$(o(k,{flat:"",round:"",dense:"",icon:"close"},null,512),[[z]])]),_:1})]),_:1}),o(H,{class:"scroll",style:{height:"calc(100% - 50px)"}},{default:l(()=>[o(De,{bordered:"",padding:""},{default:l(()=>[o(C,{header:""},{default:l(()=>[Bo]),_:1}),$((f(),T(x,{tag:"label"},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[$o]),_:1})]),_:1}),o(D,{side:""},{default:l(()=>[o(we,{modelValue:b(r),"onUpdate:modelValue":u[0]||(u[0]=m=>G(r)?r.value=m:null),color:"blue"},null,8,["modelValue"])]),_:1})]),_:1})),[[oe]]),$((f(),T(x,{tag:"label"},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[Oo]),_:1})]),_:1}),o(D,{side:""},{default:l(()=>[o(we,{modelValue:b(d),"onUpdate:modelValue":u[1]||(u[1]=m=>G(d)?d.value=m:null),color:"blue"},null,8,["modelValue"])]),_:1})]),_:1})),[[oe]]),o(ee,{spaced:""}),o(C,{header:""},{default:l(()=>[Io]),_:1}),$((f(),T(x,{tag:"label"},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[Ao]),_:1})]),_:1}),o(D,{side:""},{default:l(()=>[o(we,{modelValue:b(_),"onUpdate:modelValue":u[2]||(u[2]=m=>G(_)?_.value=m:null),color:"blue"},null,8,["modelValue"])]),_:1})]),_:1})),[[oe]]),o(x,null,{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[xo]),_:1})]),_:1}),o(D,null,{default:l(()=>[o(ft,{modelValue:b(E),"onUpdate:modelValue":u[3]||(u[3]=m=>G(E)?E.value=m:null),min:0,max:50,label:"",onChange:h},null,8,["modelValue"])]),_:1}),o(D,{side:""},{default:l(()=>[o(k,{size:"sm",color:"primary",label:"\u91CD\u7F6E",onClick:u[4]||(u[4]=m=>E.value=10)})]),_:1})]),_:1}),o(x,{class:"bg-image"},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[Vo]),_:1})]),_:1}),o(D,null,{default:l(()=>{var m;return[o(ye,{src:(m=b(n).state.controllers.backgroundImage)==null?void 0:m.thumbnailUrl},{default:l(()=>{var S,L;return[F("div",Lo,[F("a",{target:"_blank",href:(S=b(n).state.controllers.backgroundImage)==null?void 0:S.copyrightLink},I((L=b(n).state.controllers.backgroundImage)==null?void 0:L.copyright),9,Ro)])]}),_:1},8,["src"])]}),_:1}),o(D,{side:"",style:{gap:"1rem","align-items":"center"}},{default:l(()=>[Mo,o(_t,{split:"",size:"sm",color:"secondary",label:"\u4E0B\u8F7D\u8BE5\u56FE\u7247",onClick:u[9]||(u[9]=()=>c("2k"))},{default:l(()=>[o(De,{dense:""},{default:l(()=>[$((f(),T(x,{clickable:"",onClick:u[5]||(u[5]=()=>c("small"))},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[No]),_:1})]),_:1})]),_:1})),[[z]]),$((f(),T(x,{clickable:"",onClick:u[6]||(u[6]=()=>c("2k"))},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[Uo]),_:1})]),_:1})]),_:1})),[[z]]),$((f(),T(x,{clickable:"",onClick:u[7]||(u[7]=()=>c("4k"))},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[Ho]),_:1})]),_:1})]),_:1})),[[z]]),$((f(),T(x,{clickable:"",onClick:u[8]||(u[8]=()=>c("mobile"))},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[zo]),_:1})]),_:1})]),_:1})),[[z]])]),_:1})]),_:1})]),_:1})]),_:1}),o(ee,{spaced:""}),o(C,{header:""},{default:l(()=>[Go]),_:1}),o(x,{tag:"label",onClick:u[10]||(u[10]=Se(()=>{},["prevent"]))},{default:l(()=>[o(D,null,{default:l(()=>[o(C,null,{default:l(()=>[qo]),_:1})]),_:1}),o(D,{side:""},{default:l(()=>[o(k,{flat:"",color:"negative",label:"\u91CD\u7F6E",onClick:g})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}});var Po=q(Qo,[["__scopeId","data-v-9131ac8e"]]);const jo={class:"absolute-top-right q-mr-md q-mt-sm"},Ko={key:0,class:"absolute-bottom text-grey-8",style:{"padding-bottom":"10rem"}},Xo=F("sup",null,"\u300E",-1),Jo=F("sub",null,"\u300F",-1),Wo=O({setup(t){const e=P();function s(){zt(document.body,"global-search-active"),e.state.controllers.focusMode&&e.dispatch(U.SET_FOCUS_MODE,!1),e.state.controllers.removeToolState&&e.dispatch(U.SET_REMOVE_TOOL_STATE,!1)}const i=p(!1),n=p(!1);Ht(()=>{n.value=!0},()=>{n.value=!1});const r=p([]),d=p();fetch("/aphorisms.json").then(c=>c.json()).then(c=>{r.value=c,d.value=Ue(r.value)}),J(()=>e.state.controllers.focusMode,()=>{d.value=Ue(r.value)});const _=W();function E(){var a,u,m,S,L,X;let c=(a=e.state.controllers.backgroundImage)==null?void 0:a.standardUrl;Ne()?c=(u=e.state.controllers.backgroundImage)==null?void 0:u.standardUrl_M:_.screen.lt.md?(c=(m=e.state.controllers.backgroundImage)==null?void 0:m.middleUrl,_.screen.height>_.screen.width&&(c=(S=e.state.controllers.backgroundImage)==null?void 0:S.middleUrl_M)):_.screen.width>1920?c=(L=e.state.controllers.backgroundImage)==null?void 0:L.uhdUrl:_.screen.height>_.screen.width&&(c=(X=e.state.controllers.backgroundImage)==null?void 0:X.standardUrl_M),document.body.style.backgroundImage=`url(${c})`}function h(c=!1,a=()=>{},u=()=>{}){ke(`https://api.xiaopangying.com/image/bing?random=${c}`).then(([,m])=>{e.dispatch(U.SET_BACKGROUND_IMAGE,m).then(E)}).catch(a).finally(u)}h(),J(()=>[_.screen.width,_.screen.height],()=>{E()});const v=p(!1);function g(){v.value=!0,setTimeout(()=>{h(!0,void 0,()=>{v.value=!1})},500)}return(c,a)=>(f(),y("div",null,[F("div",{class:"column full-height",onClickPassive:s},[F("div",jo,[o(k,{flat:"",round:"",size:"sm",icon:"settings",onClick:a[0]||(a[0]=()=>i.value=!0)})]),F("div",{class:R(["column full-width justify-end q-gutter-y-md",`col-${b(_).screen.lt.sm&&n.value?9:5}`])},[b(e).state.settings.userSettings.isShowInfoPanel?(f(),T(uo,{key:0})):B("",!0),o(mo)],2),F("div",{class:R(["q-py-md",`col-${b(_).screen.lt.sm&&n.value?3:7}`])},[o(wo),o(Re,{name:"fade"},{default:l(()=>{var u;return[!n.value&&b(e).state.controllers.focusMode?(f(),y("div",Ko,[Xo,w(" "+I((u=d.value)==null?void 0:u.content)+" ",1),Jo,o(gt,{delay:500},{default:l(()=>{var m,S;return[w(I((m=d.value)==null?void 0:m.source)+" "+I((S=d.value)==null?void 0:S.author),1)]}),_:1})])):B("",!0)]}),_:1})],2)],32),o(Po,{modelValue:i.value,"onUpdate:modelValue":a[1]||(a[1]=u=>i.value=u)},null,8,["modelValue"]),$(o(k,{class:"absolute-bottom-right q-mb-lg q-mr-md",round:"",flat:"",icon:"auto_awesome",loading:v.value,disable:v.value,color:"accent",onClick:g},{loading:l(()=>[o(Et)]),_:1},8,["loading","disable"]),[[pt,!b(e).state.controllers.focusMode]])]))}}),Yo=[{name:"baidu",url:"https://www.baidu.com/s?wd=",icon:"baidu",comment:"\u767E\u5EA6"},{name:"bing",url:"https://www.bing.com/search?q=",icon:"bing",comment:"\u5FC5\u5E94"},{name:"google",url:"https://www.google.com/search?q=",icon:"google",comment:"\u8C37\u6B4C\uFF08\u9700\u8981\u68AF\u5B50\uFF09"},{name:"magi",url:"https://magi.com/search?q=",icon:"magi",comment:"Magi\uFF08\u641C\u4EBA\u3001\u4E8B\u3001\u7269\u3001\u6982\u5FF5\uFF0C\u6216\u8005\u76F4\u63A5\u63D0\u95EE\uFF09"}],Zo=[{id:"C0A9D43F6903",url:"https://pan.baidu.com",name:"\u767E\u5EA6\u7F51\u76D8"},{id:"BB355B5AC8B4",url:"https://mail.qq.com",name:"QQ\u90AE\u7BB1"},{id:"55EE1ECDB03B",url:"https://mail.163.com/",name:"163\u90AE\u7BB1"},{id:"BBA139347B80",url:"https://web.wechat.com/?lang=zh_CN",name:"\u5FAE\u4FE1\u7F51\u9875\u7248"}];function es(){const t=A.getItem(Qe),e=je;t?Object.assign(e,JSON.parse(t)):Z(e),Q.dispatch(V.SAVE_USER_SETTINGS,e),Q.dispatch(U.SET_FOCUS_MODE,e.isDefaultFocusMode)}function ts(){const t=A.getItem(ge);let e=[];t?e=JSON.parse(t):(e=Zo,ro(e)),Q.dispatch(V.SET_TOOL_LIST,e)}function os(){const t=A.getItem(Ge);let e=[];t?e=JSON.parse(t):(e=Yo,io(e)),Q.dispatch(V.SET_SEARCH_ENGINE_LIST,e)}function ss(){const t=A.getItem(qe);typeof t=="number"?Q.dispatch(U.SET_SEARCH_ENGINE_IDX,t):Ke(0)}function ns(){es(),ts(),os(),ss()}const us=[{path:"/",name:"Home",component:Wo},{path:"/:pathMatch(.*)*",component:()=>It(()=>import("./404.6f80287d.js"),["assets/404.6f80287d.js","assets/404.eae921f3.css","assets/vendor.98971a76.js"])}],Xe=ht({history:vt(),routes:us});Xe.beforeEach((t,e,s)=>{ns(),s()});const ls=St(Bt);ls.use(bt,{plugins:{Notify:yt,Dialog:Ft},lang:Tt,config:{}}).use(Xe).use(Q,Pe).mount("#app");export{q as _};
