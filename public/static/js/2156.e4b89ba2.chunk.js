"use strict";(self.webpackChunkmegacapital=self.webpackChunkmegacapital||[]).push([[2156],{69124:function(n,e,t){t.r(e);var r=t(1413),o=t(74165),i=t(15861),a=t(29439),c=t(38264),s=t(61889),p=t(78595),d=t(64554),l=t(10096),x=t(33017),m=t(57689),u=t(11087),h=t(8238),g=t(12937),j=(t(31483),t(87868),t(61824)),Z=t(72791),f=t(16030),b=t(83022),P=t(18422),w=t(38720),C=t(80184);e.default=function(){var n=(0,Z.useState)(!1),e=(0,a.Z)(n,2),t=e[0],F=e[1],k=(0,m.TH)().pathname,v=(0,f.I0)(),T=(0,b.Z)().account,y=(0,Z.useState)(0),R=(0,a.Z)(y,2),B=R[0],S=(R[1],(0,Z.useState)(!0)),D=(0,a.Z)(S,2),q=(D[0],D[1]),N=(0,Z.useState)([]),U=(0,a.Z)(N,2),z=U[0],L=U[1],O=(0,f.v9)((function(n){return n.network.chainId}));return(0,Z.useEffect)((function(){var n=!1;return(0,i.Z)((0,o.Z)().mark((function e(){var t,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return q(!0),e.next=3,v((0,P.d2)(O,B,T));case 3:return e.next=5,w.Z.getDeals();case 5:"OK"===(t=e.sent).statusText&&((r=t.data.pools).map((function(n){n.privacy=null!==n&&void 0!==n&&n.whitelistable?"Private":"Public",n.tag=null===n||void 0===n?void 0:n.deal;var e=new Date(n.startDateTime),t=new Date(n.endDateTime),r=new Date;r<e?n.status=1:r<=t?n.status=2:r>t&&(n.status=3)})),L(r),console.log(z)),n||q(!1);case 8:case"end":return e.stop()}}),e)})))(),function(){return n=!0}}),[T,v,O,B]),(0,C.jsxs)(j.Z,{style:{backgroundColor:"#171819"},children:[(0,C.jsx)(c.Jh,{width:"mdDown",children:(0,C.jsxs)(s.ZP,{paddingLeft:"14%",paddingRight:"14%",paddingTop:"30px",children:[(0,C.jsx)(p.Z,{open:t,onClose:function(){return F(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,C.jsx)(d.Z,{margin:"150px 14% 0px 14%",style:{backgroundColor:"rgba(35, 35, 35, 0.5)",blurRadius:12},children:(0,C.jsx)(l.Z,{})})}),(0,C.jsx)(s.ZP,{container:!0,direction:"row",align:"center",justifyContent:"center",children:x.vp.map((function(n){var e=n.id,t=n.link,r=n.title,o=k===t?"light":"dark";return(0,C.jsx)(d.Z,{component:u.rU,to:t,className:"btn btn-".concat(o," text-info mx-1"),children:r},e)}))}),(0,C.jsx)(s.ZP,{align:"center",justifyContent:"center",children:(0,C.jsx)(d.Z,{component:"img",marginTop:"30px",src:(0,h.qR)("projects.png")})}),(0,C.jsxs)(s.ZP,{container:!0,direction:"row",marginTop:"90px",marginBottom:"50px",gap:1,children:[(0,C.jsx)(s.ZP,{item:!0,container:!0,md:8,justifyContent:"flex-end",children:(0,C.jsx)(d.Z,{component:"button",className:"btn btn-dark text-info mx-1",children:(0,C.jsx)(d.Z,{component:"a",href:"/calender",sx:{textDecoration:"none"},children:(0,C.jsx)(d.Z,{component:"img",src:(0,h.qR)("Calendar.png")})})})}),(0,C.jsxs)(s.ZP,{item:!0,md:3.5,position:"relative",display:"flex",children:[(0,C.jsx)(d.Z,{component:"input",placeholder:"Search...",borderRadius:1,style:{paddingLeft:"10px",height:"50px",width:"100%",border:"none",backgroundColor:"rgba(255, 255, 255, 0.1)"}}),(0,C.jsx)(d.Z,{component:"button",border:"none",borderRadius:1,height:"40px",width:"90px",position:"absolute",right:"10px",top:"5px",style:{backgroundColor:"#56C5FF",color:"white"},children:"Search"})]})]}),(0,C.jsx)(d.Z,{component:"h2",color:"#00BFFF",marginTop:"40px",children:"Projects Open Now"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.map((function(n,e){if(2==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))}),(0,C.jsx)(d.Z,{component:"h2",color:"#00BFFF",marginTop:"40px",children:"Projects Upcoming"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.length>0&&z.map((function(n,e){if(1==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))}),(0,C.jsx)(d.Z,{component:"h2",color:"#00BFFF",marginTop:"40px",children:"Projects Closed"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.map((function(n,e){if(3==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))})]})}),(0,C.jsx)(c.Jh,{width:"mdUp",children:(0,C.jsxs)(s.ZP,{paddingLeft:"5%",paddingRight:"5%",paddingTop:"30px",children:[(0,C.jsx)(s.ZP,{container:!0,direction:"row",align:"center",justifyContent:"center",children:x.vp.map((function(n){var e=n.id,t=n.link,r=n.title,o=k===t?"light":"dark";return(0,C.jsx)(d.Z,{component:u.rU,to:t,className:"btn btn-".concat(o," text-info mx-1"),children:r},e)}))}),(0,C.jsx)(s.ZP,{align:"center",justifyContent:"center",children:(0,C.jsx)(d.Z,{component:"img",marginTop:"30px",src:(0,h.qR)("projects.png")})}),(0,C.jsxs)(s.ZP,{container:!0,marginBottom:"20px",children:[(0,C.jsx)(s.ZP,{item:!0,xs:2,marginTop:"15px",children:(0,C.jsx)("a",{href:"/src/pages/PhoneCalendar",children:(0,C.jsx)(d.Z,{component:"button",href:"/phonecalendar",padding:"10px",backgroundColor:"rgba(255, 255, 255, 0.1)",border:"none",borderRadius:.5,children:(0,C.jsx)(d.Z,{component:"img",src:(0,h.qR)("Calendar.png")})})})}),(0,C.jsx)(s.ZP,{item:!0,xs:2,marginTop:"15px",children:(0,C.jsx)(d.Z,{component:"button",padding:"10px",backgroundColor:"rgba(255, 255, 255, 0.1)",border:"none",borderRadius:.5,children:(0,C.jsx)(d.Z,{component:"img",src:(0,h.qR)("Search.png")})})})]}),(0,C.jsx)(s.ZP,{item:!0,xs:8,component:"h2",color:"#00BFFF",fontSize:18,marginTop:"20px",marginBottom:"20px",children:"Projects Open Now"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.map((function(n,e){if(2==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))}),(0,C.jsx)(s.ZP,{item:!0,xs:8,component:"h2",color:"#00BFFF",fontSize:18,marginTop:"20px",marginBottom:"20px",children:"Projects Upcoming"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.map((function(n,e){if(1==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))}),(0,C.jsx)(s.ZP,{item:!0,xs:8,component:"h2",color:"#00BFFF",fontSize:18,marginTop:"20px",marginBottom:"20px",children:"Projects Closed"}),(0,C.jsx)(s.ZP,{container:!0,spacing:2,children:z.map((function(n,e){if(3==n.status)return(0,C.jsx)(g.Z,(0,r.Z)({},n),e)}))})]})})]})}}}]);
//# sourceMappingURL=2156.e4b89ba2.chunk.js.map