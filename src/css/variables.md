# カスタムプロパティ・カスタムクエリー・変数・関数・ミックスイン・プレースホルダー

## カスタムプロパティ

積極的に採用してください。

## カスタムクエリー

PostCSSによりカスタムクエリーは値に展開されます。

<!-- prettier-ignore-start -->
```css
/* コンパイル前 */
@media (--sm-lte) { /* ... */ }

/* コンパイル後 */
@media (max-width: 576px) { /* ... */ }
```
<!-- prettier-ignore-end -->

デフォルトテンプレート内に次のカスタムクエリーを準備しているので、レスポンシブコンポーネントのブレークポイントの設定に利用してください。

| カスタムクエリー | 内容                                   |
| ---------------- | -------------------------------------- |
| `--xs`           | xs のみ                                |
| `--sm`           | sm のみ                                |
| `--md`           | md のみ                                |
| `--lg`           | lg のみ                                |
| `--xl`           | xl のみ                                |
| `--xs-lte`       | xs 以下 = xs のみ                      |
| `--sm-lte`       | sm 以下                                |
| `--md-lte`       | md 以下                                |
| `--lg-lte`       | lg 以下                                |
| `--xl-lte`       | lg 以下                                |
| `--xs-gt`        | xs 超え                                |
| `--sm-gt`        | sm 超え                                |
| `--md-gt`        | md 超え                                |
| `--lg-gt`        | lg 超え                                |
| `--hr`           | 高解像度（レティナディスプレイ対応他） |

![図: ビューポートとブレークポイント](../img/breakpoint.png)

`--hr`は高解像度判定のクエリーなるので、低解像度と高解像度での出し分けを実装する差に利用することができます。

<!-- prettier-ignore-start -->
```scss
.c-anonymous {
	background: url("/img/bg-anonymous.png");

	@media (--hr) {
		background: url("/img/bg-anonymous@2x.png");
	}
}
```
<!-- prettier-ignore-end -->

::: tip `image-set`の利用
もしくは解像度による出し分けは`image-set`を利用しても構いません。

```scss
.c-anonymous {
	background-image: image-set(
		url('/img/bg-anonymous.png') 1x,
		url('/img/bg-anonymous@2x.png') 2x
	);
}
```

:::

## 変数

`$`で始まるSASSの変数が使用できますが**非推奨**です。

::: danger SASS変数の非推奨
CSSのエコシステム（Stylelintなど）がSASSのパースができなくなってきています。このため基本的にカスタムプロパティを利用してください。Stylelintが`parse`関連の警告を出す場合、SASS変数の利用を諦めて別の方法を検討してください。
:::

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## 関数

関数の定義は原則禁止です。

使用できるのはCSS標準によって規定されている関数や、SASSが標準機能としてもっている関数、PostCSSによりコンパイル時に変数を計算する`resolve`関数が使用できます。

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

## ミックスイン

### 宣言

```scss
@mixin mixin-name {
	/* declaration */
}
```

### 展開

```scss
selector {
	@include mixin-name; // ここで展開
}
```

## プレースホルダー

コンポーネントファイル内であれば`%`で始まる識別子でプレースホルダー機能を使用できます。プロパティが展開されるのは`%`を宣言した場所になるため、カスケーディングには十分に気をつけてください。

::: warning

<!-- prettier-ignore-start -->
```scss
// ❌ コンポーネント外の利用は禁止
%any-style {
	any-property: any-value;
}

// ✅ コンポーネント内で利用する
.c-component {
	%any-style {
		any-property: any-value;
	}

	&__element {
		@extend %any-style;
	}
}
```
<!-- prettier-ignore-end -->

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::
