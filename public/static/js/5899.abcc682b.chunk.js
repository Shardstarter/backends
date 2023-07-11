"use strict";(self.webpackChunkmegacapital=self.webpackChunkmegacapital||[]).push([[5899],{15899:function(n,e,t){t.r(e),t.d(e,{default:function(){return S}});var i=t(74165),s=t(15861),r=t(29439),o=t(57689),c=t(89164),l=t(57621),d=t(20890),a=t(94721),x=t(36314),u=t(36151),h=t(16030),m=t(72791),j=t(83677),Z=t(83022),w=t(19601),f=t(63399),v=t(49133),k=t.n(v),b=t(69962),p=t(46431),g=t.n(p),y=t(80184);function S(){var n,e=(0,o.UO)(),t=(0,h.v9)((function(n){return n.liquidityLocks.liquidity})),v=(0,h.I0)(),p=(0,Z.Z)().account,S=(0,h.v9)((function(n){return n.network.chainId})),D=(0,m.useState)(!1),z=(0,r.Z)(D,2),I=z[0],L=z[1],Y=(0,f.Ds)().enqueueSnackbar,W=(0,b.Yv)();(0,m.useEffect)((function(){try{v((0,j.Bz)(S,e.token,e.owner))}catch(n){console.log("LiquidityLockDetail useEffect",n)}}),[p,v,e,S]);var C=function(){var n=(0,s.Z)((0,i.Z)().mark((function n(){var t;return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(I){n.next=18;break}return L(!0),n.prev=2,n.next=5,W.unlockLiquidity(e.token);case 5:return t=n.sent,n.next=8,t.wait();case 8:v((0,j.Bz)(S,e.token,e.owner)),Y("Unlocked successufully!",{variant:"success"}),L(!1),n.next=18;break;case 13:return n.prev=13,n.t0=n.catch(2),Y("Unlocked failed!",{variant:"error"}),L(!1),n.abrupt("return");case 18:case"end":return n.stop()}}),n,null,[[2,13]])})));return function(){return n.apply(this,arguments)}}();return null===t||0===Object.keys(t).length?(0,y.jsx)(c.Z,{maxWidth:"lg",children:(0,y.jsxs)(l.Z,{sx:{width:1,p:3,transition:"all .3s",cursor:"pointer","&:hover":{boxShadow:function(n){return n.customShadows.z24}}},children:[(0,y.jsx)(d.Z,{variant:"h4",sx:{mb:2},children:"Fetching!"}),(0,y.jsx)(a.Z,{}),(0,y.jsx)(x.Z,{sx:{mt:5}})]})}):(0,y.jsxs)(c.Z,{maxWidth:"lg",children:[(0,y.jsxs)(l.Z,{sx:{width:1,p:3,transition:"all .3s",cursor:"pointer","&:hover":{boxShadow:function(n){return n.customShadows.z24}}},children:[(0,y.jsx)(d.Z,{variant:"h4",sx:{mb:2},children:"Lock info"}),(0,y.jsx)(a.Z,{}),(0,y.jsxs)(x.Z,{sx:{mt:5},children:[(0,y.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",fontSize:"0.85rem",children:[(0,y.jsx)(d.Z,{children:"Total Amount Locked"}),(0,y.jsx)(d.Z,{children:t.amount?parseFloat((0,w.bM)(null===t||void 0===t?void 0:t.amount,null===t||void 0===t?void 0:t.decimals)).toLocaleString("en"):""})]}),(0,y.jsx)(a.Z,{sx:{my:1.5}}),(0,y.jsx)(a.Z,{sx:{my:1.5}}),(0,y.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",fontSize:"0.85rem",children:[(0,y.jsx)(d.Z,{children:"Token Address"}),(0,y.jsx)(d.Z,{children:e.token})]}),(0,y.jsx)(a.Z,{sx:{my:1.5}}),(0,y.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",fontSize:"0.85rem",children:[(0,y.jsx)(d.Z,{children:"Pair Name"}),(0,y.jsxs)(d.Z,{children:[null===t||void 0===t?void 0:t.token0_symbol,"/",null===t||void 0===t?void 0:t.token1_symbol]})]}),(0,y.jsx)(a.Z,{sx:{my:1.5}}),(0,y.jsxs)(x.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",fontSize:"0.85rem",children:[(0,y.jsx)(d.Z,{children:"Dex"}),(0,y.jsx)(d.Z,{children:null===t||void 0===t?void 0:t.name})]}),(0,y.jsx)(a.Z,{sx:{my:1.5}})]})]}),(0,y.jsxs)(l.Z,{sx:{mt:2,width:1,p:3,transition:"all .3s",cursor:"pointer","&:hover":{boxShadow:function(n){return n.customShadows.z24}}},children:[(0,y.jsx)(d.Z,{variant:"h4",sx:{mb:2},children:"Lock records"}),(0,y.jsx)(a.Z,{}),(0,y.jsxs)(x.Z,{direction:"row",sx:{mt:4},children:[(0,y.jsx)(d.Z,{fontWeight:"bold",sx:{width:.3},children:"Wallet address"}),(0,y.jsx)(d.Z,{fontWeight:"bold",sx:{width:.3},children:"Amount"}),(0,y.jsx)(d.Z,{fontWeight:"bold",sx:{width:.3},children:"Locked time"}),(0,y.jsx)(d.Z,{fontWeight:"bold",sx:{width:.3},children:"Unlock time"}),p===(null===t||void 0===t?void 0:t.owner)?(0,y.jsx)(d.Z,{fontWeight:"bold",sx:{width:.3},children:"Unlock"}):""]}),(0,y.jsxs)(x.Z,{sx:{mt:2},children:[null===t||void 0===t||null===(n=t.amounts)||void 0===n?void 0:n.map((function(n,i){return(0,y.jsxs)(x.Z,{direction:"row",alignItems:"center",fontSize:"0.85rem",children:[(0,y.jsx)(d.Z,{sx:{width:.3},children:e.owner.substring(0,5)+"..."+e.owner.substring(e.owner.length-3)}),(0,y.jsx)(d.Z,{sx:{width:.3},children:n.amount?(0,w.Fn)((0,w.bM)(n.amount,null===t||void 0===t?void 0:t.decimals)):""}),(0,y.jsx)(d.Z,{sx:{width:.3},children:(0,y.jsx)(g(),{format:"YYYY-MM-DD HH:mm",children:new Date(n.startDateTime).toISOString()})}),(0,y.jsx)(d.Z,{sx:{width:.3},children:(0,y.jsx)(g(),{format:"YYYY-MM-DD HH:mm",children:new Date(n.endDateTime).toISOString()})}),p===(null===t||void 0===t?void 0:t.owner)?n.endDateTime<=Date.now()?(0,y.jsx)(d.Z,{sx:{width:.3},children:(0,y.jsx)(u.Z,{variant:"outline",sx:{bgcolor:"primary.dark"},onClick:C,children:I?(0,y.jsx)(k(),{color:"#02FF7B",size:30}):"Unlock"})}):(0,y.jsx)(d.Z,{sx:{width:.3},children:(0,y.jsx)(u.Z,{variant:"outline",disabled:!0,children:"Unlock"})}):""]},i)})),(0,y.jsx)(a.Z,{sx:{my:1.5}})]})]})]})}}}]);
//# sourceMappingURL=5899.abcc682b.chunk.js.map