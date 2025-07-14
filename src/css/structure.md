# ファイル構成

ファイルは以下の構成で管理します。

```
# リソース管理
📂 __assets/
├── 📂 htdocs/css/
│   ├── style.css
│   └── bge_style.css
└── 📂 _libs/
		├── 📂 component/
		│   ├── c-component-name-a.css
		│   ︙
		│   └── c-component-name-z.css
		└── 📂 style/
			├── 📂 base/
			│   └── root.css
			└── 📂 general/
				├── all.css
				├── body.css
				├── button.css
				├── tag-name-a.css
				︙
				└── tag-name-z.css

# 公開ファイル
📂 htdocs/css/
├── style.css
└── bge_style.css
```

`__assets/htdocs`フォルダの内容は**フォルダ構造をそのまま**にドキュメントルートの`htdocs`にCSSファイルとしてコンパイルされ出力されます。

## `__assets/htdocs/css/style.css`

`style.css`のメインファイルです。`@import`を利用して各断片ファイルをインポートし、ここにスタイルは定義しないようにしてください。`@import`は***Vite*のCSS変換**によりインライン化されます。パスは`@`で始めることにより`__assets/_libs`フォルダをルートとして指定します（ビルド設定によっては変わります）。

CSSレイヤーを利用してインポートするファイルを分類します。

```css
@import 'destyle.css' layer(reset);
@import '@/style/base/root.css' layer(base);
@import '@/style/general/all.css' layer(general);
@import '@/style/general/body.css' layer(general);
@import '@/style/general/button.css' layer(general);
@import '@/style/general/img.css' layer(general);
@import '@/component/c-page-home.css' layer(components);
@import '@/component/c-page-sub.css' layer(components);
@import '@/component/c-header.css' layer(components);
@import '@/component/c-footer.css' layer(components);
@import '@/component/c-nav-global.css' layer(components);
@import '@/component/c-nav-breadcrumb.css' layer(components);
@import '@/component/c-title-page.css' layer(components);
@import '@/component/c-pagination.css' layer(components);
@import '@/component/c-content-main.css' layer(components);

@layer reset, base, general, components;
```

## `__assets/_libs/style/base/root.css`

ルート要素に対するスタイル定義を定義します。セレクタは`:root`だけで、他のセレクタを含めないようにしてください。

グローバルスコープのカスタムプロパティを定義する場合は、`:root`セレクタ内で行なってください。**Figmaで定義されたバリアブルスはここに定義します**。

```css
:root {
	--lightest-color: #fff;
	--darkest-color: #333;

	/* 配色 */
	--base-font-color: var(--darkest-color);
	--border-color: var(--darkest-color);

	/* タイポグラフィ */
	--base-font-size: 16px;
	--base-line-height: 1.8;
}
```

## `__assets/_libs/style/general/`

クラスやIDの付かない素の要素に対してスタイルを定義します。ファイル名はタグ名（要素名）となります。セレクタは当然タイプセレクタのみとなります。

- 例) `<body>` → `body.css`
- 例) `<a>` → `a.css`

コンポーネントをまたいだ各要素、つまりページ全体に影響があることに注意してください。そのため必要最小限の定義に留めることを心掛けてください。コンポーネントで定義できるものはコンポーネント内で定義してください。

全要素対象の場合は`all.css`ファイルに`*`（全称セレクタ）で定義します。

```css
/* all.cssの例 */
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

- 例) `<header class="c-header-page">` → `c-header-page.css`
- 例) `<nav class="c-nav-global">` → `c-nav-global.css`
