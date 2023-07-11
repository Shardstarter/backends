"use strict";(self.webpackChunkmegacapital=self.webpackChunkmegacapital||[]).push([[9055],{57621:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(87462),o=n(63366),i=n(72791),a=n(28182),s=n(94419),u=n(66934),c=n(31402),p=n(35527),d=n(75878),l=n(21217);function f(e){return(0,l.Z)("MuiCard",e)}(0,d.Z)("MuiCard",["root"]);var h=n(80184),x=["className","raised"],v=(0,u.ZP)(p.Z,{name:"MuiCard",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(){return{overflow:"hidden"}})),m=i.forwardRef((function(e,t){var n=(0,c.Z)({props:e,name:"MuiCard"}),i=n.className,u=n.raised,p=void 0!==u&&u,d=(0,o.Z)(n,x),l=(0,r.Z)({},n,{raised:p}),m=function(e){var t=e.classes;return(0,s.Z)({root:["root"]},f,t)}(l);return(0,h.jsx)(v,(0,r.Z)({className:(0,a.Z)(m.root,i),elevation:p?8:void 0,ref:t,ownerState:l},d))}))},89164:function(e,t,n){n.d(t,{Z:function(){return k}});var r=n(4942),o=n(63366),i=n(87462),a=n(72791),s=n(28182),u=n(27312),c=n(21217),p=n(94419),d=n(86083),l=n(93457),f=n(85080),h=n(80184),x=["className","component","disableGutters","fixed","maxWidth","classes"],v=(0,f.Z)(),m=(0,l.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,u.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),b=function(e){return(0,d.Z)({props:e,name:"MuiContainer",defaultTheme:v})};var g=n(14036),w=n(66934),y=n(31402),Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?m:t,d=e.useThemeProps,l=void 0===d?b:d,f=e.componentName,v=void 0===f?"MuiContainer":f,g=n((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&(0,r.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var r=n,o=t.breakpoints.values[r];return 0!==o&&(e[t.breakpoints.up(r)]={maxWidth:"".concat(o).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({},"xs"===n.maxWidth&&(0,r.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&(0,r.Z)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),w=a.forwardRef((function(e,t){var n=l(e),r=n.className,a=n.component,d=void 0===a?"div":a,f=n.disableGutters,m=void 0!==f&&f,b=n.fixed,w=void 0!==b&&b,y=n.maxWidth,Z=void 0===y?"lg":y,k=(0,o.Z)(n,x),j=(0,i.Z)({},n,{component:d,disableGutters:m,fixed:w,maxWidth:Z}),_=function(e,t){var n=e.classes,r=e.fixed,o=e.disableGutters,i=e.maxWidth,a={root:["root",i&&"maxWidth".concat((0,u.Z)(String(i))),r&&"fixed",o&&"disableGutters"]};return(0,p.Z)(a,(function(e){return(0,c.Z)(t,e)}),n)}(j,v);return(0,h.jsx)(g,(0,i.Z)({as:d,ownerState:j,className:(0,s.Z)(_.root,r),ref:t},k))}));return w}({createStyledComponent:(0,w.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,g.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,y.Z)({props:e,name:"MuiContainer"})}}),k=Z},36314:function(e,t,n){n.d(t,{Z:function(){return O}});var r=n(4942),o=n(63366),i=n(87462),a=n(72791),s=n(28182),u=n(82466),c=n(94419),p=n(21217),d=n(93457),l=n(86083),f=n(78519),h=n(85080),x=n(51184),v=n(45682),m=n(80184),b=["component","direction","spacing","divider","children","className","useFlexGap"],g=(0,h.Z)(),w=(0,d.Z)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return t.root}});function y(e){return(0,l.Z)({props:e,name:"MuiStack",defaultTheme:g})}function Z(e,t){var n=a.Children.toArray(e).filter(Boolean);return n.reduce((function(e,r,o){return e.push(r),o<n.length-1&&e.push(a.cloneElement(t,{key:"separator-".concat(o)})),e}),[])}var k=function(e){var t=e.ownerState,n=e.theme,o=(0,i.Z)({display:"flex",flexDirection:"column"},(0,x.k9)({theme:n},(0,x.P$)({values:t.direction,breakpoints:n.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var a=(0,v.hB)(n),s=Object.keys(n.breakpoints.values).reduce((function(e,n){return("object"===typeof t.spacing&&null!=t.spacing[n]||"object"===typeof t.direction&&null!=t.direction[n])&&(e[n]=!0),e}),{}),c=(0,x.P$)({values:t.direction,base:s}),p=(0,x.P$)({values:t.spacing,base:s});"object"===typeof c&&Object.keys(c).forEach((function(e,t,n){if(!c[e]){var r=t>0?c[n[t-1]]:"column";c[e]=r}}));o=(0,u.Z)(o,(0,x.k9)({theme:n},p,(function(e,n){return t.useFlexGap?{gap:(0,v.NA)(a,e)}:{"& > :not(style) + :not(style)":(0,r.Z)({margin:0},"margin".concat((o=n?c[n]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[o])),(0,v.NA)(a,e))};var o})))}return o=(0,x.dt)(n.breakpoints,o)};var j=n(66934),_=n(31402),F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?w:t,r=e.useThemeProps,u=void 0===r?y:r,d=e.componentName,l=void 0===d?"MuiStack":d,h=n(k),x=a.forwardRef((function(e,t){var n=u(e),r=(0,f.Z)(n),a=r.component,d=void 0===a?"div":a,x=r.direction,v=void 0===x?"column":x,g=r.spacing,w=void 0===g?0:g,y=r.divider,k=r.children,j=r.className,_=r.useFlexGap,F=void 0!==_&&_,O=(0,o.Z)(r,b),P={direction:v,spacing:w,useFlexGap:F},S=(0,c.Z)({root:["root"]},(function(e){return(0,p.Z)(l,e)}),{});return(0,m.jsx)(h,(0,i.Z)({as:d,ownerState:P,ref:t,className:(0,s.Z)(S.root,j)},O,{children:y?Z(k,y):k}))}));return x}({createStyledComponent:(0,j.ZP)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return t.root}}),useThemeProps:function(e){return(0,_.Z)({props:e,name:"MuiStack"})}}),O=F},93457:function(e,t,n){var r=(0,n(44046).ZP)();t.Z=r},49133:function(e,t,n){var r=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},i=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var u,c,p,d,l=s(n(72791)),f=n(52554),h=n(52098),x=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.thickness=function(){var e=t.props.size;return h.parseLengthAndUnit(e).value/5},t.lat=function(){var e=t.props.size;return(h.parseLengthAndUnit(e).value-t.thickness())/2},t.offset=function(){return t.lat()-t.thickness()},t.color=function(){var e=t.props.color;return h.calculateRgba(e,.75)},t.before=function(){var e=t.props.size,n=t.color(),r=t.lat(),i=t.thickness(),a=t.offset();return f.keyframes(u||(u=o(["\n      0% {width: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      35% {width: ",";box-shadow: 0 ","px ",", 0 ","px ","}\n      70% {width: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      100% {box-shadow: ","px ","px ",", ","px ","px ","}\n    "],["\n      0% {width: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      35% {width: ",";box-shadow: 0 ","px ",", 0 ","px ","}\n      70% {width: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      100% {box-shadow: ","px ","px ",", ","px ","px ","}\n    "])),i,r,-a,n,-r,a,n,h.cssValue(e),-a,n,a,n,i,-r,-a,n,r,a,n,r,-a,n,-r,a,n)},t.after=function(){var e=t.props.size,n=t.color(),r=t.lat(),i=t.thickness(),a=t.offset();return f.keyframes(c||(c=o(["\n      0% {height: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      35% {height: ",";box-shadow: ","px 0 ",", ","px 0 ","}\n      70% {height: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      100% {box-shadow: ","px ","px ",", ","px ","px ","}\n    "],["\n      0% {height: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      35% {height: ",";box-shadow: ","px 0 ",", ","px 0 ","}\n      70% {height: ","px;box-shadow: ","px ","px ",", ","px ","px ","}\n      100% {box-shadow: ","px ","px ",", ","px ","px ","}\n    "])),i,a,r,n,-a,-r,n,h.cssValue(e),a,n,-a,n,i,a,-r,n,-a,r,n,a,r,n,-a,-r,n)},t.style=function(e){var n=t.props,r=n.size,i=n.speedMultiplier,a=h.parseLengthAndUnit(r),s=a.value,u=a.unit;return f.css(p||(p=o(['\n      position: absolute;\n      content: "";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ',";\n      height: ",";\n      border-radius: ",";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: "," ","s infinite;\n    "],['\n      position: absolute;\n      content: "";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ',";\n      height: ",";\n      border-radius: ",";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: "," ","s infinite;\n    "])),""+s/5+u,""+s/5+u,""+s/10+u,1===e?t.before():t.after(),2/i)},t.wrapper=function(){var e=t.props.size;return f.css(d||(d=o(["\n      position: relative;\n      width: ",";\n      height: ",";\n      transform: rotate(165deg);\n    "],["\n      position: relative;\n      width: ",";\n      height: ",";\n      transform: rotate(165deg);\n    "])),h.cssValue(e),h.cssValue(e))},t}return r(t,e),t.prototype.render=function(){var e=this.props,t=e.loading,n=e.css;return t?f.jsx("span",{css:[this.wrapper(),n]},f.jsx("span",{css:this.style(1)}),f.jsx("span",{css:this.style(2)})):null},t.defaultProps=h.sizeDefaults(50),t}(l.PureComponent);t.default=x},50779:function(e,t){var n;Object.defineProperty(t,"__esModule",{value:!0}),t.calculateRgba=void 0,function(e){e.maroon="#800000",e.red="#FF0000",e.orange="#FFA500",e.yellow="#FFFF00",e.olive="#808000",e.green="#008000",e.purple="#800080",e.fuchsia="#FF00FF",e.lime="#00FF00",e.teal="#008080",e.aqua="#00FFFF",e.blue="#0000FF",e.navy="#000080",e.black="#000000",e.gray="#808080",e.silver="#C0C0C0",e.white="#FFFFFF"}(n||(n={}));t.calculateRgba=function(e,t){if(Object.keys(n).includes(e)&&(e=n[e]),"#"===e[0]&&(e=e.slice(1)),3===e.length){var r="";e.split("").forEach((function(e){r+=e,r+=e})),e=r}return"rgba("+(e.match(/.{2}/g)||[]).map((function(e){return parseInt(e,16)})).join(", ")+", "+t+")"}},52098:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(20043),t),o(n(50779),t),o(n(68945),t)},20043:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.heightWidthRadiusDefaults=t.heightWidthDefaults=t.sizeMarginDefaults=t.sizeDefaults=void 0;var n={loading:!0,color:"#000000",css:"",speedMultiplier:1};function r(e){return Object.assign({},n,{size:e})}function o(e,t){return Object.assign({},n,{height:e,width:t})}t.sizeDefaults=r,t.sizeMarginDefaults=function(e){return Object.assign({},r(e),{margin:2})},t.heightWidthDefaults=o,t.heightWidthRadiusDefaults=function(e,t,n){return void 0===n&&(n=2),Object.assign({},o(e,t),{radius:n,margin:2})}},68945:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.cssValue=t.parseLengthAndUnit=void 0;var n={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function r(e){if("number"===typeof e)return{value:e,unit:"px"};var t,r=(e.match(/^[0-9.]*/)||"").toString();t=r.includes(".")?parseFloat(r):parseInt(r,10);var o=(e.match(/[^0-9]*$/)||"").toString();return n[o]?{value:t,unit:o}:(console.warn("React Spinners: "+e+" is not a valid css value. Defaulting to "+t+"px."),{value:t,unit:"px"})}t.parseLengthAndUnit=r,t.cssValue=function(e){var t=r(e);return""+t.value+t.unit}}}]);
//# sourceMappingURL=9055.98fd0e79.chunk.js.map