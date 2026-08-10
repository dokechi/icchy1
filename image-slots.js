(() => {
  const frame = document.getElementById("detailFrame");
  if (!frame) return;

  const ARTICLE_SLOTS = [
    {
      key: "tethering-setting",
      heading: "月100GBを超えるのは、PCとテレビにもつなぐから",
      text: "スマホのテザリング設定画面"
    },
    {
      key: "actual-bill",
      heading: "料金とキャンペーンは、申し込む日に確認する",
      text: "楽天モバイルの実際の月額請求額が分かる画面"
    }
  ];

  function isStandaloneMobile(win) {
    try { return /\/mobile\.html$/.test(win.location.pathname); }
    catch (error) { return false; }
  }

  function forcePink(doc) {
    const targets=[doc.documentElement,doc.body,doc.querySelector('.site'),doc.querySelector('main'),doc.querySelector('.page')].filter(Boolean);
    targets.forEach(target=>{
      target.style.setProperty('--page-accent','#f04e7a','important');
      target.style.setProperty('--page-accent-soft','#fff0f5','important');
      target.style.setProperty('--green','#f04e7a','important');
      target.style.setProperty('--green-soft','#fff0f5','important');
    });
    doc.body.style.background='#fff';
  }

  function ensureSlotStyle(doc){
    if(doc.getElementById('icchy-image-slot-style'))return;
    const style=doc.createElement('style');
    style.id='icchy-image-slot-style';
    style.textContent=`.icchy-image-slot{width:100%;min-height:116px;margin:18px 0;padding:22px 18px;display:flex;align-items:center;justify-content:center;border:2px dashed #f04e7a;border-radius:16px;background:#fff;color:#f04e7a;font-weight:900;line-height:1.6;text-align:center}.icchy-image-slot+*{margin-top:0}`;
    doc.head.appendChild(style);
  }

  function addArticleSlots(doc){
    ensureSlotStyle(doc);
    ARTICLE_SLOTS.forEach(spec=>{
      if(doc.querySelector(`[data-image-slot="${spec.key}"]`))return;
      const section=[...doc.querySelectorAll('.article-section')].find(node=>node.querySelector('h2')?.textContent.trim()===spec.heading);
      if(!section)return;
      const slot=doc.createElement('div');
      slot.className='icchy-image-slot';
      slot.dataset.imageSlot=spec.key;
      slot.textContent=`【画像：${spec.text}】`;
      section.after(slot);
    });
  }

  function bindStandaloneLinks(doc){
    if(doc.documentElement.dataset.icchyStandaloneBound)return;
    doc.documentElement.dataset.icchyStandaloneBound='1';
    doc.addEventListener('click',event=>{
      const anchor=event.target.closest('a');
      if(!anchor)return;
      const href=anchor.getAttribute('href')||'';
      if(href.includes('app.html#mobile-100gb')){
        event.preventDefault();
        window.location.hash='mobile-100gb';
      }
    },true);
  }

  function sync(){
    try{
      const win=frame.contentWindow;
      const doc=frame.contentDocument;
      if(!win||!doc)return;
      const outerRoute=location.hash.slice(1)||'home';
      const innerRoute=(win.location.hash||'').slice(1);

      if(outerRoute==='mobile'){
        if(!isStandaloneMobile(win)){
          frame.src='mobile.html';
          return;
        }
        bindStandaloneLinks(doc);
        return;
      }

      if(innerRoute==='mobile' && outerRoute!=='mobile'){
        location.hash='mobile';
        return;
      }

      if(innerRoute==='mobile-100gb' || outerRoute==='mobile-100gb'){
        forcePink(doc);
        addArticleSlots(doc);
      }
    }catch(error){}
  }

  frame.addEventListener('load',()=>{
    sync();
    try{frame.contentWindow?.addEventListener('hashchange',()=>requestAnimationFrame(sync));}catch(error){}
  });
  window.addEventListener('hashchange',()=>requestAnimationFrame(sync));
  requestAnimationFrame(sync);
})();
