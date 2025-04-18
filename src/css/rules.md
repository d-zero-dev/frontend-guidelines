# ルールの定義規則

headerコンポーネントの場合を例に解説します。

1階層目のセレクタはコンポーネントの定義となり、SCSSファイル内に一度だけ登場するようにします。
ファイルパスは `__assets/_libs/style/component/c-header.scss` となります。

```scss
.c-header {
	/* declaration */
}
/* EOF */
```

次にエレメントは、それにネストする形で`&`を利用したセレクタをつくります。

```scss
.c-header {
	/* declaration */

	&__body {
		/* declaration */
	}

	&__title {
		/* declaration */
	}

	&__site-name {
		/* declaration */
	}
}
/* EOF */
```

こうすることで、このファイルに記述されたスタイルの影響範囲が、コンポーネント内であることを保証します。

状態変化を表す場合も`&`を利用してネストして定義します。メディアクエリの定義も、ユーザエージェントの状態変化と捉えて同様にネストして定義します。

状態変化がエレメントを巻き込む場合はコードを後ろにまわして記述します。また、`&`がコンポーネントのクラスを表さないようなネストの状態になる場合があるので変数化して定義します。

<!-- prettier-ignore-start -->

```scss
.c-header {
	--foo-bar: 0; // カスタムプロパティ
	--foo-baz: calc(32 / 16 * 1em); // カスタムプロパティ

	/* declaration */

	@media (--sm-lte) { /* declaration */ } // メディアクエリ
	&:hover { /* declaration */ } // 疑似クラス
	&--compact-mode { /* declaration */ } // 状態クラス
	&[data-compact-mode="true"] { /* declaration */ } // data属性
	&[aria-hidden="true"] { /* declaration */ } // aria属性

	&__body {
		/* declaration */

		// 子孫要素も同様のルールになる
		@media (--sm-lte) { /* declaration */ } // メディアクエリ
		&:hover { /* declaration */ } // 疑似クラス
		&--compact-mode { /* declaration */ } // 状態クラス
		&[data-compact-mode="true"] { /* declaration */ } // data属性
		&[aria-hidden="true"] { /* declaration */ } // aria属性
	}

	// 影響がエレメントを巻き込む場合は、後ろに記述する
	&[data-fat-mode="true"] {
		/* declaration */

		.c-header__body { // ⚠️ `&` が使用できないスコープでは直接クラスを記述する
			/* declaration */
		}
	}
}
/* EOF */
```
<!-- prettier-ignore-end -->

疑似要素は子孫要素の前に定義し、これも`&`を利用する。疑似要素セレクタは`::`で定義してください。

<!-- prettier-ignore-start -->
```scss
.c-header {
	/* declaration */

	&[data-compact-mode="true"] { /* declaration */ }

	&::before { /* declaration */ }
	&::after { /* declaration */ }

	&__body {
		/* declaration */
	}
}
/* EOF */
```
<!-- prettier-ignore-end -->

::: warning `&`でクラス名を連結する是非について
フルのクラス名が検索にヒットしない理由から忌避されることがありますが、コンポーネントのクラス名とファイル名が一致していることを前提にしているため、`&`を利用してネストして記述するルールを採用しています。
:::

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::
