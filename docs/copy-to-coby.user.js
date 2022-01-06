// ==UserScript==
// @name        Copy to Coby
// @version     1.0.0
// @author      kabo2468
// @description Copy to Coby
// @supportURL  https://github.com/kabo2468/user-css-script/issues
// @match       http*://*/*
// @namespace   kabo2468.ctcujs
// @downloadURL https://kabo2468.github.io/user-css-script/copy-to-coby.user.js
// @updateURL   https://kabo2468.github.io/user-css-script/copy-to-coby.meta.js
// @homepageURL https://kabo2468.github.io/user-css-script/
// ==/UserScript==

window.onload=function(){const t=document.body.children;let n=Array.from(t);setTimeout((()=>{const t=setInterval((function(){n=function(t){const n=t.filter((t=>t.textContent));for(let t=0;t<n.length;t++){const t=n[0];try{t.innerHTML=t.innerHTML.replace(/コピー/g,"コビー")}catch(t){console.error("CtC.user.js",t)}n.shift()}return n.flatMap((t=>Array.from(t.children)))}(n),0===n.length&&clearInterval(t)}),100)}),1e3)};