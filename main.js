(function(){
var D=window.SITE,$=function(s){return document.querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))},esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,mk={pub:'m-pub',acc:'m-acc',rev:'m-rev'};
$('#yr').textContent=new Date().getFullYear();
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}}
function toggleTheme(){setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark')}
$('#theme').onclick=toggleTheme;
$('#burger').onclick=function(){var o=$('#links').classList.toggle('open');this.setAttribute('aria-expanded',o)};
window.addEventListener('scroll',function(){var h=document.documentElement;$('#prog').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'},{passive:true});
/* page transitions */
document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download')||e.metaKey||e.ctrlKey)return;var h=a.getAttribute('href');if(/^(https?:|mailto:|#)/.test(h))return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=h},230)});
window.addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
function cardsFx(){
 $$('.spot').forEach(function(c){if(c._fx)return;c._fx=1;c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');if(c.classList.contains('card')&&c.parentNode.id==='bento'&&!RM){var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateY('+x*7+'deg) rotateX('+-y*7+'deg) translateY(-4px)'}});c.addEventListener('pointerleave',function(){if(c.parentNode.id==='bento')c.style.transform=''})});
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
function reveal(){$$('.sec .grid3>*,.sec .grid2>*,.tl li,.stat,.tile,.lab,.lab-t,.shead,.themes>*,.links li,.form,.about>*,.pubs li,.bento>*').forEach(function(el,i){if(el._rv)return;el._rv=1;el.classList.add('rv');el.style.setProperty('--d',i%4);io.observe(el)})}
/* home */
if($('#h1')){
 $('#h1').innerHTML=$('#h1').textContent.split(' ').map(function(w,i){return'<span class="w" style="--i:'+i+'">'+w+'</span>'}).join('');
 var P=[['explainable AI','healthcare'],['private machine learning','diabetes risk prediction'],['federated learning','brain tumor MRI classification'],['machine unlearning','clinical risk models'],['feature decorrelation','deep learning algorithms'],['ensemble models','Kawasaki disease prediction'],['explainable CNNs','ear disease diagnosis'],['predictive multiplicity','tree ensemble algorithms']],pi=0,ci=0,del=0,t1=$('#typed'),t2=$('#typed2'),cr=$('#caret');
 function show(){var a=P[pi][0],b=P[pi][1];t1.textContent=a.slice(0,Math.min(ci,a.length));t2.textContent=b.slice(0,Math.max(ci-a.length,0));(ci<=a.length?t1:t2).insertAdjacentElement('afterend',cr)}
 if(!RM)(function tick(){var L=P[pi][0].length+P[pi][1].length;if(!del){ci++;show();if(ci===L){del=1;return setTimeout(tick,1800)}}else{ci-=2;if(ci<0)ci=0;show();if(ci===0){del=0;pi=(pi+1)%P.length;return setTimeout(tick,300)}}setTimeout(tick,del?22:60)})();
 var items=['ICML 2026 Workshop','NeurIPS 2026 Workshop','IEEE BECITHCON','IEEE QPAIN','IEEE SPICSCON','Elsevier','SHAP','LIME','Differential privacy','Federated learning','Machine unlearning','Explainable AI'];
 var m=items.map(function(t){return'<span>'+t+'</span><i>✦</i>'}).join('');$('#mq').innerHTML=m+m;
 var c={pub:0,acc:0,rev:0};D.pubs.forEach(function(p){c[p.s]++});
 $('#stats').innerHTML=[[D.pubs.length,'research papers'],[c.pub,'published'],[D.projects.length,'projects built'],[c.acc,'accepted for 2026 venues']].map(function(s,i){return'<div class="glass spot stat"><b class="grad" data-n="'+s[0]+'">'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('');
 var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var el=e.target,n=+el.dataset.n,t0=performance.now(),dec=n%1?2:0;if(RM)return;(function f(t){var k=Math.min((t-t0)/1200,1),v=n*(1-Math.pow(1-k,3));el.textContent=v.toFixed(dec);if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
 $$('[data-n]').forEach(function(el){cio.observe(el)});
 $('#feat').innerHTML=[5,7,8].map(function(i){var p=D.pubs[i];return'<article class="glass spot card"><span class="meta"><span class="mk '+mk[p.s]+'" style="margin:0 8px 0 0"></span>'+D.status[p.s]+'</span><h3>'+esc(p.t)+'</h3><p>'+esc(p.v)+'</p></article>'}).join('');
 /* federated network canvas */
 var cv=$('#net'),g=cv.getContext('2d'),W,H,N=[],pulses=[],dpr=Math.min(devicePixelRatio||1,2);
 function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);N=[];var hubs=W<700?4:6;for(var h=0;h<hubs;h++){var a=h/hubs*6.283+.4,r=Math.min(W,H)*(W<700?.36:.42),hub={x:W*(W<700?.5:.62)+Math.cos(a)*r*1.25,y:H*.5+Math.sin(a)*r*.9,hub:1,ph:Math.random()*6,ch:[]};N.push(hub);for(var k=0;k<5;k++){var b=Math.random()*6.283,d=40+Math.random()*50,n={x:hub.x+Math.cos(b)*d,y:hub.y+Math.sin(b)*d,p:hub,ph:Math.random()*6};hub.ch.push(n);N.push(n)}}
 N.server={x:W*(W<700?.5:.62),y:H*.5}}
 function pos(n,t){return[n.x+Math.sin(t/2400+n.ph)*7,n.y+Math.cos(t/2900+n.ph)*7]}
 function frame(t){g.clearRect(0,0,W,H);var s=N.server,col=getComputedStyle(document.documentElement),pc=col.getPropertyValue('--pos'),nc=col.getPropertyValue('--neg');
  N.forEach(function(n){if(n.hub)return;var a=pos(n,t),h=pos(n.p,t);g.strokeStyle=nc;g.globalAlpha=.25;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(h[0],h[1]);g.stroke()});
  N.forEach(function(n){if(!n.hub)return;var h=pos(n,t);g.strokeStyle=pc;g.globalAlpha=.3;g.beginPath();g.moveTo(h[0],h[1]);g.lineTo(s.x,s.y);g.stroke()});
  if(!RM&&Math.random()<.04){var hh=N.filter(function(n){return n.hub});pulses.push({h:hh[Math.random()*hh.length|0],t:0,d:Math.random()<.5?1:-1})}
  pulses=pulses.filter(function(p){p.t+=.012;if(p.t>1)return false;var h=pos(p.h,t),k=p.d>0?p.t:1-p.t;g.globalAlpha=1;g.fillStyle=p.d>0?pc:nc;g.beginPath();g.arc(h[0]+(s.x-h[0])*k,h[1]+(s.y-h[1])*k,3.5,0,6.283);g.fill();return true});
  N.forEach(function(n){var q=pos(n,t);g.globalAlpha=.9;g.fillStyle=n.hub?pc:nc;g.beginPath();g.arc(q[0],q[1],n.hub?6:3,0,6.283);g.fill()});
  g.globalAlpha=1;g.strokeStyle=col.getPropertyValue('--tx');g.lineWidth=2;g.beginPath();g.arc(s.x,s.y,11+Math.sin(t/500)*2,0,6.283);g.stroke();g.lineWidth=1;
  if(!RM)requestAnimationFrame(frame)}
 size();frame(0);addEventListener('resize',function(){size();if(RM)frame(0)});
}
/* research */
if($('#pubs')){
 var fs='all',ft=null;
 $('#fStatus').innerHTML=[['all','All']].concat(Object.keys(D.status).map(function(k){return[k,D.status[k]]})).map(function(a){return'<button type="button" data-s="'+a[0]+'" aria-pressed="'+(a[0]==='all')+'">'+a[1]+'</button>'}).join('');
 $('#fTheme').innerHTML=Object.keys(D.themes).map(function(k){return'<button type="button" data-t="'+k+'" aria-pressed="false">'+D.themes[k]+'</button>'}).join('');
 var pubs=function(){var q=$('#q').value.toLowerCase().trim(),r=D.pubs.filter(function(p){return(fs==='all'||p.s===fs)&&(!ft||p.th.indexOf(ft)>-1)&&(!q||(p.t+' '+p.v).toLowerCase().indexOf(q)>-1)});
  $('#count').textContent='Showing '+r.length+' of '+D.pubs.length+' papers';
  $('#pubs').innerHTML=r.length?r.map(function(p,i){return'<li class="glass spot" style="animation-delay:'+i*50+'ms"><span class="mk '+mk[p.s]+'" role="img" aria-label="'+D.status[p.s]+'"></span><div><h3>'+esc(p.t)+'</h3><p>'+esc(p.v)+', '+p.k.toLowerCase()+'. '+D.status[p.s]+'.</p></div>'+(p.s==='pub'&&p.link?'<a class="copy" href="'+esc(p.link)+'" target="_blank" rel="noopener">Read paper</a>':'')+'</li>'}).join(''):'<li class="glass"><div><h3>No papers match</h3><p>Clear the search or pick another filter.</p></div></li>';cardsFx()};
 $('#fStatus').onclick=function(e){var b=e.target.closest('button');if(!b)return;fs=b.dataset.s;$$('#fStatus button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});pubs()};
 $('#fTheme').onclick=function(e){var b=e.target.closest('button');if(!b)return;ft=ft===b.dataset.t?null:b.dataset.t;$$('#fTheme button').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.t===ft)});pubs()};
 $('#q').oninput=pubs;pubs();
}
/* projects */
if($('#bento')){
 var pg='all';$('#pFilter').innerHTML=[['all','All'],['ai','AI and data'],['web','Software']].map(function(a){return'<button type="button" data-g="'+a[0]+'" aria-pressed="'+(a[0]==='all')+'">'+a[1]+'</button>'}).join('');
 var proj=function(){$('#bento').innerHTML=D.projects.filter(function(p){return pg==='all'||p.g===pg}).map(function(p,i){return'<article class="glass spot card'+(p.big?' big':'')+'" style="animation:pgin .5s '+i*60+'ms both"><h3>'+esc(p.n)+'</h3><p>'+esc(p.d)+'</p><div class="stack">'+p.st.map(function(s){return'<span>'+esc(s)+'</span>'}).join('')+'</div></article>'}).join('');cardsFx()};
 $('#pFilter').onclick=function(e){var b=e.target.closest('button');if(!b)return;pg=b.dataset.g;$$('#pFilter button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});proj()};proj();
}
/* about */
if($('#skillGrid')){
 $('#skillGrid').innerHTML=D.skills.map(function(s){return'<div class="glass spot card"><h3>'+esc(s[0])+'</h3><div class="stack">'+s[1].split(', ').map(function(x){return'<span>'+esc(x)+'</span>'}).join('')+'</div></div>'}).join('');
 $('#comp').innerHTML=D.comp.map(function(s){return'<li>'+esc(s)+'</li>'}).join('');
}
/* contact */
if($('#mailForm')){
 if(D.researchGate){$('#rg').href=D.researchGate;$('#rgLi').hidden=false}
 $('#mailForm').onsubmit=function(e){e.preventDefault();var f=e.target;location.href='mailto:faiz.abridge@gmail.com?subject='+encodeURIComponent('Message from '+f.n.value)+'&body='+encodeURIComponent(f.m.value+'\n\n'+f.n.value)};
}
document.addEventListener('click',function(e){var b=e.target.closest('[data-copy]');if(!b)return;var t=b.textContent;(navigator.clipboard?navigator.clipboard.writeText(b.dataset.copy):Promise.reject()).then(function(){b.textContent='Copied'},function(){b.textContent='Copy failed'});setTimeout(function(){b.textContent=t},1600)});
cardsFx();reveal();
/* quick menu */
var dlg=$('#cmd'),cl=$('#cmdList'),cq=$('#cmdQ'),sel=0,cur=[];
var acts=[['Home','index.html'],['About and path','about.html'],['Research and papers','research.html'],['Projects','projects.html'],['Contact','contact.html'],['Download CV',function(){var a=document.createElement('a');a.href='Noor_Ahmad_Faiz_Khan_CV.pdf';a.download='';a.click()}],['Copy email address',function(){navigator.clipboard&&navigator.clipboard.writeText('faiz.abridge@gmail.com')}],['Toggle light and dark theme',toggleTheme]];
function rl(){cl.innerHTML=cur.map(function(a,i){return'<li role="option" aria-selected="'+(i===sel)+'" data-i="'+i+'">'+a[0]+'<small>'+(typeof a[1]==='string'?'Page':'Action')+'</small></li>'}).join('')}
function list(){var q=cq.value.toLowerCase();cur=acts.filter(function(a){return a[0].toLowerCase().indexOf(q)>-1});sel=0;rl()}
function run(i){var a=cur[i];if(!a)return;dlg.close();typeof a[1]==='string'?(document.body.classList.add('leaving'),setTimeout(function(){location.href=a[1]},230)):a[1]()}
function open(){cq.value='';list();dlg.showModal();cq.focus()}
$('#openCmd').onclick=open;
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.open?dlg.close():open()}});
cq.oninput=list;cl.onclick=function(e){var li=e.target.closest('li');if(li)run(+li.dataset.i)};
cq.onkeydown=function(e){if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,cur.length-1);rl()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);rl()}else if(e.key==='Enter')run(sel)};
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
})();
