# 検証結果

最新実施日: 2026-08-27 JST

## 結果

- 静的検証: **62 / 62 通過**
- CSS構文: 5 / 5 通過
- JavaScript構文: 2 / 2 通過
- HTML内のID重複: なし
- スマホ横方向のはみ出し: なし
- 通常文字サイズのトップ: 検証した全幅で1画面内

## 今回確認したファイル

- `index.html`
- `retro-icchy.css`
- `retro-base.css`
- `retro-mobile.css`
- `retro-insurance.css`
- `retro-consultation.css`
- `retro-icchy.js`
- `insurance-consultation/index.html`
- `README.md`
- `CHANGELOG.md`
- `deploy-version.txt`

`mobile.html` と `app.html` は、本文・比較処理・料金データ・制度内容・公式リンク・広告リンクを変更していません。`index.html`からiframeへ読み込んだ後、`retro-icchy.css` と `retro-icchy.js` を追加して表示を変更します。

## 構造・導線

- トップの選択肢が「スマホ」「保険」の2つであること
- `#mobile` が既存の `mobile.html` を開くこと
- `#insurance` が既存の `app.html#insurance` を開くこと
- 楽天モバイルの表示が最強家族割後 **3,168円**、通常 **3,278円**の併記になっていること
- 楽天比較ページの既存切替UIを検出できること
- 現在の保険ページ `.insurance-story-page` を検出できること
- 保険相談ページのAccessTradeリンクと `sponsored` 表示を維持していること
- 「最初の4択」表記を「最初の2択」へ修正したこと

## ブラウザ表示

Chromiumで次の幅を確認しました。

| 画面 | 320px | 390px | 820px |
|---|---:|---:|---:|
| トップの横はみ出し | なし | なし | なし |
| トップの1画面表示 | 通過 | 通過 | 通過 |
| 保険相談ページの横はみ出し | なし | なし | なし |
| 楽天比較の代表構造 | なし | なし | なし |
| 保険ページの代表構造 | なし | なし | なし |

トップはそれぞれ次の高さでも検証しました。

- 320 × 700
- 390 × 844
- 820 × 900

すべて `scrollWidth <= clientWidth`、トップは `scrollHeight <= clientHeight` でした。

## JavaScript

- `retro-icchy.js`: `node --check` 通過
- `index.html` のインラインスクリプト: `node --check` 通過
- iframe内へ上書きCSS・補助JSを一度だけ読み込むこと
- 元の料金比較JSや保険ページのレンダリング関数を置き換えないこと

## CSS

- `tinycss2` によるパースエラー: 0件
- 分割CSS全体の波括弧: 324組で一致
- 意図的な点滅、虹色、回転、バウンドアニメーション: なし
- `prefers-reduced-motion` 対応を維持

## 補足

楽天比較ページと保険ページは既存HTMLを実行時に描画するため、代表的な現在のDOM構造でも上書きCSSを確認しました。公開後も、料金や制度の更新時は元の `mobile.html` / `app.html` の内容を更新すれば、今回の見た目を保ったまま反映できます。
