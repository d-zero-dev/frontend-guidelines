# セマンティックとアクセシビリティ

各要素のコンテンツモデルを理解し、コンポーネントや機能、文脈によって最適なタグを選択してください。

## WAI-ARIA

WAI-ARIAをHTMLに付加することで、HTMLでは不足している要素のセマンティックを補うことができます。しかし、WAI-ARIAが必要なケースは多くなく、HTML標準では再現できないコンポーネントを作成するときのみ使用してください。その場合、[ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)を参考にして、インタラクションの要件や振る舞いを推奨されているものに近い実装をするようにしてください。

- 🙆 WAI-ARIAを使う必要があるケース
  - `button`要素が`aria-pressed`や`aria-expanded`などの状態をもつ必要がある場合
  - タブやカルーセルなどHTMLにないコンポーネントを扱う場合
- 🙅 WAI-ARIAを使う必要がないケース
  - HTML標準にコンポーネントが存在する場合
  - Popoverなどで事済む場合

## 画像と代替テキスト

代替テキストはWCAGの[達成基準 1.1.1 非テキストコンテンツ](https://waic.jp/translations/WCAG22/#non-text-content)を基準に考えてください。**同等の目的**が重要となるため、コーディングではなくデザインの段階で代替テキストが決まるように計画を立ててください。

::: tip `alt`属性が空の場合のロール

`alt`属性を空にすると、`role="none"`（または`role="presentation"`）を付与したことと同じ効果が得られます。そのため`alt`属性が空の場合は`role="none"`を付与する必要はありません。

```html
<!-- ❌ role="none"は不要 -->
<img src="/path/to/file.png" alt="" role="none" />
```

:::

## `img`要素の性質を理解する

`img`要素の扱いでは次のことに注意してください。

### 画像の出し分け

`display: none`の状態でも画像リソースのリクエストはされます（ `loading="lazy"`になっている場合を除く）。そのため、レスポンシブデザインで画像を出し分ける場合は **`picture`要素**をつかってください。

```html
<!-- ✅ 良い例 -->
<picture>
	<source srcset="/path/to/pict-some@xs.jpg" media="(max-width: 575px)" />
	<img src="/path/to/pict-some.png" alt="代替テキスト" />
</picture>

<!-- ❌ 悪い例 -->
<img class="sp-only" src="/path/to/pict-some@xs.png" alt="代替テキスト" />
<img class="pc-only" src="/path/to/pict-some.png" alt="代替テキスト" />
```

### レイアウトシフトを発生させない

- `width`属性と`height`属性を指定して縦横比を明示しないといけないケース
  - 親要素に依存せず画像を成り行きで表示させる場合
  - 親要素によって幅は変わるが、高さが画像によって可変する場合
- 明示しなくていいケース
  - CSSで`inline-size`(`width`)と`block-size`(`height`)を同時に指定している場合（ただし`block-size`が`auto`でない）
  - CSSで`inline-size`(`width`)か`block-size`(`height`)のどちらかを指定していて、且つ`aspect-ratio`を指定している場合
  - 幅と高さが親要素に完全に依存して、CSSの`object-fit` を使っている場合

:::tip 自動付与
`width`属性と`height`属性はビルド自動的に付与されるので、開発時に気にする必要はそんなにありません。ただし、ビルド時に画像のサイズが取得できない場合は手動で指定してください。
:::

### 遅延デコード・遅延読み込みの設定

- `decoding`属性はブラウザが適宜最適化しているため、指定しないでください
- ファーストビュー以下の`img`要素にはなるべく`loading="lazy"`を指定して、表示領域にない要素の自動ダウンロードを避けます

## 見出しとアウトライン

見出し要素のみでアウトラインを構成してもよいですし、セクショニング・コンテンツを利用してアウトラインを構成してもよいです。

```html
<!-- ✅ 見出し要素のみでアウトラインを構成する -->
<h1>大見出し</h1>
<div>大見出しのコンテキスト</div>
<h2>中見出し</h2>
<div>中見出しのコンテキスト</div>
<h3>小見出し</h3>
<div>小見出しのコンテキスト</div>

<!-- ✅ セクショニング・コンテンツを利用した場合 -->
<h1>大見出し</h1>
<div>大見出しのコンテキスト</div>
<section>
	<h2>中見出し</h2>
	<div>中見出しのコンテキスト</div>
	<section>
		<h3>小見出し</h3>
		<div>小見出しのコンテキスト</div>
	</section>
</section>
```

::: danger 見出しレベルの注意点

```html
<!-- ❌ 廃止されたアウトラインアルゴリズムでランクを作る -->
<h1>大見出し</h1>
<div>大見出しのコンテキスト</div>
<section>
	<h1>中見出し</h1>
	<div>中見出しのコンテキスト</div>
	<section>
		<h1>小見出し</h1>
		<div>小見出しのコンテキスト</div>
	</section>
</section>

<!-- ❌ 見出しレベルのスキップ -->
<h1>大見出し</h1>
<div>大見出しのコンテキスト</div>
<section>
	<h6>中見出し</h6>
	<div>中見出しのコンテキスト</div>
	<section>
		<h4>小見出し</h4>
		<div>小見出しのコンテキスト</div>
	</section>
</section>
```

::: tip 👮‍♀️ 自動検知
このルールは*Markuplint*によって警告されます。
:::

## ランドマーク

各コンポーネントの先祖となる要素にはランドマークを設けること。もしくはコンポーネントルート自体をランドマークをもつ要素でマークアップしてください。

```html
<body>
	<header><!-- header は banner ランドマークをもつ --></header>
	<nav><!-- nav は navigation ランドマークをもつ --></nav>
	<main><!-- main は main ランドマークをもつ --></main>
	<footer><!-- footer は contentinfo ランドマークをもつ --></footer>
</body>
```

```html
<body>
	<header><!-- ... --></header>
	<div class="c-hero">
		<!-- ❌ どのランドマークにも属していない -->
	</div>
	<nav><!-- ... --></nav>
	<main>
		<div class="c-hero">
			<!-- ✅ mainランドマークに内包されている -->
		</div>
	</main>
	<footer><!-- ... --></footer>
</body>
```

::: warning 重複するランドマークロールの注意

ドキュメント内に複数のランドマーク要素がある場合、**明示的にアクセシブルな名前を設定してください**。

```html
<body>
	<header>
		<nav aria-label="メインメニュー"><!-- ... --></nav>
	</header>
	<main>
		<nav aria-label="ページ内メニュー"><!-- ... --></nav>
	</main>
	<footer>
		<nav aria-labelledby="sitemap">
			<h2 id="sitemap">ページ一覧</h2>
			<!-- ... -->
		</nav>
	</footer>
</body>
```

:::

::: tip 🤖 機械チェック可能
このルールは*Axe*によってチェック可能です。
:::

## `p`要素を濫用しない

`p`要素は**段落**を表しますが、他の要素で補えるテキストであれば`p`要素を使う必要はありません。また、テキストや文字の代替画像でないかぎり画像単体を`p`要素で囲うのは不適切と言えます。縦に並べる要素がある場合は`div`要素を使ってください。

```html
<!-- ❌ 悪い例 -->
<section>
	<h2>見出し</h2>
	<!-- 文章テキストの代替画像でなければ"段落"にする必要はない -->
	<p><img src="/path/to/file.png" alt="画像" /></p>
	<p>〜コンテキスト〜</p>
</section>
```

## `br`要素の原則禁止

`br`要素はテキストを改行し、縦に方向に続きのテキストを送ることができますが、見た目の調整に使うことは避けてください。`span`要素でテキストを囲み、CSSの`display`プロパティの`inline-block`や`block`、`flex`を活用してください。例外は詩・ポエムです。

```html
<!-- ❌ 悪い例 -->
<p>こんにちは。<br class="sp-break" />さようなら。</p>

<!-- ✅ 良い例 -->
<p><span>こんにちは。</span><span>さようなら。</span></p>
```

::: tip 👮‍♀️ 自動検知
このルールは*Markuplint*によって警告されます。
:::
