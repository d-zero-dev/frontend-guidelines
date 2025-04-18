# パフォーマンスを意識した実装

## 実行頻度の多い処理に気をつける

ページが読み込まれた際に一度しか実行されない処理や、クリックなどのイベントは特に気にする必要は少ないですが、次に挙げるイベントはユーザーの自然な操作によってユーザーが気づかぬうちに頻繁に実行されます。処理の内容によってはパフォーマンスに影響を及ぼすので実装は十分に注意し、代替案やテクニックを使いパフォーマンスを向上させるようにしてください。

- `scroll`イベント
- `resize`イベント
- `mousemove`イベント
- `touchmove`イベント
- `wheel`イベント
- `setTimeout`
- `setInterval`

## イベントの代替となるAPIを利用する

イベントではなくAPIを利用することでパフォーマンスを向上させることができます。

### Intersection Observer API

[IntersectionObserver](https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver)はスクロールなどにより指定した要素がビューポート内に入った場合に、登録したリスナー関数を実行するAPIです。要素の位置を`scroll`イベントなどで監視する必要はありません。

### Resize Observer API

[ResizeObserver](https://developer.mozilla.org/ja/docs/Web/API/ResizeObserver)は要素のサイズが変更されたときに登録したリスナー関数を実行するAPIです。要素の幅を`resize`イベントや`setTimeout`で監視する必要はありません。

### matchMedia API

[window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)はメディアクエリ文字列をパースして現在のメディア状態の真偽を判定したり、状態が変更されたときに登録したリスナー関数を実行するAPIです。ウィンドウの幅を`resize`イベントで監視する必要はありません。

::: tip デスクトップとスマートフォンでの処理の書き分け

```ts
matchMedia(`(min-width: 768px)`).addEventListener('change', (media) => {
	if (media.matches) {
		// ブレークポイントの内側（スマートフォン）の処理
	} else {
		// ブレークポイントの外側（デスクトップ）の処理
	}
});
```

:::

## Passive Event Listener を利用する

```js
Element.addEventListener('wheel', onWheel, { passive: true });
```

`passive`を有効にすると`preventDefault()`の呼び出しを待たずにリスナー関数を実行するため、その関数がブラウザの既定のアクション（たとえばマウスホイール操作）をブロックすることがなくなります。

## 描画フレームを利用して処理を間引く

同じフレーム内で2回以上の処理が走る場合があります。`requestAnimationFrame`を利用して処理を間引くことでパフォーマンスを向上させることができます。

```ts
let rafId;
const update = function () {
	// 実行したい処理
};
const onMove = function () {
	cancelAnimationFrame(rafId);
	rafId = requestAnimationFrame(update);
};
element.addEventListener('touchmove', onMove, { passive: true });
```

## 同じ処理を何度も繰り返さない

戻り値が同じものが期待できる場合は変数化すること。

```ts
// ❌ `$('.c-component')` を繰り返している
$('.c-component').on('click', function () {
	const flag = $('.c-component').attr('data-flag');
	if (flag !== 'true') {
		$('.c-component').attr('data-flag', 'true');
	}
});

// ✅ `$('.c-component')`を変数化して使いまわす
const $component = $('.c-component');
$component.on('click', function () {
	const flag = $component.attr('data-flag');
	if (flag !== 'true') {
		$component.attr('data-flag', 'true');
	}
});
```
