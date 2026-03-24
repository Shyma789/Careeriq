// js/global.js
window.addEventListener('scroll',()=>{const n=document.getElementById('mainNav');if(n)n.classList.toggle('scrolled',window.scrollY>40);});
const ro=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
function showToast(msg,type=''){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}t.textContent=msg;t.className=`toast show ${type}`;clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),3000);}
document.querySelectorAll('.sidebar-link').forEach(link=>{if(link.href===window.location.href)link.classList.add('active');});
