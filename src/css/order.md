# 記述順番

以下のような順番で定義します。

```css
.component-name {
	/* 1. 変数定義 */
	/* 2. コンポーネント自体のスタイル */
	/* 3. 疑似要素 */
	/* 4. 状態変化（※） */
	/*    4-1. メディアクエリ */
	/*    4-2. 疑似クラス（:hover :disabled :nth-child :empty など） */
	/*    4-3. 属性 */
	/*    4-4. 状態クラス（--[状態]） */
	/* 5. エレメント */
	/* 6. 結合子セレクタを利用したエレメント（E+E E~E など） */
	/* 7. 子孫要素に影響のある状態変化 */
}

.component-name__element {
	/* エレメント */
}
/* EOF */
```

また、プロパティについては*Stylelint*の設定に基づいて種類順に記述します。

::: tip 👮‍♀️ 自動検知
このルールは*Stylelint*によって警告されます。
:::

::: danger クラス名の例外

JavaScript のライブラリの利用など、クラス命名規則に当てはまらないセレクタにスタイルを当てないといけない場合があります。その場合は、`.stylelintrc`ファイルにて`selector-class-pattern`を変更してください。

```css
.c-hero {
	/* ⚠️ 通常はStylelintによる警告がでる */

	.any-js-lib-class-name {
		/* declaration */
	}

	.any-js-lib-class-name {
		/* ✅ .stylelintrcの設定変更によって警告がなくなる */
		/* declaration */
	}
}
```

:::
