# ビルド環境

*11ty*のTransform機能から*PostCSS*を利用してCSS変換を行います。CSSは*PostCSS*のみを使用します。

```mermaid
flowchart LR
	#in["*.css"]
	#out["*.css"]
	#postcss(["PostCSS"])

	#in --> #dzBuilder --> #out

	subgraph #dzBuilder["@d-zero/builder"]
		direction LR

		subgraph #11ty["11ty"]
			subgraph #postcss["PostCSS"]
				direction TB
				#postcss["PostCSS"]
			end
		end
	end
```

## ベンダープレフィックス

*Autoprefixer*を利用するのでベンダープレフィックス付きのプロパティは必要ありません。

```css
selector {
	transition: opacity 300ms;
	-webkit-transition: opacity 300ms; /* ❌ 不要 */
	-moz-transition: opacity 300ms; /* ❌ 不要 */
}
```

ただしCSSの標準規格でないものについては必要なケースがあります。*Stylelint*はその点を考慮して警告を出すので心配はありません。

```css
selector {
	-moz-osx-font-smoothing: grayscale; /* ✅ ブラウザ固有のプロパティのためプレフィックは必要 */
	-webkit-font-smoothing: antialiased; /* ✅ ブラウザ固有のプロパティのためプレフィックは必要 */
}
```

::: tip 🔧 自動修正可能
このルールは*Stylelint*によって自動修正されます。
:::
