// js/landing.js
function countUp(id,target,decimals,suffix){const el=document.getElementById(id);if(!el)return;let v=0,steps=80,inc=target/steps;const t=setInterval(()=>{v=Math.min(v+inc,target);el.innerHTML=(decimals?v.toFixed(1):Math.round(v))+(suffix||'');if(v>=target)clearInterval(t);},18);}
const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){countUp('cnt1',1284,0,'');countUp('cnt2',4800,0,'');countUp('cnt3',94,0,'<span>%</span>');countUp('cnt4',10000,0,'<span>+</span>');countUp('s1',94,0,'<span>%</span>');countUp('s2',3,0,'<span>x</span>');countUp('s3',10000,0,'<span>+</span>');io.disconnect();}},{threshold:.2});
const impEl=document.getElementById('cnt1');if(impEl)io.observe(impEl);
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});});
