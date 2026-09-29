# genkou

400字詰め原稿用紙の最小実装。

## 仕様

- 20 × 20 = 400字
- ブラウザ上でリアルタイム表示
- JavaScriptで文字を400字枠へ配置
- HTMXで生成APIを接続可能
- 印刷 / PDF保存はブラウザの印刷機能を利用
- 外部フレームワークなし

## 構成

- `index.html` — UI / 原稿用紙 / HTMX
- `app.js` — 400マス生成・文字配置・文字数管理

## 生成API

HTMXの `POST /generate` に `#source` を含める構成。

バックエンドはHTML断片を返せばそのまま `#generated` に差し込める。
