const nav=document.querySelector('nav'),menu=document.querySelector('#menu');menu.onclick=()=>menu.setAttribute('aria-expanded',nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>{if(location.pathname.endsWith(a.getAttribute('href')))a.setAttribute('aria-current','page')});try{document.body.classList.toggle('light',localStorage.getItem('hs-theme')==='light')}catch(e){}document.querySelector('#theme').onclick=()=>{document.body.classList.toggle('light');try{localStorage.setItem('hs-theme',document.body.classList.contains('light')?'light':'dark')}catch(e){}};document.querySelector('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});function update(){const d=document.documentElement.scrollHeight-innerHeight;document.querySelector('#reading').style.width=(d?scrollY/d*100:100)+'%'}addEventListener('scroll',update,{passive:true});update();const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('animate');observer.unobserve(e.target)}}));document.querySelectorAll('.card').forEach(c=>observer.observe(c));// Shared visual interactions; all content remains available without animation.
const header=document.querySelector('header');function compactHeader(){header.classList.toggle('scrolled',scrollY>35)}addEventListener('scroll',compactHeader,{passive:true});compactHeader();document.querySelectorAll('header nav a[aria-current]').forEach(a=>a.classList.add('active'));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.querySelectorAll('.card').forEach((el,i)=>el.dataset.motion=['up','left','right','scale'][i%4]);const visualObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('animate');visualObserver.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.section-visual,.platform').forEach(el=>visualObserver.observe(el));
// Each page declares its own silent, looping background video in HTML.
const bgVideo=document.querySelector('#bg-video');
if(bgVideo){
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 bgVideo.defaultMuted=true;bgVideo.muted=true;bgVideo.volume=0;bgVideo.loop=true;
 function playBackground(){
  if(reduce.matches||document.hidden){bgVideo.pause();bgVideo.classList.remove('is-playing');return;}
  bgVideo.hidden=false;bgVideo.muted=true;bgVideo.volume=0;
  const play=bgVideo.play();if(play)play.catch(()=>bgVideo.classList.remove('is-playing'));
 }
 bgVideo.addEventListener('playing',()=>bgVideo.classList.add('is-playing'));
 function fallback(){bgVideo.hidden=true;bgVideo.classList.remove('is-playing')}
 bgVideo.addEventListener('error',fallback);
 bgVideo.querySelector('source')?.addEventListener('error',fallback);
 bgVideo.addEventListener('volumechange',()=>{if(!bgVideo.muted||bgVideo.volume!==0){bgVideo.muted=true;bgVideo.volume=0}});
 reduce.addEventListener('change',playBackground);document.addEventListener('visibilitychange',playBackground);
 document.addEventListener('pointerdown',()=>{if(bgVideo.paused)playBackground()},{once:true});
 playBackground();
}
