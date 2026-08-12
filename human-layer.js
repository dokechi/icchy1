(()=>{
  const root=document.documentElement;
  if(root.dataset.icchyHumanLayer==='1')return;
  const mobilePage=!!(document.getElementById('section-wifi')&&document.getElementById('comparison'));
  if(!mobilePage)return;
  root.dataset.icchyHumanLayer='1';

  const hero=document.querySelector('main > .hero');
  if(hero && !hero.querySelector('.author-strip')){
    const live=hero.querySelector('.live-note');
    const author=document.createElement('section');
    author.className='author-strip';
    author.setAttribute('aria-label','このページを書いている人');
    author.innerHTML=`
      <span class="author-strip-head">このページを書いてる人</span>
      <div class="author-strip-body">
        <strong class="author-strip-name">小さい水道屋の経理</strong>
        <div class="author-strip-meta">
          <span>楽天100GB超</span>
          <span>家のWi-Fiなし</span>
          <span>自分で料金比較</span>
        </div>
      </div>`;
    (live||hero.lastElementChild).insertAdjacentElement('afterend',author);
  }

  const wifi=document.getElementById('section-wifi');
  if(wifi){
    const map=wifi.querySelector('.tether-map');
    if(map && !wifi.querySelector('.self-question')){
      const q=document.createElement('aside');
      q.className='self-question';
      q.innerHTML=`
        <span class="self-question-tag">自分でツッコむ</span>
        <strong class="self-question-q">テザリングだけで、テレビまでいける？</strong>
        <span class="self-question-a">俺はテレビでYouTubeを見るくらいなら、<b>全然気にならないです。</b></span>`;
      map.insertAdjacentElement('afterend',q);
    }

    const image=wifi.querySelector('.image-slot');
    if(image && !wifi.querySelector('.usage-log')){
      const log=document.createElement('section');
      log.className='usage-log';
      log.setAttribute('aria-label','家での使い方');
      log.innerHTML=`
        <div class="usage-log-head"><strong>家ではこんな感じ</strong><span>俺の使い方メモ</span></div>
        <div class="usage-log-row"><b>スマホ</b><span>普通に使う</span></div>
        <div class="usage-log-row"><b>PC</b><span>楽天からテザリング</span></div>
        <div class="usage-log-row"><b>テレビ</b><span>YouTubeを見る</span></div>
        <div class="usage-log-row"><b>家のWi-Fi</b><span>契約なし</span></div>
        <div class="usage-log-row last"><b>通信量</b><span>100GBを超える月あり</span></div>`;
      image.insertAdjacentElement('beforebegin',log);
    }
  }

  const comparison=document.getElementById('comparison');
  if(comparison && !comparison.querySelector('.self-question')){
    const intro=comparison.querySelector('.compare-intro');
    if(intro){
      const q=document.createElement('aside');
      q.className='self-question';
      q.innerHTML=`
        <span class="self-question-tag">で、ここが気になった</span>
        <strong class="self-question-q">でも他社が、家族割とか光回線とか全部入れたら？</strong>
        <span class="self-question-a">それが気になったので、<b>割引なしと、割引を入れた場合。両方作りました。</b></span>`;
      intro.insertAdjacentElement('afterend',q);
    }
  }

  const sources=document.querySelector('.sources');
  const back=document.querySelector('.back');
  if(sources && !document.querySelector('.page-history')){
    const history=document.createElement('section');
    history.className='page-history';
    history.setAttribute('aria-label','このページの更新履歴');
    history.innerHTML=`
      <span class="page-history-label">更新履歴</span>
      <h3>このページ、今日も触ってます。</h3>
      <div class="history-entry">
        <time class="history-date" datetime="2026-08-12">2026.08.12</time>
        <div class="history-body">
          <p>主役の料金を、家族割後の3,168円から通常料金3,278円に変更。</p>
          <p>文字サイズと本文を読み直し。料金比較の細かい条件は残しました。</p>
        </div>
      </div>`;
    sources.insertAdjacentElement('afterend',history);

    const other=document.createElement('a');
    other.className='other-note-link';
    other.href='index.html#insurance';
    other.target='_top';
    other.innerHTML='<span>ほかの固定費メモ → 保険</span><span>→</span>';
    history.insertAdjacentElement('afterend',other);

    if(back)other.insertAdjacentElement('afterend',back);
  }
})();
