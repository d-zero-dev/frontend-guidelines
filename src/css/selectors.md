# タイプセレクタの利用

::: danger 重要

タイプセレクタの利用は可能ですが**コンポーネントはコンポーネントを内包できる**点に注意してください。

:::

```css
.c-header {
	/* declaration */

	ul {
		/* declaration */
	}

	li {
		/* declaration */
	}
}
```

```html
<header class="c-header">
	<ul>
		<li><a>...</a></li>
		<!-- 👌ここには意図したスタイルが反映される -->
	</ul>
	<div class="c-header-page__c-nav-global">
		<nav class="nav-global">
			<ul>
				<li><a>...</a></li>
				<!-- 💀意図していないheader-pageで定義しているスタイルが影響する -->
			</ul>
		</nav>
	</div>
</header>
```

回避方法としては次の方法を検討してください。

- エレメントにクラスきちんと付けて対象を限定する
- `>`結合子を利用して影響範囲を限定する（ただしHTMLの構造変更に弱いのでメンテナンス性が落ちることに注意が必要です）
