from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")

old = '''        <a class="action-panel compare-panel" href="${INSURANCE_URL}" target="_blank" rel="nofollow sponsored noopener">
          <span>STEP 2</span>
          <strong>2〜3社の見積もりを出してもらう（PR）</strong>
          <small>契約義務なし／その日に決めなくていい</small>
          <b>↗</b>
        </a>'''

new = '''        <a class="action-panel compare-panel" href="./insurance-consultation/">
          <span>STEP 2</span>
          <strong>無料相談を使う前に知っておくこと</strong>
          <small>営業の調査力は使う／その場では契約しない</small>
          <b>›</b>
        </a>'''

matches = text.count(old)
if matches != 1:
    raise SystemExit(f"Expected one matching insurance CTA, found {matches}")

path.write_text(text.replace(old, new), encoding="utf-8")
