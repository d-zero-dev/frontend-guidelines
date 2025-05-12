# コードスタイル

_EditorConfig_、_Markuplint_、_pug-lint_、_Prettier_ それぞれに設定されているルールに則って記述します。エディタやコマンド実行時に警告が出た場合は**必ず修正してください**。

各設定は以下のパッケージを利用しています。

- [@d-zero/markuplint-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/markuplint-config)
- [@d-zero/pug-lint-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/pug-lint-config)
- [@d-zero/prettier-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/prettier-config)

::: danger リントエラーについて
例外なく必ずリントエラーを修正してください。**リンターのルールが現状にそぐわない場合はルールの見直し、つまりConfigファイルの変更を行ってください**。
:::

## 改行・インデント

原則、ネストしたタグは改行・インデントしてください。親子・兄弟関係を明確にし、エディタのコード折りたたみ機能が有効になり、コードの読みやすさに繋がります。ただし、要素のスタイルがインライン（`inline`、`inline-block`など）で、前後のホワイトスペースがレンダリングに影響を及ぼす可能性のあるタグについてはこの限りではありません。

<details>
<summary>コード例</summary>

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例 -->
<ul>
	<li>apple</li>
	<li>orange</li>
	<li>banana</li>
</ul>

<!-- ❌ 悪い例: インデントされていない -->
<ul>
<li>apple</li>
<li>orange</li>
<li>banana</li>
</ul>

<!-- ❌ 悪い例: インデントが揃っていない -->
<ul>
	<li>apple</li>
<li>orange</li>
	<li>banana</li>
</ul>

<!-- ✅ 良い例: インラインの要素は改行とインデントの必要はない -->
<div>
	<p>This apple is <strong>red</strong></p>
</div>

<!-- ✅ 良い例: インラインの要素は改行とインデントの必要はない -->
<ul>
	<li><a href="/apple/">apple</a></li>
	<li><a href="/orange/">orange</a></li>
	<li><a href="/banana/">banana</a></li>
</ul>

<!-- ❌ 悪い例: 明らかにa要素はインラインでない -->
<a href="/path/to/link"><div>
	<img src="/path/to/image.png">
	<p>lorem...</p>
</div></a>

<!-- ✅ 良い例: 明らかにa要素はインラインでない -->
<a href="/path/to/link">
	<div>
		<img src="/path/to/image.png">
		<p>lorem...</p>
	</div>
</a>
```
<!-- prettier-ignore-end -->

</details>

::: tip 🔧 自動修正可能
このルールは*Prettier*によって自動修正されます。
:::

## タグ

- タグ名や属性名は小文字を使用します
- 空要素の開始タグの末尾に`/`（スラッシュ）を記述します
- 終了タグは省略しません

<details>
<summary>コード例</summary>

タグ名や属性名は小文字を使用します。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例 -->
<a href="/path/to/link">...</a>

<!-- ❌ 悪い例 -->
<A HREF="/path/to/link">...</A>
```
<!-- prettier-ignore-end -->

ただし SVG（インラインSVGも同様）は属性名の大文字小文字を区別するため、仕様に従います。

```html
<!-- ✅ 良い例 -->
<svg viewBox="0 0 400 300">...</svg>

<!-- ❌ 悪い例: svg要素は正しく大文字小文字を指定しないと動作しない -->
<svg viewbox="0 0 400 300">...</svg>
```

空要素の開始タグの末尾に`/`（スラッシュ）を記述します。本来必要ありませんが、*Prettier*の挙動に従います。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例 -->
<img src="/path/to/image.png" />

<!-- ❌ 悪い例 -->
<img src="/path/to/image.png">
```
<!-- prettier-ignore-end -->

終了タグは省略しません。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例 -->
<ul>
	<li>apple</li>
	<li>orange</li>
	<li>banana</li>
</ul>

<!-- ❌ 悪い例 -->
<ul>
	<li>apple
	<li>orange
	<li>banana
</ul>
```
<!-- prettier-ignore-end -->

</details>

::: tip 🔧 自動修正可能
このルールは*Prettier*によって自動修正されます。
:::

## 属性値の引用符

属性値の引用符に`"`（ダブルクォーテーション）を使用します。

<details>
<summary>コード例</summary>

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例: 属性値の引用符にダブルクォーテーションを使用している -->
<a href="/path/to/link">...</a>

<!-- ❌ 悪い例: 属性値の引用符にシングルクォーテーションを使用している -->
<a href='/path/to/link'>...</a>

<!-- ❌ 悪い例: 属性値に引用符を使用していない -->
<a href=/path/to/link>...</a>
```
<!-- prettier-ignore-end -->

ただし、属性値に`"`を記述する場合は、属性値の引用符に`'`（シングルクォーテーション）を使用します。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例: 属性値にダブルクォテーションが含まれているため、属性値の引用符にシングルクォーテーションを使用している -->
<a href="/path/to/link" title='This title includes "double quotation".'>...</a>

<!-- ❌ 悪い例: 属性値にダブルクォテーションが含まれているのに、属性値の引用符にダブルクォーテーションを使用している -->
<a href="/path/to/link" title="This title includes "double quotation".">...</a>
```
<!-- prettier-ignore-end -->

</details>

::: tip 🔧 自動修正可能
このルールは*Prettier*によって自動修正されます。
:::

## 論理属性

論理属性の値は省略します。

```html
<!-- ✅ 良い例 -->
<input type="checkbox" disabled />
<input type="checkbox" checked />

<!-- ❌ 悪い例 -->
<input type="checkbox" disabled="disabled" />
<input type="checkbox" checked="checked" />
```

## 属性の省略

省略可能な属性は省略します。

```html
<!-- ✅ 良い例 -->
<link rel="stylesheet" href="/path/to/style.css" />
<script src="/path/to/script.js"></script>

<!-- ❌ 悪い例 -->
<link type="text/css" rel="stylesheet" href="/path/to/style.css" />
<script type="text/javascript" src="/path/to/script.js"></script>
```

## Pugの属性

- `id`属性は`#`リテラルを使用します
- `class`属性は`.`リテラルを使用します
- 属性は次の順番で記述します
  1. `id`属性
  2. `class`属性
  3. `class`/`id`以外の属性

<details>
<summary>コード例</summary>

<!-- prettier-ignore-start -->
```pug
//- ✅ 良い例
div#id-name.c-class-name(data-attr="value")

//- ❌ 悪い例: class属性に.リテラルを使用しておらず、順番に従っていない
div(data-attr="value" class="c-class-name")#id-name
```
<!-- prettier-ignore-end -->

</details>

::: tip 🔧 自動修正可能
このルールは*Prettier*と*pug-lint*によって自動修正されます。
:::

## 文字参照

次に挙げる文字はHTMLの特殊文字です。これらの文字をコードとして解釈させず、文字として表示したい場合、[文字参照](https://ja.wikipedia.org/wiki/%E6%96%87%E5%AD%97%E5%8F%82%E7%85%A7)を使用します。

| 文字   | 文字参照 |
| ------ | -------- |
| &lt;   | `&lt;`   |
| &gt;   | `&gt;`   |
| &amp;  | `&amp;`  |
| &quot; | `&quot;` |
| &apos; | `&apos;` |

特に、URL内の`&`も`&amp;`と記述します。

```html
<!-- ✅ 良い例: &が文字参照になっている -->
<a href="/path/to/link?key1=val1&amp;key2=val2">...</a>

<!-- ❌ 悪い例: &が文字参照になっていない -->
<a href="/path/to/link?key1=val1&key2=val2">...</a>
```

可読性のため、上記以外の文字に文字参照を使用する必要はありません。例えば、コピーライトマークは`&copy;`ではなく`©`と記述します。

```html
<!-- ✅ 良い例: ©をそのまま記述している -->
<p><small>© 2024 D-ZERO Co., Ltd.</small></p>

<!-- ❌ 悪い例: &copy;を記述している -->
<p><small>&copy; 2024 D-ZERO Co., Ltd.</small></p>
```

::: tip Pugの文字参照
Pugでは属性値の文字参照は自動で行われるため、手動で記述する必要はありません。

```pug
//- 入力
a(href="/path/to/link?key1=val1&key1=val1")
```

```html
<!-- 出力 -->
<a href="/path/to/link?key1=val1&amp;key2=val2"></a>
```

:::

## コメント

`<!--` の後と `-->` の前にはスペースまたは改行を記述します。

<!-- prettier-ignore-start -->
```html
<!-- ✅ 良い例: ハイフンとコメント文の間にスペースがある -->
<!-- コメント -->

<!-- ❌ 悪い例: ハイフンとコメント文の間にスペースがない -->
<!--コメント-->
```
<!-- prettier-ignore-end -->

::: tip 🔧 自動修正可能
このルールは*Prettier*によって自動修正されます。
:::

::: warning 🤔 コメントを書くかどうか
HTMLに記述したコメントは、製品ソースコード上に残るためエンドユーザが見える状態になります。
そのため、なるべく不用意なコメントは控えたほうがよいです。
CMSへの組み込みなどでメモ代わりに利用する場合は、組み込みの際に消してもらえるように依頼をしてください。

また、PugではHTMLに変換した際に削除されるコメント記法があるので、そういったものを積極的に活用してください。
:::
