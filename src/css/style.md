# コードスタイル

_editorconfig_、_Stylelint_、_Prettier_ それぞれに設定されているルールに則って記述します。エディタやコマンド実行時に警告が出た場合は**必ず修正してください**。

各設定は以下のパッケージを利用しています。

- [@d-zero/stylelint-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/stylelint-config)
- [@d-zero/prettier-config](https://github.com/d-zero-dev/linters/tree/main/packages/%40d-zero/prettier-config)

::: danger リントエラーについて
例外なく必ずリントエラーを修正してください。**リンターのルールが現状にそぐわない場合はルールの見直し、つまりConfigファイルの変更を行ってください**。
:::

::: warning Stylelintの`disable`コメント

`disable`コメントを利用することで、ルールを無視することができますが**原則行わない**でください。

```scss
.c-header {
	/* ❌ 実装上やむを得ない場合を除いてdisableコメントは使用しないこと */
	inline-size: 100px !important; // stylelint-disable-line declaration-no-important
}
```

:::
