# プロパティのルール

## 論理プロパティ

原則、プロパティは論理プロパティを使用します。

```css
selector {
	padding-top: 1em; /* ❌️ */
	padding-block-start: 1em; /* ✅️ */

	top: 1em; /* ❌️ */
	inset-block-start: 1em; /* ✅️ */
}
```

::: tip 🔧 自動修正可能
このルールは*Stylelint*によって自動修正されます。
:::

### 論理プロパティとショートハンド

論理プロパティとして機能しないショートハンドは原則避けます。

```css
selector {
	/* ❌️ */
	padding: 1em 2em 3em 4em;
	/* ✅️ */
	padding-block-start: 1em;
	padding-block-end: 3em;
	padding-inline-start: 2em;
	padding-inline-end: 4em;

	/* ❌️ */
	padding: 1em 2em;
	/* ✅️ */
	padding-block: 1em;
	padding-inline: 2em;

	/* ✅️ 例外 */
	padding: 1em; /* 1つの値は全方向に適用されるので問題なし */
}
```

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::
