const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],a=[],l=document.querySelector("#btn-nuevo"),d=document.querySelector("#btn-pedir"),n=document.querySelector("#btn-detener"),s=document.querySelectorAll(".div-cartas"),i=document.querySelectorAll("small"),o=(t=2)=>{e=c(),a=[];for(let r=0;r<t;r++)a.push(0);i.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),d.disabled=!1,n.disabled=!1},c=()=>{e=[];for(let a=2;a<=10;a++)for(let l of t)e.push(a+l);for(let d of r)for(let n of t)e.push(d+n);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay m\xe1s cartas en la baraja";return e.pop()},$=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:"J"===t?10:"Q"===t?10:"K"===t?10:"Carta no v\xe1lida":1*t},h=(e,t)=>(a[t]=a[t]+$(e),i[t].innerText=a[t],a[t]),b=(e,t)=>{let r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),s[t].append(r)},f=()=>{let[e,t]=a;setTimeout(()=>{t<=21&&t>e||e>21?alert("Usted ha perdido"):t===e?alert("El juego ha terminado en empate"):t>21&&t>e&&alert("Felicidades, usted ha ganado")},100)},p=e=>{let t=0;do{let r=u();if(t=h(r,a.length-1),b(r,a.length-1),e>21)break}while(t<e&&e<=21);f()};return d.addEventListener("click",()=>{let e=u(),t=h(e,0);b(e,0),t>21?(console.warn("Usted ha perdido"),d.disabled=!0,n.disabled=!0,p(t)):21===t&&(console.warn("21, \xa1muy bien!"),d.disabled=!0,n.disabled=!0,p(t))}),n.addEventListener("click",()=>{d.disabled=!0,n.disabled=!0,p(a[0])}),l.addEventListener("click",()=>{console.clear(),o()}),{nuevoJuego:o}})();