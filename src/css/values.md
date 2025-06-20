# 値のルール

## 数値

<!-- prettier-ignore-start -->
```css
selector {
	/* 少数点の前の `0` は省略しない */
	opacity: 0.5; /* ✅ */
	opacity: .5; /* ❌ */
}
```
<!-- prettier-ignore-end -->

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## 単位

種類によって統一できる単位はひとつに統一してください。

| 種類             | 各単位                                    | 統一する単位 |
| ---------------- | ----------------------------------------- | ------------ |
| 長さの絶対的単位 | `px` `cm` `mm` `q` `in` `pt` `pc` `mozmm` | `px`         |
| 長さの相対的単位 | `em` `ex` `ch`                            | `em`         |
| 角度の単位       | `deg` `rad` `grad` `turn`                 | `deg`        |
| 時間の単位       | `ms` `s`                                  | `ms`         |

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## font-size

基本的に相対値を指定し、どういった意図で指定しているのかを**明示的に計算式で表現**します。

<!-- prettier-ignore-start -->
```css
selector {
	/* 単位は `em` `rem` `vw` を使用する */
	font-size: 1em; /* ✅ */
	font-size: 1.6rem; /* ✅ */

	/* ただし `em` `vw` の場合は何を基準にしているのかを明示的に `calc()` を使って指定する */
	/* ※ `calc()` は算出が可能な場合はPostCSSのプラグインによって実数に変換される */
	font-size: 3em; /* ❌ */
	font-size: 1.2em; /* ❌ */
	font-size: 0.5em; /* ❌ */
	font-size: 4vw; /* ❌ */
	font-size: calc(14 / 16 * 1em); /* ✅ 親要素が16pxだったときに14pxになる相対値を表わす 「.875em」に変換される */
	font-size: calc(36 / 320 * 100vw); /* ✅ ビューポートが320pxだったときに35pxになるvw値を表わす 「11.25vw」に変換される */
	font-size: calc(36 / var(--inline-size) * 100vw); /* ✅ ビューポートが変数--inline-sizeだったときに35pxになるvw値を表わす 値は--inline-sizeの内容によって変化する */
	font-size: calc(var(--font-size) / var(--inline-size) * 100vw); /* ✅ ビューポートが変数--inline-sizeだったときに--font-sizeになるvw値を表わす 値は--inline-sizeと--font-sizeの内容によって変化する */
}
```
<!-- prettier-ignore-end -->

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

### コンポーネント内の`font-size`の扱い

メンテナンス性を考慮して、次の設計を推奨します。

- コンポーネントのルートは親要素からの影響を受けにくくするために`rem`を指定する
- 全体のサイズ調整を容易にするためエレメントは`em`で指定する

```css
.c-header {
	font-size: 1.8rem;
}

@media (--sm-lte) {
	.c-header {
		font-size: calc(18 / 320 * 100vw);
	}
}

.c-header__el1 {
	font-size: calc(12 / 18 * 1em);
}

.c-header__el2 {
	font-size: calc(36 / 18 * 1em);
}
/* EOF */
```

## フォントウェイト

`400` `700` の場合はそれぞれ `normal` `bold` キーワードにする

```css
selector {
	font-weight: 400; /* ❌ */
	font-weight: bold; /* ✅ */
	font-weight: 500; /* ✅ `400` `700` 以外はキーワードはないので数値のままでよい */
}
```

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## 幅・高さ

`inline-size` `block-size` `max-inline-size` `max-block-size` `min-inline-size` `min-block-size` `flex-basis` を対象としたルール

<!-- prettier-ignore-start -->
```css
selector {
	/* ゼロは単位を付けない */
	inline-size: 0px; /* ❌ */
	inline-size: 0; /* ✅ */

	/* 単位は `px` `%` `em` `rem` `vw` `vh` を使用する */
	inline-size: 100px; /* ✅ */
	block-size: 5em; /* ✅ */
	max-inline-size: 50rem; /* ✅ */
	max-block-size: 100vw; /* ✅ */
	min-block-size: 100vh; /* ✅ */
	flex-basis: 100%; /* ✅ */

	/* ただし `%` `vw` `vh` の場合は何を基準にしているのかを明示的に `calc()` を使って指定する */
	inline-size: 5%; /* ❌ */
	inline-size: 50%; /* ❌ */
	flex-basis: 33.3%; /* ❌ */
	flex-basis: calc(100% / 3); /* ✅ 明示的な三等分 「33.33333%」に変換されます */
	block-size: calc(160 / 320 * 100vw); /* ✅ ビューポートが320pxだったときに160pxになるvw値を表わす 「50vw」に変換される */

	/* `100%` `100vw` `100vh` 以外の基準は意図がわかりにくいので避ける */
	max-inline-size: calc(160 / 320 * 54.2vw); /* ❌ */
	min-block-size: calc(2vw / 2); /* ❌ */
	min-block-size: calc(50vh / 2); /* ❌ */
	flex-basis: calc(105% / 3); /* ❌ */
	flex-basis: calc(120% / 3); /* ❌ */
	flex-basis: calc(200% / 3); /* ❌ */
	flex-basis: calc(1000% / 3); /* ❌ */

	/* その他の単位は混乱を避けるため使用しない */
	inline-size: 16ex; /* ❌ */
	inline-size: 16pt; /* ❌ */
	inline-size: 16cm; /* ❌ */
}
```
<!-- prettier-ignore-end -->

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## flex

```css
selector {
	/* growとshrinkは0か1を指定する */
	/* basisは「幅・高さのルール」に準じる */
	flex: 0 0 calc(100% / 3); /* ✅ */
	flex: 0 1 calc(100% / 3); /* ✅ */
	flex: 0 2 calc(100% / 3); /* ❌ */
	flex-grow: 0; /* ✅ */
	flex-grow: 1; /* ✅ */
	flex-grow: 2; /* ❌ */
	flex-shrink: 0; /* ✅ */
	flex-shrink: 1; /* ✅ */
	flex-shrink: 2; /* ❌ */
}
```

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::
