# 📂 ファイル構成

ファイルは以下の構成で管理します。

```
# 開発ソースコード

📂 __assets/
├── 📂 htdocs/
│ ├── 📂 __tmpl/
│ │ ├── 000_home.pug
│ │ ︙
│ │ └── 302_form_complete.pug
│ ├── 📂 sub-dir/
│ │ ├── sub01.pug
│ │ ︙
│ │ └── sub99.pug
│ ├── index.pug
│ └── maintenance.html
└── 📂 _libs/
    ├── 📂 component/
    │ ├── header.pug
    │ └── footer.pug
    ├── 📂 data/
    │ ├── helper.js
    │ └── index.yaml
    └── 📂 mixin/
    └── meta.pug

# 製品ソースコード

📂 htdocs/
├── 📂 __tmpl/
│ ├── 000_home.html
│ ︙
│ └── 302_form_complete.html
├── 📂 sub-dir/
│ ├── sub01.html
│ ︙
│ └── sub99.html
├── index.html
└── maintenance.html
```

`__assets/htdocs`の**フォルダ構造を維持したまま**にドキュメントルートにあたる`htdocs`に出力されます。最終的に整形されたHTMLファイルをするため、開発ファイルは**PugでもHTMLでもどちらでも構いません**。

`_libs/components`、`_libs/mixin`フォルダはPugで利用する断片要素、`_libs/data`フォルダはPugから参照できるオブジェクトや関数を管理します。
