# ルールの定義規則

headerコンポーネントの場合を例に解説します。

1階層目のセレクタはコンポーネントの定義となり、CSSファイル内に一度だけ登場するようにします。
ファイルパスは `__assets/_libs/style/component/c-header.css` となります。

```css
.c-header {
	/* declaration */
}
/* EOF */
```

次にエレメントは、BEM記法に従ってフラットなセレクタで定義します。

```css
.c-header {
	/* declaration */
}

.c-header__body {
	/* declaration */
}

.c-header__title {
	/* declaration */
}

.c-header__site-name {
	/* declaration */
}
/* EOF */
```

こうすることで、このファイルに記述されたスタイルの影響範囲が、コンポーネント内であることを保証します。

状態変化を表す場合もBEM記法に従ってフラットなセレクタで定義します。メディアクエリの定義も含めて、コンポーネント内のすべてのスタイルを明示的に記述します。

<!-- prettier-ignore-start -->

```css
.c-header {
	--foo-bar: 0; /* カスタムプロパティ */
	--foo-baz: calc(32 / 16 * 1em); /* カスタムプロパティ */

	/* declaration */

	@media (--sm-lte) { /* declaration */ } /* メディアクエリ */
	&:hover { /* declaration */ } /* 疑似クラス */
	&[data-compact-mode="true"] { /* declaration */ } /* data属性 */
	&[aria-hidden="true"] { /* declaration */ } /* aria属性 */

	/* 影響がエレメントを巻き込む場合は、後ろに記述する */
	&[data-fat-mode="true"] {
		/* declaration */

		.c-header__body {
			/* declaration */
		}
	}
}

.c-header--compact-mode {
	/* declaration */
}

.c-header__body {
	/* declaration */
	/* 子孫要素も同様のルールになる */
	@media (--sm-lte) { /* declaration */ } /* メディアクエリ */
	&:hover { /* declaration */ } /* 疑似クラス */
	&[data-compact-mode="true"] { /* declaration */ } /* data属性 */
	&[aria-hidden="true"] { /* declaration */ } /* aria属性 */
}

.c-header__body--compact-mode {
	/* declaration */
}


```
<!-- prettier-ignore-end -->

疑似要素は個別にセレクタを定義し、疑似要素セレクタは`::`で定義してください。

<!-- prettier-ignore-start -->
```css
.c-header {
	/* declaration */

	&[data-compact-mode="true"] { /* declaration */ }

	&::before { /* declaration */ }
	&::after { /* declaration */ }
}

.c-header__body {
	/* declaration */
}
```
<!-- prettier-ignore-end -->

::: warning BEM記法での記述について
フルのクラス名が検索にヒットしやすく、セレクタが明示的であることから、BEM記法に従ってフラットなセレクタで記述するルールを採用しています。コンポーネントのクラス名とファイル名が一致していることを前提にしています。
:::

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::
