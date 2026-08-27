(()=>{
  const root=document.documentElement;
  if(root.dataset.retroIcchy==='1')return;
  root.dataset.retroIcchy='1';
  root.classList.add('retro-readable');

  const addTop=(label,sub='')=>{
    if(document.querySelector('.retro-page-top'))return;
    const top=document.createElement('div');
    top.className='retro-page-top';
    top.innerHTML=`<span>${label}</span>${sub?`<span>${sub}</span>`:''}`;
    const main=document.querySelector('main');
    if(main)main.insertBefore(top,main.firstChild);
  };

  const isMobile=!!(document.getElementById('comparison')&&document.getElementById('priceTable'));
  if(isMobile){
    root.classList.add('retro-mobile');
    addTop('イッチー ＞ スマホ料金比較','2026年版');

    const table=document.getElementById('priceTable');
    if(table&&!document.querySelector('.retro-price-head')){
      const head=document.createElement('div');
      head.className='retro-price-head';
      head.innerHTML='<span>順位</span><span>会社・プラン</span><span>月額</span>';
      table.insertAdjacentElement('beforebegin',head);
    }

    const primary=document.querySelector('.cta-box .primary');
    if(primary&&!primary.textContent.includes('【PR】')){
      primary.textContent='>> 楽天モバイル公式を見る【PR】';
    }
  }

  const insuranceRoot=document.querySelector('.insurance-story-page,.insurance-journal-page,.insurance-compact-page,.insurance-page');
  if(insuranceRoot){
    root.classList.add('retro-insurance');
    addTop('イッチー ＞ 保険の見直し','国・会社・貯金を先に確認');

    const compare=document.querySelector('.compare-action .primary');
    if(compare&&!compare.textContent.startsWith('>>'))compare.textContent=`>> ${compare.textContent}`;
    document.querySelectorAll('.insurance-action .primary,.insurance-top-actions .primary').forEach(link=>{
      if(!link.textContent.startsWith('>>'))link.textContent=`>> ${link.textContent}`;
    });
  }
})();
