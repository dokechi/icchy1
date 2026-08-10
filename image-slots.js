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

  const PINK = "#f04e7a";
  const PINK_SOFT = "#fff0f5";

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
        background:#fff;
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

  function forceRakutenTheme(doc) {
    const targets = [
      doc.documentElement,
      doc.body,
      doc.querySelector(".site"),
      doc.querySelector("main"),
      doc.querySelector(".page")
    ].filter(Boolean);

    for (const target of targets) {
      target.style.setProperty("--page-accent", PINK, "important");
      target.style.setProperty("--page-accent-soft", PINK_SOFT, "important");
      target.style.setProperty("--green", PINK, "important");
      target.style.setProperty("--green-soft", PINK_SOFT, "important");
    }

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

  function placeAfterHeadingSection(doc, spec) {
    if (doc.querySelector(`[data-image-slot="${spec.key}"]`)) return;
    const section = [...doc.querySelectorAll(".article-section")].find(node => {
      const heading = node.querySelector("h2");
      return heading && heading.textContent.trim() === spec.heading;
    });
    if (!section) return;
    section.after(makeSlot(doc, spec.key, spec.text));
  }

  function syncArticleSlots() {
    try {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      if (!doc || !win) return;
      const route = (win.location.hash || "").slice(1) || frame.dataset.route || "";
      if (route !== "mobile" && route !== "mobile-100gb") return;

      forceRakutenTheme(doc);
      if (route !== "mobile-100gb") return;

      ensureStyle(doc);
      ARTICLE_SLOTS.forEach(spec => placeAfterHeadingSection(doc, spec));
    } catch (error) {}
  }

  frame.addEventListener("load", () => {
    syncArticleSlots();
    try {
      frame.contentWindow?.addEventListener("hashchange", () => requestAnimationFrame(syncArticleSlots));
    } catch (error) {}
  });

  window.addEventListener("hashchange", () => requestAnimationFrame(syncArticleSlots));

  const script = document.createElement("script");
  script.src = "mobile-redesign.js";
  script.onload = () => window.dispatchEvent(new Event("hashchange"));
  document.head.appendChild(script);
})();
