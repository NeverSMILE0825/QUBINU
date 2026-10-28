(() => {
 'use strict';
 const conf = window.QUBINU_CONFIG || {};
 const contract = String(conf.contractAddress || 'Coming Soon..').trim();
 document.querySelectorAll('[data-contract-display]').forEach(el => { el.textContent = contract; });
 document.getElementById('year').textContent = new Date().getFullYear();
 const toast = document.getElementById('toast');
 let timer;
 function notify(message) {
   toast.textContent = message;
   toast.classList.add('show');
   clearTimeout(timer);
   timer = setTimeout(() => toast.classList.remove('show'), 3000);
 }
 async function copyText(value) {
   if (navigator.clipboard && window.isSecureContext) {
     try { await navigator.clipboard.writeText(value); return true; } catch (e) { /* fallback */ }
   }
   const field = document.createElement('textarea');
   field.value = value;
   field.setAttribute('readonly','');
   Object.assign(field.style,{position:'fixed',top:'0',left:'0',opacity:'0'});
   document.body.appendChild(field);
   field.focus(); field.select();
   let ok = false;
   try { ok = document.execCommand('copy'); } catch (e) { /* show text anyway */ }
   field.remove();
   return ok;
 }
 document.querySelectorAll('[data-copy-contract]').forEach(button => button.addEventListener('click', async () => {
   const ok = await copyText(contract);
   notify(ok ? `Copied: ${contract}` : `Copy this value: ${contract}`);
   if (ok) {
     const label = button.querySelector('.copy-label');
     const previous = label.textContent;
     label.textContent = 'COPIED';
     setTimeout(() => { label.textContent = previous; }, 1700);
   }
 }));
 document.querySelectorAll('[data-social]').forEach(button => button.addEventListener('click', () => {
   const channel = button.dataset.social;
   const url = channel === 'x' ? conf.xUrl : conf.telegramUrl;
   if (typeof url === 'string' && /^https:\/\//i.test(url)) {
     window.open(url,'_blank','noopener,noreferrer');
   } else notify(`${channel === 'x' ? 'X' : 'Telegram'} community link coming soon`);
 }));
 const imageDialog = document.getElementById('image-dialog');
 const dialogImage = document.getElementById('dialog-image');
 const dialogCaption = document.getElementById('dialog-caption');
 document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
   dialogImage.src = button.dataset.image;
   dialogImage.alt = button.dataset.alt || 'Qubinu full scene';
   dialogCaption.textContent = button.dataset.alt || 'QUBINU / COMPLETE FRAME';
   imageDialog.showModal();
 }));
 imageDialog.querySelector('.dialog-close').addEventListener('click', () => imageDialog.close());
 imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
 const menu = document.getElementById('menu-toggle');
 const links = document.getElementById('nav-links');
 function toggleMenu(open) {
   links.classList.toggle('open',open);
   menu.setAttribute('aria-expanded',String(open));
   menu.setAttribute('aria-label',open ? 'Close menu' : 'Open menu');
 }
 menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
 links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
 document.addEventListener('click', e => { if (!menu.contains(e.target) && !links.contains(e.target)) toggleMenu(false); });
 document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
 const realities = {
   scientist:{number:'01', title:'THE PROFESSOR', description:'Scientifically proven to be 100% a good boy. Still trying to calculate where the treats disappeared.'},
   astronaut:{number:'02', title:'THE EXPLORER', description:'One small step for paws, one enormous leap for dogkind. Oxygen? Check. Snacks? Double check.'},
   superhero:{number:'03', title:'THE HERO', description:'Powered by quantum energy, limitless zoomies, and a highly advanced belly-rub detection system.'},
   dreamer:{number:'04', title:'THE DREAMER', description:'In this reality, the multiverse is a giant pillow and every cosmic mystery can wait until after his nap.'}
 };
 const buttons = [...document.querySelectorAll('[data-reality]')];
 function selectReality(button, focus=false) {
   const choice = realities[button.dataset.reality];
   if (!choice) return;
   buttons.forEach(b => {const active=b===button; b.classList.toggle('active',active); b.setAttribute('aria-selected',String(active)); b.tabIndex=active?0:-1;});
   document.getElementById('detail-number').textContent=choice.number;
   document.getElementById('detail-title').textContent=choice.title;
   document.getElementById('detail-description').textContent=choice.description;
   document.getElementById('dimension-detail').setAttribute('aria-labelledby',button.id);
   if (focus) button.focus();
 }
 buttons.forEach((button,i)=>{
   button.addEventListener('click',()=>selectReality(button));
   button.addEventListener('keydown', e => {
     let next;
     if(e.key==='ArrowRight') next=buttons[(i+1)%buttons.length];
     if(e.key==='ArrowLeft') next=buttons[(i+buttons.length-1)%buttons.length];
     if(e.key==='Home') next=buttons[0];
     if(e.key==='End') next=buttons[buttons.length-1];
     if(next){e.preventDefault(); selectReality(next,true);}
   });
 });
 // Use progressive enhancement so content remains visible when JS or observers are unavailable.
 if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   document.body.classList.add('js-reveal');
   const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
   },{threshold:.06,rootMargin:'0px 0px 65px 0px'});
   document.querySelectorAll('.reveal').forEach(node => observer.observe(node));
 }
 const progress = document.querySelector('.reading-progress');
 let scheduled=false;
 function updateProgress(){const end=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${end>0?Math.min(1,scrollY/end):0})`;scheduled=false;}
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}}, {passive:true});
 updateProgress();
})();
