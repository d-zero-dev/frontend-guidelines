# ビルド環境

[TypeScript](https://www.typescriptlang.org/)とJavaScriptが利用できる環境となっています。`@kamado-io/script-compiler`を通して、内部で[_esbuild_](https://esbuild.github.io/)を使用し、調整されたJavaScriptファイルに出力します。

`kamado.config.ts`で設定を行います。

```ts
import type { UserConfig } from 'kamado/config';

import path from 'node:path';

import { scriptCompiler } from '@kamado-io/script-compiler';

export const config: UserConfig = {
	compilers: {
		script: scriptCompiler({
			alias: {
				'@': path.resolve(import.meta.dirname, '__assets', '_libs'),
			},
			minifier: true,
		}),
	},
};

export default config;
```

## コンパイラ設定

### `alias`

パスエイリアスのマップを設定します。esbuildのaliasとして使用されます。

```ts
scriptCompiler({
	alias: {
		'@': path.resolve(import.meta.dirname, '__assets', '_libs'),
	},
});
```

### `minifier`

ミニファイを有効にするかどうかを設定します。デフォルトは`false`です。[`@d-zero/scaffold`](https://github.com/d-zero-dev/frontend-env/tree/main/packages/%40d-zero/scaffold)では`true`に設定されています。

```ts
scriptCompiler({
	minifier: true,
});
```
