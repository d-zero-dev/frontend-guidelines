# インタラクションの実装

[HTMLガイドライン](../html/interactions.md)に記載されているように、HTMLだけで実現できるものは、極力JavaScriptでの実装を**避けます**。

`command`属性に規定のないアクションや、アクション中のフックは`command`イベントを利用して実装します。

## カスタムコマンドの利用 {#custom-command}

```html
<button command="--custom-command" commandfor="target01">カスタムコマンド</button>

<div id="target01">カスタムコマンドの対象</div>
```

```ts
// ✅️ commandイベントを利用したインタラクション
document.getElementById('target01').addEventListener('command', (e) => {
	switch (e.command) {
		case '--custom-command': {
			// 呼び出し元ボタンの特定
			const invoker: HTMLButtonElement = e.source;
			// カスタムコマンドの処理
			console.log(`Hello, Custom Command: ${e.command}`);
			break;
		}
	}
});

// ⚠️ 実装意図や振る舞いの関連が不明確な実装は避けてください
document.querySelector('[commandfor="target01"]').addEventListener('clock', () => {
	document.getElementById('target01');
});
```
