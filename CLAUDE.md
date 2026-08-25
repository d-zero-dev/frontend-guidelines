# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

D-ZERO 株式会社のフロントエンド開発ガイドラインを公開する VitePress 製の静的ドキュメントサイト（`@d-zero/frontend-guidelines`）。HTML / CSS / JavaScript / 識別子命名 / Git 運用などのコーディング規約を Markdown で管理し、GitHub Pages で公開する。

## プロジェクト構成

作業前に以下のファイルを確認し、プロジェクトの状態を把握すること:

- `package.json` — scripts、Volta（Node 26 / Yarn 4）、`packageManager`
- `src/.vitepress/config.js` — VitePress のサイト設定（`nav` / `sidebar`）
- `src/` — ガイドライン本文（Markdown）。新規ページを追加した場合は `config.js` の `sidebar` にも追記すること
- `.github/renovate.json` — Renovate 設定

## コマンド

- `yarn dev` — VitePress 開発サーバー起動
- `yarn build` — VitePress ビルド（`.dist` に出力）
- `yarn lint` — eslint / prettier / textlint / cspell を一括実行
- `yarn release:major` / `yarn release:minor` / `yarn release:patch` — `npm version` でバージョンを更新し tag を作成する（tag push で `.github/workflows/static.yml` が GitHub Pages へデプロイする）
- `yarn up` — `yarn upgrade-interactive --latest`

このリポジトリに `yarn test` は存在しない（`.github/workflows/test.yml` は lint と build のみを実行する）。

### コマンド制約

- **yarn のみ使用**: npm / pnpm / bun / deno によるコマンド実行は禁止（`yarn release:*` の内部で `npm version` を呼ぶのは規定の挙動）
- **コマンドの連続実行禁止**: `&&`、`;`、改行によるコマンド連結をしない。1回の Bash 呼び出しで1コマンドのみ実行する。連結されたコマンドは settings.json の permissions allow/deny でパターンマッチできず、毎回ユーザーの手動承認が必要になり効率が大幅に低下する
- **main / dev ブランチでの作業・コミット禁止**: 作業開始前に `git branch --show-current` で現ブランチを確認し、`main` / `dev` にいる場合は `git switch -c <topic>` でトピックブランチを作ってから作業する。PR は `dev` 向けに送る（`.github/workflows/test.yml` 参照）

## 依存関係の追加

- バージョンは固定で追加する（`yarn add foo@1.2.3`）。`^` / `~` を付けない
- **追加したら `.github/renovate.json` の `packageRules` を確認する**。そのパッケージが既存の `groupName` グループに入るべきか、新しいグループを作るべきかを判断する
  - `config:recommended` は `group:monorepos` を含むため、**同一 monorepo から公開されるパッケージ群（`@vitest/*`、`@tiptap/*`、`playwright` 系など）は設定なしで自動的に束ねられる**。手で書く必要はない
  - 手当てが必要なのは Renovate が推測できない**ベンダー横断の結合**:
    - 本体と型定義のペア（`debug` + `@types/debug`）。DefinitelyTyped は別リポジトリで公開されるため自動グループ化されない
    - peer dependency で結ばれた別ベンダーのパッケージ（`hono` + `zod` + `@hono/zod-validator`）
    - `resolutions` で固定しているパッケージとその利用側
    - 自前の `@d-zero/*` パッケージ群
  - 判断基準は「**片方だけバージョンが上がった状態でビルドと型チェックが通るか**」。通らないなら同じ `groupName` にまとめる
- グループ化を怠ると、Renovate が個別に PR を作り、片方だけマージされた中間状態で CI が赤になる。結果として**両方の PR がマージできなくなる**
- グルーピングの現状は `git branch -r --list 'origin/renovate/*'` で確認できる。`*-monorepo` サフィックスのブランチは `group:monorepos` による自動グループ

## スキル

| スキル                             | 用途               |
| ---------------------------------- | ------------------ |
| `.claude/skills/git/SKILL.md`      | コミット作成ルール |
| `.claude/skills/grill-me/SKILL.md` | 計画・設計の壁打ち |
| `.claude/skills/pr/SKILL.md`       | PR 作成・push      |

## ドキュメント原則

情報は置き場で役割が決まる。**設定ファイル（`config.js` 等）には How、コミットログには Why、コードコメントには Why not**（Why が必要なときは Why も書く）。

- **計画相対概念の禁止**: 実装計画に由来する相対概念（Phase/Step 番号、「本 PR」「今回」「旧実装」「導入予定」）をガイドライン本文・コメントに書かない。現在の挙動と意図的な不在（Why not）として自己完結に書く。外部参照は issue / PR 番号のみ可
- **ガイドライン本文と実装の矛盾**: 参照先の lint 設定（`eslint.config.js` 等）が正としてガイドライン本文を直す

## セキュリティ

### 機密情報の取り扱い

- `.env`、`.env.*` 等の機密ファイルを読み取り・編集・コミットしない（機密ファイルの判断は `.gitignore` を参考にすること）
- コミット前に `git diff --staged` で機密情報（API キー、トークン、パスワード、企業名、顧客情報）が含まれていないか確認する
- **サンプル値は予約済み慣例に従う**: ドメインは `example.com` / `*.example` / `*.test` 等（RFC 2606/6761）、IP は TEST-NET。実在の無関係ドメイン、未取得の創作ドメイン、案件識別子、実データ・実コーパスの断片を成果物に残さない（詳細は `.claude/skills/git/SKILL.md` のサンプル値慣例チェック）
- 環境変数やシークレットをコード内にハードコードしない

### サプライチェーン保護

- **yarn dlx は完全禁止**: ローカルパッケージを使わずリモートから直接実行するため、サプライチェーン攻撃に脆弱
- **npx は原則使わない**: package.json の scripts で定義されたコマンドを `yarn <script>` で実行すること
- 新しい依存パッケージの追加は慎重に。既存の依存で解決できないか先に確認する
- `yarn add` する前にパッケージの信頼性（ダウンロード数、メンテナンス状況、既知の脆弱性）を確認する
- `yarn add` する場合はバージョンを固定する（例: `yarn add foo@1.2.3`）
- lockfile（yarn.lock）の手動編集は禁止
