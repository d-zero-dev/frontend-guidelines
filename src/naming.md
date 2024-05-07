# 識別子の命名規則

🔰 当ドキュメントは「[コーディングガイドライン](./index.md)」の一部です。
基本的なガイドライン・ルールについては先にそれから確認してください。

この命名規則は次に挙げる識別子や名前に関するルールを記載しています。
プロジェクト内では画像やコンポーネント名などの識別子それぞれがお互いに統一されていることが望まれます。

- ファイル・ディレクトリ名
- HTML
  - コンポーネント・エレメント名（👉[コンポーネント](./html.md#component)）
  - data属性名
- プログラム上の変数・関数その他任意に定義できる識別子

## 🌱 基本方針

- 正しい英語（もしくは英語圏で使われる単語）を採用する
- 短さよりも明確さを優先する

## ✅ スペルチェック

**cSpell**というスペルチェッカーを利用しています。開発環境内のHTMLやJavaScriptなどほぼすべてのテキストファイルは対象となります。スペルチェックにひっかかる専門用語や固有名詞がある場合は`cspell.json`に追加してください。大文字・小文字は区別しません。

```json
{
	"import": ["@d-zero/cspell-config"],
	"words": [
		// 追加
		"the-new-word",
		"the-new-name"
	]
}
```

## 🔠 文字構成

### 原則

- 半角英数とハイフンで構成する
- 単語・識別子の区切りをハイフンで表現する
- 英字は小文字
- 先頭の数字ハイフンは禁止
- 末尾のハイフン禁止
- 数字は連番を表す場合は最低でもゼロ埋めの 2 桁で表す

### 例外

- ディレクトリとページファイル(html/phpやPDFなど)の数字のみの名前
- 解像度識別のための`image@2x.jpg`をような`@`（アットマーク）文字
- 特別な意味をもつ`.`（ドットで始まる）ディレクトリやファイル名（`.gitignore`や`.eslintrc`など）
- SCSS（SASS）の`_`で始まるパーシャルファイル
- プログラム・フレームワークに関係した大文字で始まる名前
- JavaScriptの定数名・クラス名など（👉[JavaScript ガイドライン](./js.md#component)）

::: tip 開発用ディレクトリ

`__`（アンダースコア2つ）で始まるディレクトリ名は開発用ディレクトリであり納品対象外であることを意味します。

:::

## ✂ 省略

省略は基本的に避けてください。慣例的に省略語があるもの、あまりにも長い名前についてはプロジェクトチームで検討してください。

#### 省略の表記ゆれ

省略をする場合、表記ゆれを避けるために次に挙げている単語は省略語を統一してください。

| 省略語          | 元の単語             | 省略の由来・参考にしているもの |
| --------------- | -------------------- | ------------------------------ |
| a11y            | accessibility        | 一般略語                       |
| app             | application          | 一般略語                       |
| btn             | button               | twitter bootstrap              |
| bg              | background           | 一般略語                       |
| ctrl            | control              | キーボード                     |
| fn              | function             | キーボード                     |
| i18n            | internationalization | 一般略語                       |
| img             | image                | HTML要素                       |
| ja（他 言語名） | Japanese             | 国際基準                       |
| jp（他 国名）   | Japan                | 国際基準                       |
| nav             | navigation           | HTML 要素                      |
| photo           | photograph           | 一般略語                       |
| pict            | pictrue              | 拡張子                         |
| prev            | previous             | 一般略語                       |
| pw              | password             | Linux                          |
| sp              | smartphone           | 頭字語                         |
| src             | source               | HTML 属性                      |
| temp            | temporary            | Linux                          |
| tmpl            | template             | jQueryプラグイン               |
| thumb           | thumbnail            | 拡張子                         |
| util            | utility              | 一般略語                       |
| xs              | extra small          | twitter bootstrap              |
| sm              | small                | twitter bootstrap              |
| md              | middle               | twitter bootstrap              |
| lg              | large                | twitter bootstrap              |
| xl              | extra large          | twitter bootstrap              |
| obj             | object               | 一般略語                       |

## 📓 識別子の統一

類義語や和製英語の影響、誤認などにより、同じ意味を表す識別子が氾濫しているので可能な限り統一します。

| 意味                                 | ✅ 使用する識別子 | ❌ 使用しない識別子               |
| ------------------------------------ | ----------------- | --------------------------------- |
| トップページ                         | home              | top                               |
| 下層ページ                           | sub               | corner                            |
| パンくずリスト                       | breadcrumb        | pan                               |
| カルーセル（スライドショー）         | carousel          | gallery slideshow slider          |
| ヒーローイメージ（メインビジュアル） | hero              | mv mainvisual jumbotron billboard |
| 見出し                               | heading           | headline                          |
| ページネーション                     | pagination        | pager                             |
| (ページネーションなどの)前           | prev              | back                              |
