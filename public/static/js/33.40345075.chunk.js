(this.webpackJsonpgempad=this.webpackJsonpgempad||[]).push([[33],{1133:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"a",(function(){return r}));var o=i(448),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?97===e?"Binance":"":97===e?"BNB":3===e?"ETH":"Invalid chain id"},c={1:Object(o.a)("./chains/eth.png"),97:Object(o.a)("./chains/bsc.png"),250:Object(o.a)("./chains/ftm.png"),43114:Object(o.a)("./chains/avax.png"),137:Object(o.a)("./chains/polygon.png")},r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return c[e]}},1779:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return v}));var o=i(4),n=i(21),c=i(23),r=i(56),a=i(1067),s=i(20),d=i(1064),l=i(444),j=i(180),p=i(0),x=i(309),b=i(42),h=i(1133),m=i(381),O=i(306),u=i(53),g=i(1236),f=(i(1235),i(1));function v(e){var t,i,h,m,O,v,T,S,k=Object(b.e)(),R=k.pathname,z=k.hash,I=Object(p.useState)([]),_=Object(c.a)(I,2),D=(_[0],_[1],R.split("/")[R.split("/").length-1]),E=Object(p.useState)([]),U=Object(c.a)(E,2),L=U[0],A=U[1],P=Object(p.useState)(""),M=Object(c.a)(P,2),B=(M[0],M[1],Object(p.useState)([Object(u.d)("avatar1.png"),Object(u.d)("avatar2.png"),Object(u.d)("avatar3.png")])),N=Object(c.a)(B,2),G=N[0],V=N[1],Y=Object(p.useState)(""),H=Object(c.a)(Y,2),J=(H[0],H[1],L.name),W=void 0===J?"":J,$=L.description,q=L.startDateTime,K=L.endDateTime,X=function(e){e.stopPropagation(),Object(g.a)({name:W,description:$,startDate:q,endDate:K,options:["Google"],timeZone:"Europe/Berlin"})};return Object(p.useEffect)((function(){Object(n.a)(Object(o.a)().mark((function e(){var t,i;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.getProjectDetails(D,{});case 2:"OK"===(t=e.sent).statusText&&(i=t.data.pool,A(i));case 4:case"end":return e.stop()}}),e)})))()}),[]),Object(p.useEffect)((function(){Object(n.a)(Object(o.a)().mark((function e(){var t,i,n,c;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.getRandomImages();case 2:if(200===(null===(n=e.sent)||void 0===n?void 0:n.status)){e.next=5;break}return e.abrupt("return");case 5:c=(null===n||void 0===n||null===(t=n.data)||void 0===t||null===(i=t.results)||void 0===i?void 0:i.length)>0?n.data.results.map((function(e){return e.picture.thumbnail})):[],V(c);case 7:case"end":return e.stop()}}),e)})))()}),[]),Object(p.useEffect)((function(){document.querySelector(".css-hsfvqa").style.overflow="visible",document.querySelector(".css-om7vnx").style.overflow="visible"}),[]),Object(p.useLayoutEffect)((function(){setTimeout((function(){var e=window.pageYOffset||document.documentElement.scrollTop;window.scrollTo({top:e-300})}),200)}),[z]),Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(l.a,{style:{backgroundColor:"#171819"},children:[Object(f.jsx)(j.a,{width:"mdDown",children:Object(f.jsxs)(r.a,{paddingLeft:"13%",paddingRight:"13%",children:[Object(f.jsxs)(r.a,{container:!0,spacing:1,paddingTop:"30px",children:[Object(f.jsx)(r.a,{item:!0,sm:3,children:Object(f.jsx)(C,{name:"Token Price",number:"0.05USDC"})}),Object(f.jsx)(r.a,{item:!0,sm:3,children:Object(f.jsx)(C,{name:"Pool Size",number:"".concat((null===L||void 0===L?void 0:L.presaleRate)||0," USDC")})}),Object(f.jsx)(r.a,{item:!0,sm:3,children:Object(f.jsx)(C,{name:"Hard Cap",number:"".concat((null===L||void 0===L?void 0:L.hardCap)||0," USDC")})}),Object(f.jsx)(r.a,{item:!0,sm:3,children:Object(f.jsx)(C,{name:"Type",number:"unlocked"})})]}),Object(f.jsx)(r.a,{marginTop:"30px",children:Object(f.jsx)(F,{data:L})}),Object(f.jsxs)(a.a,{marginTop:"30px",style:{fontSize:"34px",fontFamily:"Segoe UI",color:"#56C5FF"},children:[Object(u.a)(null===L||void 0===L?void 0:L.twitter_followers)," Followers"]}),Object(f.jsx)(r.a,{container:!0,direction:"row",spacing:1,marginTop:"10px",children:G.map((function(e,t){return Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"img",src:e,borderRadius:"50%"})},t)}))}),Object(f.jsxs)(r.a,{marginTop:"30px",container:!0,direction:"row",spacing:1,children:[Object(f.jsx)(r.a,{item:!0,children:Object(f.jsxs)(d.a,{style:{borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",fontFamily:"Segoe UI",fontSize:"14px",color:"white",padding:"10px 20px 10px 20px",textTransform:"lowercase"},children:[Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("Vector.png"),mr:1}),"whitepaper"]})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsxs)(d.a,{style:{borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",fontFamily:"Segoe UI",fontSize:"14px",color:"white",padding:"10px 20px 10px 20px",textTransform:"lowercase"},onClick:function(){var e;return window.open(null===L||void 0===L||null===(e=L.ipfs)||void 0===e?void 0:e.website,"_blank")},children:[Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("Vector_www.png"),mr:1}),Object(f.jsx)("span",{className:"text-lowercase",children:null===L||void 0===L||null===(t=L.ipfs)||void 0===t?void 0:t.website})]})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(i=L.ipfs)||void 0===i?void 0:i.telegram),target:"_blank",children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("plane_avatar.png")})})})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(h=L.ipfs)||void 0===h?void 0:h.twitter),target:"_blank",children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("twitter_avatar.png")})})})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(m=L.ipfs)||void 0===m?void 0:m.discord),target:"_blank",children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("Discord.png")})})})}),Object(f.jsx)(r.a,{item:!0,alignItems:"center",display:"flex",children:Object(f.jsx)(s.a,{component:"a",color:"white",sx:{cursor:"pointer"},onClick:X,children:"Add to Google Calendar"})})]}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(w,{data:L})}),Object(f.jsx)("div",{id:"sticky",style:{position:"sticky",top:"92px",backgroundColor:"rgb(23, 24, 25)"},children:Object(f.jsxs)(r.a,{container:!0,marginTop:"60px",justifyContent:"center",sx:{width:"113%"},children:[Object(f.jsxs)(r.a,{xs:!0,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#roadmap",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-1.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:!0,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#about",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-2.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:!0,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#features",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-3.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:!0,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#team",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-4.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:!0,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#tokenomics",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-5.png")})})})]})]})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Roadmap",id:"roadmap",description:null===L||void 0===L?void 0:L.roadmap_description,description_url:null===L||void 0===L?void 0:L.roadmap_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"About",id:"about",description:null===L||void 0===L?void 0:L.about_description,description_url:null===L||void 0===L?void 0:L.about_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Features",id:"features",description:null===L||void 0===L?void 0:L.features_description,description_url:null===L||void 0===L?void 0:L.features_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Team",id:"team",description:null===L||void 0===L?void 0:L.teams_description,description_url:null===L||void 0===L?void 0:L.teams_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Tokenomics",id:"tokenomics",description:null===L||void 0===L?void 0:L.tokenomics_description,description_url:null===L||void 0===L?void 0:L.tokenomics_url})})]})}),Object(f.jsx)(j.a,{width:"mdUp",children:Object(f.jsxs)(r.a,{paddingLeft:"5%",paddingRight:"5%",children:[Object(f.jsxs)(r.a,{container:!0,spacing:1,paddingTop:"30px",children:[Object(f.jsx)(r.a,{item:!0,xs:6,children:Object(f.jsx)(C,{name:"Token Price",number:"0.05USDC"})}),Object(f.jsx)(r.a,{item:!0,xs:6,children:Object(f.jsx)(C,{name:"Pool Size",number:"0.05USDC"})}),Object(f.jsx)(r.a,{item:!0,xs:6,children:Object(f.jsx)(C,{name:"Hard Cap",number:"0.05USDC"})}),Object(f.jsx)(r.a,{item:!0,xs:6,children:Object(f.jsx)(C,{name:"Type",number:"unlocked"})})]}),Object(f.jsx)(r.a,{marginTop:"30px",children:Object(f.jsx)(F,{})}),Object(f.jsx)(r.a,{display:"flex",justifyContent:"center",children:Object(f.jsxs)(a.a,{marginTop:"30px",style:{fontSize:"20px",fontFamily:"Segoe UI",color:"#56C5FF"},children:[Object(u.a)(null===L||void 0===L?void 0:L.twitter_followers)," Followers"]})}),Object(f.jsxs)(r.a,{container:!0,direction:"row",spacing:1,marginTop:"10px",display:"flex",justifyContent:"center",children:[Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("avatar1.png")})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("avatar2.png")})}),Object(f.jsx)(r.a,{item:!0,children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("avatar3.png")})})]}),Object(f.jsxs)(r.a,{marginTop:"30px",container:!0,direction:"row",spacing:1,padding:"0px 15px",display:"flex",justifyContent:"space-around",children:[Object(f.jsx)(r.a,{item:!0,xs:12,children:Object(f.jsxs)(d.a,{style:{borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",fontFamily:"Segoe UI",fontSize:"14px",color:"white",padding:"10px 20px 10px 20px",width:"100%",textTransform:"lowercase"},children:[Object(f.jsx)(s.a,{component:"img",marginRight:"8px",src:Object(u.d)("Vector.png")}),"whitepaper"]})}),Object(f.jsx)(r.a,{item:!0,xs:12,children:Object(f.jsxs)(d.a,{style:{borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",fontFamily:"Segoe UI",fontSize:"14px",color:"white",padding:"10px 20px 10px 20px",textTransform:"lowercase",width:"100%"},children:[Object(f.jsx)(s.a,{component:"img",marginRight:"8px",src:Object(u.d)("Vector_www.png")}),Object(f.jsx)("span",{className:"text-lowercase",children:null===L||void 0===L||null===(O=L.ipfs)||void 0===O?void 0:O.website})]})}),Object(f.jsx)(r.a,{item:!0,marginTop:"20px",children:Object(f.jsx)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(v=L.ipfs)||void 0===v?void 0:v.telegram),children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("plane_avatar.png")})})})}),Object(f.jsx)(r.a,{item:!0,marginTop:"20px",children:Object(f.jsx)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(T=L.ipfs)||void 0===T?void 0:T.twitter),children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("twitter_avatar.png")})})})}),Object(f.jsx)(r.a,{item:!0,marginTop:"20px",children:Object(f.jsxs)(s.a,{component:"button",style:{height:"44px",border:"none",borderRadius:4,backgroundColor:"rgba(255, 255, 255, 0.1)",padding:"10px 10px 10px 10px"},children:[" ",Object(f.jsx)(s.a,{component:"a",href:"".concat(null===L||void 0===L||null===(S=L.ipfs)||void 0===S?void 0:S.discord),children:Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("Discord.png")})})]})}),Object(f.jsx)(r.a,{item:!0,alignItems:"center",display:"flex",marginTop:"15px",children:Object(f.jsx)(s.a,{component:"a",color:"white",sx:{cursor:"pointer"},onClick:X,children:"Add To Google Calendar"})})]}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(w,{data:L})}),Object(f.jsxs)(r.a,{container:!0,marginTop:"60px",justifyContent:"center",display:"flex",children:[Object(f.jsxs)(r.a,{xs:2.4,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#roadmap",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-1.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:2.4,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#about",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-2.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:2.4,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#features",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-3.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:2.4,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#team",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-4.png")})})}),Object(f.jsx)(s.a,{component:"span",sx:{position:"absolute",top:"30%",width:"52%",height:"4px",background:"#56c4ff",right:-1}})]}),Object(f.jsxs)(r.a,{xs:2.4,position:"relative",children:[" ",Object(f.jsx)(s.a,{component:"div",width:"50%",children:Object(f.jsx)(s.a,{component:"a",href:"#tokenomics",children:Object(f.jsx)("img",{src:Object(u.d)("roadmap-icon-5.png")})})})]})]}),Object(f.jsx)(r.a,{item:!0,marginTop:"50px",children:Object(f.jsx)(y,{title:"Roadmap",id:"roadmap",description:null===L||void 0===L?void 0:L.roadmap_description,description_url:null===L||void 0===L?void 0:L.roadmap_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"About",id:"about",description:null===L||void 0===L?void 0:L.about_description,description_url:null===L||void 0===L?void 0:L.about_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Features",id:"features",description:null===L||void 0===L?void 0:L.features_description,description_url:null===L||void 0===L?void 0:L.features_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Team",id:"team",description:null===L||void 0===L?void 0:L.teams_description,description_url:null===L||void 0===L?void 0:L.teams_url})}),Object(f.jsx)(r.a,{marginTop:"50px",children:Object(f.jsx)(y,{title:"Tokenomics",id:"tokenomics",description:null===L||void 0===L?void 0:L.tokenomics_description,description_url:null===L||void 0===L?void 0:L.tokenomics_url})})]})})]})})}function C(e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(j.a,{width:"mdDown",children:Object(f.jsxs)(r.a,{style:{backgroundColor:"#232323",borderRadius:10,padding:"20px"},children:[Object(f.jsx)(s.a,{style:{fontSize:"15px",color:"#24B6E6"},children:e.name}),Object(f.jsx)(s.a,{marginTop:"20px",style:{fontSize:"20px",color:"white"},children:e.number})]})}),Object(f.jsx)(j.a,{width:"mdUp",children:Object(f.jsxs)(r.a,{style:{backgroundColor:"#232323",borderRadius:10,padding:"20px"},children:[Object(f.jsx)(s.a,{style:{fontSize:"15px",color:"#24B6E6"},textAlign:"center",children:e.name}),Object(f.jsx)(s.a,{marginTop:"10px",style:{fontSize:"20px",color:"white"},textAlign:"center",children:e.number})]})})]})}function w(e){var t=e.data,i=e.roadmapdata,a=Object(m.c)((function(e){return e.network.chainId})),d=Object(O.a)().account,l=Object(p.useState)(!1),x=Object(c.a)(l,2),b=x[0],g=x[1];return Object(p.useEffect)((function(){Object(n.a)(Object(o.a)().mark((function e(){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d&&void 0!==t&&(console.log("account",d),console.log("condition",null===t||void 0===t?void 0:t.whiteLists.includes(d)),g(!(null!==t&&void 0!==t&&t.whitelistable)||(null===t||void 0===t?void 0:t.whiteLists.includes(d))));case 1:case"end":return e.stop()}}),e)})))()}),[d,t,i]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(j.a,{width:"mdDown",children:Object(f.jsxs)(r.a,{container:!0,border:"1px solid #56C5FF",borderRadius:1,bgColor:"#232323",padding:"30px",rowSpacing:2,children:[Object(f.jsx)(r.a,{item:!0,sm:7,color:"#56C5FF",fontSize:48,children:"Project Information"}),Object(f.jsx)(r.a,{item:!0,sm:5,color:"#56C5FF",fontSize:48,children:"Token Information"}),Object(f.jsxs)(r.a,{container:!0,item:!0,direction:"row",children:[Object(f.jsxs)(r.a,{container:!0,item:!0,sm:2,direction:"column",children:[Object(f.jsx)(r.a,{item:!0,color:"white",children:"HARDCAP"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"OPEN TIME"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"CLOSE TIME"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"LISTING DATE"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"DEAL"})]}),Object(f.jsxs)(r.a,{container:!0,item:!0,sm:3,direction:"column",children:[Object(f.jsxs)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:[null===t||void 0===t?void 0:t.hardCap," USDC"]}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:Object(u.b)(null===t||void 0===t?void 0:t.startDateTime)}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:Object(u.b)(null===t||void 0===t?void 0:t.endDateTime)}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:Object(u.b)(null===t||void 0===t?void 0:t.createdAt)}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:null!==t&&void 0!==t&&t.whitelistable?"VC":"IDO"})]}),Object(f.jsx)(r.a,{container:!0,item:!0,sm:2}),Object(f.jsxs)(r.a,{container:!0,item:!0,sm:2,direction:"column",children:[Object(f.jsx)(r.a,{item:!0,color:"white",children:"SYMBOL"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"CATEGORY"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"BLOCKCHAIN"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"TGI"}),Object(f.jsx)(r.a,{item:!0,color:"white",children:"TYPE"})]}),Object(f.jsxs)(r.a,{container:!0,item:!0,sm:2,direction:"column",children:[Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:null===t||void 0===t?void 0:t.symbol}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:"Metaverse"}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:Object(h.b)(a,!0)}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:"Solana"}),Object(f.jsx)(r.a,{item:!0,color:"#56C5FF",justifyContent:"right",display:"flex",children:"unlocked"})]})]}),Object(f.jsxs)(r.a,{sm:12,marginTop:"50px",children:[Object(f.jsx)(s.a,{color:"#56C5FF",children:"35700/100000"}),Object(f.jsxs)(s.a,{position:"relative",display:"flex",children:[Object(f.jsx)(s.a,{width:"100%",height:"10px",borderRadius:2,backgroundColor:"white"}),Object(f.jsx)(s.a,{position:"absolute",left:"0px",borderRadius:2,height:"10px",width:"calc(35700/100000*100%)",backgroundColor:"#56C5FF"})]})]}),Object(f.jsxs)(r.a,{item:!0,container:!0,marginTop:"50px",children:[Object(f.jsx)(r.a,{item:!0,sm:3,color:"#56C5FF",children:"your Contribution"}),Object(f.jsx)(r.a,{item:!0,sm:3,color:"#56C5FF",children:"Personal Max"}),Object(f.jsx)(r.a,{item:!0,sm:6,color:"#56C5FF",children:"Token Price"}),Object(f.jsx)(r.a,{item:!0,sm:3,fontSize:28,color:"white",children:"$1000"}),Object(f.jsx)(r.a,{item:!0,sm:3,fontSize:28,color:"white",children:"247854"}),Object(f.jsx)(r.a,{item:!0,sm:6,fontSize:28,color:"white",children:"$0.04"})]}),b?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(r.a,{item:!0,container:!0,marginTop:"20px",children:[Object(f.jsx)(r.a,{item:!0,sm:12,color:"#56C5FF",children:"your BUSD balance: 244.64"}),Object(f.jsxs)(r.a,{item:!0,container:!0,sm:6,bgColor:"#232323",position:"relative",display:"flex",children:[Object(f.jsx)(s.a,{component:"input",padding:"5px",width:"100%",height:"50px",placeholder:"0.0",style:{backgroundColor:"rgba(255, 255, 255, 0.1)",border:"none",borderRadius:5}}),Object(f.jsx)(s.a,{component:"button",position:"absolute",right:"8px",top:"7px",style:{backgroundColor:"#56C5FF",height:"70%",border:"none",borderRadius:6},color:"white",paddingLeft:"20px",paddingRight:"20px",children:"MAX"})]})]}),Object(f.jsxs)(r.a,{marginTop:"20px",children:[Object(f.jsx)(s.a,{component:"button",style:{backgroundColor:"#56C5FF",border:"none",borderRadius:6},color:"white",padding:"10px 28px 10px 28px",children:"APPROVE"}),Object(f.jsx)(s.a,{marginLeft:"10px",component:"button",style:{backgroundColor:"#232323",borderRadius:4,border:"1px solid #56C5FF",color:"#56C5FF",padding:"10px 52px 10px 52px"},children:"BUY"})]})]}):null]})}),Object(f.jsx)(j.a,{width:"mdUp",children:Object(f.jsxs)(r.a,{container:!0,border:"1px solid #56C5FF",borderRadius:1,backgroundColor:"#232323",padding:"20px",rowSpacing:2,children:[Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",fontSize:20,justifyContent:"center",display:"flex",children:"Project Information"}),Object(f.jsxs)(r.a,{fontSize:16,children:[Object(f.jsx)(r.a,{item:!0,xs:12,color:"white",marginTop:"20px",children:"HARDCAP"}),Object(f.jsxs)(r.a,{item:!0,xs:12,color:"#56C5FF",children:[null===t||void 0===t?void 0:t.hardCap," USDC"]}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"white",marginTop:"15px",children:"OPEN TIME"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",children:"Jan 29, 2022, 9:00:00 PM"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"white",marginTop:"15px",children:"CLOSE TIME"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",children:"Jan 31, 2022, 9:00:00 PM"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"white",marginTop:"15px",children:"LISTING DATE"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",children:"Jan 31, 2022, 9:00:00 PM"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"white",marginTop:"15px",children:"DEAL"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",marginBottom:"30px",children:"INO"})]}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",fontSize:20,justifyContent:"center",display:"flex",children:"Token Information"}),Object(f.jsx)(r.a,{item:!0,xs:12,color:"#56C5FF",marginTop:"15px",marginBottom:"20px",children:"PRGC"}),Object(f.jsxs)(r.a,{xs:6,children:[Object(f.jsx)(s.a,{color:"white",children:"CATEGORY"}),Object(f.jsx)(s.a,{color:"#56C5FF",marginTop:"2px",children:"Metaverse"})]}),Object(f.jsxs)(r.a,{xs:6,children:[Object(f.jsx)(s.a,{color:"white",children:"TGI"}),Object(f.jsx)(s.a,{color:"#56C5FF",marginTop:"2px",children:"Solana"})]}),Object(f.jsxs)(r.a,{xs:6,marginTop:"10px",children:[Object(f.jsx)(s.a,{color:"white",children:"BLOCKCHAIN"}),Object(f.jsx)(s.a,{color:"#56C5FF",marginTop:"2px",children:"Solana"})]}),Object(f.jsxs)(r.a,{xs:6,marginTop:"10px",children:[Object(f.jsx)(s.a,{color:"white",children:"TYPE"}),Object(f.jsx)(s.a,{color:"#56C5FF",marginTop:"2px",children:"unlocked"})]}),Object(f.jsxs)(r.a,{xs:12,marginTop:"30px",width:"100%",children:[Object(f.jsx)(s.a,{color:"#56C5FF",children:"35700/100000"}),Object(f.jsxs)(s.a,{position:"relative",display:"flex",children:[Object(f.jsx)(s.a,{width:"100%",height:"10px",borderRadius:2,backgroundColor:"white"}),Object(f.jsx)(s.a,{position:"absolute",left:"0px",borderRadius:2,height:"10px",width:"calc(35700/100000*100%)",backgroundColor:"#56C5FF"})]})]}),Object(f.jsxs)(r.a,{item:!0,container:!0,marginTop:"50px",children:[Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:16,color:"#56C5FF",children:"your Contribution"}),Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:22,color:"white",display:"flex",justifyContent:"flex-end",children:"$1000"}),Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:16,color:"#56C5FF",children:"Personal Max"}),Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:22,color:"white",display:"flex",justifyContent:"flex-end",children:"247854"}),Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:16,color:"#56C5FF",children:"Token Price"}),Object(f.jsx)(r.a,{item:!0,xs:6,fontSize:22,color:"white",display:"flex",justifyContent:"flex-end",children:"$0.04"})]}),b?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(r.a,{item:!0,container:!0,marginTop:"20px",children:[Object(f.jsx)(r.a,{item:!0,sm:12,color:"#56C5FF",children:"your BUSD balance: 244.64"}),Object(f.jsxs)(r.a,{item:!0,container:!0,sm:6,bgColor:"#232323",position:"relative",display:"flex",children:[Object(f.jsx)(s.a,{component:"input",padding:"5px",width:"100%",height:"50px",placeholder:"0.0",style:{backgroundColor:"rgba(255, 255, 255, 0.1)",border:"none",borderRadius:5}}),Object(f.jsx)(s.a,{component:"button",position:"absolute",right:"8px",top:"7px",style:{backgroundColor:"#56C5FF",height:"70%",border:"none",borderRadius:6},color:"white",paddingLeft:"20px",paddingRight:"20px",children:"MAX"})]})]}),Object(f.jsxs)(r.a,{marginTop:"20px",children:[Object(f.jsx)(s.a,{component:"button",style:{backgroundColor:"#56C5FF",border:"none",borderRadius:6},color:"white",padding:"10px 28px 10px 28px",children:"APPROVE"}),Object(f.jsx)(s.a,{marginLeft:"10px",component:"button",style:{backgroundColor:"#232323",borderRadius:4,border:"1px solid #56C5FF",color:"#56C5FF",padding:"10px 52px 10px 52px"},children:"BUY"})]})]}):null]})})]})}function F(e){var t,i,o=e.data,n=Object(m.c)((function(e){return e.network.chainId}));return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(j.a,{width:"mdDown",children:Object(f.jsxs)(r.a,{style:{backgroundColor:"#232323",borderRadius:10,padding:"20px"},children:[Object(f.jsxs)(r.a,{container:!0,direction:"row",children:[Object(f.jsx)(r.a,{item:!0,sm:8,children:Object(f.jsx)(s.a,{component:"img",src:Object(u.e)(null===o||void 0===o||null===(t=o.ipfs)||void 0===t?void 0:t.logo),height:200})}),Object(f.jsxs)(r.a,{item:!0,sm:4,display:"flex",justifyContent:"right",paddingRight:"20px",sx:{height:"40px"},children:[Object(f.jsx)(s.a,{component:"button",style:{backgroundColor:"rgba(242, 188, 26, 0.1)",border:"none",borderRadius:8,color:"#F9C013",padding:"8px 10px"},children:Object(f.jsx)("img",{src:Object(h.a)(n),alt:null===o||void 0===o?void 0:o.name,width:25})}),Object(f.jsx)(s.a,{component:"button",marginLeft:"10px",style:{background:"#000000",border:"none",borderRadius:8,color:"#56C5FF",padding:"5px 10px"},children:null!==o&&void 0!==o&&o.whitelistable?"VC":"IDO"})]})]}),Object(f.jsxs)(r.a,{marginTop:"20px",children:[Object(f.jsx)(a.a,{component:"p",style:{fontFamily:"Segoe UI",fontSize:"48px",color:"#56C5FF"},children:null===o||void 0===o?void 0:o.name}),Object(f.jsx)(a.a,{marginTop:"15px",component:"p",style:{width:"55%",fontFamily:"Segoe UI",fontSize:"20px"},children:"Computers have their own language called Machine Code which tells them what to do. As you can see, it doesn't make a lot of sense to humans!"}),Object(f.jsx)(a.a,{marginTop:"15px",component:"p",style:{width:"55%",fontFamily:"Segoe UI",fontSize:"15px",color:"#F1F0F0"},children:"Computers have their own language called Machine Code which tells them what to do. As you can see, it doesn't make a lot of sense to humans!"})]}),Object(f.jsxs)(r.a,{marginTop:"20px",align:"center",justifyContent:"center",alignItems:"center",children:[Object(f.jsx)(a.a,{component:"p",style:{width:"55%",fontFamily:"Segoe UI",fontSize:"34px",color:"#56C5FF"}}),Object(f.jsx)(s.a,{marginTop:"30px",component:"img",src:Object(u.d)("projects-process.png")})]})]})}),Object(f.jsxs)(j.a,{width:"mdUp",children:[Object(f.jsxs)(r.a,{style:{backgroundColor:"#232323",borderRadius:10,padding:"20px"},position:"relative",children:[Object(f.jsx)(s.a,{component:"button",position:"absolute",left:"10px",top:"10px",alignItems:"center",style:{height:"40px",backgroundColor:"rgba(242, 188, 26, 0.1)",border:"none",borderRadius:8,color:"#F9C013",padding:"7px 13px"},children:Object(f.jsx)("img",{src:Object(h.a)(n),alt:null===o||void 0===o?void 0:o.name,width:25})}),Object(f.jsx)(s.a,{component:"button",position:"absolute",right:"10px",top:"10px",alignItems:"center",style:{height:"40px",background:"#000000",border:"none",borderRadius:8,color:"#56C5FF",padding:"7px 13px"},children:null!==o&&void 0!==o&&o.whitelistable?"VC":"IDO"}),Object(f.jsx)(r.a,{item:!0,sm:12,justifyContent:"center",display:"flex",children:Object(f.jsx)(s.a,{component:"img",src:Object(u.e)(null===o||void 0===o||null===(i=o.ipfs)||void 0===i?void 0:i.logo)})}),Object(f.jsx)(r.a,{item:!0,sm:12,justifyContent:"center",display:"flex",children:Object(f.jsx)(a.a,{component:"p",marginTop:"20px",style:{fontFamily:"Segoe UI",fontSize:"20px",color:"#56C5FF"},children:"ProtReality Games"})}),Object(f.jsx)(s.a,{marginTop:"15px",component:"p",textAlign:"center",style:{fontFamily:"Segoe UI",fontSize:"12px",color:"#F1F0F0"},children:"Computers have their own language called Machine Code which tells them what to do. As you can see, it doesn't make a lot of sense to humans!"}),Object(f.jsx)(s.a,{component:"button",style:{padding:"10px 5px",backgroundColor:"#56C5FF",color:"white",border:"none",borderRadius:4,fontSize:10},children:"CONNECT WALLET"}),Object(f.jsx)(s.a,{component:"button",marginLeft:"10px",style:{padding:"10px",backgroundColor:"#232323",fontSize:10,borderRadius:4,border:"1px solid #56C5FF",color:"#56C5FF"},children:"FOLLOW US"}),Object(f.jsx)(s.a,{component:"a",marginLeft:"10px",href:"#",style:{fontFamily:"Segoe UI",fontSize:"10px",color:"#56C5FF"},children:"VIEW CONTRACT"})]}),Object(f.jsxs)(r.a,{container:!0,marginTop:"20px",children:[Object(f.jsxs)(r.a,{item:!0,xs:4,paddingLeft:"10px",children:[Object(f.jsx)(s.a,{component:"img",marginLeft:"5px",src:Object(u.d)("whitelist.png")}),Object(f.jsx)(s.a,{fontSize:20,children:"Whitelist "})]}),Object(f.jsxs)(r.a,{item:!0,xs:4,paddingLeft:"15px",children:[Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("sale.png")}),Object(f.jsx)(s.a,{fontSize:20,marginLeft:"10px",children:"Sale"})]}),Object(f.jsxs)(r.a,{item:!0,xs:4,paddingLeft:"15px",children:[Object(f.jsx)(s.a,{component:"img",src:Object(u.d)("claim.png")}),Object(f.jsx)(s.a,{fontSize:20,children:"Claim"})]})]})]})]})}function y(e){e.roadmapData;var t=e.title,i=e.id,o=e.description,n=e.description_url;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(j.a,{width:"mdDown",children:Object(f.jsxs)(r.a,{container:!0,border:"1px solid #56C5FF",borderRadius:1,bgColor:"#232323",padding:"60px",rowSpacing:3,margin:"100px 0px",id:i,children:[Object(f.jsx)(r.a,{item:!0,sm:12,color:"#56C5FF",fontSize:48,children:Object(f.jsx)(s.a,{component:"div",children:t})}),Object(f.jsx)(r.a,{item:!0,sm:12,color:"#fff",fontSize:18,children:Object(f.jsx)(s.a,{component:"p",children:o})}),Object(f.jsx)(r.a,{item:!0,sm:12,color:"#56C5FF",fontSize:18,children:Object(f.jsx)(s.a,{component:"div",children:Object(f.jsx)(s.a,{component:"img",src:n,width:"100%"})})})]})}),Object(f.jsx)(j.a,{width:"mdUp",children:Object(f.jsxs)(r.a,{container:!0,border:"1px solid #56C5FF",borderRadius:1,bgColor:"#232323",padding:"20px",rowSpacing:3,margin:"35px 0px",id:i,children:[Object(f.jsx)(r.a,{item:!0,md:12,sm:12,xsm:12,width:"100%",color:"#56C5FF",fontSize:24,children:Object(f.jsx)(s.a,{component:"div",children:t})}),Object(f.jsx)(r.a,{item:!0,md:12,sm:12,xsm:12,width:"100%",color:"#56C5FF",fontSize:16,children:Object(f.jsx)(s.a,{component:"p",color:"#fff",children:o})}),Object(f.jsx)(r.a,{item:!0,md:12,sm:12,xsm:12,width:"100%",color:"#56C5FF",children:Object(f.jsx)(s.a,{component:"div",children:Object(f.jsx)(s.a,{component:"img",src:n,width:"100%"})})})]})})]})}}}]);
//# sourceMappingURL=33.40345075.chunk.js.map