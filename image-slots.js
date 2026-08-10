(() => {
  const frame = document.getElementById("detailFrame");
  if (!frame) return;

  const MOBILE_SLOTS = [
    {
      key: "usage-100gb",
      position: "after",
      selector: ".mobile-story-hero",
      text: "月100GB以上使っている楽天モバイルのデータ利用量画面"
    },
    {
      key: "tethering-pc-tv",
      position: "after",
      selector: ".tethering-story",
      text: "スマホからPCとテレビへテザリングしている実際の使い方が分かる画像"
    },
    {
      key: "fit-or-not",
      position: "before",
      selector: ".reality-check",
      text: "楽天モバイルが向いている人・向いていない人が一目で分かる画像"
    },
    {
      key: "area-check",
      position: "after",
      selector: ".reality-check",
      text: "楽天モバイルの通信エリアを確認している画面"
    },
    {
      key: "three-step-price",
      position: "before",
      selector: ".mobile-compare-v2",
      text: "楽天モバイルの3段階料金が一目で分かる画像"
    },
    {
      key: "before-apply-check",
      position: "before",
      selector: ".decision-cta",
      text: "楽天モバイル申込み前に確認する3項目の画像"
    }
  ];

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

  function ensureStyle(doc) {
    if (doc.getElementById("icchy-image-slot-style")) return;
    const style = doc.createElement("style");
    style.id = "icchy-image-slot-style";
    style.textContent = `
      .icchy-image-slot{
        width:100%;
        min-height:116px;
        margin:18px 0;
        padding:22px 18px;
        display:flex;
        align-items:center;
        justify-content:center;
        border:2px dashed var(--page-accent,#f04e7a);
        border-radius:16px;
        background:var(--page-accent-soft,#fff0f5);
        color:var(--page-accent,#f04e7a);
        font-weight:900;
        line-height:1.6;
        text-align:center;
        letter-spacing:-.02em;
      }
      html.font-step-up .icchy-image-slot{
        min-height:132px;
        font-size:1.08em;
      }
    `;
    doc.head.appendChild(style);
  }

  function normalizeRakutenBase(doc) {
    doc.documentElement.style.removeProperty("--paper");
    doc.body.style.background = "#fff";
    const site = doc.querySelector(".site");
    if (site) site.style.background = "#fff";
  }

  function makeSlot(doc, key, text) {
    const existing = doc.querySelector(`[data-image-slot="${key}"]`);
    if (existing) return existing;
    const slot = doc.createElement("div");
    slot.className = "icchy-image-slot";
    slot.dataset.imageSlot = key;
    slot.textContent = `【画像：${text}】`;
    return slot;
  }

  function placeBySelector(doc, spec) {
    if (doc.querySelector(`[data-image-slot="${spec.key}"]`)) return;
    const target = doc.querySelector(spec.selector);
    if (!target) return;
    const slot = makeSlot(doc, spec.key, spec.text);
    if (spec.position === "before") target.before(slot);
    else target.after(slot);
  }

  function placeAfterHeadingSection(doc, spec) {
    if (doc.querySelector(`[data-image-slot="${spec.key}"]`)) return;
    const section = [...doc.querySelectorAll(".article-section")].find(node => {
      const heading = node.querySelector("h2");
      return heading && heading.textContent.trim() === spec.heading;
    });
    if (!section) return;
    section.after(makeSlot(doc, spec.key, spec.text));
  }

  function syncSlots() {
    try {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (!doc || !win) return;
      const route = (win.location.hash || "").slice(1) || frame.dataset.route || "";
      if (route !== "mobile" && route !== "mobile-100gb") return;

      normalizeRakutenBase(doc);
      ensureStyle(doc);

      if (route === "mobile") {
        MOBILE_SLOTS.forEach(spec => placeBySelector(doc, spec));
      } else {
        ARTICLE_SLOTS.forEach(spec => placeAfterHeadingSection(doc, spec));
      }
    } catch (error) {}
  }

  frame.addEventListener("load", () => {
    syncSlots();
    try {
      frame.contentWindow?.addEventListener("hashchange", () => requestAnimationFrame(syncSlots));
    } catch (error) {}
  });

  window.addEventListener("hashchange", () => requestAnimationFrame(syncSlots));
})();
