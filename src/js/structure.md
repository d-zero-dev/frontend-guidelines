# ファイル構成

## 開発ファイル

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
エイリアスは変更可能または追加することができます。`tsconfig.json`の`paths`と、`kamado.config.ts`の`scriptCompiler`の`alias`を変更してください。

```json
{
	"compilerOptions": {
		"paths": {
			"@/*": ["./__assets/_libs/*"]
		}
	}
}
```

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
		}),
	},
};

export default config;
```

この`alias`はesbuildの設定に影響します。

:::

### 公開ファイル

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
