import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default async () => {
	return withMermaid(
		defineConfig({
			outDir: process.cwd() + '/.dist',
			lang: 'ja',
			title: 'D-ZERO Guidelines',
			description:
				'株式会社ディーゼロの主にフロントエンド開発のために規定しているガイドラインです。',
			head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
			themeConfig: {
				search: {
					provider: 'local',
				},
				nav: [
					{
						text: 'コーディングガイドライン',
						link: '/',
					},
					{
						text: 'コンポーネント集',
						link: 'https://components.d-zero.co.jp/',
						target: '_blank',
					},
					{
						text: 'GitHub',
						link: 'https://github.com/d-zero-dev',
						target: '_blank',
					},
				],
				sidebar: [
					{
						text: '🚩 コーディングガイドライン',
						link: '/',
						collapsed: true,
						items: [
							{ text: 'ガイドラインの更新', link: '/contributing' },
							{ text: '制作に取り掛かる前に', link: '/preparation' },
							{ text: '対応ブラウザとデバイス', link: '/browsers' },
							{ text: 'プロジェクトのルールの最適化', link: '/rules' },
							{ text: '責任者の選任', link: '/roles' },
							{ text: '制作環境', link: '/environment' },
							{ text: 'バージョン管理', link: '/versioning' },
							{ text: 'テキストファイルに関して', link: '/text-files' },
							{ text: '検証とテスト', link: '/testing' },
							{ text: 'AIエージェントスキル', link: '/agent-skills' },
						],
					},
					{
						text: '🛤 Gitガイドライン',
						link: '/git/',
						collapsed: true,
						items: [
							{ text: 'ブランチとテストサイト', link: '/git/branches' },
							{ text: 'pre-commitフック', link: '/git/hooks' },
							{ text: 'Git操作手順', link: '/git/workflow' },
						],
					},
					{
						text: '📛 識別子の命名規則',
						link: '/naming/',
						collapsed: true,
						items: [
							{ text: '命名方針', link: '/naming/principles' },
							{ text: 'スペルチェック', link: '/naming/spelling' },
							{ text: '文字構成', link: '/naming/structure' },
							{ text: '省略', link: '/naming/abbreviation' },
							{ text: '識別子の統一', link: '/naming/consistency' },
						],
					},
					{
						text: '📗 HTMLガイドライン',
						link: '/html/',
						collapsed: true,
						items: [
							{ text: 'コードスタイル', link: '/html/style' },
							{ text: 'ファイル構成', link: '/html/structure' },
							{ text: 'ビルド環境', link: '/html/builder' },
							{ text: 'DOCTYPE', link: '/html/doctype' },
							{ text: 'メタ要素', link: '/html/meta' },
							{ text: 'パスとリンク', link: '/html/links' },
							{ text: 'コンポーネント', link: '/html/components' },
							{
								text: 'メインコンテンツのエレメントとヘルパークラス',
								link: '/html/elements',
							},
							{ text: 'id属性の利用', link: '/html/ids' },
							{ text: 'セマンティックとアクセシビリティ', link: '/html/accessibility' },
							{ text: 'インタラクションの実装', link: '/html/interactions' },
						],
					},
					{
						text: '📘 CSSガイドライン',
						link: '/css/',
						collapsed: true,
						items: [
							{ text: 'コードスタイル', link: '/css/style' },
							{ text: 'ビルド環境', link: '/css/builder' },
							{ text: 'ファイル構成', link: '/css/structure' },
							{ text: 'IDセレクタの利用の禁止', link: '/css/ids' },
							{ text: 'ルールの定義規則', link: '/css/rules' },
							{ text: 'タイプセレクタの利用', link: '/css/selectors' },
							{ text: '記述順番', link: '/css/order' },
							{
								text: 'カスタムプロパティ・カスタムクエリー・変数・関数・ミックスイン・プレースホルダー',
								link: '/css/variables',
							},
							{ text: 'プロパティのルール', link: '/css/properties' },
							{ text: '値のルール', link: '/css/values' },
						],
					},
					{
						text: '🖼️ 画像・メディアリソースガイドライン',
						link: '/media/',
						collapsed: true,
						items: [
							{ text: '画像', link: '/media/image' },
							{ text: '動画', link: '/media/video' },
							{ text: '音声', link: '/media/audio' },
							{ text: 'フォント', link: '/media/font' },
						],
					},
					{
						text: '📙 JavaScriptガイドライン',
						link: '/js/',
						collapsed: true,
						items: [
							{ text: 'コードスタイル', link: '/js/style' },
							{ text: 'ビルド環境', link: '/js/builder' },
							{ text: 'ファイル構成', link: '/js/structure' },
							{ text: 'HTMLへの読み込み', link: '/js/loading' },
							{ text: '開発ファイル', link: '/js/development' },
							{ text: 'インタラクションの実装', link: '/js/interactions' },
							{ text: 'ライブラリ・モジュールの利用', link: '/js/libraries' },
							{ text: 'style属性をなるべく変更しない', link: '/js/no-style-attr' },
							{ text: 'パフォーマンスを意識した実装', link: '/js/performance' },
						],
					},
				],
				footer: {
					message: 'Licensed under CC BY-NC-SA 4.0',
					copyright: 'Copyright © 2024 D-ZERO Co., Ltd.',
				},
				editLink: {
					pattern:
						'https://github.com/d-zero-dev/frontend-guidelines/edit/main/src/:path',
					text: 'GitHubで編集する',
				},
				lastUpdated: {
					text: '最終更新日',
					formatOptions: {
						dateStyle: 'long',
					},
				},
			},
		}),
	);
};
