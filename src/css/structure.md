# ファイル構成

ファイルは以下の構成で管理します。

```
# リソース管理
📂 __assets/
├── 📂 htdocs/css/
│   ├── style.scss
│   └── bge_style.scss
└── 📂 _libs/
		├── 📂 component/
		│   ├── c-component-name-a.scss
		│   ︙
		│   └── c-component-name-z.scss
		└── 📂 style/
			├── 📂 base/
			│   └── root.scss
			└── 📂 general/
				├── all.scss
				├── body.scss
				├── button.scss
				├── tag-name-a.scss
				︙
				└── tag-name-z.scss

# 公開ファイル
📂 htdocs/css/
├── style.css
└── bge_style.css
```

`__assets/htdocs`フォルダの内容は**フォルダ構造をそのまま**にドキュメントルートの`htdocs`にCSSファイルとしてコンパイルされ出力されます。

## `__assets/htdocs/css/style.scss`

`style.css`にコンパイルするSCSSファイルです。`@import`を利用して各断片ファイルをインポートし、ここにスタイルは定義しないようにしてください。`@import`は***PostCSS*のCSS変換**によりインライン化されます。パスは`@`で始めることにより`__assets/_libs`フォルダをルートとして指定します（ビルド設定によっては変わります）。

CSSレイヤーを利用してインポートするファイルを分類します。

```scss
@import 'destyle.css' layer(reset);

@layer base {
	@import '@/style/base/root.scss';
}

@layer general {
	@import '@/style/general/all.scss';
	@import '@/style/general/body.scss';
	@import '@/style/general/button.scss';
	@import '@/style/general/img.scss';
}

@layer components {
	@import '@/component/c-page-home.scss';
	@import '@/component/c-page-sub.scss';
	@import '@/component/c-header.scss';
	@import '@/component/c-footer.scss';
	@import '@/component/c-nav-global.scss';
	@import '@/component/c-nav-breadcrumb.scss';
	@import '@/component/c-title-page.scss';
	@import '@/component/c-pagination.scss';
	@import '@/component/c-content-main.scss';
}

@layer reset, base, general, components;
```

::: danger プレースホルダーの禁止

カスケード（定義の順番）が期待通りにしにくい問題があるので**プレースホルダー**を`__assets/_libs/style/theme/`内に定義するは原則禁止とします。

```scss
// ❌ プレースホルダーの利用は原則禁止
%any-style {
	any-property: any-value;
}

// ✅ ミックスインを利用する
@mixin anyMixin {
	any-property: any-value;
}
```

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

::: warning ミックスインの利用時の注意

タグやクラスに依存するミックスインは作らないようにしてください。影響範囲を予測できなくなるため`@mixin`のスコープ内に子孫セレクタをつくらないようにしてください。

```scss
// ❌ 特定のタグでしか利用できないミックスインは作らない
@mixin anyList {
	display: flex;

	// ❌ ミックインのスコープ内に子孫セレクタをつくらない
	li {
		flex: 0 1 auto;
	}
}
```

:::

## `__assets/_libs/style/base/root.scss`

ルート要素に対するスタイル定義を定義します。セレクタは`:root`だけで、他のセレクタを含めないようにしてください。

グローバルスコープのカスタムプロパティを定義する場合は、`:root`セレクタ内で行なってください。**Figmaで定義されたバリアブルスはここに定義します**。

```scss
:root {
	--lightest-color: #fff;
	--darkest-color: #333;

	// 配色
	--base-font-color: var(--darkest-color);
	--border-color: var(--darkest-color);

	// タイポグラフィ
	--base-font-size: 16px;
	--base-line-height: 1.8;
}
```

## `__assets/_libs/style/general/`

クラスやIDの付かない素の要素に対してスタイルを定義します。ファイル名はタグ名（要素名）となります。セレクタは当然タイプセレクタのみとなります。

- 例) `<body>` → `body.scss`
- 例) `<a>` → `a.scss`

コンポーネントをまたいだ各要素、つまりページ全体に影響があることに注意してください。そのため必要最小限の定義に留めることを心掛けてください。コンポーネントで定義できるものはコンポーネント内で定義してください。

全要素対象の場合は`all.scss`ファイルに`*`（全称セレクタ）で定義します。

```scss
// all.scssの例
* {
	&,
	&::before,
	&::after {
		box-sizing: border-box;
	}
}
```

また、定義をしてよい理由は主に以下に限定します。

- サイト全体で共通すると断定できる場合。 **ただし、ほとんどの場合、その判断は失敗に終わるので推奨しないでください。**
- CMSなどから入力された要素を、セレクターで判定できない場合（判定できない構造は、HTMLとCSSの設計を見直す方を優先します）

## `__assets/_libs/style/component/`

要素はコンポーネント単位に分割して管理します。（👉[HTMLガイドライン &gt; コンポーネント](../html/components.md)）
ファイル名はコンポーネント名とします。 **ひとつのファイルの中に複数のコンポーネントを定義しないでください**。

- 例) `<header class="c-header-page">` → `c-header-page.scss`
- 例) `<nav class="c-nav-global">` → `c-nav-global.scss`
