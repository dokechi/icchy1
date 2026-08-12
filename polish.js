(()=>{
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;

  const root=document.documentElement;
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

  // Home
  add('.home .intro h1',0);
  add('.home .intro-metrics',40);
  add('.home .intro-context',40);
  add('.home .intro-note',40);
  add('.home .choice',70);

  // Rakuten detail page
  add('.section-head',0);
  add('.section-index',0);
  add('.tether-map',0);
  add('.stat-pair',0);
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

  // Give comparison changes a small visual response without delaying the data update.
  const comparison=document.getElementById('comparison');
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
