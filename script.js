  // Custom cursor
  const cur=document.getElementById('cur'),curR=document.getElementById('curR');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function loop(){
    rx+=(mx-rx)*.14;ry+=(my-ry)*.14;
    cur.style.left=mx+'px';cur.style.top=my+'px';
    curR.style.left=rx+'px';curR.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.coll-card,.testi').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.2)';curR.style.transform='translate(-50%,-50%) scale(1.6)';});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';curR.style.transform='translate(-50%,-50%) scale(1)';});
  });

  // Scroll reveal
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Counter animation
  const cObs=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      const t=+e.target.dataset.t;let s=null;
      const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/2000,1),ease=1-Math.pow(1-p,3);e.target.textContent=Math.floor(ease*t).toLocaleString('fr');if(p<1)requestAnimationFrame(step);else e.target.textContent=t.toLocaleString('fr');};
      requestAnimationFrame(step);cObs.unobserve(e.target);
    }
  }),{threshold:.5});
  document.querySelectorAll('.stat-n[data-t]').forEach(el=>cObs.observe(el));

  // Form
  function handleForm(e){
    e.preventDefault();
    const btn=e.target.querySelector('.form-btn');
    btn.textContent='✓ DEMANDE REÇUE — NOUS VOUS CONTACTERONS SOUS 24H';
    btn.style.cssText='background:transparent;border:1px solid rgba(201,168,76,.4);color:#C9A84C;font-family:Cinzel,serif;font-size:11px;letter-spacing:.2em;padding:18px;cursor:none;grid-column:1/-1;';
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});
  });

  // Parallax img-break
  const ib=document.querySelector('.img-break img');
  window.addEventListener('scroll',()=>{
    if(!ib)return;
    const r=ib.closest('.img-break').getBoundingClientRect();
    const prog=-(r.top/(window.innerHeight+r.height));
    ib.style.transform=`translateY(${prog*28}%)`;
  },{passive:true});
