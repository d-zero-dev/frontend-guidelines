import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default async () => {
	return withMermaid(
		defineConfig({
			outDir: process.cwd() + '/.dist',
			lang: 'ja',
			title: 'ディーゼロ コーディングガイドライン',
			description:
				'株式会社ディーゼロの主にフロントエンド開発のために規定しているコーディンガイドラインです。',
			themeConfig: {
				footer: {
					message: 'Licensed under CC BY-NC-SA 4.0',
					copyright: 'Copyright © 2024 D-ZERO Co., Ltd.',
				},
			},
		}),
	);
};
