# style属性をなるべく変更しない

style属性からプロパティを直接書き換えて実装は避けてください。状態を変更する場合は、その状態を表す`data-*`属性を変更するようにしてください（「[HTMLガイドライン &gt; コンポーネントとエレメントの状態管理](../html/components.md#コンポーネントとエレメントの状態管理)」を参照）。状態変化によるスタイルはCSSで管理することによって、CSSにはスタイル、JavaScriptにはロジックと管理を分けることができます。

```js
// ❌ style属性で直接プロパティを書き換えている
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.style.inlineSize = '300px';
});

// ✅ 状態を表す属性を変更する
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.setAttribute('data-wide', 'true');
});
```

```css
[data-wide='true'] {
	inline-size: 300px;
}
```

## 動的な値を反映する場合

JavaScriptで動的な値を反映する場合は、カスタムプロパティを利用します。

```js
// ✅ カスタムプロパティを利用してスタイルを変更する
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.style.setProperty('--block-size', anotherElement.clientHeight + 'px');
});
```

```css
.c-component {
	--block-size: 10em;
	block-size: var(--block-size);
}
```
