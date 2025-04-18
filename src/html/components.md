# コンポーネント

ページを構成するパーツを**コンポーネント**という単位で管理します。

これは**スタイルシートのための規定**であり、以下のような問題を未然に防ぐことを目的としています。

- クラス名のコンフリクト（重複）および予期しないスタイル上書き
- スタイル変更による子孫要素への予期しない影響

## コンポーネントの構成とクラス命名規則

コンポーネントはそれ自身である**コンポーネントルート**と子孫要素となる**エレメント**で構成されます。

::: tip BEMとの違い
基本的に似た概念をもちます。

| BEMの概念 | ディーゼロの概念 |
| --------- | ---------------- |
| Block     | コンポーネント   |
| Element   | エレメント       |
| Modifier  | 状態             |

と捉えて差し支えありません。classの命名規則はBEMの本家とは異なります。
:::

**コンポーネントルート**はクラス名によって明示的に定義され、【`c-` + `コンポーネント名`】というclassをもちます。
要素の種類・class以外の属性に関しては、コンポーネントに最適なものを選択しマークアップします。（👉[セマンティックとアクセシビリティ](#🤔-セマンティックとアクセシビリティ)）

```html
<!-- "header"コンポーネントの場合 -->
<header class="c-header"></header>
```

**コンポーネントはコンポーネントを内包することができます**。

```html
<!-- "header"コンポーネントの場合 -->
<header class="c-header">
	<!-- ❗内包される"nav-global"コンポーネント -->
	<nav class="c-nav-global"></nav>
</header>
```

コンポーネントルートの子孫要素は、コンポーネント以外は**エレメント**となります。エレメントのclassは【`c-` + `コンポーネント名` + `__` + `エレメント名`】という命名規則でつけます。※ただしこのclassはスタイルシートのために必要なもので、エレメントに対しては必ずしも必要なわけではありません。classのないエレメントが存在してもかまいません。

```html
<!-- "header"コンポーネントの場合 -->
<header class="c-header">
	<div class="c-header__body">
		<div class="c-header__title">
			<h1 class="c-header__site-name"><span>サイト名</span></h1>
			<p class="c-header__description">概要文</p>
		</div>
		<div class="c-header__info">
			<ul class="c-header__links">
				<!-- ❗classのないエレメント -->
				<li>
					<a href="/about-us/"><span>我々について</span></a>
				</li>
				<li>
					<a href="/sitemap/"><span>サイトマップ</span></a>
				</li>
			</ul>
			<a class="c-header__tel" href="tel:0000000000"><span>00-0000-0000</span></a>
		</div>
		<div class="c-header__nav-global-wrapper">
			<!-- 内包される"nav-global"コンポーネント -->
			<nav class="c-nav-global"></nav>
		</div>
	</div>
</header>
```

エレメントの命名規則については次の理由から規定されています。

- 単純な子孫セレクタでは、内包するコンポーネントへの影響をコントロールできない
- 単純な子セレクタ・子孫セレクタでは、ライブラリなどで定義される外部のクラスのコンフリクトを完全に防げない
- どのコンポーネントに帰属するか明瞭
- エレメントの詳細度の差を小さくできる

内包したコンポーネントの子孫に、自分の子孫を定義してはいけません。

```html
<!-- "header"コンポーネントの場合 -->
<header class="c-header">
	<div class="c-header__c-nav-global">
		<!-- 内包される"nav-global"コンポーネント -->
		<nav class="c-nav-global">
			<!-- ✅ 良い例: これは直属のコンポーネントのエレメントなので問題ない -->
			<ul class="c-nav-global__list">
				...
			</ul>

			<!-- ❌ 悪い例: 先祖にあるコンポーネントのエレメントはここには定義できない -->
			<div class="c-header__nav-element">...</div>
		</nav>
	</div>
</header>
```

1つの要素に複数のclassを定義してはいけません。コンポーネントを拡張したい場合は、完全に別のコンポーネントを作ってください。

```html
<!-- ✅ 良い例 -->
<header class="c-header-specific">
	<!-- Elements... -->
</header>

<!-- ❌ 悪い例 -->
<header class="c-header c-header-specific">
	<!-- Elements... -->
</header>
```

::: tip 👮‍♀️ 自動検知
このルールは*Markuplint*によって警告されます。
:::

## コンポーネントとエレメントの状態管理

要素の状態（BEMでいうところのModifier）は、原則classを用いません。
次の優先順位で状態を管理します。

1. 各HTML要素のもつ属性（`disabled`属性、`required`属性など）
2. ARIA属性（`aria-expanded`、`aria-readonly`など）
3. `data-*`属性

例えば、`disabled`属性を有効にすれば、暗黙的に`aria-disabled`も有効になる性質があるので、関連する属性とARIA属性は二重定義しないようにしてください。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例: ネイティブの属性があるものは属性で管理する -->
<button type="button" disabled>ボタン</button>

<!-- ❌ 悪い例: 属性で済むものをaria属性やdata属性に再定義したりする -->
<button type="button" aria-disabled="true" data-disabled="true">ボタン</button>
```
<!-- prettier-ignore-end -->

:::warning `hidden`属性の扱い
`hidden`属性と`aria-hidden`の意味は異なるため、同じものとして扱ってはいけません。

`aria-hidden`属性は単純に支援技術に要素を隠すためのARIAステートです。しかし`hidden`属性は「現在のページの状態とその要素が関連性がまだない（将来は関連性が出てくる可能性がある）」もしくは「以前は関連性があったが現在はもう関連性がない」という意味を持つためです。値を`until-found`として自動展開可能な要素に対しては`hidden`属性を利用することはもちろんできますが`aria-hidden`とはこれも性質が異なるため代替にはならないことに注意してください。
:::

HTMLの属性にもWAI-ARIAにもどちらにもない状態を管理する場合（例えばスクロール位置でヘッダーの高さが変わる）などは、`data-compact-mode`のような`data-*`属性で定義します。

```html
<!-- 通常は data-compact-mode が false -->
<header class="c-header" data-compact-mode="false"></header>
```

```js
const header = document.querySelector('.c-header');
window.addEventListener('scroll', () => {
	// スクロール位置が100pxを超えたらコンパクトモードにする
	header.dataset.compactMode = window.scrollY > 100 ? 'true' : 'false';
});
```

::: danger ❌ スタイルのみの目的に `data-*` 属性を利用する
`data-*`属性はあくまでもJavaScriptで**状態**を変化させるケースで扱います。スタイルのみの目的で`data-*`属性を利用することは避けてください。

```html
<!-- ❌ 悪い例 -->
<header class="c-header">
	<div data-header="inner">
		<div data-header="logo">サイト名</div>
	</div>
</header>

<!-- ✅ 良い例 -->
<header class="c-header">
	<div class="c-header__inner">
		<div class="c-header__logo">サイト名</div>
	</div>
</header>
```

:::

## 粒度とコンポーネントの例

コンポーネントに分割する粒度はプロジェクトごとに異なりますが、以下の例を参考にしてください。なお、再利用できるかどうかは重要ではなく、コンポーネントが独立して完結すること、他のコンポーネントに影響を与えないことが重要です。

メインコンテンツコンポーネントのみ専用のルールがあるので、[メインコンテンツのエレメントとヘルパークラス](#main)を参照してください。

| コンポーネント名         | クラス名            | 望ましい対象の HTML 要素                        | 備考                                                                                                                                                                                                                                       |
| ------------------------ | ------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ページ                   | `c-page`            | `body`要素                                      | トップページ・下層ページでレイアウトなどが共通している場合。全体レイアウトのスタイルはここに定義する。                                                                                                                                     |
| ページ（トップページ用） | `c-page-home`       | `body`要素                                      | トップページ限定。全体レイアウトのスタイルはここに定義する。                                                                                                                                                                               |
| ページ（下層ページ用）   | `c-page-sub`        | `body`要素                                      | 下層ページ全般。全体レイアウトのスタイルはここに定義する。                                                                                                                                                                                 |
| ヘッダー                 | `c-header`          | `header`要素                                    | ページで一番外側にあるヘッダー要素。ロゴのリンクや、グロナビ以外の小さなリンク集を内包することもある。                                                                                                                                     |
| フッター                 | `c-footer`          | `footer`要素                                    | ページで外側にあるフッター要素。サイトマップのようなリンクリストや組織情報などを内包することもある。                                                                                                                                       |
| グローバルナビゲーション | `c-nav-global`      | `nav`要素                                       | サイトの全体を横断するリンクメニュー。                                                                                                                                                                                                     |
| ローカルナビゲーション   | `c-nav-local`       | 特になし                                        | 自分のページの兄弟・下層のリンクメニュー。                                                                                                                                                                                                 |
| メインコンテンツ         | `c-content-main`    | `main`要素もしくは`article`要素を先祖にもつ要素 | ページの主要素。CMSで管理されるページや記事の本文にあたる部分が該当する。このコンポーネントのみ扱いが特殊になる。（👉[メインコンテンツのエレメントとヘルパークラス](#main)）                                                               |
| コンテンツインデックス   | `c-content-index`   | `main`要素を先祖にもつ要素                      | 各ページへの目次・リンク集となっているページで利用されるコンポーネント。CMSで管理されるブログ記事一覧やカテゴリーインデックス・タグインデックスなどで利用される。                                                                          |
| パンくずリスト           | `c-nav-breadcrumbs` | 特になし                                        | [Google の推奨する構造化データ](https://developers.google.com/search/docs/advanced/structured-data/breadcrumb?hl=ja#microdata)を利用すること。形式は microdata（schema.org）が望ましい。HTML の構造上難しければ JSON-LD を利用すると良い。 |
| ステップナビゲーション   | `c-nav-steps`       | 特になし                                        |
| ページネーション         | `c-pagination`      | 特になし                                        |
| メインビジュアル         | `c-hero`            | `section`                                       |
| 検索フォーム             | `c-search`          | 特になし                                        |

### コンポーネント化すべきでないパーツや要素

再利用よりも他の要素への影響がないことを優先するために、次に挙げるパーツ・要素はコンポーネント化を避けてください。

- ボタン単体
- フォームコントロール要素（テキストフィールド・ラジオボタン・セレクトボックスなど）単体

コンポーネントごとに微妙なサイズ感やインタラクションがあることが多いのでコンポーネントとして独立は避け、コンポーネントの**エレメント**として扱ってください。同じデザインでも**再利用よりも他への影響がないことを優先してください**。

```html
<header class="c-header">
	<button class="c-header__btn">ボタン</button>
</header>

<footer class="c-footer">
	<button class="c-footer__btn">ボタン</button>
</footer>
```

## コンポーネント・エレメントの命名規則

クラス名は、ファイル名に関係するので機能から検索・サジェスト・ソートしやすいように、`[機能名]-[修飾語・詳細]-[連番]`という組み合わせで命名します。文法上は不自然かもしれませんが機能性を優先させます。`[機能名]`以外は任意です。それぞれの単語や形容詞はコーディング全般に関わる識別子の命名規則に準じてください（👉[識別子の命名規則](../naming/index.md)）。

### 機能名の例

- `page`
- `header`
- `footer`
- `nav`

### 修飾語・詳細が付いた例

- `nav-global`
- `nav-local`
- `nav-breadcrumbs`
- `nav-steps`
- `page-home`
- `page-sub`
- `page-contact`

### 連番が付いた例

- `selection-01`
- `selection-02`
