# HTMLへの読み込み

```html
<script src="/js/script.js" type="module"></script>
```

`type="module"`は必要です。

## 読み込み順とライブラリの依存関係

`import`を使用せずに`script`要素から直接ライブラリを読み込む場合、依存関係にあるものは読み込み順番が重要になるので注意してください。

```html
<head>
	<script src="/js/jquery.min.js" defer></script>
	<!-- ⚠️ jQueryを利用する場合は先に読み込む -->

	<script src="/js/script.js" type="module"></script>
</head>
```

::: danger 基本的には`import`を利用する

あくまでも`script`要素でライブラリを利用する場合です。基本的には`import`を利用してください。

```ts
import $ from 'jquery';

$('.c-component').on('click', function () {
	/* ... */
});
```

:::

## インラインJavaScript

次の条件下では`script`要素を利用してそのままHTML内にJavaScriptを記述しても構いません。

- タグマネージャーやトラッキングコードや、その他コンバージョンタグ
- FacebookなどSNSの埋め込みコード
- そのページにしか使わないことが保証されている再利用が難しいコード

::: warning インラインで記述する場合の注意

```html
<!-- ✅ moduleで記述します -->
<script type="module">
	// ...
</script>

<!--
  タグマネージャーなど属性も含めて加工せずそのまま貼り付けてください
  ※ビルドされたファイル上ではPrettierなどの影響でコードが整形される場合があります
-->
<script>
	(function (w, d, s, l, i) {
		/* ... */
	})(window, document, 'script', 'dataLayer', 'GTM-XXXXXXXX');
</script>

<!-- ❌ IE3時代のHTMLコメントフォールバックは書きません -->
<script>
	<!--
	// ↑↓このHTMLコメント
	-->
</script>
```

:::
