# 制作環境

## エディタ

[Visual Studio Code](https://code.visualstudio.com/)を推奨します。

また、コーディング時の自動修正・自動警告を有効にするために以下のプラグインをインストールしてください。

- [**EditorConfig**](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [**Stylelint**](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [**Markuplint**](https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint)
- [**pug-lint**](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-puglint)
- [**Code Spell Checker**](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

他のエディタを利用して構いませんが、次のようなエディタの使用は原則として禁止します。

- 改行コードを変更できない
- 不可視文字を表示できない
- 検索・置換機能がない

推奨エディタ以外の利用に関して、なにかトラブルがあった際の原因がエディタによるものである場合の対応に時間がかかる可能性があることは留意してください。

## 制作環境の準備

次の環境をPCのローカルに準備する必要があります。

- git
- Node.js
- yarn

Node.jsはプロジェクトのよってバージョンを切り替える必要があるため、バージョン管理ツールの利用してインストールしてください。
管理ツールは[Volta](https://volta.sh/)を推奨します。[Voltaのセットアップ手順](./tools/setup-volta.md)を参考に整備してください。

<details>
<summary>過去利用を推奨したNode.jsバージョン管理ツール</summary>

- [nodebrew](https://github.com/hokaccha/nodebrew)
- [nvm](https://github.com/nvm-sh/nvm)
- [nodist](https://github.com/marcelklehr/nodist/releases)

</details>

::: tip Gitのインストール

基本的に方法は問いません。
macOSの場合、通常初めて`git`コマンドを利用するとXCodeのライセンスに同意する必要があったり、XCodeそのものをインストールする必要があります。
XCodeをどうしてもインストールできない場合、[Gitの本家](https://git-scm.com/)からインストーラを使ってインストールしても構いません。

:::

## 初期ファイルの準備

::: warning 現在整備中です

以下は開発中のため、初期ファイルの準備はSlackから`@system`にリクエストしてください。

:::

空のリポジトリで次のパッケージを実行します。

```zsh
npx @d-zero/create-frontend
```

開発に必要な`package.json`やコンフィグファイル、サイト構造の初期ファイルが展開されます。

## 開発ソースコードと製品ソースコード

HTML/CSS/JavaScriptなどのコードは、**開発ソースコード**と**製品ソースコード**に分かれます。

```
📂
├── 📂 __assets/
│   ├── 📂 htdocs/
│   │   └── index.pug
│   │   ├── 📂 sub-dir/
│   │   │   ├── index.pug
│   │   │   └── sub-page.pug
│   │   ├── 📂 css/
│   │   │   └── style.scss
│   │   └── 📂 js/
│   │       └── script.js
│   └ 📂 _libs/
└── 📂 htdocs/
    ├── index.html
    ├── 📂 sub-dir/
    │   ├── index.html
    │   └── sub-page.html
    ├── 📂 css/
    │   └── style.css
    └── 📂 js/
        └── script.js
```

`__assets`フォルダ配下が開発ソースコード、`htdocs`フォルダ配下が製品ソースコードとなります。

::: tip ドキュメントルート
`htdocs`フォルダとその中のファイルを最終的にウェブサーバーにアップロードすることになります。
`htdocs`は**ドキュメントルート**にあたります。
プロジェクトによっては名前を変更しても構いません。
その場合、ビルド設定を変更する必要があります。
:::

::: danger 製品ソースコードの改変
開発環境のビルドツールによって、開発ソースコードから製品ソースコードに変換がされるため、製品ソースコードを**手動で編集・改変することは原則避けてください**。

製品ソースコードを納品後にクライアントの手で変更があるケースなどは別途体制などを検討し、プロジェクト個別で対応します。
:::

各開発ソースコードは、次のプリプロセッサやトランスパイラ・ビルドツールを通して製品ソースコードに変換されます。

| 対象       | プリプロセッサ/トランスパイラ/ビルドツール        |
| ---------- | ------------------------------------------------- |
| HTML       | Pug / 11ty                                        |
| CSS        | Sass(SCSS 記法) + PostCSS(Autoprefixer 他) / Vite |
| JavaScript | TypeScript / Vite                                 |

HTMLは*HTML*と*Pug*どちらの言語でも記述ができます。
CSSは*SCSS記法のSass*のみとなっており、JavaScriptは*TypeScript*もしくは最新の*ECMAScript*のどちらにも対応しています。
それぞれの対応する具体的なバージョンは`package.json`や各種コンフィグファイルを参照してください。

## ビルド方法

プロジェクト開始時は、そのプロジェクトで利用するパッケージを次のコマンドでインストールしてください。

```zsh
yarn install
```

### Node.jsのバージョン切り替え

`package.json`に設定されている`volta`の値によって自動的にバージョンが切り替わります。
Volta以外のバージョン管理ツールを利用している場合は、そのツールの設定に従ってバージョンを切り替えてください。

### ビルド方法

yarnのスクリプトコマンドつかってビルドをします。

```zsh
yarn [オプション]
```

次のコマンドで動作するように`package.json`に設定されています。

| コマンド                                              | 動作                                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <span style="white-space: nowrap">`yarn build`</span> | 全リソースファイルのコンパイルとリントチェック・バリデーションを行います。                                                      |
| <span style="white-space: nowrap">`yarn dev`</span>   | ローカルサーバーを立ち上げ、全リソースファイルの保存を監視してホットリロードする状態になります。 `yarn d`でも同様に動作します。 |

#### 主なコーディング手順

1. `yarn dev`でローカルサーバーを立ち上げる
2. その状態でコーディングをする
3. 一連の作業が終わったら`yarn build`で全体をチェックし製品ソースコードを生成する
4. コミットする

::: danger Gitの対象ファイル
現状、テストサーバーのビルド環境の整備不足のため、`htdocs`フォルダ配下のファイルは`.gitignore`に含まれておらず**コミットの対象**です。
:::

::: warning `yarn dev`コマンドの注意点
`yarn dev`では**一時ファイルが製品ソースコード側に生成されることがあります。**
**コミットの際は必ず`yarn build`をしてください。**
:::

## 治外法権ディレクトリ

クライアントや他ベンダーの制作したソースコードと共存させる場合、**開発ソースコード**の中ではリンターなどから除外するために`extraterritorial`を作っています。

`__assets/htdocs/`のPugやSCSS、JavaScriptは、それぞれ`include`や`@use`、`import`を使って`extraterritorial`ディレクトリのソースコードを読み込み、**製品ソースコード**に反映させてください。

::: danger `extraterritorial`ディレクトリの利用にあたって
あくまでも社内の責任の範囲の外にあるソースコードを共存させるものなので、社内で責任を持ち管理する必要があるコードに関してはこのディレクトリ内で管理しないでください。

プロジェクト固有の規定がある場合は、リンターの側の設定を変えて、`extraterritorial`ディレクトリは使わないようにしてください。
:::
