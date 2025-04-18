# ライブラリ・モジュールの利用

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

## 利用方法

基本的にはyarnでNPMからインストールして実装するファイルに`import`して利用します。

```sh NPMからインストールします。
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

## TypeScriptの型定義の読み込み

TypeScriptでは利用する際に型定義ファイルが必要になる場合があります。`@types/`から始まるパッケージは必要に応じてインストールしても構いません。

```sh
yarn add -D @types/jquery
```
