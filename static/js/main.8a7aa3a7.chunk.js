(this.webpackJsonpspinner=this.webpackJsonpspinner||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(22)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a,r=n(0),c=n.n(r),l=n(6),o=n.n(l),i=n(7),s=n(1),u=n(4),f=n.n(u);!function(e){e.first="ease-in",e.last="ease-out",e.mid="linear",e.firstAndLast="ease-in-out"}(a||(a={}));var m,d=function(e){var t=e.disabled,n=e.initialMove,l=e.translations,o=e.onCardChanged,i=Object(r.useRef)(0),s=Object(r.useRef)(!1),u=Object(r.useRef)(null),m=Object(r.useMemo)((function(){return g(e.data)}),[e.data]),d=Object(r.useCallback)((function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.2,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.firstAndLast,n=u.current,r=i.current,c=Math.ceil(m.length/2),l=0,o=r;o<n.children.length+r;o++){var s=o%m.length;o<0&&(s+=m.length);var f=n.children[s%m.length];f.style.transition="top ".concat(e,"s ").concat(t),f.setAttribute("index",s+""),Math.abs((o-r)%(m.length-1))<2?(f.style.transition="top ".concat(e,"s ").concat(t),f.style.visibility="visible"):(f.style.transition="",f.style.visibility="hidden"),f.style.top="".concat(l>c?178*(-2*c+l+m.length%2):178*l,"px"),l++}}),[m.length]),b=Object(r.useCallback)((function(e){return e<1&&(e=+m.length),e%=m.length,u.current.children[e].classList.contains("disabled")}),[m.length]),v=Object(r.useCallback)((function(){o(function(){var e=i.current%m.length;return u.current.children[e].getAttribute("data-value")}())}),[m.length,o]),p=Object(r.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(!s.current)if(1===Math.abs(e))i.current+=e,i.current<0&&(i.current=m.length+i.current),s.current=!0,d(.2,a.firstAndLast),setTimeout((function(){return s.current=!1}),200),v();else{var t=i.current+e;s.current=!0;var n=setInterval((function(){if(i.current===t)return s.current=!1,void clearInterval(n);i.current+=e/Math.abs(e);var r=a.mid,c=.2;t-i.current===Math.abs(e)-1?(r=a.first,c/=.75):i.current===t&&(r=a.last,c/=.75),d(c,r),v()}),200)}}),[v,m.length,d]),h=Object(r.useCallback)((function(){for(var e=1;b(i.current+e);)if(++e===m.length+1)return;p(e)}),[b,m.length,p]),E=Object(r.useCallback)((function(){for(var e=-1;b(i.current+e);)if(--e===m.length-1)return;p(e)}),[b,m.length,p]);Object(r.useEffect)((function(){d(),p(n)}),[n,p,d]),Object(r.useEffect)((function(){var e=new f.a(u.current,{recognizers:[[f.a.Swipe,{direction:f.a.DIRECTION_VERTICAL}]]});e.on("swipeup",(function(e){h()})),e.on("swipedown",(function(e){E()})),e.on("panup",(function(e){console.log("panup"),h()})),e.on("pandown",(function(e){console.log("pandown"),E()})),e.on("press",(function(e){}))}),[E,h]),Object(r.useEffect)((function(){if(t&&t.length){for(var e=u.current,n=0;n<e.children.length;n++){var a=e.children[n],r=a.getAttribute("data-value");-1!==t.indexOf(r)?a.classList.add("disabled"):a.classList.remove("disabled")}p(1)}}),[t,p]);return c.a.createElement("div",{className:"ring ".concat(e.className),ref:u},m.map((function(t){return function(t){if(e.image)return c.a.createElement("div",{key:t,className:"item",style:{backgroundImage:"url(".concat(t,")")},"data-value":t});var n=(l[t]||"").replace(/&shy;/gi,"\xad");return c.a.createElement("div",{key:t,className:"item","data-value":t},n)}(t)})))},g=function(e){for(var t,n=Object.assign([],e),a=n.length;0!==a;){var r=Math.floor(Math.random()*a);t=n[a-=1],n[a]=n[r],n[r]=t}return n},b=(n(13),function(e){var t=e.data,n=e.correct,a=e.translations,l=e.onClick,o=e.onRing0Changed,i=e.onRing1Changed,s=e.onRing2Changed,u=Object(r.useMemo)((function(){return t.reduce((function(e,t){return-1===e.indexOf(t.ring1)&&e.push(t.ring1),e}),[])}),[t]),f=Object(r.useMemo)((function(){return t.reduce((function(e,t){return-1===e.indexOf(t.ring2)&&e.push(t.ring2),e}),[])}),[t]),m=Object(r.useMemo)((function(){return t.reduce((function(e,t){return-1===e.indexOf(t.ring3)&&e.push(t.ring3),e}),[])}),[t]);return c.a.createElement("div",{className:"spinner",onClick:l},c.a.createElement(d,{className:"ring1",disabled:n,initialMove:6,data:u,translations:a,onCardChanged:o,image:!0}),c.a.createElement(d,{className:"ring2",initialMove:9,data:f,translations:a,onCardChanged:i}),c.a.createElement(d,{className:"ring3",initialMove:14,data:m,translations:a,onCardChanged:s}))}),v=function(e){return c.a.createElement("button",{className:"green button check",onClick:e.onClick},"Check")},p=["","",""],h=function(e,t){switch(t.type){case"updateRing0":return Object.assign(p,e,{0:t.value});case"updateRing1":return Object.assign(p,e,{1:t.value});case"updateRing2":return Object.assign(p,e,{2:t.value})}};n(14);!function(e){e.correct="correct",e.wrong="wrong"}(m||(m={}));var E=function(e){return c.a.createElement("div",{className:"feedback ".concat(e.mode)},c.a.createElement("span",null,e.children),c.a.createElement("button",{className:"grey button continue",onClick:e.onContinue},e.continueText))};n(15);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function w(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var y=c.a.createElement("defs",null,c.a.createElement("style",null,".a{fill:#fff;}.a,.b{stroke:#283583;stroke-linecap:round;stroke-linejoin:round;stroke-width:0.75px;}.b{fill:none;}")),j=c.a.createElement("title",null,"Back"),k=c.a.createElement("circle",{className:"a",cx:15.02,cy:15.02,r:14.65}),x=c.a.createElement("path",{className:"b",d:"M11.64,16",transform:"translate(-0.97 -0.93)"}),N=c.a.createElement("path",{className:"b",d:"M11.63,16",transform:"translate(-0.97 -0.93)"}),C=c.a.createElement("path",{className:"b",d:"M20.38,22.88",transform:"translate(-0.97 -0.93)"}),R=c.a.createElement("line",{className:"b",x1:19.39,y1:8.16,x2:10.65,y2:15.02}),T=c.a.createElement("line",{className:"b",x1:19.39,y1:21.98,x2:10.65,y2:15.11}),M=function(e){var t=e.svgRef,n=e.title,a=w(e,["svgRef","title"]);return c.a.createElement("svg",O({width:30.04,height:30.04,viewBox:"0 0 30.04 30.04",ref:t},a),y,void 0===n?j:n?c.a.createElement("title",null,n):null,k,x,N,C,R,T)},S=c.a.forwardRef((function(e,t){return c.a.createElement(M,O({svgRef:t},e))})),A=(n.p,function(e){var t=e.gameDataReceived,n=e.disableBackButton,a=function(e){if(window.hasOwnProperty("webkit")&&window.webkit.hasOwnProperty("messageHandlers")){var t=JSON.stringify(e);webkit.messageHandlers.cordova_iab.postMessage(t)}else window.parent.postMessage(e,"*")};return Object(r.useEffect)((function(){var e;return e=setInterval((function(){window.GAMEDATA&&(clearInterval(e),t(window.GAMEDATA))}),250),window.setGameData=function(e){a({type:"setGameData",data:e})},window.getGameData=function(){return window.GAMEDATA},function(){clearInterval(e)}}),[t]),!0===n?null:c.a.createElement("div",{className:"close"},c.a.createElement(S,{onClick:function(){a({type:"back"})}}))}),L=(n(16),function(e){return c.a.createElement("div",{className:"basedialog ".concat(e.className)},e.children)});function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function P(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var D=c.a.createElement("defs",null,c.a.createElement("style",null,"\n            .star-empty {\n                fill: #f8f8f8;\n                stroke: #b0b0b0;\n                stroke-width: 3px;\n            }\n        ")),B=c.a.createElement("path",{className:"star-empty",d:"M67.517,0l21.1,42.2,46.418,6.752L101.275,81.864l7.6,46.418L67.517,106.339,26.163,128.282l7.6-46.418L0,48.95,46.418,42.2Z",transform:"translate(3.223 3.354)"}),G=function(e){var t=e.svgRef,n=e.title,a=P(e,["svgRef","title"]);return c.a.createElement("svg",I({width:141.478,height:134.378,viewBox:"0 0 141.478 134.378",ref:t},a),n?c.a.createElement("title",null,n):null,D,B)},H=c.a.forwardRef((function(e,t){return c.a.createElement(G,I({svgRef:t},e))})),J=(n.p,n(17),function(e){return c.a.createElement(L,{className:"intro-dialog"},c.a.createElement("div",{className:"top"},c.a.createElement("h1",null,e.headerText)),c.a.createElement("div",{className:"center"},c.a.createElement("section",null,e.descriptionText)),c.a.createElement("div",{className:"bottom"},c.a.createElement(H,{className:"star"}),c.a.createElement("span",{className:"stars-to-gain"},e.starsToGainText),c.a.createElement("button",{className:"green button start",onClick:e.onStart},e.startText)))});function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function W(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var Z,z=c.a.createElement("defs",null,c.a.createElement("style",null,"\n            .star-full {\n                fill: #fcda00;\n            }\n        ")),F=c.a.createElement("path",{className:"star-full",d:"M67.517,0l21.1,42.2,46.418,6.752L101.275,81.864l7.6,46.418L67.517,106.339,26.163,128.282l7.6-46.418L0,48.95,46.418,42.2Z"}),U=function(e){var t=e.svgRef,n=e.title,a=W(e,["svgRef","title"]);return c.a.createElement("svg",_({width:135.033,height:128.282,viewBox:"0 0 135.033 128.282",ref:t},a),n?c.a.createElement("title",null,n):null,z,F)},V=c.a.forwardRef((function(e,t){return c.a.createElement(U,_({svgRef:t},e))})),$=(n.p,n(18),function(e){var t=e.total,n=e.mistakes,a=t;console.log("mistakes: ".concat(n)),console.log("total: ".concat(t)),Object(r.useEffect)((function(){window.setLevelScore&&window.setLevelScore(1,a,t)}),[a,t]);return c.a.createElement(L,{className:"complete-dialog"},c.a.createElement("div",{className:"block"},c.a.createElement("h1",null,e.headerText)),c.a.createElement("div",{className:"block score"},e.scoreText.replace("{0}",a.toString()).replace("{1}",t.toString())),c.a.createElement("div",{className:"block stars"},function(){for(var e=[],n=0;n<t;n++)e.push(c.a.createElement("div",{key:"star".concat(n)},c.a.createElement(H,null),n<a&&c.a.createElement(V,{className:"full"})));return e}()),c.a.createElement("div",{className:"bottom"},c.a.createElement("button",{className:"green button",onClick:e.onTryAgain},e.tryAgainText),c.a.createElement("button",{className:"red button",onClick:e.onExit},e.exitText)))}),q=(n(19),function(){return c.a.createElement("div",{className:"loading-background"},c.a.createElement("div",{className:"white-block"},c.a.createElement("div",{className:"outset"}),c.a.createElement("div",{className:"blue-block"})),c.a.createElement("div",{className:"subtext"},"Stay curious"))});n(20),n(21);!function(e){e[e.intro=0]="intro",e[e.normal=2]="normal",e[e.wrong=4]="wrong",e[e.correct=8]="correct",e[e.complete=16]="complete"}(Z||(Z={}));var K=function(){var e=Object(r.useState)(Z.intro),t=Object(s.a)(e,2),n=t[0],a=t[1],l=Object(r.useState)(),o=Object(s.a)(l,2),u=o[0],f=o[1],d=Object(r.useState)(),g=Object(s.a)(d,2),O=g[0],w=g[1],y=Object(r.useState)({}),j=Object(s.a)(y,2),k=j[0],x=j[1],N=Object(r.useState)([]),C=Object(s.a)(N,2),R=C[0],T=C[1],M=Object(r.useState)(0),S=Object(s.a)(M,2),L=S[0],I=S[1],P=Object(r.useReducer)(h,p),D=Object(s.a)(P,2),B=D[0],G=D[1],H=Object(r.useState)(!0),_=Object(s.a)(H,2),W=_[0],z=_[1],F=Object(r.useCallback)((function(e){G({type:"updateRing0",value:e})}),[]),U=Object(r.useCallback)((function(e){G({type:"updateRing1",value:e})}),[]),V=Object(r.useCallback)((function(e){G({type:"updateRing2",value:e})}),[]),K=Object(r.useCallback)((function(e){if(f(e.content),w(e.levelsCompleted),z(!1),e.translations){var t=e.translations.reduce((function(e,t){return e[t.key]=t.value,e}),{});x(t)}}),[]);Object(r.useEffect)((function(){0}),[K]);var Q=function(){a(Z.normal)},X=Object(r.useCallback)((function(){!function(e){if(window.hasOwnProperty("webkit")&&window.webkit.hasOwnProperty("messageHandlers")){var t=JSON.stringify(e);webkit.messageHandlers.cordova_iab.postMessage(t)}else window.parent.postMessage(e,"*")}({type:"exit"})}),[]);Object(r.useEffect)((function(){n===Z.normal&&R.length===(null===u||void 0===u?void 0:u.length)&&a(Z.complete)}),[R,u,n]);var Y=Object(r.useMemo)((function(){var e,t=(null===O||void 0===O||null===(e=O[0])||void 0===e?void 0:e.score)||0,n=(null===u||void 0===u?void 0:u.length)||0;return(""+k["intro-stars-to-gain"]).replace("{0}",""+t).replace("{1}",""+n)}),[u,O,k]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(A,{gameDataReceived:K}),W&&c.a.createElement(q,null),c.a.createElement("div",{className:""},c.a.createElement("div",{className:"app-center"},n===Z.intro&&!!u&&c.a.createElement(J,{onStart:function(){a(Z.normal)},headerText:k["intro-header"],descriptionText:k["intro-description"],starsToGainText:Y,startText:k["intro-start"]}),n===Z.complete&&c.a.createElement($,{onTryAgain:function(){a(Z.normal),I(0),T([])},onExit:X,total:(null===u||void 0===u?void 0:u.length)||0,mistakes:L,headerText:k["complete-header"],scoreText:k["complete-score"],tryAgainText:k["complete-try-again"],exitText:k["complete-exit"]}),u&&!!(n&(Z.normal|Z.wrong|Z.correct))&&c.a.createElement(b,{data:u,correct:R,translations:k,onClick:function(){a(Z.normal)},onRing0Changed:F,onRing1Changed:U,onRing2Changed:V}),n===Z.normal&&c.a.createElement(v,{onClick:function(){u&&(window.DEBUG_CHEAT||u.some((function(e){return e.ring1===B[0]&&e.ring2===B[1]&&e.ring3===B[2]}))?(a(Z.correct),T([].concat(Object(i.a)(R),[B[0]]))):(a(Z.wrong),I(L+1)))}}),n===Z.correct&&c.a.createElement(E,{mode:m.correct,onContinue:Q,continueText:k["button-continue"]},k["feedback-correct"]),n===Z.wrong&&c.a.createElement(E,{mode:m.wrong,onContinue:Q,continueText:k["button-continue"]},k["feedback-wrong"]))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.8a7aa3a7.chunk.js.map