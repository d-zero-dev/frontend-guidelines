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
