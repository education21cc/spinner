(this.webpackJsonpspinner=this.webpackJsonpspinner||[]).push([[0],[,,,function(e,n,t){e.exports=t(11)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a,i=t(0),r=t.n(i),s=t(2),o=t.n(s);!function(e){e.first="ease-in",e.last="ease-out",e.mid="linear",e.firstAndLast="ease-in-out"}(a||(a={}));var c=function(e){var n=Object(i.useRef)(0),t=Object(i.useRef)(null),a=Object(i.useMemo)((function(){return console.log("shufflning",e.className),l(e.data)}),[e.data]);Object(i.useEffect)((function(){t.current&&g(t.current,a,n.current)}),[a]);return r.a.createElement("div",{className:"ring ".concat(e.className),ref:t},a.map((function(n){return t=n,e.image?r.a.createElement("div",{key:t,className:"item",style:{backgroundImage:"url(".concat(t,")")}}):r.a.createElement("div",{key:t,className:"item"},t);var t})))},l=function(e){for(var n,t=Object.assign([],e),a=t.length;0!==a;){var i=Math.floor(Math.random()*a);n=t[a-=1],t[a]=t[i],t[i]=n}return t},g=function(e,n,t){for(var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.2,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a.firstAndLast,s=Math.floor(n.length/2),o=0,c=t;c<e.children.length+t;c++){var l=e.children[c%n.length];l.style.transition="top ".concat(i,"s ").concat(r),Math.abs((c-t)%(n.length-1))<2?(l.style.transition="top ".concat(i,"s ").concat(r),l.style.visibility="visible"):(l.style.transition="",l.style.visibility="hidden"),l.style.top="".concat(o>s?-234*s-234*(s+s%2-o):234*o,"px"),o++}},m=(t(8),function(e){return r.a.createElement("div",{className:"spinner"},r.a.createElement(c,{className:"ring1",data:e.data.risks,image:!0}),r.a.createElement(c,{className:"ring2",data:e.data.events}),r.a.createElement(c,{className:"ring3",data:e.data.effects}))}),d=(t(9),t(10),{userId:1,settings:{muted:!1},content:{risks:["images/aanraking.png","images/giftige.png","images/machine.png","images/snijden.png","images/spanning.png","images/vallen.png","images/zuurstof.png"],events:["Aanraking koude of hete goederen","Vergiftiging","Werken met gevaarlijke machines","Jezelf snijden","Aanraking geleiders onder spannnig","Vallen van grote hoogte","Zuurstof&shy;tekort"],effects:["Brand&shy;wonden of bevriezing","Inademing giftige stof","Ernstige verwon&shy;dingen","Snijwonden","Brand&shy;wonden en electrocutie","Verwon&shy;dingen aan het lichaam","Verstikking"]},translations:[{key:"heartLeft",value:"Stop onmiddellijk met werken (eigen veiligheid)"}],levelsCompleted:[{level:1,score:2,maxScore:2}]}),u=function(){return r.a.createElement("div",{className:"background"},r.a.createElement("div",{className:"center"},r.a.createElement(m,{data:d.content})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[3,1,2]]]);
//# sourceMappingURL=main.2b1c43a8.chunk.js.map