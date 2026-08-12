(()=>{
  const root=document.documentElement;
  if(root.dataset.icchyPolishV3==='1')return;
  root.dataset.icchyPolishV3='1';

  const home=document.querySelector('.home');
  if(home){
    root.classList.add('icchy-home-page');
    const intro=home.querySelector('.intro');
    if(intro && !intro.querySelector('.site-stamp')){
      const stamp=document.createElement('div');
      stamp.className='site-stamp';
      stamp.textContent='小さい水道屋の経理メモ';
      intro.insertBefore(stamp,intro.firstChild);
    }
    const price=home.querySelector('.metric-price');
    if(price)price.textContent='3,278円。';
    const outcome=home.querySelector('.mobile-outcome');
    if(outcome)outcome.innerHTML='テザリングで、俺は家の<span class="metric-wifi">Wi-Fiもやめた。</span>';
  }

  const mobilePage=!!(document.getElementById('section-wifi')&&document.getElementById('comparison'));
  if(mobilePage){
    root.classList.add('icchy-mobile-page');

    const hero=document.querySelector('main > .hero');
    if(hero){
      if(!hero.querySelector('.icchy-topline')){
        const line=document.createElement('div');
        line.className='icchy-topline';
        line.innerHTML='<span>ICCHY / MOBILE LOG</span><span class="topline-sub">俺が使って、比べた話</span>';
        hero.insertBefore(line,hero.firstChild);
      }

      const promise=hero.querySelector('.hero-promise');
      if(promise){
        promise.innerHTML='<span class="hero-promise-main"><span class="hero-usage-line"><span class="hero-number">100GB</span><span class="hero-connector">使っても、</span></span><span class="hero-price-line"><span class="hero-connector">月</span><span class="hero-number">3,278円</span><span class="hero-period">。</span></span></span><span class="hero-promise-sub">テザリングで、俺は家の<span class="hero-wifi-outcome">Wi-Fiもやめた。</span></span>';
      }

      const note=hero.querySelector('.hero-note');
      if(note){
        note.textContent='※3,278円は20GB超の通常料金。通話料等別。混雑時など速度制御の場合あり。';
        if(!hero.querySelector('.detail-meta')){
          const meta=document.createElement('div');
          meta.className='detail-meta';
          meta.innerHTML=[
            '<span>俺の実使用<b><span class="meta-value">100GB</span>超</b></span>',
            '<span>料金確認<b><span class="meta-value">2026.08.12</span></b></span>',
            '<span>比較対象<b><span class="meta-value">8</span>社</b></span>'
          ].join('');
          note.insertAdjacentElement('afterend',meta);
        }
        if(!hero.querySelector('.live-note')){
          const live=document.createElement('div');
          live.className='live-note';
          live.innerHTML='<b>8/12 追記</b>料金をもう一回見直しました。家族割を入れなくても3,278円。なので、このページではこっちを主役にしています。';
          const meta=hero.querySelector('.detail-meta');
          (meta||note).insertAdjacentElement('afterend',live);
        }
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
      if(!head)return;
      let tab=head.querySelector('.chapter-tab');
      if(!tab){tab=document.createElement('span');tab.className='chapter-tab';head.insertBefore(tab,head.firstChild)}
      tab.textContent=label;
    });

    const wifi=document.getElementById('section-wifi');
    if(wifi){
      const kicker=wifi.querySelector('.kicker');
      const h2=wifi.querySelector('h2');
      const lead=wifi.querySelector('.section-lead');
      const proof=wifi.querySelector('.proof-line');
      const arrow=wifi.querySelector('.tether-arrow');
      if(kicker)kicker.textContent='Wi-Fi代0円って、こういうこと。';
      if(h2)h2.textContent='家のWi-Fi、俺はやめた。';
      if(lead)lead.textContent='家では楽天モバイルをそのままPCとテレビにつないでます。別のWi-Fiは契約してません。';
      if(arrow)arrow.textContent='↓';
      if(proof)proof.textContent='テレビでYouTubeを見るくらいなら、俺は全然気にならないです。';
    }

    const proofSection=document.getElementById('section-proof');
    if(proofSection){
      const kicker=proofSection.querySelector('.kicker');
      const h2=proofSection.querySelector('h2');
      const leads=proofSection.querySelectorAll('.section-lead');
      if(kicker)kicker.textContent='実際、どれくらい使う？';
      if(h2)h2.textContent='月100GB、普通に超えてます。';
      if(leads[0])leads[0].textContent='テレビも見る。PCもつなぐ。スマホも普通に使う。それで100GBを超える月があります。';
      if(leads[1])leads[1].innerHTML='これ1本で家の通信までまかなえる。そもそもWi-Fiがいらなくなった時点で、<strong>俺はもう十分なんよ。</strong>';
      const stat=proofSection.querySelector('.stat-pair');
      if(stat){
        const cells=stat.querySelectorAll(':scope > div');
        if(cells[0])cells[0].innerHTML='<span>通常料金</span><strong>3,278円</strong>';
        if(cells[1])cells[1].innerHTML='<span>20GB超</span><strong>ギガ無制限</strong>';
      }
      const proofImage=proofSection.querySelector('.image-slot');
      if(proofImage && !proofSection.querySelector('.evidence-strip')){
        const strip=document.createElement('div');
        strip.className='evidence-strip';
        strip.textContent='スクショで確認する';
        proofImage.insertAdjacentElement('beforebegin',strip);
      }
    }

    const comparison=document.getElementById('comparison');
    if(comparison){
      const kicker=comparison.querySelector('.kicker');
      const h2=comparison.querySelector('h2');
      const intro=comparison.querySelector('.compare-intro');
      if(kicker)kicker.textContent='でも、一応気になった。';
      if(h2)h2.textContent='他社が割引を全部入れたら、どうなん？';
      if(intro)intro.textContent='楽天が安いって言っても、ドコモやau、SoftBankが家族割・光回線・カード割まで入れたらどうなるのか。なので、割引なしと、割引をできるだけ入れた場合。両方作りました。';
      const builder=comparison.querySelector('.compare-builder');
      if(builder && !comparison.querySelector('.compare-strap')){
        const strap=document.createElement('div');
        strap.className='compare-strap';
        strap.innerHTML='<span>割引なしも、全部入れた場合も。</span><span>20GB前後 / 100GB以上</span>';
        builder.insertAdjacentElement('beforebegin',strap);
      }
      const labels=comparison.querySelectorAll('.control-label');
      if(labels[0])labels[0].textContent='① どれくらい使う？';
      if(labels[1])labels[1].textContent='② 割引は？';
      const modeDiscount=document.getElementById('modeDiscount');
      if(modeDiscount)modeDiscount.textContent='割引をできるだけ入れる';
      const details=comparison.querySelector('.condition-details summary');
      if(details)details.textContent='細かい条件を見る';

      const patchCompareCopy=()=>{
        const band20=document.getElementById('band20');
        const discount=document.getElementById('modeDiscount');
        const modeExplain=document.getElementById('modeExplain');
        const resultSub=document.getElementById('resultSub');
        const truth=document.getElementById('compareTruth');
        const isSmall=band20?.getAttribute('aria-selected')==='true';
        const isDiscount=discount?.getAttribute('aria-selected')==='true';
        if(modeExplain)modeExplain.textContent=isDiscount?'家族・光回線・カードなど、主な割引を入れた場合です。別契約や年会費が必要なものは、下の条件欄に残しています。':'家族割・光回線・カード割を入れない、通常の月額料金です。';
        if(resultSub)resultSub.textContent=isDiscount?'割引をできるだけ入れる':'割引なし';
        if(truth){
          if(isSmall&&isDiscount){
            truth.innerHTML='<strong>普通にY!mobileの方が安かった。</strong><p>Y!mobile 1,958円。楽天 2,068円。ここまで条件をそろえると、Y!mobileが110円安い。</p>';
          }else if(!isSmall){
            truth.innerHTML='<strong>100GB以上なら、俺は楽天。</strong><p>この比較では、割引なしでも、主な割引を入れても楽天が一番安かった。</p>';
          }else{
            truth.innerHTML='<strong>割引なしなら、楽天が一番安かった。</strong><p>楽天2,178円。LINEMO・ahamoは30GBと5分通話込みで2,970円。中身が同じではないので、そこは分けて見ます。</p>';
          }
        }
      };
      patchCompareCopy();
      comparison.addEventListener('click',event=>{
        const button=event.target.closest('.segmented button');
        if(!button)return;
        requestAnimationFrame(()=>{
          patchCompareCopy();
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

    const judgment=document.getElementById('judgment');
    if(judgment){
      const kicker=judgment.querySelector('.kicker');
      const h2=judgment.querySelector('h2');
      const cards=judgment.querySelectorAll('.judge-card');
      if(kicker)kicker.textContent='で、比べるとこうなった。';
      if(h2)h2.textContent='楽天が毎回いちばん、ではなかった。';
      if(cards[0]){
        const span=cards[0].querySelector('span'),h3=cards[0].querySelector('h3'),p=cards[0].querySelector('p');
        if(span)span.textContent='20GB前後・割引をできるだけ入れるなら';
        if(h3)h3.textContent='普通にY!mobileの方が安かった。';
        if(p)p.textContent='Y!mobile 1,958円。楽天 2,068円。ここまで条件をそろえると、Y!mobileが110円安い。';
      }
      if(cards[1]){
        const span=cards[1].querySelector('span'),h3=cards[1].querySelector('h3'),p=cards[1].querySelector('p');
        if(span)span.textContent='100GB以上まで使うなら';
        if(h3)h3.textContent='100GB以上なら、俺は楽天。';
        if(p)p.textContent='この比較では、大手が割引をかなり入れても楽天が一番安かった。俺は家のWi-Fiもこれでまかなってます。';
      }
    }

    const wifiDecision=document.getElementById('wifi-decision');
    if(wifiDecision){
      const kicker=wifiDecision.querySelector('.kicker');
      if(kicker)kicker.textContent='で、家のWi-Fiは残す？';
    }

    const cta=document.querySelector('.cta-box');
    if(cta){
      const p=cta.querySelector(':scope > p:not(.cta-note)');
      if(p)p.textContent='スマホ代だけ見ても安い。でも俺が一番デカいと思ったのは、家のWi-Fiまでなくせたこと。毎月1本、固定費が消えました。';
    }

    const sources=document.querySelector('.sources');
    const sourcesSummary=sources?.querySelector('summary');
    if(sourcesSummary && !sourcesSummary.querySelector('.source-head')){
      const sourceHead=document.createElement('span');
      sourceHead.className='source-head';
      sourceHead.textContent='公式';
      sourcesSummary.insertBefore(sourceHead,sourcesSummary.firstChild);
      sourcesSummary.insertBefore(document.createTextNode(' '),sourceHead.nextSibling);
    }
  }

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
  add('.live-note',0);
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
})();
