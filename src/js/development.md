# 開発ファイル

## ファイル分割

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
