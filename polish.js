(()=>{
  const root=document.documentElement;
  if(root.dataset.icchyPolishV2==='1')return;
  root.dataset.icchyPolishV2='1';

  /* ---------- 構造の味付け。本文や料金データは変更しない ---------- */
  const homeIntro=document.querySelector('.home .intro');
  if(homeIntro && !homeIntro.querySelector('.site-stamp')){
    const stamp=document.createElement('div');
    stamp.className='site-stamp';
    stamp.textContent='小さい水道屋の経理メモ';
    homeIntro.insertBefore(stamp,homeIntro.firstChild);
  }

  const hero=document.querySelector('main > .hero');
  if(hero && !hero.querySelector('.icchy-topline')){
    const line=document.createElement('div');
    line.className='icchy-topline';
    line.innerHTML='<span>ICCHY / MOBILE LOG</span><span class="topline-sub">俺が使って、比べた話</span>';
    hero.insertBefore(line,hero.firstChild);

    const note=hero.querySelector('.hero-note');
    if(note && !hero.querySelector('.detail-meta')){
      const meta=document.createElement('div');
      meta.className='detail-meta';
      meta.innerHTML=[
        '<span>俺の実使用<b><span class="meta-value">100GB</span>超</b></span>',
        '<span>料金確認<b><span class="meta-value">2026.08.12</span></b></span>',
        '<span>比較対象<b><span class="meta-value">8</span>社</b></span>'
      ].join('');
      note.insertAdjacentElement('afterend',meta);
    }
  }

  const chapterLabels={
    'section-wifi':'俺の使い方',
    'section-proof':'俺の実使用',
    'comparison':'料金比較 / FULL',
    'judgment':'俺の結論',
    'wifi-decision':'固定回線どうする'
  };
  Object.entries(chapterLabels).forEach(([id,label])=>{
    const section=document.getElementById(id);
    const head=section?.querySelector('.section-head');
    if(!head || head.querySelector('.chapter-tab'))return;
    const tab=document.createElement('span');
    tab.className='chapter-tab';
    tab.textContent=label;
    head.insertBefore(tab,head.firstChild);
  });

  const proof=document.getElementById('section-proof');
  const proofImage=proof?.querySelector('.image-slot');
  if(proofImage && !proof.querySelector('.evidence-strip')){
    const strip=document.createElement('div');
    strip.className='evidence-strip';
    strip.textContent='スクショで確認する';
    proofImage.insertAdjacentElement('beforebegin',strip);
  }

  const comparison=document.getElementById('comparison');
  const builder=comparison?.querySelector('.compare-builder');
  if(builder && !comparison.querySelector('.compare-strap')){
    const strap=document.createElement('div');
    strap.className='compare-strap';
    strap.innerHTML='<span>比較表は省略なし</span><span>20GB前後 / 100GB以上 × 割引なし / 条件を全部そろえる</span>';
    builder.insertAdjacentElement('beforebegin',strap);
  }

  const sources=document.querySelector('.sources');
  const sourcesSummary=sources?.querySelector('summary');
  if(sourcesSummary && !sourcesSummary.querySelector('.source-head')){
    const sourceHead=document.createElement('span');
    sourceHead.className='source-head';
    sourceHead.textContent='SOURCE';
    sourcesSummary.insertBefore(sourceHead,sourcesSummary.firstChild);
    sourcesSummary.insertBefore(document.createTextNode(' '),sourceHead.nextSibling);
  }

  /* ---------- 動き。reduced-motionなら構造だけ残す ---------- */
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  root.classList.add('motion-ready');

  const targets=[];
  const add=(selector,step=55)=>{
    document.querySelectorAll(selector).forEach((el,i)=>{
      if(el.classList.contains('reveal-item'))return;
      el.classList.add('reveal-item');
      el.style.setProperty('--reveal-delay',`${Math.min(i,5)*step}ms`);
      targets.push(el);
    });
  };

  add('.home .site-stamp',0);
  add('.home .intro h1',0);
  add('.home .intro-metrics',40);
  add('.home .intro-context',40);
  add('.home .intro-note',40);
  add('.home .choice',70);

  add('.icchy-topline',0);
  add('.detail-meta',0);
  add('.section-head',0);
  add('.section-index',0);
  add('.tether-map',0);
  add('.evidence-strip',0);
  add('.stat-pair',0);
  add('.compare-strap',0);
  add('.compare-builder',0);
  add('.result-head',0);
  add('.price-table',0);
  add('.compare-truth',0);
  add('.judgment',0);
  add('.wifi-decision',0);
  add('.cta-box',0);

  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },{threshold:.08,rootMargin:'0px 0px -6% 0px'});
    targets.forEach(el=>observer.observe(el));
  }else{
    targets.forEach(el=>el.classList.add('is-visible'));
  }

  if(comparison){
    comparison.addEventListener('click',event=>{
      const button=event.target.closest('.segmented button');
      if(!button)return;
      requestAnimationFrame(()=>{
        [document.getElementById('priceTable'),document.getElementById('compareTruth')].forEach(el=>{
          if(!el)return;
          el.classList.remove('compare-flash');
          void el.offsetWidth;
          el.classList.add('compare-flash');
          window.setTimeout(()=>el.classList.remove('compare-flash'),220);
        });
      });
    });
  }
})();
