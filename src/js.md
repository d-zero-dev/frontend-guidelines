# JavaScriptガイドライン

🔰 当ドキュメントは「[コーディングガイドライン](./index.md)」の一部です。
基本的なガイドライン・ルールについては先にそれから確認してください。

## 💅 コードスタイル

_editorconfig_、_ESLint_、_Prettier_ それぞれに設定されているルールに則って記述します。エディタやコマンド実行時に警告が出た場合は**必ず修正してください**。

各設定は以下のパッケージを利用しています。

- [@d-zero/eslint-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/eslint-config)
- [@d-zero/prettier-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/prettier-config)

::: danger リントエラーについて
例外なく必ずリントエラーを修正してください。**リンターのルールが現状にそぐわない場合はルールの見直し、つまりConfigファイルの変更を行ってください**。
:::

## 🍴 トランスパイル・コンパイル環境

[TypeScript](https://www.typescriptlang.org/)とJavaScriptが利用できる環境となっています。[esbuild](https://esbuild.github.io/)を通して、調整されたJavaScriptファイルに出力します。

## 📂 ファイル構成

#### 開発ファイル

```
📂 __assets/
├── 📂 htdocs/
│   └── 📂 js/
│       └── script.ts
└── 📂 _libs/
    └── 📂 script/
        ├── sub-script.ts
        └── sub-script2.js
```

**`type=module`**の環境であるため、ファイルの参照に**拡張子は必須**です。TypeScriptファイルを参照する際は`.ts`拡張子を`.js`に変更する必要があります。

`__assets/_libs`はエイリアス`@`で参照できるようになっています。

```ts
import { subScript } from '@/script/sub-script.js';
```

::: tip エイリアスの変更
エイリアスは変更可能または追加することができます。`tsconfig.json`の`paths`と、`eleventy.config.cjs`の`alias`を変更してください。

```json
{
	"compilerOptions": {
		"paths": {
			"@/*": ["./__assets/_libs/*"]
		}
	}
}
```

```js
import path from 'node:path';
import eleventy from '@d-zero/builder/11ty';

export default function (eleventyConfig) {
	return eleventy(eleventyConfig, {
		alias: {
			'@': path.resolve(import.meta.dirname, '__assets', '_libs'),
		},
	});
}
```

この`alias`はesbuildの設定に影響します。

:::

#### 公開ファイル

`__assets/htdocs/`配下のファイルがビルドされて`htdocs/`に出力されます。パス構造は維持されます。

```
📂 __assets/
├── 📂 htdocs/
│   └── 📂 js/
│       ├── script.ts
│       └── sub-script.ts
📂 htdocs/
└── 📂 js/
    ├── script.js
    └── sub-script.js
```

## 📝 HTMLへの読み込み

```html
<script src="/js/script.js" type="module"></script>
```

`type="module"`は必要です。

### 読み込み順とライブラリの依存関係

`import`を使用せずに`script`要素から直接ライブラリを読み込む場合、依存関係にあるものは読み込み順番が重要になるので注意してください。

```html
<head>
	<script src="/js/jquery.min.js" defer></script>
	<!-- ⚠️ jQueryを利用する場合は先に読み込む -->

	<script src="/js/script.js" type="module"></script>
</head>
```

::: danger 基本的には`import`を利用する

あくまでも`script`要素でライブラリを利用する場合です。基本的には`import`を利用してください。

```ts
import $ from 'jquery';

$('.c-component').on('click', function () {
	/* ... */
});
```

:::

### インラインJavaScript

次の条件下では`script`要素を利用してそのままHTML内にJavaScriptを記述しても構いません。

- タグマネージャーやトラッキングコードや、その他コンバージョンタグ
- FacebookなどSNSの埋め込みコード
- そのページにしか使わないことが保証されている再利用が難しいコード

::: warning インラインで記述する場合の注意

```html
<!-- ✅ moduleで記述します -->
<script type="module">
	// ...
</script>

<!--
  タグマネージャーなど属性も含めて加工せずそのまま貼り付けてください
  ※ビルドされたファイル上ではPrettierなどの影響でコードが整形される場合があります
-->
<script>
	(function (w, d, s, l, i) {
		/* ... */
	})(window, document, 'script', 'dataLayer', 'GTM-XXXXXXXX');
</script>

<!-- ❌ IE3時代のHTMLコメントフォールバックは書きません -->
<script>
	<!--
	// ↑↓このHTMLコメント
	-->
</script>
```

:::

## ⚙ 開発ファイル

### ファイル分割

基本的に目的や機能ごとに分割します。また、実行タイミングをコントロールできるようにひとつの**関数**としてまとめるようにしてください。

```ts
// 関数としてexportする
export default function () {
	// 処理...
}

// 定数はexportしても構いません
export const CONSTANT = '定数';
```

::: warning 処理の即時実行
分割したモジュールの中で、`import`した時点で即座にブラウザやDOMに影響する処理が走る実装は避けてください。

```js
// ❌ exportする関数の外で処理を実行している。
alert('💀');
document.body.classList.add('💀');

// ✅ モジュールの読み込みや変数・定数・関数の定義などはしてもよい
import anyModule from 'anyModule';
let flag = false;
const CONSTANT = '定数';
function foo() {
	/* ... */
}

export function anyFunction() {
	// 処理...
	if (flag) {
		foo();
		anyModule(CONSTANT);
	}
}
```

`import`した後に**任意**に実行できる状態が望ましいです。

```js
import { anyFunction } from '@/script/any-function.js';

document.querySelector('.c-component')?.addEventListener('click', () => {
	// 任意のタイミングで実行できるようにする
	anyFunction();
});
```

:::

## 🎛 インタラクションの実装

[HTMLガイドライン](./html.md#🎛-インタラクションの実装)に記載されているように、HTMLだけで実現できるものは、極力JavaScriptでの実装を**避けます**。

`command`属性に規定のないアクションや、アクション中のフックは`command`イベントを利用して実装します。

### `command`イベントの利用

```html
<button command="--custom-command" commandfor="target01">カスタムコマンド</button>

<div id="target01">カスタムコマンドの対象</div>
```

```ts
// ✅️ commandイベントを利用したインタラクション
document.getElementById('target01').addEventListener('command', (e) => {
	switch (e.command) {
		case '--custom-command': {
			// 呼び出し元ボタンの特定
			const invoker: HTMLButtonElement = e.source;
			// カスタムコマンドの処理
			console.log(`Hello, Custom Command: ${e.command}`);
			break;
		}
	}
});

// ⚠️ 実装意図や振る舞いの関連が不明確な実装は避けてください
document.querySelector('[commandfor="target01"]').addEventListener('clock', () => {
	document.getElementById('target01');
});
```

## 📦 ライブラリ・モジュールの利用

ライブラリやモジュールを活用してなるべく少ない工数で実装できることが望ましいですが、利用するライブラリが信用できるかどうかは十分に検証する必要があります。

ライブラリを利用するということは、将来的にそのライブラリが提供する機能やセキュリティに問題が発生した場合、そのライブラリをアップデートまたは別のものに置き換えたりする必要があることを意味します。これはクライアントのウェブサイトを継続的に保守運用できるかどうかで慎重に判断する必要があります。また、**このリスクや責任範囲に関しては受注前にクライアントと十分な説明と合意を得ることが必要です。**

次に上げるライブラリは利用しても構いません。ただし、**これら以外のライブラリを利用する場合は相談を必ずしてください**。

- Polyfill
  - [core-js](https://github.com/zloirock/core-js)
  - [@oddbird/popover-polyfill](https://github.com/oddbird/popover-polyfill)
  - [invokers-polyfill](https://github.com/keithamus/invokers-polyfill)
- インタラクション検知
  - [what-input](https://github.com/ten1seven/what-input)
- DOM API ラッパー
  - [jQuery](http://jquery.com/)
- UIライブラリ
  - [Splide](https://ja.splidejs.com/)

### 利用方法

基本的にはyarnでNPMからインストールして実装するファイルに`import`して利用します。

```sh
# NPMからインストールします。
$ yarn add @splidejs/splide
```

::: warning インストールしたパッケージの共有

追加インストールした際にpackage.jsonの`dependencies`にモジュールが追加されることを確認してください。package.jsonとyarn.lockの変更はコミットして共有する必要があります。

:::

```js
// importして利用する
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

new Splide('.c-carousel').mount();
```

CMSやその他の**制約がある場合は外部ファイルとして読み込んでも構いません**。その場合は**ダウンロード**してウェブサイトと同じサーバーにホストしてください。

::: danger STOP
CDNから直接参照は避けてください。

```html
<!-- ❌ CDNから参照している。 -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<!-- ✅ サイトと同じサーバに配置して参照する。 -->
<script src="/js/jquery.min.js" defer></script>
```

CDNの配信サーバが障害を起こした際に影響を受けてしまうためです。
:::

### TypeScriptの型定義の読み込み

TypeScriptでは利用する際に型定義ファイルが必要になる場合があります。`@types/`から始まるパッケージは必要に応じてインストールしても構いません。

```sh
yarn add -D @types/jquery
```

## 🎨 style属性をなるべく変更しない

style属性からプロパティを直接書き換えて実装は避けてください。状態を変更する場合は、その状態を表す`data-*`属性を変更するようにしてください（「HTMLガイドライン コンポーネントとエレメントの状態管理」を参照）。状態変化によるスタイルはCSSで管理することによって、CSSにはスタイル、JavaScriptにはロジックと管理を分けることができます。

```js
// ❌ style属性で直接プロパティを書き換えている
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.style.inlineSize = '300px';
});

// ✅ 状態を表す属性を変更する
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.setAttribute('data-wide', 'true');
});
```

```css
[data-wide='true'] {
	inline-size: 300px;
}
```

### 動的な値を反映する場合

JavaScriptで動的な値を反映する場合は、カスタムプロパティを利用します。

```js
// ✅ カスタムプロパティを利用してスタイルを変更する
document.querySelector('.c-component')?.addEventListener('click', (el) => {
	el.style.setProperty('--block-size', anotherElement.clientHeight + 'px');
});
```

```css
.c-component {
	--block-size: 10em;
	block-size: var(--block-size);
}
```

## 🐎 パフォーマンスを意識した実装

### 実行頻度の多い処理に気をつける

ページが読み込まれた際に一度しか実行されない処理や、クリックなどのイベントは特に気にする必要は少ないですが、次に挙げるイベントはユーザーの自然な操作によってユーザーが気づかぬうちに頻繁に実行されます。処理の内容によってはパフォーマンスに影響を及ぼすので実装は十分に注意し、代替案やテクニックを使いパフォーマンスを向上させるようにしてください。

- `scroll`イベント
- `resize`イベント
- `mousemove`イベント
- `touchmove`イベント
- `wheel`イベント
- `setTimeout`
- `setInterval`

### イベントの代替となるAPIを利用する

イベントではなくAPIを利用することでパフォーマンスを向上させることができます。

#### Intersection Observer API

[IntersectionObserver](https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserver)はスクロールなどにより指定した要素がビューポート内に入った場合に、登録したリスナー関数を実行するAPIです。要素の位置を`scroll`イベントなどで監視する必要はありません。

#### Resize Observer API

[ResizeObserver](https://developer.mozilla.org/ja/docs/Web/API/ResizeObserver)は要素のサイズが変更されたときに登録したリスナー関数を実行するAPIです。要素の幅を`resize`イベントや`setTimeout`で監視する必要はありません。

#### matchMedia API

[window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)はメディアクエリ文字列をパースして現在のメディア状態の真偽を判定したり、状態が変更されたときに登録したリスナー関数を実行するAPIです。ウィンドウの幅を`resize`イベントで監視する必要はありません。

::: tip デスクトップとスマートフォンでの処理の書き分け

```ts
matchMedia(`(min-width: 768px)`).addEventListener('change', (media) => {
	if (media.matches) {
		// ブレークポイントの内側（スマートフォン）の処理
	} else {
		// ブレークポイントの外側（デスクトップ）の処理
	}
});
```

:::

### Passive Event Listener を利用する

```js
Element.addEventListener('wheel', onWheel, { passive: true });
```

`passive`を有効にすると`preventDefault()`の呼び出しを待たずにリスナー関数を実行するため、その関数がブラウザの既定のアクション（たとえばマウスホイール操作）をブロックすることがなくなります。

### 描画フレームを利用して処理を間引く

同じフレーム内で2回以上の処理が走る場合があります。`requestAnimationFrame`を利用して処理を間引くことでパフォーマンスを向上させることができます。

```ts
let rafId;
const update = function () {
	// 実行したい処理
};
const onMove = function () {
	cancelAnimationFrame(rafId);
	rafId = requestAnimationFrame(update);
};
element.addEventListener('touchmove', onMove, { passive: true });
```

### 同じ処理を何度も繰り返さない

戻り値が同じものが期待できる場合は変数化すること。

```ts
// ❌ `$('.c-component')` を繰り返している
$('.c-component').on('click', function () {
	const flag = $('.c-component').attr('data-flag');
	if (flag !== 'true') {
		$('.c-component').attr('data-flag', 'true');
	}
});

// ✅ `$('.c-component')`を変数化して使いまわす
const $component = $('.c-component');
$component.on('click', function () {
	const flag = $component.attr('data-flag');
	if (flag !== 'true') {
		$component.attr('data-flag', 'true');
	}
});
```
