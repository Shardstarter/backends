(this.webpackJsonpgempad=this.webpackJsonpgempad||[]).push([[29],{1565:function(e,t,n){"use strict";var a=n(11),r=n(15),i=n(3),c=n(0),o=n(24),s=n(619),l=n(441),d=n(1039),b=n(980),u=n(383),x=Object(u.a)(),h=n(988),j=n(1),p=["className","component","disableGutters","fixed","maxWidth","classes"],g=Object(h.a)(),m=x("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat(Object(s.a)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),O=function(e){return Object(b.a)({props:e,name:"MuiContainer",defaultTheme:g})},f=function(e,t){var n=e.classes,a=e.fixed,r=e.disableGutters,i=e.maxWidth,c={root:["root",i&&"maxWidth".concat(Object(s.a)(String(i))),a&&"fixed",r&&"disableGutters"]};return Object(d.a)(c,(function(e){return Object(l.a)(t,e)}),n)};var v=n(32),w=n(16),k=n(30),S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?m:t,s=e.useThemeProps,l=void 0===s?O:s,d=e.componentName,b=void 0===d?"MuiContainer":d,u=n((function(e){var t=e.theme,n=e.ownerState;return Object(i.a)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&Object(a.a)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var a=n,r=t.breakpoints.values[a];return 0!==r&&(e[t.breakpoints.up(a)]={maxWidth:"".concat(r).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return Object(i.a)({},"xs"===n.maxWidth&&Object(a.a)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&Object(a.a)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),x=c.forwardRef((function(e,t){var n=l(e),a=n.className,c=n.component,s=void 0===c?"div":c,d=n.disableGutters,x=void 0!==d&&d,h=n.fixed,g=void 0!==h&&h,m=n.maxWidth,O=void 0===m?"lg":m,v=Object(r.a)(n,p),w=Object(i.a)({},n,{component:s,disableGutters:x,fixed:g,maxWidth:O}),k=f(w,b);return Object(j.jsx)(u,Object(i.a)({as:s,ownerState:w,className:Object(o.default)(k.root,a),ref:t},v))}));return x}({createStyledComponent:Object(w.a)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat(Object(v.a)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return Object(k.a)({props:e,name:"MuiContainer"})}});t.a=S},1570:function(e,t,n){"use strict";var a=n(15),r=n(3),i=n(0),c=n(24),o=n(1039),s=n(196),l=n(16),d=n(30),b=n(991),u=n(1),x=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],h=Object(l.a)("div",{name:"MuiDivider",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.absolute&&t.absolute,t[n.variant],n.light&&t.light,"vertical"===n.orientation&&t.vertical,n.flexItem&&t.flexItem,n.children&&t.withChildren,n.children&&"vertical"===n.orientation&&t.withChildrenVertical,"right"===n.textAlign&&"vertical"!==n.orientation&&t.textAlignRight,"left"===n.textAlign&&"vertical"!==n.orientation&&t.textAlignLeft]}})((function(e){var t=e.theme,n=e.ownerState;return Object(r.a)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(t.vars||t).palette.divider,borderBottomWidth:"thin"},n.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},n.light&&{borderColor:t.vars?"rgba(".concat(t.vars.palette.dividerChannel," / 0.08)"):Object(s.a)(t.palette.divider,.08)},"inset"===n.variant&&{marginLeft:72},"middle"===n.variant&&"horizontal"===n.orientation&&{marginLeft:t.spacing(2),marginRight:t.spacing(2)},"middle"===n.variant&&"vertical"===n.orientation&&{marginTop:t.spacing(1),marginBottom:t.spacing(1)},"vertical"===n.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},n.flexItem&&{alignSelf:"stretch",height:"auto"})}),(function(e){var t=e.theme,n=e.ownerState;return Object(r.a)({},n.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{position:"relative",width:"100%",borderTop:"thin solid ".concat((t.vars||t).palette.divider),top:"50%",content:'""',transform:"translateY(50%)"}})}),(function(e){var t=e.theme,n=e.ownerState;return Object(r.a)({},n.children&&"vertical"===n.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",top:"0%",left:"50%",borderTop:0,borderLeft:"thin solid ".concat((t.vars||t).palette.divider),transform:"translateX(0%)"}})}),(function(e){var t=e.ownerState;return Object(r.a)({},"right"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===t.textAlign&&"vertical"!==t.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})})),j=Object(l.a)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:function(e,t){var n=e.ownerState;return[t.wrapper,"vertical"===n.orientation&&t.wrapperVertical]}})((function(e){var t=e.theme,n=e.ownerState;return Object(r.a)({display:"inline-block",paddingLeft:"calc(".concat(t.spacing(1)," * 1.2)"),paddingRight:"calc(".concat(t.spacing(1)," * 1.2)")},"vertical"===n.orientation&&{paddingTop:"calc(".concat(t.spacing(1)," * 1.2)"),paddingBottom:"calc(".concat(t.spacing(1)," * 1.2)")})})),p=i.forwardRef((function(e,t){var n=Object(d.a)({props:e,name:"MuiDivider"}),i=n.absolute,s=void 0!==i&&i,l=n.children,p=n.className,g=n.component,m=void 0===g?l?"div":"hr":g,O=n.flexItem,f=void 0!==O&&O,v=n.light,w=void 0!==v&&v,k=n.orientation,S=void 0===k?"horizontal":k,C=n.role,W=void 0===C?"hr"!==m?"separator":void 0:C,R=n.textAlign,A=void 0===R?"center":R,T=n.variant,y=void 0===T?"fullWidth":T,B=Object(a.a)(n,x),F=Object(r.a)({},n,{absolute:s,component:m,flexItem:f,light:w,orientation:S,role:W,textAlign:A,variant:y}),M=function(e){var t=e.absolute,n=e.children,a=e.classes,r=e.flexItem,i=e.light,c=e.orientation,s=e.textAlign,l={root:["root",t&&"absolute",e.variant,i&&"light","vertical"===c&&"vertical",r&&"flexItem",n&&"withChildren",n&&"vertical"===c&&"withChildrenVertical","right"===s&&"vertical"!==c&&"textAlignRight","left"===s&&"vertical"!==c&&"textAlignLeft"],wrapper:["wrapper","vertical"===c&&"wrapperVertical"]};return Object(o.a)(l,b.b,a)}(F);return Object(u.jsx)(h,Object(r.a)({as:m,className:Object(c.default)(M.root,p),role:W,ref:t,ownerState:F},B,{children:l?Object(u.jsx)(j,{className:M.wrapper,ownerState:F,children:l}):null}))}));t.a=p},1772:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return k}));var a=n(4),r=n(21),i=n(23),c=n(0),o=n(70),s=n(1119),l=n.n(s),d=n(1565),b=n(56),u=n(1067),x=n(20),h=n(1570),j=n(1059),p=n(1064),g=n(229),m=n(306),O=n(444),f=n(1102),v=n(169),w=n(1);function k(){var e=Object(o.b)(),t=Object(m.a)().account,n=Object(c.useState)(0),s=Object(i.a)(n,2),k=s[0],S=s[1],C=Object(c.useState)(0),W=Object(i.a)(C,2),R=W[0],A=W[1],T=Object(c.useState)(0),y=Object(i.a)(T,2),B=y[0],F=y[1],M=Object(c.useState)(0),N=Object(i.a)(M,2),D=N[0],E=N[1],G=Object(c.useState)(""),L=Object(i.a)(G,2),I=L[0],z=L[1],U=Object(c.useState)(""),P=Object(i.a)(U,2),V=P[0],J=P[1],Y=Object(c.useState)(!0),_=Object(i.a)(Y,2),H=_[0],X=_[1],q=Object(c.useState)(!0),K=Object(i.a)(q,2),Q=K[0],Z=K[1],$=Object(o.c)((function(e){return e.network.chainId})),ee=Object(f.d)(v.l[$]),te=Object(f.e)("0x92E37eF4e20F9CFc28fb747C050CbfCFBF2Ee911"),ne=Object(f.e)("0x0d40De1c494278252060bb65bA61AD00EDF78d58");Object(c.useEffect)((function(){var e=!1;return Object(r.a)(Object(a.a)().mark((function n(){var r,i,c,o,s;return Object(a.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!$){n.next=36;break}return X(!0),e||X(!1),n.prev=3,n.next=6,ee.rewardsToken();case 6:return r=n.sent,z(r),console.log("network",r),n.next=11,ee.stakingToken();case 11:return i=n.sent,J(i),console.log("network",i),n.next=16,te.symbol();case 16:return c=n.sent,console.log(c),n.next=20,te.balanceOf(t);case 20:return o=n.sent,S(o.toString()),console.log(" _balance",o.toString()),n.next=25,ne.balanceOf(t);case 25:s=n.sent,A(s.toString()),console.log("_rewardbalance.toString()",s.toString()),Z(!1),n.next=36;break;case 31:n.prev=31,n.t0=n.catch(3),Z(!1),console.log("error:",n.t0),console.log("error",$);case 36:case"end":return n.stop()}}),n,null,[[3,31]])})))(),function(){return e=!0}}),[t,e,$,Q]);var ae=function(){var e=Object(r.a)(Object(a.a)().mark((function e(n){var r,i,c;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te.balanceOf(t);case 3:return r=e.sent,e.next=6,te.decimals();case 6:i=e.sent,c=g.a.utils.formatUnits(r.toString(),i.toString()),F(c),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("handleMaxButton",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),re=function(){var e=Object(r.a)(Object(a.a)().mark((function e(t){var n,r,i,c,o;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te.approve(ee.address,k);case 3:return n=e.sent,e.next=6,n.wait();case 6:if(r=e.sent,console.log(r),!(r.confirmations>1)){e.next=19;break}return console.log(r.confirmations),e.next=12,te.decimals();case 12:return i=e.sent,c=g.a.utils.parseUnits(B.toString(),i.toString()),e.next=16,ee.stake(c);case 16:return o=e.sent,e.next=19,o.wait();case 19:e.next=23;break;case 21:e.prev=21,e.t0=e.catch(0);case 23:case"end":return e.stop()}}),e,null,[[0,21]])})));return function(t){return e.apply(this,arguments)}}(),ie=function(){var e=Object(r.a)(Object(a.a)().mark((function e(t){var n;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("claiming"),e.next=3,ee.getReward();case 3:return n=e.sent,e.next=6,n.wait();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ce=function(){var e=Object(r.a)(Object(a.a)().mark((function e(t){var n,r,i;return Object(a.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,te.decimals();case 3:return n=e.sent,r=g.a.utils.parseUnits(D.toString(),n.toString()),e.next=7,ee.withdraw(r);case 7:return i=e.sent,e.next=10,i.wait();case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("handleUnstakeButton",e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(w.jsx)(O.a,{title:"Megacapital",children:Object(w.jsx)(d.a,{maxWidth:"md",children:H?Object(w.jsx)(l.a,{type:"Bars",color:"#00BFFF",height:30,width:30}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:6,children:Object(w.jsxs)(u.a,{sx:{marginBottom:"15px"},children:[Object(w.jsx)(x.a,{component:"img",src:"/img/catecoin.webp",sx:{width:"50px",marginRight:"10px"}}),Object(w.jsx)("h1",{children:"CateCoin"}),Object(w.jsx)("p",{children:"What is the use of Catecoin? Use Catecoin for Stable Earning and also use Catecoin to Create memes , Stake and Earn 15% APY , HODL and Earn 2% of Every Transaction What is Catecoin Address? The new contract address of Catecoin is   0xE4FAE3Faa8300810C835970b9187c268f55D998F  "})]})}),Object(w.jsx)(b.a,{item:!0,xs:6,children:Object(w.jsxs)(x.a,{sx:{paddingTop:"55px"},children:[Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:5,children:Object(w.jsx)("p",{children:"Deposit Fee"})}),Object(w.jsx)(b.a,{item:!0,xs:7,align:"right",children:Object(w.jsx)("p",{children:"None"})})]}),Object(w.jsx)(h.a,{light:!0}),Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:5,children:Object(w.jsx)("p",{children:"Withdrawl fee"})}),Object(w.jsx)(b.a,{item:!0,xs:7,align:"right",children:Object(w.jsx)("p",{children:"None"})})]}),Object(w.jsx)(h.a,{light:!0}),Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:5,children:Object(w.jsx)("p",{children:"Performance fee Time"})}),Object(w.jsx)(b.a,{item:!0,xs:7,align:"right",children:Object(w.jsx)("p",{children:"None"})})]}),Object(w.jsx)(h.a,{light:!0})]})})]}),Object(w.jsx)(x.a,{sx:{marginTop:"50px",marginBottom:"20px"},children:Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:5,children:Object(w.jsx)(j.a,{label:"Staking Amount",variant:"outlined",fullWidth:"true",type:"number",onChange:function(e){F(e.target.value)},value:B})}),Object(w.jsx)(b.a,{item:!0,xs:7,children:Object(w.jsxs)(x.a,{children:[Object(w.jsx)(p.a,{variant:"outlined",size:"large",sx:{marginRight:"10px"},onClick:ae,children:"Max"}),Object(w.jsx)(p.a,{variant:"contained",size:"large",sx:{marginRight:"10px"},onClick:re,children:"Stake"})]})})]})}),Object(w.jsx)(x.a,{sx:{marginBottom:"50px"},children:Object(w.jsxs)(b.a,{container:!0,spacing:5,children:[Object(w.jsx)(b.a,{item:!0,xs:5,children:Object(w.jsx)(j.a,{label:"Unstaking Amount",variant:"outlined",fullWidth:"true",onChange:function(e){E(e.target.value)},value:D})}),Object(w.jsx)(b.a,{item:!0,xs:7,children:Object(w.jsxs)(x.a,{children:[Object(w.jsx)(p.a,{variant:"outlined",size:"large",sx:{marginRight:"10px"},onClick:ie,children:"Claim"}),Object(w.jsx)(p.a,{variant:"contained",size:"large",sx:{marginRight:"10px"},onClick:ce,children:"Unstake"})]})})]})}),Object(w.jsx)(h.a,{light:!0}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Staking Contract Address: ",ee.address]}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Staking Token Address: ",V]}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Reward Token Address: ",I]}),Object(w.jsx)(h.a,{light:!0}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Wallet Staking Token Balance: ",k]}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Wallet Reward Token Balance: ",R]}),Object(w.jsx)(h.a,{light:!0}),Object(w.jsxs)("p",{style:{marginTop:"10px",marginBottom:"10px"},children:["Staking Amount: ",B]}),Object(w.jsx)(h.a,{light:!0})]})})})}}}]);
//# sourceMappingURL=29.eddb3dad.chunk.js.map