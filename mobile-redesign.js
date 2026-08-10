(() => {
  const frame = document.getElementById("detailFrame");
  if (!frame) return;

  const PINK = "#f04e7a";
  const PINK_SOFT = "#fff0f5";
  const RAKUTEN_URL = "https://r10.to/h5w1tz";
  const RAKUTEN_AREA_URL = "https://network.mobile.rakuten.co.jp/area/";

  const comparison = {
    20: [
      {name:"楽天モバイル", price:"2,178円", note:"20GBまで", rakuten:true},
      {name:"LINEMO", price:"2,970円", note:"30GB・5分通話つき"},
      {name:"ahamo", price:"2,970円", note:"30GB・5分通話つき"},
      {name:"UQ mobile", price:"3,828円", note:"35GB・10分通話つき"},
      {name:"Y!mobile", price:"4,378円", note:"30GB"},
      {name:"au", price:"7,788円", note:"使い放題MAX＋"},
      {name:"SoftBank", price:"8,008円", note:"テイガク無制限"},
      {name:"ドコモ", price:"8,448円", note:"ドコモ MAX・3GB超"}
    ],
    30: [
      {name:"LINEMO", price:"2,970円", note:"30GB・5分通話つき", best:true},
      {name:"ahamo", price:"2,970円", note:"30GB・5分通話つき", best:true},
      {name:"楽天モバイル", price:"3,278円", note:"20GB超はギガ無制限", rakuten:true},
      {name:"UQ mobile", price:"3,828円", note:"35GB・10分通話つき"},
      {name:"Y!mobile", price:"4,378円", note:"30GB"},
      {name:"au", price:"7,788円", note:"使い放題MAX＋"},
      {name:"SoftBank", price:"8,008円", note:"テイガク無制限"},
      {name:"ドコモ", price:"8,448円", note:"ドコモ MAX・3GB超"}
    ],
    100: [
      {name:"楽天モバイル", price:"3,278円", note:"ギガ無制限", rakuten:true},
      {name:"ahamo", price:"4,950円", note:"大盛り・110GB"},
      {name:"au", price:"7,788円", note:"使い放題MAX＋"},
      {name:"SoftBank", price:"8,008円", note:"テイガク無制限"},
      {name:"ドコモ", price:"8,448円", note:"ドコモ MAX"},
      {name:"LINEMO", price:"―", note:"比較対象の100GBプランなし", muted:true},
      {name:"Y!mobile", price:"―", note:"比較対象の100GBプランなし", muted:true},
      {name:"UQ mobile", price:"―", note:"比較対象の100GBプランなし", muted:true}
    ]
  };

  const discounted100 = [
    {name:"楽天モバイル", price:"3,168円", note:"最強家族割", rakuten:true},
    {name:"ahamo", price:"4,950円", note:"大盛り・毎月の割引なし"},
    {name:"SoftBank", price:"5,148円", note:"家族3人＋光/Air＋PayPayカード ゴールド"},
    {name:"ドコモ", price:"5,148円", note:"家族3回線＋光/home 5G＋カード等の条件"},
    {name:"au", price:"5,258円", note:"家族3人＋auスマートバリュー＋au PAYカード"}
  ];

  function ensureStyle(doc) {
    if (doc.getElementById("rkm-redesign-style")) return;
    const style = doc.createElement("style");
    style.id = "rkm-redesign-style";
    style.textContent = `
      :root{--rkm-pink:${PINK};--rkm-pink-soft:${PINK_SOFT};}
      .rkm-page{display:grid;gap:0;color:#171b20;background:#fff;padding-bottom:8px;}
      .rkm-hero{padding:10px 0 22px;border-bottom:1px solid #dfe3e8;}
      .rkm-eyebrow{margin:0 0 8px;color:var(--rkm-pink);font-size:13px;font-weight:900;letter-spacing:.08em;}
      .rkm-hero h1{margin:0;font-size:clamp(35px,9.4vw,50px);line-height:1.06;letter-spacing:-.065em;font-weight:950;}
      .rkm-hero h1 em{color:var(--rkm-pink);font-style:normal;}
      .rkm-lead{margin:14px 0 0;color:#3f4750;font-size:16px;line-height:1.75;font-weight:650;}
      .rkm-brand-line{margin:14px 0 0;color:#69727c;font-size:13px;line-height:1.65;}
      .rkm-section{padding:26px 0;border-bottom:1px solid #dfe3e8;}
      .rkm-section-head{margin:0 0 14px;}
      .rkm-kicker{display:block;margin-bottom:5px;color:var(--rkm-pink);font-size:13px;font-weight:900;letter-spacing:.05em;}
      .rkm-section h2{margin:0;font-size:clamp(24px,6.5vw,31px);line-height:1.3;letter-spacing:-.045em;}
      .rkm-section-head p,.rkm-copy{margin:8px 0 0;color:#4a535d;line-height:1.7;}
      .rkm-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;}
      .rkm-summary-card{min-width:0;padding:12px 8px;border:1px solid #e0e4e8;border-radius:13px;background:#fff;text-align:center;}
      .rkm-summary-card.is-rakuten{border-color:#f5a2b9;background:var(--rkm-pink-soft);}
      .rkm-summary-card span{display:block;color:#737c86;font-size:12px;font-weight:800;}
      .rkm-summary-card strong{display:block;margin-top:5px;font-size:15px;line-height:1.3;}
      .rkm-summary-card b{display:block;margin-top:4px;color:#242a31;font-size:16px;line-height:1.2;}
      .rkm-summary-card.is-rakuten strong,.rkm-summary-card.is-rakuten b{color:var(--rkm-pink);}
      .rkm-honest{margin:13px 0 0;padding:12px 14px;border-left:4px solid var(--rkm-pink);background:#fff7f9;line-height:1.65;font-weight:800;}
      .rkm-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:14px;}
      .rkm-tab{min-height:46px;border:1px solid #d9dee4;border-radius:10px;background:#fff;font-weight:900;}
      .rkm-tab.on{border-color:var(--rkm-pink);background:var(--rkm-pink);color:#fff;}
      .rkm-table{margin-top:10px;border:1px solid #dfe3e8;border-radius:14px;overflow:hidden;background:#fff;}
      .rkm-row{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:9px;align-items:center;padding:12px 11px;border-top:1px solid #edf0f2;}
      .rkm-row:first-child{border-top:0;}
      .rkm-row.rakuten{background:var(--rkm-pink-soft);}
      .rkm-row.muted{opacity:.62;background:#fafbfc;}
      .rkm-rank{width:27px;height:27px;display:grid;place-items:center;border-radius:999px;background:#f0f2f5;font-weight:900;font-size:13px;}
      .rkm-row.rakuten .rkm-rank{background:var(--rkm-pink);color:#fff;}
      .rkm-plan strong{display:block;line-height:1.35;}
      .rkm-plan small{display:block;margin-top:3px;color:#6a737d;line-height:1.35;}
      .rkm-price{text-align:right;font-weight:950;white-space:nowrap;}
      .rkm-row.rakuten .rkm-plan strong,.rkm-row.rakuten .rkm-price{color:var(--rkm-pink);}
      .rkm-table-note{margin:9px 1px 0;color:#69727c;font-size:12.5px;line-height:1.6;}
      .rkm-discount-table{margin-top:12px;border-top:1px solid #e1e5e9;}
      .rkm-discount-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;padding:11px 0;border-bottom:1px solid #e8ebee;}
      .rkm-discount-row.rakuten{margin:7px -8px 0;padding:12px 8px;border:1px solid #f1abc0;border-radius:12px;background:var(--rkm-pink-soft);}
      .rkm-discount-row strong{display:block;}
      .rkm-discount-row small{display:block;margin-top:3px;color:#6a737d;line-height:1.4;}
      .rkm-discount-row b{white-space:nowrap;font-size:18px;}
      .rkm-discount-row.rakuten strong,.rkm-discount-row.rakuten b{color:var(--rkm-pink);}
      .rkm-personal{padding:26px 18px;margin:0 calc(var(--side) * -1);background:#fff8fa;border-bottom:1px solid #f2d5de;}
      .rkm-personal-inner{max-width:46rem;margin:auto;}
      .rkm-personal h2{margin:0;font-size:clamp(28px,7.5vw,36px);line-height:1.25;letter-spacing:-.05em;}
      .rkm-personal h2 strong{color:var(--rkm-pink);}
      .rkm-personal p{margin:10px 0 0;color:#424b55;line-height:1.75;}
      .rkm-image-slot{margin:18px 0;padding:23px 16px;min-height:118px;display:grid;place-items:center;border:2px dashed var(--rkm-pink);border-radius:15px;background:#fff;color:var(--rkm-pink);font-weight:900;line-height:1.6;text-align:center;}
      .rkm-use-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;}
      .rkm-use-grid div{padding:13px;border:1px solid #e0e4e8;border-radius:12px;background:#fff;}
      .rkm-use-grid strong{display:block;}
      .rkm-use-grid small{display:block;margin-top:4px;color:#6b747e;line-height:1.4;}
      .rkm-fit{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:14px;}
      .rkm-fit article{padding:14px;border-radius:13px;border:1px solid #dfe3e8;background:#fff;}
      .rkm-fit article.good{border-top:4px solid var(--rkm-pink);}
      .rkm-fit article.stop{border-top:4px solid #2f353c;}
      .rkm-fit h3{margin:0;font-size:17px;}
      .rkm-fit ul{margin:10px 0 0;padding:0;list-style:none;}
      .rkm-fit li{margin:7px 0;color:#434c56;line-height:1.5;font-size:14px;}
      .rkm-fit li::before{content:"・";font-weight:900;}
      .rkm-area-actions{display:grid;gap:8px;margin-top:14px;}
      .rkm-primary,.rkm-secondary{min-height:54px;display:flex;align-items:center;justify-content:center;border-radius:12px;font-weight:950;text-decoration:none;}
      .rkm-primary{background:var(--rkm-pink);color:#fff;}
      .rkm-secondary{border:1px solid #d5dbe1;background:#fff;color:#252b32;}
      .rkm-adnote{margin:7px 0 0;color:#747d86;font-size:12px;line-height:1.5;text-align:center;}
      .rkm-related{display:grid;grid-template-columns:100px minmax(0,1fr);gap:12px;align-items:center;margin-top:14px;padding:11px;border:1px solid #e0e4e8;border-radius:13px;background:#fff;text-decoration:none;}
      .rkm-related img{width:100%;height:72px;object-fit:cover;border-radius:9px;}
      .rkm-related strong{display:block;line-height:1.4;}
      .rkm-related small{display:block;margin-top:4px;color:#707983;line-height:1.4;}
      .rkm-back{margin-top:18px;min-height:44px;display:flex;align-items:center;color:#59636e;font-weight:850;}
      html.font-step-up .rkm-lead,html.font-step-up .rkm-section-head p,html.font-step-up .rkm-copy{font-size:1.08em;}
      @media(max-width:380px){
        .rkm-hero h1{font-size:33px;}
        .rkm-summary{gap:5px;}
        .rkm-summary-card{padding:10px 5px;}
        .rkm-summary-card strong{font-size:13px;}
        .rkm-summary-card b{font-size:14px;}
        .rkm-fit{grid-template-columns:1fr;}
      }
    `;
    doc.head.appendChild(style);
  }

  function rowsFor(band) {
    return comparison[band].map((row, index) => `
      <div class="rkm-row${row.rakuten ? " rakuten" : ""}${row.muted ? " muted" : ""}">
        <span class="rkm-rank">${row.muted ? "–" : index + 1}</span>
        <div class="rkm-plan"><strong>${row.name}</strong><small>${row.note}</small></div>
        <b class="rkm-price">${row.price}</b>
      </div>`).join("");
  }

  function discountRows() {
    return discounted100.map(row => `
      <div class="rkm-discount-row${row.rakuten ? " rakuten" : ""}">
        <div><strong>${row.name}</strong><small>${row.note}</small></div>
        <b>${row.price}</b>
      </div>`).join("");
  }

  function markup() {
    return `
      <section class="page rkm-page">
        <header class="rkm-hero">
          <p class="rkm-eyebrow">スマホ料金を、ちゃんと比べた</p>
          <h1>ドコモ、au、ソフトバンク、<br>ahamo、LINEMO。<br>比べたら、<em>楽天だった。</em></h1>
          <p class="rkm-lead">Y!mobile・UQ mobileも含めて比較しました。楽天が毎回いちばん安いわけではありません。それでも、私の使い方では最後に楽天が残りました。</p>
          <p class="rkm-brand-line">比較：楽天 / ドコモ / au / SoftBank / ahamo / LINEMO / Y!mobile / UQ mobile<br>※povoはトッピング型で条件を揃えにくいため、今回の比較から外しています。</p>
        </header>

        <section class="rkm-section">
          <div class="rkm-section-head">
            <span class="rkm-kicker">先に結論</span>
            <h2>使う量で、答えは変わる。</h2>
          </div>
          <div class="rkm-summary">
            <div class="rkm-summary-card is-rakuten"><span>20GB</span><strong>楽天</strong><b>2,178円</b></div>
            <div class="rkm-summary-card"><span>30GB</span><strong>LINEMO / ahamo</strong><b>2,970円</b></div>
            <div class="rkm-summary-card is-rakuten"><span>100GB</span><strong>楽天</strong><b>3,278円</b></div>
          </div>
          <p class="rkm-honest">楽天が毎回1位ではない。30GBならLINEMO・ahamoの方が安い。ここは隠さない。</p>
        </section>

        <section class="rkm-section">
          <div class="rkm-section-head">
            <span class="rkm-kicker">割引なし</span>
            <h2>料金を、全部並べる。</h2>
            <p>家族・光回線・カード割を入れず、月額料金を見ます。使う量を押すと表が変わります。</p>
          </div>
          <div class="rkm-tabs" role="tablist" aria-label="データ利用量を選ぶ">
            <button class="rkm-tab" type="button" data-band="20">20GB</button>
            <button class="rkm-tab" type="button" data-band="30">30GB</button>
            <button class="rkm-tab on" type="button" data-band="100">100GB</button>
          </div>
          <div class="rkm-table" id="rkmTable">${rowsFor(100)}</div>
          <p class="rkm-table-note" id="rkmTableNote">100GB級になると、楽天は3,278円。ahamo大盛りとの差は月1,672円です。</p>
          <p class="rkm-table-note">※料金・プラン条件は変更されることがあります。申込前に各社公式で最新条件を確認してください。</p>
        </section>

        <section class="rkm-section">
          <div class="rkm-section-head">
            <span class="rkm-kicker">じゃあ、割引を入れたら？</span>
            <h2>100GB以上は、条件を積んでも楽天だった。</h2>
            <p>家族・光回線・カードなど、各社で代表的な割引条件を入れた100GB級の比較です。</p>
          </div>
          <div class="rkm-discount-table">${discountRows()}</div>
          <p class="rkm-table-note">30GB前後では、条件次第でY!mobileやUQ mobileの方が安くなることがあります。だから「全員に楽天」とは言いません。</p>
        </section>

        <section class="rkm-personal">
          <div class="rkm-personal-inner">
            <p class="rkm-eyebrow">それで、私はどうしたか</p>
            <h2>私は月100GBを超える。<br>だから、<strong>楽天を使ってる。</strong></h2>
            <p>スマホだけで使っているわけではありません。PCとテレビもスマホにつないでいます。私の場合、料金と使い方を一緒に見ると楽天が一番合いました。</p>
            <div class="rkm-image-slot">【画像：月100GB以上使っている楽天モバイルのデータ利用量画面】</div>
            <div class="rkm-use-grid">
              <div><strong>PC</strong><small>仕事・ネットをテザリング</small></div>
              <div><strong>テレビ</strong><small>YouTubeなどを接続</small></div>
            </div>
            <div class="rkm-image-slot">【画像：スマホからPCとテレビへテザリングしている実際の使い方が分かる画像】</div>
          </div>
        </section>

        <section class="rkm-section">
          <div class="rkm-section-head">
            <span class="rkm-kicker">ただし</span>
            <h2>安くても、電波がダメならやめる。</h2>
            <p>楽天を選ぶかどうかは、最後は普段いる場所で決めます。</p>
          </div>
          <div class="rkm-fit">
            <article class="good">
              <h3>候補にしやすい</h3>
              <ul><li>データをかなり使う</li><li>PC・テレビにもつなぐ</li><li>自宅や職場で電波が入る</li></ul>
            </article>
            <article class="stop">
              <h3>一度待った方がいい</h3>
              <ul><li>仕事で一瞬の切断も困る</li><li>生活圏の電波が弱い</li><li>料金より通信品質を最優先する</li></ul>
            </article>
          </div>
          <div class="rkm-image-slot">【画像：楽天モバイルの通信エリアを確認している画面】</div>
          <div class="rkm-area-actions">
            <a class="rkm-secondary" href="${RAKUTEN_AREA_URL}" target="_blank" rel="noopener noreferrer">先に通信エリアを見る ↗</a>
            <a class="rkm-primary" href="${RAKUTEN_URL}" target="_blank" rel="noopener noreferrer sponsored">楽天モバイルを見る ↗</a>
          </div>
          <p class="rkm-adnote">※広告・アフィリエイトリンクを含みます。料金・キャンペーンは申込時点の公式情報を確認してください。</p>
        </section>

        <section class="rkm-section">
          <div class="rkm-section-head">
            <span class="rkm-kicker">実体験をもう少し</span>
            <h2>100GB超で、実際どう使っているか。</h2>
          </div>
          <a class="rkm-related" href="#mobile-100gb">
            <img src="assets/articles/rakuten-mobile-100gb.png" alt="100GB超でも楽天モバイルを続ける理由" loading="lazy" decoding="async">
            <span><strong>毎月100GB以上使う私が、楽天モバイルを続ける理由</strong><small>PC・テレビ接続と、契約前に見る場所</small></span>
          </a>
          <a class="rkm-back" href="#home">← 最初に戻る</a>
        </section>
      </section>`;
  }

  function bind(doc) {
    const table = doc.getElementById("rkmTable");
    const note = doc.getElementById("rkmTableNote");
    const tabs = [...doc.querySelectorAll(".rkm-tab")];
    if (!table || !note || !tabs.length) return;
    const notes = {
      20:"20GBまでなら、割引なしでは楽天が2,178円で最安です。",
      30:"30GBなら、LINEMO・ahamoが2,970円。楽天は3,278円なので、ここでは楽天が最安ではありません。",
      100:"100GB級になると、楽天は3,278円。ahamo大盛りとの差は月1,672円です。"
    };
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(item => item.classList.toggle("on", item === tab));
      const band = Number(tab.dataset.band);
      table.innerHTML = rowsFor(band);
      note.textContent = notes[band];
    }));
  }

  function redesign() {
    try {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (!doc || !win) return;
      const route = (win.location.hash || "").slice(1) || frame.dataset.route || "";
      if (route !== "mobile") return;
      const app = doc.getElementById("app");
      if (!app || app.querySelector(".rkm-page")) return;
      ensureStyle(doc);
      doc.documentElement.style.setProperty("--page-accent", PINK);
      doc.documentElement.style.setProperty("--page-accent-soft", PINK_SOFT);
      doc.documentElement.style.setProperty("--green", PINK);
      doc.documentElement.style.setProperty("--green-soft", PINK_SOFT);
      doc.body.style.background = "#fff";
      app.innerHTML = markup();
      bind(doc);
    } catch (error) {}
  }

  frame.addEventListener("load", () => {
    requestAnimationFrame(redesign);
    try {
      frame.contentWindow?.addEventListener("hashchange", () => requestAnimationFrame(redesign));
    } catch (error) {}
  });
  window.addEventListener("hashchange", () => requestAnimationFrame(redesign));
})();
