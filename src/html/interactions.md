# インタラクションの実装

## 宣言的インタラクション

インタラクションは基本的に宣言的に記述します。**JavaScriptでの実装は最小限に抑え、HTMLで実装できるものは可能な限りそれで実現します。**

- `<details>`要素
- `<dialog>`要素 + `<button command="show-modal">`要素
- `<div popover>`要素 + `<button command="toggle-popover">`要素

## `command`属性の利用

インタラクティブな呼び出し原則としては`button`要素を用いて、アクションは`command`属性を用います。

- `command`属性に規定されているアクションはそのまま活用してください
  - `command="toggle-popover"`: ポップオーバーUIの開閉
  - `command="show-popover"`: ポップオーバーUIの展開
  - `command="hide-popover"`: ポップオーバーUIの収納
  - `command="show-modal"`: モーダルUIの展開
  - `command="close"`: モーダルUIの収納

規定のアクション中の処理やカスタムコマンドの実装はJavaScriptで行います。[カスタムコマンド](../js/interactions.md#custom-command)の実装例を参照してください。
