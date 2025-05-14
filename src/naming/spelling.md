# スペルチェック

*cSpell*というスペルチェッカーを利用しています。開発環境内のHTMLやJavaScriptなどほぼすべてのテキストファイルは対象となります。スペルチェックにひっかかる専門用語や固有名詞がある場合は`cspell.json`に追加してください。大文字・小文字は区別しません。

```json
{
	"import": ["@d-zero/cspell-config"],
	"words": [
		// 追加
		"the-new-word",
		"the-new-name"
	]
}
```
