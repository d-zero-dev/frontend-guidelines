# AIエージェントスキル

このリポジトリの [`skills/` ディレクトリ](https://github.com/d-zero-dev/frontend-guidelines/tree/main/skills)では、AIコーディングエージェント（Claude Code・Cursorなど）向けのスキルを管理・配布しています。
ガイドラインの規範を、エージェントが実装時・レビュー時に参照できる形に蒸留したものです。

## スキル一覧

| スキル                 | 内容                                                            |
| ---------------------- | --------------------------------------------------------------- |
| `dzero-tech-selection` | 実装レイヤー（HTML/CSS/JS）の選定基準。実装着手前に必読         |
| `dzero-design-to-code` | デザインカンプ（Figmaなど）解釈の原則とアセットの扱い           |
| `dzero-html`           | HTML/Pugマークアップ規約（実装規範とレビュー観点）              |
| `dzero-css`            | CSSコーディング規約（実装規範とレビュー観点）                   |
| `dzero-js`             | JavaScript/TypeScriptコーディング規約（実装規範とレビュー観点） |
| `dzero-a11y`           | アクセシビリティ規約（実装規範とレビュー観点）                  |
| `dzero-review`         | レビュー手順のオーケストレーション                              |

## 配布の仕組み

`main`ブランチが配布チャネルです。[skills CLI](https://github.com/vercel-labs/skills)でプロジェクトの`.claude/skills/`にコピーされ、Gitで管理します。Claude Codeはもちろん、Cursorも`.claude/skills/`を読み込みます。

新規プロジェクトは`@d-zero/create-frontend`による生成時に自動で導入されます（対応バージョン以降）。

## 既存プロジェクトへの導入手順

### 1. `package.json`にスクリプトを追加する

`scripts`に次を追加します。

```json
{
	"scripts": {
		"skills:sync": "npx --yes skills@1.5.22 add https://github.com/d-zero-dev/frontend-guidelines/tree/main/skills --skill '*' --agent claude-code --copy -y"
	}
}
```

### 2. スキルを展開する

`yarn skills:sync`を実行します。`.claude/skills/`にスキルが展開され、`skills-lock.json`が生成されます。

### 3. `AGENTS.md`に必読ルールを追加する

プロジェクトの`AGENTS.md`（無ければ作成し、`CLAUDE.md`から`@AGENTS.md`で読み込みます）に次の一文を追加します。

```markdown
UI・機能の実装に着手する前に、必ず`.claude/skills/dzero-tech-selection`を読み、実装レイヤー（HTML/CSS/JS）を決定してから作業すること。
```

### 4. コミットする

`.claude/skills/`と`skills-lock.json`をコミットします。

## スキルの更新

`yarn skills:sync`を再実行すると最新の内容で上書きされます。差分をプルリクエストでレビューして取り込んでください。

## スキルへのルール追加

スキルの執筆規約は[`skills/README.md`](https://github.com/d-zero-dev/frontend-guidelines/tree/main/skills)を参照してください。
ルールの追加・分類には、このリポジトリ内の`.claude/skills/rule-authoring`スキル（メンテナー用）を使ってください。ガイドライン本文と重複する内容は、同じプルリクエストで両方を更新して乖離を防ぎます。
